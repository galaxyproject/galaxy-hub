---
---
* [Wiki Root](/src/toolshed/index.md)
* [All monthly summaries](/src/toolshed/contributions/index.md)

# Tools

* *From [nicolas](https://toolshed.g2.bx.psu.edu/view/nicolas):*
  * [oghma](https://toolshed.g2.bx.psu.edu/view/nicolas/oghma): tools for the genomic selection project

* *From [mingchen0919](https://toolshed.g2.bx.psu.edu/view/mingchen0919):*
  * [package_r_limma_3_30_0](https://toolshed.g2.bx.psu.edu/view/mingchen0919/package_r_limma_3_30_0): Data analysis, linear models and differential expression for microarray data
  * [package_bioconductor_edger_3_16_1](https://toolshed.g2.bx.psu.edu/view/mingchen0919/package_bioconductor_edger_3_16_1): Differential expression analysis of RNASeq data
  * [package_r_locfit_1_5_9_1](https://toolshed.g2.bx.psu.edu/view/mingchen0919/package_r_locfit_1_5_9_1): Local regression, likelihood and density estimation

* *From [charles-bernard](https://toolshed.g2.bx.psu.edu/view/charles-bernard):*
  * [alfa](https://toolshed.g2.bx.psu.edu/view/charles-bernard/alfa): Compute and display distribution of reads by genomic categories ALFA provides a global overview of features distribution composing New Generation Sequencing dataset(s). Given a set of aligned reads (BAM files) and an annotation file (GTF format), the tool produces plots of the raw and normalized distributions of those reads among genomic categories (stop codon, 5'-UTR, CDS, intergenic, etc.) and biotypes (protein coding genes, miRNA, tRNA, etc.). Whatever the sequencing technique, whatever the organism.
  * [data_manager_build_alfa_indexes](https://toolshed.g2.bx.psu.edu/view/charles-bernard/data_manager_build_alfa_indexes): build ALFA indexes from automatically downloaded gtf annotation file
    1. The tool asks the admin to enter a 'species_name' and automatically download the last release of the corresponding gtf annotation file on Ensembl.
    2. The tool calls ALFA to generate the alfa indexes from this gtf file.
    3. Resulting indexes are stored in the child directory 'alfa_indexes' of the dir <galaxy_data_manager_data_path> defined in config/galaxy.ini
    4. Finally, the tool adds the new entry to the table 'alfa_indexes.loc'. This .loc file is where the data table 'alfa_indexes' points, as defined in config/shed_tool_data_table.conf.xml
    5. At the end of the process, when a user will use alfa (https://toolshed.g2.bx.psu.edu/view/charles-bernard/alfa), the built-in indexes corresponding to the 'species_name' will be available

* *From [rachel-929292](https://toolshed.g2.bx.psu.edu/view/rachel-929292):*
  * [extract_fragment_counts_for_chromosomes](https://toolshed.g2.bx.psu.edu/view/rachel-929292/extract_fragment_counts_for_chromosomes): extracts fragment counts for chromosomes Extracts Fragment Counts for Chromosomes

* *From [nedias](https://toolshed.g2.bx.psu.edu/view/nedias):*
  * [blast_tool](https://toolshed.g2.bx.psu.edu/view/nedias/blast_tool): BLAST API caller for orf tool BLAST API caller for orf tool
  * [orf_tools](https://toolshed.g2.bx.psu.edu/view/nedias/orf_tools): Tools for searching open reading frame from mRNA sequence Tools for searching open reading frame from mRNA sequence

* *From [chrisd](https://toolshed.g2.bx.psu.edu/view/chrisd):*
  * [resistome_analyzer](https://toolshed.g2.bx.psu.edu/view/chrisd/resistome_analyzer): A simple tool for analyzing the resistome of metagenomic sequence data
  * [rarefaction_analyzer](https://toolshed.g2.bx.psu.edu/view/chrisd/rarefaction_analyzer): A simple tool for creating rarefaction curves for metagenomic sequence data

* *From [nml](https://toolshed.g2.bx.psu.edu/view/nml):*
  * [stringmlst](https://toolshed.g2.bx.psu.edu/view/nml/stringmlst): Rapid and accurate identification of the sequence type (ST)

* *From [davidvanzessen](https://toolshed.g2.bx.psu.edu/view/davidvanzessen):*
  * [shm_csr](https://toolshed.g2.bx.psu.edu/view/davidvanzessen/shm_csr): Somatic hypermutation and class switch recombination pipeline Performs a summary/analysis of an IMGT HighV-QUEST  (https://www.imgt.org/HighV-QUEST/) ZIP file for Somatic hypermutation and class switch recombination.

* *From [galaxyp](https://toolshed.g2.bx.psu.edu/view/galaxyp):*
  * [sixgill](https://toolshed.g2.bx.psu.edu/view/galaxyp/sixgill): Build Six-frame Genome-Inferred Search Database for LC-MS/MS Sixgill (Six-frame Genome-Inferred Libraries for LC-MS/MS) is a tool for using shotgun metagenomics sequencing reads to construct databases of metapeptides: short protein fragments for database search of LC-MS/MS metaproteomics data.
