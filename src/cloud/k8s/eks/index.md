---
title: Deploy an Instance of Galaxy on Amazon Elastic Kubernetes Service
highlight: true
---

We break the steps of deploying Galaxy on 
[Amazon Elastic Kubernetes Service (Amazon EKS)](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html)
into the following sections:

- [Create a k8s cluster](#create-a-cluster);
- [Install Helm](#install-helm);
- [Deploy an instance of Galaxy using Helm charts](#deploy-galaxy-on-the-cluster);
- [Access the deployed Galaxy instance](#access-galaxy-instance);
- [Delete cluster](#delete-eks-cluster). 

# Create a Cluster

Amazon EKS offers two methods for creating a cluster: either via console, 
or by using a tool named `eksctl`.

When creating a cluster, you will need to make the following 
decisions, taking note of the choices you make: 

1. Choose a [region](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html):
the region selected must have Amazon Secure Token Service (STS)  
activated for your account. You do not necessarily have STS activate for all
regions under your account; please consult with your account admin. If you 
choose a region where STS is not activated for your account, you may get an 
error message as the following: 

    ```bash
    AWS::EKS::Cluster/ControlPlane: CREATE_FAILED – 
    STS is not activated in this region for account:0123456789. 
    Your account administrator can activate STS in this region using the IAM Console. 
    ```

2. Choose an [instance type](https://aws.amazon.com/ec2/instance-types/); 
two points to consider: first, not necessarily all instance types are available in 
all regions; therefore, choose an instance type that is available in the 
zone where you have STS activated. Second, choose an instance with a "reasonable"
amount of resources, as you will be running multiple pods within that instance,
and if you do not have enough resources, your pods will fail to schedule. For 
instance, avoid instance types such as `a1.medium`.

3. Cluster node count. While you can deploy Galaxy on a k8s cluster with 
multiple nodes, in the following we discuss how to deploy on a cluster with 
a single node, as there is an additional step for deployment on a multi-node
cluster that will be discussed separately. 

To create a cluster on on EKS, you may follow these tutorials:
- via console; read [how to start a cluster using the console](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html);
- via the `eksctl` CLI tool; read [how to start a cluster using eksctl](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html)

If you have used the `eksctl` tool to start a cluster, you may have run a 
command similar to the following, which creates a cluster with `1` node of 
`m5.4xlarge` instance type in `us-east-1` zone:

```bash
$ eksctl create cluster --name CLUSTER-NAME --version 1.13 --nodegroup-name standard-workers --node-type m5.4xlarge --nodes 1 --nodes-min 1 --nodes-max 1 --node-ami auto --region us-east-1
```

Note that the instance type and zone values are arbitrary and you may choose any 
values following the afore-discussed points.

If the command execution is successful, you may see an output as: 

```bash
[ℹ]  using region us-east-1
[ℹ]  setting availability zones to [us-east-1b us-east-1c]
[ℹ]  subnets for us-east-1b - public:192.168.0.0/19 private:192.168.64.0/19
[ℹ]  subnets for us-east-1c - public:192.168.32.0/19 private:192.168.96.0/19
[ℹ]  nodegroup "standard-workers" will use "ami-..." [AmazonLinux2/1.13]
[ℹ]  using Kubernetes version 1.13
[ℹ]  creating EKS cluster "CLUSTER-NAME" in "us-east-1" region
[ℹ]  will create 2 separate CloudFormation stacks for cluster itself and the initial nodegroup
[ℹ]  if you encounter any issues, check CloudFormation console or try 'eksctl utils describe-stacks --region=us-east-1 --name=CLUSTER-NAME'
[ℹ]  2 sequential tasks: { create cluster control plane "CLUSTER-NAME", create nodegroup "standard-workers" }
[ℹ]  building cluster stack "eksctl-CLUSTER-NAME-cluster"
[ℹ]  deploying stack "eksctl-CLUSTER-NAME-cluster"
[ℹ]  building nodegroup stack "eksctl-CLUSTER-NAME-nodegroup-standard-workers"
[ℹ]  deploying stack "eksctl-CLUSTER-NAME-nodegroup-standard-workers"
[✔]  all EKS cluster resource for "CLUSTER-NAME" had been created
[✔]  saved kubeconfig as "/Users/CLUSTER-NAME/.kube/config"
[ℹ]  adding role "arn:aws:iam::...:role/eksctl-CLUSTER-NAME-nodegroup-standard-w-NodeInstanceRole-..." to auth ConfigMap
[ℹ]  nodegroup "standard-workers" has 0 node(s)
[ℹ]  waiting for at least 1 node(s) to become ready in "standard-workers"
[ℹ]  nodegroup "standard-workers" has 1 node(s)
[ℹ]  node "ip-192-168-47-193.ec2.internal" is ready
[ℹ]  kubectl command should work with "/Users/CLUSTER-NAME/.kube/config", try 'kubectl get nodes'
[✔]  EKS cluster "CLUSTER-NAME" in "us-east-1" region is ready
```

# Install Helm

In order to install and configure Helm on an EKS cluster, you may use 
[this documentation](https://docs.aws.amazon.com/eks/latest/userguide/helm.html).


# Deploy Galaxy on the Cluster

Once you have established that you have Helm and have configured the `tiller` 
server (as detailed in the above documentation), the deployment of a Galaxy on 
a k8s cluster consists of two steps: 

1. [Optional] deploy the [CernVM File System (CVMFS)](https://cernvm.cern.ch/portal/filesystem) chart.
You may run the following commands for this deployment: 

    ```bash
    $ git clone https://github.com/CloudVE/galaxy-cvmfs-csi-chart.git
    $ cd galaxy-cvmfs-csi-chart/galaxy-cvmfs-csi
    $ helm install .
    ```
    
    Output may look like the following:
    
    ```bash
    NAME:   wistful-sasquatch
    LAST DEPLOYED: Thu Aug  8 11:13:35 2019
    NAMESPACE: default
    STATUS: DEPLOYED
    
    RESOURCES:
    ==> v1/ClusterRole
    NAME                            AGE
    cvmfs-external-attacher-runner  3s
    cvmfs-nodeplugin                3s
    cvmfs-provisioner-runner        3s
    
    ==> v1/ClusterRoleBinding
    NAME                    AGE
    cvmfs-attacher-role     3s
    cvmfs-nodeplugin        3s
    cvmfs-provisioner-role  3s
    
    ==> v1/ConfigMap
    NAME             DATA  AGE
    cvmfs-configmap  3     4s
    
    ==> v1/PersistentVolume
    NAME            CAPACITY  ACCESS MODES  RECLAIM POLICY  STATUS  CLAIM                    STORAGECLASS  REASON  AGE
    cvmfs-cache-pv  1000Mi    RWX           Retain          Bound   default/cvmfs-cache-pvc  manual        4s
    
    ==> v1/PersistentVolumeClaim
    NAME             STATUS  VOLUME          CAPACITY  ACCESS MODES  STORAGECLASS  AGE
    cvmfs-cache-pvc  Bound   cvmfs-cache-pv  1000Mi    RWX           manual        4s
    
    ==> v1/Pod(related)
    NAME                           READY  STATUS             RESTARTS  AGE
    csi-cvmfsplugin-9gl65          0/2    ContainerCreating  0         3s
    csi-cvmfsplugin-attacher-0     0/1    ContainerCreating  0         3s
    csi-cvmfsplugin-provisioner-0  0/1    ContainerCreating  0         2s
    
    ==> v1/Service
    NAME                         TYPE       CLUSTER-IP     EXTERNAL-IP  PORT(S)    AGE
    csi-cvmfsplugin-attacher     ClusterIP  10.100.151.23  <none>       12345/TCP  3s
    csi-cvmfsplugin-provisioner  ClusterIP  10.100.64.145  <none>       12345/TCP  3s
    
    ==> v1/ServiceAccount
    NAME               SECRETS  AGE
    cvmfs-attacher     1        3s
    cvmfs-nodeplugin   1        3s
    cvmfs-provisioner  1        3s
    
    ==> v1/StorageClass
    NAME            PROVISIONER      AGE
    cvmfs-gxy-data  csi-cvmfsplugin  4s
    cvmfs-gxy-main  csi-cvmfsplugin  4s
    
    ==> v1beta1/StatefulSet
    NAME                         READY  AGE
    csi-cvmfsplugin-attacher     0/1    3s
    csi-cvmfsplugin-provisioner  0/1    2s
    
    ==> v1beta2/DaemonSet
    NAME             DESIRED  CURRENT  READY  UP-TO-DATE  AVAILABLE  NODE SELECTOR  AGE
    csi-cvmfsplugin  1        1        0      1           0          <none>         3s
    
    ```

2. Deploy Galaxy chart, using the following commands:

    ```bash
    $ git clone https://github.com/galaxyproject/galaxy-helm.git
    $ cd galaxy-helm/galaxy/
    $ helm dependency update
    $ helm install . --set persistence.accessMode=ReadWriteOnce --set service.type=LoadBalancer --set service.port=80 -f values-cvmfs.yaml
    ``` 
    
    The output should look like the following:
    
    ```bash
    NAME:   wistful-quoll
    LAST DEPLOYED: Thu Aug  8 11:21:33 2019
    NAMESPACE: default
    STATUS: DEPLOYED
    
    RESOURCES:
    ==> v1/ConfigMap
    NAME                            DATA  AGE
    wistful-quoll-galaxy-configs    8     2s
    wistful-quoll-galaxy-job-rules  2     3s
    
    ==> v1/Deployment
    NAME                      READY  UP-TO-DATE  AVAILABLE  AGE
    wistful-quoll-galaxy-job  0/1    1           0          2s
    wistful-quoll-galaxy-web  0/1    1           0          2s
    
    ==> v1/PersistentVolumeClaim
    NAME                                     STATUS   VOLUME          CAPACITY  ACCESS MODES  STORAGECLASS  AGE
    wistful-quoll-galaxy-cvmfs-gxy-data-pvc  Pending  cvmfs-gxy-data  2s
    wistful-quoll-galaxy-cvmfs-gxy-main-pvc  Pending  cvmfs-gxy-main  2s
    wistful-quoll-galaxy-pvc                 Pending  gp2             2s
    
    ==> v1/Pod(related)
    NAME                                       READY  STATUS   RESTARTS  AGE
    wistful-quoll-galaxy-job-5c4f897669-k46vk  0/1    Pending  0         2s
    wistful-quoll-galaxy-postgres-0            0/1    Pending  0         2s
    wistful-quoll-galaxy-web-595f59c5b-gx974   0/1    Pending  0         2s
    
    ==> v1/Role
    NAME                                AGE
    wistful-quoll-galaxy-role-pod-jobs  2s
    
    ==> v1/RoleBinding
    NAME                            AGE
    wistful-quoll-galaxy-batch-ops  2s
    
    ==> v1/Secret
    NAME                           TYPE    DATA  AGE
    wistful-quoll-galaxy-initdb    Opaque  2     3s
    wistful-quoll-galaxy-postgres  Opaque  1     3s
    
    ==> v1/Service
    NAME                                    TYPE          CLUSTER-IP      EXTERNAL-IP  PORT(S)       AGE
    wistful-quoll-galaxy                    LoadBalancer  10.100.54.20    <pending>    80:30691/TCP  2s
    wistful-quoll-galaxy-postgres           ClusterIP     10.100.169.181  <none>       5432/TCP      2s
    wistful-quoll-galaxy-postgres-headless  ClusterIP     None            <none>       5432/TCP      2s
    
    ==> v1beta1/Ingress
    NAME                  HOSTS  ADDRESS  PORTS  AGE
    wistful-quoll-galaxy  *      80       2s
    
    ==> v1beta2/StatefulSet
    NAME                           READY  AGE
    wistful-quoll-galaxy-postgres  0/1    2s
    ```
    
# Access Galaxy Instance

Having deployed Galaxy on an EKS cluster, you may access the instance as the following:

1. Run `kubectl get svc`, which lists the services as the following: 

    ```bash
    NAME                                     TYPE           CLUSTER-IP       EXTERNAL-IP        PORT(S)        AGE
    csi-cvmfsplugin-attacher                 ClusterIP      10.100.151.23    <none>             12345/TCP      17m
    csi-cvmfsplugin-provisioner              ClusterIP      10.100.64.145    <none>             12345/TCP      17m
    kubernetes                               ClusterIP      10.100.0.1       <none>             443/TCP        47m
    wistful-quoll-galaxy                     LoadBalancer   10.100.54.20     a5d718acbba09...   80:30691/TCP   9m
    wistful-quoll-galaxy-postgres            ClusterIP      10.100.169.181   <none>             5432/TCP       9m
    wistful-quoll-galaxy-postgres-headless   ClusterIP      None             <none>             5432/TCP       9m
    ```

2. Copy the `Name` of the `LoadBalancer` service (in this case, 
'wistful-quoll-galaxy'), and run the following command:

    ```bash
    $ kubectl describe svc wistful-quoll-galaxy
    ```
    where `wistful-quoll-galaxy` is the name of the `LoadBalancer` in our example, that 
    should be replaced by the name of `LoadBalancer` in your deployment.
    
    The output of this command is as the following: 
    
    ```bash
    Name:                     wistful-quoll-galaxy
    Namespace:                default
    Labels:                   app.kubernetes.io/instance=wistful-quoll
                              app.kubernetes.io/managed-by=Tiller
                              app.kubernetes.io/name=galaxy
                              helm.sh/chart=galaxy-3.0.0
    Annotations:              <none>
    Selector:                 app.kubernetes.io/instance=wistful-quoll,app.kubernetes.io/name=wistful-quoll-galaxy,component=galaxy-web-handler
    Type:                     LoadBalancer
    IP:                       10.100.54.20
    LoadBalancer Ingress:     a0a000aaaaa0000a000aa0a0a00a00aa-000000000.us-east-1.elb.amazonaws.com
    Port:                     http  80/TCP
    TargetPort:               galaxy-http/TCP
    NodePort:                 http  30691/TCP
    Endpoints:                192.168.32.240:8080
    Session Affinity:         None
    External Traffic Policy:  Cluster
    Events:
      Type    Reason                Age   From                Message
      ----    ------                ----  ----                -------
      Normal  EnsuringLoadBalancer  10m   service-controller  Ensuring load balancer
      Normal  EnsuredLoadBalancer   10m   service-controller  Ensured load balancer
    ```

    The public IP address from which the Galaxy instance is available is given in the 
    `LoadBalancer Ingress` field.
    
# Delete EKS Cluster

To delete all resources associated with the cluster (such as nodes, the load 
balancer, and volumes) and avoid orphaned resources, a few steps must be taken:

1. Run `kubectl get svc --all-namespaces`, whose output may look like the following:

    ```bash
    NAMESPACE     NAME                                     TYPE           CLUSTER-IP       EXTERNAL-IP        PORT(S)         AGE
    default       csi-cvmfsplugin-attacher                 ClusterIP      10.100.151.23    <none>             12345/TCP       26m
    default       csi-cvmfsplugin-provisioner              ClusterIP      10.100.64.145    <none>             12345/TCP       26m
    default       kubernetes                               ClusterIP      10.100.0.1       <none>             443/TCP         56m
    default       wistful-quoll-galaxy                     LoadBalancer   10.100.54.20     a5d718acbba09...   80:30691/TCP    18m
    default       wistful-quoll-galaxy-postgres            ClusterIP      10.100.169.181   <none>             5432/TCP        18m
    default       wistful-quoll-galaxy-postgres-headless   ClusterIP      None             <none>             5432/TCP        18m
    kube-system   kube-dns                                 ClusterIP      10.100.0.10      <none>             53/UDP,53/TCP   56m
    ```
    
2. Copy the `NAME` of the `LoadBalancer` service, and run the following command:

    ```bash
    $ kubectl delete svc wistful-quoll-galaxy
    ```
    
    where `wistful-quoll-galaxy` is the `NAME` of the `LoadBalancer` in our 
    example. This will prevent normal failure recovery procedures from 
    recreating any terminated instances.
    
3. To delete the cluster, run the following command replacing `CLUSTER-NAME` and `REGION` 
with the name of your cluster and region, respectively, that you assigned when 
creating the cluster.  

    ```bash
    $ eksctl delete cluster --name CLUSTER-NAME --region REGION
    ```
    
    Output:
    
    ```bash
    [ℹ]  using region us-east-1
    [ℹ]  deleting EKS cluster "CLUSTER-NAME"
    [✔]  kubeconfig has been updated
    [ℹ]  cleaning up LoadBalancer services
    [ℹ]  2 sequential tasks: { delete nodegroup "standard-workers", delete cluster control plane "CLUSTER-NAME" [async] }
    [ℹ]  will delete stack "eksctl-CLUSTER-NAME-nodegroup-standard-workers"
    [ℹ]  waiting for stack "eksctl-CLUSTER-NAME-nodegroup-standard-workers" to get deleted
    [ℹ]  will delete stack "eksctl-CLUSTER-NAME-cluster"
    [✔]  all cluster resources were deleted
    ```
    
4. [Amazon Elastic Block Store (EBS)](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-ebs-volume.html)
volumes may not delete automatically. To delete them manually, take the following steps:

    - Goto [https://console.aws.amazon.com/ec2/](https://console.aws.amazon.com/ec2/);
    - Choose `Volumes` under the `ELASTIC BLOCK STORE` category;
    - choose the related volumes for the list;
    - click on the `Actions` button, then the `Delete Volumes` menu item. 
