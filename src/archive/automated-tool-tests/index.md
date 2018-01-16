---
title: The automated tool test environment
---
<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'>![Galaxy Main Tool Shed](/images/logos/ToolShed.jpg)</a></div>




The automated repository installation and tool testing environment ran on an Amazon EC2 instance based on an Ubuntu image with the addition of the following core packages required for reliable testing:

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

The testing framework consisted of three separate components; A specific Galaxy revision, a configured Tool Shed, and the functional test suite that installed and tested each repository from the configured Tool Shed into the specific Galaxy revision. The revisions of these components are listed in the next section.

Each repository was installed into the specified Galaxy instance along with all repository dependencies and tool dependencies. More details about this are discussed in the next section.

# Automated testing framework processes

All successfully installed tool dependencies were saved to a persistent location within the Amazon EC2 instance. By default, these were not deleted after the testing framework completed, but could be deleted using a flag sent to the testing framework. If a tool dependency definition was updated, the new revision would be installed and used in place of the old definition. Additionally, the persistent tool dependency cache was periodically emptied in order to re-test tool dependency installation. This was done on a weekly basis. during Saturday's nightly run.

Here are the details for the two main public Tool Sheds hosted by the Galaxy development team:

## Main Tool Shed

The main Tool Shed tracks the latest stable release of the Galaxy codebase, and the installation and testing framework instantiates a Galaxy instance running the same revision, into which repositories are installed from the main Tool Shed. The testing framework itself is updated to the latest revision of the galaxy-central repository in bitbucket:

## Test Tool Shed

The test Tool Shed tracks the latest revision of the galaxy-central repository on bitbucket, and the installation and testing framework instantiates a Galaxy instance running the same revision, into which repositories are installed from the test Tool Shed. The installation and testing scripts themselves are also kept at the latest revision of galaxy-central from bitbucket.

# Decoupling Galaxy and the testing framework

In order for the testing process to be reliable, the Galaxy instance was running the same revision as the Tool Shed instance that contained the repositories being tested. However, this introduced a weakness in that the testing framework may have been updated in the development branch of the Galaxy repository, without those updates necessarily having been duplicated on the stable branch. In order to overcome this weakness, the functional testing scripts needed to be updated after the Galaxy repository had been cloned and updated to the stable branch, but before running the test suite. The following code illustrates the process to do so:

    build_factory.addStep( Mercurial( repourl='http://bitbucket.org/galaxy/galaxy-central/', branchType='inrepo', defaultBranch='stable' ) )

    # Update the contents of test/install_and_test_tool_shed_repositories to the latest revision by specifying the current date as an
    # argument to the hg revert command.
    build_factory.addStep( ShellCommand( command='hg revert -d "`date -I`" test/install_and_test_tool_shed_repositories/',
                                         flunkOnFailure=False,
                                         name='update test scripts',
                                         description='Update the functional test scripts to the latest revision.' ) )


In the above example, build_factory was an instance of the BuildFactory class from BuildBot, which specifies distinct steps to execute in order to complete a series of tests. This example shows the Galaxy code being cloned from bitbucket and updated to the stable branch, then the scripts used for installing and testing repositories being updated separately to the latest revision in the repository.

# Scripts for inspecting and maintaining the repositories contained within a tool shed

The following scripts were available for inspecting and maintaining the repositories contained within a local tool shed that you are hosting. You can configure cron to execute these scripts on a regular schedule or execute them manually against your local tool shed whenever you choose. Each of these scripts is configured to execute regularly against both of the public tool sheds supported by the core Galaxy development team.

* **~/lib/tool\_shed/scripts/deprecate\_repositories\_without\_metadata.py** - this script would deprecate any repositories that were older than a specified number of days (set on the command line) and had been empty since creation. The owner of the repository would receive an email alerting them that their repository had been marked as deprecated. The owner could mark the repository as not deprecated at any time if they chose to use the repository.

