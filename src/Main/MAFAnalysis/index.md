# Galaxy tools for the analysis of multiple alignments

For the latest information on the MAF tool suite please see: http://usegalaxy.org/u/dan/p/maf

If you use these tools in your research, please cite:
Blankenberg D, Taylor J, Nekrutenko A, The Galaxy Team. "[Making whole genome multiple alignments usable for biologists](http://www.ncbi.nlm.nih.gov/pubmed/21775304)." *Bioinformatics*. 2011 Jul 19.

## About the Alignments

Whole genome alignments, even those produced by "*quasi-global*" algorithms, are inevitably fragmented owing to the complex evolutionary history of genomic DNA and karyotypes, which involves duplications, deletions, insertions and other rearrangements. These alignments also tend to be extremely large.  To allow biologists to easily and efficiently manipulate multiple species whole genome alignments, they are stored locally at the Galaxy site, in a compressed form, and indexed.  The majority of alignments are produced using Penn State's [multiZ](http://www.bx.psu.edu/miller_lab/) (for more information on multiZ [click here](http://bio.cse.psu.edu/dist/tba.pdf)) aligner run on the computational facilities of [The UC Santa Cruz Genome Biology Group](http://genome.ucsc.edu/) led by Jim Kent.  Tools for handling multiple alignments described here are written by Dan Blankenberg and based on the [bx-python](http://bx-python.trac.bx.psu.edu/) package developed by James Taylor. 
---
## Tools and Categories

