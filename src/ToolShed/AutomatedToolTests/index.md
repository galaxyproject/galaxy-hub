---
autotoc: true
---
<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'><img src="/src/Images/Logos/ToolShed.jpg" alt="Galaxy Main Tool Shed" height="174" /></a></div>



# The automated tool test environment

The automated repository installation and tool testing environment runs on an Amazon EC2 instance based on an Ubuntu image with the addition of the following core packages required for reliable testing:

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

The testing framework consists of three separate components; A specific Galaxy revision, a configured Tool Shed, and the functional test suite that installs and tests each repository from the configured Tool Shed into the specific Galaxy revision. The revisions of these components are listed in the next section.
 
Each repository is installed into the specified Galaxy instance along with all repository dependencies and tool dependencies. More details about this are discussed in the next section.

# Automated testing framework processes

All successfully installed tool dependencies are saved to a persistent location within the Amazon EC2 instance. By default, these are not deleted after the testing framework completes, but can be deleted using a flag sent to the testing framework. If a tool dependency definition is updated, the new revision will be installed and used in place of the old definition. Additionally, the persistent tool dependency cache is periodically emptied in order to re-test tool dependency installation. This is currently done on a weekly basis. during Saturday's nightly run.

Here are the details for the two main public Tool Sheds hosted by the Galaxy development team:

## Main Tool Shed

The main Tool Shed tracks the latest stable release of the Galaxy codebase, and the installation and testing framework instantiates a Galaxy instance running the same revision, into which repositories are installed from the main Tool Shed. The testing framework itself is updated to the latest revision of the galaxy-central repository in bitbucket:

## Test Tool Shed

The test Tool Shed tracks the latest revision of the galaxy-central repository on bitbucket, and the installation and testing framework instantiates a Galaxy instance running the same revision, into which repositories are installed from the test Tool Shed. The installation and testing scripts themselves are also kept at the latest revision of galaxy-central from bitbucket.

# Decoupling Galaxy and the testing framework

In order for the testing process to be reliable, the Galaxy instance should be running the same revision as the Tool Shed instance that contains the repositories being tested. However, this introduces a weakness in that the testing framework may have been updated in the development branch of the Galaxy repository, without those updates necessarily having been duplicated on the stable branch. In order to overcome this weakness, the functional testing scripts need to be updated after the Galaxy repository has been cloned and updated to the stable branch, but before running the test suite. The following code illustrates the process to do so:

```
    build_factory.addStep( Mercurial( repourl='http://bitbucket.org/galaxy/galaxy-central/', branchType='inrepo', defaultBranch='stable' ) )

    # Update the contents of test/install_and_test_tool_shed_repositories to the latest revision by specifying the current date as an
    # argument to the hg revert command.
    build_factory.addStep( ShellCommand( command='hg revert -d "`date -I`" test/install_and_test_tool_shed_repositories/',
                                         flunkOnFailure=False,
                                         name='update test scripts',
                                         description='Update the functional test scripts to the latest revision.' ) )
```


In the above example, build_factory is an instance of the BuildFactory class from BuildBot, which specifies distinct steps to execute in order to complete a series of tests. This example shows the Galaxy code being cloned from bitbucket and updated to the stable branch, then the scripts used for installing and testing repositories being updated separately to the latest revision in the repository.

# Scripts for inspecting and maintaining the repositories contained within a tool shed

The following scripts are available for inspecting and maintaining the repositories contained within a local tool shed that you are hosting. You can configure cron to execute these scripts on a regular schedule or execute them manually against your local tool shed whenever you choose. Each of these scripts is configured to execute regularly against both of the public tool sheds supported by the core Galaxy development team.

* **~/lib/tool_shed/scripts/deprecate_repositories_without_metadata.py** - this script will deprecate any repositories that are older than a specified number of days (set on the command line) and have been empty since creation. The owner of the repository will receive an email alerting them that their repository has been marked as deprecated. The owner can mark the repository as not deprecated at any time if they choose to use the repository.

