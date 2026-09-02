---
title: 'Galaxy 26.1 Release Guardians'
date: '2026-06-01'
end: '2026-06-05'
tease: >-
  The Galaxy 26.1 release is entering community validation. Help
  exercise user-facing changes across real deployments, workflows, and
  user environments before publication.
tags:
  - release-guardians
  - release
subsites: [all]
contributions:
  organisers:
    - guerler
    - mvdbeek
components: true
---

<ReleaseGuardiansPhase endDate="2026-06-05">
  <div slot="active">

The Galaxy **26.1** release is entering community validation. Become a **Galaxy Release Guardian** and help exercise user-facing changes across real deployments, workflows, and user environments before publication.

Pick a pull request from the list below, test the change on the [**Galaxy Test Server**](https://test.galaxyproject.org/), and capture your findings by [**opening a new issue**](https://github.com/galaxyproject/galaxy/issues/new?template=bug_report.md) that references the PR number. Keeping the feedback in a dedicated issue keeps the PR conversation focused on code review. The PR labels are the workflow.

**New to release testing?** That's exactly who we're looking for. Walk through the change as a regular user would, note anything that breaks or feels off, and [**file a new issue**](https://github.com/galaxyproject/galaxy/issues/new?template=bug_report.md) describing what you observed (with the PR number for context). No prior experience needed. If you get stuck, ask in the Matrix room or join the kickoff meeting below.

<ReleaseGuardiansCoordination matrixLink="https://matrix.to/#/%23galaxyproject_release-testing:gitter.im" meetingName="Testing and Hardening Working Group Meeting" meetingLink="https://meet.google.com/ios-kygq-hfw" startDate="2026-06-01" meetingTime="16:00" />

<h2 id="become-a-guardian"><Icon name="shield-check" /> Become a Guardian</h2>

1. Pick a PR from the **Needs Validation** section below.
2. Add the <ReleaseGuardiansLabelPill label="release-testing-in-progress" kind="inProgress" /> label to indicate that validation is underway.
3. Review the PR description and exercise the user-facing change on the [**Galaxy Test Server**](https://test.galaxyproject.org/).
4. [**Open a new issue**](https://github.com/galaxyproject/galaxy/issues/new?template=bug_report.md) describing your findings, reference the PR number, and include screenshots, regressions, deployment notes, and any edge cases you hit.
5. When validation is complete, replace <ReleaseGuardiansLabelPill label="release-testing-in-progress" kind="inProgress" /> with <ReleaseGuardiansLabelPill label="release-testing-complete" kind="complete" />.

  </div>
  <div slot="closed">

<ReleaseGuardiansRecap version="26.1" endDate="2026-06-05" />

  </div>
</ReleaseGuardiansPhase>

<ReleaseGuardiansSummary version="26.1" endDate="2026-06-05" />

<ReleaseGuardiansPhase endDate="2026-06-05">
  <h2 id="needs-validation" slot="active"><Icon name="circle-dashed" /> Needs Validation</h2>
  <h2 id="needs-validation" slot="closed"><Icon name="circle-dashed" /> Not tested</h2>
</ReleaseGuardiansPhase>

<ReleaseGuardiansSection version="26.1" kind="needsValidation" endDate="2026-06-05" />

<ReleaseGuardiansPhase endDate="2026-06-05">
  <h2 id="in-progress" slot="active"><Icon name="loader" /> In Progress</h2>
  <h2 id="in-progress" slot="closed"><Icon name="loader" /> Attempted, not finished</h2>
</ReleaseGuardiansPhase>

<ReleaseGuardiansSection version="26.1" kind="inProgress" endDate="2026-06-05" />

<ReleaseGuardiansPhase endDate="2026-06-05">
  <h2 id="complete" slot="active"><Icon name="circle-check" /> Complete</h2>
  <h2 id="complete" slot="closed"><Icon name="circle-check" /> Validated</h2>
</ReleaseGuardiansPhase>

<ReleaseGuardiansSection version="26.1" kind="complete" endDate="2026-06-05" />

---

GitHub labels are the source of truth (`release-testing-26.1` for in-scope, `release-testing-in-progress` while being tested, `release-testing-complete` for done). This page is regenerated every 12 hours from the live labels.
