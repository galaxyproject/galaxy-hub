---
title: 'LLM Hub: Large Language Models Made Easy in Galaxy'
date: '2025-10-10'
tease: "Access powerful Large Language Models in Galaxy easily"
hide_tease: false
subsites: [global,eu,us,freiburg]
tags: [tools, ai, llm]
contributions:
  authorship:
    - arash77
---

> **Update (November 2026):** LLM Hub can now also turn speech into text or subtitles, and answer yes/no, choice and score questions about a text. Models now come from two academic providers: the University of Freiburg and e-INFRA CZ. This post has been updated to match.

## LLM Hub: Large Language Models Made Easy in Galaxy

Large Language Models (LLMs) are transforming research, helping with tasks from summarizing papers to analyzing complex text. But setting them up can be tricky—API keys, subscriptions, and technical knowledge can get in the way.  

[LLM Hub](https://usegalaxy.eu/?tool_id=llm_hub) changes that. It brings powerful LLMs directly into Galaxy, so you can use them like any other Galaxy tool—securely, privately, and without extra setup. Your data is processed on academic servers instead of commercial AI services: at the University of Freiburg, where it is never permanently stored, or in the data centers of e-INFRA CZ, which does not use it to train models.  

## Available Models

LLM Hub offers models for different needs, hosted by the [University of Freiburg’s computing center (RZ)](https://www.rz.uni-freiburg.de/en) and by [e-INFRA CZ](https://www.e-infra.cz/en), the Czech national e-infrastructure for research. Each model in the tool shows its provider in square brackets, for example `[uni-freiburg]` or `[e-INFRA CZ]`.

New models are added regularly, so the tool form always has the current list.
Have a model to suggest? Reach out to [contact@usegalaxy.eu](mailto:contact@usegalaxy.eu).  

| Model type | Input | What it is good for |
|------------|-------|---------------------|
| **Multimodal** | Text, an image, or both | Most tasks: questions about documents, describing photos, diagrams or screenshots |
| **Text** | Text | Long or complex text tasks, reasoning and coding |
| **Image** | An image | OCR and document understanding, extracting structured data from scanned pages |
| **Audio** | A recording | Speech to text, as plain text or as subtitles (SRT or WebVTT) |
| **Decision** | Text | Yes/no, choice and score answers to your questions, with probabilities |

### Speech to Text

Upload a recording (WAV, MP3, OGG, FLAC or M4A), choose an audio model and get the transcript back. Set the spoken language as a two-letter code such as `en` or `de`, or leave it empty to detect it.
For subtitles, choose SRT or WebVTT and a model that returns timestamps, such as Whisper. The description of each model tells you which languages it supports.

### Decision Models

Sometimes you don't need a long answer, just a decision you can count on. Decision models answer your questions about a text in one of three ways:

- **Yes or no**, with the probability of yes
- **One of several options** that you define, for example `degraded`, `contaminated` or `none`
- **A score from 0 to 1**, where you say what 0 and 1 mean

You can ask several questions at once. The answers come back as JSON, so they are easy to filter or count in the next step of a workflow. For example, we asked three questions about two RNA quality control records:

| Sample | Usable? (probability of yes) | Main issue | Quality (0 unusable, 1 perfect) |
|---|---|---|---|
| RIN 4.1, smear on the gel | 0.01 | degradation | 0.002 |
| RIN 9.4, two sharp bands | 0.996 | none | 0.999 |

Decision models are fast, so they work well for checking, sorting or flagging many records: run the tool over a collection, and you get one answer file per record.

## Key Features

- **Multiple Input Types:** Text files (TXT, HTML, JSON), images (JPG, PNG, GIF, TIFF, BMP), audio (WAV, MP3, OGG, FLAC, M4A), or text and an image together.  
- **Workflow Integration:** Combine LLM Hub with other Galaxy tools for reproducible pipelines.  

### Use Cases

- Summarize documents or research papers  
- Extract information from unstructured text  
- Translate between languages  
- Analyze sentiment in social media data  
- Extract text from scanned documents (OCR) or Excel screenshots 😱
- Process screenshots, images, or scanned documents  
- Transcribe interviews or lectures, and make subtitles for videos  
- Classify or score many texts with the same questions  

## Getting Started

Using LLM Hub is straightforward:
 <a href="https://usegalaxy.eu/root?tool_id=llm_hub"><button type="button" class="btn btn-success">Click to try LLM Hub on Galaxy Europe!</button></a>

1. **Select your model type** based on your input data and task (multimodal, text, image, audio or decision)
2. **Choose the appropriate model** for your task complexity and requirements
3. **Upload your data** - text files, images or a recording, depending on the model type. Click on the icon "Upload" on the left panel and select what you want to upload. When the item in your history turns green, it is ready to go.
4. **Enter your prompt** describing the task you want the LLM to perform, or, for decision models, your questions
5. **Run the tool** and receive your results: Markdown for prompts, text or subtitles for audio, and JSON for decisions


## Behind the Scenes

LLM Hub talks to the models through [LiteLLM](https://docs.litellm.ai/), using a proxy server hosted by [University of Freiburg’s computing center (RZ)](https://www.rz.uni-freiburg.de/en) and the AI service of [e-INFRA CZ](https://www.e-infra.cz/en).

## Try It Now

LLM Hub is available on [Galaxy Europe](https://usegalaxy.eu). Whether you're analyzing research data, processing documents, or exploring the capabilities of modern AI, LLM Hub provides the tools you need without the traditional barriers to entry.

<a href="https://usegalaxy.eu/root?tool_id=llm_hub"><button type="button" class="btn btn-success">Try LLM Hub on Galaxy Europe!</button></a>
