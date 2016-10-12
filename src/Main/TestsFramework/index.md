## Galaxy test frame work documentation

**Steps of galaxy testing** 
1. `run_tests.sh` -->
1. `nosetests.sh` -->
1. `nosetests.py` -->
1. `test/funcational/__init__.py` -->
1. test on tool_id, test files or directories

**Details:**
** 1. `run_tests.sh`:**
* '`run_tests.sh help`' for help
* '`run_tests.sh`'		for testing all the tools in functional directory
*  '`run_tests.sh aaa`'		for testing one test case, 'aaa'
* '`run_tests.sh -id bbb`'	for testing one tool with id 'bbb'
*  '`run_tests.sh -list`'		for listing all the tool ids

Note that this script was originally called run_functional_tests.sh (which currently exists as an alias for back-compatibility).

**2.`nosetests.sh`:** wrapper of `nosetests.py`

**3.`nosetests.py`**
``` 
nosetests.py ~[~[options]|[(optional) test files or directories]]
options: see appendix I, “Nose options”
(optional) test files or directories: relative or absolute path to the files or directories
```


**4.`test/functional/__init__.py`**
# setup a galaxy instance
# setup toolbox (test_toolbox.py is required to be in the same directory)

**5.test on tool_id, test files or directories**

1. tool_id: you can just input the tool_id to test a single galaxy tool. Please follow the following steps. 
  * “`run_tests.sh -list`” : this command will list all the tool_ids, then you can select the correct tool_id of a tool.
  * “`run_tests.sh -id  tool_id`”: this command will test the single of this tool_id.
1. test_files: if you want to test a file or files, just simply input the command as:
  * "`run_tests.sh test/functional/test_get_data.py`"
1. directories: if you want to test all the test in a directory(s), just simply input the command as:
  * "`run_tests.sh test/functional`"

Appendix I : Nose options

Nose: a discovery-based unittest extension. nose provides an alternate test discovery and running process for unittest, one that is intended to mimic the behavior of py.test as much as is reasonably possible without resorting to too much magic.

