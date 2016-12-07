{{> Develop/LinkBox }}

## Galaxy Architecture

For the architectural overview presented at the Galaxy Community Conference please see the following video: http://vimeo.com/82179199

## Overview

The Galaxy Framework is a set of reusable software components that can be integrated into applications, encapsulating functionality for describing generic interfaces to computational tools, building concrete interfaces for users to interact with tools, invoking those tools in various execution environments, dealing with general and tool specific dataset formats and conversions, and working with “metadata” describing datasets, tools, and their relationships. The Galaxy Application is an application built using this framework that provides access to tools through an interface (e.g., a web-based interface). A Galaxy Instance is a deployment of this application with a specific set of tools. 

The Galaxy team maintains such an instance that integrates a large set of tools for comparative genomics. 
The core components of the Galaxy Framework are 
* the toolbox
* the job manager
* the model
* the web interface

## The toolbox

manages all of the details of working with command-line and web-based computational tools. It parses Galaxy tool configuration files (for an example of such a file see [Add Tool Tutorial](/src/Admin/Tools/AddToolTutorial/index.md)) that describe the interface to a tool – the parameters and input data it can take, their types and restrictions, and the outputs it produces – in an abstract way that is not specific to any particular user interface. This abstraction is critically important since it allows for changing how tools are displayed without needing to change their configuration (e.g., to leverage new accessibility features as web browsers improve, or to provide interfaces that are not web-based). The toolbox provides support for validating inputs to a tool, and for transforming a valid set of inputs into the commands necessary to invoke that tool. Additionally, the toolbox allows tool authors to provide tests for their tools (inputs and corresponding outputs) and provides support for running those tests in the context of a particular Galaxy instance.

## The job manager

deals with the details of executing tools. It manages dependencies between jobs (invocations of tools) to ensure that required datasets have been produced without errors before a job is run. It provides support for job queuing, to allow multiple users to each submit multiple jobs to a Galaxy instance and receive a fair execution order. The underlying method for execution is “pluggable”. Currently jobs can be executed on the same machine where the Galaxy instance is running, or dispatched to a computational cluster using a standard queue manager (portable batch system [PBS] is used at https://usegalaxy.org), however other dispatch strategies can be implemented and plugged in easily. 

## The model

provides an abstract interface for working with datasets. It provides an object-oriented interface for working with dataset content (stored as files on disk) and “metadata” (data about datasets, tools, and their relationships; stored in a relational database). Beyond providing access to the data, this component deals with support for different datatypes, datatype specific metadata, and type conversions. 

## The web interface

provides support for interacting with a Galaxy instance through a web browser. It generates web-based interfaces to the toolbox (for browsing and choosing tools), individual tools (building forms to accept and validate user input to a tool), and the model (allowing the user to work with all of the datasets they have produced). The web interface is currently the primary way to interact with a Galaxy instance, but the other underlying components do not need to know anything about the web, all web specific aspects of Galaxy are encapsulated by the web interface.  Again we stress that our decision to make the web-interface the primary interface type for Galaxy was dictated by the fact that web-browsers are present on every modern computer. 

## Implementation Details

The Galaxy framework is implemented in the Python programming language. Python has several advantages for our purposes. First, it is a lightweight dynamic language that allows us to rapidly implement new Galaxy features. However, while Python is concise and easy to write, it is also a highly structured language that is generally easy to read and understand. This is important since it makes customizing and extending the Galaxy framework much easier for users. Additionally, Python has a very powerful standard library, as well as an amazing variety of third party open source components; some of the best of which we have been able to take advantage of in building Galaxy.

However, an important aspect of the Galaxy architecture is the abstraction between the framework and the underlying tools. Because the Galaxy toolbox interacts with tools through command-line and web-based interfaces, there is no requirement that a tool author must use Python (e.g., the example in [Add Tool Tutorial](/src/Admin/Tools/AddToolTutorial/index.md) uses a tool written in Perl). While Python is a powerful language for scientific computing, and many of the tools we provide for comparative genomic analysis are implemented in Python, frequently another language may suit a particular problem better, or simply be preferred by a tool author. We want Galaxy to be able to provide easy access to all useful computational tools – as long as a tool can be run through a command line or the web, Galaxy can incorporate it.

Galaxy includes its own web server and embedded relational database SQLite, and a Galaxy download includes all dependencies: a user needs to just edit the configuration file and run one command to start interacting with and customizing their own Galaxy instance. However, if a users Galaxy instance needs to support higher throughput, they can customize the web server, the underlying relational database, and the job execution mechanism. For example, the public Galaxy instance maintained by the Galaxy team at Penn State (https://usegalaxy.org) is integrated with Apache as the web-server, uses the enterprise class relational database PostgreSQL, and executes jobs on a computational cluster with a queue managed by the Slurm scheduler.
