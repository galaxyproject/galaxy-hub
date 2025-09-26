---
title: "Microbial Genes Recovery in Galaxy"
authors: Mina H.Ansari
tags: [workflow, metagenomics, microbial-genes, Galaxy]
date: "2025-09-26"
tease: "A new Galaxy workflow enables researchers to recover and analyze microbial genes from metagenomic data."
subsites: [all, esg]
supporters: [unifreiburg, esg]
main_subsite: eu
---

High-quality reference genes and microbial genomes are essential resources for understanding the functional roles of microbes and quantifying their abundance in microbiome studies.  

To support this, we have developed the **Microbial Genes Recovery workflow** [in Galaxy](https://usegalaxy.eu/published/workflow?id=2ee0eb74e839b476), which recovers microbial genes from metagenomic data and generates a non-redundant microbial gene catalog.  

This workflow enables researchers to build gene-level resources from any metagenomic dataset in a reproducible and user-friendly way.

### Why Microbial Genes Recovery 

Recovering microbial genes from metagenomic data uncovers vast uncultured microbial diversity, reveals the functional capabilities of microbial communities, and provides insights into their ecological roles and health impacts. By working at the gene level, researchers gain a more comprehensive view of microbial functions, metabolic pathways, and evolutionary patterns than cultivation-based approaches alone.

## The Workflow in Galaxy

<iframe title="Galaxy Workflow Embed" style="width: 100%; height: 700px; border: none;" src="https://usegalaxy.eu/published/workflow?id=2ee0eb74e839b476&embed=true&buttons=true&about=false&heading=false&minimap=true&zoom_controls=true&initialX=-20&initialY=-20&zoom=1"></iframe>

*The Microbial Genes Recovery workflow in Galaxy* 

**Workflow steps:**
1. Input: paired-end trimmed reads  
2. **Assembly** of metagenomic reads into contigs  
3. **Gene prediction** from assembled contigs  
4. **Clustering** to generate a non-redundant gene catalog  
5. **Gene abundance estimation** across samples  
6. **Annotation** for both function and taxonomy  

## Example Use Cases

- **Drosophila melanogaster**: This workflow helps create *Drosophila* gene catalogs, enabling functional and abundance-based analyses of its microbiome. 
- **Termite gut microbiomes**: Termites rely on microbial symbionts for wood digestion, but their microbial diversity is largely underexplored. This workflow helps uncover the ecological roles of termite microbes.
- **Human studies**: Case–control designs (e.g., healthy vs. IBS) benefit from comparing microbial genes and pathways directly, providing insights beyond taxonomic differences. 
