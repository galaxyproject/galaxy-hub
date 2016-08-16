Source for the Galaxy Community Website. Static site built using
[metalsmith][1]. Build process is defined in `build.coffee`.

To start fresh and build the website (into the 'build' directory), you can run:

```
make build
```


To serve the site locally on port 8000, run:

```
make serve
```


If you'd like to livereload, which has a few issues (duplicate entries in some
headers due to collection handling), but can be handy nonetheless:

```
make watch
```

[1]: http://www.metalsmith.io/
