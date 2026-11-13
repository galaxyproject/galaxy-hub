---
description: "Open, peer-reviewed Galaxy workflows: reviewed, tested, versioned, and installed on the public Galaxy servers"
autotoc: false
title: "Intergalactic Workflow Commission"
---

## Open, peer-reviewed workflows for reproducible science

The Intergalactic Workflow Commission (IWC) maintains a catalogue of
high-quality, production-ready Galaxy workflows. Every workflow in the
collection is reviewed by people, tested automatically, versioned, and
published where others can find and cite it.

The catalogue covers more than 130 workflows across domains including
microbiome analysis, genome assembly, variant calling, transcriptomics,
epigenetics, and single-cell analysis.

## The IWC workflow library

[**iwc.galaxyproject.org**](https://iwc.galaxyproject.org/) is the place to
start. The library lets you search the whole collection and browse it by
category — microbiome, vertebrate genome assembly, epigenetics,
transcriptomics, variant calling and more — with the number of workflows shown
for each.

Every workflow gets its own thoroughly documented page, such as
[RNA-Seq paired-end read processing and quantification](https://iwc.galaxyproject.org/workflow/rnaseq-pe-main/),
explaining what the workflow does, the inputs it expects, the outputs it
produces, and its version history.

From that page you can **import the workflow into your account on a public
Galaxy server in a single click** — optionally along with its test data, so you
can run it straight away and see what a finished analysis looks like before
pointing it at your own data.

The source and contribution guidelines live at
[github.com/galaxyproject/iwc](https://github.com/galaxyproject/iwc/).

## How workflows are reviewed

Anyone can contribute a production workflow. Contributions go through a pull
request against the [IWC repository](https://github.com/galaxyproject/iwc/),
where they are linted against the
[Galaxy workflow best practices](https://planemo.readthedocs.io/en/latest/best_practices_workflows.html),
run against their own tests in CI, and reviewed by a person. A workflow is
merged only when all three pass.

Workflows must declare a license, their authors, and the institutes behind
them. Once merged, a workflow is given its own repository under the
[iwc-workflows organisation](https://github.com/iwc-workflows) for versioning,
released through GitHub releases, and registered on Dockstore and WorkflowHub.

Review does not stop at merge: workflows are **re-tested with every new Galaxy
release**, so a workflow that breaks against a newer Galaxy is caught rather
than left to rot.

## Taking part

Everyone is welcome to help review workflows — expertise in a scientific domain
matters more than Galaxy internals. To join the reviewers, comment on
[the IWC reviewers issue](https://github.com/galaxyproject/iwc/issues/4) saying
what you can review.

To contribute a workflow, start from the
[adding workflows guide](https://github.com/galaxyproject/iwc/blob/main/workflows/README.md#adding-workflows).

IWC also collects best practices, tips, and FAQs, and helps the community design
better Galaxy workflows. Several Galaxy communities build on the collection,
including the [Vertebrate Genomes Project](/projects/vgp/) assembly workflows.
