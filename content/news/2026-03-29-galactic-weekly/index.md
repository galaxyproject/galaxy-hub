---
title: 'Galactic Weekly: Week 13, 2026'
date: '2026-03-29'
tease: Weekly summary of activity across 150+ galaxyproject repositories
tags:
- community
- development
subsites:
- all
---

![Galactic Weekly](https://raw.githubusercontent.com/nekrut/gxy-whats-new/main/assets/header.jpg)

## Summary
- **Repositories with activity:** 22
- **New issues:** 28
- **Issues closed:** 40
- **PRs opened:** 174
- **PRs merged:** 84
- **Contributors:** 47


### Highlights

This week, 47 contributors merged 84 pull requests across 22 repositories, closing 40 issues. The core Galaxy server received numerous bug fixes and backports for the 26.0 release, addressing problems like sanitization errors, race conditions, N+1 query performance issues, and incorrect form handling, along with performance optimizations for job state summaries and API queries. Across the ecosystem, tools-iuc updated several bioinformatics tools to newer versions and added a new *H. influenzae* capsule typing tool, galaxy-hub migrated to Astro 6 and published the March 2026 newsletter, brc-analytics expanded end-to-end test coverage and integrated differential expression into the workflow view, and gxformat2 added support for GalaxyUserTool in workflows while modernizing its development tooling and linting infrastructure.


## Most Active Repositories

| Repository | PRs Opened | PRs Merged | Issues Opened | Issues Closed |
|------------|------------|------------|---------------|---------------|
| [galaxy](https://github.com/galaxyproject/galaxy) | 57 | 34 | 13 | 28 |
| [tools-iuc](https://github.com/galaxyproject/tools-iuc) | 27 | 11 | 1 | 4 |
| [galaxy-hub](https://github.com/galaxyproject/galaxy-hub) | 13 | 10 | 0 | 0 |
| [brc-analytics](https://github.com/galaxyproject/brc-analytics) | 10 | 7 | 1 | 4 |
| [gxformat2](https://github.com/galaxyproject/gxformat2) | 10 | 7 | 4 | 1 |
| [training-material](https://github.com/galaxyproject/training-material) | 11 | 5 | 0 | 1 |
| [iwc](https://github.com/galaxyproject/iwc) | 17 | 0 | 3 | 1 |
| [usegalaxy-tools](https://github.com/galaxyproject/usegalaxy-tools) | 10 | 2 | 1 | 0 |
| [galaxy_codex](https://github.com/galaxyproject/galaxy_codex) | 6 | 3 | 0 | 0 |
| [galaxy-k8s-boot](https://github.com/galaxyproject/galaxy-k8s-boot) | 2 | 1 | 0 | 0 |


## Repository Summaries

### gxabm
This week, one new issue was opened requesting the ability to download an exported history, and one existing issue requesting the addition of a tools subcommand was closed.

### brc-analytics
This week, the brc-analytics repository added several end-to-end Playwright tests, including tests for the workflow stepper and h1 visibility assertions in smoke tests, and configured these tests to run against production builds. The differential expression (DE) feature flag was removed and DE was added to the workflow view, while links to GA2 were removed and the GA2 roadmap was updated. New getting-started tutorial pages and a scribe-import skill were also added.

### tools-iuc
This week, the tools-iuc repository updated several existing tools to newer versions, including deepvariant (to 1.10), rasusa (to 3.0.0), fastp (to 1.2.0), ena_upload (to 0.10.1), and abritamr (to 1.1.1). A new tool, hicap, was added for in silico typing of the *H. influenzae* capsule locus, and bug fixes were applied to chewbacca, revoluzer, and datamash_transpose. Additionally, coverage report testing was re-enabled with updated dependencies, and several issues—including ones related to Busco lineage data and the `Add_a_column1` tool—were closed.

### infrastructure-playbook
A single pull request was merged this week, adding metrics tracking specifically for data fetch tool landing pages. This change appears to introduce monitoring or analytics related to how users interact with data retrieval tools in the Galaxy infrastructure.

### usegalaxy-playbook
A new issue was reported this week identifying that the wrong container is being used for the `dada2-plotqualityprofile` tool. No other activity (such as pull requests or commits) was noted in the repository during this period.

### galaxy
This week's work on the Galaxy repository focused heavily on bug fixes and backports to the 26.0 release branch. Fixes addressed issues including a DOMPurify sanitization TypeError in Library components, a race condition in history list search filtering, N+1 query performance problems in job state summary endpoints, broken file source template removal, incorrect optional integer form handling, and missing dataset collection state on tool rerun. Several performance optimizations were also merged, such as batch-prefetching HDCA job state summaries in history contents listings, deferring expensive role queries in the dataset edit API, and replacing BaseHTTPMiddleware with pure ASGI middleware for X-Frame-Options handling.

On the infrastructure and dependency side, the `cryptography` and `requests` Python libraries were bumped to newer versions, the Sentry JS SDK was upgraded to v10 with opt-in session replay, and the `pnpm/

### training-material
This week, the training-material repository merged five pull requests covering updates to Digital Humanities content for the Galaxy Training Academy, edits to a command line video, the addition of a new contributor (maximilianh) to the contributors file, updated WorkflowHub IDs, and refreshed cached commit data. One issue requesting an update to FAQ autobuilding lists was closed.

### KegAlign
A pull request was merged that fixes how the `--seed` parameter parses T-characters and adds support for a new `--inner` parameter. This was the only change to the KegAlign repository this week.

### galaxy-hub
The repository was updated to remove the `structured_authors` field from both the codebase and content files, including the Galaxy Newsletter. The March 2026 Galaxy Newsletter was added, the GCC2026 CoFest page was updated with a Google Form link, and the site framework was upgraded from Astro 5 to Astro 6. Several smaller content edits were made, supporter images were set to eager-load, and training material files were synced.

### galaxy_codex
Three pull requests were merged this week, all related to automatic resource updates. Two of these specifically updated tutorial resources, while the third was a general automatic resource update. No manual or feature-related changes were made during this period.

### galaxy-k8s-boot
A single pull request was merged this week, which synchronized variable names in the repository to match those used in Galaxy. This change ensures consistency between the galaxy-k8s-boot configuration and the main Galaxy project.

### gxformat2
This week, the gxformat2 repository received a batch of changes spanning tooling, features, and documentation. Linting best practices were migrated from Planemo, development tools were modernized, a pre-commit config was added, a deploy GitHub workflow was introduced, and auto-generated CLI docs were set up using sphinx-argparse. On the feature side, full support for GalaxyUserTool in workflows was added and its corresponding issue closed, and the conversion system was updated to allow pluggable state handling in both directions.

### usegalaxy-tools
This week, two pull requests were merged: one installed IWC (Intergalactic Workflows Commission) tools on usegalaxy.org, and the other updated all tool repositories. A new issue was opened requesting the installation of data managers for Liana.

### galaxy-language-server
The repository updated two server-side dependencies this week by merging a single pull request that bumped packages in the `/server` directory. No other changes were merged during this period.

### ansible-galaxy
A single pull request was merged this week, adding a variable to the restart handler command that allows the default 'graceful' restart behavior to be overridden. This gives users more control over how the service restarts when configuration changes are applied.

### iwc
This week in the IWC repository, three new issues were reported: one about a needed parameter update for the functional annotation of sequences workflow, one about a loose end appearing in workflow diagrams, and one about a problem running workflows from iwc.galaxyproject.org. One issue was closed related to making the search bar automatically scroll down to results when they are not in view.

### planemo
A bug was reported where the `workflow_test_init` command crashes with a `FileNotFoundError` when workflow input labels contain forward slashes, since the slashes are interpreted as directory separators when creating file paths. No other new issues, pull requests, or commits were recorded for the Planemo repository this week.

### idc
This week, a new issue was opened requesting the addition of a mocked database (release 226) for gtdb-tk to the CVMFS infrastructure. No other activity was recorded in the repository during this period.

### galaxy-helm
This week, a new issue was opened regarding the retirement of Ingress NGINX, indicating that the project's Helm chart may need to be updated to account for changes in the NGINX ingress controller's lifecycle or replacement. No other new issues, pull requests, or merges were recorded for the repository during this period.


## Merged Pull Requests

### KegAlign
- [Fix --seed parsing for T-chars and add --inner parameter support](https://github.com/galaxyproject/KegAlign/pull/34) by @abgulhan

### ansible-galaxy
- [Add a variable to restart handler command so that ‘graceful’ can be overridden](https://github.com/galaxyproject/ansible-galaxy/pull/246) by @cat-bro

### brc-analytics
- [fix: removing links to ga2 from brc](https://github.com/galaxyproject/brc-analytics/pull/1215) by @d-callan
- [feat: add playwright tests for the workflow stepper](https://github.com/galaxyproject/brc-analytics/pull/1214) by @frano-m
- [feat: remove de feature flag and add de to workflow view](https://github.com/galaxyproject/brc-analytics/pull/1211) by @d-callan
- [feat: update ga2 roadmap](https://github.com/galaxyproject/brc-analytics/pull/1210) by @d-callan
- [feat: add h1 visibility assertions to e2e smoke tests](https://github.com/galaxyproject/brc-analytics/pull/1209) by @frano-m
- [feat: run e2e tests against production build](https://github.com/galaxyproject/brc-analytics/pull/1208) by @frano-m
- [feat: add getting-started tutorial pages and scribe-import skill](https://github.com/galaxyproject/brc-analytics/pull/1206) by @nekrut

### galaxy
- [Bump cryptography from 46.0.5 to 46.0.6 in /lib/galaxy/dependencies](https://github.com/galaxyproject/galaxy/pull/22289) by @dependabot[bot]
- [Merge 26.0 into dev](https://github.com/galaxyproject/galaxy/pull/22288) by @mvdbeek
- [&#91;25.1&#93; refresh utime in object store caches](https://github.com/galaxyproject/galaxy/pull/22279) by @bgruening
- [&#91;26.0&#93; Raise error when API client sends invalid parameter keys](https://github.com/galaxyproject/galaxy/pull/22277) by @mvdbeek
- [&#91;25.1&#93; Sequence datatypes: only read first character per line for setting metadata](https://github.com/galaxyproject/galaxy/pull/22276) by @bernt-matthias
- [Bump requests from 2.32.5 to 2.33.0 in /lib/galaxy/dependencies](https://github.com/galaxyproject/galaxy/pull/22270) by @dependabot[bot]
- [&#91;26.0&#93; Add _F/_R auto-pairing filter for forward/reverse datasets](https://github.com/galaxyproject/galaxy/pull/22267) by @jmchilton
- [Remove dual load of cutWrapper.xml](https://github.com/galaxyproject/galaxy/pull/22266) by @natefoo
- [&#91;26.0&#93; Backport of 21939](https://github.com/galaxyproject/galaxy/pull/22265) by @jdavcs
- [&#91;26.0&#93; Fix DOMPurify sanitize TypeError in Library components](https://github.com/galaxyproject/galaxy/pull/22263) by @dannon
- [&#91;26.0&#93; Fix HDCA lost in tool form on rerun](https://github.com/galaxyproject/galaxy/pull/22258) by @mvdbeek
- [&#91;26.0&#93; Fixes optional integer form handling in templates](https://github.com/galaxyproject/galaxy/pull/22257) by @davelopez
- [&#91;26.0&#93; Batch-prefetch HDCA job_state_summary in history contents listing](https://github.com/galaxyproject/galaxy/pull/22256) by @mvdbeek
- [&#91;26.0&#93; Replace BaseHTTPMiddleware with pure ASGI middleware for X-Frame-Options](https://github.com/galaxyproject/galaxy/pull/22255) by @mvdbeek
- [&#91;26.0&#93; Drop stored workflow menu entries from user serialization](https://github.com/galaxyproject/galaxy/pull/22254) by @mvdbeek
- [&#91;26.0&#93; Fix oauth2 template validation](https://github.com/galaxyproject/galaxy/pull/22253) by @davelopez
- [&#91;26.0&#93; Fix N+1 queries in fetch_job_states for jobs_summary endpoints](https://github.com/galaxyproject/galaxy/pull/22251) by @mvdbeek
- [&#91;26.0&#93; Validate replacement_params values are strings before storing](https://github.com/galaxyproject/galaxy/pull/22250) by @mvdbeek
- [docs: Set proxy_ssl_server_name for GTN proxy on CloudFlare due to SNI](https://github.com/galaxyproject/galaxy/pull/22249) by @martenson
- [&#91;26.0&#93; make sure origins for data landings are persisted](https://github.com/galaxyproject/galaxy/pull/22248) by @d-callan
- [&#91;26.0&#93; Fix file source removal](https://github.com/galaxyproject/galaxy/pull/22246) by @davelopez
- [&#91;26.0&#93; Delete dummy error controller, fix type error on invalid requests](https://github.com/galaxyproject/galaxy/pull/22245) by @mvdbeek
- [&#91;26.0&#93; Fix import order error from ESLint](https://github.com/galaxyproject/galaxy/pull/22240) by @nsoranzo
- [&#91;26.0&#93; Fix batch history purge not updating user's update_time](https://github.com/galaxyproject/galaxy/pull/22238) by @mvdbeek
- [Support IEC units in &#96;&#96;size_to_bytes()&#96;&#96;, add &#96;&#96;QuotaManager&#96;&#96; unit tests](https://github.com/galaxyproject/galaxy/pull/22237) by @nsoranzo
- [Bump pnpm/action-setup from 4 to 5](https://github.com/galaxyproject/galaxy/pull/22235) by @dependabot[bot]
- [&#91;26.0&#93; Fix TypeError in ExternalIdentities by always including provider_label in authnz response](https://github.com/galaxyproject/galaxy/pull/22234) by @guerler
- [Upgrade Sentry JS SDK to v10, add opt-in session replay](https://github.com/galaxyproject/galaxy/pull/22233) by @dannon
- [&#91;26.0&#93; Optimize dataset get_edit API by deferring expensive role queries](https://github.com/galaxyproject/galaxy/pull/22232) by @mvdbeek
- [&#91;25.1&#93; Use &#96;&#96;/api/tool_data&#96;&#96; endpoints in DataTables.vue & DataManagerTable.vue](https://github.com/galaxyproject/galaxy/pull/22229) by @mvdbeek
- [Fix mapOver terminology typo and minor polish](https://github.com/galaxyproject/galaxy/pull/22226) by @martenson
- [&#91;26.0&#93; Fix missing focus helper](https://github.com/galaxyproject/galaxy/pull/22225) by @guerler
- [&#91;26.0&#93; Fix race condition in history list when rapidly changing search filters](https://github.com/galaxyproject/galaxy/pull/22223) by @mvdbeek
- [&#91;26.0&#93; Update fastmcp requirement to 3.0.2](https://github.com/galaxyproject/galaxy/pull/22221) by @nsoranzo

### galaxy-hub
- [Update Nadine index.md](https://github.com/galaxyproject/galaxy-hub/pull/3881) by @TuturBaba
- [remove structured_authors from the codebase and from content](https://github.com/galaxyproject/galaxy-hub/pull/3878) by @bgruening
- [earger load supporter images](https://github.com/galaxyproject/galaxy-hub/pull/3877) by @bgruening
- [Updating Galaxy Newsletter to remove authors_structured](https://github.com/galaxyproject/galaxy-hub/pull/3876) by @natalie-wa
- [Add March 2026 Galaxy Newsletter](https://github.com/galaxyproject/galaxy-hub/pull/3875) by @natalie-wa
- [Update index.md](https://github.com/galaxyproject/galaxy-hub/pull/3874) by @ksuderman
- [Sync: Update files from training-material](https://github.com/galaxyproject/galaxy-hub/pull/3873) by @github-actions[bot]
- [Upgrade Astro 5 → 6](https://github.com/galaxyproject/galaxy-hub/pull/3872) by @dannon
- [Update index.md](https://github.com/galaxyproject/galaxy-hub/pull/3871) by @TuturBaba
- [Update GCC2026 Cofest page and add google form link](https://github.com/galaxyproject/galaxy-hub/pull/3870) by @ahmedhamidawan

### galaxy-k8s-boot
- [Sync var names with Galaxy](https://github.com/galaxyproject/galaxy-k8s-boot/pull/59) by @afgane

### galaxy-language-server
- [Bump the server-dependencies group in /server with 2 updates](https://github.com/galaxyproject/galaxy-language-server/pull/312) by @dependabot[bot]

### galaxy_codex
- [Automatic resources update](https://github.com/galaxyproject/galaxy_codex/pull/644) by @github-actions[bot]
- [Automatic resources update for tutorials only](https://github.com/galaxyproject/galaxy_codex/pull/643) by @github-actions[bot]
- [Automatic resources update for tutorials only](https://github.com/galaxyproject/galaxy_codex/pull/642) by @github-actions[bot]

### gxformat2
- [Add pre-commit config sample based on Galaxy's setup](https://github.com/galaxyproject/gxformat2/pull/166) by @jmchilton
- [Modernize linting and dev tools in various small ways](https://github.com/galaxyproject/gxformat2/pull/163) by @jmchilton
- [Add deploy GitHub workflow](https://github.com/galaxyproject/gxformat2/pull/160) by @nsoranzo
- [Migrate Best Practice Linting from Planemo, Rich Fixture Tracking and Docs](https://github.com/galaxyproject/gxformat2/pull/159) by @jmchilton
- [Full GalaxyUserTool support in workflows](https://github.com/galaxyproject/gxformat2/pull/158) by @jmchilton
- [Add auto-generated CLI docs via sphinx-argparse](https://github.com/galaxyproject/gxformat2/pull/156) by @jmchilton
- [Allow Pluggable State Handling During Conversion in Both Directions](https://github.com/galaxyproject/gxformat2/pull/154) by @jmchilton

### infrastructure-playbook
- [some data fetch specific tool landing metrics](https://github.com/galaxyproject/infrastructure-playbook/pull/61) by @d-callan

### tools-iuc
- [Remove coverage_report from tt_skip](https://github.com/galaxyproject/tools-iuc/pull/7838) by @DarianHole
- [Update coverage report dependencies](https://github.com/galaxyproject/tools-iuc/pull/7834) by @DarianHole
- [add hicap](https://github.com/galaxyproject/tools-iuc/pull/7833) by @bgruening
- [deepvariant 1.10](https://github.com/galaxyproject/tools-iuc/pull/7831) by @bgruening
- [Update rasusa to 3.0.0](https://github.com/galaxyproject/tools-iuc/pull/7825) by @pavanvidem
- [Chewbacca fixes](https://github.com/galaxyproject/tools-iuc/pull/7824) by @bernt-matthias
- [Add coreutils requirement to datamash_tranpose](https://github.com/galaxyproject/tools-iuc/pull/7823) by @wm75
- [revoluzer: fix distmat CLI](https://github.com/galaxyproject/tools-iuc/pull/7822) by @bernt-matthias
- [Updating tools/fastp from version 1.1.0 to 1.2.0](https://github.com/galaxyproject/tools-iuc/pull/7817) by @gxydevbot
- [Updating tools/ena_upload from version 0.10.0 to 0.10.1](https://github.com/galaxyproject/tools-iuc/pull/7814) by @gxydevbot
- [Updating tools/abritamr from version 1.0.20 to 1.1.1](https://github.com/galaxyproject/tools-iuc/pull/7813) by @gxydevbot

### training-material
- [Aligning information on Digital Humanities for GTA](https://github.com/galaxyproject/training-material/pull/6745) by @Sch-Da
- [Add command line video edits](https://github.com/galaxyproject/training-material/pull/6743) by @paulzierep
- [Add maximilianh to CONTRIBUTORS.yaml](https://github.com/galaxyproject/training-material/pull/6741) by @wm75
- [Update WorkflowHub IDs](https://github.com/galaxyproject/training-material/pull/6740) by @github-actions[bot]
- [Update Cached Commit Data](https://github.com/galaxyproject/training-material/pull/6739) by @github-actions[bot]

### usegalaxy-tools
- [Install IWC tools for usegalaxy.org 2026-03-25](https://github.com/galaxyproject/usegalaxy-tools/pull/1426) by @github-actions[bot]
- [Update all repos 2026-03-24](https://github.com/galaxyproject/usegalaxy-tools/pull/1425) by @github-actions[bot]

## New Issues

### brc-analytics
- [provide template samplesheet for de](https://github.com/galaxyproject/brc-analytics/issues/1213) by @d-callan

### galaxy
- [ObjectStore cache preserves file metadata - which can lead to cleanup problems](https://github.com/galaxyproject/galaxy/issues/22278) by @bgruening
- [UnicodeDecodeError: 'utf-8' codec can't decode byte 0x95 in position 0: invalid start byte](https://github.com/galaxyproject/galaxy/issues/22283) by @galaxyproject-sentryintegration[bot]
- [TypeError: e.purify.sanitize is not a function](https://github.com/galaxyproject/galaxy/issues/22239) by @galaxyproject-sentryintegration[bot]
- [TypeError: WebApplication.handle_controller_exception() got multiple values for argument 'method'](https://github.com/galaxyproject/galaxy/issues/22243) by @galaxyproject-sentryintegration[bot]
- [TypeError: Error.index() got an unexpected keyword argument 'msg'](https://github.com/galaxyproject/galaxy/issues/22244) by @galaxyproject-sentryintegration[bot]
- [ProgrammingError: (psycopg2.ProgrammingError) can't adapt type 'dict'](https://github.com/galaxyproject/galaxy/issues/22247) by @galaxyproject-sentryintegration[bot]
- [InvalidRequestError: A transaction is already begun on this Session.](https://github.com/galaxyproject/galaxy/issues/22269) by @galaxyproject-sentryintegration[bot]
- [admin: reload data table feature](https://github.com/galaxyproject/galaxy/issues/22227) by @martenson
- [RSpace file source plugin](https://github.com/galaxyproject/galaxy/issues/22252) by @paulzierep
- [Failed to schedule WorkflowInvocation&#91;id=955254&#93; for Workflow&#91;id=698747,name=pRESTO NEBNext Immune Sequencing Kit Workflow v3.2.1 (imported from uploaded file)&#93;, problem occurred on WorkflowStep&#91;index=6,type=tool,label=None,uuid=9d908404-a8f9-42d4-8058-...](https://github.com/galaxyproject/galaxy/issues/22261) by @galaxyproject-sentryintegration[bot]
- [ValueError: badly formed hexadecimal UUID string](https://github.com/galaxyproject/galaxy/issues/22260) by @galaxyproject-sentryintegration[bot]
- [TypeError: Cannot read properties of undefined (reading 'trim')](https://github.com/galaxyproject/galaxy/issues/22230) by @galaxyproject-sentryintegration[bot]
- [TypeError: s.value?.focus is not a function](https://github.com/galaxyproject/galaxy/issues/22224) by @galaxyproject-sentryintegration[bot]

### galaxy-helm
- [Ingress NGINX Retirement](https://github.com/galaxyproject/galaxy-helm/issues/535) by @micafer

### gxabm
- [Download an exported history](https://github.com/galaxyproject/gxabm/issues/327) by @ksuderman

### gxformat2
- [Deduplicate generated schema artifacts using pydantic:module annotation](https://github.com/galaxyproject/gxformat2/issues/167) by @jmchilton
- [Lint with expanded workflows to validate URL/import subworkflows](https://github.com/galaxyproject/gxformat2/issues/162) by @jmchilton
- [Full GalaxyUserTool Support in Workflows](https://github.com/galaxyproject/gxformat2/issues/157) by @jmchilton
- [Establish and Document Best Practices for Uniform Workflow Reasoning](https://github.com/galaxyproject/gxformat2/issues/155) by @jmchilton

### idc
- [Add mocked DB (226) for gtdb-tk to CVMFS](https://github.com/galaxyproject/idc/issues/85) by @paulzierep

### iwc
- [Functional annotation of sequences - needs parameter update](https://github.com/galaxyproject/iwc/issues/1186) by @paulzierep
- [Loose end in workflow diagrams](https://github.com/galaxyproject/iwc/issues/1181) by @nekrut
- [Issue when running from iwc.galaxyproject.org](https://github.com/galaxyproject/iwc/issues/1175) by @lldelisle

### planemo
- [workflow_test_init fails with FileNotFoundError when workflow input labels contain forward slashes (/)](https://github.com/galaxyproject/planemo/issues/1629) by @dadrasarmin

### tools-iuc
- [&#91;Tool Request&#93; HiCap  (for In silico typing of the H. influenzae capsule locus)](https://github.com/galaxyproject/tools-iuc/issues/7832) by @shiltemann

### usegalaxy-playbook
- [Wrong container used for &#96;dada2-plotqualityprofile&#96;](https://github.com/galaxyproject/usegalaxy-playbook/issues/446) by @bernt-matthias

### usegalaxy-tools
- [Request: Installing data managers for Liana](https://github.com/galaxyproject/usegalaxy-tools/issues/1422) by @khaled196

## Closed Issues

### brc-analytics
- [Add Playwright tests for the workflow stepper / ENA picker](https://github.com/galaxyproject/brc-analytics/issues/1027)
- [Send the DE workflow parameters to Galaxy (populate the workflow landing request)](https://github.com/galaxyproject/brc-analytics/issues/1075)
- [Add h1 visibility assertions to e2e smoke tests](https://github.com/galaxyproject/brc-analytics/issues/1166)
- [Run e2e tests against production build](https://github.com/galaxyproject/brc-analytics/issues/1165)

### galaxy
- [TypeError: int() argument must be a string, a bytes-like object or a real number, not 'NoneType'](https://github.com/galaxyproject/galaxy/issues/22186)
- [ObjectStore cache preserves file metadata - which can lead to cleanup problems](https://github.com/galaxyproject/galaxy/issues/22278)
- [AttributeError: 'str' object has no attribute 'get'](https://github.com/galaxyproject/galaxy/issues/22132)
- [AttributeError: 'NoneType' object has no attribute 'id'](https://github.com/galaxyproject/galaxy/issues/22044)
- [AttributeError: 'NoneType' object has no attribute 'invalidated' and no __dict__ for setting new attributes](https://github.com/galaxyproject/galaxy/issues/22042)
- [Large selection of datasets in workflow run &#96;FormData&#96; can fetch too many datasets](https://github.com/galaxyproject/galaxy/issues/19839)
- [Convert workflow extraction interface to Vue](https://github.com/galaxyproject/galaxy/issues/17506)
- [&#91;26.0&#93; File source templates can not be removed](https://github.com/galaxyproject/galaxy/issues/22208)
- [Writing rucio.cfg to temp directory raises FileNotFoundError if directory does not exist](https://github.com/galaxyproject/galaxy/issues/22085)
- [InternalError: (psycopg2.errors.InFailedSqlTransaction) current transaction is aborted, commands ignored until end of transaction block](https://github.com/galaxyproject/galaxy/issues/22166)
- [batch celery tasks during history deletion](https://github.com/galaxyproject/galaxy/issues/22171)
- [&#91;26.0&#93; File source templates: optional integers are initialized as 0 in UI](https://github.com/galaxyproject/galaxy/issues/22211)
- [TypeError: e.purify.sanitize is not a function](https://github.com/galaxyproject/galaxy/issues/22239)
- [TypeError: WebApplication.handle_controller_exception() got multiple values for argument 'method'](https://github.com/galaxyproject/galaxy/issues/22243)
- [TypeError: Error.index() got an unexpected keyword argument 'msg'](https://github.com/galaxyproject/galaxy/issues/22244)
- [ProgrammingError: (psycopg2.ProgrammingError) can't adapt type 'dict'](https://github.com/galaxyproject/galaxy/issues/22247)
- [admin: reload data table feature](https://github.com/galaxyproject/galaxy/issues/22227)
- [Fix access to token extra_data in tapis auth provider](https://github.com/galaxyproject/galaxy/issues/20855)
- [Integer workflow parameter uses 0 as default value](https://github.com/galaxyproject/galaxy/issues/16091)
- [Beta Upload Activity: Add dialog version of Upload Activity](https://github.com/galaxyproject/galaxy/issues/21877)
- [GTabs (vertical): Layout and spacing broken](https://github.com/galaxyproject/galaxy/issues/21966)
- [TypeError: Cannot read properties of undefined (reading 'trim')](https://github.com/galaxyproject/galaxy/issues/22230)
- [DistributedObjectStore does not call start() on backends, breaking iRODS connection pool monitor](https://github.com/galaxyproject/galaxy/issues/22219)
- [Beta Upload Activity: Add UI to support composite datatypes](https://github.com/galaxyproject/galaxy/issues/21876)
- [TypeError: s.value?.focus is not a function](https://github.com/galaxyproject/galaxy/issues/22224)
- [26.0 redis has a requirements and conditional requirement with different versions](https://github.com/galaxyproject/galaxy/issues/22201)
- [ObjectNotFound: No such object found.](https://github.com/galaxyproject/galaxy/issues/22182)
- [admin user is unable to manage users' information](https://github.com/galaxyproject/galaxy/issues/12046)

### gxabm
- [Add a tools subcommand](https://github.com/galaxyproject/gxabm/issues/325)

### gxformat2
- [Full GalaxyUserTool Support in Workflows](https://github.com/galaxyproject/gxformat2/issues/157)

### iwc
- [Typing in Search Bar should scroll down to results (if not in view)](https://github.com/galaxyproject/iwc/issues/804)

### tools-iuc
- [&#96;Add_a_column1&#96;: Unexpected failure](https://github.com/galaxyproject/tools-iuc/issues/7770)
- [Busco: The option to download lineage data has been removed, but there are missing files for many lineages in CVMFS data](https://github.com/galaxyproject/tools-iuc/issues/7462)
- [&#91;Tool Request&#93; HiCap  (for In silico typing of the H. influenzae capsule locus)](https://github.com/galaxyproject/tools-iuc/issues/7832)
- [Add output of chewbbaca_allelecallevaluator](https://github.com/galaxyproject/tools-iuc/issues/7806)

### training-material
- [&#91;Request&#93; Update FAQ Autobuilding lists](https://github.com/galaxyproject/training-material/issues/6723)

---
*Generated automatically on 2026-03-29 09:29 UTC*