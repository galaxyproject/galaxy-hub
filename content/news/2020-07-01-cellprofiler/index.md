---
title: CellProfiler now available in Galaxy
date: '2020-07-01'
tags: [tools, training]
supporters:
- eosc
- eubi
- elixir
- idr
- galaxy-europe
authors: beatrizserrano
authors_structured:
- github: beatrizserrano
subsites: [eu, pasteur, freiburg, erasmusmc, elixir-it, belgium, genouest]
main_subsite: eu
---

<br><br>
Several modules of the popular image analysis tool **CellProfiler** are now available in the [Galaxy ToolShed](https://toolshed.g2.bx.psu.edu/){:target="_blank"}, thanks to [ELIXIR’s](https://elixir-europe.org/){:target="_blank"} and [EuroBioimaging’s](https://www.eurobioimaging.eu/){:target="_blank"} contribution to [EOSC-Life WP2](https://forum.eosc-life.eu/t/introduction-to-eosc-life-wp2/32){:target="_blank"}.


<div class="multiple-img">
    <img src="/assets/media/2020-07-01-wf_cell_profiler.jpg" alt="CellProfiler exemplary workflow" />
</div>

<br>
### Tools
In total, 22 modules have been integrated into **19 Galaxy tools**, providing scientists with a comprehensive suite to perform the most prevailing functionalities: object segmentation and feature extraction. Several segmentation methods can be applied (Manual, Measurement, Minimum cross entropy, Otsu and Robust background) to all image types supported by CellProfiler. At the level of the objects identified, several parameters can be measured (granularity, texture, intensity, size, shape, etc.), along with the relationships between objects. For complete images -or mathematical combinations of them-, features like the quality, the intensity, and the area occupied by objects can also be easily extracted.

<br>
### Data Access

Scientists can now upload their own images to a Galaxy instance and build workflows combining these tools to address different biological questions. The outcome will vary depending on the design of the workflow: segmentation masks for each object identified, features associated with images or any of the objects segmented, images with metadata overlaid on top of the identified objects, among others. 

Another approach is to reuse public data from previous studies that are available at the [Image Data Resource (IDR)](https://idr.openmicroscopy.org/){:target="_blank"}. For that purpose, a [Galaxy tool](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/idr_download_by_ids/idr_download_by_ids){:target="_blank"} was developed in collaboration with EOSC-Life WP1, that directly connects to the IDR, with advanced error handling, and makes bulk-downloads possible.

<br>
### Exemplary Workflow

An [exemplary workflow](https://workflowhub.eu/workflows/41?code=01Ayacm0RbvLyTaAE%2FALunbR7waqdm2M9tozl%2Fla){:target="_blank"} has been created using these tools as part of Demonstrator 6 of EOSC-Life WP3. This demonstrator is focused on reusing publicly available RNAi screens to gain insights into the nucleolus biology. The workflow has been made accessible at the registry [Workflow Hub](https://workflowhub.eu){:target="_blank"}.

<br>
### Training Material
Since each tool comes with an extensive combination of parameters, a [GTN tutorial](https://training.galaxyproject.org/training-material/topics/imaging/tutorials/tutorial-CP/tutorial.html){:target="_blank"} has been created reproducing the work done in the Demonstrator 6 of [EOSC-Life](https://www.eosc-life.eu/){:target="_blank"}.
<br><br><br><br>
