---
title: Ten Simple Rules for Setting up a Galaxy Instance as a Service
---

{{> Admin/LinkBox }}

Hans-Rudolf Hotz (hrh@fmi.ch)¹⋅²,
Jochen Bick (jochen.bick@usys.ethz.ch)³,
Nikolay Aleksandrov Vazov (n.a.vazov@usit.uio.no)⁴,
Björn Grüning (gruening@informatik.uni-freiburg.de)⁵⋅⁶

1) Friedrich Miescher Institute for Biomedical Research, Basel, Switzerland<br>
2) Swiss Institute of Bioinformatics, Basel, Switzerland<br>
3) ETH Zürich, Switzerland<br>
4) University of Oslo, Norway<br>
5) Albert-Ludwigs-Universität, Freiburg, Germany<br>
6) German Network of Bioinformatics Infrastructure (de.NBI), Freiburg, Germany




Galaxy is an open source, web-based platform for data intensive biomedical research (https://galaxyproject.org). Its popularity has been steadily increasing world wide well beyond the Bioinformatics field. More and more [public](/src/use/index.md) and private Galaxy servers are being set up. Providing 10 basic rules, this document tells you what is important when you set up a Galaxy server from scratch, what are the pitfalls you might run into, how to interact with the potential users of the service you are going to offer, how to make efficient use of your resources, and how to make sure, the Galaxy instance you have set up is really used in the end. Although, the Galaxy platform is evolving very fast, these rules will continue to be applicable, because they are very general, and less of a technical nature.
This article has been based on a presentation given at the Training Day at the Galaxy Community Conferences in Norwich, UK and Bloomington, IN in July 2015 and June 2016, respectively.

## Rule 1: There is no such thing as 'Free Lunch'
 
Although, the initial setup up of a Galaxy instance is simple, running, maintaining and adjusting the server to your needs will absorb resources. Providing a Galaxy instance for a group of different users or even a whole institute, is not the same as running and using Galaxy just for yourself. You have to make a commitment at the start, but you will gain a lot, and if you do it right, you will have exponential growth for the use of Galaxy. Obviously, the more users you have and the fancier your local adjustments are, the more time you have to invest. If you run a Bioinformatics support facility, you will eventually have less work to do, as more and more (repetitive) tasks can be delegated to Galaxy.
 
 
## Rule 2: Check: what are you actually asked for
 
Before you start any work, talk to the person(s) who asked you to set up a Galaxy server. Why Galaxy and what is the expectation? Even more important (in case they are not the same) talk to the people who will use your service. What do they want to use Galaxy for? Are they aware of the many [public Galaxy servers](/src/use/index.md) in addition the instance offered by the [Galaxy team](/src/main/index.md)? Or, are other tools and resources better suited for the expected tasks?
Once, you agreed on using Galaxy, you need to define which tools the new Galaxy server should offer. The [Galaxy Tool Shed](/src/toolshed/index.md) provide access to thousands of freely available tools and dependencies packages. Getting tools from the Tool Shed also helps to manage external tool dependencies. Of course you can develop your own tools. Often this might be the very reason why setting up a new, local Galaxy server. But keep in mind, there is no need for inventing the wheel again. Most likely, you can improve an existing tool instead. If you develop your own tools, please consider sharing them with the community and make them available through the Galaxy Tool Shed.
There are also other decisions you need to make early, which you hopefully can agree on during these discussions with the potential users and sponsors, as they will have effects on how to set-up the server:

* Will this be a [public server](/src/use/index.md), or just an internal service for your lab or institute?
* Do you rely on local (i.e. Galaxy managed) or on [external authentication](/src/admin/config/external-user-auth/)?
* Will there be sensible data on the server?
* Will the data be stored in one place or [distributed](/src/admin/objectstore/)?
* Do you want to put users in groups? 



 
## Rule 3: Check: what resources do you have / need
 
First, you need technical resources: 
Galaxy itself doesn't require much resources. The jobs executed on the Galaxy server do, and they might be very demanding. Based on the agreed list of tools and the expected number of users and amount of data, you need to estimate how many cpus, how much memory, and how much and what kind of storage will be required. Looking at the current rate of increase in amount of Biological data produced, it is probably best to at least double the numbers you come up with. If such hardware is not at hand, you can look at [cloud solutions](/src/cloud/).
 
Second, you need human resources:
If running locally, someone needs to do all the system admin task for the machine the Galaxy server will run on. Can you delegate this to your IT department? Check with your IT department, whether they allow the creation of an extra linux user, the Galaxy server will run as. Having insufficient support from your IT department is another reason to look at cloud solutions or to check the possibility to acquire a pre-configured server with a fully [operational Galaxy instance](/src/support/commercial/#servers).
Whatever solution fits best for you, you always need a ['Galaxy Admin' person](/src/admin/get-galaxy/#become-an-admin). This person does not need to be a 'Sys Admin'. But it is recommended, this person has write access to the Galaxy code, can restart the Galaxy server, and has write access to the Galaxy database. You can share this role among several people. The 'Galaxy Admin' gets an additional "Admin" menu item in the top bar when logged in. This menu item will open an extra page with many admin related tools. 
 
 
## Rule 4: Start small, but right
 
As you will go through a learning process yourself, make sure the initial service you offer is as small and simple as possible. Nevertheless, there are a few points to check, when you start offering a [production Galaxy server](/src/admin/config/performance/production-server/). By default, Galaxy uses SQLite and a built-in HTTP server. This configuration works for initial development and testing. It does not work for deployment, as it can not handle concurrent jobs. The switch from SQLite to PostgreSQL as the engine for the database server running the Galaxy instance should be considered at an early stage. Using a proxy server (like Apache or nginx) allows you to delegate certain tasks (e.g. serving static content).  
Have a look at [other installations](/src/community/deployment/) and check the Galaxy Community Log Board - a place to share how you addressed a particular [problem or task](/src/blog/index.md).
Take notes of all your changes and actions (setup, configurations, modifications, etc.), and consider storing config files in a version control system. 
 
 
## Rule 5: Set up only what you have been asked to
 
At least in the beginning: don't confuse your users with too many tools. It is also easier for you to manage the whole system, when only a small number of tools are offered. You can always expand the list of tools later depending on demand and feedback.
To avoid users being overwhelmed by a long list of tools, you can limit the choice of tools to the individual users or group of users by restricting [tool visibility](/src/user-defined-toolbox-filters/). You might need to restrict tool usage due to licensing issues (/src/admin/config/access-control/). This kind of access control is also good for testing new tools, where only a selected group of user will see the tools and help you testing before open up the tool to everyone.
In a simple setup, the Galaxy jobs are executed on the server on which the Galaxy application was started using the built in job scheduler. You can limit the maximum number of 
[concurrent jobs in total or per user](/src/admin/config/jobs/). If necessary, you can set up separate job submission queues for the different tools even on a single box using 
the built in job scheduler making sure slow and resource intensive jobs do not block quick jobs. Though, the recommended way is to use a [distributed resources managers](/src/admin/config/performance/cluster/) on a single box as well.
However, no matter how small or big your Galaxy installation is, make sure you have a production server and a development server (the development server has to be as similar as possible to the production server); and make sure you backup your server (including the PostgreSQL database).
 
 
## Rule 6: Know the tools you offer
 
First, make sure you know how to [use galaxy](/src/learn/). Second, understand the tools you offer. Remember, Galaxy is just a convenient wrapper around command line tools. Knowing how to execute them on the command line will be very helpful or even required to debug problems your users might run into (see also below). Hence, it is advisable, if you can rely on available expert knowledge (e.g. in Bioinformatics).
You might want to restrict options in certain tools, in order to prevent the possibilities of users executing jobs with unreasonable parameters, which might use too much memory for your local set-up.
 
 
## Rule 7: Set up the 'reports application'
 
The administration tools, you have access to as the 'Galaxy Admin', provide you with some data about the usage of your server. Much more information can be obtained by starting up the [reports application](/src/admin/usage-reports/). You can check numbers like “Today's jobs”, “All unfinished jobs”, “Jobs per tool”, “Jobs per user”, “User disk usage”, etc. The 'reports application' also tells you which command was executed for each job. This will get handy, if you need to debug a tool. As you can rerun the command yourself on the command line. Nevertheless, get familiar with the (PostgreSQL) database. This will allow you to execute queries which are not (yet) covered by the 'reports application'.
Additional (system) information about each executed job can be logged by activating plugins in the ["./config/job_metrics_conf.xml" file](/src/admin/config/job-metrics/).
 
 
## Rule 8: Prevent data duplication
 
Galaxy has sometimes the bad reputation, that it will cause data duplication. It is true, a user can repeat the same job ten times and thereby duplicate the data ten times. But this is not really Galaxy's fault, is-it? Nevertheless, there are several options for an economical use of the storage resources.
By default, Galaxy stores each history item (representing input data or a result) as a dataset file within the Galaxy directory tree. An individual user will accumulate many histories with a lot of datasets, some of them might be very large. A simple way to control the growth, is setting disk usage quotas for [users or groups](/src/admin/disk-quotas/). Make sure you run the cleanup scripts to purge the [deleted datasets on a regular basis](/src/admin/config/performance/purge-histories-and-datasets/).
Users can prevent duplication both in terms of storage and compute resources by sharing their histories with other users, so they don’t have to repeat the analysis (and thereby duplicate the data). 
The use of [Data Libraries](/src/data-libraries/) gives you the possibility to use a dataset by any number of users any number of times without duplicating the file on disk. 'Data Libraries' also allows you to work with data not stored within the [Galaxy directory tree](/src/data-libraries/#path-paste).
Many tools (like bowtie, BLAST, etc) need reference data, like (indexed) sequence data. Galaxy uses location files (“<GalaxyRoot>/tool-data/*.loc’) to tell the tools where to find the required data. 'Data Managers' which are available from the Tool Shed help you to download and index such data and adjust the location files [automatically](/src/admin/tools/data-managers/). Alternatively, you can manually edit the location files pointing to existing data and indices. This way you not only prevent data duplication, you also make sure, Galaxy users (and non Galaxy users) use the same reference data.
 
 
## Rule 9: Offer training
 
Although, there are many resources to learn how to use Galaxy, the best way to promote your new service is to offer training. This can be done face to face or in class. There are many examples for [training courses available](/src/teach/) (https://github.com/galaxyproject/training-material) on which you can build your own training sessions. You need to explain site specific set ups of your Galaxy server, e.g. access to the fastq files produced in your local NGS facility via 'Data Libraries'. Of course, if your local Galaxy server includes specialised tools, you have to introduce them. Prepare a good training data set, which will run quickly through your tools. If your own tools take a long time to run, it might be advisable to have a pre-run history ready, which you can share with your students.
During a Galaxy training session, you will have more users running tools at the same time than normal. Hence, running a training session is also a good way of stress testing your server. 
 
 
## Rule 10: Keep the Galaxy software (and yourself) up to date
 
Unless you have a very good reason, make sure your are running the latest (or at least a recent) Galaxy version. This way, it is easier for others to help you. Also, the issue you encounter might already be fixed in the current release. Obviously, doing updates are easier when they don't span several releases. (https://docs.galaxyproject.org/en/master/releases/index.html). 
In order to minimize the downtime, the authors suggest the following update procedure:

* Announce the upgrade and expected down time of the production server one week in advance. 
* During that week, install a new test server from scratch. This gives you the opportunity to learn about the new features of the Galaxy release. 
* Update the code of the test server you installed, at the last update. This will show you what you will encounter during the update (e.g. is a change of the database schema required). 
* Confident, with what to expect of the new release, update your development server. At this stage, you can catch any problems which might be caused by your site specific modifications. 
* And finally, update the production server. 
 
This way, doing an update is easy, as you are well prepared, when you do the changes on the production server and the down time will be minimal. This procedure needs to be adjusted to your local needs: consider stopping job submissions to the queuing system.
 
Equally important is to keep yourself up to date: read the monthly news letters ["Galactic News"](/src/galaxy-updates/) and the release notes (https://docs.galaxyproject.org/en/master/releases/index.html), follow the [mailing lists](/src/mailing-lists/) and follow Twitter (hashtag: #usegalaxy).
There is a "Galaxy-Admins" discussion group, which meets regularly using [telephone conferences](/src/community/#galaxyadmins). The best place to get to know the latest developments in the Galaxy community is to go to the annual Galaxy Community Conference. There are also many other Galaxy related [events](/src/events/) around the globe throughout the year. Knowing about the new features is one thing, actually looking into them and test them yourself is another issue which will take time. But this is time very well invested.

