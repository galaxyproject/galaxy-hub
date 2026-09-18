---
title: "Getting a Galaxy API key"
tease: "Where to find the API key every agent needs, and the two ways to hand it to galaxy-mcp."
subsites: [all]
autotoc: false
generated_from: https://github.com/galaxyproject/agentic-plugins/blob/main/docs/galaxy-api-key.md
---

Every Galaxy server issues its own API keys, and a key gives full access to
your account on that server. Treat it like a password.

1. Log in to the Galaxy server you want to use, for example
   [usegalaxy.org](https://usegalaxy.org), [usegalaxy.eu](https://usegalaxy.eu),
   [usegalaxy.org.au](https://usegalaxy.org.au) or your institution's server.
2. Open the **User** menu (top bar) and choose **Preferences**.
3. Choose **Manage API Key**.
4. Click **Create a new key** if you do not have one, then copy it.

You now have two values the agent needs:

| Value | Example |
|-------|---------|
| Galaxy URL (base URL of the server, no `/api`) | `https://usegalaxy.org` |
| Galaxy API key | `1a2b3c4d...` |

To revoke a key, create a new one on the same page; the old key stops working.

## Where the values go

`galaxy-mcp`, the MCP server used by all the harnesses documented here, reads
`GALAXY_URL` and `GALAXY_API_KEY` from its environment, or from a `.env` file in
the current directory or any parent directory. Each harness page explains how
to hand these values to the server; the two options that work everywhere are:

**Shell environment** (add to `~/.zshrc` or `~/.bashrc`, then open a new
terminal):

```bash
export GALAXY_URL="https://usegalaxy.org"
export GALAXY_API_KEY="paste-your-key-here"
```

**Project `.env` file** (keep it out of version control):

```
GALAXY_URL=https://usegalaxy.org
GALAXY_API_KEY=paste-your-key-here
```
