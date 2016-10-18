Before starting Cloudgene, it is necessary to start [Cloudera Manager](/src/CloudMan/Services/ClouderaManager/index.md) service first. Once it is running, start the Cloudgene service. Both of these services can be started via !CloudMan's Admin page by clicking on *Start* next to the service name. Once running, the application is available under */cloudgene* URI.

For more info about Cloudgene, please visit http://cloudgene.uibk.ac.at/ or check out more Cloudgene workflows at [Michigan Imputation Server](https://imputationserver.sph.umich.edu/)  or  [mtDNA-Server](http://mtdna-server.uibk.ac.at).

This tutorial describes the "Hello World" example (=Wordcount) and its Cloudgene integration:

Login with the default credentials: (admin / admin1978)

<img src="http://cloudgene.uibk.ac.at/images/cloudman/config.png" alt="" width=700 />

Select your data. In this case just upload a plain text file:

<img src="http://cloudgene.uibk.ac.at/images/cloudman/select.png" alt="" width=700 />

Data is uploaded:

<img src="http://cloudgene.uibk.ac.at/images/cloudman/upload.png" alt="" width=700 />

Job is started and in waiting queue:

<img src="http://cloudgene.uibk.ac.at/images/cloudman/waiting.png" alt="" width=700 />

Job is running:

<img src="http://cloudgene.uibk.ac.at/images/cloudman/running.png" alt="" width=700 />

Job is finished:

<img src="http://cloudgene.uibk.ac.at/images/cloudman/finished.png" alt="" width=700 />

Download results. In this case there are seperate files, this can of course be changed automatically to auto merge and zip file format:

<img src="http://cloudgene.uibk.ac.at/images/cloudman/download.png" alt="" width=700 />

The Admin Dashboard allows to maintain your service, check recent jobs or assign workflows to users: 

<img src="http://cloudgene.uibk.ac.at/images/cloudman/dashboard.png" alt="" width=700 />

"Services" tab allows to manage your service for updates (=blocking queue) or maintenance status. 

<img src="http://cloudgene.uibk.ac.at/images/cloudman/maintenance.png" alt="" width=700 />
