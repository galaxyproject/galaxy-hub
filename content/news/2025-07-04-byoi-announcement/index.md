---
title: "New Galaxy Storage Features: Connect, Import, Bring Your Own Data and Storage"
date: "2025-07-04"
authors: "Armin Dadras"
tease: "Bring your own storage, connect external data sources, and take control of your Galaxy account—see what’s new in Galaxy 25.0"
tags: [esg, esg-wp1, esg-wp4, esg-wp5, galaxy, feature]
supporters: [unifreiburg, esg]
subsites: [all]
main_subsite: eu
---
We're excited to introduce a major update to storage functionality on usegalaxy.* instances, now available as part of the [Galaxy 25.0 release](https://docs.galaxyproject.org/en/master/releases/25.0_announce_user.html) and the EuroScienceGateway (ESG) project. These features bring improved flexibility, user control, and scalability to your data workflows.

These improvements are part of EuroScienceGateway’s [“Bring Your Own Infrastructure”]((https://doi.org/10.5281/zenodo.15729502)) vision and play a key role in enabling a federated and flexible research environment. They enhance compliance, scalability, and user empowerment, especially for research groups with institutional infrastructure or data residency requirements.

# Need more storage or want to connect your own?

We've created a curated [Galaxy Storage Guide](https://galaxyproject.org/eu/storage/) that answers all your storage-related questions in one place. Whether you're requesting more quota, connecting your own storage, or exploring advanced configurations, this page walks you through the available options and how to get started. It's your go-to resource for making the most of Galaxy's flexible storage system.

# Better control over your account: New Storage Dashboard

[Galaxy 25.0](https://docs.galaxyproject.org/en/master/releases/25.0_announce_user.html) introduces a new storage dashboard that helps you explore, manage, and understand your disk usage at a glance.

You can now:
- See disk usage broken down by histories, datasets, libraries, and more
- Easily identify what’s consuming space
- Clean up old or unnecessary data directly from the dashboard
- Understand which storage backend is being used (local or external)

This gives you full visibility and control over how your storage is used—especially valuable when working with multiple storage providers.

# Import data from repositories (also known as Remote File Sources)

You can now connect Galaxy directly to external repositories (aka remote file sources), enabling browsing and importing of datasets from sources such as [Onedata](https://onedata.org/#/home), [Amazon Web Services Private Bucket](https://aws.amazon.com/blogs/security/tag/private-s3-bucket/), [Amazon Web Services Public Bucket](https://aws.amazon.com/blogs/storage/find-public-s3-buckets-in-your-aws-account/), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [B2DROP by BSC](https://guides.bsc.es/b2drop/), [B2DROP by EUDAT](https://eudat.eu/service-catalogue/b2drop), [Dropbox](https://www.dropbox.com/), [eLabFTW](https://www.elabftw.net/), FTP Server, [Google Drive](https://workspace.google.com/products/drive/), [InvenioRDM](https://inveniosoftware.org/products/rdm/), [RSpace](https://www.researchspace.com/), [S3 Compatible repositories](https://en.wikipedia.org/wiki/Amazon_S3) with Credentials, [WebDAV](https://en.wikipedia.org/wiki/WebDAV) (e.g. [Nextcloud](https://nextcloud.com/), [Owncloud](https://owncloud.com/), [Opencloud](https://opencloud.eu/en)), and [Zenodo](https://zenodo.org/). 

These file source integrations are secure, persistent (via the new Stored Credentials system), and configurable via your User Preferences. This simplifies data onboarding; no more downloading to your computer and re-uploading to Galaxy.

See the FAQ on [managing Galaxy repositories (aka remote file sources)](https://training.galaxyproject.org/training-material/faqs/galaxy/manage_your_repositories.html).

# Bring Your Own Storage (BYOS)

With BYOS, you can now attach your own object storage to your Galaxy account. This includes [Onedata](https://onedata.org/#/home) Storage, [Amazon Web Services S3 Storage](https://aws.amazon.com/s3/), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [Google Cloud Storage](https://cloud.google.com/storage), Any S3 Compatible Storage (e.g., [MinIO](https://min.io/)), [Rucio](https://rucio.cern.ch/) Storage.

This unlocks the following capabilities:
- Run workflows without duplicating datasets
- Use high-performance or high-capacity storage you already trust
- Choose storage destinations for tools, histories, and workflows
- Store secrets securely via [HashiCorp](https://www.hashicorp.com/en) Vault abstraction
- It’s also easier than ever to add your storage via graphical forms using preconfigured templates.

See the FAQ on [managing Galaxy Storage](https://training.galaxyproject.org/training-material/faqs/galaxy/manage_your_galaxy_storage.html).