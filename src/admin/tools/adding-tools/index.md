# Creating a histogram tool tutorial.

See also the general [ tutorial for adding custom tools](/src/admin/tools/add-tool-tutorial/index.md).

## Introduction

You can think of Galaxy as a web-based framework that allows you to run programs while providing an interface to collect data, select the inputs and parameters, execute processes in the background, save and annotate the results that are produced.

The most important feature from a developer's perspective is that __everything__ that galaxy shows and runs can be __controlled externally__ and no knowledge about the internals of the system are necessary to deploy a tool.

To demonstrate this we'll walk you through the steps of creating a histogram tool, one that generates a histogram based on the values in a text file. First of all you'll need a program that can create histograms of the kind that you need. Let's say this program is called  **histogram** and to create a histogram on column 2 and with 10 bins you would need to run it as:

```
histogram -input=genes.bed -col=2 -bins=10 -output=image.png
```


The actual calling sequence for the program may simpler or a lot more complicated, it does not matter as long as the command can be run from a command line, Galaxy can do it for you too. 

## How Galaxy displays the tools

To deploy this tool one needs to inform Galaxy about it. This is accomplished by listing it in the main tool configuration file called **tool_conf.xml** found in the main server directory. The contents of this file shown on the left will instruct Galaxy to generate the HTML shown on the right with the Statistics tab expanded:

```html
<img src="http://www.bx.psu.edu/trac/local/tut_img1.png"align="right">
```

```
<?xml version="1.0"?>
<toolbox>
    <section name="Data Sources" id="source100">
        <tool file="data_source/upload.xml"/>
    </section>

     <section name="Statistics" id="stat1">
        <tool file="plotting/histogram.xml"/>
        <tool file="plotting/scatter.xml"/>
    </section>

     <section name="Operations on genomic intervals" id="genome1">
        <tool file="operations/complement.xml"/>
        <tool file="operations/restrict.xml"/>
    </section>

</toolbox>
```


Each of the section tags corresponds to a section displayed by Galaxy. Within each section each tool entry points to another xml file that contains the tool specification. In the file above note the line `<tool file="plotting/histogram.xml"/>`. This is the individual tool configuration file that is needed to define how the tool is displayed and how it behaves. This file needs to be located in the `tools/plotting` directory relative to the server root while the content of this file could be the following:

```
<tool id="Histogram1" name="Histogram">
  
    <description>for any numeric column</description>
  
    <command>
        histogram -input=$input_data -col=$col -bins=$bins -output=$output_data
    </command>
    
    <inputs>    
       <param name="input_data"   type="data" format="text" label="Select Query" />    
       <param name="col" size="4" type="integer" value="5" label="Column to plot" />    
       <param name="bins" size="4" type="integer" value="10" label="Number of bins" />
   </inputs>
  
   <outputs>  
       <data format="png" name="output_data" />
   </outputs>
 
 <help>
This tool builds a simple histogram for a given data column using a specified number of bins:

----

**Syntax**

- **Column to plot** is an integer. The first column is **1**
- **Number of bins** is an integer between 1 and 99

----

**Example**

.. image:: static/images/histogram.png

</help>
</tool>
```

Here is the net result (displayed in the middle frame when the tool is clicked) of this configuration file. The example above is fairly complex since it also contains nicely formatted (but optional) help information that can be deployed with the tool.

```html
<p align="center"><img src="http://www.bx.psu.edu/trac/local/tut_img2.png" align="center"></p>
```


Note how the HTML parameters listed within the `inputs` tag of the XML above generated their corresponding HTML counterparts. The contents of the `<command>` tag will be invoked when the `Execute` button is pressed. The actual values collected from the inputs will be substituted into the command line and executed (**Note:** due to security reasons shell metacharacters will be filtered out and will not be passed down into the command line).


## Advanced Topics

This was just a high level summary of what Galaxy can do; many usage scenarios may be much more complex. **Galaxy** has built-in support for:

* **parameter validation** that checks that parameters conform to requirements: integer, float, regular expression match etc. and produces graceful error messages pointing to the error
* Custom code execution at various time points of the workflow that allows a fine grained control over the execution process 
* Data deposit protocols for connecting to data repositories
* **multi-page parameter selection** for tools that allow subsequent options to depend on previously selected ones

We'll be adding documentation for these, in the meantime check the `tools` folder in the server directory containing **hundreds** of examples.
