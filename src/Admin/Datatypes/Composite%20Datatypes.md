1. format text/creole 

## Composite Datatypes

* * *

Before continuing with this section, be sure to read and understand [AddingDatatypes](Admin%2FDatatypes%2FAdding+Datatypes).

Composite datatypes can be used as a more structured way to contain individual history items which are composed of multiple files. The Rgenetics package for Galaxy has been implemented using Composite Datatypes; for real-life examples, examine the configuration files (particularly lib/galaxy/datatypes/genetics.py) included with the distribution.

In composite datatypes, there is one "primary" data file and any number of specified "component" files. The primary data file is a base dataset object and the component files are all located in a directory associated with that base dataset. There are two types of composite datatypes: basic and auto\_primary\_file. In **basic** composite datatypes, the primary data file must be written by tools or provided directly during upload. In **auto\_primary\_file** composite datatypes, the primary data file is generated automaticaly by the Framework; all tool-writable or uploadable files are stored in the directory associated with the primary file.

### Creating Composite Datatypes

A datatype can be set to composite by setting the <tt>composite_type</tt> flag. There are 3 valid options:

- None (not a composite datatype) 
- 'basic' 
- 'auto\_primary\_file' 

### Defining Basic Composite Datatypes

The example below defines a basic composite datatype which is composed of 2 component files along with a tool-written or user-uploaded primary file. In this example the primary file is a report summarizing the results. The two component files (results.txt, results.dat) contain the results; results.txt is a text file and is handled as such during upload whereas results.dat is flaged as binary, allowing a binary file to be uploaded for that component. During upload, 3 sets of file upload/paste interfaces are provided to the user. A file must be provided for the primary (index) file as well as results.txt; results.dat is flaged as optional so may be left blank.

```
#!highlight python


class BasicComposite(Text):      
    
    
    composite_type = 'basic'
    
    
    def __init__ ( self, **kwd ):
       Text. __init__ ( self, **kwd )
        self.add_composite_file( 'results.txt' )
        self.add_composite_file( 'results.dat', is_binary = True, optional = True )
```

These files can be specified on the command line in the following fashion:

```
#!highlight xml


<command>someTool.sh $input1 ${os.path.join( input1.extra_files_path, 'results.txt' )} 
${os.path.join( input1.extra_files_path, 'results.dat' )} $output1</command>
```

If a tool is aware of the file names for a datatype, then only input1.extra\_files\_path needs to be provided.

There are cases when it is desireable for the composite filenames to have varying names, but be of a similar form; for an example of this see Rgenetics below.

Before continuing with this section, be sure to read and understand [AddingDatatypes](Admin%2FDatatypes%2FAdding+Datatypes).

Composite datatypes can be used as a more structured way to contain individual history items which are composed of multiple files. The Rgenetics package for Galaxy has been implemented using Composite Datatypes; for real-life examples, examine the configuration files (particularly lib/galaxy/datatypes/genetics.py) included with the distribution.

In composite datatypes, there is one "primary" data file and any number of specified "component" files. The primary data file is a base dataset object and the component files are all located in a directory associated with that base dataset. There are two types of composite datatypes: **basic** and **auto\_primary\_file**. In basic composite datatypes, the primary data file must be written by tools or provided directly during upload. In auto\_primary\_file composite datatypes, the primary data file is generated automaticaly by the Framework; all tool-writable or uploadable files are stored in the directory associated with the primary file.

### Creating Composite Datatypes

A datatype can be set to composite by setting the <tt>composite_type</tt> flag. There are 3 valid options:

- None (not a composite datatype) 
- 'basic' 
- 'auto\_primary\_file' 

### Defining Auto Primary File Composite Datatypes

The example below defines an auto primary file composite datatype which is composed of 2 component files along with a framework generated file. In this example the primary file is an html page containing download links to the individual result files. The two component files (results.txt, results.dat) contain the results; results.txt is a text file and is handled as such during upload whereas results.dat is flaged as binary, allowing a binary file to be uploaded for that component. During upload, 2 sets of file upload/paste interfaces are provided to the user. A file must be provided for results.txt whereas results.dat is flaged as optional so may be left blank.