* **~/lib/tool\_shed/scripts/check\_repositories\_for\_functional\_tests.py** - this script would inspect all installable repository revisions in the tool shed, and for those revisions that included valid tools the script inspected each tool configuration file to determine if at least one functional test had been defined for the tool. If not, the tool being checked was flagged as "missing tool test components", where a test component is either a test defined in the tool configuration file or a defined test data file that is not contained within a a subdirectory named **test-data** within the repository file hierarchy. If the repository was missing the **test-data** directory entirely, all tools were flagged as missing test components. When a repository was flagged as missing test components, information about the missing components were uploaded to the repository, and when a user browsed the repository they were able to see the information. See the next section below for details. Repositories that did not have valid tools or a **test-data** directory were marked by this script as "not to be installed and tested", but repositories that contained at least one valid tool with no missing test components was installed and tested.

 This script took one argument, which was the .ini file of the tool shed. Example:
 ```python lib/tool_shed/scripts/check_repositories_for_functional_tests.py tool_shed_wsgi.ini```


* **~/install\_and\_test\_tool\_shed\_repositories.sh** - this shell script executed the test framework contained in ~/test/install\_and\_test\_tool\_shed\_repositories. You could set certain environment variables (all defined within the install\_and\_test\_tool\_shed\_repositories.sh shell script) to direct the test framework to inspect repositories contained within a specified tool shed and install them into a temporary Galaxy environment created by the test framework. The test framework would install only those repositories that had been flagged as having tools with valid functional tests by the ~/lib/tool\_shed/scripts/check\_repositories\_for\_functional\_tests.py script discussed above. The repository was installed into a clean Galaxy instance, each containing tool's functional tests were executed, and the results were uploaded to the repository so that users browsing the repository could see them. On the test and main tool sheds, there was also a configured list of repositories that the Galaxy development team had determined should not be installed. Some reasons this may have been determined were tool dependencies that took longer than 30 minutes to compile or problems with the repository dependency definitions. If a repository had been defined not to be tested in this manner, the install\_and\_test\_tool\_shed\_repositories script would skip that repository and move on to the next one in the list returned from the tool shed API.

 This script required the following environment variables:<br />
 * `GALAXY_INSTALL_TEST_TOOL_SHED_API_KEY` - the API key for the tool shed that was being checked. See [the API page](/src/learn/api/index.md) on how to obtain the API key.
 * `GALAXY_INSTALL_TEST_TOOL_SHED_URL` - must be set to a URL that the tool shed is listening on.<br />
 If the tool shed with repositories being tested was not the Galaxy main or Galaxy test tool shed, `GALAXY_INSTALL_TEST_TOOL_SHEDS_CONF` would be set to a tool sheds configuration file that did specify that tool shed, otherwise repository installation would fail. Example:

    ```export GALAXY_INSTALL_TEST_TOOL_SHEDS_CONF=install_and_test_tool_sheds_conf.xml```
    ```export GALAXY_INSTALL_TEST_TOOL_SHED_API_KEY=5e974afd82d521cd6ddf825c7u572137```
    ```export GALAXY_INSTALL_TEST_TOOL_SHED_URL=http://localhost:9009/```
    ```sh install_and_test_tool_shed_repositories.sh```


# Viewing automated tool test results in the Tool Shed

Every revision of a repository in the Tool Shed that contained tools would be inspected by the **~/lib/tool\_shed/scripts/check\_repositories\_for\_functional\_tests.py** script discussed above to determine if it should be processed by the **~/install\_and\_test\_tool\_shed\_repositories.sh** script. The first script would set certain flags on each repository revision that resulted in the second script either skipping the revision or processing it.

The combination of these two scripts would place the repository revision into one or more of the following categories. The scripts would gather information while processing the repository revision and uploading it to the Tool Shed so that users could see it when managing or reviewing the repository. This information would be available in the **Tool test results** container along with a sub-container labeled **Automated test environment**. Here is an example of a repository revision that displayed these containers.

![](/src/archive/automated-tool-tests/test_environment.png)

* **missing tool test components** - this category contained repository revisions that matched the following criteria:
* the revision contained at least one tool with no defined tests OR
* the revision contained at least one tool with a test that required a missing test data file

Here is an example of a repository revision that displayed this container.

![](/src/archive/automated-tool-tests/missing_test_components.png)

