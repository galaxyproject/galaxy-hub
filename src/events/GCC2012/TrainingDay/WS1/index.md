Slides are available here: [Slides](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2012/WS1_blankenberg_gcc_2012_integrating_tools_and_data_sources.pdf).

maf_slice.py:
```
#!/usr/bin/env python

"""
Modified from interval2maf.py for teaching workshops

Reads a list of intervals and a maf. Produces a new maf containing the
blocks or parts of blocks in the original that overlapped the intervals.

If a MAF file, not UID, is provided the MAF file is indexed before being processed.

NOTE: If two intervals overlap the same block it will be written twice.

usage: %prog maf_file [options]
   -d, --dbkey=d: Database key, ie hg17
   -c, --chromCol=c: Column of Chr
   -s, --startCol=s: Column of Start
   -e, --endCol=e: Column of End
   -S, --strandCol=S: Column of Strand
   -t, --mafType=t: Type of MAF source to use
   -m, --mafFile=m: Path of source MAF file, if not using cached version
   -I, --mafIndex=I: Path of precomputed source MAF file index, if not using cached version
   -i, --interval_file=i:       Input interval file
   -o, --output_file=o:      Output MAF file
   -p, --species=p: Species to include in output
   -P, --split_blocks_by_species=P: Split blocks by species
   -r, --remove_all_gap_columns=r: Remove all Gap columns
   -l, --indexLocation=l: Override default maf_index.loc file
   -z, --mafIndexFile=z: Directory of local maf index file ( maf_index.loc or maf_pairwise.loc )
"""

#Dan Blankenberg
from galaxy import eggs
import pkg_resources; pkg_resources.require( "bx-python" )
from bx.cookbook import doc_optparse
import bx.align.maf
import bx.intervals.io
from galaxy.tools.util import maf_utilities
import sys

assert sys.version_info[:2] >= ( 2, 4 )

def __main__():
    index = index_filename = None
    mincols = 0
    
    #Parse Command Line
    options, args = doc_optparse.parse( __doc__ )
    
    if options.dbkey: dbkey = options.dbkey
    else: dbkey = None
    if dbkey in [None, "?"]:
        maf_utilities.tool_fail( "You must specify a proper build in order to extract alignments. You can specify your genome build by clicking on the pencil icon associated with your interval file." )
    
    species = maf_utilities.parse_species_option( options.species )
    
    if options.chromCol: chromCol = int( options.chromCol ) - 1
    else: 
        chromCol = 0
    
    if options.startCol: startCol = int( options.startCol ) - 1
    else: 
        startCol = 1
    
    if options.endCol: endCol = int( options.endCol ) - 1
    else: 
        endCol = 2
    
    if options.strandCol: strandCol = int( options.strandCol ) - 1
    else: 
        strandCol = -1
    
    if options.interval_file: interval_file = options.interval_file
    else: 
        maf_utilities.tool_fail( "Input interval file has not been specified." )
    
    if options.output_file: output_file = options.output_file
    else: 
        maf_utilities.tool_fail( "Output file has not been specified." )
    
    split_blocks_by_species = remove_all_gap_columns = False
    if options.split_blocks_by_species and options.split_blocks_by_species == 'split_blocks_by_species':
        split_blocks_by_species = True
        if options.remove_all_gap_columns and options.remove_all_gap_columns == 'remove_all_gap_columns':
            remove_all_gap_columns = True
    else:
        remove_all_gap_columns = True
    #Finish parsing command line
    
    #Open indexed access to MAFs
    if options.mafType:
        if options.indexLocation:
            index = maf_utilities.maf_index_by_uid( options.mafType, options.indexLocation )
        else:
            index = maf_utilities.maf_index_by_uid( options.mafType, options.mafIndexFile )
        if index is None:
            maf_utilities.tool_fail( "The MAF source specified (%s) appears to be invalid." % ( options.mafType ) )
    elif options.mafFile:
        index, index_filename = maf_utilities.open_or_build_maf_index( options.mafFile, options.mafIndex, species = [dbkey] )
        if index is None:
            maf_utilities.tool_fail( "Your MAF file appears to be malformed." )
    else:
        maf_utilities.tool_fail( "Desired source MAF type has not been specified." )
    
    #Create MAF writter
    out = bx.align.maf.Writer( open(output_file, "w") )
    
    #Iterate over input regions 
    num_blocks = 0
    num_regions = None
    for num_regions, region in enumerate( bx.intervals.io.NiceReaderWrapper( open( interval_file, 'r' ), chrom_col = chromCol, start_col = startCol, end_col = endCol, strand_col = strandCol, fix_strand = True, return_header = False, return_comments = False ) ):
        src = maf_utilities.src_merge( dbkey, region.chrom )
        for block in index.get_as_iterator( src, region.start, region.end ):
            if split_blocks_by_species:
                blocks = [ new_block for new_block in maf_utilities.iter_blocks_split_by_species( block ) if maf_utilities.component_overlaps_region( new_block.get_component_by_src_start( dbkey ), region ) ]
            else:
                blocks = [ block ]
            for block in blocks:
                block = maf_utilities.chop_block_by_region( block, src, region )
                if block is not None:
                    if species is not None:
                        block = block.limit_to_species( species )
                    block = maf_utilities.orient_block_by_region( block, src, region )
                    if remove_all_gap_columns:
                        block.remove_all_gap_columns()
                    out.write( block )
                    num_blocks += 1
    
    #Close output MAF
    out.close()
    
    #remove index file if created during run
    maf_utilities.remove_temp_index_file( index_filename )
    
    if num_blocks:
        print "%i MAF blocks extracted for %i regions." % ( num_blocks, ( num_regions + 1 ) )
    elif num_regions is not None:
        print "No MAF blocks could be extracted for %i regions." % ( num_regions + 1 )
    else:
        print "No valid regions have been provided."
    
if __name__ == "<u>main__": __main__()

```


