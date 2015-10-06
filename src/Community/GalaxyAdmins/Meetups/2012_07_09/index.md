<div class='center'><a href='/Community/GalaxyAdmins.md'><img src='/Images/Logos/GalaxyAdmins.png' alt='GalaxyAdmins' /></a></div>

INCLUDE(/Community/GalaxyAdmins/LinkBox)

<div class="title">2012/07/09 Conference Call</div>

The group's [first conference call](http://dev.list.galaxyproject.org/Galaxy-Czars-Doodle-pool-for-first-Teleconference-tt4655444.html#a4655472) was held on Monday July 9, at 9am Central US time.  There were 27 connections to the call, some with multiple people on the connection.  The call was run by Ann Black-Ziegelbein of the University of Iowa.  Ann was also the main presenter.

TABLE_OF_CONTENTS


# Links

* [Slides](ATTACHMENT_URLDocuments/Presentations/Czars2012_07_09UIowa.pdf)
* [Screencast](https://globalcampus.uiowa.edu/play_recording.html?recordingId=1262330108904_1341837832643) - This shows everything that happened on the call, except for the polls, just as it happened on the call.  

# Agenda

* [Logistics](#logistics): Address how we want to tackle these calls. Go over generic agenda. Frequency of calls
* [Group Goals](#goals): what do we want to accomplish with this group beyond discussions/sharing?
* [Presentation](#galaxy-at-iowa): Galaxy at Iowa: Discuss our issues with big data, how NGS tools take in/output data and finding the right storage server solution.
* [Open Mic](#open-mic) & recruit new volunteers for the next call.
* [Break out at Galaxy Community Conference](#gcc2012-breakout)

## Logistics

<div class='right'><a href='/Community/GalaxyAdmins.md'><img src='/Images/Logos/GalaxyCzars.png' alt='GalaxyCzars' width="150" /></a></div>

### Generic Call Agenda

Ann proposed this generic agenda for future calls
* 20 min: Galaxy in Our Town. 
    Presentation from a local galaxy institution on what they are doing or a problem they are troubleshooting - or have someone walk through their use cases and pain points.
* 20 min: Galaxy Today/Tomorrow. 
    Presentation on a galaxy coding item. Either from [Galaxy Team](/GalaxyTeam), or from [someone](/Community) working on a new feature or customization.
* 20 mins: Open Mic Discussion & make point to point connections. 
    Organize smaller breakouts if someone wants to host a call specific to an issue, ...

This was approved by those present.

### Call Frequency

We discussed how often we should have these conference calls.  Monthly, every other month, and once a quarter were all presented as options.  We settled on every other month.  Participants are encouraged to form smaller, tightly focused breakouts in the off months.

### Call Technology

We used the University of Iowa's Blackboard system for the call.  This supported 27 listeners without a problem.  It does limit concurrent talkers to 6, but participants had no problems using a talking slot for only as long as needed.  Some care was needed to avoid getting feedback with participants without headphones.  The system supports chat and voting, both of which were used extensively on the call.

The group decided to continue with Blackboard.

### Non-Meeting Communication

Communication outside of meetings will continue to happen on the [Galaxy-Dev mailing list](/MailingLists).  We will consider other options if that becomes unworkable.

## Goals

1. Build a community 
2. Learn from each other.

<div class='right'>![University of Iowa](/Images/Logos/UIowaLogo.jpg)</div>

## Galaxy at Iowa

See the [slides](ATTACHMENT_URLDocuments/Presentations/Czars2012_07_09UIowa.pdf) starting at page 3 or 4 for this material.  This was a great talk about their experiences with setting up a large Galaxy instance and their thorough benchmarking experiments with different storage architectures.  

*Note: The summary here is sparse.  Please help by expanding it.*

### Storage Architecture

They initially started with Lustre on HP MSA 2312sa P2000 G2 hardware.  That failed badly.  The Iowa team then benchmarked ZFS, Gluster, and a reconfigure Lustre using several network technologies.  Gluster came out on top.  See the slides for details, links to the benchmarking scripts used, and to reports for each combination tried.

*Note: The bulk of the slides and the screencast are about storage architecture.  If this interests you then you are encouraged to watch the [screencast](https://globalcampus.uiowa.edu/play_recording.html?recordingId=1262330108904_1341837832643).*

### Other Highlights

There is an upcoming workshop at Iowa, 

 [Bioinformatics Short Course](http://www.medicine.uiowa.edu/humangenetics/bioinformaticscourse/) August 1-3, 2012
  [Mutation Detection Using Massively Parallel Sequencing: From Data Generation to Variant Annotation](http://www.medicine.uiowa.edu/humangenetics/bioinformaticscourse/)

The course will leverage Iowa’s Galaxy Deployment.  It is sponsored by the Iowa Initiative in Human Genetics.

Iowa addresses the "give them enough rope" conundrum* by providing well tested and documented workflows for several common analysis at the University of Iowa, and then emphasizing those in their Galaxy web site design.  The hope is that learning how to use bioinformatic tools in a well-established context will help users with subsequent custom workflow construction.

<table>
  <tr>
    <td style=" border: none vertical-align: top;"> <sup>*</sup> </td>
    <td style=" border: none"> A major focus of Galaxy is to empower researchers by giving them access to bioinformatic tools.  However, running tools with default settings will often not give very meaningful results.  Thus, Iowa's approach gives users a more gentle introduction to tools before setting them loose.  This works at Iowa because they do have a number of analyses that are run over and over, but on different samples. </td>
  </tr>
</table>


## Open Mic

## GCC2012 Breakout

There will be a [GalaxyCzars](/Community/GalaxyAdmins) breakout session at [GCC2012](/Events/GCC2012) at the end of this month.  It will be a chance to refine the groups goals, logistics, and schedule and a great to chance to meet in person.

## Next Meeting

The next [conference call](../) will happen in September.  If you have a large Galaxy installation, please consider telling the group about it.
