---
title: Citing Galaxy
---

**Please cite Galaxy in any research that uses or extends Galaxy.**

So, how can you do that?  It depends on your research:

| If you are | then please |
| ---- | ---- |
| **Referring to the Galaxy Project in general** | Cite the [primary publication](#primary-publication). |
| **Referring to specific [public Galaxy platforms](/use/) or using them in your methods** | Cite [that platform's primary publication](#which-galaxy). |
| **Using a local or temporary cloud instance** | Cite the [primary publication](#primary-publication) and mention that a local or cloud based Galaxy was used.  (Note: We suspect that this is the most under-reported use of Galaxy.) |
| **Referencing a specific aspect of Galaxy** | Cite a [publication about that specific topic](#citing-specific-galaxy-components-features), if one is available. Topics with pubs include: <br />&bull; [Galaxy Application Programming Interface (API)](#application-programming-interface-api) <br />&bull; [Cloud](#cloud) <br />&bull; [Data Managers](#data-managers) <br />&bull; [DataSource Tools](#datasource-tools) <br />&bull; [External Display Applications](#external-display-applications) <br />&bull; [Interactive Environments](#interactive-environments) <br />&bull; [Reproducibility](#reproducibility) <br />&bull; [ToolShed](#toolshed) <br />&bull; [Training & Education](#training-education) |
| **Referencing a Galaxy web resource other than those above** | See [Citing Medicine: NLM Style Guide for Authors, Editors, and Publishers](http://www.ncbi.nlm.nih.gov/books/NBK7256/) for how to cite [web pages](http://www.ncbi.nlm.nih.gov/books/NBK7274/), [wikis](http://www.ncbi.nlm.nih.gov/books/NBK7266/#A61262), and just about everything else. |



# Which Galaxy?

If you *used* Galaxy in your methods, please specify which instances of Galaxy were used: Was it [usegalaxy.org](https://usegalaxy.org/), one of the [other public Galaxy servers, cloud sevices, VMs or containers](/use/) (and see each resource's page for citation info), or a local install?

Some excellent examples (*emphasis added*):

* Used usegalaxy.org: from [Hoyt *et al.*](http://www.g3journal.org/content/7/9/2979):

     "The sequencing data were uploaded to the Galaxy web platform, and *we used the public server at usegalaxy.org to analyze the data ([Afgan et al. 2016](http://www.g3journal.org/content/7/9/2979#ref-1))*."

* Used a [public server](/use/): from [Bhargava, *et al.*](https://www.nature.com/articles/s41598-017-07791-8):

     "RAW files generated directly from the mass spectrometer *were imported into Galaxy-P platform<sup>[53](https://www.nature.com/articles/s41598-017-07791-8#ref-CR53)</sup> for protein identification and quantification<sup>[25](https://www.nature.com/articles/s41598-017-07791-8#ref-CR25), [51](https://www.nature.com/articles/s41598-017-07791-8#ref-CR51)</sup>.*"

     Which publication should you cite when using public accessible Galaxy platform?  Most of the platform descriptions include a *Citation(s)* section.

* Used a non-public server, from [de Carvalho Augusto *et al*](http://journals.plos.org/plosntds/article?id=10.1371/journal.pntd.0005789):

     "All analyses *were done on the Galaxy instance of the IHPE [http://bioinfo.univ-perp.fr](http://bioinfo.univ-perp.fr/)) [[28](http://journals.plos.org/plosntds/article?id=10.1371/journal.pntd.0005789#pntd.0005789.ref028)].*"

# Primary Publication

If you use, extend or reference Galaxy in your published work, please cite this publication:

* The Galaxy Community. [The Galaxy platform for accessible, reproducible, and collaborative data analyses: 2024 update](https://academic.oup.com/nar/advance-article/doi/10.1093/nar/gkae410/7676834), *Nucleic Acids Research*, 2024;, gkae410, https://doi.org/10.1093/nar/gkae410

This and other references are also [available in GitHub](https://github.com/galaxyproject/galaxy/blob/dev/CITATION) as a [CITATION file](http://software-carpentry.org/blog/2013/09/introducing-citation-files.html).

# Citing Specific Galaxy Components / Features

Cite these papers if you want to cite a particular aspect of Galaxy.

## Application Programming Interface (API)

* Clare Sloggett, Nuwan Goonasekera and [Enis Afgan](/people/enis-afgan/). **[BioBlend: automating pipeline analyses within Galaxy and CloudMan](https://academic.oup.com/bioinformatics/article/29/13/1685/185761/BioBlend-automating-pipeline-analyses-within)**. *Bioinformatics* (2013) 29(13): 1685-1686 doi:10.1093/bioinformatics/btt199

## Cloud

* [Enis Afgan](/people/enis-afgan/), Andrew Lonie, [James Taylor](/people/james-taylor/), Nuwan Goonasekera.
**[CloudLaunch: Discover and deploy cloud applications](https://doi.org/10.1016/j.future.2018.04.037)**, *Future Generation Computer Systems*, 2018, doi:10.1016/j.future.2018.04.037

## Data Managers

* [Daniel Blankenberg](/people/dan/), James E. Johnson, The [Galaxy Team](/galaxy-team/), [James Taylor](/people/james-taylor/) and [Anton Nekrutenko](/people/anton/). **[Wrangling Galaxy's Reference Data](https://academic.oup.com/bioinformatics/article/30/13/1917/205199/Wrangling-Galaxy-s-reference-data)**. *Bioinformatics* (2014) 30(13): 1917-1919 doi:10.1093/bioinformatics/btu119

## DataSource Tools

* [Daniel Blankenberg](/people/dan/), [Nate Coraor](/people/nate/), [Gregory Von Kuster](/people/greg-vonkuster/), [James Taylor](/people/james-taylor/), [Anton Nekrutenko](/people/anton/), and The [Galaxy Team](/galaxy-team/). **[Integrating diverse databases into an unified analysis framework: a Galaxy approach](https://academic.oup.com/database/article/doi/10.1093/database/bar011/463445)**. *Database (Oxford)*. 2011 Apr 29;2011:bar011. doi:10.1093/database/bar011.

## External Display Applications

* [Daniel Blankenberg](/people/dan/), [John Chilton](/people/john-chilton/), and [Nate Coraor](/people/nate/). **[Galaxy External Display Applications: Closing a dataflow interoperability loop](https://rdcu.be/b0xnC)**. *Nat Methods* (2020). doi:10.1038/s41592-019-0727-x

## Interactive Environments

* [Björn Grüning](/people/bjoern-gruening/), [Helena Rasche](/people/helena-rasche/), Boris Rebolledo-Jaramillo, [Carl Eberhard](/people/carl-eberhard/), Torsten Houwaart, [John Chilton](/people/john-chilton/), [Nate Coraor](/people/nate/), Rolf Backofen, [James Taylor](/people/james-taylor/), [Anton Nekrutenko](/people/anton/). **[Jupyter and Galaxy: Easing entry barriers into complex data analyses for biomedical researchers](http://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005425)**, *PLOS Computational Biology*, doi:10.1371/journal.pcbi.1005425

## Reproducibility

* [Björn Grüning](/people/bjoern-gruening/), [John Chilton](/people/john-chilton/), Johannes Köster, Ryan Dale, [Nicola Soranzo](https://www.earlham.ac.uk/nicola-soranzo), [Marius van den Beek](https://github.com/mvdbeek), [Jeremy Goecks](/people/jeremy-goecks/), Rolf Backofen, [Anton Nekrutenko](/people/anton/), [James Taylor](/people/james-taylor/).
**[Practical Computational Reproducibility in the Life Sciences](https://doi.org/10.1016/j.cels.2018.03.014)**, *Cell Systems*, Volume 6, Issue 6, 2018, Pages 631-635, ISSN 2405-4712, doi:10.1016/j.cels.2018.03.014.

## ToolShed

* [Daniel Blankenberg](/people/dan/), [Gregory Von Kuster](/people/greg-vonkuster/), [Emil Bouvier](/people/dave-bouvier/), [Dannon Baker](/people/dannon-baker/), [Enis Afgan](/people/enis-afgan/), [Nicholas Stoler](http://nstoler.com/), the [Galaxy Team](/galaxy-team/), [James Taylor](/people/james-taylor/) and [Anton Nekrutenko](/people/anton/). **[Dissemination of scientific software with Galaxy ToolShed](http://genomebiology.biomedcentral.com/articles/10.1186/gb4161)**. *Genome Biology* (2014) 15:403 doi:10.1186/gb4161

## Training & Education

* [Bérénice Batut](http://bebatut.fr/), Saskia Hiltemann, Andrea Bagnacani, [Dannon Baker](/people/dannon-baker/), Vivek Bhardwaj, Clemens Blank, Anthony Bretaudeau, Loraine Brillet-Guéguen, [Martin Čech](/people/marten/), [John Chilton](/people/john-chilton/), [Dave Clements](/people/dave-clements/), Olivia Doppelt-Azeroual, Anika Erxleben, Mallory Ann Freeberg, Simon Gladman, Youri Hoogstrate,  [Hans-Rudolf Hotz](/people/hansrudolf-hotz/), Torsten Houwaart, Pratik Jagtap, [Delphine Lariviere](/people/delphine-lariviere/), Gildas Le Corguillé, Thomas Manke, Fabien Mareuil, Fidel Ramírez, Devon, Ryan, Florian Christoph Sigloch, [Nicola Soranzo](https://www.earlham.ac.uk/nicola-soranzo), Joachim Wolff, Pavankumar Videm, Markus Wolfien, Aisanjiang Wubuli, Dilmurat Yusuf, Galaxy Training Network, [James Taylor](/people/james-taylor/), Rolf Backofen, [Anton Nekrutenko](/people/anton/), [Björn Grüning](/people/bjoern-gruening/). **[Community-Driven Data Analysis Training for Biology](https://doi.org/10.1016/j.cels.2018.05.012)**, *Cell Systems*, Volume 6, Issue 6, 27 June 2018, Pages 752-758.e1

### Online Education

* Serrano-Solano, B., Föll, M. C., Gallardo-Alba, C., Erxleben, A., Rasche, H., Hiltemann, S., Fahrner, M., Dunning, M. J., Schulz, M. H., Scholtz, B., Clements, D., Nekrutenko, A., Batut, B., & Grüning, B. A. (2021). **[Fostering accessible online education using Galaxy as an e-learning platform](https://doi.org/10.1371/journal.pcbi.1008923)**. *PLOS Computational Biology*, 17(5), e1008923. doi: 10.1371/journal.pcbi.1008923

## Galaxy Publication Library

This page highlights only a few Galaxy related publications.  However, *the set of relevant publications is orders of magnitude larger.*  The [Galaxy Group](https://www.zotero.org/groups/galaxy) on [Zotero](https://zotero.org/) lists published articles, conference proceedings, theses, book chapters and books that use, extend, reference or implement Galaxy in any way.  The library contains thousands of publications all classified with ~19 Galaxy specific tags.  See the [Galaxy Publication Library page](/publication-library/) for more.

See the [Citations section](/galaxy-project/statistics/#publications--citations) of the [project statistics page](/galaxy-project/statistics/) for a summary of citations of project papers.
