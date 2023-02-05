---
title: 'Exporting structured data like RO-Crate or BioComputeObjects'
tease: 'Galaxy has a very powerful and extensible exporting framework that now can export RO-Crate and BioComputeObjects'
date: '2023-02-06'
tags: [tools]
authors: "David López"
authors_structured:
- github: davelopez
subsites: [global, all-eu]
---

Galaxy has gained over the last month a powerful and extensible exporting framework.
If you would like to export workflow invocations, histories or history elements
you can now extend the backend in a well defined way to create your preferred format. The same holds true for the frontend where
where you have an easy way of defining new export formats from which a user can choose.

Two formats have been added to Galaxy already. That is the BioComputeObjects, for tracking provenance information, and [RO-Crate](https://www.researchobject.org/ro-crate/) an archiving format based
and schemas.org, [ResearchObjects](https://www.researchobject.org/) and [DataCrate](https://github.com/UTS-eResearch/datacrate).

Every format can be downloaded or written to pluggable Galaxy file sources (Dropbox, Google Drive, FTP, S3 ...) and each export plugin can
define additional custom operations for example to collect addional metadata from the user before the export starts.

This work is based on previous work from John Chilton who added a backend component and APIs for serving files.


# Export invocation to RO-crate

In this example a valid RO-Crate archive is exported from the workflow invocation view.

![export-ro-crate-invocation-ui](https://user-images.githubusercontent.com/46503462/191081589-c67901b5-4a5a-4aa3-b2e4-1b22c402729b.gif)

# Export invocation to BioCompute Object

In addition to the direct download and export to a remote source, this export plugin allows sending a BCO to an external database.

![send-bco-form-ui](https://user-images.githubusercontent.com/46503462/191082400-397cbd81-0a8f-41f8-a2c5-a604121ead76.gif)

# How to add new export plugins

Adding new export plugins is easy. Once the backend supports a new export format, we can add a new `InvocationExportPlugin` instance inside
`client/src/components/Workflow/Invocation/Export/Plugins/` and register it in the *index.js* file. That's it!

If the plugin needs to display additional components as part of the custom actions, for example for additional metadata,
it should be done inside a modal like in the example above, and the additional component should be placed in a subfolder with the name of the plugin.


@pauldg @jmchilton @HadleyKing @davelopez
