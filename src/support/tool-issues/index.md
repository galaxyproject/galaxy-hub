
## Issue by tool name 

_Last updated 4-13-17_

1. (15) **Heatmap 1.0.0** Missing dependencies. Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/galaxy/issues/3030
1. (10) **MACS2 bdgdiff + bdgbroadcall 2.1.1.20160309.0** Tool version updated 4/11/17, bugs count is for prior macs problems with these tools (earlier version the update was intended to fix) *plus* newly reported. Now errors with "macs2 command not found". Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/galaxy/issues/2226
1. (N) **MACS2 bdgdiff 2.1.0.20151222.0** Tool version updated 4/11/17, no bugs yet. Does not have "Versions" menu on tool form. This older version errors and users should use newer version (and be notified it exists). Impacts Galaxy Main http://usegalaxyorg. Details: https://github.com/galaxyproject/galaxy/issues/3925
1. (7) **DEXseq Count 1.20.1** Dependencies issues. Primary tool **DEXSeq** may also have the problem, but since the upstream tool is non-functional, it cannot be tested on Main. Impacts Galaxy Main http://usegalaxy.org. Details: http://usegalaxy.org
1. (5) **Cuffmerge v 2.2.1** Older v 0.0.6 is successful with same inputs. No changes to tool wrapper, but is now failing. Problem with selecting multiple input files? Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/galaxy/issues/2989 Might be related to https://github.com/galaxyproject/tools-iuc/issues/988
1. (2 bugs +github) **CummeRbund 1.0.1** Select for "gene_id" problematic. Graphs for Heatmap and Volcano plots also problematic. Impacts Galaxy Main http://usegalaxy.org.Details: https://github.com/galaxyproject/tools-devteam/issues/340
1. (2) **Du Novo: Align families 0.7** Tool updates removed the cluster targetting for Jetstream. Jobs are failing again for walltime. Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/galaxy/issues/3057
1. (2) **Draw phylogeny 1.0.0** Version 1.0.0 has a dependency issue. Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/galaxy/issues/3158
1. (2) **Freebayes 0.4.1** Now requires upsteam inputs have database metadata assigned. Even when a genome is selected within the workflow editor. This breaks some older workflows and published tutorials. Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/tools-devteam/issues/409
1. (1) **Annovar 0.2** Either dependency issues or tool wrapper problem. Use v 0.1 as a workaround. Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/galaxy/issues/4001
1. (1) **Picard SamToFastq 1.136.0** Does not list fastqsanger output datasets in Workflow editor. Impacts Galaxy Main http://usegalaxy.org and a local Galaxy (not tested on Cloudman). Details: https://github.com/galaxyproject/tools-devteam/issues/414
1. (many) **Upload (across releases)** Trailing return characters in pasted data cause problems and the "why" is not clear to users. Impacts Galaxy Main, locals, cloud. Details: https://github.com/galaxyproject/galaxy/issues/2886
1. (many) **Htseq-count 0.6.1galaxy3** Does not report standardized memory failure error message. Suggested improvements are in the ticket. Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/galaxy/issues/2532
1. (many) **MAF tools 1.0.1** Switching between MAF data sources does not refresh tool form/dbkey list. Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/galaxy/issues/2828. May be fixed by https://github.com/galaxyproject/galaxy/pull/3931 (update pending)
1. (?) **BWA-MEM 0.7.12.1 produces BAM that fails ValidateSamFile 1.136.0**. Default options for both. **ValidateSamFile** tool needs tuning? Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/galaxy/issues/2846

Note: (N) is number of confirmed bug reports about issue. Not all issues can be counted this way. Count of (many) indicates that this is ongoing user problem with usage, often clarified when reviewing other bug reports/questions.

- - - 
## Fixed pending update

_Integration test once installed_
_Retest/status update in progress_

