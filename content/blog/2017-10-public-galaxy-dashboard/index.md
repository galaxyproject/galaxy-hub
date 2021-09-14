---
date: '2017-10-06'
title: "Public Galaxy Server Dashboard"
tease: "a new view of the Universe"
authors: "Helena Rasche"
---

[<img class="img-fluid mx-auto" src="/src/blog/2017-10-public-galaxy-dashboard/dashboard-landing.png" alt="Public Galaxy Server Dashboard" />](https://stats.galaxyproject.eu/dashboard/db/public-galaxy-servers)

## History

For the past month a few Galaxy Developers have been working on monitoring the
[public Galaxy instances](/src/use/index.md) across the universe. We have been making hourly
requests to instances which have listed themselves in one of the public Galaxy
server lists to request non-sensitive information about their configuration.

E.g. what "brand" do they have configured, how many allow users to purge
datasets, how many have quotas enabled.

[<img class="img-fluid mx-auto" src="/src/blog/2017-10-public-galaxy-dashboard/dashboard-details.png" alt="Public Galaxy Server Dashboard" />](https://stats.galaxyproject.eu/dashboard-solo/snapshot/7pgA1b2OcA0UBteiMx1h5bPlwh7Kzv95?orgId=1&panelId=11)

## Dashboards

All of this data is collected together into some nice dashboards on the [Freiburg Galaxy](http://www.bioinf.uni-freiburg.de/Galaxy/)'s
[public Grafana instance](https://stats.galaxyproject.eu/dashboard/db/public-galaxy-servers?orgId=1)
You'll find the answers to these questions and more in our tables and graphs

Now that we've started collecting this data we will be able to answer questions
which have long plagued the development team such as:

- How often do people upgrade?
- How soon after a release do they upgrade? Do they upgrade immediately or do they wait?
- Which releases are people running? Recent ones? Or ones that are no longer supported?
- Which features do admins enable? Which do the community find important?

## Uptime

*But wait! There's more.* As part of this monitoring we realised that we could
trivially calculate uptimes based on how often servers have failed to respond
to us whenever we pinged them. So we've produced some uptime badges for you to
use and brag about your instance to your bosses / colleagues / etc. If you ever
needed someone else's stamp of approval that you're doing a good job, here it is.
Way to go Galaxy admins! (For those of you using [Zerg mode](https://github.com/galaxyproject/dagobah-training/blob/2017-montpellier/sessions/10-uwsgi/ex2-zerg-mode.md),
congrats on finding the cheat code to 100% uptime)

Freiburg Galaxy's uptime:

 ![](https://stats.galaxyproject.eu/raw/badges/Freiburg_Galaxy.svg)

(note that this embedded badge will update in real time.)

[Grab your badge here.](https://stats.galaxyproject.eu/raw/badges/)

That said, please note that this data is not perfectly accurate. We have
improved the heuristics over time, and our script only checks in once an hour,
so it won't catch anything happening in the other 59 minutes of every hour.
And if your server is protected by an external authentication mechanism then
this does not detect the server ever being up.
If you think your server is marked offline in error, please let us know and
we'll look into it.

## Open Data, Open Code

The code that collects this data is [freely available](https://github.com/martenson/public-galaxy-servers) under the [MIT
license](https://github.com/martenson/public-galaxy-servers/blob/master/LICENSE).
The tool produces some `.json` files containing the results of talking to every
Galaxy, and we've made that
[available](https://stats.galaxyproject.eu/raw/) under CC0. The JSON
files are available with an `Access-Control-Allow-Origin: *` in case you want
to build something cool off of this data.
