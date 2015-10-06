<div class="title"> Galaxy Project Workshop 2015 </div>

<div class='right'>TABLE_OF_CONTENTS(2)</div>
# The Galaxy Ecosystem

**[http://galaxyproject.org](http://galaxyproject.org)**

1. Galaxy [/Main](/Main)
1. Ways to use Galaxy explained in [Choices](/BigPicture/Choices)
1. [Tool Shed Wiki](/ToolShed) and Main Tool Shed at [http://usegalaxy.org/toolshed](http://usegalaxy.org/toolshed)
1. More resources at [/Learn](/Learn), [/Support](/Support), [/Teach](/Teach), and [Galaxy Biostars](https://biostar.usegalaxy.org/) (linked access: [/Support/Biostar](/Support/Biostar))


# Basic Analysis with Galaxy

## Protocol

Completed History [https://usegalaxy.org/u/usinggalaxy2/h/revised-galaxy-variant-101](https://usegalaxy.org/u/usinggalaxy2/h/revised-galaxy-variant-101)

1. History menu *Create New* and rename *Basic*
1. Go to page *Galaxy Variant 101: Introduction to Polymorphism Detection via Variant Analysis*
  1. *Shared Data* to *Published Pages* and find in list
  1. optionally search by *101*
1. Get input datasets by importing the datasets from the *Page*
  1. paired end DNA data, two conditions
    * first set *child*
    * second set *mother*
1. Optionally import the entire finished history
1. Import Workflow
1. Edit Workflow
  1. rename to *Revised Galaxy Variant 101*
  1. Change *database* to *hg19*
    * for tools *BWA for Illumina*, *Freebayes*, and *Naive Variant Caller*
1. Execute the *Workflow*
  1. send to new history
  1. auto-named after the workflow name’. e.g.. *Revised Galaxy Variant 101*
1. Examine *!FreeBayes, NVC, and Filter* results for polymorphism
1. Homework:
  1. upload a SNP reference dataset, compare to the VCF datasets, and see if any of the polymorphic variants are annotated 


# RNA-seq Examples

Differential Expression using Tuxedo pipeline: Known vs Novel splice variants

Review the source tutorial overview under [/Teach](/Teach) named *[/Teach/Resource/GVL-RNA-SeqTutorial](/Teach/Resource/GVL-RNA-SeqTutorial)*. This summary points to the full exercise created by the *[Genomics Virtual Lab (GVL)](https://docs.google.com/document/pub?id=1KbTiBHtvHLfPRZ39AY3uriazrINA8TJzgjjwn1zPP7Y)*

Wikis: [/Support.md#tools_on_the_main_server_rna-seq](/Support.md#tools_on_the_main_server_rna-seq) and several others under [/Learn.md#other_tutorials](/Learn.md#other_tutorials)

## Known Protocol

Completed History [https://usegalaxy.org/u/usinggalaxy2/h/gvl-rna-seq-dm3-known](https://usegalaxy.org/u/usinggalaxy2/h/gvl-rna-seq-dm3-known)

1. History menu *Create New* and rename  *GVL RNA-seq dm3 Known*
1. Get input data
  * single end RNA data, two conditions, three replicates each
  1. Use *Upload* tool to load dataset using FTP links
    1. batch loading for six fastq datasets
      * assign *fastqsanger* and database *dm3*
    1. single GTF annotation dataset
      * auto detect *format* and assign database *dm3*
  1. Optionally import history [https://usegalaxy.org/u/usinggalaxy2/h/gvl-rna-seq-dm3-inputs](https://usegalaxy.org/u/usinggalaxy2/h/gvl-rna-seq-dm3-inputs)
    * rename history to end with *Known*
1. Execute *Compute quality statistics*
1. Execute *Draw nucleotides distribution chart*
  1. review how could be used for QA
1. Run *FastQC* on one dataset
  1. determine length (needed for Tophat) ~75
1. Execute *Tophat*
  * maps spliced RNA data to a reference genome
  1. parameters
    * set *Is this library mate-paired?* as *Single-end*
    * use *Multiple datasets*
    * runs distinct jobs in batch
  1. Open *Tophat settings to use* as *Full parameter list*
    * set *Gene Model Annotations* as GTF reference annotation dataset
      * use default *Only look for supplied junctions* as *No*
    * set remaining parameters as default
1. while running, use *re-run* to examine parameters in more detail
  1. note version (wrapper and binary) at top right of tool form
    * *Versions* (wrapper)
    * *Options* link to Tool Shed (wrapper and binary)
    * version is also reported after execution on the *i* Info form
  1. note option *Minimum length of read segments*
    * must be at least ½ of the length of the input sequences or bias will result
    * input sequence data is >= 50 bases (25 x 2); leave at default
  1. note option *Use Own Junctions*
    * optional input dataset, not used
1. Execute *Cuffdiff*
  * performs differential expression analysis
  1. parameters
    * set Condition *C1*
      * datasets C1 R1, R2, R3
    * set Condition *C2*
      * datasets C2 R1, R2, R3
    * set changes for *Known*
      * set *Transcripts* 
        * GTF *known* genes/transcript reference annotation
      * set *Perform Bias Correction*
        * Locally cached *dm3*
      * use *Set Additional Parameters*
        * set *Average Fragment Length* as *70*
        * set *Fragment Length Standard Deviation* as *2* (or *0*)
   

## Novel Protocol

Completed History [https://usegalaxy.org/u/usinggalaxy2/h/gvl-rna-seq-dm3-novel](https://usegalaxy.org/u/usinggalaxy2/h/gvl-rna-seq-dm3-novel)

1. Review the Tuxedo protocol at *[http://cole-trapnell-lab.github.io/cufflinks/manual](http://cole-trapnell-lab.github.io/cufflinks/manual)*
  1. *Known* (above) is a protocol that does not consider novel alternative splicing
    * only Known splice variants are considered, from GTF (not Novel)
1. Run workflow again with *Cufflinks* and *Cuffmerge* to include *Novel* transcript splice variants found in the sequence input datasets in the analysis
1. Use *History Menu: Copy datasets*
  1. send to new history named *GVL RNA-seq dm3 Novel*
  1. Tophat *accepted hits*
  1. GTF reference annotation
1. Execute *Cufflinks*
  * assembles aligned reads into spliced transcripts
  * note that this does not create consensus transcripts, only the position/coordinates of transcript variants
  1. inputs
    * set batch mode for *SAM or BAM file of aligned RNA-Seq reads* using *Multiple Datasets*
    * select all six Tophat BAM datasets
  1. parameters
    * use defaults except for:
    * set *Perform Bias Correction* as *Yes*
      * note that this interprets the *database* from the inputs
      * this is line-command option * "-j" * which  when used ignores intronic alignments
  1. While running, click on *re-run* to examine options in more detail
    * why is *Use Reference Annotation* set as *No*?
      * this is line-command option * "-G" * which when used will ignore novel splices
1. Execute *Cuffmerge*
  * joins together novel and known splices 
  * creates a merged GTF reference annotation dataset for use in *Cuffdiff*
  1. inputs
    * set *Cufflinks* output *assembled transcripts* as the core set of inputs
    * set *Reference Annotation* as the known gene/transcript GTF annotation dataset
  1. parameters
    * set *Sequence Data* as locally cached *dm3*
  1. While running, click on *re-run* to examine options in more detail
    * why are inputs entered individually and not as batch?
      * click on batch option for *Multiple Datasets* and review
      * not appropriate for this job since all inputs are for the *same run*
1. Execute *Cuffdiff*
  * performs differential expression analysis
  1. inputs
    * copy one *Cuffdiff* datasets from History *Known*
    * click on pencil icon to *Edit Attributes*
      * set *Info* field to *Known*
      * copy existing contents first to *Annotation* field if desired
      * note *Annotation* field is not displayed in the History panel’s dataset view by default
  1. use *re-run* from the *Cuffdiff: Known* dataset
    1. parameters
      * set *Transcripts*
        * GTF combined reference annotation result from *Cuffmerge*
      * set Condition *C1*
        * datasets C1 R1, R2, R3
      * set Condition *C2*
        * datasets C2 R1, R2, R3
      * set *Perform Bias Correction*
        * Locally cached *dm3*
      * use *Set Additional Parameters*
        * set *Average Fragment Length* as *70*
        * set ‘’Fragment Length Standard Deviation’’ as *2* (or *0*)
1. Once complete, click on pencil icon to *Edit Attributes*
  1. set *Info* field to *Novel*
  1. copy existing contents first to *Annotation* field if desired

## Compare

Completed History [https://usegalaxy.org/u/usinggalaxy2/h/gvl-rna-seq-dm3-compare](https://usegalaxy.org/u/usinggalaxy2/h/gvl-rna-seq-dm3-compare)
 
1. Use *History Menu: Copy datasets*
  1. all 7 differential expression Cuffdiff output from "Known"
  1. all 7 differential expression Cuffdiff output from "Novel"
  1. send both to a new history named *GVL RNA-seq dm3 Compare*
1. Filter for significant in all *Cuffdiff* DE results
  1. How can this be done? 
    * *Filter* is a simple tool
    * can run in batch using *Multiple datasets* (use ‘’command’’ key to select each)
    * try ‘’With following condition’’ as * c14=='yes' * (significant)
    * and *Number of header lines to skip* as *1*
  1. use this workflow to run Filter in batch with labels [https://usegalaxy.org/u/usinggalaxy2/w/gvl-rna-seq-dm3-compare](https://usegalaxy.org/u/usinggalaxy2/w/gvl-rna-seq-dm3-compare)
1. enable *Scratchbook*
  * open filtered datasets as pairs to compare results *Known* vs *Novel*
  * disable *Scratchbook*
1. Homework: 
  1. copy all *Known* and *Novel* datasets into the same history
    * graph statistics and compare between *Known* and *Novel* protocols
    * visualize the data for both runs in Trackster and/or IGV using GVL protocol as a guide
  1. extract a workflow for *Known* and *Novel*, annotate, edit, and re-run it. 
    * *Extract Workflow* is included in the next topic *Creating Production Workflows*

# Creating Production Workflows

Polish Workflows in the editor by including annotation and variables. Learn how to customize tool panel display and tune parameters within the editor. 

Wikis: [/Learn/AdvancedWorkflow](/Learn/AdvancedWorkflow) and [/Learn/AdvancedWorkflow/Extract](/Learn/AdvancedWorkflow/Extract) and [/Learn/AdvancedWorkflow/BasicEditing](/Learn/AdvancedWorkflow/BasicEditing)

## Protocol

Starting History [https://usegalaxy.org/u/usinggalaxy2/h/workflow0](https://usegalaxy.org/u/usinggalaxy2/h/workflow0) 

1. Import starting History
1. History menu *Extract Workflow*, edit (update/replace tools, connect noodles), and execute
1. Annotate the inputs (name & datatype) and execute
1. Add in the #{input} variable (inherited name label) and execute
1. Add in the ${input} variable (run-time name label) and execute
1. Hide intermediate datasets and execute
1. Fully annotate each step for *Publication* and execute
1. Promote the final Workflow in the Tool Panel

# Target Topics

## Navigating Datasets and Histories

Wikis: [/Histories](/Histories) and [/Learn/ManagingDatasets](/Learn/ManagingDatasets)

1. History menu *Copy History* (use *RNA-seq Novel*)
  1. click on link to new copy
1. Hidden and Delete
  1. *Operations on multiple datasets* to *on*
    * hide 3 datasets (reversible)
    * unhide one (reversible)
    * delete 3 datasets (reversible)
    * undelete one (reversible)
    * permanently delete one (permanent, recovers disk space)
  1. *Operations on multiple datasets* to *off*
1. Links *deleted* and *hidden*
  1. click to *show* each (reversible)
    * unhide one (reversible)
    * undelete one (reversible)
    * permanently delete one (permanent)
  1. resume *show*
1. History menu *Unhide Hidden Datasets* (batch, reversible 1 at a time)
1. History menu *Delete Hidden Datasets* (batch, reversible)
1. History menu *Purge Deleted Datasets* (batch, permanent, recovers disk space)
1. History menu *Show Structure*
1. History menu *Export Citations* (beta)
1. History menu *Delete* (reversible) - don’t do
1. History menu *Delete Permanently* (permanent, recovers disk space) - don’t do
1. *Annotation*
  * annotate one
  * click on pencil icon to show *Edit Attributes* also contains
1. *Tags*
  * add the same tag to 3 datasets, one a BAM dataset
    * workshop
    * workshop bam
    * gtf
1. History menu *Create New* and rename *Tags*
  * *User -> Saved Datasets* filter by tags
    * gtf -> shows all datasets of *datatype = gtf*
    * bam -> shows all datasets of *datatype = bam*
    * workshop -> shows only datasets with tag *workshop*
    * click on *Tags* to show detail
    * copy *workshop* datasets to the current history *Tags*
1. Download dataset
  * *Download dataset* -> bam (rename to remove history number)
  * *Download bam_index* -> bam.bai 
1. History menu *Saved Histories*
  1. rename *RNA-seq Novel copy* to *delete copy*
  1. delete *delete copy* (reversible)
  1. *Advanced search* as *deleted*
  1. undelete *delete copy*
  1. *Advanced search* as *active*
  1. permanently delete *delete copy* (permanent, recovers disk space)
  1. *Advanced search* as *all* to show status

## Sharing and Publishing
 
1. Saved Histories *Tags* History 
  1. pull-down menu *Share or Publish* 
  1. *Share or Publish* form
    * accessible link
    * publish
    * share with another user
1. go to *Shared Data -> Published Histories* and click on *Tags*
  1. Upper right corner *Switch to this history*
  1. History menu *Share or Publish*
    * unshare
1. History menu ‘’Histories Shared with me’’
  * import
  * unshare from account
1. Same form and options for Workflows, Pages, and Visualizations 


## Importing

Wikis: [/Support.md#loading_data](/Support.md#loading_data)

### Upload

Completed History [https://usegalaxy.org/u/usinggalaxy2/h/import](https://usegalaxy.org/u/usinggalaxy2/h/import)

1. History menu *Create New* and rename *Import*
1. go to ‘’Upload File’’ tool (*Get Data* or top of left *Tool Panel*)
  1. *Choose local file*
    * select downloaded *bam dataset*
    * when uploading *bam*, the bam dataset is coordinate sorted and the index is created
    * do not load a *bam.bai dataset*
    * set *Type* as *Auto-detect* and *Genome* as *dm3*
    * *Start*
1. *Paste/Fetch data*
  1. open *Upload File* tool if not already open
  1. already loaded by http/ftp via URL
  1. paste in raw data
    * type in a simple BED3 file format, a few lines, no extra lines
    * example: `chrM  4000  5000`
    * set *Type* as *Auto-detect* and *Genome* as *hg19*
    * click on gear icon and check box for *Convert spaces to tabs*
    * close *Upload configuration* box
    * *Start*
1. *FTP load*
  1. find a target genome, we’ll use *!H1N1*
    * google search with terms *ncbi swine flu genome*
    * click on first link
    * note section *New* and click on *here*
    * on next form, filter *Find related data* as ‘’Genome’’
    * click on *Bioprojects: PRJNA15521* link for third listed *Influenza A virus !HxNx* (!H1N1)
    * on next form, click on *Assembly details Assembly	GCF_000865725.1* link under *Chrs -> 8*
  1. the download is from the web page [NCBI !H1N1 Genome](http://www.ncbi.nlm.nih.gov/nuccore/8486138,8486134,8486136,8486125,8486129,8486127,8486122,8486131)
  1. select *Send to* -> *Choose Destination: File, Format: FASTA, Sort by: Default order*
    * click on *Create File*
    * rename to *!H1N1.fasta* and *Save*
  1. open Filezilla (if you have it) or another FTP client
    * settings
      * *Host: usegalaxy.org* plus your account email and password then *Quickconnect*
    * action
      * left side is your computer, right side is the Galaxy server
      * on your computer, navigate to the file on left, then drag it over to right to load
      * check *Successful transfers* at bottom to ensure complete loading
      * quit out of Filezilla
  1. open ‘’Upload File’’ tool if not already open
    * click on *Choose FTP File*, then checkbox next to loaded *!H1N1.fasta* file
    * *Start*
    * *Close*
1. *Examine all datasets* 
  1. note that the NCBI fasta dataset is *formatted incorrectly*
    * spaces between fasta records
    * very long descriptions that will likely cause problems if used as a *Custom Reference Genome*
    * we will correct this in the sub-topic *Custom Genomes*
1. Homework:
  1. use the pasted BED dataset with the tool *Extract Genomic DNA* to retrieve genomic sequence in fasta format for the specified interval. Example with a custom genome (use built-in for this job):[/Support.md#tools_on_the_main_server_extract_dna](/Support.md#tools_on_the_main_server_extract_dna)


### External Sources

1. *Get Data: UCSC Main*
  1. form options
    * set *clade: Mammal, genome: Human, assembly: hg19, group: Genes and Gene Predictions, track: !RefSeq Genes, table: refGene, position: chrM (lookup)*
  1. Run the tool twice
    * run1 *GTF*
      * set output format *GTF*
      * leave *Send output to Galaxy* box checked
      * get output
      * click *Send query to Galaxy* 
    * run2 *Selected fields*
      * click on *describe table schema*
      * note that the field *name* contains the transcript_id and *name2* the gene_id
      * use browser back button to return to the form
      * set output format *selected fields from primary and related tables*
      * leave *Send output to Galaxy* box checked
      * get output
      * on next form, only check *name* and *name2*
      * click *done with selections*
      * click *Send query to Galaxy*
1. *Get Data: EBI SRA*
  1. search *ERX010058* (Swine flu aka !HxNx, paired-end Illumina reads)
    * click into *Experiment (1 results found)*
    * use tab *Read Files*
    * sequence data is in column *Fastq files (galaxy)*
    * load File1 & File2 for *Sample Accession* named *ERS003429* (2nd in list)
    * will take 2 cycles through the tool
    * search by accession ‘’ERS003429’’ for File2 
  1. dataset will be loaded directly from the tool
1. *Examine all datasets*
  1. note that the UCSC GTF dataset is formatted incorrectly
    * UCSC GTF datasets have transcript set for both transcript_id and gene_id in the 9th field
    * format is problematic if used with most tools
    * the GTF file is corrected in the sub-topic *Other Dataset Manipulations*
  1. note that the SRA datasets have the *datatype* set as ‘’fastq’’
    * *fastqsanger* is required for most tools
    * confirm the quality score scaling and assign the correct *datatype* in the sub-topic *FASTQ Dataset Prep & Troubleshooting*

### Libraries

1. go to *Shared Data: Data Libraries*
1. search for *iGenomes*
  1. click into the Library
    * check the box for the dataset *hg19_genes.gtf*
    * use default setting *For selected datasets: Import to current history*
    * click on *Go*
1. go back to *Analyze Data*


### Shared

Wiki: [/Learn/Share](/Learn/Share)

1. share a Workflow with another user
1. go to *Workflow*
  1. the shared workflow(s) will appear under *Workflows shared with you by others*
  1. import the Workflow
    * the Workflow is available to edit, run, rename, etc. 
1. go back to ‘’Analyze Data’’
1. Homework:
  * share a History, Page, and/or Visualization
  * import other objects under *Shared Data: Published XXX*


## FASTQ Dataset Prep & Troubleshooting

Wiki: [/Support.md#fastq_datatype_qa](/Support.md#fastq_datatype_qa)

1. History menu *Saved Histories*
1. History menu *Copy Dataset* 
  * from *Import* check the two fastq dataset into a new History named *Fastq*
1. Execute *FastQC* 
  * use *Multiple datasets* selecting both datasets
  * examine results: Illumina 1.8+ is the datatype *fastqsanger*
  * meaning: Sanger Phred+33 scaled quality scores
  * click on the pencil icon for each to reach the *Edit Attributes* form 
 


## Other Dataset Manipulations

BONUS as time allows

1. *Create correct GTF*: Inputs UCSC table browser files from History *Upload*. Using a combination of *Text Manipulation* tools.
1. *Select content from GTF*: Input iGenome GTF dataset from History *Upload*. Using regular expressions and *Select* tool.

## Custom Genomes
 
Wikis: [/Support.md#custom_reference_genome](/Support.md#custom_reference_genome) and [/Learn/CustomGenomes](/Learn/CustomGenomes)

1. History menu *Saved Histories*
1. History menu *Copy Dataset* 
  * from ‘’Import’’ check the *!H1N1.fasta* dataset into a new History named *Custom*
1. using methods from the wiki in the [/Learn/CustomGenomes.md#troubleshooting](/Learn/CustomGenomes.md#troubleshooting) section, reformat the dataset
  * fasta datasets should be correctly formatted to specification *before* beginning any analysis
1. Troubleshooting #3 *Extra spaces*
1. Troubleshooting #6 *Remove description from identifier line*
1. Troubleshooting #4 *Wrap fasta lines to a consistent length*
1. Homework:
  1. create a workflow that includes all steps and use it whenever a new fasta dataset is loaded for use as a *Custom Genome*
  1. copy the ‘’fastqsanger’’ datasets from the History named ‘’Fastq’’ and map to this genome
  1. follow the instruction in the wiki [/Learn/CustomGenomes.md#custom_builds](/Learn/CustomGenomes.md#custom_builds) to promote the *Custom Genome* to a *Custom Build*
    * assign the new build *database* to all related datasets
    * *database* assignment is needed to visualize in Trackster using wiki guide [/Learn/Visualization.md#custom_builds](/Learn/Visualization.md#custom_builds)

<br /><br />

**Thanks for using Galaxy!**
<br /><br />
*The [Galaxy Team](/GalaxyTeam)*

<br /><br />
END
  
