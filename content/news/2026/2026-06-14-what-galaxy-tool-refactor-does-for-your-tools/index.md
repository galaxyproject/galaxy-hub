---
title: "What galaxy-tool-refactor can do for your Galaxy tools"
date: '2026-06-14'
tease: "It is now pip-installable. Here is what it does for a tool author: format, a behavior-preserving upgrade, faithful Planemo-parity checks, and a handful of opt-in fixers, all deterministic and safe to run on your tools. Plus a few open conventions questions we are bringing to GCC."
tags: [tools, community, development]
subsites: [all, global]
contributions:
  authorship:
    - richard-burhans
---

# What galaxy-tool-refactor can do for your Galaxy tools

Last time we wrote about *how* this repository is built, with one runnable source
of truth that both people and AI agents call. This post is the other half: what the
tool actually does for **you**, a Galaxy tool author or maintainer. It is now
published, so you can try it today:

```console
$ pip install galaxy-tool-refactor
```

## The problem it addresses

Galaxy tool XML drifts from the [IUC best practices][iuc] over time, and Planemo is
excellent at *telling* you what is off. But knowing is not fixing: bringing a tool
back to the conventions, or moving it to a newer Galaxy `profile`, is careful manual
work, and it is easy to change behavior by accident while tidying. `galaxy-tool-refactor`
sets out to **fix everything it can prove is safe, and hand back the rest as
actionable advice**, so the tedious-but-safe part is automatic and your judgement is
reserved for the parts that actually need it.

## What it does

Three commands cover the everyday cases:

- **`format`** rewrites a tool to the canonical style: 4-space indentation, attribute
  order, empty-element shorthand, CDATA-wrapped `<command>` and `<help>`, and
  single-quoted input and output file variables. Safe and idempotent.
- **`check`** reports, never changes: it is a faithful reimplementation of the
  mechanically-checkable Planemo linters (over 110 of them), so you can run the same
  best-practice checks as a library or in CI, with each finding pointing at the rule
  it came from.
- **`upgrade`** repairs a tool and moves its `profile=` **only when validity strictly
  requires it** (the minimal-bump default: a valid tool keeps its declaration, an
  undeclared one stays undeclared). `--modernize` opts into a behavior-preserving walk
  toward the newest profile, stopping at any change it cannot prove is safe and naming
  it for you, and capped at the newest profile the major public Galaxy servers actually
  run, so an upgrade never strands your tool on a server that has not caught up.

There are also opt-in power tools for the bigger one-time changes: `convert-help`
(reStructuredText to Markdown, only when the rendered output is provably the same),
`tokenize-version` (factor a literal version into `@TOOL_VERSION@`/`@VERSION_SUFFIX@`
macros), `normalize-macros`, and `lint-skip` (clean up planemo `.lint_skip` files,
removing only the suppressions it can prove are resolved).

## Why it is safe to run on your tools

This is the part that matters most if you maintain tools you care about:

- **It is a deterministic program, not a language model.** The same input always
  produces the same output. There is no prompt, no temperature, no surprise.
- **Fixes are behavior-preserving by construction.** A `format` pass changes the
  serialized bytes, not what Galaxy runs or renders. Anything that *could* change
  behavior (a profile bump that crosses a semantic change, quoting a value that is
  not provably a single token) is gated: it is applied only where per-tool analysis
  proves it safe, and otherwise reported rather than guessed at.
- **Everything it cannot prove, it hands back as advice.** A non-fixable finding is
  not a dead end; it points at the rule and what to do, so you decide.

We hold ourselves to that standard with the real ecosystem: every release is swept
across thousands of public Galaxy tools (GitHub plus the ToolShed) to confirm the
fixers stay idempotent and behavior-preserving, and where we reimplement a Galaxy
check we verify it against Galaxy's own verdict.

## A small before-and-after

Take a tool whose `<command>` is not wrapped in CDATA and whose `<param>` attributes
are out of the documented order (illustrative, not a real tool):

```xml
<!-- before -->
<tool id="example" name="Example" version="1.0.0">
    <command>mytool --in '$input' &gt; '$output'</command>
    <inputs>
        <param type="data" name="input" format="fasta" label="Input"/>
    </inputs>
</tool>
```

```xml
<!-- after `galaxy-tool-refactor format` -->
<tool id="example" name="Example" version="1.0.0">
    <command><![CDATA[mytool --in '$input' > '$output']]></command>
    <inputs>
        <param name="input" type="data" format="fasta" label="Input"/>
    </inputs>
</tool>
```

`check` would then note, for example, that the tool ships no `<tests>` and that its
package requirement is unpinned: real best-practice gaps it cannot fix for you, handed
back so you can act on them.

## A few questions we are bringing to GCC

Automating this surfaced some genuinely open questions, and we would rather ask than
quietly impose an answer. A couple are about Galaxy-wide policy; a couple are about
conventions *we* apply that turn out to have no written basis, which we measured
across the corpus and would like the community to settle:

- **Version-suffix policy for a shared `macros.xml`.** When several tools in one
  directory share a macros file, should a revision bump be per-tool or suite-wide?
  (Among tools that tokenize their version, 74% already import both tokens from a
  shared macros file.)
- **Command-line quoting.** We auto-quote input and output file variables, which is
  always safe; text-parameter quoting is not always safe, so we leave it as advice.
  Is that the right line?
- **The blank line between top-level sections.** Our formatter used to insert one, but
  it has no IUC citation and only 13% of section boundaries in the corpus use it, so we
  have suspended it pending your call.
- **One-line attributes.** We put every element's attributes on one line, which is
  *stricter* than the IUC guidance (it explicitly allows `label` and `help` to wrap).
  About one tool in five uses that wrap; should we keep collapsing it?
- **Empty-element shorthand** (`<foo></foo>` becomes `<foo/>`). Near-universal, but
  still our own choice, so worth confirming.

If you have views on any of these, we would love to talk at GCC.

## Try it

```console
$ pip install galaxy-tool-refactor
$ galaxy-tool-refactor check path/to/tool.xml
$ galaxy-tool-refactor format path/to/tool.xml
```

Run it on your own tools and tell us what breaks or surprises you: issues and ideas
are very welcome on the [repository][repo], from people and agents alike. There is
also an MCP server, so an AI agent can use the exact same checks and fixes you do, and
the individual tiers are installable as libraries if you want to build on the parser,
the formatter, or the rule set directly.

See you at GCC.

[iuc]: https://galaxy-iuc-standards.readthedocs.io/en/latest/best_practices/tool_xml.html
[repo]: https://github.com/richard-burhans/galaxy-tool-refactor
