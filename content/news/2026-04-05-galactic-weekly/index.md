---
title: 'Galactic Weekly: Week 14, 2026'
date: '2026-04-05'
tease: Weekly summary of activity across 150+ galaxyproject repositories
authors_structured:
- name: Galactic Bot
tags:
- community
- development
subsites:
- all
---

![Galactic Weekly](https://raw.githubusercontent.com/nekrut/gxy-whats-new/main/assets/header.jpg)

## Summary
- **Repositories with activity:** 16
- **New issues:** 44
- **Issues closed:** 40
- **PRs opened:** 135
- **PRs merged:** 75
- **Contributors:** 42


### Highlights

This week, 42 contributors merged 75 pull requests across 16 Galaxy Project repositories. The main Galaxy codebase focused on bug fixes backported to the 26.0 release, addressing issues with tool URLs, database query performance, object store caching, dataset collection deletion, and workflow scheduling, while also removing legacy JavaScript dependencies (Backbone and Underscore). The gxformat2 repository saw documentation improvements and test suite refactoring, tools-iuc updated several tools and added ANGSD nuclear contamination estimation, and the training-material and galaxy-hub repositories received administrative updates including new event announcements and grant acknowledgments. Across the project, dependency updates and CI maintenance were a recurring theme.


## Most Active Repositories

| Repository | PRs Opened | PRs Merged | Issues Opened | Issues Closed |
|------------|------------|------------|---------------|---------------|
| [galaxy](https://github.com/galaxyproject/galaxy) | 48 | 32 | 35 | 30 |
| [gxformat2](https://github.com/galaxyproject/gxformat2) | 14 | 12 | 2 | 1 |
| [galaxy-hub](https://github.com/galaxyproject/galaxy-hub) | 13 | 8 | 0 | 0 |
| [tools-iuc](https://github.com/galaxyproject/tools-iuc) | 15 | 5 | 0 | 1 |
| [training-material](https://github.com/galaxyproject/training-material) | 12 | 6 | 0 | 0 |
| [brc-analytics](https://github.com/galaxyproject/brc-analytics) | 5 | 4 | 2 | 4 |
| [iwc](https://github.com/galaxyproject/iwc) | 11 | 1 | 0 | 1 |
| [usegalaxy-tools](https://github.com/galaxyproject/usegalaxy-tools) | 7 | 3 | 2 | 0 |
| [gxabm](https://github.com/galaxyproject/gxabm) | 2 | 2 | 1 | 2 |
| [galaxy_codex](https://github.com/galaxyproject/galaxy_codex) | 3 | 0 | 1 | 0 |


## Repository Summaries

### galaxy-hub
This week, the galaxy-hub repository added announcements for two upcoming events (a DOMPS symposium talk and an NGS symposium at DKFZ), added ELIXIR-STEERS funding acknowledgments to three existing news articles, and updated GCC (Galaxy Community Conference) information. Several automated syncs pulled in updated files from the training-material repository, and a warning was added about a missing mechanism for moving data from short-term to long-term storage in the European Galaxy instance.

### galaxy
This week, the Galaxy repository merged around 30 pull requests, with a heavy focus on bug fixes backported to the 26.0 release branch. These included fixes for broken tool copy-link URLs, a slow database query for fetching private role user emails, atomicity issues when pulling files into the object store cache, improper handling of aborted requests, and correct deletion of dataset collections when purging a history. On the client side, the Backbone and Underscore JavaScript dependencies were removed, and several Python and JavaScript dependencies (lodash, aiohttp, pygments, fastmcp) were updated. A new `bwa_index` datatype was added, and fixes addressed S3 multipart upload threading, workflow scheduling when collections have unresolved file extensions, and timestamp parsing in job import/export.

### usegalaxy-playbook
The repository had one merged pull request this week, which updated the blocklist. This likely involves changes to a list of blocked users, tools, or resources used in the Galaxy server deployment configuration.

### gxformat2
This week, the gxformat2 repository received updates to its documentation styling, including a modernized look, mermaid diagram support, and improved rendering of schema files. A significant portion of the Python test suite was refactored to be more declarative and interoperable, with test infrastructure extracted into a dedicated `gxformat2.testing` module. Several dependency and CI bumps were also merged (Pygments, codecov-action, upload/download-artifact), and two new issues were opened related to strict schema structure support and a field inconsistency in a Galaxy workflow file.

### iwc
The repository merged a fix for the VGP (Vertebrate Genomes Project) pipeline 8, addressing a problem with the removal of duplicate sequences. An issue related to running workflows from iwc.galaxyproject.org was also closed.

### usegalaxy-tools
This week, the usegalaxy-tools repository merged three pull requests: installer instructions were added to the README, OMERO tools were added to the main tool list, and the newest version of kegalign was included. Two issues were opened—one reporting a dependency problem with the plant_tribes_gene_family_classifier tool (version 1.0.3.0), and another requesting increased memory allocation for sinto_barcode (version 0.10.1+galaxy0).

### brc-analytics
This week, the brc-analytics repository added support for FASTA collections as workflow parameters and introduced a stub for integrating lexicmap and logan workflows. A backend fix pinned the sentry-sdk and pydantic-ai dependencies, and the version was bumped to 0.26.0. Four issues were closed, covering FASTA collection support, workflow scope annotation, E2E test improvements, and Grafana visualizations for workflow landing metrics.

### tools-iuc
This week, the tools-iuc repository updated several existing tools: SexDetERRmine gained MultiQC JSON output, BBDuk added entropy filtering support, and MultiQC received new plugins for AdapterRemoval, mapDamage, Preseq, and others. A new toolset for ANGSD nuclear contamination estimation was added, and mist_typing was updated from version 1.1.0 to 1.2.0. One issue related to usage problems with downloaded SnpEff 5.N databases was closed.

### wheelforge
A pull request was merged to build free-threaded Python 3.14t wheels for the pysam library. This adds support for the experimental free-threaded build of CPython 3.14, which allows running Python without the Global Interpreter Lock (GIL). No other changes were made to the repository this week.

### training-material
This week's changes to the Galaxy Training Material repository were primarily administrative and maintenance-related. Grant and funding information was updated, including the addition of the ELIXIR-STEERS grant and new ecology funding for a contributor. Several technical updates were also made, including fixes to a deploy error, updates to WorkflowHub IDs, persistent URLs, and cached commit data.

### gxabm
A new command was added to download exported histories, and a bug was fixed where the tool returned dataset collections from deleted or purged histories. The issue about `find_collection_id` selecting collections from deleted/purged histories was reported and resolved within the same week.

### galaxy_codex
A user reported that the Galaxy Codex is not updating due to an API issue with WorkflowHub. No other new issues or changes were recorded for the repository this week.

### idc
One issue was opened and closed this week regarding missing reference data for the funannotate tool. No other activity was recorded in the repository during this period.


## Merged Pull Requests

### brc-analytics
- [fix(backend): pin sentry-sdk and pydantic-ai](https://github.com/galaxyproject/brc-analytics/pull/1223) by @dannon
- [feat: stub for lexicmap and logan workflows integration](https://github.com/galaxyproject/brc-analytics/pull/1221) by @d-callan
- [feat: add fasta collection support for workflow params](https://github.com/galaxyproject/brc-analytics/pull/1220) by @d-callan
- [chore: bump version to 0.26.0](https://github.com/galaxyproject/brc-analytics/pull/1218) by @github-actions[bot]

### galaxy
- [&#91;26.0&#93; Fix Content-Disposition header with trailing whitespace](https://github.com/galaxyproject/galaxy/pull/22379) by @mvdbeek
- [&#91;26.0&#93; Don't retry JobNotReadyException in job destination mapping](https://github.com/galaxyproject/galaxy/pull/22377) by @mvdbeek
- [Merge 26.0 into dev](https://github.com/galaxyproject/galaxy/pull/22373) by @mvdbeek
- [&#91;25.1&#93; Fix timestamp parsing in job import/export](https://github.com/galaxyproject/galaxy/pull/22372) by @mvdbeek
- [Merge 26.0 into dev](https://github.com/galaxyproject/galaxy/pull/22368) by @mvdbeek
- [Bump lodash from 4.17.21 to 4.18.1 in /client](https://github.com/galaxyproject/galaxy/pull/22365) by @dependabot[bot]
- [Bump aiohttp from 3.13.3 to 3.13.4 in /lib/galaxy/dependencies](https://github.com/galaxyproject/galaxy/pull/22363) by @dependabot[bot]
- [Remove backbone dependency from client](https://github.com/galaxyproject/galaxy/pull/22357) by @dannon
- [s3 multipart upload thread fix](https://github.com/galaxyproject/galaxy/pull/22356) by @martenson
- [Remove direct underscore dependency from client](https://github.com/galaxyproject/galaxy/pull/22355) by @dannon
- [&#91;26.0&#93; Throw RequestAbortedError instead of returning undefined](https://github.com/galaxyproject/galaxy/pull/22352) by @mvdbeek
- [&#91;26.0&#93; Harden API parameter validation](https://github.com/galaxyproject/galaxy/pull/22351) by @mvdbeek
- [&#91;26.0&#93; Backport: Fix tool discovery help data race condition and stale results](https://github.com/galaxyproject/galaxy/pull/22340) by @mvdbeek
- [&#91;26.0&#93; Fix tool "Copy Link" generating broken /root?tool_id= URLs](https://github.com/galaxyproject/galaxy/pull/22339) by @mvdbeek
- [Bump fastmcp from 3.1.0 to 3.2.0 in /lib/galaxy/dependencies](https://github.com/galaxyproject/galaxy/pull/22334) by @dependabot[bot]
- [&#91;25.1&#93; Discard rest of line in chunks in iter_start_of_line](https://github.com/galaxyproject/galaxy/pull/22332) by @mvdbeek
- [&#91;26.0&#93; Fix AbortSignal being serialized as dataset view query parameter](https://github.com/galaxyproject/galaxy/pull/22326) by @mvdbeek
- [&#91;26.0&#93; Ignore aborted requests in rethrowSimple](https://github.com/galaxyproject/galaxy/pull/22325) by @mvdbeek
- [&#91;26.0&#93; Handle inaccessible history errors in route-level components](https://github.com/galaxyproject/galaxy/pull/22323) by @mvdbeek
- [&#91;26.0&#93; Mark dataset collections as deleted when purging a history](https://github.com/galaxyproject/galaxy/pull/22315) by @mvdbeek
- [&#91;26.0&#93; Strip content-length and accept-ranges headers from proxied streaming responses](https://github.com/galaxyproject/galaxy/pull/22314) by @mvdbeek
- [Add bwa_index datatype](https://github.com/galaxyproject/galaxy/pull/22310) by @Delphine-L
- [Bump pygments from 2.19.2 to 2.20.0 in /lib/galaxy/dependencies](https://github.com/galaxyproject/galaxy/pull/22308) by @dependabot[bot]
- [&#91;26.0&#93; Fix slow get_private_role_user_emails_dict query](https://github.com/galaxyproject/galaxy/pull/22307) by @mvdbeek
- [Bump codecov/codecov-action from 5 to 6](https://github.com/galaxyproject/galaxy/pull/22306) by @dependabot[bot]
- [&#91;26.0&#93; Fix atomicity issues when pulling files into object store cache](https://github.com/galaxyproject/galaxy/pull/22304) by @mvdbeek
- [&#91;26.0&#93; Delay workflow scheduling when collection has unresolved 'auto' extension](https://github.com/galaxyproject/galaxy/pull/22303) by @mvdbeek
- [&#91;26.0&#93; Skip WorkflowHub tests when workflowhub.eu is down](https://github.com/galaxyproject/galaxy/pull/22302) by @mvdbeek
- [Fix flaky selenium tests &#96;&#96;test_refresh_preserves_state&#96;&#96;, and&#96;&#96;test_tool_discovery_landing&#96;&#96;](https://github.com/galaxyproject/galaxy/pull/22301) by @mvdbeek
- [&#91;26.0&#93; Downgrade authnz OAuth callback errors from ERROR/EXCEPTION to WARNING](https://github.com/galaxyproject/galaxy/pull/22300) by @mvdbeek
- [&#91;26.0&#93; Improve timeout and error handling in &#96;&#96;/api/proxy&#96;&#96; endpoint](https://github.com/galaxyproject/galaxy/pull/22297) by @mvdbeek
- [&#91;26.0&#93; Fix AttributeError when anonymous user searches workflows with &#96;&#96;is:bookmarked&#96;&#96;](https://github.com/galaxyproject/galaxy/pull/22296) by @mvdbeek

### galaxy-hub
- [Add ELIXIR-STEERS funding to 3 news articles](https://github.com/galaxyproject/galaxy-hub/pull/3895) by @nsoranzo
- [Add event for DOMPS symposium talk on 26.03.26](https://github.com/galaxyproject/galaxy-hub/pull/3894) by @anuprulez
- [Sync: Update files from training-material](https://github.com/galaxyproject/galaxy-hub/pull/3893) by @github-actions[bot]
- [Sync: Update files from training-material](https://github.com/galaxyproject/galaxy-hub/pull/3891) by @github-actions[bot]
- [Update gcc](https://github.com/galaxyproject/galaxy-hub/pull/3890) by @tcollins2011
- [Add info about NGS symposium at DKFZ](https://github.com/galaxyproject/galaxy-hub/pull/3888) by @wm75
- [Sync: Update files from training-material](https://github.com/galaxyproject/galaxy-hub/pull/3887) by @github-actions[bot]
- [🇪🇺  Add warning: missing way to move data short term → long term storage](https://github.com/galaxyproject/galaxy-hub/pull/3884) by @mira-miracoli

### gxabm
- [History download command](https://github.com/galaxyproject/gxabm/pull/330) by @ksuderman
- [Don't return deleted dataset collections](https://github.com/galaxyproject/gxabm/pull/329) by @ksuderman

### gxformat2
- [Add sphinxcontrib-mermaid to docs requirements](https://github.com/galaxyproject/gxformat2/pull/183) by @jmchilton
- [Improve rendering of schema files post Galaxy-Modern-Style refactor.](https://github.com/galaxyproject/gxformat2/pull/182) by @jmchilton
- [More declarative testing...](https://github.com/galaxyproject/gxformat2/pull/179) by @jmchilton
- [Mermaid docs](https://github.com/galaxyproject/gxformat2/pull/177) by @jmchilton
- [Modernize Doc Styling](https://github.com/galaxyproject/gxformat2/pull/176) by @jmchilton
- [CLI Tweaks](https://github.com/galaxyproject/gxformat2/pull/175) by @jmchilton
- [Extract declarative test harness into gxformat2.testing, rename test file](https://github.com/galaxyproject/gxformat2/pull/174) by @jmchilton
- [Migrate a Bunch of Python Testing to be More Declarative/Interoparble](https://github.com/galaxyproject/gxformat2/pull/173) by @jmchilton
- [Bump pygments from 2.19.2 to 2.20.0](https://github.com/galaxyproject/gxformat2/pull/171) by @dependabot[bot]
- [Bump actions/download-artifact from 7 to 8](https://github.com/galaxyproject/gxformat2/pull/170) by @dependabot[bot]
- [Bump codecov/codecov-action from 5 to 6](https://github.com/galaxyproject/gxformat2/pull/169) by @dependabot[bot]
- [Bump actions/upload-artifact from 6 to 7](https://github.com/galaxyproject/gxformat2/pull/168) by @dependabot[bot]

### iwc
- [VGP 8 - Fix removal of duplicates](https://github.com/galaxyproject/iwc/pull/1196) by @Delphine-L

### tools-iuc
- [Update SexDetERRmine: Add MultiQC JSON output format](https://github.com/galaxyproject/tools-iuc/pull/7851) by @mertydn
- [Update BBTools: Add entropy filtering support to BBDuk](https://github.com/galaxyproject/tools-iuc/pull/7849) by @mertydn
- [Update MultiQC with new plugins (AdapterRemoval, mapDamage, Preseq, S…](https://github.com/galaxyproject/tools-iuc/pull/7848) by @mertydn
- [Add ANGSD nuclear contamination tools](https://github.com/galaxyproject/tools-iuc/pull/7847) by @mertydn
- [Updating tools/mist_typing from version 1.1.0 to 1.2.0](https://github.com/galaxyproject/tools-iuc/pull/7843) by @gxydevbot

### training-material
- [Add ELIXIR-STEERS grant](https://github.com/galaxyproject/training-material/pull/6758) by @nsoranzo
- [Update ORGANISATIONS.yaml add funding for moorev ia ecology](https://github.com/galaxyproject/training-material/pull/6755) by @yvanlebras
- [Update WorkflowHub IDs](https://github.com/galaxyproject/training-material/pull/6754) by @github-actions[bot]
- [Fix deploy error](https://github.com/galaxyproject/training-material/pull/6752) by @shiltemann
- [Update Cached Commit Data](https://github.com/galaxyproject/training-material/pull/6751) by @github-actions[bot]
- [Update Persistent uniform resource locators](https://github.com/galaxyproject/training-material/pull/6750) by @github-actions[bot]

### usegalaxy-playbook
- [update blocklist](https://github.com/galaxyproject/usegalaxy-playbook/pull/447) by @github-actions[bot]

### usegalaxy-tools
- [Add installer instructions to README](https://github.com/galaxyproject/usegalaxy-tools/pull/1437) by @natefoo
- [Add OMERO tools to main](https://github.com/galaxyproject/usegalaxy-tools/pull/1436) by @jdavcs
- [adding newest version of kegalign](https://github.com/galaxyproject/usegalaxy-tools/pull/1434) by @richard-burhans

### wheelforge
- [Build free-threaded cp314t pysam wheels](https://github.com/galaxyproject/wheelforge/pull/65) by @nsoranzo

## New Issues

### brc-analytics
- [add support for fasta collections as workflow params](https://github.com/galaxyproject/brc-analytics/issues/1219) by @d-callan
- [add workflow scope annotation](https://github.com/galaxyproject/brc-analytics/issues/1217) by @d-callan

### galaxy
- [LocalProtocolError: Illegal header value b'attachment; filename="Galaxy102-&#91;HUYSR1_FKDN230314705-1A_22C22WLT3_L5_2.fq-002.gz&#93;.fastqsanger.gz "; filename*=UTF-8\'\'Galaxy102-%5BHUYSR1_FKDN230314705-1A_22C22WLT3_L5_2.fq-002.gz%5D.fastqsanger.gz '](https://github.com/galaxyproject/galaxy/issues/22378) by @galaxyproject-sentryintegration[bot]
- [JobNotReadyException](https://github.com/galaxyproject/galaxy/issues/22376) by @galaxyproject-sentryintegration[bot]
- [current dev DB version cannot downgrade to release_25.1](https://github.com/galaxyproject/galaxy/issues/22370) by @martenson
- [FileNotFoundError: &#91;Errno 2&#93; No such file or directory: '/corral4/main/jobs/075/846/75846651/metadata/outputs_populated/datasets_attrs.txt'](https://github.com/galaxyproject/galaxy/issues/22371) by @galaxyproject-sentryintegration[bot]
- [KeyError: '...�etc�passwd'](https://github.com/galaxyproject/galaxy/issues/22341) by @galaxyproject-sentryintegration[bot]
- [AttributeError: 'str' object has no attribute 'get'](https://github.com/galaxyproject/galaxy/issues/22344) by @galaxyproject-sentryintegration[bot]
- [ValueError: time data '07:10:00' does not match format '%Y-%m-%dT%H:%M:%S.%fZ'](https://github.com/galaxyproject/galaxy/issues/22343) by @galaxyproject-sentryintegration[bot]
- [UnicodeDecodeError: 'utf-8' codec can't decode byte 0xc0 in position 6: invalid start byte](https://github.com/galaxyproject/galaxy/issues/22342) by @galaxyproject-sentryintegration[bot]
- [StatementError: (builtins.ValueError) badly formed hexadecimal UUID string](https://github.com/galaxyproject/galaxy/issues/22346) by @galaxyproject-sentryintegration[bot]
- [InternalServerError: Problem listing file source path gxfiles://stock_httphttp://dicrpdbjmemujemfyopp.zzz/yrphmgdpgulaszriylqiipemefmacafkxycjaxjs?.jpg](https://github.com/galaxyproject/galaxy/issues/22345) by @galaxyproject-sentryintegration[bot]
- [ReferenceDataError: Data tables not found for fasta_indexes for 1](https://github.com/galaxyproject/galaxy/issues/22349) by @galaxyproject-sentryintegration[bot]
- [TypeError: ToolsController.create() missing 1 required positional argument: 'payload'](https://github.com/galaxyproject/galaxy/issues/22348) by @galaxyproject-sentryintegration[bot]
- [AttributeError: 'NoneType' object has no attribute 'id'](https://github.com/galaxyproject/galaxy/issues/22347) by @galaxyproject-sentryintegration[bot]
- [ValueError: invalid literal for int() with base 10: b'file'](https://github.com/galaxyproject/galaxy/issues/22350) by @galaxyproject-sentryintegration[bot]
- [Tool links are not working (404)](https://github.com/galaxyproject/galaxy/issues/22338) by @kostrykin
- [LocalProtocolError: Too little data for declared Content-Length](https://github.com/galaxyproject/galaxy/issues/22313) by @galaxyproject-sentryintegration[bot]
- [potentially pointless threading in S3 objectstore](https://github.com/galaxyproject/galaxy/issues/22321) by @martenson
- [AttributeError: 'NoneType' object has no attribute 'dataset'](https://github.com/galaxyproject/galaxy/issues/22369) by @galaxyproject-sentryintegration[bot]
- [The issue of not being able to display in real-time in the history panel](https://github.com/galaxyproject/galaxy/issues/22364) by @fengtong2018
- [AttributeError: 'NoneType' object has no attribute 'state'](https://github.com/galaxyproject/galaxy/issues/22359) by @galaxyproject-sentryintegration[bot]
- [Unify url_for to resolve both FastAPI and WSGI routes](https://github.com/galaxyproject/galaxy/issues/22354) by @mvdbeek
- [TypeError: DatasetInterface.get_metadata_file() missing 2 required positional arguments: 'hda_id' and 'metadata_name'](https://github.com/galaxyproject/galaxy/issues/22353) by @galaxyproject-sentryintegration[bot]
- [&#96;util.iter_start_of_line()&#96; still reads entire lines into memory](https://github.com/galaxyproject/galaxy/issues/22331) by @natefoo
- [Jupyter IT runtimes updating](https://github.com/galaxyproject/galaxy/issues/22337) by @neoformit
- [TPV rule: TypeError: 'HistoryDatasetCollectionAssociation' object is not iterable](https://github.com/galaxyproject/galaxy/issues/22298) by @galaxyproject-sentryintegration[bot]
- [Fix Workflow Invocation View Header wrapping](https://github.com/galaxyproject/galaxy/issues/22329) by @ahmedhamidawan
- [History purge does not cascade to dataset collections](https://github.com/galaxyproject/galaxy/issues/22312) by @ksuderman
- [Add GAlert component that replaces the existing &#96;components/Alert.vue&#96; and all BAlerts](https://github.com/galaxyproject/galaxy/issues/22328) by @ahmedhamidawan
- [Error: Request aborted](https://github.com/galaxyproject/galaxy/issues/22324) by @galaxyproject-sentryintegration[bot]
- [Add tool deprecation infrastructure](https://github.com/galaxyproject/galaxy/issues/22318) by @mvdbeek
- [Error: Failed to fetch](https://github.com/galaxyproject/galaxy/issues/22322) by @galaxyproject-sentryintegration[bot]
- [SyntaxError: Failed to execute 'appendChild' on 'Node': Identifier 'enableDebug' has already been declared](https://github.com/galaxyproject/galaxy/issues/22319) by @galaxyproject-sentryintegration[bot]
- [TypeError: Cannot read properties of undefined (reading 'startsWith')](https://github.com/galaxyproject/galaxy/issues/22316) by @galaxyproject-sentryintegration[bot]
- [Downgrade authnz OAuth callback errors from ERROR/EXCEPTION to WARNING](https://github.com/galaxyproject/galaxy/issues/22299) by @mvdbeek
- [Show guidance when first opening workflow run form](https://github.com/galaxyproject/galaxy/issues/22305) by @mvdbeek

### galaxy_codex
- [Codex not updating, API issue with workflowHub](https://github.com/galaxyproject/galaxy_codex/issues/648) by @scorreard

### gxabm
- [find_collection_id selects collections from deleted/purged histories](https://github.com/galaxyproject/gxabm/issues/328) by @ksuderman

### gxformat2
- [Strict structure support: extra="ignore" on normalized models, strict_structure param](https://github.com/galaxyproject/gxformat2/issues/178) by @jmchilton
- [real-multi-data-input.ga has step-level 'optional' field not in native schema](https://github.com/galaxyproject/gxformat2/issues/172) by @jmchilton

### idc
- [funannotate missing reference data](https://github.com/galaxyproject/idc/issues/86) by @scottcain

### usegalaxy-tools
- [Dependency issue plant_tribes_gene_family_classifier/1.0.3.0](https://github.com/galaxyproject/usegalaxy-tools/issues/1438) by @jennaj
- [Request: increase memory allocation for sinto_barcode/0.10.1+galaxy0](https://github.com/galaxyproject/usegalaxy-tools/issues/1435) by @jennaj

## Closed Issues

### brc-analytics
- [add support for fasta collections as workflow params](https://github.com/galaxyproject/brc-analytics/issues/1219)
- [add workflow scope annotation](https://github.com/galaxyproject/brc-analytics/issues/1217)
- [Improve E2E tests](https://github.com/galaxyproject/brc-analytics/issues/1167)
- [Build Grafana visualizations for workflow landing metrics](https://github.com/galaxyproject/brc-analytics/issues/1133)

### galaxy
- [FileNotFoundError: &#91;Errno 2&#93; No such file or directory: '/corral4/main/jobs/075/846/75846651/metadata/outputs_populated/datasets_attrs.txt'](https://github.com/galaxyproject/galaxy/issues/22371)
- [KeyError: '...�etc�passwd'](https://github.com/galaxyproject/galaxy/issues/22341)
- [AttributeError: 'str' object has no attribute 'get'](https://github.com/galaxyproject/galaxy/issues/22344)
- [ValueError: time data '07:10:00' does not match format '%Y-%m-%dT%H:%M:%S.%fZ'](https://github.com/galaxyproject/galaxy/issues/22343)
- [UnicodeDecodeError: 'utf-8' codec can't decode byte 0xc0 in position 6: invalid start byte](https://github.com/galaxyproject/galaxy/issues/22342)
- [StatementError: (builtins.ValueError) badly formed hexadecimal UUID string](https://github.com/galaxyproject/galaxy/issues/22346)
- [InternalServerError: Problem listing file source path gxfiles://stock_httphttp://dicrpdbjmemujemfyopp.zzz/yrphmgdpgulaszriylqiipemefmacafkxycjaxjs?.jpg](https://github.com/galaxyproject/galaxy/issues/22345)
- [ReferenceDataError: Data tables not found for fasta_indexes for 1](https://github.com/galaxyproject/galaxy/issues/22349)
- [TypeError: ToolsController.create() missing 1 required positional argument: 'payload'](https://github.com/galaxyproject/galaxy/issues/22348)
- [AttributeError: 'NoneType' object has no attribute 'id'](https://github.com/galaxyproject/galaxy/issues/22347)
- [ValueError: invalid literal for int() with base 10: b'file'](https://github.com/galaxyproject/galaxy/issues/22350)
- [Tool links are not working (404)](https://github.com/galaxyproject/galaxy/issues/22338)
- [LocalProtocolError: Too little data for declared Content-Length](https://github.com/galaxyproject/galaxy/issues/22313)
- [potentially pointless threading in S3 objectstore](https://github.com/galaxyproject/galaxy/issues/22321)
- [Pick parameter fails if connected to nest collection](https://github.com/galaxyproject/galaxy/issues/22080)
- [Slow DB Query](https://github.com/galaxyproject/galaxy/issues/20469)
- [&#96;util.iter_start_of_line()&#96; still reads entire lines into memory](https://github.com/galaxyproject/galaxy/issues/22331)
- [Jupyter IT runtimes updating](https://github.com/galaxyproject/galaxy/issues/22337)
- [TPV rule: TypeError: 'HistoryDatasetCollectionAssociation' object is not iterable](https://github.com/galaxyproject/galaxy/issues/22298)
- [History purge does not cascade to dataset collections](https://github.com/galaxyproject/galaxy/issues/22312)
- [Add support for Python 3.14](https://github.com/galaxyproject/galaxy/issues/20691)
- [Add support for Hashicorp Vault token renewal](https://github.com/galaxyproject/galaxy/issues/22187)
- [Failed to schedule WorkflowInvocation&#91;id=955254&#93; for Workflow&#91;id=698747,name=pRESTO NEBNext Immune Sequencing Kit Workflow v3.2.1 (imported from uploaded file)&#93;, problem occurred on WorkflowStep&#91;index=6,type=tool,label=None,uuid=9d908404-a8f9-42d4-8058-...](https://github.com/galaxyproject/galaxy/issues/22261)
- [Downgrade authnz OAuth callback errors from ERROR/EXCEPTION to WARNING](https://github.com/galaxyproject/galaxy/issues/22299)
- [Exception: Problem applying regular expression &#91;(.*?)_L(.*)&#93; to &#91;STH_1898_35-fz-F1_S49&#93;.](https://github.com/galaxyproject/galaxy/issues/22100)
- [Exception: Request error:](https://github.com/galaxyproject/galaxy/issues/22293)
- [AttributeError: 'NoneType' object has no attribute 'id'](https://github.com/galaxyproject/galaxy/issues/22292)
- [AttributeError: 'NoneType' object has no attribute '_repository_dir'](https://github.com/galaxyproject/galaxy/issues/22126)
- [TypeError: 'DatasetCollectionElement' object is not iterable](https://github.com/galaxyproject/galaxy/issues/22099)
- [InvalidRequestError: A transaction is already begun on this Session.](https://github.com/galaxyproject/galaxy/issues/22269)

### gxabm
- [Download an exported history](https://github.com/galaxyproject/gxabm/issues/327)
- [find_collection_id selects collections from deleted/purged histories](https://github.com/galaxyproject/gxabm/issues/328)

### gxformat2
- [Establish and Document Best Practices for Uniform Workflow Reasoning](https://github.com/galaxyproject/gxformat2/issues/155)

### idc
- [funannotate missing reference data](https://github.com/galaxyproject/idc/issues/86)

### iwc
- [Issue when running from iwc.galaxyproject.org](https://github.com/galaxyproject/iwc/issues/1175)

### tools-iuc
- [Usage issues with downloaded snpeff 5.N databases ORG and EU](https://github.com/galaxyproject/tools-iuc/issues/6956)

---
*Generated automatically on 2026-04-05 09:31 UTC*