* **~/lib/tool_shed/scripts/check_repositories_for_functional_tests.py** - this script will inspect all installable repository revisions in the tool shed, and for those revisions that include valid tools the script inspects each tool configuration file to determine if at least one functional test has been defined for the tool.  If not, the tool being checked is flagged as "missing tool test components", where a test component is either a test defined in the tool configuration file or a defined test data file that is not contained within a a subdirectory named **test-data** within the repository file hierarchy.  If the repository is missing the **test-data** directory entirely, all tools are flagged as missing test components.  When a repository is flagged as missing test components, information about the missing components is uploaded to the repository, and when a user is browsing the repository they will be able to see the information.  See the next section below for details.  Repositories that do not have valid tools or a **test-data** directory are marked by this script as "not to be installed and tested", but repositories that contain at least one valid tool with no missing test components will be installed and tested.<br /><br />

 This script takes one argument, which is the .ini file of the tool shed. Example:
 ```
 python lib/tool_shed/scripts/check_repositories_for_functional_tests.py tool_shed_wsgi.ini
 ```


* **~/install_and_test_tool_shed_repositories.sh** - this shell script executes the test framework contained in ~/test/install_and_test_tool_shed_repositories. You can set certain environment variables (all defined within the install_and_test_tool_shed_repositories.sh shell script) to direct the test framework to inspect repositories contained within a specified tool shed and install them into a temporary Galaxy environment created by the test framework. The test framework will install only those repositories that have been flagged as having tools with valid functional tests by the ~/lib/tool_shed/scripts/check_repositories_for_functional_tests.py script discussed above. The repository will be installed into a clean Galaxy instance, each contained tool's functional tests will be executed, and the results will be uploaded to the repository so that users browsing the repository can see them. On the test and main tool sheds, there is also a configured list of repositories that the Galaxy development team has determined should not be installed. Some reasons this may be determined are tool dependencies that take longer than 30 minutes to compile or problems with the repository dependency definitions. If a repository has been defined not to be tested in this manner, the install_and_test_tool_shed_repositories script will skip that repository and move on to the next one in the list returned from the tool shed API.<br /><br />

 This script requires the following environment variables:<br />
 `GALAXY_INSTALL_TEST_TOOL_SHED_API_KEY` - must be set to the API key for the tool shed that is being checked. See [Learn/API](/src/Learn/API/index.md) on how to obtain the API key.<br />
 `GALAXY_INSTALL_TEST_TOOL_SHED_URL` - must be set to a URL that the tool shed is listening on.<br />
 If the tool shed with repositories being tested is not the Galaxy main or Galaxy test tool shed, `GALAXY_INSTALL_TEST_TOOL_SHEDS_CONF` must be set to a tool sheds configuration file that does specify that tool shed, otherwise repository installation will fail. Example:
 ```
 export GALAXY_INSTALL_TEST_TOOL_SHEDS_CONF=install_and_test_tool_sheds_conf.xml
 export GALAXY_INSTALL_TEST_TOOL_SHED_API_KEY=5e974afd82d521cd6ddf825c7u572137
 export GALAXY_INSTALL_TEST_TOOL_SHED_URL=http://localhost:9009/
 sh install_and_test_tool_shed_repositories.sh
 ```

 
# Viewing automated tool test results in the Tool Shed

Every revision of a repository in the Tool Shed that contains tools will be inspected by the **~/lib/tool_shed/scripts/check_repositories_for_functional_tests.py** script discussed above to determine if it should be processed by the **~/install_and_test_tool_shed_repositories.sh** script.  The first script will set certain flags on each repository revision that will result in the second script either skipping the revision or processing it.  

The combination of these two scripts will place the repository revision into one or more of the following categories.  The scripts will gather information while processing the repository revision and upload it to the Tool Shed so that users can see it when managing or reviewing the repository.  This information will be available in the **Tool test results** container along with a sub-container labeled **Automated test environment**.  Here is an example of a repository revision that displays these containers.

![](/src/ToolShed/AutomatedToolTests/test_environment.png)

* **missing tool test components** - this category contains repository revisions that match the following criteria:
* the revision contains at least one tool with no defined tests OR
* the revision contains at least one tool with a test that requires a missing test data file

Here is an example of a repository revision that displays this container.

![](/src/ToolShed/AutomatedToolTests/missing_test_components.png)

