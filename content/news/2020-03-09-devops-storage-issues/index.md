---
title: Storage issues and potential data loss
date: '2020-03-09'
tags: [devops]
subsites: [eu, freiburg]
main_subsite: freiburg
---

On Friday, we unfortunately experienced some data loss. Currently, we believe that some datasets created in the last two months were affected.

If your data was affected by this, the datasets will still appear in your history, but the data itself will be missing - i.e. if you click on the 'View' or 'Download' buttons, you will probably encounter an error or a white page.

If you try and run a job using one of the affected datasets as input, the job will fail with an error like 'Job 7225486's output dataset(s) could not be read'.

Update (10th of March): affected datasets will be visible in histories for a period of two weeks. We will then change their status to 'purged', meaning they will no longer be visible to users. If you would like a list of which of your datasets and histories were affected, please email us at galaxy@informatik.uni-freiburg.de (reporting in the text your Usegalaxy.eu id). Feel free to contact us with any other queries.

We are truly sorry!

### Tips for re-creating your histories or re-running your results

* ensure that your input datasets are still available, re-upload them if needed
* use the reload button to re-run single tools
* [extract workflows from your history](https://training.galaxyproject.org/training-material/topics/galaxy-ui/tutorials/history-to-workflow/tutorial.html) and re-run them again

