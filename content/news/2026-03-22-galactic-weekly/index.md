---
title: 'Galactic Weekly: Week 12, 2026'
date: '2026-03-22'
tease: Weekly summary of activity across 150+ galaxyproject repositories
tags:
- community
- development
subsites:
- all
---

![Galactic Weekly](https://raw.githubusercontent.com/nekrut/gxy-whats-new/main/assets/header.jpg)

## Summary
- **Repositories with activity:** 19
- **New issues:** 53
- **Issues closed:** 61
- **PRs opened:** 169
- **PRs merged:** 94
- **Contributors:** 51


### Highlights

This week, 51 contributors merged 94 pull requests across 19 repositories. The main Galaxy codebase received workflow editor improvements—including a new "Isolate" focus mode and a step input/output toggle on the invocation graph—along with bug fixes backported to the 25.1 and 26.0 release branches, corrected binary unit prefixes throughout the codebase, and a new Playwright-based test suite for running tool tests through the UI. The gxformat2 library fixed several workflow round-tripping bugs and modernized its build tooling by migrating to `pyproject.toml` and `uv` dependency groups. Across other repositories, tools-iuc updated several tool versions (snpSift, NCBI Datasets, inferCNV, GeoPandas, Pretext), the Galaxy Hub added a "Cite Galaxy" section and new event entries, and the training-material repository updated contributor records and tutorial content.


## Most Active Repositories

| Repository | PRs Opened | PRs Merged | Issues Opened | Issues Closed |
|------------|------------|------------|---------------|---------------|
| [galaxy](https://github.com/galaxyproject/galaxy) | 56 | 27 | 33 | 40 |
| [galaxy-hub](https://github.com/galaxyproject/galaxy-hub) | 18 | 14 | 2 | 0 |
| [gxformat2](https://github.com/galaxyproject/gxformat2) | 13 | 12 | 6 | 7 |
| [tools-iuc](https://github.com/galaxyproject/tools-iuc) | 16 | 9 | 4 | 4 |
| [training-material](https://github.com/galaxyproject/training-material) | 10 | 10 | 0 | 0 |
| [iwc](https://github.com/galaxyproject/iwc) | 22 | 1 | 2 | 0 |
| [brc-analytics](https://github.com/galaxyproject/brc-analytics) | 7 | 7 | 4 | 8 |
| [usegalaxy-tools](https://github.com/galaxyproject/usegalaxy-tools) | 7 | 7 | 1 | 2 |
| [galaxy_codex](https://github.com/galaxyproject/galaxy_codex) | 7 | 0 | 0 | 0 |
| [galaxy-language-server](https://github.com/galaxyproject/galaxy-language-server) | 2 | 2 | 0 | 0 |


## Repository Summaries

### usegalaxy-tools
This week, several new tools were added to the usegalaxy-tools repository, including IDR Download, Omero tools, fastga (in the Assembly section), and an updated kmindex wrapper. Routine updates were applied to cloud and general tool repositories, and IWC tools were installed for the cloud instance. A new issue was opened regarding a configuration problem with snippy 4.6.0, while two older issues requesting increased memory allocation for snippy and snippy_core were closed.

### tools-iuc
This week, the tools-iuc repository merged nine pull requests, mostly consisting of tool version updates: snpSift was updated to 5.4.0c, NCBI Datasets to 18.21.0, inferCNV from 1.22.0 to 1.26.0, GeoPandas from 1.1.2 to 1.1.3, and Pretext was also updated. Additional changes included adding tool-data tables to HapCut2, adding help text for arithmetic expressions in the Column Maker tool, and updating a default parameter for kmindex. Four issues were opened—covering a new output request for chewBBACA, Trimmomatic quality encoding detection, a proposed multi-genome alignment workflow, and a CI file-not-found error—while four issues were closed, including the CI error and fixes related to NCBI Datasets.

### gxformat2
This week, gxformat2 received several bug fixes addressing issues with workflow round-tripping, including fixes for unlabeled tool steps producing dangling numeric source references, step labels containing `/` breaking source reference parsing, and unwanted synthetic labels being assigned to unlabeled input steps. New features were added for bidirectional workflow comment conversion, `pick_value` support in the Format2 schema, and handling of unencoded `tool_state` in native workflows. The project also underwent build and development tooling modernization, migrating from `setup.py` to `pyproject.toml`, adopting `uv` dependency groups for linting/testing/type-checking, and replacing the deprecated `distutils` with the `packaging` library in release scripts.

### brc-analytics
This week, the brc-analytics repository added new workflows for freebayes and braker3 (variant calling and gene annotation), and restricted certain workflows to only appear for assemblies that have a Galaxy data cache available. The "Analyze in Galaxy" flow was simplified, workflow taxonomy filters were reworked to use human-friendly species and lineage selection, and a carousel card was added to solicit user feedback via a survey. The version was bumped to 0.25.0, and several issues were closed related to diploid variant calling workflow registration, assembly updates, and workflows previously stuck in a "Coming Soon" state.

### training-material
This week, the Galaxy Training Material repository updated contributor records by adding Arthur Barreau and Nadine Le Bris and making other contributor file changes. Several tutorials were edited, including tweaks to the Introduction to Galaxy for Research Data Management tutorial, a parameter fix, and unification work on the SFB992 materials. The GTA2026 event page was updated with a registration link and track information, missing data-library.yaml files were added, and persistent URL references were updated twice.

### galaxy-hub
This week, the galaxy-hub repository received updates to the homepage and welcome page to add a "Cite Galaxy" section, along with fixes to the citing-galaxy page. Several event-related changes were made, including a new event entry for a DHXpresso webinar, a GTA25 banner, and additions to the BHEU24 event page. Maintenance work included multiple syncs from the training-material repository, fixes to GTN import slug normalization and casing errors, contributor unification for SFB992/CRC992, removal of a fellowship application, and additions of GTN badges for organisations and affiliation labels. Two new issues were filed regarding broken links on the events page and minor mobile display problems.

### galaxy-language-server
This week's activity consisted of two dependency update pull requests. The client-side `flatted` package was bumped from version 3.2.4 to 3.4.2, and five server-side dependencies were updated as a group. No feature changes or bug fixes were included.

### planemo
A single pull request was merged this week, fixing a bug where the workflow linting feature would crash if a tool's state was stored as a dictionary rather than a JSON string.

### iwc
A dependency update was merged, bumping the h3 package from version 1.15.5 to 1.15.8 in the website directory. Two new issues were opened: one reporting connection validation failures, and another requesting that the IWC logo be added to the global Galaxy Project branding page.

### galaxy
This week, the Galaxy repository received UI and workflow editor improvements, including a new "Isolate" focus mode for the workflow graph, a toggle to view step inputs/outputs on the invocation graph, a copy link button on published workflow pages, and a change stack count indicator on the workflow editor. Several bug fixes were backported to the 25.1 and 26.0 release branches, addressing issues such as race conditions during deletions, paused job queuing, redundant empty collection elements, unhandled exceptions in tool form population, and collection update locking.

On the technical side, binary unit prefixes were corrected from MB/GB to KiB/MiB/GiB throughout the codebase, a batch Celery task was added for history dataset purging, and a new Playwright-based test suite was introduced for running tool tests through the tool form UI. New issues filed this week cover topics including hidden

### gxy.io
A single pull request was merged this week, adding the URL for the GTA2026 (Galaxy Training Academy 2026) registration form to the site.

### galaxy-k8s-boot
A new application for monitoring Galaxy pod usage on Kubernetes was added to the repository. This was the only change merged this week.

### gxadmin
Two pull requests were merged into gxadmin this week. One added a new query that retrieves the `n_live_tup` (estimated number of live rows) from PostgreSQL's `pg_stat_user_tables`. The other added a mutate query that triggers analysis on tables that have not yet been analyzed.

### gxabm
A new issue was opened proposing the addition of a "tools" subcommand to the gxabm repository. No other activity (pull requests, merges, or releases) was reported for the week.


## Merged Pull Requests

### brc-analytics
- [feat: freebayes and braker3 workflows for brc and ga2](https://github.com/galaxyproject/brc-analytics/pull/1205) by @d-callan
- [feat: add carousel card for user feedback survey](https://github.com/galaxyproject/brc-analytics/pull/1204) by @d-callan
- [feat: restrict ASSEMBLY_ID workflows to assemblies with Galaxy data cache](https://github.com/galaxyproject/brc-analytics/pull/1203) by @d-callan
- [feat: simplify analyze in galaxy flow (#1156)](https://github.com/galaxyproject/brc-analytics/pull/1202) by @frano-m
- [chore: bump version to 0.25.0](https://github.com/galaxyproject/brc-analytics/pull/1201) by @github-actions[bot]
- [feat: use prod workflow ID for differential expression on usegalaxy.org](https://github.com/galaxyproject/brc-analytics/pull/1197) by @mvdbeek
- [feat: make workflow taxonomy filters human-friendly (species/lineage selection) (#1191)](https://github.com/galaxyproject/brc-analytics/pull/1195) by @frano-m

### galaxy
- [&#91;26.0&#93; Don't fail on probable delete race](https://github.com/galaxyproject/galaxy/pull/22183) by @mvdbeek
- [&#91;26.0&#93; Add batch celery task for history dataset purging](https://github.com/galaxyproject/galaxy/pull/22180) by @mvdbeek
- [&#91;26.0&#93; gxformat2 fixes](https://github.com/galaxyproject/galaxy/pull/22179) by @jmchilton
- [Prevent tag placeholder text wrapping in narrow columns](https://github.com/galaxyproject/galaxy/pull/22176) by @dannon
- [&#91;25.1&#93; Fix make all histories private controller None id bug](https://github.com/galaxyproject/galaxy/pull/22174) by @ahmedhamidawan
- [Add copy link button to published workflow page](https://github.com/galaxyproject/galaxy/pull/22172) by @dannon
- [More paired_or_unpaired fixes.](https://github.com/galaxyproject/galaxy/pull/22170) by @jmchilton
- [&#91;26.0&#93; Bump tiffviewer visualization to v0.0.4](https://github.com/galaxyproject/galaxy/pull/22168) by @davelopez
- [Install playwright browsers for unit tests](https://github.com/galaxyproject/galaxy/pull/22161) by @nsoranzo
- [Bump pyasn1 from 0.6.2 to 0.6.3 in /lib/galaxy/dependencies](https://github.com/galaxyproject/galaxy/pull/22160) by @dependabot[bot]
- [Add toggle to invocation graph for viewing step inputs/outputs like in the editor](https://github.com/galaxyproject/galaxy/pull/22159) by @ahmedhamidawan
- [Add test suite for running tool tests via Playwright using the tool form](https://github.com/galaxyproject/galaxy/pull/22157) by @jmchilton
- [&#91;25.1&#93; Do not queue paused jobs](https://github.com/galaxyproject/galaxy/pull/22156) by @martenson
- [More precise &#96;&#96;metric_prefix()&#96;&#96; implementation](https://github.com/galaxyproject/galaxy/pull/22155) by @nsoranzo
- [&#91;26.0&#93; Fix redundant empty collection elements](https://github.com/galaxyproject/galaxy/pull/22154) by @mvdbeek
- [Use correct binary unit prefixes (KiB/MiB/GiB)](https://github.com/galaxyproject/galaxy/pull/22153) by @dannon
- [Convert math.inf to None in JSON-serialized tool dicts](https://github.com/galaxyproject/galaxy/pull/22152) by @dannon
- [Prevent card images from overflowing container](https://github.com/galaxyproject/galaxy/pull/22148) by @dannon
- [Add an "Isolate" (focus) mode to workflow graph](https://github.com/galaxyproject/galaxy/pull/22142) by @ahmedhamidawan
- [Show change stack count on workflow editor changes activity](https://github.com/galaxyproject/galaxy/pull/22141) by @ahmedhamidawan
- [&#91;26.0&#93; Do not render hide button on non-optional activities in activity bar](https://github.com/galaxyproject/galaxy/pull/22140) by @ahmedhamidawan
- [Bump slackapi/slack-github-action from 2.1.1 to 3.0.1](https://github.com/galaxyproject/galaxy/pull/22139) by @dependabot[bot]
- [Fix transient failure in test_workflow_with_deleted_dataset_step_parameter](https://github.com/galaxyproject/galaxy/pull/22138) by @jmchilton
- [&#91;26.0&#93; Backport transient CI fixes from #22102 to release_26.0](https://github.com/galaxyproject/galaxy/pull/22135) by @mvdbeek
- [Add API tests proving __current_case__ is redundant at execution time.](https://github.com/galaxyproject/galaxy/pull/22134) by @jmchilton
- [&#91;26.0&#93; Use skip_locked also when updating collection](https://github.com/galaxyproject/galaxy/pull/22133) by @mvdbeek
- [&#91;26.0&#93; Fix unhandled exceptions in tool form model population](https://github.com/galaxyproject/galaxy/pull/22129) by @guerler

### galaxy-hub
- [Sync: Update files from training-material](https://github.com/galaxyproject/galaxy-hub/pull/3868) by @github-actions[bot]
- [fix another casing error](https://github.com/galaxyproject/galaxy-hub/pull/3865) by @bgruening
- [feat: additions to BHEU24](https://github.com/galaxyproject/galaxy-hub/pull/3864) by @mihai-sysbio
- [add GTN badges also for ORGANISATIONS](https://github.com/galaxyproject/galaxy-hub/pull/3863) by @bgruening
- [Fix GTN import: normalize slug to match renamed content dirs](https://github.com/galaxyproject/galaxy-hub/pull/3861) by @arash77
- [Adding two heroes at the top](https://github.com/galaxyproject/galaxy-hub/pull/3859) by @scottcain
- [Scottcain add gta25 banner](https://github.com/galaxyproject/galaxy-hub/pull/3858) by @scottcain
- [Sync: Update files from training-material](https://github.com/galaxyproject/galaxy-hub/pull/3856) by @github-actions[bot]
- [Add Cite Galaxy to homepage, welcome page, and fix citing-galaxy page](https://github.com/galaxyproject/galaxy-hub/pull/3855) by @dannon
- [Add labels for current affiliations and former affiliations](https://github.com/galaxyproject/galaxy-hub/pull/3853) by @pavanvidem
- [Create event entry for DHXpresso webinar](https://github.com/galaxyproject/galaxy-hub/pull/3852) by @Sch-Da
- [Sync: Update files from training-material](https://github.com/galaxyproject/galaxy-hub/pull/3851) by @github-actions[bot]
- [Rm fellowship application](https://github.com/galaxyproject/galaxy-hub/pull/3850) by @Marie59
- [Unify sfb992 and crc992 contributors](https://github.com/galaxyproject/galaxy-hub/pull/3849) by @pavanvidem

### galaxy-k8s-boot
- [Add Galaxy pod usage monitoring app](https://github.com/galaxyproject/galaxy-k8s-boot/pull/58) by @afgane

### galaxy-language-server
- [Bump flatted from 3.2.4 to 3.4.2 in /client](https://github.com/galaxyproject/galaxy-language-server/pull/311) by @dependabot[bot]
- [Bump the server-dependencies group in /server with 5 updates](https://github.com/galaxyproject/galaxy-language-server/pull/310) by @dependabot[bot]

### gxadmin
- [Add a query for &#96;n_live_tup&#96; from pg_stat_user_tables](https://github.com/galaxyproject/gxadmin/pull/177) by @natefoo
- [Add mutate query to analyze unanalyzed tables](https://github.com/galaxyproject/gxadmin/pull/176) by @natefoo

### gxformat2
- [More dev process updates - including history generation stuff, better uv usage, etc...](https://github.com/galaxyproject/gxformat2/pull/152) by @jmchilton
- [Add uv dependency groups for lint, mypy, test; update dev docs](https://github.com/galaxyproject/gxformat2/pull/150) by @jmchilton
- [Fix unlabeled tool steps getting dangling numeric source refs after roundtrip](https://github.com/galaxyproject/gxformat2/pull/149) by @jmchilton
- [Fix &#96;/&#96; in step labels breaking source reference parsing](https://github.com/galaxyproject/gxformat2/pull/148) by @jmchilton
- [Add pick_value and comments to Format2 schema](https://github.com/galaxyproject/gxformat2/pull/147) by @jmchilton
- [Use _unlabeled_input_ sentinel to preserve label=None on round-trip](https://github.com/galaxyproject/gxformat2/pull/144) by @jmchilton
- [Migrate from &#96;&#96;setup.py&#96;&#96; to &#96;&#96;pyproject.toml&#96;&#96;](https://github.com/galaxyproject/gxformat2/pull/142) by @nsoranzo
- [Replace removed distutils with packaging in release scripts.](https://github.com/galaxyproject/gxformat2/pull/140) by @jmchilton
- [Update history for new release - allow uv to setup-venv.](https://github.com/galaxyproject/gxformat2/pull/139) by @jmchilton
- [Support unencoded tool_state in native workflows.](https://github.com/galaxyproject/gxformat2/pull/138) by @jmchilton
- [Implement bidirectional workflow comment conversion.](https://github.com/galaxyproject/gxformat2/pull/137) by @jmchilton
- [PIck Value Module](https://github.com/galaxyproject/gxformat2/pull/136) by @jmchilton

### gxy.io
- [Add URL for the GTA2026 registration form.](https://github.com/galaxyproject/gxy.io/pull/120) by @natalie-wa

### iwc
- [Bump h3 from 1.15.5 to 1.15.8 in /website](https://github.com/galaxyproject/iwc/pull/1160) by @dependabot[bot]

### planemo
- [Fix workflow lint crash when tool_state is dict instead of JSON string](https://github.com/galaxyproject/planemo/pull/1626) by @jmchilton

### tools-iuc
- [add tool-data tables to hapcut2](https://github.com/galaxyproject/tools-iuc/pull/7809) by @bgruening
- [Column Maker tool: Add help text for basic arithmetic expressions](https://github.com/galaxyproject/tools-iuc/pull/7803) by @shiltemann
- [Update snpSift tool collection to 5.4.0c](https://github.com/galaxyproject/tools-iuc/pull/7800) by @joachimwolff
- [update default zvalue for kmindex](https://github.com/galaxyproject/tools-iuc/pull/7798) by @Smeds
- [Bump tools/ncbi datasets to 18.21.0 covering bug fixes](https://github.com/galaxyproject/tools-iuc/pull/7797) by @SaimMomin12
- [Increase version number to 5.4.0c](https://github.com/galaxyproject/tools-iuc/pull/7795) by @joachimwolff
- [Update Pretext tool](https://github.com/galaxyproject/tools-iuc/pull/7793) by @SaimMomin12
- [Updating tools/infercnv from version 1.22.0 to 1.26.0](https://github.com/galaxyproject/tools-iuc/pull/7791) by @gxydevbot
- [Updating tools/geopandas from version 1.1.2 to 1.1.3](https://github.com/galaxyproject/tools-iuc/pull/7790) by @gxydevbot

### training-material
- [Update CONTRIBUTORS.yaml add Arthur Barreau & Nadine Le Bris](https://github.com/galaxyproject/training-material/pull/6738) by @yvanlebras
- [&#91;Intro Galaxy RDM&#93; Tweak tutorial](https://github.com/galaxyproject/training-material/pull/6737) by @shiltemann
- [Add missing data-library.yaml files](https://github.com/galaxyproject/training-material/pull/6736) by @github-actions[bot]
- [Update Persistent uniform resource locators](https://github.com/galaxyproject/training-material/pull/6735) by @github-actions[bot]
- [Update the  GTA2026 event with registration link and tracks](https://github.com/galaxyproject/training-material/pull/6734) by @Delphine-L
- [Update CONTRIBUTORS.yaml](https://github.com/galaxyproject/training-material/pull/6733) by @pavanvidem
- [fix param](https://github.com/galaxyproject/training-material/pull/6732) by @paulzierep
- [Sfb992 unification](https://github.com/galaxyproject/training-material/pull/6731) by @pavanvidem
- [Update Cached Commit Data](https://github.com/galaxyproject/training-material/pull/6730) by @github-actions[bot]
- [Update Persistent uniform resource locators](https://github.com/galaxyproject/training-material/pull/6729) by @github-actions[bot]

### usegalaxy-tools
- [Update cloud repo 2026-03-22](https://github.com/galaxyproject/usegalaxy-tools/pull/1421) by @github-actions[bot]
- [Update all repos 2026-03-21](https://github.com/galaxyproject/usegalaxy-tools/pull/1420) by @github-actions[bot]
- [Add IDR Download tool](https://github.com/galaxyproject/usegalaxy-tools/pull/1419) by @afgane
- [Add Omero tools](https://github.com/galaxyproject/usegalaxy-tools/pull/1418) by @afgane
- [Add fastga to Assembly section](https://github.com/galaxyproject/usegalaxy-tools/pull/1417) by @nekrut
- [add latest version of kmindex wrapper](https://github.com/galaxyproject/usegalaxy-tools/pull/1416) by @Smeds
- [Install IWC tools for cloud 2026-03-16](https://github.com/galaxyproject/usegalaxy-tools/pull/1414) by @github-actions[bot]

## New Issues

### brc-analytics
- [Hide Galaxy-index-dependent workflows when an assembly lacks a Galaxy datacache URL](https://github.com/galaxyproject/brc-analytics/issues/1199) by @d-callan
- [Epic: Support Organism-Scoped Workflows with Collection Inputs](https://github.com/galaxyproject/brc-analytics/issues/1200) by @d-callan
- [fix: console errors in SampleSheetStep component](https://github.com/galaxyproject/brc-analytics/issues/1198) by @frano-m
- [Tooltips for resources](https://github.com/galaxyproject/brc-analytics/issues/1196) by @dannon

### galaxy
- [TS2.0: Implement a repodata.json like API](https://github.com/galaxyproject/galaxy/issues/22213) by @bgruening
- [Granian + free-threaded python](https://github.com/galaxyproject/galaxy/issues/22209) by @mvdbeek
- [Hidden tool versions are not hidden in the tool form](https://github.com/galaxyproject/galaxy/issues/22214) by @bgruening
- [&#91;26.0&#93; File source templates: optional integers are initialized as 0 in UI](https://github.com/galaxyproject/galaxy/issues/22211) by @bernt-matthias
- [Workflow Semantics Documentation + Test Mapping](https://github.com/galaxyproject/galaxy/issues/22200) by @jmchilton
- [&#91;26.0&#93; File source templates can not be removed](https://github.com/galaxyproject/galaxy/issues/22208) by @bernt-matthias
- [26.0 redis has a requirements and conditional requirement with different versions](https://github.com/galaxyproject/galaxy/issues/22201) by @bernt-matthias
- [replace &#96;__file__&#96; usage with &#96;galaxy.util.resources&#96;](https://github.com/galaxyproject/galaxy/issues/22205) by @mr-c
- [Exception caught while attempting to execute tool with id '__SPLIT_PAIRED_AND_UNPAIRED__':](https://github.com/galaxyproject/galaxy/issues/22204) by @galaxyproject-sentryintegration[bot]
- [omero filesource: make temp file configurable?](https://github.com/galaxyproject/galaxy/issues/22203) by @bernt-matthias
- [Handling of optional text parameters &#96;""&#96; vs &#96;null&#96;](https://github.com/galaxyproject/galaxy/issues/22195) by @bernt-matthias
- [Toolshed repo not found](https://github.com/galaxyproject/galaxy/issues/22178) by @bernt-matthias
- [Conditional step on pick value output fails](https://github.com/galaxyproject/galaxy/issues/22194) by @galaxyproject-sentryintegration[bot]
- [Pulsar staging did not detect 502 ?](https://github.com/galaxyproject/galaxy/issues/22192) by @galaxyproject-sentryintegration[bot]
- [Disabling required inputs in a workflow doesn't raise a flag in the Good Practice tool](https://github.com/galaxyproject/galaxy/issues/22191) by @Delphine-L
- [Input type indicator for data inputs](https://github.com/galaxyproject/galaxy/issues/22190) by @mvdbeek
- [TypeError: int() argument must be a string, a bytes-like object or a real number, not 'NoneType'](https://github.com/galaxyproject/galaxy/issues/22186) by @galaxyproject-sentryintegration[bot]
- [Add support for Hashicorp Vault token renewal](https://github.com/galaxyproject/galaxy/issues/22187) by @natefoo
- [TypeError: lstat: path should be string, bytes or os.PathLike, not NoneType](https://github.com/galaxyproject/galaxy/issues/22185) by @galaxyproject-sentryintegration[bot]
- [BadRequestError: Error code: 400 - {'error': {'message': 'Invalid schema for function \'choose_process\': schema must be a JSON Schema of \'type: "object"\', got \'type: "None"\'.', 'type': 'invalid_request_error', 'param': 'tools&#91;0&#93;.function.parameters', 'code': 'inval...](https://github.com/galaxyproject/galaxy/issues/22184) by @galaxyproject-sentryintegration[bot]
- [ObjectNotFound: No such object found.](https://github.com/galaxyproject/galaxy/issues/22182) by @galaxyproject-sentryintegration[bot]
- [User Preferences "Make All Data Private" option always fails with a 400](https://github.com/galaxyproject/galaxy/issues/22173) by @ahmedhamidawan
- [On the effectiveness and scalability of &#96;celery_user_rate_limit&#96;](https://github.com/galaxyproject/galaxy/issues/22177) by @kysrpex
- [batch celery tasks during history deletion](https://github.com/galaxyproject/galaxy/issues/22171) by @bgruening
- [Data unit discrepancy (MB vs. MiB)](https://github.com/galaxyproject/galaxy/issues/22137) by @B0r1sD
- [Cannot draw connections between workflow steps in Safari](https://github.com/galaxyproject/galaxy/issues/22175) by @kostrykin
- [InternalError: (psycopg2.errors.InFailedSqlTransaction) current transaction is aborted, commands ignored until end of transaction block](https://github.com/galaxyproject/galaxy/issues/22166) by @galaxyproject-sentryintegration[bot]
- [The &#96;Click to hide output&#96; icon of workflow steps does not work](https://github.com/galaxyproject/galaxy/issues/22163) by @kostrykin
- [Tags are only assigned on the collection, not collection elements](https://github.com/galaxyproject/galaxy/issues/22162) by @nilchia
- [Enable credential support by default](https://github.com/galaxyproject/galaxy/issues/22146) by @mvdbeek
- [AttributeError: 'str' object has no attribute 'get'](https://github.com/galaxyproject/galaxy/issues/22132) by @galaxyproject-sentryintegration[bot]
- [TypeError: Group.to_dict() got an unexpected keyword argument 'other_values'](https://github.com/galaxyproject/galaxy/issues/22131) by @galaxyproject-sentryintegration[bot]
- [Collection element: sqlalchemy.exc.DataError: (psycopg2.errors.StringDataRightTruncation) value too long for type character varying(255)](https://github.com/galaxyproject/galaxy/issues/22147) by @bernt-matthias

### galaxy-hub
- [Links on events page are wrong](https://github.com/galaxyproject/galaxy-hub/issues/3862) by @kostrykin
- [Minor mobile ugliness](https://github.com/galaxyproject/galaxy-hub/issues/3860) by @scottcain

### gxabm
- [Add a tools subcommand](https://github.com/galaxyproject/gxabm/issues/325) by @ksuderman

### gxformat2
- [Native schema: &#96;steps&#96;, &#96;input_connections&#96;, &#96;post_job_actions&#96;, and &#96;creator&#96; cannot be fully typed](https://github.com/galaxyproject/gxformat2/issues/151) by @jmchilton
- [Unlabeled tool steps get dangling numeric source references after roundtrip](https://github.com/galaxyproject/gxformat2/issues/146) by @jmchilton
- [Step labels containing '/' break source reference parsing on reimport](https://github.com/galaxyproject/gxformat2/issues/145) by @jmchilton
- [Support Workflow Comments in gxformat2](https://github.com/galaxyproject/gxformat2/issues/135) by @jmchilton
- [Round-trip assigns synthetic labels to unlabeled input steps](https://github.com/galaxyproject/gxformat2/issues/143) by @jmchilton
- [Modernize build: replace setup.py with pyproject.toml and python-m-build](https://github.com/galaxyproject/gxformat2/issues/141) by @jmchilton

### iwc
- [Connection Validation Failures](https://github.com/galaxyproject/iwc/issues/1163) by @jmchilton
- [Put the IWC logo in the global galaxyproject branding page](https://github.com/galaxyproject/iwc/issues/1154) by @lldelisle

### tools-iuc
- [Add output of chewbbaca_allelecallevaluator](https://github.com/galaxyproject/tools-iuc/issues/7806) by @matiasW-imbim
- [Trimmomatic: detection of quality encoding](https://github.com/galaxyproject/tools-iuc/issues/7807) by @wm75
- [New Workflow: Multiple Genome Alignment Pipeline Using Mash, FastGA/KegAlign, and Multiz](https://github.com/galaxyproject/tools-iuc/issues/7805) by @as042
- [CI throws FileNotFoundError: &#91;Errno 2&#93; No such file or directory: '/home/runner/.planemo/gx_venv_3.11_release_26.0/bin/galaxyctl'](https://github.com/galaxyproject/tools-iuc/issues/7794) by @SaimMomin12

### usegalaxy-tools
- [Configuration issue snippy 4.6.0+galaxy0 && 4.5.0](https://github.com/galaxyproject/usegalaxy-tools/issues/1415) by @jennaj

## Closed Issues

### brc-analytics
- [Build diploid variant calling workflow](https://github.com/galaxyproject/brc-analytics/issues/315)
- [Register DIPLOID variant calling workflow with BRC Analytics](https://github.com/galaxyproject/brc-analytics/issues/304)
- [update eukaryote assemblies](https://github.com/galaxyproject/brc-analytics/issues/649)
- [Make workflow taxonomy filters human-friendly (species/lineage selection)](https://github.com/galaxyproject/brc-analytics/issues/1191)
- [Hide Galaxy-index-dependent workflows when an assembly lacks a Galaxy datacache URL](https://github.com/galaxyproject/brc-analytics/issues/1199)
- [Simplify Analyze in Galaxy flow](https://github.com/galaxyproject/brc-analytics/issues/1156)
- [Add strandedness support to DE workflow form](https://github.com/galaxyproject/brc-analytics/issues/1127)
- [Investigate BRC workflows stuck in “Coming Soon” state on Workflows page](https://github.com/galaxyproject/brc-analytics/issues/1190)

### galaxy
- [Long History names push History items off bottom of History panel](https://github.com/galaxyproject/galaxy/issues/20572)
- [User Preferences "Make All Data Private" option always fails with a 400](https://github.com/galaxyproject/galaxy/issues/22173)
- [TIFF viewer shows images 4x the size, padded with zeros](https://github.com/galaxyproject/galaxy/issues/22073)
- [Agent Enable/Disable Configuration Not Hooked Up?](https://github.com/galaxyproject/galaxy/issues/21996)
- [Data unit discrepancy (MB vs. MiB)](https://github.com/galaxyproject/galaxy/issues/22137)
- [Add copy link option in dropdown next to download workflow link](https://github.com/galaxyproject/galaxy/issues/22066)
- [Highlight steps related upstream and downstream to a step in the invocation view](https://github.com/galaxyproject/galaxy/issues/21990)
- [Show change stack count on workflow editor Changes activity](https://github.com/galaxyproject/galaxy/issues/21123)
- [Name tags double is you copy by dragging](https://github.com/galaxyproject/galaxy/issues/21001)
- [ValueError: Out of range float values are not JSON compliant: inf](https://github.com/galaxyproject/galaxy/issues/22054)
- [Tiff viewer zooms to center of screen, not center of image](https://github.com/galaxyproject/galaxy/issues/22068)
- [Request for a placeholder for galaxy servers](https://github.com/galaxyproject/galaxy/issues/20538)
- [Select all (data library) no longer restricts to current page](https://github.com/galaxyproject/galaxy/issues/13917)
- [ValidationError: 1 validation error for ShowFullJobResponse](https://github.com/galaxyproject/galaxy/issues/22055)
- [AttributeError: 'MetaData' object has no attribute 'get_if_set'](https://github.com/galaxyproject/galaxy/issues/22124)
- [TypeError: Group.to_dict() got an unexpected keyword argument 'other_values'](https://github.com/galaxyproject/galaxy/issues/22131)
- [&#91;Release Testing&#93; Add embed-compatible view for galaxy pages](https://github.com/galaxyproject/galaxy/issues/21074)
- [Download card images can bleed out of container](https://github.com/galaxyproject/galaxy/issues/22067)
- [History "hastag" improvements/issues](https://github.com/galaxyproject/galaxy/issues/3730)
- [New History Issue Tracking](https://github.com/galaxyproject/galaxy/issues/13467)
- [Menu Upgrades](https://github.com/galaxyproject/galaxy/issues/5927)
- [&#91;20.09&#93; Tool connection bands do not align to output](https://github.com/galaxyproject/galaxy/issues/10865)
- [History view improvements](https://github.com/galaxyproject/galaxy/issues/5472)
- [Disable email notifications for anonymous users](https://github.com/galaxyproject/galaxy/issues/17014)
- [Component property mutation](https://github.com/galaxyproject/galaxy/issues/11636)
- [History /structure view is broken](https://github.com/galaxyproject/galaxy/issues/4919)
- [&#91;legacy client&#93; libraries cleanup](https://github.com/galaxyproject/galaxy/issues/12672)
- [Rename output file on workflow](https://github.com/galaxyproject/galaxy/issues/1686)
- [Workflow editor post job action to add "tags" only allows ONE tag](https://github.com/galaxyproject/galaxy/issues/3442)
- [prevent the need of Galaxy restart in multi node/threaded environment on allowlist change](https://github.com/galaxyproject/galaxy/issues/5612)
- [Visualizations/Charts: Boxplot fails to render](https://github.com/galaxyproject/galaxy/issues/16191)
- [Visualizations / Graphing: Problems with jqplot_box](https://github.com/galaxyproject/galaxy/issues/12279)
- [Moving client build from a git repo + hash to something more stable](https://github.com/galaxyproject/galaxy/issues/6944)
- [Unable to compile client due to incompatible g++ version when updating to 21.09](https://github.com/galaxyproject/galaxy/issues/12766)
- [myExperiment import](https://github.com/galaxyproject/galaxy/issues/5415)
- [Modernize Datasets Grid](https://github.com/galaxyproject/galaxy/issues/21088)
- [advanced tool search broken for vgp.usegalaxy.org](https://github.com/galaxyproject/galaxy/issues/17207)
- [History: no longer possible to filter by database?](https://github.com/galaxyproject/galaxy/issues/15470)
- [History deletion wording inconsistency](https://github.com/galaxyproject/galaxy/issues/18566)
- [ProgrammingError: (psycopg2.errors.CardinalityViolation) more than one row returned by a subquery used as an expression](https://github.com/galaxyproject/galaxy/issues/22122)

### gxformat2
- [Unlabeled tool steps get dangling numeric source references after roundtrip](https://github.com/galaxyproject/gxformat2/issues/146)
- [Deprecation warning due to invalid escape sequences in Python 3.7](https://github.com/galaxyproject/gxformat2/issues/30)
- [Step labels containing '/' break source reference parsing on reimport](https://github.com/galaxyproject/gxformat2/issues/145)
- [Validation and Linting](https://github.com/galaxyproject/gxformat2/issues/14)
- [Support Workflow Comments in gxformat2](https://github.com/galaxyproject/gxformat2/issues/135)
- [Round-trip assigns synthetic labels to unlabeled input steps](https://github.com/galaxyproject/gxformat2/issues/143)
- [Modernize build: replace setup.py with pyproject.toml and python-m-build](https://github.com/galaxyproject/gxformat2/issues/141)

### tools-iuc
- [Wrap Paffy tools](https://github.com/galaxyproject/tools-iuc/issues/7693)
- [NCBI Datasets Gene Query fails with multople accessions and produces dataformat parse errors datasets_download_gene/18.14.0+galaxy0](https://github.com/galaxyproject/tools-iuc/issues/7771)
- [Add &#96;--force&#96; flag to ncbi dataset &#96;dataformat&#96; command](https://github.com/galaxyproject/tools-iuc/issues/7203)
- [CI throws FileNotFoundError: &#91;Errno 2&#93; No such file or directory: '/home/runner/.planemo/gx_venv_3.11_release_26.0/bin/galaxyctl'](https://github.com/galaxyproject/tools-iuc/issues/7794)

### usegalaxy-tools
- [Request: Increase memory allocation for snippy 4.6.0+galaxy0](https://github.com/galaxyproject/usegalaxy-tools/issues/850)
- [Consider more working memory for snippy_core 4.6.0+galaxy0](https://github.com/galaxyproject/usegalaxy-tools/issues/716)

---
*Generated automatically on 2026-03-22 14:14 UTC*
