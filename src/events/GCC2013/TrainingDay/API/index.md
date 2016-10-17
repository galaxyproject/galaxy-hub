---
autotoc: true
---





PLACEHOLDER_INCLUDE(/Events/GCC2013/Header)




PLACEHOLDER_INCLUDE(/Events/GCC2013/LinkBox)




<div class='right'><a href='/Events/GCC2013/TrainingDay'><img src='/Images/Logos/GCC2013TrainingDayLogo300.png' alt='Training Day' width="200" /></a></div>





# The Galaxy API




The Galaxy API is a way of interacting with Galaxy data without using the web-based, user interface.




A more thorough explanation can be found at [/Learn/API](/src/Learn/API/index.md) along with some general steps on
how to begin using the API. This page may duplicate some of that data in order to keep information relevant to the
workshop in one place.




Full documentation for each API function and module is posted at
[ReadTheDocs.org](http://galaxy-dist.readthedocs.org/en/latest/lib/galaxy.webapps.galaxy.api.html).




This Wiki page is the outline of a 2013 GCC workshop that attempts to teach the conventions of Galaxy's API
while building an example script.




<br />
</div></div>





## What's an API and why would I care?




An API (Application Programming Interface) is the syntax defined by a program for how it can be controlled by another.




A web (REST or REpresentational State Transfer) API is just an another API where the syntax,
instead of function calls and their arguments, is made up of a series of URLs and HTTP requests. The server providing
the web API becomes the program and the URLs become the commands - all through the *medium* of the HTTP protocol.




Imagine if your home had a web API. You might be able to turn on the lights simply by typing
`myhouse.net/lights/dining-room/on`, `myhouse.net/fireplace/on?setting=low`, etc. Each URL entered
would tell this external system (your home) to perform a single action.




You certainly can do these things yourself by manually turning light switches on and lighting fires -
but the key advantages to an API are that you can:
1. Iteratively accomplish tasks:
  `for every book in the bedroom, return the book to the bookshelf (ok - that probably won't be possible any time soon -
  but wouldn't it be nice)`
2. Scheduled or responsive tasks even when you're not around:
  `when I'm on vacation, feed the cat everyday at 8am and bring in the mail at 2pm`
3. Compose complex tasks/scripts from simple tasks to remove the tedium of common scenarios:
  `wake me up at 6:00am, turn on the lights, and start making some frighteningly strong coffee` -> `ohgodmorning.py`








In more Galaxy specific terms, the web API allows you to use Galaxy's capabilities programmatically:
running a workflow *over each file* in a directory, moving a dataset to a library *only if* it passes some QA
threshold, upload a fastq file *when* the sequencer finishes writing it, or *combine* any or all of the above into
another script.




Additionally, and perhaps more importantly: even when your scripts run, the features that make Galaxy great are still
applied to your data:
* histories still capture the exact steps of your experiments and reproducibility is maintained,
* jobs and compute resources are still managed for you,
* datasets and metadata persist and are centrallized,
* your work is still sharable,
* etc.




It's also worth noting that all the work you did via the API is still accessible and modifiable when you return to the UI.








<br />
-----------------------------------------------------------
# How to Access and Use the API




Anything that can communicate over HTTP can use the Galaxy web API.
* browser - capable of only simple GET API methods
* wget - only GET methods - but from the command line
* curl - a unix program that will let you use any API method




Some programming or scripting languages have their own libraries to do this:
* python - urllib, urllib2 (can be complicated), requests (simplifies, but still many options)
* javascript - jquery (use any API method, browser only), node (any method, command line)
* bash - curl + bash = you're probably a bioinformaticist




There are several scripts and excellent programming libraries designed to help with the Galaxy API:
* scripts/api - a small selection of simple scripts and examples that can help you write and explore interacting with
  the galaxy API in python, located in the root directory of a Galaxy installation
* bioblend - ([source](https://github.com/afgane/bioblend), [documentation](http://blend.readthedocs.org/en/latest/))
  a library for use in python that greatly simplifies writing complex Galaxy API interactions
* blend4j - ([source](https://github.com/jmchilton/blend4j), [documentation](https://github.com/jmchilton/blend4j#readme))
  a library for use in Java based on bioblend




Data returned from (and in some cases passed to) the Galaxy API is often described or formatted in
[JSON](http://en.wikipedia.org/wiki/JSON) (!JavaScript Object Notation) - a compact and flexible way of describing
relatively complex data structures. Conversion to the language you may be programming in is automatic in the case of the
scripts/api directory, !BioBlend, and !Blend4j and relatively easy for python, and a non-issue for !JavaScript.







<br />
## The concepts of resources, verbs, and the REST model




A common way to construct an API command is to view it as a simple (imperative) sentence: <verb> <a resource>




* What are resources? The datasets you upload and generate from tools, the tools themselves, jobs, histories,
  libraries, even you (a `galaxy_user`) - essentially any *thing* in Galaxy that is recorded in the database.
* Your verbs are [CRUD (Create, Retrieve, Update, Delete)](http://en.wikipedia.org/wiki/CRUD) - considered by many to
  be the four building blocks of any interaction with a database and, because of that, resources. Some map to the
  sentence metaphor well (e.g. `delete a history`) others do not (e.g. `create a workflow` would *run* a workflow).
* The HTTP versions of CRUD are POST (Create), GET (Retrieve), PUT (Update), and DELETE (Delete). There are
  others but they don't apply (yet). These are
  [HTTP request methods](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods).
* Often additional options and parameters must be passed to specify how the command should take place.




From that then, it follows that each web API URL (command) is composed of three parts:
1. an HTTP method - the verb
2. a URL path - the resource
3. and any additional arguments or parameters the API command may need













<br />
-----------------------------------------------------------
# A Sample Use




We'll slowly build a fairly complex script using the API to:
* Create a history
* Upload a file from our local system to the server and place it in that history (data/myIlluminaRun.solexa.fastq -
  also available from [this published history on Galaxy Main](https://main.g2.bx.psu.edu/u/aun1/h/quickie-14))
* Run a workflow on that file [ATTACHMENT_URLGalaxy-Workflow-Joined_Solexa_QC.ga](ATTACHMENT_URLGalaxy-Workflow-Joined_Solexa_QC.ga) (already available in your instance)
* Get some information about the workflow
* Rename the file and annotate it
* Copy the file to a library




The final script should not be considered a 'good' script, however, because a good script would take into account:
* Complications: typically in a robust script/application, a significant amount of code will go towards handling
  [corner-cases](http://en.wikipedia.org/wiki/Corner_case). For the sake of making the learning examples clear and
  easy to follow, we won't cover very many of these situations.
* Error handling: errors can and will occur during development. Again in this case, we'll only make limited use
  of python's error handling capability and a real script would have more and better handling. **We want everyone to be
  able to follow along, however, so if you do see an error - please, let us know and we can try and get you past it.**
* Windows compatibility: these scripts aren't tested with Windows (but they should work with some minor tweaking).




There are 10 steps total to building the script. Each step (step_1.py, step_2.py, ...) has its own progressively longer
version of the final script, adding new sections and new functionality.





As each step introduces new functionality in the API, they will themselves include new, short modules that center
around some resource and the API methods that can be applied to them. For example, when writing step_2.py, we'll create
several history scripts (histories_1.py, histories_2.py) that each add more to what we can do with histories. step_2.py
will then `import` these smaller modules to combine them into our final script.




Also note: that almost every 'resource' script can function on its own, providing some functionality (such as querying
or creating).








<br />
-----------------------------------------------------------
# The Set Up
* If you haven't already, download the [virtual machine (VM) image](http://wiki.galaxyproject.org/Events/GCC2013/TrainingDay/VMs) for this workshop.
* If you haven't already, start the VM
* fire up Etherpad (https://etherpad.mozilla.org/hCF6QedfLD)
* fire up the terminal
* directory structure for the workshop
* Galaxy start up - mention the use of a local installation (or a development installation) for exploring the API
* open gedit (or other) in order to load the scripts in each step




## The API Key
* load the galaxy home page, login, and go to the top menu 'User' -> 'API Keys'
* Let's look for the api key (don't change it or press the 'Generate' button)




Your **API key** is unique identifier that is sent to the API to link you with your Galaxy account and checks your
access to data. It is effectively your username and password. **Treat it with the same caution and care you would your
password**.




For the purposes of simplifying some of our scripts, we're going to add our API key as an environment variable in our
terminal session.




```wiki solid/red
**Keeping any form of unencrypted authentication can be dangerous and that includes your API key**.
If you use the following technique, place the `source`ed environment variable file in a secure location on your
local filesystem.
```





Let's load the API key into our terminal session:
```bash
source apiworkshop-setup.sh
```





And check what environment variables it's added. First, the API key:
```bash
echo $GALAXY_API_KEY
```





then the **base url** of where our Galaxy installation is served:
```bash
echo $GALAXY_BASE_URL
```





These will both be needed in every call to the API.








## Structure
We'll be using python and [scripts/api/common.py](ATTACHMENT_URLcommon.py) as a layer on top of urllib2.
[ATTACHMENT_URLsetup.py](ATTACHMENT_URLsetup.py) will load our key and base URL for every API call.




Much of the functionality of the resource scripts (such as users_1.py, histories_1.py, etc.) is available already
in !BioBlend or Blend4j - we won't use them here so we can get a closer look on the internals and conventions of the API.








<br />
-----------------------------------------------------------
# The Steps





<br />
## 1. Checking your key with the user API
We'll start with the scripts: [ATTACHMENT_URLstep_1.py](ATTACHMENT_URLstep_1.py) and [ATTACHMENT_URLusers_1.py](ATTACHMENT_URLusers_1.py).




These are simple scripts that only make a connection, call GET api/users, and return information about us - the current
user.




Of course, normally we already know this information but this allows us to **test whether our server, url, and key are
working properly**.




Taking a look inside users_1.py we can see we're simply calling a function in our `main` clause: get_users. It takes
our key (since it's our form of authentication here) and the root URL, builds on that URL with the api/ + resource and
then calls `common.get` with those parameters (which does some of the heavy/tedious lifting here).




```wiki solid
All API method calls will follow this pattern: build a URL from a base URL and a resource then pass it to an HTTP method
in `common.py` with the key authentication.
```





```bash
./users_1.py
```






Here's the data the users_1.py script should return (if all went well):
```bash
[ { u'email': u'apiworkshop@example.com',
    u'id': u'1cd8e2f6b131e891',
    u'model_class': u'User',
    u'quota_percent': None,
    u'url': u'/api/users/1cd8e2f6b131e891'}]
```

(Note: your ID may be different)




Note the syntax of what's returned: a list with one element, the element is in python dictionary form, and the strings
are unicode strings. Most resource data returned from the API will be in dictionary form (after having been converted
from JSON objects in common.py). It's a list because we used the index API method (we'll cover that in step 2) and
there's only one element because we're only allowed to access our own user data. Unicode strings will be a common sight
during the workshop for both dictionary keys and values. They're a special string for encoding many human languages and
writing systems but for all intents and purposes here they can be thought of as normal strings.




Now - try the first iteration of our main script, step_1.py.
```bash
./step_1.py
```





You should see the same data returned as users_1.py - we're not doing much yet.









<br />
## 2. Looking at your histories with the history API
Here we'll learn how to query all our histories and query a specific history.




Scripts: [ATTACHMENT_URLstep_2.py](ATTACHMENT_URLstep_2.py), [ATTACHMENT_URLhistories_1.py](ATTACHMENT_URLhistories_1.py), [ATTACHMENT_URLhistories_2.py](ATTACHMENT_URLhistories_2.py)








<br />
### histories_1.py
histories_1.py allows us to get (summary) data on all our histories using the GET method and the index API method.




Calling histories_1.py from the command line should show us a single, 'Unnamed history' complete with Id, name, and
other attributes. Note that, even though there is only one history, the form of the data returned is a list:
```bash
[ { u'deleted': False,
    u'id': u'c24141d7e4e77705',
    u'model_class': u'History',
    u'name': u'Unnamed History',
    u'published': False,
    u'tags': [],
    u'url': u'/api/histories/c24141d7e4e77705'}]
```





histories_1.py is an **index** API method. These are generally used to return lists of often summary information about
a group of resources (e.g. all my histories, or the results of a search query such as 'all histories whose names begin
with X').








<br />
### histories_2.py
histories_2.py allows us to get more detailed info about a *specific* history also using the GET command.




You must call histories_2.py from the command line and give it a single Id as a parameter - in this case, copy the
id attribute from the history returned from histories_1.py (without quotes) and paste it after the histories_2.py script
name:
```bash
./histories_2.py 1cd8e2f6b131e891
```

(Again: the ID may be different - make sure you paste the one from histories_1.py)




In histories_2.get_history, we're building the url and including an ID in it to get data about a specific history.
Many resources are stored in the database with an ID and adding them to the url allows us to specify which resource
we want to use. Even though were using the same HTTP method/verb as index here (GET), because we've added the id to the
path, the API now recognizes we want to do a **show**: get specific information on *one* history. The way you build
a URL (and what/how you add extra parameters) can make each of the four basic HTTP methods do very different things.




You should get a single python dictionary containing quite a bit of information about your current history. Although
you have no datasets in it yet, notice the attributes which would contain the counts and ids of datasets keyed by
their potential states.




Note that histories_2.py is the same file as histories_1.py with a new function added in. The resource scripts will
all follow this pattern. The 'last' resource script will always contain the functionality of the ones 'before' it, just
as each step_N will add new functionality to the overall, final script. (Warning: the effects of calling the resource
scripts on the command line will change however from number to number - it will often be a demonstration of the most
recently added functionality.)




Again:
* **index**: histories_1.py: GET api/histories -> a list of histories for the current user
* **show**: histories_2.py: GET api/histories/<a history id> -> a single, specific history




Many resources in the Galaxy API will have index and show methods for reading and retrieving information.








<br />
## Errors!
Now that we have something we can pass an argument to (and therefore break), let's break it! Try entering this:
```bash
histories_2.py bler
```





You should see a stack trace. You should already be familiar with a stack trace but, if you're not, note the two
most important pieces of info it provides: an error string (`urllib2.HTTPError: HTTP Error 500: Internal Server Error`)
and a location in a script file. There is difference here from a normal error in a local script: although we made a
mistake the stack trace location won't help us much because the relevant code is on the server. We can only use the
error string to let us know what happened.




In many places in the Galaxy API 'HTTP' errors and exceptions will be thrown, both with (hopefully) descriptive
messages and also with an [HTTP status code](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes). Generally when
you make an error using the API, Galaxy will (or should) return something in the 400's (meaning user error). In this
case, even though it was clearly our fault, Galaxy returned a 500 (Internal Server Error) meaning something went wrong
on it's side.




(We're striving to make this more consistent - but when using the API you should be aware of this pitfall)









<br />
## 3. Creating a history with the history API
Here we'll learn how to create a new history which will (automatically) become our 'working' history.




Scripts: [ATTACHMENT_URLstep_3.py](ATTACHMENT_URLstep_3.py), [ATTACHMENT_URLhistories_3.py](ATTACHMENT_URLhistories_3.py)








<br />
### histories_3.py
We've added the function `create_history` in this version of `histories`. This will build a URL to `api/histories`
and call that URL with the HTTP method POST (common.post). Note that we don't need to send an ID as this is a new
history and Galaxy will assign the ID itself (the new ID will be returned to us so we can use to further manipulate
the history later). This is a common pattern with **create**.




Note also that `create_history` allows us to immediately name the history by passing in a `name` argument. The name is
passed to `common.post` bundled in a dictionary. This is also a common pattern with POST (and PUT) and, although these
additional arguments are often optional in practice, there are cases were they're required. It's generally best to
check the [API documentation](http://galaxy-dist.readthedocs.org/en/latest/lib/galaxy.webapps.galaxy.api.html) or
the code to find out.




histories_3.py is also set up to create a new history from the command line now but since we're also doing that in
step_3.py, we'll just call that:
```bash
./step_3.py
```





The output:
```bash
created history! Step 3
new history:
{ u'annotation': u*,
  u'contents_url': u'/api/histories/ee3742ed6d8b4a0c/contents',
  u'deleted': False,
  u'genome_build': None,
  u'id': u'ee3742ed6d8b4a0c',
  u'model_class': u'History',
  u'name': u'Step 3',
  ...
```

(The output has been truncated here with '...')




According to the script we created a new history with a name of 'Step 3'.




We can double check this a couple of different ways - we could refresh Galaxy in our browser and this history should
be our current, 'working' history. Or we could call either histories_1.py (which will have a list of our histories that
should contain the new one) or step_2.py (which will give details about our current history).




Since each step_N.py script will build on the previous, we'll be creating a new history for each step and each new
history will be named 'Step N'. This will allow us to 'start fresh' with each step and not worry about 'polluting' any
one history. You can even call ./step_3.py (or any of the step scripts) multiple times without fear of ruining any
following steps.









<br />
## 4. Checking the contents of a history with the history contents API
Histories can be thought of as containers for the datasets we produce over time. The python class for those datasets
(that are associated with a history and a user) is !HistoryDatasetAssociation (HDA).




Here we'll learn how to query the datasets *within* a history using a **contents** style API URL. This is
very similar in functionality to the right-hand history panel in the Galaxy web UI - in fact that panel uses a version
of this API call to build its HTML.




Scripts: [ATTACHMENT_URLstep_4.py](ATTACHMENT_URLstep_4.py), [ATTACHMENT_URLhdas_1.py](ATTACHMENT_URLhdas_1.py)




hdas_1.py will do an `index` of the hdas if you call it from the command line. Examine hdas_1.get_hdas. In some ways
it's very similar to histories.get_history (the `show`) but we've added `/contents` to the URL path.




If we want to get the HDAs from a history we need to tell the API two things: 1) the specific history we want the HDAs
from and 2) that we're interested in the 'contents' and not the information on the history itself (which we would get
from `show`). This is a common pattern for the API when dealing with **containers**, we need to specify the containers
and tell the API to do something with the *contents*.




./step_4.py does everything that steps 1 to 3 do and then queries the HDAs in the new history:
```bash
./step_4.py
```





The output:
```bash
created history! Step 4
HDAs:
[]
```





Note the empty list for the HDAs. Since this is an `index` of the HDAs we know it will return a list, but the emptiness
is a bit anti-climatic. This is a new history, however, so it is the correct return value. If it had HDAs to return,
that would have been a pretty big bug!









<br />
## 5. Uploading a file to a new HDA with the history contents API
Here we'll start moving a bit faster: we'll upload a file from our 'local' machine into a new history and get some
details on the HDA that Galaxy creates for it.




Scripts: [ATTACHMENT_URLstep_5.py](ATTACHMENT_URLstep_5.py), [ATTACHMENT_URLtools_1.py](ATTACHMENT_URLtools_1.py), [ATTACHMENT_URLhdas_2.py](ATTACHMENT_URLhdas_2.py)




The file will be `myIlluminaRun.solexa.fastq` and contain some solexa fastq reads. As an aside: this file is from the
history uploaded by Anton Nekrutenko at Galaxy Main server's published histories:
https://main.g2.bx.psu.edu/u/aun1/h/quickie-14.
It's the initial data used in the screencast quickie: http://screencast.g2.bx.psu.edu/quickie_13_fastq_basic/flow.html




The tools_1.py contains one function: upload_hda. The Galaxy developers would like to have every tool be available to
run through the API but this is still a work in progress. In this case, we use another module/script
[ATTACHMENT_URLupload_to_history.py](ATTACHMENT_URLupload_to_history.py) to remove some of the complexity and it itself uses the `requests` module to handle
moving the file into the POST data. Be sure to check out those modules for more details on what's involved.




The takeaway here is that, to run a tool we combine four things:
1. the POST HTTP method (or `create` again)
2. the resource URL `api/tools`
3. the ID of the tool to use: `upload1`
4. and any parameters the tool needs: the file, a name, some extra options and directives




```bash
./step_5.py
```





The output:
```bash
created history! Step 5
uploaded hda! myIlluminaRun.solexa.fastq
HDAs now:
[ { u'id': u'9d052533bb57bd3e',
    u'name': u'myIlluminaRun.solexa.fastq',
    u'type': u'file',
    u'url': u'/api/histories/9752b387803d3e1e/contents/9d052533bb57bd3e'}]
Uploaded:
{ u'accessible': True,
  u'api_type': u'file',
  u'data_type': u'auto',
  u'deleted': False,
  u'display_apps': [],
  u'display_types': [],
  u'download_url': u'/api/histories/9752b387803d3e1e/contents/9d052533bb57bd3e/display',
  u'file_ext': u'auto',
  u'file_size': 0,
  u'genome_build': u'?',
  u'hda_ldda': u'hda',
  u'hid': 1,
  u'history_id': u'9752b387803d3e1e',
  u'id': u'9d052533bb57bd3e',
  ...
```





There's our uploaded file in Galaxy.








<br />
### Asynchronous
Note the `state` attribute of the uploaded file:
```bash
u'state': u'queued',
```





This means that the job that uploads the HDA isn't actually finished when our script is. In fact, since many things
happen asynchronously (not always one-after-another) - Galaxy's infrastructure, the API, and calls to it are designed
to return data and continue even if a particular function or command is not 'finished' yet. Essentially, what
`upload_hda` does is tell Galaxy to bring in the file, return some data immediately, and then move on to the next
command in the script.




This is an advantage in many situations and a disadvantage in others.




An advantage is that **you don't have to wait for Galaxy's jobs to finish before sending more commands**: you could
call the `upload_hda` 100 times for 100 files within a minute and all those jobs will queue while you go get a beer.
Galaxy will create those 100 jobs in the queue while you do other things.




If you have to use the data from an asynchronous operation like running a tool or a workflow, it becomes (a slight)
disadvantage and you **need to wait for something to finish**. Handling this properly is something we'll cover in
step 6.









<br />
## 6. Uploading a file and waiting until the API says it's 'ok'
Here we'll handle the asynchronous nature of Galaxy tool running and jobs in order to be sure the data is uploaded
and ready before we start using it.




Scripts: [ATTACHMENT_URLstep_6.py](ATTACHMENT_URLstep_6.py)




Most of our changes will be 'local' this time in the step_6.py version of our final script. We'll use a while loop
and the `state` information from the HDA `show` api to **wait** for the upload to finish.




The psuedo code for this loop might look like this:
```
Get the state of the HDA from the API
While the state isn't 'ok':
  Wait for four seconds
  Check the state again using the API
```





We'll also output some of that information while our script is running. This is always a good idea especially during
development so you know what's going on.




```bash
./step_6.py
```





The output:
```bash
created history! Step 6
uploaded hda! myIlluminaRun.solexa.fastq
	 uploaded_hda_state: queued
	 (waiting 4 seconds...)
Uploaded:
{ u'accessible': True,
  u'api_type': u'file',
  u'data_type': u'fastq',
  ...
```

(Note: you may see more waiting when you run the script)




Now we know that when the loop completes in our script the dataset is finished uploading and any operations we do after
the loop will have access to the dataset's data.









<br />
## 7. Running a workflow on an uploaded HDA using the workflows API
Now we'll run a workflow on our uploaded file and again wait for all of it to finish. We'll be moving faster here.




Scripts: [ATTACHMENT_URLstep_7.py](ATTACHMENT_URLstep_7.py), [ATTACHMENT_URLworkflows_1.py](ATTACHMENT_URLworkflows_1.py)








<br />
### Workflows
Workflows are complicated structures. For this workshop, the needed workflow here is already loaded and available to
the workshop user (but it is also available at TODO). All we need to do is 'invoke' it from the api on the uploaded HDA.
This is another example of `POST + resource URL + parameters` to `create`. It's also an example of **composing**
complex scripts - this time using the server side instead of the client.




Note: there are some rough ways to change the parameters used in workflows dynamically through the API. Be sure to
check out `scripts/api/workflow_execute` and `scripts/api/workflow_execute_parameters` for examples.




```bash
./step_7.py
```





The output:
```bash
created history! Step 7
uploaded hda! myIlluminaRun.solexa.fastq
     uploaded_hda_state: queued
     (waiting 4 seconds...)
found workflow! Joined Solexa QC
running Joined Solexa QC workflow...
workflow started!
groomed.fastq
     state: running
     (waiting 4 seconds...)
     ok
filtered at > 17
     state: running
     (waiting 4 seconds...)
     state: running
     (waiting 4 seconds...)
     state: running
     (waiting 4 seconds...)
     state: running
     (waiting 4 seconds...)
     ok
statistics
     state: running
     (waiting 4 seconds...)
     ok
forward reads
     ok
reverse reads
     ok
statistics plot
     ok
workflow complete!
Output:
{ u'history': u'df7a1f0c02a5b08e',
  u'outputs': [ u'f597429621d6eb2b',
                u'1cd8e2f6b131e891',
                u'ebfb8f50c6abde6d',
                u'33b43b4e7093c91f',
                u'a799d38679e985db',
                u'5969b1f7201f12ae']}
```





Note the final output: these are the HDAs created by the workflow. (We can also list them using hdas_2.py.)









<br />
## 8. Checking the data of an HDA using the datasets API
Now we'll introduce the possibility of a **conditional** in our API script: specifically, we'll *look inside the
dataset data* of one of the HDAs created by our workflow. This will give us an opportunity to do something different
depending on what we find.




Scripts: [ATTACHMENT_URLstep_8.py](ATTACHMENT_URLstep_8.py), [ATTACHMENT_URLdatasets_3.py](ATTACHMENT_URLdatasets_3.py)








<br />
### The datasets API
It's all fine and good to operate on the information from resources, but if we consider the actual 'currency' of
Galaxy to be the *data inside datasets* we'll need to get at that information as well.




Note that we've skipped talking about `datasets_1` and `datasets_2`. These would be the `index` and `show` methods
for the datasets resource. In many ways, the datasets resource is a simplification of the HDA resource (and it's sibling
the !LibraryDatasetDatasetAssociation or LDDA resource - which we'll cover a bit). Datasets is an interface to both HDAs
and LDDAs that often (effectively) 'strip' or ignore the information about the datasets' containers.




Let's try datasets_1.py, tho, to see something important:
```bash
./datasets_1.py
```





The output:
```bash
Traceback (most recent call last):
...
urllib2.HTTPError: HTTP Error 501: Not Implemented
```

(Again, the '...' was added to simplify the output)




`HTTP Error 501: Not Implemented` is a server error (with status code 501) meaning this functionality hasn't been
added yet (and may never be).




In this case, you're seeing it because the developers don't have an implementation of `index` for datasets (what might
that be? A list of all datasets for the current user? All published datasets? An interface to a dataset search?) In any
event, that functionality isn't available throught the API at this time. Keep this error in mind when exploring the API.




`datasets_2.py` in many respects mimics the functionality of `hdas_2.show` and returns simple data and metadata for
the dataset.




However, the same API method from `datasets_2` (`GET + resource_url + ID), when passed some optional parameters
allows us to **get data from within the dataset**. This is done through the Galaxy construct of data providers.








<br />
### Data providers
Data providers allow us to get specific data from within a dataset's file contents. In this case
(`datasets_3.get_column_data`), we're using the !ColumnDataProvider which provides columns from the Tabular dataset
`statistics`.




Data provider are also a work in progress and currently only used in visualizations, but work is underway to make
them easier to use and more powerful in general.




See the `datasets_3.get_dataset_column` for an example of how to use the datasets API to get raw data from a file.








Let's now run step 8:
```bash
./step_8.py
```





The output:
```bash
uploaded hda! myIlluminaRun.solexa.fastq
     uploaded_hda_state: queued
     (waiting 4 seconds...)
found workflow! Joined Solexa QC
running Joined Solexa QC workflow...
workflow started!
...
workflow complete!
get_dataset_column, full_url: http://localhost:8081/api/datasets/3f5830403180d620?key=a63a28c5d5575a8ca78e97e01a73f901&data_type=raw_data&provider=column&columns=[5]
mean: 38.8721137988 median: 19.776113249
```





So now we've gotten some quality information about our workflow run and fastq reads. As `step_8.py` mentions, we
could use that information to *conditionally* run a seperate script, provide some warning/email to the user, etc.




(Also note the print out of the get_dataset_column full url: see `step_8.py` and `datasets_3.py` for an explanation of
why but, in the simplest terms, its an illustration of how some API calls transmit extra parameters.)









<br />
## 9. Renaming and annotating an HDA using the history contents API
We'll now introduce a third HTTP method: PUT (DELETE won't be covered in this workshop but know that it's available
for many resources) and use it to: **update** (change) the name of our final, desired fastq HDAs and annotate them
with the quality information from step 8.




Scripts: [ATTACHMENT_URLstep_9.py](ATTACHMENT_URLstep_9.py), [ATTACHMENT_URLhdas_3.py](ATTACHMENT_URLhdas_3.py)




PUT/`update` methods are meant to alter existing resources - much like the edit attributes page of the Galaxy UI. Their
URLs are constructed very similarly to any GET method where we specify resources, containers, and contained objects
by id. We pass the data we want to change in the form of a dictionary and that gets packaged into the HTTP request
much like POST data does.




hdas_3.py adds the function `update_hda` which allows us to change the state and information contained in the HDA
(but *not* the file contents). We can change the name, annotation, `misc_info` (the small amount of text that
describes what the HDA's file contains), the genome build (or `dbkey`) and whether this HDA is visible and/or deleted.
Setting `deleted` to true does not mean the file and HDA are purged from the filesystem and database only they are
'marked as deleted' and any admin scripts that run later can purge them. The closest analogy is your desktop OS's
trash bin - in this way Galaxy allows for a reversible step before the actual file/database removal.




Many `update`/PUT API methods will only allow the direct change of a limited set of attributes. It's generally best
to check the documentation or source to find out what has been enabled in an `update` method.




The `update` method of the HDA API is designed to accept the same dictionary that's returned from the HDA `show`
method. This allows us to capture the dictionary from that method, change what we need, and send the same dictionary to
the `update` method. It also allows a partial dictionary with just the keys and new values we want to change.




In either case, the `update` method returns a dictionary of what has successfully been changed.




Note: unfortunately, at the time this was written the HDA annotations were not passed back in the HDA `show` method.
Although we do change the annotations of the read files in step_9.py, you'll need to check for the changed annotations
in your browser - by navigating to the most recent 'Step 9' history and opening the annotations of the forward and
reverse reads.




Step 9 will, however, show us the changed names of the HDAs:
```bash
./step_9.py
```





The output:
```bash
created history! Step 9
uploaded hda! myIlluminaRun.solexa.fastq
     uploaded_hda_state: queued
     (waiting 4 seconds...)
found workflow! Joined Solexa QC
running Joined Solexa QC workflow...
workflow started!
...
workflow complete!
get_dataset_column, full_url: ...
mean: 38.8721137988 median: 19.776113249
found fwd/rev reads: forward reads reverse reads
Forward: myIlluminaRun.fwd.fastqsanger
Reverse: myIlluminaRun.rev.fastqsanger
```










<br />
## 10. Copying an HDA to a library using the library contents API
For our final step, we'll take our quality controlled and annotated read files and copy them into a shared Library
for everyone in our lab to use.




Scripts: [ATTACHMENT_URLstep_10.py](ATTACHMENT_URLstep_10.py), [ATTACHMENT_URLlibraries_1.py](ATTACHMENT_URLlibraries_1.py), [ATTACHMENT_URLlddas_1.py](ATTACHMENT_URLlddas_1.py)




The API is a great way for administrators and 'power-users' (that's you now) to **create and manage shared resources**
quickly and easily. This makes life easier for people at your lab that are more comfortable with the UI (or those that
simply 'explore' the data more there) by creating accessible, shared data and makes your life easier by automating all
or parts of the frequent bioinformatic requests you may get.








<br />
### libraries_1.py and lddas_1.py
Libraries are unique containers (when compared to histories) in that they can contain *other containers*. These
nested containers are folders and add a layer of complexity to our last task.




For the purposes of simplifying this workshop, we'll only copy our reads to the root folder of an existing library, but
you should be aware that the Library/LDDA API is capable of creating and modifying both libraries and any amount of
folders within them. Libraries (and their contents) can also be imported or exported through the API, effectively
making it a good candidate of data communication or migration **between Galaxy instances**.




Step 9 will, however, show us the changed names of the HDAs:
```bash
./step_10.py
```





The output:
```bash
created history! Step 10
uploaded hda! myIlluminaRun.solexa.fastq
     uploaded_hda_state: queued
     (waiting 4 seconds...)
found workflow! Joined Solexa QC
running Joined Solexa QC workflow...
workflow started!
...
workflow complete!
get_dataset_column, full_url: http://localhost:8081/api/datasets/ba751ee0539fff04?key=a63a28c5d5575a8ca78e97e01a73f901&data_type=raw_data&provider=column&columns=[5]
mean: 38.8721137988 median: 19.776113249
found fwd/rev reads: forward reads reverse reads
changed read HDA names and annotations: myIlluminaRun.fwd.fastqsanger myIlluminaRun.rev.fastqsanger
found reads library: Reads Library
found root folder: /
copying HDAs to library: Reads Library
     forward read: myIlluminaRun.fwd.fastqsanger
     reverse read: myIlluminaRun.rev.fastqsanger
...
Forward reads in library:
{ u'data_type': u'fastqsanger',
  u'deleted': False,
  u'file_name': u'/home/gcc2013/Desktop/Training_Day_Workshops/API/galaxy-central/database/files/000/dataset_26.dat',
  u'file_size': 1093696,
  u'genome_build': u'?',
  u'hda_ldda': u'ldda',
  ...
Reverse reads in library:
{ u'data_type': u'fastqsanger',
  u'deleted': False,
  u'file_name': u'/home/gcc2013/Desktop/Training_Day_Workshops/API/galaxy-central/database/files/000/dataset_27.dat',
  u'file_size': 1093696,
  u'genome_build': u'?',
  u'hda_ldda': u'ldda',
  ...
```





And ... we're done!








<br />
-----------------------------------------------------------
# In the Future
We are always adding new functionality to the API and progressively ensuring that everything that can be done in the
UI can be done in the API - because of that, please, consider the API a 'work in progress' and check the
[Galaxy Development Briefs](/src/DevNewsBriefs/index.md) for new features or fixes.








<br />
### Versioning of the API
As things change in Galaxy and we make improvements to the API, there will be times when the data that's passed to
an API method, the data that's returned, or the fundamental effects of an API method *should* change.




The fact that people have and will continue to write scripts that depend on the API functioning in a particular way
complicates this issue and the developers know that a certain amount of **backwards compatibility** should be
maintained.




Although the API should still be considered a 'work in progress', there are plans to have **two versions** of the
API. The first, would be the 'stable' api and the second: the 'development' version. The development version may not
always behave in the same manner as the stable (hopefully it will be an improvement) and shouldn't be relied upon
as a source for data or control. The 'stable' version is meant to be used and consumed and should provide the most
stable, secure, and robust system for scripting the API.




As the development version nears a point of completion and reliability itself, the previous stable version will
be replaced with it and a new development version will be started.








<br />
### Tool Running
We know that running tools via the API would be a big win for everyone - so it's a priority on our list. Before that
happens some amount of core changes need to take place to make this as easy and flexible to use as possible.












<br />
-----------------------------------------------------------
# More Resources and Thanks
* a tarball of all the scripts used is here: [ATTACHMENT_URLall-scripts.tar.gz](ATTACHMENT_URLall-scripts.tar.gz)
* [ReadTheDocs.org](http://galaxy-dist.readthedocs.org/en/latest/lib/galaxy.webapps.galaxy.api.html).
* There are good examples in the `scripts/api` directory of a Galaxy installation.
* !BioBlend and Blend4j (links are at the top of this page) can make your API scripting easier.
* Thanks for coming!









PLACEHOLDER_INCLUDE(/Events/GCC2013/Footer)





