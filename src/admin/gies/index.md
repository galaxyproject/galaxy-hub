---
title: "Galaxy Interactive Environments (GIEs)"
---

These are revolutionary components of Galaxy allowing users to do interactive
data processing from within Galaxy. IEs are built as standard Galaxy
visualization plugins, however they launch Docker containers and use some
additional routing information to connect end users through the Galaxy server,
to the Docker images.

There are currently nine IEs built into Galaxy, including:

* [IPython](https://github.com/bgruening/galaxy-ipython/)
* [RStudio](https://github.com/erasche/galaxy-rstudio/)


## Set up IEs on your server

See the [comprehensive admin
documentation](https://docs.galaxyproject.org/en/master/admin/special_topics/interactive_environments.html)
to learn how to set up IEs on your own Galaxy.
