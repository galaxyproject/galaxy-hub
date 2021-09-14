---
title: Visualization with Charts
---
*Galaxy Charts* is a visualization framework for JavaScript-based 3rd party visualization plugins which sits on top of Galaxy's visualization framework. Currently about 30 visualizations ranging from bar diagrams, pie charts, scatterplots to molecule and protein viewers and cytoscape and phylogenetic visualizations are available. Charts allows these plugins to benefit from Galaxy's form building capabilities to easily define input parameters and data options for the configuration of 3rd party visualization plugins. It is similar to how tools are added to the Galaxy platform.

### Why Charts?

* Fast, interactive visualization for datasets using only a web browser.
* Explore your data with a variety of chart types.
* Visualize any Galaxy dataset easily without downloading or sending it to a remote server.
* Process your data to create box plots and histograms.
* Benefit from Galaxy's form building capabilities

### Getting Started

* Select a tabular dataset from the history panel.
* Click on the **Visualize** icon and select **Charts**.
* Now, you should see the *Charts* front panel, where you may select a title and a chart type:

![Specific region](/src/learn/visualization/charts/charts_main.png)

* Next, click on the 'Add Data' tab and select the column(s) you would like to visualize:

![Specific region](/src/learn/visualization/charts/charts_columns.png)

* Finally, click on the 'Draw' button to visualize your data:

![Specific region](/src/learn/visualization/charts/charts_bar.png)


### Examples (in alphabetical order)

* Area chart:

![Specific region](/src/learn/visualization/charts/charts_area.png)

* Bar diagram (stacked):

![Specific region](/src/learn/visualization/charts/charts_bar_stacked.png)

* Box plot:

![Specific region](/src/learn/visualization/charts/charts_box.png)

* Line diagram:

![Specific region](/src/learn/visualization/charts/charts_line.png)

* Pie chart:

![Specific region](/src/learn/visualization/charts/charts_pie.png)

*Tip*: The pie chart tool expects two columns giving the text label and the count value for each segment. To make a Pie chart from a column of data use the ""Count"" occurrences of each record" to make a tally table first.

* Scatter plot:

![Specific region](/src/learn/visualization/charts/charts_scatter.png)
