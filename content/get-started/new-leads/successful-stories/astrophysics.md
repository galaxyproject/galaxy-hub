
## Our community onboarding

### How did we get to know about Galaxy project and framework and its potential

Diverse web-based data analysis platforms are reasonably well advanced and accepted in astrophysics. As we continued to develop our own research and infrastructure projects in this area, we got advice from some of our colleagues involved in EOSC about the new EuroScienceGateway project, which in particular advances the Galaxy platform in broad range communities. We joined EuroScienceGateway to learn more about Galaxy and make it useful in the astrophysical community. 

Prior to EuroScienceGateway we did not know about the Galaxy, and never heard about it from anyone in the broad astrophysical community. Later we learned that Galaxy was considered as a possible “science platform” for SKA, but was not so far selected (but the potential for adoption remains). 


### What were our needs / challenges :


Each telescope/infrastructure relies on a data reduction pipeline, typically developed and maintained by telescope collaboration and/or a telescope’s Science Data Center. The telescope tools typically share few reusable components, except for some common libraries for manipulating common data formats  (such as [astropy](https://github.com/astropy/astropy)). A notable exception is the HEASOFT package, which includes software for data reduction of most NASA space telescopes. The situation became more complex as telescopes became more diverse in the last decades, with proliferation of Gravitational Wave and Neutrino observatories, with very different data reduction techniques and practices. Telescope data reduction is often a resource-consuming process and requires dedicated infrastructures.  

Sky objects are more or less the same for all observers, and telescopes often combine their observations. Astronomers do not control their subject of study, and observations of transient phenomena are often opportunistic, and even small telescopes can make big discoveries, meaning that interoperability is relevant for big and small infrastructures. The practice of combining observations from very different telescopes to derive a complete view of astrophysical sources is encompassed within “multi-wavelength” and “multi-messenger” astrophysics discipline. Inter-telescope interoperability is primarily concerned with applying joint analysis techniques (cross-correlation, broad-band modelling, etc) to high-level scientific products: images, emission spectra, light curves.

The understanding that astrophysical questions can be best answered by combining diverse data led to adoption of FAIR practices in astrophysics. To enable them, platforms and portals were developed by big (ESA, NASA) and smaller (just in Switzerland MMODA, DACE, Renku) actors.  Several EOSC projects made important strides in this direction: ASTERICS-OBELICS, ESCAPE.

High level data are usually (although not always) smaller and can be more easily shared. On the other hand, new astrophysical questions occasionally require re-analysis of lower-level data, meaning that low-level analysis also needs to fit in the FAIR paradigm.

Since astrophysical data are inherently non-repeatable and unique, both low-level and high-level data need to be preserved in a reusable long-term way. Astrophysical Archives are taking care of this preservation in accordance with suitable standards, in particular those developed by International Virtual Observatory Alliance (IVOA).
