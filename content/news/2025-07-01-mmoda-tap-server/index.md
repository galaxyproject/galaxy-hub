---
title: "Accessing multimessenger TAP server"
date: "2025-07-01"
tease: "A new new IVOA-compliant TAP server, currently exposing data from the INTEGRAl mission, is now directly accessible from Galaxy."
hide_tease: false
tags: [esg,esg-wp5]
subsites: [all,esg]
supporters: [all-eu, esg, all]
main_subsite: eu
---

Following our recent announcement of [a generic tool for connecting to astronomical data archives](https://galaxyproject.org/news/2023-09-07-esg-wp5-astronomy-archives/), a dedicated Table Access Protocol (TAP) for multimessenger is now available. In particular, this currently exposes the European Space Agency's (ESA) [INTEGRAL](https://www.esa.int/Science_Exploration/Space_Science/Integral) mission data.

By using the [Astronomical Archives tool](https://astronomy.usegalaxy.eu/root?tool_id=astronomical_archives) in Galaxy, you can now connect to this service by using the features made available with this tool. 

This new TAP server can be reached to the URL "http://www.astro.unige.ch/mmoda/dispatch-data/tap/".

<div class="center">
<div class="img-sizer" style="width: 100%">

![Example of an ADQL query, that performs a cone search around a point with provided coordinates](galaxy-ivoa-mmoda-tap.png)</div>  

<figcaption>
Conse search query of <a href="https://sci.esa.int/web/integral">INTEGRAL</a> mission data through IVOA TAP protocol with a <a href="https://usegalaxy.eu/root?tool_id=astronomical_archives">Galaxy tool</a>
</figcaption>
</div>
    
