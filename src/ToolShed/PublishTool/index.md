{{> Admin/Tools/LinkBox }}
# How to Publish Your Tool in the Galaxy Tool Shed

# Quick Start

1. Prepare a correct set of tool files
1. Go to [https://toolshed.g2.bx.psu.edu/](https://toolshed.g2.bx.psu.edu/).
1. Create an account.
1. Create a repository.
1. Upload your tool files.

**Done! You are now an owner of a Tool Shed repository and people can install your tool from any Galaxy!**

## Creating an account

The process for creating a Tool Shed account is the same as that in Galaxy, although the Tool Shed is a separate application from the main public Galaxy instance, so user accounts are not shared between the two. Selecting the **Register** option from the **User** menu on the top menu bar allows you to create a new account on the Tool Shed.

## Creating a new repository

You have to login to the Tool Shed in order to create a repository. After logging in, the **Create new repository**, option can be used to create a new, empty Tool Shed repository. If your repository will contain tools and other Galaxy utilities, its type should be **Unrestricted**.  If your repository will contain only a recipe for installing a tool dependency package, its type should be **Tool dependency definition**.

Further information about [TS repository](/src/ToolShed/Repository/index.md).

## Uploading files to a repository

By clicking the **Upload files to repository** button you can upload individual files or archives of files (tar, gzip, and bzip2 compression is supported).

Repository files are not restricted to only the basic Galaxy tool wrapper combination (Galaxy tool config and executable), but can be anything useful to the intent of the repository. For example, if your tool config includes functional tests, your repository should include the input and output datasets used by the tests. These test datasets must all be included in a directory named **test-data**. This directory can be located anywhere in your repository file system hierarchy, but the directory must be named test-data. If your tool refers to an index location file (a xxx.loc file usually stored in the ~/tool-data directory), your repository should include a xxx.loc.sample file so those that download the tool will have an example of the required .loc file for their local Galaxy instance. You may also decide to include one or more exported Galaxy workflows in your repository that provide examples of how your tool may be used.
