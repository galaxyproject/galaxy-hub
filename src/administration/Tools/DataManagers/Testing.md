---
autotoc: true
---



# Writing Data Manager Tests

Writing a Data Manager test is similar to writing a test for any other [Galaxy Tool](/Admin/Tools/Writing Tests). For an example, please see at [http://testtoolshed.g2.bx.psu.edu/view/blankenberg/data_manager_example_blastdb_ncbi_update_blastdb](http://testtoolshed.g2.bx.psu.edu/view/blankenberg/data_manager_example_blastdb_ncbi_update_blastdb). 

----
# Running Data Manager Tests

Data Managers can be tested using the built-in `run_functional_tests.sh` script. All installed Data Managers can be tested, or individual Data Managers can be tested.

To test all:
``` sh run_functional_tests.sh -data_managers ```


To test a single Data Manager by id:
``` sh run_functional_tests.sh -data_managers  -id data_manager_id ```


----

# Testing in the ToolShed

All Data Managers deposited within the ToolShed are tested using the the nightly testing framework found at. 

----

[/Admin/Tools/DataManagers](/Admin/Tools/DataManagers)
