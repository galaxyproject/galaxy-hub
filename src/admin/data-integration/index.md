 

## Data Integration for Local Instances

Please note that "built-in" or "cached" data can now be managed directly from within the Galaxy admin interface. For details, see: **[Data Managers Overview](/src/admin/tools/data-managers/index.md)** and our **[Data Managers Tutorial](https://github.com/galaxyproject/dagobah-training/blob/2017-montpellier/sessions/05-reference-genomes/ex1-reference-genomes.md)**.

Built-in data files are critical for many Galaxy tools. This page will describe how to get data into your local instance of Galaxy in a general way. For instructions specific for organizing and indexing data for use with tools, see **[Data Preparation](/src/admin/data-preparation/index.md)**. Additional instructions are available for reviewing or retrieving the exact data hosted on the public [Main](/src/main/index.md) instance or for performing more complex data prep used by specific tool groups.

- Review or retrieve [https://usegalaxy.org](https://usegalaxy.org) reference genomes, indexes, and loc files. All methods are described at http://datacache.galaxyproject.org/, with more rsync server help at **[Usegalaxy.org Rsync](/src/admin/use-galaxy-rsync/index.md)** 
- "Fetch Alignment" tools data prep: **[Reference MAFs](/src/admin/reference-mafs/index.md)** 

## How it works

There are several steps needed for adding a genome to Galaxy. The first is to get the actual data needed and to put it into an appropriate directory accessible to the Galaxy instance. Then you need to establish the particular `.loc` ("location") file. Finally, make sure that the genome is referenced in the `$GALAXYROOT/tool-data/shared/ucsc/builds.txt` file.

**Note that as of early 2014, more than a builds.txt file change is needed to establish a new reference genome. If not using** [Data Managers](/src/admin/tools/data-managers/index.md) **, you must make the necessary changes/additions to the new [Data Tables](/src/admin/tools/data-tables) or use the alternative configuration file.**

### Get the data

First you need to determine what type of data you need. Usually these are `.fasta`, `.nib`, `.2bit`, or special index files, but each tool has a specific need. Open up the XML for the particular tool and identify the `.loc` file referred to in either a validator tag or options tag. Open the `$GALAXYROOT/tool-data/&lt;filename&gt;.loc.sample` file, and read it to discover the type of files necessary. Once you know what you need, you can go acquire it.

There are several ways to get the data. If you don't already have the right file on your system, you will need to get it from a site such as [UCSC](http://hgdownload.soe.ucsc.edu/downloads.html).

Or, if you would like to obtain the data as available on the public Galaxy [Main](/src/main/index.md) instance, these can retrieved from the rsync server. Read more here: **[Rsync](/src/admin/use-galaxy-rsync/index.md)**

### Set up the loc file

The `.loc.sample` files themselves include instructions for setting them up. In all cases, there is one reference genome per line, with tab-separated information. Create the needed `.loc` files, add your sequence and index data, and place these into the `$GALAXYROOT/tool-data` directory. This can be modified, but is the default location configured in `config/galaxy.ini` and the other configuration files referenced by it, in this section:

```
# -- Files and directories


# Path where genome builds are stored. This defaults to tool-data/genome
#genome_data_path = tool-data/genome


...<skipped>...


# XML config file that contains data table entries for the ToolDataTableManager. This file is manually
# maintained by the Galaxy administrator.
#tool_data_table_config_path = tool_data_table_conf.xml


# XML config file that contains additional data table entries for the ToolDataTableManager. This file
# is automatically generated based on the current installed tool shed repositories that contain valid
# tool_data_table_conf.xml.sample files. At the time of installation, these entries are automatically
# added to the following file, which is parsed and applied to the ToolDataTableManager at server start up.
#shed_tool_data_table_config = shed_tool_data_table_conf.xml
```

### \*.loc file examples

With tabs separating the information:

**alignseq.loc**

```
align	anoGam1	dm1	/depot/data2/galaxy/anoGam1/align/dm1
align	anoGam1	dm2	/depot/data2/galaxy/anoGam1/align/dm2
align	canFam1	hg17	/depot/data2/galaxy/canFam1/align/hg17
```

**bowtie2\_indexes.loc**

```
hg38canon hg38 Human (Homo sapiens) (b38): hg38 Canonical /galaxy/data/hg38/hg38canon/bowtie2_index/hg38canon
hg38 hg38 Human (Homo sapiens) (b38): hg38 /galaxy/data/hg38/hg38full/bowtie2_index/hg38full
dipOrd1 dipOrd1 Kangaroo rat (Dipodomys ordii): dipOrd1 /galaxy/data/dipOrd1/bowtie2_index/dipOrd1
braFlo1 braFlo1 Lancelet (Branchiostoma floridae): braFlo1 /galaxy/data/braFlo1/bowtie2_index/braFlo1
anoCar1 anoCar1 Lizard (Anolis carolinensis): anoCar1 /galaxy/data/anoCar1/bowtie2_index/anoCar1
anoCar2 anoCar2 Lizard (Anolis carolinensis): anoCar2 /galaxy/data/anoCar2/bowtie2_index/anoCar2
```

Also see the **[Rsync](/src/admin/use-galaxy-rsync/index.md)** wiki if you want to obtain the exact same location files used on [https://usegalaxy.org](https://usegalaxy.org) for full size examples or for use as base-line files when configuring your own server.

### Add new genome as Galaxy build

Final and most important item needed is to include any new reference genomes in the builds.txt file. This is the list of reference genomes appear in the Genome or Database/Build search box when you upload a file or change a file's metadata (Where to find these? See the Rsync link directly above for screenshots).

To modify the builds.txt file, add a line to `$GALAXYROOT/tool-data/shared/ucsc/builds.txt` for your genome. The format of this line can vary, but should contain enough information to uniquely identify the genome, the source, any external build nomenclature, and the **dbkey** selected for use within your [Galaxy](/src/admin/get-galaxy/index.md) instance. See the public [Main](/src/main/index.md) server for examples: [https://usegalaxy.org](https://usegalaxy.org)

### Restart the server

**Any time you change data information, the server has to be restarted!!!**

* * *
