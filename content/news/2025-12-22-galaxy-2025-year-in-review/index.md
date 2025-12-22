---
title: "Galaxy 2025 Year in Review"
date: "2025-12-22"
tease: "650K+ users, 186M+ jobs, ~15K commits across the ecosystem"
authors: "Galaxy Project"
tags: [galaxy, community, statistics, year-in-review]
subsites: [all]
---

![Galaxy 2025 Year in Review](./cover_art.png)

*Image credit: Bob Harris | [bumblebeagle.org/xmas2025](http://www.bumblebeagle.org/xmas2025/)*

2025 was a busy year. Here's what the Galaxy community built:

- Over **14,900 commits** were pushed across Galaxy core, training materials, and tools repositories
- More than **100 contributors** actively developed Galaxy in 2025
- **10 releases** shipped, including Galaxy 25.1, 25.0, and 24.2
- The Galaxy Training Network merged **760+ PRs** and received contributions from **57 authors**

## Global Impact

Combined metrics across usegalaxy.org, usegalaxy.eu, usegalaxy.org.au, usegalaxy.fr, and usegalaxy.be:

<table class="table">
  <tr>
    <td style="background: linear-gradient(135deg, #7a8b10, #90b668); color: white; text-align: center; padding: 15px; border-radius: 8px;"><strong style="font-size: 1.5em;">650K+</strong><br/>registered users</td>
    <td style="background: linear-gradient(135deg, #a89707, #e1d808); color: white; text-align: center; padding: 15px; border-radius: 8px;"><strong style="font-size: 1.5em;">186M+</strong><br/>jobs executed</td>
  </tr>
  <tr>
    <td style="background: linear-gradient(135deg, #9c2a07, #ed7808); color: white; text-align: center; padding: 15px; border-radius: 8px;"><strong style="font-size: 1.5em;">333M+</strong><br/>datasets stored</td>
    <td style="background: linear-gradient(135deg, #3e7b36, #80d281); color: white; text-align: center; padding: 15px; border-radius: 8px;"><strong style="font-size: 1.5em;">862K+</strong><br/>workflows created</td>
  </tr>
</table>

### Jobs by Server (2025)

<table class="table">
  <tr>
    <th>Server</th>
    <th style="text-align: right;">Jobs</th>
  </tr>
  <tr>
    <td>usegalaxy.eu</td>
    <td style="text-align: right; background-color: #e8f3e6;"><strong style="color: #3e7b36;">93.3M</strong></td>
  </tr>
  <tr>
    <td>usegalaxy.org</td>
    <td style="text-align: right; background-color: #f5f3e0;"><strong style="color: #7a8b10;">72.9M</strong></td>
  </tr>
  <tr>
    <td>usegalaxy.org.au</td>
    <td style="text-align: right; background-color: #fdf2e6;"><strong style="color: #ed7808;">13.6M</strong></td>
  </tr>
  <tr>
    <td>usegalaxy.fr</td>
    <td style="text-align: right; background-color: #e6f0ef;"><strong style="color: #196e63;">6.9M</strong></td>
  </tr>
</table>

## 2025 Commits by Repository

<table class="table">
  <tr>
    <th>Repository</th>
    <th style="text-align: right;">Commits</th>
  </tr>
  <tr>
    <td>galaxy</td>
    <td style="text-align: right; background-color: #e8f3e6;"><strong style="color: #3e7b36;">7,554</strong></td>
  </tr>
  <tr>
    <td>training-material</td>
    <td style="text-align: right; background-color: #eef5e8;"><strong style="color: #5a9b4a;">4,974</strong></td>
  </tr>
  <tr>
    <td>tools-iuc</td>
    <td style="text-align: right; background-color: #f4f7ec;"><strong style="color: #80d281;">2,365</strong></td>
  </tr>
</table>

### Galaxy Core Commits by Month

<vega-embed spec="https://gist.githubusercontent.com/nekrut/ee85b69a80af1a23ba9248b2014343e2/raw/76a2f0c4aa78cad5eef0a65533b6e4bc3b7c3efc/commits-by-month.json" />

## Infrastructure & Developer Tools

Key ecosystem projects saw significant development in 2025:

### Total Perspective Vortex v3.0

Major release with Pydantic schema support, type-checking linter for embedded Python code, and multi-file config support. 162 commits, 28 PRs, 6 releases.

[View project →](https://github.com/galaxyproject/total-perspective-vortex)

### Galaxy Charts

New visualization framework launched in 2024, with 244 commits in 2025 adding conditional support, dataset extensions, and Vite 7 upgrade.

[View project →](https://github.com/galaxyproject/galaxy-charts)

### Developer Tool Activity

| Tool | Activity |
|------|----------|
| planemo | 259 commits, 63 PRs, 7 releases |
| pulsar | 135 commits, 33 PRs, 6 releases |

## Galaxy Workflows

The [Intergalactic Workflow Commission (IWC)](https://iwc.galaxyproject.org/) maintains peer-reviewed, production-ready workflows:

<table class="table">
  <tr>
    <td style="text-align: center; padding: 15px;"><strong style="font-size: 1.5em; color: #6f265d;">25</strong><br/>workflow categories</td>
    <td style="text-align: center; padding: 15px;"><strong style="font-size: 1.5em; color: #9c2a07;">270</strong><br/>PRs merged in 2025</td>
    <td style="text-align: center; padding: 15px;"><strong style="font-size: 1.5em; color: #3e7b36;">1,251</strong><br/>commits in 2025</td>
  </tr>
</table>

### VGP Assembly v2

Complete 5-step pipeline for high-quality vertebrate genome assembly. Features Hifiasm phased assembly and Hi-C scaffolding for chromosome-scale results.

[View workflow →](https://github.com/galaxyproject/iwc/tree/main/workflows/VGP-assembly-v2)

### Single-Cell RNA-seq Analysis

Community-maintained pipeline for single-cell transcriptomics. Peer-reviewed and production-ready for your research needs.

[View workflow →](https://github.com/galaxyproject/iwc/tree/main/workflows/scRNAseq)

## Release Highlights

### Galaxy 25.1 (December 2025)

- Modern card-based history interface with keyboard navigation
- Powerful Sample Sheets for complex workflow inputs
- Enhanced tool discovery capabilities

### Galaxy 25.0 (June 2025)

- JupyterLite integration for browser-based notebooks
- ZIP archive explorer for remote and local files
- New visualizations: Vizarr, Molstar, Kepler.gl, Niivue

### Galaxy 24.2 (January 2025)

- ChatGXY AI assistant for job error diagnosis
- Job metrics dashboard for runtime and memory insights

[Read full release notes →](https://docs.galaxyproject.org/en/latest/releases/)

## Community Events

### European Galaxy Days 2025

October 2025, Freiburg — Recordings now available

[Watch recordings](https://galaxyproject.org/events/2025-european-galaxy-days/)

### GCC2026 Save the Date

June 2026, Clermont-Ferrand, France

[Learn more](https://galaxyproject.org/gcc/)

## Community Growth

- **Tool Developers SIG** formed to standardize best practices
- **57 contributors** to the Galaxy Training Network in 2025
- **Global training academies** connecting researchers worldwide

---

**Connect with Galaxy:**
[Mastodon @galaxyproject](https://mstdn.science/@galaxyproject) |
[Mastodon @galaxyfreiburg](https://social.bund.de/@galaxyfreiburg) |
[Matrix](https://matrix.to/#/#usegalaxy-eu-announce:matrix.org) |
[Bluesky](https://bsky.app/profile/galaxyproject.bsky.social) |
[LinkedIn](https://www.linkedin.com/groups/4907635/)

[galaxyproject.org](https://galaxyproject.org) | [Training](https://training.galaxyproject.org) | [Docs](https://docs.galaxyproject.org)
