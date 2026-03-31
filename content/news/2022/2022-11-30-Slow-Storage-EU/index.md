---
title: Slow Storage on EU
date: "2022-11-30"
tease: "Storage bottleneck on usegalaxy.eu results in slow queueing times"
hide_tease: false
tags: [devops]
subsites: [all-eu]
main_subsite: eu
---

From Monday morning (28th of November) we had a storage bottleneck,  
which then lead to long disk access times on all worker nodes and other infrastructure.  
Many users experienced very slow job queueing or even crashing jobs, especially upload jobs, for which we would like to apologize.

There were multiple causes to it, that have accumulated and lead to an overloaded storage node,  
which then lead to slow/not starting jobs.

We fixed the problem this morning and we are doing our best to avoid these problems in the future.  
Please excuse the inconvenience.
