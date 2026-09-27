---
title: AI Agents and Galaxy
tease: "Two ways to put an AI agent to work on Galaxy: Orbit, a desktop app with everything already wired up, or plugins for the coding agent you already use."
subsites: [all]
autotoc: false
---

An AI agent can hold a conversation about your data, draft an analysis plan, run the steps on
Galaxy and keep a record you can go back to. There are two ways in, and which one you want
depends on whether you already work with a coding agent.

## Just getting started? Use Orbit

[**Orbit**](/agents/orbit/) is a desktop app with everything already connected: the Galaxy
connection, the curated Galaxy skills, and a durable `notebook.md` that records what was run and
why. Give it a Galaxy server URL and an API key, describe the analysis you want in plain language,
and approve the plan it drafts before anything runs.

- **[Install Orbit and run your first analysis](/agents/orbit/)** -- downloads for macOS, Linux and
  Windows, where to put your credentials, and a worked RNA-seq example.
- **[What Orbit is and how it works](https://galaxyproject.github.io/loom/)** -- the longer version:
  grounded execution on Galaxy, plan approval, and the notebook as the durable record.
- Prefer a terminal? The same agent runs as the Loom CLI: `npm install -g @galaxyproject/loom`.

<div class="callout">
Orbit is in <strong>beta</strong>, and you bring the model. That means an API key from Anthropic,
OpenAI, Google or DeepSeek, or signing in with an existing ChatGPT subscription -- see
<a href="/agents/orbit/#getting-api-keys">getting API keys</a>.
</div>

## Already use a coding agent? Add Galaxy to it

If you already work in Claude Code, Codex, Antigravity, Pi or Claude Desktop, keep the harness you
know and give it Galaxy. One install adds the Galaxy connection (`galaxy-mcp`) plus curated skills
for tool development, workflow construction and Nextflow conversion, so the agent can search the
tool catalog, run workflows and manage histories in your account.

- **[Add Galaxy to your coding agent](/agents/plugins/)** -- step-by-step setup for each harness,
  plus how to get your Galaxy API key.

## Either way, it is still Galaxy

Both routes run the work as ordinary Galaxy jobs in your own account, which is the point you get
from doing this on Galaxy at all: real histories, provenance, sharable links, and workflows you can
rerun or hand to a colleague. The analysis does not live inside the chat.

If the agent needs a step no installed tool covers, it can write a
[user-defined tool](/tools/user-defined-tools/) and Galaxy runs that as a job too, with the same
record. [The Galaxy agentic stack](/agents/stack/) shows that happening end to end.

## Need help?

- Questions: the [Galaxy Help forum](https://help.galaxyproject.org/)
- Orbit bugs: the in-app **Feedback** button, or
  [github.com/galaxyproject/loom/issues](https://github.com/galaxyproject/loom/issues)
