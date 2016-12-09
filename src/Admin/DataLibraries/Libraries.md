1. 
  1. page was renamed from Admin/Data Libraries/Libraries 

2. format text/creole 

# Data Libraries

* * *

Data libraries provide a hierarchical container for datasets (i.e., library datasets). Data libraries can contain datasets and folders, and folders can contain datasets and sub-folders, and so on. Storing datasets in a data library rather than a Galaxy history provides several benefits which will be described in this document.

This document refers to the Galaxy Admin perspective which is available only to [admin users](Admin%2FInterface) and is accessed by clicking on the "Admin" link in the top Galaxy menu bar.

### Creating data libraries

Currently, only Galaxy [admin](Admin%2FInterface) users can create data libraries. To create a new data library, log in as an admin user and click on the "Manage data libraries" link in the [admin menu](Admin%2FInterface), displaying the data libraries browser.

![](/DataLibraries/browse_libraries1.png)

Click the "Create new data library" button in the upper right corner to display the "Create a new data library page".

![](/DataLibraries/create_library.png)

Name your library appropriately. If you add text to the optional "Description" field it will be displayed on the data libraries browser, providing information about your data library.

![](/DataLibraries/browse_libraries2.png)

When creating the data library, the "Synopsis" field is also optional and is displayed when you browse a specific data library. To browse a data library, click on the name of the data library in the data libraries browser. Browsing the data library we just created will display the following page.

![](/DataLibraries/browse_library1.png)

### Working with data libraries

Some of the actions that can be performed on data libraries are accessed by clicking the pop-up menu icon (the downward-pointing triangle) just right of the data library name.

![](/DataLibraries/library_popup_menu.png)

Selecting "Edit Information" from the pop-up menu allows you to change the name, description and synopsis of the data library.

![](/DataLibraries/library_info1.png)

Selecting "Add template" allows you to add a template to the data library. See our [Data Library Templates page](/Admin/DataLibraries/LibraryTemplates) for details about using data library templates.

Selecting "Edit permissions" allows you to associate roles with actions that can be performed on the data library from the Data Libraries perspective. See our [Data Library Security page](Admin%2FDataLibraries%2FLibrarySecurity) for details about managing data library permissions and library dataset security.

The other 2 options in the pop-up menu, "Delete this data library" and "Show deleted items" will be discussed shortly.

### Adding datasets and folders

Datasets and folders can be added to the data library using the "Add datasets" and "Add folder" buttons in the upper right corner of the page. All datasets in a data library are contained within folders, and the top level of the data library is called the root folder. Folders can contain any number of datasets and sub-folders, providing a flexible, hierarchical structure.

**Aside from the policies enabling data security, a very important aspect of storing datasets in a data library is that they can be used any number of time by any number of users without duplicating the single disk file.** Users that can access a library dataset can import it into their Galaxy history for analysis any number of times, and the history item is just a pointer to the single disk file, so no file duplication is necessary. This potentially eliminates huge amounts of disk space for very large files.

There are several options for uploading datasets into a data library. See our [Uploading Files to a Data Library page](Admin%2FDataLibraries%2FUploadingLibraryFiles) for details. Only the "Upload files" option will be used in this document.

Clicking the "Add datasets" button displays the "Create new library datasets" page. The following image shows this page after we have selected a file named 1.bed for upload, selecting hg18 as the genome, and adding the text "This is the message" to the field labeled "Message".

![](/DataLibraries/upload_dataset2.png)

The select list labeled "Restrict dataset access to specific roles" is related to library dataset security, and will not be discussed in this document. See our [Data Library Security page](Admin%2FDataLibraries%2FLibrarySecurity) for details about managing library dataset security.

We'll upload another dataset named 2.bed to the data library's root folder. In doing this, we see that the "Genome" field on the upload form has kept the last selection we made (hg18) for our previous upload. This value is kept for each folder, and it is automatically set for each new upload in each folder.

We'll next add a folder to the data library by clicking the "Add folder" button in the upper right corner of the page. The following page is displayed where we'll name the folder and provide a description.

![](/DataLibraries/create_folder.png)

Clicking the "Create" button will display the following page, which is referred to as the "browse data library" page.

![](/DataLibraries/browse_library5.png)

Clicking the blue triangle to the left of the folder name will display the contents of the folder. Since our folder does not yet have any contents, nothing is displayed when we click it. Details for adding items to folders is described in the next section.

### Working with folders

Like data libraries, actions can be performed on folders. The folder pop-up menu icon (the downward-pointing triangle) is located just right of the folder name (or the folder description if one exists). Clicking it displays the following menu options.

![](/DataLibraries/folder_popup_menu2.png)

Here are the actions that we can perform on a folder:

- **Add datasets** - the process for adding datasets to a folder is exactly the same as that described in the last section. In fact, when we uploaded the 2 datasets to the data library in the last section, we were actually uploading them to a folder since the top level of the data library is it's root folder. 

- **Add sub-folder** - for the same reason, the process for adding sub-folders to a folder is exactly the same as that described in the last section. 

- **Edit information** - like the data library's pop-up menu described above, selecting this option allows you to edit the name and description of the folder. 

- **Add template** - this allows you to add a template to the folder. See our [Data Library Templates page](/Admin/DataLibraries/LibraryTemplates) for details about using data library templates. 

- **Edit permissions** - this allows you to associate roles with actions that can be performed on the folder from the Data Libraries perspective. See our [Data Library Security page](Admin%2FDataLibraries%2FLibrarySecurity) for details about managing data library permissions on folders. 

