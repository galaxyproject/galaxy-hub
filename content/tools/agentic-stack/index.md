---
title: "The Galaxy Agentic Stack"
tease: "An agent, user-defined tools and Galaxy: watch an agent write the tool it lacks, run it in a container and leave a job with full provenance in your history."
subsites: [all]
components: true
autotoc: false
skip_title_render: true
full_bleed: true
og_image: /images/galaxy-logos/galaxy_logo_25percent.png
---

<AgenticStack />

<div class="stk-band">

<div class="callout stk-warning" role="note">
<strong>UDTs are in early beta.</strong> Only registered users are allowed. To register, <a href="https://udt-signup.galaxyproject.org/">click here</a>.
</div>

<details>
<summary>The tool the agent wrote</summary>

Under sixty lines: a container, a command, typed inputs and one output. Galaxy validates it on creation and runs it like any installed tool.

```yaml
class: GalaxyUserTool
id: gff-seqname-map
version: "0.1.0"
name: Rename GFF sequence names
description: Rewrite column 1 of a GFF3 file from a two-column mapping; fail on unknown names
container: python:3.11-slim
shell_command: |
  python - '$(inputs.gff.path)' '$(inputs.mapping.path)' renamed.gff3 <<'PY'
  import sys
  gff, mapfile, out = sys.argv[1:4]
  names = {}
  with open(mapfile) as fh:
      for line in fh:
          if line.startswith('#') or not line.strip():
              continue
          old, new = line.rstrip('\n').split('\t')[:2]
          names[old] = new
  renamed = unknown = 0
  missing = set()
  with open(gff) as fin, open(out, 'w') as fout:
      for line in fin:
          if line.startswith('#') or not line.strip():
              fout.write(line)
              continue
          cols = line.split('\t')
          if cols[0] in names:
              cols[0] = names[cols[0]]
              renamed += 1
          else:
              unknown += 1
              missing.add(cols[0])
          fout.write('\t'.join(cols))
  print(f'renamed {renamed} feature lines; {len(names)} names mapped; {unknown} unknown')
  if unknown:
      print('unknown sequence names: ' + ', '.join(sorted(missing)), file=sys.stderr)
      sys.exit(2)
  PY
inputs:
  - name: gff
    type: data
    format: gff3
    label: GFF3 annotation
  - name: mapping
    type: data
    format: tabular
    label: Two-column mapping (old name, new name)
outputs:
  - name: renamed
    type: data
    format: gff3
    from_work_dir: renamed.gff3
help:
  format: markdown
  content: |
    Rewrites the sequence name (column 1) of every feature line in a GFF3 file
    using a two-column tab-separated mapping of old name to new name. Comment
    and blank lines pass through unchanged. The job fails if a sequence name is
    missing from the mapping; stdout reports how many lines changed.
```

</details>

## Get started

Three parts, in the order of the stack. One install, one form, one API key.

<div class="gx-tile-grid stack-steps">

<div class="gx-tile">
<div class="gx-tile__body">

### An agent

Add Galaxy to the coding agent you already use (Claude Code, Codex, Antigravity or Pi; Claude Desktop takes the connection without the skills), or use [Orbit](https://galaxyproject.github.io/loom/), a desktop app built around Galaxy; the same agent runs in the terminal as the Loom CLI. A coding agent needs two plugins from one marketplace: the Galaxy connection (`galaxy-mcp`) and the Galaxy skills, including `udt-authoring`, the skill the agent follows when it writes a tool; the install takes your Galaxy URL and API key. Orbit registers the connection itself, fetches the same skills on first use, and takes the same URL and key in its preferences. It drafts a plan, waits for your approval, routes steps to Galaxy and keeps a git-tracked `notebook.md`.

[Agent guides →](/tools/ai-agents/) · [Orbit →](/tools/orbit/)

</div>
</div>

<div class="gx-tile">
<div class="gx-tile__body">

### User-defined tools

A user-defined tool (UDT) is a short YAML file: a container image, a shell command, and typed inputs and outputs. An enabled user can create one from the Galaxy interface or, as the agent does, through the API; no admin install, no Tool Shed. Every UDT runs in its container, and the `$(...)` expressions that build the command see only the declared inputs. Those limits are what make it safe for an agent to write tools in your account. UDTs are in beta on usegalaxy.org, enabled per account by an administrator. Request access on the sign-up page linked below; signing in with ORCID is optional but usually speeds review. Once enabled, **Custom Tools** appears in your Activity Bar. On any other Galaxy server, ask its administrators.

[Request access on usegalaxy.org →](https://udt-signup.galaxyproject.org/) · [UDT documentation](/tools/user-defined-tools/)

</div>
</div>

<div class="gx-tile">
<div class="gx-tile__body">

### Galaxy

Nothing to install. Log in to [usegalaxy.org](https://usegalaxy.org), open **User › Preferences › Manage API Key**, create a key and give it to the agent. The key gives full access to your account, so keep it in configuration, not in chat. From then on every step the agent runs, installed tool or UDT, is a job in your history: same server, same browser, same sharing.

</div>
</div>

</div>

</div>

<div class="stk-band stk-band--white">

## What Galaxy kept

An agent working on a laptop leaves scratch scripts, renamed files and a chat transcript. On this stack each step it takes becomes three things in Galaxy: a tool, a job and a dataset. For every job, installed or user-defined, Galaxy records the tool and its version, the container, the exact command, the inputs and parameters, and stdout and stderr. You can watch this in the history panel while the agent works, or ask the agent to read it back with `get_job_details`.

The history that results is ordinary Galaxy. Share it by link, extract it to a workflow, rerun it on new data. A UDT embedded in a shared workflow travels with it: whoever imports the workflow gets a copy of the tool. The tool itself lives under **Custom Tools** in your account, where you can read and revise what the agent wrote. A UDT fills a gap. When a published Tool Shed tool does the job, the agent should use it, as it used featureCounts above.

Orbit keeps a second record: the plan you approved, its parameters and the interpretation, in `notebook.md`. The analysis stays in Galaxy; the reasoning stays in the notebook.

</div>

<div class="stk-band">

## First run

With all three in place, paste this into the agent:

```
Write a user-defined tool that counts the lines in a dataset, run it on a dataset in my current history, and show me the job's command and container.
```

The agent calls `create_user_tool`, `run_user_tool` and `get_job_details`; the tool and the job appear in Galaxy as they happen. If Galaxy refuses to create or run the tool, your account is not enabled for UDTs yet.

## Limits

- UDTs are a beta feature, available on usegalaxy.org and enabled per account.
- Every UDT runs in a container with no access to Galaxy reference data, dataset metadata files (such as BAM indexes) or a tool's `extra_files`; test cases are not supported yet.
- Galaxy validates the YAML but cannot check that a container tag exists; a wrong tag fails at run time. The `udt-authoring` skill resolves images instead of guessing them.
- A UDT is private to your account unless it is embedded in a workflow you share.
- There is no in-place update through the API; each revision the agent makes is a new version of the tool, and superseded versions can be deactivated.

</div>

<div class="stk-band stk-band--white">

## Help

Questions: the [Galaxy Help forum](https://help.galaxyproject.org/). Agent plugins: [galaxyproject/agentic-plugins](https://github.com/galaxyproject/agentic-plugins); the connection itself: [galaxy-mcp](https://github.com/galaxyproject/galaxy-mcp). Orbit: the in-app Feedback button or [its help section](/tools/orbit/#getting-help).

</div>
