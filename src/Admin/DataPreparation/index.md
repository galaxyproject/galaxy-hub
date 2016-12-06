# Data Preparation

**Please note that "built-in" or "cached" data can now be managed directly from within the Galaxy admin interface. For details, see [Data Managers](/src/Admin/Tools/DataManagers/index.md).**

Tutorial: [Events/GCC2014/TrainingDay](/src/events/GCC2014/TrainingDay/index.md#tool_development_from_bright_idea_to_toolshed_-_data_managers)

**NOTE: Be aware that that as of early 2014, builds are incorporated into the Galaxy schema in tables. [Data Managers](/src/Admin/Tools/DataManagers/index.md) are recommended to index new genomes (these are found in the [ToolShed](/src/ToolShed/index.md). *This wiki is considered legacy and provided as a reference.***

# Builds list changes

If you still choose to do this manually, follow the instructions at [Data Integration](/src/Admin/DataIntegration/index.md) to start, (**impact**: more than just a builds.txt file is needed to establish a new reference genome), making certain that your server has the necessary changes/additions to the [Data Tables](/src/Admin/Tools/Data Tables/index.md) model or use the alternate configuration file, then follow the guide here for the organization and execution of **data preparation** tasks in a local or cloud instance. 

# Rsync data

Using the Galaxy team's version of reference genomes and indexes can often be a good strategy for those working with both a local and the public **[Main](/src/Main/index.md)** instance. More about our rsync server, the contents of the data snapshots, and what is published on the [usegalaxy.org](http://usegalaxy.org) public instance is at **[Usegalaxy.org Rsync](/src/Admin/UseGalaxyRsync/index.md)**.

## What's in this wiki ?

**This wiki shows you how to organize, index, and link in your local built-in data for the most commonly used tools.**
Galaxy's web tool forms are each a web-accessible input wrapper that interacts with one or more underlying tools. Many require that reference data be indexed in a specific way as an one of the inputs, whether specifically selected on the form by the user or interpreted from the other input's metadata (specifically, the "database" attribute, or **dbkey**).

Although a reference genome can be used from the history with most tools (see [Custom Genomes](/src/Learn/CustomGenomes/index.md)), this is a resource intensive process, and local built-in indexes mean quicker job execution and reduced server load. 

The link between a tool and built-in data is a configurable `".loc"` file. 

## Setting up Tools and Reference Data

#### 1. Determine the tools versions needed, the source, and any dependencies.

#### 2. Decide how you will organize your tools.

#### 3. Install tools.

#### 4. Decide how you will organize your data.

#### 5. Install data.

#### 6. Restart your server!

#### 7. Repeat 3, 5, 6 as needed.

----

## Tips for Installing Tools

The how-to is below, but this section gives a quick overview by tool or tool group.

#### General

For tools from the "Fastx Toolkit", go to the [http://hannonlab.cshl.edu/fastx_toolkit](http://hannonlab.cshl.edu/fastx_toolkit) web site for the current download and instructions.

Two other common dependencies are "rpy" (a Python library) and "R". Start with rpy first. Check if R was built with the `--enable-R-shlib` option if you run into problems (unlikely, this is default in pre-compiled binaries). Go to [http://rpy.sourceforge.net](http://rpy.sourceforge.net) and [http://www.r-project.org](http://www.r-project.org) for the current download and instructions. 

#### Bowtie/Bowtie2 installation

To install Bowtie and/or Bowtie2, go to the [http://bowtie-bio.sourceforge.net/index.shtml](http://bowtie-bio.sourceforge.net/index.shtml) or [http://sourceforge.net/projects/bowtie-bio/files/bowtie2](http://sourceforge.net/projects/bowtie-bio/files/bowtie2). Download (source or binary) and follow the instructions per tool. 

#### BWA installation

To install BWA, download the source from [http://bio-bwa.sourceforge.net](http://bio-bwa.sourceforge.net). To install, open the archive and run `make` in the new BWA directory. 

#### LASTZ installation

LASTZ is downloaded from [http://www.bx.psu.edu/miller_lab/dist](http://www.bx.psu.edu/miller_lab/dist) (e.g. `lastz-X.0n.m.tar.gz`). Installation help is at [http://www.bx.psu.edu/miller_lab/dist/README.lastz-X.0X.X0/README.lastz-X.0X.X0.html](http://www.bx.psu.edu/miller_lab/dist/README.lastz-X.0X.X0/README.lastz-X.0X.X0.html).

#### Extract Genomic DNA installation

The Extract tool is downloaded from [http://genome.ucsc.edu](http://genome.ucsc.edu). It uses the same reference index as LASTZ and the instructions for the data prep is merged below.

#### Megablast installation

Megablast in Galaxy was updated to use [NCBI BLAST+](http://blast.ncbi.nlm.nih.gov) (`BLASTN`) in April 2012 (changeset [0b5cb60e4810](https://bitbucket.org/galaxy/galaxy-central/changeset/0b5cb60e4810#chg-tools/metag_tools/megablast_wrapper.xml)). See [dependencies wiki](/src/Admin/Tools/Tool Dependencies/index.md) for current version then [download blast+](http://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Web&PAGE_TYPE=BlastDocs&DOC_TYPE=Download). Many data indexes are available directly at NCBI from [ftp://ftp.ncbi.nlm.nih.gov/blast/db/](ftp://ftp.ncbi.nlm.nih.gov/blast/db/)

#### Picard/SRMA installation

SRMA is a Java program that relies on Picard, a Java implementation of C Samtools. SRMA is available from the [Sourceforge SRMA project](https://sourceforge.net/projects/srma/files/). The SRMA jar file should be named `srma.jar` and placed in `$GALAXY_PATH/tool-data/shared/jars`. If you want to compile SRMA from source, you will also need to install Picard ([Sourceforge Picard project](http://sourceforge.net/projects/picard/files/)) and extract it into the lib directory of the SRMA directory. You can get more info on SRMA from [its wiki](http://sourceforge.net/apps/mediawiki/srma/index.php?title=Main_Page). 

(Note that there also is a C version of SRMA, but the Galaxy team does not use it as of the last page edit.)

### NGS: SAM Tools

SAM Tools is highly recommended, if not actually considered required, for every local instance running any other tools in the "NGS:" tool groups. SAM Tools is available at [http://samtools.sourceforge.net](http://samtools.sourceforge.net). To install: unpack the archive in a new `/samtools` directory and then run `make`.


----

## Setting Up the Reference Genomes for NGS Tools

There are three key steps:
1. Obtain the data
1. Index or prepare it
1. Modify the associate .loc file (this tells Galaxy how to find/use it)

### Build Names

Build names need to exactly match existing build names in `$GALAXY_PATH/tool-data/shared/ucsc/builds.txt`. Each is unique.

### Tools and Their Corresponding loc Files

The following table shows the name of the loc file associated with each tool. 

<table>
  <tr>
    <th> Tool      </th>
    <th> XML File                                                    </th>
    <th> loc File                                       </th>
  </tr>
  <tr>
    <td> Bowtie, Tophat     </td>
    <td> $GALAXY_PATH/tools/sr_mapping/bowtie_wrapper.xml             </td>
    <td> $GALAXY_PATH/tool-data/bowtie_indices.loc       </td>
  </tr>
  <tr>
    <td> </td>
    <td> $GALAXY_PATH/tools/sr_mapping/bowtie_wrapper_color.xml       </td>
    <td> $GALAXY_PATH/tool-data/bowtie_indices_color.loc </td>
  </tr>
  <tr>
    <td> Bowtie2, Tophat2     </td>
    <td> $GALAXY_PATH/tools/sr_mapping/bowtie2_wrapper.xml             </td>
    <td> $GALAXY_PATH/tool-data/bowtie2_indices.loc       </td>
  </tr>
  <tr>
    <td> BWA        </td>
    <td> $GALAXY_PATH/tools/sr_mapping/bwa_wrapper.xml                </td>
    <td> $GALAXY_PATH/tool-data/bwa_index.loc            </td>
  </tr>
  <tr>
    <td> SAM Tools  </td>
    <td> $GALAXY_PATH/tools/samtools/sam_to_bam.xml                   </td>
    <td> $GALAXY_PATH/tool-data/sam_fa_indices.loc       </td>
  </tr>
  <tr>
    <td> </td>
    <td> $GALAXY_PATH/tools/samtools/sam_merge.xml                    </td>
    <td> $GALAXY_PATH/tool-data/sam_fa_indices.loc       </td>
  </tr>
  <tr>
    <td> </td>
    <td> $GALAXY_PATH/tools/samtools/sam_pileup.xml                   </td>
    <td> $GALAXY_PATH/tool-data/sam_fa_indices.loc       </td>
  </tr>
  <tr>
    <td> LASTZ      </td>
    <td> $GALAXY_PATH/tools/sr_mapping/lastz_wrapper.xml              </td>
    <td> $GALAXY_PATH/tool-data/lastz_seqs.loc           </td>
  </tr>
  <tr>
    <td> </td>
    <td> $GALAXY_PATH/tools/sr_mapping/lastz_paired_reads_wrapper.xml </td>
    <td> $GALAXY_PATH/tool-data/lastz_seqs.loc           </td>
  </tr>
  <tr>
    <td> Megablast  </td>
    <td> $GALAXY_PATH/tools/metag_tools/megablast_wrapper.xml         </td>
    <td> $GALAXY_PATH/tool-data/blastdb.loc              </td>
  </tr>
  <tr>
    <td> SRMA       </td>
    <td> $GALAXY_PATH/tools/sr_mapping/srma_wrapper.xml               </td>
    <td> $GALAXY_PATH/tool-data/srma_index.loc           </td>
  </tr>
</table>


There is a sample file for each of these files, with `.sample` appended to the filename. This file explains the necessary format of the loc file.

### Organizing Index Files

The best way to organize the various index files is to have dedicated directories for each build that contains a directory for each NGS tool, which then contains the actual index files. 

A structure like this is recommended:
```
$BASE_PATH/
    hg18/
        bowtie_path/
            base/
                hg18.1.ebwt
                hg18.2.ebwt
                hg18.3.ebwt
                hg18.4.ebwt
                hg18.rev.1.ebwt
                hg18.rev.2.ebwt
            color/
                hg18.1.ebwt
                hg18.2.ebwt
                hg18.3.ebwt
                hg18.4.ebwt
                hg18.rev.1.ebwt
                hg18.rev.2.ebwt
        bwa_path/
            hg18.amb
            hg18.ann
            hg18.bwt
            hg18.pac
            hg18.rbwt
            hg18.rpac
            hg18.rsa
            hg18.sa
        sam_index/
            hg18.fasta
            hga8.fasta.fai
```



----

### Bowtie and Tophat

#### Generating Indices

Instructions are for both Bowtie/Tophat and Bowtie2/Tophat2. 

*Bowtie and Tophat use the same index set, and Bowtie2 and Tophat2 use the same index set, **but** Bowtie/Tophat and Bowtie2/Tophat2 **do not** use the same index set.* 

Know what tools are you evoking and which indexes are being accessed by that tool based on the `.loc` file contents. If your tools are giving errors after a data update or at first usage, *review the wrapper and tool versions against the indexes used in the error message to verify!* 

Have Bowtie and/or Bowtie2 installed and in your `$PATH`.
Also have Tophat and/or Tophat2 installed and in your `$PATH` so that you can test the tools on the command-line for simple installation checks or for use later on in Galaxy.

Usage: `bowtie-build [option] index_basename.fa index_basename `
(where `index_basename.fa` is your input reference genome in fasta format)

The Galaxy team uses the ` [option] ` **-f** to create indexes, for example: 
```
bowtie-build -f hg19.fa hg19
```

or
```
bowtie2-build -f hg19.fa hg19
```

The ` [option] ` **-C** would be used instead to create color indexes for Bowtie/Tophat. *Please note that Bowtie2/Tophat2 [do not support colorspace reads](http://bowtie-bio.sourceforge.net/bowtie2/faq.shtml).* Confused? Type `bowtie-build` or `bowtie2-build` at the command prompt to view the usage and see the manual: 
Bowtie: [http://bowtie-bio.sourceforge.net/manual.shtml](http://bowtie-bio.sourceforge.net/manual.shtml) 
Bowtie2: [http://bowtie-bio.sourceforge.net/bowtie2/manual.shtml](http://bowtie-bio.sourceforge.net/bowtie2/manual.shtml) 

Put Bowtie/Bowtie2 indexes and color/non-color indexes in *distinct directories*. That means up to ***3** distinct directories* for a full set per reference genome version. But you may only need **1** or **2**. 

The index files that will be created for Bowtie are:
* `index_basename.1.ebwt`
* `index_basename.2.ebwt`
* `index_basename.3.ebwt`
* `index_basename.4.ebwt`
* `index_basename.rev.1.ebwt`
* `index_basename.rev.2.ebwt`

The index files that will be creates for Bowtie2 are:
* `index_basename.1.bt2`
* `index_basename.2.bt2`
* `index_basename.3.bt2`
* `index_basename.4.bt2`
* `index_basename.rev.1.bt2`
* `index_basename.rev.2.bt2`

#### Setting Up loc Files

* Know where the data is
* Know where the `bowtie_index.loc`, `bowtie_index_color.loc`, and `bowtie2_index.loc` files comes from and where they should be placed to be used
  * initially are named `/galaxy-dist/tool-data/bowtie_index.loc.sample`, (`/galaxy-dist/tool-data/bowtie_index_color.loc.sample`, and `/galaxy-dist/tool-data/bowtie2_index.loc.sample`
  * from the Tool Shed repository
  * to your Galaxy instance
* Follow instructions in sample file to add in rows for each database. One row per database.
* Remove the ".sample" from the file name if this is the first time you are using it
* Remove any rows for databases that you no longer want to host if you are altering an existing .loc
* You can make sure the file was created correctly by restarting the server and opening up the Bowtie/Bowtie2, Bowtie_color, or Tophat/Tophat2 tool, and checking the dropdown menu of genomes. These tools are found in the tool groups **NGS: Mapping** and **NGS: RNA Analysis**, unless you custom installed them elsewhere.
* Test the new database(s) by running a few sequences that you expect to have hits with default parameters.

### BWA

#### Generating Indices

Have BWA installed in your `$PATH`.

Usage: `bwa index [options] <reference_in>`

The Galaxy team uses the option `-a bwtsw` to create indexes.

The manual is here: [BWA manual](http://bio-bwa.sourceforge.net/bwa.shtml). 

The following index files will be created for the FASTA file `name.fasta`:
* `reference_in.fasta.amb`
* `reference_in.fasta.ann`
* `reference_in.fasta.bwt`
* `reference_in.fasta.pac`
* `reference_in.fasta.sa`

Note: that if using BWA version earlier than 5.10, you will also see the following *reverse* index files:
* `reference_in.fasta.rbwt`
* `reference_in.fasta.rpac`
* `reference_in.fasta.rsa`

#### Setting Up loc File

* Know where the data is
* Know where the `bwa_index.loc` file comes from and where it should be placed to be used
  * initially are named (`/galaxy-dist/tool-data/bwa_index.loc.sample` and (`/galaxy-dist/tool-data/bwa_index_color.loc.sample`
  * from the Tool Shed repository
  * to your Galaxy instance
* Follow instructions in sample file to add in rows for each database. One row per database.
* Remove the ".sample" from the file name if this is the first time you are using it
* Remove any rows for databases that you no longer want to host if you are altering an existing .loc
* You can make sure the file was created correctly by restarting the server and opening up the BWA tool, and checking the dropdown menu of genomes.
* Test the new database(s) by running a few sequences that you expect to have hits with default parameters.

### SAM Tools

#### Generating Indices

Have SAMTools installed in your `$PATH`.

Usage: `samtools faidx <ref.fasta> [region1 [...]]`

No special options are needed.

The following index files will be created for the FASTA file `name.fasta`:
* `ref.fasta.fai`

Place a relative symbolic link to the original FASTA file in the same location as the sam index (or the original file), making sure the original FASTA file can be read by the Galaxy user. The Galaxy team uses a symbolic link to both organize files (placing the FASTA in a distinct directory) and to reduce data duplication. Creating a structure like:

```
/ref/bowtie
/ref/bwa
/ref/sam/ref.fasta (relative symbolic link to ../seq/database.fasta)
/ref/sam/ref.fasta.fai
/ref/seq/ref.fasta 
```


#### Setting Up loc Files

* Know where the data is
* Know where the `sam_fa_index.loc` file comes from and where it should be placed to be used
  * initially is named (`/galaxy-dist/tool-data/sam_fa_index.loc.sample`
  * from the distribution
  * to your Galaxy instance
* Follow instructions in sample file to add in rows for each database. One row per database.
* Remove the ".sample" from the file name if this is the first time you are using it
* Remove any rows for databases that you no longer want to host if you are altering an existing .loc
* You can make sure the file was created correctly by restarting the server and a tool from the **SAM Tools** tool set. Input datasets should have a database assigned that corresponds to a database having a sam index.
* Test the new database(s) by running a few datasets through tools. Change dataset database assignments using the "Edit Attributes" form ([pencil icon](/src/Learn/Managing Datasets/index.md#dataset_icons)). 

### LASTZ and EXTRACT Genomic DNA

Have LASTZ installed in your `$PATH`, although it is not needed for creating indexes, you will need it for testing/using the tool.
The LASTZ and 'Extract Genomic DNA' tools both use a .2bit compressed file representing a reference genome. If the data is sourced from [UCSC](http://genome.ucsc.edu/), this can often just be downloaded. 
If from another source, use the FASTA file as input and have twoBitToFa installed in your `$PATH`. 
twoBitToFa is available from [UCSC](http://genome.ucsc.edu/) as a precompiled binary if needed, see the *Downloads* link on left side bar. 
Usage: twoBitToFa ref.2bit ref.fasta 
Type tool at command prompt for more usage details. 

The following index files will be created for the FASTA file `name.fasta`:
* `ref.2bit`

The Galaxy team places the .2bit file in the same location as the original fasta FASTA file to stay organized, such as: 

```
/ref/seq/ref.2bit 
/ref/seq/ref.fasta 
```


#### Setting Up loc Files

* Know where the data is
* Know where the `lastz_seqs.loc` and `alignseq.loc` files comes from and where they should be placed to be used
  * initially are named (`/galaxy-dist/tool-data/lastz_seqs.loc.sample` and (`/galaxy-dist/tool-data/alignseq.loc.sample`
  * lastz comes from the Tool Shed and `alignseq.loc` is one of the key configuration files from the distribution (used for many purposes)
  * to your Galaxy instance
* Follow instructions in sample file to add in rows for each database. One row per database.
* Remove the ".sample" from the file name if this is the first time you are using it
* Remove any rows for databases that you no longer want to host if you are altering an existing .loc
* Restarting the server 
* You can make sure the `lastz_seqs.loc` is correct by opening up the LASTZ tool, and checking the dropdown menu of genomes. Test the new database(s) by running a few sequences that you expect to have hits with default parameters.
* You can make sure the `alignseq.loc` is correct by loading a simple [BED](/src/Learn/Datatypes/index.md#bed) file of coordinates that you know will pull regions from the target genome as a dataset, assigning the database as the reference genome that you are testing, and running the tool. Change dataset database assignments using the "Edit Attributes" form ([pencil icon](/src/Learn/Managing Datasets/index.md#dataset_icons)). 

### Megablast

Have Megablast installed in your `$PATH`, although it is not needed for creating indexes, you will need it for testing/using the tool.
Megablast in Galaxy was updated to use [NCBI BLAST+](http://blast.ncbi.nlm.nih.gov) (`BLASTN`) in April 2012 (changeset [0b5cb60e4810](https://bitbucket.org/galaxy/galaxy-central/changeset/0b5cb60e4810#chg-tools/metag_tools/megablast_wrapper.xml)). 
Get the indexes: download directly at NCBI from [ftp://ftp.ncbi.nlm.nih.gov/blast/db/](ftp://ftp.ncbi.nlm.nih.gov/blast/db/).
Create your own, Usage: `formatdb -i <database>.fa -p F -n "<database>" -v 2000`

The Galaxy [Main](/src/Main/index.md) public instance uses htgs, wgs, and nt from NCBI.

Put the data files in an organized hierarchy such as: 
 ` /galaxy-dist/tool-data/blast/<div>/<date>/<date_div>.* `
or
 ` /galaxy-dist/tool-data/blast/<date_db>.* `

#### Setting Up loc Files

* Know where the data is 
* Know where the `blastdb.loc` file is located (`/galaxy-dist/tool-data/blastdb.loc.sample` is default)
* Follow instructions in sample file to add in rows for each database. One row per database.
* Remove the ".sample" from the file name if this is the first time you are using it
* Remove any rows for databases that you no longer want to host
* You can make sure the file was created correctly by restarting the server and opening up the Megablast page, where you should see the list of databases you added. 
* Test the databases by running a few of the sequence from the same database against themselves through the UI (self-hits) with simple filtering set to "no" (-F F). (Load a few .fa sequences as a dataset -> run tool).

### SRMA

#### Generating Indices

SRMA needs three files in the same directory for each genome, named in a specific way. There are two "index" files required: one is the SRMA `.dict` file and the other is the Samtools `.fai` index file. To create the `.dict` file, run the Picard CreateSequenceDictionary command:

 Usage: `java -cp "../path/to/srma.jar" net.sf.picard.sam.CreateSequenceDictionary R=<ref.fa> O=<ref.dict>`

Note that the `.fa` extension is replaced with the `.dict` extension. If you haven't already created the Samtools index, you will need to do that:

 Usage: `samtools faidx <ref.fa> [region1 [...]]`

Note that the resulting file should have the extension `.fa.fai`. Finally, the fasta file (`<ref.fa>`) also needs to be available in the same directory (a relative symbolic link is fine).

#### Setting Up loc Files

The process for establishing the SRMA loc file is pretty much like the others.

* You need to make sure the files are accessible
* Modify the file `srma_index.loc.sample` in the Galaxy `tool-data` directory following instructions within the file itself
* Remove the .sample from the file before using
* Restart the server and test

