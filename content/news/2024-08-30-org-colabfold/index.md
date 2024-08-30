---
title: "ColabFold: GPU-accelerated protein structure prediction comes to UseGalaxy.org"
date: '2024-08-30'
tease: "Optimized AlphaFold2-based protein structure prediction now available for all"
hide_tease: false
tags: [us, tools]
authors: "Alex Ostrovsky, Nate Coraor"
contact: "nate@bx.psu.edu"
subsites: [us]
main_subsite: us
---
<img src="https://raw.githubusercontent.com/sokrypton/ColabFold/main/.github/ColabFold_Marv_Logo.png" alt="ColabFold Logo" height="200" style="float:right" />

The US server of Galaxy, UseGalaxy.org, is excited to announce the full release of the tool for ColabFold, offering
accelerated prediction of protein structures and complexes by combining the fast homology search of MMseqs2 with
AlphaFold2 or RoseTTAFold. The Galaxy version of this tool separates the run into two parts: the [MSA
step](https://usegalaxy.org/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/colabfold_msa/colabfold_msa/1.5.5+galaxy1) and
the [AlphaFold2
step](https://usegalaxy.org/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/colabfold_alphafold/colabfold_alphafold/1.5.5+galaxy1),
each completing runs on individual sequences within a few seconds to a few minutes. The output of the MSA step is
intended as a direct input to the AlphaFold2 step, but this separation allows a more iterative approach than previous
releases. Additionally, as the Galaxy version of ColabFold is run entirely on Galaxy servers, this significantly
increases the number of proteins that can be analyzed using ColabFold globally, easing previous run limitations on this
highly anticipated tool.

For more information about ColabFold, please visit [the ColabFold repository on
github](https://github.com/sokrypton/ColabFold) and read the [original
publication](https://www.nature.com/articles/s41592-022-01488-1), which announces its release and explains how it works
in greater depth.

Please note some important details about the implementation of ColabFold on UseGalaxy.org:
- To ensure adequate resource availability, each Galaxy user is limited to two concurrent ColabFold MSA jobs and four
  concurrent ColabFold AlphaFold2 jobs.
- To ensure runtimes are manageable, a maximum of 20 sequences per FASTA/a3m file are allowed as inputs to the MSA tool.
- Because the AlphaFold2 tool runs on a limited shared resource, you may experience additional wait times before your
  jobs begin running - please leave any jobs you submit queued until they are complete. Other Galaxy jobs can be run
  while the ColabFold tools are queued. For additional help or to report jobs that do not run after a considerable time
  (more than 24 hours), please see the [Galaxy Help forum](https://help.galaxyproject.org/).

Large Memory resources for the MSA step are supported by [Advanced Research Computing at
Hopkins](https://www.arch.jhu.edu/). GPU resources for the AlphaFold2 step are provided by the
[Frontera](https://frontera-portal.tacc.utexas.edu/) computing project at the [Texas Advanced Computing
Center](https://www.tacc.utexas.edu/). Frontera is made possible by National Science Foundation award OAC-1818253.
Additionally, we would like to thank Milot Mirdita (who also developed ColabFold) for his help with the Galaxy tool.
This work was also supported by NHGRI award U24HG006620 and NSF award DBI-2419522.