1. Fix made, pending implimentation in inpacted releases plus Main update. **Extract Pairwise MAF blocks 1.0.1** Aka _Interval2Maf_pairwise1_ has dependency issues. Needs same fix as for **GeneBed_Maf_Fasta2**. (https://github.com/galaxyproject/galaxy/pull/3931). Tool **Extract Pairwise MAF blocks** may also need fix. Impacts Galaxy Main http://usegalaxy.org, locals, cloud. Details: https://github.com/galaxyproject/galaxy/issues/3934
1. Fix made, pending implimentation in inpacted releases plus Main update. **GeneBed_Maf_Fasta2 (MAF)** Requires the legacy Galaxy environment. Impacts Galaxy Main http://usegalaxy.org but is core tool issue. Details: https://github.com/galaxyproject/galaxy/pull/3931
1. Needs main update (new repo https://github.com/galaxyproject/tools-iuc/pull/1005) **Deep Tools correctGCBias** Unrecognized arg --filterOut produces an error. Impacts Galaxy Main http://usegalaxy.org but is core tool issue. Details: https://github.com/fidelram/deepTools/issues/434
1. Needs main update (new repo same as above) **Deep Tools multiBamSummary** Doesn't always produce output. Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/fidelram/deepTools/issues/436
1. PASS on Test, needs Main update **Upload** Problematically padding spaces to tabs when number of pasted columns varies. Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/galaxy/issues/2602
1. **Upload** Is assigning "pileup" as autodetected datatype in a greedy way for tabular format data. Impacts Galaxy Test and Main http://usegalaxy.org. Details: https://github.com/galaxyproject/galaxy/issues/3001

- - - 
## Integration test

_Retest/status update in progress_

1. (21) **MEME 4.11.1.0** Has dependency issues. Updates have not resolved usage problems yet (tool has never worked). Impacts http://usegalaxy.org. Details: https://github.com/galaxyproject/galaxy/issues/1913
1. (48) **Diffbind 2.1.0** Produces green empty datasets with dependency issues. Tool has updated version that needs to be added to Tool Shed, then older version hidden plus new installed plus integration test. Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/galaxy/issues/2318
1. **Stringtie** (recently updated to 1.3.3). UI/version issues - needs ticket if not fixed in next day or so.
1. **MACS2** (recently updated to 2.1.1.20160309.0). Test all components against open issues above (two are confirmed to be problematic so far)
1. Some parts fixed, some pending, see ticket. (30+ for all) **Kraken 0.10.6, Krona pie chart from taxonomic profile 2.6.0, Convert Kraken data to Galaxy taxonomy representation 1.1** Missing dependencies. Some issues appear to be localized to the roundup cluster (default). Impacts Galaxy Main http://usegalaxy.org. https://github.com/galaxyproject/galaxy/issues/3556

- - - 
## Recently corrected at Galaxy Main
1. **Trimmomatic** Update to version **0.36.3** corrected tool form option "Illumina Clip" failures. Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/galaxy/issues/3691
1. **Picard Tool: CollectRnaSeqMetrics 1.136.0** Impacts Galaxy Main http://usegalaxy.org. Original Details: https://trello.com/c/XXlFa5ZL. Still fails with updated tool version 1.136.0. Update: Error due to input format - is very specific and needs to be clarified on tool form, see ticket. https://github.com/galaxyproject/galaxy/issues/1710.
1. **MarkDuplicatesWithMateCigar 1.126.0** Problem with tool form option specific to version 1.126.0. Repo updated to version 1.136.0 and now works at Main. Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/tools-devteam/issues/401
1. **Trackster and GFF/GTF datasets** Fail to load with a specific error. Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/galaxy/issues/3499
1. **EBI SRA Main	1.0.1** Tool errors when loading .bz2 compressed data from the "Submit files (galaxy)" link. Details and workaround: https://github.com/galaxyproject/galaxy/issues/1709
1. **Trackster and BED datasets** Fail to load with a specific error. Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/galaxy/issues/1722
1. **GenomeSpace import** (genomespace_file_browser_prod). Potential run-time issues. Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/tools-iuc/issues/1010
1. **DESEQ2 2.1.8.3** Fails after tool update - new error message in linked ticket. Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/tools-iuc/issues/988 Might be related to https://github.com/galaxyproject/galaxy/issues/2989
1. **MACS2 Callpeak** Errors out but job produces result data (in red datasets). Impact Galaxy Main http://usegalaxy.org and possibly other installs. Details: https://github.com/galaxyproject/tools-iuc/issues/1033
1. **MACS2 CallPeak** This tool has a current known issue with the option *Fold Enrichment*. Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/tools-iuc/issues/583
1. **NCBI SRA Tools** Dependency/config issue resolved, but tool version mismatch for wrapper on Main. Smaller files working on a local, but not Main. _Work-around: Use "Get Data > EBI SRA" or download from NCBI/FTP to Galaxy._ Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/galaxy/issues/2533
1. **Deeptools** Fails for a specific error. Tool has been revised and pending upgrade. Impacts Galaxy Main http://usegalaxy.org. Details and link to work-around posted at Galaxy Biostars: https://github.com/galaxyproject/galaxy/issues/2331. Other issues with tool at Galaxy Main, perhaps global (see ticket) https://github.com/galaxyproject/tools-iuc/issues/835
1. **Convert Formats: Convert BAM to ScIdx** Fails for dependency issue. Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/galaxy/issues/2460
1. **Group** Fails under specific conditions. Fixed, pending deployment. Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/galaxy/pull/2166
1. **Multi-join** Has dependencies issues. Impacts Galaxy Main http://usegalaxy.org. Details https://github.com/galaxyproject/galaxy/issues/2511
1. **GenomeDiversity Admixture** Dependency/config issue. Impacts Galaxy Main http://usegalaxy.org. Details https://github.com/galaxyproject/galaxy/issues/2641
1. **BAMTools Convert, Merge, Randomize** Fails for Convert to Bed + Yaml. Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/tools-devteam/issues/378
1. **VCF-VCFintersect** Needs to be updated in the Main Tool Shed and Galaxy Test/Main servers. Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/tools-devteam/issues/391
1. **Bedtools SpacingBed** Dependency/config issues. Impacts Galaxy Main http://usegalaxy.org. Details https://github.com/galaxyproject/galaxy/issues/2640
1. **Tophat** Fails for a specific use case. Update to v 2.1.0 may solve (update: did solve). Also covers tool form option modeling. Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/tools-devteam/issues/365
1. **Duplicates in UI Display of Tabular Datasets** Fixed, pending deployment. Impacts Galaxy Main http://usegalaxy.org and all other Galaxy flavors. Details: https://github.com/galaxyproject/galaxy/pull/2527
1. **Multi-join** Frozen tool form options (related to icon display, see linked issues in ticket). Impacts Galaxy Main http://usegalaxy.com. Details: https://github.com/galaxyproject/galaxy/issues/2512
1. **Fetch Alignments/Sequences** MAF tools have a dependency issue. Impacts http://usegalaxy.org. Details: https://github.com/galaxyproject/galaxy/issues/2187
1. **Summary Statistics** Fails for dependency issue. Impact http://usegalaxy.org. Details: https://github.com/galaxyproject/galaxy/issues/2210
1. **CloudMap: "Hawaiian Variant Mapping with WGS"** Dependency issues. Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/galaxy/issues/2304
1. **HISAT2** Fails, updating tool repo version on Main in progress. Impacts http://usegalaxy.org. Details: https://github.com/galaxyproject/galaxy/issues/2246
1. **Tophat** Execution with a single fastq file (unpaired) produces an error. Wrapper or dependency issue. Impacts http://usegalaxy.org. Details: https://github.com/galaxyproject/galaxy/issues/2155
1. **Picard Tool: ValidateSamFile** Errors (as a green successful dataset) in summary mode. Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/tools-devteam/issues/369
1. **FastQC, MACS2** HTML results do not display when "eye" icon used. Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/galaxy/issues/2240
1. **Trim leading or trailing characters** Fails when option to specify input is fastq is used. Impacts Galaxy Main http://usegalaxy.org and possibly locals running 16.04. Details and workaround: https://github.com/galaxyproject/galaxy/issues/2245
1. **CollectAlignmentSummaryMetrics** Fixed on Main at version 1.136.0. https://github.com/galaxyproject/galaxy/issues/1692 

- - - 
## Issue by error message

1. Error from a tool in the **NGS: SAMtools** or **NGS: Picard** groups about sort order. 
1. Tool is failing for memory or walltime (click on bug icon to review - this does not need to be submitted).
1. Tool is failing for what appears to be a cluster error.
1. Tool is failing and you are not sure what the error message means or how to troubleshoot/get help.

Try this first: **[Sort your inputs](https://galaxyproject.org/support/sort-your-inputs/)**

Check all inputs: **[All Support help](https://galaxyproject.org/support)**

If you cannot determine the problem from the help above, the bug report can be sent in: **[Common tool errors and solutions, including how to send in a bug report](https://galaxyproject.org/support/tool-error/)**.

- - - 
## Issue by user interface behavior

_Retest/status update in progress_

1. **Rerun Function (many tools)** Rerun view for grey "new" status dataset fails to open Advanced Options on reloaded tool form. Impacts Galaxy Main http://usegalaxy.org. Details:  https://github.com/galaxyproject/galaxy/issues/2502
1. **Tophat** (And potentially other tools). The Jetstream cluster may produce output datasets reporting problematic metadata. Current workaround: Expand the dataset by clicking on the name and reset metadata with the link provided in the yellow box. Impacts Galaxy Main http://usegalaxy.org. Details: https://github.com/galaxyproject/galaxy/issues/2838
1. **Workflows** Multiple input modifications within the editor triggers a browser crash. Impacts Galaxy Main http://usegalaxy.org (and potentially other Galaxy flavors). Details: https://github.com/galaxyproject/galaxy/issues/2835
1. **Reference Genome Missing from tool** First, make certain that the [dataset has the "database" metadata asssignment](https://wiki.galaxyproject.org/Support#Tool_doesn.27t_recognize_dataset). If still missing, the genome may be undergoing indexing ( on [Test](https://test.galaxyproject.org), to be promoted to [Main](https://usegalaxy.org/) ). Check the details ticket below for notes and progress. If you do not see your genome, request it as instructed in the ticket. Remember that a [Custom Reference Genome](https://wiki.galaxyproject.org/Support#custom-reference-genome) can be used right now instead for most tools. Impacts **Bowtie2 Tophat(2) BWA BWA-MEM Kraken**. Details: https://github.com/galaxyproject/galaxy/issues/1470
1. **Workflows** *NOTE that a new workflow form is pending and these usage issues will be re-tested.* Behavior: Reference genome selection at runtime or changes through editor are not persistent or do not allow use of a Custom Reference Genome/Build. Known issues, sometimes linked to specific tools (SAMTool, Tophat). Impacts Main http://usegalaxy.org. Details: https://github.com/galaxyproject/galaxy/issues/1132
1. **Pileup** datasets not recognized by downstream tools. This is due to tabular datatype assignment by Mpileup/Generate pileup (SAMTools). Assignment of both start and end to the same column could be why auto-assignment of type is not possible. Workaround: Click on dataset's pencil icon and assign pileup datatype. Details: https://github.com/galaxyproject/galaxy/issues/1744

- - -
## Issue with performance at Galaxy Main

1. If there are issues with delays, reports of histories not loading, a blue screen stating that Galaxy is busy ... then check the Galaxy Status page to see if there is a problem with the server first: https://status.galaxyproject.org/
1. If status is OK, then read recent posts at Galaxy Biostars, where transient issues are often reported and clarified. A new question can be asked if there is no activity about the problem. https://biostar.usegalaxy.org/

