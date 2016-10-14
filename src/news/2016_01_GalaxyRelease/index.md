---
date: 2016-02-24T22:48:55Z
---
<div class='newsItemHeader'>[Jan 2016 Galaxy Release (v 16.01)](/News/2016_01_GalaxyRelease)</div>

<div class='right'><a href='http://getgalaxy.org'><img src='/Images/Logos/GalaxyNewLogo_GalaxyProject_Trans.png' alt='GalaxyProject' width="200" /></a></div>
 
**See the [full release notes](https://docs.galaxyproject.org/en/master/releases/16.01_announce.html).**

The [Galaxy Committers team](https://github.com/galaxyproject/galaxy/blob/dev/doc/source/project/organization.rst) is pleased to announce the [January 2016 (v16.01) release of Galaxy](https://docs.galaxyproject.org/en/master/releases/16.01_announce.html).

**Galaxy administrators should also be aware of the<div class='red'> security announcements </span>linked to below.**

<span style="font-size: larger;"> **Highlights** </span>

**Interactive Tours**

The interactive tours framework allows developers and deployers to build interactive tutorials for users superimposed on the actual Galaxy web front end. Unlike video tutorials, these will not become stale and are truly interactive (allowing users to actually navigate and interact with Galaxy). Galaxy 16.01 ships with two example tours and new ones can easily be added by creating a small YAML file describing the tour. Try the Galaxy UI tour on Main.

**Wheels**

Galaxy’s Python dependencies have traditionally been distributed as eggs using custom dependency management code to enable Galaxy to distribute binary dependencies (enabling quick downloads and minimal system requirements). With this release all of that infrastructure has been replaced with a modern Python infrastructure based on pip and wheels. Work done as part of this to enable binary dependencies on Linux has been included with the recently released pip 8.

Detailed documentation on these changes and their impact under a variety of Galaxy deployment scenarios can be found in the Galaxy Framework Dependencies section of the Admin documentation.

**Nested Workflows**

Workflows may now run other workflows as a single abstract step in the parent workflow. This allows for reusing or subworkflows in your analyses.


<table>
  <tr>
    <td style=" border: none;"> <span style="font-size: larger;"> Github </span> <br /><br /><strong>New</strong><br /><code>% git clone -b master https://github.com/galaxyproject/galaxy.git</code><br /><br />U<strong>pdate to latest stable release</strong><br /><code>% git checkout master && pull --ff-only origin master</code><br /><br /><strong>Update to exact version</strong><br /><code>% git checkout v16.01</code> </td>
    <td style=" vertical-align: top; border: none; width: 10%;"> </td>
    <td style=" vertical-align: top; border: none;"> <span style="font-size: larger;"> !BitBucket </span> <br /><br /><strong>Upgrade</strong><br /><code>% hg pull</code><br /><code>% hg update latest_16.01</code> </td>
  </tr>
  <tr>
    <td colspan=3 style=" border: none;"> See the <a href='/Admin/GetGalaxy'>Get Galaxy</a> page for additional details regarding the source code locations. </td>
  </tr>
</table>



<span style="font-size: larger;"> Deprecation Notices </span>

Barring a strong outcry from deployers, 16.01 will be the last release of Galaxy to support Python 2.6. For more information, see [Galaxy Github Issue #1596](https://github.com/galaxyproject/galaxy/issues/1596).

<br />
<div class='red'><div class='indent'>
<br />
<span style="font-size: larger;"> **Security Announcements** </span>

**Read/write arbitrary filesystem paths, arbitrary code execution**

Multiple security vulnerabilities were recently discovered in Galaxy that allow malicious actors to read and write files on the Galaxy server. Additionally, Galaxy servers on which a rarely used feature has been enabled are vulnerable to an arbitrary code execution exploit.  

*This issue affects all known releases of Galaxy in at least the last 3 years.*  See the [full announcement](http://dev.list.galaxyproject.org/Galaxy-Security-Vulnerability-Read-write-arbitrary-filesystem-paths-arbitrary-code-execution-td4668936.html) for details.

**Tool Shed Security Vulnerability - Read/write arbitrary filesystem paths**

Multiple security vulnerabilities were recently discovered in the Tool Shed that allow malicious actors to read and write files on the Tool Shed server outside of normal Tool Shed repository directories. 

*This issue affects all known releases of Galaxy in at least the last 3 years.*  See the [full announcment](http://dev.list.galaxyproject.org/Galaxy-Tool-Shed-Security-Vulnerability-Read-write-arbitrary-filesystem-paths-td4668935.html) for details.
<br /><br />

</div></div>

CategoryNews
