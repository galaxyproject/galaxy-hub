---
title: "Fixing Galaxy tools at scale, without the churn"
date: '2026-06-15'
tease: "A one-time cleanup of a tool repository decays the day after, because new pull requests land in their author's own style. We measured it: 96.7% of recently merged tools-iuc pull requests were still non-canonical. Here is the durable answer, a bulk normalizer plus a forward gate over one provable rule set, run end to end on the current tools-iuc."
tags: [tools, community, development]
subsites: [all, global]
contributions:
  authorship:
    - richard-burhans
---

# Fixing Galaxy tools at scale, without the churn

The [last post][post2] was about what `galaxy-tool-refactor` does for one tool:
format it, upgrade its profile safely, check it against the Planemo linters, and
rename a parameter across the tool and its macros. This post is about the harder
problem: keeping a whole repository of tools, like [`tools-iuc`][toolsiuc], at the
IUC standard, and keeping it there.

## A one-time cleanup decays

You can run the formatter across an entire repository in an afternoon. The trouble
is what happens next. Every new pull request lands in its author's own style, so a
one-shot cleanup starts rebuilding a backlog the moment it merges, and you are back
to hand-nitpicking whitespace in review forever.

That is not a hunch, it is measured. Across 452 recently merged, human-reviewed
`tools-iuc` pull requests, **96.7% were still non-canonical in their merged state**,
even after a full review cycle. The result barely moves if you set aside the one
formatting rule that is still an open question for the community: it is **82.3%**
without it, and **78.8%** for whitespace alone. So the case does not hinge on any
contested convention. A repository drifts, continuously, and review does not catch
the mechanical part.

The durable answer is two cooperating halves over one shared, provable rule set: a
one-time **bulk normalizer** to clear the backlog, and a pre-merge **forward gate**
to keep it from coming back. The gate is what makes the bulk pass worth doing.

## Half A: the bulk normalizer, run on the real thing

The bulk normalizer applies the behavior-preserving, IUC-aligned rule subset across
a whole repository in a single pass. Crucially, it is safe by construction: for
every tool it writes, it re-parses the result, confirms the tool is still valid,
confirms a second pass would change nothing more (idempotence), and **reverts any
tool that would fail either check**. A tool it cannot prove safe is left exactly as
it was.

We ran it over the current `tools-iuc` (2,131 tools). Here is the before and after,
in canonical-form coverage under the rules the forward gate enforces:

```
tools-iuc canonical form, one behavior-preserving pass
before  ███████░░░░░░░░░░░░░░░░░░░   27.4%   (583 / 2131)
after   █████████████████████████   100.0%  (2131 / 2131)

1,972 tools normalized · 0 reverted · 0 validity regressions · idempotent · 0 errors
```

Every one of the 1,972 changes is a deterministic, behavior-preserving edit:
indentation, empty-element shorthand, CDATA wrapping, the provable single-quoting of
command-line file variables, and the like. None of it changes what Galaxy runs or
renders. The earlier this same pass ran on a fork, it even surfaced and fixed a real
bug in one of our own codemods, which is exactly the kind of thing a corpus-wide,
validity-gated sweep is meant to catch.

## Half B: a forward gate, so it stays fixed

Clearing the backlog is only half the job. To keep coverage from eroding back toward
that 27% line, the same rules run as a pre-merge check on each incoming pull request,
over **only the tools that pull request already touches**. It never issues
unsolicited mass changes, and it never reformats files a contributor did not open.
Both halves read the same single classification of which rules are safe to apply, so
the gate and the bulk pass cannot drift apart on what "canonical" means.

In the spirit of the [Carta type-annotation rollout][carta] that inspired this
project, the picture to keep in mind is a coverage line. A one-time pass lifts it to
the top; without a gate it slides back down as new pull requests land; with the gate
it holds:

```
100% ┤ ●───────────────────   with the forward gate (holds the line)
     │  \
     │   `·.                   without it: re-accumulates
 27% ┤      `·──────────────   (96.7% of merged PRs arrive non-canonical)
     └──┬──────────────┬────
     bulk pass        time
```

(That curve is the mechanism, not a measured history. The flat-at-100% line is what
the gate is designed to produce, and the descent is what our re-accumulation
measurement says happens without one.)

The gate ships as a reusable, version-pinned GitHub Action, and the maintainers
choose how it reports:

- **block-until-canonical**: the check fails and names the exact local fix command.
  The author keeps full control of their branch.
