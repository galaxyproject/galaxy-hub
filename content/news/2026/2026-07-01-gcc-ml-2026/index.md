---
subsites:
- all
date: '2026-07-01'
title: Machine learning at Galaxy Community Conference 2026
tags: [tools, workflow, training]
tease: "Machine learning at Galaxy Community Conference 2026"
contributions:
  authorship:
    - anuprulez
  funding:
    - uni-freiburg
    - deNBI
---

## Machine learning at Galaxy Community Conference 2026

At the Galaxy Community Conference 2026 in Clermont-Ferrand, France, 22–26 June, the Galaxy Machine Learning community showcased a strong and connected vision for 
making AI/ML more usable, reproducible, and FAIR in life-science data analysis.

### Poster

The [ML poster](https://docs.google.com/presentation/d/1CRaXPXWu_ZO67V02vtp0kOMqsTCuFZ2w/edit?usp=sharing&ouid=113741045749084750249&rtpof=true&sd=true) highlighted the expanding Galaxy AI/ML ecosystem, including RAG workflows, 
Flexynesis for AI-powered multi-omics integration, TabPFN for fast tabular prediction, 
GPU-enabled JupyterLab for scalable model development, Galaxy-ML tools powered by Scikit-learn, 
XGBoost and TensorFlow, text-segmentation workflows using DocLayout-YOLO and Hugging Face, 
and ongoing work on inference and fine-tuning of biological foundation models such as DNABERT, ProtBERT, ProtT5 and ESM. 

<img src="./images/gcc-2026-ml-poster.png" alt="GCC 2026 ML poster" width="800"/>

### ELIXIR BioHackathon talk

<img src="./images/elixir-start-0.png" alt="GCC 2026 ELIXIR BioHackathon talk" width="800"/>

The ELIXIR talk presented the “ELIXIR AI Ecosystem Integration” effort, bridging DOME, BioAIrepo, 
BioModels and Galaxy to support the full ML/AI project lifecycle: discovering models and metadata, 
training or fine-tuning models in Galaxy, evaluating them on unseen data, and sharing 
trained models and metadata back to public repositories such as BioAIrepo, BioModels, Europe PMC, 
bio.tools, Zenodo and Dataverse. 

<img src="./images/elixir-talk-biohackathon-2026-1.png" alt="GCC 2026 ELIXIR BioHackathon talk" width="800"/>


<img src="./images/elixir-talk-biohackathon-2026-2.png" alt="GCC 2026 ELIXIR BioHackathon talk" width="800"/>


[GCC Elixir talk](https://docs.google.com/presentation/d/1iDJHLkS-2kpeKLkkIYVxAqR0KmPRLFhiZMUK_jBQlHY/edit?usp=sharing)

### ML training

The ML training session, “GLEAM Image Learner – Validating Skin Lesion Classification on HAM10000,” 
demonstrated practical image-learning workflows in Galaxy, including balanced train/validation/test splitting, use of a pretrained CaFormer S18 384 backbone, and evaluation 
with accuracy, weighted precision, recall and F1 for imbalanced medical imaging datasets. 

<img src="./images/gcc-ml-training-gleam.png" alt="GCC 2026 ML training" width="800"/>

[GLEAM Image learner](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/image_learner/tutorial.html)

### CoFest

During CoFest, the community also worked on “Driving Galaxy using agents,” including a Galaxy UI/UX 
pull request to reduce hallucinated URLs by validating generated links and adding a references 
button that exposes all links returned in AI responses, improving transparency 
and trust for agent-assisted Galaxy workflows.


### References

- [GCC 2026 ML Poster](https://docs.google.com/presentation/d/1CRaXPXWu_ZO67V02vtp0kOMqsTCuFZ2w/edit?usp=sharing&ouid=113741045749084750249&rtpof=true&sd=true)
- [CoFest PR](https://github.com/galaxyproject/galaxy/pull/23027)
