---
title: 'LLM Hub: Large Language Models Made Easy in Galaxy'
date: '2025-09-10'
tease: "Access powerful Large Language Models in Galaxy easily"
hide_tease: false
authors: Arash Kadkhodaei
subsites: [global,eu,us,freiburg]
tags: [tool,AI,LLM]
---

## LLM Hub: Large Language Models Made Easy in Galaxy

Large Language Models (LLMs) are transforming research, helping with tasks from summarizing papers to analyzing complex text. But setting them up can be tricky—API keys, subscriptions, and technical knowledge can get in the way.  

[LLM Hub](https://usegalaxy.eu/?tool_id=llm_hub) changes that. It brings powerful LLMs directly into Galaxy, so you can use them like any other Galaxy tool—securely, privately, and without extra setup. Your data stays protected on the University of Freiburg’s servers and is never permanently stored.  

## Available Models

LLM Hub offers a selection of models for different needs. All are hosted at the University of Freiburg, and more will be added over time.
Have a model to suggest? Reach out to [contact@usegalaxy.eu](mailto:contact@usegalaxy.eu).  

### Text Models

| Model | Provider | Description |
|-------|----------|-------------|
| **GPT-OSS-120B** | OpenAI | Best suited for complex tasks, deep reasoning, and detailed outputs |
| **GPT-OSS-20B** | OpenAI | Smooth for straightforward Q&A or text generation, efficient on small servers |
| **Qwen3-30B-A3B** | Alibaba Cloud | Strong all-rounder for technical tasks, coding, and long structured outputs |
| **DeepSeek-R1-0528-Qwen3-8B** | DeepSeek | Fast and efficient for general reasoning and straightforward problem-solving |
| **Meta-Llama-3.1-8B-Instruct** | Meta AI | Lightweight and responsive, suitable for simpler tasks and fast prompt execution |
| **Mistral-Small-3.2-24B** | Mistral AI | Balanced accuracy and speed, good for drafting documents and structured outputs |
| **Magistral-Small** | Mistral AI | Quick and lightweight text generation, best when speed and cost matter most |

### Multimodal Models

| Model | Provider | Description |
|-------|----------|-------------|
| **Gemma-3-12B** | Google DeepMind | Handles text and images, great for describing photos, diagrams, or screenshots |
| **Qwen2.5-VL-7B** | Alibaba Cloud | Efficient at understanding images and extracting info from charts, UIs, or screenshots |

### Image Models

| Model | Provider | Description |
|-------|----------|-------------|
| **NuMarkdown-8B-Thinking** | NuMind | Advanced OCR and document understanding, excels at extracting structured data from scanned images |

## Key Features

- **Multiple Input Types:** Text files (TXT, HTML, JSON), images (JPG, PNG, GIF, TIFF, BMP), or both.  
- **Workflow Integration:** Combine LLM Hub with other Galaxy tools for reproducible pipelines.  

### Use Cases

- Summarize documents or research papers  
- Extract information from unstructured text  
- Translate between languages  
- Analyze sentiment in social media data  
- Extract text from scanned documents (OCR) or Excel screenshots 😱
- Process screenshots, images, or scanned documents  

## Getting Started

Using LLM Hub is straightforward:
 <a href="https://usegalaxy.eu/root?tool_id=llm_hub"><button type="button" class="btn btn-success">Click to try LLM Hub on Galaxy Europe!</button></a>

1. **Select your model type** based on your input data (text, image, or multimodal)
2. **Choose the appropriate model** for your task complexity and requirements
3. **Upload your context data** (optional) - this can be text files, images, or both. Click on the icon "Upload" on the left panel and select what you want to upload. When the item in your history turns green, it is ready to go.
4. **Enter your prompt** describing the task you want the LLM to perform
5. **Run the tool** and receive your results in Markdown format


## Behind the Scenes

LLM Hub communicates with a LiteLLM proxy server hosted by [University of Freiburg’s computing center (RZ)](https://www.rz.uni-freiburg.de/en).

## Try It Now

LLM Hub is available on [Galaxy Europe](https://usegalaxy.eu). Whether you're analyzing research data, processing documents, or exploring the capabilities of modern AI, LLM Hub provides the tools you need without the traditional barriers to entry.

<a href="https://usegalaxy.eu/root?tool_id=llm_hub"><button type="button" class="btn btn-success">Try LLM Hub on Galaxy Europe!</button></a>
