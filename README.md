# Galaxy Community Hub

Source for the Galaxy Community Website. This is a static website built using
[metalsmith][1]. If you're contributing via the GitHub web editor, you can
likely ignore all of the build instructions below and simply edit the source
page in question.  If, however, you would like to learn more about how it all
goes together, feel free to browse the build targets in the Makefile, or the
metalsmith build process which is defined in `build.coffee`.

To start fresh and build the website (into the 'build' directory), you can run:

```
make build
```

To serve the site locally on port 8000, run:

```
make serve
```

If you'd like to use 'live reload' for developing, use the following command:

```
make watch
```

Please see the Makefile for more information and options, including the ability
to use a docker-based node binary identical to what we use to build and publish
the final build artifacts.

[1]: http://www.metalsmith.io/

## Handling of images

We are handling large files and images via [git-lfs](https://git-lfs.github.com/). If you want to add new images please [install git-lfs](https://packagecloud.io/github/git-lfs/install) and run

```
git lfs install
```

Everything else should work as expected. `add` and `commit` your changes and images and everything will be handled automatically by git-lfs, github and friends.
