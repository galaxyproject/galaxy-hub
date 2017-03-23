1. 
  1. page was renamed from Admin/DataLibraries/Library Security 
  2. page was renamed from Admin/Data Libraries/Library Security 

2. format text/creole 

# Data Library Security

* * *

Galaxy's security for data libraries is powerful and flexible. With regard to data libraries, "security" refers to restricting access to contained datasets as well as restricting actions that can be performed on a data library or it's contents. Galaxy's data library security enables restricting access to any item (folders and datasets) in a data library hierarchy to any number of users, making it easy to secure data.

This document refers to two Galaxy "perspectives"; the Admin perspective which is available only to [admin users](Admin%2FInterface) and is accessed by clicking on the "Admin" link in the top Galaxy menu bar, and the Data Libraries perspective which is available to all users (even those not logged in) and is accessed by clicking on the "Data Libraries" link in the top Galaxy menu bar.

### Public data libraries

When a data library is first created, it is considered public because anyone (even users that have not logged in) can access it from the "Data Libraries" perspective. So by default, data libraries are open to the public. Let's inspect the permissions settings on a new data library. To do this, create a new data library, browse to it in the data libraries browser and select the "Edit permissions" option in the data library's pop-up menu (click the downward-pointing triangle just right of the data library name).

![](DataLibraries/library_popup_menu.png)

Something similar to the following page is displayed. In our case, we have 4 Galaxy users as follows:

- **test@bx.psu.edu** - this is a Galaxy admin user 
- **test1@bx.psu.edu** - this is a regular user 
- **test2@bx.psu.edu** - this is a regular user 
- **test3@bx.psu.edu** - this is a regular user 

Each Galaxy user is associated with a private role which is the same as their login (email address), and these roles are displayed in the boxes labeled "Roles not associated" for each of the permissions on the data library. All roles that exist in your Galaxy instance, whether private or not, will be displayed here. In our case we have 1 non-private role named role1, and both users **test1@bx.psu.edu** and **test2@bx.psu.edu** have that role.

![](DataLibraries/library_permissions1.png)

With the exception of **access library** , each of these permissions is also available on the data library's contained folders and datasets. We'll describe this in more detail later, but for now our discussion is restricted to the data library itself.

With regard to permissions, a Galaxy admin user is a special case in that admin users have permission to perform all actions on libraries, but **only** from the Admin perspective. Within the Data Libraries perspective, admin users are considered the same as any user.

### Permissions on data libraries

Here is a description of each of the permissions on a data library. These permissions are relevant only in the Data Libraries perspective, and except for being able to access public data libraries, users that are not logged in will not have permission to perform any of these actions. These permissions provide all of the security on a data library.

- **modify library item** - Users that have a role associated with this permission are allowed to edit the data library's information, add a template to the data library or edit the layout of the data library's template if one exists. 

- **access library** - If no role is associated with this permission, the data library is considered public (see above). However, if any roles are associated with this permission, only those users that have one or more of the associated roles will be able to see the data library from the Data Libraries perspective. 

- **add library item** - Users that have roles associated with this permission can add folders and datasets to the top level of the data library hierarchy (i.e, the data library itself, but not necessarily to any of it's contained folders - more on this in the following sections of this document). 

- **manage library permissions** - Users that have roles associated with this permission can associated or dis-associate roles with permissions (using the form displayed above) on the data library, but not necessarily any of it's contained folders and datasets (again, more on this later). 

### Data libraries that are not public (restricted) and more on data library permissions

As mentioned above, if any roles are associated with the **access library** permission, only those users that have one or more of the associated roles will be able to see the data library from the Data Libraries perspective. To demonstrate the behavior of each data library permission, we'll set permissions as follows.

- Move the role **test1@bx.psu.edu** to the "Roles associated" box under the **modify library item** permission. 
- Move the role **role1** to the "Roles associated" box under the **access library** permission. 
- Move the role **test2@bx.psu.edu** to the "Roles associated" box under the **add library item** permission. 
- Move the role **test1@bx.psu.edu** to the "Roles associated" box under the **manage library permissions** permission. 

Now we'll save the changes by clicking the "Save" button at the bottom of the page and the following page will be displayed.

![](DataLibraries/library_permissions2.png)

Note that the private roles **test@bx.psu.edu** and **test3@bx.psu.edu** are no longer displayed in any of the permissions boxes. They have been eliminated because users that have those roles do not have access to the data library (i.e., neither of the users with those private roles will see the data library from the Data Libraries perspective), so they will not be able to perform any actions on it.

We'll now log out (we've been logged in as an admin user) and log back in as user **test1@bx.psu.edu** (a regular user). After we login, we'll browse all data libraries that we can access (by clicking on the "Data Libraries" link) where we discover that we can see the library named "My first data library" (this is because **test1@bx.psu.edu** has role1, and it is associated with the **access library** permission on this restricted data library).

