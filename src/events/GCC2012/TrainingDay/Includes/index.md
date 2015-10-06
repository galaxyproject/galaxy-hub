<div class='red'>
This page is not meant to be viewed on its own.  Rather, it contains sections that are displayed on the [GCC2012 Training Day](../) page
</div>
----

# SCHEDULE

<table>
  <tr class="th" >
    <th style=" text-align: center;"> Time </th>
    <th style=" text-align: center; width: 30%;"> Main Room C </th>
    <th style=" text-align: center; width: 30%;"> Meeting Room <em>F</em> </th>
    <th style=" text-align: center; width: 30%;"> Meeting Room E </th>
  </tr>
  <tr>
    <th style=" text-align: right;"> 8:00 </th>
    <td> <: #F8F8F8 -3> <em>Continental Breakfast, Registration Open</em> </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 9:00 </th>
    <td> <<sup> #FFCFCF> '''[[../#WS1|WS1: Integrating Tools & Data Sources]]'''<<div(indent)>>''[[Dan|Dan Blankenberg]] & [[fubar|Ross Lazarus]]'' ||<</sup> #F2F2C3> </strong><a href='../.md#ws2'>WS2: Introduction to Galaxy</a><strong><div class='indent'><em><a href='/JeremyGoecks.md'>Jeremy Goecks</a>, <a href='/JamesTaylor.md'>James Taylor</a> & <a href='/JenniferJackson.md'>Jennifer Jackson</a></em></div> </td>
    <td> <^ #D8FFFF> </strong><a href='../.md#ws3'>WS3: Galaxy CloudMan</a><strong><div class='indent'><em><a href='/EnisAfgan.md'>Enis Afgan</a> & <a href='/DannonBaker.md'>Dannon Baker</a></em></div> </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 10:30 </th>
    <td> <: #F8F8F8 -3> <em>Break</em> </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 11:00 </th>
    <td> <<sup> #FFDB97> '''[[../#WS4|WS4: Galaxy Code Architecture]]'''<<div(indent)>>''[[JamesTaylor|James Taylor]]''<<div>> ||<</sup> #FFD8FF> </strong><a href='../.md#ws5'>WS5: Installing Your Own Galaxy</a><strong><div class='indent'><em><a href='/nate.md'>Nate Coraor</a> & <a href='/DaveBouvier.md'>Dave Bouvier</a></em></div> </td>
    <td> <^ #CFCFFF> </strong><a href='../.md#ws6'>WS6: Galaxy API</a><strong><div class='indent'><em><a href='/DannonBaker.md'>Dannon Baker</a></em></div> </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 12:30 </th>
    <td> <: #F8F8F8 -3> <em>Lunch Break</em> </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 2:00 </th>
    <td> <<sup> #CFFFCF> '''[[../#WS7|WS7: Galaxy Tool Shed]]'''<<div(indent)>>''[[greg_vonkuster|Greg von Kuster]] & [[nate|Nate Coraor]]'' ||<</sup> #E1CC9B> </strong><a href='../.md#ws8'>WS8: Variant and SNP Analysis with Galaxy</a><strong><div class='indent'><em><a href='http://bioinformatics.bc.edu/marthlab/Erik_Garrison'>Erik Garrison</a></em></div> </td>
    <td> <^ #FFCFCF> </strong><a href='../.md#ws1'>WS1: Integrating Tools & Data Sources</a><strong><div class='indent'><em><a href='/Dan.md'>Dan Blankenberg</a> & <a href='/fubar.md'>Ross Lazarus</a></em></div> </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 3:30 </th>
    <td> <: #F8F8F8 -3> <em>Break</em> </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 4:00 </th>
    <td> <<sup> #CCFF66>'''[[../#WS9|WS9: RNA-Seq Analysis with Galaxy]]'''<<div(indent)>>''Curtis Hendrickson, David Crossman & [[JeremyGoecks|Jeremy Goecks]]''<<div>> ||<</sup>  #88EDED> </strong><a href='../.md#ws10'>WS10: Ion Torrent – Open Source Sequencing</a><strong><div class='indent'><em><a href='/MattDyer.md'>Matt Dyer</a>, Associate Director, <a href='http://lifetech.com/'>Ion Torrent</a>, Bioinformatics & <a href='http://ioncommunity.iontorrent.com/'>Community</a></em></div>  </td>
    <td> <^ #CFCFFF> </strong><a href='../.md#ws6'>WS6: Galaxy API</a><strong><div class='indent'><em><a href='/DannonBaker.md'>Dannon Baker</a></em></div> </td>
  </tr>
  <tr>
    <th style=" text-align: right;"> 5:30 </th>
    <td> <: #F8F8F8 -3> <em>Finish</em> </td>
  </tr>
</table>

END_INCLUDE

----
# Prerequisite Includes

