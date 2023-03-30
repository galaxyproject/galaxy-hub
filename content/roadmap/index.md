---
title: Galaxy Roadmap
---

![](/images/roadmap/road.jpg)


This page contains short-term (6 to 12 months) roadmap of the project. It is organized by [working groups](/community/wg/).

## User Interface and Experience

1. Underlying infrastructure
    - Vue as the sole framework in primary app
    - Zero Backbone, Zero jQuery, single entry
    - Grids, Upload, FormElements
    - Rule Builder UX+Refactor
    - Testing for Accessibility
2. History
    - Graph view (<kbd>BACKEND</kbd>)
    - Architecture: new scroller
    - "Jump-to" bookmark
    - Collection-level versus dataset-level behavior
3. Activity Bar
4. Notification framework (<kbd>BACKEND</kbd>)
    - A notification page
    - Badge on the activity bar
5. Visualisation
    - IGV.js replacing Trackster (with other options to come, including JBrowse, etc)
    - Split from client build, API-driven registry & build management (<kbd>BACKEND</kbd>)
    - ITs
6. Dataset-view: tabbed interface in the middle pane
    - Comprehensive component for displaying all of a Dataset’s related sub-interfaces (display, viz, edit, info, etc.)
7. Dateset-management related features (*not likely for this round*) (<kbd>BACKEND</kbd>)
    - Design a good UX for Scratch history / History archival
8. UI simplification: One button-type analyses
    - Select a well developed workflow and prototype a "one-click" type of analysis
9. Paper

## Backend

1. Underlying infrastructure
    - address limitations in the task execution framework
    - SQLAlchemy 2.0
    - FastAPI
        - Port (and document) more workflow APIs to FastAPI
2. Assist System WG (<kbd>SYSTEMS</kbd>)
    - IDC
    - Pulsar hardening
    - Metascheduling
        - switching .eu and .org to TPV
        - deciding on how to emit Pulsar state information to implement metascheduling
        - creating one big pulsar network for usegalaxy.*? (failover, more resilient usegalaxy.* services)
    - Get the new ToolShed deployed
3. User based object store 
    - External stores
    - Scratch (see [this](https://github.com/galaxyproject/galaxy/pull/14073))
4. federated and data-local computing on commercial cloud(s):
    - From .org, run an analysis on AWS/GCP that processes data on AWS/GCP and stores results on AWS/GCP (which requires user-based object store?)
5. Merge and harden the Tool Shed replacement (<kbd>SYSTEMS</kbd>)
6. Push ITs to be considered "stable" (Tool Shed ready)
    - What is missing?

## Testing & Hardening

1. Support other WG and new contributors to write tests
    - Expand testing tutorial
2. Ongoing work on testing infrastructure with a focus on deployment tests
3. Upgrade tests, test infrastructure for database access, add documentation 
4. Systematic improvement of test coverage: 
    - Prioritize features that lack test coverage, are critical, and are known to break
    - Improve documentation on Galaxy's testing utilities: help write more/better tests using existing infrastructure
5. Talk and write more about the testing efforts in Galaxy

## Tools and workflows

1. Improve subworkflow maintenance user story:
    - Replace / upgrade subworkflow, keep connections (as far as possible)
    - Workflows as trees
    - Link child and derived workflows back to parent workflows
2. Execution of workflow and tool tests using embedded Pulsar by default	
    - Harden Pulsar support; less work for admins to route tools to non-pulsar destinations
    - Support for sending steps that require large resources to external TES server
3. Improve support for job caching framework (<kbd>Backend</kbd>)
4. Step javascript expressions (<kbd>UI/UX</kbd>)
5. A website for IWC workflows
6. Workflow development
    - Workflow editor improvements: making workflow elements selectable, copyable, and pastable
    - IWC procedure for workflow submission will benefit from simplification
    - Versioning
        - Named versions
        - A nice UI for going back or displaying differences
7. High-importance tools & workflows
    - Machine learning
    - Genome assembly/Long-read analysis
    - Spatial analyses
8. Executable Workflow Editor Tour(s) and tutorials
9. Standalone workflow graph view (builds on reactive workflow editor work, with UI/UX)
    - For Static Page, Progress View, Pages / Workflow Reports
    - Entry in galaxy-hub for every (new or updated) workflow
10. Schema for job and test definitions (23.2)
    - Make it easier and faster to write and validate tests and jobs

## Systems

1. Make VGP workflows available on the 3 big usegalaxy.* instances
2. Deployment of iRODS on .org
3. Evaluate/collect all hacks that are currently used to keep usegalaxy.* working. Talk to WGs to get it fixed, or make plans to improve the situation
    - Potential candidates:
        - Fix toolbox handling
        - Data-managers
        - Better errror reporting
4. Reference data handling

## Outreach and Training

1. Provide better support for the GTN & outreach
    - Hire & onboard a communications specialist (PIs)
    - Editing GTN
    - Search and apply for GTN related funding
2. GTN infrastructure help
3. Grow & diversify the [Galaxy Event Horizon](https://galaxyproject.org/events/) to reach wider audiences
    -  Actively encourage Galaxy team members to present at conferences & locally
    -  Work with the community members to help them publish & publicize their work




