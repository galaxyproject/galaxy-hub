---
title: Training Infrastructure as a Service
tease: Dedicated free compute capacity for Galaxy training events on the European Galaxy server.
---

The European Galaxy server provides **Training Infrastructure as a Service (TIaaS)** for Galaxy training events. Trainers bring the course and materials; Galaxy Europe provides dedicated infrastructure at no cost so workshop jobs can run on capacity reserved for the training.

<img src="/images/logos/tiaas-logo.png" alt="TIaaS logo" width="480" />

## Why Use TIaaS?

- Private training queues for workshop participants.
- No Galaxy administration or maintenance for trainers.
- Free infrastructure for eligible Galaxy training.
- Official [Galaxy Training Network](https://training.galaxyproject.org) materials work on the European Galaxy server and are regularly tested.
- Trainers can monitor participant progress with the TIaaS queue dashboard.

![TIaaS Queue Visualizer](/assets/media/tiaas-queue.png)

## How It Works

Galaxy Europe attaches dedicated virtual-machine pools to training events. Participants join through a training-specific URL after logging in to [usegalaxy.eu](https://usegalaxy.eu/). Their jobs then prefer the training queue, while regular server jobs avoid the training capacity.

Useful service links:

- [Booked TIaaS trainings](https://usegalaxy.eu/tiaas/calendar/)
- [TIaaS statistics](https://usegalaxy.eu/tiaas/stats/)
- [Instructor setup tutorial](https://training.galaxyproject.org/training-material/topics/instructors/tutorials/setup-tiaas-for-training/tutorial.html)

## Before The Training

Participants need to log in to [usegalaxy.eu](https://usegalaxy.eu/) before joining the training.

If you use GTN material, the training data is usually mirrored into Galaxy. For custom training data, upload it into a history and make the history accessible to trainees. Remember to make all objects in the history accessible as well.

We recommend using [short-term storage](/eu/storage/#short-term-storage) during training events. It helps keep public infrastructure sustainable and provides more appropriate temporary capacity for workshop work.

## After The Training

Training data remains available after the event, but trainers should clean up histories once they are no longer needed. To support the service, trainers are encouraged to share feedback through a short news post, the [GTN survey](/news/2020-01-training-feedback/), GTN GitHub issues, or social media posts that mention Galaxy.

## Service Level

Galaxy Europe cannot guarantee uptime for TIaaS events, but the team makes a best effort to keep the service available during the booked training window and to communicate outages that may affect a workshop.

## Eligibility And Requests

Anyone providing Galaxy training can request TIaaS capacity. Submit requests at least two weeks before the training when possible.

[Request Training Infrastructure](https://usegalaxy.eu/tiaas/new/)
