[Cloudera Manager](http://www.cloudera.com/content/cloudera/en/products-and-services/cloudera-enterprise/cloudera-manager.html) is a management application for Hadoop clusters. It allows one to deploy Hadoop-based services via a graphical web interface. It has been integrated into !CloudMan as an efficient method for deploying and managing Hadoop services. In this context, !CloudMan is used to provision the necessary cloud resources (e.g., instances, disks) while Cloudera Manager is used to deploy and manage Hadoop services. For more information about Cloudera Manager, see the [product page](http://www.cloudera.com/content/cloudera/en/products-and-services/cloudera-enterprise/cloudera-manager.html).

When running Cloudera Manager, it is necessary to use an instance type with at least 15GB RAM. Once an instance has launched, start Cloudera Manager application from the !CloudMan Admin page by clicking on the *Start* button next to the service name. Once started, the application is available under */cmf* URI. To login, use the same credentials used to authenticate with !CloudMan.

For the time being, it is necessary to manually create and configure a Hadoop cluster by following the wizard within Cloudera Manager application after logging in.

Login with the password you specified on Cloud Launch form when you started the cluster (username is always *ubuntu*):

![](http://i.imgur.com/wHAafY7.png)

Select "Cloudera Express" version:

![](http://i.imgur.com/iDIAubH.png)

Overview of available services. Just press "Continue":

![](http://i.imgur.com/XUMBFk5.png)

Select the "Currently Managed Hosts" and check the checkbox next to the available node; press "Continue":

![](http://i.imgur.com/7ADgrlE.png)

Select the (only) available version of CDH and press "Continue":

![](http://i.imgur.com/MLME7SG.png)

Overview of progress. Press "Continue" when parcel is ready (this typically takes 3-5 minutes):

![](http://i.imgur.com/ejxwPD1.png)

Inspect for correctness. Press "Finish":

![](http://i.imgur.com/KQSsjqr.png)

Select "Custom Services" and check "HDFS" and "YARN (MR2 included)"

![](http://i.imgur.com/s45eYoj.png)

Use default configuration and press "Continue":

![](http://i.imgur.com/UzXZXWd.png)

Select the directories where you want to store your HDFS data and press "Continue":

![](http://i.imgur.com/lKtflmx.png)

Wait until "First Run" is finished and press "Continue":

![](http://i.imgur.com/ikOX0ah.png)
![](http://i.imgur.com/QsEiUs1.png)

System is now ready and  [Cloudgene](/src/CloudMan/Services/Cloudgene/index.md) can be started (from the CloudMan Admin page):
![](http://i.imgur.com/SirnrWl.png)

This is a default dashboard view for the Cloudera Manager. 
![](http://i.imgur.com/llO7KvF.png)
