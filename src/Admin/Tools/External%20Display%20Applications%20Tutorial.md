 

# Displaying Datasets at External Display Applications / Websites

## About Display Applications

There are many services available that allow users to upload their own data for use as viewing as e.g. 'custom tracks' in a genome browser. Examples of these include the <<nwwl(UCSC)>> genome browser, <<nwwl(GeneTrack)>> and [GBrowse](http://gmod.org/wiki/GBrowse). Adding a new external display applications requires two steps:

1. define the display application (create a new XML definition file) and 
2. instruct Galaxy to load the display application (edit datatypes\_conf.xml with the location of the new XML file). 

* * *

## Citation

If you add a new external display application to Galaxy in your published work, please cite: Blankenberg D, et al. _In preparation_.

* * *

## Topics

1. Basic Topics - Simple Display Applications 
2. Advanced Topics - Dynamic Display Applications 

* * *

## Basic Topics

### Simple Display Applications

Display applications are defined using XML.

#### Example 1

Lets suppose we want to write a display application which displays a BAM file at the <<nwwl(UCSC)>> genome browser. After familiarizing ourselves with the <<nwwl(UCSC)>> genome browser, we become aware of several pieces of information which are needed to display user data:

- The data to be displayed is provided by giving a public URL to the <<nwwl(UCSC)>> genome browser. 
- 3 data files are needed to be provided by URL: 1) a custom track definition, 2) the BAM file and 3) the BAM index. With the following requirement: the index must have the same name as the BAM file, but have the additional suffix of '.bai' 
- The url to send data to <<nwwl(UCSC)>> is of the form: <tt> http://genome.ucsc.edu/cgi-bin/hgTracks?db=UCSC_GENOME_BUILD&amp;hgt.customText=URL_OF_CUSTOM_TRACK </tt> 

This display application will require 3 parameters, corresponding to the 3 data files that are needed.

