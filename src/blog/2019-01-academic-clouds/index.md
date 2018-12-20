---
date: ''
title: "Galaxy on Academic Research Clouds"
tease: "You should do this."
authors: "Dave Clements"
external_url: 
source_blog: 
---

One of the reasons we launched the [Galaxy Platforms Directory](/src/use/index.md) last year was to better highlight the many ways in which researchers can use Galaxy, and not only public servers, which we have emphasized for years, but also  *containers, virtual machines, commercial clouds, and  academic clouds*.

**This post covers why you might want to consider running Galaxy on an academic clouds.**

*Academic Research Clouds* are compute clouds that are available to researchers in particular geographies or who belong to particular consortia.  *Compute clouds* are dynamically scalable, on-demand compute infrastructures on which you can launch servers like Galaxy when you need them, scale them up and down to meet your fluctuating needs, and then shut them down when you are done.  Someone else manages the actual hardwarecluster management.  *Commercial Clouds* also have these properties, except for one key factor ...

**Academic Clouds are Often Free to Researchers.**

That's right, **free**.  You will need to apply for an allocation but *these organizations exist to help researchers like you and are eager to help you use their resources.*

# In addition to the free part, why would I want to run my own Galaxy server on an academic cloud?

After all, the [usegalaxy.* servers, and the 100+ other public servers](/src/use/index.md) are all free too, and I don't have to do any work to set them up.

## 1. Speed

All those public servers are shared resources.  While some of them are big, *you are sharing them with the entire world.*  There is no way to predict on any given day (or week) if the server(s) you want to use will be *zippy* or *really busy*. If you set up your own server, then only people you give access to it will be using it.  And since it's a cloud, you may also be able to make it dynamically scalable so it expands and shrinks depending on loads.

## 2. Quotas

Some of the public servers have large quotas - usegalaxy.org has a 250GB quota with an account.  However, if you are doing a large scale experiment you'll find that you can easily burn through even a generous quota in no time.  With cloud servers *you decide* how much resource you'll want to set up and then you can use all of it.

## 3. It's easy

All of the academic cloud providers described here have preconfigured Galaxy images that you can bring up on their cloud with varying capacities.  You don't need to figure out what disk to buy or how to set up cluster management software. All that is taken care of by the cloud provider.

## 4. It's customizable

Many cloud providers enable admin access to your Galaxy instance.  This means you can customize the tools and genomes that are available on it.

If you need something, you can add it.

# Academic Research Clouds that Support Galaxy

**Where can I get Galaxy on an academic cloud?**  Here are the academic cloud providers we know about (as of 2019) and who they support.

## Australia

### Australia: Nectar and GVL

## Europe

### Czechia: MetaCentrum

### Italy: Laniakea on INDIGO-DataCloud

### Poland: PL-Grid

### Sweden: SNIC Science Cloud

### United Kingdom: CLIMB

### And Norway: NeLS (sort of)

## North America

### Canada: GenAP

### United States: Jetstream

## Global

### EGI Marketplace

### EuPathDB Galaxy

### VectorBase Galaxy

# So, Get Cloudy!

Really, if you want your own Galaxy, and you want someone else to deal with the implementation then academic research clouds are your friend.

See you in the cloud,<br />
[Dave Clements](/src/people/dave-clements/index.md), 

