# Warning: This page is outdated and no longer accurate

# Galaxy Q&A

This wiki page has been created to regroup all the informations about the Galaxy Q&A.

## What is Galaxy Q&A

Galaxy Q&A is a fork of [BioStar](http://www.biostars.org/). This is a collaboratively edited question and answer site.
Our fork is a modification of [BioStar](http://www.biostars.org/) to be able to tied Galaxy up with the Q&A.

The Galaxy Q&A and [BioStar](http://www.biostars.org/) source code is open-source and accessible on Github:
* [Galaxy Q&A source code](https://github.com/galaxyQandA)
* [BioStar source code](https://github.com/ialbert/biostar-central)

**For Galaxy team:** A mail has been sent for the meeting the *08/29/2012* with all the credentials to access to Galaxy Q&A, the object of the mail is ***"[galaxy-lab] Tasks"*** from [Anton Nekrutenko](/anton)

## Set up Galaxy Q&A
Galaxy is a [Django](https://www.djangoproject.com/) website: "Django is a high-level Python Web framework that encourages rapid development and clean, pragmatic design".

Let's see how to set up your Galaxy Q&A.

### How to set it up
If you already know how Django works, and how to download it from a Git repository, here are the main steps:

* Create your local repository: "git clone https://github.com/galaxyQandA/biostar-central.git"
* Download and install [Celery](http://celeryproject.org/) for django
* Make sure you have a PostGreSQL database (others database work, but you may have to make some changes in the settings of Celery and Galaxy Q&A)
* Put your own settings in ***conf/"mySettings.py"*** and get the ***conf/default.env*** pointing on "mySettings.py".
For example:
```python
#
# import from the main settings then override some of the values
#
from main.settings import *

# For Asynchronous framework celery
import os
import sys
sys.path.append(os.getcwd())

import djcelery
djcelery.setup_loader()

BROKER_URL = 'django://'
CELERY_IMPORTS = ("main.server.celery.tasks", )
INSTALLED_APPS += ("djcelery", 'kombu.transport.django', )

# set the domain administrators
ADMINS = (
    ('Remi Marenco', 'remi dot marenco at gmail.com'),
)

# set the site url
SITE_DOMAIN = 'localhost:8080'

# set the secret key for the site
SECRET_KEY = '007'

# set your google tracker
GOOGLE_TRACKER = ""

# database setup
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': *,
        'USER': *,
        'PASSWORD': *,
        'HOST': *,
        'PORT': *,
    }
}

# this sets wether to allow test logins via selenium
ALLOW_SELENIUM_TEST_LOGIN = False

# set up the email provider for your site
SERVER_EMAIL = 'myServer'
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.myserver.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'mymail@mail.com'
EMAIL_HOST_PASSWORD = 'mypassword'
```


You could have more info in ***main/settings.py*** or in ***cong/demo.py***

* Then, you can launch Galaxy q&a with the command ***./biostar.sh*** in the root of your galaxy q&a directory

### Where are the actual instances of Galaxy Q&A

The actual instances run on the slyfox server of Penn State university under the biostar account.
There is two instance: One for the users and an other for all the development.

If you want to modify Galaxy Q&A, We recommend to put your modifications and test them on the development branch of Github (called [galaxy_dev](https://github.com/galaxyQandA/biostar-central/tree/galaxy_dev)). Once everything seems good, you can merge your modifications on the main branch: ***master***.

**Be careful if you change the location of the Galaxy Q&A, as main Galaxy has its links hard-coded inside**

## Differences with BioStar
The fork has been created to tied Galaxy Q&A with Galaxy. Here are the main modifications added to Biostar:
* **The style of Biostar has been changed**: To match the Galaxy style, some modifications has been added in Galaxy Q&A. Here is the [changeset1](https://github.com/galaxyQandA/biostar-central/commit/4ae2ce800d755f97848bb92215422f7b2d65de30), [changeset2](https://github.com/galaxyQandA/biostar-central/commit/fa7d13f94d965d24806f8d27627349d733e72e4e)
* **Implementation in Galaxy**: Links has been added in Galaxy to point on some Galaxy Q&A urls. These urls have been added to match some Galaxy needs as automatically fill the tags when a user wants to ask a question from the tool links in Galaxy, or wants to access to all the questions related to tool they are actually using
* **Mail notification**: As Galaxy works actually with mailing lists, users could be disoriented with the new Galaxy Q&A as there were only a RSS feed for *bookmarked* posts. We have also the mail notification on *bookmarked* posts, so users can know when somebody interacts with their bookmarked posts
* **Celery queue tasks**: The display of pages can be slowed by some processing. Celery has been added to allow queue tasks to avoid that. For example, the mail notification can slightly slow the display of pages if there is a lot of users with a lot of posts. This no more happens with Celery

### Implementation in Galaxy
Here is the [changeset](https://bitbucket.org/galaxy/galaxy-central/changeset/110a69b0d387228ec7bed84814192b9c99082d7c) of the adds in Galaxy to link with the Galaxy Q&A: 
* Link to Galaxy Q&A in the Help Menu of Galaxy
* Link to Galaxy Q&A in the Help Menu of the Tool Shed
* Links to Galaxy Q&A in the tool form of any tools
  * Icons added
  * Code added

Here is the [changeset of the Galaxy tag](https://github.com/galaxyQandA/biostar-central/commit/3bbdad4ceaf837fcbb8267c2b0de0176f20823d4) and here the [changeset of the CSS/Names modifications](https://github.com/galaxyQandA/biostar-central/commit/4ae2ce800d755f97848bb92215422f7b2d65de30) in Galaxy Q&A

### Mail notification
The mail notification allows users to receive a mail when they bookmark a post on Galaxy Q&A. Each answer or comment on this post will send a mail to all users who bookmarked any question/answer/comment in the thread.
User who will receive the mail will not be able to see the users who also bookmarked this thread.

Here are the changesets on Github: [Changeset1](https://github.com/galaxyQandA/biostar-central/commit/329a142d2d8e81de73adca384619875a4a9803f0), [Changeset2](https://github.com/galaxyQandA/biostar-central/commit/33dce5a6f9dfb320c0d6657fb2535faa9b6e5bd6), [changeset3](https://github.com/galaxyQandA/biostar-central/commit/3cce36a9ada8a4cc59a138ade392e6e2491ac556), [changeset4](https://github.com/galaxyQandA/biostar-central/commit/12fb2d0da4e06dc2f8e5b1d5aaf9953d64a9088d)

**Important:** You need to set up your mail server in your ***settings.py*** for this to work.

**Important2:** This feature has been moved as a task, see below for more informations

### Celery: Queue tasks
With the number of users in Galaxy, Mail notification and others tasks could be a problem if they are processed in a view page. To avoid this problem, [Celery](http://celeryproject.org/) has been set up for Galaxy Q&A.

Here is the [changeset1](https://github.com/galaxyQandA/biostar-central/commit/2a3d30e14cf46f176cc4335298d1f2e10d0693cc) and the [changeset2](https://github.com/galaxyQandA/biostar-central/commit/9f91c86d64d0ca77d0815cd1541723ff55e05939) for the mail notification.

**Important:** You need to verify that you have properly put the settings for [Celery](http://celeryproject.org/) in the settings file and launched the [Celery](http://celeryproject.org/) server before launching Galaxy Q&A

## Left to do

### Single Sign-On
The Single Sign-On feature allows Galaxy and Galaxy Q&A to identify a user with his Galaxy credentials. This feature is not finished yet, and need to be finished.

### Migrate all the mails from the mailing-list into Galaxy Q&A
Galaxy Q&A could be instantly useful if we could retrieve all the content in the mailing-lists and add them to Galaxy Q&A
