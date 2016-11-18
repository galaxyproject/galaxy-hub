---
title: Data Security in Galaxy
---
PLACEHOLDER_INCLUDE(/src/Learn/LinkBox/index.md)


Galaxy provides an interface for users and administrators to make data private.  The security model allows permissions to be set on a fine-grained level, from one or two users to entire collaborative groups.

### Data security objects

#### Users

Most people who've used Galaxy in the past will likely already be familiar with the concept of Galaxy users.  Anyone can register and create an account.  Creating a user account allows a Galaxy user to save and restore old histories, share their analyses with other Galaxy users, and on our public sites, ensure their data is never deleted.

#### Groups

Groups are simply collections of Galaxy users.  If, for example, one group of users needs access to various Galaxy datasets, it's easier to combine them in to a Galaxy group first, then associate roles with the group, instead of individual users.

#### Permissions

For any dataset in Galaxy, administrators (and sometimes users) may control who has access to the dataset, who may manage the permissions on that dataset, and who may edit the dataset's library metadata.

#### Roles

Roles are how users and groups are associated with permissions and datasets.  For example, users in groups A and B can be associated with role C which gives them the 'access' permission on datasets D, E and F.

### Security for users

By default, users should not see any difference in the way Galaxy works.  Security controls are only enabled if desired.  Otherwise, datasets remain public, as in the past.

Users may choose the default permissions that newly created datasets will acquire.  These defaults apply to datasets acquired from outside of Galaxy, via sources such as the upload tool, UCSC, BioMart and EpiGRAPH.  Datasets within Galaxy, such as those imported from a dataset library, or shared from another user retain the permissions set in the library or by the sharing user.  Permissions on datasets created through running a tool are derived from the input datasets.  More details on how permissions are set can be found below.

#### Key points

* Anonymous users' data is always public.  Users must log in to access security controls.
* Every user is associated with at least 1 role, their "private" role, which is identical to their user name (email address).
* If no roles are set for the 'access' permission, the dataset is public, and anyone may access it.
* If no roles are set for the 'manage permissions' permission, no one (other than administrators) may modify its permissions.
* Adding roles to a dataset's 'access' permission restricts who may access it.  If 'Role A' is associated, only those users and groups who are associated with 'Role A' may access the dataset.  If 'Role A' and 'Role B' are associated with a dataset, only those users and groups who are associated with **both 'Role A' AND 'Role B**' may access the dataset.
* To make a dataset private to just yourself, associate it with your "private" role - the role identical to your user name (email address).  **Adding additional roles to the 'access' permission along with your "private role" does not do what you may expect.  Since roles are always logically ANDed together, only you will be able to access the dataset, since only you are a member of your "private role".**  To make a dataset private to you and one or more other users, create a new role (note: this functionality is still under development) and associate the dataset with that role, not your "private role".
* Private data must be made public to be used with external sources, such as the "view at UCSC" link, or the "Perform genome analysis and prediction with EpiGRAPH" tool.

#### Setting user and history defaults

By default, all users are authorized to manage the permissions on datasets that they add to their history panel from external sources, and anyone has the ability to access these datasets (they are public).  There are several places where permissions are set:

 **1) History defaults** - for each new dataset added to a history, if that dataset is obtained from an external source, the default permissions for the history are applied to the dataset.  These default permissions can be set by clicking "options" at the top of the history panel, then clicking "Change default permissions for the current history" - the following page will be displayed.

![](/src/Learn/SecurityFeatures/manage_history_defaults.png)


This can be used to easily create an analysis that will only be accessible to a specific group.
* User defaults: When a new history is created, history defaults (above) must be created for that history.  These are copied from the user defaults, which can be set by clicking "manage" in the top right corner of the Galaxy interface, then clicking "Change default permissions".  This is most useful if your datasets should default to private, instead of public.
* Dataset permissions: If a user is authorized to change permissions on a dataset, they may do so via the pencil icon in the history item.  See the following section for more details about this.

#### Permissions on datasets created by tools

So far, we've dealt with the default permissions applied to datasets created from external sources.  Datasets created by tools derive permissions based on the datasets used as inputs to those tools.  If a user is authorized to change the permissions on a dataset, then clicking the pencil icon in the dataset's history item will display the "Edit Attributes" page, which will include the following section.

![](/src/Learn/SecurityFeatures/manage_dataset_permissions.png)

For the 'manage permissions' permission, only the *intersection* of the input datasets' roles are set on the output dataset.  For the 'access' permission, the *join* of the input datasets' roles are set on the output dataset:

```
User A is a member of Role A and Role B
Dataset A requires Role A to manage permissions
Dataset A requires Role A to access
Dataset B requires Role B to manage permissions
Dataset B requires Role B to access
```


If a tool is run that uses Dataset A and Dataset B as inputs, the resulting dataset (Dataset AB) has the following permissions:
```
NO Role is able to manage permissions
Role A AND Role B are required to access
```


If, however the following were added to our example:
```
Dataset B requires Role A to manage permissions
```


Then the permissions on Dataset AB would be:
```
Role A is required to manage permissions
Role A AND Role B are required to access
```


### Galaxy administrators

Galaxy Administrators have the ability to set permissions on library datasets, create new roles, create groups, and associate users and groups with roles.  Administrators are currently set in a comma-separated parameter in `universe_wsgi.ini`: `admin_users`.  Once a user is an admin, they'll find an **admin** link in the top frame of the Galaxy interface.
