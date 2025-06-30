---
title: Galaxy HTS data analysis workshop in Freiburg
date: '2019-09-23T00:00:00.000Z'
end: '2019-09-27T00:00:00.000Z'
tease: We are offering a Galaxy beginner workshop on high-throughput data analysis.
hide_tease: true
tags:
  - training
contacts:
  - email: galaxy@informatik.uni-freiburg.de
    name: Freiburg Galaxy Team & MPI Freiburg
location:
  city: Freiburg im Breisgau
  country: Germany
  geo:
    lat: 47.993469
    lon: 7.845275
  name: PC Pool 3
  postal: 79098
  region: Baden-Württemberg
  street: Werthmannstraße 4
continent: EU
supporters:
  - unifreiburg
  - denbi
  - mpi
hidefooter: true
subsites:
  - global
  - eu
  - freiburg
main_subsite: freiburg
slug: events/2019-09-23-galaxyhts-freiburg-september2019
---
## Table of contents

* * [Venue](#venue)
* [Important notes](#important-notes)
  * [Program:](#program)
  * [Links](#links)
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
2. Please register to our [European Galaxy server](https://usegalaxy.eu) to perform the analysis. Participants from the\
   MPI Freiburg, please note that the European Galaxy server is different from the MPI Galaxy server. You will need to
   have an account on <https://usegalaxy.eu> as well.
3. You can bring your *own notebook* or desktop computers will be available. Eduroam is available, ask your institute
   for how to login.
4. The workshop is free of charge. Unfortunately no stipends for travel or accommodation are available.

## Program:

Every day the workshop will run from 9:00-17:00 (give or take, depending on questions at the end). If the times will change, it will be announced during the workshop.

Preliminary schedule. Topics may be adjusted according to the participants demand

| Day     | Topics   |
| ------- | -------- |
Mon     | **Starts at 10:00 am**,  HTS and Galaxy presentations and introduction
Tue     | ChIPseq data analysis
Wed     | RNA-seq data analysis
Thu     | HiC data analysis
Fri     | exercises, questions, discussions, bring your own data ... (until 14:00)
{:.table.table-striped}

## Links

* [Galaxy tipps and tricks](https://github.com/bgruening/galaxy-tricks)
* [Galaxy training network](http://training.galaxyproject.org)

## Lunch Options

<iframe src="https://www.google.com/maps/d/embed?mid=13xIYbHTYlxxu-oopBTsSJHqK42M8lO6C" width="100%" height="480"></iframe>

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

From Freiburg Hauptbahnhof to Venue you can walk or use local public transport (VAG):

* [Tram line map](http://www.vag-freiburg.de/fahrplan-linien/netzplaene/liniennetzplan.html)
* Tram line: 5
* Tram stop: "Erbprinzenstraße"

## Accomodations

Some suggestions for hotels (please check portals such as HRS, booking, etc.)

| Hotel                                         | Location           | Website   |
| --------------------------------------------- | ------------------ | --------- |
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
