---
autotoc: true
title: April 2013 Galaxy Update
---


<div class='right'></div>

<div class='left'><a href='/src/GalaxyUpdates/index.md'><img src="/src/images/Logos/GalaxyUpdate200.png" alt="Galaxy Updates" width=150 /></a></div>

Welcome to the April 2013 *[Galaxy Update](/src/GalaxyUpdates/index.md)*, a monthly summary of what is going on in the Galaxy community. *[Galaxy Updates](/src/GalaxyUpdates/index.md)* complement the *[Galaxy Development News Briefs](/src/DevNewsBriefs/index.md)* which accompany new Galaxy releases and focus on Galaxy code updates.

<br />

## New Public Galaxy Servers

<div class='left'><a href='https://ballaxy.bioinf.uni-sb.de/'><img src="/src/PublicGalaxyServers/BallaxyHomePage.png" alt="ballaxy Galaxy public server"  /></a></div>

[ballaxy](https://ballaxy.bioinf.uni-sb.de) hosts the [BALL (Biochemical Algorithms Library) Project tools](http://www.ball-project.org/), i.e. computer aided drug design and molecular modelling based on protein and ligand structure data.  It is tailored to handle structural molecular data (pdb, mol, mol2, hin, xyz, smiles) and to offer tools for modelling tasks like chemical shift prediction "[NightShift](http://bit.ly/WZPjPt)" or  optimal bond order assignment of ligands "BOA Constructor".
A login is required and everybody can create a login, *but there is no guarantee how long any data will be preserved.*  ballaxy is supported by the groups of [Hans-Peter Lenhof](http://www.bioinf.uni-sb.de/HPL) (Saarland University, Saarbrücken, Germany), [Oliver Kohlbacher](http://www-bs.informatik.uni-tuebingen.de) (University of Tübingen, Germany), and [Andreas Hildebrandt](http://bio.informatik.uni-mainz.de/members/andreas.hildebrandt) (University of Mainz, Germany).

<br />

<div class='right'><a href='http://gohelle.cirad.fr/galaxy/'><img src="/src/PublicGalaxyServers/SouthGreenHomePage.png" alt="South Green Galaxy public server"  /></a></div>

[South Green Galaxy](http://gohelle.cirad.fr/galaxy/) is a part of the [South Green Bioinformatics Platform (SGBP)](http://southgreen.cirad.fr/), "a bioinformatics platform applied to the genomic resource analysis of southern and Mediterranean plants."  It supports many custom tools and data sources relevant to plants.  It also has a *10 MB storage quota for anonymous users.*  Account creation is restricted to those with an [active collaboration](http://umr-agap.cirad.fr/en) and that work on southern and Mediterranean plants.  South Green Galaxy is sponsored by [CIRAD](http://www.cirad.fr/en/), [IRD (Institut de recherche pour le développement)](http://en.ird.fr/), [Bioversity International](http://www.bioversityinternational.org/), [INRA](http://www.international.inra.fr/), [Montpellier SupAgro](http://www.supagro.fr/web/?idl=20)

These servers join the [growing list of public Galaxy servers](/src/PublicGalaxyServers/index.md).

## New Papers

<div class='left'>
<table>
  <tr>
    <th> # </th>
    <th> Tag </th>
  </tr>
  <tr>
    <td style=" text-align: right;"> 16 </td>
    <td> <a href='http://www.citeulike.org/group/16008/tag/methods'>methods</a> </td>
  </tr>
  <tr>
    <td style=" text-align: right;"> 8 </td>
    <td> <a href='http://www.citeulike.org/group/16008/tag/usemain'>usemain</a> </td>
  </tr>
  <tr>
    <td style=" text-align: right;"> 7 </td>
    <td> <a href='http://www.citeulike.org/group/16008/tag/workbench'>workbench</a> </td>
  </tr>
  <tr>
    <td style=" text-align: right;"> 4 </td>
    <td> <a href='http://www.citeulike.org/group/16008/tag/unknown'>unknown</a> </td>
  </tr>
  <tr>
    <td style=" text-align: right;"> 3 </td>
    <td> <a href='http://www.citeulike.org/group/16008/tag/tools'>tools</a> </td>
  </tr>
  <tr>
    <td style=" text-align: right;"> 2 </td>
    <td> <a href='http://www.citeulike.org/group/16008/tag/isgalaxy'>isgalaxy</a> </td>
  </tr>
  <tr>
    <td style=" text-align: right;"> 2 </td>
    <td> <a href='http://www.citeulike.org/group/16008/tag/shared'>shared</a> </td>
  </tr>
  <tr>
    <td style=" text-align: right;"> 2 </td>
    <td> <a href='http://www.citeulike.org/group/16008/tag/usepublic'>usepublic</a> </td>
  </tr>
  <tr>
    <td style=" text-align: right;"> 2 </td>
    <td> <a href='http://www.citeulike.org/group/16008/tag/cloud'>cloud</a> </td>
  </tr>
  <tr>
    <td style=" text-align: right;"> 1 </td>
    <td> <a href='http://www.citeulike.org/group/16008/tag/project'>project</a> </td>
  </tr>
  <tr>
    <td style=" text-align: right;"> 1 </td>
    <td> <a href='http://www.citeulike.org/group/16008/tag/uselocal'>uselocal</a> </td>
  </tr>
</table>

</div>

There are several things to report in the *New Papers* arena.  First, the process we used to synchronise the Galaxy CiteULike group with it's Mendeley mirror broke, and has not been fixed yet. Mendeley dropped support for automatic synchronization with CiteULike at the end of February and so no updates have been pushed to Mendeley since then.  We are looking for processes that are not too labor / manual intervention intensive.  We are also reviewing our general use of CiteULike and Mendeley.  If you have any suggestions, please [send them to us](mailto:outreach AT galaxyproject DOT org).

Second several new tags were added, most of them attached to papers with the `methods` tag, and indicating (if the paper indicates) where the analysis was run.

<table>
  <tr>
    <td style=" text-align: right; border: none;"> <code>usemain</code>: </td>
    <td style=" text-align: left; border: none;"> Analysis run on <a href='Main'>/src/Main/index.md</a> </td>
  </tr>
  <tr>
    <td style=" text-align: right; border: none;"> <code>usepublic</code>: </td>
    <td style=" text-align: left; border: none;"> Analysis run on <a href='/src/PublicGalaxyServers/index.md'>other public Galaxy servers</a> </td>
  </tr>
  <tr>
    <td style=" text-align: right; border: none;"> <code>useprivate</code>: </td>
    <td style=" text-align: left; border: none;"> Analysis run on private Galaxy servers </td>
  </tr>
  <tr>
    <td style=" text-align: right; border: none;"> <code>usecloud</code>: </td>
    <td style=" text-align: left; border: none;"> Analysis run on cloud based Galaxy servers </td>
  </tr>
  <tr>
    <td style=" text-align: right; border: none;"> <code>cloud</code>: </td>
    <td style=" text-align: left; border: none;"> Papers that emphasize or are about cloud deployments </td>
  </tr>
</table>


We will likely back-annotate papers with these new tags from the beginning of 2013, but not prior to that.

Finally, 32 new papers were added to the Galaxy CiteULike Group in March, including these which might be of general interest to the Galaxy community. 

* "[NightShift: NMR Shift Inference by General Hybrid Model Training - a Framework for NMR Chemical Shift Prediction](http://dx.doi.org/10.1186/1471-2105-14-98)" by Dehof *et al.* *BMC Bioinformatics*, Vol. 14, No. 1. (16 March 2013), 98

* "[Computational Predictions Provide Insights into the Biology of TAL Effector Target Sites](http://dx.doi.org/10.1371/journal.pcbi.1002962)" by *Grau et al.* *PLoS computational biology*, Vol. 9, No. 3. (14 March 2013), e1002962

* "[Aye-aye population genomic analyses highlight an important center of endemism in northern Madagascar](http://dx.doi.org/10.1073/pnas.1211990110)," by Perry, *et al.* Proceedings of the National Academy of Sciences (25 March 2013)

There are now over [900 papers in the Galaxy CiteULike Group](http://www.citeulike.org/group/16008/).

<br />

## Who's Hiring

<div class='right'><a href='/src/GalaxyIsHiring/index.md'><img src="/src/GalaxyIsHiring/GalaxyIsHiringWordCloud2.png" alt="Please Help! Yes you!" width="200" /></a></div>

The Galaxy is expanding! Please help it grow.

* **The [Galaxy Project is hiring software engineers and post-docs](/src/GalaxyIsHiring/index.md)!** at both Emory and Penn State.
* [Senior Developer, Stem Cell Bioinformatics Core](http://bit.ly/YQn94O) : Seattle, WA, United States. 
* [CDD Ingénieur en Bioinformatique grand séquençage](http://bit.ly/12UUPWh) - Institut Curie
* Two openings @ LSU: [Bioinformatics Support Group Leader](http://bit.ly/VkRtrb) and [Post-doc/Res Assoc](http://bit.ly/12ipJHZ)
* **[Bioinformatics Trainter/Analyst](http://bit.ly/14xgrVK)**, [Morgridge Institute for Research](http://discovery.wisc.edu/morgridge/), Madison, Wisconsin, United States

Got a Galaxy-related opening? Send it to outreach@galaxyproject.org and we'll put it in the [Galaxy News feed](/src/news/index.md) and include it in next month's [update](/src/GalaxyUpdates/index.md).


## GCC2013

<div class='center'><a href='/src/events/GCC2013/index.md'><img src="/src/images/Logos/GCC2013Logo400.png" alt="2013 Galaxy Community Conference (GCC2013)" width="300" /></a> </div>

<table>
  <tr>
    <th> &nbsp;&nbsp; <strong>The deadline for <a href='/src/events/GCC2013/Abstracts/index.md'>submitting oral presentation abstracts</a> is 12 April.</strong> &nbsp;&nbsp; </th>
  </tr>
</table>


<br />

The [2013 Galaxy Community Conference (GCC2013)](/src/events/GCC2013/index.md) will be held 30 June through July 2 in Oslo Norway, at the [University of Oslo](http://uio.no).

[GCC2013](/src/events/GCC2013/index.md) is an opportunity to participate in two full days of presentations, discussions, poster sessions, keynotes, lightning talks and breakouts, all about high-throughput biology and the tools that support it. The conference also includes a [Training Day](/src/events/GCC2013/TrainingDay/index.md) for the second year in a row, this year with more in-depth topic coverage, more concurrent sessions, and more topics.

### Registration, Talk/Poster Submission Open

**[Early registration](/src/events/GCC2013/Register/index.md) and [paper and poster abstract submission](/src/events/GCC2013/Abstracts/index.md) are open.** 

<div class='right'><a href='/src/events/GCC2013/TrainingDay/index.md'><img src="/src/images/Logos/GCC2013TrainingDayLogo200.png" alt="2013 Galaxy Community Conference (GCC2013) Training Day" width="150" /></a></div>

**[Register early](/src/events/GCC2013/Register/index.md)** and *save up to 75% off regular registration costs.*  Early registration is very affordable, with combined registration ([Training Day](/src/events/GCC2013/TrainingDay/index.md) + main meeting) starting at ~ €95 for post-docs and students.  Registering early also assures you a spot in the Training Day workshops you want to attend.  Once a session becomes full, it will be closed to new registrations.  Early registration closes 24 May.

**[Abstract submission](/src/events/GCC2013/Abstracts/index.md)** for both oral presentations and posters is also open.  **Abstract submission for oral presentations closes 12 April**, and poster abstract submission closes 3 May.  Please consider presenting your work. If you are dealing with big biological data, then this meeting wants to hear about your work.

### Sponsorships

There are still several [sponsorships](/src/events/GCC2013/Sponsorships/index.md) still available. Please contact the [Organizers](/src/events/GCC2013/Organizers/index.md) if your organization would like to help sponsor this event. 


## Galaxy at GMOD 2013, Biocuration 2013 and TGAC

<div class='right'><a href='http://www.ebi.ac.uk/biocuration2013/content/workshop-descriptions'><img src="/src/images/Logos/ISBLogoWAcronym223.png" alt="Biocuration 2013" height="60" /></a><br />
<a href='/src/events/TGAC2013/index.md'><img src="/src/images/Logos/TGACLogo.png" alt="Introduction to Galaxy Workshop @ TGAC" height="40" /></a></div>
<div class='right'> <a href='/src/gmod:April_2013_GMOD_Meeting/index.md'><img src="/src/images/Logos/GMOD2013Logo240.png" alt="GMOD 2013" height="80" /></a></div>

Galaxy will [have a presence](/src/news/GalaxyGMODBiocuration2013/index.md) at both the [GMOD 2013](http://gmod.org/wiki/April 2013 GMOD Meeting) and [Biocuration 2013](http://www.ebi.ac.uk/biocuration2013/home).  Both are being held in Cambridge, UK in early April.  If you are interested in either community, then it would be great to see you there.

There is also a [Galaxy Workshop](/src/events/TGAC2013/index.md) at [The Genome Analysis Centre](http://www.tgac.ac.uk/) in nearby Norwich, UK on 11 April, the day after Biocuration ends.

## Other Upcoming Events

<div class='center'>
</div>

<div class='right'><a href='http://bit.ly/gxycal'><img src="/src/images/Icons/CalendarIcon.gif" /></a></div> 
See the [Galaxy Events Google Calendar](http://bit.ly/gxycal) for details on these and other events.

### Events

<table>
  <tr class="th" >
    <th> Date </th>
    <th> Topic/Event </th>
    <th> Venue/Location </th>
    <th> Contact </th>
  </tr>
  <tr>
    <th> April 5-6 </th>
    <td> <em><a href='http://gmod.org/wiki/April 2013 GMOD Meeting'>2013 GMOD Meeting</a></em> </td>
    <td> Cambridge, United Kingdom, immediately prior to <a href='http://www.ebi.ac.uk/biocuration2013/'>Biocuration 2013</a> </td>
    <td> <a href='/src/DaveClements/index.md'>Dave Clements</a> </td>
  </tr>
  <tr>
    <th> April 7-8 </th>
    <td> <a href='http://www.broadinstitute.org/events/interoperability-hackathon-2013/home'>BOSC/Broad Interoperability Hackathon</a> </td>
    <td> Cambridge, Massachusetts, United States </td>
    <td> <a href='http://bcbio.wordpress.com/'>Brad Chapman</a> </td>
  </tr>
  <tr>
    <th> April 7-10 </th>
    <td> <em><a href='http://www.ebi.ac.uk/biocuration2013/content/workshop-descriptions'>GO Galaxy Workshop</a></em> </td>
    <td> <a href='http://www.ebi.ac.uk/biocuration2013/home'>Biocuration 2013</a>, Cambridge, United Kingdom </td>
    <td> <a href='/src/DaveClements/index.md'>Dave Clements</a>, <a href='http://www.berkeleybop.org/person/suzanna-lewis'>Suzanna Lewis</a> </td>
  </tr>
  <tr>
    <th rowspan=2> April 9-11 </th>
    <td> Workshop: <em><a href='http://www.bio-itworldexpo.com/Bio-It_Expo_Content.aspx?id=110781'>Integrated Research Data Management for Next Gen Sequencing Analysis Using Galaxy and Globus Online Software-as-a-Service</a></em> </td>
    <td rowspan=2> <a href='http://www.bio-itworldexpo.com'>BioIT World</a>, Boston, Massachusetts, United States </td>
    <td> <a href='http://www.mcs.anl.gov/about/people_detail.php?id=347'>Ravi K. Madduri</a>, Alex R. Paciorkowski, Vas Vasiliadis </td>
  </tr>
  <tr>
    <td> Talk: <em><a href='http://www.bio-itworldexpo.com/Cloud-Computing-Boston/'>Integrated Research Data management and Analysis in NGS using Globus Online, Galaxy and Amazon Web Services</a></em> </td>
    <td> <a href='http://www.mcs.anl.gov/about/people_detail.php?id=347'>Ravi K. Madduri</a> </td>
  </tr>
  <tr>
    <th> April 10 </th>
    <td> <em><a href='http://bit.ly/13EwL9j'>Introduction to Galaxy Boot Camp</a></em> </td>
    <td rowspan=2> <a href='http://bioinformatics.ucdavis.edu/'>UC Davis Bioinformatics Core</a> Davis, California, United States </td>
    <td> <a href="mailto:najoshi AT ucdavis DOT edu">Nikhil Joshi</a> </td>
  </tr>
  <tr>
    <th> April 11 </th>
    <td> <em><a href='http://bit.ly/WIu9QH'>Introduction to RNASeq Boot Camp</a></em>  </td>
    <td> <a href="mailto:najoshi AT ucdavis DOT edu">Nikhil Joshi</a> </td>
  </tr>
  <tr>
    <th> April 11 </th>
    <td> <a href='/src/events/TGAC2013/index.md'>Introduction to Galaxy Workshop</a> </td>
    <td> <a href='http://www.tgac.ac.uk/galaxy-workshop/'>The Genome Analysis Centre</a>, Norwich, United Kingdom </td>
    <td> <a href='/src/DaveClements/index.md'>Dave Clements</a> </td>
  </tr>
  <tr>
    <th> May 14-16 </th>
    <td> Tutorial: <em>Exploring and Enabling Biomedical Data Analysis with Galaxy</em> </td>
    <td> <a href='http://www.iscb.org/glbio2013'>Great Lakes Bioinformatics Conference (GLBIO) 2013</a>, Pittsburgh, Pennsylvania, United States </td>
    <td> <a href='/src/anton/index.md'>Anton Nekrutenko</a> </td>
  </tr>
  <tr>
    <th> May 16-17 </th>
    <td> <em>Galaxy Workflows for Bioinformatics Analysis,</em> and <br /><em>Workshop 1A – Galaxy Workflows for Bioinformatics Analysis</em> </td>
    <td> <a href='http://bit.ly/WiNGS2013'>Workshop in Next-Generation Sequence Analysis and Metabolomics (WiNGS)</a>, UNC-Charlotte, North Carolina, United States </td>
    <td> <a href='/src/JamesTaylor/index.md'>James Taylor</a> </td>
  </tr>
  <tr>
    <th rowspan=3> May 28-31 </th>
    <td> <em><a href='http://www.bio-itworldasia.com/cla/'>A Genomics Virtual Lab for Cancer Research</a></em> </td>
    <td rowspan=3> <a href='http://www.bio-itworldasia.com/'>Bio-IT World Asia</a>, Singapore </td>
    <td> Dominique Gorse </td>
  </tr>
  <tr>
    <td> <em><a href='http://www.bio-itworldasia.com/Bio-It_Asia_Content.aspx?id=123563'>Next-Gen Sequencing Analysis Using GigaGalaxy</a></em> </td>
    <td> Tin-Lap Lee </td>
  </tr>
  <tr>
    <td> <em><a href='http://www.bio-itworldasia.com/Bio-It_Asia_Content.aspx?id=123563'>Open Source and Web-Based Analysis of NGS Data Using Galaxy at the Center for Research Informatics University of Chicago</a></em> </td>
    <td> Jorge Andrade </td>
  </tr>
  <tr>
    <th> June 6-7 </th>
    <td> <em><a href='http://bit.ly/VyBEcS'>Informatics on High Throughput Sequencing Data Workshop</a></em> </td>
    <td> Toronto, Ontario, Cananda </td>
    <td> <a href='http://bioinformatics.ca/person/cbw-experts/francis-ouellette'>Francis Ouellette </a> </td>
  </tr>
  <tr>
    <th> June 8-11 </th>
    <td> <em><a href='https://www.eshg.org/sunday2013.0.html#W1'>WS08: Biomedical Data Analysis with Galaxy</a></em> </td>
    <td> Workshop at <a href='https://www.eshg.org/eshg2013.0.html'>European Human Genetics Conference (ESHG2013)</a>, Paris, France </td>
    <td> <a href='/src/anton/index.md'>Anton Nekrutenko</a>, <a href='/src/EnisAfgan/index.md'>Enis Afgan</a> </td>
  </tr>
  <tr>
    <th> June 13-14 </th>
    <td> <a href='http://www.cdb.riken.jp/deepseq2013/index.html'>Genomics and Epigenomics with Deep Sequencing, the 24th CDB Meeting</a> </td>
    <td> RIKEN, CDB, Kobe, Japan </td>
    <td> <a href='/src/anton/index.md'>Anton Nekrutenko</a> </td>
  </tr>
  <tr>
    <th> June 30 - July&nbsp;2 </th>
    <td> <strong><em><a href='/src/events/GCC2013/index.md'>2013 Galaxy Community Conference (GCC2013)</a></strong></em> </td>
    <td> University of Oslo, Oslo, Norway </td>
    <td> <a href='/src/events/GCC2013/Organizers/index.md'>Organizers</a> </td>
  </tr>
</table>


## GalaxyAdmins

<div class='right'><a href='/src/Community/GalaxyAdmins//index.md'><img src="/src/images/Logos/GalaxyAdmins.png" alt="GalaxyAdmins" height="50" /></a></div>

### March 2013 Meetup

Slides and the screencast from the [March GalaxyAdmins Meetup](/src/Community/GalaxyAdmins/Meetups/2013_03_20/index.md) are [now available](/src/Community/GalaxyAdmins/Meetups/2013_03_20/index.md)  [Hailiang "Leon" Mei](mailto:hailiang DOT mei AT nbic DOT nl) spoke on *[NBIC Galaxy deployment](http://galaxy.nbic.nl/) at [SURFsara's HPC cloud](https://www.surfsara.nl/).*  [NBIC Galaxy (Andromeda)](http://galaxy.nbic.nl/) was migrated to a HPC cloud hosted by Surfsara in September 2012. Leon discussed the setup of this HPC cloud and the architecture of NBIC Galaxy and shared their experiences installing the NBIC Galaxy using the Cloudman scripts. The presentation finished with a list of issues and our possible future plans. [Dan Blankenberg](/src/Dan/index.md) also discussed the new Galaxy release process, and the upcoming Data Manager enhancements.


### GalaxyAdmins Future Directions

The [GalaxyAdmins group](/src/Community/GalaxyAdmins/index.md) is coming up on it's one year anniversary (coinciding with [GCC2013](/src/events/GCC2013/index.md)) and this is a good opportunity to discuss what the future of the group should be.  If you are interested, please [join the discussion on this email thread](http://bit.ly/11cECs9).

Some starting topics for discussion are on the [GalaxyAdmins Future Directions page](/src/Community/GalaxyAdmins/Future/index.md).  These include

* What should the group's goals and activities be?
* What type of leadership structure should the group have, and how should it be selected?

The discussion, however, is wide open to any topic relevant to the group.  If you have any opinions or suggestions please reply to the group.  Anyone with an interest in the group is encouraged to post.

Once the discussion settles, we will [summarize the discussion](http://bit.ly/11cECs9) on [the wiki page](/src/Community/GalaxyAdmins/Future/index.md) and suggest an action plan for making those things happen.

## Galaxy Distributions

<div class='right'><a href='http://galaxyproject.org'><img src="/src/images/NewsGraphics/2013_04_01_granular-galaxy-utilities.png" alt="tool shed" width=350 /></a></div>

**[April 1, 2013 Distribution](/src/DevNewsBriefs/2013_04_01/index.md)**

* [Job running configuration changes and refactoring of job runner plugins](/src/DevNewsBriefs/2013_04_01/index.md#job_running_configuration_changes)
* [Required reset of the metadata on your installed tool shed repositories](/src/DevNewsBriefs/2013_04_01/index.md#required_metadata_reset) plus [Changes required to your environment if you are hosting a local Tool Shed](/src/DevNewsBriefs/2013_04_01/index.md#local_tool_shed_file_changes)
* [Basic Data Manager Functionality now present](/src/DevNewsBriefs/2013_04_01/index.md#data)
* [Tool Shed](/src/DevNewsBriefs/2013_04_01/index.md#tool_shed), [Trackster](/src/DevNewsBriefs/2013_04_01/index.md#trackster), [Cloudman](/src/DevNewsBriefs/2013_04_01/index.md#cloudman), [Workflows](/src/DevNewsBriefs/2013_04_01/index.md#workflows), [UI](/src/DevNewsBriefs/2013_04_01/index.md#ui), [Admin](/src/DevNewsBriefs/2013_04_01/index.md#admin), and [ new Pull Request](/src/DevNewsBriefs/2013_04_01/index.md#source) updates.
* New [bug fixes and improvements](/src/DevNewsBriefs/2013_04_01/index.md#bug_fixes_and_related_enhancements).

## Tool Shed Contributions

<div class='right'><a href='http://toolshed.g2.bx.psu.edu/'><img src="/src/images/Logos/ToolShed.jpg" alt="Galaxy Tool Shed" width=150 /></a></div>

* [ctcf_analysis](http://bit.ly/Z6ii0k): computationally predict CTCF sites for a nucleotide sequence 
* [interproscan_to_excel](http://bit.ly/12AF0nF): Convert interproscan raw or xml output to an Excel file 
* [snpeff_cds_report](http://bit.ly/ZNDQPs): Get transcripts from Ensembl for snpEff variants and report coding changes
* [mmuff](http://bit.ly/15R40on): Missense Mutation and Frameshift Finder Workflow 

## Other News

* ["Galaxy for Core Facilities" ABRF talk slides now available](http://bit.ly/XNoVp1) 
* The servers that power [Main](/src/Main/index.md) were [relocated to their new room and building on March 14](/src/news/GalaxyProectServersDown20130314/index.md).
* The Galaxy Project now [has a LinkedIn group](http://bit.ly/gxyLinkedIn).  Please consider joining. 
* Several items relating to Galaxy have been approved for ISMB / ECCB 2013.  Will post as soon as there is a schedule.
* [Documentation for dynamic job destinations](http://wiki.galaxyproject.org/Admin/Config/Jobs)
* [Cloud-Based Image Analysis and Processing Toolbox](http://cloudimaging.blogspot.com/2013/03/imaging-workflows-in-galaxy.html?spref=tw)

