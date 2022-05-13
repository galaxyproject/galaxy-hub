---
subsites: [global, all-eu]
title: Towards a sustainable storage, enabling co-financing of public infrastructure
date: "2022-04-20"
tags:
- citations
author: bgruening
supporters:
- crc1425
- crc992
- denbi
- elixir
---

tl;dr: Research groups and networks can include their own storage into the European Galaxy server and decide about quota and data policies.

---

If people ask us what do they need to run a Galaxy service, one of our answers is
"Storage is always the bottleneck. Try to get your hands on enough storage, this provides your users freedom to play around with their data."
The European Galaxy server, thanks to the de.NBI cloud and the Uni-Freiburg compute center, manages 2 PB of data as of today (2022/04).
Users do use this storage for free, public institutions are paying for the freedom of science and against being locked in into some commercial system.
Everyone gets a fair share of the storage, on the [EU Galaxy server](https://usegalaxy.eu) those are 250 GB for every user.
This system works and has served us well for many years. However, different user groups have different needs and a
few user groups provide funding to the global infrastructure in one way or the other. Our solution until now was to be
very generous in extending the user storage via our [quota-request form](https://usegalaxy.eu/quota-increase) - and we will try to do so
as much as we can increase our storage capacity with future grants.

Going forward, we have [enabled](https://github.com/usegalaxy-eu/sorting-hat/pull/9/) an additional strategy that makes it possible to
**include storage provided by partner consortia in a very transparent way into the European Galaxy Server** to increase quota to all consortia members.

An exemplary use case is the [DataPLANT](https://nfdi4plants.org) consortium, part of [NFDI](https://www.nfdi.de) (National Research Data Infrastructure), which builds Research Data Management (RDM) communities in Germany. DataPLANT focuses on fundamental plant research and has access to the [bwSFS](https://www.alwr-bw.de/bwsfs/), a state-funded storage for scientists. In cooperation with DataPLANT, we have included part of this storage into Galaxy and configured it so that users associated with DataPLANT store data on this particular storage only. This enables DataPLANT to decide on their preferred quota limits and manage the level of data backup policies. It also enhances the collaboration of NFDI consortia with the Galaxy project.

The system is very flexible and we could enable research networks, like the German CRCs, in the same way the participation in the European Galaxy project
and offer sustainable storage solutions for their researchers. It is to be noted that this covers the technical aspect of storage infrastructure but
is only a small aspect of RDM - for which NFDI and Galaxy provide additional solutions. Please [get in contact](mailto:contact@usegalaxy.eu) with us if you want to learn more about RDM.

