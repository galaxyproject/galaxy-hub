---
autotoc: true
title: December, ,,  2014 Galaxy Tool Shed Contributions
---
<div class='right'></div>
<br />

<br />
# About the Tool Shed
[http://usegalaxy.org/toolshed](http://usegalaxy.org/toolshed) <br />
[Wiki](/ToolShed) <br />
[All monthly summaries](/ToolShed/Contributions)

## Tools

* *From [pjbriggs](https://toolshed.g2.bx.psu.edu/view/pjbriggs):*
  * [weeder2](https://toolshed.g2.bx.psu.edu/view/pjbriggs/weeder2): Weeder2 is a program for finding novel motifs (transcription factor binding sites) conserved in a set of regulatory regions of related genes

* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
  * [bedtools](https://toolshed.g2.bx.psu.edu/view/iuc/bedtools): bedtools: a powerful toolset for genome arithmetic. Collectively, the bedtools utilities are a swiss-army knife of tools for a wide-range of genomics analysis tasks. The most widely-used tools enable genome arithmetic: that is, set theory on the genome. For example, bedtools allows one to intersect, merge, count, complement, and shuffle genomic intervals from multiple files in widely-used genomic file formats such as BAM, BED, GFF/GTF, VCF. While each individual tool is designed to do a relatively simple task (e.g., intersect two interval files), quite sophisticated analyses can be conducted by combining multiple bedtools operations.
    * Repository-Maintainer: Bj&ouml; Gr&uuml;ning
    * Repository-Development: https://github.com/galaxy-iuc/tool_shed/

* *From [peterjc](https://toolshed.g2.bx.psu.edu/view/peterjc):*
  * [mira_datatypes](https://toolshed.g2.bx.psu.edu/view/peterjc/mira_datatypes): Defines 'mira' datatype for the MIRA Assembly Format. Note that Galaxy already has a 'maf' datatype for the Multiple (sequence) Alignment Format (MAF). This is specifically for the MIRA Assembly Format (also called MAF).
  * [clc_assembly_cell](https://toolshed.g2.bx.psu.edu/view/peterjc/clc_assembly_cell): This is a wrapper for the commercial "CLC Assembly Cell" suite from CLCBio which includes a de novo assembler and read mapper. http://www.clcbio.com/products/clc-assembly-cell/
  * [seq_composition](https://toolshed.g2.bx.psu.edu/view/peterjc/seq_composition): Sequence composition Counts the letters in given sequence files, returning a table listing them with percentages. Suitable for use on assemblies or gene/protein sets. Probably not suitable for raw NGS reads.
  * [mummer](https://toolshed.g2.bx.psu.edu/view/peterjc/mummer): A simple wrapper allowing MUMmer to be used to draw dotplots from within Galaxy.  This offers alignment with mummer, mucmer, or promer which is then drawn with mummerplot giving PNG and PDF as output. Essentially a preview. No tests yet, no gnuplot or ps2pdf dependency yet. 
  * [mira4_assembler](https://toolshed.g2.bx.psu.edu/view/peterjc/mira4_assembler): MIRA 4.0 assembler Wrapper for core functionality of assembly tool MIRA 4.0.  Accepts data from Solexa/Illumina, Roche 454, Ion Torrent, !PacBio and Sanger capillary sequencing. The key MIRA output files are captured, but the other files are deleted when the job finishes.
  * [samtools_depad](https://toolshed.g2.bx.psu.edu/view/peterjc/samtools_depad): Runs "samtools depad" to remap a SAM/BAM file using a padded reference (with gap characters) giving a new BAM file using an unpadded (ungapped) reference.
  * [coverage_stats](https://toolshed.g2.bx.psu.edu/view/peterjc/coverage_stats): runs the commands ``samtools idxstats`` and ``samtools depth`` from the SAMtools toolkit, and parses their output to produce a consise summary of the coverage information for each reference sequence.

* *From [devteam](https://toolshed.g2.bx.psu.edu/view/devteam):*
  * [picard_plus](https://toolshed.g2.bx.psu.edu/view/devteam/picard_plus): Picard wrappers for version 122 and up. New set of Picard wrappers that do not rely on external scripts and deal with all aspects of picard management and UI via tool XML.  To modify and comment please submit pull requests to https://github.com/nekrut/picard

* *From [crs4](https://toolshed.g2.bx.psu.edu/view/crs4):*
  * [seal_galaxy](https://toolshed.g2.bx.psu.edu/view/crs4/seal_galaxy): Galaxy wrappers for Seal http://github.com/crs4/seal

* *From [acrylamide](https://toolshed.g2.bx.psu.edu/view/acrylamide):*
  * [misc_tool_workflow_linkers](https://toolshed.g2.bx.psu.edu/view/acrylamide/misc_tool_workflow_linkers): Contains my Tool Factory tools So far includes only one tool for dealing with seqprep output's gzip'd nature.

* *From [big-tiandm](https://toolshed.g2.bx.psu.edu/view/big-tiandm):*
  * [boost_graph](https://toolshed.g2.bx.psu.edu/view/big-tiandm/boost_graph): Boost-Graph This is a perl model named Boost-Graph

* *From [saket-choudhary](https://toolshed.g2.bx.psu.edu/view/saket-choudhary):*
  * [fathmm_web](https://toolshed.g2.bx.psu.edu/view/saket-choudhary/fathmm_web): This tools calls FATHMM webservice  at http://fathmm.biocompute.org.uk
  * [mutationassessor_web](https://toolshed.g2.bx.psu.edu/view/saket-choudhary/mutationassessor_web): Tool to call Mutation Assessor webse This tools calls Mutation Assessor webservice: mutationassessor.org
  * [replace_delimiters](https://toolshed.g2.bx.psu.edu/view/saket-choudhary/replace_delimiters): A tool that allows replacing any delimiter in the input to any other delimiter This tool is similar to Galaxy's default 'Convert delimiter' tool, but allows conversion from any given type (comma, dash, pipe etc)
  * [inchlib_clust](https://toolshed.g2.bx.psu.edu/view/saket-choudhary/inchlib_clust): inchlib_clust is a python script that performs data clustering and prepares input data for InCHlib. inchlib_clust can be used both from command line or from Python code. Data for clustering are supplied to inchlib_clust as a csv file. This tools is a wrapper around inchlib_clust.py
  * [vep_rest](https://toolshed.g2.bx.psu.edu/view/saket-choudhary/vep_rest): Variant Effect Predictor Webservice Package to interact with the GRCh37 (ONLY!). Variant Effect Predictor webservice at http://grch37.rest.ensembl.org
  * [chasm_webservice](https://toolshed.g2.bx.psu.edu/view/saket-choudhary/chasm_webservice): Tool to call CHASM webservice  This tool calls CHASM webserice at www.cravat.us
  * [polyphen2_web](https://toolshed.g2.bx.psu.edu/view/saket-choudhary/polyphen2_web): Wrapper to call Polyphen2 Webservice. This tools calls Polyphen2 webservice at http://genetics.bwh.harvard.edu/pph2/
  * [merge_columns_with_delimiter](https://toolshed.g2.bx.psu.edu/view/saket-choudhary/merge_columns_with_delimiter): Modified merge_columns to allow merging columns separated by a delimiter This tool allows merging columns separated by a delimiter(two or multiple columns). It is similar to the Galaxy's default too; 'Merge Columns' but also allows merging them separated by a specified delimiter.

* *From [galaxyp](https://toolshed.g2.bx.psu.edu/view/galaxyp):*
  * [pepxml_to_xls](https://toolshed.g2.bx.psu.edu/view/galaxyp/pepxml_to_xls): Convert PepXML to Tabular 
  * [protxml_to_xls](https://toolshed.g2.bx.psu.edu/view/galaxyp/protxml_to_xls): Convert ProtXML to Tabular 
  * [blastxml_to_tabular_selectable](https://toolshed.g2.bx.psu.edu/view/galaxyp/blastxml_to_tabular_selectable): Converts blast xml file to a tabular with options for unmatched queries, and number of hits to convert.  The unmatched queries can be useful for finding novel peptides.

## Tool Suite

* *From [arkarachai-fungtammasan](https://toolshed.g2.bx.psu.edu/view/arkarachai-fungtammasan):*
  * [microsat_ngs_profiling_suite_trfm](https://toolshed.g2.bx.psu.edu/view/arkarachai-fungtammasan/microsat_ngs_profiling_suite_trfm): Uploaded all dependency for microsattelite_ngs package and microsattelite_ngs itself all dependency for microsattelite_ngs package and microsattelite_ngs itself

## Workflow
* *From [bgruening](https://toolshed.g2.bx.psu.edu/view/bgruening):*
  * [chemicaltoolbox_library_hole_filling_workflow](https://toolshed.g2.bx.psu.edu/view/bgruening/chemicaltoolbox_library_hole_filling_workflow): Given one library, it extends all molecules by similar molecules of an other library and thus fill gaps in an automatic manner. This workflow is part of case study demonstrating the capability of the chemicaltoolbox. For further information please have a look at the chemicaltoolbox: https://github.com/bgruening/galaxytools/tree/master/chemicaltoolbox
    * Repository-Maintainer: Bj&ouml;rn Gr&uuml;ning
    * Repository-Development: https://github.com/bgruening/galaxytools/tree/master/workflows/chemicaltoolbox

## Packages and Dependencies

* *From [lparsons](https://toolshed.g2.bx.psu.edu/view/lparsons):*
  * [package_cutadapt_1_6](https://toolshed.g2.bx.psu.edu/view/lparsons/package_cutadapt_1_6): tool dependency definition that downloads and compiles cutadapt version 1.6 trim adapters from high-throughput sequencing reads

* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
  * [package_numpy_1_9](https://toolshed.g2.bx.psu.edu/view/iuc/package_numpy_1_9): tool dependency definition that downloads and compiles version 1.9 of the the python numpy package. !NumPy is the fundamental package for scientific computing with Python.  This is the version 1.8 of numpy.  www.numpy.org/
    * Repository-Maintainer: Bj&ouml;rn Gr&uuml;ning
    * Repository-Development: https://github.com/galaxyproject/tools-iuc
  * [package_blast_plus_2_2_30](https://toolshed.g2.bx.psu.edu/view/iuc/package_blast_plus_2_2_30): NCBI BLAST+ 2.2.30 (binaries only).  This Tool Shed package is intended to be used as a dependency of the Galaxy wrappers for NCBI BLAST+ and any other tools which call the BLAST+ binaries internally.  Development is hosted on !GitHub https://github.com/peterjc/galaxy_blast/ which can be used for reporting any issues.
  * [package_matplotlib_1_4](https://toolshed.g2.bx.psu.edu/view/iuc/package_matplotlib_1_4): Contains a tool dependency definition that downloads and compiles version 1.4.x of the the python matplotlib package. matplotlib is a python 2D plotting library which produces publication quality figures. This is the version 1.2.x of matplotlib.  www.matplotlib.org/
    * Repository-Maintainer: Bj&ouml;rn Gr&uuml;ning
    * Repository-Development: https://github.com/galaxyproject/tools-iuc
  * [package_networkx_1_9](https://toolshed.g2.bx.psu.edu/view/iuc/package_networkx_1_9):  tool dependency definition that downloads and compiles version 1.9.x of the python library networkx. NetworkX is a Python language software package for the creation, manipulation, and study of the structure, dynamics, and functions of complex networks.  http://networkx.github.io/
    * Repository-Maintainer: Bj&ouml;rn Gr&uuml;ning
    * Repository-Development: https://github.com/galaxy-iuc/tool_shed/
  * [package_scipy_0_14](https://toolshed.g2.bx.psu.edu/view/iuc/package_scipy_0_14): tool dependency definition that downloads and compiles version 0.14 of the the scipy python library. !SciPy is open-source software for mathematics, science, and engineering. The !SciPy library is built to work with !NumPy arrays, and provides many user-friendly and efficient numerical routines such as routines for numerical integration and optimization.  http://www.scipy.org/
    * Repository-Maintainer: Bj&ouml;rn Gr&uuml;ning
    * Repository-Development: https://github.com/galaxyproject/tools-iuc
  * [package_dill_0_2](https://toolshed.g2.bx.psu.edu/view/iuc/package_dill_0_2): tool dependency definition that downloads and compiles version 1.9.x of the python library dill. Dill extends python's 'pickle' module for serializing and de-serializing python objects to the majority of the built-in python types. Serialization is the process of converting an object to a byte stream, and the inverse of which is converting a byte stream back to on python object hierarchy. http://trac.mystic.cacr.caltech.edu/project/pathos/wiki/dill
    * Repository-Maintainer: Bj&ouml;rn Gr&uuml;ning
    * Repository-Development: https://github.com/galaxy-iuc/tool_shed/
  * [package_gnuplot_4_6](https://toolshed.g2.bx.psu.edu/view/iuc/package_gnuplot_4_6): tool dependency definition that downloads and compiles version 4.6 of gnuplot.  Gnuplot is a portable command-line driven graphing utility for Linux, OS/2, MS Windows, OSX, VMS, and many other platforms. It was originally created to allow scientists and students to visualize mathematical functions and data interactively, but has grown to support many non-interactive uses such as web scripting. It is also used as a plotting engine by third-party applications like Octave.  http://www.gnuplot.info/
    * Repository-Maintainer: Bj&ouml;rn Gr&uuml;ning
    * Repository-Development: https://github.com/galaxy-iuc/tool_shed/
  * [package_scikit_learn_0_15](https://toolshed.g2.bx.psu.edu/view/iuc/package_scikit_learn_0_15): tool dependency definition that downloads and compiles version 0.15.x of the the scikit-learn package. Easy-to-use and general-purpose machine learning in Python. Scikit-learn integrates machine learning algorithms in the tightly-knit scientific Python world, building upon numpy, scipy, and matplotlib. As a machine-learning module, it provides versatile tools for data mining and analysis in any field of science and engineering. It strives to be simple and efficient, accessible to everybody, and reusable in various contexts. http://scikit-learn.org/
    * Repository-Maintainer: Bj&ouml;rn Gr&uuml;ning
    * Repository-Development: https://github.com/galaxyproject/tools-iuc

* *From [iyad](https://toolshed.g2.bx.psu.edu/view/iyad):*
  * [package_blast_2_2_26](https://toolshed.g2.bx.psu.edu/view/iyad/package_blast_2_2_26): adapted tool_dependencies.xml from Blast Plus 2.2.26 repository. Legacy NCBI Blast tools v2.2.26 Based on the NCBI Blast Plus package repository, this package will build and install the legacy NCBI Blast tools v2.2.26 for various operating systems and architectures.

* *From [takadonet](https://toolshed.g2.bx.psu.edu/view/takadonet):*
  * [package_tbl2asn_23_7](https://toolshed.g2.bx.psu.edu/view/takadonet/package_tbl2asn_23_7): tool dependency definition that downloads the binary version 23.7 of tbl2asn. tbl2asn is an automated bulk submission program. tbl2asn is a program that automates the submission of sequence records to !GenBank.  It uses many of the same functions as Sequin, but is driven entirely by data files, and records need no additional manual editing before submission.  Entire genomes, consisting of many chromosomes with feature annotation, can be processed in seconds using this method. 
    * Repository-Maintainer:Philip Mabon
  * [package_minced_0_1_6](https://toolshed.g2.bx.psu.edu/view/takadonet/package_minced_0_1_6): tool dependency definition that downloads version 0.1.6 of minced, a CRISPR finder.  MinCED is a program to find Clustered Regularly Interspaced Short Palindromic
Repeats (CRISPRs) in full genomes or environmental datasets such as metagenomes, in which sequence size can be anywhere from 100 to 800 bp. MinCED runs from the command-line and was derived from CRT (http://www.room220.com/crt/):  Charles Bland *et al*., CRISPR Recognition Tool (CRT): a tool for automatic  detection of clustered regularly interspaced palindromic repeats, BMC Bioinformatics 8, no. 1 (2007): 209.
* Repository-Maintainer: Philip Mabon
* [package_barrnap_0_5](https://toolshed.g2.bx.psu.edu/view/takadonet/package_barrnap_0_5): tool dependency definition that downloads and compiles version 0.4 of the barrnap. Barrnap predicts the location of 5S, 16S and 23S ribosomal RNA genes in Bacterial genome sequ It takes FASTA DNA sequence as input, and write GFF3 as output. https://github.com/Victorian-Bioinformatics-Consortium/barrnap
    & Repository-Maintainer: Philip Mabon

* *From [agordon](https://toolshed.g2.bx.psu.edu/view/agordon):*
  * [package_datamash_1_0_6](https://toolshed.g2.bx.psu.edu/view/agordon/package_datamash_1_0_6): GNU Datamash is a grouping and summarizing tool on tabular data files GNU Datamash is a command-line program which performs basic numeric, textual and statistical operations on input textual data files. it is designed to be portable and reliable, and aid researchers to easily automate analysis pipelines, without writing code or even short scripts. Home page: http://www.gnu.org/software/datamash License: GPL Version 3 (or later).

* *From [saket-choudhary](https://toolshed.g2.bx.psu.edu/view/saket-choudhary):*
  * [package_xlrd_0_9_3](https://toolshed.g2.bx.psu.edu/view/saket-choudhary/package_xlrd_0_9_3): Tool dependency definition of python-xlrd 
  * [package_scikit_learn_0_15](https://toolshed.g2.bx.psu.edu/view/saket-choudhary/package_scikit_learn_0_15): Tool dependency package for scikit-learn-0.15 
  * [package_fastcluster_1_1_13](https://toolshed.g2.bx.psu.edu/view/saket-choudhary/package_fastcluster_1_1_13): Tool dependency definition of python-fastcluster 
  * [package_blas_3_5_0](https://toolshed.g2.bx.psu.edu/view/saket-choudhary/package_blas_3_5_0): Tool dependency package for blas 
  * [package_pyvcf_0_6_7](https://toolshed.g2.bx.psu.edu/view/saket-choudhary/package_pyvcf_0_6_7): Tool dependedency definition for PyVCF 

* *From [devteam](https://toolshed.g2.bx.psu.edu/view/devteam):*
  * [package_picard_122](https://toolshed.g2.bx.psu.edu/view/devteam/package_picard_122): Picard 1.122 package definition This picard package dependency is retrieved directly from https://github.com/broadinstitute/picard/releases

* [package_fastqc_0_11_2](https://toolshed.g2.bx.psu.edu/view/devteam/package_fastqc_0_11_2): GH fastqc v 0.11.2 fastqc v 0.11.2


## Select Updates

### Datatypes

* *From [peterjc](https://toolshed.g2.bx.psu.edu/view/devteam):*
  * [blast_datatypes](https://toolshed.g2.bx.psu.edu/view/devteam/blast_datatypes): v0.0.19, adds blastdbp and pssm-asn1 datatypes.

### Tools

* *From [lparsons](https://toolshed.g2.bx.psu.edu/view/lparsons):*
  * [cutadapt](https://toolshed.g2.bx.psu.edu/view/lparsons/cutadapt): Updated to version 1.6

* *From [saskia-hiltemann](https://toolshed.g2.bx.psu.edu/view/saskia-hiltemann):*
  * [ireport](https://toolshed.g2.bx.psu.edu/view/saskia-hiltemann/ireport): Added MarkDown support

* *From [geert-vandeweyer](https://toolshed.g2.bx.psu.edu/view/geert-vandeweyer):*
  * [coverage_report](https://toolshed.g2.bx.psu.edu/view/geert-vandeweyer/coverage_report): new version 0.0.3 (fix on headless R); changed tool.xml to request R 3.0.3; Correction to png calls to use cairo instead of x11. thanks to Eric Enns for pointing  this out

* *From [peterjc](https://toolshed.g2.bx.psu.edu/view/peterjc):*
  * [effectivet3](https://toolshed.g2.bx.psu.edu/view/peterjc/effectivet3): Uploaded v0.0.13, embed citation, relax test for floating point differences
  * [clinod](https://toolshed.g2.bx.psu.edu/view/peterjc/clinod): Uploaded v0.0.7, uses $GALAXY_SLOTS and embeds citation in tool XML.
  * [predictnls](https://toolshed.g2.bx.psu.edu/view/peterjc/predictnls): Uploaded v0.0.7 with embedded citations
  * [blast_rbh](https://toolshed.g2.bx.psu.edu/view/peterjc/blast_rbh): Uploaded v0.1.5, NCBI BLAST+ 2.2.30 etc
  * [tmhmm_and_signalp](https://toolshed.g2.bx.psu.edu/view/peterjc/tmhmm_and_signalp): Uploaded v0.2.6, embedded citations and uses $GALAXY_SLOTS

* *From [crs4](https://toolshed.g2.bx.psu.edu/view/crs4):*
  * [mosaik2](https://toolshed.g2.bx.psu.edu/view/crs4/mosaik2): Update Orione citation. Upgrade Mosaik dependency to v. 2.2.28 (2.2.30 is buggy, see https://github.com/wanpinglee/MOSAIK/issues/11 ). Use 2.1.78 neural networks. Add package_zlib_1_2_8 and package_samtools_0_1_19 dependencies. Add <citations>.
  * [sspace](https://toolshed.g2.bx.psu.edu/view/crs4/sspace): Update Orione citation. Update dependency to SSPACE Basic v2.1 . Add <citations>.
  * [prokka](https://toolshed.g2.bx.psu.edu/view/crs4/prokka): Use <stdio> because prokka writes some warnings on stderr. Update Orione citation. Update Prokka citation. Support Prokka 1.10. Upgrade dependencies to package_minced_0_1_6, package_barrnap_0_5 and package_tbl2asn_23_7. Added --proteins option. Add <citations>.



### Packages and Dependencies

* *From [devteam](https://toolshed.g2.bx.psu.edu/view/devteam):*
  * [package_galaxy_ops_1_0_0](https://toolshed.g2.bx.psu.edu/view/devteam/package_galaxy_ops_1_0_0): Uploaded tool dependency definition that uses pip to install gops.

# About Galaxy
<div class='left'><a href='http://usegalaxy.org'><img src='/Images/Logos/GalaxyLogoHighRes.png' alt='UseGalaxy.org' width="200" /></a></div>
**[About Galaxy](/Support/AboutGalaxy)** • [Galaxy Project](/GalaxyProject) • [/Admin](/Admin) • [/Issues](/Issues) • [Big Picture](/BigPicture) • [/Community](/Community) • [Get Galaxy](/Admin/GetGalaxy) • [/CloudMan](/CloudMan) • [Tool Shed](/ToolShed) • [/Develop](/Develop) • [News Briefs](/DevNewsBriefs) • [Servers](/PublicGalaxyServers) • [/Learn](/Learn) • [/Support](/Support) • [Galaxy Biostar](http://biostar.usegalaxy.org) • [/News](/News) • [Twitter](/GalaxyOnTwitter) • [/Events](/Events) • [/Teach](/Teach) • [/Issues](/Issues) • [Cite](/CitingGalaxy) • [Galaxy Team](/GalaxyTeam)
