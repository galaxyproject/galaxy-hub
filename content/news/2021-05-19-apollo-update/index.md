---
title: UseGalaxy.eu Apollo Update
date: '2021-05-19'
tags: [genome annotation, apollo]
supporters:
- denbi
- elixir
authors: hexylena
authors_structured:
- github: hexylena
subsites: [eu, freiburg]
main_subsite: freiburg
---

The [GGA](https://github.com/galaxy-genome-annotation/) team has updated UseGalaxy.eu's Apollo (collaborative genome annotation editor) to 2.6.3 from 2.5.0. Check out the changelog copied below.

Not yet using apollo for your genome annotation needs? Come talk to us as [GCC2021](https://galaxyproject.org/events/gcc2021/) where we'll have a couple of training modules covering the system's use.


## 2.6.3

Features

- Added ability to use posts to sequence methods [2555](https://github.com/GMOD/Apollo/pull/2558).
- Added system info web service [2557](https://github.com/GMOD/Apollo/pull/2557).
- Add "merged from" comment to merged in transcript and gene [2567](https://github.com/GMOD/Apollo/issues/2567).
- Added support for "obsolete", and partials in the interface for GFF3s [2573](https://github.com/GMOD/Apollo/pull/2573).
- Allow overlap filter to be configurable [2582](https://github.com/GMOD/Apollo/issues/2582).

Bug Fixes:

- Fix empty attribute list in annotation panel [2552](https://github.com/GMOD/Apollo/issues/2552).
- Bad coordinate value in genomic element details screen in annotator panel [2559](https://github.com/GMOD/Apollo/issues/2559).
- Web services indicated user had no organism permissions when checking the login [2554](https://github.com/GMOD/Apollo/issues/2554).
- Vcf reads as ISO-8859-1 instead of UTF-8 from reader mangling some symbols. [2498](https://github.com/GMOD/Apollo/issues/2498).
- Added security fixes for web services. [2564](https://github.com/GMOD/Apollo/pull/2564), [2587](https://github.com/GMOD/Apollo/pull/2587).
- In some cases web services tries to create a preference which results in incorrect results [2580](https://github.com/GMOD/Apollo/issues/2580).
- For the track service, the overlap filter is too restrictive when converting NCList to JSON [2586](https://github.com/GMOD/Apollo/issues/2586).
- History track names for Gene Produce and Provenance were being cast as GO [2590](https://github.com/GMOD/Apollo/issues/2586).

Infrastructure Changes

- Removed travis in favor of GitHub Actions [2546](https://github.com/GMOD/Apollo/issues/2546).



## 2.6.2

Features

- Add option to suppress calculation of non-canonical splice site [2509](https://github.com/GMOD/Apollo/issues/2509).
- Added the ability to sync the gene and transcript name with the click of a button [2519](https://github.com/GMOD/Apollo/issues/2519).
- Added organism and species to menus [2537](https://github.com/GMOD/Apollo/pull/2537).
- Added UUID lookup and link [2539](https://github.com/GMOD/Apollo/pull/2539/).
- Added status filter for recent annotations [2543](https://github.com/GMOD/Apollo/pull/2543/).
- Add feature name `loc` to loadLink [2544](https://github.com/GMOD/Apollo/issues/2544).
- `loc` loadLink now supports UUID and ID popup provides link [2549](https://github.com/GMOD/Apollo/issues/2549).

Bug Fixes

- BLAT search should send annotation creation results to the proper reference sequence [2514](https://github.com/GMOD/Apollo/issues/2514).
- Properly handle Shine_Dalgarno sequences when added as part of gene model [2515](https://github.com/GMOD/Apollo/issues/2515).
- Now able to resize terminators by dragging  [2521](https://github.com/GMOD/Apollo/issues/2521).
- Added missing GO annotations [2535](https://github.com/GMOD/Apollo/pull/2535).
- findAllOrganism webserver failed when user is not an admin and no session is present [2540](https://github.com/GMOD/Apollo/issues/2540).
- Provide minor UI and bug fixes [2548](https://github.com/GMOD/Apollo/pull/2548).

Infrastructure Changes

- Upgrade to [JBrowse 1.16.10](https://github.com/GMOD/jbrowse/releases/tag/1.16.10-release)


## 2.6.1

Infrastructure Changes

- Upgrade to [JBrowse 1.16.9](https://github.com/GMOD/jbrowse/releases/tag/1.16.9) / [2489](https://github.com/GMOD/Apollo/pull/2489).
- Fixed Python dependency for Travis for BioPython (3.7) and upgraded to Xenial [2493](https://github.com/GMOD/Apollo/pull/2493).
- Updated internal Docker Python script to add to use the [Apollo 4.2.3 library](https://pypi.org/project/apollo/).
- Shows and hide annotation detail panels on demand so list is not obscured [2538](https://github.com/GMOD/Apollo/pull/2538)


Bug Fixes

- Tabix upload of tracks was not including the index file [2487](https://github.com/GMOD/Apollo/pull/2487).
- Fasta file was displaying the wrong file formats [2486](https://github.com/GMOD/Apollo/pull/2486).
- Removed unused database migration script causing issues with mysql [d50f061887](https://github.com/GMOD/Apollo/commit/d50f0618874ae194e88d959d2b9a802f3a1ba7fa>).
- Allow addition of a controller vocabulary for Gene Product Description  [2488](https://github.com/GMOD/Apollo/pull/2488).
- Fixed ECO evidence code links [2491](https://github.com/GMOD/Apollo/pull/2491).
- Fixed load-link urls [2500](https://github.com/GMOD/Apollo/pull/2500).


## 2.6.0

Features

- Remove popups for annotations in favor of annotator panel [2334](https://github.com/GMOD/Apollo/pull/2334)
- Added 2 more pseudogenic SO terms and several more non-coding RNA terms and updated interfaces to reflect these [2475](https://github.com/GMOD/Apollo/pull/2475)
- Implemented gene product and field provenance annotations with evidence and GFF3 export [2371](https://github.com/GMOD/Apollo/pull/2371), [2234](https://github.com/GMOD/Apollo/pull/2234), [2312](https://github.com/GMOD/Apollo/pull/2312), [2424](https://github.com/GMOD/Apollo/pull/2424)
- Added name and type to top of annotation details [2423](https://github.com/GMOD/Apollo/pull/2423)
- Added GO Annotations to GFF3 export and extended to transcript [2400](https://github.com/GMOD/Apollo/pull/2400)
- `loadLink` can take name of gene in evidence (if JBrowse names have been processed) [2444](https://github.com/GMOD/Apollo/pull/2444)
- Add alias to user interface and GFF3 export [2277](https://github.com/GMOD/Apollo/pull/2277)
- Add help menu feedback [2344](https://github.com/GMOD/Apollo/pull/2344)
- Allows for better performance when a large number of annotations are present [2477](https://github.com/GMOD/Apollo/pull/2477)
- Show genome features in current view [2346](https://github.com/GMOD/Apollo/pull/2346)
- Remove sequence lookup at the top [2407](https://github.com/GMOD/Apollo/pull/2407)
- Provide better security and feedback when trying to export with insufficient permissions [2431](https://github.com/GMOD/Apollo/pull/2431)
- Split out default GO Evidence Codes from ECO codes [2429](https://github.com/GMOD/Apollo/pull/2429)
- Added more info (e.g, JBrowse and general settings) to the about window and is visible on login [47f469f7](https://github.com/GMOD/Apollo/commit/47f469f7586c49f51e1c2f23b59a0a2102ca224a)


Infrastructure Changes

- Upgrade to [JBrowse 1.16.8](https://github.com/GMOD/jbrowse/releases/tag/1.16.8-release)
- Upgrade to [Node 13](https://github.com/GMOD/Apollo/issues/2358) compatibility.
- Add python library to the docker image [2409](https://github.com/GMOD/Apollo/issues/2409)

Bug Fixes

- Open by uniquename to get only the results of the name we are interested in [2338](https://github.com/GMOD/Apollo/pull/2338)
- Fixed ability to add multiple BAMs at once [2352](https://github.com/GMOD/Apollo/pull/2352)
- Fixed export of non-coding RNA if exon not present [2353](https://github.com/GMOD/Apollo/pull/2353)
- Removed sequence panel lookup [2388](https://github.com/GMOD/Apollo/pull/2353)
- Annotator/updateFeature should store history properly [2390](https://github.com/GMOD/Apollo/pull/2353)
- Makes sure that parent directory exists when unpacking [2437](https://github.com/GMOD/Apollo/pull/2437)
- Fixed bug when decompressing gff3.gz data when adding a new track [2434](https://github.com/GMOD/Apollo/pull/2434)
- Fixed boolean environment options being interpreted correctly [be31b81f7](https://github.com/GMOD/Apollo/commit/be31b81f7d0668916bf92463a758506757cc5ada)

