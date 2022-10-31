---
title: '[GTN news] New Feature: Easy Abbreviation'
date: '2021-05-25'
tags: [training, gtn-news]
supporters:
- denbi
- elixir
- gallantries
external_url: https://training.galaxyproject.org/training-material/news/2021/05/25/abbreviations-tag.html
subsites: [eu, pasteur, freiburg, erasmusmc, elixir-it, belgium, genouest]
main_subsite: eu
---

<p>Thanks to the great tutorial developed by first time contributor Erik Schill and edited by Simon Bray, we noticed that they defined a number of abbreviations and re-used those throughout their tutorial.</p>

<p>As the GTN is intended to be easy for contributors and easy for learners, we wanted to make use of the <code class="language-plaintext highlighter-rouge">&lt;abbr&gt;</code> tag which allows you to define commonly re-used terms in your HTML. However this is a bit clumsy to write every time, so we’ve implemented a tag and some metadata which permits easily defining and referencing abbreviations throughout your text.</p>

<p>In your tutorial metadata you can add an abbreviations section like:</p>

<div class="language-yaml highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nn">---</span>
<span class="na">title</span><span class="pi">:</span> <span class="s">My awesome tutorial</span>
<span class="nn">...</span>
<span class="na">abbreviations</span><span class="pi">:</span>
  <span class="na">API</span><span class="pi">:</span> <span class="s">Application Programming Interface</span>
  <span class="na">JSON</span><span class="pi">:</span> <span class="s">JavaScript Object Notation</span>
<span class="nn">---</span>
</code></pre></div></div>

<p>And in your text you can use braces to refer to the term</p>

<blockquote class="code-2col">
  <blockquote class="code-in">
    <h3 id="code-in-input-markdown"><i class="far fa-keyboard"></i><span class="visually-hidden">code-in</span> Input: Markdown</h3>
    <p><code>
The `/jobs` &amp;lbraceAPI&amp;rbrace will return &amp;lbraceJSON&amp;rbrace. When we call the &amp;lbraceAPI&amp;rbrace we'll get back this result &amp;lbraceJSON&amp;rbrace.
</code></p>
  </blockquote>

  <blockquote class="code-out">
    <h3 id="code-out-output"><i class="fas fa-laptop-code"></i><span class="visually-hidden">code-out</span> Output</h3>

    <p>The <code class="language-plaintext highlighter-rouge">/jobs</code> Application Programming Interface (API) will return JavaScript Object Notation (JSON). When we call the <abbr title="Application Programming Interface">API</abbr> we’ll get back this result <abbr title="JavaScript Object Notation">JSON</abbr>.</p>

  </blockquote>
</blockquote>

<p>These will even generate an automatic Glossary at the end. Check out the use of this new feature in the BioBlend Dev Tutorial!</p>


