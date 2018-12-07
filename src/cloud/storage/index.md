# Cloud Storage API

Galaxy allows a user to `get` /`send` data from/to a cloud-based storage, a functionality that is exposed via 
two APIs:
- `/api/cloud/storage/get` [[ref](https://docs.galaxyproject.org/en/latest/lib/galaxy.webapps.galaxy.api.html?highlight=cloud#galaxy.webapps.galaxy.api.cloud.CloudController.get)];
- `/api/cloud/storage/send`[[ref](https://docs.galaxyproject.org/en/latest/lib/galaxy.webapps.galaxy.api.html?highlight=cloud#galaxy.webapps.galaxy.api.cloud.CloudController.send)].

(A graphical user interface for these two APIs is under development.)


Note that for (data and credentials) security reasons, the `get` and `send` APIs do **NOT** ask for user credentials;
instead, they use auto-generated/refreshed credentials ([read details](/src/cloud/authnz/index.md)).


Generally, to use the `get` and `send` APIs one should take the following steps:

* **Initialization**

    1. Login to Galaxy using your Google account (read 
    [how to login to Galaxy using social identities](/src/admin/authentication/index.md));

    2. Securely authorize Galaxy to read/write to your cloud-based storage ([read how](/src/cloud/authnz/index.md)).
    
* **Securely access cloud-based storage**

    1. [`Get` data from cloud](#get-data-from-cloud);
    
    2. [`Send` data to cloud](#send-data-to-cloud).
    

In the following we explain how to use the `get` and `send` APIs. Users may use their preferred method for 
communication with Galaxy APIs; however, for demonstration reason only we use [Postman](https://www.getpostman.com).


## `Get` Data from Cloud 

The `get` API allows a user to copy data from a cloud-based storage (e.g., Amazon S3, and Microsoft Azure BLOB)
to a specified Galaxy `history`. 

In general, to use this API, `POST` the following payload to `/api/cloud/storage/get`:

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

[Read this page](/src/cloud/storage/get_step_by_step.md) for step-by-step description on how to use this API.
    

## `Send` Data to Cloud

The `send` API allows a user to copy data from a Galaxy `history` to a cloud-based storage (e.g., Amazon S3, and 
Microsoft Azure BLOB).

In general, to use this API, `POST` the following payload to `/api/cloud/storage/send`:

    {
        "history_id": "...",
        "authz_id": "...",
        "bucket": "..."
    }

Using this payload, Galaxy will `send` **all** the datasets in the given `history` to the cloud-based storage 
as defined by `authz_id`. Optionally one can define a list of datasets in the `history` using `dataset_ids` 
key. 

Galaxy will then return a JSON object similar to the following that informs two datasets (i.e., `rep1.bed` and 
`rep2.bed`) are successfully queued to be sent to the cloud-based storage.


    {
        "sent_dataset_labels": [
            "{\"object\": \"rep1.bed\", \"job_id\": \"3f5830403180d620\"}",
            "{\"object\": \"rep2.bed\", \"job_id\": \"e85a3be143d5905b\"}"
        ],
        "bucket_name": "...",
        "failed_dataset_labels": []
    }

[Read this page](/src/cloud/storage/send_step_by_step.md) for step-by-step description on how to use this API.

