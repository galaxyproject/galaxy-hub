---
title: Configure Cloud Authorization for Azure
highlight: true
---

On this page we explain how to setup a *service principal* on Azure, and how to configure Galaxy to assume 
that *service principal*. 

## Step 1: Create an Azure Service Principal

1. Goto [portal.azure.com](https://portal.azure.com) and login with your Azure credentials. 
2. Select **Azure Active Directory > App registrations (Preview)**, then click **New registration** 
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

You can obtain `authn_id` by submitting a `GET` request to the `/api/authnz/` API. 

See the following figure as an example, which uses [Postman](https://www.getpostman.com) to send the API requests.

  ![image](/src/authnz/cloud/azure/05.png)
