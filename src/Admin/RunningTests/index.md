---
autotoc: true
---
## Running Tests

Galaxy is a large code base with many different test types. **Functional tests**' operate on a running Galaxy instance and include tests of various tools (see [Admin/Tools/Writing Tests](../../Admin/Tools/Writing Tests) for more information on writing tool tests). **Unit tests** are using to test individual Python components of the Galaxy framework in isolation. **Browser tests** run in a web browser and can be used to test !JavaScript components and the API.



This page describes the tests available for a locally downloaded copy of Galaxy, the Galaxy Tool Shed offers a different, but related service - namely [automated tool tests](/src/ToolShed/AutomatedToolTests/index.md) for tools stored there.

### Functional Tests

Galaxy functional tests use the python twill module (a simple scripting language intended for programmatic or automated browsing of Web sites) in conjunction with nose (a test discovery module).

Assuming Galaxy has been downloaded and installed (see [Admin/Get Galaxy](../../Admin/Get Galaxy)), the directory containing Galaxy also contains the shell script `run_tests.sh` (originally named `run_functional_tests.sh`).  This script automatically starts a Galaxy instance on the local machine for the sole purpose of running the tests.

The functional tests can be launched with the command:
```
sh run_tests.sh
```


This command will output an html file called `run_functional_tests.html` which will contain all of the details of the test, along with additional information for failed tests.

The default behavior is to launch a local instance of galaxy, and run all tests on that local instance.  However, the tests can also be launched against an external server, such as `main.g2.bx.psu.edu`.

To do this, environment variables can be configured to control the test:
```
GALAXY_TEST_EXTERNAL=1 GALAXY_TEST_HOST=main.g2.bx.psu.edu  GALAXY_TEST_PORT=80 \
    ./run_tests.sh
```

GALAXY_TEST_EXTERNAL tells the test module not to start a server.  GALAXY_TEST_HOST is the URL of the server to use.  GALAXY_TEST_PORT is the port on which Galaxy is running (http is typically 80).

Additionally, to override the temporary sqlite database normally used during testing, you can specify a `GALAXY_TEST_DBURI`, something like (for postgres with a local socket in /tmp) '`GALAXY_TEST_DBURI=postgresql:///galaxy?host=/tmp`'.

You can selectively control which functional tests run, by specifying additional arguments to the `run_tests.sh` script.

```
$ ./run_tests.sh -help
invalid option: -help
'run_tests.sh'                          for testing all the tools in functional directory
'run_tests.sh aaa'                      for testing one test case of 'aaa' ('aaa' is the file name with path)
'run_tests.sh -id bbb'                  for testing one tool with id 'bbb' ('bbb' is the tool id)
'run_tests.sh -sid ccc'                 for testing one section with sid 'ccc' ('ccc' is the string after 'section::')
'run_tests.sh -list'                    for listing all the tool ids
'run_tests.sh -api'                     for running all the test scripts in the ./test/api directory
'run_tests.sh -toolshed'                for running all the test scripts in the ./test/tool_shed/functional directory
'run_tests.sh -toolshed testscriptname' for running one test script named testscriptname in the .test/tool_shed/functional directory
'run_tests.sh -workflow test.xml'       for running a workflow test case as defined by supplied workflow xml test file (experimental)
'run_tests.sh -framework'               for running through example tool tests testing framework features in test/functional/tools"   
'run_tests.sh -framework -id toolid'    for testing one framework tool (in test/functional/tools/) with id 'toolid'
'run_tests.sh -data_managers -id data_manager_id'    for testing one Data Manager with id 'data_manager_id'
'run_tests.sh -unit'                    for running all unit tests (doctests in lib and tests in test/unit)
'run_tests.sh -unit testscriptath'      running particular tests scripts
'run_tests.sh -qunit'                   for running qunit JavaScript tests
'run_tests.sh -qunit testname'          for running single JavaScript test with given name
```


For instance to execute tests in a particular test file in test/functional, such as test_get_data.py. To run that test, run the command:
```
sh run_tests.sh test/functional/test_get_data.py
```


TODO: Add specific examples of running functional test for local tools and tools installed from tool shed.

<div class='solid'>
***Note***: If you have another version of paste installed in your `PYTHONPATH`, it can cause problems running the functional tests. Many tests will error (instead of passing/failing) because of an HTML code 500 where a 200 was expected. There are two workarounds for this: uninstall paste or use [virtualenv](http://pypi.python.org/pypi/virtualenv/).
</div>


To speed up the functional tests (the database migration step) you can specify a pre-build sqlite database with:
```
export GALAXY_TEST_DB_TEMPLATE=https://github.com/jmchilton/galaxy-downloads/raw/master/db_gx_rev_0127.sqlite
```


([John Chilton](/src/JohnChilton/index.md) was so kind to offer one, thanks John!)

### Unit Tests

The root Galaxy directory contains a shell script `run_unit_tests.sh` to run Galaxy unit tests.

```
sh run_unit_tests.sh
```


This command also outputs an html file called `run_unit_tests.html` which contains all of the details of the test, along with additional information for failed tests.

Unit tests can be added as [doctests](http://docs.python.org/2/library/doctest.html) anywhere in the Galaxy or by placing them in `test/unit` directory (second option not yet implemented, but will be shortly). 

### Browser Tests

Browser tests can be found in the `test/casperjs` directory. 

Supported versions of required frameworks are CasperJS 1.0.x and PhantomJS 1.8.x (1.0.4 and 1.8.2 confirmed).

Default Casper object is for Galaxy purposes extended in the file `spaceghost.js`

Simple starting command for one test file would be: 

```
$ casperjs upload-tests.js --url='http://localhost:8080' '{ "testUser": { "email": "tramtadada@example.com", "password": "987654" } }'
```


The full suit can be run via 
```
$ python casperjs_runner.py
```

More information about how the tests are run can be found in [casperjs_runner.py](https://github.com/galaxyproject/galaxy/blob/dev/test/casperjs/casperjs_runner.py)

TODO: Add or link to additional documentation and running and writing browser tests.
