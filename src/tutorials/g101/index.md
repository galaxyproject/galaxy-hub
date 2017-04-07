---
autotoc: true
title: Galaxy 101
---
[//]: # (Here Hugo shortcodes for vimeo have been replaced to bootsrap-based HTML with the folloing command)
[//]: # (cat <HUGO MD FILE> | sed s/\{\{\<vimeo\ /\<div\ class=\"embed-responsive\ embed-responsive-16by9\"\>\<iframe\ src=\"https:\\\/\\\/player\.vimeo\.com\\\/video\\\// | sed s/\>\}\}$/?portrait=0\"\ webkitallowfullscreen\ mozallowfullscreen\ allowfullscreen\>\<\\\/iframe\>\<\\\/div\>/ > index.md)

In this lecture we will introduce you to bare basics of Galaxy:

* Getting data from external databases such as UCSC
* Performing simple data manipulation
* Understanding Galaxy's History system
* Creating a running a workflow

## What are we trying to do?

Suppose you get the following question: 

<div class="well well-sm">
*"Mom (or Dad) ... Which coding exon has the highest number of single nucleotide polymorphisms on chromosome 22?"*
</div>

You think to yourself "Wow! This is a simple question ... I know exactly where the data is (at UCSC) but how do I actually compute this?" The truth is, there is really no straightforward way of answering this question in a time frame comparable to the attention span of a 7-year-old. Well ... actually there is and it is called Galaxy. So let's try it...

## Organizing your windows and setting up Galaxy account

### Getting your display sorted out


<div class="alert alert-warning" role="alert">
**Note**: Some screenshots shown here may appear slightly different from the ones you will see on your screen. Galaxy is quickly evolving and as a result some discrepancies are possible (and likely).
</div>

To get the most of this tutorial open two browser windows. One you already have (it is this page). To open the other, **right** click [this link](http://usegalaxy.org) and choose "Open in a New Window" (or something similar depending on your operating system and browser):

![open in a new window](/src/tutorials/g101/newWindow.png)

Then organize your windows as something like this (depending on the size of your monitor you may or may not be able to organize things this way, but you get the idea):

![Windows side by side](https://galaxyproject.org/galaxy101/twoScreens.png)

### Setting up Galaxy account
Go to the **User** link at the top of Galaxy interface and choose **Register** (unless of course you already have an account):

![register](/src/tutorials/g101/register.png)

Then enter your information and you're in!

## Getting data from UCSC

### Getting coding exons

First thing we will do is to obtain data from UCSC by clicking **Get Data &#8594; UCSC Main**:

![get data from UCSC](/src/tutorials/g101/getDataUCSC.png)

You will see UCSC Table Browser interface appearing in your browser window:

![UCSC genes](/src/tutorials/g101/ucscGenes.png)

Make sure that your settings are exactly the same as shown on the screen (in particular, **position** should be set to "chr22", **output format** should be set to "BED - browser extensible data", and "Galaxy" should be checked within the **Send output to** option). Click **get output** and you will see the next screen:

![UCSC ganes 2](/src/tutorials/g101/ucscGenes2.png)

here make sure **Create one BED record per:** is set to "Coding Exons" and click **Send Query to Galaxy** button. After this you will see your first History Item in Galaxy's right pane. It will go through gray (preparing) and yellow (running) states to become green:

![First history item](/src/tutorials/g101/firstHistoryItem.png)

### Getting SNPs

Now is the time to obtain SNP data (SNPs are [*single nucleotide polymorphisms*](https://ghr.nlm.nih.gov/primer/genomicresearch/snp)). This is done almost exactly the same way. First thing we will do is to again click on **Get Data &#8594; UCSC Main**:

![get data from UCSC](/src/tutorials/g101/getDataUCSC.png)

but now change **group** to "Variation":

![Variation](/src/tutorials/g101/variation.png)

so that the whole page looks like this:

![UCSC SNPs](/src/tutorials/g101/ucscSNPs.png)

click get output and you should see this:

![UCSC SNPs 2](/src/tutorials/g101/ucscSNPs2.png)

where you need to make sure that **Whole Gene** is selected ("Whole Gene" here really means "Whole Feature") and click **Send Query to Galaxy** button. You will get your second item in the history:

![Second history item](/src/tutorials/g101/secondHistoryItem.png)

Now we will rename the two history items to "Exons" and "SNPs" by clicking on the Pencil icon adjacent to each item. After changing the name scroll down and click **Save**.  Also we will rename history to "my example" (or whatever you want) by clicking on **Unnamed history** so everything looks like this:

![Rename](/src/tutorials/g101/rename.png)

### Video

<div class="embed-responsive embed-responsive-16by9"><iframe src="https://player.vimeo.com/video/185523444?portrait=0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>

## Finding Exons with the highest number of SNPs

### Joining exons with SNPs

Let's remind ourselves that our objective was to find which exon contains the most SNPs. This first step in answering this question will be joining exons with SNPs (a fancy word for printing exons and SNPs that overlap side by side). This is done using **Operate on Genomics Intervals &#8594; Join** tool:

![Join](/src/tutorials/g101/join.png)

make sure your **Exons** are first and **SNPs** are second and click **Execute**. You will get the third history item:

![Third history item](/src/tutorials/g101/thirdHistoryItem.png)

### Counting the number of SNPs per exon

Let's look at the data obtained from the join operation above (you can do it by clicking the "eye" icon adjacent to the dataset). Below is a subsample of rows from the joined datasets (you may need to scroll sideways to see the entire length of the rows below):

----

<span style="color: red;">
```
chr22 15710867 15711034 uc062bej.1_cds_9_0_chr22_15710868_f  0 + chr22 15710880 15710881 rs568292779 0 -
chr22 15710867 15711034 uc062bej.1_cds_9_0_chr22_15710868_f  0 + chr22 15710947 15710948 rs544633418 0 -
chr22 15710867 15711034 uc062bej.1_cds_9_0_chr22_15710868_f  0 + chr22 15710906 15710907 rs548691624 0 -
chr22 15710867 15711034 uc062bej.1_cds_9_0_chr22_15710868_f  0 + chr22 15710920 15710921 rs530488686 0 -
chr22 15710867 15711034 uc062bej.1_cds_9_0_chr22_15710868_f  0 + chr22 15710932 15710933 rs563306354 0 -
chr22 15710867 15711034 uc062bej.1_cds_9_0_chr22_15710868_f  0 + chr22 15711019 15711020 rs559431407 0 -
chr22 15710867 15711034 uc062bej.1_cds_9_0_chr22_15710868_f  0 + chr22 15710949 15710950 rs532940301 0 -
```
</span>
```
                                                      ....
```
```
chr22 15719659 15719777 uc062bej.1_cds_10_0_chr22_15719660_f 0 + chr22 15719668 15719669 rs200891952 0 -
chr22 15719659 15719777 uc062bej.1_cds_10_0_chr22_15719660_f 0 + chr22 15719751 15719752 rs556077431 0 -
```
----

Look at the rows highlighted in red. They all correspond to the same exon (id = `uc062bej.1_cds_9_0_chr22_15710868_f`) that overlaps seven distinct SNPs (ids: `rs568292779`, `rs544633418`, `rs548691624`, `rs530488686`, `rs563306354`, `rs559431407`, `rs532940301`). In other words this means that this exon contains seven SNPs. Since our ultimate goal is to count the number of SNPs per exon we can simply do this by counting how many times an exon's id appears in pur dataset. This can be easily done with the **Join, Subtract, and Group &#8594; Group** tool:

![Group](/src/tutorials/g101/group1.png)

choose column 4 by selecting "Column: 4" in **Group by** column. Then click on **Insert Operation** and make sure the interface looks exactly as shown below:

![Group2](/src/tutorials/g101/group2.png)

click **Execute**. Your history will look like this:

![Fourth history item](/src/tutorials/g101/fourthHistoryItem.png)

if you look at the above image you will see that the result of grouping (dataset #4) contains two columns. This first contains the exon name while the second shows the number of times this name has been repeated in dataset #3. 

### Sorting exons by SNP count

To see which exon has the highest number of SNPs we can simply sort the dataset #4 on the second column in descending order. This is done with **Filter and Sort &#8594; Sort**:

![Sort](/src/tutorials/g101/sort.png)

This will generate the fifth history item:

![Fifth history item](/src/tutorials/g101/fifthHistoryItem.png)

and you can now see that the highest number of SNPs per exon is 63. 

### Selecting top five
Now let's select top five exons with the highest number of SNPs. For this we will use **Text Manipulation &#8594; Select First** tool:

![Select first](/src/tutorials/g101/selectFirst.png)

Clicking **Execute** will produce the sixth history item that will contain just five lines:

![Sixth history item](/src/tutorials/g101/sixthHistoryItem.png)

### Recovering exon info and displaying data in genome browsers

Now we know that in this dataset the five top exons contain between 26 and 63 SNPs. But what else can we learn about these? To know more we need to get back the positional information (coordinates) of these exons. This information was lost at the grouping step and now all we have is just two columns. To get coordinates back we will match the names of exons in dataset #6 (column 1) against names of the exons in the original dataset #1 (column 4). This can be done with **Join, Subtract and Group &#8594; Compare two Queries** tool (note the settings of the tool in the middle pane):

![Compare](/src/tutorials/g101/compare.png)

this adds the seventh dataset to the history:

![Seventh history item](/src/tutorials/g101/seventhHistoryItem.png)

The best way to learn about these exons is to look at their genomic surrounding. There is really no better way to do this than using genome browsers. Because this analysis was performed on "standard" human genome (`hg38` in this case), you have two choices - [UCSC Genome Browser](http://genomes.ucsc.edu) and [IGV](https://www.broadinstitute.org/igv/):

![](/src/tutorials/g101/browsers.png)

For example, clicking on **display at UCSC main** will show something like this:

![](/src/tutorials/g101/ucsc.png)

### Video

<div class="embed-responsive embed-responsive-16by9"><iframe src="https://player.vimeo.com/video/185538367?portrait=0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>

## Creating and editing a workflow

### Extracting a workflow

Lets take a look at the history again:

![Collapsed history](/src/tutorials/g101/historyCollapsed.png)

You can see that this history contains all steps of our analysis. So by building this history we have actually created a complete record of our analysis with Galaxy preserving all parameter settings applied at every step. Wouldn't it be nice to just convert this history into a workflow that we'll be able to execute again and again? This can be done by clicking on the cog icon and selecting **Extract Workflow** option:

![Extract workflow](/src/tutorials/g101/extractWorkflow.png)

The center pane will change as shown below and you will be able to choose which steps to include/exclude and how to name the newly created workflow. In this case I named it `galaxy101-2015`:

![Create workflow](/src/tutorials/g101/createWorkflow.png)

once you click **Create Workflow** you will get the following message: "Workflow 'galaxy101-2015' created from current history. You can **edit** or **run** the workflow". 

### Opening workflow editor

Let's click **edit** (if you click something else and the message in the center page disappears, you can always access all your workflows including the one you just created using the **Workflow** link on top of Galaxy interface). This will open Galaxy's workflow editor (to get this view I clicked the arrow at the lower left corner of the screen, which collapsed the tool pane of the Galaxy interface). It will allow you to examine and change settings of this workflow as shown below. Note that the box corresponding to the **Select First** tool is selected (highlighted with the blueish border) and you can see parameters of this tool on the right pane. This is how you can view and change parameters of all tools involved in the workflow:

![Workflow editor](/src/tutorials/g101/wfEditor.png)

### Hiding intermediate steps

Among multiple things you can do with workflows I will just mention one. When workflow is executed one is usually interested in the final product and not in the intermediate steps. These steps can be hidden by mousing over a small asterisk in the lower right corner of every tool:

![Hide step](/src/tutorials/g101/hideStep.png)

Yet there is a catch. In a newly created workflow all steps are hidden by default and the default behavior of Galaxy is that if all steps of a given workflow are hidden, then nothing gets hidden in the history. This may be counterintuitive, but this is done to decrease the amount of clicking if you do want to hide some steps. So in our case if we want to hide all intermediate steps with the exception of the last one we will click that asterisk in last step of the workflow:

![Last step](/src/tutorials/g101/lastStep.png)

Once you do this the representation of the workflow in the bottom right corner of the editor will change with the last step becoming orange. This means that this is the only step, which will generate a dataset visible in the history:

![Workflow Overview](/src/tutorials/g101/workflowOverview.png)

### Renaming inputs

Right now both inputs to the workflow look exactly the same. This is a problem as will be very confusing which input should be **Exons** and which should be **SNPs**:

![Naming inputs 1](/src/tutorials/g101/namingInputs1.png)

One the image above you will see that the top input dataset (the one with the blue border) connects to the **Join tool** first, so it must correspond to the exon data. If you click on this box (in the image above it is already clicked on because it is outlined with the blue border) you will be able to rename the dataset in the right pane:

![Rename Exons](/src/tutorials/g101/renameExons.png)

Then click on the second input dataset and rename it "Features" (this would make this workflow a bit more generic, which will be useful later in this tutorial):

![Rename features](/src/tutorials/g101/renameFeatures.png)

### Renaming outputs

Finally let's rename the workflow's output. For this:

* click on the last dataset (**Compare two Queries**)
* scroll down the rightmost pane and click on ![add action](/src/tutorials/g101/addAction.png)
* Type `Top Exons` in the **Rename dataset** text box:

![Top exons](/src/tutorials/g101/topExons.png)

### Setting parameters "at runtime"

What we are trying to do here is do design a generic workflow. This means that time to time you will need to change parameters within this workflow. For instance, in this tutorial we were selecting 5 exons containing the highest number of SNPs. But what if you need to select 10? Thus it makes sense to leave these types of parameters adjustable. To do this: 

First, select a tool in which you want to set parameters at runtime (`Select first` in this case):

![runtime Tool Selection](/src/tutorials/g101/runtimeTool.png)

Next, select parameter you would like to set at runtime. To do this just hover over the ![paramSymbol](/src/tutorials/g101/paramSymbol.png) icon so it looks like this:

![runtime Param Selection](/src/tutorials/g101/runtimeParam.png)

and click! Your parameter will now be set at runtime.

### Save! It is important...

Now let's save the changes we've made by clicking cog and selecting **Save**:

![wfSave](/src/tutorials/g101/wfSave.png)

## Run workflow on whole genome data

Now that we have a workflow, let's do something grand like, for example, finding exons with the highest number of repetitive elements across the entire human genome. 

### Create a new history

First go back into analysis view by clicking **Analyze Data** on top of the Galaxy's interface. Now let's create a new history by clicking cog and selecting **Create New**:

![Create new history](/src/tutorials/g101/createNewHistory.png)

### Get Exons

Now let's get coding exons for the entire genome by going to **Get Data &#8594; UCSC Main** and setting up parameters as shown below. Note that this time `region` radio button is set to **genome**:

![Get all genes](/src/tutorials/g101/getAllGenes.png)

Click **get output** and you will get the next page (if it looks different from the image below, go back and make sure `output format` is set to **BED - browser extensible format**):

![Get exons](/src/tutorials/g101/ucscGenes2.png)

Choose **Coding exons** and click **Send query to Galaxy**.

## Get Repeats

Go again to **Get Data &#8594; UCSC Main** and make sure the following settings are selected (in particular `group` = **Repeats** and `track` = **RepeatMasker**):

![All repeats](/src/tutorials/g101/allRepeats.png)

Click **get output** and you will get the next page (if it looks different from the image below, go back and make sure `output format` is set to **BED - browser extensible format**):

![All repeats 2](/src/tutorials/g101/allRepeats2.png)

Select **Whole gene** and click **Send Query to Galaxy**.

### Start the Workflow

At this point you will have two items in your history - one with exons and one with repeats. These datasets are large (especially repeats) and it will take some time for them to become green. Luckily you do not have to wait as Galaxy will automatically start jobs once uploads have ended. So nothing stops us from starting the workflow we have created. First, click on the **Workflow link** at the top of Galaxy interface, mouse over **galaxy101-2015**, click, and select **Run**. Center pane will change to allow you launching the workflow. Select appropriate datasets for `Repeats` and `Exon` inputs as shown below. Now scroll to **Step 6** and will see that we can set up `Select first` parameter at *Runtime* (meaning Now!). So lets put `20` in there (or anything else you want) and scroll further down to click ![Run workflow](/src/tutorials/g101/runWorkflowButton.png) to see this:

![Launch workflow](/src/tutorials/g101/launchWorkflow.png)

Once workflow has started you will initially be able to see all its steps. Note that you are joining all exons with all repeats, so naturally this will take some time:

![Launched workflow](/src/tutorials/g101/launchedWorkflow.png)

### Get coffee

As we mentioned above this will take some time, so go get coffee. At last you will see this:

![Final view](/src/tutorials/g101/final.png)

We did not fake this:

The two histories and the workflow described in this page are accessible directly from this page below:

* History [**Galaxy 101 (2015)**](https://usegalaxy.org/u/aun1/h/galaxy-101-2015)
* History [**Exons vs. Repeats**]( https://usegalaxy.org/u/aun1/h/exons-vs-repeats-2015-1)
* Workflow [**Galaxy 101-2015**](https://usegalaxy.org/u/aun1/w/galaxy101-2015-1)

From there you can import histories and workflows to make them your own. For example, to import **Galaxy 101 (2015)** history simply click [this link](https://usegalaxy.org/u/aun1/h/galaxy-101-2015) and select `Import history` link:

![Final view](/src/tutorials/g101/importHistory.png)
