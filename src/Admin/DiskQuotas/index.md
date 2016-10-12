PLACEHOLDER_INCLUDE(/Admin/LinkBox)

# Data management: accounting and disk quotas
Before tackling quotas or disk accounting, it's important to understand that when data is copied in Galaxy it is never duplicated.  This means that importing a dataset from a Data Library, sharing datasets with another user, or making copies of your datasets within your own histories only creates new references to the original file.

It's now possible for users to force datasets to be removed from disk, which was previously only done by cleanup scripts.  This is explained in detail at [Managing Datasets](/Learn/Managing Datasets#actions).

## Disk Accounting
Galaxy keeps track of how much data is used by each dataset, and makes this information available in a couple of ways.  The first is as a total amount of disk space used by the user.  The second is the amount of disk space used by a single history.  These numbers may not always agree, and here's why:

The total amount of disk space used by a user is calculated by finding all *unique* datasets for which the user has an association (i.e. it's in a history) which are not in a library and which have not yet been purged.  The implications of this are:

* A dataset for which a user has multiple associations (a dataset has been "copied" from one history to another, or the same history) will only be counted once
* Datasets imported from a Data Library never count against a user's total disk usage
* Datasets which have been deleted but not yet removed from disk still count against a user's total disk usage

User disk usage is stored in a column in the galaxy_user table of the database and is updated whenever a user acquires new unique data or purges data.

Likewise, the total amount of disk space used by a single history is calculated by finding all *unique* datasets for which the user has an association and which have not yet been purged.  Note the slightly different implications:

* A dataset for which a user has multiple associations will be counted only once in each history in which it appears
* Datasets imported from a Data Library do count in the history usage total

History disk usage is calculated "on the fly" via a database query that sums the usage of all containing datasets.

Galaxy defines two classes of users: unregistered/anonymous and registered.  When determining the disk usage of an unregistered user, the history usage is used since unregistered users can only have one history.

There are two scripts in the Galaxy source which assist with managing disk accounting:

* `galaxy-dist/scripts/set_dataset_sizes.py` - recalculate the disk usage of all datasets in the Galaxy instance, most useful if you had a Galaxy instance that predated the disk accounting code added in changeset 5700:70e2b1c95a69 on June 14, 2011
* `galaxy-dist/scripts/set_user_disk_usage.py` - recalculate one or all users' disk usage, also useful if your Galaxy installation predates disk accounting, and also useful in cases where a user's usage seems to be incorrect (i.e. you've found a bug in disk accounting) and needs to be recalculated

## Quotas
Users are assigned quotas are configured by creating Quota definitions and then associating these definitions with users or groups.  Quota definitions consist of a name, optional description, amount, and an operation (one of "=", "+", or "-").  Default quotas can be specified for both classes of users: unregistered and registered.

The first step in managing quotas is to enable them by setting the following in `universe_wsgi.ini`:

```ini
[app:main]
enable_quotas = True
allow_user_dataset_purge = True
```

`allow_user_dataset_purge` is not explicitly required for quotas but strongly encouraged since without it users will have to wait for cleanup scripts to expire and purge their data to lower their disk usage.

Once enabled, you can create quotas in the [administration interface](/Admin/Interface) by clicking the link for "Manage quotas" in the left panel.  Quotas can have one of three "operations":

* `=` : The quota is exactly the amount specified
* `+` : The amount specified will be added to the amounts of the user's other associated quota definitions
* `-` : The amount specified will be subtracted from the amounts of the user's other associated quota definitions

The logic used when determining a user's quota is the following:

* Anonymous/unregistered users get the quota specified as the "default for unregistered users" or unlimited if no default is set
* Registered users:
  1. Get a "base quota" determined by finding all directly associated quota definitions with an **=** operation and setting it to the one with the largest amount
    1. If any directly associated quota is found with an **=** operation and **unlimited** amount, the user has no quota
    1. If the user has no **=** quotas directly associated, his or her base quota is set to the amount of the "default for registered users" quota, if it exists
    1. If the user has no **=** quotas directly associated and no "default for registered users" quota is set, the user has no quota
  1. The base quota is increased or decreased by the amount of any **+** or **-** operation quota with which they are associated
