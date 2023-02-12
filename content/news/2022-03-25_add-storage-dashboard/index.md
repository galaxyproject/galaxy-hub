---
title: The new Storage dashboard
date: "2022-03-25"
tease: "New pull request from David López merged: Add Storage dashboard"
hide_tease: true
autotoc: false
authors: David López
tags: ['UI-UX', 'feature', 'highlight']
subsites: [global]
---

This PR adds a new `Storage Dashboard` feature to the Galaxy client. It is my first "big" PR for the frontend so I will appreciate comments on style, best practices, patterns, and recommendations!

## General idea
The general idea is to have a **centralized place where the user can have an overview of the disk usage and quota and provide them with tools to easily recover space or manage their data**.

The current interface it's heavily inspired in [Google's storage management](https://one.google.com/storage) (maybe too heavily :sweat_smile:) by keeping it simple and guiding the user as much as possible through the options.

![StorageDashboard](https://user-images.githubusercontent.com/46503462/148061101-0c2cb696-2a9b-43fe-aee3-7e1cff258ddc.gif)

## Extensible
The Storage Manager view has been designed to be easily extended with new operations to discover and free space. Adding more cleanup operations is a matter of editing the `client/src/components/User/DiskUsage/Management/Cleanup/categories.js` and adding a new category or a new operation to an existing category like this:
```js
{
    name: _l("Old Items"), // Category name
    operations: [
        {
            id: "old_datasets", // Unique identifier for this operation
            name: _l("Old datasets"), // The display name
            description: _l("Datasets that haven't been deleted but were not modified in quite some time"),
            fetchSummary: async () => { // Callback that gets the total recoverable space and the number of items to clear
                return { totalSize: 0, totalItems: 0 };
            },
            fetchItems: async () => [], // Callback that fetches the actual items to clear
            cleanupItems: async () => {}, // Callback to purge/delete/clear a collection of items
        },
        {
            id: "old_histories",
            name: _l("Old histories"),
            description: _l("Histories that haven't been deleted but were not modified in quite some time"),
            fetchSummary: async () => {
                return { totalSize: 0, totalItems: 0 };
            },
            fetchItems: async () => [],
            cleanupItems: async () => {},
        },
    ],
},
```
This will add a new category `Old Items` with two operations to delete old datasets and histories. You just need to define proper functions for the `fetchSummary`, `fetchItems`, and `cleanupItems` callbacks.

![Screenshot from 2022-01-04 14-24-54](https://user-images.githubusercontent.com/46503462/148066511-0a98b6be-27c5-4658-bdf7-239fcfaedc2d.png)


## Future work
- This PR only adds one cleanup operation, more can/will be added in different PRs as extensions.
- Add full support for multi quotas and different ObjectStores after https://github.com/galaxyproject/galaxy/pull/14047 is completed.
- In addition to the user-friendly usage cleanup utilities, we can add more options here to visually explore storage data with charts and other visualizations for power users.
- Provide more context information about a particular item when reviewing it. Maybe a popover with more details, or links to history, etc.
- Let us know your ideas!


 Thanks to the reviewers [Marius van den Beek](https://github.com/mvdbeek) and [John Davis](https://github.com/jdavcs).
 Check out the code at [#13113](https://github.com/galaxyproject/galaxy/pull/13113)
