<div class='newsItemHeader'>[BioBlend v0.5.3 Released](/News/BioBlendV0.5.3)</div>

<div class='right'><a href='/CloudMan.md'><img src='/Images/Logos/CloudManWideBlackLogo.png' alt='CloudMan' width="200" /></a></div>

[BioBlend](https://github.com/afgane/bioblend) [v0.5.3](https://github.com/galaxyproject/bioblend/blob/master/CHANGELOG) has been released.  [BioBlend](https://github.com/galaxyproject/bioblend/blob) is a python library for interacting with CloudMan and the [Galaxy API](/Learn/API).  (CloudMan offers an easy way to get a personal and completely functional instance of Galaxy in the cloud in just a few minutes, without any manual configuration.)

This is mostly an incremental bug fix release with the following summary of changes:

* Project source moved to new URL - https://github.com/galaxyproject/bioblend 
* Huge improvements to automated testing, tests now run against Galaxy release_14.02 and all later versions to ensure backward compatibility (see [travis.yml](https://github.com/galaxyproject/bioblend/blob/master/.travis.yml) for details).
* Many documentation improvements (thanks to [Eric Rasche](/EricRasche)).
* Add Galaxy clients for the tool data tables, the roles, and library folders (thanks to Anthony Bretaudeau).
* Add method to get the standard error and standard output for the job corresponding to a Galaxy dataset (thanks to Anthony Bretaudeau).
* Add `get_state()` method to `JobsClient`.
* Add `copy_from_dataset()` method to `LibraryClient`.
* Add `create_repository()` method to `ToolShedClient` (thanks to [Eric Rasche)](/EricRasche).
* Fix `DatasetClient.download_dataset()` for certain proxied Galaxy deployments.
* Make `LibraryClient._get_root_folder_id()` method safer and faster for Galaxy release_13.06 and later.
* Deprecate and ignore invalid deleted parameter to `WorkflowClient.get_workflows()`.
* CloudMan: Add method to fetch instance types.
* CloudMan: Update cluster options to reflect change to SLURM.
* [BioBlend.objects](http://bioinformatics.oxfordjournals.org/content/30/19/2816.abstract): Deprecate and ignore invalid deleted parameter to `ObjWorkflowClient.list()`.
* !BioBlend.objects: Add `paste_content()` method to `History` objects.
* !BioBlend.objects: Add `copy_from_dataset()` method and `root_folder` property to `Library` objects.
* !BioBlend.objects: Add `container` and `deleted` attributes to `Folder` objects.
* !BioBlend.objects: Set the `parent` attribute of a `Folder` object to its parent folder object (thanks to John M. Eppley).
* !BioBlend.objects: Add `deleted` parameter to `list()` method of libraries and histories.
* !BioBlend.objects: Add `state` and `state_details` attributes to `History` objects (thanks to Gianmauro Cuccuru).
* !BioBlend.objects: Rename `upload_dataset()` method to `upload_file()` for History objects.
* !BioBlend.objects: Rename `input_ids and output_ids` attributes of `Workflow objects` to `source_ids` and `sink_ids` respectively.
* Add `run_bioblend_tests.sh` script (useful for Continuous Integration testing).

Enjoy and please let us know what you think,

[Enis](/EnisAfgan) & [John](/JohnChilton) & [Nicola Soranzo](/NicolaSoranzo) & Simone Leo & [Eric Rasche](/EricRasche)

<div class='newsItemFooter'>Posted to the [Galaxy News](/News) on <<Date(2015-03-19T17:32:40Z)>></div>

CategoryNews
