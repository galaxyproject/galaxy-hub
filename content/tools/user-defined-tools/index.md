---
title: User-Defined Tools
tease: "Write and run your own simple tools from the Galaxy interface — no server access, no admin installation, no Tool Shed."
---

*Beta feature*

User-Defined Tools (UDTs) let regular Galaxy users write and run their own simple tools directly from the Galaxy interface — no server access, no admin installation, and no waiting for a tool to be added to a Tool Shed. If you've ever needed a quick one-off script, a table-reformatting step, or wanted to glue together a couple of shell commands in a workflow, and didn't want to file a request with your Galaxy admin, UDTs are for you.

UDTs are meant to fill that gap, not to replace published tools. Galaxy's goals of reproducibility and collaboration still matter — whenever a "real" Tool Shed tool already does what you need, prefer it, since workflows and analyses built on published tools are easier for others to share, rerun, and publish. Reach for a UDT when no existing tool fits and the job is too small to justify a full tool submission.

## What is a User-Defined Tool?

A UDT is a small tool definition, written in YAML, that you create and save from within Galaxy itself. It behaves like any other tool on the Tools panel — it has inputs, produces output datasets, and can be added to workflows — but it is created, owned, and (by default) only visible to you.

Here's a complete example: a tool that concatenates a set of input datasets.

```yaml
class: GalaxyUserTool
id: cat_user_defined
version: "0.1"
name: Concatenate Files
description: tail-to-head
container: busybox
shell_command: |
  cat $(inputs.datasets.map((input) => input.path).join(' ')) > output.txt
inputs:
  - name: datasets
    multiple: true
    type: data
outputs:
  - name: output1
    type: data
    format_source: datasets
    from_work_dir: output.txt
```

If you've written a standard Galaxy tool in XML before, this will look familiar — it's the same basic shape (a name, a description, inputs, outputs, and a command to run) with a few important differences described below.

## How is this different from a regular Galaxy tool?

Regular Galaxy tools are written in XML and use the Cheetah templating language to build the command that gets executed. Cheetah has broad access to the Galaxy database and the server's filesystem — which is fine when an administrator is the one writing and reviewing the tool, but is not something Galaxy can safely hand to every user.

To make it safe for any user to author and run their own tools, UDTs use a deliberately restricted format:

- Tools must declare `class: GalaxyUserTool` and are written in YAML rather than XML.
- Every UDT must run inside a **container**, specified with the `container` key. There is no "run directly on the host" option.
- Instead of Cheetah, the command (`shell_command`) is built using **sandboxed JavaScript expressions** inside `$( ... )`. These expressions can only see the tool's declared inputs — they have no access to the Galaxy database, the filesystem outside the job's working directory, reference data, or dataset metadata files (such as BAM indexes).
- The set of supported input types is intentionally smaller than the full XML tool vocabulary: booleans, integers, floats, text, colors, select lists, datasets, and dataset collections, plus the structural building blocks `conditional`, `repeat`, and `section`. Anything outside that set is rejected when the tool is saved.

In short: a UDT can do most of what a simple "chain a couple of command-line tools together" task needs, in exchange for giving up direct system access.

## Creating a tool

Once the feature is enabled on your Galaxy instance (see below), you can create a UDT from the **Tools** panel in the Galaxy interface, which opens an editor where you write the tool definition and save it. Saved tools appear in your own tool list and can be used in histories and workflows just like any other tool.

## Enabling User-Defined Tools (for admins)

UDTs are off by default. A Galaxy administrator needs to:

1. Set `enable_beta_tool_formats: true` in the Galaxy configuration.
2. Create a role of type **Custom Tool Execution** (and, if users should also be able to author new tools, **Custom Tool Creation**) in the admin interface.
3. Assign that role to the users or groups who should be allowed to use the feature.

Because this is a beta feature and the security model is still being hardened, we recommend limiting it to trusted users for now.

## Sharing tools

UDTs are private to the user who created them by default. If you embed a UDT in a workflow and share that workflow, anyone who imports the workflow automatically gets a copy of the tool in their own account — they don't need to have created it themselves or have tool-creation permission.

An administrator can also export a UDT to disk and install it like a regular tool, making it available instance-wide.

## Security considerations

UDTs carry similar risks to [Interactive Tools](https://training.galaxyproject.org/training-material/topics/admin/tutorials/interactive-tools/tutorial.html) — both let users run their own code inside containers on your infrastructure. If you're an admin enabling this feature, we strongly recommend reading the [guidance on securing Interactive Tools](https://training.galaxyproject.org/training-material/topics/admin/tutorials/interactive-tools/tutorial.html#securing-interactive-tools) and configuring your job runner to isolate mounts and restrict network access for these jobs, as shown in this [example Pulsar configuration](https://github.com/galaxyproject/galaxy/blob/dev/test/integration/embedded_pulsar_job_conf.yml). For more information on the security concerns and ways to address them, see the [Total Perspective Vantage (TPV) documentation](https://total-perspective-vortex.readthedocs.io/en/latest/topics/advanced_topics.html#auto-injected-tool-type-tags).

## Current limitations

UDTs are a beta feature and still evolving. At the moment:

- There's no access to Galaxy's reference data.
- There's no access to dataset metadata or metadata files (such as BAM indexes).
- There's no access to a tool's `extra_files` directory.
- Test cases aren't supported yet.

## Learn more

For the full technical reference, including the complete list of supported input types and fields, see the [Galaxy administration documentation on User-Defined Tools](https://docs.galaxyproject.org/en/master/admin/user_defined_tools.html).
