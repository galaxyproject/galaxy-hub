<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'><img src='/images/logos/ToolShed.jpg' alt='Galaxy Main Tool Shed' height="174" /></a> </div>

# Repository Validation

Since the Tool Shed delivers utilities to Galaxy to enable scientific research, it is imperative that these utilities are verified as much as possible before they are installed into Galaxy.  This provides Galaxy administrators assurance of their safety and functional correctness along with a level of comfort that installed utilities will not be harmful to their environments.  Worst case scenarios include repositories with malicious content, which can be flagged appropriately by Tool Shed administrators so they are not accessible.  Initial validation of repositories is handled by what I call the Tool Shed’s Install and Test Framework.

# The Tool Shed’s Install and Test Framework

At the highest level, the Tool Shed’s Install and Test Framework consists of three components; a Tool Shed,  a Galaxy environment and the functional test suite that installs and tests each repository from the Tool Shed into the Galaxy environment.  The Install and Test framework is scheduled to run every 24 hours on both of the public Galaxy Tool Sheds hosted by the Galaxy development team.  It is executed within an Amazon EC2 instance based on an Ubuntu image with the following packages installed.

* autoconf
* automake
* autotools-dev
* build-essential
* cmake
* git-core
* libatlas-base-dev
* libblas-dev
* liblapack-dev
* libc6-dev
* mercurial
* python2.6
* python2.6-dev
* pkg-config
* subversion
* python-dev
* python-pip

The Install and Test framework is included in the Galaxy and Tool Shed code base, and it can easily be used to test the repositories contained in a local Tool Shed.  The details for doing this are provided later in this article.  First I’ll provide the details about how this framework is used to test the public Galaxy Tool Sheds.

The framework can be configured to test every installable revision of selected repositories or it can be configured to restrict testing to only the latest installable revision of selected repositories.  The latter approach is used for the public Galaxy Tool Sheds.  Since the process is the same for both the Test and Main Tool Sheds, I’ll discuss only the Main Tool Shed which tracks the latest stable release of the Galaxy code base.  When testing with the Main Tool Shed, the Install and Test Framework instantiates a Galaxy instance running the same revision.

The process begins by executing two scripts that inspect the repositories in the Tool Shed, one script for each repository type (in a previous post I introduced repository types as Tool dependency definition and Unrestricted).  I call these scripts the Install and Test Framework’s preparation scripts.  The Tool Shed server includes the following two crontab entries which schedule execution of the scripts, with the first running at 3:00 PM and the second at 3:15 PM for the Main Tool Shed.

```
0 15 * * * cd /galaxy_toolshed && /usr/bin/python lib/tool_shed/scripts/check_tool_dependency_definition_repositories.py tool_shed_wsgi.ini |tee -a lib/tool_shed/scripts/log/check_tool_dependency_definition_repositories.log
10 15 * * * cd /galaxy_toolshed && /usr/bin/python lib/tool_shed/scripts/check_repositories_for_functional_tests.py tool_shed_wsgi.ini |tee -a lib/tool_shed/scripts/log/check_repositories_for_functional_tests.log
```


The first script (check_tool_dependency_definition_repositories.py) inspects the latest revision of all repositories whose type is Tool dependency definition and determines whether the revision is valid for installation.  Repositories with invalid revisions will be flagged so that they will not be installed into Galaxy later in the Install and Test process.  This script takes a few minutes to complete for the Main Tool Shed.

The second script (check_repositories_for_functional_tests.py) inspects the latest revision of all repositories whose type is Unrestricted and whose contents include valid Galaxy tools.  The script will discover tools that have defined functional tests and will inspect the repository to determine if it includes a directory named test-data that contains functional test data files.  Repositories that do not meet all of these criteria will be flagged as not to be installed and tested later in the process.  This script takes a few minutes to complete for the Main Tool Shed.

After the preparation scripts have completed, the the next component of the Install and Test process can be started.  A Buildbot instance is ideally suited for this, and one of my colleagues, Dave Bouvier, has configured a Buildbot for both public Tool Sheds hosted by the Galaxy Development Team.  In addition to a few other details the Bulildbot configuration instantiates the Amazon EC2 instance for testing against the Tool Shed.  After configuring the EC2 environment and cloning and starting up a Galaxy instance within it, the process of installing repositories from the Tool Shed into the Galaxy instance is performed in 2 stages.  The script that executes the framework is located in the Galaxy environment’s installation directory and is named install_and_test_framework.sh.  Passing the -w flag to the script will instruct it to perform a specific stage of the process.  Stage 1 of the process is executed with the following call.

```sh install_and_test_repositories.sh -w tool_dependency_definitions```


The -w tool_dependency_definitions flag installs all Tool dependency definition repositories that were validated by the check_tool_dependency_definition_repositories.py preparation script into the Galaxy environment within the EC2 instance. Galaxy can be configured with locations for installing these repositories and their contents. Tool dependency definition repositories contain a single Galaxy utility, a recipe for installing and possibly compiling a tool dependency package. With this repository type, the repository itself, along with all defined dependencies is installed by Galaxy from the Tool Shed into a configured location.  After successful repository installation, The Galaxy installation process follows the contained tool dependency recipe to install and compile the tool dependency into another location defined by the Galaxy tool_dependency_dir configuration setting.  The details about how all of this works will be presented in a future post.  These installed tool dependencies remain in the configured location to be used during Stage 2 of the Install and Test Framework.

