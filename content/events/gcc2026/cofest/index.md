---
autotoc: false
components: true
---

<div class="text-center my-5">

# GCC2026 CollaborationFest (CoFest!)

#### June 25-26, 2026

  <div class="text-lg text-galaxy-grey">
    CoFest is a community gathering by those interested in
    contributing to Galaxy's tool set, documentation, training materials, code base,
    and anywhere else that expands the Galaxy ecosystem.
  </div>

  <i>
    Held June 25-26, 2026, immediately following the main GCC2026
    conference in Clermont-Ferrand, France.
  </i>

</div>

## CoFest 2026 Projects

<div class="callout text-center">
    <p>
      <strong>Note:</strong> Already filled out the
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSfVznubQqoEZYHT0IFoG5zumoXI0oyaBxcNEgOUFnWzVLChkw/viewform?usp=sharing&ouid=117702235489827456804" target="_blank">Find Your Track</a>
      form? If you'd like to change
      your assigned project, just reach out in the
      <a class="font-bold" href="https://gcc2026.slack.com/archives/C0B8L47SQ3A" target="_blank">#cofest</a>
      channel on the GCC2026 Slack and we'll place you accordingly.
    </p>
    <p>
      Haven't filled out the form yet? Use the
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSfVznubQqoEZYHT0IFoG5zumoXI0oyaBxcNEgOUFnWzVLChkw/viewform?usp=sharing&ouid=117702235489827456804" target="_blank">Find Your Track</a>
      form and you'll be able to pick your project directly or be matched with one based on your interests and skills.
    </p>
</div>

Below are the live projects for CoFest 2026, each with a lead and an assigned team.

<CofestBoard />

## What to Expect at CoFest

<div class="callout text-center">
    The goals of CoFest are to expand the Galaxy contributor community and its ecosystem.
</div>

CoFest participants will collaborate around **project tracks**, each with real, achievable goals and a team of people to work on them together. Tracks will span the full breadth of the Galaxy ecosystem:

- **Wrap & annotate tools** – Get Galaxy-compatible tools into the hands of researchers.
- **Build & improve workflows** – Develop and refine best-practice workflows for the community.
- **Shape the user experience** – Tackle interface improvements that make Galaxy more intuitive for everyone.
- **Strengthen the platform** – Dig into the core codebase and help make Galaxy more robust.
- **Grow the training ecosystem** – Update, improve, and create GTN tutorials that help researchers worldwide.
- **Build community** – Contribute to governance, outreach, and the things that keep Galaxy's community thriving.

## How It Works

CoFest is intentionally informal. We will have two days of collaborative work/brainstorming with people who care about the same things you do. There's no rigid agenda. You'll be matched with a track based on your interests and skills, and each track will have experienced contributors ready to help orient you and keep things moving.

**You don't need to know anyone ahead of time**, and you don't need to come with a finished plan. Just show up, find your people, and leave having developed/planned something real together.

## Registration

To attend CoFest, we do ask that you register. This will help us find adequate
space and ensure we have enough coffee and drinks.

The registration cost is EUR50, added on top of the GCC2026 conference registration. Select the **Are you attending the CoFest/Training on June 25-26?** option in the registration form to register for CoFest.

<div class="flex justify-center my-5">
  <a href="/events/gcc2026/register/" class="inline-flex items-center justify-center rounded px-8 py-2 text-sm font-semibold text-white bg-galaxy-primary hover:bg-galaxy-dark no-underline hover:no-underline">Register for GCC2026 and CoFest</a>
</div>

## Past projects (GCC 2024 & 2025)

<div class="gx-tile-grid">

  <div class="gx-tile">
    <div class="gx-tile__title">Deploying an R Shiny App on Galaxy</div>
    <div class="gx-tile__body">

This project involved deploying custom Shiny apps on Galaxy by converting them into R packages and containerizing them with Docker for consistency and portability. Galaxy configuration files were implemented to enable seamless user access. Additionally, existing Shiny apps—such as the **[Pampa Performance Indicators of Marine Protected Areas](https://github.com/usegalaxy-eu/galaxy/blob/release_25.0_europe/tools/interactive/interactivetool_pampa.xml)**—were updated to enhance functionality, showcasing the integration of interactive tools for research and resource management.

  </div>
  </div>

  <div class="gx-tile">
    <div class="gx-tile__title">Making Your First Contribution to the Galaxy Training Network</div>
    <div class="gx-tile__body">

Two tutorials were created for the Galaxy Training Network (GTN): **"Best Practices for Citing Galaxy"**—guiding proper attribution in publications—and **"Hybrid Genome Assembly – Nanopore and Illumina"**—a workflow for combining sequencing data. Both tutorials followed GTN standards to improve accessibility for researchers.

  </div>
  </div>

  <div class="gx-tile">
    <div class="gx-tile__title">Improve User Defined Tools</div>
    <div class="gx-tile__body">

Planemo was improved to support user-defined tools in Galaxy, enabling direct uploads to the Test Tool Shed and allowing resource requirements (CPU, RAM, GPU) to be specified. Community feedback refined functionality, while support for R scripts and documentation were enhanced to simplify tool development and deployment.

  </div>
  </div>

  <div class="gx-tile">
    <div class="gx-tile__title">Galaxy tours - fixing existing ones and add tours for popular tools. </div>
    <div class="gx-tile__body">

This project focused on modernizing and enhancing the Galaxy interactive tours. Existing tours were thoroughly tested, and all HTML elements were replaced with standardized selectors as defined in the Galaxy navigation configuration. Every core tour was validated for functionality and accuracy, with detailed results documented. Additionally, help text from the deeptools Galaxy integration was converted into interactive tours, improving user guidance and accessibility. The updates ensured a more robust and user-friendly experience for navigating Galaxy’s features.

  </div>
  </div>
  <div class="gx-tile">
    <div class="gx-tile__title">Biodiversity & Ecology Resources</div>
    <div class="gx-tile__body">

This project curated Galaxy tools for biodiversity research, adding EDAM annotations and creating filtered collections for the **Ecology** and **Earth** SIGs. A wish list for new tools was developed, existing wrappers were reviewed and annotated, and contributions were made to **Bio.tools**—all to improve accessibility and support for researchers.

  </div>
  </div>

  <div class="gx-tile">
    <div class="gx-tile__title">Galaxy ITs</div>
    <div class="gx-tile__body">

Galaxy 24.0 introduced path-based ITs, removing the need for wildcard DNS/SSL and simplifying deployment. This project enabled direct URL path access for ITs, reducing technical barriers and improving flexibility, as outlined in the **[F1000 Research presentation](https://f1000research.com/slides/12-1163)**.

  </div>
  </div>

</div>
