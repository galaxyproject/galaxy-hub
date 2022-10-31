---
title: 'Tool Recommendation: What do I do next?'
date: '2019-06-27'
tease: usegalaxy.eu has implemented tool recommendation, finally answering the question
  "what to do next."
tags: [release, devops]
location:
  name: Galaxy Europe
authors: hexylena
authors_structured:
- github: hexylena
subsites: [eu, freiburg, global, us]
main_subsite: freiburg
---

If you've done interactive data analysis, it's likely at least once you were
faced with the question "*What do I do next?*" Maybe you're following the
publicly available parts of a protocol, maybe you're doing a novel analysis,
maybe you just want to add a new graph and some extra pizzaz to the reporting
workflow you built for your project.

UseGalaxy.eu's users have faced this issue many times before and together we
developed something to maybe give you a push in the right direction: **offering
you a list of tools you could run next.** A big thank you to our [Anup Kumar](/people#anuprulez) who implemented this feature!

!["A list of tools that you can run next in a workflow"](/assets/media/tool-prediction.gif)

These tool recommendations are based on machine learning run on workflows
previously executed by users across UseGalaxy.\*, extracting the common chains
of one tool, to the next, to the next. This data was processed and now we can
make some guesses about what tools you might include next, and offer these as
suggestions to you.

!["A set of suggestions after interactive usage"](/assets/media/tool-prediction.png)

Check it out today!
