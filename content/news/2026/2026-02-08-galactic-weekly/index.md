---
title: 'Galactic Weekly: Week 6, 2026'
date: '2026-02-08'
tease: Weekly summary of activity across 150+ galaxyproject repositories
tags:
- community
- development
subsites:
- all
---

![Galactic Weekly](https://raw.githubusercontent.com/nekrut/gxy-whats-new/main/assets/header.jpg)

## Summary
- **Repositories with activity:** 21
- **New issues:** 60
- **Issues closed:** 66
- **PRs opened:** 149
- **PRs merged:** 84
- **Contributors:** 58


### Highlights

This week, 58 contributors across 21 Galaxy Project repositories merged 84 pull requests and closed 66 issues. The main focus was migrating user interface components from Bootstrap tables to custom GTable components throughout the Galaxy platform, while fixing multiple bugs in versions 26.0 and 25.1 related to file uploads, workflows, and database operations. The tools repository added new bioinformatics tools including vConTACT2 and Liftoff, updated several existing tools, and resolved various configuration issues. Infrastructure improvements included centralizing API configurations, updating training materials with new contributors and funding information, and transitioning documentation systems from Font Awesome icons to inline SVGs.


## Most Active Repositories

| Repository | PRs Opened | PRs Merged | Issues Opened | Issues Closed |
|------------|------------|------------|---------------|---------------|
| [galaxy](https://github.com/galaxyproject/galaxy) | 52 | 31 | 28 | 18 |
| [tools-iuc](https://github.com/galaxyproject/tools-iuc) | 18 | 14 | 3 | 4 |
| [galaxy-hub](https://github.com/galaxyproject/galaxy-hub) | 16 | 11 | 5 | 3 |
| [brc-analytics](https://github.com/galaxyproject/brc-analytics) | 5 | 3 | 14 | 37 |
| [training-material](https://github.com/galaxyproject/training-material) | 11 | 8 | 0 | 0 |
| [galaxy_codex](https://github.com/galaxyproject/galaxy_codex) | 9 | 6 | 4 | 0 |
| [usegalaxy-tools](https://github.com/galaxyproject/usegalaxy-tools) | 14 | 2 | 0 | 0 |
| [planemo](https://github.com/galaxyproject/planemo) | 6 | 5 | 0 | 0 |
| [iwc](https://github.com/galaxyproject/iwc) | 4 | 1 | 2 | 2 |
| [ansible-slurm](https://github.com/galaxyproject/ansible-slurm) | 5 | 0 | 0 | 0 |


## Repository Summaries

### training-material
The Galaxy Project training material repository received updates to contributor information, including additions to funding acknowledgments for nfdi4boimage and de.NBI, biographical updates for contributors, and the addition of Johannes Nussbaum to the contributors list. The repository also updated single-cell analysis editors and associated publications, corrected WorkflowHub identifiers, and refreshed cached commit data and persistent resource locators.

### galaxy-hub
The Galaxy Hub repository received updates to its event listings with a new EMBL-EBI training course and added links to microgalaxy codex tools for the Microbiology SIG. Development work focused on migrating from Font Awesome icons to inline Lucide SVGs, fixing display issues with authors and hyperlinks, and resolving broken kramdown attributes across multiple pages. Several dependency updates were merged, and three display-related issues were resolved while five new issues were opened, primarily concerning quality assurance for a production cutover and GitHub ID mapping problems.

### galaxy
This week, the Galaxy Project focused heavily on migrating user interface components from Bootstrap tables (BTable) to their custom GTable component across multiple areas including the Toolshed, organization/person viewers, dataset indexes, and export dialogs. The team also fixed several bugs in version 26.0, including issues with file upload interfaces, database column type mismatches, and properly hiding ChatGXY and interactive tools features when not configured. Additionally, they resolved problems in the 25.1 release related to workflow input propagation, collection job state preservation during history export/import, and database migration errors.

### planemo
The planemo repository made several infrastructure and bug fixes this week. The team moved the deployment process to a separate workflow for trusted publishing and fixed issues with the release process and commit versioning script. They also improved error handling for network timeout exceptions and updated the default configuration for the mulled resolution cache directory in planemo workspaces.

### brc-analytics
The Galaxy Project's "brc-analytics" repository focused on backend infrastructure fixes this week, with merged pull requests centralizing API URL configuration, fixing hardcoded localhost references, and moving FastAPI documentation URLs under a consistent /api/v1/ prefix. The team closed 33 issues covering a wide range of functionality including backend routing fixes, database migration to Postgres, workflow configuration improvements, organism data handling, and homepage updates to focus on white papers. New issues opened include plans for user growth documentation for NCBI contacts, Grafana workflow metrics visualization, user feedback surveys, and setting Q1 2026 priorities.

### tools-iuc
This week, the Galaxy Project's tools-iuc repository received 14 merged pull requests that included bug fixes for several tools (haltools, trimmomatic, abyss, and pirate), version updates for five tools (Constava to v1.2.0, varvamp to v1.3, metamdbg to v1.3, and dos2unix to v7.5.4), and the addition of two new tools (vConTACT2 for taxonomic analysis of metagenomic data and Liftoff). The repository also saw four new issues opened regarding tool configuration problems and feature requests, while four existing issues were resolved and closed.

### gxy.io
This week, the Galaxy Project's "gxy.io" repository had one merged pull request that added a new trainer resource for GTA2026. The change appears to be related to training materials or documentation for an upcoming event or program scheduled for 2026.

### usegalaxy-tools
This week, the Galaxy Project's usegalaxy-tools repository received two updates. The team added new annotation tools specifically for BRC (Biological Resource Centers) and performed a routine update across all repositories on February 5th, 2026.

### galaxy-skills
This week, the Galaxy Project's "galaxy-skills" repository had one merged pull request that fixed the invert semantics for the add_filter_regex function. The change corrected how the function handles inverted regex filtering logic.

### iwc
The Galaxy Project's "iwc" repository made changes to direct users to alternative workflow sources, with a pull request merged to implement this redirection. Two new issues were opened requesting templates for repository setup and further guidance on workflow sources, while two existing issues were resolved - one related to the workflow redirection and another concerning infrastructure enhancements for the IWC site.

### galaxy_codex
The Galaxy Codex repository completed the biodiversity-genomics lab by merging its final two tables and created a YAML configuration file containing all tools for local Galaxy installations. The team also added functionality to retrieve output formats for each tool suite and implemented code to limit weekly updates to only changes in the communities folder. Several issues were reported regarding broken tool links in labs, training link behavior, and SQL query accuracy for tool usage statistics.

### tpv-shared-database
This week, the Galaxy Project's tpv-shared-database repository had one merged pull request that added an environment variable `OPENBLAS_NUM_THREADS: 1` to the metawrapmg_binning tool. This change limits the number of threads used by the OpenBLAS library to 1 for this specific bioinformatics tool.

### galaxy-k8s-boot
This week, one new issue was reported for the Galaxy Project's "galaxy-k8s-boot" repository regarding hard-coded single_user and admin_users configurations in the playbook. The issue identifies a need to make these user settings configurable rather than having them fixed in the code.

### ansible-galaxy
This week, the Galaxy Project's ansible-galaxy repository had one issue closed related to comments being improperly included in optional requirement strings. The fix addressed a parsing problem where comment text was not being properly filtered out during requirement string processing.

### galaxy-language-server
This week, one new issue was opened for the Galaxy Language Server repository requesting automation of dependency updates when the galaxy-tool-util package receives updates. No other development activity or code changes were recorded during this period.

### idc
This week, the Galaxy Project "idc" repository received one new issue requesting updates to Kraken2 and Bracken indexes for July 2025 and October 2025. No other development activity occurred during this period.

### ansible-postgresql-objects
This week, the Galaxy Project's "ansible-postgresql-objects" repository had one issue reported and resolved regarding a Pycopg2 connection error where the database role "bvalot3" did not exist. The issue was opened and closed within the same week, indicating a quick resolution to the PostgreSQL role connectivity problem.


## Merged Pull Requests

### brc-analytics
- [fix: centralize backend API URL config and fix hardcoded localhost](https://github.com/galaxyproject/brc-analytics/pull/1138) by @dannon
- [fix: use same-origin backend URLs for CloudFront proxy](https://github.com/galaxyproject/brc-analytics/pull/1136) by @dannon
- [fix: move FastAPI docs/openapi URLs under /api/v1/ prefix](https://github.com/galaxyproject/brc-analytics/pull/1135) by @dannon

### galaxy
- [[26.0] Fix bad merge](https://github.com/galaxyproject/galaxy/pull/21790) by @nsoranzo
- [Update Python dependencies](https://github.com/galaxyproject/galaxy/pull/21787) by @galaxybot
- [[26.0] Fix upload local file drop zone when listing](https://github.com/galaxyproject/galaxy/pull/21776) by @davelopez
- [[26.0] Removes unnecessary overflow restriction in upload method panel](https://github.com/galaxyproject/galaxy/pull/21774) by @davelopez
- [[26.0] Deserialize json string for export_metadata from old records](https://github.com/galaxyproject/galaxy/pull/21772) by @mvdbeek
- [Migrate Toolshed Components from Bootstrap Components to GComponents and add Local Filter to GTable](https://github.com/galaxyproject/galaxy/pull/21766) by @itisAliRH
- [[26.0] Fix on_complete column type mismatch](https://github.com/galaxyproject/galaxy/pull/21765) by @mvdbeek
- [Migrate OrganizationViewer and PersonViewer from BTable to GTable ](https://github.com/galaxyproject/galaxy/pull/21761) by @itisAliRH
- [[26.0] Hide ChatGXY activity when LLM API isn't configured](https://github.com/galaxyproject/galaxy/pull/21756) by @dannon
- [[26.0] Hide interactivetools activity when disabled in config](https://github.com/galaxyproject/galaxy/pull/21755) by @dannon
- [[26.0] Send a Slack notification if the Docker image build or smoke test fails](https://github.com/galaxyproject/galaxy/pull/21751) by @ksuderman
- [[26.0] Revert startup probe timeout](https://github.com/galaxyproject/galaxy/pull/21748) by @ksuderman
- [[25.1] Fix npm trusted publishing in 25.1 release workflow](https://github.com/galaxyproject/galaxy/pull/21747) by @dannon
- [Fix delete dataset storage overview](https://github.com/galaxyproject/galaxy/pull/21746) by @davelopez
- [Fix Chinese localization formatting in locale.js](https://github.com/galaxyproject/galaxy/pull/21745) by @itisAliRH
- [Fix scratchbook window z-index stacking and improve styling](https://github.com/galaxyproject/galaxy/pull/21738) by @dannon
- [[25.1] Fix database migration error from 25.0 > 25.1](https://github.com/galaxyproject/galaxy/pull/21737) by @jdavcs
- [Update galaxy.xsd](https://github.com/galaxyproject/galaxy/pull/21731) by @gdefazio
- [Migrate CleanupResultDialog from BTable to GTable](https://github.com/galaxyproject/galaxy/pull/21729) by @itisAliRH
- [Migrate DatasetIndex from BTable to GTable and Add Local Sorting to GTable](https://github.com/galaxyproject/galaxy/pull/21728) by @itisAliRH
- [Migrate ExportRecordTable from BTable to GTable](https://github.com/galaxyproject/galaxy/pull/21727) by @itisAliRH
- [Use uv instead of pip cache in playwright CI workflow](https://github.com/galaxyproject/galaxy/pull/21725) by @nsoranzo
- [Update client-api dependencies and expand usage examples](https://github.com/galaxyproject/galaxy/pull/21724) by @dannon
- [[26.0] Fix `test_value_restriction_with_select_from_multiple_subworkflow_inputs` formatting](https://github.com/galaxyproject/galaxy/pull/21723) by @mvdbeek
- [[25.1] Exclude node_modules at all depths in Docker builds](https://github.com/galaxyproject/galaxy/pull/21721) by @mvdbeek
- [[25.1] Strip inline comments in conditional requirements](https://github.com/galaxyproject/galaxy/pull/21720) by @mvdbeek
- [[25.0] Add missing filter_failed_collection_1.1.0.xml tool](https://github.com/galaxyproject/galaxy/pull/21719) by @mvdbeek
- [Skip test_abort_fetch_job if httpstat.us is down](https://github.com/galaxyproject/galaxy/pull/21718) by @jmchilton
- [[25.1] Fix collection job state not preserved during history export/import](https://github.com/galaxyproject/galaxy/pull/21716) by @mvdbeek
- [[25.0] Fix option propagation for workflow inputs connected to multiple subworkflows](https://github.com/galaxyproject/galaxy/pull/21712) by @mvdbeek
- [[25.1] Fix route to workflow editor with version does not load expected version](https://github.com/galaxyproject/galaxy/pull/21711) by @ahmedhamidawan

### galaxy-hub
- [Add EMBL-EBI training course to Events](https://github.com/galaxyproject/galaxy-hub/pull/3666) by @natalie-wa
- [[Microbiology SIG] Add link to microgalaxy codex tool and workflow files](https://github.com/galaxyproject/galaxy-hub/pull/3665) by @bebatut
- [Sync: Update files from training-material](https://github.com/galaxyproject/galaxy-hub/pull/3664) by @github-actions[bot]
- [Replace Font Awesome icons with inline Lucide SVGs](https://github.com/galaxyproject/galaxy-hub/pull/3662) by @dannon
- [Fix broken kramdown attributes in get-started and other pages](https://github.com/galaxyproject/galaxy-hub/pull/3660) by @dannon
- [Fix authors display in ArticleHeader component](https://github.com/galaxyproject/galaxy-hub/pull/3659) by @dannon
- [Bump url-parse from 1.5.3 to 1.5.10](https://github.com/galaxyproject/galaxy-hub/pull/3656) by @dependabot[bot]
- [Sync: Update files from training-material](https://github.com/galaxyproject/galaxy-hub/pull/3655) by @github-actions[bot]
- [Bump @isaacs/brace-expansion from 5.0.0 to 5.0.1 in /astro](https://github.com/galaxyproject/galaxy-hub/pull/3654) by @dependabot[bot]
- [Sync: Update files from training-material](https://github.com/galaxyproject/galaxy-hub/pull/3653) by @github-actions[bot]
- [[astro] Render tease/summary as markdown and deduplicate utilities](https://github.com/galaxyproject/galaxy-hub/pull/3652) by @dannon

### galaxy-skills
- [fix: correct add_filter_regex invert semantics](https://github.com/galaxyproject/galaxy-skills/pull/4) by @nekrut

### galaxy_codex
- [Merge the last two tables of the biodiversity-genomics lab](https://github.com/galaxyproject/galaxy_codex/pull/589) by @scorreard
- [Create yaml with all tools for local Galaxy install](https://github.com/galaxyproject/galaxy_codex/pull/587) by @paulzierep
- [Automatic resources update](https://github.com/galaxyproject/galaxy_codex/pull/586) by @github-actions[bot]
- [Limit weekly update changes to changes in communities folder](https://github.com/galaxyproject/galaxy_codex/pull/584) by @bebatut
- [Add code to get output formats for each suite](https://github.com/galaxyproject/galaxy_codex/pull/583) by @paulzierep
- [Bump ruby/setup-ruby from 1.286.0 to 1.287.0](https://github.com/galaxyproject/galaxy_codex/pull/581) by @dependabot[bot]

### gxy.io
- [Add new trainer resource for GTA2026](https://github.com/galaxyproject/gxy.io/pull/114) by @dianichj

### iwc
- [Point users to other workflow sources](https://github.com/galaxyproject/iwc/pull/1098) by @dannon

### planemo
- [Set default mulled_resolution_cache_data_dir in planemo workspace](https://github.com/galaxyproject/planemo/pull/1610) by @mvdbeek
- [Fix commit_version.py](https://github.com/galaxyproject/planemo/pull/1609) by @bernt-matthias
- [Move deploy to a separate workflow for trusted publishing](https://github.com/galaxyproject/planemo/pull/1608) by @nsoranzo
- [Finish release and fix release process](https://github.com/galaxyproject/planemo/pull/1607) by @bernt-matthias
- [Fix exception handling in case of ReadTimeout errors](https://github.com/galaxyproject/planemo/pull/1606) by @nsoranzo

### tools-iuc
- [Fix deployment for haltools](https://github.com/galaxyproject/tools-iuc/pull/7659) by @SaimMomin12
- [minor text changes used to trigger deployment](https://github.com/galaxyproject/tools-iuc/pull/7657) by @Smeds
- [Fixed trimmomatic options](https://github.com/galaxyproject/tools-iuc/pull/7656) by @xens25
- [Update Constava from v1.1.0 → v1.2.0](https://github.com/galaxyproject/tools-iuc/pull/7655) by @agdiaz
- [Fixes for abyss](https://github.com/galaxyproject/tools-iuc/pull/7654) by @bernt-matthias
- [Update varvamp to version 1.3](https://github.com/galaxyproject/tools-iuc/pull/7653) by @wm75
- [CoreProfiler DM: Try to fix bash syntax error](https://github.com/galaxyproject/tools-iuc/pull/7652) by @bebatut
- [Humann - Add missing extension](https://github.com/galaxyproject/tools-iuc/pull/7650) by @RZ9082
- [Coreprofiler update: DM](https://github.com/galaxyproject/tools-iuc/pull/7649) by @clsiguret
- [Pirate fix](https://github.com/galaxyproject/tools-iuc/pull/7648) by @SaimMomin12
- [New tool: vConTACT2 a tool to provide taxonomic context of metagenomic sequencing data](https://github.com/galaxyproject/tools-iuc/pull/7646) by @neo417
- [Liftoff tool wrapper](https://github.com/galaxyproject/tools-iuc/pull/7645) by @d-callan
- [Updating tools/metamdbg from version 1.2 to 1.3](https://github.com/galaxyproject/tools-iuc/pull/7641) by @gxydevbot
- [Updating tools/dos2unix from version 7.5.3 to 7.5.4](https://github.com/galaxyproject/tools-iuc/pull/7640) by @gxydevbot

### tpv-shared-database
- [Add env var `OPENBLAS_NUM_THREADS: 1` to metawrapmg_binning tool](https://github.com/galaxyproject/tpv-shared-database/pull/105) by @cat-bro

### training-material
- [add nfdi4boimage and de.NBI to the funding](https://github.com/galaxyproject/training-material/pull/6639) by @bgruening
- [Add lines to biont bio](https://github.com/galaxyproject/training-material/pull/6638) by @shiltemann
- [Update single-cell editors and add publication](https://github.com/galaxyproject/training-material/pull/6637) by @pavanvidem
- [Add Johannes Nussbaum to CONTRIBUTORS.yaml](https://github.com/galaxyproject/training-material/pull/6634) by @Sch-Da
- [Update WorkflowHub IDs](https://github.com/galaxyproject/training-material/pull/6632) by @github-actions[bot]
- [Fix join date for Daniela Schneider](https://github.com/galaxyproject/training-material/pull/6631) by @Sch-Da
- [Update Cached Commit Data](https://github.com/galaxyproject/training-material/pull/6630) by @github-actions[bot]
- [Update Persistent uniform resource locators](https://github.com/galaxyproject/training-material/pull/6629) by @github-actions[bot]

### usegalaxy-tools
- [Add annotation tools for BRC](https://github.com/galaxyproject/usegalaxy-tools/pull/1347) by @natefoo
- [Update all repos 2026-02-05](https://github.com/galaxyproject/usegalaxy-tools/pull/1344) by @github-actions[bot]

## New Issues

### ansible-postgresql-objects
- [Pycopg2 error to connection with the role "bvalot3" does not exist](https://github.com/galaxyproject/ansible-postgresql-objects/issues/16) by @bvalot

### brc-analytics
- [Proxy backend through analytics.org base URL](https://github.com/galaxyproject/brc-analytics/issues/1122) by @NoopDog
- [Add backend version info to version display](https://github.com/galaxyproject/brc-analytics/issues/1130) by @NoopDog
- [Fix LLM backend routing bug and deploy to dev](https://github.com/galaxyproject/brc-analytics/issues/1126) by @NoopDog
- [Compare ViewPath GTFs with existing UCSC browser tracks](https://github.com/galaxyproject/brc-analytics/issues/1131) by @NoopDog
- [Add paired/single end support to DE workflow form](https://github.com/galaxyproject/brc-analytics/issues/1127) by @NoopDog
- [Create user growth one-pager for NCBI contacts](https://github.com/galaxyproject/brc-analytics/issues/1134) by @NoopDog
- [Build Grafana visualizations for workflow landing metrics](https://github.com/galaxyproject/brc-analytics/issues/1133) by @NoopDog
- [Create user feedback survey and re-engage previous respondents](https://github.com/galaxyproject/brc-analytics/issues/1132) by @NoopDog
- [Fix release notes link visibility for unauthenticated users](https://github.com/galaxyproject/brc-analytics/issues/1129) by @NoopDog
- [Keycloak proof of concept for auth flow testing](https://github.com/galaxyproject/brc-analytics/issues/1128) by @NoopDog
- [Instrument ENA/SRA file download failure rate](https://github.com/galaxyproject/brc-analytics/issues/1125) by @NoopDog
- [Create Scribe walkthrough documentation for first analysis workflow](https://github.com/galaxyproject/brc-analytics/issues/1124) by @NoopDog
- [Add YouTube videos to the Learn section](https://github.com/galaxyproject/brc-analytics/issues/1123) by @NoopDog
- [Q1 Priorities 2026](https://github.com/galaxyproject/brc-analytics/issues/1120) by @nekrut

### galaxy
- [[Release Testing] Add Beta Upload Activity - User Interface Redesign](https://github.com/galaxyproject/galaxy/issues/21750) by @ahmedhamidawan
- [More yarn cleanup](https://github.com/galaxyproject/galaxy/issues/21791) by @jmchilton
- [Workflow extraction fails to connect tools for dynamically-created nested collections](https://github.com/galaxyproject/galaxy/issues/21789) by @jmchilton
- [Workflow extraction with empty collection produces empty workflow](https://github.com/galaxyproject/galaxy/issues/21788) by @jmchilton
- [[Release Testing] Refactor display application handling](https://github.com/galaxyproject/galaxy/issues/21781) by @ksuderman
- [[Release Testing] Include subworkflow jobs in invocation metrics](https://github.com/galaxyproject/galaxy/issues/21784) by @ahmedhamidawan
- [Adding tags on Safari](https://github.com/galaxyproject/galaxy/issues/21777) by @ksuderman
- [`data_column` does not work properly in conditionals](https://github.com/galaxyproject/galaxy/issues/21726) by @bernt-matthias
- [/api/exports: AttributeError: 'str' object has no attribute 'get'](https://github.com/galaxyproject/galaxy/issues/21771) by @galaxyproject-sentryintegration[bot]
- [ValidationError: 5 validation errors for HelpForumSearchResponse](https://github.com/galaxyproject/galaxy/issues/21770) by @galaxyproject-sentryintegration[bot]
- [Support pick parameter for diffrerent size collection (i.e. pick collection ?)](https://github.com/galaxyproject/galaxy/issues/21769) by @paulzierep
- [Builtin converters not shown in tool panel views](https://github.com/galaxyproject/galaxy/issues/21767) by @bernt-matthias
- [Workflow editor creator popover content overflows screen with long text strings](https://github.com/galaxyproject/galaxy/issues/21757) by @itisAliRH
- [25.1 disable_local_accounts does not disable registration link](https://github.com/galaxyproject/galaxy/issues/21741) by @martenson
- [ProgrammingError: (psycopg2.errors.DatatypeMismatch) column "on_complete" is of type json but expression is of type bytea](https://github.com/galaxyproject/galaxy/issues/21762) by @galaxyproject-sentryintegration[bot]
- [Galactic Weekly: Regular Checks and Community Contributions](https://github.com/galaxyproject/galaxy/issues/21760) by @natalie-wa
- [Tool request form on usegalaxy instances](https://github.com/galaxyproject/galaxy/issues/21758) by @arash77
- [History Storage Overview Chart Fails to Refresh After Dataset Deletion](https://github.com/galaxyproject/galaxy/issues/21743) by @itisAliRH
- [Galaxy UI appears nested within cetral panel after viewing job info from Local Data section](https://github.com/galaxyproject/galaxy/issues/21752) by @jdavcs
- [Workflow referencing non-existent file source becomes inaccessible](https://github.com/galaxyproject/galaxy/issues/21732) by @wm75
- [Enable queuing up workflow invocations on invocation outputs](https://github.com/galaxyproject/galaxy/issues/21742) by @mvdbeek
- [problem with OMERO as file source when fetching data](https://github.com/galaxyproject/galaxy/issues/21744) by @rmassei
- [[BUG] Unable to copy available dataset from "Datasets" to history](https://github.com/galaxyproject/galaxy/issues/21740) by @Sch-Da
- [activity bar wrongly shows interactive tools option](https://github.com/galaxyproject/galaxy/issues/21739) by @martenson
- [Kombu error](https://github.com/galaxyproject/galaxy/issues/21713) by @bernt-matthias
- [Tool credentials fail on containerized (singularity?) destinations](https://github.com/galaxyproject/galaxy/issues/21715) by @bernt-matthias
- [Workflow extraction: add ID-based params for cross-history support](https://github.com/galaxyproject/galaxy/issues/21722) by @jmchilton
- [Missing built in tool](https://github.com/galaxyproject/galaxy/issues/21714) by @bernt-matthias

### galaxy-hub
- [Hub QA for Production Cutover](https://github.com/galaxyproject/galaxy-hub/issues/3661) by @natalie-wa
- ["By [ ]" in all sig pages](https://github.com/galaxyproject/galaxy-hub/issues/3657) by @paulzierep
- [Authors field is broken in old website but works perfectly for the astro website](https://github.com/galaxyproject/galaxy-hub/issues/3650) by @dadrasarmin
- [Hyperlink in the tease section is not displayed properly in the astro site](https://github.com/galaxyproject/galaxy-hub/issues/3648) by @dadrasarmin
- [GitHub IDs with uppercase will not properly map to GTN entries in the astro website](https://github.com/galaxyproject/galaxy-hub/issues/3649) by @dadrasarmin

### galaxy-k8s-boot
- [Hard coded single_user and admin_users in the playbook](https://github.com/galaxyproject/galaxy-k8s-boot/issues/47) by @ksuderman

### galaxy-language-server
- [Automate dependency update when galaxy-tool-util gets updates](https://github.com/galaxyproject/galaxy-language-server/issues/289) by @davelopez

### galaxy_codex
- [Training links opening not on top](https://github.com/galaxyproject/galaxy_codex/issues/593) by @paulzierep
- [Some tool links in Labs not working](https://github.com/galaxyproject/galaxy_codex/issues/592) by @paulzierep
- [SQL queries for tool usage include deleted jobs](https://github.com/galaxyproject/galaxy_codex/issues/585) by @pavanvidem
- [Use galaxy utils for codex](https://github.com/galaxyproject/galaxy_codex/issues/582) by @paulzierep

### idc
- [Update Kraken2 + Braken indexes for July 2025 and October 2025 updates](https://github.com/galaxyproject/idc/issues/82) by @jennaj

### iwc
- [Point users to other sources of workflows](https://github.com/galaxyproject/iwc/issues/1095) by @mvdbeek
- [Provide template repo](https://github.com/galaxyproject/iwc/issues/1096) by @mvdbeek

### tools-iuc
- [Basic config of `abyss-pe (2.3.10+galaxy0)` wrapper can be submitted without any input/changes, which defaults to an error](https://github.com/galaxyproject/tools-iuc/issues/7642) by @B0r1sD
- [Add --min_af to gtdb wrapper](https://github.com/galaxyproject/tools-iuc/issues/7651) by @paulzierep
- [Ustacks only does not append all the samples to a single log file](https://github.com/galaxyproject/tools-iuc/issues/7647) by @mthang

## Closed Issues

### ansible-galaxy
- [Comments are getting dumped in optional requirement strings](https://github.com/galaxyproject/ansible-galaxy/issues/240)

### ansible-postgresql-objects
- [Pycopg2 error to connection with the role "bvalot3" does not exist](https://github.com/galaxyproject/ansible-postgresql-objects/issues/16)

### brc-analytics
- [Proxy backend through analytics.org base URL](https://github.com/galaxyproject/brc-analytics/issues/1122)
- [Add backend version info to version display](https://github.com/galaxyproject/brc-analytics/issues/1130)
- [Fix LLM backend routing bug and deploy to dev](https://github.com/galaxyproject/brc-analytics/issues/1126)
- [Add support for organism aliases](https://github.com/galaxyproject/brc-analytics/issues/533)
- [searchable sunburst](https://github.com/galaxyproject/brc-analytics/issues/556)
- [consider other ways to categorize, filter, etc the priority pathogens](https://github.com/galaxyproject/brc-analytics/issues/631)
- [Warn on too many rows from ENA](https://github.com/galaxyproject/brc-analytics/issues/514)
- [Handle large number of accessions](https://github.com/galaxyproject/brc-analytics/issues/518)
- [Add facet filters to ENA popup](https://github.com/galaxyproject/brc-analytics/issues/515)
- [Terminology for BRC components](https://github.com/galaxyproject/brc-analytics/issues/307)
- [Add data dictionary](https://github.com/galaxyproject/brc-analytics/issues/517)
- [How to chain workflows?](https://github.com/galaxyproject/brc-analytics/issues/419)
- [Pre-filter query to match workflow requirements](https://github.com/galaxyproject/brc-analytics/issues/516)
- [modular steps/ processes in data catalog build](https://github.com/galaxyproject/brc-analytics/issues/398)
- [Create new workflow configuration stepper](https://github.com/galaxyproject/brc-analytics/issues/421)
- [Migration to Postgres](https://github.com/galaxyproject/brc-analytics/issues/327)
- [Use case doc](https://github.com/galaxyproject/brc-analytics/issues/252)
- [Explain how BRC-Analytics fits in with the BRC program and what its niche is in the BRC ecosystem](https://github.com/galaxyproject/brc-analytics/issues/319)
- [Link from Organism or Assembly list to ENA](https://github.com/galaxyproject/brc-analytics/issues/333)
- [Link to SRA from Organisms or Assemblies list](https://github.com/galaxyproject/brc-analytics/issues/332)
- [How to list tracks for an assembly from UCSC browser](https://github.com/galaxyproject/brc-analytics/issues/292)
- [Help content: How-to guides in Galaxy (from legacy system)](https://github.com/galaxyproject/brc-analytics/issues/109)
- [Assembly page general outline](https://github.com/galaxyproject/brc-analytics/issues/284)
- [Create visualization for haploid variant analysis workflow results](https://github.com/galaxyproject/brc-analytics/issues/155)
- [List SRA list or link to raw reads on the organism page](https://github.com/galaxyproject/brc-analytics/issues/293)
- [add possibility to extract additional information for an assembly](https://github.com/galaxyproject/brc-analytics/issues/264)
- [Figure out rendering for viral species](https://github.com/galaxyproject/brc-analytics/issues/175)
- [How can we send multiple assemblies to a Galaxy workflow](https://github.com/galaxyproject/brc-analytics/issues/253)
- [Create a detailed survey asking about analysis types BRC Analytics users want to perform](https://github.com/galaxyproject/brc-analytics/issues/128)
- [Stats on indices](https://github.com/galaxyproject/brc-analytics/issues/187)
- [Why annotation differences between NCBI and UCSC?](https://github.com/galaxyproject/brc-analytics/issues/147)
- [Database migration](https://github.com/galaxyproject/brc-analytics/issues/76)
- [Configure site search](https://github.com/galaxyproject/brc-analytics/issues/7)
- [BRC requirements and PM](https://github.com/galaxyproject/brc-analytics/issues/1)
- [Custom workflow (upload data only)](https://github.com/galaxyproject/brc-analytics/issues/824)
- [Custom workflow Requirements (upload data only)](https://github.com/galaxyproject/brc-analytics/issues/288)
- [Update homepage to focus on white papers](https://github.com/galaxyproject/brc-analytics/issues/808)

### galaxy
- [Workflow editor creator popover content overflows screen with long text strings](https://github.com/galaxyproject/galaxy/issues/21757)
- [History Storage Overview Chart Fails to Refresh After Dataset Deletion](https://github.com/galaxyproject/galaxy/issues/21743)
- [Database Migration Upgrade Error - column "tool_id" of relation "tool_landing_request" already exists](https://github.com/galaxyproject/galaxy/issues/21699)
- [rendering adjusted user register form is dysfunctional](https://github.com/galaxyproject/galaxy/issues/1937)
- [[BUG] Unable to copy available dataset from "Datasets" to history](https://github.com/galaxyproject/galaxy/issues/21740)
- [Activity bar: Interactive tools](https://github.com/galaxyproject/galaxy/issues/16547)
- [Sharing histories with non-shareable datasets gives 500 error instead of 400](https://github.com/galaxyproject/galaxy/issues/21684)
- [activity bar's default is to show interactive tools first](https://github.com/galaxyproject/galaxy/issues/21322)
- [Interactive environments](https://github.com/galaxyproject/galaxy/issues/5477)
- [language patch package](https://github.com/galaxyproject/galaxy/issues/20765)
- [documentation rendering](https://github.com/galaxyproject/galaxy/issues/21418)
- [Tool filter_failed_collection_1.1.0.xml do not exists](https://github.com/galaxyproject/galaxy/issues/21389)
- [Missing built in tool](https://github.com/galaxyproject/galaxy/issues/21714)
- [Job success state gets lost for collections during history export / import](https://github.com/galaxyproject/galaxy/issues/20450)
- [Make credentials available as cheetah variables?](https://github.com/galaxyproject/galaxy/issues/21652)
- [Workflow: No propagation of possible options for a workflow input (with `Attempt restriction based on connections`) if connected to several subworkflows](https://github.com/galaxyproject/galaxy/issues/21602)
- [Break dereference_input into HDA and HDCA variants](https://github.com/galaxyproject/galaxy/issues/20160)
- [Datatype dropdown does not filter by search term](https://github.com/galaxyproject/galaxy/issues/21470)

### galaxy-hub
- ["By [ ]" in all sig pages](https://github.com/galaxyproject/galaxy-hub/issues/3657)
- [Authors field is broken in old website but works perfectly for the astro website](https://github.com/galaxyproject/galaxy-hub/issues/3650)
- [Hyperlink in the tease section is not displayed properly in the astro site](https://github.com/galaxyproject/galaxy-hub/issues/3648)

### iwc
- [Point users to other sources of workflows](https://github.com/galaxyproject/iwc/issues/1095)
- [IWC Site Infra Enhancements from BOF](https://github.com/galaxyproject/iwc/issues/908)

### tools-iuc
- [Basic config of `abyss-pe (2.3.10+galaxy0)` wrapper can be submitted without any input/changes, which defaults to an error](https://github.com/galaxyproject/tools-iuc/issues/7642)
- [New tool request: PIRATE](https://github.com/galaxyproject/tools-iuc/issues/7614)
- [Adding RIPPLES to the UShER package](https://github.com/galaxyproject/tools-iuc/issues/7242)
- [New tool request: datavrzd](https://github.com/galaxyproject/tools-iuc/issues/7639)

---
*Generated automatically on 2026-02-08 09:22 UTC*