# Chromosome Identifiers

Return to [Support](/src/support/index.md)

## Reference Genome Contents

```

To learn quickly what the identifiers are in any BAM dataset, do the following:

1. Run BAM-to-SAM on the aligned data outputting just the SAM header. The chromosomes will be listed in the header. Compare these chromosome identifiers between the chromosome (aka "Chrom") field in all other inputs: VCF, GTF, GFF(3), BED, Interval, etc.

```


```

To learn what the identifiers are for any UCSC database, do one of the following:

1. Go to http://genome.ucsc.edu/, navigate to "genomes", then the species of interest. On the home page for the genome build, immediately under the top navigation box, in the blue bar next to the full genome build name, is linked text like "(sequences)". Click on this and it will take you to a detail page with a table listing out the contents.

2. Use the tool "Get Data -> UCSC Main". In the Table Browser, choose the target genome and build. For "group" choose the last option "All Tables". Then under "table" choose "chromInfo". Leave the rest at default and send the output to Galaxy. This table will list out the contents of the genome build, including the chromosome identifiers in the first column.

```


## Adjusting Identifiers

This method will be successful for many Ensembl -> UCSC adjustments, but not all. Confirm that all chromosomes will match after the "chr" is added. If any will not convert with this method, then associated lines will be omitted from the analysis (by some tools) and trigger warnings or errors with others. If all will not convert, then either an alternate input file or a [Custom Reference Genome](/src/support/index.md#custom_reference_genome) with *Ensembl-based chromosome identifiers* should be used for the analysis instead.

```
Example: A BED formatted file with Ensembl-based chromosome identifiers to be used with a tool that makes use of a locally-cashed UCSC-sourced reference genome. The underlying reference genome is otherwise identical.

Add a "chr" to the chromosome name, so that "N" becomes "chrN".

Using tools from the group "Text Manipulation":
1. "Add column" = add "chr" to the original dataset as a new column.
2. "Merge Columns" = merge "c7" with "c1"
3. "Cut" = cut "c8,c2,c3,c4,c5,c6" (replace c1 & c7 - with merged c8 - the new chrom identifier)
4. Click on the pencil icon for the result dataset, then the tab for "Datatype". Assign "bed" and save. Allow the metadata to complete assignment (the "yellow" dataset state).
5. Now click on the tab for "Attributes" and assign the remaining columns. Strand = 6, name = 4, and score = 5. Save. For best results with certain downstream tools, allow the metadata to complete assignment.

```

