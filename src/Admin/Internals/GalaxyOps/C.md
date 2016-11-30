1. format text/creole 

## Galaxy Operations Help Infomation (C Version)

### Name:

galaxyOps - Operations on Genomic Intervals

### Usage:

galaxyOps [[database|file(s) -bed=outFile.bed]]

### Descriptions:

galaxyOps provides a rapid and reliable tool to process the functional data at any scale. It not only includes standard set operations such as union, intersection, subtraction and complement, but also have operations like proximity to regions from another set of data, clustering by distance of regions within a single set of data, join, and coverage density. Operation join is similar to the operation known in the relational algebra of database systems as a "natural join". Coverage density return whole regions from first set that overlap second set, and append two more field at the end of the returned region - the overlapping number of basepairs for each returned region and the percentage of the overlapping for each region of the first set.

### Options:

-bed=output.bed Put intersection into bed format

-minSize=N Minimum size to output (default 1)

-chromCol=N The column number of chrom of the first file

-startCol=N The column number of start point of the first file

-stopCol=N The column number of stop point of the first file

-strandCol=N The column number of strand, only for proximity

-<<nwwl(chromCol2)>>=N The column number of chrom of the second file

-<<nwwl(startCol2)>>=N The column number of start point of the second file

-<<nwwl(stopCol2)>>=N The column number of stop point of the second file

-chrom=chrN Restrict to one chromosome

-or Or tables together instead of anding them

-not Output negation of resulting bit set.

-all And tables, return all fields in the 1st list

-join Join two lists, return all fields in both lists

-covDensity Calculate the coverage density

-unionLists Union return original lists

-restrict Restrict output to minSize and/or maxSize

-maxSize=N Maximum size to output (default -1) only used with -restrict

-proximity Proximity two files, use together with -upstream, -downstream, and -within

-upstream=N Number of bps in upstream

-downstream=N Number of bps in downstream

-within Used for proximity

-subtract Subtraction, use together with -subWhole

-subWhole Subtract whole region, which is overlapped

-cluster Clustering one file, use together with -clusterSize, -numRegion, and -clusterSingle

-clusterSize=N Size of cluster

-numRegion=N Num of regions in a cluster

-clusterSingle Clustering return single region

### Example:

galaxyOps hg17 knowGenes.bed exons.bed -subtract -bed=introns.bed Find subregions in file knowGenes.bed, that don't overlap with file exons.bed, and put the results in bed format file introns.bed

