---
title: 'Galactic Weekly: Week 8, 2026'
date: '2026-02-22'
tease: Weekly summary of activity across 150+ galaxyproject repositories
authors: Galactic Bot
tags:
- community
- development
subsites:
- all
---

![Galactic Weekly](https://raw.githubusercontent.com/nekrut/gxy-whats-new/main/assets/header.jpg)

## Summary
- **Repositories with activity:** 25
- **New issues:** 53
- **Issues closed:** 54
- **PRs opened:** 155
- **PRs merged:** 91
- **Contributors:** 51


### Highlights

This week the Galaxy Project merged 91 pull requests across 25 repositories with contributions from 51 developers. The main focus was on bug fixes and improvements to the Beta Upload Activity feature, including corrections for file transfers, dataset permissions, and credential validation across multiple Galaxy versions. The team added two new tools (Psauron and chromap) and updated six existing tools, while also fixing various issues with training materials, documentation, and the Galaxy Hub website. Technical improvements included Python dependency updates, enhanced testing capabilities, and streamlined development workflows.


## Most Active Repositories

| Repository | PRs Opened | PRs Merged | Issues Opened | Issues Closed |
|------------|------------|------------|---------------|---------------|
| [galaxy](https://github.com/galaxyproject/galaxy) | 26 | 16 | 21 | 18 |
| [galaxy-hub](https://github.com/galaxyproject/galaxy-hub) | 30 | 21 | 5 | 5 |
| [tools-iuc](https://github.com/galaxyproject/tools-iuc) | 26 | 12 | 4 | 25 |
| [training-material](https://github.com/galaxyproject/training-material) | 16 | 14 | 5 | 3 |
| [usegalaxy-tools](https://github.com/galaxyproject/usegalaxy-tools) | 10 | 4 | 1 | 0 |
| [galaxy_codex](https://github.com/galaxyproject/galaxy_codex) | 7 | 3 | 2 | 1 |
| [brc-analytics](https://github.com/galaxyproject/brc-analytics) | 4 | 1 | 11 | 0 |
| [iwc](https://github.com/galaxyproject/iwc) | 7 | 2 | 1 | 0 |
| [planemo](https://github.com/galaxyproject/planemo) | 5 | 3 | 0 | 1 |
| [galaxy-skills](https://github.com/galaxyproject/galaxy-skills) | 4 | 3 | 1 | 0 |


## Repository Summaries

### galaxy-k8s-boot
This week, the Galaxy Project's galaxy-k8s-boot repository merged one pull request that added direct support for Google Cloud Platform (GCP) Batch runner. This enhancement allows the Kubernetes deployment tool to integrate directly with GCP's batch processing service for running Galaxy workflows.

### galaxy-hub
The Galaxy Project repository "galaxy-hub" completed several technical improvements this week, including fixes for content rendering issues, style loading problems, and search functionality in their Astro-based system. The team added new content such as a blog post about a misconception paper, updated team member details and funding information, and created a new Matrix room for Earth Climate Ecology Sciences. Development workflow was streamlined by consolidating development scripts and addressing navigation and search interface problems.

### galaxy
This week's Galaxy Project activity focused heavily on fixing bugs and improving the Beta Upload Activity feature. Multiple fixes were implemented across different version branches (25.1 and 26.0), including corrections for credential validation, dataset permissions, file loading issues, and download problems with OMERO and ascp transfers. The team also updated Python dependencies, dropped the use of pkg_resources, and enhanced testing capabilities with Playwright improvements and Selenium fixes.

### training-material
The Galaxy Project training-material repository received multiple fixes this week, including resolving table of contents loading issues, correcting broken links for external tutorials, and fixing citation errors in bioimage analysis tutorials. Contributors also updated several tutorials with new funding information, resolved duplicate glossary headings, and updated various URLs and workflow identifiers throughout the materials.

### galaxy_codex
The Galaxy Project made three changes to disable or comment out the fetch-citations functionality in workflow dependencies and jobs. Two new issues were reported regarding incorrect tutorial visitor statistics and oversized weekly update pull requests, while one issue about missing workflows from the workflow list was resolved.

### iwc
This week, the Galaxy Project's "iwc" repository received two merged updates: a dependency bump upgrading the devalue package from version 5.6.2 to 5.6.3 in the website component, and a new version of the VGP precuration workflow. Additionally, a new issue was reported regarding workflow imports potentially failing to import workflow readme files.

### planemo
This week, the planemo repository merged three pull requests focused on Python compatibility and testing improvements. The changes replaced the deprecated distutils package to ensure compatibility with Python 3.12, improved test execution speed by integrating the uv package manager, and updated the system to recognize "completed" as a valid terminal state for workflow invocations. One issue requesting implementation of a `--number 2` option for the `planemo test` command was also closed.

### tools-iuc
The Galaxy Project's tools-iuc repository merged 12 pull requests this week, including two new tool additions (Psauron and chromap), version updates for six existing tools (fastreer, volcanoplot, legsta, htseq_count, and bigwig_outlier_bed), and several bug fixes for tools like Fastq dl, hyphy annotate, and samtools fixmate. The repository closed 25 issues, many of which were tool requests that have likely been fulfilled, while opening 4 new issues including bug reports for pysradb and shovill tools.

### usegalaxy-tools
This week, the Galaxy Project's usegalaxy-tools repository received updates to existing tools and installations. The Diamond tool was updated to version 2.1.22 and restricted to metagenomic analysis workflows, while samtools collate was added as a new tool option. Additionally, IWC (Intergalactic Workflow Commission) tools were installed for both the cloud platform and usegalaxy.org, and one bug report was filed regarding the gi2taxonomy tool's Fetch Taxonomic Ranks function.

### galaxy-language-server
This week, the Galaxy Project's galaxy-language-server repository prepared for a new version release by merging a pull request for v0.15.0. The activity focused on version preparation work, though the specific changes and features included in this release are not detailed in the available information.

### infrastructure-playbook
This week, the Galaxy Project's infrastructure-playbook repository had one merged pull request that modified the tool shed configuration settings. The change involved tweaking parameters in the tool shed setup, which manages the distribution and installation of Galaxy tools.

### galaxy-skills
This week, the Galaxy Project's skills repository focused on improving tool development documentation by consolidating the tool-dev skill into a single comprehensive reference and adding follow-up improvements. A new skill called "update-usegalaxy-tool" was also added to the collection. Additionally, a proposal was submitted to set up the repository as a Claude Code plugin marketplace.

### total-perspective-vortex
This week, the Galaxy Project's "total-perspective-vortex" repository merged one pull request that upgraded the project to use the uv package manager and Python 3.10. The update also implemented parallel test execution to run tests concurrently rather than sequentially.

### galaxy-mcp
The Galaxy MCP repository received two updates this week focused on dependency management and compatibility. Developers added version constraints to production dependencies to prevent unexpected breaking changes, and fixed issues with IWC (Intergalactic Workflow Commission) functions that were incompatible with fastmcp version 3.0.0 and newer.

### bioblend
This week, the Galaxy Project's bioblend repository had two changes merged. Developers fixed an issue with how the system checks for successful operations and added a new "completed" state to track when processes have finished.

### gxformat2
This week, the Galaxy Project's gxformat2 repository merged one pull request that added support for URL and TRS URL references in subworkflow run fields. This enhancement allows workflows to reference subworkflows using web URLs or Tool Registry Service (TRS) URLs, expanding the ways workflows can be linked together.

### tools-devteam
This week, the Galaxy Project's tools-devteam repository received two updates. The codebase was updated to release version 26.0, and developers removed the use of pkg_resources, likely as part of modernizing the package management approach.

### planemo-monitor
This week, the planemo-monitor repository had one pull request merged that reverted previous fixes. Additionally, one issue was closed related to failing builds when issues are detected.

### brc-analytics
The Galaxy Project's brc-analytics repository released version 0.23.0 this week. Development planning focused heavily on workflow management features, with 11 new issues created covering workflow list pages, configuration interfaces, and a workflow-first analysis flow. Additional issues addressed integration work for LexicMap, assembly selection interfaces, and a CloudFront API error handling problem.

### idc
This week, the Galaxy Project's "idc" repository had one new issue opened regarding which UCSC genomes should be used for automated runs. The issue references a discussion from the project forum, indicating ongoing coordination about genome selection for automated processes.

### ga2
This week, the Galaxy Project repository "ga2" had one new issue opened focused on preparing Vertebrate Genomes Project (VGP) Phase 1 data for publication. The issue addresses the need to synchronize assemblies, create proper indexing, and integrate the data into Galaxy's infrastructure.


## Merged Pull Requests

### bioblend
- [Fix success check](https://github.com/galaxyproject/bioblend/pull/531) by @mvdbeek
- [Add completed state](https://github.com/galaxyproject/bioblend/pull/530) by @mvdbeek

### brc-analytics
- [chore: bump version to 0.23.0](https://github.com/galaxyproject/brc-analytics/pull/1157) by @github-actions[bot]

### galaxy
- [Update Python dependencies](https://github.com/galaxyproject/galaxy/pull/21899) by @galaxybot
- [Prevent uploads to non-active histories in Beta Upload Activity](https://github.com/galaxyproject/galaxy/pull/21895) by @davelopez
- [Playwright test enhancements](https://github.com/galaxyproject/galaxy/pull/21893) by @jmchilton
- [&#91;26.0&#93; Fixes some more optional fields in templates](https://github.com/galaxyproject/galaxy/pull/21891) by @davelopez
- [Adds support for file hash in Dataverse datasets](https://github.com/galaxyproject/galaxy/pull/21890) by @davelopez
- [&#91;25.1&#93; Fix credential validation logic in tool form component](https://github.com/galaxyproject/galaxy/pull/21889) by @itisAliRH
- [Use (also) case-insensitive comparison for user email](https://github.com/galaxyproject/galaxy/pull/21885) by @nsoranzo
- [&#91;26.0&#93; Fix infinite request loop on dataset preview fetch failure](https://github.com/galaxyproject/galaxy/pull/21881) by @dannon
- [&#91;25.1&#93; Fix loading non-tool files from watched tool directories](https://github.com/galaxyproject/galaxy/pull/21880) by @mvdbeek
- [fix Selenium select_by_value: wait for element before find](https://github.com/galaxyproject/galaxy/pull/21874) by @jmchilton
- [&#91;25.1&#93; Fix output dataset permission guessing](https://github.com/galaxyproject/galaxy/pull/21862) by @mvdbeek
- [&#91;26.0&#93; Allow connecting sample sheet inputs to compatible collection inputs in editor](https://github.com/galaxyproject/galaxy/pull/21859) by @mvdbeek
- [Drop use of pkg_resources](https://github.com/galaxyproject/galaxy/pull/21858) by @nsoranzo
- [&#91;26.0&#93; Fix ascp download retries](https://github.com/galaxyproject/galaxy/pull/21857) by @mvdbeek
- [&#91;26.0&#93; Fix OMERO file source download multi channel TIFF](https://github.com/galaxyproject/galaxy/pull/21856) by @davelopez
- [Beta upload: create dataset collections directly via HdcaDataItemsTarget](https://github.com/galaxyproject/galaxy/pull/21855) by @mvdbeek

### galaxy-hub
- [Ensure Astro styles are loaded: specific to Preview server](https://github.com/galaxyproject/galaxy-hub/pull/3729) by @hujambo-dunia
- [Fix for global Astro styles](https://github.com/galaxyproject/galaxy-hub/pull/3728) by @hujambo-dunia
- [Bump devalue from 5.6.2 to 5.6.3 in /astro](https://github.com/galaxyproject/galaxy-hub/pull/3727) by @dependabot[bot]
- [Updated tags and funding to match new hub metadata](https://github.com/galaxyproject/galaxy-hub/pull/3725) by @Sch-Da
- [Enhance E-Science Days index with tags and funding](https://github.com/galaxyproject/galaxy-hub/pull/3724) by @Sch-Da
- [Add blogpost highlighting misconception paper](https://github.com/galaxyproject/galaxy-hub/pull/3722) by @bebatut
- [Fix content rendering issues in Astro preprocessing](https://github.com/galaxyproject/galaxy-hub/pull/3720) by @dannon
- [Always-visible homepage nav overlaid on hero](https://github.com/galaxyproject/galaxy-hub/pull/3719) by @dannon
- [&#91;astro&#93; Scottcain add bio](https://github.com/galaxyproject/galaxy-hub/pull/3718) by @scottcain
- [Bare Sites Style Fixes](https://github.com/galaxyproject/galaxy-hub/pull/3717) by @hujambo-dunia
- [Add a host section in the GCC2026 organizer page](https://github.com/galaxyproject/galaxy-hub/pull/3716) by @bebatut
- [Bump fast-xml-parser from 5.3.4 to 5.3.6 in /astro](https://github.com/galaxyproject/galaxy-hub/pull/3715) by @dependabot[bot]
- [Sync: Update files from training-material](https://github.com/galaxyproject/galaxy-hub/pull/3714) by @github-actions[bot]
- [&#91;astro&#93; Update US team details](https://github.com/galaxyproject/galaxy-hub/pull/3712) by @ahmedhamidawan
- [Support ?platform_group= query parameter on /use/ page](https://github.com/galaxyproject/galaxy-hub/pull/3711) by @dannon
- [Make homepage masthead stick once revealed](https://github.com/galaxyproject/galaxy-hub/pull/3710) by @dannon
- [Hide inactive force-mounted search tabs](https://github.com/galaxyproject/galaxy-hub/pull/3708) by @dannon
- [New Matrix Room: Earth Climate Ecology Sciences](https://github.com/galaxyproject/galaxy-hub/pull/3703) by @Marie59
- [Fix redirect route collisions in Astro dev/build](https://github.com/galaxyproject/galaxy-hub/pull/3702) by @dannon
- [Consolidate dev and dev:fresh into a single dev script](https://github.com/galaxyproject/galaxy-hub/pull/3701) by @dannon
- [Update Galactic Weekly for 2026-W07](https://github.com/galaxyproject/galaxy-hub/pull/3699) by @nekrut

### galaxy-k8s-boot
- [Add direct GCP Batch runner support](https://github.com/galaxyproject/galaxy-k8s-boot/pull/49) by @ksuderman

### galaxy-language-server
- [Prepare v0.15.0](https://github.com/galaxyproject/galaxy-language-server/pull/291) by @davelopez

### galaxy-mcp
- [Add upper-bound version pins to production dependencies](https://github.com/galaxyproject/galaxy-mcp/pull/36) by @dannon
- [Fix IWC functions breaking with fastmcp >= 3.0.0](https://github.com/galaxyproject/galaxy-mcp/pull/35) by @nekrut

### galaxy-skills
- [More followup to tool-dev](https://github.com/galaxyproject/galaxy-skills/pull/8) by @dannon
- [Consolidate tool-dev skill into single comprehensive reference](https://github.com/galaxyproject/galaxy-skills/pull/6) by @dannon
- [Add update-usegalaxy-tool skill](https://github.com/galaxyproject/galaxy-skills/pull/5) by @nekrut

### galaxy_codex
- [Comment out fetch-citations in workflow dependencies](https://github.com/galaxyproject/galaxy_codex/pull/604) by @bebatut
- [add usegalaxy...yml in lab folder](https://github.com/galaxyproject/galaxy_codex/pull/603) by @nagoue
- [Disable fetch-citations job in workflow](https://github.com/galaxyproject/galaxy_codex/pull/602) by @bebatut

### gxformat2
- [Support URL and TRS URL references in subworkflow run: fields](https://github.com/galaxyproject/gxformat2/pull/130) by @mvdbeek

### infrastructure-playbook
- [Tweak tool shed config](https://github.com/galaxyproject/infrastructure-playbook/pull/58) by @mvdbeek

### iwc
- [Bump devalue from 5.6.2 to 5.6.3 in /website](https://github.com/galaxyproject/iwc/pull/1111) by @dependabot[bot]
- [VGP - New version of precuration workflow](https://github.com/galaxyproject/iwc/pull/1107) by @Delphine-L

### planemo
- [Replace distutils (removed in Python 3.12)](https://github.com/galaxyproject/planemo/pull/1618) by @nsoranzo
- [Speed up planemo tests by providing uv](https://github.com/galaxyproject/planemo/pull/1616) by @mvdbeek
- [Accept completed as terminal invocation state](https://github.com/galaxyproject/planemo/pull/1615) by @mvdbeek

### planemo-monitor
- [Revert fixes](https://github.com/galaxyproject/planemo-monitor/pull/57) by @bernt-matthias

### tools-devteam
- [Update to release 26.0](https://github.com/galaxyproject/tools-devteam/pull/640) by @guerler
- [Drop use of pkg_resources](https://github.com/galaxyproject/tools-devteam/pull/639) by @nsoranzo

### tools-iuc
- [Fastq dl - Fix failing weekly tests](https://github.com/galaxyproject/tools-iuc/pull/7708) by @RZ9082
- [Fix hyphy annotate](https://github.com/galaxyproject/tools-iuc/pull/7705) by @d-callan
- [Allow unsorted.bam in samtools fixmate](https://github.com/galaxyproject/tools-iuc/pull/7703) by @mvdbeek
- [New tool : Psauron (include wrapper and tests)](https://github.com/galaxyproject/tools-iuc/pull/7702) by @scorreard
- [New tool addition: chromap](https://github.com/galaxyproject/tools-iuc/pull/7698) by @SaimMomin12
- [Update fastreer to 2.1.3](https://github.com/galaxyproject/tools-iuc/pull/7696) by @SaimMomin12
- [Add mock changes to samtools-collate](https://github.com/galaxyproject/tools-iuc/pull/7695) by @SaimMomin12
- [Hifiasm - Add findutils to reqs](https://github.com/galaxyproject/tools-iuc/pull/7694) by @RZ9082
- [Updating tools/volcanoplot from version 4.0.1 to 4.0.2](https://github.com/galaxyproject/tools-iuc/pull/7691) by @gxydevbot
- [Updating tools/legsta from version 0.5.1 to 0.5.2](https://github.com/galaxyproject/tools-iuc/pull/7689) by @gxydevbot
- [Updating tools/htseq_count from version 2.0.9 to 2.1.2](https://github.com/galaxyproject/tools-iuc/pull/7688) by @gxydevbot
- [Updating tools/bigwig_outlier_bed from version 0.2.4 to 0.2.5](https://github.com/galaxyproject/tools-iuc/pull/7684) by @gxydevbot

### total-perspective-vortex
- [Uplift to uv + py310 and parallelize tests](https://github.com/galaxyproject/total-perspective-vortex/pull/185) by @nuwang

### training-material
- [Fix loading TOC issue](https://github.com/galaxyproject/training-material/pull/6671) by @bebatut
- [Bump nokogiri from 1.18.9 to 1.19.1](https://github.com/galaxyproject/training-material/pull/6670) by @dependabot[bot]
- [Add CYOA feature to split Voronoi segmentation tutorial by scientific field](https://github.com/galaxyproject/training-material/pull/6668) by @dianichj
- [Fix links for external tutorials](https://github.com/galaxyproject/training-material/pull/6667) by @shiltemann
- [FIX: cellpose citation in "Where to start with bioimage analysis in Galaxy"](https://github.com/galaxyproject/training-material/pull/6666) by @rmassei
- [Update metagenomics](https://github.com/galaxyproject/training-material/pull/6664) by @paulzierep
- [Add funding information to the tutorial](https://github.com/galaxyproject/training-material/pull/6663) by @rmassei
- [Fix glossary heading duplication in tutorial.md](https://github.com/galaxyproject/training-material/pull/6660) by @pavanvidem
- [Update Persistent uniform resource locators](https://github.com/galaxyproject/training-material/pull/6659) by @github-actions[bot]
- [FIX: BiaPy Training tutorial and data library](https://github.com/galaxyproject/training-material/pull/6656) by @rmassei
- [Fix URL to QIIME 2 Moving Pictures tutorial](https://github.com/galaxyproject/training-material/pull/6654) by @bebatut
- [Update WorkflowHub IDs](https://github.com/galaxyproject/training-material/pull/6653) by @github-actions[bot]
- [Update Cached Commit Data](https://github.com/galaxyproject/training-material/pull/6652) by @github-actions[bot]
- [Update Persistent uniform resource locators](https://github.com/galaxyproject/training-material/pull/6651) by @github-actions[bot]

### usegalaxy-tools
- [Update Diamond to 2.1.22, restrict to metagenomic_analysis](https://github.com/galaxyproject/usegalaxy-tools/pull/1364) by @nekrut
- [Install IWC tools for cloud 2026-02-18](https://github.com/galaxyproject/usegalaxy-tools/pull/1363) by @github-actions[bot]
- [Install IWC tools for usegalaxy.org 2026-02-18](https://github.com/galaxyproject/usegalaxy-tools/pull/1362) by @github-actions[bot]
- [Add  samtools collate](https://github.com/galaxyproject/usegalaxy-tools/pull/1361) by @SaimMomin12

## New Issues

### brc-analytics
- [Logan/LexicMap integration](https://github.com/galaxyproject/brc-analytics/issues/1151) by @nekrut
- [CloudFront eating API error responses](https://github.com/galaxyproject/brc-analytics/issues/1158) by @dannon
- [Workflows List Page](https://github.com/galaxyproject/brc-analytics/issues/1145) by @frano-m
- [Simplify Analyze in Galaxy flow](https://github.com/galaxyproject/brc-analytics/issues/1156) by @NoopDog
- [Workflow Configuration Page (Workflow-First Route)](https://github.com/galaxyproject/brc-analytics/issues/1146) by @frano-m
- [Comparative Genomics Workflow in BRC Analytics](https://github.com/galaxyproject/brc-analytics/issues/1153) by @nekrut
- [Workflows Entity Page & Workflow-First Analysis Flow](https://github.com/galaxyproject/brc-analytics/issues/1144) by @frano-m
- [Remaining Stepper Integration](https://github.com/galaxyproject/brc-analytics/issues/1150) by @frano-m
- [Sidebar Assembly Details](https://github.com/galaxyproject/brc-analytics/issues/1149) by @frano-m
- [Assembly Selection Modal (Full-Screen)](https://github.com/galaxyproject/brc-analytics/issues/1148) by @frano-m
- [Reference Assembly Selection Step](https://github.com/galaxyproject/brc-analytics/issues/1147) by @frano-m

### ga2
- [VGP Phase 1 Publication Readiness: Assembly Synchronization, Indexing, and Galaxy Integration](https://github.com/galaxyproject/ga2/issues/58) by @nekrut

### galaxy
- [Stores using &#96;useKeyedCache&#96; should use consistent retry handling](https://github.com/galaxyproject/galaxy/issues/21886) by @davelopez
- [Beta Upload Activity: Add test coverage for Upload Activity features](https://github.com/galaxyproject/galaxy/issues/21878) by @davelopez
- [Beta Upload Activity: Add dialog version of Upload Activity](https://github.com/galaxyproject/galaxy/issues/21877) by @davelopez
- [Dataset name can be changed before job starts](https://github.com/galaxyproject/galaxy/issues/21873) by @kostrykin
- [Migrate ftp file source plugin to fsspec](https://github.com/galaxyproject/galaxy/issues/21866) by @davelopez
- [Migrate ssh file source plugin to fsspec](https://github.com/galaxyproject/galaxy/issues/21867) by @davelopez
- [Beta Upload Activity: Add discover/try &#96;Beta Upload Activity&#96; button in old upload dialog](https://github.com/galaxyproject/galaxy/issues/21883) by @davelopez
- [&#91;TS2.0&#93; missing URL in emails](https://github.com/galaxyproject/galaxy/issues/21871) by @bgruening
- [Eliminate WSGI App for ToolShed](https://github.com/galaxyproject/galaxy/issues/21896) by @jmchilton
- [Move output cleanup option into &#96;Configure Output&#96; section in workflow editor](https://github.com/galaxyproject/galaxy/issues/21888) by @mvdbeek
- [Migrate webdav file source plugin to fsspec](https://github.com/galaxyproject/galaxy/issues/21869) by @davelopez
- [Migrate googledrive file source plugin to fsspec](https://github.com/galaxyproject/galaxy/issues/21868) by @davelopez
- [Migrate dropbox file source plugin to fsspec](https://github.com/galaxyproject/galaxy/issues/21865) by @davelopez
- [Beta Upload Activity: Improve &#96;Type&#96; and &#96;Reference&#96; selectors in Upload Activity](https://github.com/galaxyproject/galaxy/issues/21879) by @davelopez
- [Beta Upload Activity: Add UI to support composite datatypes](https://github.com/galaxyproject/galaxy/issues/21876) by @davelopez
- [Workflow Landing setting collection element extensions to auto](https://github.com/galaxyproject/galaxy/issues/21901) by @ahmedhamidawan
- [Tool credentials do not work when tool is used in workflow](https://github.com/galaxyproject/galaxy/issues/21884) by @bernt-matthias
- [Tags on datasets are duplicated when copying a history](https://github.com/galaxyproject/galaxy/issues/21872) by @kostrykin
- [Beta Upload Activity polishing](https://github.com/galaxyproject/galaxy/issues/21875) by @davelopez
- [Navigating to a dataset preview creates request loop in some edge cases](https://github.com/galaxyproject/galaxy/issues/21863) by @davelopez
- [Failed to materialize deferred dataset with exception: ascp transfer failed for vol1/fastq/ERR020/ERR020362/ERR020362.fastq.gz with exit code 1. Error: Partial Completion: 0K bytes transferred in 0 seconds](https://github.com/galaxyproject/galaxy/issues/21854) by @galaxyproject-sentryintegration[bot]

### galaxy-hub
- [Astro migration: manual review of top pages before cutover](https://github.com/galaxyproject/galaxy-hub/issues/3704) by @dannon
- [Astro migration: cutover tracking issue](https://github.com/galaxyproject/galaxy-hub/issues/3705) by @dannon
- [&#91;astro&#93; Main menu hard to find](https://github.com/galaxyproject/galaxy-hub/issues/3713) by @jdavcs
- [&#91;astro&#93; remaining issues with hub search](https://github.com/galaxyproject/galaxy-hub/issues/3700) by @wm75
- [Remove or update statistics page](https://github.com/galaxyproject/galaxy-hub/issues/3707) by @scottcain

### galaxy-skills
- [Proposal: Set up as a Claude Code plugin marketplace](https://github.com/galaxyproject/galaxy-skills/issues/7) by @dannon

### galaxy_codex
- [Tutorial Visitors stats probably wrong](https://github.com/galaxyproject/galaxy_codex/issues/609) by @nagoue
- [Weekly update PR too big](https://github.com/galaxyproject/galaxy_codex/issues/608) by @bebatut

### idc
- [UCSC genomes to use for auto runs (linked back to forum)](https://github.com/galaxyproject/idc/issues/83) by @jennaj

### iwc
- [Workflow imports not importing workflow readmes?](https://github.com/galaxyproject/iwc/issues/1119) by @ahmedhamidawan

### tools-iuc
- [pysradb does not return results](https://github.com/galaxyproject/tools-iuc/issues/7710) by @gdefazio
- [Bug: shovill 1.4.2+galaxy0 graph result missing](https://github.com/galaxyproject/tools-iuc/issues/7704) by @jennaj
- [Integrate Kraken for Automated Text Recognition](https://github.com/galaxyproject/tools-iuc/issues/7697) by @Sch-Da
- [Wrap Paffy tools](https://github.com/galaxyproject/tools-iuc/issues/7693) by @SaimMomin12

### training-material
- [Unable to follow the tutorial](https://github.com/galaxyproject/training-material/issues/6658) by @Swathi266
- [Issue with the admin_install section of tutorials](https://github.com/galaxyproject/training-material/issues/6662) by @lldelisle
- [The Galaxy reports webapp is gone](https://github.com/galaxyproject/training-material/issues/6665) by @bgruening
- [Missing aside table of contents in tutorials](https://github.com/galaxyproject/training-material/issues/6655) by @bebatut
- [External tutorial redirecting to GTN main page](https://github.com/galaxyproject/training-material/issues/6657) by @bebatut

### usegalaxy-tools
- [Bug gi2taxonomy/Fetch Taxonomic Ranks/1.1.0](https://github.com/galaxyproject/usegalaxy-tools/issues/1368) by @jennaj

## Closed Issues

### galaxy
- [Workflow Landing setting collection element extensions to auto](https://github.com/galaxyproject/galaxy/issues/21901)
- [Tool credentials do not work when tool is used in workflow](https://github.com/galaxyproject/galaxy/issues/21884)
- [Tool credentials fail on containerized (singularity?) destinations](https://github.com/galaxyproject/galaxy/issues/21715)
- [Beta upload flow should create dataset collections directly instead of separately](https://github.com/galaxyproject/galaxy/issues/21850)
- [&#91;Release Testing&#93; Add Beta Upload Activity - User Interface Redesign](https://github.com/galaxyproject/galaxy/issues/21750)
- [Adding tags on Safari](https://github.com/galaxyproject/galaxy/issues/21777)
- [add repository search to the homepage of toolshed](https://github.com/galaxyproject/galaxy/issues/21402)
- [toolshed: Sort order of search results](https://github.com/galaxyproject/galaxy/issues/21406)
- [allow upload configuration operations in bulk](https://github.com/galaxyproject/galaxy/issues/17780)
- [Activity bar - upload activity](https://github.com/galaxyproject/galaxy/issues/17285)
- [Failing Package Tests](https://github.com/galaxyproject/galaxy/issues/21823)
- [Problems with file source form validators](https://github.com/galaxyproject/galaxy/issues/21668)
- [problem with OMERO as file source when fetching data](https://github.com/galaxyproject/galaxy/issues/21744)
- [&#91;Release Testing&#93; Refactor display application handling](https://github.com/galaxyproject/galaxy/issues/21781)
- [Failed to materialize deferred dataset with exception: ascp transfer failed for vol1/fastq/ERR020/ERR020362/ERR020362.fastq.gz with exit code 1. Error: Partial Completion: 0K bytes transferred in 0 seconds](https://github.com/galaxyproject/galaxy/issues/21854)
- [Shipping the galaxy client](https://github.com/galaxyproject/galaxy/issues/19881)
- [Galaxy UI appears nested within cetral panel after viewing job info from Local Data section](https://github.com/galaxyproject/galaxy/issues/21752)
- [Minus character can not be typed in float parameters](https://github.com/galaxyproject/galaxy/issues/21808)

### galaxy-hub
- [&#91;astro&#93; Main menu hard to find](https://github.com/galaxyproject/galaxy-hub/issues/3713)
- [keep https://galaxyproject.org/use/?platform_group=public-servers working](https://github.com/galaxyproject/galaxy-hub/issues/3697)
- [&#91;astro&#93; remaining issues with hub search](https://github.com/galaxyproject/galaxy-hub/issues/3700)
- [Add author profile pages](https://github.com/galaxyproject/galaxy-hub/issues/3543)
- [Astro: Improve search functionality](https://github.com/galaxyproject/galaxy-hub/issues/3531)

### galaxy_codex
- [workflows absent from workflow list](https://github.com/galaxyproject/galaxy_codex/issues/564)

### planemo
- [Implement planemo test --number 2](https://github.com/galaxyproject/planemo/issues/262)

### planemo-monitor
- [Fail the build if there are issues...](https://github.com/galaxyproject/planemo-monitor/issues/6)

### tools-iuc
- [Request: add Fur to microGalaxy](https://github.com/galaxyproject/tools-iuc/issues/7678)
- [Configure MAF tools to use local file caching](https://github.com/galaxyproject/tools-iuc/issues/7410)
- [BMGE tool would be helpful on the public server](https://github.com/galaxyproject/tools-iuc/issues/5998)
- [MUSIC for peak-calling](https://github.com/galaxyproject/tools-iuc/issues/876)
- [scRNA-Seq Workflows](https://github.com/galaxyproject/tools-iuc/issues/2057)
- [Request for tool wrap for BBtools](https://github.com/galaxyproject/tools-iuc/issues/3682)
- [Tool request: muon](https://github.com/galaxyproject/tools-iuc/issues/4474)
- [Add tool: viralverify](https://github.com/galaxyproject/tools-iuc/issues/4665)
- [Genomescope  genome assembly  tools](https://github.com/galaxyproject/tools-iuc/issues/4943)
- [Tools request: Coding-potential assessment](https://github.com/galaxyproject/tools-iuc/issues/4964)
- [Add tool Decontaminator](https://github.com/galaxyproject/tools-iuc/issues/5031)
- [add frogs](https://github.com/galaxyproject/tools-iuc/issues/5128)
- [Tool request: FGBio suite](https://github.com/galaxyproject/tools-iuc/issues/5192)
- [academic free ONT base caller](https://github.com/galaxyproject/tools-iuc/issues/5004)
- [Add Dimet tool suite: Differential Isotope-labeled targeted Metabolomics](https://github.com/galaxyproject/tools-iuc/issues/5397)
- [Add IMPC query tool](https://github.com/galaxyproject/tools-iuc/issues/5506)
- [new tool request: metaMDBG](https://github.com/galaxyproject/tools-iuc/issues/6578)
- [Tool request:  SYRI](https://github.com/galaxyproject/tools-iuc/issues/6444)
- [Wrapping of UCSC MAF Tools](https://github.com/galaxyproject/tools-iuc/issues/6938)
- [New tool: PanTA](https://github.com/galaxyproject/tools-iuc/issues/6993)
- [Add amas(1.0) tool](https://github.com/galaxyproject/tools-iuc/issues/7442)
- [&#91;Poll&#93; Help Us pick the Tool Devs SIG Bimonthly Meeting Time](https://github.com/galaxyproject/tools-iuc/issues/7624)
- [chromap tool request](https://github.com/galaxyproject/tools-iuc/issues/7589)
- [Add samtools collate](https://github.com/galaxyproject/tools-iuc/issues/7671)
- [Wrap HAL command-line tools for Galaxy](https://github.com/galaxyproject/tools-iuc/issues/7476)

### training-material
- [Missing aside table of contents in tutorials](https://github.com/galaxyproject/training-material/issues/6655)
- [External tutorial redirecting to GTN main page](https://github.com/galaxyproject/training-material/issues/6657)
- [Training examples in the BiaPy library is missing](https://github.com/galaxyproject/training-material/issues/6646)

---
*Generated automatically on 2026-02-24 21:38 UTC*