tool_conf.xml section:
```
<toolbox>
  <section name="Workshop Demo" id="workshop_demo">
    <tool file="demo/maf_slice.xml" />
  </section>
</toolbox>
```


End of Exercise, adding a basic tool:
```
<tool id="maf_slice" name="Slice MAF" version="1.0.0">
  <description>by intervals</description>
  <command interpreter="python">
maf_slice.py --dbkey=hg17 --mafFile=${maf_input} --interval_file=${interval_input}  --output_file=${maf_output}
   </command>
   <inputs>
    <param format="maf" name="maf_input" label="Choose alignments" type="data"/>
    <param format="bed" name="interval_input" type="data" label="Choose intervals"/>
   </inputs>
   <outputs>
     <data format="maf" name="maf_output"/>
   </outputs>
   <tests>
   </tests>
   <help>
  </help>
</tool>
```


End of Exercise adding metadata elements to tool:
```
<tool id="maf_slice" name="Slice MAF" version="1.0.1">
  <description>by intervals</description>
  <command interpreter="python">
maf_slice.py --dbkey=${interval_input.dbkey} --mafFile=${maf_input} --interval_file=${interval_input}  --output_file=${maf_output}
     --chromCol=${interval_input.metadata.chromCol} --startCol=${interval_input.metadata.startCol} --endCol=${interval_input.metadata.endCol} --strandCol=${interval_input.metadata.strandCol}
     --mafIndex=${maf_input.metadata.maf_index}
   </command>
   <inputs>
    <param format="maf" name="maf_input" label="Choose alignments" type="data"/>
    <param format="interval" name="interval_input" type="data" label="Choose intervals"/>
   </inputs>
   <outputs>
     <data format="maf" name="maf_output"/>
   </outputs>
   <tests>
   </tests>
   <help>
  </help>
</tool>
```