- **suggest**: the check does not fail. Instead it posts each fix as a GitHub
  one-click review suggestion, the kind with a **Commit suggestion** button, next to
  a link to the relevant standard, so an author accepts the change in place or learns
  why it was suggested.
- **auto-normalize**: the action fixes the branch directly. Lowest author friction,
  and entirely the maintainers' call.

Suggest mode is the one we are most excited about, because it meets contributors
where they already are: in the pull request, in the review UI they already use. When
a changed tool is not yet canonical, the gate posts a normal review comment with an
inline suggestion, so the author sees exactly what would change and applies it with a
single button:

```text
tools/myapp/myapp.xml

  Forward gate (suggest mode). These are deterministic, behavior-preserving
  fixes toward the IUC canonical form. Click "Commit suggestion" to apply, or
  run locally:  galaxy-tool-refactor format --select <rules> <file>

  Suggested change
  -  <command>mytool --in '$input' > '$output'</command>
  +    <command><![CDATA[mytool --in '$input' > '$output']]></command>

  [ Commit suggestion ]      Reference: IUC tool_xml best practices ↗
```

No context-switch, no separate tool to install, and a link to the standard so the
suggestion teaches rather than just corrects. A fix that lands outside the pull
request's own diff cannot be inlined as a suggestion (GitHub only comments on changed
lines), so the gate summarizes those in the review body with the local `format`
command instead.

This is **already running, live, on a real Galaxy tools repository** (the author's
[`galaxytools`][galaxytools]), pinned to an immutable release, posting one-click fix
suggestions on every tool pull request. The suggestion logic ships inside the
published package as a versioned command, not as copied-in CI shell, so the artifact
that runs in CI is the same deterministic one an author runs locally.

## What is in scope, and what is not

This is the part worth being precise about. Of the 89 rules the toolchain knows
about, **only 11 are auto-applied today**. The rest stay advisory: the gate reports
them, points at the documentation, and leaves the decision to you. A rule earns its
place in the auto-applied set only if it is both provably behavior-preserving and has
an uncontroversial canonical form. Anything that could change behavior, or that
encodes a convention the community has not blessed, stays out of the gate by design.

And none of this is a language model. Every fix is a deterministic codemod with a
written behavior-preservation argument, gated on validity and idempotence across the
whole public corpus on every release. The same input always produces the same
output. We automate the mechanical toil and leave the judgment to people.

## What we would like to ask the community

We would rather bring this to the IUC and Galaxy community as a proposal than
present it as finished. A few genuinely open questions:

- **Is there appetite for a pre-merge canonical-form check at all?** It only ever
  touches code an author is already changing, it makes "canonical" objective and
  self-service, and it frees reviewers from hand-checking formatting. But it is your
  repository and your call.
- **If yes, which reporting mode?** The friendly one-click *suggest* mode, or the
  stricter *block-until-canonical*, or *auto-normalize*?
- **Which rules belong in the day-one set, and who owns that list?** Our proposal is
  the conservative one above: only the provably safe, uncontroversially canonical
  rules, with the list owned by the community, not by us.

There are also a handful of smaller convention questions we raised in the
[previous post][post2] (version-suffix policy for shared macros, command-line quoting
scope, and a few formatting choices we apply that have no written basis yet). Those,
and the day-one rule list, are exactly the kind of thing we would love to settle
together, in person.

## Try it

```console
$ pip install galaxy-tool-refactor
$ galaxy-tool-refactor check tools/    # see where your repo stands, changes nothing
$ galaxy-tool-refactor format tools/   # apply the canonical, behavior-preserving fixes
```

`check` and `format` both walk a directory, so you can point them at a whole `tools/`
tree to see, and then close, the gap, the same provable fixes the bulk pass applies.
The forward gate ships as a published GitHub Action you add to a repository's
pull-request workflow in block or suggest mode, and the bulk-normalize pass that
produced the numbers above lives in the [project repository][repo]. Run the check
across your own tools to see where you stand, and tell us what you find. Issues and
ideas are very welcome, from people and agents alike.

See you at GCC.

[post2]: https://galaxyproject.org/news/2026-06-14-what-galaxy-tool-refactor-does-for-your-tools/
[toolsiuc]: https://github.com/galaxyproject/tools-iuc
[galaxytools]: https://github.com/richard-burhans/galaxytools
[carta]: https://medium.com/building-carta/type-annotation-via-automated-refactoring-fd8edfe123d4
[repo]: https://github.com/richard-burhans/galaxy-tool-refactor
