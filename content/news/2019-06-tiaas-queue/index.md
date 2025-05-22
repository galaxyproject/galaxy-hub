---
title: TIaaS Queue Status
date: '2019-06-17'
tease: using UseGalaxy.eu’s Training infrastructure as a Service (TIaaS).
tags: [tiaas, devops]
location:
  name: Freiburg, Germany
authors: hexylena
authors_structured:
- github: hexylena
subsites: [global, all-eu, us]
main_subsite: eu
---

A common request during trainings was "how are the students doing, are they finished with the current step?" This is a common question, especially given some of the sleepy grad students trainees at 9am. For our [TIaaS](https://galaxyproject.eu/tiaas) users, we have added a brief overview of the training queue, showing them at a glance if everyone is finished with the current step.

It shows:

- Overview of queue (how many are in state new/queued/ok/error)
- Overview split by tools (how many people are done running Fastqc?)
- A full listing of the queue

![Training queue visualisation](/assets/media/tiaas-queue.png)

**Update**: now features a heatmap

![Training queue state heatmap](/assets/media/tiaas-queue2.png)
