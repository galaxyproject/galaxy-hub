---
autotoc: true
---
<div class='right'>

</div>

## See Also

If you add a new data source to Galaxy in your published work, please cite:

 [Blankenberg D, Coraor N, Von Kuster G, Taylor J, Nekrutenko A; Galaxy Team. Integrating diverse databases into an unified analysis framework: a Galaxy approach. Database (Oxford). 2011 Apr 29;2011:bar011. Print 2011.](http://www.ncbi.nlm.nih.gov/pubmed/21531983)

Small example of both communication protocols:

[CherryPy server communication with a Galaxy server; T. Houwaart](https://gist.github.com/TorHou/b4ee6890442c5c3d479d)

## Adding a new DataSource

!DataSources are configured as a special type of [tool](/src/Tools/index.md).

Checklist for !DataSource tools:

1. The [<tool> tag set](/src/Admin/Tools/ToolConfigSyntax/index.md#a3ctool3e_tag_set) has the attribute "tool_type" with the value "data_source"
1. The [<command> tag set](/src/Admin/Tools/ToolConfigSyntax/index.md#a3ccommand3e_tag_set), inside the <tool> tag set, contains either "data_source.py" to use the built in sychronous/asynchronous single file downloader or a different command for custom downloading (multiple files, ...?). 
  1. If using "data_source.py" then the first parameter passed should be the name of the data tag in the outputs tag set. Likely it is "$output".
  1. If using "data_source.py" then the second parameter passed is the maximum file size allowed by this Galaxy instance to quickly cancel a download that will fail later. This should be "$</u>app__.config.output_size_limit".
1. The [<inputs>](/src/Admin/Tools/ToolConfigSyntax/index.md#a3cinputs3e_tag_set) tag set, inside the <tool> tag set, has three attributes defined: "action", "check_values", "method".
  1. The "action" attribute has the URL to redirect the Galaxy user to.
  1. The "method" attribute ...???
  1. The "check_values" attribute ...???
1. If you want to translate between URL parameters sent by the remote web server back to Galaxy then a [<request_param_translation> tag set](/src/Admin/Tools/ToolConfigSyntax/index.md#a3crequest_param_translation3e_tag_set) should be defined inside the <tool> tag set.
1. The [<outputs> tag set](/src/Admin/Tools/ToolConfigSyntax/index.md#a3coutputs3e_tag_set), inside the <tool> tag set, contains only one <data> tag if using the built-in "data_source.py" script.
  1. The "format" attribute can be used to set the data format if it is of a fixed type.
  1. If using the built-in "data_source.py" script then the value of the "name" attribute must match the first parameter passed to "data_source.py" in the <command> tag set.
1. Finally, the tag <options sanitize="False" refresh="True"/> should be inside the <tool> tag set.

<uihints> and <display> are no longer used.

Some example !DataSources:
* https://github.com/galaxyproject/galaxy/blob/dev/tools/data_source/ucsc_tablebrowser.xml
* https://github.com/erasche/galaxy-data_source-examples

A custom downloader can be used for advanced interaction. Example: The GenomeSpace data_tools use a custom script to handle lots more than just multiple files: handles the GenomeSpace username+token transactions, and also attempts to make use of GenomeSpace's metadata, etc; all by interacting via the GenomeSpace API.

## Data Connection Protocols

This specification describes the requirements needed to deposit data in a Galaxy user account from an independent web site. The protocol described here operates via HTTP calls. (*Galaxy will also support the same functionality with  remote procedural calls via XML-RPC. This feature is currently being developed.*)

As data sources go we distinguish between **two** different data generation modes:

* The first approach characterizes services that stream data. These are sites that can generate data on "the fly" in response to a set of parameters. We'll call this approach the **synchronous** data generation.
* The second methodology includes sites that first collect parameters then run a background process to generate results. Once finished the systems send a notification that the data is ready for download. We'll call this method **asynchronous** data generation.

### Synchronous data depositing

The process is meant to proceed as follows:

1. Upon choosing the datasource  Galaxy performs a HTTP POST request to the external datasource's url (specified in the tool configuration file) and passes the parameter `GALAXY_URL` in this request. The value of this parameter contains the url where Galaxy will expect the response to be sent at some later time. The external site's responsibility is to keep track of this URL as long as the user navigates the external site.
1. As the user navigates the external datasource, it behaves exactly as if it would if the request would have not originated from Galaxy
1. At the point where the parameter submission would return data, the external datasource will have to instead post these parameters to the url that were sent in the `GALAXY_URL` parameter. Typically this would require that the *action* attribute of the form that generates data to be pointed to the value sent in the `GALAXY_URL` parameter.
1. When Galaxy receives the parameters it will run a URL fetching process in the background that will **resubmit** the parameters to the datasource, and it will deposit the returned data in the user's account.

### Asynchronous data depositing

This process operates similarly to the synchronous one, the exception being that the datasource will have to later notify Galaxy with the location of the data. 

1. The same as steps 1. through 4. for the synchronous data depositing. For the step 4 above, Galaxy will create another parameter `GALAXY_URL` that will uniquely characterize the data that is returned. The result of the resubmission step of this step is a data entry that is *waiting* for the data source.
1. When the data created by the datasource is ready the datasource will have to reconnect to the url specified in `GALAXY_URL` and submit via HTTP GET the `STATUS` and `URL` parameters. Galaxy will then make a background request to fetch the data stored at the location `URL`.

**Inter-process communication** is performed via a very simple text outputs. Commands that have been executed correctly may write any kind of text messages. If the text ends with the word `OK` it will be considered a successful submission. Messages that do not end with `OK` will be treated as errors. There is no requirement on interpreting any of the messages; they primarily serve for informational/debugging purposes. 

**Example** Upon returning to the datasource (step 4) Galaxy submits the following:

 ```
http://www.data.org/search?value=1&limit=10&gene=HBB1&GALAXY_URL=http://test.g2.bx.psu.edu/async/search/a4mr3ks4j1
```


The datasource may then write the following as response:

 ```
received parameters:
value=1
limit=10
gene=HBB1
GALAXY_URL=http://test.g2.bx.psu.edu/async/search/a4mr3ks4j1
running query in the background
closing connection
OK
```


Then, upon a finished data generation this same datasource would make the following request:

 ```
http://test.g2.bx.psu.edu/async/search/a4mr3ks4j1?STATUS=OK&URL=http://www.data.org/temp/1299292.dat
```


to which Galaxy could answer:

 ```
Data will be retrieved
OK
```


in which case it will also go and fetch the data from `http://www.data.org/temp/1299292.dat`. 
But the output could also be:

 ```
This data has already been deleted.
```


Providing an error message for unsuccessful submissions.

**Notes:** Both parameters `STATUS` and `URL` must be present. If `STATUS` is different than `OK` then the data will be treated as failed. In case of errors you may include more detailed values for both `STATUS` and  `URL` since these values will be copied into the metadata and will be displayed as the reason for the failure.
