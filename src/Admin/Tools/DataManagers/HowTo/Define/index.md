---
autotoc: true
---

#language en
# Defining Data Managers
This page describes how to define a Data Manager.

---



---

# Data Manager Components

Data Managers are composed of two components:
* Data Manager configuration (e.g. *data_manager_conf.xml*)
* Data Manager Tool

## Data Manager Configuration
The Data Manager Configuration (e.g. *data_manager_conf.xml*) defines the set of available Data Managers using an [XML description](/Admin/Tools/DataManagers/DataManagerXMLSyntax). Each Data Manager can add entries to one or more [Tool Data Tables](/Admin/Tools/Data Tables). For each Tool Data Table under consideration, the expected output entry columns, and how to handle the Data Manager Tool results, are defined. 

## Data Manager Tool
A Data Manager Tool is a special class of [Galaxy Tool](/Admin/Tools/Adding Tools). Data Manager Tools do not appear in the standard Tool Panel and can only be accessed by a Galaxy Administrator. Additionally, the initial content of a Data Manager's output file contains a JSON dictionary with a listing of the Tool parameters and Job settings (i.e. they are a type of OutputParameterJSONTool, this is also available for DataSourceTools). There is no requirement for the underlying Data Manager tool to make use of these contents, but they are provided as a handy way to transfer all of the tool and job parameters without requiring a different command-line argument for each necessary piece of information.

The primary difference between a standard Galaxy Tool and a Data Manager Tool is that the primary output dataset of a Data Manager Tool **must** be a file containing a JSON description of the new entries to add to a Tool Data Table. The on-disk content to be referenced by the Data Manager Tool, if any, is stored within the *extra_files_path* of the output dataset created by the tool.

---

# Data Manager Server Configuration Options
In your "[galaxy.ini](https://github.com/galaxyproject/galaxy/blob/dev/config/galaxy.ini.sample)" file these settings exist in the `[app:main]` section:
```python
# Data manager configuration options
enable_data_manager_user_view = True
data_manager_config_file = data_manager_conf.xml 
shed_data_manager_config_file = shed_data_manager_conf.xml 
galaxy_data_manager_data_path = tool-data
```

Where *enable_data_manager_user_view* allows non-admin users to view the available data that has been managed.  

Where *data_manager_config_file* defines the local xml file to use for loading the configurations of locally defined data managers.  

Where *shed_data_manager_config_file* defines the local xml file to use for saving and loading the configurations of locally defined data managers.

Where *galaxy_data_manager_data_path* defines the location to use for storing the files created by Data Managers. When not configured it defaults to the value of *tool_data_path*.

# An example single entry data_manager_config_file
```xml
<?xml version="1.0"?>
<data_managers> <!-- The root element -->
    <data_manager tool_file="data_manager/fetch_genome_all_fasta.xml" id="fetch_genome_all_fasta"> <data_managers> <!-- Defines a single Data Manager Tool that can update one or more Data Tables -->
        <data_table name="all_fasta"> <!-- Defines a Data Table to be modified. -->
            <output> <!-- Handle the output of the Data Manager Tool -->
                <column name="value" /> <!-- columns that are going to be specified by the Data Manager Tool -->
                <column name="dbkey" />
                <column name="name" />
                <column name="path" output_ref="out_file" >  <!-- The value of this column will be modified based upon data in "out_file". example value "phiX.fa" -->
                    <move type="file"> <!-- Moving a file from the extra files path of "out_file" -->
                        <source>${path}</source> <!-- File name within the extra files path -->
                        <target base="${GALAXY_DATA_MANAGER_DATA_PATH}">${dbkey}/seq/${path}</target> <!-- Target Location to store the file, directories are created as needed -->
                    </move>
                    <value_translation>${GALAXY_DATA_MANAGER_DATA_PATH}/${dbkey}/seq/${path}</value_translation> <!-- Store this value in the final Data Table -->
                </column>
            </output>
        </data_table>
        <!-- additional data_tables can be configured from a single Data Manager -->
    </data_manager>
</<data_managers>>
```



