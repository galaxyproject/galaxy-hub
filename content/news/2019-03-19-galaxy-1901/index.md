---
title: UseGalaxy.eu update to 19.01
date: '2019-03-19'
tags: [release]
authors: hexylena
authors_structured:
- github: hexylena
subsites: [eu, pasteur, freiburg, erasmusmc, elixir-it, belgium, genouest]
main_subsite: eu
---

We've updated our Galaxy server to version 19.01.

# Galaxy Upgrade

We had expected this to be a short downtime since upgrades have been
increasingly smooth since 18.09. Unfortunately for reasons we are still
investigating the upgraded version did not funtion with our server setup. We
have updated our system to respond to this, and after some downtime Galaxy is
again online. We apologise for the inconvenience this has caused.

## New Features

The latest Galaxy release includes lots of awesome new features:

**Revised UI Style**

The Galaxy styling has been substantially reworked resulting in the largest visual refresh to Galaxy in years. It should provide a much cleaner and more consistent interface.

![Revised UI style cleans up the UI to be more consistent and clear](/assets/media/19.01-revised-ui.png)

**More Colourful Tags**

Whenever you use dataset name tags (``#tag``), they will randomly be assigned a color. The colors are consistent; anywhere that tag with the same text appears in your history, it will have the same color. This should increase visual distinction between similarly shaped words, making it easier to track data flow in complex analyses.

![Tags are now randomly assigned a consistent colour, helping you to distinguish between similarly shaped words](/assets/media/19.01-colourful-tags.png)

**Extensive Workflow Enhancements**

The workflow editor now features new tool-like inputs which provide non-file data (such as numbers, text, true/false, colors) which can be connected to tool inputs. You are no longer restricted to only using files as inputs to tools!

![Workflow inputs are available at the top of the workflow editor menu, under "Inputs"](/assets/media/19.01-new-wf-inputs.png)

The workflow editor allows you to specify that specific inputs should be exposed, and can thus be connected to the new workflow inputs.

![The new inputs can be assigned a data type](/assets/media/19.01-new-wf-types.png)

**New Help Site**

There's a new discussion forum to replace Biostars. It is accessible under the 'Help' menu on some Galaxies, or at https://help.galaxyproject.org

![Galaxy's new help forum which replaces biostars](/assets/media/19.01-help-site.png)

