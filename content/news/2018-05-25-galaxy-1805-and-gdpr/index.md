---
title: UseGalaxy.eu update to 18.05 and GDPR
date: '2018-05-25'
tags: [release]
subsites: [eu, pasteur, freiburg, erasmusmc, elixir-it, belgium, genouest]
main_subsite: eu
---

We've updated our Galaxy server to version 18.05. Additionally we have enabled
the `beta_gdpr_mode` that the Freiburg Galaxy Team implemented in Galaxy.

# Galaxy Upgrade

We had planned an all day maintenance but only needed a tiny bit of that time.
Galaxy was down from 10:30 CEST to 12:45 CEST when we finished the upgrade.

For a full list of the awesome new features
please see the [release notes](https://docs.galaxyproject.org/en/release_18.05/releases/18.05_announce.html)

A few highlights (in no particual order)!

- You can now upload files >2GB through the Galaxy interface. You no longer need to use FTP to upload large files.
- There is a new, powerful, rule-based data uploader. This will make it
  significantly easier for you to create complex collections that better
  represent your data.

  To learn how to use the new uploader you can try a tutorial for the new uploader on 
  [the Training Materials site](https://galaxyproject.github.io/training-material/topics/introduction/tutorials/galaxy-intro-rules/tutorial.html).

If you notice any issues, please do not hesitate to [let us know](mailto:galaxy@informatik.uni-freiburg.de)

# GDPR

The new European General Data Protection Regulation (GDPR) went into effect on
May 25, 2018. Our [UseGalaxy.eu](https://usegalaxy.eu) service, and
`galaxy.uni-freiburg.de`, and the other galaxy servers we provide are
all compliant with GDPR.

The Freiburg Galaxy Team implemented a [GDPR compliance
mode](https://github.com/galaxyproject/galaxy/pull/6069) for all Galaxy server
administrators to use. There were several changes that were required in order
to meet compliance with the new EU regulations and generally improved the
privacy of users.

We are only required to follow the law for EU users but we will be following
the law for all of our users as user privacy is important to UseGalaxy.eu
You can find out more information about our service, the terms of service, how
we protect our data and who has access to specific pieces of data on our new
[ToS and GDPR Documentation page](https://usegalaxy.eu/terms/).

