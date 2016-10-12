---
autotoc: true
---
# Galaxy Data Manager XML File
---

The XML File for a Galaxy Data Manager, generally referred to as the "data manager config file", serves a number of purposes.  It defines the availability of Data Managers to a Galaxy instance. It does this by specifying the id of the Data Manager and the Data Manager tool that is associated with it. It also contains a listing of the Tool Data Tables that can be added to by the Data Manager. It also specifies how to manipulate the raw column values provided by the Data Manager Tool and under what directory structure to place the finalized data values. 

Pay attention to the following when creating a new Data Manager:

1. **Make sure your XML is valid** - Improper XML will most likely cause Galaxy to not load your Data Managers. The easiest way to validate your XML is just to open the XML file itself in e.g. [Firefox](http://www.mozilla.com/), which will either parse the file and display it, or show the error and its location in large letters.
1. **Don't forget to restart Galaxy** - Galaxy loads and parses XML at run-time, which means you'll have to restart it after updating any XML files. The same does not apply if you only update an executable.
1. **Make sure you use an id that is unique within your Galaxy instance** - Galaxy can only load one Data Manager having an the same ID at a single time.
1. **When completed, make your Data Manager available in a ToolShed and install it from there** - This will avoid any possible collisions due to non-unique IDs, as specialized name-spacing is utilized when Data Managers are installed from a ToolShed.

A Galaxy Data Manager's config file consists of a subset of the following XML tag sets - each of these is described in detail in the following sections.



## Details of XML tag sets
---
### <data_managers> tag set
The outer-most tag set. It contains no attributes. Any number of <data_manager> tags can be included within it.

---

### <data_manager> tag set

This tag defines a particular Data Manager. Any number of <data_table> tags can be included within it.

| attribute |  values  |  details  |  required  |  example  | 
| --------- | ------- | -------- | --------- | -------- | 
| tool_file |  a string *  |  This is the filename of the Data Manager Tool's XML file, relative to the Galaxy Root. Multiple Data Managers can use the same Tool, but doing so would require "id" to be declared. |  yes  |  `tool_file="data_manager/twobit_builder.xml"`  | 
| id |  a string *  |  Must be unique across all Data Managers; should be lowercase and contain only letters, numbers, and underscores.  While technically optional, it is a best-practice to specify this value. When not specified, it will use the id of the underlying Data Manager Tool.  |  no  |  `id="twobit_builder"`  | 


#### Example

The following is an example that contains all of the attributes described above.
```
#!highlight xml
<data_manager tool_file="data_manager/twobit_builder.xml" id="twobit_builder">
```

<br />

---

### <data_table> tag set

This tag defines a Tool Data Table to add entries to. Any number of <data_table> tags can be used. Each <data_table> tag will contain an <output> tagset. 

| attribute |  values  |  details  |  required  |  example  | 
| --------- | ------- | -------- | --------- | -------- | 
| name |  a string *  |  This is the name of the Tool Data Table. |  yes  |  `name="twobit"`  | 

#### Example

The following is an example that contains all of the attributes described above.
```
#!highlight xml
<data_table name="twobit">
```

<br />

---

### <output> tag set

This tag defines how to handle the output of the Data Manager Tool. It has no attributes, but contains one or more <column> tag sets.

#### Example

The following is an example that contains all of the attributes described above.
```
#!highlight xml
<output>
```

<br />

---

### <column> tag set

This tag defines a particular Tool Data Table column that will be set. Any number of <column> tags can be used. Each <column> tag may contain <move> and / or <value_translation> tagsets, which are optional. 

| attribute |  values  |  details  |  required  |  example  | 
| --------- | ------- | -------- | --------- | -------- | 
| name |  a string *  |  This is the name of Tool Data Table column. |  yes  |  `name="value"`  | 
| output_ref |  a string *  |  Name of the Data Manager Tool's output file to use for additional processing within e.. a <move> tag. |  no  |  `output_ref="out_file"`  | 

#### Example

The following is an example that contains all of the attributes described above.
```
#!highlight xml
<column name="path" output_ref="out_file" >
```

<br />

---

### <move> tag set

This tag defines how to handle moving files from within the Data Manager Tool output's extra_files_path into the final storage location used for the Tool Data Table entry. Individual files or the entire directory contents can be moved. Move tag sets contain a <source> and a <target> tag set.

| attribute |  values  |  details  |  required  |  example  | 
| --------- | ------- | -------- | --------- | -------- | 
| type |  a string *  |  This can be either 'file' or 'directory'. Default is 'directory'. |  no  |  `<move type="file">`  | 
| relativize_symlinks |  True or False  |  Whether or not to relativize created existing symlinks in moved target. Default is False. |  no  |  `relativize_symlinks="True"`  | 

#### Example

The following is an example that contains all of the attributes described above.
```
#!highlight xml
<move type="file" relativize_symlinks="False">
```

<br />

---

### <source> tag set

This tag defines the source location within a <move> tag set. When not specified, it defaults to the entire extra_files_path of the output reference dataset.

| attribute |  values  |  details  |  required  |  example  | 
| --------- | ------- | -------- | --------- | -------- | 
| base |  a string Template  |  The base/root path to use for the source. When not provided, it defaults to the extra_files_path of the output dataset. |  no  |  `<move type="file">`  | 
| TEXT |  a string Template  |  This defines the value of the source, relative to the *base* |  no  |  `<source>${path}</source>`  | 

#### Example

The following is an example that contains the most common usage, where the value provided by the Data Manager Tool, relative to the extra_files_path, is used as the source.
```
#!highlight xml
<source>${path}</source>
```

<br />

---

### <target> tag set

This tag defines the target location within a <move> tag set. When not specified, it defaults to the *galaxy_data_manager_data_path* configuration value.

| attribute |  values  |  details  |  required  |  example  | 
| --------- | ------- | -------- | --------- | -------- | 
| base |  a string Template  |  The base/root path to use for the target. When not specified, it defaults to the *galaxy_data_manager_data_path* configuration value. |  no  |  `<move type="file">`  | 
| TEXT |  a string Template  |  This defines the value of the target (destination), relative to the *base* |  no  |  `<target base="${GALAXY_DATA_MANAGER_DATA_PATH}">${dbkey}/seq/${path}</target>`  | 

#### Example

The following is an example that contains a common usage, where a target value is constructed using several of the values provided by the Data Manager Tool, relative to the *galaxy_data_manager_data_path*, is used as the source.
```
#!highlight xml
<target base="${GALAXY_DATA_MANAGER_DATA_PATH}">${dbkey}/seq/${path}</target>
```

<br />

---

### <value_translation> tag set

This tag allows using templating to modify the value provided by the Data Manager Tool into the actual value that should be stored within the Tool Data Table. There can be any number of value translations provided for an output. The value translations are performed in the order presented in the XML. It is important to note that a move will occur before the value translations are performed. 

| attribute |  values  |  details  |  required  |  example  | 
| --------- | ------- | -------- | --------- | -------- | 
| type |  a string  |  The type of value translation to perform. Currently "template" and "function" are supported.  |  no  |  `type="template"`  | 


#### Example

The following is an example that contains a common usage, where a value is constructed using several of the values provided by the Data Manager Tool and that value is then turned into an absolute path.
```
#!highlight xml
<value_translation>${GALAXY_DATA_MANAGER_DATA_PATH}/${value}/seq/${path}</value_translation>
<value_translation type="function">abspath</value_translation>
```

<br />

---

# Bringing it all Together, an example

Assume that we have a Data Manager Tool that provides the following named values:

| name |  value  | 
| ---- | ------ | 
| value |  sacCer2  | 
| path |  sacCer2.2bit  | 

and creates an output named "out_file", with an extra_files_path containing a file 'sacCer2.2bit'. (The primary dataset file contains [JSON](/Admin/Tools/DataManagers/DataManagerJSONSyntax) that provides the above values)

and has a Data Manager configuration defined as:

```
#!highlight xml
<data_managers>
    <data_manager tool_file="data_manager/twobit_builder.xml" id="twobit_builder">
        <data_table name="twobit">
            <output>
                <column name="value" />
                <column name="path" output_ref="out_file" >
                    <move type="file">
                        <source>${path}</source>
                        <target base="${GALAXY_DATA_MANAGER_DATA_PATH}">${value}/seq/${path}</target>
                    </move>
                    <value_translation>${GALAXY_DATA_MANAGER_DATA_PATH}/${value}/seq/${path}</value_translation>
                    <value_translation type="function">abspath</value_translation>
                </column>
            </output>
        </data_table>
    </data_manager>
<data_managers>

```


The result is:

| name |  value  | 
| ---- | ------ | 
| value |  sacCer2  | 
| path |  ${ABSOLUTE_PATH_OF_CONFIGURED_GALAXY_DATA_MANAGER_DATA_PATH}/sacCer2/seq/sacCer2.2bit  | 

and the "sacCer2.2bit" file has been moved into the location specified by path.


---

[/Admin/Tools/DataManagers](/Admin/Tools/DataManagers)
