---
title: "GCC2026 CollaborationFest (CoFest!): Outcomes and Highlights"
date: "2026-07-20"
tease: "A summary of the outcomes and highlights from the CoFest held after the 2026 Galaxy Community Conference in Clermont-Ferrand, France."
contributions:
  authorship:
    - ahmedhamidawan
tags: [conference, community, gcc, cofest]
subsites: [global]
main_subsite: global
---

Keeping in Galaxy tradition, this year's Galaxy Community Conference (GCC2026) in Clermont-Ferrand, France, was followed by the CollaborationFest (CoFest!), a two-day event where participants collaborated on various projects to enhance the Galaxy ecosystem. CoFest provided an opportunity for attendees to contribute to anything related to Galaxy, whether through actual code contributions, documentation, training materials, or other community-driven initiatives.

The CoFest was structured around specific projects, each with a project lead and a team of contributors which was initially assigned based on participants' interests and skills (information collected through a pre-event form). However, participants were free to switch projects or join multiple teams as they wished during the event.

Here, we list the projects worked on during CoFest, along with contributor notes for select projects.

## CoFest 2026 Projects

### Structural Bioinformatics & Molecular Visualization in Galaxy

Improve access to structural bioinformatics within Galaxy, particularly around molecular dynamics simulations and displaying interactive molecular viewers as HTML or other formats. A working prototype adapting Molstar to work within Galaxy already exists.

**Lead:** Finn Beruldsen

**Team:** Michelle Savage

Talked about the goals and use cases for RMSX/Flipbook for understanding molecular dynamics simulations and how galaxy users could interact with it. We talked about how to take a working prototype onto galaxy and got the initial PRs done.

*Finn Beruldsen*

### Driving Galaxy with Agents

Explore agentic Galaxy interactions and AI-powered interfaces within Galaxy.

**Lead:** Dannon Baker

**Team:** John Duggan, Ramiz Khaled, Arash Kadkhodaei, Anup Kumar, Alireza Heidari, Moine Frédéric

Mainly, I engaged in discussions about how I can apply the new agentic AI features in Galaxy in my internal Galaxy instance and best practices for doing so. I did submit a small PR to the galaxy-mcp repo to harden some of the test suite in the CI: https://github.com/galaxyproject/galaxy-mcp/pull/89

*John Duggan*

What's done

Galaxy running locally  deployed Galaxy 26 via Docker (the older galaxy-stable image is stuck on Galaxy 20.09 / Python 3.7, so I moved us to the current quay.io image). Up and reachable, admin access confirmed.
 Real BioBlend integration replaced the mock in galaxy_service.py with an actual BioBlend path (create history _ upload _ invoke workflow _ track invocation), keeping a clean automatic fallback to mock mode when Galaxy isn't reachable. Caught and fixed a real bug along the way: bioblend.ConnectionError isn't a subclass of requests' ConnectionError, so the fallback wasn't triggering. Tested across 4 cases.

Clarified the architecture and confirmed the right separation: Nuxt /FastAPI/BioBlend /Galaxy, with MCP as the optional conversational-control layer (it calls FastAPI, never Galaxy/FROST directly). FastAPI stays the central gatekeeper; no Galaxy key outside it.
Security model and drafted a trust-boundary view + a prioritized checklist, covering the MCP/agent risks (prompt injection, tool poisoning, rug pull…) and standard web hardening. Core principle baked in: the agent is never an authority; everything sensitive is re-validated server-side.
LLM strategy and settled on open-source, CPU-first: RAG now (BGE-M3 / multilingual-e5 embeddings + pgvector on our existing PostGIS, Qwen2.5 served via Ollama), fine-tuning later on a rented GPU once we've collected real Q/A. RAG = knowledge, fine-tuning = behavior.

*Moine Frédéric*

### Galaxy CoDex (Community resources database)

Build out the Galaxy CoDex — a community resources database.

**Lead:** Solenne Correard

**Team:** Marisa Loach, Pavan Videm, Isis Narvaez Babdera, Gildas Le Corguillé, Etienne Jules, Bérénice Batut

We discussed pending issues to find solutions, reviewed some pending PR and made new PRs to solve issues. It was a pretty general approach, including both necessary discussions and brainstorming and actual coding and reviewing.

*Solenne Correard*

Solenne provided a useful explanation of the CoDex and I was then able to create some missing pages for the SPOC CoDex. This meant I also had to update the tags for the single-cell tutorials on the GTN, so those are now more clearly labelled too.

*Marisa Loach*

### GTN materials on reviewing Galaxy tools

Create GTN materials about how to perform a review of Galaxy tools.

**Lead:** Mélanie Pétéra

**Team:** Mina Hojat Ansari, Omnia Abdelnasser Edress Ibrahim

We have mainly begun to design a training material, intended to be hosted in the end as a GTN material. We took as support the content in GTN dedicated to helping new GTN contributors, to help us taking the steps one after the other, begining from scratch. We produced two main outputs: (i) some feedback on the existing ressources dedicated to help new GTN contributors, formalizing it into issues on GitHub, and (ii) a document that gathered the content we began to formalized for the training material, with objective definition, LOs, LEs... that may be in the end converted into an issue open to discussion, to see what experts in tool review may think about it.

*Mélanie Pétéra*

### GTN Admin training & TPV job scheduling debugging

