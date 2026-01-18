---
title: Teaching bioinformatics through blood, mucus and tears
date: '2021-10-01'
tease: 'Watch out for that My Little Pony baby stroller.'
tags: [training, tiaas]
supporters:
- galaxy-europe
authors: TKlingstrom
authors_structured:
- github: TKlingstrom
subsites: [global, us, all-eu]
main_subsite: eu
---

_"Dad, I am bleeding!"_ are words no parent wish to hear. 

I was sitting in a Zoom meeting listening to a discussion between my two master students setting up a workflow using Singularity container running on one of the HPCs of the Swedish National Infrastructure for Computing. At the same time, I was busy preventing my 5-year old with a mild cold from making wrestling style jumps from the armchair to the sofa with the ultimate aim of landing on top of my 3-year old who had recently recovered from the same cold and was getting restless[^1]. By deflecting my older son mid-air using my left arm I could keep him entertained while landing him safely behind me and at the same time listen to the discussion about issues related to building the Singularity containers before transferring them the HPC.
For a five years old doing something fun, the obvious next step is to do the same thing again but harder. This time the momentum of the jump carried him not only behind me, but also far enough to land face first into a My Little Pony baby stroller which cut a deep gash in his left eyebrow. Quickly excusing myself from the meeting I concluded that for this particular task my doctorate was in the wrong field. In the village we got a nurse station who patched him up and afterward followed an afternoon enjoying the benefits of public healthcare in the city. The eyebrow will be fine in a week or so but by the end of the day it was clear that my schedule to prepare tomorrows lecture on using Galaxy for bioinformatics was damaged beyond repair. 

![toy](/assets/media/tiaas/tomas.png)

Figure 1. The most dangerous toy of the household.


When teaching bioinformatics to biology students and agricultural researchers I always preach about the benefits of reusing the work of others as it saves time, and if done properly, improves reproducibility and comparisons. Galaxy is an important part of this and I often us Galaxy to avoid students quickly getting caught up on technicalities and instead focus on what I consider to be the four key points when starting a bioinformatics project.

- Knowing what you have.
- Knowing what you need to do.
- Knowing how to do it.
- Having a computer that let you do it.
  

Applying the same logic to teaching I had time for approximately 1 hour of preparations, the need to provide students with a welcoming presentation to the Galaxy community and I would do this using the materials available through the GTN and Training Infrastructure as a Service provided on usegalaxy.eu. With the Magic of Friendship[^2] and the prepared resources of the Galaxy Training Network we managed to carry out this task successfully. 
The tutorial we had selected for the session is the [Introduction to Genomics and Galaxy](https://training.galaxyproject.org/training-material/topics/introduction/tutorials/galaxy-intro-strands/tutorial.html#weve-got-the-data---whats-our-plan-for-answering-the-question) by Dave Clements and Cristóbal Gallardo, which showcases the ability of Galaxy to load data from an external resource (UCSC), how to manipulate datasets, visualize results and create a reusable workflow from a Galaxy history. 

The desired learning outcomes of the lectures for the students where to:

1. Be aware of the usegalaxy.* resources and what can be done with them.
2. Know how to use the Galaxy Training Network to learn more about bioinformatics. 
3. Know how to ask for help when encountering difficulties.
4. Be able to follow a tutorial on the GTN, use it to create a reusable workflow and understand the concept of reusable workflows.

The introduction to Galaxy slides provide a good introduction on the technical side of using Galaxy but really benefits from being put into the context of Bioinformatics course targeting agricultural science students. So the hour of preparations was used for a short introduction in presenting the Galaxy Training Network itself and how to ask for help. A lot of students are unfortunately reluctant in asking for help from strangers using chats or messaging boards, so I really try to highlight both the friendliness of the Galaxy community using screenshots from Matrix and also explain that I am more than happy to help guiding them right in the future as it means they are making use of the lecture. A consideration I am having for the future is to take this message a step further and even have them sign up for Matrix to ask questions on a Galaxy Matrix to familiarize them with that way of asking questions instead of using the chat of the webmeeting software (in this case Zoom).

A surprising lesson I learned from the session was also that I need to be more careful in monitoring the outputs of the TIaaS progress site. Sending out the link to join the computer lab always mean that a few students sign up but do not show up for the training but this particular event also taught me that the reverse may be true. The computer lab coincided with one of the climate strikes supported by the Usegalaxy.eu team, meaning that any student failing to click the TlaaS link was unable to run the tools. Normally, this is less noticeable even if it means that jobs run slower which may cause longer than necessary que times. With the strike, work instead came to a complete stop highlighting the risk of students failing to join the Tlaas session properly. In our case, with 16 students and one co-teacher curious about Galaxy, at least three students and one co-teacher failed to actually click the join link for the lab which is something I will put further emphasis in the future.

In an environment where my ability to control my working days is more limited than ever it is fantastic to have the Galaxy Training Network to lean on. The approach of Contextualise --> Shared materials --> Prepared tutorial worked well in a very time efficient manner and the TIaaS join issue was a valuable wake up call for future tutorials. This is the third year we have been using Galaxy as a part of our bioinformatics course to show students the importance of workflows and as a platform form future learning at the [bioinformatics course at the Swedish University of Agricultural Sciences](https://www.slu.se/en/departments/animalgenetics/education/freestanding-courses/) and despite being the most challenging year so far the tutorials have worked out very well each year so far.

Best regards,

Tomas Klingström,

[^1]: For future readers this may sound a bit crazy but this was a completely normal working environment during the Covid-19 era. 

[^2]: Thank you Renaud for setting up the course web page instructions.

