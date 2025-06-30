---
title: Galaxy RNA-seq data analysis workshop in Freiburg
date: '2018-12-06T00:00:00.000Z'
end: '2018-12-07T00:00:00.000Z'
tags:
  - training
contacts:
  - email: galaxy@informatik.uni-freiburg.de
    name: Freiburg Galaxy Team
location:
  city: Freiburg im Breisgau
  country: Germany
  geo:
    lat: 48.009973
    lon: 7.857396
  name: Institute for Biology II/III
  postal: 79104
  region: Baden-Württemberg
  street: Schaenzlestr.1
supporters:
  - unifreiburg
  - denbi
  - dzlacademy
  - dzl
hidefooter: true
subsites:
  - eu
  - freiburg
main_subsite: freiburg
slug: events/2018-12-06-announcement-galaxy-course
---
## Table of contents

* * [Venue](#venue)
* [Important notes](#important-notes)
  * [Program:](#program)
  * [Lunch Options](#lunch-options)
  * [Preparation](#preparation)
  * [Travel Options](#travel-options)
  * [Accomodations](#accomodations)
  * [Organizers](#organizers)
  * [Supported By](#supported-by)

## Venue

{% include map.html location=page.location showmap=true zoomlevel=15 hidepopup=true %}

# Important notes

1. If you are registered but **cannot attend** our workshop, please [contact us
   by email](mailto:galaxy@informatik.uni-freiburg.de) immediately. We have a long waiting
   list and can give your place to others, even on short notice.
2. You can bring your *own notebook* or computers will be available. Eduroam is available, ask your institute for how to login.
3. The workshop is free of charge. Unfortunately no stipends for travel or accommodation are available.
4. DZL Academy Fellows will be reimbursed for travel and accommodation by DZL Academy.

## Program:

Every day the workshop will run from 9:00-17:00 (give or take, depending on questions at the end). If the times will change, it will be announced during the workshop.

Day     | Topics
\------- | --------
Thursday| **Starts at 10:00 am**, Galaxy Introduction ([Slides](https://galaxyproject.github.io/training-material/topics/introduction/slides/introduction.html), [Tutorial](https://galaxyproject.github.io/training-material/topics/introduction/tutorials/galaxy-intro-peaks2genes/tutorial.html)) and HTS Introduction ([QC](https://galaxyproject.github.io/training-material/topics/sequence-analysis/tutorials/quality-control/tutorial.html), [Mapping](https://galaxyproject.github.io/training-material/topics/sequence-analysis/tutorials/mapping/tutorial.html))
Evening Program | We meet at 18:30 at the [Tourist Information](https://goo.gl/maps/Yrzw7oaars) place in Freiburg next to the old Rathaus.
Friday  | RNA-seq analysis ([Slides](https://galaxyproject.github.io/training-material/topics/transcriptomics/slides/introduction.html), [Tutorial](https://galaxyproject.github.io/training-material/topics/transcriptomics/tutorials/ref-based/tutorial.html))
{:.table.table-striped}

## Lunch Options

<iframe src="https://www.google.com/maps/d/embed?mid=1Brpw-UguRNDISn4_bVk8ifRkTRG8JIWR" width="100%" height="480"></iframe>

## Preparation

You must go through two Galaxy interactive tours before beginning the training.
These interactive tours guide you stepwise through the Galaxy user interface
and the history. They will help you to follow the Galaxy introduction, and
ensure everyone has a basic understanding of how Galaxy works.

* [Galaxy UI](https://usegalaxy.eu/tours/core.galaxy_ui)
* [History Introduction](https://usegalaxy.eu/tours/core.history)

If you have any questions, please do not hesitate to [contact us](mailto:galaxy@informatik.uni-freiburg.de)

## Travel Options

From Basel airport to Freiburg you have two options:

1. Take the train to Freiburg Hauptbahnhof (ICE or EC takes 30 min; Regio 60 min)
2. Take the airport shuttle bus to Freiburg Hauptbahnhof ([Timetable](https://www.freiburger-reisedienst.de/en/airportbus/timetable.php))

From Freiburg Hauptbahnhof to Venue you should use local public transport (VAG):

* [Tram line map](http://www.vag-freiburg.de/fahrplan-linien/netzplaene/liniennetzplan.html)
* Tram line: 2
* Tram stop: "Hauptstraße"

You are looking for building 1 (Institute of Biology II/III) on the [university map](http://www.uni-freiburg.de/universitaet/kontakt-und-wegweiser/lageplaene/aussenklinik)

## Accomodations

Some suggestions for hotels (please check portals such as HRS, booking, etc.)

Hotel                                         | Location           | Website
\--------------------------------------------- | ------------------ | ----------
Hotel am Rathaus                              | Rathausgasse 4-8   | [Website](http://www.am-rathaus.de/)
Hotel Barbara                                 | Poststrasse 4      | [Website](http://www.hotel-barbara.de/)
Intercity Hotel Freiburg                      | Bismarckallee 3    | [Website](http://de.intercityhotel.com/Freiburg/InterCityHotel-Freiburg)
Stadthotel Freiburg Kolping Hotel & Gästehaus | Karlstr.7          | [Website](http://www.hotel-freiburg.de/)
Ibis Freiburg Süd (bit more far away)         | Bötzinger Str.76   | [Website](http://www.accorhotels.com/de/hotel-2656-ibis-budget-freiburg-sued/index.shtml)
StayInn Hostel und Gästehaus                  | Stühlinger Str.24a | [Website](http://www.stayinn-freiburg.de/hostel-und-gaestehaus/)
{:.table.table-striped}

<!-- TODO: map -->

> Note:
> In Freiburg you sometimes have to pay an additional accommodation tax. For business trips this tax does not
> to be paid if your employer fills out [this form](http://www.freiburg.de/servicebw/UebernachtungSt_Arbeitgeberbescheinigung.pdf). You will need to show this form to the hotel.
> {:.alert.alert-warning}

## Organizers

{% assign extra\_organizers =  "galaxy-freiburg|galaxy-europe" | split: "|"  %}
{% include sponsors.html supporters=extra\_organizers hidetitle=true %}

## Supported By

{% include sponsors.html supporters=page.supporters hidetitle=true %}
