Before starting Cloudgene, it is necessary to start [Cloudera Manager](/src/CloudMan/Services/ClouderaManager/index.md) service first. Once it is running, start the Cloudgene service. Both of these services can be started via !CloudMan's Admin page by clicking on *Start* next to the service name. Once running, the application is available under */cloudgene* URI.

For more info about Cloudgene, please visit http://cloudgene.uibk.ac.at/ or check out more Cloudgene workflows at [Michigan Imputation Server](https://imputationserver.sph.umich.edu/)  or  [mtDNA-Server](http://mtdna-server.uibk.ac.at).

This tutorial describes the "Hello World" example (=Wordcount) and its Cloudgene integration:

Login with the default credentials: (admin / admin1978)

![](http://cloudgene.uibk.ac.at/images/cloudman/config.png)

Select your data. In this case just upload a plain text file:

![](http://cloudgene.uibk.ac.at/images/cloudman/select.png)

Data is uploaded:

![](http://cloudgene.uibk.ac.at/images/cloudman/upload.png)

Job is started and in waiting queue:

![](http://cloudgene.uibk.ac.at/images/cloudman/waiting.png)

Job is running:

![](http://cloudgene.uibk.ac.at/images/cloudman/running.png)

Job is finished:

![](http://cloudgene.uibk.ac.at/images/cloudman/finished.png)

Download results. In this case there are seperate files, this can of course be changed automatically to auto merge and zip file format:

![](http://cloudgene.uibk.ac.at/images/cloudman/download.png)

The Admin Dashboard allows to maintain your service, check recent jobs or assign workflows to users: 

![](http://cloudgene.uibk.ac.at/images/cloudman/dashboard.png)

"Services" tab allows to manage your service for updates (=blocking queue) or maintenance status. 

![](http://cloudgene.uibk.ac.at/images/cloudman/maintenance.png)
