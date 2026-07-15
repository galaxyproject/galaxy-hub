---
title: "Debrief: AWS Summit D.C. 2026 — a session on an AI agent for Galaxy administration"
date: "2026-07-14"
tease: "Members of the US Galaxy Project team attended the AWS Summit in Washington, D.C. to build relationships that can grow into scientific collaborations and more sustainable open-source infrastructure. A conference session on a third-party AI agent for Galaxy administration was a highlight."
subsites: [all]

contributions:
  authorship:
    - hujambo-dunia
  organisers:
    - AWS
---

## Why attend? Relationships, collaborations, and sustainability

On 1 July 2026, members of the US Galaxy Project team, based at Johns Hopkins University, attended the **AWS Summit in Washington, D.C.** The goal was simple and long-term: **relationship building → scientific collaborations → sustainable open-source projects**. This post debriefs the summit itself and then takes a closer look at one session especially relevant to the Galaxy community — a third-party AI agent designed to improve Galaxy administration.

The through-line of the trip was opportunity mapping. Several kinds of collaboration are within reach between Galaxy and AWS: **technical collaborations** and **conference sponsorships**, **community and global events**, and **scientific collaborations** — including potential collaborations around **AnVIL** a secure, cloud-hosted Galaxy. AWS's catalogue of 200+ managed services also opens the door to collaborate with **custom solutions** providers for server and platform management.

## Why sustaining open source matters even for commercial services

