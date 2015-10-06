## Data Libraries

Galaxy data libraries provide a way to conveniently share Galaxy datasets within a group of Galaxy users or with everybody that has access to a specific instance of Galaxy. The biggest advantages of the data libraries are:
* You can import data from filesystem into the library without copying it.
* You can import whole directories preserving the folder structure within.
* The dataset's size does not count towards your usage [quota](https://wiki.galaxyproject.org/Admin/DiskQuotas).
* You save space on the Galaxy instance as every dataset in the library is stored only once no matter how many users are using it in their histories. This combined with linking the data mentioned above can make your work easier. 

### Introduction

Data library can be described as a folder that contains datasets and other folders. It has to be created by an [/Admin](/Admin) user.

### Note on administering DL
When a data library is first created, it is considered "public" since it will be displayed in the "Data Libraries" view for any user, even 
those that are not logged in.  The Galaxy administrator can restrict access to a data library by associating roles with the data library's 
"access library" permission.  This permission will conservatively override the [dataset] "access" permission for the data library's contained 
datasets.
For example, if a data library's "access library" permission is associated with Role1 and the data library contains "public" datasets, the 
data library will still only be displayed to those users that have Role1.  However, if the data library's "access library" permission is 
associated with both Role1 and Role2 and the data library contains datasets whose [dataset] "access" permission is associated with only Role1, 
then users that have Role2 will be able to access the library, but will not see those contained datasets whose [dataset] "access" permission 
is associated with only Role1.
In addition to the "access library" permission, permission to perform the following functions on the data library (and its contents) can 
be granted to users (a library item is one of: a data library, a library folder, a library dataset).
* add library item - Users that have the role can add library items to this data library or folder
* modify library item - Users that have the role can modify this library item
* manage library permissions - Users that have the role can manage permissions applied to this library item
The default behavior is for no permissions to be applied to a data library item, but applied permissions are inherited downward (with the exception
of the "access library" permission, which is only available on the data library itself).  Because of this, it is important to set desired permissions 
on a new data library when it is created.  When this is done, new folders and datasets added to the data library will automatically inherit those 
permissions.  In the same way, permissions can be applied to a folder, which will be automatically inherited by all contained datasets and sub-folders.
The "Data Libraries" menu item allows users to access the datasets in a data library as long as they are not restricted from accessing them.
Importing a library dataset into a history will not make a copy of the dataset, but will be a "pointer" to the dataset on disk.  This
approach allows for multiple users to use a single (possibly very large) dataset file.

INCLUDE(/DataLibraries/screen/LinkBox)
### Library screens

* [list of libraries](/DataLibraries/screen/ListOfLibraries)
* [folder contents](/DataLibraries/screen/FolderContents)
* [dataset detail](/DataLibraries/screen/DatasetDetail)