- **Delete this folder** - we'll discuss this option in the following section. 

At this point we'll add 2 datasets (3.bed and 4.bed) to our new folder. Then we'll add a sub-folder to our folder and add 2 datasets (5.bed and 6.bed) to it. Our data library now looks like this.

![](/DataLibraries/browse_library6.png)

We now have enough folders in our data library to allow us to demonstrate deleting them.

### Deleting folders

As noted in the previous section, the pop-up menu for folders includes the item "Delete this folder". We'll delete the sub-folder we just added. This produces a pop-up dialog where we can confirm or cancel the deletion.

![](/DataLibraries/delete_folder1.png)

When we confirm that we want to delete the folder, it will disappear from the data library. However, the folder still exists and the state of the folder's contents is saved. To demonstrate this behavior, we'll go back to the data library's pop-up menu and select the "Show deleted items" option that we passed over in the **Working with data libraries** section above. Here is what is displayed.

![](/DataLibraries/browse_library7.png)

Notice that the folder name is now highlighted in red because it is deleted. However, the state of the 2 datasets it contains remains the same (not deleted). This allows for un-deleting the folder at some point if desired, and the contents of the folder will be as they were. Now if we click the deleted folder's pop-up menu, we find that the only action we can perform on it is "Undelete this folder".

### Working with datasets

Like data libraries and folders, actions can be performed on library datasets. The dataset pop-up menu icon (the downward-pointing triangle) is located just right of the dataset name. Clicking it displays the following menu options (we've clicked it on dataset 1.bed).

![](/DataLibraries/dataset_popup_menu3.png)

Here are the actions that we can perform on a dataset:

- **Edit information** - a dataset has many attributes, so we'll discuss this option in detail next. 

- **Add template** - this allows you to add a template to the dataset. See our [Data Library Templates page](/Admin/DataLibraries/LibraryTemplates) for details about using data library templates. 

- **Edit permissions** - this allows you to associate roles with actions (including accessing the dataset) that can be performed on the dataset from the Data Libraries perspective. See our [Data Library Security page](Admin%2FDataLibraries%2FLibrarySecurity) for details about managing permissions on datasets. 

- **Upload a new version of this dataset** - data libraries allow for multiple versions of a dataset. We'll look into this shortly. 

- **Import this dataset into your current history** - this creates an item in your current history on which you can perform analysis. The item is a pointer to the library dataset disk file, so the file is not copied on disk. 

- **Download this dataset** - this allows you to download a local copy of the dataset. 

- **Delete this dataset** - we'll look into this shortly. 

At this point we'll select the **Edit information** option, and we are presented with the following page.

![](/DataLibraries/dataset_info1.png)

For those that are familiar with Galaxy, you'll notice that this page looks very similar to the page that is displayed when you click the pencil icon in a history item. The only difference here is the blurb at the top of the page stating "This is the latest version of this library dataset". To demonstrate the data library's support of datasets versions, let's first change the dataset name from "1.bed" to be "1.bed (version 1)" and click the "Save" button in that section on the page.

Now browsing the library displays this.

![](/DataLibraries/browse_library8.png)

### Library dataset versions

Now we'll select the **Upload a new version of this dataset** option from the dataset's pop-up menu, and we're presented with the dataset upload form. Notice the text at the top of the form stating "You are currently selecting a new file to replace '1.bed (version 1)'." In the following image, we have selected a file named "7.bed" for upload.

![](/DataLibraries/upload_dataset3.png)

Clicking "Upload to library" produces the following page.

![](/DataLibraries/browse_library9.png)

Now we'll click on the dataset name to view the information about it, and here is what we see.

![](/DataLibraries/dataset_info2.png)

Galaxy keeps track of all versions of a library dataset, and clicking on the link for the expired version will display it's information.

![](Admin/DataLibraries/Libraries/dataset_info3.png)

### Deleting datasets

As noted earlier, the pop-up menu for datasets includes the item "Delete this dataset". We'll delete the dataset named "2.bed". This produces a pop-up dialog where we can confirm or cancel the deletion.

![](/DataLibraries/delete_dataset1.png)

When we confirm that we want to delete the dataset, it will disappear from the data library, and when we select the "Show deleted items" from the library's pop-up menu, we'll see the dataset highlighted in red, just like the folder we deleted earlier.

![](/DataLibraries/browse_library10.png)

Clicking the pop-up menu for the deleted dataset shows us that the only actions that can be performed on a deleted dataset is "View information" and "Undelete this dataset".

When a library dataset has been marked deleted in this way, the script /<galaxy install dir>/scripts/cleanup\_datasets/cleanup\_datasets.py will manage the process of deleting the disk file. This script should always be used to manage disk files, and no file should ever be manually deleted from disk.

### Deleting data libraries

Similar to folders and datasets, it is also possible to mark a data library as deleted. Selecting "Delete this data library from the data library's pop-up menu produces the following pop-up dialog.

![](7DataLibraries/delete_library1.png)

After we confirm the deletion, the library disappears from the data libraries browser, but clicking on the "Advanced search" link shows us that we can search for deleted libraries. Clicking on the "deleted" link in "Advanced search" displays our deleted data library.

![](/DataLibraries/deleted_library1.png)

When we browse the library, we see that the state of all of it's contents was not affected by the deletion, and the library's pop-up menu allows us to un-delete the library.

For additional information, see our [Data Libraries and Sample Tracking tutorial](Admin%2FDataLibraries%2FLibrarySampleTracking).

