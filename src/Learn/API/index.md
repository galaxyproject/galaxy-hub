---
autotoc: true
title: Galaxy Application Programming Interface , (, API, )
---
PLACEHOLDER_INCLUDE(/Learn/LinkBox)

The most current information about using the API can be found here: [/Develop/API](/src/Develop/API/index.md)

Some other API documentation spread around that may get you through the day:

In the source Distribution:
* [scripts/api/README](https://github.com/galaxyproject/galaxy/tree/master/scripts/api/README)
* [scripts/api/workflow_execute.py](https://github.com/galaxyproject/galaxy/tree/master/scripts/api/workflow_execute.py)
* [scripts/api/example_watch_folder.py](https://github.com/galaxyproject/galaxy/tree/master/scripts/api/example_watch_folder.py)

In this wiki:
* [2010/07/16 News Brief](/src/DevNewsBriefs/2010_07_16/index.md#initial-implementation-of-the-galaxy-web-api), initial implementation described
* [2011/08/30 News Brief](/src/DevNewsBriefs/2011_08_30/index.md#api), update
* [GCC2011 Galaxy Deployment and API presentation](/src/Events/GCC2011/index.md)
* [Sample Tracking API](/Admin/Sample Tracking/Next Gen)
* [GCC2011 Workflows and API Breakout Group](/Events/GCC2011/Workflows and API)

External:
* The [Bioblend](http://bioblend.readthedocs.org/en/latest/) package provides an easy way to start using the Galaxy API by providing a set of Python bindings, developed by Galaxy developer [Enis Afgan](/src/EnisAfgan/index.md)

---



In addition to being accessible through a [web interface](/src/Learn/index.md), Galaxy can now also be accessed programmatically, through shell scripts and other programs.  The web interface is appropriate for things like exploratory analysis, visualization, construction of workflows, and rerunning workflows on new datasets.

The web interface is less suitable for things like 
* Connecting a Galaxy instance directly to your sequencer and running workflows whenever data is ready
* Running a workflow against multiple datasets (which can be done with the web interface, but is tedious)
* When the analysis involves complex control, such as looping and branching.

The Galaxy API addresses these and other situations by exposing Galaxy internals through an additional interface, known as an *Applications Programming Interface*, or *API*.  



# Enabling the API

To use the API, you must first generate an *API Key* for the account you want to access Galaxy from.  Using the web interface, login as that user, and then:

<table>
  <tr>
    <td> </em>Navigate<em> to </strong>User &rarr; API Keys<strong>: </td>
    <td> <img src='/Admin/API/UserPullDownAPIKeys.png' /> </td>
  </tr>
  <tr>
    <td> </em>Click<em> on </strong>Generate a new key now<strong>: </td>
    <td> <img src='/Admin/API/GenerateNewAPIKey.png' /> </td>
  </tr>
  <tr>
    <td> And your new API key will be set:<br /><br /></em>Copy<em> the key to your clipboard.  You will need it in the next steps. </td>
    <td> <img src='/Admin/API/NewKeyGenerated.png' /> </td>
  </tr>
</table>


**Please pay attention to the note:**
<div class='red border'>
 Please note that **this key acts as an alternate means to access your account, and should be treated with the same care as your login password.** 
</div>

## Using the API when running Galaxy behind an Apache web server proxy to handle authentication

You have to make sure, the calls are going through the proxy by adding the following lines to the Apache config file
<br />
   ```
    <Location "/api">
        Satisfy Any
        Allow from all
    </Location>
   ```


Replace "/api" with "/api/galaxy" when serving Galaxy at a sub directory (such as /galaxy).

You might need to patch your code: https://github.com/galaxyproject/galaxy/pull/1003 to avoid user failures due to apache null headers.


# REST

## Authentication
You can retrieve your API key by sending [baseauth](http://en.wikipedia.org/wiki/Basic_access_authentication) GET request to /api/authenticate/baseauth

## URLs

### Collections

### Elements

## HTTP Methods, common.py Routines, and Standalone Scripts

HTTP methods correspond to operations in Galaxy.  Operations are implemented as standalone scripts (in [scripts/api/](https://github.com/galaxyproject/galaxy/tree/master/scripts/api/)) and as routines in [scripts/api/common.py](https://github.com/galaxyproject/galaxy/tree/master/scripts/api/common.py).

| HTTP Method |  [common.py](https://github.com/galaxyproject/galaxy/tree/master/scripts/api/common.py) Routine  |  [Standalone](https://github.com/galaxyproject/galaxy/tree/master/scripts/api/)  | 
| ----------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | 
| GET    |  display()  |  [display.py](https://github.com/galaxyproject/galaxy/tree/master/scripts/api/display.py)  | 
| PUT    |  update()   |  [update.py](https://github.com/galaxyproject/galaxy/tree/master/scripts/api/update.py)  | 
| POST   |  submit()   |  [create.py](https://github.com/galaxyproject/galaxy/tree/master/scripts/api/create.py)  | 
| DELETE |  delete()   |  [delete.py](https://github.com/galaxyproject/galaxy/tree/master/scripts/api/delete.py)  | 

## Modules

### Libraries

### Users and Roles

### Sample Tracking

### Forms

### Workflows

From **https://www.biostars.org/p/94305/**

I was looking for a script that runs a Galaxy workflow as a simple command line tool: uploads the file, runs a workflow, downloads the file. Descriptions of this process are scattered through different forums and pretty incomplete. So I wrote a simple script with BioBlend that does that. You need to create a galaxy workflow, add the Input dataset element (the Workflow control at the very bottom of the list of the tools), configure the ids and paths in the script.

```

import sys
import os
from bioblend.galaxy import GalaxyInstance
from bioblend.galaxy.histories import HistoryClient
from bioblend.galaxy.tools import ToolClient
from bioblend.galaxy.workflows import WorkflowClient
from bioblend.galaxy.datasets import DatasetClient

#Execute workflow from the command line.
#Example calls:
#python run_workflow.py input output
#python run_workflow.py '/Users/pro/Documents/sandbox/data/reads/e_coli_1000.fq' '/Users/pro/Documents/sandbox/data/reads/ecoli.bed'

GALAXY_URL = 'http://localhost:8082/'
API_KEY = '1fbb3a586ff63534e6c4536e598c6bee'
WORKFLOW_ID = 'f2db41e1fa331b3e'
TOOL_ID_IN_GALAXY = 'gears_tool'

def findDatasedIdByExtention(datasetClient, output, ext):
    id = *
    for datasetId in output['outputs']:
        dataset = datasetClient.show_dataset(datasetId)
        if dataset['file_ext'] == ext:
            id = datasetId
            break
    return id
def downloadDataset(datasetClient, datasetId, outpath):
    if datasetId != *:
        datasetClient.download_dataset(datasetId, outpath, False, True)
    else:
        print 'Dataset id %s not found. Fail to download dataset to % s.' % (datasetId, outpath)

def main():
    try:
        input_path = sys.argv[1]
        output_path = sys.argv[2]

        galaxyInstance = GalaxyInstance(url = GALAXY_URL, key=API_KEY)
        historyClient = HistoryClient(galaxyInstance)
        toolClient = ToolClient(galaxyInstance)
        workflowClient = WorkflowClient(galaxyInstance)
        datasetClient = DatasetClient(galaxyInstance)

        history = historyClient.create_history('tmp')
        uploadedFile = toolClient.upload_file(input_path, history['id'] )

        workflow = workflowClient.show_workflow(WORKFLOW_ID)
        dataset_map  = {workflow['inputs'].keys()[0]: {'id': uploadedFile['outputs'][0]['id'], 'src': 'hda'}}
        params = {TOOL_ID_IN_GALAXY: {'param': 'reference_genome', 'value': 'hg19'}}
        output = workflowClient.run_workflow(WORKFLOW_ID, dataset_map, params, history['id'])

        downloadDataset(datasetClient, findDatasedIdByExtention(datasetClient, output, 'bed'), output_path)
        #delete history
        historyClient.delete_history(history['id'])
        #if galaxy instance support dataset purging
        #historyClient.delete_history(history['id'], True)

    except IndexError:
        print 'usage: %s key url workflow_id history step=src=dataset_id' % os.path.basename(sys.argv[0])
        sys.exit(1)

if __name__ == '</u>main__':
    main()
```


### Histories


# Examples

See [Examples](Examples)

# Programming Language Bindings

Language specific libraries for interfacing with the Galaxy API are available. 

* The Galaxy code itself contains [JavaScript bindings](https://bitbucket.org/galaxy/galaxy-central/src/tip/static/scripts/mvc).
* [BioBlend](https://github.com/afgane/bioblend) contains a set of Python bindings developed by Galaxy developer [Enis Afgan](/src/EnisAfgan/index.md).
* [blend4j](https://github.com/jmchilton/blend4j) contains Java bindings developed by Galaxy community member [John Chilton](/src/JohnChilton/index.md) and largely modeled after [blend](https://github.com/afgane/blend).
