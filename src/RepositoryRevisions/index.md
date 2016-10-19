---
autotoc: true
---
<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'><img src="/src/Images/Logos/ToolShed.jpg" alt="Galaxy Main Tool Shed" height="174" /></a> </div>



# Adding additional change sets to the initial change set in a repository

For this discussion we'll assume we have created our favorite repository named **filter**, and added a single change set that includes version 1.1.0 of the tool.  Here is a view of the current repository change log.  Notice the grey highlighted phrase: **Repository metadata is associated with this change set.**  Before we go further in our discussion about adding additional change sets, let's discuss repository metadata.

![](/src/RepositoryRevisions/filter_changelog1.png)

# What is repository metadata?

Repository metadata is information about the contents of the repository, and different information is associated with certain change sets in the repository change log.  In our example of the simple filter repository with one change set consisting of version 1.1.0 of the filter tool, the repository metadata is restricted to information about the tool.  This information can be viewed by clicking the pop-up menu for the tool when viewing the repository contents and selecting the **View tool metadata** option.

![](/src/RepositoryRevisions/view_filter_metadata.png)

Selecting **View tool metadata** for our filter tool displays the following page.  Notice that the metadata about the filter tool includes the tool id, version, guid, name, description, requirements and functional tests.

![](/src/RepositoryRevisions/filter_tool_metadata.png)

Repository metadata is not necessarily restricted to information about the tools in the repository.  It will include information about all Galaxy utilities contained in the revision, including custom datatypes, exported Galaxy workflows and repository and tool dependency definitions.  If tools included in the repository require entries in Galaxy's **tool_data_table_conf.xml** file, then certain **.sample** files are required to be included in the repository, and information about the sample files is included in the repository metadata.

# What does it mean when repository metadata is associated with a change set in the repository change log?

Generally speaking, when repository metadata is associated with a change set in the repository change log, it means two things:

* The change set revision contains Galaxy utilities (e.g., Galaxy tools, exported Galaxy workflows) that have been determined to load correctly into Galaxy, and are thus deemed to be "valid" utilities.  Since the change set includes valid utilities, it can be installed into Galaxy using the "`Galaxy <-> Tool Shed`" installation process.

* The change set revision contains components that enable reproducible analyses when it is installed into Galaxy.  What this usually implies is that the revision contains a specific version of a specific Galaxy utility.  The implication here is that if the version of the Galaxy utility changes in a later change set, a new, additional repository metadata record is created and associated with that change set.

Of course, if you clone the repository using hg from the command line, you can update your cloned repository to any change set revision in the cloned repository's change log.  But when installing (i.e., cloning) the repository from the Tool Shed into a local Galaxy instance using the Galaxy admin UI feature that allows you to browse the Tool Shed and install specific change set revisions of a repository, the Galaxy interface is restricting those specific "installable revisions" to the list of change set revisions that are associated with repository metadata.

To clarify this, let's now continue our discussion about adding additional change sets to our **filter** repository.

# Adding a change set that does not generate a new repository metadata record

What changes in a repository change set results in the creation of a new repository metadata record?  As stated in the above discussion, Tool Shed repository metadata enables reproducibility in Galaxy, so metadata is generated to allow specific tool versions to be installed over time since certain analyses may have been performed using a specific version of a tool contained in the repository.

So if the changes in a change set do not include changes to the version of a tool in the repository or eliminate a tool from the repository, a new metadata record will not be generated.  To  demonstrate this, we'll upload a simple text file to our repository that does not change the filter tool contained in the repository.

Uploading files to a non-empty repository introduces additional features on the upload page, so we'll take another look now. When you select the **Upload files to repository** item from the upper right **Repository Actions** menu, the upload page will look similar to the one below. There are 2 important things to take note of here.

* The current repository file hierarchy, labeled **Contents:**, is included in the upload form near the bottom. This feature allows you to browse your repository, and upload a file at a specified point in the hierarchy. This specified point is called the **upload point**, and is selected by clicking the check box to the left of the item in the hierarchy (if you select a file, the upload point will be the folder in which the file is contained). You can upload a single file, or a tarball. If you do not select an upload point, the file will be uploaded to the root of the repository file hierarchy.

