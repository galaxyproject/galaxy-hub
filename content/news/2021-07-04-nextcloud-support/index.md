---
title: ownCloud and Nextcloud integration for your private data
date: '2021-07-04'
tags: [tools]
supporters:
- denbi
- elixir
- crc1425
authors: bgruening
authors_structured:
- github: bgruening
subsites: [eu, freiburg]
main_subsite: freiburg
---

So-called cloud storages are becoming more and more popular in academic research. The most prominent one is probably [Dropbox](https://www.dropbox.com), which 
you can already use in Galaxy. Today, we would like to introduce you to the support of free and open-source alternatives.
[ownCloud](https://owncloud.com/) and [Nextcloud](https://nextcloud.com/) are free software solutions for the storage and management of data.
Many universities are offering their own Nextcloud instances where researchers can store and share data in a GDPR compliant way.

We have now added support to Galaxy to interact with your storage. You can import data from your Nextcloud instance or export data from your history
to your cloud storage. Technically, this works by using the [WebDAV](https://en.wikipedia.org/wiki/WebDAV) protocol and you can use this integration with
every server that speaks this protocol. 

Here are some examples of how to configure your Galaxy account to make use of that feature.

In all cases you need to go User → Preferences → [Manage Information](https://usegalaxy.eu/user/information)

![](/assets/media/b2drop_access.png)


Once configured, you will find an option called "Choose remote files" in the normal Galaxy upload dialogue.
Choose "Nextcloud/ownCloud" and select the files you want to import.

![](/assets/media/nextcloud_file_picker.png)


## Example configurations

For example, to get access to the [B2Drop service of EUDAT](https://eudat.eu/services/b2drop), you can configure your settings like:

>  Server Domain: `https://b2drop.bsc.es`
>
>  Server Path: `/remote.php/webdav`
>
>  Username: `<your username>` (e.g. your email)
>
>  Password: `<your password>`

As a member of the [CRC1425](https://www.sfb1425.uni-freiburg.de) ("The heterocellular nature of cardiac lesions: Identities, interactions, implications"), you can use settings like:

>  Server Domain: `https://nxc-1425.imbi.uni-freiburg.de`
>
>  Server Path: `/remote.php/webdav`
>
>  Username: `<your username>` (e.g. your email)
>
>  Password: `<your password>`

And don't forget that you can also export files back to your cloud storage.

