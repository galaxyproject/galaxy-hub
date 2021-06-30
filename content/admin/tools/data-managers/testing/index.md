---
title: Writing Data Manager Tests
---
Writing a Data Manager test is similar to writing a test for any other [Galaxy Tool](/src/admin/tools/Writing Tests/index.md). For an example, please see at [http://testtoolshed.g2.bx.psu.edu/view/blankenberg/data_manager_example_blastdb_ncbi_update_blastdb](http://testtoolshed.g2.bx.psu.edu/view/blankenberg/data_manager_example_blastdb_ncbi_update_blastdb). 

----
# Running Data Manager Tests

Data Managers can be tested using the built-in `run_tests.sh` script. All installed Data Managers can be tested, or individual Data Managers can be tested.

To test all:
``` sh run_tests.sh -data_managers ```


To test a single Data Manager by id:
``` sh run_tests.sh -data_managers  -id data_manager_id ```


----

# Testing in the ToolShed

All Data Managers deposited within the ToolShed are tested using the nightly testing framework. 

----

[Admin/Tools/DataManagers](/src/admin/tools/data-managers/index.md)
