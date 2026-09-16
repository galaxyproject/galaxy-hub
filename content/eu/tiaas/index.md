---
title: Training Infrastructure as a Service
tease: Dedicated free compute capacity for Galaxy training events on the European Galaxy server.
---

> **TIaaS Presentation at GCC:** We presented [TIaaS at GCC2019](https://gcc2019.sched.com/event/Rsld/training-infrastructure-as-a-service). You can see our slides on the event page. We also produced [training material](https://training.galaxyproject.org/training-material/topics/instructors/tutorials/setup-tiaas-for-training/tutorial.html) on the process of evaluating if the service is right for you and the user experience for your trainees.

<img src="/images/logos/tiaas-logo.png" alt="TIaaS logo depicting people in queues" width="300" />

The [European Galaxy Server](https://usegalaxy.eu/) is proud to provide **Training Infrastructure as a Service (TIaaS)** for the Galaxy training community. You provide the training, we provide the **infrastructure at no cost**.

## Why TIaaS?

- Private queue where only your training's jobs will run.
- No Galaxy maintenance.
- No Galaxy administration.
- Free infrastructure.
- Official [Galaxy Training Materials](https://training.galaxyproject.org/) are guaranteed to work and are [regularly tested](https://github.com/usegalaxy-eu/workflow-testing/).
- See how your students are progressing with [our dashboard](/news/2019-06-tiaas-queue/).

![TIaaS Queue Visualizer](/assets/media/tiaas-queue.png)

## How TIaaS Works

We have several pools of virtual machines (VMs) attached to UseGalaxy.eu that run user jobs. For trainings that request TIaaS, we attach a new pool of VMs that is specially labelled for that training. When users join a training using a **special URL** we provide, they are assigned to a **special training group**. Their jobs then **preferentially run on a training machine**, and, in the event there is no more capacity, they will run on the main queue. If a spot on a training VM opens up first, they will run there rather than continuing to wait in the main queue. The jobs run by the rest of users on our server are instructed to avoid the training pools.

Some more general information about the TIaaS service:

- [A calendar](https://usegalaxy.eu/tiaas/calendar/) that shows when TIaaS trainings are booked.
- [Some statistics](https://usegalaxy.eu/tiaas/stats/) about the TIaaS events.

### Before The Training

Before users can join a specific training, they need to be **logged into the [European Galaxy server](https://usegalaxy.eu/)**.

To **import data**:

- If you are using the [GTN material](https://training.galaxyproject.org/) for your workshop, then all the [training data is already mirrored into Galaxy](https://usegalaxy.eu/libraries/folders/Fa21272e5bd712216).
- If you are using your own data, you can upload it to your account into a history. Later, you can [make it accessible](https://usegalaxy.eu/histories/sharing) to your trainees. Remember to also share the datasets by clicking `Also make all objects within the History accessible`. Your trainees will then be able to import your history and start working with your data.

We recommend using Galaxy's [short-term storage](/eu/storage/#short-term-storage) during the training. This helps us clean up unused data and offer Galaxy as a more sustainable service. For more information, please consult our [storage page](/eu/storage/). To switch to the short-term storage, click `Preferred Storage` on the right panel (History panel), then choose `Short term storage for e.g. method development`.

You can learn more about managing storage options on the [Galaxy Training Network page](https://training.galaxyproject.org/training-material/faqs/galaxy/manage_your_galaxy_storage.html#tip-what-can-you-do-after-you-connected-a-storage).

### After The Training

Once the training is over, the data will stay available for further use. However, we encourage you to **clean up all the histories** whenever this data will not be used anymore.

To keep running this free service for your trainees, **we need your feedback and support**. It would be great if you could:

- Write a short blog post that we will **publish on our website**. You can find examples on the [TIaaS tag page](/tags/tiaas/).
- Fill out the [**GTN Survey**](/news/2020-01-training-feedback/).
- Give feedback about a tutorial on [**GitHub**](https://github.com/galaxyproject/training-material/issues/1452).
- Post your training experience on social media tagging `@galaxyproject` or `#galaxyproject`.

## Service Level Agreement

We **cannot** promise any degree of uptime. We will do our best to have this service online and functioning during the entire time period, but there are cases where the service may experience interruptions that are outside of our control. We will keep you informed of any outages that may affect your training.

## Eligibility

We have significant capacity and have dedicated some of this to providing training using our service. Anyone providing training on using Galaxy is eligible to request the use of this service.

## Application Process

1. Fill out the [Request Training Infrastructure](https://usegalaxy.eu/tiaas/new/) form. Please try to submit your application **at least two weeks in advance of the training**.
2. With the information that you input in the form, we will:
   - estimate how many VMs are needed for your training to run smoothly and ask for your feedback,
   - set up the private queue and give you a URL your users will access to join the training,
   - give you a URL to the dashboard for you to see the queue status.
3. Done. You are ready to run your training.
