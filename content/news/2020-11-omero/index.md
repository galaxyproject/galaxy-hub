---
title: Images stored in local OMERO instances are now available from Galaxy
date: '2020-11-23'
tease: An important step towards the accessibility of bioimage data
tags: [tools, data]
authors: beatrizserrano
authors_structured:
- github: beatrizserrano
subsites: [eu, freiburg, global, us]
main_subsite: freiburg
---


We have adapted the [__IDR Download tool__](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/idr_download_by_ids/idr_download_by_ids/) to be able to download images from a __local OMERO instance__. 

__This is an important step towards the accessibility of bioimage data__. Now, images stored in local OMERO databases that are not publicly available are accessible from either public or private Galaxy instances. Imaging facilities that are running their local instance and want to perform image analysis in Galaxy can directly benefit from this new feature. A tutorial that makes use of this tool can be found under the [imaging topic of the Galaxy Training Network](https://training.galaxyproject.org/training-material/topics/imaging/tutorials/tutorial-CP/tutorial.html).

To use this new feature you need to, first, select if you would like to get the images from the IDR or another OMERO instance.

![OMERO dropdown](/assets/media/2020-11-23-omero1.png)

The next step is to indicate the host URL of your OMERO instance:

![OMERO host](/assets/media/2020-11-23-omero2.png)

With this, you just need to input the image ids that you want to download into your Galaxy history. However, to be able to connect to this instance, your __OMERO credentials__ have to be saved in your preferences (_User → Preferences → Manage information_).  

![User preferences](/assets/media/2020-11-23-omero3.png)

This feature is embedded in Galaxy and needs to be enabled by the admin of the server you are using. You can now use it in [UseGalaxy.eu](https://usegalaxy.eu/) or ask your admin to add it. For more info about the configuration on the admin side, please take a look at the [README file of the tool](https://github.com/galaxyproject/tools-iuc/blob/master/tools/idr_download/README.md).
