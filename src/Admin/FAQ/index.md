---
autotoc: true
title: Frequently Asked Questions for Galaxy Administration
---
PLACEHOLDER_INCLUDE(/src/Admin/LinkBox/index.md) 
PLACEHOLDER_INCLUDE(/src/FAQs/LinkBox/index.md)


See [Learn/FAQ](/src/Learn/FAQ/index.md) for questions about using any Galaxy instance, and [Main/FAQ](/src/Main/FAQ/index.md) for questions specifically about using Galaxy's free public server [Main](/src/Main/index.md).



----

## Galaxy license

**What are the licensing terms for Galaxy?**

See [Copyrights and Licenses](/src/Admin/License/index.md).

----

## Using Galaxy

Galaxy can be used through a **free public [Main](/src/Main/index.md) web service at [http://usegalaxy.org](http://usegalaxy.org)**, a **[Local](/src/Admin/GetGalaxy/index.md) install**, or an **[Amazon Elastic Compute Cloud (EC2)](http://aws.amazon.com/ec2/) via [CloudMan](/src/CloudMan/index.md)**. 

Tools and workflows managed by the primary Galaxy team (but contributed by [community members](/src/Community/index.md) worldwide) are served through the **[ Main ToolShed](/src/Tool Shed/index.md)** and genome data/indexes through an **[rsync service](/src/Admin/Data Integration/index.md)**.  

*Which is **right** for you?*
* Review the **[Big Picture](/src/BigPicture/Choices/index.md)**
* Explore **Community [Public Galaxy Servers](/src/PublicGalaxyServers/index.md)**
* Watch a screencast about **setting up a [EC2 Cloud](http://screencast.g2.bx.psu.edu//cloud/)**
* Or, follow the ***galaxy-dev@bx.psu.edu* [mailing list](/src/MailingLists/index.md)** to find out **[more...](http://galaxyproject.org)**

----

## Purging unwanted histories and datasets

**I have downloaded and installed a local instance of Galaxy.  How can I get rid of unwanted histories and their associated datasets?**

There are scripts available in the Galaxy distribution that make this process very simple.  See our [Purge Histories and Datasets page](/src/Admin/Config/Performance/Purge Histories and Datasets/index.md) for details.

----

## Galaxy Python version

**What versions of the Python language do you support with your downloadable Galaxy source distribution?**

We currently support Python 2.6 and 2.7.  When you start up your Galaxy instance, the Python eggs for your platform will be automatically downloaded for you.  See our [Eggs page](/src/Admin/Config/Eggs/index.md) for more information.

----

## Connect an external datasource to Galaxy

**How do I connect an external datasource to Galaxy?**

Adding an external datasource is quite easy, and only requires minimal work on the datasource side.  For complete details on how to do this, see our [DataSources page](/src/Admin/Internals/Data Sources/index.md).

----

## Adding support for a new data type

**How do I implement support for a new data type in Galaxy?**

For complete details on how to support a new data type, see our [AddingDatatypes page](/src/Admin/Datatypes/Adding Datatypes/index.md).

----

## Configuring Galaxy so a tool can properly generate an Excel file

**Is there a way to force the mime type of the downloaded files ?** eg an application generates a binary excel file and the mime type is always binary, and the file extension is always "data.ext".  This causes problems when the user tries to view ( click the eye icon ) or download ( click the 'save' link ).  Changing the file type to "excel" doesn't help, and the user is forced to save the file on his desktop, rename the file to an XLS extension and then open it. 

In your universe_wsgi.ini file add this line to [galaxy:datatypes]...

xls = galaxy.datatypes.data:Data,application/vnd.ms-excel

...and set the output format of your tool to xls.

----

## Running a local Galaxy mirror on port 80, or through Apache

**How can I run a Galaxy mirror alongside my regular web server (i.e. on port 80)?**

Via a proxy connection in Apache.  Instructions can be found on the [Admin/Config/Apache Proxy](/src/Admin/Config/Apache Proxy/index.md) page.

----

## Including HTTP links in a tool's help text

**Is there a way to include an http link (eg <a href='foo'>foo</a> in the help text in a tool's xml file?**

This is done using a restructured text syntax similar to the following line.

 `.. _Screencasts: http://www.bx.psu.edu/cgi-bin/trac.cgi/wiki/GopsDesc`

There is additional information on restructured text [here](http://docutils.sourceforge.net/docs/user/rst/quickref.html).

----

## Alignment Tools

**Does Galaxy provide tools to concatenate only blocks that are adjacent to each other ( i.e. without any gap in the "projected" species )?**

The following alignment tools available in Galaxy enable this:

* **Join MAF blocks by species** - this tool will take a MAF from your history and fuse MAF blocks which are genomically adjacent on all the specified species producing another MAF file
* **Stitch MAF blocks given a set of genomic intervals** - this tool uses a set of guide intervals that you provide and creates one fasta alignment block per interval for each desired species.
* **Stitch Gene blocks given a set of coding exon intervals** - this tool does the same as above, except uses coding region information (encoded in the BED format) to create one fasta alignment block per CCDs.

----

## Tools that output HTML and Images

**I want to wrap or create a tool that generates an html output with several images and other files.  Where do I write and how can I reference the images and other files when I generate html to write to the html file?**

[Please take a look at this detailed description](http://wiki.galaxyproject.org/Admin/Tools/Multiple%20Output%20Files#Single_history_output_Html_file_with_links_to_any_number_of_output_files_and_images)

----

## Tool and server configuration

**I've read about GALAXY_SLOTS but I don't understand what it is and how it works?**

[Follow this link for a detailed description](/src/Admin/Config/GALAXY_SLOTS/index.md)

----

## Any other question

<div class='left'><a href='http://galaxyproject.org/search/getgalaxy'><img src="/src/images/Logos/GetGalaxySearch.png" alt="Google Custom Search for information on deploying, administering and extending Galaxy" width="150" /></a></div>
The [GetGalaxy Custom Search](http://galaxyproject.org/search/getgalaxy) searches all online Galaxy resources for information about installing, administering, extending and developing Galaxy.  This includes this wiki, the [Mailing Lists](/src/MailingLists/index.md), [Main](/src/Main/index.md), the [Tool Shed](/src/Tool Shed/index.md), and the [Galaxy source code](https://github.com/galaxyproject/galaxy).
