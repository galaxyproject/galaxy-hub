The process to adding completely new datatypes is not significantly different than the existing process of adding subclassed datatypes, as done in the [other tutorial](/src/Admin/Datatypes/Adding Datatypes/index.md). It is highly recommended that you read that page first, to gain a good understanding of how to add subclassed datatypes. Since there are many existing datatypes in galaxy, it's very likely that will provide a good starting point for you developing new datatypes.

# Basic Datatypes

In this [real life example](https://github.com/bgruening/galaxytools/blob/master/datatypes/common_sequence_datatypes/csequence.py), we'll add a datatype named `GenBank`, to support genbank files. 

First, we'll set up a file named `csequence.py` in `lib/galaxy/datatypes/csequence.py`. This file could contain some of the standard sequence types, though we'll only implement genbank.

```python
"""
Classes for all common sequence formats
"""

from galaxy.datatypes import data
from galaxy.datatypes.metadata import MetadataElement

import os
import logging

log = logging.getLogger(__name__)

class GenBank( data.Text ):
    """
        abstract class for most of the molecule files
    """
    file_ext = "genbank"
```


This is all you need to get started with a datatype. Now, load it into your `datatypes_conf.xml` by adding the following line:

```xml
<datatype extension="genbank" type="galaxy.datatypes.csequence:GenBank" display_in_upload="True" />
```


and start up your server. Were you watching the logs carefully? No? Wondering why your module isn't showing up in the upload tool? Well, if you dig through your logs you'll see this message:

```
galaxy.datatypes.registry ERROR 2014-07-17 12:43:23,939 Error importing datatype module galaxy.datatypes.csequence: 'module' object has no attribute 'csequence'
Traceback (most recent call last):
  File "/home/hxr/work/galaxy-central/lib/galaxy/datatypes/registry.py", line 208, in load_datatypes
    module = getattr( module, mod )
AttributeError: 'module' object has no attribute 'csequence'
```


This error comes as a result of the module not being imported by `registry.py`. You'll need to add your module as an import to the top of registry.py:

```python
import csequence
```


Once you've done this, your server will start up and the datatype will be available. Please note that this problem can be avoided by using the toolshed to store your datatypes. There, this issue will be avoided as galaxy handles imports from toolshed installed datatypes differently than from locally installed datatypes.

## Adding a Sniffer

Datatypes can be "sniffed", their formats can be automatically detected from their contents. For GenBank files that's extremely easy to do, the first 5 characters will be `LOCUS`, according to section 3.4.4 of the [specification](ftp://ftp.ncbi.nih.gov/genbank/gbrel.txt).

To implement this in our tool we first have to add the relevant sniffing code to our `GenBank` class in `csequence.py`

```python
    def sniff( self, filename ):
        header = open(filename).read(5)
        return header == 'LOCUS'
```


and then we have to register the sniffer in `datatypes_conf.xml`

```xml
<sniffer type="galaxy.datatypes.csequence:GenBank"/>
```


Once that's done, restart your server and try uploading a genbank file. You'll notice that the filetype is automatically detected as genbank once the upload is done.

## More Features

One of the useful things your datatype can do is provide metadata. This is done by adding metadata entries inside your class like this:

```python
class GenBank( data.Text ):
    file_ext = "genbank"

    MetadataElement( name="number_of_sequences", default=0, desc="Number of sequences", readonly=True, visible=True, optional=True, no_value=0 )
```


Here we have a `MetadataElement`, accessible in methods with a `dataset` parameter from `dataset.metadata.number_of_sequences`. There are a couple relevant functions you'll want to override here:

* `set_peek( self, dataset, is_multi_byte=False )`
* `set_meta( self, dataset, **kwd )`

the `set_peek` function is used to determine the blurb of text that will appear to users above the preview (first 5 lines of the file, the file peek), informing them about metadata of a sequence. For genbank files, we're probably interested in how many genome/records are contained within a file. To do that, we need to count the number of times the word LOCUS appears as the first five characters of a line. We'll write a function named `_count_genbank_sequences`

```python
    def _count_genbank_sequences( self, filename ):
        count = 0
        with open( filename ) as gbk:
            for line in gbk:
                if line[0:5] == 'LOCUS':
                    count += 1
        return count
```


which we'll call in our `set_meta` function, since we're setting metadata about the file.

```python
    def set_meta( self, dataset, **kwd ):
        dataset.metadata.number_of_sequences = self._count_genbank_sequences( dataset.file_name )
```


Now we'll need to make use of this in our `set_peek` override:

```python
    def set_peek( self, dataset, is_multi_byte=False ):
        if not dataset.dataset.purged:
            # Add our blurb
            if (dataset.metadata.number_of_sequences == 1):
                dataset.blurb = "1 sequence"
            else:
                dataset.blurb = "%s sequences" % dataset.metadata.number_of_sequences
            # Get standard text peek from dataset
            dataset.peek = data.get_file_peek( dataset.file_name, is_multi_byte=is_multi_byte )
        else:
            dataset.peek = 'file does not exist'
            dataset.blurb = 'file purged from disk'
```


This function will be called during metadata setting. Try uploading a multi record genbank file and testing it out. If you don't have a multi-record genbank file, simply concatenate a single file together a couple times and upload that. 

By now you should have a complete GenBank parser in `csequence.py` that looks about like the following:

```python
from galaxy.datatypes import data
from galaxy.datatypes.metadata import MetadataElement
import logging
log = logging.getLogger(__name__)


class GenBank( data.Text ):
    file_ext = "genbank"

    MetadataElement( name="number_of_sequences", default=0, desc="Number of sequences", readonly=True, visible=True, optional=True, no_value=0 )

    def set_peek( self, dataset, is_multi_byte=False ):
        if not dataset.dataset.purged:
            # Add our blurb
            if (dataset.metadata.number_of_sequences == 1):
                dataset.blurb = "1 sequence"
            else:
                dataset.blurb = "%s sequences" % dataset.metadata.number_of_sequences
            # Get 
            dataset.peek = data.get_file_peek( dataset.file_name, is_multi_byte=is_multi_byte )
        else:
            dataset.peek = 'file does not exist'
            dataset.blurb = 'file purged from disk'

    def get_mime(self):
        return 'text/plain'

    def sniff( self, filename ):
        header = open(filename).read(5)
        return header == 'LOCUS'

    def set_meta( self, dataset, **kwd ):
        """
        Set the number of sequences in dataset.
        """
        dataset.metadata.number_of_sequences = self._count_genbank_sequences( dataset.file_name )

    def _count_genbank_sequences( self, filename ):
        """
        This is not a perfect definition, but should suffice for general usage. It fails to detect any
        errors that would result in parsing errors like incomplete files.
        """
        # Specification for the genbank file format can be found in
        # ftp://ftp.ncbi.nih.gov/genbank/gbrel.txt
        # in section 3.4.4 LOCUS Format
        count = 0
        with open( filename ) as gbk:
            for line in gbk:
                if line[0:5] == 'LOCUS':
                    count += 1
        return count
```

