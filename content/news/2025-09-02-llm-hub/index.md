---
title: 'LLM Hub: Accessible Large Language Models for Everyone'
date: '2025-09-02'
tease: "Access powerful Large Language Models in Galaxy without API keys"
hide_tease: false
authors: Arash Kadkhodaei
subsites: [global, eu, us, freiburg]
tags: [tool, AI, LLM]
---

## LLM Hub: Accessible Large Language Models for Everyone

Large Language Models (LLMs) have revolutionized how we process and analyze text data, offering powerful capabilities for tasks ranging from content generation to complex reasoning. However, accessing these models often requires API keys, payment setups, and technical expertise that can be barriers for many researchers. Today, we're excited to introduce [LLM Hub](https://usegalaxy.eu/?tool_id=llm_hub) - a tool that makes powerful AI models accessible to everyone.

When you use LLM Hub, your data is processed like any other Galaxy job—securely and privately—at the University of Freiburg's compute center, using encrypted connections, without permanently storing inputs or outputs, and fully protected within Galaxy's established privacy framework in compliance with European data protection standards.

## Available Models

LLM Hub offers access to a carefully curated selection of models, each optimized for different use cases. These models are currently hosted at the University of Freiburg and represent our initial offering.
This collection may expand in the future with additional models from various providers.

If you have a community model you'd like us to consider adding, contact [contact@usegalaxy.eu](mailto:contact@usegalaxy.eu).


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
| **Gemma-3-12B** | Google DeepMind | Handles text + images, great for describing photos, diagrams, or screenshots |
| **Qwen2.5-VL-7B** | Alibaba Cloud | Budget-friendly image understanding, extract info from charts, UIs, or screenshots |

### Image Models

| Model | Provider | Description |
|-------|----------|-------------|
| **NuMarkdown-8B-Thinking** | NuMind | Advanced OCR and document understanding, excels at extracting structured data from scanned images |

## Key Features

### Multiple Input Types
LLM Hub supports various input formats depending on the model type:
- **Text files** (TXT, HTML, JSON) for text-based analysis
- **Images** (JPG, PNG, GIF, TIFF, BMP) for visual understanding
- **Combined inputs** for multimodal analysis

### Workflow Integration
As with all Galaxy tools, LLM Hub seamlessly integrates into larger analytical workflows. You can:
- Process data with other Galaxy tools before LLM analysis
- Use LLM outputs as inputs for downstream analysis
- Create reproducible workflows combining traditional data processing with AI capabilities
- Share complete analytical pipelines with colleagues

### Use Cases

The versatility of LLM Hub makes it suitable for numerous research applications:

**Text Analysis & Processing:**
- Summarize research papers or documents
- Extract key information from unstructured text
- Translate content between languages
- Perform sentiment analysis on social media data
- Generate structured data from free-form text

**Image & Document Analysis:**
- Extract text from scanned documents (OCR) or Excel screenshots 😱
- Describe scientific images or experimental results
- Process screenshots of interfaces or applications

## Getting Started

Using LLM Hub is straightforward:

1. **Select your model type** based on your input data (text, image, or multimodal)
2. **Choose the appropriate model** for your task complexity and requirements
3. **Upload your context data** (optional) - this can be text files, images, or both
4. **Enter your prompt** describing the task you want the LLM to perform
5. **Run the tool** and receive your results in Markdown format

The tool's intelligent interface guides you through the selection process, ensuring you choose the right model for your specific needs.

## Technical Implementation

LLM Hub is powered by a LiteLLM proxy server hosted at [the University of Freiburg's computing center (RZ)](https://www.rz.uni-freiburg.de/en).

## Try It Now

LLM Hub is available immediately on [Galaxy Europe](https://usegalaxy.eu). Whether you're analyzing research data, processing documents, or exploring the capabilities of modern AI, LLM Hub provides the tools you need without the traditional barriers to entry.

<a href="https://usegalaxy.eu/root?tool_id=llm_hub"><button type="button" class="btn btn-success">Try LLM Hub on Galaxy Europe!</button></a>

Experience the power of large language models integrated into your scientific workflows - no API keys required, no payment setup needed, just powerful AI capabilities at your fingertips.
