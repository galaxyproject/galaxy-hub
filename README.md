# Galaxy Community Hub [![Build Status](https://jenkins.galaxyproject.org/buildStatus/icon?job=galaxy-hub)](https://jenkins.galaxyproject.org/job/galaxy-hub/)

Source for the [Galaxy Community Website](https://new.galaxyproject.org/). This
is a static website built using [metalsmith][1].

## Editing the site

The site content is formatted using
[Markdown](https://en.wikipedia.org/wiki/Markdown). To edit the content on the
live Galaxy project site, just edit the corresponding file in this repository.
The content for the pages is stored under the `src` directory and the
directories map directly onto the URLs.

You can contribute by simply editing the source page in question via the GitHub
web editor. If you need to add a new directory to the file structure, type the
desired file path into the new file name field (eg, `foo/file.md`).For most
people, this will create a pull request that will then get reviewed and merged.
After the merge, the content will be live on the website within a few minutes.
Alternatively, you can edit the file locally (see below).

## Deploying the site locally

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
metalsmith build process, which is defined in `build.coffee`.


If you are having trouble building the site, your node_modules may not have
been installed correctly and the first thing to try is to remove the directory#
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

### LFS Troubles?

If you cloned the repository prior to installing git-lfs and you're
observing that site images have no content, you may be able to fetch all images
by running `git lfs pull`.

If you've been having issues with LFS they may be due to an outdated version of LFS.  To determine your version enter

`git lfs version`

This should show at least

`git-lfs/1.5.6 ...`

If your version is older than that, you may benefit from upgrading.


[1]: http://www.metalsmith.io/

## Redirects

When deleting, consolidating, or renaming pages please save the urls by adding redirects to the [rewrite file](https://github.com/galaxyproject/infrastructure-playbook/blob/master/galaxyenv/templates/nginx/galaxyproject.j2#L46) in the ifrastructure playbook.