[Format Converters](/Main/MAF Analysis#format-converters)

[Alignment Extractors](/Main/MAF Analysis#alignment-extractors)

[Alignment Stitchers](/Main/MAF Analysis#alignment-stitchers)

[Filters and Utilities](/Main/MAF Analysis#filters-and-utilities)
---
For a list of data available through Galaxy, see [Available Data](/Main/DataLibraries/Available Data).
---
## Format Converters

These tools convert MAF formatted files to FASTA and offer the ability to restrict alignments to a subset of species. This is useful for performing further analysis with practically all currently available genomic tools.

Available Output Types:
* **Multiple Blocks** - create one FASTA alignment block per provided MAF Block; blocks missing a desired species can be kept or discarded
* **One Sequence per Species** - create one sequence per species, where all MAF blocks are concatenated in the order and strand in which they appear in the selected source MAF; desired species missing from a particular block will have their sequence padded with gaps

![](/Main/MAFAnalysis/maf_to_fasta.png)
---
## Alignment Extractors

Extractors take genomic intervals as the input and return pairwise or multiple alignments corresponding to these intervals as illustrated below. Users can use locally stored ([cached](/Main/DataLibraries/Available Data)) alignments, or alignments from their history as the MAF source.  Here, three MAF blocks overlapping a single interval are extracted.  MAF blocks are output relative to the strand of the provided interval, where the default is '+'.  Blocks 1 and 3 are trimmed because they extend beyond the boundaries of the interval:

![](/Main/MAFAnalysis/interval2maf.png)

*Currently there are two types of extractors that may be merged into a single tool in the future:*
* **Extract Pairwise MAF blocks given a set of genomic intervals** - takes a series of genomic intervals and extracts __pairwise__ alignments from a large selection of locally cached MAF files.
* **Extract MAF blocks given a set of genomic intervals** - takes a series of genomic intervals and extracts __multiple__ alignments from a large selection of locally cached MAF files or from alignments in the user's history.
---
## Alignment Stitchers

Multiple genome alignments consist of a very large number of relatively short blocks. This is why extractors (described in the previous category) typically return multiple MAF blocks per interval. In many cases, however, it is desirable to join (stitch) these multiple alignments together into a single continuous one.  This is the purpose of this category of tools. The figure below shows a genomic interval overlapping four blocks.  Stitching these together returns a single alignment (in FASTA format) where the void between blocks (2,3) and blocks (3,4) is filled with gaps:

![](/Main/MAFAnalysis/maf_stitch.png)

*Currently there are two tools that perform this operation each able to use cached or user-supplied alignments:*

* **Stitch MAF blocks given a set of genomic intervals** - creates one FASTA alignment block for each supplied interval
* **Stitch Gene blocks given a set of coding exon intervals** - creates one FASTA alignment block for each supplied gene (requires a gene (12 column) BED file), where each exon interval is processed as above, and then concatenated together

The FASTA output is relative to the genome of the input interval; positions that do not exist in this genome are not included. Overlapping blocks are split at the edges of their intersections, and the block fragment with the highest original score is used. Users can also select which species to include in their output.
---
## Filters and Utilities

* **MAF coverage statistics** - computes the coverage of a genomic interval by a specified alignment; if a column does not exist in the reference genome, it is not included in the output.
  
  Consider the interval: "chrX 1000 1100 myInterval"
  Let's suppose we want to do stats on three way alignments for H, M, and R. The result look like this:
  
    chrX 1000 1100 myInterval H XXX YYY 
    
    chrX 1000 1100 myInterval M XXX YYY 
    
    chrX 1000 1100 myInterval R XXX YYY 
      
  
     where XXX and YYY are:

        XXX = number of nucleotides
     
        YYY = number of gaps
    
  Alternatively, you can request only summary information for a set of intervals:
  
  
<table>
  <tr>
    <td> #species </td>
    <td> nucleotides </td>
    <td> coverage</td>
  </tr>
  <tr>
    <td> hg18      </td>
    <td> 30639    </td>
    <td> 0.2372</td>
  </tr>
  <tr>
    <td> rheMac2   </td>
    <td> 7524     </td>
    <td> 0.0582</td>
  </tr>
  <tr>
    <td> panTro2   </td>
    <td> 30390    </td>
    <td> 0.2353</td>
  </tr>
</table>

  
     where **coverage** is the number of nucleotides divided by the total length of the provided intervals.

* **Filter MAF blocks by Species** - restricts alignments to a subset of species
![](/Main/MAFAnalysis/filter_by_species.png)

  Users can choose to keep or discard (1) blocks which are missing a desired species and (2) blocks which contain only one species.

* **Filter MAF blocks by Size** - restricts alignments to a specified size range
![](/Main/MAFAnalysis/maf_filter_by_size.png)

* **Join MAF blocks by Species** - Merges MAF blocks which are adjoining in each specified species from a MAF file. Columns which contain only gaps are removed. Species which are not desired are removed from the output.
![](/Main/MAFAnalysis/join_by_species.png)

* **Extract MAF by block number** - extracts specific MAF blocks by their number in the dataset; block indexes start at 0
![](/Main/MAFAnalysis/maf_by_block_number.png)

* **Reverse complement a MAF file** - computes the reverse complement for all blocks in an alignment
  
This MAF Block:
```
a score=8157.000000
s hg17.chr7    127471526 58 + 158628139 AATTTGTGGTTTATTCATTTTTCATTATTTTGTTTAAGGAGGTCTATAGTGGAAGAGG
s panTro1.chr6 129885407 58 + 161576975 AATTTGTGGTTTATTCGTTTTTCATTATTTTGTTTAAGGAGGTCTATAGTGGAAGAGG
s mm5.chr6      28904928 54 + 149721531 AA----CGTTTCATTGATTGCTCATCATTTAAAAAAAGAAATTCCTCAGTGGAAGAGG
```

becomes:
```
a score=8157.000000
s hg17.chr7     31156555 58 - 158628139 CCTCTTCCACTATAGACCTCCTTAAACAAAATAATGAAAAATGAATAAACCACAAATT
s panTro1.chr6  31691510 58 - 161576975 CCTCTTCCACTATAGACCTCCTTAAACAAAATAATGAAAAACGAATAAACCACAAATT
s mm5.chr6     120816549 54 - 149721531 CCTCTTCCACTGAGGAATTTCTTTTTTTAAATGATGAGCAATCAATGAAACG----TT
```

