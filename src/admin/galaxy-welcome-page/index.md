The "home" or "welcome" page in galaxy, i.e. the large central window on first page load, is contained `$GALAXY_ROOT/static/welcome.html`. Many sites will customise this file or otherwise use it for informational purposes. Since everyone is "forced" to look at it on first load, it's an excellent way to keep your users abreast of galaxy, its status, updates, and so on.

## Adding a Changelog

Maintenance of a changelog with notes on things like 

* Downtimes/Maintenance periods
* New tools
* Publications relating to your galaxy

can be a very useful resource, however, it's cumbersome to maintain the static HTML file. If your group is already running a blog or other website, you may wish to make use of the features there, and load that content as part of the home page. 

Doing this is incredibly simple; load the JS, define a location for your content, and finally load it through jquery.

```html
    <!-- load required jquery library, there's probably a "better" way to do this -->
    <script src="https://FQDN/galaxy/static/scripts/libs/jquery/jquery.js">
    </script>
    <!-- div where the remote content will show up -->
    <div id="remote-content" />
    <!-- load the content from the remote target -->
    <script type="text/javascript">
        $('#remote-content').load('https://FQDN/category/dev/galaxy/ #content');
    </script>
```


In our case, `#content` is a div in our wordpress page (hosted at `https://FQDN/category/dev/galaxy`) which lists all of our posts tagged "galaxy". This way our Dev/Ops team can write blog posts there, and they'll be transparently available in galaxy.