1. The custom track file is defined by a dynamically generated template-style parameter. It is referred to as 'track', and is available at [http://some/url/path/track](http://some/url/path/track). The contents of this file are created by replacing the '$' placeholders with the values indicated. 
2. The BAM file, the actual dataset being used for the display, is internally referred to as 'bam\_file', but will be available as [http://some/url/path/galaxy.bam](http://some/url/path/galaxy.bam) 
3. The index file, which is available as a metadata attribute of the BAM file, is internally referred to as 'bai\_file', but will be available as [http://some/url/path/galaxy.bam.bai](http://some/url/path/galaxy.bam.bai) 

This display application can then be defined like this example (<tt>display_applications/ucsc/bam.xml/</tt>):

```
<display id="ucsc_bam" version="1.0.0" name="display at UCSC">
    <link id="main" name="main">
        <url>http://genome.ucsc.edu/cgi-bin/hgTracks?db=${qp($bam_file.dbkey)}&amp;hgt.customText=${qp($track.url)}</url>
        <param type="data" name="bam_file" url="galaxy.bam" />
        <param type="data" name="bai_file" url="galaxy.bam.bai" metadata="bam_index" /><!-- UCSC expects index file to exist as bam_file_name.bai -->
        <param type="template" name="track" viewable="True">track type=bam name="${bam_file.name}" bigDataUrl=${bam_file.url} db=${bam_file.dbkey}</param>
    </link>
</display>
```

To instruct Galaxy to use this display app, we modify <tt> datatypes_conf.xml </tt> and add the following to the BAM datatype:

```
<datatype extension="bam" type="galaxy.datatypes.binary:Bam" mimetype="application/octet-stream" display_in_upload="true">
            <display file="ucsc/bam.xml" />
        </datatype>
```

_where our xml file was saved as /display\_applications/ucsc/bam.xml_

#### Example 2

Now lets create a display application that can view interval (BED-like) files at the <<nwwl(UCSC)>> genome browser. The <<nwwl(UCSC)>> genome browser natively handles BED files, but Galaxy allows a looser definition for BED files than that accepted at <<nwwl(UCSC)>>, so we have defined a new datatype called 'bedstrict' that has data that meets the strict definition of BED. To enable all types of intervals to be viewed at <<nwwl(UCSC)>>, we have created an interval to bedstrict datatype converter and defined it in the usual manner (<<nwwl(LINK)>> TO <<nwwl(THIS)>> <<nwwl(DOCUMENTATION)>>).

Items needed for this display:

- The data to be displayed is provided by giving a public URL to the <<nwwl(UCSC)>> genome browser. 
- 1 data file is needed to be provided by URL: 1) the result of converting the interval file to bedstrict 
- The url to send data to <<nwwl(UCSC)>> is of the form: <tt> http://genome.ucsc.edu/cgi-bin/hgTracks?db=UCSC_GENOME_BUILD&amp;position=CHR:START-END&amp;hgt.customText=URL_OF_STRICTBED_FILE </tt> 

This display application requires 2 parameters:

1. The interval file converted to bestrict, named 'bed\_file', to be availabe as [http://some/url/path/galaxy.bed](http://some/url/path/galaxy.bed) 
2. The 'position' (viewport) in the form of CHR:<<nwwl(START)>>-END. This is calculated by looking at the first 10 lines of the bed file. This is not available as a URL (viewable is not set to True); but is instead substituted in as part of the URL that users are directed to for display. 
```
<display id="ucsc_interval_as_bed" version="1.0.0" name="display at UCSC">
    <link id="main" name="main">
        <url>http://genome.ucsc.edu/cgi-bin/hgTracks?db=${qp($bed_file.dbkey)}&amp;position=${position.qp}&amp;hgt.customText=${bed_file.qp}</url>
        <param type="data" name="bed_file" url="galaxy.bed" format="bedstrict"/> <!-- Galaxy allows BED files to contain non-standard fields beyond the first 3 columns, UCSC does not: force use of converter which will make strict BED6+ file -->
        <param type="template" name="position" strip="True" >
#set line_count = 0
#set chrom = None
#set start = float( 'inf' )
#set end = 0
#for $line in open( $bed_file.file_name ):
    #if $line_count &gt; 10: ##10 max lines to check for view port
        #break
    #end if
    #if not $line.startswith( "#" ):
        #set $fields = $line.split( "\t" )
        #try:
            #if len( $fields ) &gt;= max( $bed_file.metadata.startCol, $bed_file.metadata.endCol, $bed_file.metadata.chromCol ):
                #if $chrom is None or $fields[$bed_file.metadata.chromCol - 1] == $chrom:
                    #set chrom = $fields[$bed_file.metadata.chromCol - 1]
                    #set start = min( $start, int( $fields[$bed_file.metadata.startCol - 1] ) )
                    #set end = max( $end, int( $fields[$bed_file.metadata.endCol - 1] ) )
                #end if
            #end if
        #except:
            #pass
        #end try
    #end if
    #set line_count += 1
#end for
#if $chrom is not None:
${chrom}:${start}-${end + 1}
#else:
:-
#end if
        </param>
    </link>
</display>
```

_where the 'strip' attribute of 'position' indicates that whitespace should be removed from around the determined position before being substituted into the URL. This can also be accomplished using ordinary string operations like: <tt>position=${qp(str( position).strip())} </tt>. 'qp' is a shortcut to 'quote\_plus' which escapes text for use as part of a URL_

To instruct Galaxy to use this display app, we modify <tt> datatypes_conf.xml </tt> and add the following to the interval datatype:

```
<datatype extension="interval" type="galaxy.datatypes.interval:Interval" display_in_upload="true">
            <converter file="interval_to_bedstrict_converter.xml" target_datatype="bedstrict"/>
            <display file="ucsc/interval_as_bed.xml" inherit="True" />
        </datatype>
```

_where our xml file was saved as /display\_applications/ucsc/interval\_as\_bed.xml and inherit is set to True, so that datatypes subclassing interval (e.g. bed, bedstrict) also have the display application available_

#### Example 3

Create a display application that can view interval (BED-like) files at <<nwwl(GeneTrack)>>. <<nwwl(GeneTrack)>> is a browser/peakcalling program that is a server distinct from Galaxy, but which is able to directly access the file system used for storing Galaxy datasets; this direct file system access requires individual Galaxy instances to have a (local) instance of <<nwwl(GeneTrack)>> installed.

Items needed for this display:

- 1 data file is needed to be provided: 1) A <<nwwl(GeneTrack)>> index binary datatype 
- The data to be displayed is provided by giving an encoded filename to the <<nwwl(GeneTrack)>> server, which has access to the appropriate filesystem. 
- A Hashkey, used as an identity check by <<nwwl(GeneTrack)>> 
- <<nwwl(GeneTrack)>> is able to launch peakcalling jobs at Galaxy and so also requires the dataset id and the Galaxy URL used to run jobs 
- The url to send data to <<nwwl(GeneTrack)>> is of the form: <tt> http://genetrack.g2.bx.psu.edu/galaxy?filename=ENCODED_FILENAME&amp;hashkey=HASHKEY&amp;input=DATASET_ID&amp;GALAXY_URL=POST_BACK_URL </tt> 

This display application requires 5 parameters:

1. The interval file converted to bed or genetrack format, named 'bed\_file' 
2. The bed or genetrack file converted to <<nwwl(GeneTrack)>> format, named 'genetrack\_file' 
3. 'galaxy\_url' containing the url that <<nwwl(GeneTrack)>> posts back to for calling peaks. 
4. 'hash\_key' used as a verification check by <<nwwl(GeneTrack)>> 
5. 'encoded\_filename' containing the filesystem location to the 'genetrack\_file', which has been encoded using binascii.hexlify 
```
<display id="genetrack_interval" version="1.0.0" name="view in">
    <link id="genetrack" name="GeneTrack">
        <url target_frame="galaxy_main">http://genetrack.g2.bx.psu.edu/galaxy?filename=${encoded_filename.qp}&amp;hashkey=${hash_key.qp}&amp;input=${qp(str($genetrack_file.id))}&amp;GALAXY_URL=${galaxy_url.qp}</url>
        <param type="data" name="bed_file" viewable="False" format="bed,genetrack"/> <!-- for now, we'll explicitly take care of the multi-step conversion; walk genetrack datatype down as a conversion of genetrack to genetrack doesn't exist and would likely be pointless -->
        <param type="data" dataset="bed_file" name="genetrack_file" format="genetrack" viewable="False" />
        <param type="template" name="galaxy_url" strip="True" >
            ${BASE_URL}/tool_runner?tool_id=predict2genetrack
        </param>
        <param type="template" name="hash_key" strip="True" >
            #from galaxy.util.hash_util import hmac_new
            ${hmac_new( $APP.config.tool_secret, $genetrack_file.file_name )}
        </param>
        <param type="template" name="encoded_filename" strip="True" >
            #import binascii
            ${binascii.hexlify( $genetrack_file.file_name )}
        </param>
    </link>
</display>
```

_where '<<nwwl(BASE\_URL)>>', 'APP' and qp are built-in parameters available to display applications_

To instruct Galaxy to use this display app, we modify <tt> datatypes_conf.xml </tt> and add the following to the interval datatype:

```
<datatype extension="interval" type="galaxy.datatypes.interval:Interval" display_in_upload="true">
            <converter file="interval_to_bed_converter.xml" target_datatype="bed"/>
            <display file="genetrack.xml" inherit="True"/>
        </datatype>
```

_where our xml file was saved as /display\_applications/genetrack.xml and inherit is set to True, so that datatypes subclassing interval (e.g. bed, bedstrict) also have the display application available. Note that a BED to <<nwwl(GeneTrack)>> Converter has been defined for the BED datatype and is used to create the <<nwwl(GeneTrack)>> file to be displayed_

* * *

## Advanced Topics

### Dynamic Display Applications

Sometimes it can be desired to have links and parameters for a Display Application to come from an external file. In the following examples we will modify the above examples to be populated using data found in external files.

The file <tt>tool-data/shared/ucsc/ucsc_build_sites.txt</tt> contains tab delimited data, with one line per display site, consisting of columns:

1. Site Name 
2. Site URL 
3. Comma-separated Genome Builds Available at this site 

The display will also be filtered based upon a Galaxy Application configuration variable <tt>ucsc_display_sites</tt> which is used to to restrict available sites to a list specified in universe\_wsgi.ini; alternatively the non-desired sites can be removed by commenting or deleting them out in <tt>tool-data/shared/ucsc/ucsc_build_sites.txt</tt>.

#### Example 1 Advanced

Display a BAM file at the <<nwwl(UCSC)>> genome browser, dynamically loading sites from a text file (<tt>tool-data/shared/ucsc/ucsc_build_sites.txt</tt>).

```
<display id="ucsc_bam" version="1.0.0" name="display at UCSC">
    <!-- Load links from file: one line to one link -->
    <dynamic_links from_file="tool-data/shared/ucsc/ucsc_build_sites.txt" skip_startswith="#" id="0" name="0">


        <!-- Define parameters by column from file, allow splitting on builds -->
        <dynamic_param name="site_id" value="0"/>
        <dynamic_param name="ucsc_link" value="1"/>
        <dynamic_param name="builds" value="2" split="True" separator="," />


        <!-- Filter out some of the links based upon matching site_id to a Galaxy application configuration parameter and by dataset dbkey -->
        <filter>${site_id in $APP.config.ucsc_display_sites}</filter>
        <filter>${dataset.dbkey in $builds}</filter>


        <!-- We define url and params as normal, but values defined in dynamic_param are available by specified name -->
        <url>${ucsc_link}db=${qp($bam_file.dbkey)}&amp;hgt.customText=${qp($track.url)}</url>
        <param type="data" name="bam_file" url="galaxy_${DATASET_HASH}.bam" />
        <param type="data" name="bai_file" url="galaxy_${DATASET_HASH}.bam.bai" metadata="bam_index" /><!-- UCSC expects index file to exist as bam_file_name.bai -->
        <param type="template" name="track" viewable="True">track type=bam name="${bam_file.name}" bigDataUrl=${bam_file.url} db=${bam_file.dbkey}</param>


    </dynamic_links>
</display>
```

#### Example 2 Advanced

Display an Interval file at the <<nwwl(UCSC)>> genome browser, dynamically loading sites from a text file (<tt>tool-data/shared/ucsc/ucsc_build_sites.txt</tt>).

```
<display id="ucsc_interval_as_bed" version="1.0.0" name="display at UCSC" inherit="True">
    <!-- Load links from file: one line to one link -->
    <dynamic_links from_file="tool-data/shared/ucsc/ucsc_build_sites.txt" skip_startswith="#" id="0" name="0">


        <!-- Define parameters by column from file, allow splitting on builds -->
        <dynamic_param name="site_id" value="0"/>
        <dynamic_param name="ucsc_link" value="1"/>
        <dynamic_param name="builds" value="2" split="True" separator="," />


        <!-- Filter out some of the links based upon matching site_id to a Galaxy application configuration parameter and by dataset dbkey -->
        <filter>${site_id in $APP.config.ucsc_display_sites}</filter>
        <filter>${dataset.dbkey in $builds}</filter>


        <!-- We define url and params as normal, but values defined in dynamic_param are available by specified name -->
        <url>${ucsc_link}db=${qp($bed_file.dbkey)}&amp;position=${position.qp}&amp;hgt.customText=${bed_file.qp}</url>
        <param type="data" name="bed_file" url="galaxy_${DATASET_HASH}.bed" format="bedstrict"/> <!-- Galaxy allows BED files to contain non-standard fields beyond the first 3 columns, UCSC does not: force use of converter which will make strict BED6+ file -->
        <param type="template" name="position" strip="True" >
#set line_count = 0
#set chrom = None
#set start = float( 'inf' )
#set end = 0
#for $line in open( $bed_file.file_name ):
    #if $line_count &gt; 10: ##10 max lines to check for view port
        #break
    #end if
    #if not $line.startswith( "#" ):
        #set $fields = $line.split( "\t" )
        #try:
            #if len( $fields ) &gt;= max( $bed_file.metadata.startCol, $bed_file.metadata.endCol, $bed_file.metadata.chromCol ):
                #if $chrom is None or $fields[$bed_file.metadata.chromCol - 1] == $chrom:
                    #set chrom = $fields[$bed_file.metadata.chromCol - 1]
                    #set start = min( $start, int( $fields[$bed_file.metadata.startCol - 1] ) )
                    #set end = max( $end, int( $fields[$bed_file.metadata.endCol - 1] ) )
                #end if
            #end if
        #except:
            #pass
        #end try
    #end if
    #set line_count += 1
#end for
#if $chrom is not None:
${chrom}:${start}-${end + 1}
#else:
:-
#end if
        </param>
    </dynamic_links>
</display>
```