We'll browse the data library (by clicking on it's name in the data libraries browser) and click the library pop-up menu just right of the data library name. The following pop-up menu is displayed. Remember that user **test1@bx.psu.edu** has a private role named **test1@bx.psu.edu** , and that role is associated with both **modify library item** and **manage library permissions** on the data library. That is why the menu contains the items that it does. If the data library already had an associated template, the "Add template" action would be replaced with "Edit template".

Another important point to note is that the "Add datasets" and "Add folder" buttons are not displayed in the upper right corner of the page. This is because the user **test1@bx.psu.edu** does not have a role associated with the **add library item** permission on the data library.

![](DataLibraries/library_popup_menu1.png)

To further demonstrate data library permissions, we'll log out again and log back in as user **test2@bx.psu.edu** , and browse this same data library. When we click the pop-up menu now, nothing is displayed, but notice that the "Add datasets" and "Add folder" buttons are displayed. This is because this user's **test2@bx.psu.edu** private role is associated with the **add library item** permission on the data library, but the user does not have a role associated with any of the permissions required to perform the actions available in the pop-up menu.

![](Admin/DataLibraries/LibrarySecurity/library_popup_menu2.png)

### Permissions on folders

By default, folders added to the top level of the data library hierarchy inherit the data library permissions settings. To demonstrate this, we'll log back out and log in again as **test@bx.psu.edu** (an admin user), go to the Admin perspective, and select "Manage data libraries" from the Administrator menu. This will display the data libraries browser from which we'll browse the data library named "My first data library". We'll add a folder named "My first folder" to the data library. Clicking the folder popup-menu just to the right of the folder name (or folder description, if one exists) will display the following menu.

![](DataLibraries/folder_popup_menu1.png)

Selecting "Edit permissions" will display the following page. Notice that the "Roles associated" settings have all been inherited from the data library. Also notice that the **library access** permission is not displayed. That permission is a special case in that it is only relevant to the data library (so it is only available at the data library level).

![](DataLibraries/folder_permissions1.png)

These security settings affect the actions that can be performed on this folder by the 2 users the same way that the settings on the data library affect them. If we login as user **test1@bx.psu.edu** , browse to this data library from the Data Libraries perspective and click the folder's pop-up menu, we see that we can "Edit information", "Add template" and "Edit permissions". If we login as user **test2@bx.psu.edu** , we find that we can only "Add datasets" and "Add sub-folders" to the folder.

A notable point on folder permissions is that a folder's sub-folders will all inherit their permissions settings from their parent folder, and not the data library. This provides more flexibility with permission inheritance because each folder can be set with different permissions, and the contained hierarchies of each folder will inherit them. The permissions settings can be altered for any folder at any level in the folder hierarchy.

