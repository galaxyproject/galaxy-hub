---
title: "Job router switch on EU"
date: "2023-05-08"
tease: "Mothballing the Sorting Hat"
hide_tease: false
tags: [EU]
subsites: [all-eu]
main_subsite: eu
---


# Mothballing the Sorting Hat

## An old hat
usegalaxy.eu runs more than 10.000 jobs every day. All these jobs have different demands and use different resources and technologies, like Docker, Apptainer etc., which need all sorts of parameters and environment variables. In Galaxy jobs are handled by resource managers like SLURM, HTCondor or the remote job execution system Pulsar.
But how do these resource managers know which resources each individual job needs?  
You could now specify that for every single tool, but as you can guess, with over 8.000 tools and many different possibilities to compute a job, this approach leads to chaotic unmaintainable static lists.
In order to determine job execution parameters at runtime and based on factors such as the job inputs, user submitting the job, cluster status, etc, we needed a different approach.  
Galaxy lets you do that with [`Dynamic Destination Mapping`](https://docs.galaxyproject.org/en/latest/admin/jobs.html#dynamic-destination-mapping).
In the past we used this approach with our own python script, which was called Sorting Hat.  
This python script dynamically modified destinations based on rules that evaluate the specific job characteristics, for example the dataset input size.
This allows you for example to allocate more memory for your job based on the input file size.  
In light of J.K. Rowling's controversial personal views and statements, we would certainly have chosen the name differently today.  

## Why change a running system?
So far so good – this python script did it’s job well for some years, but it also came with limits.
Even though it supported individual rules, defining them was more complicated, less clear structured and also limited in it’s functionality. The other reason was saving time by sharing and maintaining a unified job routing system. When every Galaxy instance maintains their own scripts and rules, you also get different results on different instances and admins have to spend a big share of their time communicating and implementing new rules in their custom scripts.

## The Total Perspective Vortex
Galaxy Australia came up with a more sophisticated approach that is available as a [PyPi package](https://pypi.org/galaxyproject/total-perspective-vortex) and lets you define tags and rules on all entities, like users, roles, tools and destinations. These tags can be specified as accepted, preferred, required and rejected. Inheritance makes it easy to give tags for example to groups of tools like tools that need to run in Docker. During the matching process all tags from the job-side (user, role, tool) and from all destinations are evaluated.
And because it evaluates really everything it was named [`Total Perspective Vortex`](https://total-perspective-vortex.readthedocs.io) (TPV) after Douglas Adams’ The Hitchhiker's Guide to the Galaxy.
With all that functionality, TPV not tied to a specific Galaxy instance, but rather is a generalized and flexible approach that fits to all needs.
With the help of the Australian admin Catherine Broomhead, we managed to migrate our Galaxy instance from Sorting Hat to TPV last week. Despite minor scheduling issues that affected mainly Docker tools, we can consider this migration as smooth and user friendly.

## How can you contribute?
TPV makes use of a [shared library](https://github.com/galaxyproject/tpv-shared-database) that is maintained in GitHub, making it easy for everyone in the community to contribute. This library defines resources and parameters that are valid across all Galaxy instances. You can install TPV to your machine and format, lint and even dry-run the tools, before deploying them in production. Once the tests are passing the pull request gets accepted, all Galaxy servers that are using the shared library will automatically use the new rules.
