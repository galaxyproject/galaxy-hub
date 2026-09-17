---
title: "Galaxy for Cursor"
tease: "Add the Galaxy MCP server and skills to Cursor, with a one-click link."
subsites: [all]
autotoc: true
---

This page sets up [Cursor](https://cursor.com) with:

- the **galaxy-mcp** server, so the agent can list histories, run tools, upload
  data and invoke workflows on your Galaxy server;
- **galaxy-skills**, curated Galaxy developer skills;
- **foundry-skills**, the Galaxy Workflow Foundry's workflow-construction skills.

## Prerequisites

- Cursor with plugin support (Customize page in the sidebar).
- [uv](https://docs.astral.sh/uv/) on your `PATH`; the MCP server runs as
  `uvx galaxy-mcp`.
- A Galaxy API key. See [Getting a Galaxy API key](/tools/ai-agents/api-key/).

## Set the credentials

The plugin's MCP config references `${env:GALAXY_URL}` and
`${env:GALAXY_API_KEY}`, so export both in your shell profile (`~/.zshrc`
or `~/.bashrc`) and start Cursor from a terminal, or log out and back in so
GUI apps pick them up:

```bash
export GALAXY_URL="https://usegalaxy.org"
export GALAXY_API_KEY="paste-your-key-here"
```

Alternatively keep them in a project `.env` file; `galaxy-mcp` reads it from
the working directory.

## Install the plugins

1. Open **Customize** in the sidebar, choose **From GitHub Repository**, and
   enter `galaxyproject/agentic-plugins`.
2. Install `galaxy-mcp` and `galaxy-skills` (using Galaxy); add
   `galaxy-dev-skills` if you write tool wrappers or convert pipelines, and
   `foundry-skills` if you build Galaxy workflows. Choose user or project
   scope.
3. Reload the window (**Developer: Reload Window**).

To try the plugins without a marketplace, clone this repository and copy or
symlink the plugin directories into `~/.cursor/plugins/local/`, then reload.

## MCP server only (one click)

If you only want the Galaxy connection, this link adds the server to your
`mcp.json` (it references the two environment variables, no secret is
embedded):

[Add Galaxy to Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=galaxy&config=eyJjb21tYW5kIjoidXZ4IiwiYXJncyI6WyJnYWxheHktbWNwIl0sImVudiI6eyJHQUxBWFlfVVJMIjoiJHtlbnY6R0FMQVhZX1VSTH0iLCJHQUxBWFlfQVBJX0tFWSI6IiR7ZW52OkdBTEFYWV9BUElfS0VZfSJ9fQ%3D%3D)

Or add it by hand to `~/.cursor/mcp.json` (global) or `.cursor/mcp.json`
(project):

```json
{
  "mcpServers": {
    "galaxy": {
      "command": "uvx",
      "args": ["galaxy-mcp"],
      "env": {
        "GALAXY_URL": "${env:GALAXY_URL}",
        "GALAXY_API_KEY": "${env:GALAXY_API_KEY}"
      }
    }
  }
}
```

A project config can also point at an env file instead:
`"envFile": "${workspaceFolder}/.env"`.

## Verify

1. Open **Customize > MCP**; `galaxy` should show as enabled with its tools
   listed.
2. Ask the agent: *"Connect to Galaxy and tell me who I am."* It calls
   `get_user` and reports your username and the server version.

If something is off, run `/galaxy-connect` in the agent chat; that skill walks
the agent through diagnosing the connection.

## Use the skills

Type `/` in Agent chat and pick a skill, for example `/galaxy-integration`,
`/galaxy-mcp-reference`, `/collection-manipulation`, `/udt-authoring`,
`/reproduciblify`, `/tool-dev`, `/nf-to-galaxy`,
`/pipeline-nextflow-to-galaxy`, `/discover-shed-tool`. The agent also applies skills on its own when a request
matches a description. Installed skills are listed under **Customize > Skills**.

## Skills without the plugins

Cursor reads skills from `~/.cursor/skills/` and `~/.agents/skills/` (and
from `.cursor/skills/` or `.agents/skills/` in a project), walking them
recursively, so a plain clone works:

```bash
git clone https://github.com/galaxyproject/galaxy-skills ~/.cursor/skills/galaxy-skills
```

## Update

Reinstall the plugins from **Customize** after the repository updates, or
`git pull` a local clone under `~/.cursor/plugins/local/` and reload.

## Troubleshooting

- **No `galaxy` server under Customize > MCP**: reload the window; confirm
  `uv --version` works in a terminal Cursor can see.
- **"Missing Galaxy URL and API key"**: the variables are not visible to
  Cursor (GUI launch without your shell profile). Use a project `.env` file,
  or start Cursor from a terminal where they are exported.
- **Server fails to start**: run `uvx galaxy-mcp` in a terminal to see the
  error.
- **"Provided API key is not valid"**: the key belongs to a different server or
  was revoked.