```
options:
  -h, --help            show this help message and exit
  -V, --version         Output nose version and exit
  -p, --plugins         Output list of available plugins and exit. Combine
                        with higher verbosity for greater detail
  -v, --verbose         Be more verbose. [NOSE_VERBOSE]
  --verbosity=VERBOSITY
                        Set verbosity; --verbosity=2 is the same as -v
  -q, --quiet           
  -c FILES, --config=FILES
                        Load configuration from config file(s). May be
                        specified multiple times; in that case, all config
                        files will be loaded and combined
  -w WHERE, --where=WHERE
                        Look for tests in this directory. May be specified
                        multiple times. The first directory passed will be
                        used as the working directory, in place of the current
                        working directory, which is the default. Others will
                        be added to the list of tests to execute. [NOSE_WHERE]
  -m TESTMATCH, --match=TESTMATCH, --testmatch=TESTMATCH
                        Use this regular expression to find tests
                        [NOSE_TESTMATCH]
  --tests=TESTNAMES Run these tests (comma-separated list). This argument
                        is useful mainly from configuration files; on the
                        command line, just pass the tests to run as additional
                        arguments with no switch.
  -l DEBUG, --debug=DEBUG
                        Activate debug logging for one or more systems.
                        Available debug loggers: nose, nose.importer,
                        nose.inspector, nose.plugins, nose.result and
                        nose.selector. Separate multiple names with a comma.
  --debug-log=DEBUGLOG Log debug messages to this file (default: sys.stderr)
  --logging-config=LOGGINGCONFIG, --log-config=LOGGINGCONFIG
                        Load logging config from this file -- bypasses all
                        other logging config settings.
  -e EXCLUDE, --exclude=EXCLUDE
                        Don't run tests that match regular expression
                        [NOSE_EXCLUDE]
  -i INCLUDE, --include=INCLUDE
                        Also run tests that match regular expression
                        [NOSE_INCLUDE]
  -x, --stop            Stop running tests after the first error or failure
  -P, --no-path-adjustment
                        Don't make any changes to sys.path when loading tests
                        [NOSE_NOPATH]
  --exe                 Look for tests in python modules that are executable.
                        Normal behavior is to exclude executable modules,
                        since they may not be import-safe [NOSE_INCLUDE_EXE]
  --noexe               DO NOT look for tests in python modules that are
                        executable. (The default on the windows platform is to
                        do so.)
  -a ATTR, --attr=ATTR Run only tests that have attributes specified by ATTR
                        [NOSE_ATTR]
  -A EXPR, --eval-attr=EXPR
                        Run only tests for whose attributes the Python
                        expression EXPR evaluates to True [NOSE_EVAL_ATTR]
  -s, --nocapture       Don't capture stdout (any stdout output will be
                        printed immediately) [NOSE_NOCAPTURE]
  --with-coverage       Enable plugin Coverage:  If you have Ned Batchelder's
                        coverage module installed, you may activate a coverage
                        report. The coverage report will cover any python
                        source module imported after the start of the test
                        run, excluding modules that match testMatch. If you
                        want to include those modules too, use the --cover-
                        tests switch, or set the NOSE_COVER_TESTS environment
                        variable to a true value. To restrict the coverage
                        report to modules from a particular package or
                        packages, use the --cover-packages switch or the
NOSE_COVER_PACKAGES environment variable.
                        [NOSE_WITH_COVERAGE]
  --cover-package=COVER_PACKAGES
                        Restrict coverage output to selected packages
                        [NOSE_COVER_PACKAGE]
  --cover-erase         Erase previously collected coverage statistics before
                        run
  --cover-tests         Include test modules in coverage report
                        [NOSE_COVER_TESTS]
  --cover-inclusive     Include all python files under working directory in
                        coverage report.  Useful for discovering holes in test
                        coverage if not all files are imported by the test
                        suite. [NOSE_COVER_INCLUSIVE]
  --pdb                 Drop into debugger on errors
  --pdb-failures        Drop into debugger on failures
  --no-deprecated       Disable special handling of DeprecatedTest exceptions.
  --with-doctest        Enable plugin Doctest:  Activate doctest plugin to
                        find and run doctests in non-test modules.
                        [NOSE_WITH_DOCTEST]
  --doctest-tests       Also look for doctests in test modules
                        [NOSE_DOCTEST_TESTS]
  --doctest-extension=DOCTESTEXTENSION
                        Also look for doctests in files with this extension
                        [NOSE_DOCTEST_EXTENSION]
  --with-isolation      Enable plugin IsolationPlugin:  Activate the isolation
                        plugin to isolate changes to external modules to a
                        single test module or package. The isolation plugin
                        resets the contents of sys.modules after each test
                        module or package runs to its state before the test.
PLEASE NOTE that this plugin should not be used with
                        the coverage plugin in any other case where module
                        reloading may produce undesirable side-effects.
                        [NOSE_WITH_ISOLATION]
  -d, --detailed-errors, --failure-detail
                        Add detail to error output by attempting to evaluate
                        failed asserts [NOSE_DETAILED_ERRORS]
  --with-profile        Enable plugin Profile:  Use this plugin to run tests
                        using the hotshot profiler.   [NOSE_WITH_PROFILE]
  --profile-sort=PROFILE_SORT
                        Set sort order for profiler output
  --profile-stats-file=PROFILE_STATS_FILE
                        Profiler stats file; default is a new temp file on
                        each run
  --profile-restrict=PROFILE_RESTRICT
                        Restrict profiler output. See help for pstats.Stats
                        for details
  --no-skip             Disable special handling of SkipTest exceptions.
  --with-id             Enable plugin TestId:  Activate to add a test id (like
                        #1) to each test name output. After you've run once to
                        generate test ids, you can re-run individual tests by
                        activating the plugin and passing the ids (with or
                        without the # prefix) instead of test names.
                        [NOSE_WITH_ID]
  --id-file=TESTIDFILE Store test ids found in test runs in this file.
```

