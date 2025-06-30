---
title: 'Doing the Branch, Release, and Merge Waltz'
slug: events/gcc2014/bofs/branch-release-merge
---
## Table of contents

* [Description](#description)
* [Audience](#audience)
* [When and Where](#when-and-where)
* [Who is Participating](#who-is-participating)
* [Topics Covered](#topics-covered)
  * [Managing the releases](#managing-the-releases)
  * [Choice of version control systems](#choice-of-version-control-systems)
  * [Configuration Directories](#configuration-directories)

# Description

This BoF will focus on branching and release management with regard to existing instances which implement customized code within Galaxy.  This may create huge challenges in the future, especially for instances in production which require a lot of maintenance and which run older versions of Galaxy. All Clouds and Clusters which require multiple extensions like:

* huge file management (upload, etc)
* authentication issues
* cluster/cloud connectivity

And the customization of these issues is not easy and straightforward.

# Audience

Those managing a local Galaxy instance with code customizations.

# When and Where

<table>
  <tr>
    <th> When </th>
    <td> Monday, June 30, 6:15pm </td>
  </tr>
  <tr>
    <th> Where </th>
    <td> Salon A </td>
  </tr>
</table>

# Who is Participating

If you are interested, please add your name below and/or send an email to [Nikolay Aleksandrov Vazov](http://www.usit.uio.no/om/organisasjon/uav/itf/ft/ansatte/nikolaiv/index.html).

* [Nikolay Aleksandrov Vazov](http://www.usit.uio.no/om/organisasjon/uav/itf/ft/ansatte/nikolaiv/index.html)
* [Hans-Rudolf Hotz](/people/hansrudolf-hotz/)
* Peter Cock
* ...

# Topics Covered

## Managing the releases

The only feasible way to avoid incompatibilities is to run updates regularly. First, here is a chance that some of the issues every single developer tried to solve themselves have already been addressed in the new release. Second, changes in the updates may make the customized solution easier. Yet, regular updates are very time consuming, especially when they concern production systems where admins have plenty of routine daily tasks. Customization will still remain a problem unless it can be carried out as a "full-fledged" plug-in.

## Choice of version control systems

github or bitbucket. Both were appreciated, seems to be a question of taste as long as both provide very similar features and functionalities. Mercurial will still be used to pull the versions for installation.

## Configuration Directories

We discussed the possibility of replacing the configuration files by configuration directories. A customized setup will then require a specific file which will be integrated into the default setup.
