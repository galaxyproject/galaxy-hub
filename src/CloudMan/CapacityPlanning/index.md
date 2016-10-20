---
autotoc: true
---
PLACEHOLDER_INCLUDE(/src/CloudMan/Header/index.md)

<div class='right'></div> PLACEHOLDER_INCLUDE(/src/CloudMan/LinkBox/index.md)

This page offers advice on how much cloud infrastructure you will need to run your Galaxy instance.  This of course depends on the magnitude of your data, what type of analysis you are doing, and how consistent you expect your load to be.  Since these will be different for everyone, this page does not offer hard and fast rules, but rather guidelines to help you along.  Fortunately, due to the *elastic* nature of CloudMan, configuration can be fairly forgiving.

**Be Aware:** The specific configuration details will depend on the cloud [infrastructure vendor and platform](/src/CloudMan/CapacityPlanning/index.md#platforms).  

# Usage Scenarios

There are many reasons why you may want to run Galaxy on the cloud.  This page attempts to address these three general scenarios.

## Scenario 1: Light usage

Scenario 1 is characterized by **light usage paired with the desire to avoid system administration.**  In this case you want to use Galaxy for relatively lightweight processing tasks, but you don't want to use a [shared Galaxy server](/src/PublicGalaxyServers/index.md), or install your own copy.  Galaxy's cloud images come with more tools and datasets preinstalled than does [Main](/src/Main/index.md), and far more than a [locally installed Galaxy](/src/Admin/GetGalaxy/index.md).  You may also not want to put your data on a public server.

## Scenario 2: Occasional but heavy usage

Scenario 2 is the canonical case for cloud computing: **You need heavy-duty computing, but you don't need it all the time, and you don't have access to your own compute cluster.** In this case, you would only bring up a Galaxy on the cloud on those occasions when you have new datasets to analyze.  Once your analysis is done, you would offload your results and delete the instance.

## Scenario 3: Continuous but variable usage

In this scenario you **need a Galaxy instance on a more or less regular basis, with occasional peaks of computation intense analysis.**  In this case, the Galaxy instance is up continuously, but with only a limited number of worker nodes.  However, the number of worker nodes scales up and down with demand.

## Mixed Scenarios and Elasticity

Of course there are many combinations of these scenarios.  The cloud is *elastic* and there are (at least) two aspects of elasticity at work here.  The first is *on or off.*  That is, the ability to have (and pay for) a Galaxy instance only when you need it.  The second is the ability to have a small instance most of the time, and to have a large instance only when you need it.

# Head Node and Worker Nodes

In a CloudMan based Galaxy cloud configuration you will need to determine two machine configurations: one for the *head* node, and one for the *worker* nodes.  The *head* node implements the Galaxy web server, the backing Galaxy database, and any tools that are not particularly compute intensive (as defined by the tool's wrapper).  *Worker* nodes execute compute intensive tools (again, as defined by the tool's wrapper).  The worker nodes are *elastic* in CloudMan ‐ they increase and decrease in number to address changes in demand.

# Platforms

Each different cloud infrastructures has it's own capacity planning information:
* [Amazon Web Services (AWS) Capacity Planning](/src/CloudMan/AWS/CapacityPlanning/index.md)
* *... (others to be added)*

