---
title: 'Galaxy Release 21.01'
tease: Workflow Reports, Remote Files, Visualizations
date: '2021-03-16'
---

We are pleased to announce the release of Galaxy
21.01 - **[developer and admin release announcement](https://docs.galaxyproject.org/en/master/releases/21.01_announce.html)** and **[user release announcement](https://docs.galaxyproject.org/en/master/releases/21.01_announce_user.html)**.

# Highlights

Workflows are the absolute ✨star✨ of Galaxy v21.01, they have seen huge
improvements.

## Workflows: Best Practices, Reports, Invocations

Workflows have seen huge improvements this release! The workflow report
editor is easier than ever to use providing you with a list of common
report components, interactive interfaces for embedding them in your
reports, and a new workflow invocation tracker. You can now embed
visualizations directly in your workflow reports making summarizing your
analyses easier than ever. And, once your reports are produced, you can
export them directly to pages to share your reports with colleagues.

<iframe width="560" height="315" src="https://www.youtube.com/embed/TmZzfaKf1V0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

If you're building advanced workflows utilizing Galaxy's powerful
sub-workflows for reusable workflow components, then you'll be pleased
to know you can now automatically update those to the latest version

<iframe width="560" height="315" src="https://www.youtube.com/embed/2gHvmy_tIVc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Furthermore when you're making workflows to share with others, a new
"Best Practices" checker has been included which helps you discover easy
things which make your workflows more shareable.

<iframe width="560" height="315" src="https://www.youtube.com/embed/pfNqAkzvKj8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Remote Files

There was tough competition for top feature to highlight from 21.01 but
the **Remote Files** interface is an absolutely fantastic new way to
browse your data. Inside Galaxy there is a new, abstract way to
reference files locally and on other servers. This let us provide a
uniform interface to FTP servers, your Dropbox, public S3 buckets, and
more! You'll find this under *Choose Remote Files* in the upload
interface.

![](https://docs.galaxyproject.org/en/latest/_images/21.01-remote.png)
*Screenshot of the remote files
browser in the upload dialog. It lists several popular datasets such as
PDB the protein data bank, EBI's FTP server, Genome Ark, and 1000
Genomes among others.*

The Galaxy Climate community is providing an excellent test case; much
of their data is publicly available on public S3 buckets which were not
easy to access, now they're directly available from Galaxy. No more
magic "import this url" steps in your documentation, now "just browse
the repository for your data".

![](https://docs.galaxyproject.org/en/latest/_images/21.01-remote-weather.png)
*Screenshot of the remote files browser in the upload dialog. Here climate datasets are
highlighted such as Sentinel, Copernicus, and NOAA's public datasets. At
the bottom is the user's FTP directory.*

But the addition of the Remote Files browser didn't stop there! Several
other interfaces received updates to use this new framework:

## History Import & Export

Histories can now be exported directly to your FTP folders, Dropbox, or
any other configured remote file storage.

![](https://docs.galaxyproject.org/en/latest/_images/21.01-hist-exp.png) 
*Screenshot of "Export
history archive" interface showing the new "to a remote file" option
with the user's FTP directory selected and foo.tar.gz entered as an
example filename*

And history importing saw the same treatment, permitting importing from
any of these public data locations making it easier than ever to share
histories between Galaxy, and make your analyses more reproducible!

![](https://docs.galaxyproject.org/en/latest/_images/21.01-hist-imp.png) 
*Screenshot of "Import history from archive" interface which now includes an option to "Select
a remote file" which provides access to the remote file interface.*


## Rule Builder

Likewise the Rule-Builder now has access to the remote files interface.
Sample sheets with identifiers can easily be found in many FTP servers
and other locations, and then loaded directly into the Rule Builder via
this new interface. So easy!

## Beta History Panel

The History panel is getting a refresh and a huge performance boost in
the latest code. Does this sound exciting to you? Try it out now with
the history menu option "Use Beta History Panel". This is not its final
state but we'd love feedback from you, the users, on how you find it. It
features both performance and usability improvements. E.g. now you can
rename files without going into a separate menu, just double click the
dataset title!

![](https://docs.galaxyproject.org/en/latest/_images/21.01-beta-hist.png)

*Beta history screenshot with a history titled "The Beta History", a few datasets and
collections, and a textbox shown where the dataset title is being edited
directly.*

## User-friendliness Improvements

This is a new section covering smaller improvements that just make your
life easier and your interactions with Galaxy faster.

-   Interactive tools can be stopped, without their outputs
    disappearing, better for reproducibility!
-   When uploading files, the 'name' field will be auto-focused,
    allowing you to get straight to renaming the files, saving you time.
-   Workflow versions now expose their update time. Reverting to an old
    version? Oh, yes, that one from Tuesday!
-   Sharing components now include a "copy to clipboard" feature for
    URLs. One click and you're ready to share with the world.
-   The GTN-in-Galaxy overlay now keeps track of the page you were
    looking at if the Galaxy page gets refreshed. Go forth and learn
    without distraction!

# New Visualizations

NORA, a medical image viewer and annotation tool

![](https://docs.galaxyproject.org/en/latest/_images/21.01-nora.png)
*Screenshot of the NORA visualizer showing three views of a scan of a human brain.*

OpenSeadragon viewer for deep zoom images


# Release Notes

Please see the [full release notes](https://docs.galaxyproject.org/en/latest/releases/21.01_announce.html) for more
details.
