---
autotoc: true
title: September 20, 2012 Galaxy Development News Brief
---
<div class='right'></div>



<br />
# Get Galaxy

<div class='left'><a href='http://getgalaxy.org/'><img src="http://galaxy.psu.edu/static/getgalaxy.png" alt="getgalaxy" width=50 /></a></div>

 **[getgalaxy.org](http://getgalaxy.org)** 

* **new**: ` $ hg clone http://www.bx.psu.edu/hg/galaxy galaxy-dist `
* **upgrade**: ` $ hg pull -u -r da9d740fce31 `

<br />
<br />
# Datatypes_conf.xml Update

**When updating to this release, users should also update their instance's *datatypes_conf.xml* file**. There are two ways to do this:

**(1)** If no changes have been made to `datatypes_conf.xml`, just copy the [datatypes_conf.xml.sample](https://bitbucket.org/galaxy/galaxy-dist/src/da9d740fce31/datatypes_conf.xml.sample) in this distribution to `datatypes_conf.xml`

**OR**

**(2)** Add the necessary lines for the **FLI** custom datatype + conversions:

  (a)
```
<datatype extension="fli" type="galaxy.datatypes.tabular:FeatureLocationIndex" display_in_upload="false"/>
```


  (b) 
In **Bed** datatype definition:
```
<converter file="bed_to_fli_converter.xml" target_datatype="fli"/>
```


  (c)
In **Gff** datatype definition:
```
<converter file="gff_to_fli_converter.xml" target_datatype="fli"/>
```


In the future, the Galaxy team considers it a priority to provide improved methods to automatically update `datatypes_conf.xml` and other configuration files as sample files are updated.


<br />
# CloudLaunch Overhaul

[http://usegalaxy.org/cloud](http://usegalaxy.org/cloud)

With **[Boto](http://boto.cloudhackers.com)** bumped to **2.5.2**, a new and improved **[CloudLaunch](https://main.g2.bx.psu.edu/cloudlaunch)** now includes an asynchronous lookup for instance selection and an easier key generation via direct downloads.

Other changes include a correction for rare instance ` udpate() ` issues that happens when Amazon doesn't have the instance fully registered before ` instance.update() ` is called. The **[CloudLaunch](https://main.g2.bx.psu.edu/cloudlaunch)** home page documentation has also been updated to explicitly state that instances are pay-for-use.

Full instructions for getting started with a **Galaxy CloudMan Instance**, including setting up your **Amazon** [AWS](http://aws.amazon.com/), [EC2](http://aws.amazon.com/ec2/), and [S3](http://aws.amazon.com/s3/) account and services, can be found at **[http://usegalaxy.org/cloud](http://usegalaxy.org/cloud)**. 

**[CloudLaunch](https://main.g2.bx.psu.edu/cloudlaunch)** is a quick way for direct access to your cloud services from the **[Galaxy](http://usegalaxy.org)** tool bar once an account is established. 

<br />
***Access here***

<a href='/src/Tool Shed/index.md'><img src="/src/images/NewsGraphics/2012_09_20_cloudlaunch-main.png" alt="cloudlaunch-main" /></a>

<br />

**Then, *login with your credentials* and go!**

<a href='/src/Tool Shed/index.md'><img src="/src/images/NewsGraphics/2012_09_20_cloudlaunch-home.png" alt="cloudlaunch-home" /></a>

<br />
# Galaxy Tool Factory

The **Tool Factory** is a pure Galaxy scripting environment that makes running simple quick and dirty tasks really easy, and can also generate new Galaxy tools with functional tests! It's a Galaxy tool, but it can run scripts and can automagically turn them into new Galaxy tools that freeze supplied scripts into reusable, workflow compatible tools - *Python*, *R*, *sh* or *perl* are supported. Watch this video for a short **[demonstration](http://www.youtube.com/watch?v=Nzzc9zHZJjE)** of how it works. Documentation, source code and support are available at **[the bitbucket](https://bitbucket.org/fubar/galaxytoolfactory/overview)** site. Please raise an issue there if you find bugs. If you are an R hacker and have a complex R function to wrap, **[RGalaxy](http://www.bioconductor.org/packages/devel/bioc/html/RGalaxy.html)** may work better for you, but the **Tool Factory** is ideal for simple workflow transformations with one input and one output.

#### More details if you're interested

Imagine you have a simple sh or R script you need to run quickly in Galaxy - with the option of creating a new Galaxy tool for your users to reuse as often as they need. On your private throw-away clone with the **Tool Factory** installed where you're logged in as an administrator you:

* Upload a small sample data set - enough to exercise the script for a functional test.

* Select the **Tool Factory** tool. Cut and paste the R (or perl/python/sh) script into the typical Galaxy **Tool Factory** form, select the small sample input file and click execute to run it! The help text on the form includes working examples showing how to pass input/output file paths in each available scripting language.

<a href='/src/Tool Shed/index.md'><img src="/src/images/NewsGraphics/2012_09_20_toolfactory-big.png" alt="toolfactory" /></a>

* Check the output. If the script didn't work right, use the redo button on the output to recreate the form and edit the script.

* Rinse, wash, repeat until it works correctly.

* Optionally if you would like the now working script permanently frozen into an ordinary Galaxy tool, rerun with the "generate" option set, paste some useful help text for the user. The **Tool Factory** will run but this time will also create a new tool as a **Tool Shed** archive, complete with a functional test based on the sample data you supplied at generation, ready to upload to a new **Tool Shed** repository for installation and sharing. The **Galaxy Tool Shed** model now supports automated tool version control to help maintain analysis repeatability. See the **[Tool Shed](http://toolshed.g2.bx.psu.edu/)** repository for usage instructions and guidelines.

* With the **Tool Factory** it is now possible, although possibly certifiably insane, to use Galaxy [as an IDE to develop python API scripts](https://bitbucket.org/fubar/galaxytoolfactory/wiki/galaxyide). Who needs eclipse? 

* The **Tool Factory** ia available for private clone installations from the main **[Galaxy Tool Shed](http://toolshed.g2.bx.psu.edu/)** as the **toolfactory** - see your local **Galaxy** admin menu.

* *Before you install - THIS IS IMPORTANT!!* The **Tool Factory** allows unrestricted scripting - NO SANDBOX!! so is far too dangerous for production sites. It can only be run by *local **Galaxy** site administrators*. Please, do **NOT** install on public Galaxy instances. ***Generated tools are safe if the script they wrap is safe***.

* Always remember to practice safe **Tool Shed** by reading the source before you install any new tool.

* Application Note in press, accepted Sept 2012: Ross Lazarus, Antony Kaspi, Mark Ziemann, and The Galaxy Team **Creating re­usable tools from scripts: The Galaxy Tool Factory**. *Bioinformatics*.

<br />
# Multiple Tool Versions

**Displaying multiple versions of a tool in the Galaxy tool panel**

When tool shed repositories that include multiple versions of a tool are installed into a local Galaxy instance, a single link to the tool will be displayed in the Galaxy tool panel.  When the tool is loaded, the different versions of the tool will be defined in a select list at the top of the tool form, allowing you to select a specific version of the tool.  The latest version of the tool is always displayed by default when the tool page is loaded.

For example, let's take a look at a Galaxy instance into which 2 revisions of a tool shed repository have been installed, each of which contains a different version of the *Filter* tool.  We've selected a tool panel section named "Filter" to contain the tool.  Here is our integrated_tool_panel.xml file where we see that *Filter version 1.1.0* and *Filter version 2.2.0* have been installed.

```
<?xml version="1.0"?>
<toolbox>
    <label id="basic_tools" text="Basic Tools" version="" />
    <section id="getext" name="Get Data" version="">
        <tool id="upload1" />
    </section>
    <section id="filter" name="filter" version="">
        <tool id="localhost:9009/repos/test/filter2/Filter1/2.2.0" />
        <tool id="localhost:9009/repos/test/filter2/Filter1/1.1.0" />
    </section>
</toolbox>
```


**Here is our Galaxy tool panel** - notice the single link to the installed *Filter* tool.

<a href='/src/Tool Shed/index.md'><img src="/src/images/NewsGraphics/2012_09_20_tool-panel.png" alt="tool-panel" /></a>

**Clicking the *Filter* link in the tool panel displays the Filter tool's page**, where you can select the version you want.

<a href='/src/Tool Shed/index.md'><img src="/src/images/NewsGraphics/2012_09_20_filter-tool-page.png" alt="filter-tool-page" /></a>

<br />
# Tool Shed

[Tool Shed](/src/Tool Shed/index.md)
* *Tool shed features for Galaxy tools*
  * The primary intent of the tool shed is for sharing Galaxy tools, workflows and other useful Galaxy utilities.  Galaxy tools are generally developed within a local Galaxy environment, proven to be functionally correct within that environment, and then uploaded to a tool shed for sharing.  With a couple of exceptions, tool features are defined within the Galaxy framework, and have nothing to do with the tool shed. [Read more…](/src/ToolShedToolFeatures/index.md)
* *Pushing changes to a tool shed repository using hg from the command line*
  * When pushing changes to a repository in the tool shed using hg from the command line (e.g., **hg commit**, **hg push**), make sure your shell's version of ***Mercurial is at least version 2.2.3***.  **[Mercurial version 2.2.3](http://mercurial.selenic.com/)** includes features that enable the tool shed to *automatically generate the new repository metadata* when the changes have been pushed from the command line.
* *Enhancements* & *Fixes*
  * Enhancements to tool dependency installation when installing with a tool shed repository: multiple environment variables can now be set and a new "make_directory" tag is supported.  
  * Fixes for displaying error message when displaying invalid tools in the tool shed.
  * Fix from *Bjorn Gruning* for telling the user which file is the offender if an uploaded tarball gets rejected in the tool shed.
  * Fix for getting updates for tool shed repositories installed into a local Galaxy instance.

<br />
# Framework

* [Refactoring for data providers and visualizations](http://bitbucket.org/galaxy/galaxy-central/changeset/08f1d09a65a98977817ca1f1bd34fc266d61aa24) to make it easier to create/extend data providers and visualizations.

<br />
# Security Fixes

* Prevent Galaxy session cookies from being accessed via script.  We don't use it through Javascript anywhere, only other cookies specifically set for **[Dynatree](http://code.google.com/p/dynatree/)** and **[Genetrack](http://code.google.com/p/genetrack/)**.
* Set header `'X-Content-Type-Options: nosniff'` for dataset display.  This will prevent **[IE8](http://en.wikipedia.org/wiki/Internet_Explorer_8)** from trying to render as html datasets served as text/plain.

<br />
# API

* Modified  **REST API** to support multipart/form-data requests, enabling large file upload. Contributed by Nuwan Goonasekera, see *[pull request 63](http://bitbucket.org/galaxy/galaxy-central/pull-request/59)*. 

<br />
# Bug Fixes

<div class='right'><a href='/src/support/index.md'><img src="/src/images/Icons/bug.png" alt="bugs" width=20 /></a></div> 
* *General*
  * Fix bug in [__init__.py](http://bitbucket.org/galaxy/galaxy-central/changeset/3f12146d6d81e08f662ada2011a6973e4230512d) with respect to stdout, stderr, and exit code handling.
  * Fix [create_all_fasta_loc.py](https://bitbucket.org/galaxy/galaxy-central/changeset/8153e8d25009d71a523e0f2df24ed12922825d8f#chg-scripts/loc_files/create_all_fasta_loc.py) to work when `inspect_dir` is not set.
* *UI*
  * Fixes for [positioning of help text](http://bitbucket.org/galaxy/galaxy-central/changeset/63cd6402badaf98f26080e71b1f0ed49db30e3ab) when hovering over icons in the history panel.
* *Tools*
  * Fix labels for two Cuffdiff options.

<br />
# Announcements

[News](/src/news/index.md), *[September 2012 Galaxy Update](/src/GalaxyUpdates/2012_09/index.md)*

<br />
----
<br />
# About Galaxy

**[GalaxyProject.org](http://galaxyproject.org)**

The **[Galaxy Team](/src/GalaxyTeam/index.md)** is a part of **[BX](http://www.bx.psu.edu/)** at [Penn State](http://www.psu.edu/), and the **[Biology](http://www.biology.emory.edu/)** and **[Mathematics and Computer Science](http://www.mathcs.emory.edu/)** departments at [Emory University](http://www.emory.edu/home/index.html/). 

**[Galaxy](http://usegalaxy.org )** is supported in part by [NSF](http://www.nsf.gov/), [NHGRI](http://www.genome.gov/), the [Huck Institutes of the Life Sciences](http://www.huck.psu.edu/), and [The Institute for CyberScience at Penn State](http://www.ics.psu.edu/), and [Emory University](http://www.emory.edu/home/index.html).

Join us at **Twitter [@galaxyproject](http://twitter.com/#galaxyproject)** or just read our tweets **[Galaxy on Twitter](/src/GalaxyOnTwitter/index.md)**
