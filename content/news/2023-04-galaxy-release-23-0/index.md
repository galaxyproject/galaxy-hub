---
title: 'Galaxy Release 23.0'
tease: New tool search, modernized multi-history view, new tag displays, theme support, & so much more!
date: '2023-04-17'
subsites: [global, us]
authors: Natalie
---

Dear Community,

The Galaxy Committers team is thrilled to announce the release of Galaxy 23.0!

- **[Developer and admin release announcement](https://docs.galaxyproject.org/en/master/releases/23.0_announce_user.html)**.

A few release highlights are:

### Themes!

Show off your colors in Galaxy 23.0 with the ability to choose your own theme!
As a user, you will be able to select between a number of built in themes, including:
- Classic Blue
- Smoky
- Light Blue
- Pride

Server administrators may choose to provide additional themes for their users. If your
admin has enabled this feature, you will find it under User → Preferences; just look for
the bright red "New!"

### New Font!

You might have noticed Galaxy looking a wee bit different! 
The 0s and Os are now more distinctive, as well as a host of other characters,
thanks to us switching to Atkinson Hyperlegible, a font that should be a lot
friendlier to our community members with visual impairments. In general, this
font is much easier to read for everyone and we are thrilled with the change!

### New History Multi-View!

The old history multi-view, which loaded every history and every dataset, is now gone.
In its place is a much faster and easier to navigate history multi-view which lets 
you select just the histories you want to look at, without the distraction of your
other analyses! Now, you can focus on just the relevant data.

### New Tool Search!

Many of us over the years have struggled to find just the tool we were looking for. This
latest release has a number of improvements specifically to make tool search better, 
and on top of that, a whole new advanced tool search!

### Conditional Workflow Steps

You can now dynamically decide if steps of your workflow should be skipped.
Simply select a took or subworkflow step that you want to conditionally skip
and switch the "Conditionally skip step?" toggle. A new boolean input named
"when" appears. You can now connect a boolean parameter to this input, and if the
value of the boolean parameter is true, the step will run, otherwise, it will be skipped.
Outputs from conditional steps are marked as optional and can only be connected to 
optional inputs. If you want to build an “or” switch you can connect the two branches of 
a conditional to the “Pick parameter value” expression tool. Boolean parameters can be 
specified by a user or computed within your workflow. 

### Change the Datatype of a Collection

It’s easier than ever to change the datatype of every dataset in a collection using the 
pencil icon. Previously this could be achieved through the Apply Rules tool, however, 
now it can be done just like with individual datasets.

### RO-Crate / Biocompute Workflow Invocation Export

Galaxy now offers two options for packaging and publishing workflow artifacts: RO-Crate 
and BioCompute Object. These standard-based formats provide a way to bundle research 
data and metadata in a structured way. You can directly export these files to any writeable 
emote file sources that have been configured (e.g., FTP or Dropbox).

### History Export Tracking

A new History export user interface is now available that makes it easier to download 
your histories. You can export your history in a variety of formats, and either download 
it directly, or save it to a remote file source for more permanent storage. Plus, every 
time you export your history to one of these remote sources, a new tracking record is 
created with a button that lets you re-import that history snapshot with ease.

### Workflow Report - Collapsible Boxes

Based on user feedback of what features were missing from workflow reports, support for 
collapsing large boxes has been added to the Workflow Reports editor. Simply add 
collapse="Your Box Title" and large elements will be hidden with just a clickable box 
titled “Your Box Title”. Great for including large graphs or tables that may be important, 
but not relevant to show initially.

### Release Notes

Please see the [full release notes](https://docs.galaxyproject.org/en/master/releases/23.0_announce.html) for more
details and instructions for upgrading your Galaxy installation.

User facing release notes compiled and written by Helena Rasche.



Thanks for using Galaxy!

