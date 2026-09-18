---
title: "Galaxy for AI Coding Agents"
tease: "Connect Claude Code, Codex, Antigravity or Pi to your Galaxy server with curated Galaxy skills, or Claude Desktop with the Galaxy connection alone."
subsites: [all]
components: true
autotoc: false
skip_title_render: true
full_bleed: true
og_image: /images/galaxy-logos/galaxy_logo_25percent.png
generated_from: https://github.com/galaxyproject/agentic-plugins/blob/main/scripts/export-hub.py
---

<AgentShells />

Galaxy for AI coding agents installs the galaxy-mcp server, the galaxy-skills
and galaxy-dev-skills sets and the Workflow Foundry skills into Claude Code,
Codex, Antigravity or Pi; Claude Desktop gets the galaxy-mcp server as a
one-click bundle. Everything comes from the
[galaxyproject/agentic-plugins](https://github.com/galaxyproject/agentic-plugins)
repository.

<div class="callout">
Looking for a complete AI research assistant built around Galaxy rather than a
plugin for the agent you already use? See <a href="/tools/orbit/">Orbit</a>.
</div>

Every guide starts with [getting a Galaxy API key](/tools/ai-agents/api-key/).
Other agents that read Agent Skills from `~/.agents/skills/` can use the skills
by cloning [galaxy-skills](https://github.com/galaxyproject/galaxy-skills)
there and adding the MCP server by hand with `uvx galaxy-mcp`.

## Before you start

- **A Galaxy account** on the server you want to use (for example
  [usegalaxy.org](https://usegalaxy.org), [usegalaxy.eu](https://usegalaxy.eu)
  or [usegalaxy.org.au](https://usegalaxy.org.au)) and its API key.
- **[uv](https://docs.astral.sh/uv/)** on your `PATH` for every harness except
  Claude Desktop; the MCP server runs as `uvx galaxy-mcp`.
- **`git`** for the Antigravity install and **Node.js** for Pi; each guide lists
  its own prerequisites.
- An API key gives full access to your account. Keep it in configuration or an
  environment variable, not in chat.

## What the agent can do once connected

Ask in plain language; the agent picks the Galaxy tools:

- *"Show my recent histories and what's in the latest one."*
- *"Upload these FASTQ files to a new history called 'run 12' and run FastQC on them."*
- *"Find an IWC workflow for variant calling on paired-end reads and run it on history X."*
- *"Convert this Nextflow process into a Galaxy tool wrapper and test it with Planemo."* (uses the `nf-to-galaxy` and `tool-dev` skills from `galaxy-dev-skills`)
- *"Build a Galaxy workflow from this paper's methods section."* (uses the Foundry skills)

## Get help

- Something not working? The `galaxy-connect` skill that ships with the MCP
  plugin walks the agent through diagnosing the connection; each guide has a
  troubleshooting section.
- Issues and contributions: [galaxyproject/agentic-plugins](https://github.com/galaxyproject/agentic-plugins).
- Skill content lives upstream in [galaxy-skills](https://github.com/galaxyproject/galaxy-skills)
  and [foundry](https://github.com/galaxyproject/foundry); the plugins mirror
  them weekly.
