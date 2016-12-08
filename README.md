# Galaxy Community Hub

Source for the Galaxy Community Website. This is a static website built using
[metalsmith][1].

## Editing the site

The site content is formatted using
[Markdown](https://en.wikipedia.org/wiki/Markdown). To edit the content on the
live Galaxy project site, just edit the corresponding file in this repository.
The content for the pages is stored under the `src` directory and the
directories map directly onto the URLs.

You can contribute by simply editing the source page in question via the GitHub
web editor. For most people, this will create a pull request that will
then get reviewed and merged. After the merge, the content will be live on the
website within a few minutes. Alternatively, you can edit the file locally
(see below).

## Installing the site locally

To edit and run the site locally, start by creating a fork of this
repository. Before you clone your fork locally, make sure to
[install git-lfs](https://packagecloud.io/github/git-lfs/install) because
that's what we use for [managing images](#handling-of-images).

Once cloned, to build the website (into the `build` directory), run:

```
make build
```

To serve the site locally, on port 8080, run:

```
make serve
```

or, if you'd like to use 'live reload' for developing, use the following command:

```
make watch
```

Please see the Makefile for more information and options, including the ability
to use a Docker-based node binary identical to what we use to build and publish
the final build artifacts. If you would like to learn more about how it all
goes together, feel free to browse the build targets in the Makefile, or the
metalsmith build process, which is defined in `build.coffee`.

## Handling of images

Handling of image files is done using [git-lfs](https://git-lfs.github.com/).
If you want to add new images, make sure you have
[installed git-lfs](https://packagecloud.io/github/git-lfs/install) and run

```
git lfs install
```

From here, everything else should work as expected with standard git commands.
You `add` and `commit` your changes and images, while git-lfs handles
everything automatically. Currently, `png` and `jpg` are recognized by git-lsf.
To track other types of images, edit `.gitattributes` file.

Image files that are local to a page should be placed in the directory with the
page content. Image files that are likely to be reused by multiple pages can be
placed in an appropriate directory under `/src/images`.

If you have not installed git-lfs before cloning the repository and local
images have no content, just run `git lsf pull`.


[1]: http://www.metalsmith.io/