As I write this article, the Install and Test Framework for the Main Tool Shed installs 142 Tool dependency definition repositories with 113 successful installations of tool dependencies defined by their recipes and 26 recipes resulting in tool dependency installation errors.  The tool dependency installation results for each repository revision are uploaded to the Tool Shed and displayed in the Test runs container on each repository’s main page.  The Tool Shed can be configured to store any number of test runs, and the Main Tool Shed has been configured to store 5.  These test run containers include the following categories of information for Tool dependency definition repositories.

* Test environment
  * Date and time tested
  * Galaxy revision
  * Galaxy database version
  * Tool Shed revision
  * Tool Shed database version
  * Tool Shed mercurial version
  * Python version
  * System and architecture
* Successful installations
  * Repository dependencies
  * Tool dependencies
* Installation errors
  * Current repository
  * Repository dependencies
  * Tool dependencies

After stage 1 of the Install and Test process is completed, stage 2 is executed with the following call.

```sh install_and_test_repositories.sh -w repositories_with_tools```


The -w repositories_with_tools flag installs all Unrestricted repositories that were validated by the check_repositories_for_functional_tests.py preparation script into the same Galaxy environment within the EC2 instance that was used in Stage 1.  These repositories all contain valid Galaxy tools with defined functional tests and include a directory of test data files named test-data.  After each repository is installed along with all defined dependencies, the Install and Test Framework executes the functional tests defined for the contained tools using the functional test data files within the repository.  Tools that have defined tool dependencies will locate and use the packages that were successfully installed during Stage 1.

As I write this post, the Install and Test Framework for the Main Tool Shed successfully installs 226 repository revisions containing 74 additional tool dependencies that were not installed in Stage 1, with 17 additional tool dependency installations resulting in errors.  Of the successful installations, 106 repository revisions pass all tool functional tests, while 37 revisions fail at least 1 tool functional test.  Unfortunately, many repositories in the Main Tool Shed are lacking tool tests or test data.  As with Tool dependency definition repositories, the test results of these Unrestricted repositories are uploaded to the Tool Shed and displayed in the Test runs container on each repository’s main page.  These containers include the same information listed above, but also include the additional following categories of information.

* Passed tests
  * Test id
  * Tool id
  * Tool version
* Failed tests
  * Test id
  * Tool id
  * Tool version
  * Stderr output of test
  * Traceback output of test
* Missing test components
  * Test id
  * Tool id
  * Tool version
* Missing components (defined tests or test data files)
* Not tested
  * Reason not tested

This article discusses the Install and Test Framework’s processes for certifying a Tool Shed’s contents.  Repositories that contain both tool dependency recipes and tools that require them are installed and validated using a production Galaxy environment.  This process provides the foundation for the next level of repository certification which is performed by the Intergalactic Utilities Commission, which will be discussed in a future post.

# Using the Install and Test Framework With a Local Tool Shed

To execute the Install and Test Framework against a local Tool Shed, make sure the Tool Shed server is started and set the following environment variables.

```
export GALAXY_INSTALL_TEST_TOOL_SHED_API_KEY=<an API key for the Tool Shed admin user>
export GALAXY_INSTALL_TEST_TOOL_SHED_URL=<URL and port of the local Tool Shed>
export GALAXY_INSTALL_TEST_TOOL_SHEDS_CONF=<config file that contains the Tool Shed URL, e.g., see tool_sheds_conf.xml in Galaxy install directory>
export GALAXY_INSTALL_TEST_TOOL_DEPENDENCY_DIR=<directory to install tool dependencies, e.g., /tmp/tool_dependency_dir>
export GALAXY_TOOL_DEPENDENCY_DIR=$GALAXY_INSTALL_TEST_TOOL_DEPENDENCY_DIR
```


After setting the above environment variables, execute the following preparation scripts from the Galaxy installation directory.

```
python ./lib/tool_shed/scripts/check_tool_dependency_definition_repositories.py ./tool_shed_wsgi.ini
```

```
python ./lib/tool_shed/scripts/check_repositories_for_functional_tests.py ./tool_shed_wsgi.ini
```


When the above 2 scripts are completed, execute the following script from the Galaxy installation directory.

```
sh install_and_test_tool_shed_repositories.sh
```


Running the script as defined above with no parameters will execute Stage 1  followed immediately by Stage 2.  To run only stage 1, which tests only Tool dependency definition repositories, use the following call.

```
sh install_and_test_tool_shed_repositories.sh -w tool_dependency_definitions
```


To run only stage 2, which tests only Unrestricted repositories, use the following call.

```
sh install_and_test_tool_shed_repositories.sh -w repositories_with_tools
```


You’ll need to manually clean up files created in the directory specified by the GALAXY_INSTALL_TEST_TOOL_DEPENDENCY_DIR environment variable for each test run.

Good luck!
