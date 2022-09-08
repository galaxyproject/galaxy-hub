---
title: 'Galaxy Release 22.05'
tease: New History, Storage Dashboard, Bulk History Operations, Deferred Datasets, OpenAPI & much more!
date: '2022-08-23'
subsites: [global, us]
---

Dear Community,

The Galaxy Committers team is pleased to announce the release of Galaxy 22.05.

- **[Developer and admin release announcement](https://docs.galaxyproject.org/en/master/releases/22.05_announce.html)**.
- **[User release announcement](https://docs.galaxyproject.org/en/master/releases/22.05_announce_user.html)**.

A few release highlights are:


### The New History is Here

After years of effort by the development team and community
contributors, the new history is finally here. It's a big improvement
over the old history interface, both technically and in terms of user
experience, but it might take some getting used to. It has a lot of
great new features like:

- A quick switcher, letting you switch between recent histories
- Easily find dataset inputs
- Improved history search interface

Check it out now\!

![Screenshot of a history, the top most dataset is expanded and a "sitemap" icon is clicked which is showing inputs for that dataset. Each of those inputs has a small upward arrow next to the dataset number. The 'end' dataset of those inputs has a checkmark icon next to the dataset number. The history is titled the beta history and there are a lot of new buttons at the top.](https://docs.galaxyproject.org/en/master/_images/22.05-history.png)

### Storage Dashboard (beta)

Have you ever been over your quota? 250 GB sure goes fast\! Now with the
new Storage Dashboard you can get a quick overview of ways to help clean
up deleted datasets and recover some of that quota allocation. This is a
beta version of this interface, let us know if you have any issues. In
future versions, it will be expanded to help you understand how your
allocation is being used, and which histories and datasets should be
cleaned up first.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Qbf3FcRPhhE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen alt="Video of a user activating the storage dashboard interface, and then using the dataset deletion interface to delete multiple datasets, before seeing the decreased storage usage."></iframe>

### Bulk History Operations

The new history allows for improved bulk operations, selecting dozens or
hundreds of datasets to retag or change database key automatically, a
process that used to require using collections or doing them one by one.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/rSv4HgQaMkg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen alt="Video of a user selecting multiple datasets and applying a tag to all of them, before selecting multiple datasets and applying a database key to all of them as well."></iframe>

### Deferred dataset resolution enables running workflows and tools without importing data into Galaxy first

It is now possible to defer dataset resolution for datasets imported via
URLs and the "Choose remote files" dialog. This means that the deferred
dataset will only be downloaded as it is needed during job execution.
Deferred datasets will not count towards your storage quota, as the data
is not stored by Galaxy. To enable deferred dataset resolution click on
"Settings" in the upload dialog.

![Screenshot of the upload modal. The Settings menu is expanded and shows the "Deferred dataset resolution" checkbox.](https://docs.galaxyproject.org/en/master/_images/22.05-deferred-data-upload.png)

### Workflow Improvements

You can now see all invocations of a specific workflow, across all of
your histories.

![Screenshot of the drop down menu on a specific workflow, showing an invocation button. This is accessible via the workflow name in the workflow list.](https://docs.galaxyproject.org/en/master/_images/22.05-invocation-menu.png)

This is especially useful if you run a single workflow across multiple
datasets, and keep them nicely separated in multiple histories. You can
see all of the results in a single centralised location.

![List of workflow invocations for a specific workflow named Annotation Pipeline. A single invocation is visible along with the results and associated report in the normal workflow invocation view that appears after submitting a job.](https://docs.galaxyproject.org/en/master/_images/22.05-invocation-list.png)

Additional workflow improvements have been made, e.g. numbering of steps
in a workflow. Improvements have been made to the internal
representation of the workflow that should make the saved
`.ga` and `.gxwf.yml` files easier to compare across
changes.

Workflows can also now be zoomed in and out via scrolling, this
interface should be more familiar for anyone who has used Google Maps:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/B-Ku-zEiNOw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen alt="Video of a user zooming in and out of a workflow by scrolling."></iframe>

### Saved Rules

Do you use the Rule Based Uploader (RBU)? (If not, [learn how
today\!](https://training.galaxyproject.org/training-material/topics/galaxy-interface/tutorials/upload-rules/tutorial.html))
The RBU now has a very convenient recently used rule listing, sorted by
how recently they were used. You can hover over each entry to also list
a preview of what steps were done in that RBU invocation:

![Rule based uploader interface showing a list of recently used rules. The mouse hovers over the first one showing a short description of the rule mentioning filtering.](https://docs.galaxyproject.org/en/master/_images/22.05-history.png)

### Scratchbook Upgraded

The scratchbook has been updated to a new implementation. Now your views
of datasets can overlap, you have much more freedom in the size of each
window, and you can minimize datasets like minimizing a window to the
taskbar in Windows.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/1vd8o1m7cfc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen alt="Video of the new scratchbook, where the user opens datasets and minimizes them. They now appear at the bottom of the window"></iframe>

### OpenAPI Docs

The Galaxy API is going through an upgrade to FastAPI, which allows us
to generate OpenAPI documentation. If you're an API consumer, either via
BioBlend or via another system, you can use this to see all of the APIs
available from Galaxy and try them out live.

![Screenshot of the OpenAPI autogenerated documentation listing all of the available Galaxy APIs. In each collapsed section there is an interface to try out the APIs with various values, live, in Galaxy.](https://docs.galaxyproject.org/en/master/_images/22.05-openapi.png)


### Release Notes

Please see the [full release notes](https://docs.galaxyproject.org/en/latest/releases/22.05_announce.html) for a lot more
details and instructions for upgrading your Galaxy installation.

Thanks for using Galaxy!
