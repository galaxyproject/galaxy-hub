---
title: "Use Galaxy from Your AI Agent"
tease: "Pick your harness — Claude Code, Codex CLI, Antigravity, Claude Desktop, Pi, or Cursor — and connect to Galaxy in three clear steps (A, B, C)."
subsites: [all]
components: true
autotoc: false
skip_title_render: true
full_bleed: true
og_image: /images/galaxy-logos/galaxy_logo_25percent.png
generated_from: https://github.com/galaxyproject/agentic-plugins/blob/main/scripts/export-hub.py
---

<HarnessGuides>

<HarnessGuide id="claude-code" name="Claude Code" source="https://github.com/galaxyproject/agentic-plugins/blob/main/docs/claude-code.md">

Connects [Claude Code](https://code.claude.com) to Galaxy with the `galaxy-mcp`
server (48 Galaxy tools) and curated `galaxy-skills`.

#### Step A · Get your Galaxy API key and request UDT access

1. **API key:** Log in to [usegalaxy.org](https://usegalaxy.org) (or
   [usegalaxy.eu](https://usegalaxy.eu), [usegalaxy.org.au](https://usegalaxy.org.au),
   or your institution's server) → **User › Preferences › Manage API Key** →
   **Create a new key** → copy it. *(Keep it out of chat; Claude Code saves it in
   your system keychain in Step B.)*
2. **User-Defined Tools beta (UseGalaxy.org):** Submit the 30-second form at
   **[udt-signup.galaxyproject.org](https://udt-signup.galaxyproject.org/)**
   with your UseGalaxy.org email *(optional ORCID sign-in speeds review)*. All
   installed Galaxy tools and workflows work immediately; once approved, Claude
   can also write and run custom containerized YAML tools (`create_user_tool` /
   `run_user_tool`).

#### Step B · Install in Claude Code

**Needs:** Claude Code (`claude --version`) and [uv](https://docs.astral.sh/uv/)
on your `PATH` (`uv --version`).

Run inside Claude Code:

```
/plugin marketplace add galaxyproject/agentic-plugins
/plugin install galaxy-mcp@galaxyproject
/plugin install galaxy-skills@galaxyproject
```

Installing `galaxy-mcp` prompts for your **Galaxy URL** (default
`https://usegalaxy.org`, no `/api`) and **API key**. **Start a new Claude Code
session afterwards.**

Building Galaxy XML wrappers or Workflow Foundry casts? Add only what you need
(every installed skill adds its description to each turn's context):

```
/plugin install galaxy-dev-skills@galaxyproject
/plugin install foundry-skills@galaxyproject
```

#### Step C · Verify and run

1. Run `/mcp` (`galaxy` shows **connected**), then ask:

   ```
   Connect to Galaxy and tell me who I am.
   ```

   Claude calls `get_user` and reports your Galaxy username and account details.
   *(If anything fails, run `/galaxy-mcp:galaxy-connect`.)*
2. Ask for real work in plain language — uploading FASTQs, running IWC
   workflows, writing in-Galaxy JupyterLite (`gxy`) notebooks, rebuilding
   scratch histories (`reproduciblify`), or authoring containerized UDTs.

<details>
<summary>Skills, terminal install, updates, and reconfiguration</summary>

##### Invoke skills directly or in plain language

Claude picks skills automatically from your prompt, or you can invoke them with `/`:

| Command | Purpose |
|---------|---------|
| `/galaxy-mcp:galaxy-connect` | Diagnose or verify the Galaxy connection |
| `/galaxy-skills:galaxy-integration` | Choose between MCP, JupyterLite (`gxy`), and BioBlend scripts |
| `/galaxy-skills:galaxy-mcp-reference` | Galaxy MCP tool catalog and ID pitfalls |
| `/galaxy-skills:collection-manipulation` | Filter, sort, relabel, and reshape dataset collections |
| `/galaxy-skills:udt-authoring` | Author validated `GalaxyUserTool` YAML definitions |
| `/galaxy-skills:workflow-reports` | Draft Galaxy Workflow Editor report templates |
| `/galaxy-skills:reproduciblify` | Rebuild a messy history into a clean, workflow-extractable analysis |
| `/galaxy-dev-skills:tool-dev` | Author and test ToolShed XML wrappers (`galaxy-dev-skills`) |
| `/galaxy-dev-skills:nf-to-galaxy` | Convert Nextflow modules and pipelines (`galaxy-dev-skills`) |
| `/foundry-skills:pipeline-nextflow-to-galaxy` | End-to-end Nextflow-to-Galaxy Foundry pipeline (`foundry-skills`) |

##### Install from a terminal (or headlessly)

On Claude Code 2.1.275+, `--marketplace` adds the marketplace automatically
(export `GALAXY_API_KEY` first so the secret stays out of shell history):

```bash
claude plugin install galaxy-mcp --marketplace galaxyproject/agentic-plugins \
  --config galaxy_url=https://usegalaxy.org \
  --config galaxy_api_key="$GALAXY_API_KEY"
claude plugin install galaxy-skills@galaxyproject
```

##### Change URL/key or update

Reconfigure anytime with `/plugin configure galaxy-mcp@galaxyproject` (then
start a new session). Update installed plugins with:

```
/plugin marketplace update galaxyproject
/plugin update galaxy-mcp@galaxyproject
/plugin update galaxy-skills@galaxyproject
```

</details>

<details>
<summary>Manual MCP setup and troubleshooting</summary>

##### Register `galaxy-mcp` without the plugin

```bash
claude mcp add --scope user galaxy \
  -e GALAXY_URL=https://usegalaxy.org \
  -e GALAXY_API_KEY="$GALAXY_API_KEY" \
  -- uvx galaxy-mcp
```

##### Troubleshooting

- **No `galaxy` server in `/mcp`**: start a new session after installing; confirm `uv --version` works.
- **Server fails on first start**: run `uvx galaxy-mcp` in a terminal to inspect the error (first run needs network access to fetch `galaxy-mcp` from PyPI).
- **"Plugin option galaxy_api_key isn't set"** or **"Missing Galaxy URL and API key"**: run `/plugin configure galaxy-mcp@galaxyproject` and fill in both fields, or place `GALAXY_URL` and `GALAXY_API_KEY` in a project `.env` file.
- **"Provided API key is not valid"**: keys are per Galaxy server; create or copy the key from the matching server and reconfigure.

</details>

</HarnessGuide>

<HarnessGuide id="codex" name="Codex CLI" source="https://github.com/galaxyproject/agentic-plugins/blob/main/docs/codex.md">

Connects [OpenAI Codex CLI](https://developers.openai.com/codex/cli) to Galaxy
with the `galaxy-mcp` server (48 Galaxy tools) and curated `galaxy-skills`.

#### Step A · Get your Galaxy API key, request UDT access, and export credentials

1. **API key:** Log in to [usegalaxy.org](https://usegalaxy.org) (or
   [usegalaxy.eu](https://usegalaxy.eu), [usegalaxy.org.au](https://usegalaxy.org.au),
   or your institution's server) → **User › Preferences › Manage API Key** →
   **Create a new key** → copy it.
2. **User-Defined Tools beta (UseGalaxy.org):** Submit the 30-second form at
   **[udt-signup.galaxyproject.org](https://udt-signup.galaxyproject.org/)**
   with your UseGalaxy.org email *(optional ORCID sign-in speeds review)*. Basic
   tools and workflows work immediately while we approve UDT access.
3. **Export credentials:** Codex forwards `GALAXY_URL` (no `/api`) and
   `GALAXY_API_KEY` from your shell. Add both to `~/.zshrc` or `~/.bashrc` (then
   open a new terminal), or place them in a project `.env` file (gitignored):

   ```bash
   export GALAXY_URL="https://usegalaxy.org"
   export GALAXY_API_KEY="paste-your-key-here"
   ```

#### Step B · Install in Codex CLI

**Needs:** Codex CLI (`codex --version`) and [uv](https://docs.astral.sh/uv/) on
your `PATH` (`uv --version`).

```bash
codex plugin marketplace add galaxyproject/agentic-plugins
codex plugin add galaxy-mcp@galaxyproject
codex plugin add galaxy-skills@galaxyproject
```

**Start a new `codex` session afterwards.**

Building Galaxy XML wrappers or Workflow Foundry casts? Add only what you need
(every installed skill adds to per-turn context):

```bash
codex plugin add galaxy-dev-skills@galaxyproject
codex plugin add foundry-skills@galaxyproject
```

#### Step C · Verify and run

1. Run `codex mcp list` (or `/mcp` inside Codex — `galaxy` shows `enabled`),
   then ask:

   ```
   Connect to Galaxy and tell me who I am.
   ```

   Approve the MCP tool prompt on first use — Codex calls `get_user` and reports
   your Galaxy username and account details. *(If anything fails, type
   `$galaxy-connect`.)*
2. Ask in plain language — upload FASTQs, run IWC workflows, write in-Galaxy
   JupyterLite (`gxy`) notebooks, rebuild scratch histories (`$reproduciblify`),
   or author containerized UDTs (`$udt-authoring`).

<details>
<summary>Skills, updates, and removing plugins</summary>

##### Use the skills

Codex picks skills automatically from your prompt, or you can invoke them with
`$` (or `/skills`): `$galaxy-connect`, `$galaxy-integration`,
`$jupyterlite-galaxy`, `$galaxy-mcp-reference`, `$collection-manipulation`,
`$udt-authoring`, `$workflow-reports`, `$reproduciblify` (plus `$tool-dev` and
`$nf-to-galaxy` if `galaxy-dev-skills` is installed).

##### Update or remove

```bash
codex plugin marketplace upgrade
codex plugin add galaxy-mcp@galaxyproject
codex plugin add galaxy-skills@galaxyproject
```

Remove any plugin with `codex plugin remove <name>@galaxyproject`.

</details>

<details>
<summary>Manual MCP setup and troubleshooting</summary>

##### Register `galaxy-mcp` without the plugin

Add to `~/.codex/config.toml` (forwards variables from your shell without writing
your key to disk):

```toml
[mcp_servers.galaxy]
command = "uvx"
args = ["galaxy-mcp"]
env_vars = ["GALAXY_URL", "GALAXY_API_KEY"]
```

##### Troubleshooting

- **No `galaxy` server in `/mcp`**: start a new Codex session; verify `uv --version`.
- **"Missing Galaxy URL and API key"**: variables were not exported in the shell that launched Codex (common with GUI launchers). Put `GALAXY_URL` and `GALAXY_API_KEY` in a project `.env` file or export them before running `codex`.
- **Server fails to start**: run `uvx galaxy-mcp` in a terminal to see the underlying error.
- **"Provided API key is not valid"**: the key belongs to a different Galaxy server or was revoked.

</details>

</HarnessGuide>

<HarnessGuide id="antigravity" name="Antigravity" source="https://github.com/galaxyproject/agentic-plugins/blob/main/docs/antigravity.md">

Connects Google [Antigravity](https://antigravity.google) (`agy` CLI and IDE,
sharing `~/.gemini/config/`) to Galaxy with the `galaxy-mcp` server (48 Galaxy
tools) and curated `galaxy-skills`.

#### Step A · Get your Galaxy API key, request UDT access, and export credentials

1. **API key:** Log in to [usegalaxy.org](https://usegalaxy.org) (or
   [usegalaxy.eu](https://usegalaxy.eu), [usegalaxy.org.au](https://usegalaxy.org.au),
   or your institution's server) → **User › Preferences › Manage API Key** →
   **Create a new key** → copy it.
2. **User-Defined Tools beta (UseGalaxy.org):** Submit the 30-second form at
   **[udt-signup.galaxyproject.org](https://udt-signup.galaxyproject.org/)**
   with your UseGalaxy.org email *(optional ORCID sign-in speeds review)*. Basic
   tools and workflows work immediately while we approve UDT access.
3. **Export credentials:** Add both variables to `~/.zshrc` or `~/.bashrc` (then
   open a new terminal), or place them in a workspace `.env` file (recommended
   when launching the Antigravity IDE from the Dock, which may not read
   `~/.zshrc`):

   ```bash
   export GALAXY_URL="https://usegalaxy.org"
   export GALAXY_API_KEY="paste-your-key-here"
   ```

#### Step B · Install in Antigravity

**Needs:** Antigravity (`agy --version` or IDE), [uv](https://docs.astral.sh/uv/)
on your `PATH`, and `git`.

```bash
git clone https://github.com/galaxyproject/agentic-plugins.git ~/.galaxy-agentic-plugins
agy plugin install ~/.galaxy-agentic-plugins/plugins/galaxy-mcp
agy plugin install ~/.galaxy-agentic-plugins/plugins/galaxy-skills
```

**Start a new session afterwards.**

Building Galaxy XML wrappers or Workflow Foundry casts? Add only what you need:

```bash
agy plugin install ~/.galaxy-agentic-plugins/plugins/galaxy-dev-skills
agy plugin install ~/.galaxy-agentic-plugins/plugins/foundry-skills
```

#### Step C · Verify and run

1. Type `/mcp` (`galaxy-mcp_galaxy` shows **running**), then ask:

   ```
   Connect to Galaxy and tell me who I am.
   ```

   The agent calls `get_user` and reports your Galaxy username and account
   details. *(If anything fails, run `/galaxy-connect`.)*
2. Ask in plain language — upload FASTQs, run IWC workflows, write in-Galaxy
   JupyterLite (`gxy`) notebooks, rebuild scratch histories (`/reproduciblify`),
   or author containerized UDTs (`/udt-authoring`).

<details>
<summary>Skills, workspace scoping, and updates</summary>

##### Use the skills

Run `/skills` or type `/<skill-name>` — `/galaxy-connect`, `/galaxy-integration`,
`/galaxy-mcp-reference`, `/collection-manipulation`, `/udt-authoring`,
`/workflow-reports`, `/reproduciblify` (plus `/tool-dev` and `/nf-to-galaxy`
from `galaxy-dev-skills`). Nested sub-skills such as `jupyterlite-galaxy` are
loaded automatically through their parent skill.

To scope a plugin to one workspace instead of installing globally, copy its
folder into `<workspace>/.agents/plugins/`.

##### Update or remove

```bash
git -C ~/.galaxy-agentic-plugins pull
agy plugin install ~/.galaxy-agentic-plugins/plugins/galaxy-mcp
agy plugin install ~/.galaxy-agentic-plugins/plugins/galaxy-skills
```

Use `agy plugin list` to inspect installed plugins and `agy plugin uninstall <name>` to remove one.

</details>

<details>
<summary>Manual MCP setup and troubleshooting</summary>

##### Register `galaxy-mcp` without the plugin

(`${VAR}` placeholders inside `mcp_config.json` are not expanded by Antigravity; pass values via `--env` from an exported shell variable instead, and skip installing the `galaxy-mcp` plugin so the server is not registered twice.)

```bash
agy mcp add --env GALAXY_URL=https://usegalaxy.org \
            --env GALAXY_API_KEY="$GALAXY_API_KEY" \
            galaxy uvx galaxy-mcp
```

##### Troubleshooting

- **No `galaxy-mcp_galaxy` in `/mcp`**: start a new session; check `agy plugin list` and `uv --version`.
- **"Missing Galaxy URL and API key"**: GUI IDE launches often miss `~/.zshrc`; add `GALAXY_URL` and `GALAXY_API_KEY` to a workspace `.env` file or register via `agy mcp add --env` above.
- **Server fails to start**: run `uvx galaxy-mcp` in a terminal to inspect the error.
- **"Provided API key is not valid"**: key belongs to a different Galaxy server or was revoked.

</details>

</HarnessGuide>

<HarnessGuide id="claude-desktop" name="Claude Desktop" source="https://github.com/galaxyproject/agentic-plugins/blob/main/docs/claude-desktop.md">

Connects [Claude Desktop](https://claude.com/download) to Galaxy as a
**one-click bundle** (48 Galaxy MCP tools: histories, datasets, tools, IWC
workflows, and User-Defined Tools). **No terminal or Python install required.**

*(Agent Skills apply only to coding agents — Claude Desktop uses the MCP tools directly.)*

#### Step A · Get your Galaxy API key and request UDT access

1. **API key:** Log in to [usegalaxy.org](https://usegalaxy.org) (or
   [usegalaxy.eu](https://usegalaxy.eu), [usegalaxy.org.au](https://usegalaxy.org.au),
   or your institution's server) → **User › Preferences › Manage API Key** →
   **Create a new key** → copy it. *(Keep it out of chat; Claude Desktop stores
   it in your system keychain in Step B.)*
2. **User-Defined Tools beta (UseGalaxy.org):** Submit the 30-second form at
   **[udt-signup.galaxyproject.org](https://udt-signup.galaxyproject.org/)**
   with your UseGalaxy.org email *(optional ORCID sign-in speeds review)*. Basic
   tools and workflows work immediately; once approved, Claude can also create
   and run custom containerized tools (`create_user_tool` / `run_user_tool`).

#### Step B · Install the one-click bundle

1. Download **`galaxy-mcp.mcpb`** from the
   [latest release](https://github.com/galaxyproject/agentic-plugins/releases/latest)
   and double-click it (or drag onto Claude Desktop / **Settings › Extensions ›
   Advanced settings › Install Extension…**).
2. In the install dialog, fill in **Galaxy URL** (default `https://usegalaxy.org`,
   no `/api`) and **Galaxy API key**, then click **Install**. *(First start takes
   ~30–60 seconds while Claude Desktop's built-in runtime downloads `galaxy-mcp`.)*

#### Step C · Verify and run

Start a new chat and ask:

```
Connect to Galaxy and tell me who I am.
```

Claude calls `get_user` and reports your Galaxy username and account details.
Then ask it to inspect histories, upload datasets, launch IWC workflows, or
author and run User-Defined Tools.

<details>
<summary>Reconfigure, update, manual setup, and troubleshooting</summary>

##### Change the Galaxy URL or API key

Open **Settings › Extensions › Galaxy › Configure**, update your values, and
start a new chat.

##### Update

Download the newest `galaxy-mcp.mcpb` from the
[releases page](https://github.com/galaxyproject/agentic-plugins/releases/latest)
and open it — Claude Desktop upgrades in place and keeps your credentials.

##### Manual config (without `.mcpb` bundle)

Requires [uv](https://docs.astral.sh/uv/) on your `PATH`. Add to
`claude_desktop_config.json` (**Settings › Developer › Edit Config**):

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

##### Troubleshooting

- **Extension error right after install**: check **Settings › Extensions › Galaxy** logs; first launch requires network access to download Python and `galaxy-mcp`.
- **"Missing Galaxy URL and API key"**: open **Settings › Extensions › Galaxy › Configure** and fill both fields.
- **"Provided API key is not valid"**: key belongs to a different Galaxy server or was revoked; generate a fresh key and update **Configure**.
- **Slow first tool call**: `galaxy-mcp` starts on demand; subsequent calls are fast.

</details>

</HarnessGuide>

<HarnessGuide id="other" name="Pi / Cursor / Other" source="https://github.com/galaxyproject/agentic-plugins/tree/main/docs">

Connects [Pi](https://pi.dev), [Cursor](https://cursor.com), OpenCode, or any MCP-capable coding agent to Galaxy with `galaxy-mcp` (48 Galaxy tools) and curated `galaxy-skills`.

#### Step A · Get your Galaxy API key, request UDT access, and export credentials

1. **API key:** Log in to [usegalaxy.org](https://usegalaxy.org) (or [usegalaxy.eu](https://usegalaxy.eu), [usegalaxy.org.au](https://usegalaxy.org.au), or your institution's server) → **User › Preferences › Manage API Key** → **Create a new key** → copy it.
2. **User-Defined Tools beta (UseGalaxy.org):** Submit the 30-second form at **[udt-signup.galaxyproject.org](https://udt-signup.galaxyproject.org/)** with your UseGalaxy.org email *(optional ORCID sign-in speeds review)*. Basic tools and workflows work immediately while we approve UDT access.
3. **Export credentials:** Add both variables to `~/.zshrc` or `~/.bashrc` (then open a new terminal), or place them in a project `.env` file (gitignored):

   ```bash
   export GALAXY_URL="https://usegalaxy.org"
   export GALAXY_API_KEY="paste-your-key-here"
   ```

#### Step B · Install for your harness

**Needs:** [uv](https://docs.astral.sh/uv/) on your `PATH` (`uv --version`).

<h5 id="pi">Pi (<code>pi</code> 1.x)</h5>

*(Install or upgrade Pi via `npm i -g @earendil-works/pi-coding-agent`.)*

```bash
pi mcp add galaxy -- uvx galaxy-mcp
pi install git:github.com/galaxyproject/agentic-plugins
```

Restart `pi` afterwards (`pi mcp list` checks the connection). *(Full guide: [docs/pi.md](https://github.com/galaxyproject/agentic-plugins/blob/main/docs/pi.md).)*

<h5 id="cursor">Cursor</h5>

1. Open **Customize** in the Cursor sidebar → **From GitHub Repository** → enter `galaxyproject/agentic-plugins`.
2. Install **`galaxy-mcp`** and **`galaxy-skills`** *(skip `galaxy-dev-skills` and `foundry-skills` unless you build XML wrappers or Foundry workflows)*.
3. Run **Developer: Reload Window**. *(Full guide + one-click MCP link: [docs/cursor.md](https://github.com/galaxyproject/agentic-plugins/blob/main/docs/cursor.md).)*

<h5 id="generic-mcp">OpenCode or any MCP + Agent Skills client</h5>

Clone the skills into `~/.agents/skills/` and register `uvx galaxy-mcp` in your agent's MCP config:

```bash
git clone https://github.com/galaxyproject/galaxy-skills ~/.agents/skills/galaxy-skills
```

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

#### Step C · Verify and run

Ask your agent:

```
Connect to Galaxy and tell me who I am.
```

It calls `get_user` and reports your Galaxy username and account details *(troubleshoot anytime with `galaxy-connect`)*. Then ask in plain language — upload FASTQs, run IWC workflows, write in-Galaxy JupyterLite (`gxy`) notebooks, rebuild scratch histories (`reproduciblify`), or author containerized UDTs (`udt-authoring`).

<details>
<summary>Pi skill filtering (context budget) and updates</summary>

##### Keep only analyst skills in Pi

`pi install` loads all 86 skills across `galaxy-skills`, `galaxy-dev-skills`, and `foundry-skills`. Exclude the developer sets in `~/.pi/agent/settings.json` (or `.pi/settings.json`) to save per-turn context:

```json
{
  "packages": [
    {
      "source": "git:github.com/galaxyproject/agentic-plugins",
      "skills": ["!plugins/foundry-skills/**", "!plugins/galaxy-dev-skills/**"]
    }
  ]
}
```

Update Pi packages anytime with `pi update --extensions`.

</details>

</HarnessGuide>

</HarnessGuides>

<div class="ag-band">

## What your plugins include

For everyday data analysis, install **`galaxy-mcp`** + **`galaxy-skills`** only. Add the developer sets only if you build XML tool wrappers or construct workflows, since every installed skill adds its description to each turn's context:

| Plugin | Audience | Contents | Default |
|--------|----------|----------|---------|
| **`galaxy-mcp`** | Everyone | Live Galaxy connection (48 MCP tools: histories, datasets, tools, IWC workflows, UDTs) + `galaxy-connect` | **Install** |
| **`galaxy-skills`** | Analysts & researchers | 7 skills for *using* Galaxy: MCP patterns, collections, in-Galaxy JupyterLite notebooks (`gxy`), UDT authoring, workflow reports, `reproduciblify` | **Install** *(coding agents)* |
| **`galaxy-dev-skills`** | Tool developers | 9 skills for *building* Galaxy: ToolShed XML wrappers (`tool-dev`), Nextflow conversion (`nf-to-galaxy`), `usegalaxy-tools`, UCSC track hubs, Hub news | Optional |
| **`foundry-skills`** | Workflow engineers | 69 Workflow Foundry casts turning papers, Nextflow, and CWL into validated Galaxy workflows | Optional |

## More in this section

<div class="ag-examples">
<div class="ag-example">

**[The Galaxy agentic stack](/agents/stack/)**

See an agent write and run a containerized YAML tool when no installed Galaxy tool fits, with every command, container, and dataset recorded in your history.

</div>
<div class="ag-example">

**[User-Defined Tools](/tools/user-defined-tools/)**

YAML tool syntax, sandbox model, real examples, and per-account beta access on UseGalaxy.org via [udt-signup.galaxyproject.org](https://udt-signup.galaxyproject.org/).

</div>
<div class="ag-example">

**[Orbit desktop app (beta)](/agents/orbit/)**

Don't use a coding agent yet? Orbit is a standalone desktop app for macOS, Linux, and Windows with Galaxy and the Galaxy skills already wired in.

</div>
</div>

## Get help & share feedback

- **Agents & User-Defined Tools forum:** [GitHub Discussions (`Agents & UDTs`)](https://github.com/galaxyproject/galaxy/discussions/categories/agents-udts) — Q&A, beta feedback, and working `GalaxyUserTool` YAMLs *(real-time Matrix chat: [#galaxyproject:matrix.org](https://matrix.to/#/#galaxyproject:matrix.org))*.
- **Connection diagnostics:** run `galaxy-connect` in your agent or open the **Manual MCP setup and troubleshooting** drawer in your tab above.
- **General Galaxy support:** [Galaxy Help forum](https://help.galaxyproject.org/).
- **Plugin & bundle issues:** [galaxyproject/agentic-plugins](https://github.com/galaxyproject/agentic-plugins) (upstream skills: [galaxy-skills](https://github.com/galaxyproject/galaxy-skills) and [foundry](https://github.com/galaxyproject/foundry)).

</div>
