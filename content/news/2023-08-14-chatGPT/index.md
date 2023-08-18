---
title: "ChatGPT in Galaxy via Jupyter notebooks"
date: "2023-08-14"
authors: Anup Kumar
tease: "Use ChatGPT in Galaxy Europe via JupyterLab interactive tool."
hide_tease: true
subsites: [all-eu,global]
---

### Generative AI (ChatGPT) as a programming assitant

Many generative AI models by [OpenAI](https://openai.com/) are now accessible via a [UI plugin](https://github.com/jupyterlab/jupyter-ai) in the GPU-enabled JupyterLab interactive tool on Galaxy Europe. These AI models from OpenAI have been trained on an enormous amount of text that provides reasonable answers to queries - from literature to programming. In several ways, models such as ChatGPT can assist programmers in generating a backbone of general-purpose code blocks and methods, finding errors in code or developing explanations of already written code or existing errors, and for many different purposes. 

### Usage

![Jupyternaut 3](./chatgpt_3.png) 

By clicking on "chat" icon in the (bottom) left panel of JupyterLab, "Jupyternaut" programming assistant can be configured. It asks to choose a "language model" (an LLM). (Optionally) Further, an "embedding" model can be selected to make the assistant learn about the local file structures - files inside JupyterLab. User must provide their OpenAI access token to get responses to their queries. These tokens are for personal use and are NOT saved inside Galaxy. Refer to the above image. 

The Jupyternaut panel provides a chatbox for writing questions. When a query is submitted, an API call is made to the chosen OpenAI model and responses are shown in the same panel. Refer to the following two images.

![Jupyternaut 1](./chatgpt_1.png)

Follow-up queries can also be made: 


![Jupyternaut 2](./chatgpt_2.png)

Another way to use ChatGPT is from inside a notebook using the "magic command" `%%ai`, see the next images to get an idea

![ChatGPT in a notebook](./chatgpt_4.png)


### How to access on Galaxy Europe:

1. If you do not have already, please apply for using GPU JupyterLab via http://usegalaxy.eu/gpu-request.
2. Acquire an OpenAI access token by creating an [OpenAI](https://openai.com/) account. It should be noted that using OpenAI models requires a premium/paid account from OpenAI.
3. Go to [GPU JupyterLab tool](https://usegalaxy.eu/?tool_id=interactive_tool_ml_jupyter_notebook&version=0.2) in Galaxy Europe.
4. Open the JupyterLab and click the "chat" icon at the bottom of the left panel. Choose the model you want to use and provide an OpenAI access token. It gives a chatbox to write questions. Refer to images 1 and 2.
5. Creating a regular notebook is another way to use these models. Type the following commands in the same order in a notebook:

    a. `%load_ext jupyter_ai`
 
    b. `%env OPENAI_API_KEY=<<use your OpenAI Key>>`
 
    c. `%%ai chatgpt`

    d. `Write a program for plotting heatmap using matplotlib`

6. An example is provided at `/notebooks/test-Generative-AI.ipynb` inside the notebook. 

For further examples and details see the [Jupyter AI page](https://jupyter-ai.readthedocs.io/en/latest/users/index.html).
