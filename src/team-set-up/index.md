# Team Set up

Hi!

This page is here to get the environment set up of the team members. You can use it to get inspired about your own, and be more productive on your (Galaxy) work.

#### Tips

- Subscribe to the RSS feed of this wiki to receive all updates of this page
- Get all the conversations from IRC and find the answers to ALL your questions: https://botbot.me/freenode/galaxyproject/

#### For team members

- Daily Status via a Galaxy Google Group. Digest is out after 6pm.

## Enis Afgan

## Dannon Baker

### What are your domains / fields / area in Galaxy

I work on all different parts of Galaxy.  Formerly lots of cloud, workflow, and job related work, more recently focusing on webapp performance (both metrics and improvements) and quality of life improvements like tours, etc.

### How do you organize you work-day?

Very quickly take a look at what is going on in Galaxy ([GitHub](https://github.com/galaxyproject/galaxy) / [mails](https://inbox.google.com))

Usually do the most productive part in the morning, and then handle support / fixing broken things (but this happens in the morning too)

### What is your set-up?

1) Terminal 2) Gmail 3) Browser

Here's my desk setup:
* New: https://imgur.com/hZBsmsX

#### Screen configuration:

* Middle screen - 27"
  * https://imgur.com/Ex7BRx9
  * Vim Code is middle + left screen
  * IRC top right
  * Grunt + Webpack logs middle right
  * Galaxy logs bottom right

* Right screen - 24"
  * Gmail Half right
  * Galaxy + browser Half left

* Left screen - Macbook pro 13"
  * Usually just another Galaxy or other browser destination.  
  * More often than not, unless it's something wonky (cluster testing) which is easier to set up on *nix, the code I'm working on actually lives on this machine and I'm ssh(mosh)'d in to it from all the terminals you see in the center panel.  So I actually do develop on OSX, I just don't use the interface.

#### OS

* Windows 10 (Really just a host to the VM and runs browsers)
* XUbuntu in VirtualBox
* OSX

#### Coding best-practices and tips

##### Front-end

* node_modules/webpack/bin/webpack.js --progress --colors --watch
* node_modules/grunt-cli/bin/grunt watch --develop
* (More details [here](https://github.com/galaxyproject/galaxy/blob/dev/client/README.md))

##### Keep learning

Read HackerNews / Python subreddit + Programming subreddit

##### Misc

* How to sync your vim configuration across multiple machines (I'm commonly on 3) => rsync -avz .vim*
* Use [ack](http://beyondgrep.com/) instead of grep. Useful for looking into the logs
* How to use the same keyboard and mouse between Macbook pro and Main computer: Use Synergy

### What are the things that we need to focus on

* Performance needs to be improved.
* Less friendly to novices. Regular users are behind for Advanced users. We should take some steps back to get the picture of what features are really useful for users.

### What do you recommend to the others?

* Everyone should use Terminal. You have to understand the things underline.
* A good (mechanical) keyboard:
  * http://www.amazon.com/CM-Storm-QuickFire-TK-Mechanical/dp/B00A378L4C
  * http://www.keyboardco.com/blog/index.php/2012/12/an-introduction-to-cherry-mx-mechanical-switches/
  * http://www.amazon.com/Mechanical-Keyboard-Keycaps-Cherry-Mx-Clear/dp/B00OFM6F80

## Dan Blankenberg

## Dave Bouvier

## Martin Cech

## John Chilton

## Dave Clements

## Nate Coraor

## Carl Eberhard

## Jeremy Goecks

## Aysam Guerler

## Jennifer Hillman Jackson

## Ross Lazarus

## Rémi Marenco

* Uses `pdb` / `ipdb` to debug Python
* Uses Chrome
* Uses `debugger` and `Inspect` to debug front-end (see [Javascript Debugging)](http://www.w3schools.com/js/js_debugging.asp), and special Galaxy feature [Galaxy.emit.error](https://github.com/galaxyproject/galaxy/pull/1011)
* Switched from PyCharm to VIM then PyCharm with IdeaVim
* Uses `galaxy/test-data/` to find useful inputs to try things 
* http://blog.livecoding.tv/2016/03/24/the-ten-10-best-python-productivity-tools-plugins-and-libraries/

## Anton Nekrutenko

## Nick Stoler

## James Taylor

## Nitesh Turaga

Worked in the past on: 
* [BioConductor](/src/BioConductor/index.md) - Galaxy integration

Now: 
* Galaxy Full Stack

#### Work environment

* Vim + plugins: 
  * '[VundleVim](/src/VundleVim/index.md)/Vundle.vim'
  * 'tpope/vim-fugitive'
  * 'git://git.wincent.com/command-t.git'
  * 'rstacruz/sparkup'
  * 'Valloric[/YouCompleteMe](/src/TeamSetUp/YouCompleteMe/index.md)'
  * 'kien/ctrlp.vim'
  * 'scrooloose/syntastic'
  * 'Lokaltog/powerline'
  * 'scrooloose/nerdcommenter'
  * 'nvie/vim-flake8'
  * 'elzr/vim-json'
  * 'mileszs/ack.vim'

Use Sublime with plugins essentially for Javascript

Use RStudio for Writing **R** and **Markdown** files

Git => bash-completion (Brew install)

iTerm2 to vertical split

IPython / (i)pdb: Ipython instead of python. 

##### Chrome extensions:

* [JsonView](/src/JsonView/index.md)
* YSlow

#### How do you organize your work-day?

* [GitHub](/src/GitHub/index.md) notifications through Slack
* Checker Plus for Gmail
* Regular irc notifications

#### What to improve?

* UI to improve
* Developer entry-point

#### What did you find the most difficult at the beginning in Galaxy?

Getting started with the code base

# Commiters

## Björn Grüning

## Eric Rasche

## Nicola Soranzo

## Marius Van Den Beek

