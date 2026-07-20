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
components: true
---

Keeping with Galaxy tradition, this year's Galaxy Community Conference (GCC2026) in Clermont-Ferrand, France, was followed by the CollaborationFest (CoFest) on June 25-26, where participants collaborated on various projects to enhance the Galaxy ecosystem. CoFest provided an opportunity for attendees to contribute to anything related to Galaxy, whether through actual code contributions, documentation, training materials, or other community-driven initiatives.

The CoFest was structured around specific projects, each with a project lead and a team of contributors which was initially assigned based on participants' interests and skills (information collected through a pre-event form). However, participants were free to switch projects or join multiple teams as they wished during the event.

Here, we list the projects worked on during CoFest, along with contributor notes for some projects.

## CoFest 2026 Projects

<div class="not-prose flex flex-col gap-6">

<CofestProject name="Structural Bioinformatics & Molecular Visualization in Galaxy" description="Improve access to structural bioinformatics within Galaxy, particularly around molecular dynamics simulations and displaying interactive molecular viewers as HTML or other formats. A working prototype adapting Molstar to work within Galaxy already exists." lead="Finn Beruldsen" assignees="Michelle Savage">

Talked about the goals and use cases for RMSX/Flipbook for understanding molecular dynamics simulations and how galaxy users could interact with it. We talked about how to take a working prototype onto galaxy and got the initial PRs done.

<p class="text-right">
  <i>Finn Beruldsen</i>
</p>

</CofestProject>

<CofestProject name="Driving Galaxy with Agents" description="Explore agentic Galaxy interactions and AI-powered interfaces within Galaxy." lead="Dannon Baker" assignees="John Duggan, Ramiz Khaled, Arash Kadkhodaei, Anup Kumar, Alireza Heidari, Moine Frédéric">

Mainly, I engaged in discussions about how I can apply the new agentic AI features in Galaxy in my internal Galaxy instance and best practices for doing so. I did submit a small PR to the galaxy-mcp repo to harden some of the test suite in the CI: https://github.com/galaxyproject/galaxy-mcp/pull/89

<p class="text-right">
  <i>John Duggan</i>
</p>

Galaxy running locally  deployed Galaxy 26 via Docker (the older <code>galaxy-stable</code> image is stuck on Galaxy 20.09 / Python 3.7, so I moved us to the current quay.io image). Up and reachable, admin access confirmed.

Real BioBlend integration replaced the mock in <code>galaxy_service.py</code> with an actual BioBlend path, keeping a clean automatic fallback to mock mode when Galaxy isn't reachable. Caught and fixed a real bug along the way: <code>bioblend.ConnectionError</code> isn't a subclass of requests' ConnectionError, so the fallback wasn't triggering. Tested across 4 cases.

Clarified the architecture and confirmed the right separation: Nuxt/FastAPI/BioBlend/Galaxy, with MCP as the optional conversational-control layer (it calls FastAPI, never Galaxy/FROST directly). FastAPI stays the central gatekeeper; no Galaxy key outside it.

Security model and drafted a trust-boundary view + a prioritized checklist, covering the MCP/agent risks (prompt injection, tool poisoning, rug pull…) and standard web hardening. Core principle baked in: the agent is never an authority; everything sensitive is re-validated server-side.

LLM strategy and settled on open-source, CPU-first: RAG now (BGE-M3/multilingual-e5 embeddings + pgvector on our existing PostGIS, Qwen2.5 served via Ollama), fine-tuning later on a rented GPU once we've collected real Q/A. RAG = knowledge, fine-tuning = behavior.

<p class="text-right">
  <i>Moine Frédéric</i>
</p>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 0.75rem;">
  <img src="/images/events/gcc2026/cofest/driving_galaxy_with_agents.jpg" alt="CoFest participants working on the Driving Galaxy with Agents project." style="width: 100%; height: 220px; object-fit: cover; object-position: top; border-radius: 10px;" />
  <img src="/images/events/gcc2026/cofest/driving_galaxy_with_agents_2.jpg" alt="CoFest participants collaborating on agentic Galaxy interactions." style="width: 100%; height: 220px; object-fit: cover; object-position: top; border-radius: 10px;" />
</div>

</CofestProject>

<CofestProject name="Galaxy CoDex (Community resources database)" description="Build out the Galaxy CoDex — a community resources database." lead="Solenne Correard" assignees="Marisa Loach, Pavan Videm, Isis Narvaez Babdera, Gildas Le Corguillé, Etienne Jules, Bérénice Batut">

We discussed pending issues to find solutions, reviewed some pending PR and made new PRs to solve issues. It was a pretty general approach, including both necessary discussions and brainstorming and actual coding and reviewing.

<p class="text-right">
  <i>Solenne Correard</i>
