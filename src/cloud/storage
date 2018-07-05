# Cloud Storage API

Galaxy allows you to upload and download data to and from cloud. 

This functionality is exposed via two APIs:
- `/api/cloud/download` (see [PR#5835](https://github.com/galaxyproject/galaxy/pull/5835));
- `/api/cloud/upload` (see [PR#6078](https://github.com/galaxyproject/galaxy/pull/6078))



## Download Data from Cloud 

Galaxy can download data from cloud-based storage providers (e.g., Amazon S3, and Microsoft Azure BLOB)
to a specified `history` belonging to the logged-in user. The API payload for each of the providers should
contain the following information: 

- Amazon S3:
```javascript
{
    "history_id": AN_ENCODE_HISTORY_ID,
    "provider": "aws",
    "bucket": AWS_BUCKET_NAME,
    "object": AWS_OBJECT_NAME,
    "credentials": {
        "access_key": AWS_ACCESS_TOKEN,
        "secret_key": AWS_SECRET_TOKEN
}}
```

- Microsoft Azure BLOB:
```javascript
{
    "history_id": AN_ENCODE_HISTORY_ID,
    "provider": "azure",
    "bucket": AZURE_BUCKET_NAME,
    "object": AZURE_OBJECT_NAME,
    "credentials": {
        "subscription_id": SUBSCRIPTION_ID,
        "client_id": CLIENT_ID,
        "secret": SECRET,
        "tenant": TENANT 
}}
```

- OpenStack Object Storage (Swift)
```javascript
{
    "history_id": AN_ENCODE_HISTORY_ID,
    "provider": "openstack",
    "bucket": OPENSTACK_BUCKET_NAME,
    "object": OPENSTACK_OBJECT_NAME,
    "credentials": {
        "username": USERNAME,
        "password": PASSWORD,
        "auth_url": AUTH_URL,
        "project_name": PROJECT_NAME,
        "project_domain_name": PROJECT_DOMAIN_NAME,
        "user_domain_name": USER_DOMAIN_NAME
}}
```