* **tool test installation errors** - this category contains repository revisions that match the following criteria:
* the revision contains at least one tool
* the revision is not missing any tool test components
* the revision has installation errors (the repository itself, repository dependencies or tool dependencies)

Here is an example of a repository revision that displays this container.

![](/src/ToolShed/AutomatedToolTests/installation_errors.png)

* **failing tool tests** - this category contains repository revisions that match the following criteria:
* the revision contains at least one tool
* the revision is not missing any tool test components
* the revision has at least 1 tool test that fails

Here is an example of a repository revision that displays this container.

![](/src/ToolShed/AutomatedToolTests/failing_tool_tests.png)

* **skip tool tests checked** - this category contains repository revisions that match the following criteria:
* the revision contains at least one tool
* the revision has **Skip automated testing of tools in this revision** checked

The owner of a repository can mark one or more specific revisions of a repository as one that should not be tested by the automated test framework.  Reasons for marking revisions to be skipped are varied, but usually 3rd party tool dependency licensing is involved.  Here is an example of the check box for marking a revision to be skipped.

![](/src/ToolShed/AutomatedToolTests/skip_tool_tests.png)

* **no failing tool tests** - this category contains repository revisions that match the following criteria:
* the revision contains at least one tool
* the revision is not missing any tool test components
* the revision has no tool tests that fail

Here is an example of a repository revision that displays this container.

![](/src/ToolShed/AutomatedToolTests/no_failing_tool_tests.png)

As mentioned above, each repository revision will be placed into one or more of these categories.  Here is an example of a revision that has some tool tests that pass and others that fail.

![](/src/ToolShed/AutomatedToolTests/both_pass_and_fail.png)

# Viewing automated tool test results for the latest revision in the Tool Shed

Lists of the latest installable repository revision that fall into each of the categories discussed above are available from the Tool Shed menu.  Repository owners can see how the latest installable revision of their repositories is categories using the menu options in the following section.

![](/src/ToolShed/AutomatedToolTests/owner_latest_revision_lists.png)

Those users that are authorized to review repositories (i.e., members of the Intergalactic Utilities Commission) can see see how the latest installable revision of all repositories are categories using the menu options in the following section.

![](/src/ToolShed/AutomatedToolTests/latest_revision_lists.png)

# Automated Tool Test Results RSS Feed

The automated testing framework produces data that is used to populate an RSS 2.0 feed generated by the tool shed. This RSS feed can then be used by any RSS-compatible feed reader to get updates on the status of a user's repositories and the tests that have been run against them.
![RSS feed of the development team's repositories on the test tool shed, displayed in Firefox.](/src/ToolShed/AutomatedToolTests/RSSFeedScreenShotInFirefox.png)

## Accessing the feed

To access the feed, enter a URL with this format into your browser or feed reader:
`http://<tool_shed>/repository/get_functional_test_rss?owner=<username>&status=<status>`
Where status can be 'passed', 'failed', or 'all'.

The RSS feed will return a list of repositories with the following counts:

* Passed tests
* Failed tests
* Missing test components

## Passed tests

If a tool contained within a tool shed repository has one or more tests defined, this attribute will show the number of those tests that have executed successfully, and returned data that matches the specified output file in the **test-data** directory within the repository. This corresponds to the section "Tests that passed successfully" on the **manage repository** page.

## Failed tests

If a tool has one or more tests, but these tests do not complete successfully or return data that differs from the output files contained within the **test-data** directory, this attribute shows the number of tests returning incorrect data or not executing correctly. This corresponds to the section "Tests that failed" on the **manage repository** page.

## Missing test components

Test components are defined as functional test definitions, files required for testing contained within the **test-data** directory, and the **test-data** directory itself. This attribute shows the number of tests that are missing one or more of these items, and can therefore not be reliably tested. This corresponds to the section "Tools missing tests or test data" on the **manage repository** page.

# Related Pages

## Reviewing, rating and approving tool shed repositories

[http://wiki.galaxyproject.org/ReviewingToolShedRepositories](http://wiki.galaxyproject.org/ReviewingToolShedRepositories) - this document discusses the goals for reviewing tool shed repositories, their specific contents, and the various components and features involved in their installation into local Galaxy instances and their use within them. 
