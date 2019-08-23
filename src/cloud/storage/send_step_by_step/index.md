---
title: Send Data to Cloud
highlight: true
---

The `send` API allows a user to copy data from a Galaxy `history` to a cloud-based storage (e.g., Amazon S3, and 
Microsoft Azure BLOB).

You may use the following steps to use this API:

1. Login to Galaxy using your Google account ([read how](/src/authnz/config/oidc/index.md));
2. Define a _cloud authzorization_ configuration ([read how](/src/authnz/cloud/index.md));
3. Get a Galaxy API key by going to `User -> Manage API key` On Galaxy's webpage and clicking on the 
`Create a new key` button;
4. Make the API call as it follows:

    4.1. Open [Postman](https://www.getpostman.com);
    
    4.2. Choose `POST` and enter the following in the fields highlighted in the following figure:
    
    ```
    http://localhost:8080/api/cloud/storage/send?key=1234567890
    ```
        
    Replace `http://localhost:8080` with the IP address of the Galaxy instance you're using, and
    replace `1234567890` with the your API key.
        
    ![image](/src/cloud/storage/send_01.png)
    
    4.3. Get the ID of Galaxy `history` from which you want to copy data, by going to the following
    address on your browser:
    
    ```
    http://localhost:8080/api/histories
    ```
        
    This will display a JSON object similar to the following, note the value of `id` field:
    
    ```json
    [
       {
          "name":"Unnamed history",
          "tags":[
          ],
          "deleted": false,
          "purged": false,
          "annotation": null,
          "url": "/api/histories/df7a1f0c02a5b08e",
          "published": false,
          "model_class": "History",
          "id": "df7a1f0c02a5b08e"
       }
    ]
    ```
        
    4.4. Get the ID of authorization defined in step #2, which you want to use to write to the 
    cloud-based storage, by going to following address: 
    
    ```
    http://localhost:8080/api/cloud/authz
    ```
        
    This will display a JSON object similar to the following, note the value of `id` field:
    
    ```json
    [
       {
          "authn_id": "f2db41e1fa331b3e",
          "user_id": "f2db41e1fa331b3e",
          "last_update": "2018-12-07 17:53:55.714802",
          "last_activity": "2018-12-07 17:53:55.714818",
          "provider": "aws",
          "model_class": "CloudAuthz",
          "config": "{u'role_arn': u'arn:aws:iam:: ...'}",
          "id": "f2db41e1fa331b3e"
       }
    ]
    ```
        
    4.5. On Postman, goto `Body` tab as shown in the following figure and enter the 
    following API payload:
    
    ![image](/src/cloud/storage/send_02.png)
    
    ```json
    {
        "history_id": "03501d7626bd192f",
        "authz_id": "f2db41e1fa331b3e",
        "bucket": "vahid-objectstore"
    }
    ```
    
    Replace `vahid-objectstore` with a bucket name to which you want to `send` data.
    
    4.6. Click on the `Send` button; Postman will submit a request to Galaxy to `send` data
    and will shows a result as the following. 
    
    ```json
    {
        "sent_dataset_labels": [
            "{\"object\": \"rep1.bed\", \"job_id\": \"3f5830403180d620\"}",
            "{\"object\": \"rep2.bed\", \"job_id\": \"e85a3be143d5905b\"}"
        ],
        "bucket_name": "vahid-objectstore",
        "failed_dataset_labels": []
    }
    ```
    
    This JSON object shows two Galaxy datasets,`rep1.bed` and `rep2.bed`, are queued for
    being sent to the `vahid-objectstore` bucket. 
