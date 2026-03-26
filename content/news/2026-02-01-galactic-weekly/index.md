---
title: 'Galactic Weekly: Week 5, 2026'
date: '2026-02-01'
tease: Weekly summary of activity across 150+ galaxyproject repositories
tags:
- community
- development
subsites:
- all
---

![Galactic Weekly](https://raw.githubusercontent.com/nekrut/gxy-whats-new/main/assets/header.jpg)

## Summary
- **Repositories with activity:** 20
- **New issues:** 41
- **Issues closed:** 24
- **PRs opened:** 146
- **PRs merged:** 84
- **Contributors:** 58


### Highlights

The Galaxy Project released version 26.0 release candidate 1 and continued development on version 26.1, adding an AI-powered tool recommendation feature and fixing various workflow and authentication issues. The project's documentation hub received updates to resolve technical problems with the Astro framework and added several new event pages. Tool repositories were updated with regular automated installations and version updates, including three new tools (PIRATE, Mgnify genome search, and datavrzd) and fixes for tools causing failures on Galaxy instances. The analytics platform gained LLM-powered natural language search functionality and improved workflows quality control reporting.


## Most Active Repositories

| Repository | PRs Opened | PRs Merged | Issues Opened | Issues Closed |
|------------|------------|------------|---------------|---------------|
| [galaxy](https://github.com/galaxyproject/galaxy) | 41 | 24 | 16 | 13 |
| [galaxy-hub](https://github.com/galaxyproject/galaxy-hub) | 18 | 12 | 3 | 1 |
| [usegalaxy-tools](https://github.com/galaxyproject/usegalaxy-tools) | 19 | 12 | 0 | 0 |
| [brc-analytics](https://github.com/galaxyproject/brc-analytics) | 11 | 9 | 11 | 7 |
| [tools-iuc](https://github.com/galaxyproject/tools-iuc) | 18 | 5 | 5 | 1 |
| [training-material](https://github.com/galaxyproject/training-material) | 12 | 10 | 0 | 2 |
| [galaxy_codex](https://github.com/galaxyproject/galaxy_codex) | 4 | 4 | 1 | 0 |
| [galaxy-visualizations](https://github.com/galaxyproject/galaxy-visualizations) | 4 | 4 | 0 | 0 |
| [iwc](https://github.com/galaxyproject/iwc) | 5 | 0 | 1 | 0 |
| [galaxy-mcp](https://github.com/galaxyproject/galaxy-mcp) | 2 | 1 | 0 | 0 |


## Repository Summaries

### training-material
The Galaxy Project training-material repository received updates to external event listings with Love Data Week added, and several organizational changes including new organizations and contributors imported from galaxy-hub along with grants file updates. Tutorial content was enhanced with pre-visualization features and updated steps, while technical maintenance included updates to cached commit data and persistent URLs.

### galaxy-hub
The Galaxy Project's hub repository received updates to fix multiple technical issues with the Astro framework, including missing images in subdirectories and URL routing problems. Several new event pages were added, including events for Galaxy Tools at University Library Freiburg, a NUBRI kickoff meeting, and updated details for the 2026 Metagenome Training Course and GCC2026 conference. The repository also synchronized content with the Galaxy Training Network materials and imported GTN events and metadata.

### usegalaxy-tools
This week, the usegalaxy-tools repository received regular automated updates to maintain tool versions across different Galaxy instances, with daily installations of Intergalactic Workflow Commission (IWC) tools for usegalaxy.org and periodic updates to cloud and other repositories. The maintainers also added or updated several specific tools, including egapx (updated to its latest version), lexicmap wrapper (updated to latest version), pysradb_search (newly installed), and chainswap (added to the main .org instance).

### brc-analytics
The Galaxy Project's brc-analytics repository added LLM-powered natural language search functionality and a white papers section to the homepage while removing the survey card. The team also improved the release workflow to handle different branch versions, enhanced the workflows quality control report, and updated to the latest version of the findable-ui component library.

### tools-iuc
This week, the Galaxy Project's tools-iuc repository added three new tools (PIRATE, Mgnify genome search, and datavrzd) and updated existing tools including fastp (to version 1.1.0) and vgp_processcuration (to version 1.1). The team also fixed issues with the mitobim form and resolved a problem affecting Medaka tools version 2.1.1+galaxy0 that was causing failures on Galaxy Australia and other Galaxy instances.

### galaxy
The Galaxy Project released version 26.0 release candidate 1 and began development on version 26.1, while merging bug fixes from the 25.1 branch. Key changes include adding an AI-powered tool recommendation feature, fixing workflow-related issues like duplicated user sharing entries and HTCondor job monitoring problems, and resolving authentication issues with OIDC usernames and repository credential handling.

### usegalaxy-playbook
This week, the Galaxy Project's usegalaxy-playbook repository received two new tool installation requests. Users requested the addition of gwtc_analysis for astronomy workflows and bcftools_plugin_split_vep to be installed on the ORG and AU Galaxy instances, as it is currently only available on the EU server.

### galaxy-k8s-boot
This week, the Galaxy Project's galaxy-k8s-boot repository had one pull request merged that added masthead images to the project. This appears to be a visual enhancement to the user interface components of the Kubernetes-based Galaxy deployment tool.

### galaxy_codex
This week, the Galaxy Project's galaxy_codex repository received updates to its imaging lab content and interactive tables functionality. The team also implemented automatic resource updates, upgraded the Ruby setup from version 1.284.0 to 1.286.0, and opened a discussion about promoting peer-reviewed content in Labs, specifically addressing SPOC (Single Point of Contact) implementation.

### galaxy-visualizations
This week, the Galaxy Project's visualization tools repository received four updates focused on bug fixes and feature additions. The changes included restoring a default value, fixing the plot height display in the LocusZoom visualization tool, adding a materializer component to the Polaris tool, and updating the chromosome input type in LocusZoom along with a version upgrade.

### bioblend
This week, the Galaxy Project's bioblend repository had one merged pull request that added a new method for extracting help text from tools. This enhancement allows developers to programmatically access tool documentation and usage information through the bioblend API.

### galaxy-mcp
The Galaxy Project's "galaxy-mcp" repository had one merged pull request this week that updated the schema version and bumped the package version to 1.3.0. This appears to be a routine version update for the project's release cycle.

### gxy.io
This week, the Galaxy Project's "gxy.io" repository had one merged pull request that added a JXTX shortener for BoG. The change appears to be a minor addition to the URL shortening functionality of the service.

### iwc
This week, the Galaxy Project's "iwc" repository had one new issue created regarding testing release 26.0. No other notable activity occurred in terms of pull requests, commits, or other repository changes during this period.

### planemo
This week, one new issue was opened in the Galaxy Project's planemo repository titled "Planemo improvements," though no specific details about the proposed improvements were provided in the summary. No other development activity, such as code commits or pull requests, was mentioned for this period.

### galaxy-release-util
This week, one new issue was reported for the galaxy-release-util repository concerning the utility incorrectly assuming invalid previous or next release versions. No other development activity, such as commits, pull requests, or releases, was recorded during this period.


## Merged Pull Requests

### bioblend
- [Adds a method to extract tool's helptext](https://github.com/galaxyproject/bioblend/pull/529) by @anuprulez

### brc-analytics
- [chore: bump version to 0.21.0](https://github.com/galaxyproject/brc-analytics/pull/1116) by @github-actions[bot]
- [feat: configure backend URLs for dev and prod environments](https://github.com/galaxyproject/brc-analytics/pull/1115) by @dannon
- [feat: improve release workflow to differentiate branch versions](https://github.com/galaxyproject/brc-analytics/pull/1114) by @dannon
- [feat: improvements to workflows qc report](https://github.com/galaxyproject/brc-analytics/pull/1113) by @d-callan
- [content: remove survey card for now (#1111)](https://github.com/galaxyproject/brc-analytics/pull/1112) by @frano-m
- [feat: add sectionwhitepapers component to homepage (#1108)](https://github.com/galaxyproject/brc-analytics/pull/1109) by @frano-m
- [feat: add LLM-powered natural language search](https://github.com/galaxyproject/brc-analytics/pull/1106) by @dannon
- [fix: post-demo cleanup](https://github.com/galaxyproject/brc-analytics/pull/1099) by @d-callan
- [chore: update findable-ui to latest (#1097)](https://github.com/galaxyproject/brc-analytics/pull/1098) by @frano-m

### galaxy
- [Don't persist credentials when checking out repositories](https://github.com/galaxyproject/galaxy/pull/21705) by @nsoranzo
- [Moves BootstrapSize type to shared module](https://github.com/galaxyproject/galaxy/pull/21702) by @davelopez
- [Allow admin to override `$GALAXY_MEMORY_MB`](https://github.com/galaxyproject/galaxy/pull/21700) by @natefoo
- [[25.1] Remove Discover Tools button in the workflow tool panel](https://github.com/galaxyproject/galaxy/pull/21697) by @ahmedhamidawan
- [[26.0] Fix storing origin for workflow landing requests](https://github.com/galaxyproject/galaxy/pull/21696) by @mvdbeek
- [[26.0] Check file source template config files for determining conditional dependencies + add constraint for zero-ice](https://github.com/galaxyproject/galaxy/pull/21688) by @bernt-matthias
- [[26.0] Update version to 26.0.rc1](https://github.com/galaxyproject/galaxy/pull/21686) by @guerler
- [Version 26.1.dev](https://github.com/galaxyproject/galaxy/pull/21685) by @guerler
- [[25.1] Fixes duplicated entries in "share with individual users" component](https://github.com/galaxyproject/galaxy/pull/21683) by @davelopez
- [[25.1] Resets selection filter when loading dialog](https://github.com/galaxyproject/galaxy/pull/21681) by @davelopez
- [[25.1] Fixes storage management check for anonymous users](https://github.com/galaxyproject/galaxy/pull/21680) by @davelopez
- [Merge 25.1 into dev](https://github.com/galaxyproject/galaxy/pull/21677) by @guerler
- [Add Database Revision for 26.0](https://github.com/galaxyproject/galaxy/pull/21675) by @guerler
- [Reduce completion monitor logging](https://github.com/galaxyproject/galaxy/pull/21674) by @mvdbeek
- [Type annotations and refactorings](https://github.com/galaxyproject/galaxy/pull/21673) by @nsoranzo
- [Add missing types to visualization model](https://github.com/galaxyproject/galaxy/pull/21672) by @guerler
- [Fix incorrect router tag in plugins API](https://github.com/galaxyproject/galaxy/pull/21669) by @dannon
- [Improve ruff configuration to mimic our isort settings](https://github.com/galaxyproject/galaxy/pull/21666) by @nsoranzo
- [[25.0] Fix data manager .loc file selection logic](https://github.com/galaxyproject/galaxy/pull/21664) by @jdavcs
- [Bump python-multipart from 0.0.21 to 0.0.22 in /lib/galaxy/dependencies](https://github.com/galaxyproject/galaxy/pull/21663) by @dependabot[bot]
- [Add agent based AI tool recommendation](https://github.com/galaxyproject/galaxy/pull/21661) by @dannon
- [Update locuszoom package version to 0.0.9](https://github.com/galaxyproject/galaxy/pull/21658) by @elmedjadjirayane
- [[25.1] Fix HTCondor runner unwatching jobs when stopping containers](https://github.com/galaxyproject/galaxy/pull/21656) by @kysrpex
- [Add tests for oidc usernames](https://github.com/galaxyproject/galaxy/pull/21655) by @nuwang

### galaxy-hub
- [[astro] missing images in subdirs](https://github.com/galaxyproject/galaxy-hub/pull/3641) by @bgruening
- [fix multiple smaller things in astro](https://github.com/galaxyproject/galaxy-hub/pull/3640) by @bgruening
- [Sync: Update files from training-material](https://github.com/galaxyproject/galaxy-hub/pull/3639) by @github-actions[bot]
- [add missing schema files](https://github.com/galaxyproject/galaxy-hub/pull/3637) by @bgruening
- [Sync: Update files from training-material](https://github.com/galaxyproject/galaxy-hub/pull/3636) by @github-actions[bot]
- [add sync with GTN metadata](https://github.com/galaxyproject/galaxy-hub/pull/3635) by @bgruening
- [Import GTN Events](https://github.com/galaxyproject/galaxy-hub/pull/3633) by @github-actions[bot]
- [Add denbi as a supporter for NUBRI event](https://github.com/galaxyproject/galaxy-hub/pull/3628) by @Sch-Da
- [Create event page for Galaxy Tools at University Library Freiburg](https://github.com/galaxyproject/galaxy-hub/pull/3626) by @Sch-Da
- [Update event details for 2026 Metagenome Training Course](https://github.com/galaxyproject/galaxy-hub/pull/3625) by @Sch-Da
- [Creating even for NUBRI kickoff](https://github.com/galaxyproject/galaxy-hub/pull/3624) by @Sch-Da
- [Add highlighted talks at GCC2026](https://github.com/galaxyproject/galaxy-hub/pull/3623) by @afgane

### galaxy-k8s-boot
- [Add masthead images](https://github.com/galaxyproject/galaxy-k8s-boot/pull/46) by @afgane

### galaxy-mcp
- [Update schema version and bump package version to 1.3.0](https://github.com/galaxyproject/galaxy-mcp/pull/30) by @arash77

### galaxy-visualizations
- [Restore default value](https://github.com/galaxyproject/galaxy-visualizations/pull/151) by @guerler
- [[locuszoom] Fix plot height](https://github.com/galaxyproject/galaxy-visualizations/pull/150) by @guerler
- [[polaris] Add materializer](https://github.com/galaxyproject/galaxy-visualizations/pull/149) by @guerler
- [change type for chromosome input in locuszoom and upgrade to version…](https://github.com/galaxyproject/galaxy-visualizations/pull/148) by @elmedjadjirayane

### galaxy_codex
- [Imaging lab update](https://github.com/galaxyproject/galaxy_codex/pull/580) by @nagoue
- [Automatic resources update](https://github.com/galaxyproject/galaxy_codex/pull/578) by @github-actions[bot]
- [Bump ruby/setup-ruby from 1.284.0 to 1.286.0](https://github.com/galaxyproject/galaxy_codex/pull/577) by @dependabot[bot]
- [Update Interactive tables](https://github.com/galaxyproject/galaxy_codex/pull/576) by @bebatut

### gxy.io
- [adding a jxtx shortener for BoG](https://github.com/galaxyproject/gxy.io/pull/112) by @scottcain

### tools-iuc
- [New Tool Addition: PIRATE Tool](https://github.com/galaxyproject/tools-iuc/pull/7632) by @SaimMomin12
- [Fix mitobim form](https://github.com/galaxyproject/tools-iuc/pull/7628) by @neoformit
- [Add Mgnify genome search](https://github.com/galaxyproject/tools-iuc/pull/7622) by @SantaMcCloud
- [Updating tools/vgp_processcuration from version 1.0 to 1.1](https://github.com/galaxyproject/tools-iuc/pull/7621) by @gxydevbot
- [Updating tools/fastp from version 1.0.1 to 1.1.0](https://github.com/galaxyproject/tools-iuc/pull/7618) by @gxydevbot

### training-material
- [Add external event for Love Data Week](https://github.com/galaxyproject/training-material/pull/6628) by @shiltemann
- [Update tutorial.md aexample apiKey](https://github.com/galaxyproject/training-material/pull/6627) by @yvanlebras
- [Added new organisations from galaxy-hub.](https://github.com/galaxyproject/training-material/pull/6626) by @dadrasarmin
- [Galaxy hub grants update for grants.yaml file](https://github.com/galaxyproject/training-material/pull/6625) by @dadrasarmin
- [added new contributors from galaxy-hub.](https://github.com/galaxyproject/training-material/pull/6624) by @dadrasarmin
- [Add a bio for BIONT](https://github.com/galaxyproject/training-material/pull/6622) by @shiltemann
- [[CONTRIBUTORS] Tweaks for Hub](https://github.com/galaxyproject/training-material/pull/6620) by @shiltemann
- [Enhance tutorial with pre-visualization and update steps](https://github.com/galaxyproject/training-material/pull/6619) by @scorreard
- [Update Cached Commit Data](https://github.com/galaxyproject/training-material/pull/6618) by @github-actions[bot]
- [Update Persistent uniform resource locators](https://github.com/galaxyproject/training-material/pull/6617) by @github-actions[bot]

### usegalaxy-tools
- [Update cloud repo 2026-02-01](https://github.com/galaxyproject/usegalaxy-tools/pull/1338) by @github-actions[bot]
- [Update all repos 2026-01-30](https://github.com/galaxyproject/usegalaxy-tools/pull/1336) by @github-actions[bot]
- [Install IWC tools for usegalaxy.org 2026-01-30](https://github.com/galaxyproject/usegalaxy-tools/pull/1335) by @github-actions[bot]
- [updating to latest version of egapx](https://github.com/galaxyproject/usegalaxy-tools/pull/1333) by @richard-burhans
- [Install IWC tools for usegalaxy.org 2026-01-29](https://github.com/galaxyproject/usegalaxy-tools/pull/1332) by @github-actions[bot]
- [Update all repos 2026-01-28](https://github.com/galaxyproject/usegalaxy-tools/pull/1330) by @github-actions[bot]
- [Install IWC tools for usegalaxy.org 2026-01-27](https://github.com/galaxyproject/usegalaxy-tools/pull/1329) by @github-actions[bot]
- [add latest version of lexicmap wrapper](https://github.com/galaxyproject/usegalaxy-tools/pull/1328) by @Smeds
- [Update all repos 2026-01-26](https://github.com/galaxyproject/usegalaxy-tools/pull/1327) by @github-actions[bot]
- [Install IWC tools for cloud 2026-01-26](https://github.com/galaxyproject/usegalaxy-tools/pull/1324) by @github-actions[bot]
- [Install pysradb_search](https://github.com/galaxyproject/usegalaxy-tools/pull/1323) by @mvdbeek
- [add chainswap to .org](https://github.com/galaxyproject/usegalaxy-tools/pull/1322) by @martenson

## New Issues

### brc-analytics
- [Remove survey card for now](https://github.com/galaxyproject/brc-analytics/issues/1111) by @NoopDog
- [my analyses ui](https://github.com/galaxyproject/brc-analytics/issues/1110) by @d-callan
- [Add white paper section to homepage](https://github.com/galaxyproject/brc-analytics/issues/1108) by @MillenniumFalconMechanic
- [include how to cite in learn section](https://github.com/galaxyproject/brc-analytics/issues/1107) by @d-callan
- [differential expression e2e](https://github.com/galaxyproject/brc-analytics/issues/1105) by @d-callan
- [support intersection in primary contrasts](https://github.com/galaxyproject/brc-analytics/issues/1102) by @d-callan
- [improve workflow tooling transparency](https://github.com/galaxyproject/brc-analytics/issues/1104) by @d-callan
- [make de stepper play nice w sra browser](https://github.com/galaxyproject/brc-analytics/issues/1103) by @d-callan
- [help users classify columns](https://github.com/galaxyproject/brc-analytics/issues/1101) by @d-callan
- [md5 support in samplesheets](https://github.com/galaxyproject/brc-analytics/issues/1100) by @d-callan
- [Update findable-ui to latest](https://github.com/galaxyproject/brc-analytics/issues/1097) by @frano-m

### galaxy
- [Database Migration Upgrade Error - column "tool_id" of relation "tool_landing_request" already exists](https://github.com/galaxyproject/galaxy/issues/21699) by @sanman-99
- [Plan: Implement hash-based job matching](https://github.com/galaxyproject/galaxy/issues/21676) by @nsoranzo
- [`discover tools`  not useful in workflow editor](https://github.com/galaxyproject/galaxy/issues/21660) by @bernt-matthias
- [Problems with file source form validators](https://github.com/galaxyproject/galaxy/issues/21668) by @bernt-matthias
- [Replace `BTable` with `GTable` or `GCard`](https://github.com/galaxyproject/galaxy/issues/21703) by @itisAliRH
- [Disappearing “prepare_history_download” celery task](https://github.com/galaxyproject/galaxy/issues/21701) by @cat-bro
- [Sharing histories with non-shareable datasets gives 500 error instead of 400](https://github.com/galaxyproject/galaxy/issues/21684) by @davelopez
- [Improve history sharing when some datasets are in private store](https://github.com/galaxyproject/galaxy/issues/21691) by @davelopez
- [Glitch deleting duplicated entries in "share with individual users" component](https://github.com/galaxyproject/galaxy/issues/21682) by @davelopez
- [Tool help section title font sizes could need improvement](https://github.com/galaxyproject/galaxy/issues/21679) by @bernt-matthias
- [Redesign Upload Activity](https://github.com/galaxyproject/galaxy/issues/21670) by @mvdbeek
- [Link to IWC from Galaxy](https://github.com/galaxyproject/galaxy/issues/21671) by @ahmedhamidawan
- [Add config to allow headers in file source requests](https://github.com/galaxyproject/galaxy/issues/21667) by @davelopez
- [(Workflow) problem with `Pick parameter value`](https://github.com/galaxyproject/galaxy/issues/21665) by @bernt-matthias
- [Create New Workflow in Workflow Editor broken](https://github.com/galaxyproject/galaxy/issues/21662) by @ahmedhamidawan
- [Make progress towards History Graph View](https://github.com/galaxyproject/galaxy/issues/21659) by @guerler

### galaxy-hub
- [Inconsistent Hall of Fame URL routing and character sanitization in Preview site](https://github.com/galaxyproject/galaxy-hub/issues/3632) by @dadrasarmin
- [Case-sensitivity in URLs leads to 404 errors](https://github.com/galaxyproject/galaxy-hub/issues/3631) by @dadrasarmin
- [Accessibility discussion](https://github.com/galaxyproject/galaxy-hub/issues/3630) by @jennaj

### galaxy-release-util
- [Utility Assumes Invalid Previous or Next Release Versions?](https://github.com/galaxyproject/galaxy-release-util/issues/45) by @guerler

### galaxy_codex
- [Promoting peer-reviewed content in Labs (SPOC right now)](https://github.com/galaxyproject/galaxy_codex/issues/579) by @GarethPrice-Aus

### iwc
- [Test release 26.0](https://github.com/galaxyproject/iwc/issues/1092) by @guerler

### planemo
- [Planemo improvements](https://github.com/galaxyproject/planemo/issues/1602) by @mvdbeek

### tools-iuc
- [New tool request: datavrzd](https://github.com/galaxyproject/tools-iuc/issues/7639) by @bebatut
- [Medaka tools with version `2.1.1+galaxy0` broken on Galaxy Australia and some other galaxies](https://github.com/galaxyproject/tools-iuc/issues/7631) by @cat-bro
- [lastz with PAF output fails](https://github.com/galaxyproject/tools-iuc/issues/7630) by @scottcain
- [Test release 26.0](https://github.com/galaxyproject/tools-iuc/issues/7629) by @guerler
- [[Poll] Help Us pick the Tool Devs SIG Bimonthly Meeting Time](https://github.com/galaxyproject/tools-iuc/issues/7624) by @SaimMomin12

### usegalaxy-playbook
- [Tool installation request gwtc_analysis (Astronomy)](https://github.com/galaxyproject/usegalaxy-playbook/issues/441) by @danielsentenac
- [Request: install bcftools_plugin_split_vep at ORG and AU (hosted at EU only)](https://github.com/galaxyproject/usegalaxy-playbook/issues/440) by @jennaj

## Closed Issues

### brc-analytics
- [Remove survey card for now](https://github.com/galaxyproject/brc-analytics/issues/1111)
- [Add white paper section to homepage](https://github.com/galaxyproject/brc-analytics/issues/1108)
- [support sample sheets and other data upload in brc stepper](https://github.com/galaxyproject/brc-analytics/issues/1008)
- [Support "End-to-End" Differential Analysis  - Jan 23 demo](https://github.com/galaxyproject/brc-analytics/issues/1004)
- [Send Differential Expression workflow landing request with (valid) test data](https://github.com/galaxyproject/brc-analytics/issues/1058)
- [Define primary constrasts stepper step](https://github.com/galaxyproject/brc-analytics/issues/1071)
- [Update findable-ui to latest](https://github.com/galaxyproject/brc-analytics/issues/1097)

### galaxy
- [Data manager writes to 1st (often wrong) loc file](https://github.com/galaxyproject/galaxy/issues/20151)
- [`discover tools`  not useful in workflow editor](https://github.com/galaxyproject/galaxy/issues/21660)
- [Glitch deleting duplicated entries in "share with individual users" component](https://github.com/galaxyproject/galaxy/issues/21682)
- [Allow providing a name for history when sending workflow results to new history](https://github.com/galaxyproject/galaxy/issues/20590)
- [Upload / choose from repository / search term persistent when selecting subfolder](https://github.com/galaxyproject/galaxy/issues/21611)
- [regression/incomplete anon storage dashboard handling](https://github.com/galaxyproject/galaxy/issues/21641)
- [oidc allows for creation of invalid usernames which breaks sharing](https://github.com/galaxyproject/galaxy/issues/20767)
- [Feature request: history archival without updating user `update_time`](https://github.com/galaxyproject/galaxy/issues/17809)
- [Cleanup `create_user` for custos/oidc](https://github.com/galaxyproject/galaxy/issues/10948)
- [InvalidURL: Invalid non-printable ASCII character in URL, '\t' at position 0.](https://github.com/galaxyproject/galaxy/issues/21263)
- [Add `object_expires_after_days` in the sample object_store_config](https://github.com/galaxyproject/galaxy/issues/21497)
- [Workflow Auto-Layout Occasionally Broke (Fails Selenium Test)](https://github.com/galaxyproject/galaxy/issues/19806)
- [Workflow: "Auto Layout" generating `TypeError: Value is undefined or null` for 1 specific workflow](https://github.com/galaxyproject/galaxy/issues/21601)

### galaxy-hub
- [Inconsistent Hall of Fame URL routing and character sanitization in Preview site](https://github.com/galaxyproject/galaxy-hub/issues/3632)

### tools-iuc
- [Medaka tools with version `2.1.1+galaxy0` broken on Galaxy Australia and some other galaxies](https://github.com/galaxyproject/tools-iuc/issues/7631)

### training-material
- [improve training for community-lab](https://github.com/galaxyproject/training-material/issues/6609)
- [Adding AusBioCommons and UniMelb Funding Organisations to Tutorials](https://github.com/galaxyproject/training-material/issues/6608)

---
*Generated automatically on 2026-02-01 19:40 UTC*