Permission settings are only inherited to newly-added folders and datasets. If permission settings are changed on a folder containing sub-folders and datasets, none of the settings on them will be changed automatically (they'll have to be done manually if desired).

A folder's behavior is also affected by permission settings on it's contained datasets, which will be described in the following section.

### Permissions on (data library) datasets

Like folders, datasets inherit their data library permissions settings from their container (i.e., folder). However, permissions on datasets differ slightly from those on data libraries.

Let's log in as **test@bx.psu.edu** (the admin user) again, and add a dataset to the data library. The following page is displayed when the "Add datasets" button is clicked. We've selected a file for upload (1.bed) and set the genome to hg18.

![](DataLibraries/upload_dataset1.png)

Note the select list labeled "Restrict dataset access to specific roles". If the data library is public, this list will include every role, but if the data library is not public, the list of roles is derived from the set of users that have access to the data library (i.e., the list consists of only the unique set of roles associated with all users that can access the data library). If no roles are selected in this list (for now we'll not select any), the dataset is considered public (more on this in a minute). After clicking the "Upload to data library" button, the following page is displayed.

![](DataLibraries/browse_library2.png)

Notice that the just-uploaded dataset is selected, and the default action that we can perform on it is "Edit permissions". Clicking the "Go" button displays the following page.

![](DataLibraries/dataset_permissions1.png)

The settings for the 3 data library permissions ( **modify library item** , **add library item** and **manage library permissions** ) have all been inherited from the containing folder.

Notice the additional permission on the dataset:

- **access** - This permission is similar to the **access library** permission described earlier in that if no roles are associated with it, the dataset is considered public. However, if any roles are associated with this permission, then a user **must have all associated roles** in order to access the dataset. This differs from the behavior of the **access library** permission on data libraries since a user has to have only 1 of the roles associated with that permission in order to access the data library. 

The reason for this is important and can best be justified with a scenario. Let's assume the following:

- User **test1@bx.psu.edu** can somehow access dataset1 
- Both users **test1@bx.psu.edu** and **test2@bx.psu.edu** can somehow access dataset2 

The user **test1@bx.psu.edu** uses both dataset1 and dataset2 as input to a Galaxy tool, which produces dataset3 as output. Now dataset3 possibly includes data from both dataset1 and dataset2, so the permissions on dataset3 are derived from the permissions on both of it's ancestor datasets (dataset1 and dataset2). If the user **test2@bx.psu.edu** only had to have 1 of the roles associated with the **access** permission on dataset3, then they would be able to access it, in essence accessing the data in dataset1 even though they are restricted from accessing dataset1. Forcing users to have **all** roles associated with the **access** permission on a dataset eliminates this security breach.

Another very important point to note on public datasets: being public implies that the dataset is accessible to all users that can access the data library. So if the data library is public and the dataset is public, then any user (even those not logged in) can access the dataset. However, if access to the library is restricted to, for example, role1, then only those users that have role1 will be able to access the library, so only they will be able to see the dataset even though it is public (has no access restrictions placed on it).

We'll leave the above permission settings as they are for now (the dataset is public) in order to demonstrate the behavior the settings produce in the Data Libraries perspective. We'll first logout and then log in as user **test1@bx.psu.edu** , visit the Data Libraries perspective, browse the data library, and click on the dataset's pop-up menu. Here is what we see:

![](DataLibraries/dataset_popup_menu1.png)

Since the private role for user **test1@bx.psu.edu** is associated with the **modify library item** permission, they are allowed to edit the information about the dataset, add a template to the dataset or edit the template layout if one is already associated, and upload a new version of the dataset. Since the same private role is associated with the **manage library permissions** permission, they are also allowed to edit the permissions on the dataset. Any user that can access a dataset can import it into their history for analysis or download it.

Next we'll log in as user **test2@bx.psu.edu** , browse to the same dataset, and click the pop-up menu. Here is what we now see:

![](DataLibraries/dataset_popup_menu2.png)

Since the private role for user **test2@bx.psu.edu** is only associated with the **add library item** permission (which is not applicable to datasets), they are only allowed to view the information about the dataset, import it into their history or download it.

To further demonstrate how permission settings on datasets affect the behavior of their containing folder, we'll do the following:

- Make the data library public by eliminating all role associations from the **access library** permission on the data library 
- Add a public dataset to the folder (the only dataset we've added so far has been to the data library itself) 

The image below shows what we now have. Dataset 1.bed is a public dataset contained in the (now public) data library, and dataset 2.bed is a public dataset contained in the folder named "My first folder".

![](DataLibraries/browse_library3.png)

We'll now log out and browse the data library from the Data Libraries perspective wiithout logging back in. We find that we can access the data library (since it is public), and we can see both dataset 1.bed and 2.bed, just as in the above image.

Next we'll login as **test@bx.psu.edu** (the admin user) and associate the private role for the user **test2@bx.psu.edu** with the **access** permission on dataset 2.bed. We'll then log out and again browse the data library from the Data Libraries perspective wiithout logging back in. Here is what we now see:

![](DataLibraries/browse_library4.png)

Notice that the folder named "My first folder" is no longer displayed, This is because it has no contents that are publically accessible. In fact, the only user that will currently see this folder is **test2@bx.psu.edu** since all of the current contents of the folder are only accessible to that user.

When a data library is browsed, each folder is checked to determine the subset of the total contents (sub-folders and datasets) of the folder that the current user can access, and only that subset of the contents is displayed. If the subset is nothing, the folder is not displayed.

### Ensuring datasets are accessible

As mentioned earlier, if any roles are associated with the **access** permission on a dataset, then a user **must have all associated roles** in order to access the dataset. This implis that care must be taken to ensure that associating roles with this permission will not render the dataset in-accessible to everyone. Galaxy handles this for you.

To demonstrate, we'll login as **test@bx.psu.edu** (the admin user) and browse to the library from the Admin perspective. We'll edit permissions on dataset 1.bed, attempting to associate both private roles **test1@bx.psu.edu** and **test2@bx.psu.edu** with the **access** permission. Note that this would render the dataset in-accessible, since no user has both of these roles. Here is the result of our attempt:

![](DataLibraries/dataset_permissions2.png)

In fact, since there is a 1-to-1 mapping between users and private roles, we should not be allowed to associate more than 1 role with the **access** permission on the dataset if any of the roles are private. Here is what we get if we try to do this by associating both non-private role **role1** and private role **test1@bx.psu.edu** with the **access** permission on the dataset:

![](DataLibraries/dataset_permissions3.png)

### Displaying private roles

As you have been made aware, private roles are the same as the user's Galaxy login (their email address). Because of this, private roles are displayed in permission forms only within the Admin perspective. The one exception to this is the current user's private role. To demonstrate this, we'll login as user **test1@bx.psu.edu** and browse to the data library from the Data Libraries perpsective. Remember that this user's private role is associated with the **manage library permissions** on the data library, so they are allowed to edit the permissions forms for the data library and some or all of it's contents. When we choose "Edit permissions" from the data library's pop-up menu, we see the following page. As you can see, with the exception of the current user's private role, no private roles are displayed in any of the permissions boxes.

![](DataLibraries/library_permissions3.png)

### Notes on security from Admin Page

Data Security and Data Libraries

Security - Data security in Galaxy is a new feature, so familiarize yourself with the details which can be found here or in our <a href=" [http://wiki.galaxyproject.org/Learn/Security%20Features](http://wiki.galaxyproject.org/Learn/Security%20Features)" target="\_blank">data security page</a>. The data security process incorporates users, groups and roles, and enables the application of certain permissions on datasets, specifically "access" and "manage permissions". By default, the "manage permissions" permission is associated with the dataset owner's private role, and the "access" permission is not set, making the dataset public. With these default permissions, users should not see any difference in the way Galaxy has behaved in the past.

Users - registered Galaxy users that have created a Galaxy account. Users can belong to groups and can be associated with 1 or more roles. If a user is not authenticated during a Galaxy session, they will not have access to any of the security features, and datasets they create during that session will have no permissions applied to them (i.e., they will be considered "public", and no one will be allowed to change permissions on them).

Groups - a set of 0 or more users which are considered members of the group. Groups can be associated with 0 or more roles, simplifying the process of applying permissions to the data between a select group of users.

Roles - associate users and groups with specific permissions on datasets. For example, users in groups A and B can be associated with role C which gives them the "access" permission on datasets D, E and F. Roles have a type which is currently one of the following:

private - every user is associated automatically with their own private role. Administrators cannot manage private roles.

user - this is currently not used, but eventually any registered user will be able to create a new role and this will be its type.

sharing - a role created automatically during a Galaxy session that enables a user to share data with another user. This can generally be considered a temporary role.

admin - a role created by a Galaxy administrator.

Dataset Permissions - applying the following permissions will to a dataset will result in the behavior described.

access - users associated with the role can import this dataset into their history for analysis.

If no roles with the "access" permission are associated with a dataset, the dataset is "public" and may be accessed by anyone that can access the data library in which it is contained. See the Manage data libraries section above for details. Public datasets contained in public data libraries will be accessible to all users (as well as anyone not logged in during a Galaxy session) from the list of data libraries displayed when the "Data Libraries" menu item is selected.

Associating a dataset with a role that includes the "access" permission restricts the set of users that can access it. For example, if 'Role A' includes the "access" permission and 'Role A' is associated with the dataset, only those users and groups who are associated with 'Role A' may access the dataset.

If multiple roles that include the "access" permission are associated with a dataset, access to the dataset is derived from the intersection of the users associated with the roles. For example, if 'Role A' and 'Role B' are associated with a dataset, only those users and groups who are associated with both 'Role A' AND 'Role B' may access the dataset. When the "access" permission is applied to a dataset, Galaxy checks to make sure that at least 1 user belongs to all groups and roles associated with the "access" permission (otherwise the dataset would be restricted from everyone).

In order for a user to make a dataset private (i.e., only they can access it), they should associate the dataset with their private role (the role identical to their Galaxy user name / email address). Associating additional roles that include the "access" permission is not possible, since it would render the dataset inaccessible to everyone.

To make a dataset private to themselves and one or more other users, the user can create a new role and associate the dataset with that role, not their "private role". Galaxy makes this easy by telling the user they are about to share a private dataset and giving them the option of doing so. If they respond positively, the sharing role is automatically created for them.

Private data (data associated with roles that include the "access" permission) must be made public in order to be used with external applications like the "view at UCSC" link, or the "Perform genome analysis and prediction with EpiGRAPH" tool. Being made publically accessible means removing the association of all roles that include the "access" permission from the dataset.

manage permissions - Role members can manage the permissions applied to this dataset
