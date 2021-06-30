---
title: Galaxy API
---
In addition to being accessible through a web interface, Galaxy can also be accessed programmatically, through shell scripts and other programs.  The web interface is appropriate for things like exploratory analysis, visualization, construction of workflows, and rerunning workflows on new datasets.

The web interface is less suitable for things like:

* Connecting a Galaxy instance directly to your sequencer and running workflows whenever data is ready
* Running a workflow against multiple datasets (which can be done with the web interface, but is tedious)
* When the analysis involves complex control, such as looping and branching.

The Galaxy API addresses these and other situations by exposing Galaxy internals through an additional interface, known as an Applications Programming Interface, or API.  

# Enabling

To use the API, you must first generate an API Key for the account you want to access Galaxy from. Please note that this key acts as an alternate means to access your account, and should be treated with the same care as your login password. You can do so in the UI under user preferences (while logged in).

Alternatively You can retrieve your API key by sending [baseauth](http://en.wikipedia.org/wiki/Basic_access_authentication) GET request to `/api/authenticate/baseauth`

# Working with API

* [Quickstart](https://docs.galaxyproject.org/en/latest/api/quickstart.html)
* [API source code documentation](https://docs.galaxyproject.org/en/master/api_doc.html) - Documentation auto-generated for the API source code. The API source code itself can be found [here](https://github.com/galaxyproject/galaxy/tree/dev/lib/galaxy/webapps/galaxy/api) and is by its nature the most up-to-date and complete source of information.
* [The BioBlend documentation](http://bioblend.readthedocs.org/en/latest/) is the most updated and best documented source of information on consuming the Galaxy API.

# Programming Language Bindings

Various language specific libraries for interfacing with the Galaxy API have been developed by the Galaxy community: 


* [BioBlend](https://github.com/galaxyproject/bioblend) contains a set of Python bindings
    * [BioBlend: automating pipeline analyses within Galaxy and CloudMan.](http://www.ncbi.nlm.nih.gov/pubmed/23630176) Sloggett, et. al.
    * [BioBlend.objects: metacomputing with Galaxy.](http://www.ncbi.nlm.nih.gov/pubmed/24928211) Leo, et. al.
* [Parsec](https://github.com/galaxy-iuc/parsec/) is a CLI tool that will allow you to use Galaxy from command line.
* [blend4j](https://github.com/galaxyproject/blend4j) contains Java bindings largely modeled after BioBlend. [JavaDocs](http://galaxyproject.github.io/blend4j/apidocs/)
* [blend4php](https://github.com/galaxyproject/blend4php) contains PHP bindings.
* The Galaxy code itself contains [JavaScript bindings](https://github.com/galaxyproject/galaxy/tree/dev/client/galaxy/scripts/mvc).

# Examples

## Code

Many examples and API utility scripts are shipped with Galaxy and BioBlend. You can browse them [here](https://github.com/galaxyproject/galaxy/tree/dev/scripts/api) and [here](https://github.com/galaxyproject/bioblend/tree/master/docs/examples) respectively.

## Open Source Projects
  * [Refinery](https://github.com/parklab/refinery-platform) (builds and runs workflows using [bioblend](http://bioblend.readthedocs.org/en/latest/))
  * The [Galaxy IPython Docker Runtime](https://github.com/bgruening/docker-ipython-notebook) (leverages [bioblend](http://bioblend.readthedocs.org/en/latest/) to interface with Galaxy's history). 
  * [Molgenis](https://github.com/molgenis/molgenis) (supports [exporting](https://github.com/molgenis/molgenis/commit/57d229a8d36fa9dae1155685e85187399863057f) to Galaxy via [blend4j](https://github.com/galaxyproject/blend4j))
  * [trait_workflow_runner](https://github.com/CTMM-TraIT/trait_workflow_runner) (used to run Galaxy workflows from [transMART](https://github.com/transmart) via [blend4j](https://github.com/jmchilton/blend4j)).
  * [clj-blend](https://github.com/chapmanb/clj-blend) (a Clojure library built on [blend4j](https://github.com/galaxyproject/blend4j)).

## HTTP Methods

HTTP methods correspond to operations in Galaxy. Operations are implemented as standalone scripts (in [scripts/api/](https://github.com/galaxyproject/galaxy/tree/master/scripts/api/)) and as routines in [scripts/api/common.py](https://github.com/galaxyproject/galaxy/tree/master/scripts/api/common.py).

| HTTP Method |  [common.py](https://github.com/galaxyproject/galaxy/tree/master/scripts/api/common.py) Routine  |  [Standalone](https://github.com/galaxyproject/galaxy/tree/master/scripts/api/)  | 
| ----------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | 
| GET    |  display()  |  [display.py](https://github.com/galaxyproject/galaxy/tree/master/scripts/api/display.py)  | 
| PUT    |  update()   |  [update.py](https://github.com/galaxyproject/galaxy/tree/master/scripts/api/update.py)  | 
| POST   |  submit()   |  [create.py](https://github.com/galaxyproject/galaxy/tree/master/scripts/api/create.py)  | 
| DELETE |  delete()   |  [delete.py](https://github.com/galaxyproject/galaxy/tree/master/scripts/api/delete.py)  | 


# Galaxy's API behind a proxy

You have to make sure that the API calls are passing through the proxy by adding the following lines to the Apache config file:

   ```
    <Location "/api">
        Satisfy Any
        Allow from all
    </Location>
   ```

Replace `/api` with `/api/galaxy` when serving Galaxy at a sub directory (such as `/galaxy/`).
