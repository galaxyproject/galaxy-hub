---
title: Deploy an Instance of Galaxy on Google Kubernetes Engine
highlight: true
---

We break the steps of deploying Galaxy on 
[Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine/)
to the following sections:

- [Create a k8s cluster](#create-a-cluster);
- [Install Helm](#install-helm);
- [Deploy an instance of Galaxy using Helm charts](#deploy-galaxy-on-the-cluster);
- [Delete cluster](#delete-eks-cluster). 

> Note that all the commands given in this tutorial are to be run in 
[_Cloud shell_](https://cloud.google.com/shell/).

# Create a Cluster
While you may deploy Galaxy on a k8s cluster with multiple nodes, in the 
following we discuss how to deploy on a cluster with a single node, 
as there are additional steps for deployment on a multi-node cluster, 
which will be discussed separately. 

To create a cluster on GKE, you may follow 
[this](https://cloud.google.com/kubernetes-engine/docs/quickstart) tutorial.

# Install Helm

In order to install [`Helm`](https://helm.sh) and 
[`Tiller`](https://helm.sh/docs/glossary/#tiller) (the Helm server),
run the following commands in the [_Cloud shell_](https://cloud.google.com/shell/): 


```bash
$ wget https://storage.googleapis.com/kubernetes-helm/helm-v2.10.0-linux-amd64.tar.gz
$ tar zxfv helm-v2.10.0-linux-amd64.tar.gz
$ cp linux-amd64/helm .
$ kubectl create clusterrolebinding user-admin-binding --clusterrole=cluster-admin --user=$(gcloud config get-value account)
$ kubectl create serviceaccount tiller --namespace kube-system
$ kubectl create clusterrolebinding tiller-admin-binding --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
$ ./helm init --service-account=tiller
$ ./helm update
```

> Note that we're using `./helm`, which is a separate installation in user's space
  as opposed to `helm` that is a version installed on the server.
  
You may use the following command to ensure the `Tiller` is running:

```bash
$ kubectl -n kube-system get pods
``` 

and check if a pod as the following is in the displayed list:

```bash
tiller-deploy-95d654d46-6pjn5     1/1     Running     0     13m
```

If such a pod does not exist, you may run the following commands:

```bash
$ kubectl -n kube-system delete deployment tiller-deploy
$ kubectl -n kube-system delete service/tiller-deploy
$ ./helm --init
```

# Deploy Galaxy on the Cluster

The deployment of a Galaxy on a k8s cluster consists of two steps: 

1. [Optional] deploy the [CernVM File System (CVMFS)](https://cernvm.cern.ch/portal/filesystem) chart.
You may run the following commands for this deployment: 

    ```bash
    $ git clone https://github.com/CloudVE/galaxy-cvmfs-csi-chart.git
    $ ./helm install galaxy-cvmfs-csi-chart/galaxy-cvmfs-csi/ --namespace=cvmfs
    ```
    
    If you get an error saying `Error: no available release name found`, you may
    either:
    
    - [Reset Helm](https://helm.sh/docs/helm/#helm-reset);
    - if resetting Helm does not resolve the error, you may run the following commands:
        ```bash
        $ kubectl create serviceaccount --namespace kube-system tiller
        $ kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
        $ kubectl patch deploy --namespace kube-system tiller-deploy -p '{"spec":{"template":{"spec":{"serviceAccount":"tiller"}}}}'
        ```
        
2. Deploy Galaxy chart, using the following commands:

```bash
$ ./helm dependency update
```

If you see an error similar to `Error: incompatible versions client[v2.14.1] server[v2.10.0]`,
then run:

```bash
./helm init --upgrade
```

```bash
$ git clone https://github.com/galaxyproject/galaxy-helm.git
$ cd galaxy-helm/galaxy
$ ../../helm install . --set persistence.accessMode=ReadWriteOnce --set service.type=LoadBalancer --set service.port=80 -f values-cvmfs.yaml
```

At this point, wait for about 8 minutes, and then check the status of the pods
if all are scheduled and running. 


- [Delete cluster](#delete-eks-cluster). 
You may `uninstall` the chart (Galaxy deployment), using the following command: 

```bash
$ helm del --purge galaxy
```

However, this will only delete the deployment, and will leave behind the resources 
bound to cluster, such as nodes, and volumes. Therefore, take the following steps to 
delete the deployment and cluster:

1. Delete any remaining services:

```bash
kubectl delete service SERVICE-NAME
``` 

2. Delete cluster: 

```bash
gcloud container clusters delete CLUSTER_NAME
```
