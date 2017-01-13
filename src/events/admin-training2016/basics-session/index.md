---
autotoc: true
title: Galaxy Admin Training: Basic Topics
---
{{> Events/AdminTraining2016/Header }}



<div class='right'>{{> Events/AdminTraining2016/LinkBox }}</div>

**November 7-8, Salt Lake City Library**

This two day introductory session will introduce participants to what you need to know to get a Galaxy server up and running on a standalone server. You'll also learn and how to extend your Galaxy with your own tools and tools from the community, and how to define reference data in your server as well.

## Prerequisites

**Please review the prerequisites carefully before [registering](/src/events/AdminTraining2016/Registration/index.md).**  If you arrive without meeting the prerequisites then the workshop will be a frustrating experience.

### Comfortable with the Unix/Linux command line

Most of the workshop will happen at the Linux command line.  *If you aren’t comfortable with this before you arrive, then you will be lost the entire time.*  How comfortable do you need to be?  Here’s a sampling of commands and concepts that you should be comfortable with:
  ```
cd, mkdir, rmdir, ls
tar, gzip
cp, mv, rm, chmod, ln 
~, .., ./, /tmp
cat, tail, less
man
```


Note: *This is not an exhaustive list (or even a proper subset) of the commands that will be used in the workshop.*  They are included here to give you an idea of the depth of knowledge that is required.


### Competent in a Unix/Linux text editor

Linux has several text editors available in it.  You’ll need to be competent in at least one of them before the workshop starts.  Organizers will make sure that these editors are available on the Linux images we use in the workshop:

* [Nano](https://www.nano-editor.org/): Simple and functional.  Gets the job done.
* [Emacs](https://www.gnu.org/software/emacs/): Powerful and a wee bit scary.
* [VIM](http://www.vim.org/): Powerful, efficient, and more than a wee bit scary.

### Some experience with Linux Package Management

You don’t need to be an expert at Linux package management, but you do need to have some experience at installing and upgrading packages on a Linux system.

We’ll be using Ubuntu based images during the workshop, which means we’ll be using **[apt](https://help.ubuntu.com/community/AptGet/Howto)** to do package management.  Get to know it.

### Hardware and Software

All participants should bring a wifi-enabled laptop with 

* at least 4GB of memory (more is better)
* Software to access the command line of a Linux server.
  * If you are running Linux or Mac OS, then you already have this.
  * If you are running Windows than you’ll need to get something like putty installed before the workshop.
* A recent version of either the Chrome or Firefox web browser installed.

## Topics

This two day workshop will cover the big picture, and installation, configuration, and customization basics.  We'll present these topics by exploring several specific examples in detail.  Participants will finish this workshop with a solid understanding of how to set up and customize a Galaxy instance running on a desktop or standalone server.

* Deployment platform options
* Installing a basic Galaxy server 
* Database choices and configuration  (SQLite & PostgreSQL)
* Web server choices and configuration  (NGINX & Apache)
* Identifying and installing well-defined tools from the Galaxy Tool Shed
* Importing and defining reference genomes
* Defining users, groups, and quotas
* Basics of Tool Definition
* Enabling extensions: FTP & SMTP
* Introduction to Galaxy Architecture

## Schedule

*This is a draft schedule and is a work in progress. Topic order and specific start and end times are likely to change.*

### Monday

<table>
  <tr class="th" >
    <th> Time </th>
    <th> Topic </th>
  </tr>
  <tr>
    <th style=" text-align: right;"> 9:15am </th>
    <td style=" text-align: center;"> <strong>Checkin and Coffee</strong> </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 9:30am </th>
    <td> Welcome and intro</td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 10:00am </th>
    <td> Deployment and platform options </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 10:20am </th>
    <td> Get a basic Galaxy server up and running. </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 11:00am </th>
    <td style=" text-align: center;"> <strong>Break</strong> </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 11:20am </th>
    <td> Database choices and configuration. Introduction to <a href='https://www.postgresql.org/'>PostgreSQL</a>. </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 12:30pm </th>
    <td style=" text-align: center;"> <strong>Lunch Break</strong> </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 1:30pm </th>
    <td> Web server choices and configuration. Introduction to <a href='https://nginx.org/en/'>NGINX</a>. </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 3:20pm </th>
    <td style=" text-align: center;"> <strong>Break</strong> </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 3:40pm </th>
    <td> Introduction to the Galaxy Tool Shed: Identifying and installing well-defined tools. </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 4:50pm </th>
    <td> Defining and importing genomes </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 5:40pm </th>
    <td style=" text-align: center;"> <strong>Dinner Break</strong> </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 7:00pm </th>
    <td> Defining and importing genomes, cont.; Data Managers </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 8:30pm </th>
    <td style=" text-align: center;"> <strong>Done</strong> </td>
  </tr>
</table>


### Tuesday

<table>
  <tr class="th" >
    <th> Time </th>
    <th> Topic </th>
  </tr>
  <tr>
    <th style=" text-align: right;"> 9:15am </th>
    <td style=" text-align: center;"> <strong>Coffee</strong> </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 9:30am </th>
    <td> Welcome, Questions </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 9:45am </th>
    <td> Extending your installation: Enabling FTP & SMTP </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 11:00am </th>
    <td style=" text-align: center;"> <strong>Break</strong> </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 11:20am </th>
    <td> Users, Groups, and Quotas </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 12:20pm </th>
    <td style=" text-align: center;"> <strong>Lunch Break</strong> </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 1:20pm </th>
    <td> Tool Definition Basics & Planemo </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 3:20pm </th>
    <td style=" text-align: center;"> <strong>Break</strong> </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 3:40pm </th>
    <td> Tool Definition Basics & Planemo, cont. </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 5:40pm </th>
    <td style=" text-align: center;"> <strong>Dinner Break</strong> </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 7:00pm </th>
    <td> Introduction to Galaxy Architecture <span style="font-size: smaller;"> (Joint session with the <a href='/src/events/AdminTraining2016/AdvancedSession/index.md'>Advanced Topics session</a>) </span> </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 8:20pm </th>
    <td> Wrap-up </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 8:30pm </th>
    <td style=" text-align: center;"> <strong>Done</strong> </td>
  </tr>
</table>




<div class='right'><br />
<a href='http://www.slcpl.lib.ut.us/branches/view/Main+Library'><img src="/src/events/AdminTraining2016/SLCLibrary1.jpg" alt="alt Lake City Main Public Library, the venue for the introduction workshop"  /></a>
</div>

## Venue

The **introductory training workshop will be held at the [Salt Lake City Main Public Library](http://www.slcpl.lib.ut.us/branches/view/Main+Library).**  This [stunning venue](https://www.google.com/search?tbm=isch&q=salt+lake+city+library) is located in downtown Salt Lake City at [210 East 400 South](https://drive.google.com/open?id=1vC6J8BdrMDQo_cIJvTr9pjUGGcA&usp=sharing), and is a stop on the [UTA TRAX Red Line](https://www.rideuta.com/Rider-Tools/Schedules-and-Maps/703-Red-Line) and just [5 stops from conference housing](https://drive.google.com/open?id=1vC6J8BdrMDQo_cIJvTr9pjUGGcA&usp=sharing).  We'll be meeting in [Conference Room 4](http://www.slcpl.lib.ut.us/rooms/) .

{{> Events/AdminTraining2016/Footer }}
