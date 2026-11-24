---
title: "MaterialVital-Digital (MVD) Workshop: Connecting RSpace, CKAN and Galaxy"
date: "2026-11-24"
tease: "The Freiburg Galaxy team demonstrated data exchange with RSpace and CKAN, materials-science analysis, and the development of reusable Galaxy tools and workflows."
subsites: [freiburg]
contributions:
  authorship:
    - anuprulez
    - paulzierep
    - bgruening
  funding:
    - materialvitaldigital
---

## Outline

On 24 November 2026, the MaterialVital-Digital (MVD) workshop in Freiburg explored how Galaxy can connect
experimental documentation, data repositories, and reproducible analysis. The Freiburg Galaxy team presented
**data exchange between RSpace, Galaxy, and CKAN**, alongside approaches for developing Galaxy tools and workflows.

Building on the [July workshop at IWM Freiburg](/news/2026-07-13-mvd-second-workshop/), which mapped user and data
journeys and identified integration points, the November presentations focused on practical routes from stored
experimental data to analysis and back to the systems used by researchers.

## Connecting RSpace, Galaxy and CKAN

RSpace, Galaxy, and CKAN support complementary parts of the data journey: documenting experiments, analysing
data, and making datasets available through a data portal. The integration presentation described how data can
be sent from RSpace or CKAN to Galaxy, processed with tools or workflows, and returned with analysis results.

Galaxy's **File Sources Framework** provides a common interface for accessing connected repositories. The slides
illustrated adding an RSpace connection through **Manage Your Repositories**, selecting the RSpace template,
and entering the endpoint and API key. Researchers can then browse and import data through Galaxy's interface.
Results can also be exported to connected file sources that support writing.

The presentation covered several ways to initiate analysis: through the Galaxy web interface, through its API,
or with an AI agent. These entry points connect to the same analysis environment, including tools, workflows,
visualizations, and interactive environments such as Jupyter and RStudio.

## RSpace to Galaxy and back

The RSpace demonstration followed a materials-science example involving **scanning electron microscopy (SEM)
fibre analysis**. An image and a JSON file containing analysis parameters were brought into Galaxy from an
RSpace document. The recording also showed a request to Galaxy's integrated AI assistant, Olit, to run the
SEM fibre analysis tool using those parameters, followed by a return to the RSpace notebook to document results.

This illustrates how experimental records can provide both the data and the context needed for analysis,
while the notebook remains a place to connect the experiment with its computational results.


[![Watch the RSpace–Galaxy–RSpace demonstration on YouTube](add link to the video)](<add link to the video>)

[Watch the demonstration on YouTube](https://www.youtube.com/watch?v=LPZh9BOjkQs).

[Download the RSpace–Galaxy–RSpace video](./rspace-galaxy-rspace.mp4).

## CKAN to Galaxy and back

The CKAN demonstration illustrated the corresponding round trip between the **MVD data portal** and Galaxy.
This develops the July workshop's idea of a Galaxy entry point in CKAN into a practical demonstration of data
exchange between the repository and the analysis platform.

## Galaxy tools for materials-science analysis

The tools presentation introduced the European Galaxy server and its range of analysis tools and interactive
environments. **ImageJ/DiameterJ fibre analysis** provided a materials-science example, connecting the platform's
capabilities to the electrospinning use case discussed at the July workshop.

The presentation also outlined how a command-line program becomes a Galaxy tool. A tool contribution includes
an XML description, any supporting scripts, software requirements supplied through Conda or containers, and
automated tests. Contributions are submitted for peer review through a pull request to a tool repository.
Deployment, resource allocation, and subsequent upgrades form part of maintaining the tool on a Galaxy server.

Tool-development tutorials and workshops provide a route for researchers to contribute their own analysis
methods. The slides also highlighted how language models can assist with tool development.

## Reusable workflows and analysis provenance

Galaxy workflows connect individual analysis steps into reusable pipelines. The presentation covered the workflow
editor, running workflows, and inspecting workflow invocations, including execution metrics and export options.
It also introduced the **Intergalactic Workflow Commission (IWC)** workflow library and **WorkflowHub** as resources
for discovering and reusing workflows with documentation and example data.

Both presentations highlighted **RO-Crate** as a way to package research outputs with machine-readable metadata.
Workflow Run RO-Crate extends this approach to describe computational executions, including their inputs,
outputs, software, and execution context.

The integration slides illustrated the provenance available in Galaxy exports: tool identifiers and versions,
parameters, command lines, job outputs and exit codes, input-to-output relationships, timestamps, and workflow
definitions and invocation parameters. Keeping this information with exported results helps researchers trace
how an analysis was performed when moving between platforms.

## Next steps

The demonstrations provide a basis for extending the MVD data journeys explored in July. Follow-up work can focus on:

- Applying the RSpace and CKAN data-exchange routes to further materials-science datasets
- Turning recurring analysis tasks into tested Galaxy tools and reusable workflows
- Reviewing how experimental metadata and computational provenance travel with exported results
- Refining the integrations with researchers using the MVD infrastructure

## Resources

- Workshop slides: [Galaxy tool and workflows generation](./galaxy-tools-and-workflows.pdf)
- Workshop slides: [RSpace → Galaxy → CKAN](./rspace-ckan-galaxy-integration.pdf)
- [European Galaxy server](https://usegalaxy.eu/)
- [Galaxy tool-development tutorials](https://galaxyproject.github.io/training-material/topics/dev/#st-tooldev)
- [Planemo: writing standalone Galaxy tools](https://planemo.readthedocs.io/en/master/writing_standalone.html)
- [IWC workflow library](https://iwc.galaxyproject.org/)
- [WorkflowHub](https://workflowhub.eu/)
