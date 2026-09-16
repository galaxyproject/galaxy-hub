---
title: "Galaxy for Claude Code"
tease: "Install the Galaxy MCP server and skills into Claude Code from the galaxyproject plugin marketplace."
subsites: [all]
autotoc: true
---

This page sets up [Claude Code](https://code.claude.com) with:

- the **galaxy-mcp** server, so Claude can list histories, run tools, upload
  data and invoke workflows on your Galaxy server;
- **galaxy-skills**, curated Galaxy developer skills;
- **foundry-skills**, the Galaxy Workflow Foundry's workflow-construction skills.

## Prerequisites

- Claude Code, a current release (`claude --version`).
- [uv](https://docs.astral.sh/uv/) on your `PATH`; the MCP server runs as
  `uvx galaxy-mcp`.
- A Galaxy API key. See [Getting a Galaxy API key](/tools/ai-agents/api-key/).

## Install

Inside Claude Code:

```
/plugin marketplace add galaxyproject/agentic-plugins
/plugin install galaxy-mcp@galaxyproject
/plugin install galaxy-skills@galaxyproject
/plugin install foundry-skills@galaxyproject
```

Installing `galaxy-mcp` prompts for the **Galaxy URL** (default
`https://usegalaxy.org`) and your **API key**. The key is stored in your
system keychain, the URL in your user settings. Start a new session afterwards.

The same works from a terminal:

```bash
claude plugin marketplace add galaxyproject/agentic-plugins
claude plugin install galaxy-mcp@galaxyproject
claude plugin install galaxy-skills@galaxyproject
claude plugin install foundry-skills@galaxyproject
```

Install only what you need. `foundry-skills` adds 59 skills, which costs
context on every turn; skip it unless you build Galaxy workflows.

## Verify

1. Run `/mcp`. A `galaxy` server should be listed under the `galaxy-mcp` plugin
   and connected.
2. Ask: *"Connect to Galaxy and tell me who I am."* Claude calls `get_user` and
   reports your username and the server version.

If something is off, run `/galaxy-mcp:galaxy-connect`; that skill walks Claude
through diagnosing the connection.

## Use the skills

Type `/` to see them. Plugin skills are namespaced, for example:

| Invocation | What it does |
|------------|--------------|
| `/galaxy-mcp:galaxy-connect` | Set up / verify / troubleshoot the Galaxy connection |
| `/galaxy-skills:tool-dev` | Create, test and update Galaxy tool wrappers |
| `/galaxy-skills:udt-authoring` | Author user-defined tools (`GalaxyUserTool` YAML) |
| `/galaxy-skills:nf-to-galaxy` | Convert Nextflow processes and workflows |
| `/galaxy-skills:collection-manipulation` | Filter, sort and restructure dataset collections |
| `/galaxy-skills:galaxy-integration` | Use the Galaxy MCP tools, JupyterLite and BioBlend well |
| `/galaxy-skills:reproduciblify` | Rebuild a messy history as a clean, extractable analysis |
| `/galaxy-skills:workflow-reports` | Draft workflow report templates |
| `/galaxy-skills:trackhubs` | Publish UCSC track hubs and assembly hubs |
| `/galaxy-skills:update-usegalaxy-tool` | Add or bump ToolShed revisions in usegalaxy-tools |
| `/galaxy-skills:hub-news-posts` | Write Galaxy Hub news posts |
| `/foundry-skills:pipeline-nextflow-to-galaxy` | End-to-end Nextflow to Galaxy workflow conversion |
| `/foundry-skills:discover-shed-tool` | Find and pin a Tool Shed wrapper |

Claude also picks skills up on its own from your request; you do not have to
invoke them by name.

## Update

```
/plugin marketplace update galaxyproject
/plugin update galaxy-skills@galaxyproject
/plugin update foundry-skills@galaxyproject
```

The skills plugins are versioned by the date they were synced from upstream
(for example `2026.9.16`).

## Change the Galaxy URL or key

Open `/plugin manage`, select `galaxy-mcp` and edit its options, then start a
new session. Uninstalling and reinstalling the plugin also prompts again:

```
/plugin uninstall galaxy-mcp@galaxyproject
/plugin install galaxy-mcp@galaxyproject
```

## Alternatives

**MCP server without the plugin.** Register `galaxy-mcp` directly and pass the
credentials yourself:

```bash
claude mcp add --scope user galaxy \
  -e GALAXY_URL=https://usegalaxy.org \
  -e GALAXY_API_KEY=paste-your-key-here \
  -- uvx galaxy-mcp
```

**Skills straight from upstream.** Foundry publishes its own marketplace:

```
/plugin marketplace add galaxyproject/foundry
/plugin install foundry-skills@galaxy-workflow-foundry
```

Install either that or `foundry-skills@galaxyproject`, not both, or every
Foundry skill appears twice. For galaxy-skills, cloning the repository into
`~/.claude/skills/` also works:

```bash
git clone https://github.com/galaxyproject/galaxy-skills ~/.claude/skills/galaxy-skills
```

## Troubleshooting

- **No `galaxy` server in `/mcp`**: start a new session after installing; check
  `uv --version`.
- **Server fails to start**: run `uvx galaxy-mcp` in a terminal to see the
  error. A first run downloads the package and needs network access.
- **"Plugin option galaxy_api_key isn't set"** (in `/mcp` or the debug log):
  the install-time prompt was skipped; open `/plugin manage` and fill in the
  options.
- **"Missing Galaxy URL and API key"**: the values did not reach the server;
  check `/plugin manage`, or set `GALAXY_URL` / `GALAXY_API_KEY` in a project
  `.env` file.
- **"Provided API key is not valid"**: the key belongs to a different server or
  was revoked; create a new one and reinstall.
