---
title: Galaxy HiCExplorer
components: true
---

<slot name="/bare/eu/usegalaxy/notices" />

# Galaxy HiCExplorer

Welcome to the Galaxy HiCExplorer -- a webserver to process, analyse and visualize Hi-C, capture Hi-C, HiChIP and single-cell Hi-C data.

![](https://raw.githubusercontent.com/deeptools/HiCExplorer/master/docs/images/hicex3.png)

## Get started with Galaxy HiCExplorer

Are you new to Galaxy, or returning after a long time, and looking for help to get started? Take <a target="_parent" href="https://hicexplorer.usegalaxy.eu/tours/core.galaxy_ui">a guided tour</a> through Galaxy's user interface.

Take <a target="_parent" href="https://hicexplorer.usegalaxy.eu/tours/hixexplorer">a guided tour</a> for an introduction to Galaxy HiCExplorer and Hi-C data analysis. This tour is guides you through the Hi-C tutorial on the <a target="_parent" href="https://galaxyproject.github.io/training-material/topics/epigenetics/tutorials/hicexplorer/tutorial.html">Galaxy Training Network</a>  where you can analyse Hi-C data of Drosophila melanogaster. Follow the tutorial to understand the analysis steps better or as a help which parameters are useful.

A precomputed history of the tutorial can be viewed <a target="_parent" href="https://hicexplorer.usegalaxy.eu/u/joachim-wolff/h/drosophila-melanogaster-hi-c-training">here</a>.


A more advanced tutorial is hosted on <a target="_parent" href="https://hicexplorer.readthedocs.io/en/latest/content/mES-HiC_analysis.html">readthedocs.io</a>. It is designed for the shell based version of the HiCExplorer but can be easily adapted to Galaxy HiCExplorer. In this tutorial mouse stems cells from <a target="_parent" href="https://www.genomebiology.com/2015/16/1/149">Marks et al. (2015)</a> are analysed. We provided the input fastq files in our <a target="_parent" href="https://hicexplorer.usegalaxy.eu/library/list#folders/F49c63be29eb6cbc1">data library</a>.

We recommend to follow the tutorial on <a target="_parent" href="https://galaxyproject.github.io/training-material/topics/sequence-analysis/tutorials/quality-control/tutorial.html">FASTQC<a/> for quality checks.
### Example data

The Galaxy Training Network tutorial uses Hi-C data from Drosophila melanogaster and is hosted on zenodo: <a target="_parent" href="https://doi.org/10.5281/zenodo.1183661"><img src="https://zenodo.org/badge/DOI/10.5281/zenodo.1183661.svg" alt="DOI"></a>

Additional we provide the data in <a target="_parent" href="https://hicexplorer.usegalaxy.eu/library/list#folders/F8607ddb1c5387e36">the shared data library</a> of the Galaxy HiCExplorer. In comparison to the data hosted on zenodo it contains preprocessed intermediate files.


Galaxy HiCExplorer can process large Hi-C data. We processed Hi-C data with around 750 million reads from [Rosa-Garrido et al.](http://circ.ahajournals.org/content/136/17/1613.long). Have a look at the preprocessed <a target="_parent" href='https://hicexplorer.usegalaxy.eu/u/joachim-wolff/h/nar-publication-750-million-reads'>files</a>.

### Capture Hi-C and HiChIP

The new chic*-modules of HiCExplorer provide powerful tools to analyse capture Hi-C and HiChIP data. 
We recommend to follow the tutorial on <a target="_parent" href="https://hicexplorer.readthedocs.io/en/latest/content/capture-Hi-C.html">hicexplorer.readthedocs.io<a/> for an introduction to the analysis pipeline.
A preprocessed cHi-C history with data from [Andrey et al. 2017.](https://doi.org/10.1101/gr.213066.116) is provided <a target="_parent" href='https://usegalaxy.eu/u/joachim-wolff/h/debug-history'> here</a>.

### Single-cell Hi-C
 
 The newest members of the HiCExplorer tool suit are the schic*-modules to bring the latest single-cell Hi-C research to Galaxy. We recommend to follow the tutorial on <a target="_parent" href="https://schicexplorer.readthedocs.io/en/latest/content/Example_analysis.html">schicexplorer.readthedocs.io<a/> for an introduction to the analysis pipeline.
 
The raw scool matrices for with the data from Nagano 2017 in 10 kb and 1 Mb resolution is hosted on zenodo: <a target="_parent" href="https://doi.org/10.5281/zenodo.3557682"><img src="https://zenodo.org/badge/DOI/10.5281/zenodo.3557682.svg" alt="DOI"></a>

## HiGlass

The interactive Hi-C data exploration with HiGlass is accessible via the interactive <a href="https://live.usegalaxy.eu/?tool_id=interactive_tool_higlass">live.usegalaxy.eu</a> platform. 


## Galaxy HiCExplorer -- many possibilities

![](https://hicexplorer.usegalaxy.eu/assets/media/publication_plots.png)
 <b>(A)</b> Galaxy HiCExplorer workflows and tools. Quality control tools: <b>(B)</b> Output of hicCorrelate comparing two wild types and one knockdown samples. <b>(C)</b> Output of hicPlotDistVsCounts that shows changes of the number of contacts for different conditions. Analysis tools: <b>(D)</b> hicPlotMatrix of the Pearson correlation matrix derived from a contact matrix for chromosome 6 in mouse computed with hicTransform. The optional data track at the bottom shows the first eigenvector for A/B compartment obtained using hicPCA. <b>(E)</b> The pixel difference between a Hi-C corrected matrix for wild type condition and a knock down was computed using hicCompareMatrices and a 7Mb region is visualized using hicPlotMatrix. Visualization tools: <b>(F)</b> Contact matrix plot of a 80 to 105 Mb region of chromosome 2 in log scale. <b>(G)</b> Example output of hicPlotViewpoint showing the corrected number of Hi-C contacts for a single bin in chromosome 5 (output similar to 4C-seq) (<a target="_parent" href="https://doi.org/10.1101/gr.213066.116">Andrey 2017</a>). <b>(H)</b> A Hi-C matrix was converted into an observed vs. expected matrix using hicTransform and this matrix, together with the location of high-affinity sites from (<a target="_parent" href="https://doi.org/10.1016/j.molcel.2015.08.024">Ramirez 2015</a>) were used to run hicAggregateContacts. <b>(I)</b> 85 Mb to 110 Mb region from human chromosome 2 visualized using hicPlotTADs. TADs were computed by hicFindTADs. The additional tracks added correspond to: TAD- separation score (as reported by hicFindTADs), chromatin state , principal component 1 (A/B compartment) computed using hicPCA, ChIP-seq coverage for the H3K27ac mark, DNA methylation, and a gene track. Hi-C data for <b>B</b>, <b>C</b>, <b>E</b> and <b>H</b> from Drosophila melanogaster S2 cells from (<a target="_parent" href="https://doi.org/10.1038/s41467-017-02525-w">Ramirez 2018</a>). Hi-C data for <b>D</b>, <b>F</b> and <b>I</b> from mouse cardiac myocytes(<a target="_parent" href="https://doi.org/10.1038/s41467-017-01724-9 ">Nothjunge 2017</a>). Additional tracks in <b>I</b> from (<a target="_parent" href="https://doi.org/10.1038/s41467-017-01724-9 ">Nothjunge 2017</a>).

![](https://hicexplorer.usegalaxy.eu/assets/media/image_compilation.png)

The new tools in Galaxy HiCExplorer 3 to make even better Hi-C data analyses: <b>(A)</b>Detect loops computed by <i>hicDetectLoops</i> and plotted with <i>hicPlotMatrix</i> on <i>GM12878 primary</i> data from Rao 2014. <b>(B)</b> Short to long range contact ratios created by <i>hicPlotSVL</i> on <i>GM12878 primary</i>, <i>IMR90</i> and <i>HMEC</i> data from Rao 2014. <b>(C)</b> Average regions of detected TADs from <i>hicFindTADs</i> on <i>GM12878 primary</i>, chromosome 1; data from Rao 2014. <b>(D)</b> Compartmentalization of <i>GM12878 primary</i> data from Rao 2014. Computed with <i>hicCompartmentalization</i>. <b>(E)</b> Viewpoint of the gene <i>MSTN</i> on <i>FL-E13-5</i> and <i>MB-E10-5</i> with mean background and p-values per relative distance via continuous negative binomial distributions. Data from Andrey 2017. <b>(F)</b> Quality control plot for <i>FL-E13-5</i>and <i>MB-E10-5</i> showing the sparisity distribution. Data from Andrey 2017. <b>(G)</b> Single-cell Hi-C cluster profile. Created by dimension reduction with <i>scHicClusterMinHash</i> and spectral clustering on 1 MB single-cell Hi-C data by Nagano 2017. <b>(H)</b> Quality control plot for single-cell Hi-C data by Nagano 2017. Shows the read coverage per cell, cells with less than 100,000 reads are discarded. <b>(I)</b> Consensus matrix plot for single-cell Hi-C data on 1 MB resolution. Cells are dimension reduced by computing A/B compartments per cell and clustered with k-means. The consensus matrix of a cluster is the average of all interaction matrices of the cluster memebers. Data from Nagano 2017.

![](https://hicexplorer.usegalaxy.eu/assets/media/full_nar2020.png)

The different tools of Galaxy HiCExplorer in a workflow context: Analysis workflow for Hi-C <b>(A)</b>, cHi-C / HiChIP <b>(B)</b> and scHi-C <b>(C)</b>. All share the usage of hicBuildMatrix to create the individual contact matrices. Hi-C and cHi-C/HiChIP do support HiCExplorer's h5 and cool interaction matrix file format, scHi-C data creates for each cell one cool interaction matrix file and with scHicMergeToSCool all single-cell matrices are merged to one single-cell cool (scool) matrix.


## Workflows

To automatize different consecutive steps we provide the following workflows in three categories: From scratch (FASTQ files), from scratch (FASTQ files) and summing up replicates and if you have already your contact matrix. Many workflows require collections of FASTQ files as an input, it is shown
<a href="https://galaxyproject.org/tutorials/collections/">here</a> how to create a collection. Please do not forget to check the quality of the FASTQ files with FastQC.

Please have in mind that all workflows need additional input from the user. All mapping steps are done with BWA-MEM and the correct reference genome need to be defined by the user. The correct restriction site and the bin size for hicBuildMatrix needs to be defined too. The correction of the matrix is done with the default parameters of -1.5 and 5, change this if necessary. Furthermore, the correct region and or chromosome needs to be defined for plotting the matrix, TADs or PCA.

### From scratch (FASTQ files) individual

These workflows expect collections of FASTQ files as an input. The first collections needs to have all forward strand FASTQ files and the second one all reverse FASTQ files. Please make sure that the order of the FASTQ files in both collections is equal. The order is important to associate the related forward and reverse read strand files.

The following workflows are provided:

- <a href="https://hicexplorer.usegalaxy.eu/u/joachim-wolff/w/from-scratch-to-a-contact-matrix">From scratch to a contact matrix</a>
- <a href="https://hicexplorer.usegalaxy.eu/u/joachim-wolff/w/from-scratch-to-pca">From scratch to PCA</a>
- <a href="https://hicexplorer.usegalaxy.eu/u/joachim-wolff/w/from-scratch-to-tad">From scratch to TAD</a>
- <a href="https://hicexplorer.usegalaxy.eu/u/joachim-wolff/w/from-scratch-to-pca-and-plotting">From scratch to PCA and plotting</a>
- <a href="https://hicexplorer.usegalaxy.eu/u/joachim-wolff/w/from-scratch-to-tad-and-plotting">From scratch to TAD and plotting</a>


### From scratch (FASTQ files) and summing up replicates

These workflows takes collections of FASTQ files for forward and reverse strand as an input, for each pair a contact matrix is build and all created contact matrices are summed up to one contact matrix. Use this workflow if you want to use replicates to increase statistical power of your contact matrix and the replicates are checked to be correct.

- <a href="https://usegalaxy.eu/u/joachim-wolff/w/workflow-hicexplorer-hicsummatrix">From scratch to a contact matrix (summing up replicates)</a>
- <a href="https://hicexplorer.usegalaxy.eu/u/joachim-wolff/w/from-scratch-to-pca-summing-up-replicates">From scratch to PCA (summing up replicates)</a>
- <a href="https://hicexplorer.usegalaxy.eu/u/joachim-wolff/w/from-scratch-to-tads-summing-up-replicates">From scratch to TAD (summing up replicates)</a>
- <a href="https://hicexplorer.usegalaxy.eu/u/joachim-wolff/w/from-scratch-to-pca-and-plot-summing-up-replicates">From scratch to PCA and plot (summing up replicates)</a>
- <a href="https://hicexplorer.usegalaxy.eu/u/joachim-wolff/w/from-scratch-to-tads-and-plot-summing-up-replicates">From scratch to TAD and plot (summing up replicates)</a>
- <a href="https://hicexplorer.usegalaxy.eu/u/joachim-wolff/w/from-scratch-to-tads-pca-and-plot-summing-up-replicates">From scratch to TADs, PCA and plot (summing up replicates)</a>


### Contact matrix as a basis

Use the following workflows if you have already created a contact matrix.

 - <a href="https://hicexplorer.usegalaxy.eu/u/joachim-wolff/w/a--b-comparments">Plot Pearson matrix and PC1 / PC2</a>
 - <a href="https://hicexplorer.usegalaxy.eu/u/joachim-wolff/w/plot-tads">Plot TADs</a>
 - <a href="https://hicexplorer.usegalaxy.eu/u/joachim-wolff/w/plot-tads-and-pc">Plot TADs and PC</a>

### Single-cell Hi-C

Use the following workflow for an existing scool matrix with QC and normalization:

 - <a href="https://hicexplorer.usegalaxy.eu/u/joachim-wolff/w/single-cell-hi-c">SVL dimension reduction</a>

## Python API access

With the [bioblend API](https://bioblend.readthedocs.io/en/latest/) it is possible to use the Galaxy HiCExplorer via a script written in Python. A small example on the usage is provided here as an [ipython notebook.](https://github.com/deeptools/HiCExplorer/blob/master/examples/hicexplorer.usegalaxy.eu%20API%20access.ipynb) It is shown how to upload a dataset, run bowtie2 and to download the mapped file to the local computer. Please notice the options offered by the bioblend API are extensive and go way beyond this example.

## Known pitfalls

Preprocssed SAM/BAM files:
To build the contact matrix the SAM/BAM files need to generated using the --reorder option from bowtie2 / hisat2 to output the SAM/BAM files in the exact same order as in the fastq files. To cover the identical reason, the SAM/BAM file should not be sorted. Please make sure your preprocessed SAM/BAM files fulfill these requirements, if not the creation of a contact matrix with hicBuildMatrix will fail.

We recommend to use BWA-MEM with the Hi-C specific parameters, as shown in our tutorials.

## Citation

Joachim Wolff, Vivek Bhardwaj, Stephan Nothjunge, Gautier Richard, Gina Renschler, Ralf Gilsbach, Thomas Manke, Rolf Backofen, Fidel Ramírez, Björn A Grüning.
**"Galaxy HiCExplorer: a web server for reproducible Hi-C data analysis, quality control and visualization", Nucleic Acids Research**, Volume 46, Issue W1, 2 July 2018, Pages W11–W16, doi: [10.1093/nar/gky504](https://doi.org/10.1093/nar/gky504)
