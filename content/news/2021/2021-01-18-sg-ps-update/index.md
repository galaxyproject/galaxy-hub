---
title: Major update to SearchGUI and PeptideShaker
date: '2021-01-18'
tags: [tools]
subsites: [eu, freiburg]
main_subsite: freiburg
---

After 3 years of work, [SearchGUI (SG)](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/galaxyp/peptideshaker/search_gui/),
a tool that performs protein identification using various search engines, and [PeptideShaker (PS)](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/galaxyp/peptideshaker/peptide_shaker/)
 for protein identification (which uses SearchGUI results) have been deeply updated and released in new major versions: 4.0.7 and 2.0.5, respectively.
Furthermore, two new utility tools have been added to make the overall workflow more flexible:

* [Identification parameters](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/galaxyp/peptideshaker/ident_params/) for creating parameter files reusable by both SG and PS.
* [FastaCLI](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/galaxyp/peptideshaker/fasta_cli/), which appends decoy sequences to a FASTA file in a format readable by SG and PS.

The number of changes and improvements made is large, a few highlights:

### SearchGUI

* Support for spectrum files in mzML format.
* Search engines updated to the most recent versions. Options updated accordingly.
* FASTA file is now out of the search parameters.
* Many more supported search engines parameters.
* More [detailed release notes](http://compomics.github.io/projects/searchgui/wiki/ReleaseNotes).


### PeptideShaker

* Support for spectrum files in mzML format.
* Internal refactoring, new internal database and more efficient data management.
* Reduced file sizes and memory load.
* More [detailed release notes](http://compomics.github.io/projects/peptide-shaker/wiki/ReleaseNotes).

Thanks, Carlos Horro Marcos for your awesome work on the Galaxy integration.

