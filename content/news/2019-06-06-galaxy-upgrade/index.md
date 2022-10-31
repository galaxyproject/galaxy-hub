---
title: UseGalaxy.eu update to 19.05
date: '2019-06-06'
tags: [release]
authors: hexylena
authors_structured:
- github: hexylena
subsites: [eu, pasteur, freiburg, erasmusmc, elixir-it, belgium, genouest]
main_subsite: eu
---

We've updated our Galaxy server to version 19.05 and now use EU blue in celebration of European Unity, ahead of us hosting this year's [Galaxy Community Conference](https://galaxyproject.org/events/gcc2019/)

# Galaxy Upgrade

Other than an issue resulting from high system load, the upgrade went quite smoothly.

## New Features

**Tool Favorites**

Tools can now be marked as favorites, and then they’ll be easily accessible from the star button in your tool panel.

![Adding a favourite tool](https://docs.galaxyproject.org/en/latest/_images/19.05-favs.gif)

**Workflow Editor Connection Feedback**

The editor now provides feedback on why connections are invalid, so you aren’t left wondering why two tools won’t connect. For complex data pipelines this should greatly simplify your life!

<img alt="Workflow editor connections provide feedback on why they won't connect." src="https://docs.galaxyproject.org/en/latest/_images/19.05-wf-hints.gif">

**Data Dialog for Tool Form**

There is a new way to select datasets when running tools! It is a very simple method to select any number of files from both your History and Data Libraries.

<img alt="Data dialog for selecting dataset in the tool form." src="https://docs.galaxyproject.org/en/latest/_images/19.05-inputs.gif">

Additionally the selector implements a highly requested feature, the ability to run tools on arbitrary datasets from a collection

<img alt="Selecting datasets from within a collection." src="https://docs.galaxyproject.org/en/latest/_images/19.05-input-collection.gif">

**History Export/Import Reworked**

These features used to be clumsy in the past but do not despair since in this release they got a revamp and their reliability skyrocketed! Moving historic object across Galaxies should now be easier than ever. Rocketfuel included.

