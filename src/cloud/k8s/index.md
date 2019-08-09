---
title: Galaxy on Kubernetes
highlight: true
---

In order to facilitate the deployment of Galaxy on kubernetes (k8s), we have
developed a [Helm chart](https://github.com/galaxyproject/galaxy-helm) 
that can be executed on a k8s cluster to deploy an instance of Galaxy.

In general, the following steps are required to deploy Galaxy on k8s using 
the Helm charts: 

1. Create a k8s cluster;
2. Install/configure [Helm](https://helm.sh);
3. Deploy Galaxy using the [Helm chart](https://github.com/galaxyproject/galaxy-helm);
4. Access and manage the Galaxy instance; 
5. Delete cluster.

Since k8s cluster setup and configuration may differ between platforms, 
we recommend that users consult the desired platform's documentation on the 
specifics of creating and managing a k8s cluster. However, as an example, here 
we describe how to deploy Galaxy on the following managed kubernetes services:

- [Amazon Elastic Kubernetes Service (Amazon EKS)](/src/cloud/k8s/eks/index.md)
- [Google Kubernetes Engine (GKE)](/src/cloud/k8s/gke/index.md)
