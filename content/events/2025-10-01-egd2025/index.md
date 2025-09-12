---
title: European Galaxy Days (EGD)
date: "2025-10-01"
tease: "European Galaxy Days meeting in Autumn 2025"
continent: EU
location:
    name: Freiburg, Germany
contact: "contact@usegalaxy.eu"
supporters:
- eurosciencegateway
- denbi
- unifreiburg
- elixir
- eu
subsites: [all, eu, esg]
tags: [esg, esg-wp1, esg-wp2, esg-wp3, esg-wp4, esg-wp5]
---

The **European Galaxy Days** will be held from the **1st to 3rd of October 2025** in Freiburg im Breisgau, Germany. This 3-day meeting will be similar to the events we held in [2023](https://galaxyproject.org/events/2023-10-egd/),  [2022](https://galaxyproject.org/events/2022-10-egd/), [2018](https://galaxyproject.org/events/2018-europe-dev/), [2016](https://galaxyproject.org//events/sg2016/), [2014](https://galaxyproject.org//events/sg2014/), and [2012](https://galaxyproject.org//events/switzerland2012/). The first two days will give an overview of the current state of the Galaxy framework and community with several talks, demonstrations, and Birds of a Feather sessions. As part of a CoFest, the third day offer the opportunity to continue the discussions, to code and hack as well as enjoy the Galaxy community.

We are holding **3 events** in the same week:

- The **ELIXIR Galaxy Community Face-to-face (F2F)** meeting,
- The **EuroScienceGateway** Final Conference,
- The **European Galaxy Days (EGD)** meeting.

<figure class="figure">
  <g-image src="./logo_egd_2025.png" class="figure-img img-fluid rounded" />
</figure>

# Contributing

Galaxy is powered by the people who use, develop, and administrate it, regardless of their community. We invite you to contribute and enrich our meeting through different activities such as talks, demos, posters, and Birds-of-a-feather meetings (BoFs). If you have something to share or talk about, we give you a slot in the schedule.

# Registration

Registration is free. We recommend to register as soon as possible to secure your spot for different events as well as helping us to organize the event better.

<div class="row justify-content-center">
  <a class="btn w-25 btn-dark" href="https://docs.google.com/forms/d/19pQ3c906y1GxvtzEmsEXcXSk31x-5HQje5WlnlRdCOI/" role="button" target="_blank">Register now</a>
</div>

# Schedule

<ClientOnly>

<div id="schedule-tabs">
  <div class="tab-header">
    <button class="tab-button" :class="{ active: activeTab === 'overview' }" @click="activeTab = 'overview'">🗂️ Overview</button>
    <button class="tab-button" :class="{ active: activeTab === 'day1' }" @click="activeTab = 'day1'">📅 Day 1</button>
    <button class="tab-button" :class="{ active: activeTab === 'day2' }" @click="activeTab = 'day2'">📅 Day 2</button>
    <button class="tab-button" :class="{ active: activeTab === 'day3' }" @click="activeTab = 'day3'">📅 Day 3</button>
  </div>

  <div class="tab-content" v-if="activeTab === 'overview'">
    <h3>Overview</h3>
    <table>
      <thead>
        <tr><th>Day</th><th>Time</th><th>Event</th><th>Location</th><th>Room</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>01.10.2025 (Wed)</td>
          <td>09:00–10:00</td>
          <td><b><span class="event-egd">European Galaxy Days</span></b> &amp; <b><span class="event-elixir">ELIXIR Galaxy Community</span></b><br>Arrival &amp; Welcome · Community update talks</td>
          <td>Building 101</td>
          <td>00 036 (Hörsaal)</td>
        </tr>
        <tr>
          <td>01.10.2025 (Wed)</td>
          <td>10:00–10:30</td>
          <td><b><span class="event-lunch">Coffee break</span></b></td>
          <td>Building 101</td>
          <td>02 016 / 018</td>
        </tr>
        <tr>
          <td>01.10.2025 (Wed)</td>
          <td>10:30–13:00</td>
          <td><b><span class="event-egd">European Galaxy Days</span></b> &amp; <b><span class="event-elixir">ELIXIR Galaxy Community</span></b><br>Arrival &amp; Welcome · Community update talks</td>
          <td>Building 101</td>
          <td>00 036 (Hörsaal)</td>
        </tr>
        <tr>
          <td>01.10.2025 (Wed)</td>
          <td>13:00–14:00</td>
          <td><b><span class="event-lunch">Lunch break</span></b></td>
          <td>Building 101</td>
          <td>02 016 / 018</td>
        </tr>
        <tr>
          <td>01.10.2025 (Wed)</td>
          <td>14:00–16:00</td>
          <td><b><span class="event-elixir">ELIXIR Galaxy Community</span></b><br>Community overview &amp; interactions with ELIXIR platforms</td>
          <td>Building 101</td>
          <td>00 036 (Hörsaal)</td>
        </tr>
        <tr>
          <td>01.10.2025 (Wed)</td>
          <td>16:00–16:30</td>
          <td><b><span class="event-lunch">Coffee break</span></b></td>
          <td>Building 101</td>
          <td>02 016 / 018</td>
        </tr>
        <tr>
          <td>01.10.2025 (Wed)</td>
          <td>16:30–17:30</td>
          <td><b><span class="event-elixir">ELIXIR Birds of a Feather (BoFs)</span></b><br>Session 1<br>1. H.-R. Hotz: Running a local Galaxy server (Small-Scale Admin SIG)<br>2. Y. Le Bras: Galaxy for citizen science</td>
          <td>Building 101</td>
          <td>01 009 / 013 &amp; 01 016 / 018</td>
        </tr>
        <tr>
          <td>02.10.2025 (Thu)</td>
          <td>09:00–10:00</td>
          <td><b><span class="event-egd">European Galaxy Days</span></b><br>New developments talks</td>
          <td>Building 101</td>
          <td>00 036 (Hörsaal)</td>
        </tr>
        <tr>
          <td>02.10.2025 (Thu)</td>
          <td>10:00–10:30</td>
          <td><b><span class="event-lunch">Coffee break</span></b></td>
          <td>Building 101</td>
          <td>02 016 / 018</td>
        </tr>
        <tr>
          <td>02.10.2025 (Thu)</td>
          <td>10:30–13:00</td>
          <td><b><span class="event-egd">European Galaxy Days</span></b><br>New developments talks</td>
          <td>Building 101</td>
          <td>00 036 (Hörsaal)</td>
        </tr>
        <tr>
          <td>02.10.2025 (Thu)</td>
          <td>13:00–14:00</td>
          <td><b><span class="event-lunch">Lunch break</span></b></td>
          <td>Building 101</td>
          <td>02 016 / 018</td>
        </tr>
        <tr>
          <td>02.10.2025 (Thu)</td>
          <td>14:00–16:00</td>
          <td><b><span class="event-meets">European Galaxy Days Meets EuroScienceGateway</span></b><br>Talks to connect communities</td>
          <td>Building 101</td>
          <td>00 036 (Hörsaal)</td>
        </tr>
        <tr>
          <td>02.10.2025 (Thu)</td>
          <td>16:00–16:30</td>
          <td><b><span class="event-lunch">Coffee break</span></b></td>
          <td>Building 101</td>
          <td>02 016 / 018</td>
        </tr>
        <tr>
          <td>02.10.2025 (Thu)</td>
          <td>16:30–17:30</td>
          <td><b><span class="event-bof">Birds of a Feather (BoFs)</span></b><br>Session 2<br>1. Galaxy Tool Management<br>2. microGalaxy for Microbiology</td>
          <td>Building 101</td>
          <td>01 009 / 013 &amp; 01 016 / 018</td>
        </tr>
        <tr>
          <td>03.10.2025 (Fri)</td>
          <td>09:30–17:30</td>
          <td><b><span class="event-egd">European Galaxy Days</span></b><br><a href="https://docs.google.com/document/d/17lcJPnnZYnlFJao3deItakQWoF7CqIpbMcsGz_jMcOc">EGD CoFest &amp; Hackathon</a></td>
          <td>Building 101</td>
          <td>01 009 / 013 &amp; 01 016 / 018</td>
        </tr>
        <tr>
          <td>03.10.2025 (Fri)</td>
          <td>09:30–17:30</td>
          <td><b><span class="event-esg">EuroScienceGateway Final Conference</span></b></td>
          <td>Building 101</td>
          <td>00 036 (Hörsaal)</td>
        </tr>
        <tr>
          <td>03.10.2025 (Fri)</td>
          <td>10:00–10:30</td>
          <td><b><span class="event-lunch">Coffee break</span></b></td>
          <td>Building 101</td>
          <td>02 016 / 018</td>
        </tr>
        <tr>
          <td>03.10.2025 (Fri)</td>
          <td>13:00–14:30</td>
          <td><b><span class="event-lunch">Lunch break</span></b></td>
          <td>Building 101</td>
          <td>02 016 / 018</td>
        </tr>
        <tr>
          <td>03.10.2025 (Fri)</td>
          <td>16:00–16:30</td>
          <td><b><span class="event-lunch">Coffee break</span></b></td>
          <td>Building 101</td>
          <td>02 016 / 018</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- DAY 1 -->
  <div class="tab-content" v-if="activeTab === 'day1'">
    <h3>Day 1 – Wednesday, October 1st</h3>
    <table>
      <thead>
        <tr><th>Time</th><th>Speaker</th><th>Title</th><th>Duration</th><th>Room</th></tr>
      </thead>
      <tbody>
        <tr><td>08:30–09:00</td><td>—</td><td><span class="event-elixir">Arrival and Registration</span></td><td>30'</td><td>Main corridor</td></tr>
        <tr><td>09:00–09:30</td><td>Hans-Rudolf Hotz<br>Björn Grüning</td><td><span class="event-elixir">Welcome, Logistics &amp; General Galaxy and ELIXIR Update</span></td><td>30'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>09:30–09:45</td><td>Lucille Delisle<br>Hans-Rudolf Hotz</td><td><span class="event-egd">Galaxy Special Interest Groups (with a focus on “Small Scale Admins” and “Switzerland”)</span></td><td>15'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>09:45–10:00</td><td>Bérénice Batut</td><td><span class="event-elixir">The Microbiology Galaxy Lab and the effort from the microGalaxy to build the first community-driven gateway for reproducible and FAIR analysis of microbial data</span></td><td>15'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>10:00–10:30</td><td>—</td><td><span class="event-lunch">Coffee Break &amp; Poster session<br>Posters:<br>Martin Cech (TBD)<br>Eli Chadwick (TBD)<br>Teresa Müller (Galaxy Training Academy)<br>Yvan Le Bras (TBD)<br>Pauline Seguineau (TBD)<br>Marie Jossé (TBD)<br>Arthur Barreau (TBD)<br>Charles Girardot: LabID workflow integration: Recording data-provenance from sample to workflow results<br>Florian Heyl: Spatial transcriptomics quality control and how to find high quality regions<br>Melanie Föll: Using Qupath in Galaxy for spatial proteomics</span></td><td>30'</td><td>02 016 / 018</td></tr>
        <tr><td>10:30–10:50</td><td>Volodymyr Savchenko</td><td><span class="event-egd">Galaxy and Astronomy community</span></td><td>20'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>10:50–11:10</td><td>TBD</td><td><span class="event-egd">TBD (Community talk update 4)</span></td><td>20'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>11:10–11:25</td><td>Mina Hojat Ansari</td><td><span class="event-egd">FAIRYMAGS: A Galaxy Workflow for MAG Recovery Applied to Termite Microbiomes</span></td><td>15'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>11:25–11:35</td><td>Leandro Liborio</td><td><span class="event-egd">Managing materials science workflows with Galaxy at STFC</span></td><td>10'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>11:35–11:45</td><td>Martin Etzrodt</td><td><span class="event-egd">The ISCC Discovery Protocol: Decentralized signing, timestamping, and discovery for the International Standard Content Code (ISCC)</span></td><td>10'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>11:45–11:55</td><td>TBD</td><td><span class="event-egd">TBD (Community talk update 7)</span></td><td>10'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>11:55–12:15</td><td>TBD</td><td><span class="event-egd">TBD (Community talk update 8)</span></td><td>20'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>12:15–12:35</td><td>TBD</td><td><span class="event-egd">TBD (Community talk update 9)</span></td><td>20'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>12:35–12:45</td><td>Solenne Correard</td><td><span class="event-egd">The Biodiversity Galaxy Lab: A Collaborative Hub with curated tools, workflows and training for FAIR and Reproducible biodiversity analysis</span></td><td>10'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>12:45–13:00</td><td>TBD</td><td><span class="event-egd">TBD (Community talk update 10)</span></td><td>15'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>13:00–14:00</td><td>—</td><td><span class="event-lunch">Lunch Break</span></td><td>60'</td><td>02 016 / 018</td></tr>
        <tr><td>14:00–14:15</td><td>Leonid Kostrykin</td><td><span class="event-elixir">Streamlining the User Experience for Reproducible Image Analysis in Galaxy</span></td><td>15'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>14:15–14:30</td><td>Maria Chavero-Diez<br><em>(Online Presentation)</em></td><td><span class="event-elixir">From Galaxy to EGA: Orchestrating Sensitive Data Access for Interactive Federated Analysis</span></td><td>15'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>14:30–14:45</td><td>Paul De Geest</td><td><span class="event-elixir">TBD</span></td><td>15'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>14:45–15:00</td><td>Mirela Minkova</td><td><span class="event-elixir">On-demand, Reproducible Galaxy Instances in a Secure Environment for the Dutch Scientific Community</span></td><td>15'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>15:15–15:30</td><td>Marisa Loach</td><td><span class="event-elixir">The Single Cell and Spatial Omics Community</span></td><td>15'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>15:30–15:45</td><td>TBD</td><td><span class="event-elixir">TBD (ELIXIR talk 6)</span></td><td>15'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>15:45–16:00</td><td>TBD</td><td><span class="event-elixir">TBD (ELIXIR talk 6)</span></td><td>15'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>16:00–16:30</td><td>—</td><td><span class="event-lunch">Coffee Break &amp; Poster session<br>Posters:<br>Martin Cech (TBD)<br>Eli Chadwick (TBD)<br>Teresa Müller (Galaxy Training Academy)<br>Yvan Le Bras (TBD)<br>Pauline Seguineau (TBD)<br>Marie Jossé (TBD)<br>Arthur Barreau (TBD)<br>Charles Girardot: LabID workflow integration: Recording data-provenance from sample to workflow results<br>Florian Heyl: Spatial transcriptomics quality control and how to find high quality regions<br>Melanie Föll: Using Qupath in Galaxy for spatial proteomics</span></td><td>30'</td><td>02 016 / 018</td></tr>
        <tr><td>16:30–17:30</td><td>Yvan Le Bras</td><td><span class="event-bof">Birds of a Feather (Galaxy for citizen science)</span></td><td>60'</td><td>01 009 / 013</td></tr>
        <tr><td>16:30–17:30</td><td>Hans-Rudolf Hotz</td><td><span class="event-bof">Birds of a Feather (Running a local Galaxy server – Small-Scale Admin SIG)</span></td><td>60'</td><td>01 016 / 018</td></tr>
      </tbody>
    </table>
  </div>

  <!-- DAY 2 -->
  <div class="tab-content" v-if="activeTab === 'day2'">
    <h3>Day 2 – Thursday, October 2nd</h3>
    <table>
      <thead>
        <tr><th>Time</th><th>Speaker</th><th>Title</th><th>Duration</th><th>Room</th></tr>
      </thead>
      <tbody>
        <tr><td>09:00–09:15</td><td>Daniela Schneider</td><td><span class="event-egd">Broadening the Galaxy: Introducing Digital Humanities in Galaxy</span></td><td>15'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>09:15–09:30</td><td>Arash Kadkhodaei</td><td><span class="event-egd">Serving locally hosted LLMs using LiteLLM and Ollama with Galaxy</span></td><td>15'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>09:30–09:45</td><td>Lucille Delisle</td><td><span class="event-egd">pyGenomeTracks – make a publishable figure out of your NGS data</span></td><td>15'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>09:45–10:00</td><td>Arthur Barreau</td><td><span class="event-egd">Two-Step Approach for Galaxy Tool Development Using Jupyter (“Interactive JupyterLab Notebook”)</span></td><td>15'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>10:00–10:30</td><td>—</td><td><span class="event-lunch">Coffee Break &amp; Poster session<br>Posters:<br>Martin Cech (TBD)<br>Eli Chadwick (TBD)<br>Teresa Müller (Galaxy Training Academy)<br>Yvan Le Bras (TBD)<br>Pauline Seguineau (TBD)<br>Marie Jossé (TBD)<br>Arthur Barreau (TBD)<br>Charles Girardot: LabID workflow integration: Recording data-provenance from sample to workflow results<br>Florian Heyl: Spatial transcriptomics quality control and how to find high quality regions<br>Melanie Föll: Using Qupath in Galaxy for spatial proteomics</span></td><td>30'</td><td>02 016 / 018</td></tr>
        <tr><td>10:30–10:50</td><td>Marius van den Beek</td><td><span class="event-egd">The Future of Galaxy Tools</span></td><td>20'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>10:50–11:05</td><td>Alireza Heidari</td><td><span class="event-egd">Simple and Secure Credential Handling for Tools in Galaxy</span></td><td>15'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>11:05–11:20</td><td>José Manuel Domínguez</td><td><span class="event-egd">New integrations: eLabFTW and RSpace ELNs, ARC middleware for distributed computing</span></td><td>15'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>11:20–11:40</td><td>Nicola Soranzo</td><td><span class="event-egd">Making Galaxy workflows sustainable and FAIR</span></td><td>20'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>11:40–12:00</td><td>Yvan Le Bras</td><td><span class="event-egd">Galaxy Ecology: 2025 Update</span></td><td>20'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>12:00–12:20</td><td>Pauline Seguineau<br>Marie Jossé</td><td><span class="event-egd">Galaxy Earth-System</span></td><td>20'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>12:20–12:40</td><td>Beatriz Serrano-Solano</td><td><span class="event-egd">Update by the Imaging Community</span></td><td>20'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>12:40–13:00</td><td>Anthony Bretaudeau</td><td><span class="event-egd">Modern genome browsing in Galaxy with Jbrowse2</span></td><td>20'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>13:00–14:00</td><td>—</td><td><span class="event-lunch">Lunch Break</span></td><td>60'</td><td>02 016 / 018</td></tr>
        <tr><td>14:00–14:20</td><td>Lukasz Opiola</td><td><span class="event-meets">Galaxy &amp; Onedata integration, managing Galaxy data using Onedata, BYOD &amp; BYOS</span></td><td>20'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>14:20–14:35</td><td>Martin Cech</td><td><span class="event-meets">Automating Galaxy Tool Management Through a GitHub Repository Template</span></td><td>15'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>14:35–14:55</td><td>Jain Smitesh</td><td><span class="event-meets">Sustainability of Galaxy (EuroScienceGateway)</span></td><td>20'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>14:55–15:10</td><td>Nikolay Vazov</td><td><span class="event-meets">TBD</span></td><td>15'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>15:10–15:25</td><td>Marco Antonio Tangaro</td><td><span class="event-meets">Laniakea Nebula: VPN-Based Isolation for Galaxy Private Deployments</span></td><td>15'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>15:25–15:40</td><td>Teresa Müller</td><td><span class="event-meets">Exploring the Galaxy Training Network: What's Here, What's New</span></td><td>15'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>15:40–15:50</td><td>Eli Chadwick</td><td><span class="event-meets">Highlighting RO-Crate features in Galaxy and why you should use them</span></td><td>10'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>15:50–16:00</td><td>Anton Nekrutenko</td><td><span class="event-meets">The future of Galaxy ecosystem</span></td><td>10'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>16:00–16:30</td><td>—</td><td><span class="event-lunch">Coffee Break &amp; Poster session<br>Posters:<br>Martin Cech (TBD)<br>Eli Chadwick (TBD)<br>Teresa Müller (Galaxy Training Academy)<br>Yvan Le Bras (TBD)<br>Pauline Seguineau (TBD)<br>Marie Jossé (TBD)<br>Arthur Barreau (TBD)<br>Charles Girardot: LabID workflow integration: Recording data-provenance from sample to workflow results<br>Florian Heyl: Spatial transcriptomics quality control and how to find high quality regions<br>Melanie Föll: Using Qupath in Galaxy for spatial proteomics</span></td><td>30'</td><td>02 016 / 018</td></tr>
        <tr><td>16:30–17:30</td><td>Martin Cech</td><td><span class="event-bof">Birds of a Feather (Galaxy Tool Management – how to save admins’ sanity)</span></td><td>60'</td><td>01 009 / 013</td></tr>
        <tr><td>16:30–17:30</td><td>Bérénice Batut</td><td><span class="event-bof">Birds of a Feather (microGalaxy for Microbiology)</span></td><td>60'</td><td>01 016 / 018</td></tr>
      </tbody>
    </table>
  </div>

  <!-- DAY 3 -->
  <div class="tab-content" v-if="activeTab === 'day3'">
    <h3>Day 3 – Friday, October 3rd</h3>
    <table>
      <thead>
        <tr><th>Time</th><th>Speaker</th><th>Title</th><th>Duration</th><th>Room</th></tr>
      </thead>
      <tbody>
        <tr><td>09:00–17:30</td><td>—</td><td><span class="event-egd"><a href="https://docs.google.com/document/d/17lcJPnnZYnlFJao3deItakQWoF7CqIpbMcsGz_jMcOc">EGD CoFest &amp; Hackathon</a></span></td><td>480'</td><td>01 009 / 013</td></tr>
        <tr><td>09:00–17:30</td><td>—</td><td><span class="event-egd">Sub-Hackathon: secure sensitive data transfer from FEGA and analysis in Galaxy (<a href="https://elixir-europe.org/how-we-work/scientific-programme/commissioned-services/science/hdtr/data">ELIXIR-commissioned service</a>)</span></td><td>480'</td><td>01 016 / 018</td></tr>
        <tr><td>09:00–09:30</td><td>Oana Marchis &amp; Armin Dadras</td><td><span class="event-esg">Welcome and final report from WP1</span></td><td>30'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>09:30–10:00</td><td>Eli Chadwick</td><td><span class="event-esg">Achievements of WP2</span></td><td>30'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>10:00–10:30</td><td>—</td><td><span class="event-lunch">Coffee Break &amp; Poster session<br>Posters:<br>Martin Cech (TBD)<br>Eli Chadwick (TBD)<br>Teresa Müller (Galaxy Training Academy)<br>Yvan Le Bras (TBD)<br>Pauline Seguineau (TBD)<br>Marie Jossé (TBD)<br>Arthur Barreau (TBD)<br>Charles Girardot: LabID workflow integration: Recording data-provenance from sample to workflow results<br>Florian Heyl: Spatial transcriptomics quality control and how to find high quality regions<br>Melanie Föll: Using Qupath in Galaxy for spatial proteomics</span></td><td>30'</td><td>02 016 / 018</td></tr>
        <tr><td>10:30–11:00</td><td>Marco Antonio Tangaro</td><td><span class="event-esg">Achievements of WP3</span></td><td>30'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>11:00–11:30</td><td>Sebastian Luna-Valero</td><td><span class="event-esg">Achievements of WP4</span></td><td>30'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>11:30–12:00</td><td>Nikolay Vazov</td><td><span class="event-esg">Achievements of WP5</span></td><td>30'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>12:00–13:00</td><td>All ESG partners</td><td><span class="event-esg">Final discussions and wrap-up</span></td><td>60'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>13:00–14:00</td><td>—</td><td><span class="event-lunch">Lunch Break</span></td><td>60'</td><td>02 016 / 018</td></tr>
        <tr><td>14:00–16:00</td><td>All ESG partners</td><td><span class="event-esg">Final discussions and wrap-up</span></td><td>90'</td><td>00 036 (Hörsaal)</td></tr>
        <tr><td>16:00–16:30</td><td>—</td><td><span class="event-lunch">Coffee Break</span></td><td>30'</td><td>02 016 / 018</td></tr>
      </tbody>
    </table>
  </div>
</div>

<script>
export default {
  data() {
    return {
      activeTab: 'overview'
    }
  }
}
</script>

<style>
.tab-header {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.tab-button {
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: #eee;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}
.tab-button.active {
  background-color: #ddd;
  font-weight: bold;
}
.tab-content {
  margin-top: 1rem;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 0.5rem;
  border: 1px solid #ccc;
}
.event-egd {
  background-color: #ffadad;
  padding: 2px 6px;
  border-radius: 5px;
}
.event-lunch {
  background-color: #ffd6a5;
  padding: 2px 6px;
  border-radius: 5px;
}
.event-elixir {
  background-color: #fdffb6;
  padding: 2px 6px;
  border-radius: 5px;
}
.event-bof {
  background-color: #caffbf;
  padding: 2px 6px;
  border-radius: 5px;
}
.event-meets {
  background-color: #9bf6ff;
  padding: 2px 6px;
  border-radius: 5px;
}
.event-esg {
  background-color: #bdb2ff;
  padding: 2px 6px;
  border-radius: 5px;
}
</style>

</ClientOnly>

# Venue

<figure class="figure">
  <g-image src="https://www.tf.uni-freiburg.de/de/kontakt/kontakt/@@tx-slides/6a23b96432bb47f584e637df3ef1a865/@@image" class="figure-img img-fluid rounded" />
</figure>

Albert-Ludwigs-University Freiburg<br>
Institute for Informatics<br>
Georges-Köhler-Allee, 101<br>
79110 Freiburg im Breisgau<br>
Germany

<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d459.48765302079113!2d7.834661693743385!3d48.01245843582384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sde!4v1755071188224!5m2!1sen!2sde" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

# Logistics

### Getting to Freiburg

Freiburg can be easily reached by train with the ICE from the North (via Frankfurt and Karlsruhe) and the South (via
Basel) [Deutsche Bahn](https://www.bahn.com/en).

#### How to reach Freiburg from Basel/Mulhouse/Freiburg airport (EuroAirport)?

- Option 1: Use the French/German exit and take
  the [airport shuttle bus](https://www.freiburger-reisedienst.de/index.php) to Freiburg main station (Hauptbahnhof).
- Option 2: Use the Swiss exit and take the local bus (#50) to the train station in Basel and from there take a train
  to Freiburg.

#### How to reach the venue from Freiburg Hauptbahnhof?

- Option 1: Local train; Take the Breisgau S-Bahn from Hauptbahnhof Freiburg to Gottenheim/Breisach towards "Freiburg Messe/Universität".
- Option 2: Tram 4 direction "Messe"; Exit at the stop "Technische Fakultät" (see [tram plan](https://www.vag-freiburg.de/fahrplan/liniennetzplaene)).

The [mobile app](https://www2.bwegt.de/reiseinformationen/apps) of the local public transport company [bwegt](https://www2.bwegt.de/) can also be very helpful to check the schedule of the trains and buses.

### Tram tickets for local transport

[Here](https://www.vag-freiburg.de/tickets) you can find the types of tram tickets that VAG offers.
The [2x4 rides ticket](https://www.vag-freiburg.de/ticket/2x4-fahrten-karte) and the [day pass](https://www.vag-freiburg.de/ticket/tageskarte-solo) are convenient options for several days and/or passengers.

# Event rules and regulations

### Code of Conduct

The European Galaxy Days will abide the [Galaxy Project Code of Conduct](https://galaxyproject.org/community/coc/). Please, make sure that you read it before the event.

# Questions?

If you want to present, help, have suggestions or questions, please get in touch with us. Simply contact:

Armin Dadras (dadras@informatik.uni-freiburg.de)<br>
Hans-Rudolf Hotz (hrhotz@googlemail.com)<br>
Björn Grüning (bjoern.gruening@gmail.com)<br>

# Funding

<div style="display: flex; gap: 1rem; align-items: center; justify-content: center;">
  <figure class="figure">
    <g-image src="/images/logos/ElixirNoTextLogo.png" class="figure-img img-fluid rounded" style="max-height: 80px;" />
  </figure>
  <figure class="figure">
    <g-image src="/images/logos/uni-freiburg-wide.png" class="figure-img img-fluid rounded" style="max-height: 80px;" />
  </figure>
  <figure class="figure">
    <g-image src="/images/logos/EN_Co-fundedbytheEU_RGB_POS.png" class="figure-img img-fluid rounded" style="max-height: 80px;" />
  </figure>
</div>


**EuroScienceGateway** was funded by the European Union programme Horizon Europe (**HORIZON-INFRA-2021-EOSC-01-04**) under grant agreement number [101057388](https://cordis.europa.eu/project/id/101057388) and by UK Research and Innovation (UKRI) under the UK government’s Horizon Europe funding guarantee grant number [10038963](https://gtr.ukri.org/projects?ref=10038963).



