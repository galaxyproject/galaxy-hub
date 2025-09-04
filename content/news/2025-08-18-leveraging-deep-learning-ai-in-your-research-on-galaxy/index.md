---
title: "Leveraging Deep Learning & AI in Your Research on Galaxy"
date: "2025-08-18"
tease: "use established tools for quality control or feature generation, then feed the results into an ML model – all within one platform"
subsites: [all]
---

# Leveraging Deep Learning & AI in Your Research on Galaxy

Machine learning (ML) and artificial intelligence (AI) are revolutionizing biomedical research. Applications of these techniques now span **genomics, imaging, and more** – from predicting drug metabolism using brain scans to identifying genotype–phenotype associations and drug responses. Deep learning, a subset of AI, has achieved remarkable feats such as detecting splice sites, predicting protein 3D structures, and diagnosing cancers from histopathology images. A prime example is DeepMind’s **AlphaFold2**, which stunned the world by predicting protein structures with near-experimental accuracy. AlphaFold’s release provided the 3D structures of essentially all human proteins to the scientific community, accelerating insights in structural biology and drug discovery. However, tapping into these advanced AI methods often requires significant coding and computational expertise, posing a hurdle for many biologists. This is where the Galaxy platform steps in – offering a user-friendly, no-code environment to leverage ML/DL in research while ensuring **scalability and reproducibility**.

## AI and Deep Learning in Biomedical Science

The surge of AI in biomedicine is driven by its success across diverse domains. **Protein structure prediction** is one high-profile example: AI models like AlphaFold can infer a protein’s 3D shape from its amino acid sequence with astonishing accuracy. Similarly, in pathology, deep convolutional networks classify tumor vs. normal tissue on digitized slides, aiding disease diagnosis. Single-cell genomics is another area transformed by ML – algorithms cluster cells by expression patterns to reveal novel cell types or states. These mainstream successes underscore AI’s potential, but they also highlight a challenge: such analyses traditionally demand coding proficiency in frameworks like TensorFlow/PyTorch and access to HPC or GPU resources. For many bench scientists, implementing these methods can be daunting. Galaxy addresses this gap by **democratizing AI**: it brings cutting-edge ML/DL tools to a web-based interface, so researchers can apply techniques like image classification or sequence-based deep learning without writing a single line of code.

Crucially, **Galaxy doesn’t work in isolation** – it bridges domain-specific data analysis with AI modeling. In typical biomedical studies, raw data must be processed (e.g. sequence alignment, feature extraction) before any ML model can be trained. Galaxy’s strength lies in unifying these steps. For instance, you might begin with sequencing data or microscope images in Galaxy, use established tools for quality control or feature generation, then feed the results into an ML model – all within one platform. This integration ensures that the entire pipeline, from **data preprocessing to model prediction**, is accessible and reproducible.

## Machine Learning Workflows Now Accessible via Galaxy

Galaxy has embraced ML through its dedicated **Machine Learning Workbench**, available on the public Galaxy server in Europe (the [Galaxy ML Server](https://ml.usegalaxy.eu/)). This workbench provides a comprehensive suite of data preprocessing, machine learning, deep learning, and visualization tools – essentially a one-stop shop for AI in Galaxy. Under the hood, it’s powered by a “Swiss Army knife” of libraries: **scikit-learn** for classical ML algorithms, **Keras** (TensorFlow-based) for deep learning, and many others. These are exposed as Galaxy tools, meaning you can configure and run algorithms (like training a neural network or a random forest) through simple form interfaces. The workbench even includes pre-built workflows for end-to-end ML analysis and sample datasets to get you started.

Notably, **advanced AI pipelines are also integrated**. For example, Galaxy now offers **AlphaFold2** as a tool, thanks to a collaboration led by Galaxy Australia and Europe. Researchers can input an amino acid sequence into Galaxy’s AlphaFold tool and obtain a predicted 3D structure, all through the browser. The heavy lifting (GPU-accelerated computation, large model files) is managed behind the scenes by Galaxy’s infrastructure. This integration of AlphaFold into Galaxy exemplifies how formerly complex, resource-intensive AI tasks are made accessible to any scientist.

## Accessible AI: No-Code Workflows, Training Materials, and Cloud Support

A core principle of Galaxy is accessibility. **Galaxy’s web-based interface** enables anyone to use complex analysis tools and multi-step workflows without needing programming skills. To help researchers learn these tools, the **Galaxy Training Network (GTN)** provides extensive tutorials and guided workflows, from foundational ML concepts to advanced deep learning applications. New specialized topics – even emerging areas like generative AI or large language models – are continually being added to the training repository by the community.

Another facet of accessibility is computing resources. Machine learning, especially deep learning, can be computationally intensive. Galaxy addresses this via **cloud integration**. One prominent example is **Galaxy on AnVIL**, the NHGRI’s cloud platform for biomedical data analysis. Because AnVIL is hosted on Google Cloud, users can tap into scalable CPUs, large-memory nodes, or GPUs as needed – all without directly managing any cloud infrastructure.

## Reproducibility and Collaboration in AI-Driven Biology

Reproducibility is a cornerstone of both Galaxy and good ML practice. When you run an analysis in Galaxy – whether it’s a simple sequence alignment or training a deep neural network – the platform automatically records every detail: tool versions, parameter settings, datasets used, and the exact steps taken. This provenance tracking means that any machine learning model you build in Galaxy can be reproduced later by you or by other researchers. 

The collaborative aspect is equally important. Galaxy’s sharing features let scientists collaborate on AI-driven research easily. You can share a Galaxy history (containing your data and analysis steps) with a collaborator or even publish it publicly. Such transparency and reusability accelerate scientific progress – results can be validated and extended by the community with minimal friction.

---

In summary, Galaxy is empowering biomedical researchers to leverage ML and AI with ease and confidence. From integrating flagship tools like AlphaFold and scRNA-seq clustering into accessible workflows, to providing training and cloud resources, Galaxy lowers the barrier to entry for cutting-edge AI methods. Its emphasis on no-code usability, coupled with rigorous reproducibility and shareability, means that **you can focus on biological questions while Galaxy handles the computational heavy lifting**.
