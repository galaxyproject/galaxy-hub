---
title: 'Galaxy Release 19.01'
tease: Revised UI Style, Colorful Tags, Singularity Enhancements, and Workflow Enhancements
date: '2019-02-27'
---
We are pleased to announce the **[release of Galaxy
19.01](https://docs.galaxyproject.org/en/release_19.01/releases/19.01_announce.html)**.
A few release highlights are:


Revised UI Style
-----------------
The Galaxy stylesheet has been substantially reworked resulting in the largest visual
refresh to Galaxy in years.

More Colorful Tags
------------------
Use consistently hashed randomized colors for history dataset name tags to increase visual
distinction between tags, making it easier to track data flow in complex histories.
Thanks to [@erasche](https://github.com/erasche).

Extensive Workflow Enhancements (continued)
-------------------------------------------

Galaxy 18.09 featured a bunch of important and diverse fixes and enhancements to workflows on
both the frontend and backend. That progress continues in release 19.01.

The workflow editor now features explicit step parameter nodes for non-file data (integers,
strings, booleans, etc) and the ability to connect these to all tool inputs - not just files.
The YAML-based Galaxy Format 2 workflow language is now included in Galaxy as a beta option
and allows import and export of human readable workflows as well as extensions to allow Galaxy
to serve as a file editor for such workflows. The workflow editor features
more helpful labels on inputs and outputs and important fixes including
logic for connecting collections and dealing with missing tools. The workflow run form now deals with default
values more correctly.

Enhanced Support for Singularity
--------------------------------

[Singularity](https://singularity.lbl.gov/) container support in Galaxy has been brought to
parity with Docker container support. Specifically, Galaxy can now be configured to fetch
[Biocontainers](https://biocontainers.pro/) automatically for enabled job destinations.
Moreover, explicitly annotated Docker containers (either in tools or job destinations) can be used
with Singularity. Thanks to [@mvdbeek](https://github.com/mvdbeek)

Please see the [full release
notes](https://docs.galaxyproject.org/en/release_19.01/releases/19.01_announce.html)
for more information, including how to upgrade today!

_Thanks for using Galaxy!_
