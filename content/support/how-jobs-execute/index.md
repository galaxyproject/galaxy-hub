---
title: How Jobs Execute
---
[Back to Support Hub](/support/)

## Dataset Status

The Galaxy user interface (UI) has been designed to communicate job execution status through visual cues and concise messages.

Learn more about how to identify these cues by [examining what Datasets in different states look like](/tutorials/histories/#history-panel-datasets).


## How Jobs Run

* When a tool is executed, one or more new **[datasets](/learn/managing-datasets/)** are added to a history.
* The same is true when a **workflow** is executed.
* The **color** of a dataset designates the current status of the underlying job. See below.
* _If using the public [Main](/main/) Galaxy instance, the most effective strategy when running jobs on the shared resource is to start jobs (or workflows), and then leave them alone to execute until completion._

## Job queues and clusters

* [Processing rules for jobs on Galaxy Main (http://usegalaxy.org)](/main/)
* When work is urgent during peak-usage times on the public **[Main](/main/)** Galaxy instance, a **[CloudMan](/cloudman/)** instance is a quick-to-implement alternative.
* For large scale and/or urgent ongoing work, a **[CloudMan](/cloudman/)**, **[Local](/admin/get-galaxy/)** each have advantages as a longer-term solution.
* [Read more about Using Galaxy Choices...](/use/#which-platform-platform-type-to-choose) in the [Galaxy Platforms Directory](/use/).

## Job States

[Understanding Job States](https://training.galaxyproject.org/training-material/faqs/galaxy/#understanding-job-statuses)
