---
title: "WhisperX: Know Who Said What in Your Recordings"
date: "2026-11-23"
tease: "Transcribe audio and video in Galaxy with speaker labels and subtitles"
hide_tease: false
subsites: [global, eu, freiburg]
main_subsite: eu
tags: [tools, ai, humanities]
contributions:
  authorship:
    - arash77
---

## Who said what?

A transcript of an interview, a meeting or a panel discussion is much more useful when you know who is speaking. The [Speech to Text with Diarization](https://usegalaxy.eu/root?tool_id=whisperx) tool in Galaxy does exactly that. It uses [WhisperX](https://github.com/m-bain/whisperX) to transcribe your recording and to label each part with its speaker.

<a href="https://usegalaxy.eu/root?tool_id=whisperx"><button type="button" class="btn btn-success">Run WhisperX on usegalaxy.eu!</button></a>

## What does it do?

WhisperX builds on OpenAI's Whisper, which we introduced in [an earlier post](https://galaxyproject.org/news/2024-04-25-whisper-tool/), and adds two things:

- **Speaker labels:** each part of the transcript says who is speaking, as `SPEAKER_00`, `SPEAKER_01` and so on.
- **Precise timing:** the transcript is aligned to the audio, so every word gets its own start and end time. This makes subtitles that stay in sync with the speech.

For example, a short English news clip came back as these subtitles:

```
1
00:00:00,812 --> 00:00:11,364
[SPEAKER_00]: 21 year old Jesus joined Manchester City last year in January 2017 from Brazilian club Palmarias for a reported fee of £27 million.
```

## How to use the tool

1. **Upload your recording** to Galaxy. Audio and video files both work, for example WAV, MP3, OGG or MP4.
2. **Open [Speech to Text with Diarization](https://usegalaxy.eu/root?tool_id=whisperx)** on Galaxy Europe.
3. **Choose a model.** Smaller models are faster; larger models are more accurate.
4. **Choose the language** of the speech, or let the tool detect it.
5. **Choose the output:** plain text, JSON, subtitles (SRT or WebVTT), a table (TSV), or all of them at once.
6. **Run the tool.** The job runs on a GPU on the Galaxy Europe cluster.

The JSON output has the most detail, including the time of every word, if you want to process the transcript further.

A few tips:

- **Mixed languages:** when the tool detects the language, it picks one language from the first 30 seconds of the recording. If your recording switches between languages, check the later parts of the transcript.
- **Your recording stays in Galaxy:** the models are stored on the Galaxy Europe cluster, and the recording is transcribed on its own GPUs, not by an outside service.

## Which speech-to-text tool should I use?

Galaxy has more than one way to turn speech into text:

| | [Speech to Text](https://usegalaxy.eu/root?tool_id=whisper) (Whisper) | [Speech to Text with Diarization](https://usegalaxy.eu/root?tool_id=whisperx) (WhisperX) | [LLM Hub](https://usegalaxy.eu/root?tool_id=llm_hub), audio models |
|---|---|---|---|
| **Input** | Audio or video | Audio or video | Audio |
| **Speaker labels** | No | Yes | No |
| **Subtitles** | Yes | Yes, aligned to every word | Yes, with models that return timestamps |
| **Runs on** | The Galaxy Europe cluster | GPUs on the Galaxy Europe cluster | Academic AI services, see the [LLM Hub post](https://galaxyproject.org/news/2025-10-10-llm-hub/) |

In short: use WhisperX when you need to know who is speaking, and LLM Hub when you want a quick transcript of an audio file.

## What's next?

A transcript is often only the first step. In [our post on LangChain Text Splitters](https://galaxyproject.org/news/2026-10-02-langchain-text-splitters/), we show a workflow that transcribes a video with WhisperX and translates the subtitles with LLM Hub.

Have feedback or a recording that doesn't work well? Reach out to [contact@usegalaxy.eu](mailto:contact@usegalaxy.eu).
