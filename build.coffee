# Build with Metalsmith
metalsmith = require('metalsmith')

# Plugin for Bower support
bower = (files, metalsmith, done) ->
    bower_files = require( 'bower-files' )()
    { readFileSync } = require 'fs'
    { basename } = require 'path'
    include = (root, included) ->
        for file in included
            contents = readFileSync(file)
            files["#{root}/#{basename(file)}"] =
                contents: contents
    #include('css', lib.self().ext('css').files)
    include('js', bower_files.self().ext('js').files)
    #include('fonts', lib.self().ext(['eot','otf','ttf','woff']).files)
    done()

link_to_orig_path = (files, metalsmith, done) ->
    for k, v of files
        files[k].orig_path = k
    done()

clear_collections = (files, metalsmith, done) ->
    metadata = metalsmith.metadata()
    if metadata.collections
        delete metadata[key] for key of metadata.collections
        delete metadata.collections
    done()

ms = metalsmith(__dirname)
    #.use clear_collections
    .use require('metalsmith-metadata')
        menu: "config/menu.yaml"
    .use require('metalsmith-collections')
        news:
            pattern: "news/*/*.md"
            reverse: true
        events:
            pattern: "events/*/*.md"
            reverse: true
        publications:
            pattern: "publications/*/*.md"
            reverse: true
    .use link_to_orig_path
    .use require('metalsmith-markdown')
        gfm: true
    .use require('metalsmith-autotoc')
        selector: "h2, h3, h4"
    .use require('metalsmith-path')()
    .use require('metalsmith-alias')()
    .use require('metalsmith-filepath')
        absolute: true
        permalinks: true
    .use require('metalsmith-layouts')
        engine: "pug"
        default: "default.pug",
        pattern: "**/*.html"
        helpers:
            moment: require('moment')
            marked: require('marked')
            _: require('lodash')
    .use require('metalsmith-less')()
    .use bower
    .use require('metalsmith-uglify')()

argv = require('minimist')(process.argv.slice(2))

if argv['serve']
    ms.use( require('metalsmith-serve')( { port: 8080 } ) )

if argv['watch']
    ms.use require('metalsmith-watch')
        paths:
            "${source}/**/*": true
            "layouts/**/*": "**/*.md"
        livereload: true
    ms.use require('metalsmith-serve')
        port: 8080
        host: "0.0.0.0"

if argv['check']
    ms.use require('metalsmith-broken-link-checker')
        allowRedirects: true
        warn: true

ms.build (e) ->
    if e
        throw e
    else
        console.log("Done")
