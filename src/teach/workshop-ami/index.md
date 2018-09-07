{{> Teach/LinkBox }}
**This page describes how to launch the Cloudman instance optimized for workshop settings**


For simplicity use http://usegalaxy.org/cloudlaunch.  From the launch page, provide AWS access and secret keys, provide a cluster name and password, select **"do not set cluster type"** under cluster type, and launch the instance. Once Cloudman has launched sign in with 'ubuntu' as the username and provide the password generated earlier. At the "Initial CloudMan Platform Configuration" page choose additional start-up options and select **cloned cluster**, paste the share string below in the box provided and click "Choose configuration option". The instance will take a minute or two to configure itself, and you'll be ready to go.

Share string:
**cm-2a09a4f5e6aaf1967e44e41cf3c971ff/shared/2017-03-14--18-54/**

This shared Cloudman Galaxy is on version 16.07 and was created on 3.14.2017. It contains sample data for chIP-seq and RNA-seq, along with the necessary tools to complete the respective analysis pipelines. There is also HIV1 data for assigning a custom genome, viewing gene positions with Trackster, and RNA-seq data specific to HIV1. The EBS data volume is sized at 500 GB, this can be expanded from the Cloudman page if needed.
