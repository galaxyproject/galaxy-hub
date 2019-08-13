---
title: Deploy an Instance of Galaxy on Google Kubernetes Engine
highlight: true
---

We break the steps of deploying Galaxy on 
[Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine/)
to the following sections:

- [Create a k8s cluster](#create-a-cluster);
- [Set the current context to your cluster](#set-the-current-context);
- [Install Helm](#install-helm);
- [Initialize Helm](#initialize-helm);
- [Deploy an instance of Galaxy using Helm charts](#deploy-galaxy-on-the-cluster);
- [Delete cluster](#delete-resources-and-gke-cluster). 

> Note that all the commands given in this tutorial have been tested in 
[_Cloud shell_](https://cloud.google.com/shell/), although they can 
theoretically be run in any shell where the `kubectl` command exists and the
the Kubernetes context is properly pointing to a running cluster.


# Create a Cluster
While you may deploy Galaxy on a k8s cluster with multiple nodes, in the 
following we discuss how to deploy on a cluster with a single node, 
as there are additional steps for deployment on a multi-node cluster, 
which will be discussed separately.

To create a cluster on GKE, you may follow 
[this](https://cloud.google.com/kubernetes-engine/docs/quickstart) tutorial.

> Note that not all `helm` versions will be compatible with all GKE Kubernetes
versions. The most recent tested versions are `Kubernetes v1.13.7-gke.8`
(obtained by running `kubectl version`) with `helm v2.14.1`.


# Set the current context

After creating a cluster, ensure that the `kubectl` context in your shell
environment is pointing to the correct cluster.
For GKE Cloud Shell, you may use the `Connect` button next to your cluster in
the `Kubernetes clusters` list in the GKE dashboard, which will start a new
Cloud Shell tab with a pre-written line of the following form:
```bash
gcloud container clusters get-credentials [cluster-name] --zone [cluster-zone] --project [project-name]
```
hit the `Return` key to set the proper `kubectl` configurations.

Additionally, you may use the following command to get the current context:
```bash
kubectl config current-context
```
which should return a line of the form:
```bash
gke_[project-name]_[cluster-zone]_[cluster-name]
```


# Install Helm

Before runnning these commands, you may first want to check whether `helm` is
already installed in your environment. You may do so by running the following:

```bash
$ helm version
```

The helm client is properly installed if this command outputs the following:
`Client: &version.Version{SemVer:"v2.14.1", GitCommit:"5270352a09c7e8b6e8c9593002a73535276507c0", GitTreeState:"clean"}`
In this case, you may want to skip this installation part, unless you are
aiming to manually change the `helm` client version.

> Note that not all `helm` versions will be compatible with all GKE Kubernetes
versions. The most recent tested versions are `helm v2.14.1` with
`Kubernetes v1.13.7-gke.8` (obtained by running `kubectl version`).

Additionally, when running `helm version` it is expected to get the second
line indicating an `i/o timeout error`. This means that the `tiller` (i.e.
server-side helm) is not running. You should also skip the initialization
section, if instead you see the following second line:
`Server: &version.Version{SemVer:"v2.14.1", GitCommit:"5270352a09c7e8b6e8c9593002a73535276507c0", GitTreeState:"clean"}`

In order to install [`Helm`](https://helm.sh), we have compiled this list
of commands that have been tested on GKE. Given that the Cloud Shell storage
is persistent by default, *this only needs to be done a single time per shell 
environment* in order to install the `helm` client.

```bash
$ wget https://storage.googleapis.com/kubernetes-helm/helm-v2.14.1-linux-amd64.tar.gz
$ tar zxfv helm-v2.14.1-linux-amd64.tar.gz
$ # This will put helm on the path, if you do not wish to run it from the local binary
$ sudo cp linux-amd64/helm /usr/local/bin/helm
$ # Alternatively, you may run helm from the local binary using: ./linux-amd64/helm
```

If you have copied the `helm` binary to the path, you may cleanup the files
previously downloaded and unpacked, as you can now use the `helm` command
will persist in the shell environment. In order to do so, you may run
the following commands:

```bash
$ rm helm-v2.14.1-linux-amd64.tar.gz
$ rm -r linux-amd64/
```


# Initialize Helm

The previous commands only need to be run once per shell environment, as the
`helm` binary will persist and can be re-used. However, the following
initialization needs to be run once for each new kubernetes cluster. This will
initialize the `tiller` (i.e. server-side `helm`) pod, which is needed for
`helm` to install a chart. Before running these commands 


```bash
$ kubectl create clusterrolebinding user-admin-binding --clusterrole=cluster-admin --user=$(gcloud config get-value account)
$ kubectl create serviceaccount tiller --namespace kube-system
$ kubectl create clusterrolebinding tiller-admin-binding --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
$ helm init --service-account=tiller
$ helm update
```

You may use the following command to ensure the `Tiller` is running:

```bash
$ kubectl -n kube-system get pods
``` 

and check if a pod with the prefix `tiller-deploy` is in the displayed list:

```bash
tiller-deploy-95d654d46-6pjn5     1/1     Running     0     13m
```

However, the state of the `tiller` pod may appear as `Running` even when
it silently fails on some GKE versions. In order to ensure that `helm` is
properly configured, you should also run `helm version` and make sure that
both the `Client` and `Server` versions appear:

```bash
Client: &version.Version{SemVer:"v2.14.1", GitCommit:"5270352a09c7e8b6e8c9593002a73535276507c0", GitTreeState:"clean"}
Server: &version.Version{SemVer:"v2.14.1", GitCommit:"5270352a09c7e8b6e8c9593002a73535276507c0", GitTreeState:"clean"}
```

If the pod is not properly running, you may run the following commands to
uninstall and re-install the helm `tiller` pod:

```bash
$ helm reset
$ kubectl create clusterrolebinding user-admin-binding --clusterrole=cluster-admin --user=$(gcloud config get-value account)
$ kubectl create serviceaccount tiller --namespace kube-system
$ kubectl create clusterrolebinding tiller-admin-binding --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
$ helm init --service-account=tiller
$ helm update
```


# Deploy Galaxy on the Cluster

The deployment of Galaxy on a k8s cluster consists of two steps: 

1. [Optional] Deploy the [CernVM File System (CVMFS)](https://cernvm.cern.ch/portal/filesystem)
through the [CVMFS-CSI chart](https://github.com/CloudVE/galaxy-cvmfs-csi-chart).
You may run the following commands for this deployment: 

```bash
$ git clone https://github.com/CloudVE/galaxy-cvmfs-csi-chart.git
$ helm install galaxy-cvmfs-csi-chart/galaxy-cvmfs-csi/ --namespace=cvmfs --name=gxy-cvmfs
```

2. Deploy Galaxy chart, using the following commands:

```bash
$ git clone https://github.com/galaxyproject/galaxy-helm.git
$ cd galaxy-helm/galaxy
$ helm dependency update
$ helm install . --set persistence.accessMode=ReadWriteOnce --set service.type=LoadBalancer --set service.port=80 --set ingress.enabled=false -f values-cvmfs.yaml --name my-gxy --namespace mynamespace
```

At this point, wait for about 8 minutes, and then check the status of the pods
if all are scheduled and running.

The cluster's default `storageClass` (which is usually supports `ReadWriteOnce`
access mode) will be used. If you set-up a cluster with multiple nodes, a 
`storageClass` that supports `ReadWriteMany` access mode should be available 
on the cluster, and should be set using `--set 
presistence.storageClass=[storageClassName]` (leaving 
`accessMode=ReadWriteMany`). We recommend using the
[NFS-Provisioner](https://github.com/helm/charts/tree/master/stable/nfs-server-provisioner)
for a multi-node setup.


# Delete Resources and GKE cluster
1. You may `uninstall` the Galaxy chart release using the following command: 

```bash
$ helm del --purge my-gxy
```

If you also deployed the CVMFS-CSI Chart, you may also delete that release:

```bash
$ helm del --purge gxy-cvmfs
```

2. If the `reclaimPolicy` of PVCs is `delete`, all resources deployed will be
deleted with the exception of the `Postgres` data PVC and Volume.
If you wish to delete this volume as well, use:

```bash
kubectl --namespace mynamespace get pvc
kubectl delete pvc data-my-gxy-galaxy-postgres-0 --namespace mynamespace
```

3. Delete cluster: 

You can delete the cluster either through the GKE dahsboard, or by using the
following command:

```bash
gcloud container clusters delete [CLUSTER_NAME]
```

More info on deleting a GKE cluster can be found at the [GKE docs](https://cloud.google.com/kubernetes-engine/docs/how-to/deleting-a-cluster).
