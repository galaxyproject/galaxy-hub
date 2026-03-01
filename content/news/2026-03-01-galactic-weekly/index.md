---
title: 'Galactic Weekly: Week 9, 2026'
date: '2026-03-01'
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
- **Repositories with activity:** 21
- **New issues:** 17
- **Issues closed:** 33
- **PRs opened:** 162
- **PRs merged:** 87
- **Contributors:** 49


### Highlights

This week, 49 contributors merged 87 pull requests and closed 33 issues across 21 repositories. The Galaxy server received bug fixes in the workflow editor, markdown rendering, and data handling, along with enforcing storage quotas for Celery-based fetch jobs and making Tool Shed 2 the default. The Galaxy Hub website continued its migration from Gridsome to Astro, with removal of old framework code, CI updates, and fixes for server-side rendering issues, alongside new content about Galaxy for particle accelerators and Jetstream2 genome assemblies. The Training Material repository updated several tutorials for Galaxy 25.1+ compatibility and usability, while tools-iuc updated packages including Cutadapt, HyPhy, PretextMap, and mosdepth, and the IWC repository updated the metagenomics genes catalogue and RNA-seq differential expression workflows.


## Most Active Repositories

| Repository | PRs Opened | PRs Merged | Issues Opened | Issues Closed |
|------------|------------|------------|---------------|---------------|
| [galaxy](https://github.com/galaxyproject/galaxy) | 48 | 22 | 6 | 17 |
| [galaxy-hub](https://github.com/galaxyproject/galaxy-hub) | 39 | 27 | 5 | 3 |
| [training-material](https://github.com/galaxyproject/training-material) | 12 | 10 | 1 | 5 |
| [tools-iuc](https://github.com/galaxyproject/tools-iuc) | 17 | 5 | 1 | 2 |
| [iwc](https://github.com/galaxyproject/iwc) | 12 | 4 | 0 | 1 |
| [usegalaxy-tools](https://github.com/galaxyproject/usegalaxy-tools) | 6 | 1 | 2 | 1 |
| [gxy.io](https://github.com/galaxyproject/gxy.io) | 3 | 3 | 0 | 0 |
| [galaxy_codex](https://github.com/galaxyproject/galaxy_codex) | 4 | 2 | 0 | 0 |
| [galaxy-skills](https://github.com/galaxyproject/galaxy-skills) | 3 | 2 | 0 | 0 |
| [gxformat2](https://github.com/galaxyproject/gxformat2) | 2 | 2 | 0 | 0 |


## Repository Summaries

### galaxy-hub
This week's work on galaxy-hub focused heavily on completing the migration from the Gridsome static site framework to Astro, including removing the old Gridsome site code, switching CI to Astro-only, and fixing several Vue server-side rendering hydration mismatches caused by date handling and apostrophes in titles. Infrastructure changes included renaming the default branch from `master` to `main`, adding CloudFront cache invalidation after S3 deploys, and enabling schema checking in CI. Content updates added news posts about Galaxy for particle accelerators and Jetstream2 genome assemblies, updated meeting details for the SPOC and Tool Development SIGs, added the microGalaxy roadmap, and included NFDI4BioImage annotations on news and events pages.

### training-material
This week, the Galaxy Training Material repository received updates to several tutorials, including clarifications about nested collections in Galaxy 25.1+, updates to the RStudio in Galaxy tutorial, and a new tip in the Mapping tutorial about setting dbkey for samtools stats. Infrastructure changes included a fix to avoid rendering empty tool install files and redirects for Hall of Fame pages. The repository also added a news item for a misconceptions paper, a recommendation on citing public workflows, and updated persistent URLs and cached commit data, while closing out several issues related to tutorial usability and tool install rendering.

### galaxy
This week's changes to the Galaxy repository included several bug fixes across the workflow editor, markdown rendering, and data handling—such as fixing infinite request loops in cached stores, correcting collection step rendering in reports and markdown, repairing the "Create New" workflow editor state reset, and fixing dbkey filtering when the dbkey is unset. Storage quotas are now enforced for Celery-based data fetch jobs, and the Tool Shed 2 was made the default, with legacy Shed tests removed from CI. Other updates improved filesystem path construction (using `os.path.join` or `pathlib.Path` instead of f-strings), added shared XML formatting utilities to galaxy-tool-util, and refined the Type and Reference selectors in the Upload Activity.

### gxformat2
This week, the gxformat2 repository merged two pull requests. One updated the `minimatch` dependency in the TypeScript portion of the project, and the other applied code formatting and linting to the Python codebase using the black and ruff tools.

### tools-iuc
This week, the tools-iuc repository merged five pull requests: a fix for Cutadapt's `--minimum-length` parameter default, a bug fix for HyPhy's annotate invert behavior, an update to PretextMap with a new `--highres` flag, a Galaxy version bump for ToolDistillator, and an update of mosdepth from version 0.3.12 to 0.3.13. One new issue was opened regarding Samtools Stats not showing reference genomes, and two issues were closed, including that same Samtools Stats issue and a kraken2 bug involving incorrect datatype assignments for zipped input datasets.

### galaxy-job-config-init
A pull request was merged that adds a `--local-workers` option, allowing users to specify the number of workers for the LocalJobRunner when generating Galaxy job configuration.

### brc-analytics
This week, the brc-analytics repository closed four issues covering several areas: adding support for creating social media posts using the galaxy-social bot, adding a file with a landing request, improving the reliability of ENA (European Nucleotide Archive) integration, and adding a visualization for the variant calling workflow.

### galaxy-language-server
This week, the repository updated the `minimatch` dependency in the client directory from version 3.1.2 to 3.1.4, addressing a known issue in that package. A separate pull request improved the setup process for the Python environment used by the project.

### iwc
Two dependency packages (lodash-es/mermaid and minimatch) were updated in the website directory. On the workflow side, the metagenomics genes catalogue workflow was updated, and the RNA-seq differential expression workflow was updated from version 0.7 to 0.8. A test release issue for version 26.0 was also closed.

### pulsar
A single pull request was merged this week, removing the project's dependencies on `distutils`, `pkg_resources`, and `stopit`. These are older or deprecated Python libraries, and their removal updates Pulsar's codebase to use more modern alternatives.

### galaxy-k8s-boot
A single pull request was merged this week, containing adjustments based on testing of the galaxy-k8s-boot project. The specific tweaks address issues found during testing, though the details of the changes were not elaborated in the pull request title.

### galaxy_codex
A new page was added with content for imaging.usegalaxy.org. The repository's resources were also updated through an automated process.

### usegalaxy-tools
A pull request was merged to add imaging tools from usegalaxy.eu to the repository. Two new requests were opened: one to increase compute resources for the optitype tool on usegalaxy.org, and another to install the qiime2 import-fastq tool on usegalaxy.org. A previously reported bug involving a permissions error in Funannotate predict was closed.

### galaxy-skills
Two pull requests were merged this week. One added a new "tool-selection-diagram" sub-skill to the tool-dev skill area. The other fixed and updated the hub-news-posts skill based on lessons learned from actually creating posts.

### gx-it-proxy
The Galaxy Project's gx-it-proxy repository had one pull request merged this week, which bumped the version of the "minimatch" dependency. This is a routine dependency update, likely to incorporate bug fixes or security patches from the newer version of the library.

### gxy.io
Three redirects and a new page were added this week. Redirects were set up for microbiology.usegalaxy.org and imaging.usegalaxy.org, and a welcome page was added for the Biodiversity lab.

### usegalaxy-playbook
A pull request was merged this week that adds an Imaging theme and a tool view panel to the usegalaxy-playbook repository. This change introduces a dedicated visual theme and curated tool panel for imaging-related workflows in Galaxy.

### total-perspective-vortex
A new issue was reported this week identifying a bug where linting fails for the `tool.tool_type` attribute. No other activity (pull requests, merges, or releases) was recorded for the repository during this period.

### gravity
Two pull requests were merged this week in the Gravity repository. One added a dispatch option based on the Gunicorn version, and the other fixed an issue with version checking.

### idc
A new issue was opened this week to discuss data documentation for the IDC (Intergalactic Data Commission) repository. No other activity such as pull requests, merges, or code changes was reported during this period.


## Merged Pull Requests

### galaxy
- [Use &#96;&#96;os.path.join()&#96;&#96; or &#96;&#96;pathlib.Path&#96;&#96; instead of f-strings for filesystem paths](https://github.com/galaxyproject/galaxy/pull/21954) by @nsoranzo
- [&#91;25.1&#93; Enforce storage quota for Celery-based data fetch jobs](https://github.com/galaxyproject/galaxy/pull/21941) by @mvdbeek
- [Updates config rebuild changes](https://github.com/galaxyproject/galaxy/pull/21940) by @davelopez
- [Fix workflow implicit mapping of flat collections over paired_or_unpaired](https://github.com/galaxyproject/galaxy/pull/21933) by @jmchilton
- [&#91;26.0&#93; Remove unused handle_tool_shed_url_protocol](https://github.com/galaxyproject/galaxy/pull/21925) by @mvdbeek
- [&#91;26.0&#93; Fix Pydantic UnsupportedFieldAttributeWarning for Field defaults in Annotated](https://github.com/galaxyproject/galaxy/pull/21923) by @mvdbeek
- [Make Shed 2 the Default - Drop Legacy Shed Tests in CI](https://github.com/galaxyproject/galaxy/pull/21922) by @jmchilton
- [Fix infinite request loops in cached stores with retry-aware error handling](https://github.com/galaxyproject/galaxy/pull/21920) by @dannon
- [Merge 26.0 into dev](https://github.com/galaxyproject/galaxy/pull/21919) by @ahmedhamidawan
- [&#91;25.1&#93; Fix "Create New" in workflow editor not resetting editor state](https://github.com/galaxyproject/galaxy/pull/21918) by @ahmedhamidawan
- [&#91;26.0&#93; Fix collection step Job markdown elements not rendering](https://github.com/galaxyproject/galaxy/pull/21917) by @ahmedhamidawan
- [Fix dbkey filter returning no options when dbkey unset](https://github.com/galaxyproject/galaxy/pull/21916) by @jmchilton
- [Fix tool.parameters initialization](https://github.com/galaxyproject/galaxy/pull/21914) by @mvdbeek
- [&#91;26.0&#93; Parse input collections as well in markdown editor](https://github.com/galaxyproject/galaxy/pull/21913) by @ahmedhamidawan
- [Bump minimatch from 10.2.0 to 10.2.2 in /client-api](https://github.com/galaxyproject/galaxy/pull/21910) by @dependabot[bot]
- [Render collections as images via the element picker in reports](https://github.com/galaxyproject/galaxy/pull/21909) by @ahmedhamidawan
- [&#91;25.1&#93; Ensure markdown elements do not render if argument is undefined](https://github.com/galaxyproject/galaxy/pull/21908) by @ahmedhamidawan
- [Converge framework workflow test syntax toward Planemo syntax](https://github.com/galaxyproject/galaxy/pull/21907) by @jmchilton
- [Improve Type and Reference selectors in Upload Activity](https://github.com/galaxyproject/galaxy/pull/21906) by @davelopez
- [Disallow gunicorn 25.1.0](https://github.com/galaxyproject/galaxy/pull/21905) by @nsoranzo
- [Add format_xml to galaxy-tool-util for shared XML formatting](https://github.com/galaxyproject/galaxy/pull/21903) by @dannon
- [&#91;26.0&#93; Backports: Return redirection instead of a JSON with the redirect URI](https://github.com/galaxyproject/galaxy/pull/21902) by @davelopez

### galaxy-hub
- [Update SPOC SIG with new meeting date and calendar](https://github.com/galaxyproject/galaxy-hub/pull/3774) by @pavanvidem
- [News - Galaxy for particle accelerators](https://github.com/galaxyproject/galaxy-hub/pull/3773) by @subindev-d
- [Update usegalaxy.fr citing link](https://github.com/galaxyproject/galaxy-hub/pull/3772) by @abretaud
- [Tool dev SIG: Update new meeting details](https://github.com/galaxyproject/galaxy-hub/pull/3770) by @SaimMomin12
- [fix community links on sub-pages](https://github.com/galaxyproject/galaxy-hub/pull/3769) by @bgruening
- [add Hall of Fame link to the Community section](https://github.com/galaxyproject/galaxy-hub/pull/3768) by @bgruening
- [this renders HoF text on top as markdown](https://github.com/galaxyproject/galaxy-hub/pull/3766) by @bgruening
- [Invalidate CloudFront cache after S3 deploy](https://github.com/galaxyproject/galaxy-hub/pull/3765) by @dannon
- [Fix Vue SSR hydration mismatch from apostrophes in titles](https://github.com/galaxyproject/galaxy-hub/pull/3761) by @dannon
- [Remove master branch triggers from workflows](https://github.com/galaxyproject/galaxy-hub/pull/3760) by @dannon
- [Prepare for master → main branch rename](https://github.com/galaxyproject/galaxy-hub/pull/3758) by @dannon
- [Add microGalaxy roadmap and adapt page for astro](https://github.com/galaxyproject/galaxy-hub/pull/3757) by @bebatut
- [Fix UTC date handling for hydration mismatches and feeds](https://github.com/galaxyproject/galaxy-hub/pull/3756) by @dannon
- [Sync: Update files from training-material](https://github.com/galaxyproject/galaxy-hub/pull/3754) by @github-actions[bot]
- [Add additional NFDI4BioImage annotation to news and events pages](https://github.com/galaxyproject/galaxy-hub/pull/3753) by @rmassei
- [Fix duplicate content ID warnings from Astro glob-loader](https://github.com/galaxyproject/galaxy-hub/pull/3752) by @dannon
- [Add news post: Jetstream2 + VGP genome assemblies](https://github.com/galaxyproject/galaxy-hub/pull/3750) by @nekrut
- [Update Galactic Weekly for 2026-W08](https://github.com/galaxyproject/galaxy-hub/pull/3749) by @nekrut
- [Fix date hydration mismatch on news/events pages](https://github.com/galaxyproject/galaxy-hub/pull/3746) by @dannon
- [Add NFDI4BioImage annotation to news and events pages](https://github.com/galaxyproject/galaxy-hub/pull/3744) by @dianichj
- [Refactor GTN import logic to improve PR existence checks](https://github.com/galaxyproject/galaxy-hub/pull/3743) by @arash77
- [remove old metadata, enable schema checking on CI](https://github.com/galaxyproject/galaxy-hub/pull/3740) by @bgruening
- [Sync: Update files from training-material](https://github.com/galaxyproject/galaxy-hub/pull/3739) by @github-actions[bot]
- [Include funding information in event index](https://github.com/galaxyproject/galaxy-hub/pull/3737) by @Sch-Da
- [Remove Gridsome site code from master](https://github.com/galaxyproject/galaxy-hub/pull/3736) by @dannon
- [Switch CI to Astro-only, Gridsome to maintenance branch](https://github.com/galaxyproject/galaxy-hub/pull/3735) by @dannon
- [Dekcd unification in Hub](https://github.com/galaxyproject/galaxy-hub/pull/3734) by @Sch-Da

### galaxy-job-config-init
- [Add &#96;&#96;--local-workers&#96;&#96; option to specify LocalJobRunner workers](https://github.com/galaxyproject/galaxy-job-config-init/pull/8) by @mvdbeek

### galaxy-k8s-boot
- [Tweaks from testing](https://github.com/galaxyproject/galaxy-k8s-boot/pull/51) by @afgane

### galaxy-language-server
- [Bump minimatch from 3.1.2 to 3.1.4 in /client](https://github.com/galaxyproject/galaxy-language-server/pull/293) by @dependabot[bot]
- [Improve Python environment setup](https://github.com/galaxyproject/galaxy-language-server/pull/292) by @davelopez

### galaxy-skills
- [Add tool-selection-diagram sub-skill to tool-dev](https://github.com/galaxyproject/galaxy-skills/pull/11) by @nekrut
- [fix: update hub-news-posts skill with lessons from real post creation](https://github.com/galaxyproject/galaxy-skills/pull/10) by @nekrut

### galaxy_codex
- [Add imaging.usegalaxy.org page content](https://github.com/galaxyproject/galaxy_codex/pull/612) by @jdavcs
- [Automatic resources update](https://github.com/galaxyproject/galaxy_codex/pull/611) by @github-actions[bot]

### gravity
- [Dispatch option on gunicorn version](https://github.com/galaxyproject/gravity/pull/143) by @mvdbeek
- [Fix version check](https://github.com/galaxyproject/gravity/pull/142) by @mvdbeek

### gx-it-proxy
- [Bump minimatch](https://github.com/galaxyproject/gx-it-proxy/pull/46) by @dependabot[bot]

### gxformat2
- [Bump minimatch in /typescript](https://github.com/galaxyproject/gxformat2/pull/132) by @dependabot[bot]
- [Lint code with black and ruff](https://github.com/galaxyproject/gxformat2/pull/131) by @nsoranzo

### gxy.io
- [Add redirect for microbiology.usegalaxy.org](https://github.com/galaxyproject/gxy.io/pull/118) by @jdavcs
- [Add welcome for Biodiversity lab](https://github.com/galaxyproject/gxy.io/pull/117) by @natefoo
- [Add redirect for imaging.usegalaxy.org](https://github.com/galaxyproject/gxy.io/pull/116) by @jdavcs

### iwc
- [Bump lodash-es and mermaid in /website](https://github.com/galaxyproject/iwc/pull/1121) by @dependabot[bot]
- [Bump minimatch in /website](https://github.com/galaxyproject/iwc/pull/1120) by @dependabot[bot]
- [Update genes catalogue metaG WF](https://github.com/galaxyproject/iwc/pull/1118) by @hugolefeuvre
- [Updating workflows/transcriptomics/rnaseq-de from 0.7 to 0.8](https://github.com/galaxyproject/iwc/pull/1116) by @gxydevbot

### pulsar
- [Drop use of distutils, pkg_resources and stopit](https://github.com/galaxyproject/pulsar/pull/438) by @nsoranzo

### tools-iuc
- [Cutadapt - Fix --minimum-length param default](https://github.com/galaxyproject/tools-iuc/pull/7729) by @RZ9082
- [fix hyphy annotate invert true bug](https://github.com/galaxyproject/tools-iuc/pull/7726) by @d-callan
- [New version of pretextmap and addition of --highres flag](https://github.com/galaxyproject/tools-iuc/pull/7721) by @Delphine-L
- [Fix ToolDistillator Galaxy Version 1.0.5+galaxy0 to 1.0.5+galaxy1](https://github.com/galaxyproject/tools-iuc/pull/7717) by @clsiguret
- [Updating tools/mosdepth from version 0.3.12 to 0.3.13](https://github.com/galaxyproject/tools-iuc/pull/7716) by @gxydevbot

### training-material
- [clarifying that even if galaxy is running 25.1+, nest collection may not](https://github.com/galaxyproject/training-material/pull/6683) by @scottcain
- [Rstudio in Galaxy updates](https://github.com/galaxyproject/training-material/pull/6682) by @shiltemann
- [Mapping tutorial: add tip about setting dbkey for samtools stats](https://github.com/galaxyproject/training-material/pull/6681) by @shiltemann
- [Update GTA url with correct year](https://github.com/galaxyproject/training-material/pull/6680) by @shiltemann
- [Add recommendation on citing public workflows](https://github.com/galaxyproject/training-material/pull/6679) by @MarisaJL
- [redirect HoF pages from downcased versions](https://github.com/galaxyproject/training-material/pull/6677) by @shiltemann
- [&#91;Infra&#93; Check for empty tools list before rendering ephemeris install file](https://github.com/galaxyproject/training-material/pull/6676) by @shiltemann
- [Add news item for misconceptions paper](https://github.com/galaxyproject/training-material/pull/6675) by @shiltemann
- [Update Cached Commit Data](https://github.com/galaxyproject/training-material/pull/6673) by @github-actions[bot]
- [Update Persistent uniform resource locators](https://github.com/galaxyproject/training-material/pull/6672) by @github-actions[bot]

### usegalaxy-playbook
- [Add Imaging theme and tool view panel](https://github.com/galaxyproject/usegalaxy-playbook/pull/444) by @jdavcs

### usegalaxy-tools
- [Add imaging tools from usegalaxy.eu](https://github.com/galaxyproject/usegalaxy-tools/pull/1373) by @jdavcs

## New Issues

### galaxy
- [Optional parameter_input steps leak ConnectedValue placeholder when omitted from workflow invocation](https://github.com/galaxyproject/galaxy/issues/21947) by @d-callan
- [ToolShed (accidentally) shows old page without styles instead of redirecting](https://github.com/galaxyproject/galaxy/issues/21946) by @martenson
- [python packages native namespaces](https://github.com/galaxyproject/galaxy/issues/21938) by @mr-c
- [dbkey filtering of dynamic options does not work properly](https://github.com/galaxyproject/galaxy/issues/21904) by @bernt-matthias
- [Deleting empty collections does not stop/delete the creating job](https://github.com/galaxyproject/galaxy/issues/21911) by @natefoo
- [Add error handling for markdown elements](https://github.com/galaxyproject/galaxy/issues/21912) by @ahmedhamidawan

### galaxy-hub
- [Issues found in https://github.com/galaxyproject/galaxy-hub/pull/3763](https://github.com/galaxyproject/galaxy-hub/issues/3775) by @bgruening
- [Improve svg-based icons](https://github.com/galaxyproject/galaxy-hub/issues/3767) by @wm75
- [Documentation: Reference Data, Reproducibility, and Citations](https://github.com/galaxyproject/galaxy-hub/issues/3771) by @jennaj
- [Decide on tease field policy: plain text vs markup](https://github.com/galaxyproject/galaxy-hub/issues/3755) by @dannon
- [The news page is busted](https://github.com/galaxyproject/galaxy-hub/issues/3745) by @afgane

### idc
- [Data Documentation -- discussion](https://github.com/galaxyproject/idc/issues/84) by @jennaj

### tools-iuc
- [Samtools Stats: no reference genomes shown](https://github.com/galaxyproject/tools-iuc/issues/7718) by @shiltemann

### total-perspective-vortex
- [linting for tool.tool_type fails](https://github.com/galaxyproject/total-perspective-vortex/issues/188) by @bgruening

### training-material
- [Hide tool install when empty](https://github.com/galaxyproject/training-material/issues/6674) by @hexylena

### usegalaxy-tools
- [Request: increase resources for optitype/1.3.5+galaxy0 at usegalaxy.org](https://github.com/galaxyproject/usegalaxy-tools/issues/1375) by @jennaj
- [Install qiime2 tools import-fastq to UseGalaxy.org](https://github.com/galaxyproject/usegalaxy-tools/issues/1376) by @jennaj

## Closed Issues

### brc-analytics
- [Creating social media posts with the galaxy-social bot](https://github.com/galaxyproject/brc-analytics/issues/737)
- [Add file with landing request](https://github.com/galaxyproject/brc-analytics/issues/830)
- [Improve ENA reliability](https://github.com/galaxyproject/brc-analytics/issues/1017)
- [Visualization for variant calling workflow](https://github.com/galaxyproject/brc-analytics/issues/472)

### galaxy
- [fetching data from repositories does not seem to respect storage quota](https://github.com/galaxyproject/galaxy/issues/21642)
- [Create New Workflow in Workflow Editor broken](https://github.com/galaxyproject/galaxy/issues/21662)
- [ToolShed (accidentally) shows old page without styles instead of redirecting](https://github.com/galaxyproject/galaxy/issues/21946)
- [can't import data that is not accessible by the galaxy system user](https://github.com/galaxyproject/galaxy/issues/8217)
- [Support bgzipped data](https://github.com/galaxyproject/galaxy/issues/12995)
- [dbkey filtering of dynamic options does not work properly](https://github.com/galaxyproject/galaxy/issues/21904)
- [Fix tool.parameters initialization.](https://github.com/galaxyproject/galaxy/issues/21843)
- [Stores using &#96;useKeyedCache&#96; should use consistent retry handling](https://github.com/galaxyproject/galaxy/issues/21886)
- [Navigating to a dataset preview creates request loop in some edge cases](https://github.com/galaxyproject/galaxy/issues/21863)
- [Automatic login via OIDC](https://github.com/galaxyproject/galaxy/issues/21129)
- [Beta Upload Activity: Add discover/try &#96;Beta Upload Activity&#96; button in old upload dialog](https://github.com/galaxyproject/galaxy/issues/21883)
- [workflow editor field editing resets value while type](https://github.com/galaxyproject/galaxy/issues/21205)
- [&#91;TS2.0&#93; missing URL in emails](https://github.com/galaxyproject/galaxy/issues/21871)
- [Beta Upload Activity: Improve &#96;Type&#96; and &#96;Reference&#96; selectors in Upload Activity](https://github.com/galaxyproject/galaxy/issues/21879)
- [Proposed UI redesign of workflow import dialog](https://github.com/galaxyproject/galaxy/issues/20842)
- [Tool output sharing apparently depends on input sharing (instead of history preferences)](https://github.com/galaxyproject/galaxy/issues/21802)
- [Tool with optional credentials cannot be executed when no credentials group exists](https://github.com/galaxyproject/galaxy/issues/21848)

### galaxy-hub
- [The news page is busted](https://github.com/galaxyproject/galaxy-hub/issues/3745)
- [External links to GTN are broken on Galaxy Hub Astro on "Get Started" Page](https://github.com/galaxyproject/galaxy-hub/issues/3594)
- [Add new  &#96;citations&#96; site for all subsites](https://github.com/galaxyproject/galaxy-hub/issues/3582)

### iwc
- [Test release 26.0](https://github.com/galaxyproject/iwc/issues/1092)

### tools-iuc
- [kraken2 assigns incorrect datatypes to output datasets if input datasets are zipped](https://github.com/galaxyproject/tools-iuc/issues/4110)
- [Samtools Stats: no reference genomes shown](https://github.com/galaxyproject/tools-iuc/issues/7718)

### training-material
- [Unable to follow the tutorial](https://github.com/galaxyproject/training-material/issues/6658)
- [R Space introduction](https://github.com/galaxyproject/training-material/issues/6244)
- [Hide tool install when empty](https://github.com/galaxyproject/training-material/issues/6674)
- [Tools are not clickable in tutorials](https://github.com/galaxyproject/training-material/issues/6472)
- [Issue with the admin_install section of tutorials](https://github.com/galaxyproject/training-material/issues/6662)

### usegalaxy-tools
- [Bug: Funannotate predict fails with permissions error augustus_parallel.py](https://github.com/galaxyproject/usegalaxy-tools/issues/1058)

---
*Generated automatically on 2026-03-01 16:24 UTC*