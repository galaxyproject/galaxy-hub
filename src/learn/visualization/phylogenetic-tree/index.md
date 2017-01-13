---
autotoc: true
title: Phyloviz: Interactive Phylogenetic Tree Visualizer for Galaxy
---

Phyloviz is an interactive phylogenetic tree visualizer built for Galaxy to give its users a more effective way to access, manipulate, analyze and present data of phylogenetic tree data on galaxy. 

Currently, the project is in its beta-stage and is ready to be deployed to galaxy-central for testing. 


----
### Video Tutorial:

Here's a short 4.5 mins video tutorial to get you started. Link: http://www.youtube.com/watch?v=NhQO7hjuW8o&feature=youtu.be For more information, you can read the detailed guide below. 

### Step-by-Step Guide:

**Step 1:**Upload phylogenetic data to galaxy. Phyloviz It is able to work with phylogenetic tree data from Newick (.nhx), Nexus (.nex) and Phyloxml (.xml) formats. You can upload them via the Get Data > Upload File function found on the main page. Do note that for newick format you will have to choose it manually. 

**Step 2:** Launching Phyloviz. Currently phyloviz has only one entry point, which is via the “View in Phyloviz” icon that will appear for all supported phylogenetic data set. 

**Step 3:** Using Phyloviz Layout and Features. When launched phyloviz will lay out the tree in a linear format. All phylogenetic distances would be normalized to a value between 0 to 1.0 inclusive, and a default value of 250px would represent 1.0 units from a parent node to child node. The laying out of phyloviz is “in-place” meaning that the tree is presented in the same order as it is represented in the data and that no nodes are shuffled.

Phyloviz supports a number of user interaction features to help you present, analyze and share the visualization. 

----

### Features

#### Navigation:

* **Pan**: by dragging on any white space in the main canvas
* **Zoom**: Using the mouse wheel or by using the magnifying glass on the top navigation bar
* **Expand/Contract node**: By click on the node. A contracted node would be shaded
* **Changing between trees for Nexus files**: As Nexus could store different trees within the same file you can change between them using the selector on the top navigation bar

#### Searching/Editing Node:

* **Searching**: You can search for node using the following conditions: “name-containing”, “annotation-containing”, “distance-greater-than-or-equal-to”, “distance-lesser-than-or-equal-to”. Simply select the condition you want, type in a value and search. Nodes satisfying your search conditions would be highlighted in green. 
* **Editing nodes**: You can change the name, distance and add annotations to ALL the nodes within Phyloviz. To do so, first select a node using Alt-Click. Selected nodes will be highlighted in red. Next, check the “Edit” box and make the necessary changes.
  * Once you click save, the changes are instantaneous and will be reflected on the visualization.
  * Annotations are a good way to you to make quick notes would the data and share them with your colleagues. You can store any arbitrary information there including urls. 

#### Phyloviz Settings:

* Font size, vertical spacing, horizontal spacing (representing a unit evolutionary distance) could all be changed within the Phyloviz Settings interface. This can be should be spread out a tree where nodes are too close or format the tree nicely for a screenshot. 

#### Saving and Sharing:

Any visualization you create/view, or any changes you made to the tree within (eg. zoom or changing name) Phyloviz can be saved or shared. Note that searching highlights, and node selection highlight will NOT be saved. 
* **Save**: By clicking on the save button on the top right corner of the application. 
* **To access saved visualization**: Go to Visualization on the top navigation bar > Click Saved Visualization. From the same page, you can also set up sharing options with other users or to share it with the public.

Alright, that’s the end of the tutorial! Enjoy Phyloviz and let me know how it goes. 

----

### Trouble-shooting:

* **Sniffing Newick**:  Due to the looseness of the newick format, Galaxy will not be able to sniff and identify this format automatically. Hence you will have to choose the Newick file format during upload. In the case that the icon does not appear, you can manually by clicking the pencil icon on the top left corner of the history item box > Goto Data type and change the name.
* **Illegal characters**: The characters single-quote(‘), double-quote(“) and backslash (\) is disallowed because they interfere with data parsing via the .json format. Hence, these characters within your data files will be removed.
* **Large Trees**: Phyloviz supports the visualization of trees up to 1000 nodes without any performance issue on modern day computers and browsers. For larger trees, Phyloviz will still attempt to display it but the performance will degrade. 
* **Testing**: Phyloviz has been tested against Chrome, Firefox and Safari, and against 18 different real phylogenetic datasets from all 3 datatypes. 

**For support and help on Phyloviz**:
You can email the galaxy developer mailing list with the title “Phyloviz - {topic}”
