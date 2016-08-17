

# Data Manager JSON Syntax

Data Manager Tools are required to use JSON to communicate the new Tool Data Table values back to the Data Manager. JSON can also optionally be used to provide the input parameter values to the Data Manager Tool, but this is not required.

----

TABLE_OF_CONTENTS

----

# Returning Values to the Data Manager

A Data Manager Tool must provide the new values for the Tool Data Table Entries via a JSON dictionary. 

1. A single dictionary, with the key *data_tables* is required to be present within the root JSON dictionary. 
1. The *data_tables* dictionary is keyed by the **name** of the Tool Data Table receiving new entries. Any number of named tables can be specified.
1. The value for the named Tool Data Table is a list of dictionaries.
1. Each of these dictionaries contains the values that will be provided to the Data Manager and modified as per the configuration defined within the [Data Manager XML Syntax](/Admin/Tools/DataManagers/DataManagerXMLSyntax)

## Example JSON Output from Data Manager Tool to Galaxy
Here, the *all_fasta* table is having a single entry added to it

```javascript
{
   "data_tables":{
      "all_fasta":[
         {
            "path":"sacCer2.fa",
            "dbkey":"sacCer2",
            "name":"S. cerevisiae June 2008 (SGD/sacCer2) (sacCer2)",
            "value":"sacCer2"
         }
      ]
   }
}
```


This creates a new entry in the Tool Data Table:

```text
#<unique_build_id>	<dbkey>		<display_name>	<file_path>
sacCer2	sacCer2	S. cerevisiae June 2008 (SGD/sacCer2) (sacCer2)	/Users/dan/galaxy-central/tool-data/sacCer2/seq/sacCer2.fa
```


# Returning Values to the Data Manager
Taking the input values of a Data Manager Tool and converting it into a usable set of command-line arguments and options can be quite complicated in many cases, especially when considering that the underlying Data Manager Tool Executable will likely take those options and convert them into a set of valued objects within the executable/script itself before performing its operations. 

To simplify this process, Data Manager Tools will automatically have their parameter values JSONified and provided as the content of the output dataset. This will allow the executable / script to simply read and parse the JSON data and have a complete collection of the Tool and Job parameters to use within the tool. Using this methodology is not required, however, and a Data Manager Tool developer is free to explicitly declare any number of the Tool parameters explicitly to the command-line. 


## Example JSON input to tool
```javascript
{
   "param_dict":{
      "<u>datatypes_config__":"/Users/dan/galaxy-central/database/tmp/tmphyQRH3",
      "</u>get_data_table_entry__":"<function get_data_table_entry at 0x10d435b90>",
      "userId":"1",
      "userEmail":"dan@bx.psu.edu",
      "dbkey":"sacCer2",
      "sequence_desc":"",
      "GALAXY_DATA_INDEX_DIR":"/Users/dan/galaxy-central/tool-data",
      "<u>admin_users__":"dan@bx.psu.edu",
      "</u>app__":"galaxy.app:UniverseApplication",
      "<u>user_email__":"dan@bx.psu.edu",
      "sequence_name":"",
      "GALAXY_DATATYPES_CONF_FILE":"/Users/dan/galaxy-central/database/tmp/tmphyQRH3",
      "</u>user_name__":"danb",
      "sequence_id":"",
      "reference_source":{
         "reference_source_selector":"ncbi",
         "requested_identifier":"sacCer2",
         "<u>current_case__":"1"
      },
      "</u>new_file_path__":"/Users/dan/galaxy-central/database/tmp",
      "<u>user_id__":"1",
      "out_file":"/Users/dan/galaxy-central/database/files/000/dataset_200.dat",
      "GALAXY_ROOT_DIR":"/Users/dan/galaxy-central",
      "</u>tool_data_path__":"/Users/dan/galaxy-central/tool-data",
      "<u>root_dir__":"/Users/dan/galaxy-central",
      "chromInfo":"/Users/dan/galaxy-central/tool-data/shared/ucsc/chrom/sacCer2.len"
   },
   "output_data":[
      {
         "extra_files_path":"/Users/dan/galaxy-central/database/job_working_directory/000/202/dataset_200_files",
         "file_name":"/Users/dan/galaxy-central/database/files/000/dataset_200.dat",
         "ext":"data_manager_json",
         "out_data_name":"out_file",
         "hda_id":201,
         "dataset_id":200
      }
   ],
   "job_config":{
      "GALAXY_ROOT_DIR":"/Users/dan/galaxy-central",
      "GALAXY_DATATYPES_CONF_FILE":"/Users/dan/galaxy-central/database/tmp/tmphyQRH3",
      "TOOL_PROVIDED_JOB_METADATA_FILE":"galaxy.json"
   }
}
```



----
[/Admin/Tools/DataManagers](/Admin/Tools/DataManagers)
