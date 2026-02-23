---
title: 'Galactic Weekly: Week 7, 2026'
date: '2026-02-15'
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
- **Repositories with activity:** 14
- **New issues:** 30
- **Issues closed:** 35
- **PRs opened:** 124
- **PRs merged:** 79
- **Contributors:** 50


### Highlights

This week, the Galaxy Project merged 79 pull requests across 14 repositories with contributions from 50 developers. The main Galaxy repository received 28 pull requests focused on migrating user interface components from BTable to GTable, fixing crashes on macOS and AWS Batch systems, and updating security dependencies. The team updated personnel information and improved search functionality on the Galaxy hub website, while tools received bug fixes and new file format support including CRAM files for genomic analysis. Training materials were updated with maintenance fixes and new instructor resources.


## Most Active Repositories

| Repository | PRs Opened | PRs Merged | Issues Opened | Issues Closed |
|------------|------------|------------|---------------|---------------|
| [galaxy](https://github.com/galaxyproject/galaxy) | 45 | 28 | 16 | 16 |
| [galaxy-hub](https://github.com/galaxyproject/galaxy-hub) | 29 | 26 | 1 | 1 |
| [tools-iuc](https://github.com/galaxyproject/tools-iuc) | 17 | 9 | 5 | 14 |
| [training-material](https://github.com/galaxyproject/training-material) | 9 | 5 | 2 | 1 |
| [brc-analytics](https://github.com/galaxyproject/brc-analytics) | 4 | 3 | 1 | 2 |
| [galaxy_codex](https://github.com/galaxyproject/galaxy_codex) | 5 | 3 | 1 | 0 |
| [usegalaxy-tools](https://github.com/galaxyproject/usegalaxy-tools) | 5 | 2 | 0 | 0 |
| [iwc](https://github.com/galaxyproject/iwc) | 4 | 1 | 0 | 0 |
| [galaxy-mcp](https://github.com/galaxyproject/galaxy-mcp) | 3 | 1 | 0 | 0 |
| [infrastructure-playbook](https://github.com/galaxyproject/infrastructure-playbook) | 1 | 1 | 0 | 0 |


## Repository Summaries

### iwc
This week, the Galaxy Project's "iwc" repository had one merged pull request that simplified and updated the influenza workflow. The changes streamlined the existing workflow used for influenza analysis within the Galaxy platform.

### training-material
The Galaxy Project's training-material repository received several maintenance updates this week, including fixes to persistent URLs, addition of an instructor Google form link, and dependency updates for axios and AWS credentials configuration. One FAQ issue regarding dataset collections was reported and quickly resolved, while a new issue was opened about missing training examples in the BiaPy library.

### usegalaxy-tools
This week, the usegalaxy-tools repository had two changes merged. The kmindex tool was added to the assembly section, and IWC (Intergalactic Workflow Commission) tools were installed for cloud deployment scheduled for February 9, 2026.

### galaxy-mcp
This week, the Galaxy Project's "galaxy-mcp" repository had one merged pull request that fixed a version mismatch between the __init__.py file and pyproject.toml file, aligning both to version 1.3.0. This change ensures consistency in version numbering across the project's configuration files.

### galaxy-hub
The Galaxy Project hub repository received updates to personnel information, including additions of new team members (Martin Demko, vondrakis, martenson) and updates to existing members' LinkedIn, ResearchGate, and Google Scholar profiles. The team also implemented search functionality improvements by adding Pan-Galactic and publication search tabs, fixed various display issues including video display and logo problems, and synchronized training materials from external sources.

### infrastructure-playbook
This week, the Galaxy Project's infrastructure-playbook repository had one merged pull request that updated workflow landing metrics. The change appears to modify how metrics are collected or displayed for workflow landing pages within the Galaxy infrastructure.

### galaxy
This week, the Galaxy Project merged 28 pull requests focused on bug fixes, component migrations, and dependency updates across multiple version branches (25.0, 25.1, and 26.0). Key changes included migrating several UI components from BTable to GTable, fixing various crashes and errors (including worker segfaults on macOS, AWS Batch monitor crashes, and job destination handling issues), and updating dependencies like Pillow and cryptography. The project also addressed 16 reported issues while opening 16 new ones, with fixes covering areas like tool execution, workflow handling, user impersonation redirects, and upload functionality.

### tools-iuc
This week, the Galaxy Project's tools-iuc repository merged 9 pull requests that included bug fixes for several tools (haltools, Plasmidfinder, integron finder), added CRAM file support to deepvariant, updated ToolDistillator to version 1.0.5, and bumped the bamtools version. The team also closed 14 issues, resolving problems with deepvariant CRAM support, SAMtools citation lists, RAxML parameters, and various autoupdate errors.

### galaxy_codex
This week, the Galaxy Project's "galaxy_codex" repository received three updates: an automatic resources update, fixes to the lab population process and tools configuration file, and an upgrade of the Ruby setup action from version 1.287.0 to 1.288.0. A new issue was reported regarding the weekly resource fetching and community filtering process failing without proper error notifications during lab population.

### brc-analytics
The brc-analytics repository added Hi-C workflows and bumped to version 0.22.0. A bug was fixed that replaced duplicate version displays with an API status icon, and issues related to release notes link visibility and tag linking were resolved.

### planemo
This week, one new issue was opened in the Galaxy Project's planemo repository requesting improvements to the version linter functionality. No other development activity, pull requests, or releases occurred during this period. The repository had minimal activity with only this single issue submission.

### ansible-galaxy
This week, the Galaxy Project's ansible-galaxy repository had one issue closed related to an invalid conditional. No other specific changes or pull requests were mentioned in the provided activity summary.

### gxy.io
This week, one new issue was opened in the Galaxy Project's "gxy.io" repository requesting an upgrade to a newer runner. No other development activity or changes were recorded for the repository during this period.

### total-perspective-vortex
This week, two new issues were opened for the total-perspective-vortex Galaxy Project repository. Users reported problems with using directory sizes in datatable entries within TPV and identified a linting failure when resubmitting jobs with increased memory allocation after failures.


## Merged Pull Requests

### brc-analytics
- [feat: add hi-c workflows](https://github.com/galaxyproject/brc-analytics/pull/1142) by @d-callan
- [chore: bump version to 0.22.0](https://github.com/galaxyproject/brc-analytics/pull/1140) by @dannon
- [fix: replace duplicate version display with API status icon](https://github.com/galaxyproject/brc-analytics/pull/1139) by @dannon

### galaxy
- [[26.0] When getting tool by uuid, get that exact tool](https://github.com/galaxyproject/galaxy/pull/21844) by @mvdbeek
- [Migrate more E2E tests to be Playwright compatible. ](https://github.com/galaxyproject/galaxy/pull/21841) by @jmchilton
- [[25.1] Fix Galaxy UI nesting in data manager job info view](https://github.com/galaxyproject/galaxy/pull/21840) by @mvdbeek
- [[25.1] Add `builtin_converters` section to integrated tool panel](https://github.com/galaxyproject/galaxy/pull/21838) by @ahmedhamidawan
- [[25.1] Fix worker segfault in gunicorn preload mode on OSX](https://github.com/galaxyproject/galaxy/pull/21837) by @mvdbeek
- [Migrate admin components from BTable to GTable and Add stacked Style to GTable](https://github.com/galaxyproject/galaxy/pull/21836) by @itisAliRH
- [[26.0] Fix selenium test test_rename_history](https://github.com/galaxyproject/galaxy/pull/21835) by @davelopez
- [[26.0] Update ``get_definitions()`` to FastAPI 0.128.8](https://github.com/galaxyproject/galaxy/pull/21834) by @nsoranzo
- [[26.0] Adds badge to show if upload target history is current](https://github.com/galaxyproject/galaxy/pull/21830) by @davelopez
- [Various YAML Tool Hardening and Progress toward Tool State Goals](https://github.com/galaxyproject/galaxy/pull/21828) by @jmchilton
- [[25.1] Pin setuptools<82 for galaxy-files package - Backport #21824](https://github.com/galaxyproject/galaxy/pull/21826) by @nsoranzo
- [Bump pillow from 12.1.0 to 12.1.1 in /lib/galaxy/dependencies](https://github.com/galaxyproject/galaxy/pull/21825) by @dependabot[bot]
- [Pin setuptools<82 for galaxy-files package](https://github.com/galaxyproject/galaxy/pull/21824) by @jmchilton
- [Migrate Upload Components from BTable to GTable and Enhance Table Styling](https://github.com/galaxyproject/galaxy/pull/21820) by @itisAliRH
- [[25.0] Fix form number negative handling](https://github.com/galaxyproject/galaxy/pull/21819) by @davelopez
- [[25.1] Fix AWS Batch monitor crash, delete copied monitor method](https://github.com/galaxyproject/galaxy/pull/21818) by @mvdbeek
- [Bump cryptography from 46.0.4 to 46.0.5 in /lib/galaxy/dependencies](https://github.com/galaxyproject/galaxy/pull/21815) by @dependabot[bot]
- [[25.1] Allow workflow download with missing file source references](https://github.com/galaxyproject/galaxy/pull/21814) by @mvdbeek
- [[25.1] Make database heartbeat more robust (backport)](https://github.com/galaxyproject/galaxy/pull/21812) by @mvdbeek
- [[26.0] Fix redirect upon impersonation](https://github.com/galaxyproject/galaxy/pull/21810) by @guerler
- [[26.0] Avoid slash duplication in display application urls](https://github.com/galaxyproject/galaxy/pull/21809) by @guerler
- [Bump slackapi/slack-github-action from 2.0.0 to 2.1.1](https://github.com/galaxyproject/galaxy/pull/21803) by @dependabot[bot]
- [Migrate History Markdown Components to GComponents and GTable Enhancements ](https://github.com/galaxyproject/galaxy/pull/21800) by @itisAliRH
- [[26.0] Use 1-based step index in invocation metric UI](https://github.com/galaxyproject/galaxy/pull/21799) by @mvdbeek
- [[26.0] Fix passing invalid job_destination dict to JobState constructor](https://github.com/galaxyproject/galaxy/pull/21798) by @mvdbeek
- [[26.0] Fixes navigation back to added URLs in upload panel](https://github.com/galaxyproject/galaxy/pull/21796) by @davelopez
- [Add tool_source endpoint to tool shed API](https://github.com/galaxyproject/galaxy/pull/21794) by @mvdbeek
- [Fix transient failure in test_delete_dataset_from_storage_view](https://github.com/galaxyproject/galaxy/pull/21793) by @jmchilton

### galaxy-hub
- [Sync: Update files from training-material](https://github.com/galaxyproject/galaxy-hub/pull/3698) by @github-actions[bot]
- [Resize image for Image Analysis Community page](https://github.com/galaxyproject/galaxy-hub/pull/3695) by @dianichj
- [minor fix: video display and logo](https://github.com/galaxyproject/galaxy-hub/pull/3694) by @dianichj
- [Keep only minimal information about Freiburg alumni](https://github.com/galaxyproject/galaxy-hub/pull/3693) by @wm75
- [Minor Update: Image Analysis in Galaxy Community SIG page](https://github.com/galaxyproject/galaxy-hub/pull/3692) by @kostrykin
- [Sync: Update files from training-material](https://github.com/galaxyproject/galaxy-hub/pull/3691) by @github-actions[bot]
- [Search page styling and tab switch fix](https://github.com/galaxyproject/galaxy-hub/pull/3690) by @dannon
- [vondrakis coming in](https://github.com/galaxyproject/galaxy-hub/pull/3689) by @TomasVondrak
- [people.yaml update](https://github.com/galaxyproject/galaxy-hub/pull/3688) by @micoleaoo
- [Serve legacy static assets in Astro build](https://github.com/galaxyproject/galaxy-hub/pull/3687) by @dannon
- [Fix YAML parse error in people.yaml](https://github.com/galaxyproject/galaxy-hub/pull/3686) by @dannon
- [Bump axios from 1.8.2 to 1.13.5](https://github.com/galaxyproject/galaxy-hub/pull/3685) by @dependabot[bot]
- [Add Martin Demko to people.yaml](https://github.com/galaxyproject/galaxy-hub/pull/3684) by @martindemko
- [[astro] Fix project's Mastodon link](https://github.com/galaxyproject/galaxy-hub/pull/3681) by @wm75
- [Add Pan-Galactic and publication search tabs to /search](https://github.com/galaxyproject/galaxy-hub/pull/3680) by @dannon
- [Updated people yaml ](https://github.com/galaxyproject/galaxy-hub/pull/3679) by @dianichj
- [martenson coming in](https://github.com/galaxyproject/galaxy-hub/pull/3678) by @martenson
- [Update location and LinkedIn links in people.yaml](https://github.com/galaxyproject/galaxy-hub/pull/3677) by @pavanvidem
- [Update LinkedIn and ResearchGate links for nilchia](https://github.com/galaxyproject/galaxy-hub/pull/3676) by @nilchia
- [Add Google Scholar and ResearchGate links for Pavan](https://github.com/galaxyproject/galaxy-hub/pull/3675) by @pavanvidem
- [Update training more complete](https://github.com/galaxyproject/galaxy-hub/pull/3674) by @Marie59
- [Fix 2026-06-15-EMBL-EBI event index.md](https://github.com/galaxyproject/galaxy-hub/pull/3672) by @ahmedhamidawan
- [Add sitemap comparison script](https://github.com/galaxyproject/galaxy-hub/pull/3671) by @dannon
- [Add source blog annotations to former blog posts](https://github.com/galaxyproject/galaxy-hub/pull/3670) by @dannon
- [Add EventsList archive mode and subsite archive pages](https://github.com/galaxyproject/galaxy-hub/pull/3669) by @dannon
- [add training to cofest](https://github.com/galaxyproject/galaxy-hub/pull/3668) by @Marie59

### galaxy-mcp
- [Fix __init__.py version to match pyproject.toml (1.3.0)](https://github.com/galaxyproject/galaxy-mcp/pull/32) by @dannon

### galaxy_codex
- [Automatic resources update](https://github.com/galaxyproject/galaxy_codex/pull/599) by @github-actions[bot]
- [Fix populate labs and improve tools yml](https://github.com/galaxyproject/galaxy_codex/pull/598) by @paulzierep
- [Bump ruby/setup-ruby from 1.287.0 to 1.288.0](https://github.com/galaxyproject/galaxy_codex/pull/595) by @dependabot[bot]

### infrastructure-playbook
- [Workflow landing metrics update](https://github.com/galaxyproject/infrastructure-playbook/pull/57) by @d-callan

### iwc
- [Simplify and update the influenza workflow](https://github.com/galaxyproject/iwc/pull/1101) by @wm75

### tools-iuc
- [Fix deployment for haltools](https://github.com/galaxyproject/tools-iuc/pull/7673) by @SaimMomin12
- [deepvariant: add cram support](https://github.com/galaxyproject/tools-iuc/pull/7672) by @bernt-matthias
- [Fix linter problems for Plasmidfinder](https://github.com/galaxyproject/tools-iuc/pull/7669) by @bernt-matthias
- [small fixes for integron finder](https://github.com/galaxyproject/tools-iuc/pull/7668) by @bernt-matthias
- [Bump bamtools](https://github.com/galaxyproject/tools-iuc/pull/7667) by @bernt-matthias
- [Run fallback workflow only when main workflow does not run](https://github.com/galaxyproject/tools-iuc/pull/7665) by @bernt-matthias
- [Tesseract - link input file instead of saving path in a list](https://github.com/galaxyproject/tools-iuc/pull/7664) by @RZ9082
- [Fix mistakes in remote_repository_url](https://github.com/galaxyproject/tools-iuc/pull/7662) by @bernt-matthias
- [Update ToolDistillator Galaxy Version 1.0.4+galaxy0 to 1.0.5+galaxy0](https://github.com/galaxyproject/tools-iuc/pull/7661) by @clsiguret

### training-material
- [Update Persistent uniform resource locators](https://github.com/galaxyproject/training-material/pull/6647) by @github-actions[bot]
- [adding the link for the instructor google form](https://github.com/galaxyproject/training-material/pull/6644) by @scottcain
- [Bump axios from 1.12.1 to 1.13.5](https://github.com/galaxyproject/training-material/pull/6643) by @dependabot[bot]
- [Bump aws-actions/configure-aws-credentials from 5 to 6](https://github.com/galaxyproject/training-material/pull/6641) by @dependabot[bot]
- [Update Cached Commit Data](https://github.com/galaxyproject/training-material/pull/6640) by @github-actions[bot]

### usegalaxy-tools
- [add kmindex to assembly section](https://github.com/galaxyproject/usegalaxy-tools/pull/1358) by @Smeds
- [Install IWC tools for cloud 2026-02-09](https://github.com/galaxyproject/usegalaxy-tools/pull/1356) by @github-actions[bot]

## New Issues

### brc-analytics
- [de workflow stepper release](https://github.com/galaxyproject/brc-analytics/issues/1143) by @d-callan

### galaxy
- [Should the version command be allowed to fail](https://github.com/galaxyproject/galaxy/issues/21833) by @bernt-matthias
- [Beta upload flow should create dataset collections directly instead of separately](https://github.com/galaxyproject/galaxy/issues/21850) by @mvdbeek
- [Tool with optional credentials cannot be executed when no credentials group exists](https://github.com/galaxyproject/galaxy/issues/21848) by @RZ9082
- [Selected storage class not respected in some situations involving collections](https://github.com/galaxyproject/galaxy/issues/21846) by @wm75
- [Planning: Create `AbstractTool` class in `galaxy.tool_util` module](https://github.com/galaxyproject/galaxy/issues/21845) by @nsoranzo
- [Fix tool.parameters initialization.](https://github.com/galaxyproject/galaxy/issues/21843) by @jmchilton
- [History grid needs a bit of reworking](https://github.com/galaxyproject/galaxy/issues/21839) by @mvdbeek
- [Migrate file source plugins from `fs` to `fsspec`](https://github.com/galaxyproject/galaxy/issues/21832) by @nsoranzo
- [[Release Testing] Impersonation redirects to `/root` which doesn't exist on 26.0](https://github.com/galaxyproject/galaxy/issues/21801) by @mvdbeek
- [Failing Package Tests](https://github.com/galaxyproject/galaxy/issues/21823) by @jmchilton
- [User interface missing for creating list:record inputs](https://github.com/galaxyproject/galaxy/issues/21816) by @mvdbeek
- [Make uv run work from root](https://github.com/galaxyproject/galaxy/issues/21811) by @jmchilton
- [[Feature] Log out only current session when impersonating a user](https://github.com/galaxyproject/galaxy/issues/21813) by @ccoulombe
- [Tool output sharing apparently depends on input sharing (instead of history preferences)](https://github.com/galaxyproject/galaxy/issues/21802) by @bernt-matthias
- [Minus character can not be typed in float parameters](https://github.com/galaxyproject/galaxy/issues/21808) by @bernt-matthias
- [AttributeError: 'dict' object has no attribute 'resubmit'](https://github.com/galaxyproject/galaxy/issues/21795) by @galaxyproject-sentryintegration[bot]

### galaxy-hub
- [keep https://galaxyproject.org/use/?platform_group=public-servers working](https://github.com/galaxyproject/galaxy-hub/issues/3697) by @bgruening

### galaxy_codex
- [Weekly resource fetching and community filtering - Populate Lab - fails silently](https://github.com/galaxyproject/galaxy_codex/issues/597) by @paulzierep

### gxy.io
- [Upgrade to newer runner](https://github.com/galaxyproject/gxy.io/issues/115) by @natefoo

### planemo
- [Improve version linter](https://github.com/galaxyproject/planemo/issues/1613) by @bernt-matthias

### tools-iuc
- [Request: add Fur to microGalaxy](https://github.com/galaxyproject/tools-iuc/issues/7678) by @pvanbaarlen
- [Request: update picrust2 wrapper for picrust2-2.6.3](https://github.com/galaxyproject/tools-iuc/issues/7677) by @jennaj
- [Failing weekly tests](https://github.com/galaxyproject/tools-iuc/issues/7675) by @bernt-matthias
- [MEME-ChIP -> No route for /tools/tomtom](https://github.com/galaxyproject/tools-iuc/issues/7670) by @ccoulombe
- [Add samtools collate](https://github.com/galaxyproject/tools-iuc/issues/7671) by @SaimMomin12

### total-perspective-vortex
- [Use directory (datatable entries) sizes in TPV](https://github.com/galaxyproject/total-perspective-vortex/issues/183) by @bernt-matthias
- [resubmit with_more_mem_on_failure fails lint](https://github.com/galaxyproject/total-perspective-vortex/issues/182) by @tchaussepiedifb

### training-material
- [Training examples in the BiaPy library is missing](https://github.com/galaxyproject/training-material/issues/6646) by @rmassei
- [Out of date FAQ for dataset collections?](https://github.com/galaxyproject/training-material/issues/6645) by @scottcain

## Closed Issues

### ansible-galaxy
- [Invalid conditional](https://github.com/galaxyproject/ansible-galaxy/issues/230)

### brc-analytics
- [Fix release notes link visibility for unauthenticated users](https://github.com/galaxyproject/brc-analytics/issues/1129)
- [bug: current release isn't linked to tag](https://github.com/galaxyproject/brc-analytics/issues/588)

### galaxy
- [Disappearing “prepare_history_download” celery task](https://github.com/galaxyproject/galaxy/issues/21701)
- [Builtin converters not shown in tool panel views](https://github.com/galaxyproject/galaxy/issues/21767)
- [[Release Testing] Impersonation redirects to `/root` which doesn't exist on 26.0](https://github.com/galaxyproject/galaxy/issues/21801)
- [Upload performance with many small files](https://github.com/galaxyproject/galaxy/issues/21127)
- [Trigger export of workflow outputs or invocation from workflow](https://github.com/galaxyproject/galaxy/issues/21592)
- [Workflow referencing non-existent file source becomes inaccessible](https://github.com/galaxyproject/galaxy/issues/21732)
- [[Release Testing] Include subworkflow jobs in invocation metrics](https://github.com/galaxyproject/galaxy/issues/21784)
- [AttributeError: 'dict' object has no attribute 'resubmit'](https://github.com/galaxyproject/galaxy/issues/21795)
- [Kombu error](https://github.com/galaxyproject/galaxy/issues/21713)
- [25.1 disable_local_accounts does not disable registration link](https://github.com/galaxyproject/galaxy/issues/21741)
- [Workflow Rename Field Does Not Display Current Workflow Name on First Load](https://github.com/galaxyproject/galaxy/issues/21298)
- [25.0 upload does not respect sharing](https://github.com/galaxyproject/galaxy/issues/21536)
- [ValidationError: 5 validation errors for HelpForumSearchResponse](https://github.com/galaxyproject/galaxy/issues/21770)
- [/api/exports: AttributeError: 'str' object has no attribute 'get'](https://github.com/galaxyproject/galaxy/issues/21771)
- [ProgrammingError: (psycopg2.errors.DatatypeMismatch) column "on_complete" is of type json but expression is of type bytea](https://github.com/galaxyproject/galaxy/issues/21762)
- [activity bar wrongly shows interactive tools option](https://github.com/galaxyproject/galaxy/issues/21739)

### galaxy-hub
- [Add "supporters" and "funders"](https://github.com/galaxyproject/galaxy-hub/issues/3564)

### tools-iuc
- [Add cram support for deepvariant](https://github.com/galaxyproject/tools-iuc/issues/7244)
- [Add gitpod environment](https://github.com/galaxyproject/tools-iuc/issues/6111)
- [Make DeSeq2 workflow ready](https://github.com/galaxyproject/tools-iuc/issues/3613)
- [Does IUC needs a website?](https://github.com/galaxyproject/tools-iuc/issues/3987)
- [Missing paper from the SAMtools citation list](https://github.com/galaxyproject/tools-iuc/issues/5104)
- [-z parameter in RAxML, or new tool request: RAxML-NG](https://github.com/galaxyproject/tools-iuc/issues/6230)
- [IUC tool or not?](https://github.com/galaxyproject/tools-iuc/issues/6388)
- [Autoupdate errors](https://github.com/galaxyproject/tools-iuc/issues/6385)
- [Autoupdate errors](https://github.com/galaxyproject/tools-iuc/issues/6382)
- [Autoupdate errors](https://github.com/galaxyproject/tools-iuc/issues/6373)
- [Funannotate data manager links to BUSCOs are out of date](https://github.com/galaxyproject/tools-iuc/issues/6478)
- [Correction request: BWA-MEM2 wrappers failing metadata display in the tool shed](https://github.com/galaxyproject/tools-iuc/issues/6905)
- [Test release 25.1](https://github.com/galaxyproject/tools-iuc/issues/7346)
- [lastz with PAF output fails](https://github.com/galaxyproject/tools-iuc/issues/7630)

### training-material
- [Out of date FAQ for dataset collections?](https://github.com/galaxyproject/training-material/issues/6645)

---
*Generated automatically on 2026-02-16 01:15 UTC*