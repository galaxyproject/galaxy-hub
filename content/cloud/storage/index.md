---
title: Cloud Storage API
highlight: true
---

Galaxy allows a user to `get` /`send` data from/to a cloud-based storage, a functionality that is exposed via 
two APIs:
- `/api/cloud/storage/get` [[ref](https://docs.galaxyproject.org/en/latest/lib/galaxy.webapps.galaxy.api.html?highlight=cloud#galaxy.webapps.galaxy.api.cloud.CloudController.get)];
- `/api/cloud/storage/send`[[ref](https://docs.galaxyproject.org/en/latest/lib/galaxy.webapps.galaxy.api.html?highlight=cloud#galaxy.webapps.galaxy.api.cloud.CloudController.send)].

(A graphical user interface for these two APIs is under development.)


Note that for (data and credentials) security reasons, the `get` and `send` APIs do **NOT** ask for user credentials;
instead, they use auto-generated/refreshed credentials ([read details](/src/authnz/cloud/index.md)).


Generally, to use the `get` and `send` APIs one should take the following steps:

* **Initialization**

    1. Login to Galaxy using your Google account (read 
    [how to login to Galaxy using social identities](/src/authnz/config/oidc/index.md));

    2. Securely authorize Galaxy to read/write to your cloud-based storage ([read how](/src/authnz/cloud/index.md)).
    
* **Securely access cloud-based storage**

    1. [`Get` data from cloud](#get-data-from-cloud);
    
    2. [`Send` data to cloud](#send-data-to-cloud).
    

In the following we explain how to use the `get` and `send` APIs. Users may use their preferred method for 
communication with Galaxy APIs; however, for demonstration reason only we use [Postman](https://www.getpostman.com).


## `Get` Data from Cloud 

The `get` API allows a user to copy data from a cloud-based storage (e.g., Amazon S3, and Microsoft Azure BLOB)
to a specified Galaxy `history`. 


In general, to use this API, `POST` a payload with following fields to `/api/cloud/storage/get`.


| key          | required | description |
|--------------|----------|-------------|
| `history_id` | ✔        | The ID of a `history` to which data should be copied from cloud. |
| `authz_id`   | ✔        | The ID of a cloud authorization record to be used to _read_ data from cloud. (see [this page](/src/authnz/cloud/index.md))|
| `bucket`     | ✔        | The name of a bucket from which data should be read. |
| `objects`    | ✔        | A list of objects from the `bucket` that should be copied to Galaxy. |


A sample payload:

```json
{
    "history_id": "...",
    "authz_id": "...",
    "bucket": "...",
    "objects": [
        "obj1",
        "obj2",
        ...
    ]
}
```

[Read this page](/src/cloud/storage/get_step_by_step/index.md) for step-by-step description on how to use this API.
    

## `Send` Data to Cloud

The `send` API allows a user to copy data from a Galaxy `history` to a cloud-based storage (e.g., Amazon S3, and 
Microsoft Azure BLOB).

In general, to use this API, `POST` a payload with the following fields `/api/cloud/storage/send`.


| key                  | required | description |
|----------------------|----------|-------------|
| `history_id`         | ✔        | The ID of a `history` from which data should be copied to cloud.|
| `authz_id`           | ✔        | The ID of a cloud authorization record to be used to _write_ data to cloud. (see [this page](/src/authnz/cloud/index.md))            |
| `bucket`             | ✔        | The name of a bucket to which data should be written.|
| `dataset_ids`        |          | A list of encoded dataset IDs belonging to the specified history that should be sent to the given bucket. If not provided, Galaxy sends all the datasets belonging the specified history.|
| `overwrite_existing` |          | A boolean value. If set to "True", and an object with same name of the dataset to be sent already exist in the bucket, Galaxy replaces the existing object with the dataset to be sent. If set to "False", Galaxy appends datetime to the dataset name to prevent overwriting an existing object.            |

A sample payload:

```json
{
    "history_id": "...",
    "authz_id": "...",
    "bucket": "..."
}
```    
Or:

```json
{
    "history_id": "03501d7626bd192f",
    "authz_id": "f2db41e1fa331b3e",
    "bucket": "vahid-objectstore-tests",
    "dataset_ids": [
        "0a248a1f62a0cc04",
        "03501d7626bd192f"
    ],
    "overwrite_existing": true
}
```

[Read this page](/src/cloud/storage/send_step_by_step/index.md) for step-by-step description on how to use this API.

