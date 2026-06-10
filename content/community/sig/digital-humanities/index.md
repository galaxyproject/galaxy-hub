---
description: "Analyse your texts, images or media content with Galaxy!"
title: "Digital Humanities and Social Sciences in Galaxy"
---

<slot name="/community/sig/common_linkbox" />

Whether you are analysing texts, images, audio data or other media, **Galaxy is here to help**!


# How can you use Galaxy for Digital Humanities analysis?

Galaxy is a flexible platform that enables analysis in Digital Humanities (DH) and the Social Sciences in various ways. Due to the platform's flexibility, you can create an analysis that meets your research needs and provides tools for easier management of research data on the go. Simply visit the Galaxy instance of your choice, such as the [European Galaxy Server](https://usegalaxy.eu/), create an account, and get started.

Here are some examples:

## 📄 Publications / Examples

### Posters and Articles

- See the [poster](https://zenodo.org/records/17016028) on how Galaxy can help researchers in Digital Humanities and Social Sciences presented at the [Historikertag 2025](https://www.historikertag.de/Bonn2025/).
  
- Check out the [poster](https://doi.org/10.11588/heidok.00036288) on Galaxy in the Humanities that Daniela Schneider and Jan Leendertse presented at the [E-Science Days 2025](https://artifact.galaxyproject.org/news/2025-03-14-e-science-days/).
  
- [Read](https://doi.org/10.11588/heibooks.1652.c23955) the German article from Daniela Schneider and Jan Leendertse, building on the above poster. It explains Galaxy's applicability to Humanities and Social Sciences research within a reproducible research environment.

### Blog posts concerning the Humanities and Social Sciences

Looking for more inspiration and use-cases for Galaxy in the arts, Humanities and Social Sciences?

Find a list of our blogposts [on the Galaxy Hub](https://galaxyproject.org/tags/humanities/)!

# What is available

Unsure where to start your own Galaxy journey? Maybe you want to check out some tutorials or see what tools you can access in Galaxy?

## 🎓 Workflows and training materials

Try the [Galaxy Training Network](https://training.galaxyproject.org/training-material/topics/digital-humanities/) and see how others use Galaxy. If you have never worked with Galaxy before, we recommend starting with our [Introduction to Digital Humanities in Galaxy](https://gxy.io/GTN:T00557). If you want to learn more about Galaxy and Research Data Management, check out [this tutorial](https://gxy.io/GTN:T00575).

Are you already familiar with Galaxy? Try one of our other tutorials or consider creating one from your workflows for teaching and training. Documentation for providing further tutorials can be accessed [here](https://training.galaxyproject.org/training-material/topics/contributing/). We welcome new contributions!

<iframe
  src="https://training.galaxyproject.org/training-material/tags/digital-humanities/embed.html"
  height="400px"
  width="100%"
  class="gtn-embed"
  frameborder="0">
</iframe>


## Tools

To conduct your own analysis, start by exploring the tools (the term we use in Galaxy for programs) in your Galaxy instance, such as [Galaxy Europe](https://usegalaxy.eu/). On the website, you can access the tools by clicking on the bar on the left-hand side. The second icon there is **tools**. You can search there, or click the arrows to find more details in the help text.
You can combine various Galaxy tools into [workflows](https://gxy.io/GTN:T00151) to automate and re-run the analysis or [export](https://galaxyproject.org/news/2024-05-03-inveniordm-integration/) the data you created to a repository.

The following is a non-exhaustive overview of Galaxy tools applicable to Humanities and social sciences use cases. You can find the tools by going to a Galaxy instance, for example, the [European Galaxy Server](https://usegalaxy.eu/), and clicking "Tools" in the left-hand sidebar. There, you can search the tools by name or browse them by category. 

### 📥 **Uploading/accessing data**
You can upload your files in various ways in the upload section on the left sidebar of the Galaxy website.

- If you have larger amounts of data, check out this tutorial to [Bring Your Own Data](https://training.galaxyproject.org/training-material/faqs/galaxy/manage_your_repositories.html).
- You can access repositories like the [BERD Data Portal](https://galaxyproject.org/news/2025-04-09-berd-integration/), [Dataverse](https://galaxyproject.org/news/2026-01-15-dataverse/) or Zenodo directly from within Galaxy.
- You can access HuggingFace directly from within Galaxy - click [here](https://galaxyproject.org/news/2026-01-07-hf-integration/) to read how.

### 🛠️ **General tools**
- Text cleaning tools such as text manipulation, select lines, add lines, search in text files, Line/Word/Character count, etc.
- Text file format converters (dos2unix): Convert text files with DOS or Mac line breaks to Unix line breaks and other text cleaning options.
- Concatenate multiple datasets tail-to-head while specifying how: Join multiple single files into one bigger file based on your needs.
    
### 📖 **Text tools**
- diff: Comparing two text documents
- Editor: make manual changes that will not be tracked. Find the editor on the left-hand side panel under *Visualisations*.
- Regular Expressions: Various tools in Galaxy to help you select specific patterns from your text, as explained [here](https://training.galaxyproject.org/training-material/faqs/galaxy/analysis_regular_expressions.html).
- LLM Hub: Run various locally hosted LLMs within your workflows.
- GPT: Large language model - this is only accessible with the OpenAI credentials. Find more information on how to set this up [here](https://galaxyproject.org/news/2024-09-02-chat-gpt/).

#### **Natural Language Processing (NLP) Tools**
- Vader: Performs sentiment analysis using VADER (Valence Aware Dictionary and sEntiment Reasoner)in text.
- Co-occurrence Analysis: Computes term co-occurrence from NLP-annotated JSON output produced by the spaCy or Stanza Galaxy tools.

### **Tools for working with tabular data**
- **Text Manipulation for tabular data**: Replace Text, Replace text in a specific column, Replace parts of text, text reformatting, Text transformation, Sort a row, reverse a file, Compute an expression, Regex replace, Subtract Whole Dataset, Merge Columns, Unique occurences, Add column, Merge Columns together, Convert delimiters to TAB, Change Case, Trim characters, Secure Hash
- **Filter and Sort for tabular data**: Unique, Unique lines, Sort, Select random lines, Select first lines (head), Select last lines (tail), Remove beginning, Cut columns, Search in textfiles, XPath, Column arrange, Query tabular, Filter data on any column, Sort data, Select lines, Remove columns, Sort Column Order
- **Join, Subtract and Group for tabular data**: Join two files, Split file, Reverse, Transpose, Datamash, Subtract, Join two Datasets, Group data by a column
- **Further**:  Tabular data prediction using TabPFN,  Cleanlab Issue Handler to detect and optionally clean data issues,  SaQC for quality control

### 🔊**Audio tools**
- Audio Player: Find the player to listen to audio files in Galaxy on the left-hand side panel under *Visualisations*.
- [Whisper](https://galaxyproject.org/news/2024-04-25-whisper-tool/): Audio to text conversion
- WhisperX: Audio conversion including speaker diarisation
- FFmpeg Format Converter: Convert between video and audio formats   

### 🎞️ **Image  and video tools**
- Tesseract: Optical Character Recognition (OCR). You can see an example workflow using Tesseract to transcribe a German newspaper in [this video](https://usegalaxy.eu/static/share/OCR.mp4)
- [flux](https://galaxyproject.org/news/2024-11-26-flux/): text to image conversion
- Convert image format (including extracting images from a PDF)
- PDFimages: Extract images from a PDF file
- Enhance contrast: image pre-processing
- Convert coordinates to label map: converts a GeoJSON of an image with rectangles to a label image (or binary image) for later cropping - see this [example workflow](https://galaxyproject.org/news/2026-01-07-hf-integration/) to learn more.
- Crop image: for cutting images
- jdeskew: estimates and corrects the skew angle of a document image - used for image pre-processing.
- Image annotator: Annotate your images manually in Galaxy on the left-hand side panel under *Visualisations*.
- Tiff viewer: View TIFF files in Galaxy on the left-hand side panel under *Visualisations*.
- Video player: View video files in Galaxy on the left-hand side panel under *Visualisations*.
- Yolo DocLayout: Document layout analysis - click [here](https://galaxyproject.org/news/2026-01-07-hf-integration/) for an example workflow.
- LLM Hub: Run various locally hosted LLMs within your workflows.
- File Format Identification: Check multimedia files for corrupt or duplicated files
    
### 🔃 **File or format conversion**
- General tools: Tabular to CSV, CSV to Tabular, convert delimiter to TAB, 
- markitdown: Converting documents to markdown format - for easier processing with large language models.
- Convert image format
- PDFimages to extract images from PDFs
- FFmpeg Format Converter: Convert between video and audio formats
- Excel to Tabular: Extract a specific sheet (by name) or all sheets from XLS/XLSX file to a tabular file


### 👩‍💻 **Interactive tools**
- OpenRefine: data cleaning and enrichment - for example, with the Gemeinsame Normdatei (translated as Integrated Authority File) or GND as explained [here](https://blog.lobid.org/2018/08/27/openrefine.html).
- R-Studio
- QGIS
- Jupyter Notebook

### 📊 **Visualisations**
- general: Bar chart, Histogram, Scatterplot, Plotting tool for multiple series, Boxplot, etc.
- Word cloud
- OpenLayers map: Visualise locations on a map with GeoJSON
    
### 🔍 **Research tools**
-  OpenAlex explorer: Research and fetch papers from OpenAlex using DOI or title
-   GROBID DataStet: Identify dataset mentions in scientific articles
-  GROBID: Extract structured TEI XML from scholarly documents and patents
    
### 🤖 **AI and Machine Learning tools**
- [flux](https://galaxyproject.org/news/2024-11-26-flux/): text to image conversion
- [Whisper](https://galaxyproject.org/news/2024-04-25-whisper-tool/): Audio to text conversion
- LLM Hub: Run various AI models hosted by the Freiburg Compute Center (RZ) without any API keys. Interested? Read [here](https://galaxyproject.org/news/2025-10-10-llm-hub/) on how to set this up. 
- GPT: Large language model - this is only accessible with the OpenAI credentials. Find more information on how to set this up [here](https://galaxyproject.org/news/2024-09-02-chat-gpt/).
- TabPFN: Tabular data prediction
- [Cleanlab](https://galaxyproject.org/news/2025-06-13-cleanlab/): Identifies label issues in Machine Learning datasets
- Yolo DocLayout: Document layout analysis - click [here](https://galaxyproject.org/news/2026-01-07-hf-integration/) for an example workflow.

### **Domain-specific tools**
- [ONTO-ToolKit](https://doi.org/10.1186/1471-2105-11-S12-S8) working with OBO files for ontologies

### 📤 **Export your data**
Galaxy lets you share your data in various ways if you prefer. Once you have set your credentials, the tool [Export datasets
to repositories](https://usegalaxy.eu/root?tool_id=export_remote) allows you to directly export your analysis results to the repositories of your choice, such as Zenodo. Check out our [example video](https://usegalaxy.eu/static/share/OCR.mp4) to see what this could look like.

### 🏗️ **Work in progress**
- E-Scriptorium: Handwritten text-recognition (HTR)
- Stanford Core NLP: Natural language processing tool
- New Fave
- Montreal Forced Aligner (MFA)

If tools are missing or the list is outdated, please let us know. We are available via this [Matrix Channel](https://matrix.to/#/#galaxyproject-digital-humanities:matrix.org)

##  🏛️ Upcoming events

The Galaxy community organises regularly scheduled training events. You can check the [event pages here](/events/) for the latest events.

## Join us

Anybody interested in Digital Humanities and Social Sciences in Galaxy is welcome to join this community! **Join our Matrix Channel [here](https://matrix.to/#/#galaxyproject-digital-humanities:matrix.org)**
