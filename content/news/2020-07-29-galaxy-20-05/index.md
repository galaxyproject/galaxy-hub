---
title: UseGalaxy.eu update to 20.05
date: '2020-07-29'
tags: [release]
supporters:
- denbi
- elixir
authors: beatrizserrano
authors_structured:
- github: beatrizserrano
subsites: [eu, pasteur, freiburg, erasmusmc, elixir-it, belgium, genouest]
main_subsite: eu
---

We've updated our Galaxy server to **version 20.05**. This version includes the **migration to Python 3** and improves usability in the aspects listed below.


For a full list of the new features
please refer to the release notes of versions [20.01](https://docs.galaxyproject.org/en/master/releases/20.01_announce_user.html) and [20.05](https://docs.galaxyproject.org/en/master/releases/20.05_announce_user.html).


### Tool Recommendations

When you add a tool to your workflow in [UseGalaxy.eu](https://usegalaxy.eu/), you can now get a recommendation on which tools you can run next. This [feature](https://galaxyproject.eu/posts/2019/06/27/tool-prediction/) applies machine learning to data based on the previous usage and was already deployed on the European Galaxy server since a year - now this feature was integrated into the upstream code and works better than ever.

![Tool Recommendations](/assets/media/2020-07-29_tool_prediction.jpg)

### ChiRA Visualisation

The [ChiRA suite of tools](https://galaxyproject.eu/posts/2020/03/24/rna-interactome/) offers new visualisations for chimeras, tools to analyze RNA-RNA interactome experimental data such as CLASH, CLEAR-CLIP, PARIS, LIGR-Seq, etc.

### Workflow Invocations Menu

Under your *User* menu, you can now list your recent *Workflow invocations*, their status, along with links to the Workflow Editor and the History with the results of the workflow execution.

### New Interactive Tools

Interactive enviroments have been converted into the new interactive tool specification, [check them out!](https://live.usegalaxy.eu/)

![New Interactive Tools](/assets/media/20.05-new-its.png)

### Galaxy Markdown Pages and Workflow Reports as PDF

There's a new link in the Galaxy Markdown Pages and Workflow reports to exports your document as a standalone PDF.

---

If you notice any issues, please do not hesitate to [let us know](mailto:galaxy@informatik.uni-freiburg.de)!

