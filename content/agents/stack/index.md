---
title: "The Galaxy Agentic Stack"
tease: "An agent that can write the Galaxy tool it's missing. The tool runs in a container, and every job lands in your history with its full record."
subsites: [all]
components: true
autotoc: false
skip_title_render: true
full_bleed: true
og_image: /images/galaxy-logos/galaxy_logo_25percent.png
---

<AgenticStack />

<div class="ag-band">

## What Galaxy keeps

<div class="ag-split">

<div>

An agent working on your laptop leaves behind scratch scripts, renamed files and a chat log. Here, every step it takes is a Galaxy job, and Galaxy records the same things for each one whether the tool was installed by an admin or written by the agent a minute ago.

You can watch the history fill in while the agent works, or ask the agent to read a job back with `get_job_details`.

The history that results is ordinary Galaxy: share it by link, extract it to a workflow, or rerun it on new data. If you use Orbit, it also keeps the plan you approved and its reasoning in `notebook.md`, so the analysis lives in Galaxy and the thinking lives next to it.

</div>

<div class="ag-record">
<p class="ag-record__hd">Recorded for every job</p>
<dl>
<div><dt>Tool</dt><dd>Name and exact version, installed or user-defined</dd></div>
<div><dt>Container</dt><dd>The image the job ran in</dd></div>
<div><dt>Command</dt><dd>The full command line, as executed</dd></div>
<div><dt>Inputs</dt><dd>Every dataset and parameter value</dd></div>
<div><dt>Output</dt><dd>New datasets in your history, with formats and sizes</dd></div>
<div><dt>Logs</dt><dd>stdout, stderr and the exit code</dd></div>
</dl>
</div>

</div>

</div>

<div class="ag-band ag-band--white">

## The tool the agent wrote

<div class="ag-split ag-split--code">

<div>

In the run above, no installed tool could rename GFF sequence names from a mapping file and fail on unknown ones, so the agent wrote one. That's a **user-defined tool** (UDT): a short YAML file with a container image, a shell command, and typed inputs and outputs. No admin install, no Tool Shed.

Galaxy validates the tool when it's created and runs it like any other. The `$(...)` expressions that build the command can only see the declared inputs, which keeps what an agent can write narrow. Beyond that, how isolated the job is (network access, for example) depends on how the Galaxy server runs jobs.

The tool is saved under **Custom Tools** in your account, where you can read and revise it. It's private unless you embed it in a workflow you share, and then it travels with the workflow.

A UDT is for filling gaps. When a Tool Shed tool already does the job, the agent should use it, the way it used featureCounts for the counting.

</div>

<div class="ag-code">

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

</div>

</div>

</div>

<div class="ag-band">

## Get started

<ol class="ag-steps">
<li>

### Request UDT access

User-defined tools are in beta on usegalaxy.org and turned on per account by an administrator, so start here. Signing in with ORCID is optional but usually speeds review. Once you're enabled, **Custom Tools** shows up in your Activity Bar. On another Galaxy server, ask its administrators.

The next two steps work without this; your agent just can't write tools until it's on.

<p class="ag-links"><a class="ag-go" href="https://udt-signup.galaxyproject.org/">Request access</a> <a href="/tools/user-defined-tools/">How UDTs work</a></p>

</li>
<li>

### Create a Galaxy API key

Log in to [usegalaxy.org](https://usegalaxy.org) and open **User › Preferences › Manage API Key**. The key gives full access to your account, so put it in your agent's settings rather than pasting it into chat.

</li>
<li>

### Connect an agent

<div class="ag-choices">
<div class="ag-choice">

#### Orbit

A desktop app with Galaxy already wired in. Paste your server URL and key into its preferences and it fetches the Galaxy skills on first use. It drafts a plan, waits for your approval and keeps a git-tracked notebook of the analysis.

<p class="ag-links"><a class="ag-go" href="/agents/orbit/">Install Orbit</a> <a href="https://galaxyproject.github.io/loom/">How it works</a></p>

</div>
<div class="ag-choice">

#### Your own coding agent

Claude Code, Codex, Antigravity or Pi. Install two plugins: the Galaxy connection (`galaxy-mcp`) and the Galaxy skills, including `udt-authoring`, which the agent follows when it writes a tool. Claude Desktop gets the connection without the skills.

<p class="ag-links"><a class="ag-go" href="/agents/plugins/">Set up your agent</a></p>

</div>
</div>

</li>
<li>

### Try it

Paste this into the agent:

```
Write a user-defined tool that counts the lines in a dataset, run it on a dataset in my current history, and show me the job's command and container.
```

It'll call `create_user_tool`, `run_user_tool` and `get_job_details`, and you'll see the tool and the job appear in Galaxy as it goes. If Galaxy refuses to create or run the tool, your account isn't enabled for UDTs yet.

</li>
</ol>

</div>

<div class="ag-band ag-band--white">

## Limits

- UDTs are in beta, on usegalaxy.org, and enabled per account.
- A UDT can't see Galaxy reference data, dataset metadata files (such as BAM indexes) or a tool's `extra_files`, and test cases aren't supported yet.
- Galaxy checks the YAML but not whether the container tag exists, so a wrong tag only fails at run time. The `udt-authoring` skill looks images up instead of guessing.
- There's no in-place update through the API. Each revision is a new version of the tool; you can deactivate the old ones.

## Need help?

- **Questions:** the [Galaxy Help forum](https://help.galaxyproject.org/)
- **Agent plugins:** [galaxyproject/agentic-plugins](https://github.com/galaxyproject/agentic-plugins), and [galaxy-mcp](https://github.com/galaxyproject/galaxy-mcp) for the connection itself
- **Orbit:** the in-app Feedback button, or [Orbit's help section](/agents/orbit/#getting-help)

</div>
