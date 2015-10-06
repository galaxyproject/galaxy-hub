INCLUDE(/Admin/Tools/LinkBox)
## Galaxy Tool XML File

The XML File for a Galaxy tool, generally referred to as the "tool config file" or "wrapper", serves a number of purposes.  First, it lays out the user interface for the tool ( e.g. form fields, text, help, etc. ).  Second, it provides the glue that links your tool to Galaxy by telling Galaxy how to invoke it, what options to pass, and what files it will produce as output. It would be best to take some time to browse through the various tool configs ( files with a .xml extension ) in the [~/tools](https://github.com/galaxyproject/galaxy/tree/master/tools) subdirectories of your local Galaxy instance as you read this document.

Pay attention to the following when creating a new tool:

1. **Make sure your XML is valid** - Improper XML will most likely cause Galaxy to not load your tool. The easiest way to validate your XML is just to open the XML file itself in Firefox, which will either parse the file and display it, or showf the error and its location in large letters. There are also numerous XML validators available on line.
1. **Don't forget to restart Galaxy** - Galaxy loads and parses XML at run-time, which means you'll have to restart it after updating any XML files. The same does not apply if you only update an executable.
1. **Use the -file_strandCol options** - Using interval files is more of a pain than using BED files, because the column locations are variable. But by including command line options in your executable and passing them the "automagic" column variables, you can easily handle interval formats. Plus, since BED formats are treated internally as intervals, you don't have to worry about figuring out which one your program is being passed. Everything will be provided as an interval file. Read more about this in the "command line" tag section below.
1. **Make sure your parameter names match your command-line variables** - Galaxy will populate your command line options from the parameters selected by the user when the tool executes. Form field values are mapped to parameters in the command line via such that "form field name <-> $parameter name in the command line.
1. **Provide tool tips and other help** - useful for those that will use your tool.  The help section provides information on how to use the tool.
1. **Properly use quotes around placeholders.** This is especially true for data inputs/filenames, where a space exists in the filename (e.g. because Galaxy's database/files dir structure contains spaces) Instead of e.g. $input_file do "${input_file}"

A Galaxy tool's config file consists of a subset of the following XML tag sets - each of these is described in detail in the following sections.

TABLE_OF_CONTENTS(3)

## Details of XML tag sets
----
### <tool> tag set
The outer-most tag set

| attribute |  values  |  details  |  required  |  example  | 
| --------- | ------- | -------- | --------- | -------- | 
| id |  a string *  |  Must be unique across all tools; should be lowercase and contain only letters, numbers, and underscores.  It allows for tool versioning and metrics of the number of times a tool is used, among other things.  |  yes  |  `id="sort1"`  | 
| name |  a string  |  This string is what is displayed as a hyperlink in the tool menu  |  yes  |  `name="Sort"`  | 
| version |  a string  |  This string defaults to "1.0.0' if it is not included in the tag.  It allows for tool versioning and should be changed with each new version of the tool.  |  no  |  `version="1.0.1"` | 
| hidden |  true, false  |  Allows for tools to be loaded upon server startup, but not displayed in the tool menu  |  no  |  `hidden="true"`  | 
| tool_type |  data_source  |  Allows for certain framework functionality to be performed on certain types of tools.  This is currently only used in "data_source" tools, but will undoubtedly be used with other tools in the future.  |  no  |  `tool_type="data_source"`  | 
| URL_method |  get, post  |  Only if "tool_type" attribute value is "data_source" - defines the HTTP request method to use when communicating with an external data source application ( the default is "get" ).  |  no  |  `URL_method="post"`  | 
| workflow_compatible |  true, false  |  Default is true.  |  no  |  `workflow_compatible="false"`  | 


#### Example

The following is an example that contains all of the attributes described above.
```
#!highlight xml
<tool id="ucsc_table_direct1" name="UCSC Main" version="1.0.0" hidden="false" tool_type="data_source" URL_method="post">
```

<br />
----
### <description> tag set
The attribute value is displayed in the tool menu immediately following the hyperlink for the tool ( based on the "name" attribute of the [<tool> tag set](#tool-tag-set) described above ).

#### Example

```
#!highlight xml
<description>table browser</description>
```

<br />
----

### <version_command> tag set
Specifies the command to be run in order to get the tool's version string. The resulting value will be found in the "Info" field of the history dataset. For example:

```
#!highlight xml
<version_command>tophat -version</version_command>
```


Unlike the ``command `` tag below, this value is taken as a literal and so there is no need to escape values like ``$`` and command inputs are not available for variable substitution.

----

### <command> tag set
This tag specifies how Galaxy should invoke the tool's executable, passing its required input parameter values (the command line specification links the parameters supplied in the form with the actual tool executable). Any word inside it starting with a dollar sign ($) will be treated as a variable whose values can be acquired from one of three sources: parameters, metadata, or output files.
After the substitution of variables with their values, the content is interpreted with [Cheetah](http://www.cheetahtemplate.org/) and finally given to the interpreter specified in the corresponding attribute (if any).

<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> interpreter </td>
    <td> python, perl, bash, etc </td>
    <td> This attribute defines the programming language in which the tool's executable file is written.  Any language can be used (tools can be written in Python, C, Perl, Java, etc.). The executable file must be in the same directory of the XML file. If instead this attribute is not specified, the tag content should be a Bash command calling executable(s) available in the $PATH. </td>
    <td> no (unless executable is interpreted) </td>
    <td> <code>interpreter="python"</code> </td>
  </tr>
  <tr>
    <td> detect_errors </td>
    <td> default, exit_code, aggressive </td>
    <td> See https://github.com/galaxyproject/galaxy/pull/117 </td>
    <td> no </td>
    <td> <code>detect_errors="aggressive"</code> </td>
  </tr>
</table>


#### Example

The following uses a compiled executable ( see the various tool config files in [emboss_5](https://toolshed.g2.bx.psu.edu/view/devteam/emboss_5) tools for examples of using compiled executables ).

```
#!highlight xml
 <command>backtranseq -sequence $input1 -outfile $out_file1 -cfile $cfile -osformat2 $out_format1 -auto</command>
```


#### Example

The following uses an interpreted executable.  The values of the `$<variables>` (e.g. `$input`) are acquired from form field parameters in the tool form (see [~/tools/filters/sorter.xml](https://github.com/galaxyproject/galaxy/tree/master/tools/filters/sorter.xml) for an example of using an interpreted executable). The file sorter.py must be in the same directory of the XML file.

```
#!highlight xml
  <command interpreter="python">sorter.py -i $input -o $out_file1 -cols $column -order $order -style $style</command>
```


#### Example

The values of the `${<variables>} `( e.g., `${input.metadata.chromCol} `) are acquired from the Metadata associated with the objects selected as the values of each of the relative form field parameters in the tool form.  Accessing this information is generally enabled using the following feature components:

* A set of "metadata information" is defined for each supported data type ( see the `_MetadataElement_` objects in the various data types classes in [~/lib/galaxy/datatypes](https://github.com/galaxyproject/galaxy/tree/master/lib/galaxy/datatypes) ).

* The `_DatasetFilenameWrapper_` class in the [~/lib/galaxy/tools/__init__.py](https://github.com/galaxyproject/galaxy/tree/master/lib/galaxy/tools/__init__.py) code file wraps a Metadata Collection to return Metadata parameters wrapped according to the Metadata spec.

There are a few reserved variables which Galaxy will automatically fill in

Also note the use of the reserved parameter name `GALAXY_DATA_INDEX_DIR` - it points to the [~/tool-data](https://github.com/galaxyproject/galaxy/tree/master/tool-data) directory.

```
#!highlight xml
<command interpreter="python">
 extract_genomic_dna.py $input $out_file1 -1 ${input.metadata.chromCol},${input.metadata.startCol},${input.metadata.endCol},${input.metadata.strandCol} -d $dbkey -o $out_format -g ${GALAXY_DATA_INDEX_DIR}
</command>
```


#### Reserved Variables

Galaxy provides a few pre-defined variables which can be used in your command line, even though they don't appear in your tool's parameters.

<table>
  <tr>
    <th> name </th>
    <th> description </th>
  </tr>
  <tr>
    <td> <code>$__tool_directory__</code> </td>
    <td> The directory the tool currently resides in (new in 15.03) </td>
  </tr>
  <tr>
    <td> <code>$__new_file_path__</code> </td>
    <td> config/galaxy.ini <code>new_file_path</code> value </td>
  </tr>
  <tr>
    <td> <code>$__tool_data_path__</code> </td>
    <td> config/galaxy.ini <code>tool_data_path</code> value </td>
  </tr>
  <tr>
    <td> <code>$__root_dir__</code> </td>
    <td> Top-level Galaxy source directory made absolute via <code>os.path.abspath()</code> </td>
  </tr>
  <tr>
    <td> <code>$__datatypes_config__</code> </td>
    <td> config/galaxy.ini <code>datatypes_config</code> value </td>
  </tr>
  <tr>
    <td> <code>$__user_id__</code> </td>
    <td> Email's numeric ID (id column of galaxy_user table in the database) </td>
  </tr>
  <tr>
    <td> <code>$__user_email__</code> </td>
    <td> User's email address </td>
  </tr>
  <tr>
    <td> <code>$__app__</code> </td>
    <td> The <code>galaxy.app.UniverseApplication</code> instance, gives access to all other configuration file variables (e.g. <code>$__app__.config.output_size_limit</code>).  Should be used as a last resort, may go away in future releases. </td>
  </tr>
</table>


Additional runtime properties are available that should be escaped with a backslash ( \ ) when appearing in command or config_file elements.

<table>
  <tr>
    <th> name </th>
    <th> description </th>
  </tr>
  <tr>
    <td> <code>\${GALAXY_SLOTS:-4} </code> </td>
    <td> Number of cores/threads allocated by the job runner or resource manager to the tool for the given job (here 4 is the default number of threads to use if running via custom runner that does not configure GALAXY_SLOTS or in an older Galaxy runtime). </td>
  </tr>
</table>


#### Best Practice

From [/Tools/BestPractices](/Tools/BestPractices): 

The command tag should be started and finished by a CDATA tag, allowing direct use of characters like the ampersand (“&”) without needing XML escaping (“&amp;amp;”).
```
#!highlight xml
<command> <![CDATA[      your lines of cheetah here       ]]> </command>
```

(http://en.wikipedia.org/wiki/CDATA)

----

### <inputs> tag set
Consists of all tag sets that define the tool's input parameters.  Each `<param>` tag within the `<inputs>` tag set maps to a command line parameter within the `<command>` tag set described above.

----

### <repeat> tag set
See [xy_plot.xml](https://toolshed.g2.bx.psu.edu/repos/devteam/xy_plot/file/tip/xy_plot.xml) for an example of how to use this tag set.  This is a container for any tag sets that can be contained within the `<inputs>` tag set.  When this is used, the tool will allow the user to add any number of additional sets of the contained parameters ( an "Add new <title>" button will be displayed on the tool form ).  An example of the use of this tag set is in the [xy_plot.xml](https://toolshed.g2.bx.psu.edu/repos/devteam/xy_plot/file/tip/xy_plot.xml) tool config. All `<inputs>` tag sets contained within the <repeat> tag can be retrieved by enumerating over $<name_of_repeat_tag_set> in [Cheetah](http://www.cheetahtemplate.org/) code. This returns the rank and the object (containing the `<inputs>` tag sets) of the repeat container. To fetch the data from the object, use $object.<name_of_param>. See the Cheetah code below.

<table>
  <tr>
    <th> attribute  </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> name </td>
    <td> a string </td>
    <td> The name of the repeat section </td>
    <td> yes </td>
    <td> <code>name="series"</code> </td>
  </tr>
  <tr>
    <td> title </td>
    <td> a string </td>
    <td> The title of the repeat section, which will be displayed on the tool form </td>
    <td> yes </td>
    <td> <code>title="Series"</code> </td>
  </tr>
  <tr>
    <td> help </td>
    <td> a string </td>
    <td> Rendered on the tool form just below the title to provide help information </td>
    <td> no </td>
    <td> <code>help="Add your series here"</code> </td>
  </tr>
  <tr>
    <td> min </td>
    <td> an integer </td>
    <td> The minimum number of repeat units </td>
    <td> no </td>
    <td> <code>min="1"</code> </td>
  </tr>
  <tr>
    <td> max </td>
    <td> a number </td>
    <td> The maximum number of repeat units </td>
    <td> no </td>
    <td> <code>max="5"</code> </td>
  </tr>
  <tr>
    <td> default </td>
    <td> a number </td>
    <td> The default number of repeat units </td>
    <td> no </td>
    <td> <code>default="1"</code> </td>
  </tr>
</table>


#### Example

This is part is contained in the `<inputs>` tag set.
```
#!highlight xml
<repeat name="series" title="Series">
    <param name="input" type="data" format="tabular" label="Dataset"/>
    <param name="xcol" type="data_column" data_ref="input" label="Column for x axis"/>
    <param name="ycol" type="data_column" data_ref="input" label="Column for y axis"/>
</repeat>
```

<br />

This Cheetah code can be used in the `<command>` tag set or the `<configfile>` tag set.
```
#!highlight xml
#for $i, $s in enumerate( $series )
    rank_of_series=$i
    input_path=${s.input.file_name}
    x_colom=${s.xcol}
    y_colom=${s.ycol}
#end for
```


#### Testing
This is an example test case with multiple repeat elements for the example above. Instances are created by referring to names with a special format: "<repeat name>_<repeat index>|<param name>"
```
#!highlight xml
<test>
    <param name="series_0|input" value="/path/to/tabular1.tsv" ftype="tabular"/>
    <param name="series_0|xcol" value="1"/>
    <param name="series_0|ycol" value="2"/>
    <param name="series_1|input" value="/path/to/tabular2.tsv" ftype="tabular"/>
    <param name="series_1|xcol" value="4"/>
    <param name="series_1|ycol" value="2"/>
</test>
```

<br />
----

### <conditional> tag set
See [~/tools/maf/interval2maf.xml](https://github.com/galaxyproject/galaxy/tree/master/tools/maf/interval2maf.xml) for an example of how to use this tag set.  This is a container for conditional parameters in the tool ( must contain `<when>` tag sets ) - the command line is wrapped in an if-else statement.

<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> name </td>
    <td> any string </td>
    <td> The name of the conditional parameter </td>
    <td> yes </td>
    <td> <code>name="maf_source_type"</code></td>
  </tr>
</table>


#### Example


Select the alignment target database ( a Galaxy cached genome build or a dataset in the history ).  Note the different input variables in the command lines.

```
#!highlight xml
<command interpreter="python">
    #if $source.source_select=="database"
        blat_wrapper.py 0 $source.dbkey $input_query $output1 $iden $tile_size $one_off
    #else
        blat_wrapper.py 1 $source.input_target $input_query $output1 $iden $tile_size $one_off
    #end if
</command>

<conditional name="source">
    <param name="source_select" type="select" label="Target source">
        <option value="database">Genome Build</option>
        <option value="input_ref">Your Upload File</option>
    </param>
    <when value="database">
        <param name="dbkey" type="genomebuild" label="Genome" />
    </when>
    <when value="input_ref">
        <param name="input_target" type="data" format="fasta" label="Reference sequence" />
    </when>
</conditional>
```

<br />
----

### <when> tag set
Contained within the `<conditional>` tag set - each `<when>` tag set contains a set of input parameters, and the conditional variables are usually defined within `<option>` tag sets.

<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> value </td>
    <td> a possible conditional value </td>
    <td> This tag set will be used when the value of the containing conditional parameter equals this attribute value </td>
    <td> yes </td>
    <td> <code>value="user"</code> </td>
  </tr>
</table>


#### Example


This example provides details for how to choose the MAF source file, either locally cached data or an history item ( there are two options: "`cached`" or "`user`" ).  If a user selects "Alignments in Your History", a variable of type "`data`" will be generated.  If the user selects "Locally Cached Alignments", a drop-down selection menu will be generated according to entries contained in the file "`maf_index.loc`", which is stored in the configured [tool_data_path](https://github.com/galaxyproject/galaxy/tree/master/tool-data) directory.

```
#!highlight xml
<command>
    #if $maf_source_type.maf_source == "user"
your_program $maf_source_type.maf_file
    #else
your_program $maf_source_type.maf_identifier
    #end if
</command>

<inputs>
    <conditional name="maf_source_type">
        <param name="maf_source" type="select" label="MAF Source">
            <option value="cached" selected="true">Locally Cached Alignments</option>
            <option value="user">Alignments in Your History</option>
        </param>
        <when value="user">
            <param name="maf_file" type="data" format="maf" label="MAF File" />
        </when>
        <when value="cached">
            <param name="maf_identifier" type="select" label="MAF Type" >
                <options from_file="maf_index.loc">
                    <column name="name" index="0"/>
                    <column name="value" index="1"/>
                </options>
            </param>
        </when>
    </conditional>
</inputs>
```

<br />
----

### <param> tag set

Contained within the `<inputs>` tag set - each of these specifies a field that will be displayed on the tool form. Ultimately, the values of these form fields will be passed as the command line parameters to the tool's executable.

<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> name </td>
    <td> a string * </td>
    <td> * Attribute values must map to each command line parameter name. "Reserved" names are: REDIRECT_URL, DATA_URL, GALAXY_URL. </td>
    <td> yes </td>
    <td> <code>name="input"</code> </td>
  </tr>
  <tr>
    <td> type </td>
    <td> <a href='#type-attribute-values-and-dependent-attributes'>See below</a> </td>
    <td> The list of supported parameter types is in the <code>parameter_types</code> dictionary in <a href='https://github.com/galaxyproject/galaxy/tree/master/lib/galaxy/tools/parameters/basic.py'>~/lib/galaxy/tools/parameters/basic.py</a>. </td>
    <td> yes </td>
    <td> <code>type="data"</code> </td>
  </tr>
  <tr>
    <td> optional </td>
    <td> true, false </td>
    <td> If "false", parameter must have a value. Defaults to "false". </td>
    <td> no </td>
    <td> <code>optional="true"</code> </td>
  </tr>
  <tr>
    <td> label </td>
    <td> a string </td>
    <td> The attribute value will be displayed on the tool page as the label of the form field </td>
    <td> no </td>
    <td> <code>label="Sort Query"</code> </td>
  </tr>
  <tr>
    <td> help </td>
    <td> a string </td>
    <td> Rendered on the tool form just below the associated field to provide information about the field </td>
    <td> no </td>
    <td> <code>help="No data? See tip below"</code> </td>
  </tr>
</table>


In addition, there are several more attributes that are only used in combination with specific values of the `type` attribute.

#### type Attribute Values and Dependent Attributes

The `type` attribute specifies what kind of parameter it is.  The list of supported parameter types is in the `parameter_types` dictionary in [~/lib/galaxy/tools/parameters/basic.py](https://github.com/galaxyproject/galaxy/tree/master/lib/galaxy/tools/parameters/basic.py).

<div class='indent'>

##### type="text"

<div class='indent'>

Free form text; parameter appears as a text box.

**Dependent attributes**

<div class='indent'>
<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> size </td>
    <td> an appropriate number </td>
    <td> Only if "type" attribute value is "text". To create a multi-line text box add an 'area="True"' attribute to the param tag. </td>
    <td> no </td>
    <td> <code>size="4"</code> </td>
  </tr>
</table>

</div>

**Example**
<div class='indent'>
Sometimes you need labels for data or graph axes, chart titles, etc. This can be done using a text field. The following will create a text box 30 characters wide with the default value of "`V1`".

```
#!highlight xml
<param name="xlab" size="30" type="text" value="V1" label="Label for x axis"/>
```

</div>

**Example**
<div class='indent'>
```
#!highlight xml
<param name="foo" type="text" area="True" size="5x25" />
```

</div></div>


##### type="integer" and type="float"

<div class='indent'>

Whole number and real number, respectively.

**Dependent attributes**

<div class='indent'>
<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> value </td>
    <td> a string </td>
    <td> Default value for the form field </td>
    <td> only for type="integer" and type="float" </td>
    <td> <code>value="0"</code> </td>
  </tr>
  <tr>
    <td> min </td>
    <td> a number </td>
    <td> minimum parameter value; only valid when type is "integer" or "float" </td>
    <td> no </td>
    <td> <code>min="0"</code> </td>
  </tr>
  <tr>
    <td> max </td>
    <td> a number </td>
    <td> maximum parameter value; only valid when type is "integer" or "float" </td>
    <td> no </td>
    <td> <code>max="600000"</code> </td>
  </tr>
</table>

</div>

**Example**
<div class='indent'>
The following will create a text box 4 characters wide with the default value of 1 and will restrict values entered to integers:

```
#!highlight xml
<param name="region_size" size="4" type="integer" value="1" label="flanking regions of size" />
```

</div></div>

##### type="boolean"

<div class='indent'>
A True / False value

**Dependent attributes**

<div class='indent'>
<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> checked </td>
    <td> yes, true, on </td>
    <td> Only if "type" attribute value is "boolean" </td>
    <td> no </td>
    <td> <code>checked="true"</code> </td>
  </tr>
  <tr>
    <td> truevalue </td>
    <td> a string </td>
    <td> Only if "type" attribute value is "boolean" </td>
    <td> no </td>
    <td> <code>truevalue="-p"</code> </td>
  </tr>
  <tr>
    <td> falsevalue </td>
    <td> a string </td>
    <td> Only if "type" attribute value is "boolean" </td>
    <td> no </td>
    <td> <code>falsevalue="-q"</code> </td>
  </tr>
</table>

</div></div>


##### type="data"

<div class='indent'>
A dataset from the current history. Multiple types might be used for the param form.

**Dependent attributes**

<div class='indent'>
<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> format </td>
    <td> a string * </td>
    <td> * Only if "type" attribute value is "data" or "data_collection" - the list of supported data formats is contained in the <a href='https://github.com/galaxyproject/galaxy/tree/master/config/datatypes_conf.xml.sample'>~/config/datatypes_conf.xml.sample</a> file. Use the file extension. </td>
    <td> no * </td>
    <td> <code>format="tabular"</code> </td>
  </tr>
  <tr>
    <td> multiple </td>
    <td> true, false </td>
    <td> Only if "type" attribute value is "data" </td>
    <td> no </td>
    <td> <code>multiple="true"</code> </td>
  </tr>
</table>

</div>

**Example**
<div class='indent'>
The following will find all "coordinate interval files" contained within the current history and dynamically populate a select list with them. If they are selected, their destination and internal file name will be passed to the appropriate command line variable. Presto! Automatic temporary file management.

```
#!highlight xml
<param name="interval_file" type="data" format="interval">
  <label>near intervals in</label>
</param>
```

</div>

**Example**
<div class='indent'>
```
#!highlight xml
<param format="sam,bam" name="bamOrSamFile" type="data" label="Alignments in BAM or SAM format" help="The set of aligned reads." />
```

</div></div>


##### type="select"

<div class='indent'>
...

**Dependent attributes**

<div class='indent'>
<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> data_ref </td>
    <td> attribute value of the input dataset * </td>
    <td> * Only if "type" attribute value is "select" - used with select lists whose options are dynamically generated based on certain metadata attributes of the dataset upon which this parameter depends ( usually <strong>but not always</strong> the tool's input dataset ) </td>
    <td> no </td>
    <td> <code>data_ref="input"</code> </td>
  </tr>
  <tr>
    <td> dynamic_options </td>
    <td> call to a function within a defined code file * </td>
    <td> * Only if "type" attribute value is "select" - used with select lists whose options are dynamically generated from the results returned by a function contained within a code file </td>
    <td> no </td>
    <td> <code>dynamic_options="get_options(input, field_name)"</code> </td>
  </tr>
  <tr>
    <td> display </td>
    <td> checkboxes, radio </td>
    <td> Only if "type" attribute value is "select" - render a select list as a set of check boxes or radio buttons. Defaults to a drop-down menu select list. </td>
    <td> no </td>
    <td> <code>display="checkboxes"</code> </td>
  </tr>
  <tr>
    <td> multiple </td>
    <td> true, false </td>
    <td> Only if "type" attribute value is "select" - render a multi-select list </td>
    <td> no </td>
    <td> <code>multiple="true"</code> </td>
  </tr>
</table>

</div>

**Example (multiple=false)**
<div class='indent'>
The following will create a select list containing the options "Downstream" and "Upstream". Depending on the selection, a "`d`" or "`u`" value will be passed to the $upstream_or_down variable on the command line.

```
#!highlight xml
<param name="upstream_or_down" type="select" label="Get">
  <option value="u">Upstream</option>
  <option value="d">Downstream</option>
</param>
```


</div>

**Example (multiple=true)**
<div class='indent'>
The following will create a checkbox list allowing the user to select "Downstream", "Upstream", both, or neither. Depending on the selection, the value of $upstream_or_down will be "`d`", "`u`", "`u,d`", or "".

```
#!highlight xml
<param name="upstream_or_down" type="select" label="Get" multiple="true" display="checkboxes">
  <option value="u">Upstream</option>
  <option value="d">Downstream</option>
</param>
```

</div></div>

##### type="data_column"
<div class='indent'>
...

**Dependent attributes**

<div class='indent'>
<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> force_select </td>
    <td> true, false </td>
    <td> Only if "type" attribute value is "data_column" - force user to select an option in the list </td>
    <td> no </td>
    <td> <code>force_select="true"</code> </td>
  </tr>
  <tr>
    <td> numerical </td>
    <td> true, false </td>
    <td> Only if "type" attribute value is "data_column" - builds a dynamically generated select list of numerical or string data </td>
    <td> no </td>
    <td> <code>numerical="true"</code> </td>
  </tr>
  <tr>
    <td> use_header_names </td>
    <td> true, false </td>
    <td> Only if "type" attribute value is "data_column" - assumes first row of data_ref is a header and builds the select list with these values rather than c1 ... cN </td>
    <td> no </td>
    <td> <code>use_header_names="true"</code> </td>
  </tr>
</table>

</div></div>

##### type="drill_down"
<div class='indent'>
...

**Dependent attributes**

<div class='indent'>
<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> hierarchy </td>
    <td> exact, recurse </td>
    <td> Only if "type" attribute value is "drill_down" </td>
    <td> no </td>
    <td> <code>hierarchy="recurse"</code> </td>
  </tr>
</table>

</div></div>

##### type="data_collection"
<div class='indent'>

**Dependent attributes**

<div class='indent'>
<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> format </td>
    <td> a string * </td>
    <td> * Only if "type" attribute value is "data" or "data_collection" - the list of supported data formats is contained in the <a href='https://github.com/galaxyproject/galaxy/tree/master/config/datatypes_conf.xml.sample'>~/config/datatypes_conf.xml.sample</a> file. Use the file extension. </td>
    <td> no * </td>
    <td> <code>format="tabular"</code> </td>
  </tr>
  <tr>
    <td> collection_type </td>
    <td> a string * </td>
    <td> * "data_collection" - restrict the kind of collection that can be consumed by this parameter (e.g. <code>paired</code>, <code>list:paired</code>, <code>list</code>). </td>
    <td> no * </td>
    <td> <code>collection_type="paired"</code> </td>
  </tr>
</table>

</div>

**Example**
<div class='indent'>
The following will create a parameter that only accepts paired FASTQ files.

```
#!highlight xml
<param name="inputs" type="data_collection" collection_type="paired" label="Input FASTQs" format="fastq">
</param>
```

</div></div>

##### type="color"

<div class='indent'>
(New as of 15.03 release.)
...

**Dependent attributes**

<div class='indent'>
<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> value </td>
    <td> #fdeada </td>
    <td> Hexidecimal color string </td>
    <td> no </td>
    <td> <code>value="#ff0000"</code> </td>
  </tr>
</table>

</div></div>


**Example**
<div class='indent'>
The following will create a color selector parameter

```
#!highlight xml
<param name="feature_color" type="color" label="Default feature color" value="#ff00ff">
</param>
```


##### type="genomebuild"
<div class='indent'>
...
</div>

##### type="hidden"
<div class='indent'>
...
</div>

##### type="hidden_data"

<div class='indent'>
...
</div>

##### type="baseurl"
<div class='indent'>
...
</div>

##### type="file"
<div class='indent'>
...
</div>

##### type="ftpfile"
<div class='indent'>
...
</div>

##### type="library_data"
<div class='indent'>
...
</div>
</div>

<br />
----

### <validator> tag set
See [the annotation_profiler tool](https://github.com/galaxyproject/tools-devteam/tree/master/tools/annotation_profiler) for an example of how to use this tag set.  This tag set is contained within the `<param>` tag set - it applies a validator to the containing parameter.

<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> type </td>
    <td> expression, regex, in_range, length, metadata, unspecified_build, no_options, empty_field, dataset_metadata_in_file, dataset_metadata_in_data_table, dataset_ok_validator </td>
    <td> The list of supported validators is in the validator_types dictionary in <a href='https://github.com/galaxyproject/galaxy/tree/master/lib/galaxy/tools/parameters/validation.py'>~/lib/galaxy/tools/parameters/validation.py</a> </td>
    <td> yes </td>
    <td> <code>type="dataset_metadata_in_file"</code> </td>
  </tr>
  <tr>
    <td> message </td>
    <td> any string * </td>
    <td> The error message displayed on the tool form if validation fails </td>
    <td> no </td>
    <td> <code>message="Sequences are not currently available for the specified build</code>" </td>
  </tr>
  <tr>
    <td> filename </td>
    <td> the name of a file stored locally </td>
    <td> The file contains values for validation </td>
    <td> no </td>
    <td> <code>filename="alignseq.loc"</code> </td>
  </tr>
  <tr>
    <td> metadata_name </td>
    <td> a valid metadata attribute name * </td>
    <td> * The metadata attribute name </td>
    <td> no </td>
    <td> <code>metadata_name="dbkey"</code> </td>
  </tr>
  <tr>
    <td> metadata_column </td>
    <td> a number * </td>
    <td> * The column index in the file containing the values for validation </td>
    <td> no </td>
    <td> <code>metadata_column="0"</code> </td>
  </tr>
  <tr>
    <td> line_startswith </td>
    <td> a string * </td>
    <td> * Lines in the file being used for validation start with a this attribute value </td>
    <td> no </td>
    <td> <code>line_startswith="seq"</code> </td>
  </tr>
  <tr>
    <td> min </td>
    <td> a number * </td>
    <td> * Only when the "type" attribute value is "in_range" - the minimum number allowed </td>
    <td> no </td>
    <td> <code>min="0"</code> </td>
  </tr>
  <tr>
    <td> max </td>
    <td> a number * </td>
    <td> * Only when the "type" attribute value is "in_range" - the maximum number allowed </td>
    <td> no </td>
    <td> <code>max="50"</code> </td>
  </tr>
</table>


#### Example


```
#!highlight xml
<param format="bed" name="input1" type="data" label="Send this dataset to EpiGRAPH">
    <validator type="unspecified_build" />
</param>
```


#### Example


The genome build of the dataset must be stored in Galaxy clusters and the name of the genome ("`dbkey`") must be one of the values in the first column of file `alignseq.loc`.

```
#!highlight xml
<validator type="dataset_metadata_in_file" filename="alignseq.loc" metadata_name="dbkey" metadata_column="1" message="Sequences are not currently available for the specified build." split=" " line_startswith="seq" />
```



#### Example


Paths/names that downstream tools use in filenames may not contain ``..``

```
#!highlight xml
<validator type="expression" message="No two dots (..) allowed">'..' not in value</validator>
```


<br />
----



### <option> tag set
See [~/tools/filters/sorter.xml](https://github.com/galaxyproject/galaxy/tree/master/tools/filters/sorter.xml) for an example of how to use this tag set.  This tag set is optionally contained within the `<param>` tag when the "`type`" attribute value is "`select`" ( used for statically generated select lists ).

<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> value </td>
    <td> a string </td>
    <td> The value to be passed in the command line </td>
    <td> yes </td>
    <td> <code>value="0"</code> </td>
  </tr>
  <tr>
    <td> selected </td>
    <td> true </td>
    <td> The option selected as the default when the form is initially refreshed </td>
    <td> no </td>
    <td> <code>selected="true"</code> </td>
  </tr>
</table>



#### Example


```
#!highlight xml
<param name="col" type="select" label="From">
    <option value="0" selected="true">Column 1 / Sequence name</option>
    <option value="1">Column 2 / Source</option>
    <option value="2">Column 3 / Feature</option>
    <option value="6">Column 7 / Strand</option>
    <option value="7">Column 8 / Frame</option>
</param>
```

<br />
----

### <options> tag set
See [~/tools/extract/liftOver_wrapper.xml](https://github.com/galaxyproject/galaxy/tree/master/tools/extract/liftOver_wrapper.xml) for an example of how to use this tag set.  This tag set is optionally contained within the `<param>` tag when the "`type`" attribute value is "`select`" or "`data`" ( used for dynamically generated select lists ).  This tag set dynamically creates a list of options whose values can be obtained from a predefined file stored locally or a dataset selected from the current history.

<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> from_dataset </td>
    <td> the attribute name of the input dataset in the tool config </td>
    <td> The options for the select list are dynamically obtained from input dataset selected for the tool from the current history </td>
    <td> no </td>
    <td> <code>from_dataset="input1"</code> </td>
  </tr>
  <tr>
    <td> from_file </td>
    <td> the name of a file contain in the configured <a href='https://github.com/galaxyproject/galaxy/tree/master/tool-data'>tool_data_path</a> directory </td>
    <td> The options for the select list are dynamically obtained from a file </td>
    <td> no </td>
    <td> <code>from_file="alignseq.loc"</code> </td>
  </tr>
  <tr>
    <td> from_data_table </td>
    <td> the name of a table named in tool_data_table_conf.xml </td>
    <td> The options for the select list are dynamically obtained from a file specified in tool_data_table_conf.xml </td>
    <td> no </td>
    <td> <code>from_data_table="bowtie_indexes"</code> </td>
  </tr>
  <tr>
    <td> from_parameter </td>
    <td> a valid parameter name </td>
    <td> The options for the select list are dynamically obtained from a parameter </td>
    <td> no </td>
    <td> <code>from_parameter="tool.app.datatypes_registry.upload_file_formats"</code> </td>
  </tr>
</table>


#### Example


Select a database that is pre-formatted and cached in Galaxy clusters.  When a new dataset is available, it will be added to the local file named "`blastdb.loc`" and included in the options of the select list.  For a local instance, the file ("`blastdb.loc`" or "`alignseq.loc`") must be stored in the configured [tool_data_path](https://github.com/galaxyproject/galaxy/tree/master/tool-data) directory.  In this example, the option names and values are taken from column 0 of the file.

```
#!highlight xml
<param name="source_select" type="select" display="radio" label="Choose target database">
    <options from_file="blastdb.loc">
        <column name="name" index="0"/>
	<column name="value" index="0"/>
    </options>
</param>
```



#### Example


Show all of the species that are available in the dataset selected for the parameter named "`input1`".

```
#!highlight xml
<param name="species1" type="select" label="When Species" multiple="false">
    <options>
        <filter type="data_meta" ref="input1" key="species" />
    </options>
</param>
```


#### Example


Select datasets that are available in both the dataset selected for the parameter named "`input1`" and the `binned_scores.loc` file locally stored in the configured [tool_data_path](https://github.com/galaxyproject/galaxy/tree/master/tool-data) directory.

```
#!highlight xml
<param name="datasets" type="select" label="Available datasets" display="radio">
  <options from_file="binned_scores.loc">
     <column name="name" index="1"/>
     <column name="value" index="2"/>
     <column name="dbkey" index="0"/>
     <filter type="data_meta" ref="input1" key="dbkey" column="0" />
   </options>
</param>
```


#### Example


Use associated dynamic select lists where selecting an option in the first select list dynamically re-renders the options in the second select list.  In this example, we are populating both dynamic select lists from metadata elements associated with a tool’s single input dataset.  The 2 metadata elements we're using look like this.

```
MetadataElement( name="field_names", default=[], desc="Field names", readonly=True, optional=True, visible=True, no_value=[] )

# The keys in the field_components map to the list of field_names in the above element
# which ensures order for select list options that are built from it.
MetadataElement( name="field_components", default={}, desc="Field names and components", readonly=True, optional=True, visible=True, no_value={} )
```


Our tool config includes a code file tag like this.

```
#!highlight xml
<code file="tool_form_utils.py" /
```


Here are the relevant input parameters in our tool config.  The first parameter is the input dataset that includes the above metadata elements.

```
#!highlight xml
<param name="input" type="data" format="vtkascii,vtkbinary" label="Shape with uncolored surface field">
    <validator type="expression" message="Shape must have an uncolored surface field.">value is not None and len(value.metadata.field_names) > 0</validator>
</param>
```


The following parameter dynamically renders a select list consisting of the elements in the “field_names” metadata element associated with the selected input dataset.

```
#!highlight xml
<param name="field_name" type="select" label="Field name" refresh_on_change="True">
    <options>
        <filter type="data_meta" ref="input" key="field_names"/>
        <validator type="no_options" message="The selected shape has no uncolored surface fields." />
    </options>
</param>
```


The following parameter calls the “get_field_components_options() function in the “tool_form_utils.py” code file discussed above.  This function returns the value of the input dataset’s “field_components” metadata element dictionary whose key is the currently selected “field_name” from the select list parameter above.

```
#!highlight xml
<param name="field_component_index" type="select" label="Field component index" dynamic_options="get_field_components_options(input, field_name=field_name)" help="Color will be applied to the selected field's component associated with this index." />
```


Changing the selected option in the “field_name” select list will dynamically re-render the options available in the associated “field_component_index” select list, which is the behavior we want.

The “get_field_components_options() method looks like this.

```
def get_field_components_options( dataset, field_name ):
    options = []
    if dataset.metadata is None:
        return options
    if not hasattr( dataset.metadata, 'field_names' ):
        return options
    if dataset.metadata.field_names is None:
        return options
    if field_name is None:
        # The expression validator that helps populate the select list of input
        # datsets in the icqsol_color_surface_field tool does not filter out
        # datasets with no field field_names, so we need this check.
        if len( dataset.metadata.field_names ) == 0:
            return options
        field_name = dataset.metadata.field_names[0]
    field_components = dataset.metadata.field_components.get( field_name, [] )
    for i, field_component in enumerate( field_components ):
        options.append( ( field_component, field_component, i == 0 ) )
    return options
```



#### from_data_table
Basically, there are 3 steps to using from_data_table:

1. Modify tool_data_table_conf.xml to specify:
<div class='indent'>
```
    - The bowtie data table
    - The column types in the loc file
    - It should look something like this:
```

```
#!highlight xml
<table name="bowtie_indexes">
  <columns>name, value</columns>
  <file path="tool-data/bowtie_indices.loc" />
</table>
```

*When defining column names in data_tables, it is suggested that the use of special characters (e.g. hyphens) is avoided. This will allow simplified access to additional fields for a parameter value when e.g. building the command-line; for example if a 'path' value needs to be accessed, it could be done with a syntax of ${param.fields.path}.*
</div>

1. #2 Create/modify the loc file to correspond with the column types specified in tool_data_table_conf.xml (in this example, the loc file doesn't have to be changed), though we are going to be changing the specification to `<columns>value, dbkey, name, path</columns>`

1. Modify the Bowtie wrapper to use the data table instead of the loc file directly, replacing this:
<div class='indent'>
```
#!highlight xml
<options from_file="bowtie_indices.loc">
  <column name="value" index="1" />
  <column name="name" index="0" />
</options>
```


with this:

```
#!highlight xml
<options from_data_table="bowtie_indexes"/>
```

</div>

##### Example

Select a reference genome that is indexed for bowtie. (see [Bowtie wrapper](http://toolshed.g2.bx.psu.edu/repos/devteam/bowtie_wrappers/file/tip/bowtie_wrapper.xml))

```
#!highlight xml
<param name="index" type="select" label="Select a reference genome" help="if your genome of interest is not listed - contact Galaxy team">
     <options from_data_table="bowtie_indexes"/>
</param>
```

<br />
----

### <column> tag set
Optionally contained within an `<options>` tag set - displays columns of values from a file stored locally or a dataset in the current history.

<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> name</td>
    <td> a string * </td>
    <td> The valid name of the desired column </td>
    <td> yes </td>
    <td> <code>name="value"</code> </td>
  </tr>
  <tr>
    <td> index</td>
    <td> a number * </td>
    <td> The index of the column in the referenced file or history item </td>
    <td> yes </td>
    <td> <code>index="0"</code> </td>
  </tr>
</table>


#### Example


Show options from the dataset in the current history that has been selected as the value of the parameter named "`input1`".

```
#!highlight xml
<options from_dataset="input1">
    <column name="name" index="0"/>
    <column name="value" index="0"/>
</options>
```

<br />
----

### <filter> tag set
Optionally contained within an `<options>` tag set - filter out values obtained from a locally stored file or a dataset in the current history.

<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> type </td>
    <td> data_meta, param_value, static_value, unique_value, multiple_splitter, attribute_value_splitter, add_value, remove_value, sort_by </td>
    <td> The list of valid filter types is contained in the "filter_types" dictionary in the <a href='https://github.com/galaxyproject/galaxy/tree/master/lib/galaxy/tools/parameters/dynamic_options.py'>~/lib/galaxy/tools/parameters/dynamic_options.py</a> file </td>
    <td> yes </td>
    <td> <code>type="data_meta"</code> </td>
  </tr>
  <tr>
    <td> name </td>
    <td> a string </td>
    <td> The name of the filter </td>
    <td> no </td>
    <td> <code>name="dbkey"</code> </td>
  </tr>
  <tr>
    <td> column </td>
    <td> a number </td>
    <td> The column index (starting from 0) within the file that contains the values to be filtered </td>
    <td> no </td>
    <td> column="1" </td>
  </tr>
  <tr>
    <td> ref </td>
    <td> a string * </td>
    <td> * the attribute name of the reference file or input dataset </td>
    <td> no </td>
    <td> ref="input1" </td>
  </tr>
  <tr>
    <td> key </td>
    <td> a string * </td>
    <td> For type "data_meta", the name of the metadata key of ref to filter by  </td>
    <td> no </td>
    <td> <code>key="species"</code> </td>
  </tr>
  <tr>
    <td> multiple </td>
    <td> true, false </td>
    <td> For types "data_meta" and "remove_value", whether option values are multiple. Columns will be split by separator. Defaults to "false" </td>
    <td> no </td>
    <td> multiple="true" </td>
  </tr>
  <tr>
    <td> separator </td>
    <td> a string * </td>
    <td> * For types "data_meta", "multiple_splitter" and "remove_value", the column separator of the reference file or dataset. Defaults to "," </td>
    <td> no </td>
    <td> <code>separator=";"</code> </td>
  </tr>
</table>


#### Example


Filter values in dataset "`input`".

```
#!highlight xml
<param name="to_dbkey" type="select" label="To">
    <options from_file="liftOver.loc">
        <column name="name" index="1"/>
        <column name="value" index="2"/>
        <column name="dbkey" index="0"/>
        <filter type="data_meta" ref="input" key="dbkey" column="0" />
    </options>
</param>
```


#### Example


Show all options contained in the file "`encode_datasets.loc`", which is locally stored in the configured [tool_data_path](https://github.com/galaxyproject/galaxy/tree/master/tool-data) directory.

```
#!highlight xml
<options from_file="encode_datasets.loc">
    <column name="name" index="2"/>
    <column name="value" index="3"/>
    <column name="dbkey" index="1"/>
    <column name="encode_group" index="0"/>
    <column name="uid" index="3"/>
    <filter type="static_value" name="encode_group" value="ALD" column="0"/>
    <filter type="static_value" name="dbkey" value="hg17" column="1"/>
</options>
```

<br />
----

### <request_param_translation> tag set
See [~/tools/data_source/ucsc_tablebrowser.xml](https://github.com/galaxyproject/galaxy/tree/master/tools/data_source/ucsc_tablebrowser.xml) for an example of how to use this tag set.  This tag set is used only in "`data_source`" tools ( the "`tool_type`" attribute value is "`data_source`" ).  This tag set is contained within the `<param>` tag set - it contains a set of `<request_param>` tags.

### <request_param> tag set
Contained within the `<request_param_translation>` tag set ( used only in "`data_source`" tools ) - the external data source application may send back parameter names like "GENOME" which must be translated to "`dbkey`" in Galaxy.

<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> galaxy_name </td>
    <td> URL, dbkey, organism, table, description, name, info, data_type </td>
    <td> Each of these maps directly to a remote_name value </td>
    <td> yes </td>
    <td> <code>galaxy_name="URL"</code> </td>
  </tr>
  <tr>
    <td> remote_name </td>
    <td> a string * </td>
    <td> * The string representing the name of the parameter in the remote data source </td>
    <td> yes </td>
    <td> <code>remote_name="URL"</code> </td>
  </tr>
  <tr>
    <td> missing </td>
    <td> a string </td>
    <td> The default value to use for galaxy_name if the remote_name parameter is not included in the request </td>
    <td> yes </td>
    <td> <code>missing=""</code> </td>
  </tr>
</table>


#### Example


```
#!highlight xml
<request_param_translation>
    <request_param galaxy_name="organism" remote_name="org" missing="unknown species" />
</request_param_tranlsation>
```

<br />
----

### <append_param> tag set
Optionally contained within the `<request_param>` tag set if `galaxy_name="URL"` - some remote data sources ( e.g., Gbrowse, Biomart ) send parameters back to Galaxy in the initial response that must be added to the value of "`URL`" prior to Galaxy sending the secondary request to the remote data source via URL.

<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> separator </td>
    <td> a string * </td>
    <td> * The text to use to join the requested parameters together </td>
    <td> yes </td>
    <td> <code>separator="&amp;"</code> </td>
  </tr>
  <tr>
    <td> first_separator </td>
    <td> a string * </td>
    <td> * The text to use to join the request_param parameters to the first requested parameter </td>
    <td> no </td>
    <td> <code>first_separator="?"</code> </td>
  </tr>
  <tr>
    <td> join </td>
    <td> a string * </td>
    <td> * The text to use to join the param name to its value </td>
    <td> yes </td>
    <td> <code>join="="</code> </td>
  </tr>
</table>


----

### <value> tag set
Contained within the `<append_param>` tag set - allows for appending a param name / value pair to the value of `URL`.

<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> name </td>
    <td> a string * </td>
    <td> * Any valid HTTP request parameter name.  The name / value pair must be received from the remote data source and will be appended to the value of URL as something like "&_export=1" </td>
    <td> yes </td>
    <td> <code>name="_export"</code> </td>
  </tr>
  <tr>
    <td> missing </td>
    <td> a string * </td>
    <td> * Must be a valid HTTP request parameter value </td>
    <td> yes </td>
    <td> <code>missing="1"</code> </td>
  </tr>
</table>


#### Example


```
#!highlight xml
<request_param_translation>
    <request_param galaxy_name="URL" remote_name="URL" missing="">
        <append_param separator="&amp;" first_separator="?" join="=">
            <value name="_export" missing="1" />
        </append_param>
    </request_param>
</request_param_tranlsation>
```

<br />
----

### <value_translation> tag set
Optionally contained within the `<request_param>` tag set the parameter value received from a remote data source may be named differently in Galaxy, and this tag set allows for the value to be appropriately translated.

----

### <value> tag set
Contained within the `<value_translation>` tag set - allows for changing the data type value to something supported by Galaxy.

<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> galaxy_value </td>
    <td> a supported data type * </td>
    <td> * The target value. e.g. For setting data format: the list of supported data formats is contained in the <a href='https://github.com/galaxyproject/galaxy/tree/master/datatypes_conf.xml.sample'>~/config/datatypes_conf.xml.sample</a> file </td>
    <td> yes </td>
    <td> <code>galaxy_value="tabular"</code> </td>
  </tr>
  <tr>
    <td> remote_value </td>
    <td> a string * </td>
    <td> * The value supplied by the remote data source application </td>
    <td> yes </td>
    <td> <code>remote_value="selectedFields"</code> </td>
  </tr>
</table>


#### Example


```
#!highlight xml
<request_param_translation>
    <request_param galaxy_name="data_type" remote_name="hgta_outputType" missing="bed" >
        <value_translation>
            <value galaxy_value="tabular" remote_value="primaryTable" />
        </value_translation>
    </request_param>
</request_param_tranlsation>
```

<br />
----

### <sanitizer> tag set
See [~/tools/filters/grep.xml](https://github.com/galaxyproject/galaxy/tree/master/tools/filters/grep.xml) for an example of how to use this tag set.  This tag set is used to replace the basic parameter sanitization with custom directives.  This tag set is contained within the `<param>` tag set - it contains a set of `<valid>` and `<mapping>` tags.

<table>
  <tr>
    <th> property </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> sanitize </td>
    <td> True or False </td>
    <td> is this parameter sanitized </td>
    <td> no, default is True </td>
    <td> <code><sanitizer sanitize="True"/></code> </td>
  </tr>
  <tr>
    <td> invalid_char </td>
    <td> string </td>
    <td> character to replace invalid characters with </td>
    <td> no, default is X </td>
    <td> <code><sanitizer invalid_char="~"/></code> </td>
  </tr>
</table>


### <valid> tag set
Contained within the `<sanitizer>` tag set. Used to specify a list of allowed characters. Contains `<add>` and `<remove>` tags.

<table>
  <tr>
    <th> property </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> initial </td>
    <td> string </td>
    <td> initial characters to allow </td>
    <td> no, default is <code>string.letters + string.digits +" -=_.()/+*^,:?!"</code> </td>
    <td> <code><valid initial="none"></code> </td>
  </tr>
</table>


### <add> and <remove> tag set
Contained within the `<valid>` tag set. Used to add or remove individual characters or preset lists of characters. Character must not be allowed as a valid input for the mapping to occur. Preset lists include default and none as well as those available from [Python string constants](http://docs.python.org/2/library/string.html#string-constants) (e.g. `string.printable`).

<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> preset </td>
    <td> none, default or available from string </td>
    <td> Add or Remove these characters from the list of valid characters </td>
    <td> no </td>
    <td> <code><add preset="string.printable"/></code> or <code><remove preset="string.printable"/></code> </td>
  </tr>
  <tr>
    <td> value </td>
    <td> a character </td>
    <td> A character to add or remove from the list of valid characters </td>
    <td> no </td>
    <td> <code><remove value="&quot;"/></code> or <code><add value="&quot;"/></code> </td>
  </tr>
</table>


#### Example

```xml
  <param name="mystring" type="text" label="Say something interesting">
    <sanitizer invalid_char="">
      <valid initial="string.letters,string.digits"><add value="_" /> </valid>
    </sanitizer>
  </param>
```


### <mapping> tag set
Contained within the `<sanitizer>` tag set. Used to specify a mapping of disallowed character to replacement string. Contains `<add>` and `<remove>` tags.


<table>
  <tr>
    <th> property </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> initial </td>
    <td> string </td>
    <td> initial character mapping </td>
    <td> no, default is <code>galaxy.util.mapped_chars</code> </td>
    <td> <code><valid initial="none"></code> </td>
  </tr>
</table>


### <add> and <remove> tag set
Contained within the `<valid>` tag set. Used to add or remove individual characters or preset lists of characters. Character must not be allowed as a valid input for the mapping to occur. Preset lists include default and none as well as those available from `string.*` (e.g. string.printable).

<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> source </td>
    <td> a character </td>
    <td> Replace all occurrences of this character with the string of <code>target</code> </td>
    <td> no </td>
    <td> <code><add source="&quot;" target="\&quot;"/></code> or <code><remove source="&quot;"</code> </td>
  </tr>
  <tr>
    <td> target </td>
    <td> a string </td>
    <td> Replace all occurrences of <code>source</code> with this string </td>
    <td> no </td>
    <td> <code><add source="&quot;" target="\&quot;"/></code> </td>
  </tr>
</table>



#### Example


```
#!highlight xml
      <sanitizer>
        <valid initial="string.printable">
         <remove value="&apos;"/>
        </valid>
        <mapping initial="none">
          <add source="&apos;" target=""/>
        </mapping>
      </sanitizer>
```

<br />
----

### <configfiles> tag set
See [~/tools/maf/maf_filter.xml](https://github.com/galaxyproject/galaxy/tree/master/tools/maf/maf_filter.xml) for an example of how this tag set is used in a tool.  This tag set is a container for `<configfile>` tag sets - it defines an additional configuration section.

----

### <configfile> tag set
This tag set is contained within the `<configfiles>` tag set.  It allows for the creation of a temporary file for file-based parameter transfer.

<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> name </td>
    <td> a string * </td>
    <td> * This value is the parameter name of the configuration file </td>
    <td> yes </td>
    <td> <code>name="maf_filter_file"</code></td>
  </tr>
  <tr>
    <td> filename </td>
    <td> a string </td>
    <td> Specify the name of the configuration file to create </td>
    <td> no </td>
    <td> <code>filename="your_template.yaml"</code></td>
  </tr>
</table>


#### Example

The following is taken from the [~/tools/plotting/xy_plot.xml](https://github.com/galaxyproject/galaxy/tree/master/tools/plotting/xy_plot.xml) tool config.

```
#!highlight xml
<configfiles>
    <configfile name="script_file">
      ## Setup R error handling to go to stderr
      options( show.error.messages=F, error = function () { cat( geterrmessage(), file=stderr() ); q( "no", 1, F ) } )
      ## Determine range of all series in the plot
      xrange = c( NULL, NULL )
      yrange = c( NULL, NULL )
      #for $i, $s in enumerate( $series )
          s${i} = read.table( "${s.input.file_name}" )
          x${i} = s${i}[,${s.xcol}]
          y${i} = s${i}[,${s.ycol}]
          xrange = range( x${i}, xrange )
          yrange = range( y${i}, yrange )
      #end for
      ## Open output PDF file
      pdf( "${out_file1}" )
      ## Dummy plot for axis / labels
      plot( NULL, type="n", xlim=xrange, ylim=yrange, main="${main}", xlab="${xlab}", ylab="${ylab}" )
      ## Plot each series
      #for $i, $s in enumerate( $series )
          #if $s.series_type['type'] == "line"
              lines( x${i}, y${i}, lty=${s.series_type.lty}, lwd=${s.series_type.lwd}, col=${s.series_type.col} )
          #elif $s.series_type.type == "points"
              points( x${i}, y${i}, pch=${s.series_type.pch}, cex=${s.series_type.cex}, col=${s.series_type.col} )
          #end if
      #end for
      ## Close the PDF file
      devname = dev.off()
    </configfile>
</configfiles>
```

<br />
----
### <outputs> tag set
Container tag set for the `<data>` tag set.  The files created by tools as a result of their execution are named by Galaxy.  You specify the number and type of your output files using the contained `<data>` tags.  You must pass them to your tool executable through using line variables just like the parameters described in the previous sections.

----

### <data> tag set
This tag set is contained within the `<outputs>` tag set, and it defines the output data description for the files resulting from the tool's execution.  The value of the attribute "`label`" can be acquired from input parameters or metadata in the same way that the command line parameters are ( discussed in the `<command>` tag set section above ).

<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> name </td>
    <td> a string * </td>
    <td> * This attribute name must match the attribute name of the command line parameter defined for the output </td>
    <td> yes </td>
    <td> <code>name="output1"</code> </td>
  </tr>
  <tr>
    <td> format </td>
    <td> a supported data type </td>
    <td> This is the data type of the output file.  It can be one of the supported data types ( e.g., "tabular" ) or the format of the tool's input dataset ( i.e. format="input", deprecated in favour of the format_source attribute ) </td>
    <td> no </td>
    <td> <code>format="fasta"</code> </td>
  </tr>
  <tr>
    <td> format_source </td>
    <td> name of an input data parameter  </td>
    <td> This sets the data type of the output file to be the same format as that of a tool input dataset. Useful when there are multiple inputs to match. </td>
    <td> no </td>
    <td> <code>format_source="input2"</code> </td>
  </tr>
  <tr>
    <td> metadata_source </td>
    <td> value of the input data parameter </td>
    <td> This copies the metadata information from the tool's input dataset.  This is particularly useful for interval data types where the order of the columns is not set. </td>
    <td> no </td>
    <td> <code>metadata_source="input"</code> </td>
  </tr>
  <tr>
    <td> label </td>
    <td> a string </td>
    <td> This will be the label of the history item for the output data set.  The string can include structure like <code>${<some param name>.<some attribute>} </code>, as discussed for command line parameters in the <code><command></code> tag set section above. </td>
    <td> no </td>
    <td> <code>label="Blat on ${database.value_label} </code>" </td>
  </tr>
  <tr>
    <td> from_work_dir </td>
    <td> a string </td>
    <td> Relative path to a file produced by the tool in its working directory. Output's contents are set to this file's contents. </td>
    <td> no </td>
    <td> <code>from_work_dir="tool_output_file.txt"</code> </td>
  </tr>
  <tr>
    <td> hidden </td>
    <td> True, true, False, false </td>
    <td> Whether to hide dataset in the history view. </td>
    <td> no </td>
    <td> <code>hidden="True"</code> </td>
  </tr>
</table>

#### Example


The following will create a dataset in the history panel whose data type is the same as that of the input dataset selected for the tool.

```
#!highlight xml
<outputs>
    <data format="input" name="out_file1" metadata_source="input"/>
</outputs>
```


#### Example


The following will create datasets in the history panel, setting the output data type to be the same as that of an input dataset named by the "format_source" attribute.  Note that a conditional name is not included, so 2 separate conditional blocks should not contain parameters with the same name.

```
#!highlight xml
<inputs>
  <!-- fasta may be an aligned fasta that subclasses Fasta -->
  <param name="fasta" type="data" format="fasta" label="fasta - Sequences"/>
  <conditional name="qual">
   <param name="add" type="select" label="Trim based on a quality file?" help="">
    <option value="no">no</option>
    <option value="yes">yes</option>
   </param>
   <when value="no"/>
   <when value="yes">
    <!-- qual454, qualsolid, qualillumina -->
    <param name="qfile" type="data" format="qual" label="qfile - a quality file"/>
   </when>
  </conditional>
</inputs>
<outputs>
  <data format_source="fasta" name="trim_fasta" label="${tool.name} on ${on_string}: trim.fasta"/>
  <data format_source="qfile" name="trim_qual" label="${tool.name} on ${on_string}: trim.qual">
   <filter>(qual['add'] == 'yes')</filter>
  </data>
</outputs>
```



#### Example


The following will create a variable called `$out_file1` with data type "`pdf`".

```
#!highlight xml
<outputs>
    <data format="pdf" name="out_file1" />
</outputs>
```


#### Example


Assume that the tool includes an input parameter named "`database`" which is a select list ( e.g., assume the following inputs ):

```
#!highlight xml
<inputs>
    <param format="tabular" name="input" type="data" label="Input stuff"/>
    <param type="select" name="database" label="Database">
        <option value="alignseq.loc">Human (hg18)</option>
        <option value="faseq.loc">Fly (dm3)</option>
    </param>
</inputs>
```


Assume that the user selects the first option in the `$database` select list.  Then the following will ensure that the tool produces a tabular data set whose associated history item has the label "`Blat on Human (hg18)`".

```
#!highlight xml
<outputs>
    <data format="input" name="output" label="Blat on ${database.value_label}" />
</outputs>
```

<br />
----

### <change_format> tag set
See [~/tools/extract/extract_genomic_dna.xml](https://github.com/galaxyproject/galaxy/tree/master/tools/extract/extract_genomic_dna.xml) for an example of how this tag set is used in a tool.  This tag set is optionally contained within the `<data>` tag set and is the container tag set for the following `<when>` tag set.

----

### <when> tag set ( change_format )
If the data type of the output dataset is the specified type, the data type is changed to the desired type.

<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> input </td>
    <td> a string * </td>
    <td> * This value must be the attribute name of the desired input parameter </td>
    <td> yes </td>
    <td> <code>input="out_format"</code> </td>
  </tr>
  <tr>
    <td> value </td>
    <td> a string * </td>
    <td> * This value must also be an attribute name of an input parameter </td>
    <td> yes </td>
    <td> <code> value="interval"</code> </td>
  </tr>
  <tr>
    <td> format </td>
    <td> a string * </td>
    <td> * This value must be a supported data type </td>
    <td> yes </td>
    <td> <code>format="interval"</code> </td>
  </tr>
</table>


#### Example


Assume that your tool config includes the following select list parameter structure:

```
#!highlight xml
<param name="out_format" type="select" label="Output data type">
    <option value="fasta">FASTA</option>
    <option value="interval">Interval</option>
</param>
```


Then whenever the user selects the "`interval`"" option from the select list, the following structure in your tool config will override the `format="fasta"` setting in the `<data>` tag set with `format="interval"`.

```
#!highlight xml
<outputs>
    <data format="fasta" name="out_file1">
        <change_format>
            <when input="out_format" value="interval" format="interval" />
        </change_format>
    </data>
</outputs>
```

<br />
----

### <discover_datasets> tag set
See [Multiple Output Files#Number_of_Output_datasets_cannot_be_determined_until_tool_run](../Multiple Output Files.md#number_of_output_datasets_cannot_be_determined_until_tool_run) for tips to use multiple datasets including discovered datasets.
This tag set is optionally contained within the `<data>` tag set.

Code examples can be found at:
[~/test/functional/tools/multi_output.xml](https://github.com/galaxyproject/galaxy/tree/master/test/functional/tools/multi_output.xml)
[~/test/functional/tools/multi_output_assign_primary.xml](https://github.com/galaxyproject/galaxy/tree/master/test/functional/tools/multi_output_assign_primary.xml)
[~/test/functional/tools/multi_output_configured.xml](https://github.com/galaxyproject/galaxy/tree/master/test/functional/tools/multi_output_configured.xml)

----

### <actions> tag set
The <actions> in the Bowtie wrapper is used in lieu of the deprecated <code> tag to set the dbkey of the output dataset. In bowtie_wrapper.xml  (see below), according to the first action block, if the refGenomeSource.genomeSource is "indexed" (not "history"), then it will assign the dbkey of the output file to be the same as that of the reference file. It does this by looking at through the loc file and finding the line that has the value that's been selected in the index dropdown box as column 1 of the loc file entry and using the dbkey, in column 0 (ignoring comment lines (starting with #) along the way).

If refGenomeSource.genomeSource is "history", it resorts to default behavior for Galaxy, which is that the output is assigned the same value as the first input that has a dbkey specified.

The second block would not be needed for most cases--it is required here to handle the specific case of a small reference file we use for functional testing. It says that if the dbkey has been set to "equCab2chrM" (that's what the <filter type="metadata_value"... column="1" /> tag) does then it should be changed to "equCab2" (the <option type="from_param" ... column="0" ...> tag does).

#### Example

```
#!highlight xml
<actions>
   <conditional name="refGenomeSource.genomeSource">
      <when value="indexed">
           <action type="metadata" name="dbkey">
            <option type="from_file" name="bowtie_indices.loc" column="0" offset="0">
               <filter type="param_value" column="0" value="#" compare="startswith" keep="False"/>
               <filter type="param_value" ref="refGenomeSource.index" column="1"/>
            </option>
         </action>
       </when>
    </conditional>
    <!-- Special casing equCab2chrM to equCab2 -->
    <action type="metadata" name="dbkey">
        <option type="from_param" name="refGenomeSource.genomeSource" column="0" offset="0">
            <filter type="insert_column" column="0" value="equCab2chrM"/>
            <filter type="insert_column" column="0" value="equCab2"/>
            <filter type="metadata_value" ref="output" name="dbkey" column="1" />
        </option>
    </action>
</actions>
```

<br />
----

### <tests> tag set
Container tag set for the `<test>` tag sets. Any number of tests can be included, and each test is wrapped within separate `<test>` tag sets. Functional tests are executed via the [~/run_functional_tests.sh](https://github.com/galaxyproject/galaxy/tree/master/run_functional_tests.sh) shell script. See [/Admin/Tools/Writing Tests](/Admin/Tools/Writing Tests).

----

### <test> tag set
This tag set contains the necessary parameter values for executing the tool via the functional test framework.

#### Example


The following two tests will tool execute the [~/tools/filters/sorter.xml](https://github.com/galaxyproject/galaxy/tree/master/tools/filters/sorter.xml) tool.  Notice the way that the tool's inputs and outputs are defined.

```
#!highlight xml
  <tests>
    <test>
      <param name="input" value="1.bed"/>
      <param name="column" value="1"/>
      <param name="order" value="ASC"/>
      <param name="style" value="num"/>
      <output name="out_file1" file="sort1_num.bed"/>
    </test>
    <test>
      <param name="input" value="7.bed"/>
      <param name="column" value="1"/>
      <param name="order" value="ASC"/>
      <param name="style" value="alpha"/>
      <output name="out_file1" file="sort1_alpha.bed"/>
    </test>
  </tests>
```


#### Example


Test the execution of the MAF-to-FASTA converter ( [~/tools/maf/maf_to_fasta.xml](https://github.com/galaxyproject/galaxy/tree/master/tools/maf/maf_to_fasta.xml) ).

```
#!highlight xml
<tests>
    <test>
        <param name="input1" value="3.maf" ftype="maf"/>
        <param name="species" value="canFam1"/>
        <param name="fasta_type" value="concatenated"/>
        <output name="out_file1" file="cf_maf2fasta_concat.dat" ftype="fasta"/>
    </test>
</tests>
```


#### Example


This test demonstrates verifying specific properties about a test output instead of directly comparing it to another file. Here the `file` attribute is not specified and instead a series of assertions is made about the output.

```
#!highlight xml
<test>
    <param name="input" value="maf_stats_interval_in.dat" />
    <param name="lineNum" value="99999"/>
    <output name="out_file1">
        <assert_contents>
            <has_text text="chr7" />
            <not_has_text text="chr8" />
            <has_text_matching expression="1274\d+53" />
            <has_line_matching expression=".*\s+127489808\s+127494553" />
            <!-- &#009; is XML escape code for tab -->
            <has_line line="chr7&#009;127471195&#009;127489808" />
            <has_n_columns n="3" />
        </assert_contents>
    </output>
</test>
```

<br />
----

### <param> tag set (functional tests)
This tag set defines the tool's input parameters for executing the tool via the functional test framework.

<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> name </td>
    <td> name of an input parameter </td>
    <td> This value must match the name of the associated input parameter. </td>
    <td> yes </td>
    <td> <code>name="input1"</code> </td>
  </tr>
  <tr>
    <td> value </td>
    <td> a legal value of an input parameter </td>
    <td> This value must be one of the legal values that can be assigned to an input parameter. ( Note: If a select option starts with '-' the test value should be preceded by a '+', e.g. <option value="-snp" would be: <param value="+-snp" ) </td>
    <td> yes </td>
    <td> <code>value="3.maf"</code> </td>
  </tr>
  <tr>
    <td> ftype </td>
    <td> data type of the input file * </td>
    <td> * This attribute name should be included only with the parameter that defines the input dataset for the tool.  If this attribute name is not included, the functional test framework will attempt to determine the data type for the input dataset using the data type sniffers. </td>
    <td> no </td>
    <td> <code>ftype="maf"</code> </td>
  </tr>
</table>


#### Example


The following defines the four input values that are passed to the [~/tools/filters/sorter.xml](https://github.com/galaxyproject/galaxy/tree/master/tools/filters/sorter.xml) tool via functional test framework.

```
#!highlight xml
    <param name="input" value="7.bed"/>
    <param name="column" value="1"/>
    <param name="order" value="ASC"/>
    <param name="style" value="alpha"/>
```

<br />
----

### <output> tag set (functional tests)
This tag set defines the variable that names the output dataset for the functional test framework.  The functional test framework will execute the tool using the parameters defined in the `<param>` tag sets and generate a temporary file, which will either be compared with the file named in the "`file`" attribute value or checked against assertions made by a child `assert_contents` tag to verify that the tool is functionally correct.

<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> name </td>
    <td> parameter name of the output file </td>
    <td> This value is the same as the value of the "name" attribute of the <data> tag set contained within the tool's <outputs> tag set. </td>
    <td> yes </td>
    <td> <code>name="outfile_1"</code> </td>
  </tr>
  <tr>
    <td> file </td>
    <td> file name </td>
    <td> This value is the name of the output file stored in the <a href='https://github.com/galaxyproject/galaxy/tree/master/test-data'>~/test-data</a> directory which will be used to compare the results of executing the tool via the functional test framework </td>
    <td> yes </td>
    <td> <code>file="cf_maf2fasta_concat.dat"</code> </td>
  </tr>
</table>


----

### <assert_contents> tag set (functional tests)
This tag set defines a sequence of checks or assertions to run against an output dataset for the functional test framework. This tag requires no attributes, but child tags should be used to define the assertions to make about the output dataset. The functional test framework makes it easy to extend Galaxy with such tags, the following table summarizes many of the default assertion tags that come with Galaxy and examples of each can be found below.

<table>
  <tr>
    <th> tag </th>
    <th> description </th>
    <th> example </th>
  </tr>
  <tr>
    <td> <code>has_text</code> </td>
    <td> Asserts the specified <code>text</code> appears in the output. </td>
    <td> <code><has_text text="chr7"></code> </td>
  </tr>
  <tr>
    <td> <code>not_has_text</code> </td>
    <td> Asserts the specified <code>text</code> does not appear in the output. </td>
    <td> <code><not_has_text text="chr8" /> </code></td>
  </tr>
  <tr>
    <td> <code>has_text_matching</code> </td>
    <td> Asserts text matching the specified regular expression (<code>expression</code>) appears in the output. </td>
    <td> <code><has_text_matching expression="1274\d+53" /></code> </td>
  </tr>
  <tr>
    <td> <code>has_line_matching</code> </td>
    <td> Asserts a line matching the specified regular expression (<code>expression</code>) appears in the output. </td>
    <td> <code><has_line_matching expression=".*\s+127489808\s+127494553" /></code> </td>
  </tr>
  <tr>
    <td> <code>has_n_columns</code> </td>
    <td> Asserts tabular output contains the specified number (<code>n</code>) of columns. </td>
    <td> <code><has_n_columns n="3" /></code> </td>
  </tr>
  <tr>
    <td> <code>is_valid_xml</code> </td>
    <td> Asserts the output is a valid XML file. </td>
    <td> <code><is_valid_xml /></code> </td>
  </tr>
  <tr>
    <td> <code>has_element_with_path</code> </td>
    <td> Asserts the XML output contains at least one element (or tag) with the specified XPath-like <code>path</code>. </td>
    <td> <code><has_element_with_path path="BlastOutput_param/Parameters/Parameters_matrix" /></code> </td>
  </tr>
  <tr>
    <td> <code>has_n_elements_with_path</code> </td>
    <td> Asserts the XML output contains the specified number (<code>n</code>) of elements (or tags) with the specified XPath-like <code>path</code> </td>
    <td> <code><has_n_elements_with_path n="9" path="BlastOutput_iterations/Iteration/Iteration_hits/Hit/Hit_num" /></code> </td>
  </tr>
  <tr>
    <td> <code>element_text_is</code> </td>
    <td> Asserts the text of the XML element with the specified XPath-like <code>path</code> is the specified <code>text</code>. </td>
    <td> <code><element_text_is path="BlastOutput_program" text="blastp" /></code> </td>
  </tr>
  <tr>
    <td> <code>element_text_matches</code></td>
    <td> Asserts the text of the XML element with the specified XPath-like <code>path</code> matches the regular expression defined by <code>expression</code>. </td>
    <td> <code><element_text_matches path="BlastOutput_version" expression="BLASTP\s+2\.2.*" /></code> </td>
  </tr>
  <tr>
    <td> <code>attribute_is</code> </td>
    <td> Asserts the XML <code>attribute</code> for the element (or tag) with the specified XPath-like <code>path</code> is the specified <code>text</code>. </td>
    <td> <code><attribute_is path="outerElement/innerElement1" attribute="foo" text="bar" /></code> </td>
  </tr>
  <tr>
    <td> <code>attribute_matches</code> </td>
    <td> Asserts the XML <code>attribute</code> for the element (or tag) with the specified XPath-like <code>path</code> matches the regular expression specified by <code>expression</code> </td>
    <td> <code><attribute_matches path="outerElement/innerElement2" attribute="foo2" expression="bar\d+" /></code> </td>
  </tr>
  <tr>
    <td> <code>element_text</code> </td>
    <td> This tag allows the developer to recurisively specify additional assertions as child elements about just the text contained in the element specified by the XPath-like <code>path</code>. </td>
    <td> <code><element_text path="BlastOutput_iterations/Iteration/Iteration_hits/Hit/Hit_def"><not_has_text text="EDK72998.1" /></element_text></code> </td>
  </tr>
</table>



#### Example


```
#!highlight xml
<output name="out_file1">
    <assert_contents>
        <has_text text="chr7" />
        <not_has_text text="chr8" />
        <has_text_matching expression="1274\d+53" />
        <has_line_matching expression=".*\s+127489808\s+127494553" />
        <!-- &#009; is XML escape code for tab -->
        <has_line line="chr7&#009;127471195&#009;127489808" />
        <has_n_columns n="3" />
    </assert_contents>
</output>
```


#### Example


```
#!highlight xml
<output name="out_file1">
    <assert_contents>
        <is_valid_xml />
        <has_element_with_path path="BlastOutput_param/Parameters/Parameters_matrix" />
        <has_n_elements_with_path n="9" path="BlastOutput_iterations/Iteration/Iteration_hits/Hit/Hit_num" />
        <element_text_matches path="BlastOutput_version" expression="BLASTP\s+2\.2.*" />
        <element_text_is path="BlastOutput_program" text="blastp" />
        <element_text path="BlastOutput_iterations/Iteration/Iteration_hits/Hit/Hit_def">
            <not_has_text text="EDK72998.1" />
            <has_text_matching expression="ABK[\d\.]+" />
        </element_text>
    </assert_contents>
</output>
```


#### Example


```
#!highlight xml
<output name="out_file1">
    <assert_contents>
        <attribute_is path="outerElement/innerElement1" attribute="foo" text="bar" />
        <attribute_matches path="outerElement/innerElement2" attribute="foo2" expression="bar\d+" />
    </assert_contents>
</output>
```


----

### <page> tag set
This tag set is deprecated and not recommended for new tools. In older tools, if you needed to split your interface over multiple pages, you could do so by wrapping each page with a `<page></page>` tag and putting them in order in the XML file.

To create two-page interface:

```
#!highlight xml
<page>
    <!-- tag sets for the first page -->
</page>

<page>
    <!-- tag sets for the second page -->
</page>
```

<br />
----

### <code> tag set
**Deprecated** do not use this unless absolutely necessary.  This tag set provides detailed control of the way the tool is executed.  This (optional) code can be deployed in a separate file in the same directory as the tool's config file.  These hooks are being replaced by new tool config features and methods in the [~/lib/galaxy/tools/__init__.py](https://github.com/galaxyproject/galaxy/tree/master/lib/galaxy/tools/__init__.py) code file.

<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> file </td>
    <td> a string * </td>
    <td> This value is the name of the executable code file, and is called in the exec_before_process(), exec_before_job(), exec_after_process() and exec_after_job()( methods. </td>
    <td> yes </td>
    <td> <code>file="extract_genomic_dna_code.py</code>" </td>
  </tr>
</table>


#### Example

The following is taken from the [~/tools/new_operations/coverage.xml](https://github.com/galaxyproject/galaxy/tree/master/tools/new_operations/coverage.xml) tool config.

```
#!highlight xml
<code file="operation_filter.py"/>
```

<br />
----

### <requirements> tag set
See [~/tools/extract/phastOdds/phastOdds_tool.xml](https://github.com/galaxyproject/galaxy/tree/master/tools/extract/phastOdds/phastOdds_tool.xml) for an example of how this tag set is used in a tool.  This is a container tag set for the `<requirement>` tag set described below.

----

### <requirement> tag set
This tag set is contained within the `<requirements>` tag set.  Third party programs or modules that the tool depends upon (and which are not distributed with Galaxy) are included in this tag set.  The intention is that when Galaxy starts it can check whether the required programs or modules are available, and if not this tool will not be loaded. The Galaxy Tool Shed uses *package* requirements as part of the dependency management, see [Tool Shed dependency management](/ToolShedToolFeatures.md#automatic_third-party_tool_dependency_installation_and_compilation_with_installed_repositories).

<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> type </td>
    <td> package, set_environment </td>
    <td> This value defines the which type of the 3rd party module required by this tool </td>
    <td> yes </td>
    <td> <code>type="package"</code> </td>
  </tr>
  <tr>
    <td> version </td>
    <td> string </td>
    <td> Required for </em>package<em> type requirements </td>
    <td> no </td>
    <td> <code>0.0.18</code> </td>
  </tr>
</table>


<span style="font-size: smaller;">Note: Earlier versions of this page also listed 'python-module' and 'binary' as possible values for the 'type' attribute, but the current version of Galaxy appears to just ignore those requirement types. See [Tool Shed dependency management](/ToolShedToolFeatures.md#automatic_third-party_tool_dependency_installation_and_compilation_with_installed_repositories) on how to add such dependencies.</span>

#### Example


This example shows a tool that requires the samtools 0.0.18 package via the Tool Shed (see [Tool Shed dependency management](/ToolShedToolFeatures.md#automatic_third-party_tool_dependency_installation_and_compilation_with_installed_repositories)).

```
#!highlight xml
<requirements>
    <requirement type="package" version="0.1.18">samtools</requirement>
</requirements>
```



#### Example

This example shows a tool that requires R version 2.51.1. The tool_depensencies.xml should contain matching declarations for Galaxy to actually install the R runtime.

```
#!highlight xml
<requirements>
    <requirement type="set_environment">R_SCRIPT_PATH</requirement>
    <requirement type="package" version="2.15.1">R</requirement>
</requirements>
```


<br />
----
### <stdio>, <regex>, and <exit_code> tag sets
Tools write the bulk of useful data to datasets, but they can also write messages to standard I/O (stdio) channels known as standard output (stdout) and standard error (stderr). Both stdout and stderr are typically written to the executing program's console or terminal. Previous versions of Galaxy checked stderr for execution errors - if any text showed up on stderr, then the tool's execution was marked as failed. However, many tools write messages to stderr that are not errors, and using stderr allows programs to redirect other interesting messages to a separate file. Programs may also exit with codes that indicate success or failure. One convention is for programs to return 0 on success and a non-zero exit code on failure.

Galaxy currently supports using regular expressions to scan stdout and stderr, and it also allows exit codes to be scanned for ranges. The <stdio> tag has two subtags, <regex> and <exit_code>, to define regular expressions and exit code processing, respectively. They are defined below. If a tool does not have any valid <regex> or <exit_code> tags, then Galaxy will use the previous technique for finding errors - any text on stderr indicates an error, and neither stdout nor the tool's exit code will be checked.

A note should be made on the order in which exit codes and regular expressions are applied and how the processing stops. Exit code rules are applied before regular expression rules. The rationale is that exit codes are more clearly defined and are easier to check computationally, so they are applied first. (Feedback is welcome on this; the author has considered eliminating this constraint.) Exit code rules are applied in the order in which they appear in the tool's configuration file, and regular expressions are also applied in the order in which they appear in the tool's configuration file. However, once a rule is triggered that causes a fatal error, no further rules are checked.

Exit code ranges and output regular expressions are defined below.

#### <exit_code> tag set

Tools may use exit codes to indicate specific execution errors. Many programs use 0 to indicate success and non-zero exit codes to indicate errors. Galaxy allows each tool to specify exit codes that indicate errors. Each <exit_code> tag defines a range of exit codes, and each range can be associated with a description of the error (e.g., "Out of Memory", "Invalid Sequence File") and an error level. The description just describes the condition and can be anything. The error level is either a warning or a fatal error. A warning means that stderr will be updated with the error's description. A fatal error means that the tool's execution will be marked as having an error and the workflow will stop. Note that, if the error level is not supplied, then a fatal error is assumed to have occurred.

The exit code's range can be any consecutive group of integers. More advanced ranges, such as noncontiguous ranges, are currently not supported. Ranges can be specified in the form "m:n", where m is the start integer and n is the end integer. If ":n" is specified, then the exit code will be compared against all integers less than or equal to n. If "m:" is used, then the exit code will be compared against all integers greater than or equal to m. If the exit code matches, then the error level is applied and the error's description is added to stderr. If a tool's exit code does not match any of the supplied <exit_code> tags' ranges, then no errors are applied to the tool's execution.

Note that most Unix and Linux variants only support positive integers 0 to 255 for exit codes. If an exit code falls out of the range 0 to 255, the usual convention is to only use the lower 8 bits for the exit code. The only known exception is if a job is broken into subtasks using the tasks runner and one of those tasks is stopped with a POSIX signal. (Note that signals should be used as a last resort for terminating processes.) In those cases, the task will receive -1 times the signal number. For example, suppose that a job uses the tasks runner and 8 tasks are created for the job. If one of the tasks hangs, then a sysadmin may choose to send the "kill" signal, SIGKILL, to the process. In that case, the task (and its job) will exit with an exit code of -9.  More on POSIX signals can be found at [http://en.wikipedia.org/wiki/Unix_signal](http://en.wikipedia.org/wiki/Unix_signal) as well as man pages on "signal".

The <exit_code> tag's supported attributes are as follows:

* ***range***: This indicates the range of exit codes to check. The range can be one of the following:
  * *n*: the exit code will only be compared to n;
  * *[m:n]*: the exit code must be greater than or equal to m and less than or equal to n;
  * *[m:]*: the exit code must be greater than or equal to m;
  * *[:n]*: the exit code must be less than or equal to n.
* ***level***: This indicates the error level of the exit code. The level can have one of two values:
  * *warning*: If an exit code falls in the given range, then a description of the error will be added to the beginning of stderr. A warning-level error will not cause the tool to fail.
  * *fatal*: If an exit code falls in the given range, then a description of the error will be added to the beginning of stderr. A fatal-level error will cause the tool to fail. If no level is specified, then the fatal error level will be assumed to have occurred.
* ***description***: This is an optional description of the error that corresponds to the exit code.

The following is an example of the <exit_code> tag:

```
#!highlight xml
<stdio>
    <exit_code range="2"   level="fatal"   description="Out of Memory" />
    <exit_code range="3:5" level="warning" description="Low disk space" />
    <exit_code range="6:"  level="fatal"   description="Bad input dataset" />
</stdio>
```


If the tool returns 0 or 1, then the tool will not be marked as having an error. If the exit code is 2, then the tool will fail with the description "Out of Memory" added to stderr. If the tool returns 3, 4, or 5, then the tool will not be marked as having failed, but "Low disk space" will be added to stderr. Finally, if the tool returns any number greater than or equal to 6, then the description "Bad input dataset" will be added to stderr and the tool will be marked as having failed.

#### <regex> tag set

A regular expression defines a pattern of characters. The patterns include the following:

* GCTA, which matches on the fixed string "GCTA";
* [abcd], which matches on the characters a, b, c, or d;
* [CG]{12}, which matches on 12 consecutive characters that are C or G;
* a.*z, which matches on the character "a", followed by 0 or more characters of any type, followed by a "z";
* ^X, which matches the letter X at the beginning of a string;
* Y$, which matches the letter Y at the end of a string.

There are many more possible regular expressions. A reference to all supported regular expressions can be found under [Python Regular Expression Syntax](http://docs.python.org/library/re.html#regular-expression-syntax).

A regular expression includes the following attributes:
* ***source***: This tells whether the regular expression should be matched against stdout, stderr, or both. If this attribute is missing or is incorrect, then both stdout and stderr will be checked. The source can be one of the follwing values:
  * *stdout*: the regular expression will be applied to stdout;
  * *stderr*: the regular expression will be applied to stderr;
  * *both*: the regular expression will be applied to both stderr and stdout (which is the default case).
* ***match***: This is the regular expression that will be used to match against stdout and/or stderr. If the <regex> tag does not contain the *match* attribute, then the <regex> tag will be ignored. The regular expression can be any valid Python regular expression. All regular expressions are performed case insensitively. For example, if *match* contains the regular expression "actg", then the regular expression will match against "actg", "ACTG", "!AcTg", and so on. Also note that, if double quotes (") are to be used in the *match* attribute, then the value &quot; can be used in place of double quotes. Likewise, if single quotes (') are to be used in the *match* attribute, then the value &apos; can be used if necessary.
* ***level***: This works very similarly to the <exit_code> tag, except that, when a regular expression matches against its source, the description is added to the beginning of the source. For example, if stdout matches on a regular expression, then the regular expression's description is added to the beginning of stdout (instead of stderr). The *level* can be *log*, *warning* or *fatal* as described below.
  * *log* and *warning*: If the regular expression matches against its source input (i.e., stdout and/or stderr), then a description of the error will be added to the beginning of the source, prepended with either 'Log:' or 'Warning:'. A log-level/warning-level error will not cause the tool to fail.
  * *fatal*: If the regular expression matches against its source input, then a description of the error will be added to the beginning of the source. A fatal-level error will cause the tool to fail. If no level is specified, then the fatal error level will be assumed to have occurred.
* ***description***: Just like its <exit_code> counterpart, this is an optional description of the regular expression that has matched.

The following is an example of regular expressions that may be used:

```
#!highlight xml
<stdio>
    <regex match="low space"
           source="both"
           level="warning"
           description="Low space on device" />
    <regex match="error"
           source="stdout"
           level="fatal"
           description="Unknown error encountered" />
    <regex match="[CG]{12}"
           description="Fatal error - CG island 12 nts long found" />
    <regex match="^Branch A"
           level="warning"
           description="Branch A was taken in execution" />
</stdio>
```


The regular expression matching proceeds as follows. First, if either stdout or stderr match on "low space", then a warning is registered. If stdout contained the string "---LOW SPACE---", then stdout has the string "Warning: Low space on device" added to its beginning. The same goes for if stderr had contained the string "low space". Since only a warning could have occurred, the processing continues.

Next, the regular expression "error" is matched only against stdout. If stdout contains the string "error" regardless of its capitalization, then a fatal error has occurred and the processing stops. In that case, stdout would be prepended with the string "Fatal: Unknown error encountered". Note that, if stderr contained "error", "ERROR", or "!ErRor" then it would not matter - stderr was not being scanned.

If the second regular expression did not match, then the third regular expression is checked. The third regular expression does not contain an error level, so an error level of "fatal" is assumed. The third regular expression also does not contain a source, so both stdout and stderr are checked. The third regular expression looks for 12 consecutive "C"s or "G"s in any order and in uppercase or lowercase. If stdout contained "cgccGGCCcGGcG" or stderr contained "CCCCCCgggGGG", then the regular expression would match, the tool would be marked with a fatal error, and the stream that contained the 12-nucleotide CG island would be prepended with "Fatal: Fatal error - CG island 12 nts long found".

Finally, if the tool did not match any of the fatal errors, then the fourth regular expression is checked. Since no source is specified, both stdout and stderr are checked. If "Branch A" is at the beginning of stdout or stderr, then a warning will be registered and the source that contained "Branch A" will be prepended with the warning "Warning: Branch A was taken in execution".
----

### <help> tag set
This tag set includes all of the necessary details of how to use the tool.  This tag set should be included as the last tag set in the tool config. Tool help is written in reStructuredText. Included here is only an overview of a subset of features.  For more information see [http://docutils.sourceforge.net/docs/ref/rst/restructuredtext.html](http://docutils.sourceforge.net/docs/ref/rst/restructuredtext.html).

<table>
  <tr>
    <th> tag </th>
    <th> details </th>
  </tr>
  <tr>
    <td> <code>.. class:: warningmark</code> </td>
    <td> a yellow warning symbol </td>
  </tr>
  <tr>
    <td> <code>.. class:: infomark</code> </td>
    <td> a blue information symbol </td>
  </tr>
  <tr>
    <td> <code>.. image:: path-of-the-file.png :height: 500 :width: 600</code> </td>
    <td> insert a png file of height 500 and width 600 at this position </td>
  </tr>
  <tr>
    <td> <code>**bold**</code> </td>
    <td> <strong>bold</strong> </td>
  </tr>
  <tr>
    <td> <code>*italic*</code> </td>
    <td> </em>italic<em> </td>
  </tr>
  <tr>
    <td> * </td>
    <td> list </td>
  </tr>
  <tr>
    <td> - </td>
    <td> list </td>
  </tr>
  <tr>
    <td> :: </td>
    <td> paragraph </td>
  </tr>
  <tr>
    <td> <code>-----</code> </td>
    <td> a horizontal line </td>
  </tr>
</table>


#### Example


Show a warning sign to remind users that this tool accept fasta format files only, followed by an example of the query sequence and a figure.

```
#!highlight rst
<help>

.. class:: warningmark

**TIP** This tool requires *fasta* format.

----

**Example**

Query sequence::
    >seq1
    >ATCG...

.. image:: my_figure.png
    :height: 500
    :width: 600

</help>
```


#### Best Practice

From [/Tools/BestPractices](/Tools/BestPractices): 

The help tag should be started and finished by a CDATA tag.
```
#!highlight xml
<help> <![CDATA[      your lines of restructuredText here      ]]> </help>
```

(http://en.wikipedia.org/wiki/CDATA)

### <citations> tag set

Tool files may declare one `citations` element. Each `citations` element can contain one or more `citation` tag elements - each of which specifies tool citation information using either a DOI or a BibTeX entry.

These citations will appear at the bottom of the tool form in a formatted way but the user will have to option to select RAW BibTeX for copying and pasting as well. Likewise, the history menu includes an option allowing users to aggregate all such citations across an analysis in a list of citations.

BibTeX entries for citations annotated with DOIs will be fetched by Galaxy from http://dx.doi.org/ and cached.

```
#!highlight xml
 <citations>
    <!-- Example of annotating a citation using a DOI. -->
    <citation type="doi">10.1093/bioinformatics/btq281</citation>

    <!-- Example of annotating a citation using a BibTex entry. -->
    <citation type="bibtex">@ARTICLE{Kim07aninterior-point,
    author = {Seung-jean Kim and Kwangmoo Koh and Michael Lustig and Stephen Boyd and Dimitry Gorinevsky},
    title = {An interior-point method for large-scale l1-regularized logistic regression},
    journal = {Journal of Machine Learning Research},
    year = {2007},
    volume = {8},
    pages = {1519-1555}
    }</citation>
  </citations>
```


For more implementation information see [the pull request adding this feature](https://bitbucket.org/galaxy/galaxy-central/pull-request/440/initial-bibtex-doi-citation-support-in). For more examples of how to add this to tools checkout the following changesets adding this to the [NCBI BLAST+ suite](https://github.com/peterjc/galaxy_blast/commit/9d2e3906915895765ecc3f48421b91fabf2ccd8b), [phenotype association tools](https://bitbucket.org/galaxy/galaxy-central/commits/39c983151fe328ff5d415f6da81ce5b21a7e18a4), [MAF suite](https://bitbucket.org/galaxy/galaxy-central/commits/60f63d6d4cb7b73286f3c747e8acaa475e4b6fa8), and [MACS2 suite](https://github.com/jmchilton/galaxytools/commit/184971dea73e236f11e82b77adb5cab615b8391b).

This feature was added to the August 2014 release of Galaxy, tools annotated with citations will work in older releases of Galaxy but no citation information will be available to the end user.


### <section> tag set

This tag is used to group parameters into sections of the interface. Sections are implemented to replace the commonly used tactic of hiding advanced options behind a conditional, with sections you can easily visually group a related set of options.

The XML configuration is relatively trivial for sections:

```
#!highlight xml
 <inputs>
  <section name="adv" title="Advanced Options" expanded="False">
    <param name="plot_color" type="color" label="Track color" />
  </section>
 </inputs>
```


In your command template, you'll need to include the section name to access the variable:

```
#!highlight cheetah
--color $adv.plot_color
```



<table>
  <tr>
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
  </tr>
  <tr>
    <td> name </td>
    <td> string </td>
    <td> The internal key used for the section </td>
    <td> yes </td>
    <td> <code>name="advanced_options"</code> </td>
  </tr>
  <tr>
    <td> title </td>
    <td> string </td>
    <td> Human readable label for the section </td>
    <td> no </td>
    <td> <code>title="Advanced Options"</code> </td>
  </tr>
  <tr>
    <td> expanded </td>
    <td> boolean </td>
    <td> Whether the section should be expanded by default or not. If not, the default set values are used </td>
    <td> no </td>
    <td> <code>expanded="True"</code> </td>
  </tr>
</table>


Further examples can be found in the [Test case](https://github.com/guerler/galaxy/blob/ec0fa276fa45feaf8a2a80424ccf43307f5902ab/test/functional/tools/section.xml) from the [original PR](https://github.com/galaxyproject/galaxy/pull/35)

## Reusing Repeated Configuration Elements

Frequently, tools may require the same XML fragments be repeated in a file (for instance similar conditional branches, repeated options, etc...) or between tools in the same repository (for instance, nearly all of the GATK tools contain the same standard options). As of the April 1st, 2013 release of Galaxy a macroing system has been implemented to begin to address this problem.

### Direct XML Macros

The following examples are taken from [Pull Request 129](https://bitbucket.org/galaxy/galaxy-central/pull-request/129) the initial implementation. Prior to to the inclusion of macros, the ```tophat2``` wrapper defined several outputs each which had the following identical actions block associated with them:

```
#!highlight xml
            <actions>
              <conditional name="refGenomeSource.genomeSource">
                <when value="indexed">
                  <action type="metadata" name="dbkey">
                    <option type="from_data_table" name="tophat2_indexes" column="1" offset="0">
                      <filter type="param_value" column="0" value="#" compare="startswith" keep="False"/>
                      <filter type="param_value" ref="refGenomeSource.index" column="0"/>
                    </option>
                  </action>
                </when>
                <when value="history">
                  <action type="metadata" name="dbkey">
                    <option type="from_param" name="refGenomeSource.ownFile" param_attribute="dbkey" />
                  </action>
                </when>
              </conditional>
            </actions>
```


To reuse this action definition, first a macros section has been defined in the ```tophat2_wrpper.xml``` file.

```
#!highlight xml
<tool>
   ...
   <macros>
     <xml name="dbKeyActions">
       <action><!-- Whole big example above. -->
         ....
       </action>
     </xml>
   </macros>
```


With this in place, each output data element can include this block using the ```expand``` XML element as follows:

```
#!highlight xml
        <data format="bed" name="insertions" label="${tool.name} on ${on_string}: insertions" from_work_dir="tophat_out/insertions.bed">
            <expand macro="dbKeyActions" />
        </data>
        <data format="bed" name="deletions" label="${tool.name} on ${on_string}: deletions" from_work_dir="tophat_out/deletions.bed">
          <expand macro="dbKeyActions" />
        </data>
        <data format="bed" name="junctions" label="${tool.name} on ${on_string}: splice junctions" from_work_dir="tophat_out/junctions.bed">
          <expand macro="dbKeyActions" />
        </data>
        <data format="bam" name="accepted_hits" label="${tool.name} on ${on_string}: accepted_hits" from_work_dir="tophat_out/accepted_hits.bam">
          <expand macro="dbKeyActions" />
        </data>
```


This has reduced the size of the XML file by dozens of lines and reduces the long term maintenance associated with copied and pasted code.

### Imported Macros

The ```macros``` element described above, can also contain any number of ```import``` elements. This allows a directory/repository of tool XML files to contain shared macro definitions that can be used by any number of actual tool files in that directory/repository.

Revisiting the tophat example, all three tophat wrappers (```tophat_wrapper.xml```, ```tophat_color_wrapper.xml```, and ```tophat2_wrapper.xml```) share some common functionality. To reuse XML elements between these files, a ```tophat_macros.xml``` file was added to that directory. The following block is a simplified version of that macros file's contents:

```
#!highlight xml
<macros>
  <xml name="own_junctionsConditional">
    <conditional name="own_junctions">
      <param name="use_junctions" type="select" label="Use Own Junctions">
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </param>
      <when value="Yes">
        <conditional name="gene_model_ann">
          <param name="use_annotations" type="select" label="Use Gene Annotation Model">
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </param>
          <when value="No" />
          <when value="Yes">
            <param format="gtf,gff3" name="gene_annotation_model" type="data" label="Gene Model Annotations" help="TopHat will use the exon records in this file to build a set of known splice junctions for each gene, and will attempt to align reads to these junctions even if they would not normally be covered by the initial mapping."/>
          </when>
        </conditional>
        <expand macro="raw_juncsConditional" />
        <expand macro="no_novel_juncsParam" />
      </when>
      <when value="No" />
    </conditional> <!-- /own_junctions -->
  </xml>
  <xml name="raw_juncsConditional">
    <conditional name="raw_juncs">
      <param name="use_juncs" type="select" label="Use Raw Junctions">
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </param>
      <when value="No" />
      <when value="Yes">
        <param format="interval" name="raw_juncs" type="data" label="Raw Junctions" help="Supply TopHat with a list of raw junctions. Junctions are specified one per line, in a tab-delimited format. Records look like: [chrom] [left] [right] [+/-] left and right are zero-based coordinates, and specify the last character of the left sequenced to be spliced to the first character of the right sequence, inclusive."/>
      </when>
    </conditional>
  </xml>
  <xml name="no_novel_juncsParam">
    <param name="no_novel_juncs" type="select" label="Only look for supplied junctions">
      <option value="No">No</option>
      <option value="Yes">Yes</option>
    </param>
  </xml>
</macros>
```


Any tool definition in that directory can use the macros contained therein once imported as shown below.

```
#!highlight xml
<tool>
  ...
  <macros>
    <import>tophat_macros.xml</import>
  </macros>
  ...
  <inputs>
    <expand macro="own_junctionsConditional" />
    ...

```


This example also demonstrates that macros may themselves expand macros (though due to a bug in the original implementation this only works to a depth of 1 - i.e. a macro may not expand a macro that expands a macro, Pull Request #140 (not merged into Galaxy) fixes this).

### Parameterizing XML Macros

In some cases, tools may contain similar though not exact same definitions. Some parameterization can be performed by declaring ```expand``` elements with child elements and expanding them in the macro definition with a ```yield``` element.

For instance, previously the tophat wrapper contained the following definition:

```
#!highlight xml
        <conditional name="refGenomeSource">
          <param name="genomeSource" type="select" label="Will you select a reference genome from your history or use a built-in index?" help="Built-ins were indexed using default options">
            <option value="indexed">Use a built-in index</option>
            <option value="history">Use one from the history</option>
          </param>
          <when value="indexed">
            <param name="index" type="select" label="Select a reference genome" help="If your genome of interest is not listed, contact the Galaxy team">
              <options from_data_table="tophat_indexes_color">
                <filter type="sort_by" column="2"/>
                <validator type="no_options" message="No indexes are available for the selected input dataset"/>
              </options>
            </param>
          </when>
          <when value="history">
            <param name="ownFile" type="data" format="fasta" metadata_name="dbkey" label="Select the reference genome" />
          </when>  <!-- history -->
        </conditional>  <!-- refGenomeSource -->
```


and the tophat2 wrapper contained the highly analogous definition:

```
#!highlight xml
        <conditional name="refGenomeSource">
          <param name="genomeSource" type="select" label="Will you select a reference genome from your history or use a built-in index?" help="Built-ins were indexed using default options">
            <option value="indexed">Use a built-in index</option>
            <option value="history">Use one from the history</option>
          </param>
          <when value="indexed">
            <param name="index" type="select" label="Select a reference genome" help="If your genome of interest is not listed, contact the Galaxy team">
              <options from_data_table="tophat2_indexes_color">
                <filter type="sort_by" column="2"/>
                <validator type="no_options" message="No indexes are available for the selected input dataset"/>
              </options>
            </param>
          </when>
          <when value="history">
            <param name="ownFile" type="data" format="fasta" metadata_name="dbkey" label="Select the reference genome" />
          </when>  <!-- history -->
        </conditional>  <!-- refGenomeSource -->
```


These blocks differ only in the from_data_table attribute on the ```options``` element. To capture this pattern, ```tophat_macros.xml``` contains the following macro definition:

```
#!highlight xml
  <xml name="refGenomeSourceConditional">
    <conditional name="refGenomeSource">
      <param name="genomeSource" type="select" label="Use a built in reference genome or own from your history" help="Built-ins genomes were created using default options">
        <option value="indexed" selected="True">Use a built-in genome</option>
        <option value="history">Use a genome from history</option>
      </param>
      <when value="indexed">
        <param name="index" type="select" label="Select a reference genome" help="If your genome of interest is not listed, contact the Galaxy team">
          <yield />
        </param>
      </when>
      <when value="history">
        <param name="ownFile" type="data" format="fasta" metadata_name="dbkey" label="Select the reference genome" />
      </when>  <!-- history -->
    </conditional>  <!-- refGenomeSource -->
  </xml>
```


Notice the ```yield``` statement in lieu of an ```options``` declaration. This allows the nested ```options``` element to be declared when expanding the macro:

The following ```expand``` declarations have replaced the original ```conditional``` elements.

```
#!highlight xml
        <expand macro="refGenomeSourceConditional">
          <options from_data_table="tophat_indexes">
            <filter type="sort_by" column="2"/>
            <validator type="no_options" message="No genomes are available for the selected input dataset"/>
          </options>
        </expand>
```


```
#!highlight xml
        <expand macro="refGenomeSourceConditional">
          <options from_data_table="tophat2_indexes">
            <filter type="sort_by" column="2"/>
            <validator type="no_options" message="No genomes are available for the selected input dataset"/>
          </options>
        </expand>
```


### Macro Token
You can use
```
#!highlight xml
<token name="@IS_PART_OF_VCFLIB@">is a part of VCFlib toolkit developed by Erik Garrison (https://github.com/ekg/vcflib).</token>
```

and then call the token within the file like this
```
#!highlight xml
Vcfallelicprimitives @IS_PART_OF_VCFLIB@
```

## Miscellaneous tips and tricks

If you need to label a dataset with its real name (as displayed in the history)
```
<outputs>
   <data name="output" format="tabular" label="SEQLEN of ${input1.name}" />
</outputs>
```


If you need to find out about the data type of a dataset (here exemplified by putting it in a configfile)
```
<configfiles>
   <configfile name="parametersfile">
      input1_datatype == ${input1.ext}
   </configfile>
</configfiles>
```


If you want to use XSD to validate your tool XML you can try the following project by Jean-Frédéric: https://github.com/JeanFred/Galaxy-XSD
