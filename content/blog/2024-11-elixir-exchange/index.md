---
title: "How I Learned to Wrap Tools from the Galaxy EU Team"
date: "2024-11-05"
authors: "Marisa Loach"
tease: "An ELIXIR Staff Exchange to expand the single cell tools on Galaxy"
---
I am currently a PhD student at The Open University in the UK, where I reanalyse public single cell RNA sequencing data using Galaxy to explore how cells change in disease. However, I recently took a break from my project to learn how to add more tools to the Galaxy platform. As [my poster at GCC2024](https://f1000research.com/posters/13-806) explained, I went from being a user who wished for more tools to being a user-developer who can wrap those tools for herself.

<p align="center">
  <img src="./rocket-marisa.png" alt="A rocket with the Use Galaxy logo carries three users, one with a thought bubble reading I wish Galaxy had this tool... and the others with speech bubbles saying We need more tools for integration and annotation and Where is the latest version of Seurat. Two developers look on from behind their computer screens at a desk with the Galaxy Europe logo on it." width="400"/>
</p>

I was able to do this thanks to the **ELIXIR Staff Exchange Programme**, which enabled me to spend six months working with the Galaxy EU team in Freiburg. The project was initiated by my supervisor at The Open University, Wendi Bacon, who encouraged me to become part of the ELIXIR Single Cell Community, and Björn Grüning, who welcomed me into his team in Germany. The exchange gave me a chance to see the parts of Galaxy that users don’t usually encounter. It was amazing to see how hard the team works to keep Galaxy running and I was particularly impressed by how attentive they were to the Galaxy help forums and Matrix channels.

## Wrapping Seurat for Galaxy

During the exchange I learned how tools are incorporated into Galaxy through wrappers, which set out the tool requirements, the options that users will see on the interface, and the commands that Galaxy will perform when someone hits the Run Tool button. I used what I learned to wrap the latest version of the Seurat pipeline, which I was already familiar with thanks to my focus on single cell omics during my PhD.

I drew on my experience of using Galaxy to reorganise the Seurat tools, grouping them together by theme, so that we now have wrappers for preprocessing, dimensional reduction, data integration, and other activities. Each of these wrappers contains a selection of related functions, including some that weren’t previously available on Galaxy. Once the tools were working, I also wrote a tutorial for the Galaxy Training Network (GTN) to help people start using them for their own analyses.

### The New Seurat Toolsuite

Load transcriptomic or CITEseq data into a Seurat Object, add QC metrics, and filter the dataset with:
<div align="left">
<a href="https://usegalaxy.eu/?tool_id=seurat_create"><button type="button" class="btn btn-primary btn-lg">Seurat Create</button></a>
</div><br>
Prepare data for analysis with separate normalization, scaling, and feature selection functions or using SCTransform with:
<div align="left">
<a href="https://usegalaxy.eu/?tool_id=seurat_preprocessing"><button type="button" class="btn btn-primary btn-lg">Seurat Preprocessing</button></a>
</div><br>
Calculate PCA, tSNE, or UMAP with:
<div align="left">
<a href="https://usegalaxy.eu/?tool_id=seurat_reduce_dimension"><button type="button" class="btn btn-primary btn-lg">Seurat Run Dimensional Reduction</button></a>
</div><br>
Compute a neighborhood graph, apply clustering algorithms, and perform differential expression analysis with:
<div align="left">
<a href="https://usegalaxy.eu/?tool_id=seurat_clustering"><button type="button" class="btn btn-primary btn-lg">Seurat Find Clusters</button></a>
</div><br>
Create plots such as violin plots, heatmaps, or dimensional reduction plots with:
<div align="left">
<a href="https://usegalaxy.eu/?tool_id=seurat_plot"><button type="button" class="btn btn-primary btn-lg">Seurat Visualize</button></a>
</div><br>
Inspect or manipulate a Seurat Object (e.g. add more metadata, rename idents, subset data) with:
<div align="left">
<a href="https://usegalaxy.eu/?tool_id=seurat_data"><button type="button" class="btn btn-primary btn-lg">Seurat Data Management</button></a>
</div><br>
Split, join, or integrate layers of data with:
<div align="left">
<a href="https://usegalaxy.eu/?tool_id=seurat_integrate"><button type="button" class="btn btn-primary btn-lg">Seurat Integrate</button></a>
</div><br>

## What I Learned About Galaxy

The whole process gave me a deeper understanding of the tools as I had to decide which functions and parameters we should include and how they should be presented on the Galaxy interface. Every parameter had to be assigned the appropriate type and labelled with a helpful description. Seeing how the original tools turned into their Galaxy versions also gave me a new appreciation for how much easier my life is because I can use Galaxy for my PhD - it does a lot of the hard work for me!

I really enjoyed tool wrapping as it allowed me to spend my days solving puzzles. Although it took a lot of work to wrap the entire Seurat pipeline, it was very rewarding to see the tools I wrapped appear on Galaxy and to know that people like me would soon be using them. I would definitely recommend anyone who is curious about tool wrapping to give it a go, especially if there's a tool that you wish was available on Galaxy. The GTN has some [tutorials](https://training.galaxyproject.org/training-material/topics/dev/) that can help you to get started and I'm sure that any Galaxy community would be just as happy as the [Single cell and SPatial Omics Community (SPOC)](https://galaxyproject.org/community/sig/singlecell/) to welcome new contributors.

Thanks to the **ELIXIR Staff Exchange Programme** for funding the project, Pavan Videm for getting me started with tool wrapping, and my hosts at the University of Freiburg for helping me to make the most of my time in Germany!

