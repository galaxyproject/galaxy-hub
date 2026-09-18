---
title: "Galaxy for Antigravity"
tease: "Install the Galaxy plugins into Google Antigravity (agy CLI and IDE)."
subsites: [all]
autotoc: false
generated_from: https://github.com/galaxyproject/agentic-plugins/blob/main/docs/antigravity.md
---

This page sets up Google [Antigravity](https://antigravity.google) (the `agy`
CLI and the IDE, which share `~/.gemini/config/`) with:

- the **galaxy-mcp** server, so the agent can list histories, run tools, upload
  data and invoke workflows on your Galaxy server;
- **galaxy-skills**, curated skills for *using* Galaxy (MCP tool surface,
  collections, user-defined tools, workflow reports, reproducibility);
- **galaxy-dev-skills**, skills for *building* Galaxy (tool wrappers,
  Nextflow conversion, ToolShed revisions, track hubs, hub posts);
- **foundry-skills**, the Galaxy Workflow Foundry's workflow-construction skills.

## Prerequisites

- Antigravity CLI (`agy --version`) or the Antigravity IDE.
- [uv](https://docs.astral.sh/uv/) on your `PATH`; the MCP server runs as
  `uvx galaxy-mcp`.
- `git`.
- A Galaxy API key. See [Getting a Galaxy API key](/tools/ai-agents/api-key/).

## Set the credentials

Antigravity passes your shell environment to MCP servers, so export the two
variables in the shell that launches `agy` (for example in `~/.zshrc` or
`~/.bashrc`):

```bash
export GALAXY_URL="https://usegalaxy.org"
export GALAXY_API_KEY="paste-your-key-here"
```

A `.env` file with the same two lines in your project directory also works.
`${VAR}` placeholders inside `mcp_config.json` are **not** expanded, so do not
try to reference the variables from the config file.

## Install

Antigravity plugins are directories. Clone this repository and install the
plugin directories you want:

```bash
git clone https://github.com/galaxyproject/agentic-plugins.git ~/.galaxy-agentic-plugins
agy plugin install ~/.galaxy-agentic-plugins/plugins/galaxy-mcp
agy plugin install ~/.galaxy-agentic-plugins/plugins/galaxy-skills
agy plugin install ~/.galaxy-agentic-plugins/plugins/galaxy-dev-skills
agy plugin install ~/.galaxy-agentic-plugins/plugins/foundry-skills
```

Each command copies the plugin into `~/.gemini/config/plugins/<name>/`, where
both the CLI and the IDE discover it. Start a new session afterwards.

Install only what you need. `galaxy-skills` is the set for *using* Galaxy
(MCP tool surface, collections, user-defined tools, workflow reports,
reproducibility); `galaxy-dev-skills` is for *building* it (tool wrappers,
Nextflow conversion, ToolShed revisions, track hubs, hub posts);
`foundry-skills` adds 59 workflow-construction skills. Every installed skill
costs context on every turn, so skip the sets you will not use.

To scope a plugin to one workspace instead, copy its directory into
`<workspace>/.agents/plugins/` rather than running `agy plugin install`.

## Verify

1. Type `/mcp` in the prompt to open the MCP manager; `galaxy-mcp_galaxy`
   (plugin servers are prefixed with the plugin name) should be running.
2. Ask:

   ```
   Connect to Galaxy and tell me who I am.
   ```

   The agent calls `get_user` and reports your username and the server version.

If something is off, run `/galaxy-connect`; that skill walks the agent through
diagnosing the connection.

## Use the skills

Run `/skills` to list them, or type `/` followed by the skill name, for example
`/galaxy-integration`, `/galaxy-mcp-reference`, `/collection-manipulation`,
`/udt-authoring`, `/reproduciblify`, `/tool-dev`, `/nf-to-galaxy`,
`/pipeline-nextflow-to-galaxy`, `/discover-shed-tool`. The agent also picks skills up on its own from your
request.

Antigravity lists only top-level skills. The `nf-to-galaxy` and
`galaxy-integration` skills contain sub-skills in nested directories (for
example `nf-process-to-galaxy-tool`); the parent skill links to them, so the
agent reads them when needed even though they do not appear in `/skills`.

## Update

```bash
git -C ~/.galaxy-agentic-plugins pull
agy plugin install ~/.galaxy-agentic-plugins/plugins/galaxy-mcp
agy plugin install ~/.galaxy-agentic-plugins/plugins/galaxy-skills
agy plugin install ~/.galaxy-agentic-plugins/plugins/galaxy-dev-skills
agy plugin install ~/.galaxy-agentic-plugins/plugins/foundry-skills
```

Reinstalling overwrites the installed copy. `galaxy-mcp` reads the credentials
from your environment, so no re-entry is needed. `agy plugin list` shows what
is installed; `agy plugin uninstall <name>` removes a plugin.

## Alternatives

**MCP server without the plugin.** Register `galaxy-mcp` in your user-level
`mcp_config.json` with the credentials inline:

```bash
agy mcp add --env GALAXY_URL=https://usegalaxy.org \
            --env GALAXY_API_KEY="$GALAXY_API_KEY" \
            galaxy uvx galaxy-mcp
```

The key comes from the variable exported above; typing it literally here stores
it in your shell history.

Then install only the skills plugins, not `galaxy-mcp`, so the server is
not registered twice.

**Skills straight from upstream.** Antigravity reads
`~/.gemini/config/skills/<skill>/SKILL.md`, so the galaxy-skills repository can
be cloned there; each top-level skill directory becomes a skill:

```bash
git clone https://github.com/galaxyproject/galaxy-skills ~/.gemini/config/skills/galaxy-skills
```

## Troubleshooting

- **No `galaxy-mcp_galaxy` in `/mcp`**: start a new session; run
  `agy plugin list` to confirm the plugin is installed; check `uv --version`.
- **"Missing Galaxy URL and API key"**: the variables are not exported in the
  shell that started `agy` (the IDE may not read `~/.zshrc`). Use a project
  `.env` file, or the `agy mcp add ... --env ...` form above.
- **Server fails to start**: run `uvx galaxy-mcp` in a terminal to see the
  error.
- **"Provided API key is not valid"**: the key belongs to a different server or
  was revoked.
