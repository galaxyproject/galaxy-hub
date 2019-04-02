---
title: Federated Identity and Access Management
---

Galaxy's identity and access management (IAM) is a set of protocols and methods that enable users
to login to Galaxy, and securely delegate Galaxy to access their cloud-based resources.


**Related publications:**
- Jalili, Vahid, et al. ["Cloud Bursting Galaxy: Federated Identity and Access Management."](https://www.biorxiv.org/content/10.1101/506238v1) bioRxiv (2018): 506238.


User Authentication and Authorization
--- 

Galaxy [supports anonymous users](https://github.com/galaxyproject/galaxy/blob/d538dc05b8ad60879e1c0164a985ada5aa56e2d2/config/galaxy.yml.sample#L1268-L1269),
hence enabling researchers to use Galaxy without needing to create a user account. For instance, anyone can use
[Galaxy **Main**](https://usegalaxy.org) without having to create a user account. Despite of its convenience, 
anonymous users can only benefit from a subset of Galaxy's features. For instance, they cannot save their 
[histories](/src/tutorials/histories/index.md). Therefore, to fully appreciate Galaxy's features, researchers 
are required to have a user account on Galaxy.


For user's convenience, Galaxy offers a wide-variety of methods to create a user account, listed as it follows:
 
- **Galaxy Username and Password:** This is a built-in mechanism for creating user accounts via 
username and password. Without any additional configuration, Galaxy use its database to 
maintain usernames and passwords, and stores passwords encrypted using 
[Password-Based Key Derivation Function 2 (PBKDF2)](https://en.wikipedia.org/wiki/PBKDF2) algorithm.

    - Admins: [read how to set it up](/src/authnz/config/gxyusername/index.md).
    
    - Users: read how to use it. 

- **Plugin-driven authentication:** This framework allows an instance of Galaxy to 
delegate authentication to an [Lightweight Directory Access Protocol (LDAP)](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol)
server, or to [Pluggable Authentication Module (PAM)](https://en.wikipedia.org/wiki/Pluggable_authentication_module).

- **External User Authentication:** If Galaxy is deployed with either [NGINX](https://www.nginx.com) or 
[Apache](https://httpd.apache.org) serving as a front-end proxy for Galaxy requests, they can be configured 
to authenticate users and pass this authentication information along to Galaxy using the HTTP remote user mechanism. 
Thus, by the time Galaxy is aware of a request, the user identity will have been determined and there will be no 
need for Galaxy to do any additional authentication work, such as showing a login screen or checking user credentials.
However, accepting an identity asserted by the Web server does not relieve Galaxy from having to create a user account 
for such an identity. Thus, Galaxy automatically creates a user for each identity of this kind, recording that the 
user is “external” and also creating a random password in order to effectively disable traditionally performed 
logins for the user. 

- **[OpenID Connect (OIDC)](https://en.wikipedia.org/wiki/OpenID_Connect):** Leveraging the OIDC protocol, 
we enable login to Galaxy without explicitly creating a Galaxy user account. This protocol is the current latest 
industry-level standard for user authentication, and has been widely adopted by various platforms.

    - Admins: [read how to set it up](/src/authnz/config/oidc/index.md).
    
    - Users: read how to use it. 


Cloud Authorization Delegation
---

A Galaxy user can analyze their data stored on a cloud-based storage using Galaxy, and can also store their 
Galaxy datasets on a cloud-based storage. This provides users with a (theoretically) unlimited storage, 
and facilitates their data sharing through a cloud storage bucket. This functionality is exposed via 
two APIs (we're actively developing necessary UI components):

- `/api/cloud/storage/send`: sends datasets from Galaxy to a cloud-based storage 
(read the [api documentation](https://docs.galaxyproject.org/en/master/api/api.html?highlight=cloud#galaxy.webapps.galaxy.api.cloud.CloudController.send));

- `api/cloud/storage/get`: copies a given object from a cloud-based storage to Galaxy 
(read the [api documentation](https://docs.galaxyproject.org/en/master/api/api.html?highlight=cloud#galaxy.webapps.galaxy.api.cloud.CloudController.get)).


To access user's private cloud-based resources via these APIs, Galaxy requires credentials to sign
read/write requests to user's storage account. However, Galaxy does NOT ask for user credentials as there 
are some drawbacks to that, such as:

- user credentials would grant a Galaxy instance with the same level of privileges as the user themselves;

- requires manual intervention to be revoked, and can affect all the other services user has setup with their 
credentials;

- it adds liability concerns to Galaxy.

Therefore, for user data security, Galaxy implements the current-latest protocols that allow users to 
securely delegate Galaxy to access their resources without having to sharing their credentials. Accordingly, 
users can leverage the Role-Based Access Control (RBAC) model implemented in cloud-based resource providers,
and define a separate role for a Galaxy instance, whose access can be restricted/revoked independent from 
user's access. Providing Galaxy with the information about the role, Galaxy will then assume it 
on-behalf-of the user. See [this page](/src/cloud/authnz/index.md) for the details on how we implement this 
method for different resource providers, and how it can be used.  

   

