---
title: Task-based history export tracking
date: "2022-11-21"
tease: "New pull request from David López merged: Add task-based history export tracking"
authors: David López
author_github: davelopez
autotoc: false
tags: ['area/API', 'area/database', esg, esg-wp2]
subsites: [all,esg]
---

## TLDR

This PR enables the tracking of every history export (and potentially any other exportable object) in the Galaxy database
by adding a new table containing structured metadata about the export context.
It also creates a new `HistoryExport` component in the UI that is based on the asynchronous task framework (Celery)
instead of the regular job system for handling exports and short-term downloads (https://github.com/galaxyproject/galaxy/pull/14511).

## Backend Changes

- Adds a new `store_export_association` table to track any object export associated with a task. This table has an `export_metadata` column containing information about the export context (request and result) in a structured JSON (modeled with Pydantic objects).

- Adds a new `StoreExportTracker` class to associate export metadata with any exportable object.

- Refactors the `HistoryExportView` to `HistoryExportManager` for managing the exports associated with histories.

- Adapts the `model_stores` to generate and associate the export metadata to history downloads and remote exports.

- Refactors the Tasks API to use an abstract `AsyncTaskManager` and the corresponding `CeleryAsyncTaskManager` implementation to query tasks status.

- Modifies the `/api/histories/{id}/exports` endpoint to accept a new type `application/vnd.galaxy.task.export+json` that will return the new task-based export associations. It will continue returning the previous "JEHAs" using the default request accept type so it's backward compatible.

- Some other small refactorings for the schemas, removing unused code, etc.

## Frontend Changes

Added several new components to display information on the last export and previous ones along with actions to download them again or re-import them from remote sources, or even choose the preferred archive format. They provide similar functionality as the previous components (that still are used when Celery is not enabled) and include a bit more related to the export tracking.

### Choose Export Options

Now you can decide which export format and dataset files want to include in the archive.

![image](https://user-images.githubusercontent.com/46503462/205378170-7e625ea5-b3c5-4d9f-b377-9b3f88ed7b12.png)


### Direct Download (Temporal)

When you use the direct download option, it will be reused (the package won't be regenerated) whenever you try to download it again until:

- The download link expires
- The history changes
- The export parameter change

![image](https://user-images.githubusercontent.com/46503462/203846184-7c64c252-6a5d-4792-92ed-d377e76d6fab.png)

### Export to Remote File Source (Long term)

When you export your history to a remote file source a reference will be stored in the record and you can reimport it later as long as the remote file source maintains the exported package.

![image](https://user-images.githubusercontent.com/46503462/203846392-6b9e8cad-ab1a-4709-9fbd-880a792a6cf5.png)

### List of previous exports

You can download or reimport copies (snapshots) of previous versions of the history as long as they have not expired or the
remote source maintains them.

![image](https://user-images.githubusercontent.com/46503462/203847316-3fc0b0c4-2cb6-44b0-a242-47431fc25e20.png)


Thanks to the reviewers [John Chilton](https://github.com/jmchilton) and [Marius van den Beek](https://github.com/mvdbeek).
Check out the code at [#14839](https://github.com/galaxyproject/galaxy/pull/14839)
