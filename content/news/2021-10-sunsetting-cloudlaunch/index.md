---

title: "Sunsetting the CloudLaunch service"
tease: "There are now better alternatives to using Galaxy on the cloud"
authors: "Enis Afgan"
date: "2021-10-15"
source_blog: "Galaxy Project Blog"
source_blog_url: "https://galaxyproject.org/blog/2021-10-sunsetting-cloudlaunch/"
---

Sunsets are generally considered pretty events so we’ll paint a positive picture
here. For the past decade, CloudLaunch (in its various incarnations) has been a
mechanism for anyone to launch a production-grade instance of Galaxy on the
cloud. Today, we are announcing the end of its evolution as it paves the way for
newer alternatives that now exist.

One thing worth mentioning is that CloudLaunch is not a synonym for Galaxy on
Kubernetes, the Galaxy Helm chart or the Genomics Virtual Lab (GVL), which were
technologies used for the Galaxy instances launched by CloudLaunch. These
technologies will continue to be actively developed and evolve, one day to yield
new services that better support Galaxy users. If you’d like to follow their
development or use those technologies, check out their respective repositories.


# A short history of CloudLaunch

In its first incarnation in 2009, CloudLaunch (if we can even call it that yet)
was just documentation - a set of instructions on how one can manually launch a
Galaxy instance on their Amazon Web Services (AWS) account using a number of
pre-built components that Galaxy needed. That was soon replaced with
BioCloudCentral, a simple web form that automated the manual steps of
provisioning the necessary resources and running any required startup scripts.
This simple web form was a great leap in usability but it really worked only
with AWS and the Galaxy application. It also required users to provide their AWS
credentials every time. As the Galaxy-on-the-cloud offering grew into the GVL,
BioCloudCentral was replaced with a new application, today’s CloudLaunch.
CloudLaunch was a general purpose infrastructure launcher with support for AWS,
OpenStack, Google Cloud, and Azure, that allowed users to choose from a number
of applications to launch, in addition to Galaxy. It also allowed users to store
their cloud credentials and thereby track all of their launched instances as
well as delete them. Over the years, incarnations of CloudLaunch have handled
about 25,000 launches for some 2,000 distinct users. CloudLaunch has also
enabled hundreds of researchers in various training activities and workshops to
have access to dedicated cloud infrastructure to complete the training materials
in a timely fashion and with appropriate resources.


# So why sunset?

When we started [developing
support](https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-11-S12-S4)
for [Galaxy-on-the-cloud](https://www.nature.com/articles/nbt.2028) and
[CloudLaunch](https://currentprotocols.onlinelibrary.wiley.com/doi/full/10.1002/0471250953.bi1109s38),
we were pioneering adoption of the cloud for genomics. We’d like to think that
this work inspired part of the recent shift where most of the organizations and
funding bodies are actively considering or pursuing cloud strategies for their
workloads. As a result, there are viable alternatives to CloudLaunch today that
are better maintained and more integrated with how researchers work. These
provide equivalent or better user experiences. By consolidating how we at Galaxy
approach cloud infrastructure, we are opening the doors for future development
to further improve that experience.


# What are some of the alternatives available today?

Below is a list of alternatives to CloudLaunch, each targeting a specific use
case or type of user that CloudLaunch catered to. All these options are
available today so find the best match and go for it.



* If you are a user looking to get access to an unrestricted, customizable
  Galaxy instance that multiple users can share, a suitable option and most
  comparable alternative to CloudLaunch is
  [Laniakea](https://laniakea.readthedocs.io/en/latest/user_documentation/galaxy/galaxy.html).
  With Lanikea users can launch their own instance of Galaxy with a scalable
  cluster handling the workfloads.
* Another similar alternative is [Galaxy on AnVIL](https://anvilproject.org/).
  This option is the best one if you are working with human genetics data. AnVIL
  is a cloud-based platform where anyone can get access to Galaxy as well direct
  access to a plethora of human datasets. As of time of writing, there is over
  3PB of data available in AnVIL that are linked directly into Galaxy. One
  caveat of Galaxy on AnVIL is that each user gets their own instance of Galaxy
  due to FedRAMP compliance requirements so sharing works a bit differently.
* If you are looking to hold a workshop and you relied on CloudLaunch to get
  access to a dedicated Galaxy instance,
  [Training-Infrastructure-as-a-Service](https://training.galaxyproject.org/training-material/topics/admin/tutorials/tiaas/tutorial.html)
  (TIaaS) is a great option. TIaaS allows you to request access to a dedicated
  pool of resources on one of the usegalaxy.* servers that will be used only by
  the registered training participants. This offers the benefit of a responsive
  runtime environment for the users during the training event or a workshop. It
  also allows the users to keep their analysis history after the event has
  ended, come back to the same usegalaxy.* server at a later time, and continue
  where they left off.


# What happens next?

Updates and further development of CloudLaunch will no longer take place. We
will keep the service available until November 1, 2021 after which date
_launch.usegalaxy.org_ will point to a static page. Meanwhile, we will
concentrate our efforts on enhancing the options listed above as well as
developing new opportunities and services to enhance the Galaxy user experience.
