---
pagetitle: Visualization with Charts
---


*Galaxy Charts* enables you to visualize tabular datasets using bar diagrams, pie charts, scatterplots and other chart types. *Charts* is enabled on the test instance, but not by default on local instances. If you are running a local instance and would like to use *Charts*, please enable the visualization plugins as described here: [/VisualizationsRegistry](/VisualizationsRegistry). Certain chart types like e.g. histograms and box plots, pre-process data before rendering the visualization. The pre-processing is done by the *Charts* processing tool available [here](http://toolshed.g2.bx.psu.edu/view/guerler/charts). Noteworthy, many chart types like e.g. bar diagrams and scatterplots, do not require data pre-processing.

### Why Charts?

* Fast, interactive visualization for tabular datasets using only a web browser.
* Explore your data with a variety of chart types.
* Visualize any Galaxy dataset easily without downloading or sending it to a remote server.
* Process your data to create box plots and histograms.

### Getting Started

* Select a tabular dataset from the history panel.
* Click on the **Visualize** icon and select **Charts**.
* Now, you should see the *Charts* front panel, where you may select a title and a chart type:
<div class='center'>![Main panel](/charts_main.png)</div>

* Next, click on the 'Add Data' tab and select the column(s) you would like to visualize:
<div class='center'>![Columns](/charts_columns.png)</div>

* Finally, click on the 'Draw' button to visualize your data:
<div class='center'>![Bar diagram](/charts_bar.png)</div>


### Examples (in alphabetical order)

* Area chart:
<div class='center'>![Area](/charts_area.png)</div>

* Bar diagram (stacked):
<div class='center'>![Stacked](/charts_bar_stacked.png )</div>

* Box plot:
<div class='center'>![Box plot](/charts_box.png )</div>

* Line diagram:
<div class='center'>![Line diagram](/charts_line.png )</div>

* Pie chart:
<div class='center'>![Pie chart](/charts_pie.png )</div>

*Tip*: The pie chart tool expects two columns giving the text label and the count value for each segment. To make a Pie chart from a column of data use the ""Count"" occurrences of each record" to make a tally table first.

* Scatter plot:
<div class='center'>![Scatter plot](/charts_scatter.png)</div>
