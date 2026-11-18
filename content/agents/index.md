---
title: "Use Galaxy from Your AI Agent"
tease: "Pick your agent — Orbit, Claude Code, Codex CLI, Antigravity, Claude Desktop, Pi, or Cursor — and connect to Galaxy in four clear numbered steps."
subsites: [all]
components: true
autotoc: false
skip_title_render: true
full_bleed: true
og_image: /images/galaxy-logos/galaxy_logo_25percent.png
generated_from: https://github.com/galaxyproject/agentic-plugins/blob/main/scripts/export-hub.py
---

<HarnessGuides>

<HarnessGuide id="orbit" name="Orbit" source="https://github.com/galaxyproject/galaxy-hub/blob/main/content/agents/orbit/index.md" sourceLabel="the Orbit guide in galaxy-hub">

<div class="hstep">
<div class="hstep__badge not-prose" aria-hidden="true">2</div>
<div class="hstep__body">

#### <span class="hstep__kicker">Step 2</span> Get your Galaxy key and a model key

- **Galaxy API key:** On [usegalaxy.org](https://usegalaxy.org) *(or [usegalaxy.eu](https://usegalaxy.eu) / [usegalaxy.org.au](https://usegalaxy.org.au))*, open **User › Preferences › Manage API Key** → **Create a new key**.
- **Custom tools on UseGalaxy.org *(optional)*:** Request [User-Defined Tools beta access](https://udt-signup.galaxyproject.org/) (~30s). Standard tools work immediately while we approve.
- **Model provider:** Grab an API key from [Anthropic](https://console.anthropic.com/) (`claude-sonnet-4-6` recommended), [OpenAI](https://platform.openai.com/), [Google Gemini](https://aistudio.google.com/), or [DeepSeek](https://platform.deepseek.com/) — or sign in with an existing **ChatGPT Plus / Pro** subscription inside Orbit.

</div>
</div>

<div class="hstep">
<div class="hstep__badge not-prose" aria-hidden="true">3</div>
<div class="hstep__body">

#### <span class="hstep__kicker">Step 3</span> Download Orbit and enter your keys

**[Orbit](/agents/orbit/)** is Galaxy's standalone desktop app — **`galaxy-mcp` and `galaxy-skills` are already built in** (no terminal required):

1. Download the installer for macOS (`.dmg`), Linux (`.deb` / `.rpm` / `.zip`), or Windows (`.zip`) from **[Orbit Releases](https://github.com/galaxyproject/orbit/releases/latest)** and open **Orbit**.
2. Press **`Cmd+,`** (`Ctrl+,` on Linux/Windows) to open **Preferences**:
   - **Provider:** paste your model key *(or choose **OpenAI Codex** → **Sign in with ChatGPT**)* and pick a default model.
   - **Galaxy:** enter `https://usegalaxy.org` (no `/api`) and paste your Galaxy API key → **Save** *(footer indicator turns green)*.

</div>
</div>

<div class="hstep">
<div class="hstep__badge not-prose" aria-hidden="true">4</div>
<div class="hstep__body">

#### <span class="hstep__kicker">Step 4</span> Verify and run

Start a session and ask:

```
Connect to Galaxy and tell me who I am.
```

Orbit confirms your Galaxy account and attaches to a history. Describe your analysis — Orbit drafts a plan for your approval, executes on Galaxy (including custom containerized UDTs), and records every decision in your notebook. Full tour & model guide: **[galaxyproject.org/agents/orbit/](/agents/orbit/)**.

</div>
</div>

<details>
<summary>Model switching, Windows WSL2 & troubleshooting</summary>

- **Switch models mid-session:** plan on a frontier model, then switch to a cheaper model for execution via the footer selector, `Cmd/Ctrl+,`, or `/model <exact-id>` (e.g. `/model claude-sonnet-4-6`).
- **Windows local shell (WSL2):** native `Orbit.exe` runs all steps remotely on Galaxy; for local shell execution on Windows 11 (WSLg), install `orbit_<version>_amd64.deb` inside Ubuntu WSL2 (`chmod 600 ~/.loom/config.json`).
- **Troubleshooting & feedback:** if the footer Galaxy dot stays grey/red, check **Preferences › Galaxy** (omit `/api`; match key to server). Report issues via Orbit's **Feedback** button or **[GitHub Discussions (`Agents & UDTs`)](https://github.com/galaxyproject/galaxy/discussions/categories/agents-udts)**.

</details>

</HarnessGuide>

<HarnessGuide id="claude-code" name="Claude Code" source="https://github.com/galaxyproject/agentic-plugins/blob/main/docs/claude-code.md">

<div class="hstep">
<div class="hstep__badge not-prose" aria-hidden="true">2</div>
<div class="hstep__body">

#### <span class="hstep__kicker">Step 2</span> Get your Galaxy API key

- **Galaxy API key:** On [usegalaxy.org](https://usegalaxy.org) *(or [usegalaxy.eu](https://usegalaxy.eu) / [usegalaxy.org.au](https://usegalaxy.org.au))*, open **User › Preferences › Manage API Key** → **Create a new key**.
- **Custom tools on UseGalaxy.org *(optional)*:** Request [User-Defined Tools beta access](https://udt-signup.galaxyproject.org/) (~30s). Standard tools and workflows work immediately while we approve.

</div>
</div>

<div class="hstep">
<div class="hstep__badge not-prose" aria-hidden="true">3</div>
<div class="hstep__body">

#### <span class="hstep__kicker">Step 3</span> Install the Galaxy plugins

Requires [Claude Code](https://code.claude.com) and [uv](https://docs.astral.sh/uv/) (`uv --version`). Run inside Claude Code:

```
/plugin marketplace add galaxyproject/agentic-plugins
/plugin install galaxy-mcp@galaxyproject
/plugin install galaxy-skills@galaxyproject
```

Enter your **Galaxy URL** (default `https://usegalaxy.org`, no `/api`) and **API key** when prompted (saved to your keychain), then **start a new Claude Code session**.

</div>
</div>

<div class="hstep">
<div class="hstep__badge not-prose" aria-hidden="true">4</div>
<div class="hstep__body">

#### <span class="hstep__kicker">Step 4</span> Verify and run

Check `/mcp` shows `galaxy` **connected**, then ask:

```
Connect to Galaxy and tell me who I am.
```

Claude calls `get_user` and confirms your account. Then ask in plain language — upload reads, run IWC workflows, write JupyterLite (`gxy`) notebooks, rebuild scratch histories (`reproduciblify`), or author containerized YAML tools (`udt-authoring`).

</div>
</div>

<details>
<summary>Optional developer skills, CLI install, updates & troubleshooting</summary>

##### Optional plugins (tool wrappers & workflow engineering)

Install only if you author ToolShed XML wrappers or Workflow Foundry pipelines (every skill adds to per-turn context):

```
/plugin install galaxy-dev-skills@galaxyproject
/plugin install foundry-skills@galaxyproject
```

##### Slash commands

Claude selects skills automatically, or call them directly: `/galaxy-mcp:galaxy-connect`, `/galaxy-skills:galaxy-integration`, `/galaxy-skills:galaxy-mcp-reference`, `/galaxy-skills:collection-manipulation`, `/galaxy-skills:udt-authoring`, `/galaxy-skills:workflow-reports`, `/galaxy-skills:reproduciblify`.

##### Terminal install, updates & reconfiguration

Headless install (Claude Code 2.1.275+, with `GALAXY_API_KEY` exported):

```bash
claude plugin install galaxy-mcp --marketplace galaxyproject/agentic-plugins \
  --config galaxy_url=https://usegalaxy.org \
  --config galaxy_api_key="$GALAXY_API_KEY"
claude plugin install galaxy-skills@galaxyproject
```

Reconfigure anytime via `/plugin configure galaxy-mcp@galaxyproject` (then restart). Update via `/plugin marketplace update galaxyproject` followed by `/plugin update galaxy-mcp@galaxyproject` and `/plugin update galaxy-skills@galaxyproject`.

##### Manual MCP setup (without plugins) & troubleshooting

```bash
claude mcp add --scope user galaxy \
  -e GALAXY_URL=https://usegalaxy.org \
  -e GALAXY_API_KEY="$GALAXY_API_KEY" \
  -- uvx galaxy-mcp
```

- **No `galaxy` in `/mcp`:** start a new session after installing; check `uv --version`.
- **Key or URL error:** run `/plugin configure galaxy-mcp@galaxyproject` (keys are per Galaxy server; omit `/api` from URL) or run `/galaxy-mcp:galaxy-connect`.

</details>

</HarnessGuide>

<HarnessGuide id="codex" name="Codex CLI" source="https://github.com/galaxyproject/agentic-plugins/blob/main/docs/codex.md">

<div class="hstep">
<div class="hstep__badge not-prose" aria-hidden="true">2</div>
<div class="hstep__body">

#### <span class="hstep__kicker">Step 2</span> Get your Galaxy API key and export it

- **Galaxy API key:** On [usegalaxy.org](https://usegalaxy.org) *(or [usegalaxy.eu](https://usegalaxy.eu) / [usegalaxy.org.au](https://usegalaxy.org.au))*, open **User › Preferences › Manage API Key** → **Create a new key**.
- **Custom tools on UseGalaxy.org *(optional)*:** Request [User-Defined Tools beta access](https://udt-signup.galaxyproject.org/) (~30s). Standard tools work immediately while we approve.
- **Export in your shell** (`~/.zshrc` / `~/.bashrc`, then open a new terminal — or put in a gitignored `.env`):

```bash
export GALAXY_URL="https://usegalaxy.org"
export GALAXY_API_KEY="paste-your-key-here"
```

</div>
</div>

<div class="hstep">
<div class="hstep__badge not-prose" aria-hidden="true">3</div>
<div class="hstep__body">

#### <span class="hstep__kicker">Step 3</span> Install the Galaxy plugins

Requires [Codex CLI](https://developers.openai.com/codex/cli) and [uv](https://docs.astral.sh/uv/) (`uv --version`):

```bash
codex plugin marketplace add galaxyproject/agentic-plugins
codex plugin add galaxy-mcp@galaxyproject
codex plugin add galaxy-skills@galaxyproject
```

**Start a new `codex` session afterwards.**

</div>
</div>

<div class="hstep">
<div class="hstep__badge not-prose" aria-hidden="true">4</div>
<div class="hstep__body">

#### <span class="hstep__kicker">Step 4</span> Verify and run

Ask Codex (approve the one-time MCP prompt on first call):

```
Connect to Galaxy and tell me who I am.
```

Codex calls `get_user` and confirms your account. Then ask in plain language — upload reads, run IWC workflows, write JupyterLite (`gxy`) notebooks, rebuild histories (`$reproduciblify`), or author containerized YAML tools (`$udt-authoring`).

</div>
</div>

<details>
<summary>Optional developer skills, manual config, updates & troubleshooting</summary>

##### Optional plugins (tool wrappers & workflow engineering)

```bash
codex plugin add galaxy-dev-skills@galaxyproject
codex plugin add foundry-skills@galaxyproject
```

##### Direct `$skill` invocation & updates

Invoke any skill with `$` (e.g. `$galaxy-connect`, `$udt-authoring`, `$reproduciblify`, `$collection-manipulation`). Update with `codex plugin marketplace upgrade` then re-run `codex plugin add ...`; remove with `codex plugin remove <name>@galaxyproject`.

##### Manual `~/.codex/config.toml` & troubleshooting

```toml
[mcp_servers.galaxy]
command = "uvx"
args = ["galaxy-mcp"]
env_vars = ["GALAXY_URL", "GALAXY_API_KEY"]
```

- **Missing URL / key error:** confirm `GALAXY_URL` (no `/api`) and `GALAXY_API_KEY` are exported in the shell that launched `codex`, or place them in `.env`.
- **No `galaxy` in `codex mcp list`:** start a new session and verify `uv --version`.

</details>

</HarnessGuide>

<HarnessGuide id="antigravity" name="Antigravity" source="https://github.com/galaxyproject/agentic-plugins/blob/main/docs/antigravity.md">

<div class="hstep">
<div class="hstep__badge not-prose" aria-hidden="true">2</div>
<div class="hstep__body">

#### <span class="hstep__kicker">Step 2</span> Get your Galaxy API key and export it

- **Galaxy API key:** On [usegalaxy.org](https://usegalaxy.org) *(or [usegalaxy.eu](https://usegalaxy.eu) / [usegalaxy.org.au](https://usegalaxy.org.au))*, open **User › Preferences › Manage API Key** → **Create a new key**.
- **Custom tools on UseGalaxy.org *(optional)*:** Request [User-Defined Tools beta access](https://udt-signup.galaxyproject.org/) (~30s). Standard tools work immediately while we approve.
- **Export in `~/.zshrc` / `~/.bashrc`** *(or put in a workspace `.env` when launching the Antigravity IDE from the Dock)*:

```bash
export GALAXY_URL="https://usegalaxy.org"
export GALAXY_API_KEY="paste-your-key-here"
```

</div>
</div>

<div class="hstep">
<div class="hstep__badge not-prose" aria-hidden="true">3</div>
<div class="hstep__body">

#### <span class="hstep__kicker">Step 3</span> Install the Galaxy plugins

Requires [Antigravity](https://antigravity.google) (`agy` CLI or IDE), [uv](https://docs.astral.sh/uv/), and `git`:

```bash
git clone https://github.com/galaxyproject/agentic-plugins.git ~/.galaxy-agentic-plugins
agy plugin install ~/.galaxy-agentic-plugins/plugins/galaxy-mcp
agy plugin install ~/.galaxy-agentic-plugins/plugins/galaxy-skills
```

**Start a new session afterwards.**

</div>
</div>

<div class="hstep">
<div class="hstep__badge not-prose" aria-hidden="true">4</div>
<div class="hstep__body">

#### <span class="hstep__kicker">Step 4</span> Verify and run

Check `/mcp` shows `galaxy-mcp_galaxy` **running**, then ask:

```
Connect to Galaxy and tell me who I am.
```

Antigravity calls `get_user` and confirms your account. Then ask in plain language — upload reads, run IWC workflows, write JupyterLite (`gxy`) notebooks, rebuild histories (`/reproduciblify`), or author containerized YAML tools (`/udt-authoring`).

</div>
</div>

<details>
<summary>Optional developer skills, manual config, updates & troubleshooting</summary>

##### Optional plugins & updates

```bash
agy plugin install ~/.galaxy-agentic-plugins/plugins/galaxy-dev-skills
agy plugin install ~/.galaxy-agentic-plugins/plugins/foundry-skills
```

Update anytime with `git -C ~/.galaxy-agentic-plugins pull` and re-run `agy plugin install ...`. Inspect with `agy plugin list` or remove with `agy plugin uninstall <name>`.

##### Manual MCP setup & troubleshooting

```bash
agy mcp add --env GALAXY_URL=https://usegalaxy.org \
            --env GALAXY_API_KEY="$GALAXY_API_KEY" \
            galaxy uvx galaxy-mcp
```

- **Missing URL / key in the GUI IDE:** Dock launches often skip `~/.zshrc`; add `GALAXY_URL` and `GALAXY_API_KEY` to your workspace `.env` or use `agy mcp add --env` above (do not install `galaxy-mcp` plugin at the same time).
- **Connection check:** run `/galaxy-connect` or test `uvx galaxy-mcp` in a terminal.

</details>

</HarnessGuide>

<HarnessGuide id="claude-desktop" name="Claude Desktop" source="https://github.com/galaxyproject/agentic-plugins/blob/main/docs/claude-desktop.md">

<div class="hstep">
<div class="hstep__badge not-prose" aria-hidden="true">2</div>
<div class="hstep__body">

#### <span class="hstep__kicker">Step 2</span> Get your Galaxy API key

- **Galaxy API key:** On [usegalaxy.org](https://usegalaxy.org) *(or [usegalaxy.eu](https://usegalaxy.eu) / [usegalaxy.org.au](https://usegalaxy.org.au))*, open **User › Preferences › Manage API Key** → **Create a new key**.
- **Custom tools on UseGalaxy.org *(optional)*:** Request [User-Defined Tools beta access](https://udt-signup.galaxyproject.org/) (~30s). Standard tools work immediately while we approve.

</div>
</div>

<div class="hstep">
<div class="hstep__badge not-prose" aria-hidden="true">3</div>
<div class="hstep__body">

#### <span class="hstep__kicker">Step 3</span> Open the one-click bundle

No terminal or Python install required *(connects the 48 Galaxy MCP tools directly)*:

1. Download **`galaxy-mcp.mcpb`** from the **[latest release](https://github.com/galaxyproject/agentic-plugins/releases/latest)** and double-click it *(or drag onto [Claude Desktop](https://claude.com/download))*.
2. Enter your **Galaxy URL** (default `https://usegalaxy.org`, no `/api`) and **Galaxy API key**, then click **Install** *(first start takes ~30–60s)*.

</div>
</div>

<div class="hstep">
<div class="hstep__badge not-prose" aria-hidden="true">4</div>
<div class="hstep__body">

#### <span class="hstep__kicker">Step 4</span> Verify and run

Open a new chat and ask:

```
Connect to Galaxy and tell me who I am.
```

Claude calls `get_user` and confirms your account. Then ask it to inspect histories, upload datasets, launch IWC workflows, or create and run containerized YAML tools.

</div>
</div>

<details>
<summary>Reconfigure, update, manual JSON config & troubleshooting</summary>

##### Reconfigure or update

Update credentials under **Settings › Extensions › Galaxy › Configure**. Upgrade anytime by opening a newer `galaxy-mcp.mcpb` from [Releases](https://github.com/galaxyproject/agentic-plugins/releases/latest).

##### Manual `claude_desktop_config.json` (without `.mcpb`)

Requires [uv](https://docs.astral.sh/uv/) (`Settings › Developer › Edit Config`):

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

- **Startup error:** check **Settings › Extensions › Galaxy** logs; first launch requires internet access to download `galaxy-mcp`.
- **Invalid API key:** keys are per Galaxy server; generate a key on the matching server and update **Configure**.

</details>

</HarnessGuide>

<HarnessGuide id="other" name="Pi / Cursor / Other" source="https://github.com/galaxyproject/agentic-plugins/tree/main/docs">

<div class="hstep">
<div class="hstep__badge not-prose" aria-hidden="true">2</div>
<div class="hstep__body">

#### <span class="hstep__kicker">Step 2</span> Get your Galaxy API key and export it

- **Galaxy API key:** On [usegalaxy.org](https://usegalaxy.org) *(or [usegalaxy.eu](https://usegalaxy.eu) / [usegalaxy.org.au](https://usegalaxy.org.au))*, open **User › Preferences › Manage API Key** → **Create a new key**.
- **Custom tools on UseGalaxy.org *(optional)*:** Request [User-Defined Tools beta access](https://udt-signup.galaxyproject.org/) (~30s). Standard tools work immediately while we approve.
- **Export in `~/.zshrc` / `~/.bashrc`** *(or place in a gitignored `.env`)*:

```bash
export GALAXY_URL="https://usegalaxy.org"
export GALAXY_API_KEY="paste-your-key-here"
```

</div>
</div>

<div class="hstep">
<div class="hstep__badge not-prose" aria-hidden="true">3</div>
<div class="hstep__body">

#### <span class="hstep__kicker">Step 3</span> Install for your harness

Requires [uv](https://docs.astral.sh/uv/) (`uv --version`).

<h5 id="pi">Pi (<code>pi</code> 1.x)</h5>

```bash
pi mcp add galaxy -- uvx galaxy-mcp
pi install git:github.com/galaxyproject/agentic-plugins
```

Restart `pi` afterwards *(install/upgrade Pi via `npm i -g @earendil-works/pi-coding-agent`; [full Pi guide](https://github.com/galaxyproject/agentic-plugins/blob/main/docs/pi.md))*.

<h5 id="cursor">Cursor</h5>

Open **Customize › From GitHub Repository** → `galaxyproject/agentic-plugins` → install **`galaxy-mcp`** + **`galaxy-skills`** → **Developer: Reload Window** *([full Cursor guide](https://github.com/galaxyproject/agentic-plugins/blob/main/docs/cursor.md))*.

<h5 id="generic-mcp">OpenCode or any MCP + Agent Skills client</h5>

Clone `galaxy-skills` and add `uvx galaxy-mcp` to your MCP config:

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

</div>
</div>

<div class="hstep">
<div class="hstep__badge not-prose" aria-hidden="true">4</div>
<div class="hstep__body">

#### <span class="hstep__kicker">Step 4</span> Verify and run

Ask your agent:

```
Connect to Galaxy and tell me who I am.
```

It calls `get_user` and confirms your account. Then ask in plain language — upload reads, run IWC workflows, write JupyterLite (`gxy`) notebooks, rebuild histories (`reproduciblify`), or author containerized YAML tools (`udt-authoring`).

</div>
</div>

<details>
<summary>Pi skill filtering (context budget) & updates</summary>

`pi install` loads all 86 skills. Exclude the optional developer sets in `~/.pi/agent/settings.json` to keep per-turn context lean:

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

<div class="ag-band ag-band--white">

## What your plugins include

Install **`galaxy-mcp`** + **`galaxy-skills`** for everyday analysis. Add the developer sets only if you build XML tool wrappers or construct workflows:

| Plugin | Audience | Contents | Default |
|--------|----------|----------|---------|
| **`galaxy-mcp`** | Everyone | Live Galaxy connection (48 MCP tools: histories, datasets, tools, IWC workflows, UDTs) + `galaxy-connect` | **Install** |
| **`galaxy-skills`** | Analysts & researchers | 7 skills for *using* Galaxy: MCP patterns, collections, JupyterLite notebooks (`gxy`), UDT authoring, workflow reports, `reproduciblify` | **Install** *(coding agents)* |
| **`galaxy-dev-skills`** | Tool developers | 9 skills for *building* Galaxy: ToolShed XML wrappers (`tool-dev`), Nextflow conversion (`nf-to-galaxy`), `usegalaxy-tools`, UCSC track hubs, Hub news | Optional |
| **`foundry-skills`** | Workflow engineers | 69 Workflow Foundry casts turning papers, Nextflow, and CWL into validated Galaxy workflows | Optional |

## More in this section

<div class="ag-examples">
<div class="ag-example">

**[The Galaxy agentic stack](/agents/stack/)**

Watch an agent write and run a containerized YAML tool when no installed Galaxy tool fits, with every command, container, and dataset recorded in your history.

</div>
<div class="ag-example">

**[User-Defined Tools](/tools/user-defined-tools/)**

YAML tool syntax, sandbox model, real examples, and per-account beta access on UseGalaxy.org via [udt-signup.galaxyproject.org](https://udt-signup.galaxyproject.org/).

</div>
<div class="ag-example">

**[Orbit desktop app guide](/agents/orbit/)**

Model selection & pricing, mid-session `/model` switching, local + Galaxy execution, and visual tour of the Orbit desktop app.

</div>
</div>

## Get help & share feedback

- **Agents & User-Defined Tools forum:** [GitHub Discussions (`Agents & UDTs`)](https://github.com/galaxyproject/galaxy/discussions/categories/agents-udts) — Q&A, beta feedback, and working `GalaxyUserTool` YAMLs *(real-time Matrix chat: [#galaxyproject:matrix.org](https://matrix.to/#/#galaxyproject:matrix.org))*.
- **Connection diagnostics:** run `galaxy-connect` in your agent or open the troubleshooting drawer at the bottom of your harness tab above.
- **General Galaxy support:** [Galaxy Help forum](https://help.galaxyproject.org/).
- **Plugin & bundle issues:** [galaxyproject/agentic-plugins](https://github.com/galaxyproject/agentic-plugins) (upstream skills: [galaxy-skills](https://github.com/galaxyproject/galaxy-skills) and [foundry](https://github.com/galaxyproject/foundry)).

</div>
