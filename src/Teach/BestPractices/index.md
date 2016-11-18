---
autotoc: true
title: Teaching with Galaxy: Best Practices
---
PLACEHOLDER_INCLUDE(/src/Teach/Header/index.md)



PLACEHOLDER_INCLUDE(/src/Teach/LinkBox/index.md)

This page will distill some best practices for teaching with Galaxy, in both workshop and classroom situations.




## Use the Best Compute Platform

The [Computing Platforms page](/src/Teach/ComputingPlatforms/index.md) includes many options, and recommendations, for computing backends to teach Galaxy with.

## Use Galaxy's Built-In Mechanisms

Galaxy itself has several mechanisms that make teaching Galaxy and bioinformatics easier.  Using these capabilities in your training is also a natural way to demonstrate them.

### Published Histories, Workflows and Visualizations

You can pre-populate your teaching Galaxy instance with published histories, workflows, and visualizations that students can refer to for guidance, or even import into their workspace.  Published objects can be easily accessed under the **Shared** tab on all Galaxy instances. 

### Data Libraries

**Or, *keep the data close.***

You can avoid training-time dependencies on external resources (that may be down during your training), and swamping your local network by preloading data sets into **Data Libraries** on your training server.  To do this you'll need either admin access to the server, or the cooperation of the server's admin.  If you can't get that, you can always [import the data into a history and then publish that](/src/Teach/BestPractices/index.md#published-histories-workflows-and-visualizations).

### Galaxy Pages

*[Galaxy Pages](/src/Learn/GalaxyPages/index.md)* are an excellent mechanism for exercises and examples.  Pages can embed datasets, histories, workflows, and visualizations, and include verbal descriptions and images for describing the material.

*A significant drawback is they can't be exported from one Galaxy server and imported onto another.  Pages must be copied onto a new server manually.*

## Content

### Start with a very specific exercise

Consider starting with an exercise where students are told exactly what to do.  Then, open it up to give them an opportunity to try things themselves

### Start with conceptually easier material when covering NGS

Several trainers start with assembly/mapping because it is conceptually easier for people to understand than starting with something like RNA-Seq.

### Computer scientists

Teach programmers what the biologists are trying to do.  One group does workshops with pairs - one member with a computing background, one from medical.  This pairing also allows biologists to pick up these general computer interaction skills.

Ask Tech savvy people to be teaching assistants.  They may not be familiar with Galaxy or the biology, but they are familiar with computers and are already aware that cAsE may matter, for example, or that tabs and spaces are treated very differently.


### Create online communities

Set up a mailing list / Google Group for every course.  This creates a "micro-SeqAnswers" for a group of people who know each other from a course.  A much less intimidating forum than public boards.

### Licensing

Having all materials be licensed under CC-BY makes things much easier.


## Workshop Specific Best Practices

Best practices that may be helpful when doing a workshop where you only have a limited number of hours or days to teach the material, and you are always in the classroom with them.

...

## Course Specific Best Practices

Best practices that may be helpful when teaching an academic course using Galaxy.  In this case, the students may be using Galaxy in a lab and for homework, but there are also contact hours where hands-on exercises are not the focus.

...
