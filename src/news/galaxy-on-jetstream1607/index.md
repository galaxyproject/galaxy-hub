---
title: "Galaxy on Jetstream Cloud update"
date: "2016-10-17"
---
<div class='right'><img src="https://www.nsf.gov/news/mmg/media/images/jetstream_logo_f_fe60185c-962f-4c1f-99bf-e6ec82d54c21.jpg" alt="" width="300" /></div>

[Galaxy release 16.07](/src/news/2016-07-galaxy-release/index.md) is now available for free on the Jetstream cloud. This image contains the updated Galaxy application with a toolset that closely matches that of the public Galaxy server available at [usegalaxy.org](https://usegalaxy.org/) as well as a complete set of reference genomes available on that same server. Availability of the reference data was realized by enabling a connection to a (CVMFS-based) replica server that offers access to approximately 3TB of reference data (vs. ~50GB in the previous version of the image). An additional benefit of such integration is that the reference data is no longer stored on the machine image, reducing the size of that image to about 10GB, leaving more space for the analysis data. The base operating system is Ubuntu 14.04. The image was built using the cloud_setup flavor of the [GalaxyKickStart](https://github.com/ARTbio/GalaxyKickStart) Ansible playbook.
