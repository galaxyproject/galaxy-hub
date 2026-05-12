---
---

# GCC2026 Daily Schedule

The schedule is where you can discover what’s happening when at GCC2026. Full details on each talk, including abstracts and speaker information, are available below.

<details class="gcc-schedule-day" open>
<summary class="gcc-schedule-summary">Monday, Jun 22</summary>

| **Time**      | **Event**                                                                                        |
|---------------|--------------------------------------------------------------------------------------------------|
| 9:00 - 9:20   | Open and welcome                                                                                 |
| 9:20 - 10:00  | [Galaxy Live!](/events/gcc2026/highlights#galaxy-live)                                           |
| 10:00 - 10:30 | Break                                                                                            |
| 10:30 - 10:50 | Overview of Galaxy SiGs                                                                          |
| 10:50 - 12:05 | [Talks 1](#talks-1-galaxy-framework-and-platform-direction)                                      |
| 12:05 - 13:00 | Lunch                                                                                            |
| 13:00 - 14:30 | [Talks 2](#talks-2-infrastructure-federation-and-service-operations)                             |
| 14:30 - 16:00 | Posters 1                                                                                        |
| 16:00 - 17:00 | [Talks 3](#talks-3-communities-provenance-and-cross-domain-expansion)                            |
| 17:00 - 18:00 | BoFs                                                                                             |

</details>

<details class="gcc-schedule-day" open>
<summary class="gcc-schedule-summary">Tuesday, Jun 23</summary>

| **Time**      | **Event**                                                                                        |
|---------------|--------------------------------------------------------------------------------------------------|
| 9:00 - 10:00  | [Keynote: Rayan Chikhi](/events/gcc2026/highlights#rayan-chikhi)                                 |
| 10:00 - 10:30 | Break                                                                                            |
| 10:30 - 12:00 | [Talks 4](#talks-4-fair-data-analysis-workflows-and-public-health-applications)                  |
| 12:00 - 13:00 | Lunch                                                                                            |
| 13:00 - 13:45 | [Talks 5](#talks-5-tool-integration-and-method-development)                                      |
| 13:45 - 14:30 | Lightning talks                                                                                  |
| 14:30 - 16:00 | Posters 2                                                                                        |
| 16:00 - 18:00 | ELIXIR F2F                                                                                       |
| 19:00 - 21:00 | Conference dinner                                                                                |

</details>

<details class="gcc-schedule-day" open>
<summary class="gcc-schedule-summary">Wednesday, Jun 24</summary>

| **Time**      | **Event**                                                                                        |
|---------------|--------------------------------------------------------------------------------------------------|
| 9:00 - 10:00  | [Galaxy Community Update](/events/gcc2026/highlights#community-update)                           |
| 10:00 - 10:30 | Break                                                                                            |
| 10:30 - 12:00 | [Talks 6](#talks-6-ai-workflows-and-guided-analysis)                                             |
| 12:00 - 13:00 | Lunch                                                                                            |
| 13:00 - 14:30 | [Showcase panel & discussion](/events/gcc2026/highlights#panel-discussion)                       |
| 14:30 - 15:00 | Group photo / break                                                                              |
| 15:00 - 16:30 | [Talks 7](#talks-7-community-platforms-mature-ecosystems-and-field-reports)                      |
| 16:30 - 17:00 | [Galaxy in Research](/events/gcc2026/highlights#galaxy-in-research)                              |
| 17:00 - 17:15 | Closing                                                                                          |
| 17:15 - 18:30 | BoFs                                                                                             |

</details>

<details class="gcc-schedule-day" open>
<summary class="gcc-schedule-summary">Thursday, Jun 25</summary>

| **Time**      | **Event**                                                                                        |
|---------------|--------------------------------------------------------------------------------------------------|
| 9:00 - 12:00  | Training 1                                                                                       |
| 12:00 - 13:00 | Lunch                                                                                            |
| 13:00 - 18:00 | [CoFest 1](/events/gcc2026/cofest)                                                               |

</details>

<details class="gcc-schedule-day" open>
<summary class="gcc-schedule-summary">Friday, Jun 26</summary>

| **Time**      | **Event**                                                                                        |
|---------------|--------------------------------------------------------------------------------------------------|
| 9:00 - 12:00  | Training 2                                                                                       |
| 12:00 - 13:00 | Lunch                                                                                            |
| 13:00 - 18:00 | [CoFest 2](/events/gcc2026/cofest)                                                               |

</details>

# Talks

Each talk slot is 15 minutes. Presenters, please see the [Abstracts
page](/events/gcc2026/abstracts) for more information on preparing your
presentation.

<style>
.gcc-schedule-day {
  margin: 1.5rem 0;
  border: 1px solid #d9e0e8;
  border-radius: 0.6rem;
  overflow: hidden;
}

.gcc-schedule-summary {
  padding: 0.85rem 1.25rem;
  background: #25537b;
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  list-style: none;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.gcc-schedule-summary::-webkit-details-marker {
  display: none;
}

.gcc-schedule-summary::before {
  content: "▶";
  font-size: 0.8rem;
  transition: transform 0.2s;
}

.gcc-schedule-day[open] > .gcc-schedule-summary::before {
  transform: rotate(90deg);
}

.gcc-schedule-day table {
  margin: 0 !important;
  border: none !important;
}

.gcc-schedule-day .table-responsive {
    margin-bottom: 0;
}

.gcc-talk-list {
  margin: 1.25rem 0 2.25rem;
  border: 1px solid #d9e0e8;
  border-radius: 0.5rem;
  overflow: hidden;
  background: #fff;
}

.gcc-talk-list-header,
.gcc-talk > summary {
  display: grid;
  grid-template-columns: 1.4rem minmax(7rem, 0.8fr) minmax(0, 3fr) minmax(4.75rem, 0.55fr);
  gap: 0.75rem;
  align-items: start;
}

.gcc-talk-list-header {
  padding: 0.65rem 1rem;
  background: #f4f7fa;
  color: #2c3143;
  font-size: 0.82rem;
  font-weight: 700;
  line-height: 1.3;
}

.gcc-talk {
  border-top: 1px solid #d9e0e8;
}

.gcc-talk > summary {
  padding: 0.85rem 1rem;
  cursor: pointer;
  list-style: none;
}

.gcc-talk > summary::-webkit-details-marker {
  display: none;
}

.gcc-talk > summary::before {
  content: "+";
  color: #25537b;
  font-weight: 700;
  line-height: 1.35;
}

.gcc-talk[open] > summary::before {
  content: "-";
}

.gcc-talk > summary:hover,
.gcc-talk[open] > summary {
  background: #f8fafc;
}

.gcc-talk-time,
.gcc-talk-authors,
.gcc-talk-poster {
  color: #475569;
  font-size: 0.92rem;
  line-height: 1.4;
}

.gcc-talk-title {
  display: block;
  color: #25537b;
  font-weight: 700;
  line-height: 1.35;
}

.gcc-talk-authors {
  display: block;
  margin-top: 0.2rem;
}

.gcc-talk-poster {
  justify-self: start;
  padding: 0.12rem 0.45rem;
  border-radius: 999px;
  background: #eaf1f7;
  color: #25537b;
  font-weight: 700;
  white-space: nowrap;
}

.gcc-talk-poster-empty {
  background: transparent;
  color: #94a3b8;
  font-weight: 400;
}

.gcc-talk-abstract {
  padding: 0 1rem 1rem 3.15rem;
  color: #334155;
  font-size: 0.95rem;
  line-height: 1.65;
}

.gcc-talk-abstract p {
  margin: 0.75rem 0 0;
}

@media (max-width: 720px) {
  .gcc-talk-list-header {
    display: none;
  }

  .gcc-talk > summary {
    grid-template-columns: 1.25rem minmax(0, 1fr);
    gap: 0.4rem 0.65rem;
  }

  .gcc-talk-time,
  .gcc-talk-main,
  .gcc-talk-poster {
    grid-column: 2;
  }

  .gcc-talk-time {
    font-weight: 700;
  }

  .gcc-talk-abstract {
    padding: 0 1rem 1rem 2.9rem;
  }
}
</style>

## Talks 1: Galaxy framework and platform direction

<div class="gcc-talk-list">
  <div class="gcc-talk-list-header" aria-hidden="true">
    <span></span>
    <span>Time</span>
    <span>Presentation</span>
    <span></span>
  </div>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">10:50 - 11:05</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">Building an AI-Native Galaxy: Agent Operations, Agent Framework, and MCP</span>
      <span class="gcc-talk-authors"><strong>Baker Dannon</strong>, Chilton John, Van Den Beek Marius</span>
    </span>
    <span class="gcc-talk-poster">Also Poster</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>Natural-language interfaces are showing up everywhere in bioinformatics, but most are still thin wrappers around a single chat box or a one-off demo. In Galaxy, we are taking a different approach: building AI support into the platform itself so the same capabilities are available to Galaxy users inside the UI and to external AI clients through open standards.</p>
    <p>This talk presents Galaxy's emerging AI architecture, which has two pillars. The first is Agent Operations, a new layer built directly into Galaxy and building on the foundational work of the standalone `galaxy-mcp` (https://github.com/galaxyproject/galaxy-mcp/) project. This layer provides a shared set of operations for tools, histories, datasets, workflows, jobs, and IWC integration, and exposes them through a built-in MCP server that any compatible client can connect to remotely. The second is an Agent Framework: a registry of specialized agents with intent-based routing, handoffs between agents, and multi-agent orchestration. Both pillars share the same design principle -- they route through Galaxy's existing service layer, inheriting the same authorization, validation, and operational constraints as any other Galaxy client.</p>
    <p>ChatGXY, Galaxy's in-application chat surface, ties the two pillars together. It is context-aware: it knows where in the application a user is and routes accordingly. On a tool execution page, it understands which tool is being configured. On a failed job, it can pull stderr and stdout for diagnosis. In other contexts, it can route to specialized assistance such as Galaxy Training Network recommendations, history-aware help, and many other tasks built on the same framework. On the external side, any MCP-compatible client -- Claude Desktop, Cursor, or a custom research agent -- can connect to a Galaxy server and access the same operations: searching tools, invoking workflows, monitoring jobs, and inspecting histories.</p>
    <p>This architecture is also a response to a practical problem that many projects are about to face: once AI features start to proliferate, it becomes easy to build several overlapping systems that all need separate maintenance, separate security review, and separate product thinking. By treating AI as shared platform infrastructure rather than as a collection of isolated assistants, Galaxy can add new agents and new clients without rewriting the same capabilities over and over.</p>
    <p>We will demonstrate this shared foundation from both sides -- inside Galaxy through ChatGXY and outside Galaxy through an MCP client -- and discuss what we have learned about building AI infrastructure into a 20-year-old platform without creating parallel systems that will be hard to maintain.</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">11:05 - 11:20</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">Benchmarking AI Agents in Galaxy: Live Integration Testing and Bioinformatics Workflow Evaluation</span>
      <span class="gcc-talk-authors">Collins Tyler*, Qiu Junhao*, Morais Paulo Cilas Lyra Jr, Savage Michelle, <strong>Goecks Jeremy</strong><br />* These authors contributed equally</span>
    </span>
    <span class="gcc-talk-poster">Also Poster</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>Large language model-based agent systems are increasingly integrated into scientific
    computing. These AI agents assist scientists in identifying and executing workflows for the data
    generated across biological experiments. Thus, the Galaxy community is developing a dual
    evaluation framework: assessing the reliability of Galaxy&#39;s native AI agents while understanding
    how effectively external agents perform analyses within Galaxy. Ensuring reliable behavior and
    scientifically valid outcomes is critical for responsible AI-assisted research. We present two
    complementary evaluation frameworks targeting these interconnected challenges.</p>
    <p>The first framework, MCPeval, is a live integration framework developed to assess the reliability
    and correctness of Galaxy’s native AI agent infrastructure. Specifically, this framework
    addresses the question of whether Galaxy’s multi-agent architecture can robustly interpret user
    requests, route them to the appropriate specialized agents, and generate responses consistent
    with the intended system behavior under real deployment conditions. Galaxy employs a router-
    agent architecture in which user queries are classified across multiple functional pathways —
    including tool recommendation, error analysis, pipeline orchestration, and history summarization
    — and subsequently delegated to specialized sub-agents optimized for each task domain.
    MCPeval evaluates this architecture through execution against a live Galaxy server using real
    model inference without mocked responses. The framework integrates two complementary
    evaluation methodologies: deterministic routing validation, which verifies agent delegation
    correctness through inspection of structured JSON outputs, and an LLM-as-judge evaluation
    strategy, which scores open-ended responses using domain-specific rubrics. In addition,
    MCPeval enables systematic cross-model benchmarking by executing identical evaluation
    suites across multiple configured models, including public, privately hosted, and institutionally
    accessible deployments such as models available through the Texas Advanced Computing
    Center.</p>
    <p>The second framework is designed to evaluate the capacity of AI agents to conduct end-to-end
    computational biology analyses within the Galaxy platform. In contrast to MCPeval, which
    focuses on the internal operational behavior of Galaxy’s native agent system, this framework
    addresses a distinct scientific question: can an AI agent — whether Galaxy-native or externally
    developed — accurately interpret bioinformatics task specifications, interact with Galaxy tools
    and datasets, execute the necessary analytical procedures, and produce scientifically valid
    outputs? To investigate this question, we evaluate agent performance using BixBench-Verified-
    50, a benchmark of 50 verified tasks spanning diverse analytical domains and workflow
    complexities. By executing these benchmark tasks within Galaxy, the framework simultaneously
    evaluates the analytical competence of AI agents and the suitability of Galaxy as an execution
    environment for AI-driven computational research workflows.</p>
    <p>These frameworks provide a foundation for systematic adoption and governance of AI-driven
    scientific workflows. Beyond evaluating current systems, they establish a reproducible
    methodology for assessing emerging technologies. This is vital for Galaxy, where rigor and trust
    must coexist with rapid AI innovation. Validating agent behavior in realistic computational
    environments, these frameworks position Galaxy to remain interoperable with the scientific AI
    ecosystem and ensure automation translates into meaningful research outcomes.</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">11:20 - 11:35</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">Beyond the Tool Panel: New Features for Improved Tool Discovery and Management</span>
      <span class="gcc-talk-authors"><strong>Awan Ahmed</strong>, Grüning Björn, Lopez David, Schatz Michael</span>
    </span>
    <span class="gcc-talk-poster">Also Poster</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>Finding the right tool for your analysis or workflow is at the heart of Galaxy’s user experience. Within the Galaxy interface, the Tool Panel has always been the main and central hub for users to find tools that exist in the server, since the platform’s inception. Several improvements have been made to that panel in that time-frame which have made tool discovery within that minimal interface more efficient. However, that minimal panel's instant search is not always sufficient to discover new tools without prior tool knowledge, while it is also not personalized enough to quickly access frequently used tools. In this talk, we will highlight two of Galaxy’s latest features that have been designed to solve these problems and re-imagine how users discover and access tools in Galaxy.</p>
    <p>The first of these is a rich Tool Discovery View, which provides an extensive interface for users to discover new tools in Galaxy. This view is driven by a search that is more extensive because it leverages the back-end which accesses more metadata about tools than the instant (front-end) panel search. This view also organizes and categorizes tools based on EDAM ontologies (https://edamontology.org/). EDAM is a comprehensive ontology of bioinformatics operations, data types, topics and formats, and using this information, each tool is displayed in modern cards with detailed information about the tool, including its description, categories, and various tags.</p>
    <p>While we've worked on making the discovery of new tools easier, we also wanted to make it easier for users to access tools they already know and use frequently. To that end, we have added the ability for users to personalize their tool panel with an all new &quot;My Tools&quot; panel view, which is designed to be a personalized hub for users to quickly access the tools they use most often, without having to navigate through the entire tool panel.</p>
    <p>Future plans for this feature intend to leave behind the strict panel-section-tied grouping of tools in the interface, and instead lean on tool tags which will provide a much more flexible way of grouping tools due to the multiplicity of tags that can be assigned to each tool. We also aim to allow the sharing of tools with other users, to help create shareable tool sets, as rated by actual user needs rather than admin-curated categories.</p>
    <p>The core mission behind these improvements is to make tool discovery more in-depth, while also bridging the gap between admin-curated organization and user-specific needs. We hope to share these features with the Galaxy community and get feedback on how we can further improve the experience of discovering and accessing tools in Galaxy.</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">11:35 - 11:50</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">User-Defined Tools: From LLM-Generated Analysis to Reproducible, Validatable Workflows</span>
      <span class="gcc-talk-authors"><strong>Van Den Beek Marius</strong>, Baker Dannon, Chilton John</span>
    </span>
    <span class="gcc-talk-poster gcc-talk-poster-empty">-</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>Last year's introduction of User-Defined Tools provided Galaxy users with a framework to create their own tools using JavaScript expressions and JSON inputs, bypassing the traditional XML tool language and its lengthy review process. By leveraging Pydantic models, JSON Schema, and Monaco editor integration, users gained a streamlined, safe path to extending Galaxy's capabilities on the fly.</p>
    <p>This talk expands on that foundation in two directions. First, it addresses the rise of LLM-generated analysis code. Large language models are increasingly used to produce one-off scripts and workflow fragments, but these outputs are typically ephemeral and difficult to reproduce. User-defined tools offer a natural packaging format for LLM-generated code: they provide structured inputs, typed parameters, and containerized execution, turning throwaway snippets into reusable, recomputable components that can be embedded in Galaxy workflows.</p>
    <p>Second, the talk presents a graduated path from personal user-defined tools to community-shared best-practice tools. This includes mechanisms for promoting a user-defined tool through stages of peer review, testing, and annotation until it reaches the status of a curated community tool — without requiring the full overhead of the traditional IUC toolshed review process. The goal is to lower the barrier for contributions while preserving quality.</p>
    <p>Finally, the talk discusses how the typed, schema-driven nature of user-defined tools enables end-to-end workflow validation independent of the Galaxy runtime. Because tool inputs and outputs are formally described, workflows composed of these tools can be checked for type correctness, parameter compatibility, and structural soundness as static artifacts — making them portable and verifiable across platforms.</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">11:50 - 12:05</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">Charting the Course: Developing the First Cross-Project Roadmap for the Galaxy Ecosystem</span>
      <span class="gcc-talk-authors"><strong>Kucher Natalie</strong></span>
    </span>
    <span class="gcc-talk-poster">Also Poster</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>The Galaxy Project has long thrived as a distributed, community-driven ecosystem, and its growing global adoption has brought an exciting expansion of internationally funded projects and distributed developer teams. With this growth comes a recognized need for greater visibility into development priorities and strategic directions across the Galaxy community, including users, developers, and PIs. As a first step towards better alignment,, the US Galaxy team has developed a year-long, cross-project roadmap spanning the major US-funded Galaxy projects, including Galaxy main (usegalaxy.org), AnVIL, BRC.Analytics, the CFDE Cloud Workspace, ITCR, and beyond. Here we discuss the process, structure, and outcomes of that effort.</p>
    <p>Building a shared roadmap across projects with distinct funding, organization, and user communities requires coordination across the Galaxy Steering Committee, Technical Board, and Working Groups. We gathered input from these developer groups and PIs representing the funded projects, synthesized and translated the aims into a prioritized, publicly visible roadmap hosted on GitHub (gxy.io/roadmap). The roadmap gives visibility to near-term aims, strategic focus areas, and community needs, offering a mechanism to improve alignment of activities across multiple projects. We review the roadmap quarterly, reflecting on activities that are completed or in progress to ensure timely work and can forecast sufficient bandwidth for future work. We received very positive feedback on the first roadmap process and plan to improve it in future iterations by gathering input from the broader community on the roadmap, defining activities more concretely, and shaping items into more uniform scope.</p>
    <p>We will reflect on lessons learned: what made cross-project alignment difficult, where consensus emerged, and how the roadmap is shaping coordination among teams. We will also discuss how we could incorporate internationally funded projects so that the full breadth of work happening across the global Galaxy ecosystem is represented. This initiative represents a meaningful step toward more transparent governance for the Galaxy ecosystem.</p>
  </div>
</details>
</div>

## Talks 2: Infrastructure, federation, and service operations

<div class="gcc-talk-list">
  <div class="gcc-talk-list-header" aria-hidden="true">
    <span></span>
    <span>Time</span>
    <span>Presentation</span>
    <span></span>
  </div>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">13:00 - 13:15</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">If you love something, set it free. If it comes back, it’s yours - A Galaxy perspective on outsourcing user identity management</span>
      <span class="gcc-talk-authors"><strong>Price Gareth</strong>, Goonasekera Nuwan, Bromhead Catherine, Mather Marius, Zhu Amanda, Mok Winnie, Winter Uwe, Lee Justin, Makunin Igor, Hyde Cameron, Ward Nigel, Manos Steven, Amarapathy Samitha</span>
    </span>
    <span class="gcc-talk-poster">Also Poster</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>Galaxy Australia recently migrated user identity management to BioCommons Access, a federated, single-sign-on identity and access provider for the Australian BioCommons. The goal was to support stronger identity assurance, fine-grained access and quota controls, and smoother movement of data between trusted research services. What sounded like a straightforward SSO migration was, in practice, a deep reworking of how Galaxy Accounts relate to externally managed identities.</p>
    <p>The migration was simultaneously actioned by another institutional partner, making the likelihood of account collisions higher, adding to the complexity of the move. Migration touched approximately 50,000 legacy accounts, including duplicates, thousands of which required action related to username or email addresses. Moving this user base into a federated identity model required bulk transformation, manual curation, extensive user communication, and new operational processes for trust, uptime, and support across organisational boundaries.</p>
    <p>The work also drove upstream changes in Galaxy’s OIDC support. Contributions included configurable extension points for OIDC authentication flows, access-token decoding in the authentication pipeline, synchronisation of provider-managed email and username attributes back into Galaxy. Crucially, the work also helped to unify Galaxy’s bifurcated OIDC implementations for Keycloak and Python Social Auth (PSA), providing a backward-compatible, unified implementation of OIDC based solely on PSA, which greatly simplifies Galaxy’s codebase and improves maintainability going forward. Together, these changes make Galaxy better suited to services that rely on centralised identity and access management rather than local account ownership alone.</p>
    <p>We will present both the technical and procedural lessons from this work: large-scale account reconciliation, modernising legacy identity data, adapting user profiles and login flows, redefining support boundaries when authentication becomes a shared responsibility, and maintaining trust and operational continuity during a disruptive change. After invalidating more than 21 million user sessions, users returned, and Galaxy Australia continued with a stronger foundation for interoperable identity.</p>
    <p>This talk will be relevant to Galaxy operators and research infrastructure providers considering SSO or federated identity and access management, especially those facing legacy accounts, imperfect user data, and the practical challenges of integrating Galaxy with externally managed identity systems.</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">13:15 - 13:30</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">A New Star in the Galaxy: Canada is Joining the UseGalaxy.* International Federation</span>
      <span class="gcc-talk-authors"><strong>Jacques Pierre-Étienne</strong>, Davis John, Gauthier Carol, Fortin Jérôme, Barrette Michel</span>
    </span>
    <span class="gcc-talk-poster">Also Poster</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>We will detail the establishment and operational evolution of UseGalaxy Canada (UseGalaxy.ca), a national initiative designed to provide Canadian researchers with access to a free public Galaxy service. Supported by the Digital Research Alliance of Canada (https://www.alliancecan.ca), UseGalaxy Canada leverages Cloud and Advanced Research Computing (ARC) resources tailored to the Canadian research landscape while remaining open to international collaborators. As such, UseGalaxy Canada is fully operational and provides services to users from academic and research institutions worldwide.</p>
    <p>The timing of the 2026 Galaxy Community Conference (GCC26) serves as an important milestone, marking the formal integration of UseGalaxy Canada (UseGalaxy.ca) into the global UseGalaxy.* federation. Since its launch in 2024, the initiative has undergone a rigorous &quot;ramp-up&quot; phase, scaling its production infrastructure and expanding its core technical team. Through this period of iterative development, UseGalaxy.ca has attained the operational maturity and institutional expertise required to support the anticipated influx of global users and the high-throughput demands associated with the UseGalaxy.* designation.</p>
    <p>In this presentation, we will provide a comprehensive overview of the technical and organizational pillars supporting UseGalaxy Canada. This includes the infrastructure architecture and a breakdown of the large-scale Cloud and ARC resources that power the platform’s backend to ensure reliability and scalability. We will also present usage statistics that demonstrate the platform’s rapid adoption within the Canadian and international scientific communities. We will also offer insights into the outreach strategies, cross-institutional partnerships, and specialized training events that have been instrumental in building a sustainable user base.</p>
    <p>Finally, we will present a roadmap for the future evolution of the platform, specifically regarding development, service improvements, computational resources, and team support.</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">13:30 - 13:45</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">Modern Analysis Scales, And So Too Must Galaxy</span>
      <span class="gcc-talk-authors"><strong>Coraor Nate</strong></span>
    </span>
    <span class="gcc-talk-poster gcc-talk-poster-empty">-</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>The usegalaxy.org public Galaxy service serves thousands of researchers worldwide, distributing computational workloads across a diverse set of HPC and cloud resources located across the United States. Each site brings its own storage systems, unique system configurations, and failure modes. This talk provides an update on the infrastructure and deployment of usegalaxy.org to improve the scalability, reliability, and manageability of this multi-site compute architecture.</p>
    <p>A major focus has been the standardization of Pulsar endpoint deployments. Previously, each remote compute site was deployed and configured independently, leading to operational complexity and configuration drift. We have developed a unified deployment framework that brings all HPC Pulsar endpoints under a common configuration and management strategy. This work has also included the deployment of Pulsar Relay, a new communication model in which the Pulsar server initiates connections to Galaxy without the need of an AMQP server, vastly simplifying the deployment and requiring fewer open firewall ports than ever before.</p>
    <p>On Jetstream2, the NSF’s elastic cloud, scaling via Slurmscale continues to evolve. The Slurmscale deployment process has matured considerably. Recent improvements include support for Interactive Tools on isolated cloud instances, the ability to run instances in multiple projects (bringing us ever closer to “bring-your-own-compute”), and improved utilization of existing resources.</p>
    <p>We have also made changes to Galaxy's job lifecycle to improve reliability at scale. When Galaxy dispatches jobs to remote Pulsar endpoints, transient failures - network interruptions, service restarts, or slow metadata operations - can leave jobs in non-terminal states that require manual intervention. New work introduces robustness to make job completion resilient to these failure scenarios, reducing the operational burden of running Galaxy across many distributed compute sites. Additionally, modifications to the process of cleaning scratch space on HPC systems has improved resilience.</p>
    <p>Supporting this multi-site architecture requires continuous attention to resource routing and observability. Total Perspective Vortex (TPV) rules are regularly tuned to match tools with appropriate compute resources based on their requirements. CVMFS unprivileged mounting and caching strategies have been developed to smooth out the differences and data access on remote endpoints. And new observability tooling provides better visibility into Galaxy process behavior and system health.</p>
    <p>This talk will cover these developments as deployed for usegalaxy.org, with an emphasis on practical lessons for Galaxy administrators managing, or desiring to manage, distributed compute infrastructure for Galaxy.</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">13:45 - 14:00</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">Evolving TPV: recent advances in resource-aware scheduling for Galaxy</span>
      <span class="gcc-talk-authors">Goonasekera Nuwan, <strong>Van Den Beek Marius</strong>, Bromhead Catherine, Bernt Matthias, Chilton John, Grüning Björn</span>
    </span>
    <span class="gcc-talk-poster gcc-talk-poster-empty">-</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>Total Perspective Vortex (TPV) is Galaxy’s rule-based scheduling layer for right-sizing job resources and routing jobs to suitable destinations using configurable YAML rules. It allows sites to express policies around tools, users, roles, and destinations, while also reusing a shared community database of default resource requirements and scheduling rules.</p>
    <p>This talk will provide an update on the most significant changes to TPV since the v3 series began. A major theme has been stronger configuration validation and maintainability: TPV 3.0 introduced Pydantic-backed configuration support, added type checking to the linter, added linting for unexpected fields, and improved support for multi-file configurations, making large, layered TPV deployments easier to validate and safer to evolve. Later v3 releases continued that work by fixing inheritance handling across multiple config files and adding a merged-config dump, improving confidence for sites that compose shared and local rules together.</p>
    <p>A second major theme has been better integration with Galaxy tool metadata and stronger policy controls. Since v3.0, TPV has gained basic support for consuming tool-defined resource requirements and, more recently, support for accepting or rejecting jobs based on tool_type. Together, these changes reduce duplication between tool metadata and TPV policy, while giving administrators safer defaults and finer control over how different classes of tools are scheduled.</p>
    <p>Finally, TPV has become much easier to debug and explain. Recent additions such as the enhanced dry-run tooling, the new --explain mode, and merged configuration dumping make it far easier to inspect why TPV made a scheduling decision and to teach or troubleshoot complex rule sets in production.</p>
    <p>Overall, this update will show how the v3 series has pushed TPV beyond a flexible scheduler into a more robust, introspectable, and administrator-friendly tool for operating Galaxy at scale, as well as how the shared db has continued to accrue more sophisticated and scalable rules.</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">14:00 - 14:15</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">The Global Galaxy Registry: Structured Metadata and Dynamic Discovery Across 180+ Instances</span>
      <span class="gcc-talk-authors"><strong>Savage Michelle</strong>, Grüning Björn, Price Gareth, Schatz Michael</span>
    </span>
    <span class="gcc-talk-poster">Also Poster</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>The Galaxy platform is deployed across hundreds of independently operated instances worldwide spanning national research infrastructures (usegalaxy.org, usegalaxy.eu, usegalaxy.org.au), domain-specific servers (e.g., microbiology, proteomics, single cell sequencing), and institutional deployments at research consortia across dozens of countries. Despite this scale, discoverability of instance capabilities remain limited which constrains efficient resource utilization and cross-instance collaboration. This work describes a coordinated set of contributions to the Galaxy Hub and Galaxy Instances initiative to address these challenges.</p>
    <p>At the core is a YAML-based instance schema that captures canonical metadata across several structured dimensions: access model (public/private/academic-only), supported Galaxy version, domain specialization, geographic location, tool panel composition, and reference data. To facilitate, instance operators submit metadata via a templated pull-request at gxy.io/instances-join against the galaxy-hub repository, enabling transparent community curation and version-controlled provenance.</p>
    <p>On the presentation layer, enhancements were made to the Galaxy Hub to support filtering by location, domain, reference genomes, and tool versions, alongside an interactive OpenLayers-powered global map visualization that can all be viewed at gxy.io/instances-view. To date, this system has structured metadata for over 180 public Galaxy instances and established a submission pipeline that has reduced onboarding friction for new deployments. Ongoing work focuses on automated metadata refresh via CI/CD workflows, schema versioning to accommodate heterogeneous deployment configurations, and API endpoints that would allow downstream ecosystem services — including alignment with the Special Interest Groups, the Galaxy Training Network, and various workflow repositories.</p>
    <p>Beyond the metadata, we describe an architecture for incorporating dynamic operational signals - including availability status via uptime monitoring endpoints, active Galaxy version, and toolset composition derived from ToolShed identifiers in order to move toward a live representation of the ecosystem state. By treating Galaxy instances as first-class, semantically described infrastructure resources rather than static web listings, this work improves computational resource discovery for researchers, reduces duplication across the broader ecosystem, and improve upon the federated Galaxy infrastructure.</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">14:15 - 14:30</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">Secure Cloud-based Analysis of Human Genomic Data with Galaxy on AnVIL</span>
      <span class="gcc-talk-authors"><strong>Afgan Enis*, Narvaez-Bandera Isis*</strong>, Suderman Keith, Morais Lyra Jr Paulo Cilas, Schatz Michael, Goecks Jeremy<br />* These authors contributed equally</span>
    </span>
    <span class="gcc-talk-poster">Also Poster</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>As human genomic datasets increase in scale, complexity, and sensitivity, reproducible analysis requires not only well-designed workflows but also cloud infrastructure that can execute them in a secure manner, efficiently, and at low cost. Galaxy provides accessible, provenance-preserving execution, while AnVIL (https://anvilproject.org/) provides governed workspaces for protected datasets. We present a recent set of advances for Galaxy on AnVIL that address both dimensions: reusable, vetted workspaces for common genomic analyses, and a new elastic deployment model that makes running them practical at scale.</p>
    <p>On the workflow side, we have packaged analyses from the IWC Workflow Library (https://iwc.galaxyproject.org/) into ready-to-launch AnVIL workspaces. These cover RNA-seq differential expression, downstream functional enrichment, and machine-learning workflows for tabular and image-based data, supporting end-to-end analyses from count-based transcriptomic inputs through statistical testing, pathway interpretation, and predictive modeling, with full analytical provenance maintained through Galaxy histories. To validate this approach, we applied these workflows to GTEx transcriptomic data within AnVIL - a valuable testbed comprising more than 2,000 samples across many human tissues with rich donor metadata. As a pilot, we compared young (20–49 years) versus old (60–79 years) individuals across 21 tissues, using the brain as a representative example (n=54 vs. n=146). Across 56,200 tested genes, differential expression analysis identified 124 genes with adjusted p&lt;0.05, including 30 with |log2FC|≥1. Upregulated genes included LGR5, associated with cellular regeneration, while mitochondrial genes MT-TP and MT-TE decreased with age. Enrichment analysis highlighted immune-related functions, chemokine signaling, and metabolic and membrane-associated pathways.</p>
    <p>On the infrastructure side, this pilot also exposed limitations of the previous Galaxy-on-AnVIL deployment model, in which per-user Galaxy instances ran on fixed-size GKE clusters that bundled the Galaxy service with analysis compute. This forced users to provision for peak workloads at all times, increasing cost and complicating operations. We therefore developed a new elastic model in which Galaxy runs on a lightweight virtual machine, with user jobs dynamically dispatched to Google Cloud Batch. This decoupling reduces idle cloud cost, improves startup time, and allows large analyses to scale only when needed - a critical property as we move toward broader analyses spanning more samples and tissues.</p>
    <p>Together, these workflow, workspace, and infrastructure advances form a cohesive framework for reproducible, data-proximal analysis of controlled-access genomic data in secure cloud environments. In this presentation, we will demonstrate the developed AnVIL workspaces, share preliminary results from the GTEx pilot, and summarize the benefits of the new deployment model.</p>
  </div>
</details>
</div>

## Talks 3: Communities, provenance, and cross-domain expansion

<div class="gcc-talk-list">
  <div class="gcc-talk-list-header" aria-hidden="true">
    <span></span>
    <span>Time</span>
    <span>Presentation</span>
    <span></span>
  </div>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">16:00 - 16:15</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">Galaxy Ecology: 2026 update</span>
      <span class="gcc-talk-authors"><strong>Le Bras Yvan</strong>, Seguineau Pauline, Galaxy Ecology Community</span>
    </span>
    <span class="gcc-talk-poster">Also Poster</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>Since 2018, the Galaxy Ecology initiative has allowed Biodiversity data related research fields to rely on an accessible, reproducible and transparent solution to share analytical processes.</p>
    <p>For more than 6 years, Galaxy Ecology initiative has been devoted to integrating into the Galaxy ecosystem a minimal basis of tools, workflows and tutorials to deal with Biodiversity data. In 2025, we finally published our founding article as a guidance framework to apply best practices in ecological data analysis, demonstrating the relevance of the atomization-generalization framework developed. Last year was also an amazing year for Galaxy-E as several projects joined our effort and we accompanied the growth of the Galaxy Earth System Science sister community at both national and European levels. Finally, within a year, important work was initiated on several topics, such as interoperability with the Jupyter Notebook ecosystem or facilitating AI-based scientific methods used by citizen science projects.</p>
    <p>We propose here to look back on the richness of the past year and present ongoing Galaxy Ecology activities so we can showcase all the benefits we are gaining thanks to Galaxy Communities and how we are trying to also make others benefit from our work.</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">16:15 - 16:30</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">Advancing Earth System Research Through Galaxy, Data Terra, and EOSC Collaboration</span>
      <span class="gcc-talk-authors"><strong>Jossé Marie</strong>, Seguineau Pauline, Le Bras Yvan, Detoc Jérôme, Norvez Olivier, Grellet Sylvain, Rizzo Alessandro, Keuchkerian Samuel, Delaporte Pascal, Bodéré Erwan, Sarramia David, Guimont Mathieu</span>
    </span>
    <span class="gcc-talk-poster">Also Poster</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>Three years after its first stumbling steps, the Earth System community within Galaxy continues to grow. Initiated within  the 3-year project EOSC FAIR-EASE, and building upon the Galaxy-ecology works, the European subdomain Galaxy for Earth System Sciences (GESS) is now evolving with the Data Terra Research Infrastructure. Data Terra is dedicated to Earth observation and environmental data plays a central role in ensuring GESS’s sustainability and growth both within the French scientific community and across Europe.</p>
    <p>GESS is designed to address the needs of Data Terra’s partners, offering a dual instance: a French national platform and a European one. This architecture enables researchers to access tailored resources and services, supporting both local and international research activities. To strengthen this infrastructure, Data Terra collaborates closely with IFB research infrastructure (the French ELIXIR node). GESS now benefits from a dedicated subdomain on usegalaxy.fr, further integrating Galaxy’s capabilities into Earth System Sciences.</p>
    <p>As an EOSC (European Open Science Cloud) node, Data Terra contributes to a federated network of services and fosters collaborations with other EOSC nodes. GESS enables interdisciplinary research and data-driven innovation. These collaborations are creating new opportunities for scientists to leverage Galaxy’s reproducible and scalable analysis framework in Earth System Sciences.</p>
    <p>Key use cases illustrate the impact of GESS:</p>
    <p>Dead Trees (in collaboration with NFDI4Earth): Analyzing satellite and field (in situ) data to understand forest health and  climate change impacts on ecosystems. Hunga Tonga eruption: integrating multi-source Earth observation data to analyse the eruption’s global atmospheric and climatic effects. Cross-disciplinary Research: Supporting studies that combine environmental, geological, and biological data to address complex challenges like biodiversity loss or  resource management. Data Terra’s five thematic hubs—AERIS (atmosphere), FORMATER (solid Earth), ODATIS (ocean), PNDB (biodiversity), and THEIA (land surfaces)—provide datasets and use cases, such as studying the interplay between land-use changes, pollution, and ecosystem dynamics. By bridging national and European efforts, Data Terra and GESS are contributing to a more interconnected and FAIR research ecosystem. This abstract invites the Galaxy community to explore how GESS and Data Terra are shaping the future of Earth System Sciences through collaboration, innovation, and open science.</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">16:30 - 16:45</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">Natural Language Processing in Galaxy: Integrating Stanford CoreNLP and spaCy for the Digital Humanities</span>
      <span class="gcc-talk-authors"><strong>Schneider Daniela</strong>, Suderman Keith</span>
    </span>
    <span class="gcc-talk-poster">Also Poster</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>Galaxy has a long and successful history in bioinformatics and the natural sciences. Its domain-agnostic platform design, however, extends well beyond these fields. One of the latest Special Interest Groups (SIGs) has emerged from the Digital Humanities (DH) and Social Sciences, where researchers increasingly require computational tools for analyzing large text corpora but often lack programming expertise. In this talk, we present the integration of two leading Natural Language Processing (NLP) frameworks into Galaxy: Stanford CoreNLP and spaCy.</p>
    <p>Stanford CoreNLP is a Java‑based NLP toolkit with a unified annotation pipeline; our Galaxy wrapper exposes its full pipeline in eight languages. spaCy is a Python library that delivers fast, accurate processing using pretrained models for more than 25 languages. By supporting multiple languages, both tools help overcome the English‑centric bias of many Digital‑Humanities applications, enabling a more inclusive, multilingual research environment.</p>
    <p>Both tools run in Docker containers for consistent execution across deployment environments and produce output in common NLP standards like JSON, CoNLL, CONLL-U, and plain text. Language models are managed through Galaxy's data manager framework and presented as selectable options in the tool interface. This design means researchers can perform sophisticated NLP tasks—analyzing sentiment in historical documents, extracting named entities from literary corpora, or parsing syntactic structure across multilingual text collections—without writing a single line of code. Introducing those two tools, which normally run in separate environments, allows users to quickly compare which tool is most accurate for their analysis without downloading anything or learning to code.</p>
    <p>Moreover, integrating Stanford CoreNLP and spaCy into Galaxy connects those tools to the full Galaxy ecosystem.  Researchers can leverage them within fully reproducible, shareable workflows that interoperate with thousands of existing Galaxy tools. <br />A typical workflow might involve (i) bulk upload of images, (ii) optical character recognition (OCR) to plain text, (iii) token‑level processing with spaCy or CoreNLP, (iv) sentiment analysis,  (v) extraction of persons, places, and organisations via named entity recognition (NER), and (vi) visualisation or statistical modelling with Galaxy’s various visualisation tools.<br />Researchers could upload archival material, use Tesseract to extract text from the images, and then clean the text with regular expression tools. The NLP tools allow for extracting locations from administrative files and visualising, for example, how the focus of foreign policy shifted. Instead of doing this manually, Galaxy enables “distant reading” to generate insights for hypothesis testing or large-scale information extraction.<br />Sharing workflows is easy, allowing domain experts to incorporate best practices for users less familiar with the tools. Each workflow can be executed on high‑performance compute clusters, version‑controlled, and exported with a single click—fulfilling FAIR data‑management principles and facilitating transparent peer review.</p>
    <p>By unifying OCR and advanced NLP within a single, reproducible environment, the new Galaxy tools lower technical barriers, accelerate hypothesis testing, and open up vast corpora of previously inaccessible material to quantitative inquiry. This is a foundational step for the DH SIG, and we welcome collaboration with the Galaxy community to expand the range of NLP capabilities available on the platform.</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">16:45 - 17:00</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">LabID Meets Galaxy: Continuous Provenance from Samples to Results</span>
      <span class="gcc-talk-authors"><strong>Thomas Laurent</strong>, Girardot Charles, Scholtalbers Jelle, Monfort Matthias, Reza Nayeem</span>
    </span>
    <span class="gcc-talk-poster">Also Poster</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>Scientific laboratories generate diverse datasets across sequencing, imaging, and proteomics platforms. Connecting structured data management to reproducible analysis in Galaxy can involve manual transfers, metadata loss, and incomplete provenance tracking.</p>
    <p>Lab Integrated Data (LabID) is an open-source (gitlab.com/lab-integrated-data/) and FAIR data management platform developed at EMBL that goes beyond electronic lab notebooks. It manages samples, assays, and datasets within a unified system, capturing their relationships to build a continuous provenance chain from biological specimens to raw data while maintaining a tight connection to scientists’ notebook. LabID natively supports diverse technologies, ranging from sequencing to imaging, and can be leveraged to manage any experimental setup following the ISA model. This enables efficient handling of complex projects in which samples are assayed across multiple modalities.</p>
    <p>We present LabID's integration with Galaxy, enabling a seamless loop between experimental data management and computational analysis. Data can be sent from LabID to Galaxy for processing, and analysis results are imported back into LabID, where they are linked to the original samples, assays, and workflows. This closes the gap between experimental and computational steps, ensuring that derived datasets retain full context and traceability and can be efficiently shared.</p>
    <p>Workflows and their executions are captured as first-class objects. LabID can import workflows from Galaxy or WorkflowHub, and import Galaxy workflow invocations to record parameters, inputs, and outputs, extending provenance from raw data through computational processing. LabID adopts the RO-Crate standard for workflow exchange: imported workflow crates are validated, versioned, and linked to their source repository, while workflow runs, including execution parameters, input and output datasets, can be exported as Workflow Run RO-Crate packages. This enables researchers to publish reproducible analysis records to WorkflowHub or share them with collaborators through any RO-Crate-compatible platform.</p>
    <p>LabID provides an on-premise platform where data flows to Galaxy for computation and returns with provenance intact. By unifying experimental and computational metadata, LabID enables reproducible research aligned with FAIR principles.</p>
    <p>Further information and a demo are available at https://labid-demo.embl.de/</p>
    <p>This development is supported by the OSCARS European project under grant agreement No 101129751.</p>
  </div>
</details>
</div>

## Talks 4: FAIR data analysis workflows and public health applications

<div class="gcc-talk-list">
  <div class="gcc-talk-list-header" aria-hidden="true">
    <span></span>
    <span>Time</span>
    <span>Presentation</span>
    <span></span>
  </div>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">10:30 - 10:45</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">FAIRyMAGs: A Modular, FAIR-Compliant Galaxy Workflow Suite for Flexible and Scalable Metagenome-Assembled Genome Reconstruction</span>
      <span class="gcc-talk-authors"><strong>Zierep Paul</strong>, Batut Bérénice</span>
    </span>
    <span class="gcc-talk-poster">Also Poster</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>Advances in whole-genome sequencing (WGS) have enabled large-scale recovery of metagenome-assembled genomes (MAGs), offering unprecedented insights into microbial diversity across environments. Despite these advances, MAG reconstruction remains computationally intensive and methodologically complex, often requiring the integration of multiple specialized tools for quality control, assembly, binning, refinement, and annotation. Existing workflows frequently rely on scripting-based implementations, limiting accessibility, reproducibility, and adaptability for many researchers and community-driven initiatives.</p>
    <p>To address these challenges, we present FAIRyMAGs, a FAIR-compliant, modular workflow suite built entirely within the Galaxy platform for generating and analyzing MAGs. FAIRyMAGs is supported by the ELIXIR Biodiversity, food security and pathogens (BFSP) programme and developed in collaboration with four ELIXIR nodes.</p>
    <p>FAIRyMAGs encompasses six interconnected workflows covering all key steps of MAG reconstruction, including read preprocessing, host contamination removal, assembly, binning, dereplication, and downstream taxonomic and functional annotation.</p>
    <p>By leveraging Galaxy’s graphical interface, federated compute infrastructure, and robust workflow management, FAIRyMAGs enables researchers to perform complex analyses without requiring local installation or programming expertise. Its modular design allows flexible adaptation, iterative optimization, and seamless integration of new community-contributed tools, empowering both novice and advanced users. In particular, this modular approach, rather than a rigid end-to-end workflow, represents a key advantage of the implementation, and we highlight it here as a model for building more flexible, reusable, and community-extensible Galaxy workflows.</p>
    <p>Furthermore, integrating a framework into Galaxy to benchmark different binners and bin refiners using the CAMI infrastructure enables the identification of optimal conditions for specific biomes. This approach moves away from the common “more is better” strategy in many pipelines, reducing unnecessary computational effort and its associated environmental impact in high-throughput analyses.</p>
    <p>We validated FAIRyMAGs using the CAMI II plant-associated benchmark dataset, demonstrating performance comparable or superior to established pipelines such as MGnify, nf-core, or MAGNETO. Additionally, application to four real-world microbiome datasets, spanning host-associated and environmental systems, revealed significant variability in MAG recovery, community complexity, and clustering structure, highlighting the importance of adaptable workflows tailored to dataset-specific characteristics.</p>
    <p>To further enhance efficiency, FAIRyMAGs incorporates a machine learning-based framework to predict memory requirements for metagenomic assembly, enabling more informed and efficient resource allocation in large-scale analyses. However, current limitations in leveraging workflow outputs for dynamic resource selection within Galaxy’s job scheduling (e.g. TPV-based allocations) prevent this approach from reaching its full potential. This highlights an important opportunity for future development and community discussion within Galaxy.</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">10:45 - 11:00</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">FAIR Workflows and Training for Single-Cell Analysis in Galaxy and Beyond</span>
      <span class="gcc-talk-authors"><strong>Loach Marisa</strong>, Rue-Albrecht Kevin (Fellow)</span>
    </span>
    <span class="gcc-talk-poster">Also Poster</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>Single-cell omics enables researchers to investigate life at the scale of the smallest biological unit. However, researchers can be deterred from using this technique by the confusing array of tools and the apparently complex analysis process. As part of BioFAIR’s efforts to develop FAIR infrastructure in the UK, we are making single-cell workflows more Findable, Accessible, Interoperable, and Reusable across the Galaxy, Bioconductor, and Nextflow communities.</p>
    <p>Connecting the fragmented landscape of single-cell tools across these three platforms will make it easier for users to Find and Access the tools they need. Developing consistent workflows and training materials will make analyses more Interoperable and enable users to move more easily between platforms. Alongside efforts to align single-cell metadata across platforms, a BioFAIR Pathfinder project is using exemplar single-cell workflows to demonstrate how Bioconductor tools can be adapted into Galaxy wrappers and nf-core modules. New workflows will demonstrate the improved interoperability between Galaxy and Bioconductor single-cell tools.</p>
    <p>The final component in FAIR is Reusability. Making tools and workflows available isn’t enough to ensure that researchers will actually reuse them, particularly in a field such as single-cell that can be intimidating for life scientists with limited computational experience. Annotated Galaxy workflows coupled with hands-on Galaxy Training Network (GTN) tutorials can introduce these users to single-cell analysis. However, taking the next step and applying these workflows to new research questions can still be challenging. A series of online workshops, targeted at students and Early Career Researchers (ECRs) from institutions with limited bioinformatics support, is guiding users through this transition. Feedback from these workshops will be used to improve the GTN tutorials to better enable future users to adapt and reuse Galaxy workflows for their own purposes.</p>
    <p>Both BioFAIR single-cell projects will unite in September for a Galaxy-Bioconductor Cofest and Bring Your Own Data event at The Open University. Participants of the single-cell workshops will be supported through their first independent analysis and encouraged to make their own contributions to the GTN. Meanwhile, Galaxy and Bioconductor contributors will collaborate to ensure these users have the tools and workflows they need, whether they use Galaxy, Bioconductor, or move between platforms.</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">11:00 - 11:15</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">Phylogenomic and Functional Analysis of Ethiopia’s First Marburg Virus Outbreak Highlights a Single Spillover Event and Preserved Vaccine Targets</span>
      <span class="gcc-talk-authors"><strong>Bashea Chala</strong>, Getu Melak, Gebremicael Gebremedhin, Ali Abraham, Marburg Virus Outbreak Task Force, Tadese Gemechu, Tollera Getachew</span>
    </span>
    <span class="gcc-talk-poster">Also Poster</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>In November 2025, Ethiopia reported its first Marburg virus disease outbreak with a 64% case fatality rate. Genomic epidemiology was applied to characterize transmission dynamics, phylogeny, and mutations relevant to vaccine and monoclonal antibody efficacy. Samples were processed at the Ethiopian Public Health Institute (EPHI). RNA was extracted after ethanol inactivation and screened by PCR for viral hemorrhagic fevers and arboviruses. Marburg virus-positive samples were sequenced using the Illumina Viral Surveillance Panel 2 on the NovaSeq X plus and MiSeq platforms. Analyses were performed on the European Galaxy server, including quality filtering (fastp), host depletion (Bowtie2), reference mapping (BWA-MEM2), variant calling and consensus generation (iVar), and lineage assignment (Nextclade). Phylogenetic and temporal analyses were performed using 103 global genomes in BEAST with a Skygrid model. MVD diagnosis was confirmed by RT-PCR, and positive samples underwent full‑genome sequencing. Seven high‑quality genomes (genome coverage &gt;70%) from the Ethiopian outbreak were successfully sequenced and analyzed alongside 103 global genomes derived from humans and the natural bat host, Rousettus aegyptiacus. The Ethiopian sequences showed &gt;99.9% nucleotide identity, indicating low viral diversity. Maximum-likelihood phylogenetic analysis demonstrated that all sequences clustered within the MARV.A.1 clade. They were closely related to historical isolates from the Netherlands (the Leiden strain) and Uganda. The Ethiopian lineage and its closest human isolate (JN408064) diverged from a common ancestor circulating in 1994, whereas the Ethiopian lineage and its closest bat isolates (JX458853 and JX458858) diverged from a common ancestor circulating around 1989. Genomic and epidemiological evidence supported a single zoonotic spillover followed by localized human-to-human transmission. Seventy lineage-defining substitutions were identified, including 10 non-synonymous mutations primarily in the glycoprotein gene, with strong purifying selection (dN/dS &lt; 1). The outbreak strain showed high similarity to the reference strain, with conserved monoclonal antibody binding sites and no escape mutations. Overall, the outbreak resulted from a single spillover event with limited viral diversification, supporting the continued efficacy of existing vaccines and monoclonal antibody therapies.</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">11:15 - 11:30</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">From legacy pipelines to reusable Galaxy workflows for national bacterial WGS surveillance at Statens Serum Institut</span>
      <span class="gcc-talk-authors"><strong>Matusevicius Povilas</strong></span>
    </span>
    <span class="gcc-talk-poster">Also Poster</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>Statens Serum Institut (SSI) in Denmark performs national public health surveillance across a wide range of bacterial pathogens. To support this work, we have implemented a bacterial whole-genome sequencing (WGS) surveillance workflow in a local Galaxy instance and are preparing to replace a legacy in-house system with this new platform. The workflow is already in active pilot use on essentially all bacterial sequencing samples processed at SSI, running in parallel with the previous pipeline at a scale of about 20,000 genomes per year.<br />The workflow combines established Galaxy tools for read preprocessing, taxonomic screening, assembly, typing, plasmid analysis, antimicrobial resistance detection and assembly assessment with SSI specific tools and wrappers needed for routine surveillance use. These include custom work to improve support for our needs in tools such as pMLST, as well as Bifrost Bridge, a flexible solution for parsing and combining outputs from multiple tools into a single surveillance ready summary table. The resulting workflow produces a consolidated report spanning QC, assembly, typing, AMR, plasmid and related results, making it suitable for downstream public health interpretation and outbreak support.<br />A key motivation for this transition is not that Galaxy makes the work simpler in the short term. In practice, Galaxy adds an additional layer of software, configuration and operational complexity compared with running the same tools directly through command-line pipelines and schedulers. Adopting it requires sustained effort, team commitment and time to learn how to work effectively with a large and evolving platform. For us, however, the long-term value is compelling: Galaxy offers a path toward a more maintainable, modular and shareable surveillance workflow that can better benefit from community developed tools and can itself be contributed back to the wider ecosystem.<br />This talk will present our experience moving a national bacterial surveillance pipeline into Galaxy, with a focus on lessons learned for public health laboratories considering a similar transition. We will describe the current Illumina-based workflow, ongoing work to extend the approach to Nanopore data and our goal of making the workflow, wrappers and associated tools openly available for reuse by the community.</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">11:30 - 11:45</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">Leveraging Galaxy’s Superpowers to Enhance Fermentation Innovation through the Siduri portal</span>
      <span class="gcc-talk-authors"><strong>Barnabé Agnès</strong>, Fernandez Emilie, Le Floch Erwan, Lacroix Thomas, Schbath Sophie, Loux Valentin</span>
    </span>
    <span class="gcc-talk-poster gcc-talk-poster-empty">-</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>Consumers are rethinking their dietary habits and seeking sustainable, durable, safe and healthy foods. Fermentation is a biological process used for years that has proven its potential to naturally enhance bio-preservation, functional capabilities or organoleptic qualities of various food matrices. The French Grand Challenge “Ferments du Futur” (FdF) is a public-private partnership that has been ongoing since 2022. It aims to promote innovation in fermentation using a data-driven strategy to design new fermented products. Each year, FdF funds six projects in various fields such as microbial ecology, sensory and biochemical characterisation, bio-processes design, or host-microorganism interactions. Those projects generate massive and heterogeneous data that can be stored in the user-friendly web portal Siduri available at https://siduri.migale.inrae.fr/.</p>
    <p>Based on the ontology-driven information system OpenSILEX [1], the web portal Siduri is developed and hosted at the Migale bioinformatics facility. It centralises public data and results from FdF projects to enable data management, interactive visualization and bioinformatics analysis. To provide cutting-edge bioinformatics analysis for fermentation-related data, a catalogue of recommended tools and workflows has been initiated with metadata extracted from bio.tools registry [2] using the EDAM ontology [3]. To stay in line with the FAIR principles, the full traceability of bioinformatics analysis (provenance, parameters, software version…) needs to be tracked when results are uploaded in Siduri.</p>
    <p>To tackle this challenge, Siduri takes advantage of Galaxy capabilities. To ensure data privacy, a dedicated instance has been deployed on Migale infrastructure. Tools and workflows identified in the catalogue will be made available on this instance, enabling FdF partners to easily run bioinformatics analysis. Data exchange is performed by an in-house Shiny application that calls both OpenSILEX and Galaxy APIs through their Python client. This application is available from the Siduri portal, allowing users to upload data from Siduri to Galaxy in a new Siduri-tagged history and download datasets from Galaxy to Siduri. Some informations about how the dataset was produced are saved as metadata to ensure traceability, such as the Galaxy workflow ID.</p>
    <p>In addition to public tools and workflows, the catalogue can be expanded by applications produced in FdF projects. The Siduri team supports FdF developers in engineering and packaging tools, creating wrappers and designing workflows to share FdF productions in the dedicated Galaxy instance.</p>
    <p>The talk will address the challenges associated with Siduri’s development and how it leverages Galaxy’s ecosystem to perform bioinformatic analyses on fermentation data.</p>
    <p>1.     Neveu P, Tireau A, Hilgert N, Nègre V, Mineau-Cesari J, Brichet N, et al. Dealing with multi-source and multi-scale information in plant phenomics: the ontology-driven Phenotyping Hybrid Information System. New Phytol. 2019;221(1):588–601.</p>
    <p>2.    Ison J, Ienasescu H, Chmura P, Rydza E, Ménager H, Kalaš M, et al. The bio.tools registry of software tools and data resources for the life sciences. Genome Biol. 2019 Aug 12;20(1):164.</p>
    <p>3.     Ison J, Kalaš M, Jonassen I, Bolser D, Uludag M, McWilliam H, et al. EDAM: an ontology of bioinformatics operations, types of data and identifiers, topics and formats. Bioinformatics. 2013 May 15;29(10):1325–32.</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">11:45 - 12:00</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">Galaxy-based workflows for genome-resolved and multi-kingdom microbiome analysis: application to the nasal microbiome in Alzheimer’s disease</span>
      <span class="gcc-talk-authors"><strong>Hojat Ansari Mina</strong></span>
    </span>
    <span class="gcc-talk-poster gcc-talk-poster-empty">-</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>Understanding the role of the microbiome in neurodegenerative diseases requires robust, reproducible, and scalable analytical frameworks that integrate taxonomic, functional, and genome-resolved approaches. Here, we present a set of Galaxy-based workflows for comprehensive metagenomic analysis and demonstrate their application to the nasal microbiome in Alzheimer’s disease.</p>
    <p>Shotgun metagenomic data from 93 individuals, including Alzheimer’s disease patients, individuals with mild cognitive impairment, and cognitively healthy controls, were processed using a fully reproducible workflow implemented on the Galaxy platform. The analysis spans the full pipeline from raw sequencing data to downstream interpretation, including quality control and host removal, read-level taxonomic profiling using complementary approaches (MetaPhlAn and Kraken2, harmonized via TAXPASTA), and functional profiling with HUMAnN.</p>
    <p>To enable genome-resolved analysis, we implemented an assembly strategy combining individual-sample assembly with diagnosis-level co-assembly using the FAIRyMAGs workflow. This approach enables the recovery of both sample-specific and low-abundance microbial genomes while minimizing assembly artifacts. Across all samples, we recovered 20 near-complete genomes with &gt;98% completeness and The workflows further support the detection and analysis of viral components, including dedicated workflows for viral characterization, enabling multi-kingdom microbiome characterization within a unified framework. All analyses are implemented as modular and reusable Galaxy workflows, promoting accessibility, transparency, and reproducibility.</p>
    <p>This study highlights the potential of Galaxy-based workflows for scalable microbiome research and demonstrates how such frameworks can support the analysis of complex host-associated microbiomes, including those associated with Alzheimer’s disease.</p>
  </div>
</details>
</div>

## Talks 5: Tool integration and method development

<div class="gcc-talk-list">
  <div class="gcc-talk-list-header" aria-hidden="true">
    <span></span>
    <span>Time</span>
    <span>Presentation</span>
    <span></span>
  </div>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">13:00 - 13:15</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">Open Source Resources for the Automated Generation of Galaxy Tools</span>
      <span class="gcc-talk-authors"><strong>York Spencer</strong>, Joshi Jayadev, Raubenolt Bryan, Blankenberg Daniel</span>
    </span>
    <span class="gcc-talk-poster">Also Poster</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>Developing Galaxy tools often requires substantial manual effort to create XML tool definitions and companion wrapper scripts, making tool integration a persistent bottleneck for the growth of the Galaxy ecosystem. This talk will describe an emerging approach to reducing that burden through the use of fine-tuned, open-source large language models for the automated generation of Galaxy tool XML files and wrapper scripts. By training these models on existing wrappers, software interfaces, and Galaxy development patterns, it becomes possible to accelerate routine tool creation while improving consistency and lowering the barrier to contribution.</p>
    <p>We will focus on how open-source models can support practical Galaxy development tasks, including drafting tool definitions, mapping parameters, constructing command sections, and generating wrapper logic from software documentation or command-line interfaces. We will also discuss the value of open training resources, reproducible workflows, and community-curated examples for improving model quality and making automated generation more reliable. Rather than replacing developers, these models are intended to assist them by reducing repetitive work and allowing more time for testing, refinement, and integration of advanced functionality. Agent-based systems may further enhance this process by allowing models to iteratively generate, test, and refine Galaxy tool wrappers with reduced manual intervention.</p>
    <p>We will also briefly highlight two openly available resources that illustrate how wrapper generation can already be partially automated in practice: one aimed at Python-based command-line tools and another, R2G2, designed for R and Bioconductor software. Together, these projects provide useful examples of automation strategies, as well as publicly available resources that can inform future model training and evaluation.</p>
    <p>By combining fine-tuned open-source language models with existing community tools and standards, we can move toward a more scalable and sustainable process for Galaxy tool development. This work points to a future in which open infrastructure, open models, and open software development practices make it faster and easier to bring new computational methods into Galaxy.</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">13:15 - 13:30</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">Integration of experimental protocols into the Galaxy platform to support FAIR experimental workflows</span>
      <span class="gcc-talk-authors"><strong>Demange Fanny</strong>, Refahi Yassin, Loux Valentin, Paës Gabriel</span>
    </span>
    <span class="gcc-talk-poster gcc-talk-poster-empty">-</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>The sharing of experimental protocols remains challenging, limiting their accessibility and reuse, due to the variability of experimental practices and the lack of standardized protocol representation. To address this issue, it is critical to apply FAIR principles (Findable, Accessible, Interoperable, and Reusable) to improve protocol management. This work focuses on integrating experimental protocols into the open-source Galaxy platform, providing a standardized, executable, and fully traceable environment consistent with FAIR principles.</p>
    <p>As this represents a relatively novel approach, it was first essential to establish a robust methodology consistent with the platform’s capabilities to ensure effective implementation. At this stage, this approach has been applied to a selected set of key non-confidential laboratory protocols used in biomass transformation (biomass material grinding, chemical composition, and enzymatic hydrolysis), demonstrating its feasibility and practical applicability.</p>
    <p>For each protocol, key steps involving critical decisions and parameters for reproducibility were identified and implemented into a dedicated Galaxy tool. Users are invited to provide the required inputs through the tool interface and execute the process, generating a structured record of the entered parameters and decisions for traceability.</p>
    <p>The structured record from the first tool is used by a second tool to generate a final report, with optional inclusion of supplementary results such as images or comments. This automated reporting captures all critical decisions and parameters, enabling clear documentation, easy sharing and reuse of experimental protocols.</p>
    <p>The method ensures that experimental protocols are traceable, reusable and aligned with FAIR principles. By structuring and recording essential protocols steps, the approach ensures that all critical elements are captured, supporting reproducible experiments.</p>
    <p>The strategy could be further revised and optimized to generalize the method, enabling efficient integration of numerous protocols across different domains in Galaxy.</p>
    <p>This work was funded by French Research Minister aid managed by the Agence Nationale de la Recherche as part of the France 2030 investment plan through the grant reference ANR-23-PEBB-0008 (GalaxyBioProd project).</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">13:30 - 13:45</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">Launching the Scop3P Toolkit Starship into Galaxy: From Earth-Bound Services to Galactic Interactive Tools</span>
      <span class="gcc-talk-authors"><strong>Adrián Díaz</strong>, Tichshenko Natalia, De Geest Paul, Depoortere Boris, Andrade Buono Rafael, Martens Lennart, Vranken Wim, Ramasamy Pathmanaban</span>
    </span>
    <span class="gcc-talk-poster gcc-talk-poster-empty">-</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>Proteins perform diverse cellular functions that depend not only on their sequence and structure, but also on dynamic biophysical properties and post-translational modifications (PTMs). Among these, phosphorylation is one of the most prevalent and well-studied PTMs, with important roles in protein regulation, signalling and disease. However, the interpretation of PTM sites in their sequence, structural and biophysical context remains challenging, as relevant analyses are often distributed across separate resources and standalone tools.</p>
    <p>To address this bioinformatics challenge, CompOmics and Bio2Byte collaboratively developed the open-sourced Scop3P Toolkit. A set of Jupyter Notebooks that combine phospho-site annotation from Scop3P with protein biophysical feature prediction from B2BTools and interactive visualisation libraries for linear and 3D plots. This toolkit, which is available at https://github.com/Bio2Byte/Scop3P-notebooks, supports PTM-centred exploration through integrated 1D, 2D/2.5D and 3D protein views, including linear, topological and residue interaction network representations, together with support for mass spectrometry-derived peptide mapping and mutation-based inspection of protein sequence changes.</p>
    <p>This framework has been used in ELIXIR Belgium training activities, like the VIB training “Assess protein dynamics &amp; post-translational modifications through ELIXIR Belgium Node services: B2BTools &amp; Scop3P” (with open access at https://bio2byte.github.io/training-protein-dynamics-post-translational-modifications), as well as conference workshops, where it provided a flexible environment for demonstrating multiple protein analysis use cases. Although the positive reception of the tool by participants underscored its relevance and potential value for the scientific community, the Jupyter Notebook application also highlighted the need for a more reusable, accessible and interoperable implementation that could support both training and research in a more professional and stable infrastructure setup.</p>
    <p>We present an ongoing collaboration with the UseGalaxy.be team to transform these Jupyter Notebooks into a Galaxy “Interactive Tool”. This effort represents a major milestone given it will be the first Interactive Tool published by the labs guided by the maintainers of the national Galaxy server. The objective is to evaluate how an interactive PTM-focused analysis environment can be adapted to the Galaxy ecosystem and developed into a reusable tool for multiple use case scenarios. The components of the original toolkit were restructured toward an integrated Shiny Application in a Docker container that can be launched directly from Galaxy (image: bio2byte/scop3p-toolkit:0.1.0). In parallel, the Scop3P client was integrated into Galaxy as a regular tool, enabling phosphosite-centred data retrieval within Galaxy workflows including modifications, structures, peptides and mutations.</p>
    <p>These developments represent an important step toward integrating PTM-centred protein analysis into Galaxy. By combining annotation, prediction and interactive exploration in a single open framework, the Scop3P Toolkit expands the accessibility of ELIXIR Belgium protein resources for the broader proteomics, intrinsically disordered protein (IDP) and 3D bioinformatics communities.</p>
  </div>
</details>
</div>

## Talks 6: AI, workflows, and guided analysis

<div class="gcc-talk-list">
  <div class="gcc-talk-list-header" aria-hidden="true">
    <span></span>
    <span>Time</span>
    <span>Presentation</span>
    <span></span>
  </div>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">10:30 - 10:45</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">Reproducibility in the Age of Agents</span>
      <span class="gcc-talk-authors"><strong>Chilton John</strong>, Van Den Beek Marius, Awan Ahmed, Nekrutenko Anton</span>
    </span>
    <span class="gcc-talk-poster gcc-talk-poster-empty">-</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>Agent-driven science is scaling faster than our ability to trust it. As agents generate analyses at unprecedented speed, we risk automating the reproducibility crisis itself—producing more results, but with less provenance, less transparency, and more “slop.”</p>
    <p>Galaxy needs to meet this moment by confronting a new reproducibility crisis—one that is accelerating with the rise of agents.</p>
    <p>The claim we make is simple: the infrastructure built for human reproducibility is exactly what agents need—and therefore Galaxy’s role must not be to adapt away from its core principles and strengths, but to double down on them.</p>
    <p>We demonstrate this through two new Galaxy capabilities, both designed for humans but that immediately give agents new leverage and incentive to prioritize reproducibility and build workflows that communicate their story and provenance.</p>
    <p>History Notebooks are Galaxy-flavored markdown documents attached to histories. They give every analysis a living narrative, with embedded dataset views, job parameter tables, and interactive visualizations that persist and version alongside the data. A researcher can document solo; a human can co-author with the in-app AI assistant; an external agent like Claude Code can drive analysis via the API and document its own work as it goes—building a versioned narrative a human can review after the fact, not just a chat transcript that evaporates. Crucially, when a workflow is extracted from a documented history, the notebook becomes the workflow's built-in report — the narrative travels with the computation, so every future invocation carries the context needed to interpret its outputs. The antidote to slop isn't less automation—it's better infrastructure. There has never been a better time to make the communication of an analysis as reproducible as the analysis itself.</p>
    <p>Workflow State Validation brings the static checks of the Galaxy runtime outside the browser and workflow editor — the long-missing piece that makes Format2 (YAML) workflows a first-class citizen. Concise enough for a human to read, structured enough for an agent to compose, and now validated against typed parameter schemas for 10,000+ ToolShed tools. No Galaxy server required. Build in your own editor with autocompletion and inline documentation; validate every parameter name, value, select option, conditional branch, and collection type connection in milliseconds. This is the workflow authoring experience bioinformaticians have loved about text-based systems like Nextflow — but with static guarantees only a centralized typed tool registry can provide. The difference between catching a misspelled output directory and catching an invalid alignment scoring option that would silently produce wrong results. For agents, the leverage compounds: the concise format fits in a context window, structured per-parameter error reports replace trial-and-error execution cycles, and the resulting workflows are statically verified before they ever run.</p>
    <p>Together, these features illustrate a broader pattern: Galaxy's reproducibility infrastructure is not overhead for agents to bypass—it is the feedback loop that makes agent-assisted science trustworthy by design.</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">10:45 - 11:00</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">Workflows in the Age of LLMs: Building a Galaxy Workflow Community</span>
      <span class="gcc-talk-authors"><strong>Van Den Beek Marius</strong>, Delisle Lucille, Bernt Matthias, Maier Wolfgang, Lariviere Delphine, IWC Contributors</span>
    </span>
    <span class="gcc-talk-poster gcc-talk-poster-empty">-</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>In this talk we will describe recent developments and ongoing work within the Intergalactic Workflows Commission (IWC) to support communities in creating high-quality, tested Galaxy workflows that can run anywhere.</p>
    <p>The IWC collects and maintains production-ready workflows, lowering the barrier to both contribution and use. We will highlight recent improvements including a redesigned homepage, improved workflow diagrams, and extended validation capabilities. Under the hood, the IWC is moving towards gxformat2 — a more compact, human-readable, and validatable workflow language — and has expanded testing to include runs against live Galaxy instances with landing requests that include sample test data.</p>
    <p>We will also discuss how IWC workflows are being leveraged as integration points in external projects such as brc-analytics, broadening the audience for curated workflows beyond the traditional Galaxy user base. Finally, we will explore how large language models are beginning to shape the workflow landscape, from copilot-assisted PR reviews that help maintain workflow quality to early experiments with agent-generated workflows.</p>
    <p>Whether you are a workflow developer, a domain scientist looking for ready-to-use analyses, or simply curious about the intersection of reproducible science and AI, come join us and learn how you can contribute.</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">11:00 - 11:15</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">From Research Question to Running Workflow: AI-Guided Analysis in BRC Analytics</span>
      <span class="gcc-talk-authors"><strong>Baker Dannon</strong>, Van Den Beek Marius, Callan Danielle, Rogers Dave, Nekrutenko Anton</span>
    </span>
    <span class="gcc-talk-poster gcc-talk-poster-empty">-</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>BRC Analytics (brc-analytics.org) is a Galaxy-powered platform for infectious disease and pathogen genomics, built around a curated catalog of organisms, assemblies, and validated workflows. For many bench scientists, however, the hard part is not pressing &quot;run.&quot; It is translating a biological question into the exact workflow, reference genome, annotation set, and input configuration that the platform requires. We have been addressing that gap by building an AI-guided interface that turns an imprecise research goal into a validated, executable analysis.</p>
    <p>This talk presents the Analysis Assistant, a conversational interface that replaces a rigid step-by-step wizard with guided dialogue. A researcher can begin with a statement such as &quot;I want to analyze my Salmonella whole genome sequencing data,&quot; and the system incrementally resolves that request into structured decisions about organism, assembly, workflow, data source, and annotation. The assistant can also search the European Nucleotide Archive (ENA) for relevant public datasets as part of the conversation. As those decisions are made, the assistant tracks the emerging analysis state and hands off to the existing execution flow once the configuration is complete.</p>
    <p>The key design choice is that this is not a generic chatbot making scientific guesses. The LLM is used to interpret intent, manage the conversation, and help the user navigate choices, but correctness-critical decisions are grounded in curated platform logic which is covered in depth in our companion talk by Danielle Callan.  The assistant matches across taxonomy lineages, identifies workflows compatible with the selected organism and assembly, and deterministically resolves concrete workflow inputs such as reference genomes and annotation files. In other words, language guides the interaction, while validated catalog logic decides what is actually runnable.</p>
    <p>We also expose the same catalog and ENA search capabilities through MCP, so the validated knowledge that powers the assistant can be used by external AI clients as well. That makes the project relevant beyond a single interface: it is a model for connecting conversational AI to a domain-specific scientific platform without giving up the structure and determinism that real analysis workflows require.</p>
    <p>In this presentation, we will demo the assistant end to end, from an initial research question to a runnable analysis configuration, and discuss lessons from building AI guidance for scientists who need help framing and launching analyses, not just answering questions about them.</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">11:15 - 11:30</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">The Galaxy History Graph: From State to Structure</span>
      <span class="gcc-talk-authors"><strong>Guerler Aysam</strong>, Chilton John, Awan Ahmed, Baker Dannon, Van Den Beek Marius, Heidari Alireza, Lopez David, Savage Michelle, Gruening Bjoern, Nekrutenko Anton, Schatz Michael C.</span>
    </span>
    <span class="gcc-talk-poster gcc-talk-poster-empty">-</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>The Galaxy ecosystem continues to evolve, not just in computation and visualization, but in how analyses are represented, queried, and acted upon. We introduce the Galaxy History Graph, a core abstraction that formalizes dataset lineage as a bounded, history-scoped directed graph with explicit nodes and edges for datasets, collections, and tool executions.</p>
    <p>Current Galaxy histories expose provenance implicitly as a time-ordered list, where you can trace what produced a given item but not what consumes it, requiring repeated traversal and reconstruction to answer even simple questions about dependencies or workflow structure. This does not scale to complex analyses and cannot support higher-level systems. The History Graph replaces this with a normalized representation where lineage is directly encoded and accessible through indexed relationships within a bounded scope.</p>
    <p>This work builds on the transition to structured tool request artifacts and a unified job execution model. The resulting History Graph API provides efficient lineage access through server-enforced node caps, scope-based selection, optional traversal and filtering operations, and a stable identifier scheme. Filtering and dependency resolution become graph operations rather than history iteration, improving performance and simplifying the programming model.</p>
    <p>The History Graph establishes a canonical system of record for analysis structure in Galaxy. It enables interactive graph exploration, workflow extraction, and integration with notebooks and reports. It also provides the foundation for AI systems to reason over Galaxy analyses deterministically, replacing ad hoc reconstruction with a stable, machine-readable structural artifact.</p>
    <p>In the accompanying demonstration, we present the reference implementation of the History Graph API and its interactive visualization, showing how it unifies provenance access across visualization, automation, and AI-driven analysis in Galaxy.</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">11:30 - 11:45</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">AOP‑toolkit: Galaxy‑enabled LLM pipelines for large‑scale toxicological literature mining with secure credential management</span>
      <span class="gcc-talk-authors"><strong>Durník Robin</strong>, Hecht Helge, Babica Pavel, Sovadinová Iva, Bajard Lola</span>
    </span>
    <span class="gcc-talk-poster gcc-talk-poster-empty">-</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>Toxicological research relies on extracting mechanistic evidence dispersed across scientific publications, databases, and regulatory documents. While these resources are openly available, manual evaluation remains a major bottleneck. The AOP‑toolkit (aoptk) is an MIT‑licensed, modular Python framework designed to support automated retrieval, parsing, and analysis of scientific publications in the context of Adverse Outcome Pathway (AOP)[RD1.1][RD1.2][RD1.3] development[RD2.1] - a framework that integrates data from computational models, cell-based assays, and animal studies to predict how a chemical exposure leads to adverse toxicological outcomes. The toolkit offers functionalities for automated retrieval of publications from PubMed and Europe PMC, ingestion of local PDF files, and extraction of structured mechanistic relationships from text, tables, and figures using pluggable LLM backends. Its architecture supports the integration of alternative models and document‑processing components, making it suitable for rapid adaptation as AI model capabilities evolve and helping overall data re-use. Additional utilities include chemical name normalization, identifier mapping, and standardized intermediate data formats suitable for downstream pipeline composition.</p>
    <p>A set of Galaxy tools wrapping core aoptk capabilities exposes these methods to non‑programming users in a reproducible, workflow‑driven environment. These tools support literature retrieval, preprocessing, LLM‑assisted extraction, and evidence aggregation. To enable secure use of commercial and customizable LLM APIs within Galaxy, the aoptk tools adopt the new Galaxy Credentials system, allowing users to store OpenAI API keys, endpoint parameters, and authentication data required for literature access directly within their Galaxy account. This eliminates the need to embed secrets into histories or workflows and enables site administrators to offer model‑specific configurations while maintaining strict credential isolation.</p>
    <p>As a validation case, we applied the system to identify chemicals that inhibit gap junction intercellular communication (GJIC), a mechanism of direct cell-cell communication that is discussed as a candidate non genotoxic key event in AOP development for carcinogenesis. When applied to the publication subset used to construct an expert‑curated list of 328 chemicals, the automated workflow recovered more than 250 direct matches, demonstrating that LLM‑assisted extraction can reproduce substantial portions of expert manual curation at scale. This approach enables systematic evidence aggregation across studies and chemicals, providing mechanistically relevant information directly usable for AOP development and refinement through support for key events and key event relationships. Systematic mapping of chemical effects on AOP relevant key events further enables chemical prioritization for hazard and risk assessment, facilitates identification of reference chemicals for AOP informed NAM development and validation, and supports evidence based identification of assays suitable for key event evaluation based on their differential performance in detecting chemicals with established effects.</p>
    <p>Overall, the AOP‑toolkit and its Galaxy integration constitute a FAIR, extensible, and secure ecosystem for automated toxicological evidence mining. By combining modern LLM technology with Galaxy’s credential management and workflow reproducibility, the system lowers barriers for large‑scale literature analysis and enables future extensions toward authenticated, cross‑source toxicology knowledge extraction.</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">11:45 - 12:00</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">Starting from Data: Connecting External Resources and Analysis in Galaxy</span>
      <span class="gcc-talk-authors"><strong>Callan Danielle</strong>, Van Den Beek Marius, Baker Dannon, Rogers David, Cain Scott, Smeds Patrik, Clawson Hiram, Coraor Nate, Beavers Kelsey, Haeussler Maximilian, Schatz Michael, Pond Sergei, Nekrutenko Anton</span>
    </span>
    <span class="gcc-talk-poster gcc-talk-poster-empty">-</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>Galaxy provides a flexible environment for running bioinformatics tools and composing analyses, supporting a range of usage patterns from exploratory work to more structured pipelines. In practice, many users approach problems starting from specific datasets or biological questions, then navigate tools and workflows to get analyses done.</p>
    <p>We present a shared framework underlying BRC Analytics (brc-analytics.org) and GenomeArk2 (genomeark2.org) that builds on Galaxy by improving how users discover, configure, and launch analyses in data-driven contexts. BRC Analytics focuses on pathogen genomics, while GenomeArk2 targets vertebrate genome analysis, illustrating how the same approach can be adapted to different communities with distinct analytical needs.</p>
    <p>A central idea is to start from data rather than tools—shifting the entry point to analysis without changing the underlying execution model. The framework integrates access to external resources (e.g., UCSC tracks, public read datasets via ENA), along with sequence-based search capabilities (via LexicMap and Logan) that allow users to identify relevant SRA data directly from sequence queries. Selected data can be passed into Galaxy with minimal manual handling, reducing friction around data acquisition and simplifying workflow configuration.</p>
    <p>Workflows are drawn from the Intergalactic Workflow Commission (IWC), enabling reuse of community-maintained analyses. We introduce lightweight structure by associating workflows with relevant organisms and use cases, improving discoverability and providing a more guided entry point without restricting flexibility. Users can launch analyses with preconfigured inputs while continuing to rely on the full Galaxy interface for execution and iteration.</p>
    <p>We are also exploring LLM-assisted interfaces to support data selection, workflow discovery, and parameter configuration; see the companion talk by Dannon Baker for a detailed discussion of this component.</p>
    <p>This approach complements Galaxy’s interface, adding a structured layer that better connects data and analysis. We will describe the design decisions, integration patterns, and trade-offs behind this approach, and discuss how it can improve usability, increase workflow reuse, and broaden accessibility for data-oriented users.</p>
  </div>
</details>
</div>

## Talks 7: Community platforms, mature ecosystems, and field reports

<div class="gcc-talk-list">
  <div class="gcc-talk-list-header" aria-hidden="true">
    <span></span>
    <span>Time</span>
    <span>Presentation</span>
    <span></span>
  </div>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">15:00 - 15:15</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">Updates from the Global Galaxy Training Network (GTN) and Galaxy Training Academy (GTA)</span>
      <span class="gcc-talk-authors"><strong>Saskia Hiltemann</strong>, Natalie Whitaker-Allen, Larivière Delphine</span>
    </span>
    <span class="gcc-talk-poster gcc-talk-poster-empty">-</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>Here we will present updates on the Galaxy Training Network (GTN), which has developed the Galaxy Training Platform (https://training.galaxyproject.org), an open-access, community-driven framework for the collection of FAIR (Findable, Accessible, Interoperable, Reusable) training materials for data analysis utilizing (but not limited to) the user-friendly Galaxy framework as its primary data analysis platform.</p>
    <p>Since its inception, this training platform has thrived, with the number of tutorials and contributors growing rapidly, and the range of topics extending beyond life sciences. By providing quality, easily adoptable, openly licensed training materials, the GTN has enabled individuals and educators alike to develop their data analysis skills with ease. By integrating the GTN directly within Galaxy itself, we’ve managed to bring training directly to students.</p>
    <p>To support the instructor community, we provide features to facilitate the use of the materials in a classroom or remote teaching setting, simplifying the contribution flow for new materials, and have added a set of train-the-trainer lessons. The GTN framework has proven to be an invaluable resource for individual learners as well as educators, especially when combined with TIaaS (Training Infrastructure as a Service).</p>
    <p>In 2021, during the pandemic, we organised the first worldwide online GTN training event (named Smorgasbord) with hundreds of participants from across the world. Due to its success and popularity, we have repeated this event every year since, now rebranded as the Galaxy Training Academy (GTA).</p>
    <p>Over the last three years, the GTA has evolved into a structured, week-long global online training event that builds on the GTN’s self-paced materials while fostering community engagement around them. Each year, the GTA offers thematic tracks spanning core Galaxy skills and domain-specific topics, including proteomics, assembly, transcriptomics, single-cell analysis, microbiome research, climate data science, machine learning, and more. Participants follow curated learning paths and benefit from discussion channels and instructor support throughout the week.</p>
    <p>Beyond supporting learners, the GTA also helps strengthen the Galaxy training community. It provides opportunities for new instructors to gain experience, encourages collaborative lesson development, and promotes cross-disciplinary exchange. As a recurring global event, it feeds directly back into the GTN ecosystem, helping ensure that materials remain current and responsive to community needs. The GTA also serves as a key entry point into the Galaxy ecosystem: a significant proportion of attendees are first-time Galaxy users, making it an impactful onboarding pathway for the broader Galaxy community. This reach is only possible thanks to the sustained dedication of the Galaxy community, whose volunteer instructors, developers, and advocates collectively make each edition a success</p>
    <p>In this talk, we will present the GTN and the many new topics and tutorials added by the community recently, as well as updates from the latest and upcoming editions of the Galaxy Training Academy and how you can get involved.</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">15:15 - 15:30</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">A journey around Galaxy on the W4M boat: a feedback from someone caught in the middle</span>
      <span class="gcc-talk-authors"><strong>Petera Mélanie</strong>, Workflow4metabolomics Coreteam</span>
    </span>
    <span class="gcc-talk-poster gcc-talk-poster-empty">-</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>Once upon a time a group of enthusiastic metabolomics’ folks decided to bring themselves together to form Workflow4Metabolomics (W4M), an entity that endeavours to break through the barriers that are obstructing data analysis practices in this field. Metabolomic data analysis is a complex and multistep process, which is constantly evolving with the development of new analytical technologies, mathematical methods, bioinformatics tools and databases. With a similar diversity, the W4M team is composed of various profiles (computer scientist, chemist, biologist…), linked together with Galaxy-based ropes, and it has evolved from an initial tiny group of French engineers to a team with further bounds in Europe.</p>
    <p>On this W4M boat, among the eclectic crew that came onboard in 2014, one could find a young engineer in statistics, that was like many other persons in the world of metabolomics: no formal computer science schooling but comfortable with their preferred scripting language, good understanding of the field’s data specificities but unaware of other fields’ issues, capable of providing precise methodologies to solve data processing struggles but with poor knowledge of community practices to share their work, and being a tool provider and a tool user at the same time.</p>
    <p>Fortunately, the Galaxy road that W4M has chosen is one that has a lot to offer. Has the journey been calm and easy? Maybe not always, may you ask the young statistician that sailed with the crew, but Galaxy has strengths that have helped the W4M team to construct, provide and improve an ecosystem around metabolomic data processing that now benefits hundreds of users each year. Galaxy, through its technology, its philosophy, its resources and its community, has enabled the peculiar group that is W4M to provide solutions and support to the metabolomics’ community.</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">15:30 - 15:45</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">Leveraging Galaxy Across Multiple Scientific Domains</span>
      <span class="gcc-talk-authors"><strong>Watson Greg</strong></span>
    </span>
    <span class="gcc-talk-poster gcc-talk-poster-empty">-</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>Oak Ridge National Laboratory (ORNL) delivers scientific discoveries and technical breakthroughs needed to realize solutions in energy and national security and provide economic benefit to the nation. ORNL provides a unique environment for accelerating scientific discovery including the operation of one of the world’s most advanced neutron scattering facility, a computational capability that includes two of the largest computer systems ever built, as well as undertaking research many other scientific domains. Over the last five years, ORNL has been developing tools and deploying Galaxy instances in order to better leverage this capability for the analysis of neutron scattering data. More recently, we have started exploring the use of Galaxy in other scientific domains, including fusion energy research and energy-water resiliency.</p>
    <p>In this presentation, we will provide an update on our efforts to incorporate Galaxy into multiple scientific domains at ORNL. In particular, we will discuss how our neutron scattering galaxy instance (known as the Neutrons Data Interpretation Platform, or NDIP), combined with our visualization framework (known as the Neutrons Open Visualizations and Analysis framework, or NOVA) is now moving into production use, and our plans to incorporate tools that take advantage of AI model and metadata catalogs. We will also describe new efforts to deploy Galaxy based tools for creating a digital twin of the Material Plasma Exposure eXperiment (MPEX), high-power, steady-state linear plasma device designed to produce the plasma material interaction conditions of the divertor of future magnetic confinement fusion power plants. Finally, we will describe ARMADA, a platform for exploring the resilience of energy infrastructure to ensure an affordable, secure, and resilient supply in the face of rapidly growing demand. To achieve this, we have combined Galaxy with the CKAN data management platform in order to provide a seamless environment for running disparate domain science models for exploring energy resilience.</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">15:45 - 16:00</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">Galaxy Image Analysis: A Decade of Development for Cell Microscopy Image Analysis and Beyond</span>
      <span class="gcc-talk-authors"><strong>Kostrykin Leonid</strong>, Wollmann Thomas, Gao Qi, Rohr Karl</span>
    </span>
    <span class="gcc-talk-poster gcc-talk-poster-empty">-</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>We have developed Galaxy Image Analysis (GIA), a software suite comprising tools and workflows for cell microscopy image analysis that builds upon the Galaxy platform. The development of GIA started 2016 with the goal to establish image analysis in Galaxy, and the software suite was first introduced in a training course in 2016 (Microscopy Image Analysis Course, Heidelberg University). To establish GIA, the infrastructure for provision of tools and corresponding software dependencies in Galaxy (e.g., Bioconda, Grüning et al., Nature Methods 2018) had to be extended by necessary software packages for image analysis.</p>
    <p>The GIA software suite has been continuously extended over the years and GIA workflows were used in multiple biological research projects (e.g., Föll et al., GigaScience 2019; Wang et al., Pain 2022). GIA matured as a software suite for cell microscopy image analysis, and the development was accompanied by a growing community who contributed tools and workflows for image analysis to the Galaxy ecosystem (e.g., Kostrykin et al., BioHackrXiv 2024; Chiang et al., BioHackrXiv 2026).</p>
    <p>A challenge in developing reliable image analysis tools is that the image data often has multiple dimensions of different types (e.g., 3-D spatial dimension, channel dimension, time dimension), which is more difficult to cope with than single-channel static 2-D images. For example, the image metadata needs to be leveraged for correct interpretation of the different image dimensions, and the metadata must also be preserved for intermediate and final results. To streamline the development and sustainability of tools for multi-dimensional image data (including dimensions of different types), we have recently implemented an auxiliary library for GIA (https://doi.org/10.5281/zenodo.19386399) that provides a standardized image representation based on the image metadata. In addition, the library seamlessly enables tools and workflows in GIA to directly support TIFF, OME-TIFF, OME-Zarr, and other file formats.</p>
    <p>In this talk, we will showcase the challenges of processing image data with multiple dimensions of different types, and the corresponding solutions provided by the GIA auxiliary library. We will also highlight example use cases of image analysis employing GIA. Ten years after GIA pioneered the analysis of cell microscopy images in Galaxy, this will include recent use cases of image analysis beyond cell microscopy. We will also cover the technical requirements that were necessary to be implemented for this extension. In addition, we will report results of an evaluation of GIA.</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">16:00 - 16:15</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">Rewriting the Galaxy Hub -- Migrating 4,300 Pages from Gridsome to Astro</span>
      <span class="gcc-talk-authors"><strong>Baker Dannon</strong>, Grüning Björn</span>
    </span>
    <span class="gcc-talk-poster gcc-talk-poster-empty">-</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>The Galaxy Community Hub (galaxyproject.org) is the project's public front door: news, events, the platform directory, regional subsites, and a large body of community documentation all live there. For years it ran on Gridsome, a Vue 2 static site generator that effectively stopped evolving. With Vue 2 end-of-life and the site's GraphQL-driven build becoming increasingly fragile, we undertook a full rewrite to Astro and migrated more than 4,300 pages.</p>
    <p>This was not a straightforward framework swap. The legacy site had accumulated years of permissive template patterns, embedded widgets, region-specific content rules, iframe-served bare pages used by Galaxy servers, and URL conventions that outside publications and tools already depended on. Astro gave us a sustainable target, but only if we could preserve those behaviors while moving to a stricter and more maintainable content model.</p>
    <p>We will describe the migration strategy that made that possible: a preprocessing pipeline that converts Gridsome-era content conventions into Astro-friendly inputs at build time, a rebuilt search system based on a generated JSON index and client-side filtering, compatibility handling for regional subsites and embedded pages, and a phased cutover plan where old and new builds ran side by side until the Astro version was ready for production.</p>
    <p>This is also not the Hub's first migration. The site started as a MoinMoin wiki, moved to Metalsmith, then to Gridsome, and now to Astro. An important theme of the talk is that migrations like this fail when teams treat them as a pure rewrite exercise. The hard part is preserving the undocumented behaviors that users and downstream systems quietly rely on: region-aware content views, iframe-embedded pages consumed by Galaxy servers, legacy query parameters in the platform directory, and a backlog of mixed markdown, raw HTML, and embedded widgets that could not simply be cleaned up by hand.</p>
    <p>AI-assisted development also helped make the migration tractable for a small team by handling repetitive content analysis, preprocessing logic, and many of the edge cases spread across thousands of pages.</p>
    <p>The result is a Hub with dramatically faster builds, lower dependency risk, and a codebase that new contributors can actually understand and extend.  Adding new content is also simpler: most pages remain straightforward markdown, while richer pages use explicit MDX components rather than the older Gridsome-era mix of implicit template behavior and embedded Vue patterns. That makes authoring more predictable for contributors and reduces the amount of framework-specific knowledge needed to publish new material.</p>
    <p>This talk will focus on practical lessons from a large static-site migration in an active open-source project: how to preserve behavior while replacing the stack underneath it, how to handle messy real-world content at scale, and how to de-risk a cutover when the site is too important to take offline.</p>
  </div>
</details>
<details class="gcc-talk">
  <summary>
    <span class="gcc-talk-time">16:15 - 16:30</span>
    <span class="gcc-talk-main">
      <span class="gcc-talk-title">Galaxy at BRGM: From Strategic Integration to Operational Challenges in a National Research Infrastructure</span>
      <span class="gcc-talk-authors"><strong>Delaporte Pascal</strong>, Keuchkerian Samuel</span>
    </span>
    <span class="gcc-talk-poster gcc-talk-poster-empty">-</span>
  </summary>
  <div class="gcc-talk-abstract">
    <p>BRGM is deploying an Integrated Digital Platform (Plateforme Numérique Intégrative - PNI) to transform how geological, hydrogeological, and environmental data are accessed, processed, and shared across research projects. Launched in 2025 and fully operational in 2026, the PNI addresses a critical challenge: preventing the proliferation of isolated digital silos while ensuring sustainable interoperability between national and European scientific initiatives.</p>
    <p>Strategic Objectives: The PNI aims to centralize, secure, and simplify access to scientific data, tools, and workflows for BRGM researchers and partners. Galaxy has been selected as a core analytical environment within the platform's Data Access Module (MAD), alongside other tools like Cupidon (standardized data catalogs) and Saphir (interactive analysis environments). The platform's modular architecture enables researchers to discover datasets, launch reproducible workflows, and visualize results without managing complex technical infrastructure.</p>
    <p>Technical Integration: Galaxy's integration into the PNI leverages its strengths in workflow reproducibility, tool modularity, and community-driven development. The platform connects Galaxy to BRGM's data repositories, high-performance computing resources, and visualization tools, creating a seamless environment from data discovery to publication. The technical architecture emphasizes open standards, hybrid cloud deployment, and compliance with FAIR principles, positioning the PNI as a key node in France's national data infrastructure and the European Open Science Cloud (EOSC).</p>
    <p>Cultural and Organizational Challenges: Beyond technical implementation, the PNI represents a profound cultural transformation. Researchers accustomed to desktop-based workflows and local data management must adopt new practices centered on documentation, data sharing, and collaborative platforms. This shift requires sustained change management efforts, including ambassador programs, training sessions, and continuous user support. Resistance to change stems from concerns about learning curves, perceived loss of autonomy, and uncertainty about long-term platform sustainability.</p>
    <p>Security and Governance Obstacles: Data security presents significant challenges, particularly for sensitive geological information related to natural resources, hazards, and critical infrastructure. Balancing open science principles with data protection requirements demands robust governance frameworks, access control mechanisms, and compliance with European regulations. The PNI must navigate these constraints while maintaining user-friendly interfaces and efficient workflows.</p>
    <p>Collaborative Ecosystem: The PNI is deeply embedded in national and international partnerships. It serves as the digital backbone for several Priority Research Programs and Equipment (PEPR), including IRiMa (Risks), Digital Earth (Subsurface), and One Water. The platform aligns with Data Terra's objectives for Earth system data integration and contributes to EOSC's vision of federated research infrastructures. Through EuroGeoSurveys, BRGM shares best practices and technical solutions with European geological surveys, positioning Galaxy as a common tool for cross-border geoscience collaboration.</p>
    <p>Impact and Perspectives: While concrete user feedback is still emerging, the PNI's deployment marks a strategic shift toward sustainable, interoperable research infrastructures. Galaxy's role extends beyond a technical tool—it embodies a new paradigm for reproducible science, community-driven innovation, and open data practices in geosciences. The platform's evolution will depend on continuous user engagement, technical refinement, and sustained institutional commitment beyond 2030.</p>
    <p>This presentation will share lessons learned from deploying Galaxy in a large public research organization, addressing both technical solutions and human factors essential for successful platform adoption.</p>
  </div>
</details>
</div>
