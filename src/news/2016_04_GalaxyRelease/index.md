<div class='newsItemHeader'>[April 2016 Galaxy Release (v 16.04)](/News/2016_04_GalaxyRelease)</div>

<div class='right'><a href='http://getgalaxy.org'><img src='/Images/Logos/GalaxyNewLogo_GalaxyProject_Trans.png' alt='GalaxyProject' width="200" /></a></div>
 
<br />
The [Galaxy Committers team](https://github.com/galaxyproject/galaxy/blob/dev/doc/source/project/organization.rst) is pleased to announce the **[April 2016 (v16.04) release of Galaxy](https://docs.galaxyproject.org/en/master/releases/16.04_announce.html)**.

<br />
*Please note that Python 2.6 is no longer supported as of this release. See the [16.04 release announcement](https://wiki.galaxyproject.org/News/2016_04_GalaxyRelease) for details.*

<br />
<span style="font-size: larger;"> **Highlights** </span>

**Tool Profile Versions**

Tools may now [declare which version](http://planemo.readthedocs.io/en/latest/galaxy_changelog.html#tool-profile-version-pr-1688) of Galaxy they require. Tools requiring 16.04 or newer will have new default behaviors (such as using exit code for error detection) that should simplify tool development. See [PR #1688](https://github.com/galaxyproject/galaxy/pull/1688).

**Embedded Pulsar Job Runner**

Galaxy can now start a Pulsar application embedded within the Galaxy process itself. This allows using Pulsar’s job staging and isolation without requiring a RESTful web service or a message queue. This is enabling usegalaxy.org to run jobs to on the new [JetStream cloud](http://jetstream-cloud.org/). See [PR #2057](https://github.com/galaxyproject/galaxy/pull/2057).

**New Chemical Datatypes**

Galaxy now detects and supports many molecular datatypes. See [PR 1941](https://github.com/galaxyproject/galaxy/pull/1941). Thanks to [Björn Grüning (@bgruening)](https://github.com/bgruening).

<br />

<table>
  <tr>
    <td style=" border: none"> <span style="font-size: larger;"> Github </span> <br /><br /><strong>New</strong><br /><code>% git clone -b master https://github.com/galaxyproject/galaxy.git</code><br /><br />U<strong>pdate to latest stable release</strong><br /><code>% git checkout master && git pull --ff-only origin master</code><br /><br /><strong>Update to exact version</strong><br /><code>% git checkout v16.04</code> </td>
    <td style=" vertical-align: top; border: none; width: 10%"> </td>
    <td style=" vertical-align: top; border: none"> <span style="font-size: larger;"> !BitBucket </span> <br /><br /><strong>Upgrade</strong><br /><code>% hg pull</code><br /><code>% hg update latest_16.04</code> </td>
  </tr>
  <tr>
    <td colspan=3 style=" border: none"> See the <a href='/Admin/GetGalaxy.md'>Get Galaxy</a> page for additional details regarding the source code locations. </td>
  </tr>
</table>


<br />
***Thanks for using Galaxy!***

<br />
<div class='newsItemFooter'>Posted to the [Galaxy News](/News) on <<Date(2016-05-18T18:20:35Z)>></div>

CategoryNews
