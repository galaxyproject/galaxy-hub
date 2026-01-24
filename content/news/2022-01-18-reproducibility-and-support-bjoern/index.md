---

site: freiburg
tags: [outreach]
title: Galaxy as a sharing infrastructure and how this enables efficient user support
authors: "Björn Grüning, Cristóbal Gallardo, Jennifer Hillman-Jackson, Ross Lazarus"
date: "2022-01-18"
source_blog: "Galaxy Project Blog"
source_blog_url: "https://galaxyproject.org/blog/2022-01-18-reproducibility-and-support-bjoern/"
---

`tl;dr` We take a closer look at Galaxy as a sharing infrastructure and framework. How this enables best practices in science and helps the European Galaxy team to
offer efficient user support to many thousands of researchers. 

-----------

Printing presses allowed text and books to be reproduced easily, accelerating opportunities for the distribution of knowledge exponentially. The last hundred years have witnessed many similar disruptive innovations, most recently that digital copy-machine called the internet, and the rise of social knowledge resources, like Wikipedia.

For anyone familiar with Galaxy, it may seem surprising that so many scientists still struggle daily, to share data, analyses and results conveniently with colleagues. Data may be too big to share in an email, which sadly remains a mainstay of scientific collaboration. Unstructured or proprietary formats like Word or Excel documents are poorly suited to unambiguously and reproducibly describing any specific analysis and results.

Faithfully reproducing any specific computation is a requirement for the construction of scientific knowledge; enabling an efficient peer-reviewed research process must involve sharing a complete data analysis and reproducing computational environments (compute, storage), like the original one. In addition, it would allow rerun a few steps of analysis with slightly different parameters and other thresholds. However, this is almost never easily available, effectively excluding most researchers from participating in the essential scientific activities of analysis replication and of peer review. 

Public infrastructure, like Wikipedia, can solve this problem by providing resources to store knowledge and a framework to harvest knowledge. A scientific framework of this kind should make it particularly easy to review the contributions of others and to access the collective body of analyses and experiments from which collective knowledge is derived.

Galaxy provides many of the features needed for this kind of science infrastructure, and can already be used to overcome some of the challenges of routine reproducibility in data sciences. Want to avoid sharing results via email or USB keys? Easy! Use the framework feature that Galaxy provides to share a complete analysis history with your colleagues. The data is not copied, it's efficiently linked which lowers the global scientific costs. The original authors and any peers with access to it, can see every single tool and every single parameter of the shared analysis. [Replication is built in](../2022-01-17-replicating-computation-ross), down to the level of being able to rerun any single step, using precisely the same software package versions as the original, even many years later. Jobs can be re-run, but with altered settings, to see how the results are affected. You can annotate every piece of your analysis with text and explanations to make it easier to understand and for your colleagues to harvest. The data never leaves the platform, so every user you have granted permissions to access the analysis, has the same computational resources to reproduce, or to improve the analysis. Use of this mechanism could help make review and publication processes more transparent and accessible to more eyeballs, leading to better science through improved communication of analyses and data.

Galaxy is great at sharing scientific analyses and this supports another very positive aspect: free professional support. You might end up in a situation where a tool crashes, or you do not understand an output and have some questions about some settings. If you can share your current progress with some experts, as easily as possible, with as much information as needed, you are more likely to get efficient and quick help. We all know how hard it is to get all the relevant information from a user to help with a particular unusual problem. We most often need access to some data, or the exact parameters that you used, or the environment under which you ran your analysis. With Galaxy, none of this is an issue when a user simply shares the problematic analysis with a support person via 2 mouse clicks, and the detailed information needed to provide responsive professional support is all available. This enables our small team to efficiently support tens of thousands of active users.
