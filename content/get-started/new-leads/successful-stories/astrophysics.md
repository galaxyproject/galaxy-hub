
## Our community onboarding

### How did we get to know about Galaxy project and framework and its potential

Diverse web-based data analysis platforms are reasonably well advanced and accepted in astrophysics. As we continued to develop our own research and infrastructure projects in this area, we got advice from some of our colleagues involved in EOSC about the new EuroScienceGateway project, which in particular advances the Galaxy platform in broad range communities. We joined EuroScienceGateway to learn more about Galaxy and make it useful in the astrophysical community. 

Prior to EuroScienceGateway we did not know about the Galaxy, and never heard about it from anyone in the broad astrophysical community. Later we learned that Galaxy was considered as a possible “science platform” for SKA, but was not so far selected (but the potential for adoption remains). 


### What were our needs / challenges :


Each telescope/infrastructure relies on a data reduction pipeline, typically developed and maintained by telescope collaboration and/or a telescope’s Science Data Center. **The telescope tools typically share few reusable components**, except for some common libraries for manipulating common data formats  (such as [astropy](https://github.com/astropy/astropy)). A notable exception is the [HEASOFT](https://heasarc.gsfc.nasa.gov/lheasoft/) package, which includes software for data reduction of most NASA space telescopes. The situation became more complex as **telescopes became more diverse** in the last decades, with proliferation of Gravitational Wave and Neutrino observatories, with very different data reduction techniques and practices. Telescope data reduction is often a **resource-consuming process** and requires dedicated infrastructures.  

Sky objects are more or less the same for all observers, and **telescopes often combine their observations**. Astronomers do not control their subject of study, and observations of transient phenomena are often **opportunistic**, and even **small telescopes can make big discoveries**, meaning that **interoperability is relevant** for big and small infrastructures. The practice of combining observations from very different telescopes to derive a complete view of astrophysical sources is encompassed within “**multi-wavelength**” and “**multi-messenger**” astrophysics discipline. Inter-telescope interoperability is primarily concerned with applying joint analysis techniques (cross-correlation, broad-band modelling, etc) to high-level scientific products: images, emission spectra, light curves.

The understanding that astrophysical questions can be best answered by combining diverse data led to adoption of FAIR practices in astrophysics. To enable them, platforms and portals were developed by big ([ESA](https://datalabs.esa.int/), [NASA](https://heasarc.gsfc.nasa.gov/)) and smaller (just in Switzerland [MMODA](https://www.astro.unige.ch/mmoda/), [DACE](https://dace.unige.ch/), [Renku](https://renkulab.io/)) actors.  Several EOSC projects made important strides in this direction: ASTERICS-OBELICS, ESCAPE.

High level data are usually (although not always) smaller and can be more easily shared. On the other hand, new astrophysical questions occasionally require re-analysis of lower-level data, meaning that low-level analysis also needs to fit in the FAIR paradigm.

Since astrophysical data are inherently non-repeatable and unique, both low-level and high-level data need to be preserved in a reusable long-term way. Astrophysical Archives are taking care of this preservation in accordance with suitable standards, in particular those developed by International Virtual Observatory Alliance ([IVOA](https://www.ivoa.net/)).

### What were the steps we made:

Since we were dealing with this specialised data format, it was suggested to us to try making Galaxy recognize this format, and visualise it, and [we did this](https://github.com/usegalaxy-eu/galaxy/issues/194), making Galaxy much more familiar to astronomers.

As an initial tool development attempt, we [took](https://github.com/esg-epfl-apc/tools-astro/tree/main/tools/astropytools) simple transformations of astrophysical data, part of any real analysis workflow, as provided by [astropy](https://github.com/astropy/astropy) package. These tools also allow converting astrophysical data into formats consumable by many of the Galaxy tools. 


While considering the next tools to add, we realised that many of our [typical workflows](https://doi.org/10.48550/arXiv.2002.12895) contain **hundreds of different tools, repeated hundreds of thousands of times**. Furthermore, many of these tools are unique and not especially useful outside a single workflow. Instead, **we decided to focus on tools and workflows producing and consuming standard reusable data types** (images, spectra, light curves). This way, the analysis complexity is hidden inside some of the tools.

Converting tools to Galaxy format, we noticed that much of the work consists in mechanical mapping of astronomical tool annotation into galaxy tools. To simplify this process, we decided to make a converter from existing collections of tools into Galaxy. Examples of tool collections are  [EOSSR](https://pypi.org/project/eossr/), [HEASOFT](https://heasarc.gsfc.nasa.gov/lheasoft/), [Renku Projects](https://gitlab.renkulab.io/astronomy/mmoda). First case we took creates [PRs for tools](https://github.com/esg-epfl-apc/tools-astro/pulls) for workflows in Renkulab. It quickly became apparent that some of our collaborators benefit from a public instance for previewing our tools before delivering them, and we implemented a [small galaxy instance](https://galaxy.odahub.fr/).

As of now, we are continuing implementation of astronomical galaxy tools, especially those useful in multi-messenger analysis, when interoperability and reusability of workflows is especially crucial.

While reaching-out to various astronomical RIs (e.g. CTA, SKA, ESA) we realized that one of the key concerns of the astro community is making use of large data volumes: getting them into the galaxy, running massively data-parallel workflows. For discovering and selecting data we adopted **IVOA TAP protocol**, and implemented a **galaxy tool** making use of it. 

We are also exploring the possibility of using Galaxy as a GUI for particular telescope workflows, in cases when such a GUI is needed and when it is not yet available.

### What have we achieved given our level of maturity:

With the features and tools we added to Galaxy, it now provides a much more familiar environment for an astronomer.

With the prototype versions of several astronomical telescope data reduction tools, we are demonstrating how Galaxy can produce publication-ready astronomical results fitting real-life needs of astronomers.

### Our setup (technical file)

We are relying on usegalaxy.eu for making our tools broadly available.
To facilitate galaxy live tool review in galaxy tool flow, we setup a small [preview instance](https://galaxy.odahub.fr/) .

On preview instance - local users only, **authentication**, **basic job configuration** and 
**storage**


### Problems to solve

We are still trying to understand how to best use Galaxy with “**Big Data**”: data which is costly to relocate and hence should be treated by reference (following “**deferred data**” Galaxy concept). We are reaching out to other communities with similar needs.

We want to make use of our dedicated compute resources, much of them within the “Grid” computing paradigm (relying on technologies like DIRAC, ARC, Rucio), fitting well within plans of WP4 of ESG.

There is a generic difficulty in choosing a suitable degree of detail for the workflow producing scientific outcome. Since telescope data reduction pipelines are quite unique and have few reusable pieces, we focused on the workflows **combining high-level products**, while **specific telescope workflows are contained within individual tools**. It is to be determined if a high degree of detail is needed for each individual telescope workflow.

### Our community outreach

- Personal contacts
    - We are participating in CTAO and SKAO research infrastructures.
    - We have close contacts with ESA and preparing tools for data reduction of several space telescopes


