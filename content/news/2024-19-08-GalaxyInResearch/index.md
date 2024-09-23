---
title: "Galaxy in Research: Advancing quantum materials research with Galaxy"
tease: "At Oak Ridge National Laboratory, scientists have harnessed the power of Galaxy to bring together cutting-edge computing resources, paving the way for new discoveries in quantum materials through advanced neutron scattering data analysis."
hide-tease: false
authors: "Natalie Whitaker-Allen"
date: "2024-08-19"
tags: ["highlight"]
subsites: [global,all]
---

# **Galaxy in Research: Advancing quantum materials research with Galaxy**

*At Oak Ridge National Laboratory, scientists have harnessed the power of Galaxy to bring together cutting-edge computing resources, paving the way for new discoveries in quantum materials through advanced neutron scattering data analysis.*

## **Research Overview**

Understanding the behavior of correlated quantum materials involves intricate data analysis and sophisticated computational methods. Traditional approaches, such as density functional theory and linear spin-wave theory, often need to catch up in capturing the complexities of strong electron-electron interactions and localized electronic states. To address these challenges, researchers at Oak Ridge National Laboratory (ORNL) utilized advanced methods like dynamical mean-field theory (DMFT) and the dynamic cluster approximation (DCA) implemented in ORNL’s DCA++ code.

The study focused on neutron scattering data analysis for quantum materials, which is crucial for revealing the magnetic excitations of these systems. By integrating Galaxy with high-performance computing (HPC) and cloud resources, the research team developed a fully automated end-to-end workflow to streamline this complex analysis.

## **Key Findings**

* **Advanced Computational Approach**: The team used DMFT and DCA methods to model correlated quantum materials, providing a detailed and accurate description of magnetic excitations.

* **Workflow Automation:** The integration of Galaxy allowed for the automation of the DCA++ workflow, reducing the need for manual intervention and facilitating reproducibility.

* **Resource Efficiency:** The workflow used HPC and cloud-based resources, demonstrating flexibility and scalability in handling large datasets and complex calculations.

* **Scientific Impact:** The final results, including a comprehensive analysis of dynamic magnetic spin susceptibility, offer valuable insights into quantum materials, with potential implications for future neutron scattering experiments.

![GalaxyInResearch_Watson](https://github.com/user-attachments/assets/ec1052af-2432-47f8-9c90-a18544f34064)

*(Watson et al., 2024\)*  
*Key components of the Neutrons Data Interpretation Platform. Galaxy's infrastructure (shown in gray) includes Galaxy Server, Galaxy User Interfaces, and Pulsar.*

## **Galaxy's Role**

Galaxy played a significant role in the success of this study, enhancing the efficiency and effectiveness of the neutron data analysis workflow. Here’s how Galaxy contributed:

* **Workflow Integration:** Galaxy enabled the seamless integration of the DCA++ code into a comprehensive workflow. By creating custom tools and defining input/output requirements in XML files, Galaxy managed the data transfer and execution processes, ensuring smooth operation across different computational resources.

* **Data Management:** Galaxy’s integration with the Rucio object store allowed for efficient data handling, keeping large files local to their computational resources and avoiding unnecessary transfers.

* **Automated Execution:** Galaxy automated the workflow, eliminating manual steps and allowing researchers to run complex simulations with just a few clicks. This automation extended to the end-to-end execution, from initial convergence calculations to final result plotting.

* **Scalability and Flexibility:** Galaxy’s versatility in handling HPC and cloud-based resources is demonstrated by its workflow, which adapts to varying resource requirements, including large-scale computations on Frontier and post-processing on virtual machines.

## **Significance of the Study**

This study showcases the transformative power of combining Galaxy with advanced computational techniques. By automating and streamlining complex data analysis workflows, the researchers achieved significant scientific results and set a precedent for future studies in quantum materials. The integration of Galaxy into this process underscores its potential to address intricate scientific problems efficiently and reproducibly.

## **Acknowledgment**

Galaxy thanks the authors for their innovative use of Galaxy in their research. Their commitment to leveraging Galaxy’s capabilities for advanced neutron data analysis advances our understanding of quantum materials and exemplifies the powerful synergy between cutting-edge science and robust computational tools.

---<br><be> 

Watson GR, Maier TA, Yakubov S and Doak PW (2024) A galactic approach to neutron scattering science. Front. High Perform. Comput. 2:1390709. doi: 10.3389/fhpcp.2024.1390709

