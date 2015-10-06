# GenomeSpace

<div class='right'><a href='http://genomespace.org/'><img src='/Images/Logos/GenomeSpaceLogo.png' alt='GenomeSpace'  /></a></div>

[GenomeSpace](http://genomespace.org/) bridges the gaps between [bioinformatics tools](http://genomespace.org/support/tools), [including Galaxy](http://genomespace.org/support/tools/galaxy), making it possible for you to move data smoothly between these tools, leveraging the available analyses and visualizations in each of these tools.  !GenomeSpace allows you to store your data files in the Amazon cloud and provides necessary file format transformations whenever you select an analysis or visualization within one of the tools.  

* **[What Can GenomeSpace Do For You?](http://genomespace.org/what-can-genomespace-do-for-you-)**: A quick overview of how GenomeSpace can facilitate your science.

* **[GenomeSpace Tools](http://genomespace.org/support/tools)**: A quick overview of the tools and applications available through !GenomeSpace, [including Galaxy](http://genomespace.org/support/tools/galaxy).

* **[GenomeSpace Recipes](http://genomespace.org/support/guides/recipes)**: Short guides that provide outlines for performing specific common tasks.  These can help you get your hands on the !GenomeSpace functionality.


## For Developers

It anyone want to enable the GenomeSpace functions, following these steps:

1. Pull the changesets from [Galaxy Distribution](https://bitbucket.org/galaxy/galaxy-dist/overview) and update your repository.
1. Add GenomeSpace tool to the Toolbox (see details below)
1. Activate OpenID in the Configuration file
1. Restart your Galaxy instance, and these tools will be loaded automatically.

### Add GenomeSpace tool to the Toolbox

Add these lines into the section you want to add the GenomeSpace tools:

```xml
<tool file="genomespace/genomespace_file_browser_prod.xml" />
<tool file="genomespace/genomespace_importer.xml" />
<tool file="genomespace/genomespace_exporter.xml" />
```


such as:

```xml
<?xml version="1.0"?>
<toolbox>
  <section name="Import Data" id="dataimporting">
    <tool file="data_source/upload.xml"/>
    <tool file="genomespace/genomespace_file_browser_prod.xml" />
    <tool file="genomespace/genomespace_importer.xml" />
    <tool file="genomespace/genomespace_exporter.xml" />
  </section>
 </toolbox>
```


### Activate OpenID in the Configuration file

In the `universe_wsgi.ini` file, enable the OpenID authentication like this

```python
# Enable authentication via OpenID.  Allows users to log in to their Galaxy
# account by authenticating with an OpenID provider.
enable_openid = True
```


### Customizing GenomeSpace

See [/Admin/Config/GenomeSpace](/Admin/Config/GenomeSpace).
