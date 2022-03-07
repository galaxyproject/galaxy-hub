---
title: 'Galaxy Release 22.01'
tease: Colour Selector, Robust File Uploads, Beta History Improvements, FastAPI, Galaxy Vault & much more!
date: '2021-11-02'
---

Dear Community,

The Galaxy Committers team is pleased to announce the release of Galaxy 22.01.

- **[Developer and admin release announcement](https://docs.galaxyproject.org/en/master/releases/22.01_announce.html)**. 
- **[User release announcement](https://docs.galaxyproject.org/en/master/releases/22.01_announce_user.html)**.

A few release highlights are:

### New Colour Selector

Do you use tools which require colour inputs, like Circos? Previously, we
had a very restricted colour input which gave you a very limited
palette. Now, you have complete freedom of choice with the modern colour
selector.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/l2DSGWFEzyM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Improved File Export

If you've been exporting files from Galaxy lately, you've probably
seen the amazing new remote file source export, which allows you to
export files to FTP, Dropbox, and other locations.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/0zxux0AmS2w" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Improved File Uploads

Previously, Galaxy servers used a variety of methods to let you upload
large files easily, including some servers which required FTP for large
files. We have replaced this with a new upload method, which will be enabled on all usegalaxy servers soon.
This will make file uploads significantly smoother, and will be more tolerant of network
failures and interruptions! You do not need to make any changes.

### Beta History: Collection Improvements

If you've been trying out the beta history (which will be the default
history in the next release!), it has been updated to indicate whether collections
are homogeneous or heterogeneous. This will help you see more easily if
you've accidentally included an incorrect dataset. Test out the beta
history today and let us know if you have any issues!

![](https://user-images.githubusercontent.com/46503462/146426341-d16d07d8-164b-40ef-976a-52e73d94bfc9.png)

### Galaxy starts as a FastAPI application by default

Starting Galaxy via ``run.sh`` will use the new [gravity process manager](https://github.com/galaxyproject/gravity).
The new configuration uses [Gunicorn](https://gunicorn.org/) and [FastAPI](https://fastapi.tiangolo.com/) to drive Galaxy's web process,
and starts job handler and [Celery](https://docs.celeryproject.org/) processes automatically.
For more details and instructions, please consult the [Migrating to Gunicorn documentation](https://docs.galaxyproject.org/en/latest/admin/migrating_to_gunicorn).

### User Preferences can be encrypted in Galaxy Vault

Galaxy can now be configured to store secrets in an external vault, which is useful for secure handling and centralization of secrets management.
In particular, information fields in the "Manage information" section of the user profile, such as dropbox keys, can be configured to be encrypted
at rest in a vault (Hashicorp, Custos or database) instead of being stored as plain text in the user preferences table. For detailed information on
configuration, refer to the [vault section](https://docs.galaxyproject.org/en/release_22.01/admin/special_topics/vault.html) of the admin documentation.

### Release Notes

Please see the [full release notes](https://docs.galaxyproject.org/en/latest/releases/22.01_announce.html) for a lot more
details and instructions for upgrading your Galaxy installation.

Thanks for using Galaxy!
