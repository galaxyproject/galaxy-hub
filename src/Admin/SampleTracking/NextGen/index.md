## Next Gen Sample Tracking System

This describes configuration of a proposed user interface addition to existing [Galaxy sample tracking](http://main.g2.bx.psu.edu/u/rkchak/p/sts) functionality. The goal is to provide:

* An intuitive interface for sample submission by researchers.
* Sample management by sequencing technicians. 
* Organizing of samples via projects, with full transparency on status to researchers.
* Full integration with the existing Galaxy analysis framework.


See the [detailed overview](http://bcbio.wordpress.com/2011/01/11/next-generation-sequencing-information-management-and-analysis-system-for-galaxy/) and [Slides from GalaxyDev 2010](http://www.slideshare.net/chapmanb/nextgeneration-sequencing-request-management-system-in-galaxy) for more information. We welcome your feedback and thoughts.

Once you follow the setup instructions below, the sample tracking system will be available from the top level menu of a logged in user as Lab -> Next gen sample submission.

### Setup

1. Get the latest sample tracking code using this [fork that tracks the galaxy-main codebase](http://bitbucket.org/chapmanb/galaxy-central):

```
hg clone http://bitbucket.org/chapmanb/galaxy-central
```


2. Install PyYAML on the Python used to run Galaxy:

```
$ easy_install PyYAML
```


3. Examine the YAML configuration file in tool-data/nglims.yaml. This defines available request types, sample states and other details that will be used to populate the interface.

4. Do the standard Galaxy setup by starting up Galaxy one time to create your local database.

```
$ sh run.sh
```


5. Enable the interface as the default in your universe_wsgi.ini file. These values should be in the [app:main] section of your configuration:

```
use_nglims=True
nglims_config_file=tool-data/nglims.yaml
```


6. Add configured request types, forms and sample states to the database:

```
$ python scripts/nglims/add_ng_defaults.py universe_wsgi.ini
```


7. Setup an administration user with the instructions on the standard [Galaxy Admin Interface](../../../Admin/Interface). Create a "sequencing" role with this admin user; see the [Galaxy security documentation for more details](../../../Learn/Security Features). Assign that role to any users who will be doing the sequencing work and should have full access to the sample management tools. Regular users -- customers submitting samples -- have access to a limited subset of capabilities.

8. For integrating Galaxy analysis scripts with the front-end, generate an API key for your user with "sequencing" permissions. First ensure that the API in enabled in your Galaxy universe_wsgi.ini configuration:

```
enable_api = True
```


Then, select 'User -> Preferences -> Manage API keys' and copy the generated key.

9. Setup the post-processing analysis scripts, available from [this GitHub repository](https://github.com/chapmanb/bcbb/tree/master/nextgen) with full installation instructions. The API key from step 8 should be pasted as the galaxy_api_key in your post_process.yaml file.
