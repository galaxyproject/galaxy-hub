---
title: 'usegalaxy.eu Updates to 26.0'
date: '2026-04-02'
tease: Galaxy EU updates to 26.0 and enables new exciting features
hide_tease: true
tags: [eu, release, infrastructure]
subsites: [eu]
main_subsite: eu
contributions:
  authorship:
    - mira-miracoli
  funding:
    - eu
    - deNBI
    - uni-freiburg
---

# usegalaxy.eu Updates to 26.0

As one of the largest Galaxy servers, we see it as our role to make the latest developments available to the community and to show the world where the Galaxy community is going next.
By updating our servers early, however, after thorough testing, we can present the new features to other Galaxy communities and our admin team can accompany admins from other
Galaxy instances in the update process and share their experiences.

## New Features

Even before the official release, usegalaxy.eu has updated its services to 26.0, making its user base one of the first to benefit from all the new features, including:

- ChatGXY - Intelligent assistance inside Galaxy
- AI-assisted Notebooks with improved JupyterLite integration
- Vintent - AI-assisted data visualization
- Workflow Completion Actions
- Easier Workflow Troubleshooting
- A Redesigned ToolShed Experience

Many user groups benefit from the new updates. We especially like to mention the new AI assistance, which helps users to navigate the platform, discover relevant tools and
troubleshoot errors directly in the interface.
Check out the official [Release Notes](https://docs.galaxyproject.org/en/release_26.0/releases/26.0_announce_user.html) for more detailed information on all the new features.

## Behind the Scenes / Technical Details

Behind the scenes, there were some technical changes that we had to take into account in our update process.
Our upgrade was prepared in the [infrastructure-playbook](https://github.com/usegalaxy-eu/infrastructure-playbook/pull/1964) by merging the upstream configuration files
into our templates, keeping the diff with upstream as small as possible to speed up future update reviews.
Some configuration files that are no longer needed, such as `dependency_resolvers_conf.xml` and `migrated_tools_conf.xml`, were removed from our
`diff-before-update` script, and upstream datatypes and data tables were merged into our configuration.

A few settings changed with this release:

- The `prefer_custos_login` setting was replaced by `prefer_oidc_login`, since Custos was removed upstream.
- New settings such as `inference_services` and `url_headers_config_file` were merged into our configuration, to be configured later on.
- Galaxy 26.0 also marks the project's completed transition to the MIT License, which simplifies licensing for our deployment as well.

Not everything went smoothly on the first try: shortly after the upgrade was deployed, we rolled it back and brought the new version back online the same day.
If you are curious about the full process, have a look at the
[upgrade](https://github.com/usegalaxy-eu/infrastructure-playbook/pull/1964), [revert](https://github.com/usegalaxy-eu/infrastructure-playbook/pull/1982)
and [re-revert](https://github.com/usegalaxy-eu/infrastructure-playbook/pull/1983) pull requests in our infrastructure playbook.

Our servers are now running the `release_26.0_europe` branch, and until the official release is out, upstream changes will regularly flow into it.
Stay tuned for the official [Galaxy 26.0 release announcement](https://galaxyproject.org/news/2026-04-13-galaxy-release-26-0/)!
