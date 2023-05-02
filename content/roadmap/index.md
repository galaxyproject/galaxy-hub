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
    - Graph view
    - Architecture: new scroller
    - "Jump-to" bookmark
    - Collection-level versus dataset-level behavior
3. Activity Bar
4. Notification framework
    - Summary notification page
    - Badge on the activity bar
    - initial build-in notifications
    - API for sending notifications
5. Visualisation
    - IGV.js replacing Trackster (with other options to come, including JBrowse, etc)
    - independent from client build, API-driven registry & build management
    - easier access to ITs and better management
6. Dataset-view: tabbed interface in the middle pane
    - Comprehensive component for displaying all of a Dataset’s related sub-interfaces (display, viz, edit, info, etc.)
7. Dateset-management related features
    - Design a good UX for Scratch history / History archival
8. UI simplification: One button-type analyses
    - Select a well developed workflow and prototype a "one-click" type of analysis

## Backend

1. Underlying infrastructure
    - address limitations in the task execution framework
    - SQLAlchemy 2.0
    - FastAPI - Port (and document) more APIs to FastAPI
2. Assist System WG
    - IDC
    - Pulsar hardening
    - Get the new ToolShed deployed
3. User based object store 
    - External stores
    - Scratch storage/histories
4. federated and data-local computing on commercial cloud(s):
    - From .org, run an analysis on AWS/GCP that processes data on AWS/GCP and stores results on AWS/GCP
5. Merge and harden the ToolShed replacement
6. Push ITs to be considered "stable" (ToolShed ready)

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
3. Improve support for job caching framework
4. Step javascript expressions
5. A website for IWC workflows
6. Workflow development
    - IWC procedure for workflow submission will benefit from simplification
    - Workflow editor improvements
        - making workflow elements selectable, copyable, and pastable
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
    - Entry in Galaxy-hub for every (new or updated) workflow
10. Schema for job and test definitions
    - Make it easier and faster to write and validate tests and jobs

## Systems

1. Make VGP workflows available on ORG/EU/AU
2. Deployment of iRODS on .org
3. Evaluate/collect all hacks that are currently used to keep usegalaxy.* working. Talk to WGs to get it fixed, or make plans to improve deployments
    - Potential candidates:
        - Fix toolbox handling
        - Data-managers
        - Better errror reporting
        - tmp/cache cleaning
4. Metascheduling
    - switching .eu and .org to TPV
    - deciding on how to emit Pulsar state information to implement metascheduling
    - creating one big pulsar network for usegalaxy.*? (failover, more resilient usegalaxy.* services)
5. Reference data handling

## Outreach and Training

1. Provide better support for the GTN & outreach
    - Editing GTN
    - Search and apply for GTN related funding
2. GTN infrastructure help
3. Grow & diversify the [Galaxy Event Horizon](https://galaxyproject.org/events/) to reach wider audiences
    -  Actively encourage Galaxy team members to present at conferences & locally
    -  Work with the community members to help them publish & publicize their work


