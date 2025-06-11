---
description: "Analyse your texts, images or media content with Galaxy!"
autotoc: true
title: "Digital Humanities in Galaxy"
---

<slot name="/community/sig/common_linkbox" />

Whether you are analysing texts, images, audio data or other media, **Galaxy is here to help**!


# How can you use Galaxy for Digital Humanities analysis?

Galaxy is a flexible setup, so it can leverage analysis in Digital Humanities and Social Sciences in various ways. Due to the platform's flexibility, you can create an analysis that fits your research needs and supports you with tools for easier research data management on the go.

Here are some examples:

## Publications / Examples

    - We explored Instagram posts from the Bavarian State elections provided by the [BERD Data Portal](https://www.berd-nfdi.de/data-portal/). [Read more](https://galaxyproject.org/news/2025-05-20-berd-wf/) to see how the dataset was cleaned and mined to visualise not only the most frequent words in the post to get an idea of its contents, but also extracted and mapped where most of those posts originated in just a couple of steps in Galaxy.

    - Check out the [poster](https://doi.org/10.11588/heidok.00036288) on Galaxy in the Humanities that Daniela Schneider and Jan Leendertse presented at the [E-Science Days 2025](https://artifact.galaxyproject.org/news/2025-03-14-e-science-days/).

    - A German article from Daniela Schneider and Jan Leendertse building on this presentation is forthcoming.

    - Check out [this article](https://galaxyproject.org/news/2024-09-02-chat-gpt/) to get an example workflow of how you can automatically transcribe and translate an audio file using Galaxy.


# What is available?

To make your own analysis, start by checking out the tools (the term we use in Galaxy for programs) in your Galaxy instance, for example, [Galaxy Europe](https://usegalaxy.eu/). On the website, you can access the tools by clicking on the bar on the left-hand side. The second icon there is **tools**. You can search there or click on the arrows and search for more details in the help text.
You can combine various Galaxy tools into [workflows](https://training.galaxyproject.org/training-material/topics/galaxy-interface/tutorials/history-to-workflow/tutorial.html) to automate and re-run the analysis or [export](https://galaxyproject.org/news/2024-05-03-inveniordm-integration/) the data you created to a repository.


## Tools

This is a non-exhaustive overview of Galaxy tools applicable to Humanities and Social sciences use-cases. 

### **General tools**
    - Text cleaning tools such as text manipulation, select lines, add lines, search in text files, etc.
    
### **Text tools**
    - diff: Comparing two text documents
    - Editor: make small manual changes that will not be tracked. Find the editor on the left-hand side panel under *Visualisations*.
    - Regular Expressions: Various tools in Galaxy to help you select specific patterns from your text as explained [here](https://training.galaxyproject.org/training-material/faqs/galaxy/analysis_regular_expressions.html).
    - GPT: Large language model - this is only accessible with the OpenAI credentials. Find more information on how to set this up [here](https://galaxyproject.org/news/2024-09-02-chat-gpt/).

### **Tools for working with tabular data**
     - **Text Manipulation for tabular data**: Replace Text, Replace text in a specific column, Replace parts of text, text reformatting, Text transformation, Sort a row, reverse a file, Compute an expression, Regex replace, Subtract Whole Dataset, Merge Columns, Unique occurences, Add column, Merge Columns together, Convert delimiters to TAB, Change Case, Trim characters, Secure Hash
    - **Filter and Sort for tabular data**: Unique, Unique lines, Sort, Select random lines, Select first lines (head), Select last lines (tail), Remove beginning, Cut columns, Search in textfiles, XPath, Column arrange, Query tabular, Filter data on any column, Sort data, Select lines, Remove columns, Sort Column Order
    - **Join, Substract and Group for tabular data**: Join two files, Split file, Reverse, Transpose, Datamash, Subtract, Join two Datasets, Group data by a column
    - **Further**:  Tabular data prediction using TabPFN 

### **Audio tools**
    - Audio Player: Find the player to listen to audio files in Galaxy on the left-hand side panel under *Visualisations*.
    - Whisper: Audio to text conversion
    - FFmpeg Format Converter: Convert between video and audio formats   

### **Image tools**
    - flux: text to image conversion
    - Convert image format
    - Enhance contrast: image pre-processing
    
### **File or format conversion**
    - General tools: Tabular to CSV, CSV to Tabular, convert delimiter to TAB, 
    - markitdown: Converting documents to markdown format - for easier processing with large language models.
    - Convert image format
    - FFmpeg Format Converter: Convert between video and audio formats

### **Interactive tools**
    - OpenRefine
    - R-Studio
    - GIS
    - Jupyter Notebook

### **Visualisations**
    - general: Bar chart, Histogram, Scatterplot, Plotting tool for multiple series, Boxplot, etc.
    - Word cloud

### **Research tools**
    -  OpenAlex explorer: REsearch and fetch papers from OpenAlex using DOI or title/

### **Domain-specific tools:
    - OBO for working with ontologies

### **Work in progress**
    - WhisperX: Audio conversion including speaker diarisation
    - E-Scriptorium: Handwritten text-recognition (HTR)
    - Stanford Core NLP

If tools are missing or information is not up-to-date in the list, please help us! Contact [Daniela](mailto:schneidd@informatik.uni-freiburg.de).

## Workflows and tutorials

You can find an overview of the existing tutorials on the dedicated DH-section of the [Galaxy Training Network](https://training.galaxyproject.org/training-material/topics/digital-humanities/). Those are open educational resources (OER) that you can create from your workflows or reuse in teaching and training.

In addition to those mentioned above, we are currently working on:
- Galaxy introduction for Digital Humanities
- Using OpenRefine in Galaxy to analyse data

## Training material and events

The Galaxy community organises regularly scheduled training events. You can check the [event pages here](/events/) to get the latest ones.

## Join us

Anybody interested in Humanities and Social Sciences in Galaxy is welcome to join this community! **Everybody is Welcome!**
