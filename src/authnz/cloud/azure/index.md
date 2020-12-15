---
title: Configure Cloud Authorization for Azure
highlight: true
---

On this page we explain how to setup a *service principal* on Azure, and how to configure Galaxy to assume 
that *service principal*. 

## Step 1: Create an Azure Service Principal

1. Goto [portal.azure.com](https://portal.azure.com) and login with your Azure credentials. 
2. Select **Azure Active Directory > App registrations**, then click **New registration** 
(as shown on the following figure).

  ![image](/src/authnz/cloud/azure/01.png)

3. Enter a name for the application, and click on the **Register** button (see the following figure).  

  ![image](/src/authnz/cloud/azure/02.png)

4. On the application **Overview** window, take note of **Application (client) ID** and **Directory (tenant) ID**
(see the following figure).

  ![image](/src/authnz/cloud/azure/03.png)

5. Select **Certificates & secrets**, then click on the **New client secret*** button, and take note of the value
(see the following figure).

  ![image](/src/authnz/cloud/azure/04.png)
  
## Step 2: Setup Galaxy to Use an Azure Service Principal

To setup Galaxy to use a service principal, you need to `POST` a payload as the following to 
`/api/cloud/authz` API of Galaxy: 

```
{
  "provider": "azure",
  "authn_id":"...",
  "config": {
  	"tenant_id": "...",
  	"client_id": "...",
  	"client_secret": "..."
  }
}
```

You may send the API request using `curl` as the following: 

```shell
 curl --header "Content-Type: application/json" \
 --request POST \
 --data '{"provider": "azure", "config": {"tenant_id": "...","client_id": "...","client_secret": "..."}}' \
 https://usegalaxy.org/api/cloud/authz?key=...
```

This API call with respond with the created Azure authnz record as the following: 

```json
{
    "model_class": "CloudAuthz",
    "config": {
    "client_id": "...",
    "client_secret": "...",
    "tenant_id": "..."
    },
    "user_id": "...",
    "last_activity": "2020-12-15 15:37:56.123303",
    "create_time": "2020-12-15 21:37:56.125248",
    "description": "",
    "last_update": "2020-12-15 15:37:56.123284",
    "id": "...",
    "provider": "azure",
    "authn_id": null
}
```
