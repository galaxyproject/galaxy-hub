# Galaxy Community Hub [![Build Status](https://jenkins.galaxyproject.org/buildStatus/icon?job=galaxy-hub)](https://jenkins.galaxyproject.org/job/galaxy-hub/)

Source for the [Galaxy Hub Website](https://galaxyproject.org/). This
is a static website built using [metalsmith][1].

The site content is formatted using
[GitHub Flavored Markdown (GFM)](https://guides.github.com/features/mastering-markdown/).  Anyone can update or add content to the site using "standard" GitHub and Git practices and contributions are encouraged.

If are already adept at Markdown, Git, and GitHub, you can skip to the **Deploying the site locally** section.  If you are unfamiliar with any of those items, the start with the ...

# Basics

## Where's the source for the web site content?

The text that becomes the website at https://galaxyproject.org is in this GitHub repository (the repo you are looking at right now) under the [`src` directory](https://github.com/galaxyproject/galaxy-hub/blob/master/src/).  

If you don't already have a GitHub account, you will need to [create one](https://github.com/join) to contribute any edits.

## One web page = One directory in GitHub

Every page in the [Galaxy Hub](https://galaxyproject.org/) has a coresponding directory in GitHub.  For example, the contents of the GitHub directory at [/src/community/](https://github.com/galaxyproject/galaxy-hub/blob/master/src/community/)
become the web pages at
 [https://galaxyproject.org/community/](https://galaxyproject.org/community/).

## index.md files

Every directory contains an `index.md` file that contains the Markdown text for that directory. For example, the file in GitHub at [/src/community/index.md](https://github.com/galaxyproject/galaxy-hub/blob/master/src/community/index.md) becomes [https://galaxyproject.org/community/](https://galaxyproject.org/community/).

When you update content on the Galaxy Hub you will mostly be updating `index.md` files.

## Markdown

Markdown is a language for generating web content. It's meant to support the most common web page formatting (paragraphs of text, section headings, bold, italics, lists, and so on) without requiring you to learn the complications of HTML.

The Galaxy Hub uses a dialect of Markdown known as [GitHub Flavored Markdown (GFM)](https://guides.github.com/features/mastering-markdown/). GFM adds a few things, like table support, to the Markdown standard. GFM pages also renders nicely in GitHub.

GFM is limited (by design) in comparison to HTML. However, it is easy to learn and use, and if you ever need something more, it supports that too (see below).

# Submiting your first edit through the GitHub web interface

If you aren't already familiar with Git and GitHub then the easiest way to update the site is using the GitHub web interface in your web browser.

Once you are logged in to GitHub, navigate to the page you want to update within GitHub. There are two ways to do this.

**1. Navigate down to the page from within GitHub**

Start at the [root of the content tree (the `/src` directory)](https://github.com/galaxyproject/galaxy-hub/tree/master/src) and navigate down to the page you want to edit.  For example, if you want to edit the page at https://galaxyproject.org/community/ you would navigate:

[`/src`](https://github.com/galaxyproject/galaxy-hub/tree/master/src)<br />
&rarr; [`/src/community`](https://github.com/galaxyproject/galaxy-hub/tree/master/src/community)<br />

Within the `community` directory you will see a few image files, and a file named `index.md`.  *Click* on it.

**2. Use the Edit link on any Galaxy Hub page.**

You can jump from any page in the Galaxy Hub directly to its source `index.md` file in GitHub.  Every Galaxy Hub web page has an **Edit** link in the upper right hand corner, that goes to that web page's `index.md` in GitHub.

## Edit the page in Github

To edit an `index.md` file in GitHub, *click* the **pencil icon**. (The icon only appears if you are logged in.) When you hover over the icon, GitHub displays

> Fork this project and edit the file.

More on that in a bit.  Clicking the pencil icon takes you to a web form where you can edit the page text. The top of this page says:

> You’re editing a file in a project you don’t have write access to. We’ve created a fork of this project for you to commit your proposed changes to. Submitting a change to this file will write it to a new branch in your fork, so you can send a pull request. 

GitHub has now given you your own copy of the `galaxy-hub` repository and you are now editing that copy under your account. Use the resulting web form to edit the text of the page.  There is a **Preview Changes** tab you can use to review your edits before you commit them.

Once your edits are in good shape commit them by providing a short (and optionally, a longer) description of the change at the bottom of the form.

Click **Propose file change** at the bottom of the form.  The commits the changes to *your* copy of the `galaxy-hub` repo. ("repo" = "repository" in GitSpeak).

### What if I mess it up?  Are there guidelines?

Thanks for your concern!  But, *we got this:*

1. Until you get the hang of this (*see What happens next and becoming an Editor* below) all of your edits will be reviewed by an experienced editor before they go to the web site.
2. There are guidelines (TODO: Well, not yet, working on it), but don't worry about them too much when you start.  Just focus on the content you are fixing or adding. If you really want to "do the right thing" focus on the basic guidelines first, and then expand out as you need to.
3. **Be bold.** We mean it.

### The page doesn't look the same in GitHub?

You may notice, *even before you make any edits*, that the page doesn't quite render correctly on the GitHub web site: images are in the wrong place or missing, some links don't work, and anything, well, *fancy* is rendered poorly.

This happens because the GitHub web site, and the galaxyproject.org web site use different tools to render the web site, and because galaxyproject.org uses tools that GitHub does not support.

*Don't worry about these differences.*  Once you have become an experienced editor, you will switch to making edits in a locally installed copy and then you'll see the pages as they are actually rendered (and you can start making fancier edits).

In the meantime, there is one thing you can do to not make things worse for yourself and others using the GitHub web site to edits:

**Format links to other pages within the Galaxy hub with a leading `/src` and a trailing `index.md`.**

Links with both of these things will work in the GitHub web site. For example, links should be

`/src/community/index.md`

instead of just

`/community`

## Create a pull request to add your changes to the hub web site

Clicking **Propose file change** takes you to a **Comparing Changes** page that highlights your changes to the file.

It also has a **Create pull request** button near the top of the page. If you are ready to submit your changes to be included in the hub web site then *click* this button.

*If you have more changes you want to make before you submit, you can make more changes and then submit all the changes as a unit.*

Clicking **Create pull request**  (see [What is a Pull Request?](http://oss-watch.ac.uk/resources/pullrequest)) takes you to the **Open a Pull Request** form.

Click **Create pull request.** You're ready.

This form has a space for comments that will be sent along with the pull request. The comments tell the pull request reviewers what these changes achieve.

Once you have added comments, *click* the **Create pull request** button.  This sends your pull request to the @galaxyproject copy of the `galaxy-hub` repo, and then shows you the pull request you just submitted.

*Congratulations.  You have submitted your first web site edit.*

## What happens next and becoming an *Editor*

You can track the progess of the pull request here.  When the pull request is approved it will be merged into the main repo and then appear on the Galaxy Hub shortly thereafter.

Furthermore, after a pull request or two, the reviewer will add you to the @galaxyproject `galaxy-hub` Editors group.  From that point on you can edit pages directly in the root repo.  That is, clicking the pencil icon on a page under https://github.com/galaxyproject/galaxy-hub/src will no longer fork the repo, and submitted changes will go directly to the repo and to the web site. (Our goal with this protocol is to encourage treating this like a wiki where folks are free to just edit.  (*Galaxy is [community](/src/community/index.md.*))

In the meantime, you can continue to do edits in your copy of the repo and then submitting pull requests.

## Doing more with the GitHub Web Editor

You can edit anything in the `/src` directory through the GitHub Web Editor and this is a good way to become more familiar with the process and how things are set up.  Eventually you may want to switch to a local installation, but you don't need to.

There are only a few things that require special explanation

### Create a new page

Every page in the Galaxy Hub is stored in a directory and matching `index.md` file.  To create a new page, you need to create a new directory.

To create a new page, navigate to the directory you want to create the new page under.  For example, if you want to create a `/community/galaxy-south-africa/` page (just an idea!) then navigate to the the `/src/community` directory.

*Click* the **Create new file** button near the top and on the right of the directory listing page.  This brings up an empty web form for naming the new file and providing the page content.

Remember *"To create a new web page, you need to create a new directory."*  To do that, in the "Name your file..." box enter

`your-page-name/index.md`

When you save your new file, this will create a new directory under the current directory named `your-page-name` and your new file will be in that directory and named `index.md`.


#### Page path / naming conventions

When you specify a new page name / path there are two guidelines:

1. Use all lower case letters.
2. Separate words with hyphens.

In our example, the page name / path should be

`/community/south-africa/`

*not*

`/community/SouthAfrica/`

### Adding images / attachments through the GitHub editor

*Note: You can upload images and attachments through the GitHub editor, but by the time you get to this level of editing you should consider editing a local install instead.*

To add an image or attachment to the repo, navigate to the directory you want to place it in, and then *click* the **Upload Files** button, near the top and on the right.  This launces a standard file upload form.  Any uploaded files are added to the directory you are in and can now be referenced from pages within the hub.

#### Basic image guidelines.

**There are standard image and attachment directories.**

These are at `/src/images/` and `/src/document`.

1. Before uploading a file, please make sure it is not already in one of these directories.
2. If it makes sense, please consider uploading the file to one of the standard directories.  This encourages reuse.
3. If the file is bigger than 1 meg then don't upload it.  Email it to outreach@galaxyproject.org instead.  We'll put it in the Galaxy Depot and then mail you a URL you can linke to.  (Keeping large files in GitHub is not a good use of GitHub.)
4. Consider renaming your files to be all lower case and hyphen separated *before* uploading them.


# General Guidelines, Structure, and The Details

This section describes the hub structure and guidelines.  This section is useful if you are updating the site through the GitHub web editor, or in a local install.

## Markup

The Galaxy Hub website (galaxyproject.org) supports GitHub Flavored Markdown, [Boostrap](http://getbootstrap.com/) [markup](https://getbootstrap.com/docs/4.0/getting-started/introduction/), the [FontAwesome](https://fontawesome.com/) library, and a smattering of items from [Metalsmith](http://www.metalsmith.io/).  That's a lot of ways to do things.

### Favor GitHub Flavored Markdown over HTML

Anything that can be rendered with Markdown can also be rendered with HTML, *but don't.*  Whenever possible use GFM, even if it means things are less pretty than they could be.

Markdown is much easier to edit and to make site-wide changes to how it is rendered.

*Note: We use "Markdown" and "GFM" interchangeably to mean "GitHub Flavored Markdown."*

### Favor Bootstrap over custom HTML styling

Anything can be rendered with custom HTML styling, *but don't*.  Whenever possible use Bootstrap HTML classes for styling.  Bootstrap has automatically handles rendering on small devices and it too is much easier to make site-wide changes to how it is rendered.

## Special page metadata

In addition to using Markdown features you can add special metadata in the header of every page like this:

```
---
autotoc: false
---
```

|name|type|(default) values|description|
|-----|-----|-----|-----|
|autotoc|boolean|(true on most pages, false on news/events content items), false|flag whether to include table of contents in the right side|
|title|string|(empty)|value of `<title>` HTML tag in the page and first page heading|

## Redirects

When deleting, consolidating, or renaming pages please save the urls by adding redirects to the [rewrite file](https://github.com/galaxyproject/infrastructure-playbook/blob/master/galaxyenv/templates/nginx/galaxyproject.j2#L46) in the infrastructure playbook.

# Deploying the site locally

To edit and run the site locally, start by creating a fork of this repository.
Before you clone your fork locally, make sure to [install git-
lfs](https://git-lfs.github.com/) because that's what we use for [managing
images](#handling-of-images). To install `git lfs` use [linuxbrew](http://linuxbrew.sh/) on Linux systems or [homebrew](https://brew.sh/) on OS X. Once you have installed `brew` simply run ` brew install git-lfs` command.

Note that you should use the authenticated github URL (ie,
`git@github.com:galaxyproject/galaxy-hub.git`) because otherwise you may get
_API rate limit exceeded_ error.

An example clone command, using lfs optimizations and the authenticated URL
would be:

```
git lfs clone git@github.com:galaxyproject/galaxy-hub.git
```

The only other dependency you should need is [node.js](https://nodejs.org/en/).
Most modern versions should work fine, but follow the instructions [on
nodejs.org](https://nodejs.org) if you would like to update.


To build and serve the site locally on port 8080, run:

```
make serve
```

To build the website into the `build` directory, without serving (for example,
if you had an external web server configured to serve these files), run:

```
make build
```

Please see the Makefile for more information and options, including the ability
to use a Docker-based node binary identical to what we use to build and publish
the final build artifacts. If you would like to learn more about how it all
goes together, feel free to browse the build targets in the Makefile, or the
metalsmith build process, which is defined in `build.js`.


If you are having trouble building the site, your node_modules may not have
been installed correctly and the first thing to try is to remove the directory
and/or execute the following command to have them reinstalled:

```
touch package.json; make node_modules
```


## Handling of images

Handling of image files is done using [git-lfs](https://git-lfs.github.com/).
If you want to add new images, make sure you have [installed
git-lfs](https://packagecloud.io/github/git-lfs/install) and run

```
git lfs install
```
From here, everything else should work as expected with standard git commands.
You `add` and `commit` your changes and images, while git-lfs handles
everything automatically. Currently, `png` and `jpg` are recognized by git-lfs.
To track other types of images, edit `.gitattributes` file.

Image files that are local to a page should be placed in the directory with the
page content. Image files that are likely to be reused by multiple pages can be
placed in an appropriate directory under `/src/images`.

Note: Please do not upload images using the GitHub web interface -- there's a
feature request open with GitHub, but currently this does not support LFS.

## LFS Troubles?

If you cloned the repository prior to installing git-lfs and you're
observing that site images have no content, you may be able to fetch all images
by running `git lfs pull`.

If you've been having issues with LFS they may be due to an outdated version of LFS.  To determine your version enter

`git lfs version`

This should show at least

`git-lfs/1.5.6 ...`

If your version is older than that, you may benefit from upgrading.


[1]: http://www.metalsmith.io/
