---
title: DNS outage affecting UseGalaxy.eu
date: '2018-04-26'
tags: [devops, downtime]
location:
  name: Freiburg, Germany
subsites: [eu, freiburg]
main_subsite: freiburg
---

Google's DNS stopped responding to requests for usegalaxy.eu for 35 minutes.

## Incident Timeline

Time  | State
---   | ---
12:10 | DNS providers failed to respond to requests for `usegalaxy.eu`
12:19 | We received a user report that usegalaxy.eu was not reachable, nor were any subdomains such as `stats.usegalaxy.eu`. Our testing showed everything working locally in freiburg as most of our computers use BelWü's DNS.
12:24 | Our automated alert finally trigged that DNS was non-responsive for 15 minutes.
12:45 | Systems returned to a functional state on their own.
{: .table.table-striped }

<a href="/assets/media/2018-04-26-outage.png">
<img src="/assets/media/2018-04-26-outage.png" alt="DNS providers failing to respond to requests." />
</a>


## Resolution

There was no short-term resolution for this issue. There is no long term plan
for resolution as DNS issues are not easily solvable at our organisation's
size.

We have begun to monitoring more DNS providers (CloudFlare, Quad9) so hopefully
we will be able to direct users to the most reliable one in the future.

## Background

We check several hostnames and several DNS providers as we've experienced
similar issues before, e.g. `registry.npmjs.org` is checked as BelWü failed to
respond to it breaking several automated processes. `google.com` is checked as a simple sanity-test.

