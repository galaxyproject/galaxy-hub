Source for the Galaxy Community Website. Static site built using
[metalsmith][1]. Build process is defined in `build.coffee`.

To start fresh, clone and run:

```
npm install -g coffee-script
npm install
bower install
coffee build.coffee
```

This will build the site into the directory `build`

To serve the site locally on port 8000, run:

```
coffee build.coffee --serve
```


If you'd like to livereload, which has a few issues (duplicate entries in some headers)

```
coffee build.coffee --watch
```

[1]: http://www.metalsmith.io/