# NOVICE
* Little or no knowledge of Galaxy. 
END_INCLUDE

# UNIX KNOWLEDGE
* Knowledge and comfort with the Unix/Linux command line interface and a text editor. If you don't know what cd, mv, rm, mkdir, chmod, grep and so on can do then you will struggle in this workshop. 
END_INCLUDE

# WS2
* A general knowledge of Galaxy, or attendance at [Workshop 2](../.md#ws2)
END_INCLUDE

# WS5_VM
* **You have the [conference provided virtual machine image for Workshop 5](/Events/GCC2012/TrainingDay/VMs.md#vm-without-a-running-galaxy) installed and running on your laptop, before arriving at the conference.**
END_INCLUDE

# UBER ACCESS
* *Root shell access* on a server Galaxy is running on, and *Admin user access* in Galaxy.  The Galaxy server instance can be:
  * Installed by you prior to the training day.
  * Setup by you during [Workshop 5](../.md#ws5) using the [virtual machine image for Workshop 5](/Events/GCC2012/TrainingDay/VMs.md#vm-without-a-running-galaxy).
  * Installed by you prior to arriving at the conference, using the [virtual machine image that has a running Galaxy](/Events/GCC2012/TrainingDay/VMs.md#vm-with-a-running-galaxy).
  Your Galaxy instance will ideally be one you installed locally on a laptop.  If you use something other than a [conference-provided virtual machine (VM)](../VMs) instance, you'll be responsible for handling issues that are outside of Galaxy.
END_INCLUDE

# ROOT ACCESS
* Root access to a Galaxy server (your own, [the conference provided virtual machine image](/Events/GCC2012/TrainingDay/VMs.md#vm-with-a-running-galaxy) that you installed before arriving, or that you got installed  in [Workshop 5](../.md#ws5)).  **We strongly recommend that you use the [conference provided virtual machine image](/Events/GCC2012/TrainingDay/VMs.md#vm-with-a-running-galaxy) and have it installed and running before arriving at the conference.**
END_INCLUDE

# ADMIN ACCESS
* *Administrative* access to a Galaxy instance that was:
  * Installed by you prior to the training day.
  * Setup by you during [Workshop 5](../.md#ws5) using the [virtual machine image for Workshop 5](/Events/GCC2012/TrainingDay/VMs.md#vm-without-a-running-galaxy).
  * Installed by you prior to arriving at the conference, using the [virtual machine image that has a running Galaxy](/Events/GCC2012/TrainingDay/VMs.md#vm-with-a-running-galaxy).

 **We strongly recommend that you use the [conference provided virtual machine image](/Events/GCC2012/TrainingDay/VMs.md#vm-with-a-running-galaxy) and have it installed and running before arriving at the conference.**  If you use something other than a [conference-provided virtual machine (VM)](../VMs) instance, you'll be responsible for handling issues that are outside of Galaxy.
END_INCLUDE

# TOOL TO WRAP
* A "simple" executable tool you would like to wrap that takes and/or creates existing Galaxy datatypes like bed/fastq/bam etc such as one of the [bedTools executables](http://code.google.com/p/bedtools/).
END_INCLUDE

# WS1
* Basic understanding of the process for developing a simple Galaxy tool as well as Galaxy data types, or attendance at [Workshop 1](../.md#ws1).
END_INCLUDE

# SCRIPTING
* Knowledge of a programming or scripting language.
END_INCLUDE


----

# Results

# WS9 RESULTS

1. "Reads to Results" analysis of transcript level differences between two conditions

2. Analysis using a non-reference genome

3. Visualization of the results in IGV and in Galaxy’s Trackster
END_INCLUDE

# WS7 RESULTS
1. Starting up your own local tool shed in addition to your own local Galaxy instance.  You will be interacting between these two applications throughout the workshop.

2. Uploading one or more custom tools to your local tool shed, creating a tool shed repository.

3. Installing repositories containing tools and custom datatypes from your local tool shed into your local Galaxy instance.

4. Installing a repository that contains a workflow into your local Galaxy instance, and then import the workflow from the repository.

5. Deactivating and reactivating installed repositories that contain custom datatypes and tools.

6. Uninstalling and reinstalling installed repositories that contain custom datatypes and tools.

7. Getting updates in your local Galaxy instance for installed repositories.

8. Understanding of Galaxy tool versions and how they relate to tools contained in installed repositories.

9. Discussion of tools being migrated from the Galaxy distribution to the tool shed.
END_INCLUDE

----

# AWS SUPPORT

<a href='http://aws.amazon.com/education/'><img src='/Images/Logos/AWSLogo.png' alt='Supported by an AWS in Education teaching grant award' width="120" /></a><br /><br />This workshop is supported by an [AWS in Education teaching grant award](http://aws.amazon.com/education/)
END_INCLUDE
