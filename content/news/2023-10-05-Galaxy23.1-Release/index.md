---
title: 'Galaxy 23.1 Release'
date: '2023-10-05'
tease: "Galaxy 23.1 is here! Check out the highlights!"
hide_tease: false
authors: Natalie Whitaker
tags: [Release]
subsites: [global, all]
main_subsite: us
---

# June 2023 Galaxy Release (v 23.1)

Galaxy 23.1 is here! We are proud to share the highlights of the new release with our users! 

## Highlights

### Activity Bar

23.1 introduces the Activity Bar, a new customizable interface element designed for swift navigation through various sections of the application. The feature is currently opt-in, and you can try it today by enabling it in User Preferences. Upcoming releases will enable this by default for all users, and will extend functionality with new activities and by allowing users to drag items such as datasets and workflows directly from the UI into the activity bar component.

![23 1-activity-bar](https://github.com/galaxyproject/galaxy-hub/assets/129767521/2a1029ba-bbfd-4d97-b36e-e05d27fcd645)

### Carbon Emissions Reporting

Monitor your environmental impact with our new Carbon Emissions Reporting feature. This feature is available on the job information page, allowing users to track their carbon footprint in real-time. The calculations assume global average values for carbon intensity and power usage effectiveness. Monitor your carbon footprint and become inspired to better your relationship with the environment!

![23 1-carbon-footprint](https://github.com/galaxyproject/galaxy-hub/assets/129767521/6e7e44aa-8569-4416-af8f-037832b64dde)

### History Archival Feature

The history menu has a new option to move a history out of your active histories and into an archive. When archiving a history, you will be presented with two options: either to “Keep the Storage Space” or to “Free the Storage Space” taken up by the history. Keeping the storage space will keep the contents of the history where they are, allowing them to be restored at any moment, but will prevent the UI from allowing certain operations on the history. Freeing the storage space will prompt you to package and export the history to a permanent remote source as a backup snapshot, and then will purge the history and its contents to free up storage space. There will be a simple list, titled Archived Histories, for you to explore your archived histories and restore and reimport them, as needed!

### Visualize HDF5 Datasets

Users can now visualize their HDF5 datasets directly in Galaxy, thanks to the integration of the h5web visualizer (https://h5web.panosc.eu/)!

<img width="400" alt="23 1-hdf5" src="https://github.com/galaxyproject/galaxy-hub/assets/129767521/602dd86d-320b-4f46-bb11-0eda6cc9117b">

# Galaxy Notification Framework

Galaxy now contains a universal notification framework. This will facilitate sending notifications about a wide variety of scenarios like job completion, artifact sharing, server updates, and more. Users have control over their notifications, including the option to subscribe/unsubscribe from certain types of notifications. The new notification system also supports broadcast notifications, allowing administrators to send server-wide announcements, such as server maintenance or downtime notifications.

## Release notes

Want to know more about Galaxy 23.1? Please see the [full release notes](https://docs.galaxyproject.org/en/master/releases/23.1_announce.html) for all the details!

*Thanks for using Galaxy!*

[The Galaxy Team](https://galaxyproject.org/galaxy-team/)
