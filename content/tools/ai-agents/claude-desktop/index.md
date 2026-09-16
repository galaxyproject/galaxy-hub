---
title: "Galaxy for Claude Desktop"
tease: "One-click Galaxy connection for Claude Desktop, no terminal required."
subsites: [all]
autotoc: true
---

This page installs the **galaxy-mcp** server into
[Claude Desktop](https://claude.com/download) as a one-click bundle, so Claude
can list your histories, upload and inspect datasets, search and run tools,
and invoke workflows on your Galaxy server. No terminal needed.

Skills (galaxy-skills, foundry-skills) are for coding agents and do not apply
to Claude Desktop.

## Prerequisites

- Claude Desktop for macOS or Windows (Linux builds also support bundles).
- A Galaxy API key. See [Getting a Galaxy API key](/tools/ai-agents/api-key/).

Python is **not** required: the bundle uses Claude Desktop's built-in `uv`
runtime, which downloads Python and installs `galaxy-mcp` from PyPI on first
start.

## Install

1. Download `galaxy-mcp.mcpb` from the
   [latest release](https://github.com/galaxyproject/agentic-plugins/releases/latest).
2. Open it with Claude Desktop (double-click, or drag it onto the Claude
   window; you can also use **Settings > Extensions > Advanced settings >
   Install Extension...**).
3. In the install dialog, fill in:
   - **Galaxy URL**: your server, default `https://usegalaxy.org`.
   - **Galaxy API key**: the key from *User > Preferences > Manage API Key*.
     It is stored in your system keychain.
4. Click **Install**. The first start takes a minute while `galaxy-mcp` is
   downloaded.

## Verify

Start a new chat and ask: *"Connect to Galaxy and tell me who I am."* Claude
calls `get_user` and reports your username and the server version. Then try
*"Show my three most recent histories."*

## Change the URL or key

**Settings > Extensions > Galaxy > Configure**. Restart the chat afterwards.

## Update

Download the newer `.mcpb` from the releases page and open it; Claude Desktop
replaces the installed version and keeps your settings.

## Manual alternative (no bundle)

Add the server to `claude_desktop_config.json` (**Settings > Developer > Edit
Config**). This requires [uv](https://docs.astral.sh/uv/) on your `PATH`:

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

## Troubleshooting

- **Extension shows an error after install**: open
  **Settings > Extensions > Galaxy** and check the log; the first start needs
  network access to fetch Python and `galaxy-mcp`.
- **"Provided API key is not valid"**: the key belongs to a different server or
  was revoked; create a new one and update it under **Configure**.
- **"Missing Galaxy URL and API key"**: the configuration dialog was skipped;
  open **Configure** and fill both fields.
- **Slow first response**: `galaxy-mcp` starts on demand; later calls are fast.
