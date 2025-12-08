---
title: Frequently Asked Questions for Galaxy Administration
---

<Insert name="/admin/linkbox" />
<Insert name="/faqs/linkbox" />


See [Learn/FAQ](/learn/faq/) for questions about using any Galaxy instance, and [Main/FAQ](/main/faq/) for questions specifically about using Galaxy's free public server [Main](/main/).


----

## Galaxy license

**What are the licensing terms for Galaxy?**

See [Copyrights and Licenses](/admin/license/).

----

## Using Galaxy

The Galaxy Community has created Galaxy instances in many different forms and for many different applications. The [Galaxy Platform Directory](/use/) lists the options we know about, including:

* Free public Galaxy servers,
* cloud services that support Galaxy instances, and
* virtual machines and containers that can be easily deployed for your own server.

Which is **right** for you?  Explore the directory, especially the section on [Which Platform / Platform type to use](/use/#which-platform-platform-type-to-choose/).

Tools and workflows contributed by [community members](/community/) worldwide) are served through the **[Main ToolShed](/toolshed/)** and genome data/indexes through an **[rsync service](/admin/data-integration/)**.  

----

## Purging unwanted histories and datasets

**I have downloaded and installed a local instance of Galaxy.  How can I get rid of unwanted histories and their associated datasets?**

There are scripts available in the Galaxy distribution that make this process very simple.  See our [Purge Histories and Datasets page](/admin/config/performance/purge-histories-and-datasets/) for details.

----

## Galaxy Python version

**What versions of the Python language do you support with your downloadable Galaxy source distribution?**

We currently support Python 2.6 and 2.7.  When you start up your Galaxy instance, the Python eggs for your platform will be automatically downloaded for you.  See our [Eggs page](/admin/config/eggs/) for more information.

----

## Connect an external datasource to Galaxy

**How do I connect an external datasource to Galaxy?**

Adding an external datasource is quite easy, and only requires minimal work on the datasource side.  For complete details on how to do this, see our [DataSources page](/admin/internals/data-sources/).

----

## Adding support for a new data type

**How do I implement support for a new data type in Galaxy?**

For complete details on how to support a new data type, see our [Adding Datatypes page](/admin/datatypes/adding-datatypes/).

----

## Configuring Galaxy so a tool can properly generate an Excel file

**Is there a way to force the mime type of the downloaded files ?** eg an application generates a binary excel file and the mime type is always binary, and the file extension is always "data.ext".  This causes problems when the user tries to view ( click the eye icon ) or download ( click the 'save' link ).  Changing the file type to "excel" doesn't help, and the user is forced to save the file on his desktop, rename the file to an XLS extension and then open it.

In your universe_wsgi.ini file add this line to [galaxy:datatypes]...

xls = galaxy.datatypes.data:Data,application/vnd.ms-excel

...and set the output format of your tool to xls.

----

## Running a local Galaxy mirror on port 80, or through Apache

**How can I run a Galaxy mirror alongside my regular web server (i.e. on port 80)?**

Via a proxy connection in Apache.  Instructions can be found on the [Admin/Config/Apache Proxy](/admin/config/apache-proxy/) page.

----

## Including HTTP links in a tool's help text

**Is there a way to include an http link (eg ```<a href='foo'>foo</a>```) in the help text in a tool's xml file?**

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

[Follow this link for a detailed description](/admin/config/galaxy-slots/)

----

## Any other question

<div class='left'><a href='/search/'><img src="/images/galaxy-logos/galaxy-web-search.png" alt="Galaxy Search" width="150" /></a></div>
[Galaxy Search](/search/) searches all online Galaxy resources.  This includes this hub, the [Mailing Lists](/mailing-lists/), [Main](/main/), the [Tool Shed](/toolshed/), and the [Galaxy source code](https://github.com/galaxyproject/galaxy).
