## Adding MAFs to Galaxy
Related to: 
* [/Admin/DataPreparation](/Admin/DataPreparation) 
* [/Admin/DataIntegration](/Admin/DataIntegration)
---
Adding additional MAFs to Galaxy involves editing the file [tool-data/maf_index.loc](https://github.com/galaxyproject/galaxy/blob/dev/tool-data/maf_index.loc.sample) located within your Galaxy directory.

Before adding MAFs to Galaxy, they must be indexed.



### How to index MAFs

The scripts required to index MAFs are found in the [bx-python](https://github.com/bxlab/bx-python) distribution; you will need to download this package separately from Galaxy. 

```
maf_build_index.py MAF_FILENAME
```
 

for each MAF file.

See the [maf_build_index.py](https://github.com/bxlab/bx-python/blob/master/scripts/maf_build_index.py) script (within the bx-python package) for additional options, such as limiting the species which are indexed.

Once you have added MAFs, the Galaxy server must be reset (or tools reloaded) so that it can be made aware of the changes.

### Format of tool-data/maf_index.loc

* Tab-delimited file
  * There are 5 required fields
* Lines beginning with **#** are ignored


### Description of Fields

#### First Field
* Display Name, as seen by Users
  * i.e. `3-way multiZ (hg18,panTro2,rheMac2`

#### Second Field
* A unique ID for the MAFs
  * i.e. `3_WAY_MULTIZ_hg18`
  * Any combination of letters and/or numbers is acceptable
    * Except the keyword **None**, do not use it or else your data won't be accessible
  * Make sure that the ID that you select is different than any other
    * If not, one of the datasets will be unknown to the tool


#### Third Field
* Comma-separated list of database builds which have been indexed.
  * i.e. `hg18,mm6,canFam1,panTro1`
* If species name in MAF file differs from build ID:
  * build1[=name_in_file],build2[=name_in_file]
    * i.e. `hg18=human,mm6=mouse`

#### Fourth Field
* Comma-separated list of database builds which exist in the file.
  * i.e. `hg18,mm6,canFam1,panTro1`

#### Fifth Field
* Comma-separated list of full paths to the .MAF files
* These files must be accessible to the Galaxy Server


### An Example Entry
You want to add a set of MAFs with the following characteristics:
* Has the description of "3-way multiZ (hg18,panTro2,rheMac2"
* Decide upon and confirm that the UID "3_WAY_MULTIZ_hg18" has not been used
* There are a number of MAFs located in `/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/` which belong to this set.
  * The files are accessible to the galaxy server
The entry would look like this:
```
3-way multiZ (hg18,panTro2,rheMac2)	3_WAY_MULTIZ_hg18	hg18,panTro2,rheMac2	hg18,panTro2,rheMac2	/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr10.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr10_random.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr11.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr11_random.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr12.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr13.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr13_random.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr14.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr15.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr15_random.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr16.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr16_random.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr17.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr17_random.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr18.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr18_random.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr19.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr19_random.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr1.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr1_random.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr20.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr21.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr21_random.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr22_h2_hap1.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr22.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr22_random.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr2.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr2_random.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr3.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr3_random.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr4.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr4_random.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr5_h2_hap1.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr5.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr5_random.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr6_cox_hap1.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr6.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr6_qbl_hap2.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr6_random.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr7.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr7_random.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr8.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr8_random.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr9.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chr9_random.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chrM.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chrX.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chrX_random.maf,/cache/maf/hg18/align/hg18-panTro2-rheMac2.new/chrY.maf
```



## Some Questions/Answers

### Why doesn't my MAF set appear in my drop down menu?
* You didn't reset the server or reload the tool
  * The server must be reset in order for the tool to be aware of its presence
* You did not include all the required fields
  * Fields are delimited by tabs
* The file you specified isn't accessible to the Galaxy server
  * Check permissions
* The file you specified doesn't exist
  * Check your spelling
* You used an ID (field 2) which matches another dataset
  * Or someone reused your ID