End of Exercise, adding conditional:
```
<tool id="maf_slice" name="Slice MAF" version="1.0.2">
  <description>by intervals</description>
  <command interpreter="python">
maf_slice.py --dbkey=${interval_input.dbkey} --mafFile=${maf_source_type.maf_input} --interval_file=${interval_input}  --output_file=${maf_output}
     --chromCol=${interval_input.metadata.chromCol} --startCol=${interval_input.metadata.startCol} --endCol=${interval_input.metadata.endCol} --strandCol=${interval_input.metadata.strandCol}
     --mafIndex=${maf_source_type.maf_input.metadata.maf_index}
   </command>
   <inputs>
    <param format="interval" name="interval_input" type="data" label="Choose intervals"/>
    <conditional name="maf_source_type">
      <param name="maf_source" type="select" label="MAF Source">
        <option value="cached" selected="true">Locally Cached Alignments</option>
        <option value="user">Alignments in Your History</option>
      </param>
      <when value="user">
        <param format="maf" name="maf_input" label="Choose alignments" type="data"/>
      </when>
      <when value="cached">
        <!-- need some way to access the external data -->
      </when>
    </conditional>
   </inputs>
   <outputs>
     <data format="maf" name="maf_output"/>
   </outputs>
   <tests>
   </tests>
   <help>
  </help>
</tool>
```


End of Exercise, accessing .loc file:
```
<tool id="maf_slice" name="Slice MAF" version="1.0.3">
  <description>by intervals</description>
  <command interpreter="python">
     maf_slice.py --dbkey=${interval_input.dbkey} --interval_file=${interval_input}  --output_file=${maf_output}
     --chromCol=${interval_input.metadata.chromCol} --startCol=${interval_input.metadata.startCol} --endCol=${interval_input.metadata.endCol} --strandCol=${interval_input.metadata.strandCol}
     #if $maf_source_type.maf_source == "user":
         --mafFile=${maf_source_type.maf_input}
         --mafIndex=${maf_source_type.maf_input.metadata.maf_index}
     #else:
         --mafType=$maf_source_type.mafType
         --mafIndexFile=${GALAXY_DATA_INDEX_DIR}/maf_index.loc
     #end if
   </command>
   <inputs>
    <param format="interval" name="interval_input" type="data" label="Choose intervals"/>
    <conditional name="maf_source_type">
      <param name="maf_source" type="select" label="MAF Source">
        <option value="cached" selected="true">Locally Cached Alignments</option>
        <option value="user">Alignments in Your History</option>
      </param>
      <when value="user">
        <param format="maf" name="maf_input" label="Choose alignments" type="data"/>
      </when>
      <when value="cached">
        <param name="mafType" type="select" label="Choose alignments">
          <options from_data_table="indexed_maf_files">
            <filter type="data_meta" ref="interval_input" key="dbkey" column="dbkey" multiple="True" separator=","/>
            <validator type="no_options" message="No alignments are available for the build associated with the selected interval file"/>
          </options>
        </param>
      </when>
    </conditional>
   </inputs>
   <outputs>
     <data format="maf" name="maf_output"/>
   </outputs>
   <tests>
   </tests>
   <help>
  </help>
</tool>
```


