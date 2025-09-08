---
title: "Leveraging Deep Learning & AI in Your Research on Galaxy"
date: "2025-09-08"
tease: "New AI/ML tools and tutorials on Galaxy for your biomedical research"
authors: "Michelle Terese Savage, Anup Kumar"
subsites: [all]
---

# Leveraging Deep Learning & AI in Your Research on Galaxy

Machine learning (ML) and artificial intelligence (AI) are revolutionizing biomedical research. Applications of these techniques now span **genomics, imaging, and more** – from predicting drug metabolism using brain scans to [identifing survival markers of brain tumor with Flexynesis on Galaxy](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/flexynesis_survival/tutorial.html).
More generally, deep learning, a subset of AI, has achieved remarkable feats such as detecting splice sites, predicting protein 3D structures, and diagnosing cancers from histopathology images. 

A prime example is DeepMind’s **AlphaFold2** ([now available on Galaxy](https://galaxyproject.org/news/2022-02-24-alphafold/)), which stunned the world by predicting protein structures with near-experimental accuracy. AlphaFold’s release provided the 3D structures of essentially all human proteins to the scientific community, accelerating insights in structural biology and drug discovery. However, tapping into these advanced AI methods often requires significant coding and computational expertise, posing a hurdle for many biologists. This is where the Galaxy platform steps in – offering a user-friendly, no-code environment to leverage ML/DL in research while ensuring **scalability and reproducibility** with a robust training network.

**<mark>New AI Tools</mark>** (on Galaxy-hosted servers):
1. [AlphaFold](https://galaxyproject.org/news/2022-02-24-alphafold/)
2. [Tabular data prediction using TabPFN](https://usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Ftabpfn%2Ftabpfn%2F2.0.9%2Bgalaxy0&version=latest)
3. [LLM Hub](https://usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fllm_hub%2Fllm_hub%2F1.100.0%2Bgalaxy0&version=latest)
4. _Flexynesis:_
    1. [Flexynesis](https://usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fflexynesis%2Fflexynesis%2F0.2.20%2Bgalaxy3&version=latest)
    2. [Flexynesis plot](https://usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fflexynesis_plot%2Fflexynesis_plot%2F0.2.20%2Bgalaxy3&version=latest)
    3. [Flexynesis utils](https://usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fflexynesis_utils%2Fflexynesis_utils%2F0.2.20%2Bgalaxy3&version=latest)
    4. [Flexynesis cBioPortal import](https://usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fflexynesis_cbioportal_import%2Fflexynesis_cbioportal_import%2F0.2.20%2Bgalaxy3&version=latest)
5. **[All ML/AI tools on Galaxy Toolshed](https://toolshed.g2.bx.psu.edu/repository/browse_repositories_in_category?id=521231119a61cff1&message=&status=done)**

## AI and Deep Learning in Biomedical Science

The surge of AI in biomedicine is driven by its success across diverse domains. **Protein structure prediction** is one high-profile example: AI models like AlphaFold can infer a protein’s 3D shape from its amino acid sequence with astonishing accuracy. Similarly, in pathology, deep convolutional networks classify tumor vs. normal tissue on digitized slides, aiding disease diagnosis. Single-cell genomics is another area transformed by ML – algorithms cluster cells by expression patterns to reveal novel cell types or states. These mainstream successes underscore AI’s potential, but they also highlight a challenge: such analyses traditionally demand coding proficiency in frameworks like TensorFlow/PyTorch and access to HPC or GPU resources. For many bench scientists, implementing these methods can be daunting. Galaxy addresses this gap by **democratizing AI**: it brings cutting-edge ML/DL tools to a web-based interface, so researchers can apply techniques like image classification or sequence-based deep learning without writing a single line of code.

Crucially, **Galaxy doesn’t work in isolation** – it bridges domain-specific data analysis with AI modeling. In typical biomedical studies, raw data must be processed (e.g. sequence alignment, feature extraction) before any ML model can be trained. Galaxy’s strength lies in unifying these steps. For instance, you might begin with sequencing data or microscope images in Galaxy, use established tools for quality control or feature generation, then feed the results into an ML model – all within one platform. This integration ensures that the entire pipeline, from **data preprocessing to model prediction**, is accessible and reproducible.


**<mark>New AI Tutorials</mark>** (on the  Galaxy Training Network):
1. [Modeling breast cancer subtypes with Flexynesis](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/flexynesis_classification/tutorial.html) (2 hours)
2. [Preparing data from CbioPortal for Flexynesis integration](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/flexynesis_cbio_import/tutorial.html) (1 hour)
3. [Performing unsupervised analysis of bone marrow cells with Flexynesis](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/flexynesis_unsupervised/tutorial.html) (2 hours)
4. [Identifing survival markers of brain tumor with Flexynesis](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/flexynesis_survival/tutorial.html) (2 hours)
5. **[All ML/AI tutorials on GTN](https://training.galaxyproject.org/training-material/topics/statistics/)**

## Machine Learning Workflows Now Accessible via Galaxy

Galaxy has embraced ML through its dedicated **[Machine Learning Workbench](https://ml.usegalaxy.eu/)**, available on the public Galaxy server in Europe (the Galaxy ML Server). This workbench provides a comprehensive suite of data preprocessing, machine learning, deep learning, and visualization tools – essentially a one-stop shop for AI in Galaxy. Under the hood, it’s powered by a “Swiss Army knife” of libraries: **scikit-learn** for classical ML algorithms, **Keras** (TensorFlow-based) for deep learning, and many others. These are exposed as Galaxy tools, meaning you can configure and run algorithms (like training a neural network or a random forest) through simple form interfaces. The workbench even includes pre-built workflows for end-to-end ML analysis and sample datasets to get you started.

Notably, **advanced AI pipelines are also integrated**. For example, Galaxy now offers **[AlphaFold2](https://galaxyproject.org/news/2022-02-24-alphafold/)** as a tool, thanks to a collaboration led by Galaxy Australia and Europe. Researchers can input an amino acid sequence into Galaxy’s AlphaFold tool and obtain a predicted 3D structure, all through the browser. The heavy lifting (GPU-accelerated computation, large model files) is managed behind the scenes by Galaxy’s infrastructure. This integration of AlphaFold into Galaxy exemplifies how formerly complex, resource-intensive AI tasks are made accessible to any scientist.

## Accessible AI: No-Code Workflows, Training Materials, and Cloud Support

A core principle of Galaxy is accessibility. **Galaxy’s web-based interface** enables anyone to use complex analysis tools and multi-step workflows without needing programming skills. To help researchers learn these tools, the **[Galaxy Training Network](https://training.galaxyproject.org/) (GTN)** provides extensive tutorials and guided workflows, from foundational ML concepts to advanced deep learning applications. New specialized topics – even emerging areas like generative AI or [large language models](https://training.galaxyproject.org/training-material/topics/statistics/#st-gai-llm) – are continually being added to the training repository by the community.

Another facet of accessibility is computing resources. Machine learning, especially deep learning, can be computationally intensive. Galaxy addresses this via **cloud integration**. One prominent example is **[Galaxy on AnVIL](https://anvilproject.org/learn/run-interactive-analyses/getting-started-with-galaxy)**, the NHGRI’s cloud platform for biomedical data analysis. Because AnVIL is hosted on Google Cloud, users can tap into scalable CPUs, large-memory nodes, or GPUs as needed – all without directly managing any cloud infrastructure.

## Reproducibility and Collaboration in AI-Driven Biology

Reproducibility is a cornerstone of both Galaxy and good ML practice. When you run an analysis in Galaxy – whether it’s a simple sequence alignment or training a deep neural network – the platform automatically records every detail: tool versions, parameter settings, datasets used, and the exact steps taken. This provenance tracking means that any machine learning model you build in Galaxy can be reproduced later by you or by other researchers. 

The collaborative aspect is equally important. Galaxy’s sharing features let scientists collaborate on AI-driven research easily. You can share a Galaxy history (containing your data and analysis steps) with a collaborator or even publish it publicly. Such transparency and reusability accelerate scientific progress – results can be validated and extended by the community with minimal friction.

---

In summary, Galaxy is empowering biomedical researchers to leverage ML and AI with ease and confidence. From integrating flagship tools like AlphaFold and scRNA-seq clustering into accessible workflows, to providing training and cloud resources, Galaxy lowers the barrier to entry for cutting-edge AI methods. Its emphasis on no-code usability, coupled with rigorous reproducibility and shareability, means that **you can focus on biological questions while Galaxy handles the computational heavy lifting**.
