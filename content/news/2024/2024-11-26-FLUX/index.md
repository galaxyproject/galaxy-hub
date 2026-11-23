---
title: "Text-to-Image Magic: FLUX Models Now in Galaxy!"
date: "2024-11-26"
tease: "Turn your text into stunning visuals with FLUX models, now integrated into Galaxy!"
hide_tease: false
subsites: [global, eu, us, freiburg]
tags: [tools, ai]
contributions:
  authorship:
    - arash77
---

> **Update (November 2026):** FLUX in Galaxy can now edit images and redraw parts of them, with a newer generation of FLUX models. See [What's new](#whats-new-november-2026) below. The rest of this post describes the 2024 version of the tool, which is still available as an older tool version.

## What's new (November 2026)

The FLUX tool now uses newer FLUX models from Black Forest Labs, including **FLUX.2 [klein]** and **FLUX 3 Image Klein**, and does three things:

| Task | Input | What it does |
|------|-------|--------------|
| **Generate** | A text prompt | Creates an image from your description |
| **Edit or combine** | Up to 10 images and a prompt | Changes an image, or combines several images, as the prompt describes |
| **Inpaint** | An image, a mask and a prompt | Redraws only the white part of the mask and keeps the rest |

**FLUX.2 [klein]** is fast and openly licensed (Apache 2.0), like FLUX.1 [schnell] before it, and it is the only one that can inpaint. **FLUX 3 Image Klein** gives the best quality, but like FLUX.1 [dev] its weights are for non-commercial use only. The description of each model in the tool says the same, so you can check it before you choose.

For example, we first generated an image with the prompt `a red apple on a wooden table, studio photo`, and then edited it with the prompt `make the apple green`:

<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px;">
  <img src="./flux_generate_red_apple.png" alt="FLUX image of a red apple on a wooden table" style="margin: 0; width: 100%;" />
  <img src="./flux_edit_green_apple.png" alt="The same image edited by FLUX so that the apple is green" style="margin: 0; width: 100%;" />
</div>

Only the color of the apple changed. The table, the light and the angle stayed the same.

Under **Advanced options** you can set the image size, the number of steps and a seed. The same seed and inputs give the same image, which helps when you want to reproduce a result.

If you use FLUX in a saved workflow: the form now starts with the task, and the models have new names, so pick the model again after updating the tool.

<a href="https://usegalaxy.eu/root?tool_id=black_forest_labs_flux"><button type="button" class="btn btn-success">Try the new FLUX on usegalaxy.eu!</button></a>

## Using Black Forest Labs' FLUX Models Inside Galaxy: A Guide to Text-to-Image Integration

In previous news, we have written about [the speech-to-text tool Whisper](../2024-04-25-whisper-tool/) and [the ChatGPT tool](../2024-09-02-chat-gpt/) in Galaxy. Today, we would like to talk about a new tool that allows you to create images from text.
[The Black Forest Labs (BFL)](https://blackforestlabs.ai/) FLUX series has made significant strides in the world of generative AI, providing robust text-to-image capabilities
tailored for various use cases. At Freiburg University, we've integrated FLUX.1 [schnell] and FLUX.1 [dev] into the Galaxy platform, enabling researchers and developers to generate
high-quality images directly within Galaxy's user-friendly environment.

In this blog post, we'll explore the FLUX.1 models, their unique attributes, and how to use them effectively inside Galaxy.

## Overview of FLUX Models

**FLUX.1 [schnell]**
* Purpose: Designed for speed.
* [License](https://github.com/black-forest-labs/flux/blob/main/model_licenses/LICENSE-FLUX1-schnell): Openly available under the Apache 2.0 license.
* Use Case: Ideal for personal use and rapid prototyping.

**FLUX.1 [dev]**
* Purpose: Guidance-distilled model for non-commercial applications, offering near-professional quality.
* [License](https://github.com/black-forest-labs/flux/blob/main/model_licenses/LICENSE-FLUX1-dev): Open-weight model intended for non-commercial contexts.
* Use Case: Suited for research and non-commercial exploration.

Both models provide easy access and versatility, making them excellent choices for text-to-image projects. While FLUX.1 [schnell] focuses on performance, FLUX.1 [dev] bridges the gap between quality and efficiency.

## Why Use FLUX Models Inside Galaxy?

Galaxy's open platform supports workflows across life sciences, data analysis, and beyond. By integrating FLUX models, users can:

* Generate visualizations: Convert textual descriptions into detailed images.
* Streamline workflows: Incorporate generative AI into multi-step Galaxy pipelines.
* Leverage open weights: FLUX's availability under open licenses aligns with Galaxy's ethos of accessibility and reproducibility.

To ensure high performance and speed, we are using a CUDA-based container to run the FLUX models on GPUs. This setup allows for fast inference times when working with the models from Hugging Face.
By leveraging Hugging Face’s pre-trained models, we can efficiently load the weights and run inference directly within the Galaxy environment. The CUDA-based container ensures that the heavy
computations involved in text-to-image generation are handled smoothly, providing users with a seamless experience.

## Setting Up FLUX in Galaxy

The FLUX models are already available on UseGalaxy.eu.

<a href="https://usegalaxy.eu/root?tool_id=black_forest_labs_flux"><button type="button" class="btn btn-success">Run FLUX on usegalaxy.eu!</button></a>

Simply log in to your Galaxy instance and search for the FLUX tool in the tool panel.

Select the desired model (FLUX.1 [schnell] or FLUX.1 [dev]) based on your requirements.

Please be adviced that dev model can not be used for commercial use.

Choose between File or Text based input and select your txt file or enter your text prompt in the designated input field.
Click "Run Tool" and let Galaxy handle the rest!
Once the process is complete, you’ll find the generated image in your Galaxy history, ready to view, share, or use in your workflows.

For example, I used the text prompt "A galaxy full of stars" to generate an image. Here's [the result history](https://usegalaxy.eu/u/brilliantarash/h/flux):

Text Prompt: `A galaxy full of stars`

Generated Image:

![FLUX_on_text_prompt_(A_galaxy_full_of_stars)](./FLUX_on_text_prompt-a_galaxy_full_of_stars.png)

You can try out your own prompts and see what unique images FLUX can generate!