Underlying the "sustainable open-source projects" goal is a point that is easy to overlook: open source constitutes vast economic infrastructure — one whose costs are real, even when they remain invisible. A widely cited [Harvard Business School study](https://www.library.hbs.edu/working-knowledge/open-source-software-the-nine-trillion-resource-companies-take-for-granted) estimates that firms would need to spend on the order of **$8.8 trillion** to recreate the open source software they depend on — roughly 3.5× the cost of using what already exists — and that some 96% of commercial software includes open source code. Framed a similar way:

> "We find a robustly positive relationship between OSS contributions and entrepreneurial growth."
>
> — Frank Nagle and colleagues, Harvard Business School

Open source and proprietary software are often cast as rivals, but many industry leaders treat them as complementary — a point that resonates on a trip built around an open-source project serviced by a proprietary cloud provider. NVIDIA's Jensen Huang, whose company builds proprietary platforms while also ranking among the largest contributors to open-source AI, has put it succiently:

> "Proprietary versus open is not a thing. It's proprietary and open."
>
> — Jensen Huang, NVIDIA

For a research platform like Galaxy — free to use, community-built, and relied on by labs worldwide, yet increasingly run on and alongside commercial cloud infrastructure — these are not abstract arguments. They are the case for why relationship-building at events like the AWS Summit, and the sponsorships and collaborations that can follow, matter for the project's long-term health.

## The AWS Summit landscape

AWS runs a wide range of event types, and it helps to know how they differ:

- **AWS Global Summits** — free, regional, 1–2 day events (April–September) with keynotes, hands-on labs, and deep dives tailored to local industries.
- **AWS Community Days** — local, community-led conferences run by AWS enthusiasts and local leaders.
- **AWS Innovate** — free half-day webinars focused on major innovations, with live Q&A.
- **AWSome Day** — a short digital training conference aimed at beginners and IT professionals.
- **AWS Public Sector Events** — focused on government, education, healthcare, and nonprofits, with an emphasis on mission outcomes and navigating compliance in the cloud.
- **AWS re:Invent** — the flagship annual conference in Las Vegas.

The Global Summits are worth flagging for community members: they are **free** to attend — keynotes, breakout sessions, the expo floor, meals, and networking receptions — and simply require registration with an employer email address. With more than 30 summits across the globe in 2026, several land close to Galaxy team-member locations and Tier 2+ instance sites.

Beyond the Washington, D.C. event covered below, the 2026 Global Summit calendar spans six continents — the full schedule of dates and locations is listed in the [appendix](#appendix-2026-aws-global-summits) at the end of this post.

That global spread matters because Galaxy is itself a globally distributed project, and many of the summit cities coincide with this footprint. That overlap is what makes the summits such practical networking opportunities: in a good number of cases, a summit is taking place in a city where Galaxy already has people or infrastructure on the ground, where a community member can represent the project without long-haul travel.

## The Washington, D.C. Summit

Held at the Washington Convention Center, the D.C. Summit drew an expected **10,000 attendees**, with **100+ exhibitor booths** and **350+ sessions**. Content ranged from hands-on, bring-your-own-laptop labs — the most useful for practitioners — to more promotional vendor talks, alongside invite-only meetings and networking.

A memorable fact from the expo floor: AWS reports that it has been the **largest corporate buyer of renewable energy in the world** for six years running. Of AWS's 200+ services, roughly 16 featured across the GalaxyTrakr summit presentations — spanning compute (EC2, Batch), storage (S3, EFS, ECR), databases (Aurora, RDS), workflow and operations (Step Functions, Systems Manager, CloudWatch), search (OpenSearch), and AI (Bedrock, Nova).

## AWS Session spotlight: _"Building Self-Healing Platforms to Eliminate Bioinformatic Failures"_

[The session](https://govciomedia.com/ai-cuts-troubleshooting-time-for-fdas-food-safety-platform/) most relevant to our community described a **third-party AI agent for Galaxy administration**, presented as a set of agile user stories and built around a GalaxyTrakr-style deployment. (For context, GalaxyTrakr is the US FDA's public Galaxy instance for food-safety pathogen genomics.)

The challenge it set out to address: administering a Galaxy instance in a **high-accuracy, high-throughput** setting — food-safety surveillance running **at least 2,000 jobs per day** — while keeping costs down and making custom tool building and running easier.

Framed as business requirements, constraints, and outcomes, the session reported:

- **Requirements:** improve administration of the Galaxy instance while decreasing cost; improve the custom-tool building and running process.
- **Constraints:** a minimum of 2,000 jobs/day; a high-accuracy domain (food-safety surveillance).
- **Reported outcomes:** roughly **$2.8k/month** in cost savings; **human-in-the-loop** AI controls; faster error triage (surfaced every 15 minutes); and much faster container syncing (a reported ~99.7% improvement).

These figures come from the session presenters and describe their own deployment; we share them as an interesting example of where AI-assisted administration and cost optimization are heading, and as a conversation starter for Galaxy admins facing similar operational challenges.

## Takeaways for the Galaxy community

The summit was primarily relationship-building groundwork, but a few threads are worth following. There is appetite for **technical collaboration and event sponsorship** with AWS; **scientific collaboration** around **AnVIL** and secure, cloud-hosted Galaxy; and clear shared interest in **self-healing administration** and cost-efficient operations at scale. Self-managed and institutional Galaxy admins in particular may find the "self-healing platform" framing a useful lens for their own deployments.

## Resources

- AWS events overview — [aws.amazon.com/events](https://aws.amazon.com/events)
- AWS renewable energy updates — [aboutamazon.com](https://www.aboutamazon.com/news/sustainability/amazon-renewable-energy-updates)
- On the value of open source: *The $9 Trillion Resource Companies Take for Granted* (Harvard Business School) — [library.hbs.edu](https://www.library.hbs.edu/working-knowledge/open-source-software-the-nine-trillion-resource-companies-take-for-granted)
- On open source and competitiveness: *Asserting American Leadership in Open Source AI* (a16z) — [a16z.com](https://a16z.com/asserting-american-leadership-in-open-source-ai/)
- Jensen Huang on open and proprietary AI: *The Future of AI Is Open and Proprietary* (NVIDIA) — [blogs.nvidia.com](https://blogs.nvidia.com/blog/ai-future-open-and-proprietary/)
- Jensen Huang on why open source matters (CSIS transcript) — [csis.org](https://www.csis.org/analysis/nvidias-jensen-huang-securing-american-leadership-ai)

## Appendix: 2026 AWS Global Summits

The full 2026 AWS Global Summit schedule (excluding the Washington, D.C. event covered above), listed chronologically:

| Date       | Location             |
| ---------- | -------------------- |
| 2026-04-01 | Paris                |
| 2026-04-22 | Bengaluru            |
| 2026-04-22 | London               |
| 2026-05-06 | Singapore            |
| 2026-05-06 | Warsaw               |
| 2026-05-07 | Stockholm            |
| 2026-05-13 | Sydney               |
| 2026-05-20 | Hamburg              |
| 2026-05-20 | Seoul                |
| 2026-05-27 | Amsterdam            |
| 2026-05-28 | Mumbai               |
| 2026-05-28 | Bangkok              |
| 2026-05-28 | Milano               |
| 2026-06-03 | Toronto              |
| 2026-06-04 | Madrid               |
| 2026-06-10 | Los Angeles          |
| 2026-06-17 | New York City        |
| 2026-06-17 | Hong Kong            |
| 2026-06-23 | Shanghai             |
| 2026-06-25 | Japan                |
| 2026-07-15 | Taipei               |
| 2026-07-30 | Bogotá               |
| 2026-08-06 | Jakarta              |
| 2026-08-12 | Ciudad de México     |
| 2026-08-19 | Johannesburg         |
| 2026-09-02 | Zurich               |
| 2026-09-03 | São Paulo            |
| 2026-09-10 | Tel Aviv             |
| 2026-09-30 | Dubai                |
