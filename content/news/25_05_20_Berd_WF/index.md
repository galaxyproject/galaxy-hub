---
title: Analysing data from BERD Data Portal with Galaxy
date: '2025-05-20'
tease: "Find out how to research your Data from the BERD Data Portal directly in Galaxy"
continent: EU
contact: Daniela Schneider
gtn: false
tags: [news]
subsites: [all]
---
In April, we included the [Berd4NFDI](https://www.berd-nfdi.de/about/) data portal in [Galaxy](https://galaxyproject.org/news/2025-04-09-berd-integration/). 
BERD is a NFDI consortia working towards a platform for collecting, (pre-)processing, analyzing and preserving Business, Economic and Related Data. 
Their data portal is a hub for sharing suitable datasets.

## Getting started in Galaxy

To analyse BERD data directly in Galaxy, go to the [Galaxy platform](https://usegalaxy.eu/). 
On the left pane, click on the "Upload" button. In the new window, click on the button 'Choose from repository'. 
In the opening window, insert "BERD" in the search bar. Now you can click on the folder "BERD@NFDI Repository". 
The datasets from BERD's portal show up here. You can select any folder to see its content. 
To choose one, click on the item or items you and click on the 'Select' button in the corner. Click on 'Start' and close this window.
We started with "Instagram Posts from German Parties" and clicked it to upload the containing csv file.

## Example Analysis

The [dataset](https://berd-platform.de/records/nghbn-9gx74) "Instagram Posts from German Parties" is particularly insightful as the file contains posts from 632 of the 1134 people standing for election in the Bavarian state election  

all Bavarian parties before the election.

Since the data is messy, we first open it in the interactive environemnt of Open Refine, directly from Galaxy. 



Their [BERD Data Portal](https://www.berd-nfdi.de/data-portal/) is a hub for unstructured and structured academic data based on invenioRDM.
As such, we made the portal's datasets available to browse directly in Galaxy. 
That means you can open Galaxy, upload your dataset and start analysing it directly.

![Screenshot of the BERD Data Portal Folder in Galaxy](BERD_Galaxy.png "Browse the BERD Data Portal within Galaxy")


For that, go to https://usegalaxy.eu/, make an account and log in. Click on the left hand side and click on 'Upload'.
A new window opens. Click on the button 'Choose from repository'. In the upcoming window, insert "BERD" in the search bar.
Now you can click on the folder "BERD@NFDI Repository". The datasets from BERD's portal show up here. You can select any folder to see its content. To choose one, click on the item or items you and click on the 'Select' button in the corner. 
Click on 'Start' and close this window.

Once the file on the right side, the history, goes from grey (waiting) to orange (processing) to green, your upload is finished.
In the next steps, you can analyse your data in Galaxy with various tools according to your needs, make visualisation and also export your findings to a repository of your choice, including to BERD if you like :). All from within Galaxy.
For example try [Openrefine](https://usegalaxy.eu/root?tool_id=interactive_tool_openrefine), our [word-cloud](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/bgruening/wordcloud/wordcloud/1.9.4+galaxy1) tool or any of
our table manipulation or machine learning / AI tools.