In this composite type, the primary file is generated using the <tt>generate_primary_file</tt> method specified in the datatype definition. The <tt>generate_primary_file</tt> method here loops through the defined components and creates a link to each.

```
#!highlight python






class AutoPrimaryComposite(Text):      
    
    
    composite_type = 'auto_primary_file'
    
    
    def __init__ ( self, **kwd ):
       Text. __init__ ( self, **kwd )
        self.add_composite_file( 'results.txt' )
        self.add_composite_file( 'results.dat', is_binary = True, optional = True )


    def generate_primary_file( self, dataset = None ):
        rval = ['<html><head><title>Files for Composite Dataset (%s)</title></head><p/>This composite dataset is composed of the following files:<p/><ul>' % ( self.file_ext )]
        for composite_name, composite_file in self.get_composite_files( dataset = dataset ).iteritems():
            opt_text = ''
            if composite_file.optional:
                opt_text = ' (optional)'
            rval.append( '<li><a href="%s">%s</a>%s' % ( composite_name, composite_name, opt_text ) )
        rval.append( '</ul></html>' )
        return "\n".join( rval )
```

These files can be specified on the command line in the following fashion:

```
#!highlight xml


<command>someTool.sh ${os.path.join( input1.extra_files_path, 'results.txt' )} ${os.path.join( input1.extra_files_path, 'results.dat' )} $output1</command>
```

### Advanced Topics: Rgenetics Example

Rgenetics datatypes are defined as composite datatypes. The tools in this package rely heavily on the contents of a filename for analysis and reporting. In this case it is desirable for the filenames of the components to vary slightly, but maintain a common form. To do this, we use a special metadata parameter that can only be set at dataset creation (i.e. upload). This example uses the metadata parameter **base\_name** to specify part of the components' filenames.

```
#!highlight python


class Lped(Text):
    MetadataElement( name="base_name", desc="base name for all transformed versions of this genetic dataset", default="galaxy", readonly=True, set_in_upload=True)
    
    
    composite_type = 'auto_primary_file'
    file_ext="lped"
    allow_datatype_change = False


    def __init__ ( self, **kwd ):
        Rgenetics. __init__ ( self, **kwd )
        self.add_composite_file( '%s.ped', description = 'Pedigree File', substitute_name_with_metadata = 'base_name', is_binary = True )
        self.add_composite_file( '%s.map', description = 'Map File', substitute_name_with_metadata = 'base_name', is_binary = True )


    def generate_primary_file( self, dataset = None ):
        rval = ['<html><head><title>Files for Composite Dataset (%s)</title></head><p/>This composite dataset is composed of the following files:<p/><ul>' % ( self.file_ext )]
        for composite_name, composite_file in self.get_composite_files( dataset = dataset ).iteritems():
            opt_text = ''
            if composite_file.optional:
                opt_text = ' (optional)'
            rval.append( '<li><a href="%s">%s</a>%s' % ( composite_name, composite_name, opt_text ) )
        rval.append( '</ul></html>' )
        return "\n".join( rval )
```

The file specified as '%s.ped' is found at os.path.join( input1.extra\_files\_path, '%s.ped' % input1.metadata.base\_name ).

It should be noted that changing the datatype of datasets which use this substitution method will cause an error if the metadata parameter 'base\_name' does not exist in a datatype that the dataset is set to. This is because the value within 'base\_name' will be lost -- if the datatype is set back to the original datatype, the default metadata value will be used and the filenames might not match the basename.

To prevent this from occuring, set allow\_datatype\_change to False. The dataset's datatype will not be able to be changed.

### Future Directions

This approach was implemented to be backwards compatible with existing Rgenetics datasets/tools (implemented before composite datatypes existed). Different approaches should be considered. Suggestions and comments are welcome.

