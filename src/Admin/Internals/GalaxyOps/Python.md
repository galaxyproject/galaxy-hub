1. format text/creole 

## Galaxy Operations Help Information (Python Version)

### Name:

galaxyOps.py - Operations on Genomic Intervals, which is written in Python

### Usage:

galaxyOps.py bed\_file\_1 [[bed\_file\_2]|[-swcb...]]

### Descriptions:

galaxyOps.py provides the same operation as C version galaxyOps.

### Options:

-s, --subSeg: Print segments that DO NOT overlap with the 2nd bed file

-w, --subWhole: Print regions that DO NOT overlap with the 2nd bed file

-c, --complement: complement of the regions of a bed file

-b, --build=N: build of the input file ( only used for complement )

-i, --interSeg: Return only overlapping segments of 2 input bed file

-a, --interAll: Return whole regions from the 1st file, which overlap.

-m, --minSize=N: minimum size of overlapping

-o, --unionMerge: Merge any overlapping regions of 2 bed files

-l, --unionLists: Lists all the original regions of 2 bed files

-r, --restrict: Restrict region size by minSize and maxSize

-x, --maxSize=N: maximum size of the region, only for -restrict

-j, --joinLists: Join two regions from two input files side by side.

-d, --covDensity: Coverage density of the region of two queries

-p, --proximity: Find proximity regions between two queries

-U, --upstream=N: Number of bps in upstream

-D, --downstream=N: Number of bps in downstream

-W, --within: Used for proximity

-t, --cluster: Find clusters in one input file

-z, --clusterSize=N: Size of cluster

-N, --numRegion=N: Num of regions in a cluster

-S, --clusterSingle: Clustering return single region

-1, --chromCol=N: chrom column number of the 1st file (default = 0)

-2, --startCol=N: start column number of the 1st file (default = 1)

-3, --stopCol=N: stop column number of the 1st file (default = 2)

-4, --<<nwwl(strandCol2)>>=N: strand col num of 2nd file (proximity only, default=5)

-5, --<<nwwl(chromCol2)>>=N: chrom column number of the 2nd file (default = 0)

-6, --<<nwwl(startCol2)>>=N: start column number of the 2nd file (default = 1)

-7, --<<nwwl(stopCol2)>>=N: stop column number of the 2nd file (default = 2)

-C, --chrom=N: Restrict to one chromsome

### Example:

galaxyOps.py knowGenes.bed exons.bed -s > introns.bed

Find subregions in file knowGenes.bed, that don't overlap with file exons.bed, and redirect the result to file introns.bed

