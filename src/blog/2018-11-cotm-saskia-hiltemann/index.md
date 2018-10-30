---
date: '2018-11-01'
title: "Contributor of the Month: Saskia Hiltemann"
authors: "Martin Čech"
image: "/src/blog/2018-11-cotm-saskia-hiltemann/saskia-hiltemann.png"
---

This month we welcome Saskia Hiltemann (Twitter: [@shiltemann](https://twitter.com/shiltemann), GitHub: [@shiltemann](https://github.com/shiltemann)) as our Galaxy contributor of the Month! Saskia is a bioinformatician and a PhD student working in metagenomics at Rotterdam’s Erasmus Medical Center in the Netherlands, a core member of the [Intergalactic Utilities Commission](https://galaxyproject.org/iuc/), and one of the two primary creators of the [Galaxy Training Framework](https://training.galaxyproject.org/) ([published](https://doi.org/10.1016/j.cels.2018.05.012) in *Cell Systems*).

Saskia, thanks for doing this interview, we are looking forward to learn more about yourself and your work!

## Saskia Hiltemann

*Can you tell us a little about yourself (hobbies, education, background, etc.)?*

As a kid I was always fascinated by science and the stars in particular, and after high school I started studying astronomy. I had always loved playing around with computers, but when I learned to program for my astronomy degree, I was really sold, enough so even to switch to a computer science degree. After my bachelor I did start to miss the science that had drawn me to astronomy, so I decided to do a specialization in bioinformatics for my Master’s. After graduating I started working at the [Erasmus Medical Center](https://www.erasmusmc.nl/?lang=en) in Rotterdam, where I have worked on different projects, such as prostate cancer research, and most recently several metagenomics projects. I develop tools and pipelines for researchers and clinicians, and also maintain several Galaxy instances in our institute.
I still love astronomy, and enjoy hiking, swimming, travelling, reading, and am a big fan of any kind of puzzle.

*Why did you start using Galaxy?*

I started using Galaxy in 2012, at first quite simply because the project I was hired on had decided on Galaxy as its workflow platform, but I've kept using it ever since because I really believe in it and saw first-hand how it empowered researchers to do analyses they would otherwise need the help of a bioinformatician to do. We are also a quite small department, and the more I can help users run their own analyses without needing my assistance, the better. I have also always loved teaching, having worked as a tutor all throughout my university studies and several years beyond, and Galaxy is really an ideal tool for teaching bioinformatics as well, so I've loved contributing to the training materials repository over the past couple of years.

*How did you get into the Galaxy community? What (and when) was your first contribution?*

My first contributions were back in 2012, when I made a tool called [iReport](/src/events/gcc2014/abstracts/talks/index.md#ireport-html-reporting-in-galaxy) to create custom web pages for results reporting in Galaxy. Looking back, Galaxy has come a long way since then (and so have I), and I realize that I would do things very differently if I were to create that tool today, and I hope to be able to make a version 2.0 of this tool some time soon, because I still think that what it does is great, but the way it does it can be much improved.

*Which are your favorite Galaxy tools?*

I think my favourite Galaxy tool has to be [Circos](https://toolshed.g2.bx.psu.edu/repository?repository_id=5e3c8169d70360fa&changeset_revision=ae9994cf526f), not only because visualizations are just such an important step in making sense of large datasets, but Circos is also one of those tools that is just so complex, that even for a bioinformatician it can feel quite daunting, and the Galaxy tool just makes that process so much easier. It is also one of the most complex tool wrappers I have ever seen so it has been a fun challenge helping develop it.

*What is your favorite Galaxy feature?*

I really love the new [rule builder](https://galaxyproject.github.io/training-material/topics/galaxy-data-manipulation/tutorials/upload-rules/tutorial.html) feature! It lets you create complex nested dataset collections when you upload your datasets, and not only that, but the tool version of the rule builder, (the *apply rules to collection* tool) enables me to group and re-group large dataset collections within my workflows, abstracting this bit of complexity away from the end-users. So instead of asking clinicians to create the complex dataset collections needed for analysis (e.g. a list of lists of pairs of pairs for one of my most recent projects), I can handle these data organisation steps within the workflow itself, based solely on the file names, and the clinicians using the workflow only have to upload all their data and hit the start button on the workflow.

*What projects are you working on now?*

In my most recent project ([doi:10.1007/s10096-018-3220-z](https://link.springer.com/article/10.1007/s10096-018-3220-z)), we worked together with an outside diagnostics lab who service a large number of hospitals and GPs in the area. When an infection is suspected, samples are sent to them for analysis. Up until now, this analysis had been a purely wet-lab process, samples were cultured to determine the infective agents present. But they recently decided to explore the possibility of using sequencing in cases when this analysis is inconclusive. Since they had little need for or experience with bioinformatics up until this point, the analysis had to be as user friendly as possible. So we worked together to integrate the [mothur tool suite](https://toolshed.g2.bx.psu.edu/repository?repository_id=1e1a6faad90b82fa) into Galaxy, and build Galaxy workflows for them, and they have recently started using this pipeline in their routine diagnostics, and it is really cool to see work I've contributed to being used to benefit patients so directly.

*What advice would you give to new contributors?*

Don't be shy! when I first started out, my [imposter syndrome](https://en.wikipedia.org/wiki/Impostor_syndrome) caused me to be very nervous about adding tools or making pull requests to Galaxy, but everybody in the community has been so extremely kind and welcoming and helpful, that I realize that was quite unnecessary. Just ask all your questions, just start contributing, it doesn't have to be perfect :)

*What is your vision for the Galaxy project for the next years?*

My (biologist) supervisor always likes to describe his ideal view of bioinformatics as a single big red button that takes his raw sequencing data and turns it into *Nature* papers. While this is of course an unattainable dream, I do think there is a lot we can do to make bioinformatics easier and more accessible for a wide range of users. I was very excited to see the rule builder being developed because this allowed us to do more complex analyses while simultaneously making the workflows more user-friendly for our users, and I hope to see continued developments that will allow us to keep scaling our analyses (both in size and complexity) and I would love to see the front-end of Galaxy receive as much love as the back-end has, so that we can really create these easy push-button solutions for our clinicians and researchers.

*What are the infosec CTF events that you mention on your website?*

Thanks for the fun question :) CTF stands for "Capture The Flag" and these are online hacking events that usually last anywhere from a day to a couple of weeks, and basically consist of a series of computer security challenges or puzzles in which your goal is to obtain a specific hidden string of text. This could be a web service that has been intentionally left vulnerable to SQL injections, or an executable that can be manipulated into unintended behaviour, or it might involve the breaking of insecure encryption schemes. Very often they will include real-world scenarios based on recently discovered vulnerabilities. It is a great way to learn about a broad set of computer science and security topics, but also to learn about the potential vulnerabilities in any tools and program you will write in your professional life. I usually participate in these events together with Helena Rasche, but anybody is welcome to join our team! (no experience needed, there are always challenges of varying difficulty levels) :) 
	
Inspired by these CTF competitions, [Helena](/src/people/helena-rasche) and I also created a [Galaxy CTF event at GCC2017](https://sched.co/BCVY), which was great fun to create and hopefully also a fun way to learn more about Galaxy features and internals for the people who participated, and we hope to organize another Galaxy CTF at [GCC2019](/src/events/gcc2019/index.md), so come check it out!


Thanks for the interview!
