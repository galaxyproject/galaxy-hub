---
title: Tool Usage Graphs
date: '2018-07-03'
tags: [devops]
location:
  name: Freiburg, Germany
subsites: [eu, freiburg]
main_subsite: freiburg
---

We have leveraged the [Galactic Radio Telescope](https://telescope.galaxyproject.org) to produce graphs of [tool usage over time](https://stats.usegalaxy.eu/d/SDduH5Zik/grt-tool-usage). You can embed these anywhere, in websites, in tool forms, etc.

# Tool Usage Graphs

You can produce graphs for a single tool:

<iframe src="https://stats.usegalaxy.eu/d-solo/SDduH5Zik/grt-tool-usage?orgId=1&var-tool_id=mothur_align_seqs&var-instance_id=All&var-date_interval=30d&from=now-5y&to=now&panelId=2" width="100%" height="200" frameborder="0"></iframe>

Or a group of tools by just using their prefix like with the HiCExplorer tools:

<iframe src="https://stats.usegalaxy.eu/d-solo/SDduH5Zik/grt-tool-usage?orgId=1&var-tool_id=hicexplorer&var-instance_id=All&var-date_interval=30d&from=now-5y&to=now&panelId=2" width="100%" height="280" frameborder="0"></iframe>


As of writing, these graphs contain data for UseGalaxy.eu and UseGalaxy.org

# Embedding

Embedding one of these in your own site is easy!

```
<iframe width="100%" height="200" frameborder="0"
	src="https://stats.usegalaxy.eu/d-solo/SDduH5Zik/grt-tool-usage?orgId=1&var-tool_id=YOUR_TOOL_ID_HERE&var-instance_id=All&var-date_interval=30d&from=now-5y&to=now&panelId=2"></iframe>
```

Copy and paste the above code, replacing `YOUR_TOOL_ID_HERE` with the your tool's ID. To do a group of tools, your tools *must* all share a common prefix, e.g. `hicexplorer_`.

