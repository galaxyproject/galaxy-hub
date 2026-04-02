---
title: "Making Galaxy Greener with the Job Cache"
date: "2026-03-04"
tease: "Galaxy's job cache improves performance, supports large training events, and advances environmental sustainability efforts within ELIXIR-STEERS by reducing redundant tool executions"
tags:
- community
- development
subsites:
- all
contributions:
  authorship:
    - nsoranzo
    - mvdbeek
    - pauldg
    - sanjaysrikakulam
    - abretaud
    - martenson
    - bgruening
  funding:
    - earlham
    - vib
    - deNBI
    - mwk
    - elixir-steers
    - cesnet
    - elixir-cz
---

Modern computational workflows are complex and energy intensive. As analyses grow in scale and complexity, avoiding unnecessary re-computation is no longer just a convenience feature: it is essential for efficiency, reproducibility, and environmental sustainability.

One of the most effective mechanisms Galaxy provides to address this is the **job cache**.

## What is the Galaxy Job Cache?

The Galaxy job cache allows Galaxy to **reuse the results of previous tool executions** when the same tool is run again with identical inputs and parameters.

Instead of launching a new job on the cluster or cloud, Galaxy:

1. Compares the tool ID and version
2. Compares all tool parameters
3. Compares input datasets
4. Verifies that outputs are still available

If everything matches, Galaxy simply **reuses the existing outputs**.

From the user's perspective, this means faster turnaround and fewer queued jobs. From the infrastructure perspective, it means fewer jobs submitted to HPC or cloud backends.

## Why This Matters for Users

Galaxy users often iteratively refine workflows. If a tool is executed with identical inputs and parameters, recomputing its outputs provides no additional scientific value. The job cache eliminates this redundancy while preserving reproducibility: identical inputs deterministically produce identical outputs.

On shared public servers, cache reuse also improves overall system responsiveness by reducing duplicate workloads.

This benefit becomes particularly visible during large training events such as the [Galaxy Training Academy](https://training.galaxyproject.org/training-material/events/2026-05-18-galaxy-academy.html). In these settings, dozens or hundreds of participants often execute the same tools with the same training datasets and parameters. Without caching, each participant would trigger identical compute jobs, dramatically increasing load and energy consumption. With the job cache enabled, once the first execution completes, subsequent identical jobs can be reused almost instantly, improving responsiveness for trainees while substantially reducing unnecessary compute demand.

Guidance for users and administrators, including common questions about job reuse, is available through the [Galaxy Training Network FAQ](https://galaxyproject.github.io/training-material/faqs/galaxy/re_use_equivalent_jobs.html).

## Why This Matters for the Environment

Each unnecessary job consumes CPU or GPU cycles, memory, storage I/O, cooling, and electricity. At scale, redundant computation contributes directly to the carbon footprint of computational research.

Within the [**ELIXIR-STEERS**](https://elixir-europe.org/about-us/how-funded/eu-projects/elixir-steers) Horizon Europe project, Work Package 3 focuses on making workflow management systems more environmentally sustainable. Strengthening and extending Galaxy's job cache has been a concrete contribution toward that goal: reducing redundant computation is one of the most immediate and infrastructure-level mechanisms to lower environmental impact without requiring behavioural change from users.

Galaxy already provides [carbon emission reporting](https://galaxyproject.org/news/2023-07-11-carbon-emissions-reporting/) for executed jobs. However, these metrics currently apply only to jobs that are actually run. Energy and carbon savings obtained through cache reuse are not yet quantified or surfaced to users, representing an important opportunity for future integration.

## Implementation Details

At a technical level, cache eligibility is determined through strict equivalence checks:

* Tool ID and exact version
* Complete parameter dictionary
* Input datasets and metadata
* Output dataset state and availability

Reused outputs remain traceable to the original job execution. Provenance is not bypassed; instead, reuse is explicitly recorded, supporting auditability and reproducibility.

## Contributions from BioHackathon Europe 2024 and 2025

Sustainability in workflow systems was further advanced during [BioHackathon Europe](https://biohackathon-europe.org) 2024 and 2025.

At BioHackathon Europe 2024, a dedicated project track focused on green workflows and caching strategies, including:

* Strengthened dataset hash handling and validation
* Improved job search and cache hit ratio across users and shared resources
* Added per-invocation job metrics

[Full list of the BH2024 project pull requests](https://github.com/galaxyproject/galaxy/issues?q=%20label%3ABioHackEU24)

At BioHackathon Europe 2025, the focus shifted toward exposing and testing job cache functionality programmatically across the Galaxy ecosystem. Work concentrated on:

* Extending integration points in Galaxy itself
* Supporting cache-aware interactions in BioBlend
* Enabling testing workflows via Planemo

Full list of the BH2025 project pull requests:
- [galaxy#21257](https://github.com/galaxyproject/galaxy/pull/21257)
- [bioblend#519](https://github.com/galaxyproject/bioblend/pull/519)
- [bioblend#521](https://github.com/galaxyproject/bioblend/pull/521)
- [planemo#1583](https://github.com/galaxyproject/planemo/pull/1583)
- [iwc#1016](https://github.com/galaxyproject/iwc/pull/1016)

During the hackathon, a reusable [testing script](https://github.com/urdvr/galaxy_rerun_testing) was also developed to run a Galaxy workflow, rerun it under identical conditions, and programmatically check which jobs are served from the cache. It was subsequently applied to workflows from the Intergalactic Workflow Commission (IWC), providing practical validation of cache behaviour across real-world workflows.

Together, these hackathon efforts strengthened both the technical robustness and ecosystem integration of Galaxy's job cache.

## Limitations

Despite its advantages, the job cache has important constraints:

* **Strict equivalence requirements:** Any change in tool version, parameters, or input content invalidates reuse. This ensures correctness but limits reuse opportunities.
* **Dependence on output retention:** If outputs are purged or archived, reuse is not possible.
* **Job-level granularity:** Optimisation occurs at the whole-job level; internal algorithmic steps are not partially cached.
* **Instance scope:** Cache reuse applies within a single Galaxy deployment.
* **No accounting of avoided emissions:** While Galaxy reports emissions for executed jobs, avoided emissions from cached jobs are not currently exposed.

## Future Work

In ELIXIR-STEERS, the ELIXIR Tools Platform and other projects, ongoing work is under way to extend environmental sustainability beyond the current cache implementation:

* **Content-based input hashing:** enabling more robust detection of identical datasets across histories and uploads, improving reuse opportunities.
* **Sustainability-aware job scheduling:** integrating environmental impact criteria into job destination selection so Galaxy can consider infrastructure characteristics (e.g. carbon intensity) when dispatching jobs.
* **Quantifying avoided emissions:** combining cache metadata with Galaxy's carbon reporting framework to estimate and display energy and carbon savings from reused jobs and workflows.

## Toward Sustainable and FAIR Workflows

The Galaxy job cache demonstrates how workflow engine design can simultaneously enhance user experience, reproducibility, infrastructure efficiency, and environmental responsibility. By avoiding redundant computation, Galaxy reduces unnecessary energy consumption while preserving strict provenance guarantees.

As workflows scale and computational research expands, these optimisations become part of responsible digital research infrastructure. Small efficiencies, when applied across thousands of jobs and users (including large training cohorts) translate into measurable environmental benefit without compromising scientific rigor.