## An example data_manager/fetch_genome_all_fasta.xml
This Tool Config calls a python script *data_manager_fetch_genome_all_fasta.py* and provides a single file *out_file* and the description from the dbkey dropdown menu for input.

The starting contents of out_file contain information from Galaxy about the tool, including input parameter values, in the JSON format. Data Manager tools are expected to be able to parse this file. The Data Manager tool will also put the return output values for its results in this file; additional files to be moved can be placed in the *extra_files_path* of *out_file*.

```xml
<tool id="data_manager_fetch_genome_all_fasta" name="Reference Genome" version="0.0.1" tool_type="manage_data">
    <description>fetching</description>
    <command interpreter="python">data_manager_fetch_genome_all_fasta.py "${out_file}" --dbkey_description ${ dbkey.get_display_text() }</command>
    <inputs>
        <param name="dbkey" type="genomebuild" label="DBKEY to assign to data" />
        <param type="text" name="sequence_name" value="" label="Name of sequence" />
        <param type="text" name="sequence_desc" value="" label="Description of sequence" />
        <param type="text" name="sequence_id" value="" label="ID for sequence" />
        <conditional name="reference_source">
          <param name="reference_source_selector" type="select" label="Choose the source for the reference genome">
            <option value="ucsc">UCSC</option>
            <option value="ncbi">NCBI</option>
            <option value="url">URL</option>
            <option value="history">History</option>
            <option value="directory">Directory on Server</option>
          </param>
          <when value="ucsc">
            <param type="text" name="requested_dbkey" value="" label="UCSC's DBKEY for source FASTA" optional="False" />
          </when>
          <when value="ncbi">
            <param type="text" name="requested_identifier" value="" label="NCBI identifier" optional="False" />
          </when>
          <when value="url">
            <param type="text" area="True" name="user_url" value="http://" label="URLs" optional="False" />
          </when>
          <when value="history">
            <param name="input_fasta" type="data" format="fasta" label="FASTA File" multiple="False" optional="False" />
          </when>
          <when value="directory">
            <param type="text" name="fasta_filename" value="" label="Full path to FASTA File on disk" optional="False" />
            <param type="boolean" name="create_symlink" truevalue="create_symlink" falsevalue="copy_file" label="Create symlink to orignal data instead of copying" checked="False" />
          </when>
        </conditional>
    </inputs>
    <outputs>
        <data name="out_file" format="data_manager_json"/>
    </outputs>
    <!-- 
    <tests>
        <test>
            DON'T FORGET TO DEFINE SOME TOOL TESTS
        </test>
    </tests>
    -->
    <help>
**What it does**

Fetches a reference genome from various sources (UCSC, NCBI, URL, Galaxy History, or a server directory) and populates the "all_fasta" data table.

------



.. class:: infomark

**Notice:** If you leave name, description, or id blank, it will be generated automatically. 

    </help>
</tool>

```
 

## An example data_manager_fetch_genome_all_fasta.py

