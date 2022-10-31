---
title: Temporarily Held Workflow Invocations
date: '2018-07-12'
tags: [devops, downtime]
location:
  name: Freiburg, Germany
subsites: [eu, freiburg]
main_subsite: freiburg
---

Users reported workflows were not running, we investigated and could not find the root cause but did solve the issue.

## Incident Timeline

Time  | State
---   | ---
12:00 | Workflows Invocations stop moving from `new` state to `scheduled` for unknown reasons
15:43 | We receive simultaneous reports from multiple users
17:28 | We restart handlers and the problem goes away.
{: .table.table-striped }

## Resolution

We have added monitoring for this to identify

<a href="/assets/media/wf-invok-status.png">
<img src="/assets/media/wf-invok-status.png" alt="Workflow Invocation Graph" />
</a>

We have begun monitoring the states of workflows and will receive an alert
whenever there are more than 10 unscheduled workflows, staying unscheduled for
at least 30 minutes.

Hopefully this will let us respond significantly more quickly to similar issues in the future

