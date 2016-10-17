---
title: 2016, /, 06, :,  , [Running Jobs Outside the Galaxy Docker Container](https://github.com/bgruening/docker-galaxy-stable/blob/dev/docs/Running_jobs_outside_of_the_container.md)
---




<div class='logbox'>
 Topic:: **[Running Jobs Outside the Galaxy Docker Container](/src/Community/Log/2016/RunningJobsOutsideContainer/index.md)**
 Date:: 2016/06/20
 Who:: [Marius van den Beek](https://github.com/mvdbeek)
 Resolution:: [Instructions on how to run jobs outside of the Galaxy Docker container](https://github.com/bgruening/docker-galaxy-stable/blob/dev/docs/Running_jobs_outside_of_the_container.md).
 Deployment:: 
</div>

From the [documentation](https://github.com/bgruening/docker-galaxy-stable/blob/dev/docs/Running_jobs_outside_of_the_container.md):
 In its default state Galaxy assumes both the Galaxy source code and various temporary files are available on shared file systems across the cluster, and uses the Galaxy source code to calculate metadata about the files that have been produced. When using Condor or SLURM ... to run jobs outside of the Docker container one can disable the metadata generation on the cluster, or synchronize the files required for generating these.

## Links

See the [documentation](https://github.com/bgruening/docker-galaxy-stable/blob/dev/docs/Running_jobs_outside_of_the_container.md).


CategoryLog
