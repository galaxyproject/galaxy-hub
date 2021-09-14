---
title: 'All-new CloudLaunch release'
tease: 'Manages your credentials, multiple clouds, multiple apps,...'
date: '2018-01-05'
---

It's been a long time coming but the all-new CloudLaunch service is out of beta
and, today, has been made the default portal for launching Galaxy (and other
applications) on cloud computing infrastructures. It is available at
https://launch.usegalaxy.org/.

The new launcher has a large number of new features, some of the most
notable ones are summarized here:
- **Native multi-cloud support**: built on
  [CloudBridge](http://cloudbridge.cloudve.org/), this implementation of
  CloudLaunch has native support for multiple cloud providers, paving a path for
  using Galaxy on any of those clouds in a consistent, robust fashion. At the
  moment, this includes Amazon Web Services, Microsoft Azure, and OpenStack.
  Support for the Google Compute Engine is forthcoming.
- **A catalog of applications**: Just like multple clouds, it is now possible to
  browse a catalog of applications (think Galaxy flavors each tailored for a
  specific type of analysis) and launch them in a consistent fashion on the
  supported cloud providers.
- **Credentials management**: Recall searching your inbox or a text file
  somewhere for those access and secret keys to be able to copy them into the
  appropriate fields before launching your instances? The new CloudLaunch allows
  you to store your credentials right there and simply choose which credentials
  you'd like to use for a given launch. The keys are stored in encrypted
  fields in the database and can only be read by the server process. Keep in
  mind that for security reasons, we will periodically expire (i.e., delete) all
  stored keys so make sure to keep a copy and do not rely on the CloudLaunch
  server as a persistent key store.
- **Deployment management capabilities**: After you have launched your
  application, the new CloudLaunch will perform periodic health checks making
  sure the application is still active and report that status on the
  _My appliances_ page. You also have the option to delete a deployment
  right from CloudLaunch.
- **REST API**: last but not least - the new CloudLaunch is 100% driven with a
  REST API. This allows you to build on top of it and integrate available
  features into your own application or extend the existing capabilities. It
  also has a command-line client: https://github.com/CloudVE/cloudlaunch-cli

These are just a few most visible features available. There are many more
lurking under the hood (e.g., ability to add your own applications with a
completely custom UI) so go ahead and explore, use it, and let us know where it
falls short.

This new CloudLaunch application replaces the old launcher whose life began in
2011 but the technological evolution prompted for a more flexible solution going
forward. The old launcher will still be available at
https://old.launch.usegalaxy.org.

Happy launching!
