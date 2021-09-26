---
title: Galaxy on Kubernetes
highlight: true
---

In order to facilitate the deployment of Galaxy on kubernetes (K8s), we have
developed a [Helm chart](https://github.com/galaxyproject/galaxy-helm) 
that can be executed on a K8s cluster to deploy an instance of Galaxy.

In general, the following steps are required to deploy Galaxy on a K8s cluster
using the Helm charts:

1. Create a K8s cluster;
2. Install/configure [Helm](https://helm.sh);
3. Deploy Galaxy using the [Helm chart](https://github.com/galaxyproject/galaxy-helm);
4. Access and manage the Galaxy instance; 
5. Delete cluster.

Since a K8s cluster setup and configuration differs between platforms,
we recommend that users consult the desired platform's documentation on the 
specifics of creating and managing a K8s cluster. However, as an example, here
we describe how to deploy Galaxy on the following managed K8s services:

- [Amazon Elastic Kubernetes Service (Amazon EKS)](/cloud/k8s/eks/)
- [Google Kubernetes Engine (GKE)](/cloud/k8s/gke/)
