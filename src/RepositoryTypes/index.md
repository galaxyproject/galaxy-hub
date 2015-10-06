<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'><img src='/Images/Logos/ToolShed.jpg' alt='Galaxy Main Tool Shed' height="174" /></a> </div>

# Repository Types

Repositories in the Tool Shed have types.  These types provides a mechanism for categorizing repositories based on their contents, specifically the set of Galaxy utilities that they contain.  Galaxy utilities are tools, custom datatypes, tool and repository dependency definitions and exported Galaxy workflows.  Associating a repository with a type results in certain behaviors related to generating metadata for the repository revisions.  As new repository types are introduced over time, these special behaviors may expand beyond repository metadata.

There are currently two repository types.

* **Unrestricted** - the repository can contain any set of Galaxy utilities or files
* **Tool dependency definition** - the repository can only contain a single file named **tool_dependencies.xml**

A repository's type can be set when it is first created, or, in some cases, after it has been populated with certain contents.  The default repository type is **Unrestricted**, and all repositories that existed before this feature was introduced have been set to this type in the Tool Shed.  However, repositories that have only contained a single file named **tool_dependencies.xml** since they were created can be changed from the default **Unrestricted** to the more specialized type **Tool dependency definition**.  To ensure reproducibility, repositories whose type is set to **Tool dependency definition** cannot be changed back to **Unrestricted** or to any future type after the repository has been cloned (i.e., manually downloaded as a tarball or automatically installed into Galaxy).

To set a repository's type after it has been created and populated (and possibly cloned), visit the **Manage repository** page by selecting the option from the **Repository Actions** pop-up menu and look for the **Repository type** label.  In some cases, the type cannot be changed due to the current contents of the repository.

Why is it important to associate the appropriate type with a repository?  To ensure that certain repository features are functionally correct and possibly restricted to specialized behavior.  For example, when a repository is associated with the **Tool dependency definition** type, the repository will always be restricted to having a single changeset revision (it's changelog tip) associated with metadata.  This behavior results in dependent repositories always getting the latest revision of the tool dependency definition from it's required repository.  This is why these special types of repositories must be appropriately named according to the name and version of the dependency package, and new versions of the same package must be contained in a separate specialized repository.

Following best practices, repositories of type **Tool dependency definition** are named something like package_<name>_<version> (e.g., package_amos_3_1_0, package_ape_3_0, package_atlas_3_10, etc) and are contained in the **Tool Dependency Packages** category in the Tool Shed.  The name of the repository contains the package name as well as the version because the contents of the repository must contain only the recipe for installing that specific version of that package.  If a new version (say 3.1) of the ape package is introduced some time in the future, then a new repository named package_ape_3_1 should be created to contain the recipe for installing that version.

Since the recipe for installing a certain version of a package may change over time, new revisions of the **tool_dependencies.xml** file will need to be uploaded to these types of repositories.  Since the metadata will always be associated with the tip changeset of these repositories, dependent repositories will always get the most recent recipe.

Another important point is that dependent repositories will not have new metadata records generated if their required repository is of type **Tool dependency definition** and only the changeset revision for that required repository changes.

To clarify this point, assume we have:

* **repoA** of type Tool dependency definition
* **repoB** of type Unrestricted
* **repoC** of type Unrestricted

The dependency chain is repoC depends on repoB, which depends on repoA.  Now, keeping in mind that dependency definition files can be uploaded to a repository such that the <repository> tag set does not include a changeset_revision attribute (because not including it will result in it's being automatically populated with the defined repository's changelog tip), assume the following:

 1) The owner of repoA uploads a new **tool_dependencies.xml file**, creating a new changelog tip
 2) The owner of repoB uploads a new **repository_dependencies.xml file** whose <repository> tag that defines repoA does not include the changeset_revision attribute.

If repoA were of type **Unrestricted**, then repoB would have a new, additional metadata revision after step 2, which would result in repoC not being able to get the update.  But since repoA is of type **Tool dependency definition**, repoB will not have an additional metadata record generated after step 2 (it's previous metadata record will instead simply be "moved up" in it's changelog) and repoC will be allowed to get the update for that change.
