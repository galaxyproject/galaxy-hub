---
title: 'From Galaxy Tool Development workshop to My First Interactive Tool: Bringing Praat to Galaxy'
date: '2026-11-05'
tease: "Everyone can contribute to Galaxy! Get inspired how I got (with the help of the Galaxy community) the well-known speech analysis software Praat into Galaxy and learned a lot about containerisation, git, and Galaxy (ITs) along the way."
hide_tease: false
subsites: [global, eu, freiburg]
tags: [tools, humanities, phonetics]
contributions:
  authorship:
    - wallajess
    - IvoLeist
    - Sch-Da
    - PaulZierep
  funding:
    - ai4social
    - eu
---

## Planting the seed for my first contribution to Galaxy: The Galaxy Tool Development Workshop at Freiburg University

Everything started with the Galaxy Tool Development Workshop in October 2026 held in Freiburg, Germany [link to blog post]. 
Encouraged by one of the workshop hosts, [Paul Zierep](linkt to hall of fame), introducing the concept of interactive tools (ITs),I,[Jessica Wallace](Link to profile), got inspired to bring the well-known speech analysis software [Praat](https://www.praat.org/) into Galaxy. 

However, as I learned in the workshop, contributing an IT to Galaxy is not a trivial task, as it not only requires a good understanding of Galaxy but also containerisation. Thus, I used the "bring your own tool hackathon session" of the workshop to excite one of the workshop helpers, [Ivo Christopher Leist](Link to hall of fame), of that idea. Luckily, as an active contributor to [Galaxy's Social Science & digital Humanities community](https://galaxyproject.eu/community/social-science-digital-humanities/) and former Hackathon junky, always open for new challenges, Ivo was immediately on board.

Thus, the following weeks were filled with ad-hoc online meetings and intensive debugging sessions.
From those we (Ivo and I) both learned a lot about containerisation, git, and Galaxy (ITs) and now we 
are very happy to present here the first version of the Praat Galaxy Interactivetool.

## What is Praat and why is it important for phonetic research?

Working with speech data often involves more than running automated analyses. 
Researchers need to listen to recordings, inspect acoustic properties, examine word and phone boundaries, 
and create or refine phonetic annotations. Praat, a free software package for speech analysis and phonetics
is one of the most widely used tools for this kind of work (insert citation count), 
offering a rich environment for speech analysis and annotation. It allows researchers to visualize and analyze 
audio signals, inspect spectrograms, measure acoustic properties, and create or edit annotations using TextGrid files.

But setting up software, managing files, and moving data between different tools can interrupt the research process. 
What if you could use Praat directly within Galaxy, alongside the rest of your speech research workflow?

## From speech recordings to phonetic annotations directly in your browser: Praat in Galaxy

Especially when moving between local applications and online analysis environments such as Galaxy,
it can be challenging to keep track of files, annotations, and results. Exactly this I was experiencing
first hand: I often had to download audio recordings, open them in Praat, create or edit TextGrid annotations, 
and then upload the results back to Galaxy for further analysis. Bringing Praat into Galaxy helps to bridge that gap.

The new Praat Interactive Tool provides a desktop environment that runs directly in your web browser.
There is no need to install Praat or configure a local working environment: simply launch the tool from Galaxy and start working.
You can provide audio recordings in WAV format and annotation files in TextGrid format. These files are made available inside the interactive environment, where you can open and work with them in Praat. When you finish, you can export your TextGrid annotations back to Galaxy. 
Input files are copied into the working environment, so your original datasets remain unchanged.
This makes it possible to combine Praat's interactive analysis capabilities with Galaxy's data management and reproducibility features.

## Connecting Praat with other speech tools in Galaxy

One of the main advantages of having Praat available in Galaxy is that it can be combined with existing tools for speech processing and analysis.
For example, researchers can use [Montreal Forced Aligner (MFA)](link to galaxy tool / blog post ?) to generate automatic word- 
and phone-level alignments. 

The resulting TextGrid files can then be opened in Praat for manual inspection, correction, and further phonetic annotation. 
These files can then be further processed in [new-FAVE](link to galaxy tool / blog post ?), bringing interactive acoustic inspection 
and annotation into a broader collection of speech research resources. Together, these tools support a workflow that connects 
automated processing with detailed human analysis. Rather than moving files between separate applications and environments, 
researchers can keep their data, annotations, and analysis results organized within Galaxy.

Whether you are refining forced alignments, examining acoustic properties, or creating TextGrid annotations, 
you can now do this work directly within Galaxy – without installing Praat on your own computer. 
Give Praat in Galaxy a try and bring interactive speech analysis into your Galaxy workflows!