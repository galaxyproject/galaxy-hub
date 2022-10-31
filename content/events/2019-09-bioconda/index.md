---
title: Bioconda Collaboration Fest
date: '2019-09-30'
end: '2019-10-01'
tease: Join us in Freiburg, join other events or organise your own local Bioconda
  Collaboration Fest
tags: [cofest, training]
contacts:
- email: galaxy@informatik.uni-freiburg.de
  name: Freiburg Galaxy Team & MPI Freiburg
location:
  city: Freiburg im Breisgau
  country: Germany
  geo:
    lat: 48.013757
    lon: 7.832635
  name: Building 079
  postal: 79110
  region: Baden-Württemberg
  street: Georges-Köhler-Allee 79
supporters:
- unifreiburg
- denbi
hidefooter: true
continent: EU
gtn: false
subsites: [eu, freiburg, global, us]
main_subsite: freiburg
---

We are organizing a new collaboration fest for [Bioconda](https://bioconda.github.io/) and its ecosystem. This time we would like to organise it globally and decentralised. Feel free to join us in Freiburg, join other events or organise your own local Bioconda Collaboration Fest.

There is a lot to do! Here are a few ideas:

    * Linting of the entire repo
    * adding more jinja templates to make auto-updates and review easier
    * adding DOI / bio.tools
    * Reviewing package license, add missing ones
    * Moving packages to conda-forge
    * Documenting missing parts of Bioconda
    * Missing tools - get started and contribute to Bioconda
    * Go over all our issues
    * Go over all the PRs

More information can be found [here](https://github.com/bioconda/bioconda-recipes/issues/16858). 

You don't know what Bioconda is, read our [community manuscript](https://www.ncbi.nlm.nih.gov/pubmed/29967506) and get involved (-:

## Venue

{% include map.html location=page.location showmap=true zoomlevel=15 hidepopup=true %}

<!-- # Important notes -->

<!-- ## Program: -->

## Lunch Options

<iframe src="https://www.google.com/maps/d/embed?mid=1Uf3CnJGR4LiUFfjs84nBwD7XyGW5H_je&hl" width="100%" height="480"></iframe>

<!-- ## Preparation -->

## Travel Options

From Basel airport to Freiburg you have two options:

1. Take the train to Freiburg Hauptbahnhof (ICE or EC takes 30 min; Regio 60 min)
2. Take the airport shuttle bus to Freiburg Hauptbahnhof ([Timetable](https://www.freiburger-reisedienst.de/en/airportbus/timetable.php))

From Freiburg Hauptbahnhof to Venue you can walk or use local public transport (VAG):

- [Tram line map](http://www.vag-freiburg.de/fahrplan-linien/netzplaene/liniennetzplan.html)
- Tram line: 4 to "Messe"
- Tram stop: "Technische Fakultät"

## Accomodations

Some suggestions for hotels (please check portals such as HRS, booking, etc.)

Hotel                                         | Location           | Website
--------------------------------------------- | ------------------ | ----------
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
{:.alert.alert-warning}

## Organizers

{% assign extra_organizers =  "galaxy-freiburg" | split: "|"  %}
{% include sponsors.html supporters=extra_organizers hidetitle=true %}

## Supported By

{% include sponsors.html supporters=page.supporters hidetitle=true %}
