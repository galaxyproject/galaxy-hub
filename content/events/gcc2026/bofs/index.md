---
autotoc: false
nav_title: BoFs
---

# BoFs: Birds of a Feather

BoFs are a great opportunity to gather with other Galaxy community members around shared topics, ideas, questions, or challenges. BoF submissions closed on June 15, 2026.

These moments of discussions on a specific topic will be held Monday 22nd from 5 to 6pm and Wednesday 24th from 5:15 to 6:30pm.

The sessions can be structured in whatever way works best for the topic, whether that includes short presentations, a guided discussion, or an open conversation.
We just ask that sessions be designed to encourage participation and discussion among attendees.

Please note that BoFs are intended for in-person participation and unfortunately virtual attendees cannot be accommodated.

<style>
.gcc-schedule-summary {
  font-size: 1.5rem;
}
</style>

---

<details class="gcc-schedule-day" open>
<summary class="gcc-schedule-summary">Monday, Jun 23 — 5:00–6:00 PM</summary>

### Galaxy as the Substrate for Agent-driven Science

Location: Amphitheater A

**Organizers:** Dannon Baker, Anton Nekrutenko

Some of us are starting to put agents to work driving Galaxy purely agentically — this BoF is to figure out what's working, what we should improve, and what we still need to build. What workloads are folks experimenting with? Where is Galaxy already a solid substrate, and where are we hitting walls? Come compare notes, whether you're driving Galaxy from a coding harness like Claude Code or Codex (with or without galaxy-mcp), running Loom/Orbit, or something else entirely.

---

### Federation of instances: atypical multi-HPC integration. Is Pulsar the solution?

Location: Amphitheater B

**Organizers:** Vlad Visan, Marie Jossé, Yvan Le Bras, Samuel Keuchkerian, Martin Carrère, Sanjay Srikakulam

How can we interconnect decentralized instances? Is Pulsar the solution for scalable, secure, and low-latency federation? Share your challenges, use cases, and ideas for building resilient, interconnected systems.

Our Galaxy connects to multiple HPC clusters, with the following cluster-level constraints: no SSH access, no software installation, no admin-access and no object store. This required some Galaxy customisations to work.

Would you be interested to use or talk about this type of constraints/solutions? Do you have other atypical HPC integrations, and if so what solutions did you find?

Extending HPC integration options could lead to more users, e.g. those with large data footprints (Earth system research, ...).

---

### Keeping pace with best practices in single-cell and spatial omics in Galaxy

Location: Espace doc

**Organizers:** Kevin Rue-Albrecht, Marisa Loach

This BoF will bring together Galaxy users, developers, trainers, and infrastructure contributors interested in how Galaxy can keep pace with evolving best practices in data-intensive analysis workflows.

Inspired by the BioFAIR Pathfinder project led by Kevin Rue-Albrecht (poster #15 in Posters 2 session), the discussion will initially focus on single-cell and spatial omics as a current use case, while welcoming perspectives from other domains facing similar challenges around interoperability, tool maintenance, workflow design, and community guidance. We will use examples from ecosystems such as Seurat, Bioconductor, and Scanpy to discuss where Galaxy support works well, where gaps or friction points remain, and how the community might prioritise future improvements.

We’re keen to hear from you if your community has faced challenges keeping Galaxy tools up to date, or if you have experience addressing such challenges and can share practical insights, lessons learned, or examples of what has worked.

We're keen to hear from you if your community has faced challenges keeping Galaxy tools up to date, or if you have experience addressing such challenges and can share practical insights, lessons learned, or examples of what has worked.

---

### How to build and structure one's community: the quid of overlapping communities

Location: Caffetaria

**Organizers:** Marie Jossé, Beatriz Serrano-Solano, Yvan Le Bras, Jérôme Detoc, Samuel Keuchkerian

How do we design overlapping communities? This BoF shares experiences from the Earth, climate and Ecology communities stumbling to try to build a coherent community. This BoF aims at exploring governance and collaboration, and hearing from the feedback of other Galaxy SIGs. Join us to exchange insights on balancing autonomy and cohesion in distributed communities!

---

### Access and Identity — Now that I know who you are, what do I do?

Location: Entrance hall

**Organizers:** Galaxy Australia team

Can we do more for our users if we know more about who they are? Galaxy Australia recently uplifted Identity and Access Management. It was a success and now has allowed us to wrestle with the question — if we trust you are you, what additions in Galaxy can we give you? This BoF is open to all to share ideas of how best we use identity to make research on Galaxy smoother for everyone.


</details>

---

<details class="gcc-schedule-day" open>
<summary class="gcc-schedule-summary">Wednesday, Jun 25 — 5:15–6:30 PM</summary>

### At the edge of the Galaxy, the lonely life of a (small scale) local Galaxy server admin

**Organizers:** Hans-Rudolf Hotz, Lucille Delisle

Running a local Galaxy server within your institute or offering Galaxy just for your lab is different from managing a big public server (like usegalaxy.*). Very often, you do this as a side-job or even in your free time and you encounter site-specific issues, like disagreements with your IT department or challenges making local data available in your Galaxy server.

In this BoF, we would like to collect such issues and, more importantly, bring Galaxy admins together helping each other and joining forces to address common issues in the Galaxy code.

---

### Community Discussion on Open Source Approaches for Automated Galaxy Tool Generation

**Organizers:** Daniel Blankenberg

Galaxy tool development still requires substantial manual effort to create XML tool definitions and wrapper scripts, which can slow the integration of new software into the ecosystem. This Birds of a Feather session will bring together community members interested in open source approaches for automating Galaxy tool generation, including existing wrapper-generation frameworks, fine-tuned open-source language models, and emerging agent-based workflows. We will discuss practical use cases, current limitations, training and evaluation resources, and opportunities for shared community infrastructure. The goal is to identify how the Galaxy community can collaborate on reusable datasets, benchmarks, and best practices to make tool development more scalable, reliable, and accessible.

---

### Where does Galaxy's security responsibility end and yours begin?

**Organizers:** Martin Carrère, Nate Coraor

Every operator's Galaxy journey arrives at the same question: do I really understand Galaxy's boundaries, and where do I need to look to secure my platform?

This BoF starts mapping that line as a community, building a blueprint that covers the full chain from configuration settings down to deployment topology. We'll work out together where security ends and what Galaxy hands off to your infrastructure team, try to shed light on the trust assumptions it makes about subsystems, and determine what auditable evidence a deployment should produce.

If you run an instance and have ever had to explain its security, bring that story: together we will draw the boundary and leave with a few reference architectures worth sharing.

---

### IDC

**Organizers:** Matthias Bernt

Having consistent reference data managed by the community and available over Galaxies (and test infrastructure) is a great idea. This already works well for genome indices and a few other reference data sets. Still adding new reference data is often a slow and tedious process and some servers are not using the reference data for this reason.

Discuss steps to make IDC work better / more efficient.
Make IDC more a community effort: Currently the workload lies on too few people.
Which steps can be more of a community effort?
Which (manual) steps need help (e.g. actually moving data to CVMFS)?

</details>