</p>

Solenne provided a useful explanation of the CoDex and I was then able to create some missing pages for the SPOC CoDex. This meant I also had to update the tags for the single-cell tutorials on the GTN, so those are now more clearly labelled too.

<p class="text-right">
  <i>Marisa Loach</i>
</p>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 0.75rem;">
  <img src="/images/events/gcc2026/cofest/codex.jpg" alt="CoFest participants working on the Galaxy CoDex project." style="width: 100%; height: 220px; object-fit: cover; object-position: top; border-radius: 10px;" />
  <img src="/images/events/gcc2026/cofest/codex_2.jpg" alt="Galaxy CoDex team collaborating during CoFest." style="width: 100%; height: 220px; object-fit: cover; object-position: top; border-radius: 10px;" />
</div>

</CofestProject>

<CofestProject name="GTN materials on reviewing Galaxy tools" description="Create GTN materials about how to perform a review of Galaxy tools." lead="Mélanie Pétéra" assignees="Mina Hojat Ansari, Omnia Abdelnasser Edress Ibrahim">

We have mainly begun to design a training material, intended to be hosted in the end as a GTN material. We took as support the content in GTN dedicated to helping new GTN contributors, to help us taking the steps one after the other, begining from scratch. We produced two main outputs: (i) some feedback on the existing ressources dedicated to help new GTN contributors, formalizing it into issues on GitHub, and (ii) a document that gathered the content we began to formalized for the training material, with objective definition, LOs, LEs... that may be in the end converted into an issue open to discussion, to see what experts in tool review may think about it.

<p class="text-right">
  <i>Mélanie Pétéra</i>
</p>

</CofestProject>

<CofestProject name="GTN Admin training & TPV job scheduling debugging" description="Two related admin papercuts: (a) improve GTN admin training for disaster recovery (automated DB backup tests, Ansible role); (b) improve and document job and TPV scheduling debugging." lead="Paul De Geest" assignees="Nadia Goué, Lucille Delisle">

For this project I created a PR against the TPV codebase to add the explainability feature in TPV to the Galaxy logs: https://github.com/galaxyproject/total-perspective-vortex/pull/198

<p class="text-right">
  <i>Paul De Geest</i>
</p>

I don't know if that count as an achievement for the community as large but with Nadia Goué we managed to set up TPV on her test instance.

<p class="text-right">
  <i>Lucille Delisle</i>
</p>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 0.75rem;">
  <img src="/images/events/gcc2026/cofest/gtn_admin_training.jpg" alt="CoFest participants working on GTN admin training." style="width: 100%; height: 220px; object-fit: cover; object-position: top; border-radius: 10px;" />
  <img src="/images/events/gcc2026/cofest/gtn_admin_training_2.jpg" alt="GTN admin training and TPV debugging session during CoFest." style="width: 100%; height: 220px; object-fit: cover; object-position: top; border-radius: 10px;" />
</div>

</CofestProject>

<CofestProject name="Pangenomics / Comparative genomics" description="Development of workflows for pangenome and multiple alignment construction." lead="Anton Nekrutenko" assignees="Mirela Minkova, Andrew Seacord, Saim Momin, Wolfgang Maier">

We discussed the design and development of a pangenomics workflow intended to support large-scale projects such as BRC Analytics and VGP. The discussions also covered current work items, ongoing activities, overall progress, and anticipated timelines for completion. Overall, this CoFest provided a valuable opportunity for collaborative planning, enabling us to align on our pangenomics objectives in a more structured, systematic, and efficient manner.

<p class="text-right">
  <i>Saim Momin</i>
</p>

</CofestProject>

<CofestProject name="More file sources in Galaxy" description="Implement more file sources into Galaxy. Could also include developing a filesystem plugin to explore data from OpenSILEX instances connecting via the BioBlend API." lead="Polina Polunina" assignees="David López, Olusegun Ekundayo Adebayo, Adrián Díaz, Pathmanaban Ramasamy, Agnès Barnabé">

My aim was to meet a Galaxy dev to help me go through file sources in Galaxy. With the help of David López and Polina Polunina, I managed to produce an initial draft of a file source enabling me to explore the data in my information system (an OpenSILEX instance).

At present, this project is still under development, and OpenSILEX still needs to implement an API key to enable queries to be made on an instance without having to provide login credentials.

<p class="text-right">
  <i>Agnès Barnabé</i>
</p>

</CofestProject>

<CofestProject name="Bioconductor tools & single-cell GTN tutorials" description="Wrap Bioconductor R packages as Galaxy tools and showcase them in new GTN tutorials for single-cell analysis (BioFAIR Pathfinder project)." lead="Kevin Rue-Albrecht" assignees="Romane Libouban, Deepti Varshney, Fadwa El Khaddar, Amirhossein Naghsh Nilchi" />

