---
title: 'LangChain Text Splitters, the Missing Link when Processing Long Texts with LLMs'
date: '2026-10-02'
tease: "Circumvent context window limits of LLMs by splitting long texts into manageable chunks"
hide_tease: false
subsites: [global, eu, us, freiburg]
tags: [tools, ai, humanities, llm]
contributions:
  authorship:
    - IvoLeist
    - arash77
    - Sch-Da
  funding:
    - ai4social
---

Imagine you have a very long text that you want to process with a large language model (LLM). You might want to summarize it, extract information, or translate it into another language. However, LLMs have limits on how much text they can process in a single request in a so-called context window. If your text exceeds those limits, you need a way to split it into smaller pieces (chunks) that the model can handle.

## Divide and Conquer:<br />LangChain Text Splitters to the Rescue

LangChain is a popular open-source framework for building LLM-powered applications. It provides a set of utilities
wrapped in standalone Python packages. One of these is [LangChain Text Splitters](https://github.com/langchain-ai/langchain/tree/master/libs/text-splitters), which provides different strategies for chunking as shown below:

<div id="split-modes-visual">
  <style>
    #split-modes-visual {
      --subtle: var(--muted-foreground, #59636e);
      --chunk: var(--viz-series-1, #2675c9);
    }
    #split-modes-visual .source {
      margin-bottom: 16px;
    }
    #split-modes-visual .controls {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
      cursor: pointer;
    }
    #split-modes-visual .modes {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 24px;
    }
    #split-modes-visual .mode {
      min-width: 0;
    }
    #split-modes-visual h3 {
      margin: 0 0 8px;
    }
    #split-modes-visual .settings {
      margin-bottom: 12px;
    }
    #split-modes-visual .chunks {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 16px;
    }
    #split-modes-visual .chunk {
      padding: 10px 12px;
      background: color-mix(
        in srgb, var(--chunk) 14%, transparent
      );
      border-left: 3px solid var(--chunk);
      overflow-wrap: anywhere;
      white-space: pre-wrap;
    }
    #split-modes-visual .text-small {
      font-size: 0.85em;
    }
    #split-modes-visual .text-muted {
      color: var(--subtle);
    }
    @media (max-width: 580px) {
      #split-modes-visual .modes {
        grid-template-columns: 1fr;
      }
    }
    #split-modes-visual .controls {
    display: inline-flex;
    margin-left: 4px;
    }
    #split-modes-visual .with-overlap {
      display: none;
    }
    #split-overlap:checked ~ .modes .without-overlap {
      display: none;
    }
    #split-overlap:checked ~ .modes .with-overlap {
      display: inline;
    }
    #split-overlap:checked ~ .modes .chunks.with-overlap {
      display: flex;
    }
  </style>
  
  <div class="source">
    <span class="text-small text-muted">Example:</span>
    <div>Dr. Smith studies photosynthesis in freshwater algae. She takes notes. She checks them. She shares her findings.</div>
  </div>

  <input type="checkbox" id="split-overlap" />
  <label class="controls" for="split-overlap">
    With chunk overlap
  </label>

  <div class="modes">
    <section class="mode">
      <h3>Character (.)</h3>
      <div class="settings text-small text-muted">
        Target: 50 characters · Overlap:
        <span class="without-overlap">0</span>
        <span class="with-overlap">20</span> characters
      </div>
      <div class="chunks">
        <div class="chunk">Dr.</div>
        <div class="chunk">Smith studies photosynthesis in freshwater algae.</div>
        <div class="chunk">She takes notes. She checks them.</div>
        <div class="chunk"><span class="with-overlap"><strong>She checks them.</strong> </span>She shares her findings.</div>
      </div>
    </section>
    <section class="mode">
      <h3>Token (count=5)</h3>
      <div class="settings text-small text-muted">
        cl100k_base · Overlap:
        <span class="without-overlap">0</span>
        <span class="with-overlap">2</span> tokens
      </div>
      <!-- Fixed chunks from the original token array. -->
      <div class="chunks without-overlap">
        <div class="chunk">Dr. Smith studies photos</div>
        <div class="chunk">ynthesis in freshwater algae.</div>
        <div class="chunk"> She takes notes. She</div>
        <div class="chunk"> checks them. She shares</div>
        <div class="chunk"> her findings.</div>
      </div>
      <div class="chunks with-overlap">
        <div class="chunk">Dr. Smith studies photos</div>
        <div class="chunk"><strong> studies photos</strong>ynthesis in freshwater</div>
        <div class="chunk"><strong> in freshwater</strong> algae. She</div>
        <div class="chunk"><strong>. She</strong> takes notes.</div>
        <div class="chunk"><strong> notes.</strong> She checks them</div>
        <div class="chunk"><strong> checks them</strong>. She shares</div>
        <div class="chunk"><strong> She shares</strong> her findings.</div>
      </div>
    </section>
    <section class="mode">
      <h3>Sentence</h3>
      <div class="settings text-small text-muted">
        Target: 50 characters · Overlap:
        <span class="without-overlap">0</span>
        <span class="with-overlap">20</span> characters
      </div>
      <div class="chunks">
        <div class="chunk">Dr. Smith studies photosynthesis in freshwater algae.</div>
        <div class="chunk">She takes notes. She checks them.</div>
        <div class="chunk"><span class="with-overlap"><strong>She checks them.</strong> </span>She shares her findings.</div>
      </div>
    </section>
  </div>
