---
title: 'Galaxy 26.1 Release Guardians'
date: '2026-06-01'
end: '2026-06-05'
tease: >-
  The Galaxy 26.1 release is entering community validation. Help
  exercise user-facing changes across real deployments, workflows, and
  browsers before publication.
tags:
  - release-guardians
  - release-testing
  - '26.1'
subsites: [all]
contributions:
  organisers:
    - guerler
    - mvdbeek
components: true
---

The Galaxy **26.1** release is entering community validation. Become a **Galaxy Release Guardian** and help exercise user-facing changes across real deployments, workflows, and browsers before publication.

Pick a pull request from the list below, test the change on the [**Galaxy Test Server**](https://test.galaxyproject.org/), and report your findings directly on the PR. No signup, no separate coordination system. The PR labels are the workflow.

**New to release testing?** That's exactly who we're looking for. Walk through the change as a regular user would, note anything that breaks or feels off, and post your observations on the PR. No prior experience needed. If you get stuck, ask in chat or join the kickoff meeting.

## Become a Guardian

1. Pick a PR from the **Needs Validation** section below.
2. Add the `release-testing-in-progress` label to indicate that validation is underway.
3. Review the PR description and exercise the user-facing change on the [**Galaxy Test Server**](https://test.galaxyproject.org/).
4. Report your findings directly on the PR. Screenshots, regressions, deployment notes, and edge cases are all useful.
5. When validation is complete, replace `release-testing-in-progress` with `release-testing-complete`.
6. Join the [**Matrix room**](https://matrix.to/#/%23galaxyproject_release-testing:gitter.im) for async coordination with other Release Guardians and organisers.
7. Join the [**Kickoff Meeting on Mon Jun 1, 16:00 UTC**](https://meet.google.com/your-meeting-id) to get started and ask questions live.

<ReleaseGuardiansSummary version="26.1" />

## Needs Validation

<ReleaseGuardiansSection version="26.1" kind="needsValidation" emptyMessage="No PRs currently waiting for validation. Check back soon!" />

## In Progress

<ReleaseGuardiansSection version="26.1" kind="inProgress" emptyMessage="No PRs currently being tested." />

## Complete

<ReleaseGuardiansSection version="26.1" kind="complete" emptyMessage="No PRs marked complete yet." />

---

GitHub labels are the source of truth (`release-testing-26.1` for in-scope, `release-testing-in-progress` while being tested, `release-testing-complete` for done). This page is regenerated every 12 hours from the live labels.
