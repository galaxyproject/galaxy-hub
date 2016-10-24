---
title: Visualization with Charts
---


*Galaxy Charts* enables you to visualize tabular datasets using bar diagrams, pie charts, scatterplots and other chart types. *Charts* is enabled on the test instance, but not by default on local instances. If you are running a local instance and would like to use *Charts*, please enable the visualization plugins as described here: [VisualizationsRegistry](/src/VisualizationsRegistry/index.md). Certain chart types like e.g. histograms and box plots, pre-process data before rendering the visualization. The pre-processing is done by the *Charts* processing tool available [here](http://toolshed.g2.bx.psu.edu/view/guerler/charts). Noteworthy, many chart types like e.g. bar diagrams and scatterplots, do not require data pre-processing.

### Why Charts?

* Fast, interactive visualization for tabular datasets using only a web browser.
* Explore your data with a variety of chart types.
* Visualize any Galaxy dataset easily without downloading or sending it to a remote server.
* Process your data to create box plots and histograms.

### Getting Started

* Select a tabular dataset from the history panel.
* Click on the **Visualize** icon and select **Charts**.
* Now, you should see the *Charts* front panel, where you may select a title and a chart type:

<div class='center'><img src="/src/Learn/Visualization/Charts/charts_main.png" alt="Main panel" width="600" /></div>

* Next, click on the 'Add Data' tab and select the column(s) you would like to visualize:

<div class='center'><img src="/src/Learn/Visualization/Charts/charts_columns.png" alt="Columns" width="600" /></div>

* Finally, click on the 'Draw' button to visualize your data:

<div class='center'><img src="/src/Learn/Visualization/Charts/charts_bar.png" alt="Bar diagram" width="600" /></div>


### Examples (in alphabetical order)

* Area chart:

<div class='center'><img src="/src/Learn/Visualization/Charts/charts_area.png" alt="Area" width="600" /></div>

* Bar diagram (stacked):

<div class='center'><img src="/src/Learn/Visualization/Charts/charts_bar_stacked.png" alt="Stacked" width="600" /></div>

* Box plot:

<div class='center'><img src="/src/Learn/Visualization/Charts/charts_box.png" alt="Box plot" width="600" /></div>

* Line diagram:

<div class='center'><img src="/src/Learn/Visualization/Charts/charts_line.png" alt="Line diagram" width="600" /></div>

* Pie chart:

<div class='center'><img src="/src/Learn/Visualization/Charts/charts_pie.png" alt="Pie chart" width="600" /></div>

*Tip*: The pie chart tool expects two columns giving the text label and the count value for each segment. To make a Pie chart from a column of data use the ""Count"" occurrences of each record" to make a tally table first.

* Scatter plot:

<div class='center'><img src="/src/Learn/Visualization/Charts/charts_scatter.png" alt="Scatter plot" width="600" /></div>
