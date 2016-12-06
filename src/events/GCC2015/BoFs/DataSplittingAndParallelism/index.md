---
title: Data Splitting and Parallelism
---
PLACEHOLDER_INCLUDE(/src/events/GCC2015/Header/index.md)



<div class='dictbox'>
 BoF:: [Data Splitting and Parallelism](/src/events/GCC2015/BoFs/DataSplittingAndParallelism/index.md)
 Summary:: Developer focused meeting to discuss data splitting and parallelism in Galaxy
 Audience:: Developers interested in working on internals Galaxy itself
 When:: Tuesday, 7 July, 12:30 (lunch)
 Where:: Watson Room, JICCC
 Contact:: Peter Cock http://twitter.com/pjacock
</div>

<div class='left'><a href='/src/events/GCC2015/BoFs/index.md'><img src="/src/images/Logos/GCC2015BoFs300.png" alt="GCC2015 BoFs!" width="160" /></a></div>

This page describes the **Data Splitting and Parallelism** [Birds of a Feather](/src/events/GCC2015/BoFs/index.md) meetup being held at [GCC2015](http://gcc2015.tsl.ac.uk/).

## Description

Galaxy has basic support for task parallelism (not enabled by default) which is transparent to the user, where a single job is split up into child jobs, and whose output is then merged. This works at the datatype level with split and merge methods.

Galaxy now also has support for dataset collections, where many similar ideas apply for dividing large files into collections of smaller files, and merging collections of small files into single large files.

This will be an informal gathering of developers to brainstorm this topic and expand on past galaxy-dev mailing list discussions.

## Audience

Developers

## When and Where

We will meet on Tuesday, 7 July, at 12:30 (lunch) in the Watson Room, inside JICCC.

## Who is Participating

If you are interested, please add your name below and/or send an email to [Peter Cock](mailto:p.j.a.cock@googlemail.com).

* Peter Cock
* John Chilton
* Marco Albuquerque
* Jorrit Boekel
* Antonio Miguel Espinosa Morales
* Gonzalo Vera
* Dustin Cram
* Dannon Baker
* James E Johnson
* Tazro Ohta
* David Kovalic
* Aaron Petkau
* (plus about five more people whose names didn't get recorded)

## Conclusions

Existing basic parallelism:

* Lots of people in the room are using the existing basic parallelism already (good news!)
* The benefits depend on the tools and the cluster usage. The Galaxy Main cluster is under full load, so using it there would only slow things down, and therefore it gets less tested.
* However, there are some functional test for this so it shouldn't break with an official Galaxy Release.
* needs to be better documented on the wiki (for both admins, and tool authors).
* Should be easy to enable parallelism in the Cloud images (to max out your cluster).
* Automatic retries on  error would be particularly useful with the child jobs.
* child jobs should be done as cluster array jobs if possible.
* John Chilton and Dannon Baker are effectively responsible for this area of the code, and would look at pull requests.
* Dynamic job splitting rules like those for Dynamics Job Destination feature might be nice, but complicated - and in non-trivial cases splitting can change the results. The tool author should be able to limit this (e.g. provide a range of splitting options).

Collections offer similar splitting and merging but this is explicit to the user (the existing parallelism is transparent to the user). This might be used with the wish-list workflow within a workflow?

Note that because the parallelism functionality means each tool does a split/run/merge, a long workflow means repeated splitting and merging (with associated disk IO overhead). On the other hand, with the collection approach there would be one split at the start to convert to a collection, and at the end one merge to reduce the collection back to a single file.

Much like existing format conversion, where datatypes have split and merge methods, it would be nice to export this as pseudo tools within the Galaxy interface. See also similar functionality with collections.

## Questions?

Send them to [Peter Cock](mailto:p.j.a.cock@googlemail.com).

[CategoryBo](/src/CategoryBo/index.md)F
