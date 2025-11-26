---
autotoc: false
---

<slot name="/events/gcc2026/header" />

# GCC2026 CollaborationFest (CoFest!)

## CoFest: A Collaborative Sprint for Everyone

CoFest is a community gathering by those interested in
contributing to Galaxy's tool set, documentation, training materials, code base,
and anywhere else that expands the Galaxy ecosystem.

CoFest participants will gather around shared interests and address common
topics related to those interests. It is an informal, highly interactive meeting
where you get to "hack" on a topic of choice - and you can do it with others
that share similar interests.

CoFest will be held June 25-26, 2026, immediately following the main GCC2026
conference in Clermont-Ferrand, France. You can attend CoFest whether or not you
attend the main conference.

## What to Expect at CoFest

<p class="lead">
    <strong>
        The goals of CoFest are to expand the Galaxy contributor community and its ecosystem.
    </strong>
</p>

Engage in an interactive environment where you can:

- **Improve Tools & Workflows** – Enhance Galaxy & Bioconductor functionalities.
- **Enhance Documentation & Training** – Support learning through refined materials.
- **Design & User Experience** – Create accessible and visually appealing interfaces.
- **Community Discussions** – Collaborate with enthusiasts and experts.
- **Casual Collaboration** – Enjoy a stress-free setting to innovate.


## Why you should join ?

Joining CoFest means you can:

- **Meet Experts & Enthusiasts** – Forge strong community connections.
- **Learn New Skills** – Gain hands-on experience with real-world projects.
- **Make an Impact** – Contribute to an expansive ecosystem.
- **Enjoy a Vibrant Community** – Collaborate with passionate, supportive peers.


Welcome aboard! If you'd like to get involved early check out our _live document of CoFest
project ideas_ linked below.
Feel free to add to this document or join someone else's project by adding your name to the
*Participants* column.

<p class="alert alert-info">
    A good project idea for the Cofest is preferrably a collaborative one or at the very least,
    one that would benefit from in-person planning, feedback and dicussion.
</p>

### <i>Note that this is not the exhaustive list of projects for the CoFest!</i>

<p class="lead">
    <strong>
        Share your ideas and get input from Working Group Leads.
    </strong>
</p>

Show up, share what you're curious to do (doesn't have to be a fully fledged project!), get
input or support from the Galaxy Working Group leads (UI/UX, Backend, Systems, Tools &
Workflows, Testing & Hardening, GOATS).

CoFest is all about collaboration and interaction. The best ideas and solutions come from
open discussions and collective problem-solving.

## Dates & location

CoFest will be held June 25-26, 2026, immediately following the main GCC2026
conference in Clermont-Ferrand, France. You can attend CoFest whether or not you
attend the main conference.

## Registration

To attend CoFest, we do ask that you register. This will help us find adequate
space and ensure we have enough coffee and drinks.

## Past projects (GCC 2024 & 2025)

<div class="card-deck lead">

  <div class="card" style="min-width: 30%; max-width: 30rem;">
    <div class="card-header">Deploying an R Shiny App on Galaxy</div>

- Bring your own Shiny app and deploy it on Galaxy
    - Learn to convert your Shiny app into a R package
    - Learn to create a docker container following best practices
    - Write Galaxy configuration file and deploy!
- Fix/Update the existing R shiny apps
    - Example : [Pampa Performance Indicators of Marine Protected Areas for the management of coastal ecosystems, resources and their uses](https://github.com/usegalaxy-eu/galaxy/blob/release_25.0_europe/tools/interactive/interactivetool_pampa.xml)

  </div>

  <div class="card" style="min-width: 30%; max-width: 30rem;">
    <div class="card-header">Making Your First Contribution to the Galaxy Training Network</div>

- Get support and advice on making your first contribution to the Galaxy Training Network. I will be working on creating my first GTN tutorial.
Drafting started for two tutorials:
    - (1) Best Practice for Citing Galaxy
    - (2) Hybrid genome assembly - Nanopore and Illumina

  </div>

  <div class="card" style="min-width: 30%; max-width: 30rem;">
    <div class="card-header">Improve User Defined Tools</div>

- Enable User Defined Tool support in planemo
- Test user defined tool upload to testtoolshed
- Enable resource requirement specification (minCpu, minRam, minGPU etc)
- Gather feedback
- Improve support for scripts (think Rscript)
- Improve Documentation

  </div>

  <div class="card" style="min-width: 30%; max-width: 30rem;">
    <div class="card-header">Galaxy tours - fixing existing ones and add tours for popular tools. </div>

- Test the existing tours
- Replace all the html elements with the selectors defined here: https://github.com/galaxyproject/galaxy/blob/dev/client/src/utils/navigation/navigation.yml
- Tested all the core tours: [details](https://docs.google.com/spreadsheets/d/1JGxx9Av2ilw9mT17xGj2KG4U4nbnDxJw7CFVfS6NiWQ/edit?gid=885495044#gid=885495044)
- Converting deeptools Galaxy help text to tours 

  <div class="card" style="min-width: 30%; max-width: 30rem;">
    <div class="card-header">Biodiversity & Ecology Resources</div>

Curate tools and materials for biodiversity research in Galaxy, with EDAM annotations.

Outcomes:
- Filtered Galaxy tools for new “Ecology” and “Earth” SIGs
- A wish list for new Galaxy tools
- Some wrappers got (and some need) annotation fixed
- Additions and curation in Bio.tools

  </div>

  <div class="card" style="min-width: 30%; max-width: 40rem;">
    <div class="card-header">Galaxy ITs</div>

Galaxy ITs often require wildcard DNS and SSL, which can be restrictive. Since Galaxy 24.0, path-based ITs are supported, but tools need configuration.

Goal: Enable ITs via URL paths for easier use. See: [F1000](https://f1000research.com/slides/12-1163). 

  </div>

</div>
