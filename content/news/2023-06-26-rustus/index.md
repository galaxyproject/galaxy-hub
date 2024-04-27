---
title: "Upscaling file uploads with rustus"
date: "2023-06-28"
tease: "Migrating the server software behind our file upload system"
hide_tease: false
authors: "José Manuel Domínguez"
authors_structured:
- github: kysrpex
tags: [EU]
subsites: [all-eu]
main_subsite: eu
---

[UseGalaxy.eu](https://usegalaxy.eu/) processes thousands of dataset uploads on a daily basis. File uploads in Galaxy are handled using the [tus](https://tus.io/) protocol. tus is open source and implemented as a layer on top of the [HTTP protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview). Its most remarkable feature is its resilience, as it allows uploads to be interrupted and resumed at any time, improving the user experience in unreliable networks.

For processing the uploads, [UseGalaxy.eu](https://usegalaxy.eu/) has long been using the reference implementation of a tus server, [tusd](https://github.com/tus/tusd). About two weeks ago, we migrated to a different tus server implementation, [rustus](https://s3rius.github.io/rustus/).

The rustus project was started at the end of 2021 by [Pavel Kirilin](https://github.com/s3rius), and since then, it has matured both in terms of stability and features. At the moment, even though there is a significant overlap between the feature sets of tusd and rustus, a couple of tusd features are not available in rustus and vice versa.

<details>
  <summary>
    Click here for a comparison of tusd and rustus features.
  </summary>

  <figure style="display: table; text-align:center; margin-left: auto; margin-right:auto">

  |                                                                                    | rustus | tusd  |
  |------------------------------------------------------------------------------------|--------|-------|
  | Programming language                                                               | rust   | go    |
  | Docker container provided                                                          | ✔️     |       |
  | Helm chart provided (Kubernetes)                                                   | ✔️     | ✔️    |
  | Amazon S3                                                                          | ✔️     | ✔️    |
  | Google Cloud Storage                                                               |        | ✔️    |
  | Microsoft Azure Blob Storage                                                       |        | ✔️    |
  | File hooks                                                                         | ✔️     | ✔️    |
  | HTTP hooks                                                                         | ✔️     | ✔️    |
  | gRPC hooks                                                                         |        | ✔️    |
  | AMQP hooks (Celery integration)                                                    | ✔️     |       |
  | Concurrent uploads (e.g. Dynamo, ETCD3 lockers)                                    |        | ✔️    |
  | Store uploads information in Redis or relational databases                         | ✔️     |       |
  | Custom directory structure                                                         | ✔️     |       |
  | Sentry integration                                                                 | ✔️     |       |
  | HTTPS support                                                                      |        | ✔️    |
  | Metrics                                                                            |        | ✔️    |
  | CORS                                                                               | ✔️     | ✔️    |

  </figure>

</details>
<br>

Given our use case, we considered that the latter were worth the tradeoff of missing on the former. Two features were especially of our interest:

- The Galaxy project (not just Galaxy Europe) uses [Sentry](https://sentry.io) to monitor application exceptions, that rustus integrates nicely with.

- In contrast to tusd, which saves all uploads to the same folder, rustus [can create a directory structure based on the date and time of the uploads](https://s3rius.github.io/rustus/configuration/#file-storage). Given the high volume of uploads on our server, this is advantageous for scaling our service, because we can avoid storing tens of thousands of files in the same directory.

At the moment, rustus is processing our uploads and we have already connected rustus to our Sentry instance, but reaping the benefits of the custom directory structure will take longer, as modifications in Galaxy are also needed. Nevertheless, we are looking forward to also make this a reality.

# How does avoiding to store all uploads in the same folder help scale Galaxy?

Whenever a file is uploaded to Galaxy, the following happens:

1. Galaxy passes the upload request to rustus, that creates a file where the incoming data is written to.

2. After the upload is finished, a special Galaxy tool called "\_\_DATA\_FETCH\_\_" is invoked to convert the file to a Galaxy dataset. This involves moving the file to a different location.

At the current scale of Galaxy, file uploads happen with a frequency of up to a few times per second.

With modern filesystems, such as [ext4](https://en.wikipedia.org/wiki/Ext4) or [XFS](https://en.wikipedia.org/wiki/XFS), using a single directory for creating, writing, and accessing such an amount of files is [not a showstopper](https://medium.com/@hartator/benchmark-deep-directory-structure-vs-flat-directory-structure-to-store-millions-of-files-on-ext4-cac1000ca28), because directory entries are stored using data structures such as [B-trees](https://en.wikipedia.org/wiki/B-tree) ([ext4](https://ext4.wiki.kernel.org/index.php/Ext4_Disk_Layout#Directory_Entries)) or [B+-trees](https://en.wikipedia.org/wiki/B%2B_tree) ([XFS](https://mirrors.edge.kernel.org/pub/linux/utils/fs/xfs/docs/xfs_filesystem_structure.pdf#6b)). However, Galaxy works with storage that is distributed among several nodes, which needs more specialized, distributed filesystems. Due to their distributed nature, those filesystems involve a greater difficulty when it comes to managing file and directory metadata (in fact, that is an [active area of research](https://ieeexplore.ieee.org/document/9768784)). This makes the single-directory strategy unfeasible.

In addition, what should be done with incomplete uploads? Since tus allows resuming uploads, the incomplete data must be stored for a reasonable amount of time in case the user continues the upload. However, after that time has passed, it has to be cleaned up. Removing uploads older than a certain amount of days is, precisely, where the drawbacks of storing all of them together in a single directory manifest. No matter whether a filesystem is distributed or not, it requires iterating over all files in the directory and checking their creation time. Organizing the files in subdirectories in terms of the date when they were uploaded is a technique analogous to the use of [database indices](https://en.wikipedia.org/wiki/Database_index), and thus does away with the need to do this computationally expensive iteration.