* If uploading a tarball, you have the option to automatically remove all files that exist in the repository (relative to the upload point), but do not exist in the uploaded archive. This feature is labeled **Remove files in the repository (relative to the root or selected upload point) that are not in the uploaded archive?**. It streamlines uploading a tarball to the repository root or a selected upload point, completely replacing the existing file hierarchy. Of course, this can have unwanted consequences, so be careful!

In our case we're just uploading  a single text file for now.

![](/src/RepositoryRevisions/upload_non_empty.png)

After uploading the test file, we have the following repository contents.

![](/src/RepositoryRevisions/uploaded_another_readme.png)

Now looking at the repository change log (by selecting the **View change log** option from the **Repository Actions** pop-up menu), we see our two change sets.  The important point to note is that the single repository metadata record is now associated with the new repository tip (1:06ae15bca56a) instead of the change set it was initially associated with (0:d49f482210fc).  Why did this happen?

![](/src/RepositoryRevisions/change_log.png)

The reason that the metadata is associated with the new change set is because the version of the contained utility did not change when the new change set was added to the repository.  No tool versions were changed, no tools were eliminated, etc.  So anyone installing the repository from this point on will install the changes that are include in the change set we just added.

But what about those that may have installed the repository when it only contained the single change set (0:d49f482210fc)?  They can get the updated content for their installed change set revision.

Clicking on the change set link for the repository tip displays the contents of the file named ANOTHER_README that we uploaded.

![](/src/RepositoryRevisions/change_set.png)

# Adding a change set that generates a new repository metadata record

The version of a Galaxy tool is defined in the <tool> tag of the tool config. For example, the tool tag of the filter tool that we previously uploaded looks like this:

```xml
<tool id="Filter1" name="Filter" version="1.1.0">
```


The Galaxy standard is to change the value of the version string for a tool if the tool has been modified such that inputs, parameters or behavior produce different output.  Let's assume that we've changed the behavior of our filter tool in such a way that it requires a new version value, say 2.2.0.  Uploading the new version of the tool to our filter repository will produce some interesting behavior.

In this example, we're uploading a tarball that include only the 2 filter tool files, filtering.xml and filtering.py.  We don't want to eliminate the text file we just uploaded, so we set the **Remove files in the repository (relative to the root or selected upload point) that are not in the uploaded archive?** select list to have the value **No**.

![](/src/RepositoryRevisions/upload_new_tool_version.png)

Uploading the tarball results in the following page.  Notice that, as we desired, the file named ANOTHER_README remains in the repository.

![](/src/RepositoryRevisions/uploaded_new_tool_version.png)

Viewing the repository change log produces the following page.  Notice that we now have two change set revisions with which repository metadata is associated.  Why is this?  Because version 1.1.0 of the repository's filter tool must always be accessible to a Galaxy instance for installation, as well as the new version 2.2.0 of the tool!

![](/src/RepositoryRevisions/change_log2.png)

When we visit the repository's main page after uploading the new version of the filter tool, a **Repository revision** select list is displayed at the top of the page because, in the case of our filter tool, the following criteria are all met:

* The value of the id attribute in the <tool> tag (i.e., Filter1) did not change.
* The value of the version attribute in the <tool> tag changes (e.g., 1.1.0 -> 2.2.0)

The **Repository revision** select list includes an option for each metadata record associated with the repository. 

![](/src/RepositoryRevisions/new_filter_version.png)

The selected option of the **Repository revision** select list will default to the latest change set revision in the repository change log that is associated with a repository metadata record. Selecting an option enables you to install (or download) the versions of the tools within that change set revision into Galaxy. You can also preview the tool versions and you can inspect the metadata for each tool version available in the selected repository revision. For example, selecting revision **1:...** (the repository tip) of our Filter tool now displays version 2.2.0 of the tool when you click on the **name** of the tool in the **Preview tools and inspect metadata by tool version** form.

![](/src/RepositoryRevisions/preview_filter_version_220.png)

Selecting revision **0:...** (the previous revision that properly loads into Galaxy) of our Filter tool displays version 1.1.0 of the tool when you click on the **name** of the tool in the **Preview tools and inspect metadata by tool version** form.

