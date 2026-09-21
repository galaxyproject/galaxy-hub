---
title: "The 2nd Galaxy Tool Development Workshop - Now Open to the wider Community!"
tease: "Join us in Freiburg to learn how to build, test, and publish your own tools for the Galaxy platform - hands-on, beginner-friendly, and led by experienced Galaxy developers"
date: 2026-10-07
end: 2026-10-09
days: 3
continent: "EU"
location:
  name: Department of Computer Science, University of Freiburg
  street: Georges-Köhler-Allee 79
  city: Freiburg im Breisgau
  postal: 79110
  country: Germany
gtn: false
contact: Saim Momin, Matthias Bernt
tags: [workshop, tools, training, uni-freiburg, esg]
subsites: [all]
autotoc: false
contributions:
  organisers:
    - intergalacticutilitiescommissioniuc
    - freiburggalaxyteam
  funding:
    - deNBI
    - nfdi4bioimage
    - mwk
---

_Ever wanted your tools used by thousands of researchers around the world? Galaxy makes that possible - and this workshop shows you exactly how to get there!_

Following the enthusiastic response to our first internal Galaxy Tool Development Workshop in Freiburg, we're excited to open the doors wider. Organised by the [Intergalactic Utility Commission (IUC)](https://galaxyproject.org/iuc/) and the [Galaxy Tool Developer's SIG](https://galaxyproject.org/community/sig/tool-developers/), this second workshop will take place over three days (7-9 October), immediately following the ESG4Stars Kickoff meeting in Freiburg. The session is designed for researchers, bioinformaticians, and developers across the broader scientific community who want to learn how to build, test, and publish tools for the Galaxy platform.

Whether you're new to the Galaxy ecosystem or hoping to become a regular contributor to the Intergalactic Utilities Commission (IUC), this workshop offers hands-on guidance from experienced Galaxy developers and instructors.

# 🧬 What You'll Learn?

- Get introduced to Galaxy tool wrapping and leave with your own Galaxy tool wrapped and ready to submit
- Master the IUC's best-practice standards - so your future tools sail through review
- Use datatables and data managers to supplement your tools with reference data
- Get hands-on with Galaxy Interactive Tools
- Work side-by-side with experienced Galaxy developers on your own tool for your use-case

# 📝 How to Participate?

Registration to this workshop is free. Whether you're a trainer or a trainee, our doors are open to everyone. If you're an experienced Galaxy tool developer and would like to lead a session, sign up as a trainer. If you're new to Galaxy tool development and want to start your journey, register as a trainee - either way, you'll leave with new skills and new connections in the Galaxy developer community.

Please sign up using the registration link: [Register here](https://forms.gle/B8ELoqdPZnxiwtw57)

A detailed agenda of the workshop will be shared closer to the event.


# 💻 Prerequisites

- A machine running Linux, or Linux via WSL (Windows Subsystem for Linux)
- Basic knowledge of shell scripting and command-line tools
- Familiarity with Python and/or R is helpful but not required
- Please ensure that [VS Code](https://code.visualstudio.com/download) (with the [Galaxy extension](https://marketplace.visualstudio.com/items?itemName=davelopez.galaxy-tools)), [Docker](https://docs.docker.com/engine/install/ubuntu/), and [Miniforge](https://github.com/conda-forge/miniforge#unix-like-platforms-macos-linux--wsl?) are installed prior to the event
- [Planemo](https://planemo.readthedocs.io/en/latest/installation.html) installed on your system

 For your convenience, we'll share a detailed pre-requisites document closer to the event to help you get set up.


# 🗓️ Agenda

## Day 1 - Wednesday, 7 October: From Zero to a Working tool

| Time | Session | Trainer | Type |
|------|:-------:|:---------:|:------:|
| 09:30 - 09:45 | Welcome and round of introductions | Matthias Bernt | Talk |
| 09:45 - 10:15 | Introduction to Galaxy tools and the tool ecosystem: tool XML → job script → Conda/container; ToolShed, IUC, GTN, Tool Developer's SIG | Matthias Bernt | Talk |
| 10:15 - 10:45 | Setting up your dev environment: Planemo, mamba, Docker, VS Code + Galaxy Language Server; WSL option | All | Talk |
| 10:45 - 11:00 | ☕ Coffee break | | |
| 11:00 - 12:15 | Tool XML I: skeleton, `<command>` + Cheetah, `<requirements>`, simple inputs/outputs, `<help>`, `<citations>`. Live-coded on `seqtk_seq` (`tool_init`, `lint`, `serve`) | Paul Zierep | Hands-on |
| 12:15 - 13:15 | 🍽️ Lunch | | |
| 13:15 - 15:00 | Testing: writing `<tests>`, small test data, assertion types, `planemo test`, what CI runs | Pavan Videm | Hands-on |
| 15:00 - 15:15 | ☕ Coffee break | | |
| 15:15 - 16:00 | Publishing a tool on usegalaxy.eu/.org/.org.au: repo layout, `.shed.yml`, `planemo shed_*`, tools-iuc fork → PR → CI → review, reading a failing CI run | Matthias Bernt | Hands-on |
| 16:00 - 16:45 | IUC best practices: standards walkthrough, macros and `<import>`, versioning, profile, live review of a real PR | Rand Zoabi | Talk |
| 16:45 - 17:00 | Wrap-up and Day 2 preview | Rand Zoabi | Talk |


### Day 2 - Thursday, 8 October: Advanced tool XML, reference data, and interactive tools

| Time | Session | Trainer | Type |
|------|:-------:|:---------:|:------:|
| 09:30 - 09:45 | Recap of Day 1 | Amirhossein Nilchi | Talk |
| 09:45 - 10:45 | Tool XML II (part 1): conditionals, repeats, sections, parameter types, `format`/`change_format`, `filter`, output collections, `discover_datasets` | Amirhossein Nilchi, Pavan Videm | Talk + hands-on |
| 10:45 - 11:00 | ☕ Coffee break | | |
| 11:00 - 12:15 | Tool XML II (part 2): continued | Amirhossein Nilchi, Pavan Videm | Talk + hands-on |
| 12:15 - 13:15 | 🍽️ Lunch | | |
| 13:15 - 14:45 | Introduction to data tables: `.loc` files, `tool_data_table_conf.xml`, using reference data, and how to test data tables | Matthias Bernt | Hands-on |
| 14:45 - 15:00 | ☕ Coffee break | | |
| 15:00 - 16:30 | Introduction to Galaxy Interactive Tools: how GxITs work (proxy, entry points), anatomy of an IT wrapper, building one, deployment caveats | Paul Zierep | Talk |
| 16:30 - 17:00 | Q&A and introduction to the Day 3 hackathon (bring your own tool) | Paul Zierep | Talk |


### Day 3 - Friday, 9 October (half day): Hackathon

| Time | Session | Trainer | Type |
|------|:-------:|:---------:|:------:|
| 09:30 - lunch | Wrap your own tool, or join the IUC hackathon (e.g. [tools-iuc#7890](https://github.com/galaxyproject/tools-iuc/issues/7890), [tools-iuc#7675](https://github.com/galaxyproject/tools-iuc/issues/7675)). Followed by 2-minute updates from participants, the feedback form, and ways to stay involved (Tool Developer's SIG, Matrix, IUC reviews) | All | Hands-on |


# 📧 Contact

For further details, please reach out to:

- Saim Momin ([momins@informatik.uni-freiburg.de](mailto:momins@informatik.uni-freiburg.de))
- Matthias Bernt ([m.bernt@ufz.de](mailto:m.bernt@ufz.de))


📣 Know someone who'd benefit from this workshop? Please help us spread the word within your networks and communities. We look forward to seeing you there!


# Supporters

This event is generously supported by [de.NBI (ELIXIR Germany)](https://www.denbi.de/).

<div style="max-width: 300px">

![logo deNBI](/images/logos/deNBILogo.png)

</div
