---
title: "Galaxy-GSA"
url: "https://gsa-central.github.io/galaxy.html"
scope: "domain"
platforms:
  - platform_group: "public-server"
    platform_url: "http://www.moralab.science:8080/"
    platform_text: "Galaxy-GSA server"
    platform_location: CN
  - platform_group: "container"
    platform_url: "https://github.com/gsa-central/galaxy-gsa/tree/main/docker"
    platform_text: "Galaxy-GSA Docker image"
  - platform_group: "vm"
    platform_url: "https://zenodo.org/record/5091267#.YZXaAboRWUk"
    platform_text: "Galaxy-GSA VM image"
summary: "Gene Set Analysis tools"
image: "/images/use/galaxy-gsa/galaxy-gsa-logo-200x200.png"
comments:
  - "Gene Set Analysis (GSA) can be defined as the comparison of a query gene set (a list or a rank of differentially expressed genes, for example) to a reference database of annotated gene sets, in order to interpret the initial query set as a rank of significant pathways, functionally related gene sets, or ontology terms. See [GSA Central](https://gsa-central.github.io/) for more."
  - "Galaxy-GSA includes: 1) Popular general-purpose GSA tools, 2) Specialized tools built for specific experimental designs, 3) Specialized tools for datasets different to mRNA, 4) GSA-related auxiliary tools, and 5) [Workflows](http://moralab.science:8080/workflows/list_published) for specific types of Bioinformatics projects."
user_support:
  - "[Using Galaxy-GSA Tutorial](https://github.com/gsa-central/galaxy-gsa/blob/main/tutorials/using-galaxy-gsa.md)"
  - "[Installing Galaxy-GSA tools from the Toolshed](https://github.com/gsa-central/galaxy-gsa/blob/main/tutorials/getting-tools-from-toolshed.md)"
  - "[List of Galaxy-GSA servers and tools](https://github.com/gsa-central/galaxy-gsa/blob/main/tutorials/list-galaxy-gsa-tools.md)"
  - "Test data for Galaxy-GSA tools can be found at [github](https://github.com/gsa-central/galaxy-gsa/tree/main/test-data) and [Shared Histories](http://moralab.science:8080/u/xiaowei3223/h/galaxy-gsa-test-data)."
quotas:
  - "The web server version allows computations and download of results but does not allow account registration. If you use the web server, please save your data, as data and histories will disappear after the browser is closed. For exploiting all the advantages of Galaxy, registering, and saving Histories, please use the implementations above described in installing your own Galaxy or DockerHub."

citations:
pub_libraries:
sponsors:
  - "[Mora Lab](https://mora-lab.github.io/), GMU-GIBH Joint School of Life Sciences, Guangzhou, China" 
---
