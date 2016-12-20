---
autotoc: true
---
{{> Admin/LinkBox }}

Galaxy has an [Applications Programming Interface (API)](/src/Learn/API/index.md) that enables access to Galaxy from scripts.  This page describes the [administrative](/src/Admin/index.md) aspects of the API.  See [Learn/API](/src/Learn/API/index.md) for information on using the [Galaxy API](/src/Learn/API/index.md).



# Scripts

Explanation of where the scripts are, what they do, and where they go.

## display.py

## library_create_library.py

## library_create_folder.py

## library_upload_from_import_dir.py 

# Configuration

## universe_wsgi.ini

Set these options in `universe_wsgi.ini` and (re)start the server:
```python
admin_users = you@example.org
library_import_dir = /path/to/some/directory
```

In the directory you specified for `library_import_dir`, **create some subdirectories, and put (or symlink) files to import into Galaxy into those subdirectories.**

&rarr; Need more explanation of above **bold** statement.  Are these the scripts from [scripts/api/](https://github.com/galaxyproject/galaxy/tree/master/scripts/api/)?  What are the subdirectories to create?

## Generate the Admin Account API Key

In Galaxy, create an account that matches the address you put in `admin_users`, then browse to that user's preferences and generate a new API Key.  

<table>
  <tr>
    <td> <em>Navigate</em> to <strong>User &rarr; API Keys</strong>: </td>
    <td> <img src="/src/Admin/API/UserPullDownAPIKeys.png" /> </td>
  </tr>
  <tr>
    <td> <em>Click</em> on <strong>Generate a new key now</strong>: </td>
    <td> <img src="/src/Admin/API/GenerateNewAPIKey.png" /> </td>
  </tr>
  <tr>
    <td> And your new API key will be set:<br /><br /><em>Copy</em> the key to your clipboard.  You will need it in the next steps. </td>
    <td> <img src="/src/Admin/API/NewKeyGenerated.png" /> </td>
  </tr>
</table>


**Please pay attention to the note:**
<div class='red border'>
 Please note that **this key acts as an alternate means to access your account, and should be treated with the same care as your login password.** 
</div>

**If the key to your admin account is leaked, whoever has that key has admin access to your Galaxy instance.**

## Run Setup Scripts

Run these scripts:
```
% ./display.py my_key http://localhost:4096/api/libraries
Collection Members
------------------

0 elements in collection

% ./library_create_library.py my_key http://localhost:4096/api/libraries api_test 'API Test Library'
Response
--------
/api/libraries/f3f73e481f432006
  name: api_test
  id: f3f73e481f432006

% ./display.py my_key http://localhost:4096/api/libraries
Collection Members
------------------
/api/libraries/f3f73e481f432006
  name: api_test
  id: f3f73e481f432006

% ./display.py my_key http://localhost:4096/api/libraries/f3f73e481f432006
Member Information
------------------
synopsis: None
contents_url: /api/libraries/f3f73e481f432006/contents
description: API Test Library
name: api_test

% ./display.py my_key http://localhost:4096/api/libraries/f3f73e481f432006/contents 
Collection Members
------------------
/api/libraries/f3f73e481f432006/contents/28202595c0d2591f61ddda595d2c3670
  name: /
  type: folder
  id: 28202595c0d2591f61ddda595d2c3670

% ./library_create_folder.py my_key http://localhost:4096/api/libraries/f3f73e481f432006/contents 28202595c0d2591f61ddda595d2c3670 api_test_folder1 'API Test Folder 1'
Response
--------
/api/libraries/f3f73e481f432006/contents/28202595c0d2591fa4f9089d2303fd89
  name: api_test_folder1
  id: 28202595c0d2591fa4f9089d2303fd89

% ./library_upload_from_import_dir.py my_key http://localhost:4096/api/libraries/f3f73e481f432006/contents 28202595c0d2591fa4f9089d2303fd89 bed bed hg19
Response
--------
/api/libraries/f3f73e481f432006/contents/e9ef7fdb2db87d7b
  name: 2.bed
  id: e9ef7fdb2db87d7b
/api/libraries/f3f73e481f432006/contents/3b7f6a31f80a5018
  name: 3.bed
  id: 3b7f6a31f80a5018

% ./display.py my_key http://localhost:4096/api/libraries/f3f73e481f432006/contents 
Collection Members
------------------
/api/libraries/f3f73e481f432006/contents/28202595c0d2591f61ddda595d2c3670
  name: / 
  type: folder
  id: 28202595c0d2591f61ddda595d2c3670
/api/libraries/f3f73e481f432006/contents/28202595c0d2591fa4f9089d2303fd89
  name: /api_test_folder1
  type: folder
  id: 28202595c0d2591fa4f9089d2303fd89
/api/libraries/f3f73e481f432006/contents/e9ef7fdb2db87d7b
  name: /api_test_folder1/2.bed
  type: file
  id: e9ef7fdb2db87d7b
/api/libraries/f3f73e481f432006/contents/3b7f6a31f80a5018
  name: /api_test_folder1/3.bed
  type: file
  id: 3b7f6a31f80a5018

% ./display.py my_key http://localhost:4096/api/libraries/f3f73e481f432006/contents/e9ef7fdb2db87d7b
Member Information
------------------
misc_blurb: 68 regions
metadata_endCol: 3
data_type: bed
metadata_columns: 6
metadata_nameCol: 4
uploaded_by: nate@...
metadata_strandCol: 6
name: 2.bed
genome_build: hg19
metadata_comment_lines: None
metadata_startCol: 2
metadata_chromCol: 1
file_size: 4272
metadata_data_lines: 68
message:
metadata_dbkey: hg19
misc_info: uploaded bed file
date_uploaded: 2010-06-22T17:01:51.266119
metadata_column_types: str, int, int, str, int, str
```

Other parameters are valid when uploading, they are the same parameters as are
used in the web form, like 'link_data_only' and etc.

The request and response format should be considered alpha and are subject to change.

## Example Configurations

* [api/sample_configurations/sample_tracking/request_form.xml](https://github.com/galaxyproject/galaxy/tree/master/scripts/api/sample_configurations/sample_tracking/request_form.xml)
* [api/sample_configurations/sample_tracking/request_type.xml](https://github.com/galaxyproject/galaxy/tree/master/scripts/api/sample_configurations/sample_tracking/request_type.xml)
* [api/sample_configurations/sample_tracking/sample_form.xml](https://github.com/galaxyproject/galaxy/tree/master/scripts/api/sample_configurations/sample_tracking/sample_form.xml)

Explain the format, how these are created.