Two related admin papercuts: (a) improve GTN admin training for disaster recovery (automated DB backup tests, Ansible role); (b) improve and document job and TPV scheduling debugging.

**Lead:** Paul De Geest

**Team:** Nadia Goué, Lucille Delisle

For this project I created a PR against the TPV codebase to add the explainability feature in TPV to the Galaxy logs: https://github.com/galaxyproject/total-perspective-vortex/pull/198

*Paul De Geest*

I don't know if that count as an achievement for the community as large but with Nadia Goué we managed to set up TPV on her test instance.

*Lucille Delisle*

### Pangenomics / Comparative genomics

Development of workflows for pangenome and multiple alignment construction.

**Lead:** Anton Nekrutenko

**Team:** Mirela Minkova, Andrew Seacord, Saim Momin, Wolfgang Maier

We discussed the design and development of a pangenomics workflow intended to support large-scale projects such as BRC Analytics and VGP. The discussions also covered current work items, ongoing activities, overall progress, and anticipated timelines for completion. Overall, this CoFest provided a valuable opportunity for collaborative planning, enabling us to align on our pangenomics objectives in a more structured, systematic, and efficient manner.

*Saim Momin*

### More file sources in Galaxy

Implement more file sources into Galaxy. Could also include developing a filesystem plugin to explore data from OpenSILEX instances connecting via the BioBlend API.

**Lead:** Polina Polunina

**Team:** David López, Olusegun Ekundayo Adebayo, Adrián Díaz, Pathmanaban Ramasamy, Agnès Barnabé

My aim was to meet a Galaxy dev to help me go through file sources in Galaxy. With the help of David Lopez and Polina Polunina, I managed to produce an initial draft of a file source enabling me to explore the data in my information system (an OpenSILEX instance).

At present, this project is still under development, and OpenSILEX still needs to implement an API key to enable queries to be made on an instance without having to provide login credentials.

*Agnès Barnabé*

### Bioconductor tools & single-cell GTN tutorials

Wrap Bioconductor R packages as Galaxy tools and showcase them in new GTN tutorials for single-cell analysis (BioFAIR Pathfinder project).

**Lead:** Kevin Rue-Albrecht

**Team:** Romane Libouban, Deepti Varshney, Fadwa El Khaddar, Amirhossein Naghsh Nilchi

<!-- Placeholder for any outcomes -->

### Arts & humanities tools in Galaxy

Improving support for arts and humanities tools in Galaxy.

**Lead:** Eamonn Bell

**Team:** Johannes Nussbaum, Aysam Guerler

<!-- Placeholder for any outcomes -->

### AI agent to auto-wrap Bioconda/Bioconductor tools

A persistent AI agent set up to auto-wrap any new tools added to Bioconda/Bioconductor or similar repos.

**Lead:** Enis Afgan

**Team:** Daniel Golparian

<!-- Placeholder for any outcomes -->

### Modernizing Pulsar DRMAA manager

Modernize the Pulsar DRMAA job manager.

**Lead:** Matthias Bernt

**Team:** Anthony Bretaudeau, Reid Wagner, Nicola Soranzo

<!-- Placeholder for any outcomes -->

### Time-based quotas & pgcleanup emails

Two related backend papercuts: (a) quotas with a start/end date that auto-lift after the end date — useful for workshops; (b) pgcleanup emails to users prior to dataset deletion.

**Lead:** Charles Coulombe

**Team:** John Davis, Boris Depoortere, Gareth Price, Nate Coraor

<!-- Placeholder for any outcomes -->

### Galaxy on Kubernetes

Deploy and run Galaxy on Kubernetes infrastructure.

**Lead:** Keith Suderman

**Team:** Rand Zoabi, Gabriel Ferreira Saudade, Guillaume Kermorgant, José Manuel Dominguez

<!-- Placeholder for any outcomes -->

### Improve CVMFS Reference Genomes via GA4GH Refseq

Improve CVMFS Reference Genomes via GA4GH Refseq: Sequence Collections / Refgetstore (new Refgenie v1).

**Lead:** Sveinung Gundersen

<!-- Placeholder for any outcomes -->

### Tool wrapping & QC subworkflow for public health pathogen genomics

Wrap and extend bactscout towards a QC subworkflow for public health pathogen genomics.

**Lead:** Peter van Heusden

**Team:** Kobika Thillainathan, Povilas Matusevicius, Buhle Ntozini

<!-- Placeholder for any outcomes -->

### Galaxy Metabolomics / EIRENE Galaxy Lab setup

Galaxy Metabolomics and EIRENE Galaxy Code and Galaxy Lab setup.

**Lead:** Helge Hecht

<!-- Placeholder for any outcomes -->

### Galaxy Ecology tools and tutorials development

**Lead:** Yvan Le Bras

**Team:** Samuel le Goff, Joe Ueda, Pauline Seguineau, Barreau Arthur, Kevin Payet

<!-- Placeholder for any outcomes -->

### Help grow the GTN!

**Lead:** Saskia Hiltemann

**Team:** Delphine Lavivière, Boris Depoortere

<!-- Placeholder for any outcomes -->

### Bring your workflow to IWC

Get advice on how to convert your regular workflow into something more broadly usable and compatible with the Intergalactic Workflow Commission (IWC). Includes guidance on best practices for generalization and hands-on help with the IWC submission process.

**Lead:** Lucille Delisle

<!-- Placeholder for any outcomes -->