```python
#!/usr/bin/env python
#Dan Blankenberg

import sys
import os
import tempfile
import shutil
import optparse
import urllib2
from ftplib import FTP
import tarfile

from galaxy.util.json import from_json_string, to_json_string


CHUNK_SIZE = 2**20 #1mb

def cleanup_before_exit( tmp_dir ):
    if tmp_dir and os.path.exists( tmp_dir ):
        shutil.rmtree( tmp_dir )

def stop_err(msg):
    sys.stderr.write(msg)
    sys.exit(1)
    
def get_dbkey_id_name( params, dbkey_description=None):
    dbkey = params['param_dict']['dbkey']
    #TODO: ensure sequence_id is unique and does not already appear in location file
    sequence_id = params['param_dict']['sequence_id']
    if not sequence_id:
        sequence_id = dbkey #uuid.uuid4() generate and use an uuid instead?
    
    sequence_name = params['param_dict']['sequence_name']
    if not sequence_name:
        sequence_name = dbkey_description
        if not sequence_name:
            sequence_name = dbkey
    return dbkey, sequence_id, sequence_name

def download_from_ucsc( data_manager_dict, params, target_directory, dbkey, sequence_id, sequence_name ):
    UCSC_FTP_SERVER = 'hgdownload.cse.ucsc.edu'
    UCSC_CHROM_FA_FILENAME = 'chromFa.tar.gz' #FIXME: this file is actually variable...
    UCSC_DOWNLOAD_PATH = '/goldenPath/%s/bigZips/' + UCSC_CHROM_FA_FILENAME
    COMPRESSED_EXTENSIONS = [ '.tar.gz', '.tar.bz2', '.zip', '.fa.gz', '.fa.bz2' ]
    
    email = params['param_dict']['</u>user_email__']
    if not email:
        email = 'anonymous@example.com'

    ucsc_dbkey = params['param_dict']['reference_source']['requested_dbkey'] or dbkey
    ftp = FTP( UCSC_FTP_SERVER )
    ftp.login( 'anonymous', email )
    ucsc_file_name = UCSC_DOWNLOAD_PATH % ucsc_dbkey
    
    tmp_dir = tempfile.mkdtemp( prefix='tmp-data-manager-ucsc-' )
    ucsc_fasta_filename = os.path.join( tmp_dir, UCSC_CHROM_FA_FILENAME )
    
    fasta_base_filename = "%s.fa" % sequence_id
    fasta_filename = os.path.join( target_directory, fasta_base_filename )
    fasta_writer = open( fasta_filename, 'wb+' )
    
    tmp_extract_dir = os.path.join ( tmp_dir, 'extracted_fasta' )
    os.mkdir( tmp_extract_dir )
    
    tmp_fasta = open( ucsc_fasta_filename, 'wb+' )
    
    ftp.retrbinary( 'RETR %s' % ucsc_file_name, tmp_fasta.write )
    
    tmp_fasta.seek( 0 )
    fasta_tar = tarfile.open( fileobj=tmp_fasta, mode='r:*' )
    
    fasta_reader = [ fasta_tar.extractfile( member ) for member in fasta_tar.getmembers() ]
    
    data_table_entry = _stream_fasta_to_file( fasta_reader, target_directory, dbkey, sequence_id, sequence_name )
    _add_data_table_entry( data_manager_dict, data_table_entry )
    
    fasta_tar.close()
    tmp_fasta.close()
    cleanup_before_exit( tmp_dir )

def download_from_ncbi( data_manager_dict, params, target_directory, dbkey, sequence_id, sequence_name ):
    NCBI_DOWNLOAD_URL = 'http://togows.dbcls.jp/entry/ncbi-nucleotide/%s.fasta' #FIXME: taken from dave's genome manager...why some japan site?
    
    requested_identifier = params['param_dict']['reference_source']['requested_identifier']
    url = NCBI_DOWNLOAD_URL % requested_identifier
    fasta_reader = urllib2.urlopen( url )
    
    data_table_entry = _stream_fasta_to_file( fasta_reader, target_directory, dbkey, sequence_id, sequence_name )
    _add_data_table_entry( data_manager_dict, data_table_entry )

def download_from_url( data_manager_dict, params, target_directory, dbkey, sequence_id, sequence_name ):
    urls = filter( bool, map( lambda x: x.strip(), params['param_dict']['reference_source']['user_url'].split( '\n' ) ) )
    fasta_reader = [ urllib2.urlopen( url ) for url in urls ]
    
    data_table_entry = _stream_fasta_to_file( fasta_reader, target_directory, dbkey, sequence_id, sequence_name )
    _add_data_table_entry( data_manager_dict, data_table_entry )

def download_from_history( data_manager_dict, params, target_directory, dbkey, sequence_id, sequence_name ):
    #TODO: allow multiple FASTA input files
    input_filename = params['param_dict']['reference_source']['input_fasta']
    if isinstance( input_filename, list ):
        fasta_reader = [ open( filename, 'rb' ) for filename in input_filename ]
    else:
        fasta_reader = open( input_filename )
    
    data_table_entry = _stream_fasta_to_file( fasta_reader, target_directory, dbkey, sequence_id, sequence_name )
    _add_data_table_entry( data_manager_dict, data_table_entry )

def copy_from_directory( data_manager_dict, params, target_directory, dbkey, sequence_id, sequence_name ):
    input_filename = params['param_dict']['reference_source']['fasta_filename']
    create_symlink = params['param_dict']['reference_source']['create_symlink'] == 'create_symlink'
    if create_symlink:
        data_table_entry = _create_symlink( input_filename, target_directory, dbkey, sequence_id, sequence_name )
    else:
        if isinstance( input_filename, list ):
            fasta_reader = [ open( filename, 'rb' ) for filename in input_filename ]
        else:
            fasta_reader = open( input_filename )    
        data_table_entry = _stream_fasta_to_file( fasta_reader, target_directory, dbkey, sequence_id, sequence_name )
    _add_data_table_entry( data_manager_dict, data_table_entry )

def _add_data_table_entry( data_manager_dict, data_table_entry ):
    data_manager_dict['data_tables'] = data_manager_dict.get( 'data_tables', {} )
    data_manager_dict['data_tables']['all_fasta'] = data_manager_dict['data_tables'].get( 'all_fasta', [] )
    data_manager_dict['data_tables']['all_fasta'].append( data_table_entry )
    return data_manager_dict

def _stream_fasta_to_file( fasta_stream, target_directory, dbkey, sequence_id, sequence_name, close_stream=True ):
    fasta_base_filename = "%s.fa" % sequence_id
    fasta_filename = os.path.join( target_directory, fasta_base_filename )
    fasta_writer = open( fasta_filename, 'wb+' )
    
    if isinstance( fasta_stream, list ) and len( fasta_stream ) == 1:
        fasta_stream = fasta_stream[0]
    
    if isinstance( fasta_stream, list ):
        last_char = None
        for fh in fasta_stream:
            if last_char not in [ None, '\n', '\r' ]:
                fasta_writer.write( '\n' )
            while True:
                data = fh.read( CHUNK_SIZE )
                if data:
                    fasta_writer.write( data )
                    last_char = data[-1]
                else:
                    break
            if close_stream:
                fh.close()
    else:
        while True:
            data = fasta_stream.read( CHUNK_SIZE )
            if data:
                fasta_writer.write( data )
            else:
                break
        if close_stream:
            fasta_stream.close()
    
    fasta_writer.close()
    
    return dict( value=sequence_id, dbkey=dbkey, name=sequence_name, path=fasta_base_filename )

def _create_symlink( input_filename, target_directory, dbkey, sequence_id, sequence_name ):
    fasta_base_filename = "%s.fa" % sequence_id
    fasta_filename = os.path.join( target_directory, fasta_base_filename )
    os.symlink( input_filename, fasta_filename )
    return dict( value=sequence_id, dbkey=dbkey, name=sequence_name, path=fasta_base_filename )

REFERENCE_SOURCE_TO_DOWNLOAD = dict( ucsc=download_from_ucsc, ncbi=download_from_ncbi, url=download_from_url, history=download_from_history, directory=copy_from_directory )


def main():
    #Parse Command Line
    parser = optparse.OptionParser()
    parser.add_option( '-d', '--dbkey_description', dest='dbkey_description', action='store', type="string", default=None, help='dbkey_description' )
    (options, args) = parser.parse_args()
    
    filename = args[0]
    
    params = from_json_string( open( filename ).read() )
    target_directory = params[ 'output_data' ][0]['extra_files_path']
    os.mkdir( target_directory )
    data_manager_dict = {}
    
    dbkey, sequence_id, sequence_name = get_dbkey_id_name( params, dbkey_description=options.dbkey_description ) 
    
    if dbkey in [ None, *, '?' ]:
        raise Exception( '"%s" is not a valid dbkey. You must specify a valid dbkey.' % ( dbkey ) )
    
    #Fetch the FASTA
    REFERENCE_SOURCE_TO_DOWNLOAD[ params['param_dict']['reference_source']['reference_source_selector'] ]( data_manager_dict, params, target_directory, dbkey, sequence_id, sequence_name )
    
    #save info to json file
    open( filename, 'wb' ).write( to_json_string( data_manager_dict ) )
        
if __name__ == "<u>main__": main()


```


