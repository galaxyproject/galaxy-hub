---
title: "Effortless data labeling with AI support from YOLO and Segment Anything on Galaxy Europe!"
date: "2025-05-15"
authors: Yi Sun
tease: "Use AnyLabeling in the European Galaxy Server as an interactive tool"
hide_tease: false
subsites: [all-eu, global]
main_subsite: eu
---

AnyLabeling is now available for the imaging community to use in Galaxy Europe!

## What is AnyLabeling? What does it do?

[AnyLabeling](https://anylabeling.nrl.ai/) is an open-source data labeling tool with AI support for YOLO and Segment Anything models.

### Features

AnyLabeling features an user-friendly interface, supports collaborative multi-user workflows, and integrates model-assisted labeling to speed up annotation through semi-automation and active learning. It offers flexible export formats (COCO, YOLO, Pascal VOC, JSON, CSV, etc.), making it easy to plug into machine learning pipelines.

## How to access AnyLabeling through Galaxy Europe?

To use AnyLabeling in Galaxy, first you need to create an account in Galaxy and log in with your credentials. You can access AnyLabeling from [here](https://usegalaxy.eu/root?tool_id=interactive_tool_anylabeling) and specify images from your history that you want to use in AnyLabeling, then press the _Run Tool_ button to launch an AnyLabeling instance. When the graphical user interface of AnyLabeling is ready, an  'Open' link will be displayed at the top of the Galaxy central panel (see screenshot below). 

![AnyLabeling](/images/galaxy-anylabeling.png)


Open the images from the `input_images` folder using the AnyLabeling UI. Select `Auto Labeling` from the tool menu on the left, choose one of the model from the dropdown list, and then start your labeling task. Once finished, save your output json in `home/output` folder, close the AnyLabeling GUI and its browser tab. The results in json file will be available in your Galaxy history.

![AnyLabeling tasks](/images/galaxy-anylabeling-tasks.png)

![AnyLabeling results ](/images/galaxy-anylabeling-results.png)



This work is supported by the [NFDI4BIOIMAGE project](https://nfdi4bioimage.de/).

![logo NFDI4BIOIMAGE](/images/logos/nfdi4bioimage.png)
