---
title: Deploy an Instance of Galaxy on Google Kubernetes Engine
highlight: true
---

We break the steps of deploying a Galaxy instance on
[Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine/)
to the following sections:

- [Create a K8s cluster](#create-a-cluster);
- [Set the current context to your cluster](#set-the-current-context);
- [Install Helm](#install-helm);
- [Initialize Helm](#initialize-helm);
- [Deploy an instance of Galaxy using Helm charts](#deploy-galaxy-on-the-cluster);
- [Delete cluster](#delete-resources-and-gke-cluster). 

> Note that all the commands given in this tutorial have been tested in 
[_Cloud shell_](https://cloud.google.com/shell/); however, they may be
applicable to any console where the
[K8s command-line tool (`kubectl`)](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
is installed and configured.


# Create a Cluster

To create a GKE cluster, you may follow tutorials such as
[this](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-cluster) or
[this](https://cloud.google.com/kubernetes-engine/docs/quickstart).
Alternatively, you may run the following steps:

1- Goto [K8s Engine page](https://console.cloud.google.com/projectselector/kubernetes?_ga=2.101714888.-830640031.1571682936);
2- Select a project, or create one if you already do not have one;
3- On the top-right, click on the `Activate Cloud Shell [>_]` button;
4- Run the following commands in the opened shell:
    4.1- Configure project name:
        ```shell
        $ gcloud config set project <PROJECT NAME>
        ```

        Replace `<PROJECT_NAME>` with your selected project name.

    4.2- Configure zone (e.g., us-central1-a):

        ```shell
        $ gcloud config set compute/zone <ZONE>
        ```

        Replace `<ZONE>` with your zone preference; you may get a list of
        available zones using the following command:

        ```shell
        gcloud compute zones list
        ```

    4.3- Create cluster:

        ```shell
        $ gcloud container clusters create <CLUSTER_NAME> --cluster-version=1.13.7-gke.24 --num-nodes=1 --machine-type=n1-standard-32
        ```

        The specific arguments are:
            - Replace `<CLUSTER_NAME>` with your name preference.

            - `cluster-version`: the instructions on this page are tested using
            `--cluster-version=1.13.7-gke.24` for their compatibility
            (with `helm`, discussed later on this page).

            - `num-nodes`: the instructions on this page are compatible with a
            single-node cluster (i.e., `--num-nodes=1`). A multi-node
            cluster setup requires additional steps [discussed here](#multi-node-cluster);
            therefore, if you increment the number of nodes, make sure the multi-node cluster
            requirements are met.

            - `machine-type`: the default machine type (i.e., `n1-standard-1`) can be considered
            suboptimal for Galaxy requirements, hence we set the machine type to `n1-standard-32`
            in this example. You may choose a machine type that serves best your requirements and
            zone selection. You may obtain a list of available machine type using the following
            command:

                ```shell
                $ gcloud compute machine-types list
                ```

            You may refer to [this page](https://cloud.google.com/sdk/gcloud/reference/container/clusters/create)
            for a complete list of the `gcloud` command arguments.



# Set the current context

After creating a cluster, ensure that the `kubectl` context in your shell
environment is pointing to the correct cluster.
For GKE Cloud Shell, you may use the `Connect` button next to your cluster in
the `Kubernetes clusters` list in the GKE dashboard, which will start a new
Cloud Shell tab with a pre-written line of the following form:

```bash
gcloud container clusters get-credentials <CLUSTER_NAME> --zone <ZONE> --project <PROJECT_NAME>
```

# Install Helm

[`Helm`](https://helm.sh) is a K8s package manager, which is composed of two
components: client ([`helm`](https://helm.sh/docs/install/)) and
server ([`Tiller`](https://helm.sh/docs/glossary/#tiller)).

In order to deploy a Galaxy instance on a K8s cluster, a `helm` and `tiller`
installations on the cluster are required. You may already have `helm` and `tiller`
installed on the cluster; you may run the following command to ensure they are
properly installed:

```bash
$ helm version
```

If the output is as the following, you would need to configure `tiller`:

```shell
Client: &version.Version{SemVer:"v2.14.1", GitCommit:"5270352a09c7e8b6e8c9593002a73535276507c0", GitTreeState:"clean"}
Error: could not find tiller
```

In order to install `helm` and `tiller`, run the following commands
in the [_Cloud shell_](https://cloud.google.com/shell/):


```bash
$ wget https://storage.googleapis.com/kubernetes-helm/helm-v2.14.1-linux-amd64.tar.gz
$ tar zxfv helm-v2.14.1-linux-amd64.tar.gz
$ sudo cp linux-amd64/helm /usr/local/bin/helm
$ kubectl create clusterrolebinding user-admin-binding --clusterrole=cluster-admin --user=$(gcloud config get-value account)
$ kubectl create serviceaccount tiller --namespace kube-system
$ kubectl create clusterrolebinding tiller-admin-binding --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
$ helm init --service-account=tiller
$ helm repo update
$ rm helm-v2.14.1-linux-amd64.tar.gz
$ rm -r linux-amd64/
```

You may re-run the following command to ensure Helm client and server successful installation:

```shell
$ helm version
Client: &version.Version{SemVer:"v2.14.1", GitCommit:"5270352a09c7e8b6e8c9593002a73535276507c0", GitTreeState:"clean"}
Server: &version.Version{SemVer:"v2.14.1", GitCommit:"5270352a09c7e8b6e8c9593002a73535276507c0", GitTreeState:"clean"}
```

Additionally, you may run the following command to ensure a `tiller`
[pod](https://kubernetes.io/docs/concepts/workloads/pods/pod/) is running:

```shell
$ kubectl -n kube-system get pods
NAME                                READY   STATUS    RESTARTS   AGE
tiller-deploy-6d65d78679-xr9f4      1/1     Running   0          3m17s
```

If the helm `tiller` pod is not running, you may re-install it using the
following commands:

```bash
$ helm reset
$ kubectl create clusterrolebinding user-admin-binding --clusterrole=cluster-admin --user=$(gcloud config get-value account)
$ kubectl create serviceaccount tiller --namespace kube-system
$ kubectl create clusterrolebinding tiller-admin-binding --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
$ helm init --service-account=tiller
$ helm update
```


# Deploy Galaxy on the Cluster

The deployment of Galaxy on a K8s cluster consists of two steps discussed as it follows.

1. [Optional] Deploy the [CernVM File System (CVMFS)](https://cernvm.cern.ch/portal/filesystem)
service using [CVMFS-CSI chart](https://github.com/CloudVE/galaxy-cvmfs-csi-chart).
You may run the following commands for this deployment: 

    ```bash
    $ git clone https://github.com/CloudVE/galaxy-cvmfs-csi-chart.git
    $ helm install galaxy-cvmfs-csi-chart/galaxy-cvmfs-csi/ --namespace=cvmfs --name=gxy-cvmfs
    ```

    If you get an error saying `Error: no available release name found`,
    you may take the following steps:

    - first [reset `helm`](https://helm.sh/docs/helm/#helm-reset), then
    re-run the aforementioned `helm install` command.

    - if resetting `helm` does not resolve the error, you may run the following commands:
    ```bash
    $ kubectl create serviceaccount --namespace kube-system tiller
    $ kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
    $ kubectl patch deploy --namespace kube-system tiller-deploy -p '{"spec":{"template":{"spec":{"serviceAccount":"tiller"}}}}'
    ```

2. Deploy Galaxy chart using the following commands:

    ```bash
    $ git clone https://github.com/galaxyproject/galaxy-helm.git
    $ cd galaxy-helm/galaxy
    $ helm dependency update
    $ helm install . --set persistence.accessMode=ReadWriteOnce --set service.type=LoadBalancer --set service.port=80 --set ingress.enabled=false -f values-cvmfs.yaml --name gxy --namespace gxy-namespace
    $ kubectl config set-context --current --namespace=gxy-namespace
    ```

    At this point, wait for about 8 minutes, and then check the status of the pods
    if all are scheduled and running using the following command:

    ```bash
    $ kubectl get pods

    ```

## Multi-node Cluster

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
