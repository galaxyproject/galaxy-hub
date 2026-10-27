---
title: "Follow a PBMC3k matrix through RNA network inference with RustScenic"
date: '2026-10-27'
tease: "A Python notebook installs published RustScenic to make TF-target inference, candidate gene-set scores and run provenance inspectable."
tags: [tools, single-cell]
---

[RustScenic](https://github.com/Ekin-Kahraman/rustscenic) now has a
[PBMC3k starter notebook](https://github.com/Ekin-Kahraman/rustscenic/blob/main/examples/pbmc3k_quickstart.ipynb)
that follows a public RNA count matrix through TF-target inference and per-cell
candidate gene-set scoring. For researchers who use Python alongside Galaxy,
it offers a small example for inspecting the inputs and outputs of these steps.

The notebook installs the published [RustScenic 0.5.1 package](https://pypi.org/project/rustscenic/0.5.1/).
It reads the 10x PBMC3k matrix into AnnData, retains cell and gene identifiers,
normalizes expression, fits a modest GRN model and scores candidate sets with
AUCell. It also exports results and run provenance. The selected gene panel,
ranking universe and model settings are explicit.

The candidate sets are top-target selections without motif filtering or an
activation/repression split. This RNA starter does not establish biological
accuracy or reproduce a complete SCENIC/SCENIC+ analysis.
[Method differences and validation limits](https://ekin-kahraman.github.io/rustscenic/validation/)
describe the broader package scope.

The example runs in a regular Python/Jupyter environment. No native Galaxy
wrapper is included in this example, and Galaxy-hosted execution has not been
tested. The [quickstart](https://ekin-kahraman.github.io/rustscenic/quickstart/)
links the notebook and setup guidance. A separate
[endothelial network viewer](https://ekin-kahraman.github.io/rustscenic/demo/endothelial/)
displays saved outputs without rerunning inference.

Ekin Kahraman maintains RustScenic. Codex assisted with drafting and source checks.