### Example JSON input to tool, dbkey is sacCer2
```javascript
{
   "param_dict":{
      "</u>datatypes_config__":"/Users/dan/galaxy-central/database/tmp/tmphyQRH3",
      "<u>get_data_table_entry__":"<function get_data_table_entry at 0x10d435b90>",
      "userId":"1",
      "userEmail":"dan@bx.psu.edu",
      "dbkey":"sacCer2",
      "sequence_desc":"",
      "GALAXY_DATA_INDEX_DIR":"/Users/dan/galaxy-central/tool-data",
      "</u>admin_users__":"dan@bx.psu.edu,dan+2@bx.psu.edu",
      "<u>app__":"galaxy.app:UniverseApplication",
      "</u>user_email__":"dan@bx.psu.edu",
      "sequence_name":"",
      "GALAXY_DATATYPES_CONF_FILE":"/Users/dan/galaxy-central/database/tmp/tmphyQRH3",
      "<u>user_name__":"danb",
      "sequence_id":"",
      "reference_source":{
         "reference_source_selector":"ncbi",
         "requested_identifier":"sacCer2",
         "</u>current_case__":"1"
      },
      "<u>new_file_path__":"/Users/dan/galaxy-central/database/tmp",
      "</u>user_id__":"1",
      "out_file":"/Users/dan/galaxy-central/database/files/000/dataset_200.dat",
      "GALAXY_ROOT_DIR":"/Users/dan/galaxy-central",
      "<u>tool_data_path__":"/Users/dan/galaxy-central/tool-data",
      "</u>root_dir__":"/Users/dan/galaxy-central",
      "chromInfo":"/Users/dan/galaxy-central/tool-data/shared/ucsc/chrom/sacCer2.len"
   },
   "output_data":[
      {
         "extra_files_path":"/Users/dan/galaxy-central/database/job_working_directory/000/202/dataset_200_files",
         "file_name":"/Users/dan/galaxy-central/database/files/000/dataset_200.dat",
         "ext":"data_manager_json",
         "out_data_name":"out_file",
         "hda_id":201,
         "dataset_id":200
      }
   ],
   "job_config":{
      "GALAXY_ROOT_DIR":"/Users/dan/galaxy-central",
      "GALAXY_DATATYPES_CONF_FILE":"/Users/dan/galaxy-central/database/tmp/tmphyQRH3",
      "TOOL_PROVIDED_JOB_METADATA_FILE":"galaxy.json"
   }
}
```


### Example JSON Output from tool to galaxy, dbkey is sacCer2
```javascript
{
   "data_tables":{
      "all_fasta":[
         {
            "path":"sacCer2.fa",
            "dbkey":"sacCer2",
            "name":"S. cerevisiae June 2008 (SGD/sacCer2) (sacCer2)",
            "value":"sacCer2"
         }
      ]
   }
}
```


### New Entry in Data Table, dbkey is sacCer2
```text
#<unique_build_id>	<dbkey>		<display_name>	<file_path>
sacCer2	sacCer2	S. cerevisiae June 2008 (SGD/sacCer2) (sacCer2)	/Users/dan/galaxy-central/tool-data/sacCer2/seq/sacCer2.fa
```


---
[/Admin/Tools/DataManagers](/Admin/Tools/DataManagers)
