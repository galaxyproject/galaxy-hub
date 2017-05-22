---
autotoc: true
title: Galaxy 101: What is Galaxy?
---

Before begging a practical exercise let us introduce several fundamental concepts about Galaxy.

## What is Galaxy Project?

According to [wikipedia](https://en.wikipedia.org/wiki/Galaxy) "*a galaxy is a gravitationally bound system of stars, stellar remnants, interstellar gas, dust, and dark matter*". In other words it is a *system* composed of *multiple components*. Likewise the Galaxy Project also consists of multiple components including: 

 - **The Galaxy Software Famework**
 - **The Public Galaxy Service**

### The Galaxy software framework

Galaxy software framework is an open-source application (distributed under the permissive [Academic Free License](http://getgalaxy.org). Its goal is to develop and maintain a system that enables researchers without informatics expertise to perform computational analyses through the web. A user interacts with Galaxy through the web by uploading and analyzing the data. Galaxy interacts with underlying computational infrastructure (servers that run the analyses and disks that store the data) without exposing it to the user.

|        |
|--------|
|![What is Galaxy?](/src/tutorials/g101/what_is_galaxy.png)|
|<small>**Figure 1. Galaxy** is a web application that allows processing of large datasets using powerful infrastructure that the user never sees or directly interacts with. This infrastructure can be a conventional cluster, a cloud, or any combination of the two.</small>|

### The Public Galaxy Service

The main Galaxy instance at http://usegalaxy.org is an installation of the Galaxy software combined with many common tools and data; this site has been available since 2007 for anyone to analyze their data free of charge. The site provides substantial CPU and disk space, making it possible to analyze large datasets. The site supports thousands of users and hundreds of thousands of jobs per month (see http://bit.ly/gxystats). It is sustained by [TACC](https://www.tacc.utexas.edu/) hardware using allocation generously provided by the [CyVerse](www.cyverse.org/) project.  

In addition to the main Galaxy instance there numerous other sites running Galaxy software framework featuring different sets of tools and alternative interfaces. These can be explored at out [public servers](/public-galaxy-servers/) page.

## What is the goal of this tutorial?

In this tutorial we will introduce you to bare basics of Galaxy:

- Getting data from external databases such as UCSC
- Performing simple data manipulation
- Understanding Galaxy's History system
- Creating and running a workflow (Part 2)

### The research question

In this example we will use Galaxy to answer the following question:

<div class="well well-sm">
"Of all human coding exons, which has the highest number of single nucleotide polymorphisms (SNPs)?"
</div>

## Before you begin: Organizing your windows and setting up Galaxy account

To make this demonstration smooth we would recommend setting up your workspace as described below:

### Getting your display sorted out

<div class="alert alert-warning" role="alert">
**Note**: Some screenshots shown here may appear slightly different from the ones you will see on your screen. Galaxy is quickly evolving and as a result some discrepancies are possible.
</div>

To get the most of this tutorial open two browser windows. The first is the one you already have (this page). To open the other, **right** click [this link](http://usegalaxy.org) and choose "Open in a New Window" (or something similar depending on your operating system and browser):

|        |
|--------|
|![open in a new window](/src/tutorials/g101/newWindow.png)|
|<small>**Figure 2. Open a new window** by right clicking [this link](http://usegalaxy.org).</small>|

Then organize your windows as something like this (depending on the size of your monitor you may or may not be able to organize things this way, but you get the idea):

|        |
|--------|
|![Windows side by side](/src/tutorials/g101/twoScreens.png)|
|<small>**Figure 3**. Two screens side by side will make it easy for you to follow this tutorial.</small>|

### Setting up Galaxy account
Go to the "Login or Register" link at the top of Galaxy interface and choose "Register" (unless of course you already have an account):

|        |
|--------|
|![register](/src/tutorials/g101/register.png)|
|<small>**Figure 4**. To create a user account use "Login or Register" link on top of Galaxy interface.</small>|

Then enter your information and you're in!

## Getting data

Our research problem calls for using existing annotation of human genome (we will exons and SNPs that are *already* annotated across the genome sequence). So to answer our question we need to compare coordinates of exons and SNPs against each other. One of the most frequently used repositories of genome annotation data is maintained by the [Genome Informatics Group](https://genome.ucsc.edu/) at the University of California at Santa Cruz. 

### Getting coding exons

First thing we will do is to obtain exon coordinate data from UCSC by clicking **Get Data &#8594; UCSC Main**:

|        |
|--------|
|![get data from UCSC](/src/tutorials/g101/getDataUCSC.png)|
|<small>**Figure 5**. Expand "Get Data" category and click on "UCSC Main".</small>|

You will see UCSC Table Browser interface appearing in your browser window:

|        |
|--------|
|![UCSC genes](/src/tutorials/g101/ucscGenes.png)|
|<small>**Figure 6**. The UCSC Table Browser interface. Verify that parameters highlighted in red are set as shown here.</small>|

<div class="alert alert-info" role="alert">
Here we are restricting our analysis to chromosome 22 only to make it quicker since this is the smallest human autosome. You are welcome to do it genomewide, but it will take a bit longer.
</div>

Make sure that your settings are exactly the same as shown Fig. 6 (in particular, **position** should be set to "chr22", **output format** should be set to "BED - browser extensible data", and "Galaxy" should be checked within the **Send output to** option). Click **get output** and you will see the next screen:

|        |
|--------|
|![UCSC ganes 2](/src/tutorials/g101/ucscGenes2.png)|
|<small>**Figure 7**. BED output screen of the UCSC Table Browser interface. Here make sure you select "Coding Exons" radio button.</small>|

Make sure **Create one BED record per:** is set to "Coding Exons" and click **Send Query to Galaxy** button. After this you will see your first History Item in Galaxy's right pane. It will go through gray (preparing) and yellow (running) states to become green:

|        |
|--------|
|![First history item](/src/tutorials/g101/firstHistoryItem.png)|
|<small>**Figure 8**. The first dataset in the history (right pane) contains data about location of coding exons on chromosome 22.</small>|

### Getting SNPs

Now is the time to obtain SNP data (SNPs are [*single nucleotide polymorphisms*](https://ghr.nlm.nih.gov/primer/genomicresearch/snp)). This is done almost exactly the same way except now we will need to make a different set of choices within the UCSC Table Browser interface. First thing we will do is to again click on **Get Data &#8594; UCSC Main**:

|        |
|--------|
|![UCSC SNPs](/src/tutorials/g101/ucscSNPs.png)|
|<small>**Figure 9**. The UCSC Table Browser interface. Verify that parameters highlighted in red are set at shown here.</small>|

click "get output" and you should see this:

|        |
|--------|
|![UCSC SNPs 2](/src/tutorials/g101/ucscSNPs2.png)|
|<small>**Figure 10**. BED output screen of the UCSC Table Browser interface. Here you do not need to modify any settings.</small>|

where you do not need to change anything (make sure that **Whole Gene** is selected ("Whole Gene" here really means "Whole Feature") and click **Send Query to Galaxy** button. You will get your second item in the history:

|        |
|--------|
|![Second history item](/src/tutorials/g101/secondHistoryItem.png)|
|<small>**Figure 11**. History with two datasets.</small>|

### Tidying up

<div class="alert alert-success" role="alert">
History keeps the entire record of your analysis. To find more about histories take a look at this [tutorial](/tutorials/histories).
</div>

Now we will rename the two history items to "Exons" and "SNPs" by clicking on the Pencil icon <i class="fa fa-pencil" aria-hidden="true"></i> adjacent to each item. You will see middle pane of the interface changing. There (in the middle pane) you will have the opportunity to rename datasets. After changing the name scroll down and click **Save**.  Also we will rename history to "my example" (or whatever you want) by clicking on **Unnamed history** so everything looks like this:

|        |
|--------|
|![Rename](/src/tutorials/g101/rename.png)|
|<small>**Figure 12**. History after datasets were renamed.</small>|

## Finding Exons with the highest number of SNPs

### Joining exons with SNPs

Let's remind ourselves that our objective was to find which exon contains the most SNPs. This first step in answering this question will be joining exons with SNPs (a fancy word for finding exons and SNPs that overlap side by side). This is done using **Operate on Genomics Intervals &#8594; Join** tool:

|        |
|--------|
|![Join](/src/tutorials/g101/join.png)|
|<small>**Figure 13**. To join exons with SNPs select "Exons" as the first dataset and "SNPs" as the second.</small>|


make sure your **Exons** are first and **SNPs** are second and click **Execute**. Note that you can drag and drop datasets from History into tool interface input selectors:

|        |
|--------|
|![](/src/tutorials/g101/dataset_drag.gif)|
|<small>**Figure 13A**. You can drag and drop datasets!</small>|

You will get the third history item:

|        |
|--------|
|![Third history item](/src/tutorials/g101/thirdHistoryItem.png)|
|<small>**Figure 14**. The third history item is the result of joining of the first (Exons) with the second (SNPs). Each subsequent analysis operation will add additional items to the growing history.</small>|

### Counting the number of SNPs per exon

Look at the data obtained from the join operation above (you can do it by clicking the eye icon <i class="fa fa-eye" aria-hidden="true"></i> adjacent to the dataset). Below is a subsample of rows from the joined datasets (you may need to scroll sideways to see the entire length of the rows below):


```
chr22 15710867 15711034 uc062bej.1_cds_9_0_chr22_15710868_f  0 + chr22 15710880 15710881 rs568292779 0 -
chr22 15710867 15711034 uc062bej.1_cds_9_0_chr22_15710868_f  0 + chr22 15710947 15710948 rs544633418 0 -
chr22 15710867 15711034 uc062bej.1_cds_9_0_chr22_15710868_f  0 + chr22 15710906 15710907 rs548691624 0 -
chr22 15710867 15711034 uc062bej.1_cds_9_0_chr22_15710868_f  0 + chr22 15710920 15710921 rs530488686 0 -
chr22 15710867 15711034 uc062bej.1_cds_9_0_chr22_15710868_f  0 + chr22 15710932 15710933 rs563306354 0 -
chr22 15710867 15711034 uc062bej.1_cds_9_0_chr22_15710868_f  0 + chr22 15711019 15711020 rs559431407 0 -
chr22 15710867 15711034 uc062bej.1_cds_9_0_chr22_15710868_f  0 + chr22 15710949 15710950 rs532940301 0 -
```
```
                                                      ....
```
```
chr22 15719659 15719777 uc062bej.1_cds_10_0_chr22_15719660_f 0 + chr22 15719668 15719669 rs200891952 0 -
chr22 15719659 15719777 uc062bej.1_cds_10_0_chr22_15719660_f 0 + chr22 15719751 15719752 rs556077431 0 -
```

Look at the rows. They all correspond to the same exon (id = `uc062bej.1_cds_9_0_chr22_15710868_f`) that overlaps seven distinct SNPs (ids: `rs568292779`, `rs544633418`, `rs548691624`, `rs530488686`, `rs563306354`, `rs559431407`, `rs532940301`). In other words this means that this exon contains seven SNPs. Since our ultimate goal is to count the number of SNPs per exon we can simply do this by counting how many times an exon's id appears in this dataset. This can be easily done with the **Join, Subtract, and Group &#8594; Group** tool:

|        |
|--------|
|![Group](/src/tutorials/g101/group1.png)|
|<small>**Figure 15**. Grouping tool interface. Set parameters as highlighted with red outlines. To reveal operation interface at the bottom click on **Insert Operation** button.</small>|

click **Execute**. Your history will look like this:

|        |
|--------|
|![Fourth history item](/src/tutorials/g101/fourthHistoryItem.png)|
|<small>**Figure 16. Results of grouping** operation appear as the fourth item in the history.</small>|

if you look at the above image you will see that the result of grouping (dataset #4) contains two columns. This first contains the exon name while the second shows the number of times this name has been repeated in dataset #3:

```
uc002zlp.2_cds_0_0_chr22_16590877_r    3
uc002zlv.4_cds_0_0_chr22_16783619_r    4
uc002zlv.4_cds_1_0_chr22_16799771_r    1
uc002zlw.4_cds_2_0_chr22_16964766_r    1
```

the number in the second column is effectively the number of SNPs that exon contains.

### Sorting exons by SNP count

To see which exon has the highest number of SNPs we can simply sort the dataset #4 on the second column in descending order. This is done with **Filter and Sort &#8594; Sort**:

|        |
|--------|
|![Sort](/src/tutorials/g101/sort.png)|
|<small>**Figure 17**. Sorting results by SNP count in descending order.</small>|

This will generate the fifth history item:

|        |
|--------|
|![Fifth history item](/src/tutorials/g101/fifthHistoryItem.png)|
|<small>**Figure 18**. Sorting generates the fifth item in the history.</small>|

and you can now see that the highest number of SNPs per exon is 40. 

### Selecting top five

Now let's select top five exons with the highest number of SNPs. For this we will use **Text Manipulation &#8594; Select First** tool:

|        |
|--------|
|![Select first](/src/tutorials/g101/selectFirst.png)|
|<small>**Figure 19.** Selecting the first five lines.</small>|

Clicking **Execute** will produce the sixth history item that will contain just five lines:

```
uc010gqp.3_cds_0_0_chr22_15690078_f	  40
uc003bhh.4_cds_0_0_chr22_46256561_r	  31
uc062bek.1_cds_0_0_chr22_15690246_f	  29
uc011agd.3_cds_0_0_chr22_15528159_f	  25
uc062cbs.1_cds_1_0_chr22_22376183_f	  25
```

<div class="alert alert-success" role="alert">
Thus the highest number of SNPs per exon on chromosome 22 is 40!
</div>

### Recovering exon info and displaying data in genome browsers

Now we know that in this dataset the five top exons contain between 25 and 40 SNPs. But what else can we learn about these? To know more we need to get back the positional information (coordinates) of these exons. This information was lost at the grouping step and now all we have is just two columns with IDs and counts. To get coordinates back we will match the names of exons in dataset #6 (column 1) against names of the exons in the original dataset #1 (column 4). This can be done with **Join, Subtract and Group &#8594; Join** tool (note the settings of the tool in the middle pane):

<div class="alert alert-danger" role="alert">
Note that there are two kinds of join in Galaxy. One is to join genomic features based on positional information: if start and end coordinates of one feature overlap with start and end coordinates of the other, they are joined. This type of join is found in **Operate on Genomics Intervals &#8594; Join**. We used it before to join exons and SNPs (see Fig. 13). Here we use a **different kind** of join. It joins lines from two datasets is they share a common field. It can be found in **Join, Subtract and Group &#8594; Join**.
</div>

|        |
|--------|
|![Compare](/src/tutorials/g101/recover_coordinates.png)|
|<small>**Figure 20**. Joining the first history dataset (Exons) with dataset #6 (sorting results) will retrieve those records from dataset #1 which share IDs with dataset #6.</small>|

this adds the seventh dataset to the history in which lines from datasets #1 and #6 are joined line-by-line:

```
chr22 15528158 15529139 uc011agd.3_cds_0_0_chr22_15528159_f 0 + uc011agd.3_cds_0_0_chr22_15528159_f 25
chr22 15690077 15690709 uc010gqp.3_cds_0_0_chr22_15690078_f 0 + uc010gqp.3_cds_0_0_chr22_15690078_f 40
chr22 15690245 15690709 uc062bek.1_cds_0_0_chr22_15690246_f 0 + uc062bek.1_cds_0_0_chr22_15690246_f 29
chr22 22376182 22376505 uc062cbs.1_cds_1_0_chr22_22376183_f 0 + uc062cbs.1_cds_1_0_chr22_22376183_f 25
chr22 46256560 46263322 uc003bhh.4_cds_0_0_chr22_46256561_r 0 - uc003bhh.4_cds_0_0_chr22_46256561_r 31
```

### Visualizing results

The best way to learn about these exons is to look at their genomic surrounding. There is really no better way to do this than using genome browsers. Because this analysis was performed on "standard" human genome (`hg38` in this case), you have two choices - [UCSC Genome Browser](http://genomes.ucsc.edu) and [IGV](https://www.broadinstitute.org/igv/).

However, before we begin we need to prepare data. The problem is that browsers expect data in certain format. In particular the UCSC Genome Browser "plays well" with datasets in [BED](https://genome.ucsc.edu/FAQ/FAQformat.html#format1) format. To convert the data shown above into BED format we need:

 1. replace data in column 5 with data from the last column
 2. remove duplicate IDs (retain only column 4 and remove column 7)

The first step will set *score* columns of BED format to the number of SNPs and the second will reduce out data to six columns required by BED specification (BED6). Both of these steps can be performed with a single tools **Text manipulation &#8594; Cut** tool by cutting out columns 1, 2, 3, 4, 8, and 6:

|        |
|--------|
|![Compare](/src/tutorials/g101/cut.png)|
|<small>**Figure 21**. Cutting columns `c1,c2,c3,c4,c8,c6` from dataset #7. Here `c` is short for "column". Column numbers start with 1.</small>|

The resulting dataset looks like this:

```
chr22 15528158 15529139 uc011agd.3_cds_0_0_chr22_15528159_f 25 +
chr22 15690077 15690709 uc010gqp.3_cds_0_0_chr22_15690078_f 40 +
chr22 15690245 15690709 uc062bek.1_cds_0_0_chr22_15690246_f 29 +
chr22 22376182 22376505 uc062cbs.1_cds_1_0_chr22_22376183_f 25 +
chr22 46256560 46263322 uc003bhh.4_cds_0_0_chr22_46256561_r 31 -
```

This is exactly as BED6 should look like. However, Galaxy does not know that this is BED6, so we need to tell it that. To do this click on pencil icon <i class="fa fa-pencil" aria-hidden="true"></i> adjacent to the latest history dataset and click on "Datatype" tab:

|        |
|--------|
|![Changing datatype](/src/tutorials/g101/change_datatype.gif)|
|<small>**Figure 22**. Changing datatype to BED.</small>|

After changing the datatype the history item will reveal UCSC Browser link:

|        |
|--------|
|![](/src/tutorials/g101/item8.png)|
|<small>**Figure 23**. After changing format to BED UCSC link becomes visible.</small>|

Let's click in this "display at UCSC main" link. This open a new tag within your web browser:

|        |
|--------|
|![](/src/tutorials/g101/browser.png)|
|<small>**Figure 24**. UCSC Genome browser displaying dataset #8 as a "User Track". Make sure that you can see the entire chromosome by using zoom settings of the browser.</small>|

The above figure shows out five exons widely spread out across chromosome 22. But which one contains the highest number of SNPs? Since the know that the highest number is 40 we can filter visible regions of the "User track" to show only those that have number 40 in their score field (see Fig. 21). To do this click on a browser area highlighted with red rectangle in Fig. 24 above:

|        |
|--------|
|![](/src/tutorials/g101/browser2.png)|
|<small>**Figure 25**. Restricting visible regions to these with the score 40 of higher. Click "Submit" to see the effect of this filtering.</small>|

Filtering shows only one "User track" item on the browser:

|        |
|--------|
|![](/src/tutorials/g101/browser3.png)|
|<small>Zooming in produces the following:</small>|
|![](/src/tutorials/g101/browser4.png)|
|<small>**Figure 26**. The exon with the highest number of SNPs. Zooming in (lower part) shows that this is the first exons of [*POTEH*](http://www.ncbi.nlm.nih.gov/entrez/query.fcgi?db=gene&cmd=Retrieve&dopt=Graphics&list_uids=23784) gene.</small>|

## Recap

In this tutorial we started with coordinates of exons and SNPs, found overlap between two datasets and narrowed it down to 5 exons containing the highest number of SNPs: 

|        |
|--------|
|![](/src/tutorials/g101/g101_outline.png)|
|<small>**Figure 27**. Analysis outline. This looks like a workflow, doesn't it?</small>|

You can see the an outline shown in Fig. 27 looks like a workflow. This is not coincidental - let's try to make a workflow from an analysis we just performed. To see how this works go to the second part of [this tutorial](/tutorials/g101-2).


## If things don't work...
...you need to complain. Use [Galaxy's BioStar Channel](https://usegalaxy.org/biostar/biostar_redirect) to do this.