<CofestProject name="Arts & humanities tools in Galaxy" description="Improving support for arts and humanities tools in Galaxy." lead="Eamonn Bell" assignees="Johannes Nussbaum, Aysam Guerler" />

<CofestProject name="AI agent to auto-wrap Bioconda/Bioconductor tools" description="A persistent AI agent set up to auto-wrap any new tools added to Bioconda/Bioconductor or similar repos." lead="Enis Afgan" assignees="Daniel Golparian">

<div style="margin-top: 0.75rem;">
  <img src="/images/events/gcc2026/cofest/ai_agent_to_wrap.jpg" alt="CoFest participants working on the AI agent to auto-wrap Bioconda/Bioconductor tools project." style="width: 100%; height: 220px; object-fit: cover; object-position: top; border-radius: 10px;" />
</div>

</CofestProject>

<CofestProject name="Modernizing Pulsar DRMAA manager" description="Modernize the Pulsar DRMAA job manager." lead="Matthias Bernt" assignees="Anthony Bretaudeau, Reid Wagner, Nicola Soranzo">

<div style="margin-top: 0.75rem;">
  <img src="/images/events/gcc2026/cofest/modernizing_pulsar.jpg" alt="CoFest participants working on modernizing the Pulsar DRMAA manager." style="width: 100%; height: 220px; object-fit: cover; border-radius: 10px;" />
</div>

</CofestProject>

<CofestProject name="Time-based quotas & pgcleanup emails" description="Two related backend papercuts: (a) quotas with a start/end date that auto-lift after the end date — useful for workshops; (b) pgcleanup emails to users prior to dataset deletion." lead="Charles Coulombe" assignees="John Davis, Boris Depoortere, Gareth Price, Nate Coraor">

<div style="margin-top: 0.75rem;">
  <img src="/images/events/gcc2026/cofest/time_based_quotas.jpg" alt="CoFest participants working on time-based quotas and pgcleanup emails." style="width: 100%; height: 220px; object-fit: cover; border-radius: 10px;" />
</div>

</CofestProject>

<CofestProject name="Galaxy on Kubernetes" description="Deploy and run Galaxy on Kubernetes infrastructure." lead="Keith Suderman" assignees="Rand Zoabi, Gabriel Ferreira Saudade, Guillaume Kermorgant, José Manuel Dominguez" />

<CofestProject name="Improve CVMFS Reference Genomes via GA4GH Refseq" description="Improve CVMFS Reference Genomes via GA4GH Refseq: Sequence Collections / Refgetstore (new Refgenie v1)." lead="Sveinung Gundersen" />

<CofestProject name="Tool wrapping & QC subworkflow for public health pathogen genomics" description="Wrap and extend bactscout towards a QC subworkflow for public health pathogen genomics." lead="Peter van Heusden" assignees="Kobika Thillainathan, Povilas Matusevicius, Buhle Ntozini">

<div style="margin-top: 0.75rem;">
  <img src="/images/events/gcc2026/cofest/tool_wrapping.jpg" alt="CoFest participants working on tool wrapping for public health pathogen genomics." style="width: 100%; height: 220px; object-fit: cover; object-position: top; border-radius: 10px;" />
</div>

</CofestProject>

<CofestProject name="Galaxy Metabolomics / EIRENE Galaxy Lab setup" description="Galaxy Metabolomics and EIRENE Galaxy Code and Galaxy Lab setup." lead="Helge Hecht" />

<CofestProject name="Galaxy Ecology tools and tutorials development" lead="Yvan Le Bras" assignees="Samuel le Goff, Joe Ueda, Pauline Seguineau, Barreau Arthur, Kevin Payet">

<div style="margin-top: 0.75rem;">
  <img src="/images/events/gcc2026/cofest/ecology_tools.jpg" alt="CoFest participants working on Galaxy Ecology tools and tutorials." style="width: 100%; height: 220px; object-fit: cover; border-radius: 10px;" />
</div>

</CofestProject>

<CofestProject name="Help grow the GTN!" lead="Saskia Hiltemann" assignees="Delphine Lavivière, Boris Depoortere" />

<CofestProject name="Bring your workflow to IWC" description="Get advice on how to convert your regular workflow into something more broadly usable and compatible with the Intergalactic Workflow Commission (IWC). Includes guidance on best practices for generalization and hands-on help with the IWC submission process." lead="Lucille Delisle" />

</div>

## Photo Credits

Thank you to Bérénice Batut and Yvan Le Bras for capturing and sharing photos from GCC2026's CoFest. Photos in this post are by Bérénice Batut and Yvan Le Bras and are shared under a [CC BY-SA license](https://creativecommons.org/licenses/by-sa/4.0/).
