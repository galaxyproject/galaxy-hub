 

# Data Tables

The data tables approach is an alternative to using raw loc files in tool XML files.

Using them allows you to change the names or locations of loc files or data files pointed to in loc files, or change aspects of the loc file, without breaking workflows.

They were originally introduced in commit 4098:2447b9a4dae3:

```
Make "loc files" more flexible by adding "tool data tables". These are
configured at the application level. Specific tabular data files are
specified in a application config file and bound to names, the tools
then refer to these names. Thus users can configure where location
files are located without modifying tool configs.


Also:


 - Simpler column name configuration
 - Columns can be referred to by name in addition to index in all
   dynamic option filters
 - A data table can merge multiple files
 - Design can support other types of data files
```

In commit 4550:535d276c92bc almost all tools using loc files (and TopHat a bit later) were converted to data tables style. This means that they are no longer compatible with existing loc files. See the last section on this page for information on converting.

## The Pre-data-tables Approach

The old way of handling this in the loc file looked like this:

```
<param name="index" type="select">
    <options from_file="bowtie.loc">
      <column name="value" index="1" />
      <column name="name" index="0" />
    </options>
  </param>
```

The text that is displayed in the browser's dropdown is what's in the `name` column, and the value that would be stored for the parameter is in the `value` column.

If the loc file looked like this:

```
phiX /path/to/phiX
```

But more importantly, since the value that was stored for the parameter `index` would be `/path/to/phiX`, the actual path. So if the path to the data changed to `/some/new/path/to/phiX`, any workflows that already used the original value would still have that stored for `index`. And the tool would fail because it wouldn't be able to find the files. Using data tables allows the path to be changed without breaking workflows.

## How to Use Data Tables

There are three major components to data tables: 
1. An entry in the `tool_data_table_conf.xml`
2. A reference to the relevant data table in the tool XML file
3. An appropriate expression added to the tool XML file to pass the correct value to the supporting script (Python, Perl, etc.).

The file `tool_data_table_conf.xml.sample` can be used as a source for `tool_data_table_conf.xml`. The `tool_data_table_conf.xml` file looks something like this:

```
<tables>
    <!-- Locations of indexes in the Bowtie mapper format -->
    <table name="bowtie_indexes" comment_char="#">
        <columns>value, dbkey, name, path</columns>
        <file path="tool-data/bowtie_indices.loc" />
    </table>
</tables>
```

Note that the `value` is now the first column (index 0). This is what we are calling the "unique ID" because this is now the value that is stored for the index parameter. This approach allows variants of the same build to be listed, since the dbkey is specified for each entry. The `name` is still what is displayed in the browser dropdown. `path` is still the actual path to the data file(s). `value`, `path`, and `name` should all be included. Other columns are possible, but by convention the Unique ID should be in the first column and path in the last.

The loc file could look like this:

```
phiX_ID phiX174 User-friendly phiX174 Description /path/to/phiX
```

In the tool XML, there would need to be a parameter such as:

```
<param name="index" type="select">
    <options from_data_table="bowtie_indexes" />
  </param>
```

This would give the user a dropdown listing all of the values in the name column supplied in the loc file (in our example, "User-friendly phiX174 Description"). The value stored as the value of the parameter `index` would be "phiX\_ID". The script or binary will need the actual path in the command, and since the ID is the value, some work will need to be done to extract the path. The following line would do the trick: `--ref="${ filter( lambda x: str( x[0] ) == str( $index ), $ __app__.tool_data_tables['bowtie_indexes'].get_fields() )[0][-1] }"` In this line, `str( x[0] )` refers to the unique ID in column 0 and the -1 in `[0][-1]` gets the path in the last column.

## When Converting from Old-style Approach to Data Tables

Because the old way of doing things stored the path as the parameter value, when converting to data tables style, that path value needs to be used as the unique ID if backwards compatibility with workflows is to be maintained. For instance, if the original loc file looked like this:

```
phiX /path/to/phiX
hg19 /arbitrary/place/to/hg19
```

the new one could look something like:

```
/arbitrary/place/to/hg18 hg18 Human (Homo sapiens): hg18 /arbitrary/place/to/hg18
/path/to/phiX phiX User-friendly phiX174 Description /path/to/phiX
```

But if you move the data files to new locations and add some new builds, it could look something like this:

```
/arbitrary/place/to/hg18 hg18 Human (Homo sapiens): hg18 /new/path/to/bowtie/hg18
hg18Haps hg18 Human (Homo sapiens): hg18 Haplotypes /new/path/to/bowtie/hg18
hg19 hg19 Human (Homo sapiens): hg19 /new/path/to/bowtie/hg19
hg19Haps hg19 Human (Homo sapiens): hg19 Haplotypes /new/path/to/bowtie/hg19
/path/to/phiX phiX User-friendly phiX174 Description /new/path/to/bowtie/phiX
mm9 mm9 Mouse (Mus musculus): mm9 /new/path/to/bowtie/mm9
```

### If You Don't Want to Change the Existing loc Files

The alternative `tool_data_table_conf.xml.oldlocstyle` file can be used as a source for `tool_data_table_conf.xml` instead of `tool_data_table_conf.xml.sample`.
