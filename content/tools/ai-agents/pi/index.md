---
title: "Galaxy for Pi"
tease: "Add the Galaxy MCP server and skills to the Pi coding agent."
subsites: [all]
autotoc: false
generated_from: https://github.com/galaxyproject/agentic-plugins/blob/main/docs/pi.md
---

This page sets up [Pi](https://pi.dev) (the `pi` coding agent) with:

- the **galaxy-mcp** server, so the agent can list histories, run tools, upload
  data and invoke workflows on your Galaxy server;
- **galaxy-skills**, curated skills for *using* Galaxy (MCP tool surface,
  collections, user-defined tools, workflow reports, reproducibility);
- **galaxy-dev-skills**, skills for *building* Galaxy (tool wrappers,
  Nextflow conversion, ToolShed revisions, track hubs, hub posts);
- **foundry-skills**, the Galaxy Workflow Foundry's workflow-construction skills.

Looking for a complete Galaxy research assistant built on Pi? See
[Loom](https://github.com/galaxyproject/loom) instead; this page is for adding
Galaxy to a plain Pi installation.

## Prerequisites

- Pi (`pi --version`) and Node.js.
- [uv](https://docs.astral.sh/uv/) on your `PATH`; the MCP server runs as
  `uvx galaxy-mcp`.
- A Galaxy API key. See [Getting a Galaxy API key](/tools/ai-agents/api-key/).

## Set the credentials

Pi's MCP adapter passes your shell environment to MCP servers, so export the
two variables in the shell that launches `pi` (for example in `~/.zshrc` or
`~/.bashrc`):

```bash
export GALAXY_URL="https://usegalaxy.org"
export GALAXY_API_KEY="paste-your-key-here"
```

A `.env` file with the same two lines in your project directory also works.

## Install

Pi has no built-in MCP support; the
[pi-mcp-adapter](https://github.com/nicobailon/pi-mcp-adapter) package adds it
and reads the MCP configuration shipped in this package.

```bash
pi install npm:pi-mcp-adapter
pi install git:github.com/galaxyproject/agentic-plugins
```

Restart Pi afterwards. The second command clones this repository under
`~/.pi/agent/git/` and registers its skills and MCP configuration from the
`pi` section of `package.json`. Use `pi install -l ...` to install into the
current project's `.pi/settings.json` instead of your user settings.

## Verify

1. Run `/mcp` inside Pi. A server named `galaxyproject_agentic_plugins__galaxy`
   should be listed (the adapter prefixes package-provided servers with the
   package name). It connects lazily on first use.
2. Ask: *"Connect to Galaxy and tell me who I am."* The agent calls `get_user`
   through the adapter's `mcp` tool and reports your username and server version.

If something is off, run `/skill:galaxy-connect`; that skill walks the agent
through diagnosing the connection.

## Use the skills

Skills register as `/skill:<name>` commands, for example
`/skill:galaxy-integration`, `/skill:galaxy-mcp-reference`,
`/skill:collection-manipulation`, `/skill:udt-authoring`,
`/skill:reproduciblify`, `/skill:tool-dev`, `/skill:nf-to-galaxy`,
`/skill:pipeline-nextflow-to-galaxy`, `/skill:discover-shed-tool`. The agent
also loads skills on its own when a request matches a description.

The package carries every skill set: `galaxy-skills` (using Galaxy),
`galaxy-dev-skills` (tool wrappers, Nextflow conversion, ToolShed, hubs) and
`foundry-skills` (59 workflow-construction skills). To leave out the sets you
do not use, filter the package in `~/.pi/agent/settings.json` (or
`.pi/settings.json`):

```json
{
  "packages": [
    "npm:pi-mcp-adapter",
    {
      "source": "git:github.com/galaxyproject/agentic-plugins",
      "skills": ["!plugins/foundry-skills/**", "!plugins/galaxy-dev-skills/**"]
    }
  ]
}
```

`pi config` toggles individual skills interactively.

## Update

```bash
pi update --extensions
```

refreshes installed packages. To pin a release, install a tag:
`pi install git:github.com/galaxyproject/agentic-plugins@<tag>`, where `<tag>`
is a release from
[the releases page](https://github.com/galaxyproject/agentic-plugins/releases).

## Alternatives

**MCP server without this package.** With `pi-mcp-adapter` installed, put a
standard MCP file in your project (`.mcp.json`) or globally
(`~/.config/mcp/mcp.json`):

```json
{
  "mcpServers": {
    "galaxy": {
      "command": "uvx",
      "args": ["galaxy-mcp"],
      "env": {
        "GALAXY_URL": "https://usegalaxy.org",
        "GALAXY_API_KEY": "paste-your-key-here"
      }
    }
  }
}
```

**Skills straight from upstream.** Pi reads `~/.agents/skills/` recursively:

```bash
git clone https://github.com/galaxyproject/galaxy-skills ~/.agents/skills/galaxy-skills
```

## Troubleshooting

- **No Galaxy server in `/mcp`**: confirm both packages are listed by
  `pi list`, restart Pi, and check `uv --version`.
- **"Missing Galaxy URL and API key"**: the variables are not exported in the
  shell that started `pi`. Use a project `.env` file, or the `.mcp.json` form
  above.
- **Server fails to start**: run `uvx galaxy-mcp` in a terminal to see the
  error.
- **"Provided API key is not valid"**: the key belongs to a different server or
  was revoked.
