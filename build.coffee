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
    include('css', bower_files.self().ext('css').files)
    include('js', bower_files.self().ext('js').files)
    include('fonts', bower_files.self().ext(['eot','otf','ttf','woff']).files)
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

replacement_data = require("./src/includes.json")
md_link_pattern = /\[.*?\]\((.*?)\)/g
html_link_pattern = /<a href=(['"])(\/src)/g
html_img_pattern = /<img src=(['"])(\/src)/g

subs = (files, metalsmith, done) ->
    # Quick hack to temporarily handle INCLUDE migration
    for file, c of files
        do (file, c) ->
            if file.endsWith('.md')
                contents = files[file].contents.toString()
                for z in replacement_data.subs
                    r = "PLACEHOLDER_INCLUDE("+z.search+")"
                    if contents.indexOf(r) != -1
                        contents = contents.replace(r, z.replace)
                matches = {}
                while match = md_link_pattern.exec(contents)
                    rep = match[1]
                    #TODO: Do this with a regex too
                    if rep.startsWith('/src')
                        rep = rep.substr(4)
                    rep = rep.replace('index.md', '')
                    contents = contents.replace("("+match[1]+")", "("+rep+")")
                while match = html_link_pattern.exec(contents)
                    rep = match[2]
                    #TODO: Do this with a regex too
                    if rep.startsWith('/src')
                        rep = rep.substr(4)
                    contents = contents.replace("<a href="+match[1]+match[2], "<a href="+match[1]+rep)
                while match = html_img_pattern.exec(contents)
                    rep = match[2]
                    #TODO: Do this with a regex too
                    if rep.startsWith('/src')
                        rep = rep.substr(4)
                    contents = contents.replace("<img src="+match[1]+match[2], "<img src="+match[1]+rep)
                files[file].contents = contents
    done()

ms = metalsmith(__dirname)
    .use subs
    .use require('metalsmith-metadata')
        menu: "config/menu.yaml"
    .use require('metalsmith-collections')
        news:
            pattern: "news/*/*.md"
            sortBy: "date"
            reverse: true
        events:
            pattern: "events/*/*.md"
            sortBy: "date"
            reverse: true
        publications:
            pattern: "publications/*/*.md"
            sortBy: "date"
            reverse: true
    .use link_to_orig_path
    .use require('metalsmith-markdown')
        gfm: true
    .use require('metalsmith-autotoc')
        selector: "h2, h3, h4"
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