* **tool test installation errors** - this category contained repository revisions that matched the following criteria:
* the revision contained at least one tool
* the revision was not missing any tool test components
* the revision had installation errors (the repository itself, repository dependencies or tool dependencies)

Here is an example of a repository revision that displayed this container.

![](/src/archive/automated-tool-tests/installation_errors.png)

* **failing tool tests** - this category contained repository revisions that matched the following criteria:
* the revision contained at least one tool
* the revision was not missing any tool test components
* the revision had at least 1 tool test that failed

Here is an example of a repository revision that displayed this container.

![](/src/archive/automated-tool-tests/failing_tool_tests.png)

* **skip tool tests checked** - this category contained repository revisions that matched the following criteria:
* the revision contained at least one tool
* the revision had **Skip automated testing of tools in this revision** checked

The owner of a repository could mark one or more specific revisions of a repository as one that should not be tested by the automated test framework. Reasons for marking revisions to be skipped were varied, but usually 3rd party tool dependency licensing was involved. Here is an example of the check box for marking a revision to be skipped.

![](/src/archive/automated-tool-tests/skip_tool_tests.png)

* **no failing tool tests** - this category contained repository revisions that matched the following criteria:
* the revision contained at least one tool
* the revision was not missing any tool test components
* the revision had no tool tests that fail

Here is an example of a repository revision that displayed this container.

![](/src/archive/automated-tool-tests/no_failing_tool_tests.png)

As mentioned above, each repository revision was placed into one or more of these categories. Here is an example of a revision that had some tool tests that passed and others that failed.

![](/src/archive/automated-tool-tests/both_pass_and_fail.png)

# Viewing automated tool test results for the latest revision in the Tool Shed

Lists of the latest installable repository revision that fell into each of the categories discussed above were available from the Tool Shed menu. Repository owners could see how the latest installable revision of their repositories was categorized using the menu options in the following section.

![](/src/archive/automated-tool-tests/owner_latest_revision_lists.png)

Those users that were authorized to review repositories (i.e., members of the Intergalactic Utilities Commission) could see see how the latest installable revision of all repositories were categorized using the menu options in the following section.

![](/src/archive/automated-tool-tests/latest_revision_lists.png)

# Automated Tool Test Results RSS Feed

The automated testing framework produced data that was used to populate an RSS 2.0 feed generated by the tool shed. This RSS feed could then be used by any RSS-compatible feed reader to get updates on the status of a user's repositories and the tests that had been run against them.
![RSS feed of the development team's repositories on the test tool shed, displayed in Firefox.](/src/archive/automated-tool-tests/RSSFeedScreenShotInFirefox.png)

## Accessing the feed

The feed could be accessed by entering a URL with this format into the browser or feed reader:
`http://<tool_shed>/repository/get_functional_test_rss?owner=<username>&status=<status>`
Where status could be 'passed', 'failed', or 'all'.

The RSS feed would return a list of repositories with the following counts:

* Passed tests
* Failed tests
* Missing test components

## Passed tests

If a tool contained within a tool shed repository had one or more tests defined, this attribute would show the number of those tests that had executed successfully, and returned data that matched the specified output file in the **test-data** directory within the repository. This corresponded to the section "Tests that passed successfully" on the **manage repository** page.

## Failed tests

If a tool had one or more tests, but these tests did not complete successfully or returned data that differed from the output files contained within the **test-data** directory, this attribute showed the number of tests returning incorrect data or not executing correctly. This corresponded to the section "Tests that failed" on the **manage repository** page.

## Missing test components

Test components are defined as functional test definitions, files required for testing contained within the **test-data** directory, and the **test-data** directory itself. This attribute shows the number of tests that were missing one or more of these items, and could therefore not be reliably tested. This corresponded to the section "Tools missing tests or test data" on the **manage repository** page.

# Related Pages

## Reviewing, rating and approving tool shed repositories

[This document](/src/toolshed/reviewing-toolshed-repositories/index.md) discusses the goals for reviewing tool shed repositories, their specific contents, and the various components and features involved in their installation into local Galaxy instances and their use within them.