</div>

As you can see, there is no splitting strategy which is universally better than the others, but you have
to choose the one that fits your text and downstream application the best. Also note the toggle for chunk
overlap: it gives the model some context, which helps with summaries or retrieval-augmented generation (RAG).
For translation, keep it at 0, otherwise the overlapping text is translated twice.

## LangChain Text Splitters in Galaxy

![Demo of LangChain Text Splitters in Galaxy](./langchain-text-splitters-demo.gif)
 <a href="https://usegalaxy.eu/?tool_id=langchain_text_splitters"><button type="button" class="btn btn-success">Click to try LangChain Text Splitters on Galaxy Europe!</button></a>


## A Galaxy Workflow Example:<br />Transcribing & Translating long Video Transcripts

Like our users, we enjoy exploring the capabilities of various open-source LLMs available through the
[LLM Hub](https://usegalaxy.eu/?tool_id=llm_hub) ([Blogpost](https://galaxyproject.org/news/2025-10-10-llm-hub)).
While experimenting with the LLM Hub as an alternative to the [ChatGPT Galaxy tool](https://usegalaxy.eu/?tool_id=chatgpt_openai_api) in our [transcription & translation Galaxy workflow](https://usegalaxy.eu/published/workflow?id=a2284469005518e1), we faced a practical limitation: Translating long video transcripts results in truncated outputs or even timeouts!

Thanks to the [LangChain Text Splitters Galaxy tool](https://usegalaxy.eu/?tool_id=langchain_text_splitters) this is now a problem of the past. See below how we feed manageable chunks to the LLM, which are then translated and concatenated into a single document:

<iframe 
  title="Galaxy Workflow Embed" 
  style="width: 100%; height: 550px; border: none;"
  src="https://usegalaxy.eu/published/workflow?id=9c217f8a9baba1db&embed=true&buttons=true&about=false&heading=false&minimap=false&zoom_controls=true&initialX=-20&initialY=-20&zoom=0.6"
  >
</iframe>

#| Step                    |  Description |
-|-------------------------|--------------|
1| Speech to text |  [WhisperX](https://usegalaxy.eu/?tool_id=whisperx) turns the audio or video into subtitles (SRT): numbered cues with timestamps.  |
2| Numbered lines in chunks |  Only the text of each cue goes on, as a numbered line (`12: text`). The timestamps stay behind. [LangChain Text Splitters](https://usegalaxy.eu/?tool_id=langchain_text_splitters) cuts the lines into chunks after a sentence end, and *Apply rules* makes the next step run once per chunk.
3| One LLM request per chunk |Every chunk goes to [LLM Hub](https://usegalaxy.eu/?tool_id=llm_hub) on its own, with the same prompt.
4| Rebuild the subtitles | [Concatenate](https://usegalaxy.eu/?tool_id=tp_cat) joins the answers and [awk](https://usegalaxy.eu/?tool_id=tp_awk_tool) puts them back on the original timestamps. The result is the translated SRT plus a review table for checking.
