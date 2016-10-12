# Tool Shed Repository

## A Repository’s Main Page

Clicking the name link of a repository in the Tool Shed displays the repository’s main page, which provides information about the repository and its contents.  This information includes the repository name, owner, revision being viewed, and several containers for the repository’s Galaxy utilities or information about them.  When clicked, these containers open and display their contents, including repository README files and dependencies defined for the repository.  Galaxy utilities contained within the repository (e.g., tools, Galaxy Data Managers, custom datatypes, exported Galaxy workflows, etc) are also displayed in various containers.  The repository owner can edit certain information about the repository on the main page while other users can only view the information.

The Tool Shed provides an Install and Test Framework that selectively installs repositories into a Galaxy environment and tests contained tools and tool dependency installation recipes.  The results of these tests are displayed within a container labeled Test runs on the repository’s main page.

A pop-up menu labeled Repository Actions, available in the upper right corner of all repository pages, provides access to the repository’s primary features.  Selecting options in this menu will display various pages that enable use of a selected feature.  Repository owners can display the repository’s main page by selecting the Manage repository option from the menu, while others can do so by selecting the View repository option.

The Tool Shed includes a role based authorization framework, including the Repository Reviewer role and the ability to configure the list of “admin users” for the Tool Shed.  With admin users, the *Repository Actions* menu displays all available repository features while other users are restricted from certain features based on authorization policies; whether they are the repository owner, or whether they have been granted permission to add change sets to the repository (i.e., write permission).

Here we’ll provide some details about each of the primary repository features available from the Repository Actions pop-up menu.

## Manage repository administrators

This feature is restricted to the repository owner and Tool Shed accounts that have the specific repository’s Administration role.  User accounts with a repository’s Administration role have access to the same set of repository features that are available to the repository owner.  This allows for repository ownership to evolve over time even though the original owner will always remain the “primary owner”.

## Reset all repository metadata

This feature is restricted to the repository owner and Tool Shed accounts that have been granted write permission on the repository.  In a previous article we introduced Repository Metadata and how certain repository revisions are associated with information stored in the Tool Shed’s database.  We briefly discussed the Tool Shed’s new change set inspection process that decides whether changes should be incorporated into an existing installable revision or whether an additional installable revision should be created.  This inspection process compares the new changes, along with changes in previous change sets in the repository change log back to (but not including) the previous installable revision.  If more than one installable revisions exists, this process will not inspect the entire repository change log.  This inspection process generally works just fine, but in some cases “quirky” changes may require the entire repository change log to be inspected.  This feature performs that task.

## Mark repository as deprecated

This feature is restricted to the repository owner and Tool Shed user accounts that have been granted write permission on the repository.  To ensure reproducibility, repositories that have been installed into Galaxy cannot be deleted.  However, certain repository contents may occasionally become outdated, perhaps due to other repositories with tools that replace the outdated tools.  In these cases, the repository can be deprecated.  Many features are eliminated from deprecated repositories, and these repositories are not included in most Tool Shed lists or searches.  However, deprecated repositories are included in the Tool Shed’s Install and Test Framework since other repositories can require them, and Galaxy administrators that installed a repository before it was deprecated can still access it in the Tool Shed to get appropriate updates and other information.

## Browse repository tip files

This feature is available to all Tool Shed accounts.  It uses the Tool Shed’s built-in file browser to display the files contained within the repository’s most recent change set, called the “repository tip”.

## View change log

This feature is available to all Tool Shed accounts.  It provides the ability to scroll through the entire repository change log and view the changes made in each change set.

## Contact repository owner

This feature is available to all Tool Shed accounts except the repository’s owner.  It allows a user to send an email message to a repository’s owner without displaying the owner’s email address.  This feature can be used for communicating problems discovered with the repository or its contents or for asking questions about utilities contained within the repository.

## Export this revision

This feature is available to all Tool Shed accounts.  It will inspect the selected repository revision and create a compressed archive of files that can be imported into another Tool Shed.  I’ve called this archive a repository capsule.  This feature streamlines the Galaxy utility development process for the Tool Shed in that it allows for an entire repository dependency hierarchy to easily be moved from one Tool Shed to another.  For example, a repository capsule could be exported from a local development Tool Shed and imported into the Test Tool Shed hosted by the Galaxy Development Team.  Similarly, a capsule could be exported from the Test Tool Shed and imported into the Main Tool Shed.  All of the repository’s defined repository dependencies can optionally be included in the same capsule.

An XML file named manifest.xml is automatically created and included in the capsule.  This file contains the entire list of repositories contained within the capsule and the order in which they must be imported into a Tool Shed.  This file also includes information about each repository (e.g.,the repository owner and revision) as well as the Tool Shed categories associated with each of them.  The Tool Shed into which the capsule is imported will be inspected to see if any of the contained repositories already exists.  Those that do will not be overwritten or altered in any way.  A repository created in a Tool Shed from an imported capsule will be defined as installable only if its creation resulted in no errors.

Since repositories that were exported into a capsule are associated with a user (the owner), the user importing the capsule into a Tool Shed must be authorized to create the repository in that Tool Shed with that specific owner.  If the current user is an admin user or is a member of the Tool Shed’s Intergalactic Utilities Commission, all repositories will be created no matter the owner.  Otherwise, only repositories whose associated owner is the current user will be created.

## Rate repository

This feature is available to all Tool Shed accounts except the repository’s owner.  It provides a 5 star rating system and a text field for adding reviews and comments.

## Add a review to this revision

This feature is restricted to Tool Shed accounts that have the Tool Shed’s Repository Reviewer role.  This feature allows any number of reviewers to critique the contents of selected revisions of the repository, providing valuable feedback to the owner about steps to take to correct or improve them.  This process will be discussed in depth in a future post.

## Download as…

This feature is available to all Tool Shed accounts, and creates and downloads a compressed archive (tar or zip) of the repository to a local file system.  Supported compression types are gzip and bzip2.

[Advanced Repository Features](/ToolShed/AdvancedRepositoryFeatures)
