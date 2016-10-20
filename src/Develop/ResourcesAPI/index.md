### API Resources

* [The bioblend documentation](http://bioblend.readthedocs.org/en/latest/) is the most updated and best documented source of information on consuming the Galaxy API. [bioblend](https://github.com/galaxyproject/bioblend) is a Python library for interacting with Galaxy and CloudMan.
* [API source code documentation](https://docs.galaxyproject.org/en/master/api_doc.html) - Documentation auto-generated for the API source code. The API source code itself can be found [here](https://github.com/galaxyproject/galaxy/tree/dev/lib/galaxy/webapps/galaxy/api) and is by its nature the most up-to-date and complete source of information.
* [Galaxy API](/src/Learn/API/index.md) - Galaxy offers programming interface that can be used to automate usage of Galaxy. (Warning: information is incomplete and somewhat dated.)
* [API description](/src/Admin/API/index.md) - Galaxy offers API that can be used to automate admin usage of Galaxy. (Warning: information is incomplete and somewhat dated.)
* [JavaDocs](http://jmchilton.github.io/blend4j/apidocs/) for [blend4j](https://github.com/jmchilton/blend4j) - a Java library for consuming the Galaxy API.
* Example open source projects leveraging the Galaxy API.
  * [Refinery](https://github.com/parklab/refinery-platform) (builds and runs workflows using [bioblend](http://bioblend.readthedocs.org/en/latest/))
  * The [Galaxy IPython Docker Runtime](https://github.com/bgruening/docker-ipython-notebook) (leverages [bioblend](http://bioblend.readthedocs.org/en/latest/) to interface with Galaxy's history). 
  * [Mologenesis](https://github.com/molgenis/molgenis) (supports [exporting](https://github.com/molgenis/molgenis/commit/57d229a8d36fa9dae1155685e85187399863057f) to Galaxy via [blend4j](https://github.com/jmchilton/blend4j))
  * [trait_workflow_runner](https://github.com/CTMM-TraIT/trait_workflow_runner) (used to run Galaxy workflows from [transMART](https://github.com/transmart) via [blend4j](https://github.com/jmchilton/blend4j)).
  * [clj-blend](https://github.com/chapmanb/clj-blend) (a Clojure library built on [blend4j](https://github.com/jmchilton/blend4j)).
* Papers
  * [BioBlend: automating pipeline analyses within Galaxy and CloudMan.](http://www.ncbi.nlm.nih.gov/pubmed/23630176) Sloggett, et. al.
  * [BioBlend.objects: metacomputing with Galaxy.](http://www.ncbi.nlm.nih.gov/pubmed/24928211) Leo, et. al.