End of Exercise, selecting species from metadata values for MAF in history:
```
<tool id="maf_slice" name="Slice MAF" version="1.0.4">
  <description>by intervals</description>
  <command interpreter="python">
     maf_slice.py --dbkey=${interval_input.dbkey} --interval_file=${interval_input}  --output_file=${maf_output}
     --chromCol=${interval_input.metadata.chromCol} --startCol=${interval_input.metadata.startCol} --endCol=${interval_input.metadata.endCol} --strandCol=${interval_input.metadata.strandCol}
     #if $maf_source_type.maf_source == "user":
         --mafFile=${maf_source_type.maf_input}
         --mafIndex=${maf_source_type.maf_input.metadata.maf_index}
         --species=${maf_source_type.species}
     #else:
         --mafType=$maf_source_type.mafType
         --mafIndexFile=${GALAXY_DATA_INDEX_DIR}/maf_index.loc
     #end if
   </command>
   <inputs>
    <param format="interval" name="interval_input" type="data" label="Choose intervals"/>
    <conditional name="maf_source_type">
      <param name="maf_source" type="select" label="MAF Source">
        <option value="cached" selected="true">Locally Cached Alignments</option>
        <option value="user">Alignments in Your History</option>
      </param>
      <when value="user">
        <param format="maf" name="maf_input" label="Choose alignments" type="data"/>
        <param name="species" type="select" display="checkboxes" multiple="true" label="Choose species" help="Select species to be included in the final alignment">
          <options>
            <filter type="data_meta" ref="maf_input" key="species" />
          </options>
        </param>
      </when>
      <when value="cached">
        <param name="mafType" type="select" label="Choose alignments">
          <options from_data_table="indexed_maf_files">
            <filter type="data_meta" ref="interval_input" key="dbkey" column="dbkey" multiple="True" separator=","/>
            <validator type="no_options" message="No alignments are available for the build associated with the selected interval file"/>
          </options>
        </param>
      </when>
    </conditional>
   </inputs>
   <outputs>
     <data format="maf" name="maf_output"/>
   </outputs>
   <tests>
   </tests>
   <help>
  </help>
</tool>
```


End of exercise, selecting species available from .loc file:
```
<tool id="maf_slice" name="Slice MAF" version="1.0.5">
  <description>by intervals</description>
  <command interpreter="python">
     maf_slice.py --dbkey=${interval_input.dbkey} --interval_file=${interval_input}  --output_file=${maf_output}
     --chromCol=${interval_input.metadata.chromCol} --startCol=${interval_input.metadata.startCol} --endCol=${interval_input.metadata.endCol} --strandCol=${interval_input.metadata.strandCol}
     --species=${maf_source_type.species}
     #if $maf_source_type.maf_source == "user":
         --mafFile=${maf_source_type.maf_input}
         --mafIndex=${maf_source_type.maf_input.metadata.maf_index}
     #else:
         --mafType=$maf_source_type.mafType
         --mafIndexFile=${GALAXY_DATA_INDEX_DIR}/maf_index.loc
     #end if
   </command>
   <inputs>
    <param format="interval" name="interval_input" type="data" label="Choose intervals"/>
    <conditional name="maf_source_type">
      <param name="maf_source" type="select" label="MAF Source">
        <option value="cached" selected="true">Locally Cached Alignments</option>
        <option value="user">Alignments in Your History</option>
      </param>
      <when value="user">
        <param format="maf" name="maf_input" label="Choose alignments" type="data"/>
        <param name="species" type="select" display="checkboxes" multiple="true" label="Choose species" help="Select species to be included in the final alignment">
          <options>
            <filter type="data_meta" ref="maf_input" key="species" />
          </options>
        </param>
      </when>
      <when value="cached">
        <param name="mafType" type="select" label="Choose alignments">
          <options from_data_table="indexed_maf_files">
            <filter type="data_meta" ref="interval_input" key="dbkey" column="dbkey" multiple="True" separator=","/>
            <validator type="no_options" message="No alignments are available for the build associated with the selected interval file"/>
          </options>
        </param>
        <param name="species" type="select" display="checkboxes" multiple="true" label="Choose species" help="Select species to be included in the final alignment">
          <options from_data_table="indexed_maf_files">
            <column name="uid" index="1"/>
            <column name="value" index="3"/>
            <column name="name" index="3"/>
            <filter type="param_value" ref="mafType" column="uid"/>
            <filter type="multiple_splitter" column="name" separator=","/>
          </options>
        </param>
      </when>
    </conditional>
   </inputs>
   <outputs>
     <data format="maf" name="maf_output"/>
   </outputs>
   <tests>
   </tests>
   <help>
  </help>
</tool>
```

