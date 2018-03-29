---
title: Account quotas
---
[Back to Support Hub](/src/support/index.md)

## How account quotas work

Each Galaxy server is independent. How much disk space to allocate for users is determined by the administrators of the instance.

If you are working at [Galaxy Main](/src/main/index.md) (http://usegalaxy.org), each registered account is given 250 GB of space. [Read more here](/src/main/#user-data-and-job-quotas). 

Should you have problems after reviewing the options below, please let us know. Email [galaxy-bugs@lists.galaxyproject.org](mailto:galaxy-bugs@lists.galaxyproject.org) from your registered account email address.


## Does your account usage quota seem incorrect?

Log out of Galaxy, then back in again. This refreshes the disk usage calculation.

## How to log in or out of Galaxy? 

The options are included under the **User** menu in the top masthead.

## I need more space for my work

If the account usage is showing that quota is exceeded -[over 250 GB](/src/main/index.md):

 1. Find all Histories and *purge* (aka permenently delete) those not needed.
   * Under the Histories Options (gear icon, top of right History panel), choose **Saved Histories** from the list.
   * Click on **Advanced Search**, then choose **status = all**.
   * Locate *deleted but not permemently deleted histories* and purge them.

 2. Find all Datasets or just review those in the active history and *purge* (aka permenently delete) those not needed.
   * All datasets can be reviewed under **User > Saved Datasets**.
   * Within a History, deleted/permenently deleted Datasets can be reviewed by clicking on the *deleted* link at the top of the History panel, found immediately under the History name.
   * Or active (shown) and hidden datasets can be reviewed the same way.
   * Click on the far right "X" to delete a dataset. 
   * To permenently delete: use the link from within the dataset, or use the Operations on Multiple Datasets function, or the Purge Deleted Datasets list item in the History menu. 

 3. Examine History menu items under **Histories Shared with Me**. 
   * *Note: A small fraction of space from shared histories will count toward your quota.*
   * Review the contents.
   * **Copy** those you still want to work with.
   * **Unshare** any on the list not needed (once copied, unshare and you will still have your own copy).
 
 Also see: [Delete versus Delete Permanently](/src/learn/managing-datasets/#delete-vs-delete-permanently)

## I purged but still need more space!
 
Account quotas are generally fixed at 250 Gb for [Galaxy Main](/src/main/index.md). Other Galaxy servers may differ for quota size and policy. For very large projects, consider moving to a local or cloud Galaxy where you can control the resources.
 
  * [Using Galaxy choices are explained here](/src/choices/index.md)
  * If your work is academic research based and additional short-term space is needed at Galaxy Main, please send an email to galaxy-bugs@lists.galaxyproject.org from your registered account explaining your project and we may be able to help.
