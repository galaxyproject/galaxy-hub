---
title: "Upscaling file uploads with rustus"
date: "2023-06-26"
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

The rustus project was started at the end of 2021 by [Pavel Kirilin](https://github.com/s3rius), and since then, it has matured both in terms of stability and features. At the moment, even though there is a significant overlap between the feature sets of tusd and rustus, a couple of tusd features are not available in rustus and vice versa. Given our use case, we considered that the latter were worth the tradeoff of missing on the former. Two features were especially of our interest:

- The Galaxy project (not just Galaxy Europe) uses [Sentry](https://sentry.io) to monitor application exceptions, that rustus integrates nicely with.

- In contrast to tusd, which saves all uploads to the same folder, rustus [can create a directory structure based on the date and time of the uploads](https://s3rius.github.io/rustus/configuration/#file-storage). Given the high volume of uploads on our server, this is advantageous for scaling our service, because we can avoid storing tens of thousands of files in the same directory.

At the moment, rustus is processing our uploads and we have already connected rustus to our Sentry instance, but reaping the benefits of the custom directory structure will take longer, because modifications in Galaxy are also needed. Nevertheless, we are looking forward to also make this a reality.
