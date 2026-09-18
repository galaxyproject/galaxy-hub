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
repository, and everything you need is on this page: get an API key, then pick
your harness under [Set up your agent](#set-up-your-agent).

<div class="callout">
Looking for a complete AI research assistant built around Galaxy rather than a
plugin for the agent you already use? See <a href="/tools/orbit/">Orbit</a>.
</div>

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

## Get a Galaxy API key

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

### Where the values go

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

## Set up your agent

Pick your harness. Each guide covers install, credentials, verification, the
skills, updates, alternatives and troubleshooting. Other agents that read Agent
Skills from `~/.agents/skills/` can use the skills by cloning
[galaxy-skills](https://github.com/galaxyproject/galaxy-skills) there and
adding the MCP server by hand with `uvx galaxy-mcp`.

<HarnessGuides>

<HarnessGuide id="claude-code" name="Claude Code" source="https://github.com/galaxyproject/agentic-plugins/blob/main/docs/claude-code.md">

This page sets up [Claude Code](https://code.claude.com) with:

- the **galaxy-mcp** server, so Claude can list histories, run tools, upload
  data and invoke workflows on your Galaxy server;
- **galaxy-skills**, curated skills for *using* Galaxy (MCP tool surface,
  collections, user-defined tools, workflow reports, reproducibility);
- **galaxy-dev-skills**, skills for *building* Galaxy (tool wrappers,
  Nextflow conversion, ToolShed revisions, track hubs, hub posts);
- **foundry-skills**, the Galaxy Workflow Foundry's workflow-construction skills.

#### Prerequisites

- Claude Code, a current release (`claude --version`).
- [uv](https://docs.astral.sh/uv/) on your `PATH`; the MCP server runs as
  `uvx galaxy-mcp`.
- A Galaxy API key. See [Getting a Galaxy API key](#get-a-galaxy-api-key).

#### Install

Inside Claude Code:

```
/plugin marketplace add galaxyproject/agentic-plugins
/plugin install galaxy-mcp@galaxyproject
/plugin install galaxy-skills@galaxyproject
/plugin install galaxy-dev-skills@galaxyproject
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
claude plugin install galaxy-dev-skills@galaxyproject
claude plugin install foundry-skills@galaxyproject
```

Install only what you need. `galaxy-skills` is the set for *using* Galaxy
(MCP tool surface, collections, user-defined tools, workflow reports,
reproducibility); `galaxy-dev-skills` is for *building* it (tool wrappers,
Nextflow conversion, ToolShed revisions, track hubs, hub posts);
`foundry-skills` adds 59 workflow-construction skills. Every installed skill
costs context on every turn, so skip the sets you will not use.

#### Verify

1. Run `/mcp`. A `galaxy` server should be listed under the `galaxy-mcp` plugin
   and connected.
2. Ask:

   ```
   Connect to Galaxy and tell me who I am.
   ```

   Claude calls `get_user` and reports your username and the server version.

If something is off, run `/galaxy-mcp:galaxy-connect`; that skill walks Claude
through diagnosing the connection.

#### Use the skills

Type `/` to see them. Plugin skills are namespaced, for example:

| Invocation | What it does |
|------------|--------------|
| `/galaxy-mcp:galaxy-connect` | Set up / verify / troubleshoot the Galaxy connection |
| `/galaxy-skills:galaxy-integration` | Connect to an instance and choose how to drive it |
| `/galaxy-skills:galaxy-mcp-reference` | The Galaxy MCP tool surface and its pitfalls |
| `/galaxy-skills:collection-manipulation` | Filter, sort and restructure dataset collections |
| `/galaxy-skills:udt-authoring` | Author user-defined tools (`GalaxyUserTool` YAML) |
| `/galaxy-skills:workflow-reports` | Draft workflow report templates |
| `/galaxy-skills:reproduciblify` | Rebuild a messy history as a clean, extractable analysis |
| `/galaxy-dev-skills:tool-dev` | Create, test and update Galaxy tool wrappers |
| `/galaxy-dev-skills:nf-to-galaxy` | Convert Nextflow processes and workflows |
| `/galaxy-dev-skills:update-usegalaxy-tool` | Add or bump ToolShed revisions in usegalaxy-tools |
| `/galaxy-dev-skills:trackhubs` | Publish UCSC track hubs and assembly hubs |
| `/galaxy-dev-skills:hub-news-posts` | Write Galaxy Hub news posts |
| `/foundry-skills:pipeline-nextflow-to-galaxy` | End-to-end Nextflow to Galaxy workflow conversion |
| `/foundry-skills:discover-shed-tool` | Find and pin a Tool Shed wrapper |

Claude also picks skills up on its own from your request; you do not have to
invoke them by name.

#### Update

```
/plugin marketplace update galaxyproject
/plugin update galaxy-mcp@galaxyproject
/plugin update galaxy-skills@galaxyproject
/plugin update galaxy-dev-skills@galaxyproject
/plugin update foundry-skills@galaxyproject
```

Updating `galaxy-mcp` may prompt again for the Galaxy URL and API key.

The skills plugins are versioned by the date they were synced from upstream
(a date such as `2026.9.17`).

#### Change the Galaxy URL or key

Run `/plugin configure galaxy-mcp@galaxyproject` and edit the options, then
start a new session. From a terminal, the same values can be set
non-interactively:

```bash
claude plugin install galaxy-mcp@galaxyproject \
  --config galaxy_url=https://usegalaxy.org \
  --config galaxy_api_key="$GALAXY_API_KEY"
```

Export `GALAXY_API_KEY` first (see
[Getting a Galaxy API key](#get-a-galaxy-api-key)); a key typed literally on the
command line is stored in your shell history.

Uninstalling and reinstalling the plugin also prompts again:

```
/plugin uninstall galaxy-mcp@galaxyproject
/plugin install galaxy-mcp@galaxyproject
```

#### Alternatives

**MCP server without the plugin.** Register `galaxy-mcp` directly and pass the
credentials yourself:

```bash
claude mcp add --scope user galaxy \
  -e GALAXY_URL=https://usegalaxy.org \
  -e GALAXY_API_KEY="$GALAXY_API_KEY" \
  -- uvx galaxy-mcp
```

Again the key comes from the exported variable (see
[Getting a Galaxy API key](#get-a-galaxy-api-key)); typing it literally here stores
it in your shell history.

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

#### Troubleshooting

- **No `galaxy` server in `/mcp`**: start a new session after installing; check
  `uv --version`.
- **Server fails to start**: run `uvx galaxy-mcp` in a terminal to see the
  error. A first run downloads the package and needs network access.
- **"Plugin option galaxy_api_key isn't set"** (in `/mcp` or the debug log):
  the install-time prompt was skipped; run
  `/plugin configure galaxy-mcp@galaxyproject` and fill in the options.
- **"Missing Galaxy URL and API key"**: the values did not reach the server;
  check `/plugin configure galaxy-mcp@galaxyproject`, or set `GALAXY_URL` /
  `GALAXY_API_KEY` in a project `.env` file.
- **"Provided API key is not valid"**: the key belongs to a different server or
  was revoked; create a new one and reinstall.

</HarnessGuide>

<HarnessGuide id="codex" name="Codex CLI" source="https://github.com/galaxyproject/agentic-plugins/blob/main/docs/codex.md">

This page sets up [OpenAI Codex CLI](https://developers.openai.com/codex/cli) with:

- the **galaxy-mcp** server, so Codex can list histories, run tools, upload
  data and invoke workflows on your Galaxy server;
- **galaxy-skills**, curated skills for *using* Galaxy (MCP tool surface,
  collections, user-defined tools, workflow reports, reproducibility);
- **galaxy-dev-skills**, skills for *building* Galaxy (tool wrappers,
  Nextflow conversion, ToolShed revisions, track hubs, hub posts);
- **foundry-skills**, the Galaxy Workflow Foundry's workflow-construction skills.

#### Prerequisites

- Codex CLI with plugin support (`codex --version`).
- [uv](https://docs.astral.sh/uv/) on your `PATH`; the MCP server runs as
  `uvx galaxy-mcp`.
- A Galaxy API key. See [Getting a Galaxy API key](#get-a-galaxy-api-key).

#### Set the credentials

Codex starts MCP servers with a minimal environment and forwards only the
variables a server asks for. The `galaxy-mcp` plugin asks for `GALAXY_URL` and
`GALAXY_API_KEY`, so export them in the shell that launches Codex (for example
in `~/.zshrc` or `~/.bashrc`):

```bash
export GALAXY_URL="https://usegalaxy.org"
export GALAXY_API_KEY="paste-your-key-here"
```

A `.env` file with the same two lines in your project directory also works.

#### Install

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

#### Verify

1. In a terminal, `codex mcp list` shows a `galaxy` server with
   `GALAXY_URL` and `GALAXY_API_KEY` (masked) and status `enabled`. Inside
   Codex, `/mcp` lists it too.
2. Ask:

   ```
   Connect to Galaxy and tell me who I am.
   ```

   Codex calls `get_user` and reports your username and the server version.

If something is off, type `$galaxy-connect` (or pick it from `/skills`) to
have Codex diagnose the connection.

#### Use the skills

Type `$` or run `/skills` to pick a skill, for example `$galaxy-integration`,
`$galaxy-mcp-reference`, `$collection-manipulation`, `$udt-authoring`,
`$reproduciblify`, and, if you installed `galaxy-dev-skills`, `$tool-dev` and
`$nf-to-galaxy`. Codex also selects skills implicitly from their descriptions.

Codex scans plugin skill directories recursively, so the sub-skills nested
under `nf-to-galaxy` and `galaxy-integration` (for example
`nf-process-to-galaxy-tool` and `jupyterlite-galaxy`) are listed under their
own names as well.

#### Update

```bash
codex plugin marketplace upgrade
codex plugin add galaxy-mcp@galaxyproject
codex plugin add galaxy-skills@galaxyproject
codex plugin add galaxy-dev-skills@galaxyproject
codex plugin add foundry-skills@galaxyproject
```

The first command refreshes the marketplace snapshot; re-adding a plugin
installs the new version. `galaxy-mcp` reads the credentials from your
environment, so no re-entry is needed. To remove a plugin:

```bash
codex plugin remove galaxy-skills@galaxyproject
```

#### Alternatives

**MCP server without the plugin.** In `~/.codex/config.toml`, forwarding the
variables from your shell instead of writing the key into the file:

```toml
[mcp_servers.galaxy]
command = "uvx"
args = ["galaxy-mcp"]
env_vars = ["GALAXY_URL", "GALAXY_API_KEY"]
```

or on the command line, taking the key from the same exported variable; a key
typed literally here is stored in your shell history:

```bash
codex mcp add galaxy \
  --env GALAXY_URL=https://usegalaxy.org \
  --env GALAXY_API_KEY="$GALAXY_API_KEY" \
  -- uvx galaxy-mcp
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

#### Troubleshooting

- **No `galaxy` server in `/mcp`**: start a new session after installing; check
  `uv --version`.
- **"Missing Galaxy URL and API key"**: the variables are not exported in the
  shell that started Codex (GUI launchers often do not read `~/.zshrc`). Use a
  project `.env` file, or the `~/.codex/config.toml` form above (or
  `codex mcp add ... --env ...`).
- **Server fails to start**: run `uvx galaxy-mcp` in a terminal to see the
  error.
- **"Provided API key is not valid"**: the key belongs to a different server or
  was revoked.

</HarnessGuide>

<HarnessGuide id="antigravity" name="Antigravity" source="https://github.com/galaxyproject/agentic-plugins/blob/main/docs/antigravity.md">

This page sets up Google [Antigravity](https://antigravity.google) (the `agy`
CLI and the IDE, which share `~/.gemini/config/`) with:

- the **galaxy-mcp** server, so the agent can list histories, run tools, upload
  data and invoke workflows on your Galaxy server;
- **galaxy-skills**, curated skills for *using* Galaxy (MCP tool surface,
  collections, user-defined tools, workflow reports, reproducibility);
- **galaxy-dev-skills**, skills for *building* Galaxy (tool wrappers,
  Nextflow conversion, ToolShed revisions, track hubs, hub posts);
- **foundry-skills**, the Galaxy Workflow Foundry's workflow-construction skills.

#### Prerequisites

- Antigravity CLI (`agy --version`) or the Antigravity IDE.
- [uv](https://docs.astral.sh/uv/) on your `PATH`; the MCP server runs as
  `uvx galaxy-mcp`.
- `git`.
- A Galaxy API key. See [Getting a Galaxy API key](#get-a-galaxy-api-key).

#### Set the credentials

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

#### Install

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

#### Verify

1. Type `/mcp` in the prompt to open the MCP manager; `galaxy-mcp_galaxy`
   (plugin servers are prefixed with the plugin name) should be running.
2. Ask:

   ```
   Connect to Galaxy and tell me who I am.
   ```

   The agent calls `get_user` and reports your username and the server version.

If something is off, run `/galaxy-connect`; that skill walks the agent through
diagnosing the connection.

#### Use the skills

Run `/skills` to list them, or type `/` followed by the skill name, for example
`/galaxy-integration`, `/galaxy-mcp-reference`, `/collection-manipulation`,
`/udt-authoring`, `/reproduciblify`, `/tool-dev`, `/nf-to-galaxy`,
`/pipeline-nextflow-to-galaxy`, `/discover-shed-tool`. The agent also picks skills up on its own from your
request.

Antigravity lists only top-level skills. The `nf-to-galaxy` and
`galaxy-integration` skills contain sub-skills in nested directories (for
example `nf-process-to-galaxy-tool`); the parent skill links to them, so the
agent reads them when needed even though they do not appear in `/skills`.

#### Update

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

#### Alternatives

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

#### Troubleshooting

- **No `galaxy-mcp_galaxy` in `/mcp`**: start a new session; run
  `agy plugin list` to confirm the plugin is installed; check `uv --version`.
- **"Missing Galaxy URL and API key"**: the variables are not exported in the
  shell that started `agy` (the IDE may not read `~/.zshrc`). Use a project
  `.env` file, or the `agy mcp add ... --env ...` form above.
- **Server fails to start**: run `uvx galaxy-mcp` in a terminal to see the
  error.
- **"Provided API key is not valid"**: the key belongs to a different server or
  was revoked.

</HarnessGuide>

<HarnessGuide id="pi" name="Pi" source="https://github.com/galaxyproject/agentic-plugins/blob/main/docs/pi.md">

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

#### Prerequisites

- Pi (`pi --version`) and Node.js.
- [uv](https://docs.astral.sh/uv/) on your `PATH`; the MCP server runs as
  `uvx galaxy-mcp`.
- A Galaxy API key. See [Getting a Galaxy API key](#get-a-galaxy-api-key).

#### Set the credentials

Pi's MCP adapter passes your shell environment to MCP servers, so export the
two variables in the shell that launches `pi` (for example in `~/.zshrc` or
`~/.bashrc`):

```bash
export GALAXY_URL="https://usegalaxy.org"
export GALAXY_API_KEY="paste-your-key-here"
```

A `.env` file with the same two lines in your project directory also works.

#### Install

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

#### Verify

1. Run `/mcp` inside Pi. A server named `galaxyproject_agentic_plugins__galaxy`
   should be listed (the adapter prefixes package-provided servers with the
   package name). It connects lazily on first use.
2. Ask:

   ```
   Connect to Galaxy and tell me who I am.
   ```

   The agent calls `get_user` through the adapter's `mcp` tool and reports your
   username and server version.

If something is off, run `/skill:galaxy-connect`; that skill walks the agent
through diagnosing the connection.

#### Use the skills

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

#### Update

```bash
pi update --extensions
```

refreshes installed packages. To pin a release, install a tag:
`pi install git:github.com/galaxyproject/agentic-plugins@<tag>`, where `<tag>`
is a release from
[the releases page](https://github.com/galaxyproject/agentic-plugins/releases).

#### Alternatives

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

#### Troubleshooting

- **No Galaxy server in `/mcp`**: confirm both packages are listed by
  `pi list`, restart Pi, and check `uv --version`.
- **"Missing Galaxy URL and API key"**: the variables are not exported in the
  shell that started `pi`. Use a project `.env` file, or the `.mcp.json` form
  above.
- **Server fails to start**: run `uvx galaxy-mcp` in a terminal to see the
  error.
- **"Provided API key is not valid"**: the key belongs to a different server or
  was revoked.

</HarnessGuide>

<HarnessGuide id="claude-desktop" name="Claude Desktop" source="https://github.com/galaxyproject/agentic-plugins/blob/main/docs/claude-desktop.md">

This page installs the **galaxy-mcp** server into
[Claude Desktop](https://claude.com/download) as a one-click bundle, so Claude
can list your histories, upload and inspect datasets, search and run tools,
and invoke workflows on your Galaxy server. No terminal needed.

Skills (galaxy-skills, galaxy-dev-skills, foundry-skills) are for coding
agents and do not apply to Claude Desktop.

#### Prerequisites

- Claude Desktop for macOS or Windows (Linux builds also support bundles).
- A Galaxy API key. See [Getting a Galaxy API key](#get-a-galaxy-api-key).

Python is **not** required: the bundle uses Claude Desktop's built-in `uv`
runtime, which downloads Python and installs `galaxy-mcp` from PyPI on first
start.

#### Install

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

#### Verify

Start a new chat and ask:

```
Connect to Galaxy and tell me who I am.
```

Claude calls `get_user` and reports your username and the server version. Then
try:

```
Show my three most recent histories.
```

#### Change the URL or key

**Settings > Extensions > Galaxy > Configure**. Restart the chat afterwards.

#### Update

Download the newer `.mcpb` from the releases page and open it; Claude Desktop
replaces the installed version and keeps your settings.

#### Manual alternative (no bundle)

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

#### Troubleshooting

- **Extension shows an error after install**: open
  **Settings > Extensions > Galaxy** and check the log; the first start needs
  network access to fetch Python and `galaxy-mcp`.
- **"Provided API key is not valid"**: the key belongs to a different server or
  was revoked; create a new one and update it under **Configure**.
- **"Missing Galaxy URL and API key"**: the configuration dialog was skipped;
  open **Configure** and fill both fields.
- **Slow first response**: `galaxy-mcp` starts on demand; later calls are fast.

</HarnessGuide>

</HarnessGuides>

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
