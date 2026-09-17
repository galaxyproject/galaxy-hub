---
title: "Galaxy for AI Coding Agents"
tease: "Connect Claude Code, Claude Desktop, Codex, Cursor, Antigravity or Pi to your Galaxy server, and give the agent curated Galaxy skills."
subsites: [all]
autotoc: true
---

AI coding agents can drive Galaxy directly: list your histories, upload data,
search and run tools, and invoke workflows on any Galaxy server you have an
account on. The [galaxyproject/agentic-plugins](https://github.com/galaxyproject/agentic-plugins) repository
packages everything needed for that as plugins for the common agent harnesses.
One install gives an agent three things:

1. **A Galaxy connection** through the [galaxy-mcp](https://github.com/galaxyproject/galaxy-mcp)
   server, authenticated with your Galaxy API key.
2. **Curated Galaxy skills** from [galaxy-skills](https://github.com/galaxyproject/galaxy-skills),
   in two sets: skills for *using* Galaxy (the MCP tool surface, dataset
   collections, user-defined tools, workflow reports, reproducibility) and,
   separately, skills for *building* it (tool wrappers, Nextflow conversion,
   ToolShed revisions, track hubs, hub posts).
3. **Galaxy Workflow Foundry skills** from [foundry](https://github.com/galaxyproject/foundry):
   turning papers, Nextflow pipelines and CWL workflows into validated Galaxy
   workflows.

<div class="callout">
Looking for a complete AI research assistant built around Galaxy rather than a
plugin for the agent you already use? See <a href="/tools/orbit/">Orbit</a>.
</div>

## Pick your agent

| Agent | Guide | What you get |
|-------|-------|--------------|
| Claude Code | [Set up Claude Code](/tools/ai-agents/claude-code/) | MCP server (prompts for URL and key at install) + skill sets, via `/plugin` |
| Claude Desktop | [Set up Claude Desktop](/tools/ai-agents/claude-desktop/) | One-click `.mcpb` bundle; MCP server only |
| Codex CLI | [Set up Codex](/tools/ai-agents/codex/) | MCP server + skills via `codex plugin` |
| Cursor | [Set up Cursor](/tools/ai-agents/cursor/) | MCP server + skills via Customize, or a one-click MCP link |
| Antigravity (`agy`) | [Set up Antigravity](/tools/ai-agents/antigravity/) | MCP server + skills via `agy plugin install` |
| Pi | [Set up Pi](/tools/ai-agents/pi/) | MCP server (through pi-mcp-adapter) + skills via `pi install` |

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