Be aware that if you install a certain "installable revision" of a repository from the Tool Shed into your local Galaxy instance, you will only be able to get new change set updates to your installed revision up to, but not including the next higher "installable revision" in the repository's change log in the Tool Shed.  So, in our filter tool example, if you installed change set revision **0:d49f482210fc** from the Tool Shed when it was the repository tip, you could update your installed repository only up to change set revision **1:06ae15bca56a**.  In order to get version 2.2.0 of the filter tool, you have to install that revision from the Tool Shed as a separate installation in your local Galaxy instance.  This behavior assures that every version of every tool will always be accessible in the Tool Shed, and can be installed into a Galaxy instance to reproduce previous analyses.

# More examples of installable repository changeset revisions

As discussed previously, a new repository revision is created every time a change is made to a repository by committing a new repository change set. This occurs whenever existing repository files are modified or deleted or new files are uploaded. The changes made to the repository for each change set are contained in the repository change log, which can be inspected by selecting the **View change log** option from the repository's **Repository Actions** menu. The latest repository revision is also called the repository tip.

While browsing repositories, you'll notice that the value of some **Revision** columns is a select list, while others are simply text. For example, the barcode_splitter and clustalw repositories in the following page have textual **Revision** column values, while the clustalomega repository's value is a select list.

![](/src/RepositoryRevisions/repository_revisions.png)

Notice that the **Revision** values are a number followed by a **:** and an alpha-numeric string (e.g., 6**:**98d05121d41e). The number automatically increments, and refers to the zero-based number of change sets committed to the repository (i.e, the first committed change set's number is zero). The alpha-numeric string is a unique identifier for each change set within the repository's change log, and the **:** is simply a separator.

Tools that will not successfully load into Galaxy are deemed "invalid", but can still be installed if they are contained in a change set revision that contains at least one "valid" utility.  Invalid tools may require fixes in order for them to properly function within your Galaxy instance. You can [contact the repository owner](/src/RepositoryRevisions/index.md#contact_owner), asking them to commit fixes to their repository if you discover tools with problems.

The criteria by which new repository revisions are generated is described in earlier sections of this page. As another example, let's take a look at the **Revision** column select list for the clustalomega tool. There are 2 options in the select list, 0:ff1768533a07 and 2:bb1847435ec1 (the repository tip). The first option, 0:ff1768533a07, refers to the repository change set that includes clustalomega tool version 0.2.

![](/src/RepositoryRevisions/clustalomega_02.png)

You can download version 0.2 of the clustalomega tool by visiting the above page and selecting the appropriate options from the **Repository Actions** menu, and you can preview version 0.2 of the tool and inspect the metadata for that version using the pop-up menu in the **Preview tools and inspect metadata by tool version** section.

Similarly, you can inspect metadata or download version 1.0.2 of the tool by selecting option 2:bb1847435ec1 in the **Revision** select list.

![](/src/RepositoryRevisions/clustalomega_102.png)

# Resetting metadata on your repositories

There may be occasions when the entire changelog should be inspected and all of the metadata reset on it.  You can reset all metadata on a repository that you are authorized to change by selecting the **Reset all repository metadata** option from the **Repository Actions** menu.

Sometimes it may be necessary to reset metadata on multiple repositories.  For example, if metadata is changed for a repository that is a dependency of another repository, it may be necessary to reset all metadata on each of the repositories in the dependency chain.  A new menu item labeled "Reset metadata on my repositories"  is available in Tool Shed under the section labeled "Repositories I can change".  This features simplifies the process of resetting metadata on multiple repositories.

![](/src/RepositoryRevisions/menu.png)

Clicking the link will display a page like the following.  The list of repositories consists of all repositories in the Tool Shed that you are authorized to change.  You can select any or all repositories and the entire changelog of all selected repositories will be inspected and metadata will be reset for every changeset revision.  Keep in mind that using this feature will eliminate the the list of "Test runs" in the **Automated tool test results** container on the repository's main page.  This information will be made available the next time the automated "Install and test framework" is executed.  This occurs daily for each public Tool Shed.

![](/src/RepositoryRevisions/reset_repos.png)

The Tool Shed API also provides methods for resetting metadata on repositories in the Tool Shed.

# A note on Uploading Tarballs created on a Mac

When creating a tar file on Mac OSX it is important to not include the extended attributes as part of the archive. These extended attributes appear as files with names matching "real" files pre-pended with the *._* characters. To exclude these attribute files, you can create your tar while passing the **COPYFILE_DISABLE** environment variable. An example would be:

```
COPYFILE_DISABLE=1 tar -czf ../tool_shed_upload.tar.gz .
```

