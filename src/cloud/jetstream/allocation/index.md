{{> Cloud/Jetstream/LinkBox }}

## Requesting an allocation

For the time being, it is necessary for each Jetstream user to request a new resource allocation or be added to someone's allocation. This page covers the process of getting an XSEDE *Startup* type of allocation. You will need an XSEDE account before you can proceed (visit https://www.xsede.org/ to create one).

* Start your allocation process by visiting http://jetstream-cloud.org/allocations.php and clicking on *Submit and manage allocation requests* link. After you logged in using your XSEDE account, choose *Startup* type of allocation.

<img src="http://i.imgur.com/8RPpGbC.png" alt="" width=400 />
* Next, set your role as a PI and click Next.

<img src="http://i.imgur.com/xqfxW30.png" alt="" width=400 />
* In the next step, you will need to provide a title for your allocation and an abstract about your research. 100 words is sufficient. 
* Choose *Jetstream* as your desired target resource type and supply your anticipated usage for the duration of the project in [Service Units (SUs)](https://portal.xsede.org/knowledge-base/-/kb/document/bazo); projects are awarded on an annual basis so be careful not to forget about your instance left running when not in use. Note that 1 virtual CPU on an Jetstream instance corresponds to 1 SU. So, if you launch a 8 CPU instance, you will be using 8 SUs per each hour the instance is running. So, do some math and try to estimate how many SUs will you need each month.

<img src="http://i.imgur.com/BS9h6Kn.png" alt="" width=400 />
* You will also ned to supply your CV. For *Startup* type allocation, adding supporting grants and publications is optional but feel free to add any.

<img src="http://i.imgur.com/jlVRiTk.png" alt="" width=150 /> <img src="http://i.imgur.com/e1r3q0a.png" alt="" width=150 /> <img src="http://i.imgur.com/IfMUenh.png" alt="" width=150 />
* Finally, submit your application and wait approximately one business day for the allocation request to be approved.

<img src="http://i.imgur.com/BgL7Phr.png" alt="" width=400 />

## API access

To use CloudLaunch (https://beta.launch.usegalaxy.org/) or access the Jetstream
API programmatically, it is necessary to retrieve API credentials:

1. Log onto the OpenStack dashboard
Visit https://iu.jetstream-cloud.org/dashboard and login using your TACC
credentials. TACC credentials are the ones you can obtain and/or login at
https://portal.xsede.org/. The _Domain_ field is always set to _tacc_.

<a href='/src/cloud/jetstream/allocation/jetstream-os-dashboard.png'>
    <img src="/src/cloud/jetstream/allocation/jetstream-os-dashboard.png" alt="" width="75%" />
</a><br /><br />

2. Navigate to the _API Access_ page and download the _OpenStack RC File v3_:

<a href='/src/cloud/jetstream/allocation/jetstream-os-api-creds.png'>
    <img src="/src/cloud/jetstream/allocation/jetstream-os-api-creds.png" alt="" width="75%" />
</a><br /><br />

By default, when using this file, you will be prompted for your TACC account
password. A more convenient but less secure approach is to save the password
directly in the file by editing it as follows (note the two lines being
commented and the value of `OS_PASSWORD` variable set):

<a href='/src/cloud/jetstream/allocation/rc.png'>
    <img src="/src/cloud/jetstream/allocation/rc.png" alt="" width="75%" />
</a><br /><br />

### Using API credentials for CloudLaunch

After you have downloaded the API access credentials, you can use them to launch
instance using CloudLaunch. Head to https://beta.launch.usegalaxy.org/ and
choose an application you would like to launch. Note that not all applications
support all clouds.

On the application launch page, you will need to provide your credentials.
The easiest method is to load them from the file we downloaded in the previous
step.

<a href='/src/cloud/jetstream/allocation/cl-load-creds-1.png'>
    <img src="/src/cloud/jetstream/allocation/cl-load-creds-1.png" alt="" width="75%" />
</a><br /><br />

Once the file is loaded, fill in any missing fields and validate the
credentials.

<a href='/src/cloud/jetstream/allocation/cl-load-creds-2.png'>
    <img src="/src/cloud/jetstream/allocation/cl-load-creds-2.png" alt="" width="75%" />
</a><br /><br />

If the credentials authenticate, click _Next_ to proceed.

<a href='/src/cloud/jetstream/allocation/cl-load-creds-3.png'>
    <img src="/src/cloud/jetstream/allocation/cl-load-creds-3.png" alt="" width="75%" />
</a><br /><br />

You also have an option to save the uploaded credentials to the server
and in the future you will be able to just select the credentials from
the appropriate menu:

<a href='/src/cloud/jetstream/allocation/cl-load-creds-4.png'>
    <img src="/src/cloud/jetstream/allocation/cl-load-creds-4.png" alt="" width="75%" />
</a><br /><br />

**Note** that for the time being, if you launch instances via CloudLaunch, it will be 
necessary to shut them down using the Jetstream OpenStack Dashboard 
(https://iu.jetstream-cloud.org/dashboard).
