 

## Adding a New Data Type

* * *

This specification describes the Galaxy source code changes required to add support for a new data type.

Every Galaxy dataset is associated with a datatype which can be determined by the file extension (or format in the history item). Within Galaxy, supported datatypes are contained in the <tt>galaxy.datatypes.registry:Registry</tt> class, which has the responsibility of mapping extensions to datatype instances. At start up this registry is initialized with data type values from the <tt>datatypes_conf.xml</tt> file. All data type classes are a subclass of the <tt>galaxy.datatypes.data:Data</tt> class.

We'll pretend to add a new datatype format named "Foobar" whose associated file extension is "foo" to our local Galaxy instance as a way to provide the details for adding support for new data types. Our example Foobar data type will be a subclass of <tt>galaxy.datatypes.tabular.Tabular</tt>.

### Step 1

We'll add the new data type to the <tt>&lt;registration&gt;</tt> tag section of the <tt>datatypes_conf.xml</tt> file. Sample <tt>&lt;datatype&gt;</tt> tag attributes in this section are:

<tt>&lt;datatype extension="ab1" type="galaxy.datatypes.images:Ab1" mimetype="application/octet-stream" display_in_upload="true"/&gt;</tt>

where:

<tt>extension</tt> - the data type's Dataset file extension ( e.g., ab1, bed, gff, qual, etc ) <tt>type</tt> - the path to the class for that data type <tt>mimetype</tt> - if present (it's optional), the data type's mime type <tt>display_in_upload</tt> - if present ( it's optional and defaults to False ), the associated file extension will be displayed in the "File Format" select list in the "Upload File from your computer" tool in the "Get Data" tool section of the tool panel.

```
#!highlight xml
<datatypes>
  <registration converters_path="lib/galaxy/datatypes/converters">
    <datatype extension="ab1" type="galaxy.datatypes.images:Ab1" mimetype="application/octet-stream" display_in_upload="true"/>
    <datatype extension="foo" type="galaxy.datatypes.tabular:Foobar" display_in_upload="true"/>
...
```

**Note:** If you do not wish to add extended functionality to for a new datatype, but simply want to restrict the output of a set of tools to be used in another set of tools, you can add the flag _subclass="True"_ to the datatype definition line. Example:

```
#!highlight xml


<datatype extension="my_tabular_subclass" type="galaxy.datatypes.tabular:Tabular" subclass="True"/>
```

### Step 2

Galaxy tools are configured to automatically set the data type of an output dataset. However, in some scenarios, Galaxy will attempt to determine the data type of a file using a sniffer (e.g., uploading a file from a local disk with 'Auto-detect' selected in the File Format select list). The order in which Galaxy attempts to determine data types is critical because some formats are much more loosely defined than others. The order in which the sniffer for each data type is applied to the file should be most rigidly defined formats first followed by less and less rigidly defined formats, with the most loosely defined format last, and then a default format associated with the file if none of the data type sniffers were successful. The order in which data type sniffers are applied to files is implicit in the <tt>&lt;sniffers&gt;</tt> tag set section of the <tt>datatypes_conf.xml</tt> file. We'll assume that the format of our Foobar data type is fairly rigidly defined, so it can be placed closer to the start of the sniff order.

```
#!highlight xml
  <sniffers>
    <sniffer type="galaxy.datatypes.sequence:Maf"/>
    <sniffer type="galaxy.datatypes.sequence:Lav"/>
    <sniffer type="galaxy.datatypes.tabular:Foobar"/>
...
```

### Step 3

We'll now create a new code file, <tt>galaxy.datatypes.foobar.py</tt>, that will contain the Foobar class (in this example we could simply add the Foobar class to the <tt>galaxy.datatypes.tabular.py</tt> code file). Keep in mind that your new data type class should be placed in a file that is appropriate (based on it's superclass), and that the file will need to be imported by <tt>lib/galaxy/datatypes/registry.py</tt>. You will need to include a file\_ext attribute to your class and create any necessary functions to override the functions in your new data type's superclass (in our example, the galaxy.datatypes.tabular.Tabular class). In our example below, we have set our class's file\_ext attribute to "foo" and we have overridden the <tt> __init__ ()</tt>, <tt>init_meta()</tt> and <tt>sniff()</tt> functions. It is important to override functions (especially the meta data and sniff functions) if the attributes of your new class differ from those of it's superclass. Note: sniff functions are not required to be included in new data type classes, but if the sniff function is missing, Galaxy will end up associating the default data type and file extension (Text and 'txt' in our example) with the file. For binary files, the default would be Data and 'data'.

```
#!highlight python
 from galaxy import eggs


 import pkg_resources
 pkg_resources.require( "bx-python" )


 import logging, os, sys, time, sets, tempfile, shutil
 import data
 from galaxy import util
 from galaxy.datatypes.sniff import *
 from cgi import escape
 import urllib
 from bx.intervals.io import *
 from galaxy.datatypes import metadata
 from galaxy.datatypes.metadata import MetadataElement
 from galaxy.datatypes.tabular import Tabular


 class Foobar( Tabular ):
    """Tab delimited data in foo format"""
    file_ext = "foo"


    MetadataElement( name="columns", default=3, desc="Number of columns", readonly=True )


    def __init__ (self, **kwd):
        """Initialize foobar datatype"""
        Tabular. __init__ (self, **kwd)
        self.do_something_else()


    def init_meta( self, dataset, copy_from=None ):
        Tabular.init_meta( self, dataset, copy_from=copy_from )
        if elems_len == 8:
            try:
                map( int, [hdr[6], hdr[7]] )
                proceed = True
            except:
                pass


    def sniff( self, filename ):
        headers = get_headers( filename, '\t' )   
        try:
            if len(headers) < 2:
                return False
            for hdr in headers:
                if len( hdr ) > 1 and hdr[0] and not hdr[0].startswith( '#' ):
                    if len(hdr) != 8:
                        return False
                    try:
                        map( int, [hdr[6], hdr[7]] )
                    except:
                        return False
                # Do other necessary checking here...
        except:
            return False
        # If we haven't yet returned False, then...
        return True


...
```

That should be it! If all of your code is functionally correct you should now have support for your new data type within your Galaxy instance.

## Advanced Features

- [Admin/Datatypes/Composite Datatypes](Admin%2FDatatypes%2FComposite+Datatypes) 
