---
title: Initial release of 'gxadmin' tool
date: '2018-10-08'
tags: [devops]
location:
  name: Freiburg, Germany
subsites: [eu, pasteur, freiburg, erasmusmc, elixir-it, belgium, genouest]
main_subsite: eu
---

We have recently released a small utility we use for helping manage our Galaxy
server. It is available on [GitHub](https://github.com/usegalaxy-eu/gxadmin)
and includes many small SQL queries that administrators run every day.

As a Galaxy administrator, you can use it to do things like viewing the queue:

```
$ gxadmin query queue
                            tool_id                                |  state  | count
-------------------------------------------------------------------+---------+-------
 toolshed.g2.bx.psu.edu/repos/iuc/unicycler/unicycler/0.4.6.0      | queued  |     9
 toolshed.g2.bx.psu.edu/repos/iuc/dexseq/dexseq_count/1.24.0.0     | running |     7
 toolshed.g2.bx.psu.edu/repos/nml/spades/spades/1.2                | queued  |     6
 ebi_sra_main                                                      | running |     6
 toolshed.g2.bx.psu.edu/repos/iuc/trinity/trinity/2.8.3            | queued  |     5
```

amongst many more queries. We hope that other administrators will find this
utility useful and can contribute queries that they run often.

