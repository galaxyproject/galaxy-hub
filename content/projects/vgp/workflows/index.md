## Workflows


### Overview
-------------
The Vertebrate Genomes Pipelines in Galaxy are intended to allow a user to generate high-quality near error-free assemblies of species from a user's own data or from the GenomeArk database. Depending on the available data, different versions of this workflow are available. 


| Link | Workflow |  Inputs | Outputs |
|---|--------|-------|--------|--------------|-----------------|
| [Dockstore](https://dockstore.org/workflows/github.com/iwc-workflows/VGP-meryldb-creation/main:main?tab=info)      |**MerylDB generation**:<br>Create Meryl Database used for the estimation of assembly parameters and quality control with Merqury.<br><span class="badge badge-success">ILL-PE</span> | 1. Hifi long reads [`fastq`] | 1. Meryl Database of kmer counts <br> 2. GenomeScope summary, models and plots |
| [Dockstore](https://github.com/iwc-workflows/VGP-meryldb-creation-trio/tree/main)      |**MerylDB generation Trio**:<br>Create Meryl Database used for the estimation of assembly parameters and quality control with Merqury using parental and offspring datasets<br><span class="badge badge-success">ILL-PE</span> | 1. Hifi long reads [`fastq`] <br> 2. Paternal short-read Illumina sequencing reads [`fastq`] <br> 3. Maternal short-read Illumina sequencing reads [`fastq`]| 1. Meryl Database of kmer counts <br> 2. GenomeScope summary, models and plots |
                                    

