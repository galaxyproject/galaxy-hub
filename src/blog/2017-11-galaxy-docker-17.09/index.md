---
date: '2017-11-08'
title: "Galaxy Docker 17.09"
tease: "CVMFS and Singularity support"
authors: "B. Grüning"
---

[<img class="img-fluid mx-auto" src="https://raw.githubusercontent.com/bgruening/docker-galaxy-stable/dev/galaxy/GalaxyDocker.png" alt="Public Galaxy Server Dashboard" />](https://github.com/bgruening/docker-galaxy-stable)

Galaxy Docker 17.09 is now available as `bruening/galaxy-stable:17.09` or `quay.io/bruening/galaxy:17.09`!

As usual it includes the Galaxy release from last week with many, many new [feature and bug-fixes][1].
In addition we added the following to the latest release:

   - much improved documentation about using Galaxy Docker and an external cluster (@rhpvorderman)
   - **CVMFS support** - mounting in 4TB of pre-build reference data (@chambm)
   - **Singularity support** and tests (compose only)
   - more work on K8s support and testing (@jmchilton)
   - using .env files to configure the compose setup for SLURM, Condor, K8s, SLURM-Singularity, Condor-Docker

During this release we also improved the **composed version** of the Galaxy Docker stack. Read more about it and try it here: https://github.com/bgruening/docker-galaxy-stable/tree/master/compose

Run it with:

    docker run -i -t -p 8080:80 bruening/galaxy-stable:17.09

Feedback welcome!

  [1]: https://docs.galaxyproject.org/en/master/releases/17.09_announce.html
