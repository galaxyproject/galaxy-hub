---
title: New Paper "Tool recommender system in Galaxy using deep learning"
date: '2021-01-11'
tease: by  Anup Kumar, Helena Rasche, Björn Grüning, Rolf Backofen in GigaScience
doi: 10.1093/gigascience/giaa152
tags: [paper]
subsites: [eu, freiburg, global, us]
main_subsite: freiburg
---


_Abstract_ - Galaxy is a web-based and open-source scientific data-processing platform. Researchers compose pipelines in Galaxy to analyse scientific data.
These pipelines, also known as workflows, can be complex and difficult to create from thousands of tools, especially for researchers new to Galaxy.
To help researchers with creating workflows, a system is developed to recommend tools that can facilitate further data analysis.

__Findings__
A model is developed to recommend tools using a deep learning approach by analysing workflows composed by researchers on the European Galaxy server.
The higher-order dependencies in workflows, represented as directed acyclic graphs, are learned by training a gated recurrent units neural network, a variant of a recurrent neural network. 
In the neural network training, the weights of tools used are derived from their usage frequencies over time and the sequences of tools are uniformly sampled from training data. Hyperparameters of the neural network are optimized using Bayesian optimization. Mean accuracy of 98% in recommending tools is achieved for the top-1 metric.

__Conclusions__
The model is accessed by a Galaxy API to provide researchers with recommended tools in an interactive manner using multiple user interface integrations on the European Galaxy server. 
High-quality and highly used tools are shown at the top of the recommendations. 
The scripts and data to create the recommendation system are available under MIT license at https://github.com/anuprulez/galaxy_tool_recommendation.

_Core mechanism_

![Workflow](https://github.com/anuprulez/issues/raw/master/core_mechanism.png)

An example workflow consisting of 5 different tools (a) is decomposed into multiple tool sequences (b–d). Each tool sequence shows higher-order dependencies where a tool is dependent on all of its prior tools. These dependencies are indicated by the dashed arrows.

_How to use tool recommender_

__After running a tool__

![tool execution](https://github.com/anuprulez/issues/raw/master/tool-exe.gif)

__Workflow editor__

![workflow editor](https://github.com/anuprulez/issues/raw/master/wf-exe.gif)

<br>
{% twitter https://twitter.com/musafirtweetsz/status/1347103855247560704 %}
