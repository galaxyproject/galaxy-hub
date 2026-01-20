---
title: "WorkflowHub Publishers and Journal Forum"
date: "2024-08-03"
tease: "Meeting Summary from EuroScienceGateway's WorkflowHub Publishers and Journal Forum"
hide_tease: false
authors: "Carole Goble"
tags: [esg-wp2, esg, workflow, workflowhub]
subsites: [all-eu, esg, global]
main_subsite: eu
supporters:
  - eurosciencegateway
  - unifreiburg
  - eosc
  - eu
  - workflowhub
  - elixir
---

Computational workflows describe the complex multi-step methods that are used for data collection, data preparation, analytics, predictive modelling, and simulation that lead to new data products. Data processing tasks like data cleansing, normalisation and knowledge extraction need to be automated stepwise in order to foster performance and standardisation, and offer methodological transparency, reproducibility and re-usability. 

Increasingly complex data computations and parameter-driven simulations using computational workflows have taken hold in a range of research disciplines including the biosciences, biodiversity, astronomy, geosciences, social science and climate change. They play a major role in transparent and scalable global COVID surveillance [[Maier et al. 2021]]. As a signal of the takeup of workflows, there are over 350 workflow management systems [[Amstutz et al. 2024]] currently in circulation in the research community.


## Citable Workflow FAIR Digital Objects

As computational workflows become a key component of research methodology, they also become a first class output of contemporary data-driven scientific research, subject to the same need to be [FAIR](https://www.go-fair.org/fair-principles/) (Findable, Accessible, Interoperable, Reusable) as data and software [[Goble et al. 2022]]. Forward thinking journals such as [GigaScience](https://academic.oup.com/gigascience) have highlighted the importance and value in the registration of workflows referenced in their publications [[Edmunds 2024]] in public repositories and registries such as [WorkflowHub](https://workflowhub.eu/).

Reflecting the diversity of the workflow community the WorkflowHub supports any kind of workflow in any workflow language, for any community. Features include: rich metadata and collections; integration with the Git repositories where workflows are developed; workflow versioning and links between workflows; workflow test monitoring; support for interoperable and reproducible Workflow FAIR Digital Objects ([Workflow RO-Crate](https://w3id.org/workflowhub/workflow-ro-crate/)); and support for communities of practice.

The WorkflowHub also supports author credit and attribution. DOIs are [minted](https://about.workflowhub.eu/docs/citable/) for publishing version snapshots of workflows with a citation and put into the scholar communication knowledge graphs (e.g. [DataCite GraphQL](https://support.datacite.org/docs/datacite-graphql-api-guide), [EOSC PID Graph](https://faircore4eosc.eu/eosc-core-components/eosc-pid-graph-pid-graph)). The DOI resolution landing page is the workflow registration entry in WorkflowHub, which signposts all versions accessible.

Journals are a central communication mechanism for scientific results, and will therefore also be central to making workflows first class research outputs that are easier to discover, understand, reuse and cite.  WorkflowHub is the ideal registry for supporting workflow visibility, sharing and publication in the scholarly literature. Authors register a workflow in WorkflowHub and reference its permanent identifier in their publication as either:

1. A DOI for a specific immutable version of the workflow, e.g. <https://doi.org/10.48546/workflowhub.workflow.1063.2>
2. A WorkflowHub URL for the entry for the workflow and all its versions, e.g. <https://workflowhub.eu/workflows/1063>


## Establishing the WorkflowHub Publishers and Journal Forum

The **WorkflowHub Publishers and Journal Forum** was founded in May 2024 to explore how the workflow registries and the scholarly publishing community support the publishing of workflows using WorkflowHub. Representatives from Elsevier, GigaScience, PLoS, and Taylor & Francis joined members of the [ELIXIR](https://elixir-europe.org/) European Research Infrastructure for Life Science Data and members of the EU projects [TIER2](https://tier2-project.eu/) and [EuroScienceGateway](https://eurosciencegateway.eu/).  

Discussion topics included: registration and citation guidelines for authors and publishers; the role of publishing and peer review in the workflow lifecycle lifecycles and for communities of practice; workflow preservation, peer review and reproducibility; [FAIR principles for workflows](https://workflows.community/groups/fair/); the impact on the publishing pipeline and how to track citations. We also discussed other related communities such as [RDA](https://www.rd-alliance.org/groups/complex-citations-working-group/), [ReSA](https://www.researchsoft.org/taskforces/), [Force11](https://force11.org/groups/software-citation-implementation-working-group/) and [CODATA](https://codata.org/).

Our next steps:
- Establish the forum with a regular meeting cadence and web presence on the WorkflowHub website; invite further members.
- Together write two short documents:
  1. Simple registration and citation guidelines for authors and publishers that can be straightforwardly incorporated into publishing pipelines;
  2. The publication benefits of registering a workflow in a public registry.
- Convene a workshop in 2024 Q3 to discuss issues and solutions for workflow citation.


## References

\[Amstutz et al. 2024\] Peter Amstutz, Maxim Mikheev, Michael R. Crusoe, Nebojša Tijanić, Samuel Lampa, et al. (2024):  
**Existing Workflow systems**.  
_Common Workflow Language wiki_, GitHub.  
https://s.apache.org/existing-workflow-systems updated 2024-08-01, accessed 2024-08-03.

\[Edmunds 2024\] 
Scott Edmunds (2024):  
**A Decade of FAIR – and what next?** Q\&A on FAIR workflows with the Netherlands X-omics Initiative.  
_GIGABlog_, 2024-01-14  
<http://gigasciencejournal.com/blog/fair-workflows/>

\[Goble et al. 2022\] Carole Goble, Sarah Cohen-Boulakia, Stian Soiland-Reyes, Daniel Garijo, Yolanda Gil, Michael R. Crusoe, Kristian Peters, Daniel Schober (2020):  
**FAIR Computational Workflows**.  
_Data Intelligence_ **2**(1)  
<https://doi.org/10.1162/dint_a_00033>

\[Maier et al. 2021\] Wolfgang Maier, Simon Bray, Marius van den Beek, Dave Bouvier, Nathan Coraor, Milad Miladi, Babita Singh, Jordi Rambla De Argila, Dannon Baker, Nathan Roach, Simon Gladman, Frederik Coppens, Darren P. Martin, Andrew Lonie, Björn Grüning, Sergei L. Kosakovsky Pond, Anton Nekrutenko (2021):  
**Ready-to-use public infrastructure for global SARS-CoV-2 monitoring**.  
_Nature Biotechnology_ **39**  
<https://doi.org/10.1038/s41587-021-01069-1>

<!-- hyperlinks for the inline [[citations]]  -->

[Amstutz et al. 2024]: https://s.apache.org/existing-workflow-systems "Existing Workflow systems"
[Edmunds 2024]: http://gigasciencejournal.com/blog/fair-workflows/ "A Decade of FAIR – and what next?"
[Goble et al. 2022]: https://doi.org/10.1162/dint_a_00033 "FAIR Computational Workflows"
[Maier et al. 2021]: https://doi.org/10.1038/s41587-021-01069-1 "Ready-to-use public infrastructure for global SARS-CoV-2 monitoring"
