---
title: "Agentic Galaxy: getting started"
tease: "Put an AI agent on one side of your screen and Galaxy on the other. Ask the agent to wire itself up, then prototype analysis tools by describing them in prose."
subsites: [all]
autotoc: true
---

You can drive Galaxy with an AI agent — Orbit, Claude Code, Codex CLI, or Gemini CLI — and
have it search for tools, upload data, run jobs, and write small tools for you. This page
takes you from a fresh installation to a working setup and your first prototype tool. It
assumes that you have never used Galaxy.

The short version: get a Galaxy API key, ask your agent to install and register the Galaxy
MCP server, then describe the analysis step you need and let the agent write it.

## How this works

Split your screen in two: keep your agent on the left and Galaxy open in a browser on the
right. Log in to Galaxy with the account whose API key you will give the agent.

![Two-pane working model: an AI agent in a terminal on the left issuing Galaxy MCP calls, and the Galaxy web interface on the right showing the resulting history, jobs and datasets](/tools/agentic-development/fig-two-pane-model.svg)

The agent reaches Galaxy through the [Galaxy MCP
server](https://github.com/galaxyproject/galaxy-mcp), a small program that runs on your
machine, holds your API key, and translates the agent's requests into Galaxy API calls.
Everything the agent does happens in your real Galaxy account.

Keep the browser visible. The agent acts quickly, but it sees only the information it asks
Galaxy to return. When a job fails, the most useful error is often in Galaxy's job details.
Click the failed dataset in your history and inspect the error yourself.

<div class="callout">
<strong>Three unrelated things get called "AI in Galaxy".</strong> This page is about the
first: an agent <em>outside</em> Galaxy, running on your machine, driving it over MCP.
Separately, some Galaxy servers enable built-in assistants (<strong>GalaxyAI</strong> in
the sidebar, <strong>GalaxyWizard</strong> on failed jobs), and a
<strong>CustomToolAgent</strong> inside Galaxy that drafts tools from a description. Those
are configured by administrators and have nothing to do with MCP, Orbit, or anything you
install here.
</div>

## What you need

**A Galaxy account and an API key.** Register on a Galaxy server —
[usegalaxy.org](https://usegalaxy.org) is the usual starting point. Then go to **User →
Preferences → Manage Galaxy API Key** and create one. Galaxy keeps the key hidden until you
click the reveal icon.

![Two steps on usegalaxy.org: the Manage Galaxy API Key card on the User Preferences page, and the Manage API Key page below it showing the existing key masked behind dots with copy, reveal and delete buttons](/tools/agentic-development/fig-api-key.png)

<div class="callout">
A Galaxy API key is a <strong>full account credential</strong>. Anything holding it can
consume your compute quota, read and delete your histories, and create and run tools as
you. Treat it like a password. For your first sessions, consider a scratch account rather
than one holding work you care about.
</div>

**`uv`**, which provides the `uvx` command. This is the only software prerequisite: `uv`
can install the required Python version, so you do not need to manage Python yourself. If
your agent cannot find `uv`, install it with:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

**An agent.** [Orbit](/tools/orbit/) is a desktop application built for this workflow. It
needs no manual MCP configuration: enter a Galaxy URL and API key in Preferences, and Orbit
registers the MCP server. Claude Code, Codex CLI, and Gemini CLI are terminal agents that
need one registration step. In the next section, you will ask the agent to perform it.

## Let the agent set itself up

<div class="callout">
<strong>Using Orbit? Skip this section.</strong> Orbit has a settings screen for exactly
this. Open Preferences (<code>Cmd/Ctrl+,</code>), enter your Galaxy server URL and API key
in the <strong>Galaxy</strong> section, and click Save. Orbit stores the key in your
operating system's keychain and registers the Galaxy MCP server itself — nothing to
install, no configuration file to write, and no environment variable to export. The footer
indicator turns green when the connection is confirmed. Carry on at
<a href="#prototype-a-tool-by-describing-it">Prototype a tool by describing it</a>.
<br><br>
Orbit also has its own safeguard in place of the read-only mode described below: it drafts
a plan in the chat and waits for your approval, then shows you every tool parameter and
waits again, before anything runs in Galaxy.
</div>

The rest of this section is for the terminal agents — Claude Code, Codex CLI, Gemini CLI.
Before the MCP server is registered your agent cannot reach Galaxy, but it can still use
its shell, which is all the setup needs. So ask it.

First, put your key in your shell environment:

```bash
export GALAXY_API_KEY=your-key-here
```

<div class="callout">
<strong>Do not paste your API key into the chat.</strong> Anything you type to a terminal
agent goes to your model provider and stays in the transcript for the rest of the session.
Export it in your own shell as above and tell the agent to reference the
<em>variable</em>, never the value.
</div>

Then give the agent this:

```text
Set up Galaxy MCP for me.

1. Check whether `uv` is installed. If not, show me the install command before running it.
2. Register a Galaxy MCP server with this harness that runs `uvx galaxy-mcp` against
   https://usegalaxy.org. Take the API key from the GALAXY_API_KEY environment variable —
   do not write the key itself into any config file.
3. Install the skills from https://github.com/galaxyproject/skills in the user-level skills
   directory recognized by this harness. If this harness does not support skills natively,
   clone the repository locally and tell me where you put it.
4. Tell me whether I need to restart you, and what you could not do yourself.
```

The agent knows its own configuration format, so it writes the file or runs the right
`mcp add` command without you editing JSON or TOML. **You will usually need to restart the
agent** before the new tools appear.

Step 3 installs the [Galaxy skills](https://github.com/galaxyproject/galaxy-skills), a
community-curated set of instructions for Galaxy-specific work. The most relevant one here
is `udt-authoring`; it gives the agent the format, validation tools, and common pitfalls for
user-defined tools.

### Check it worked

After restarting, ask for something that needs no credentials at all:

```text
Call search_iwc_workflows for "rna-seq" and show me the first few results.
```

Those results come from a public workflow registry rather than from Galaxy, so this
confirms the server is wired up even before your key is working. Then:

```text
Call get_server_info and list my histories.
```

### Start read-only

For a first session, ask the agent to take away its own ability to change anything:

```text
Set GALAXY_MCP_EXCLUDE_TAGS=write in the galaxy MCP server's environment. Then show me
which tools disappeared, and confirm run_tool, create_user_tool and invoke_workflow are
gone.
```

At the time of writing, this reduces the catalog from 45 tools to 30. The 15 tools tagged
`write` include those that can spend compute or delete data. When you are ready to make
changes or run jobs, ask the agent to remove the variable.

<div class="callout">
Two things to know about read-only mode. It works on the Python server
(<code>uvx galaxy-mcp</code>) and is <strong>silently ignored by the Node variant</strong>
(<code>npx @galaxyproject/galaxy-mcp</code>), which offers the same write tools either way
— so use the Python server if you want this. And <code>connect</code> is itself tagged
<code>write</code>, so it disappears too: if a call then fails with <em>"Not connected to
Galaxy … run connect()"</em>, ignore that advice and set <code>GALAXY_URL</code> and
<code>GALAXY_API_KEY</code> in the server's environment instead.
</div>

## Prototype a tool by describing it

Sooner or later, you may need a step that no existing Galaxy tool performs: reformatting a
table, filtering on an unusual condition, or combining two commands. **User-defined tools**
are designed for this. You define one in YAML from within Galaxy; it runs in a container
and behaves like any other tool in histories and workflows. User-defined tools are private
to you, have been in beta since Galaxy 25.0, and are documented in full at [User-Defined
Tools](/tools/user-defined-tools/).

In practice, you will rarely write one by hand. Describe what you need, and the agent can
write the YAML, create the tool, run it on a small input, inspect any failure, and revise
the definition.

![The prototyping loop: describe the step in prose, the agent drafts YAML and calls create_user_tool, run_user_tool executes it on a small input, the job's stderr feeds back into a revision, and the cycle repeats until the tool works](/tools/agentic-development/fig-prototyping-loop.svg)

First, find out whether the server has enabled user-defined tools and whether your account
can access them:

```text
Call list_user_tools and tell me whether it errors, and exactly what the error says.
```

If that fails because of permissions, ask your Galaxy administrator for both the **Custom
Tool Creation** and **Custom Tool Execution** roles. Creation lets you author a tool;
execution lets you run it. The feature is enabled on usegalaxy.org and usegalaxy.eu, but
the server setting alone is not enough: the required roles are granted per account.

Then describe the step:

```text
I need a step that strips comment lines from a tabular file before the counter runs.
Draft it as a user-defined tool and validate the YAML offline. Show me the YAML before you
create anything. Then create it and run it on a small tabular or plain-text dataset in my
history; if there is no suitable input, ask me to upload one.
```

What comes back looks like this:

```yaml
class: GalaxyUserTool
id: remove_comments
name: Remove Comment Lines
version: 0.1.0
description: from a text file
container: quay.io/biocontainers/grep:3.4--hf43ccf4_4
shell_command: 'grep -v ''^#'' ''$(inputs.input_file.path)'' > output.txt || test "$?" = 1'
inputs:
  - name: input_file
    type: data
    format:
      - txt
outputs:
  - name: output_file
    type: data
    format_source: input_file
    from_work_dir: output.txt
```

## Check what the agent hands you

Your role in this loop is to specify what you need and review what the agent produces. Watch
for these four common mistakes:

- **An output that says nothing about where its bytes come from.** Every `data` output needs
  `from_work_dir` or `discover_datasets`. This is the most common failure by a wide margin.
- **An invented container tag.** Agents cheerfully write image tags that do not exist. The
  job fails immediately with a container error.
- **Reaching for things the sandbox cannot provide.** Galaxy's reference genomes, dataset
  metadata, BAM indexes, a tool's `extra_files` directory. None are available.
- **A `tests:` block that proves nothing.** Declared tests are stored but never executed for
  a tool held in the database. A green-looking tests section is not evidence.

You can catch the first one before it ever reaches Galaxy. The `udt-authoring` skill ships a
validator that runs Galaxy's real schema and linter offline, with no server and no API key:

```text
Validate that YAML with the udt-authoring skill's validate.py before you create anything.
```

On a tool with an unclaimed output it prints exactly what is wrong:

```
output 'output1' must set 'from_work_dir' or 'discover_datasets'
(otherwise its bytes will never be claimed from the working directory)
```

## Where this goes next

A user-defined tool is a prototype. It is private to you, lives in one Galaxy's database
rather than in a file, and its tests never run. That is the right trade for finding out
whether an idea works, and the wrong one for anything other people depend on.

![The maturation ladder: a private user-defined tool, then a tool shared inside a workflow, then a reviewed and tested XML tool in the IUC, then a workflow published in the IWC and installed on the public Galaxy servers](/tools/agentic-development/fig-maturation-ladder.svg)

There are two ways to make a prototype more durable. First, embed it in a workflow. Anyone
who imports that workflow gets a copy of the tool in their own account. For broader use,
tools belong in the [IUC](https://github.com/galaxyproject/tools-iuc) as reviewed, tested,
versioned XML wrappers. Workflows belong in the [IWC](https://github.com/galaxyproject/iwc),
which installs them on usegalaxy.org, usegalaxy.eu, and usegalaxy.org.au and registers them
with Dockstore and WorkflowHub.

There is no automated conversion from a user-defined tool to an XML tool — the prototype
informs a rewrite rather than becoming one. But the same agent can do that work too: ask it
to draft the wrapper, write real test cases, run `planemo lint` and `planemo test`, and
prepare the pull request. The `tool-dev` skill you installed earlier covers exactly this.

## Status

<div class="callout">
As of <strong>2026-08-26</strong>: <code>galaxy-mcp</code> is alpha (1.9.0);
<a href="/tools/orbit/">Orbit</a> is beta (v0.6.0); user-defined tools are beta, introduced
in Galaxy 25.0; <code>galaxy-skills</code> is community-curated with no formal releases.
Galaxy 26.1 adds a built-in MCP server, but it is experimental, off by default, and no
public Galaxy server had it enabled when this page was written — so the standalone
<code>uvx galaxy-mcp</code> server above is the working path today.
</div>

## Learn more

- [Orbit](/tools/orbit/) — the desktop agent built for Galaxy, and the fastest way to skip the setup above
- [User-Defined Tools](/tools/user-defined-tools/) — the full format reference and worked examples
- [Galaxy for Tool Developers](/tools/) and the [IUC](/iuc/) — where tools go to become real
- [galaxy-mcp](https://github.com/galaxyproject/galaxy-mcp) · [galaxy-skills](https://github.com/galaxyproject/galaxy-skills) · [loom](https://github.com/galaxyproject/loom)
- [Galaxy Training Network](https://training.galaxyproject.org) — tutorials for the analyses themselves
- [LLM agents reanalyze RNA-seq](/news/2026-06-09-llm-agents-reanalyze-rnaseq/) — eight models driving Galaxy over MCP against a published study
- Questions: the [Galaxy Help forum](https://help.galaxyproject.org/)
