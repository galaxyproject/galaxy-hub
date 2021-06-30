---
title: Configure Cloud Authorization for GCP
highlight: true
---

To authorize Galaxy to establish a connection to your Google Cloud 
Platform (GCP) account, you would need to create a GCP 
[_service account_](https://cloud.google.com/iam/docs/service-accounts)
and provide Galaxy with its secrets. This page briefly explains 
how to create a service account, obtain its credentials, and present
them to Galaxy.


# Step 1: Create a GCP Service Account

In the following we explain how to create a GCP service account
using GCP `console` graphical interface; you may refer to 
[GCP documentation page](https://cloud.google.com/iam/docs/creating-managing-service-accounts).

In general, first we create a service account, then 
we grant the service account with required permissions, 
and then we download a file that contains all the secrets
to assume the role. To do so, take the following steps:

1. Goto [`Service Accounts Page`](https://console.cloud.google.com/iam-admin/serviceaccounts?_ga=2.118918286.-66625773.1542049771):

    ![image](/src/authnz/cloud/gcp/01.png) 
    
    Click on the `Select a project` button and choose a project 
    that you would like to authorize Galaxy to authorize access its 
    resources. If you do not have a project, 
    [refer to this page](https://cloud.google.com/resource-manager/docs/creating-managing-projects)
    on how to create one.
    
2. Click on the  `+ CREATE SERVICE ACCOUNT` button:

    ![image](/src/authnz/cloud/gcp/02.png)
    
3. Fill in the detail and click on the `CREATE` button:

    ![image](/src/authnz/cloud/gcp/03.png)

4. Grant the service account with minimum required permissions, then click
    on the `CONTINUE` button:

    ![image](/src/authnz/cloud/gcp/04.png)

    To define a more granular roles (with least possible privileges), you may
    first [refer to this page](https://cloud.google.com/iam/docs/granting-roles-to-service-accounts)
    for details on granting roles to service accounts, and then
    [refer to this list](https://cloud.google.com/iam/docs/understanding-roles) 
    of roles for choosing a role that satisfies you authorization needs at best.
    
5. Click on the `+ CREATE KEY` button, and then choose `JSON` (the default option)
    from the newly shown window, then click on the `CREATE` button.
    
    ![image](/src/authnz/cloud/gcp/05.png)
    
6. A file containing the secrets for the service account will be then downloaded
    to your computer:
    
    ![image](/src/authnz/cloud/gcp/06.png)
    
7. Click on the `CLOSE` and then `DONE` buttons. 


# Step 2: Provide Galaxy with the Service Account Secrets

We use Galaxy's cloud authorization API to define authorization to GCP. 
In general, first we obtain an API key, then `POST` required info to the 
cloud authorization API. For this, take the following steps:

1. Login to Galaxy ([different methods are available](https://galaxyproject.org/authnz/), including 
[login with Google](https://galaxyproject.org/authnz/use/oidc/idps/google/) account),
then go to the `Preferences` section:

    ![image](/src/authnz/cloud/gcp/07.png)
    
2. In the `User preferences` window, click on the `Manage API key` item, 
then click on the `Create a new key` button, and copy the generated API key:

    ![image](/src/authnz/cloud/gcp/08.png)

3. Send a `POST` request to cloud authorization API at: 

    ```
    api/cloud/authz
    ```
    
    with the following payload:
    
    ```json
    {
      "provider": "gcp",
      "authn_id":"f2db41e1fa331b3e",
      "config": {
        "project_id": "...",
        "private_key_id": "...",
        "private_key": "...",
        "client_email": "...",
        "client_id": "..."
      }
    }
    ```
    
    You may send a `GET` request to `/authnz` controller to obtain the `authn_id`. 
    You may obtain the values for the keys in the `config` section, from the service
    account's secretes file downloaded from GCP at first step.
    
    Galaxy will respond to the `POST` method as the following:
    
    ```json
    {
        "authn_id": "f2db41e1fa331b3e",
        "user_id": "f2db41e1fa331b3e",
        "description": "",
        "last_update": "2019-07-15 21:59:26.171779",
        "last_activity": "2019-07-15 21:59:26.171791",
        "create_time": "2019-07-16 04:59:26.173277",
        "provider": "gcp",
        "model_class": "CloudAuthz",
        "config": {
            "private_key": "...",
            "project_id": "...",
            "client_email": "...",
            "private_key_id": "...",
            "client_id": "..."
        },
        "id": "f2db41e1fa331b3e"
    }
    ```
    
    Take a note of the authorization ID (i.e., `"id": "f2db41e1fa331b3e"`), which you would need 
    to provide in order to interact with GCP. Having defined the cloud authorization, you may 
    [send your data from Galaxy to Google Cloud Storage (GCS)](/src/cloud/storage/#send-data-to-cloud), 
    or [copy your data from GCS to your Galaxy history](/src/cloud/storage/#get-data-from-cloud).
