<div class='right'> <a href='/src/ToolShed/index.md'><img src="/src/images/Logos/ToolShed.jpg" alt="Tool Shed logo" height="110px" /></a> {{> ToolShed/LinkBox }} </div>

# Cloning a repository using hg from the command line

If you want to clone a repository from the Tool Shed using mercurial from a terminal session, you have to install the Mercurial Distributed SCM (the Tool Shed requires hg version 2.2.3 or newer) from [http://mercurial.selenic.com](http://mercurial.selenic.com).  

To determine the version of mercurial you have installed, run the following hg command from a terminal window:

```
$ hg --version
```


The result should be something like the following.  If your environment uses a version of hg older than 2.2.3, you should upgrade!

```
Mercurial Distributed SCM (version 2.2.3)
(see http://mercurial.selenic.com for more information)
Copyright (C) 2005-2012 Matt Mackall and others
This is free software; see the source for copying conditions. There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```


To clone the repository from the command line in a terminal session, change directory to the desired location and execute the clone command for the specified Tool Shed repository.  For example, running the following command...

```
hg clone http://toolshed.g2.bx.psu.edu/repos/edward-kirton/contamrm
```


...will install the repository named **contamrm**, owned by **edward-kirton** from the Tool Shed **http://toolshed.g2.bx.psu.edu''' into the local directory.  In this case, the repository tip will be installed, providing all included mercurial changeset revisions.

# Pushing changes to a repository using hg from the command line

If you want to push a changeset to a repository in the Tool Shed using mercurial from a terminal session, you have to install the Mercurial Distributed SCM (the Tool Shed requires hg version 2.2.3 or newer) from [http://mercurial.selenic.com](http://mercurial.selenic.com) and clone the repository to a local directory (see the previous section in the document for details).

To determine the version of mercurial you have installed, run the following hg command from a terminal window:

```$ hg --version```


The result should be something like the following.  If your environment uses a version of hg older than 2.2.3, you should upgrade!

```
Mercurial Distributed SCM (version 2.2.3)
(see http://mercurial.selenic.com for more information)
Copyright (C) 2005-2012 Matt Mackall and others
This is free software; see the source for copying conditions. There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```


Be aware that pushing a changeset to a repository will create a new changeset tip in the repository, just like what happens when you upload files to the repository using the Tool Shed upload utility described above.  Assuming you are using Mercurial version 2.2.3 or newer, metadata may be generated about the contents of the changeset and potentially saved in the database when the pushed changeset is received by the repository in the Tool Shed.

Let's clone this repository using hg from the command line into a local subdirectory.

```
gvk:/tmp/repos
gvk$ hg clone http://test@localhost:9009/repos/test/convert_chars
destination directory: convert_chars
requesting all changes
adding changesets
adding manifests
adding file changes
added 1 changesets with 3 changes to 3 files
updating to branch default
3 files updated, 0 files merged, 0 files removed, 0 files unresolved
```


We now have a local working copy of the repository.  Let's add a file to our local repository clone.

```
gvk:/tmp/repos gvk$ cd convert_chars/
gvk:/tmp/repos/convert_chars gvk$ echo 'THIS FILE DOES NOTHING...' > README.txt
gvk:/tmp/repos/convert_chars gvk$ hg add README.txt
gvk:/tmp/repos/convert_chars gvk$ hg commit -m 'Added README.txt'
```


We now have a new changeset in our local clone of the Tool Shed repository.  We can see the change by executing the **hg summary** command in our local repository clone.

```
gvk:/tmp/repos/convert_chars gvk$ hg summary
parent: 1:7003363d0160 tip
 Added README.txt
branch: default
commit: (clean)
update: (current)```


Let's push the changeset to the Tool Shed master repository.

```
gvk:/tmp/repos/convert_chars gvk$ hg push
pushing to http://test@localhost:9009/repos/test/convert_chars
searching for changes
http authorization required
realm: 
user: test
password: 
remote: adding changesets
remote: adding manifests
remote: adding file changes
remote: added 1 changesets with 1 changes to 1 files
```


As described above, metadata was automatically generated for the changeset when the push was received at the Tool Shed, and when we view the repository changelog, we see the additional change set.  The reason that the metadata is associated with the new tip is because there was nothing in the contents of the changeset that warranted a new installable changeset revision.  Installable changeset revisions are necessary only if a version of a tool included in the changeset was altered or a tool was deleted in the change set.  The [Installable repository changeset revisions](/src/RepositoryRevisions/index.md#installable_repository_changeset_revisions) section of the Tool Shed wiki provides more information about this process.
