---
title: "Galaxy for Codex CLI"
tease: "Install the Galaxy MCP server and skills into OpenAI Codex CLI."
subsites: [all]
autotoc: true
---

This page sets up [OpenAI Codex CLI](https://developers.openai.com/codex/cli) with:

- the **galaxy-mcp** server, so Codex can list histories, run tools, upload
  data and invoke workflows on your Galaxy server;
- **galaxy-skills**, curated Galaxy developer skills;
- **foundry-skills**, the Galaxy Workflow Foundry's workflow-construction skills.

## Prerequisites

- Codex CLI with plugin support (`codex --version`).
- [uv](https://docs.astral.sh/uv/) on your `PATH`; the MCP server runs as
  `uvx galaxy-mcp`.
- A Galaxy API key. See [Getting a Galaxy API key](/tools/ai-agents/api-key/).

## Set the credentials

Codex starts MCP servers with a minimal environment and forwards only the
variables a server asks for. The `galaxy-mcp` plugin asks for `GALAXY_URL` and
`GALAXY_API_KEY`, so export them in the shell that launches Codex (for example
in `~/.zshrc` or `~/.bashrc`):

```bash
export GALAXY_URL="https://usegalaxy.org"
export GALAXY_API_KEY="paste-your-key-here"
```

A `.env` file with the same two lines in your project directory also works.

## Install

```bash
codex plugin marketplace add galaxyproject/agentic-plugins
codex plugin add galaxy-mcp@galaxyproject
codex plugin add galaxy-skills@galaxyproject
codex plugin add galaxy-dev-skills@galaxyproject
codex plugin add foundry-skills@galaxyproject
```

Start a new Codex session afterwards. You can also browse and toggle the
plugins with `codex /plugins`.

Install only what you need. `galaxy-skills` is the set for *using* Galaxy
(MCP tool surface, collections, user-defined tools, workflow reports,
reproducibility); `galaxy-dev-skills` is for *building* it (tool wrappers,
Nextflow conversion, ToolShed revisions, track hubs, hub posts);
`foundry-skills` adds 59 workflow-construction skills. Every installed skill
costs context on every turn, so skip the sets you will not use.

## Verify

1. In a terminal, `codex mcp list` shows a `galaxy` server with
   `GALAXY_URL` and `GALAXY_API_KEY` (masked) and status `enabled`. Inside
   Codex, `/mcp` lists it too.
2. Ask: *"Connect to Galaxy and tell me who I am."* Codex calls `get_user` and
   reports your username and the server version.

If something is off, type `$galaxy-connect` (or pick it from `/skills`) to
have Codex diagnose the connection.

## Use the skills

Type `$` or run `/skills` to pick a skill, for example `$galaxy-integration`,
`$galaxy-mcp-reference`, `$collection-manipulation`, `$udt-authoring`,
`$reproduciblify`, and, if you installed `galaxy-dev-skills`, `$tool-dev` and
`$nf-to-galaxy`. Codex also selects skills implicitly from their descriptions.

Codex scans plugin skill directories recursively, so the sub-skills nested
under `nf-to-galaxy` and `galaxy-integration` (for example
`nf-process-to-galaxy-tool` and `jupyterlite-galaxy`) are listed under their
own names as well.

## Update

```bash
codex plugin marketplace upgrade
codex plugin add galaxy-skills@galaxyproject
codex plugin add galaxy-dev-skills@galaxyproject
codex plugin add foundry-skills@galaxyproject
```

The first command refreshes the marketplace snapshot; re-adding a plugin
installs the new version. To remove a plugin:

```bash
codex plugin remove galaxy-skills@galaxyproject
```

## Alternatives

**MCP server without the plugin.**

```bash
codex mcp add galaxy \
  --env GALAXY_URL=https://usegalaxy.org \
  --env GALAXY_API_KEY=paste-your-key-here \
  -- uvx galaxy-mcp
```

or, in `~/.codex/config.toml`, forwarding the variables from your shell instead
of writing the key into the file:

```toml
[mcp_servers.galaxy]
command = "uvx"
args = ["galaxy-mcp"]
env_vars = ["GALAXY_URL", "GALAXY_API_KEY"]
```

**Skills straight from upstream.** Codex reads `~/.agents/skills/`, so a clone
works for galaxy-skills:

```bash
git clone https://github.com/galaxyproject/galaxy-skills ~/.agents/skills/galaxy-skills
```

Foundry publishes its own Codex marketplace:

```bash
codex plugin marketplace add galaxyproject/foundry
codex plugin add foundry-skills@galaxy-workflow-foundry
```

Install either that or `foundry-skills@galaxyproject`, not both.

## Troubleshooting

- **No `galaxy` server in `/mcp`**: start a new session after installing; check
  `uv --version`.
- **"Missing Galaxy URL and API key"**: the variables are not exported in the
  shell that started Codex (GUI launchers often do not read `~/.zshrc`). Use a
  project `.env` file, or `codex mcp add ... --env ...` as above.
- **Server fails to start**: run `uvx galaxy-mcp` in a terminal to see the
  error.
- **"Provided API key is not valid"**: the key belongs to a different server or
  was revoked.
