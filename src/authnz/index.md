---
title: Federated Identity and Access Management
highlight: true
---

Galaxy's identity and access management (IAM) is a set of protocols and methods that enable users
to login to Galaxy, and securely delegate Galaxy to access their cloud-based resources.


**Related publications:**
- Jalili, Vahid, et al. ["Cloud Bursting Galaxy: Federated Identity and Access Management."](https://www.biorxiv.org/content/10.1101/506238v1) bioRxiv (2018): 506238.


# User Authentication and Authorization

Galaxy [supports anonymous users](https://github.com/galaxyproject/galaxy/blob/d538dc05b8ad60879e1c0164a985ada5aa56e2d2/config/galaxy.yml.sample#L1268-L1269),
hence enabling researchers to use Galaxy without needing to create a user account. For instance, anyone can use
[Galaxy **Main**](https://usegalaxy.org) without having to create a user account. Despite of its convenience, 
anonymous users can only benefit from a subset of Galaxy's features. For instance, they cannot save their 
[histories](/src/tutorials/histories/index.md), workflows, or visualization. Therefore, to fully appreciate Galaxy's features, researchers are required to have a user account on Galaxy.


For user's convenience, Galaxy offers a wide-variety of methods to create a user account:
 
- **[Galaxy Username and Password](/src/authnz/use/gxy/index.md):** 
This has a built-in mechanism for creating user accounts via a local
username and password. Without any additional configuration, Galaxy uses its database to 
maintain usernames and passwords, and stores passwords encrypted using 
[Password-Based Key Derivation Function 2 (PBKDF2)](https://en.wikipedia.org/wiki/PBKDF2) algorithm.


- **[OpenID Connect (OIDC)](/src/authnz/use/oidc/index.md):** 
Leveraging the [OIDC protocol](https://en.wikipedia.org/wiki/OpenID_Connect), 
login to Galaxy is enabled without explicitly creating a local Galaxy user account. This protocol is the current latest 
industry-level standard for user authentication, and has been widely adopted by various platforms. This mechanism
can be used in combination with the Galaxy username and password option.


- **[External authentication](/src/admin/config/external-user-auth/index.md):** 
This framework allows an instance of Galaxy to 
delegate authentication to an external authentication system such as 
[Lightweight Directory Access Protocol (LDAP)](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol)
server, [Pluggable Authentication Module (PAM)](https://en.wikipedia.org/wiki/Pluggable_authentication_module),
or an upstream proxy server (e.g., [NGINX](https://www.nginx.com) or [Apache](https://httpd.apache.org)).
These systems are aconfigured to authenticate users and pass this authentication information along to Galaxy using 
the HTTP remote user mechanism. Thus, by the time Galaxy is aware of a request, the user identity will have 
been determined and there will be no need for Galaxy to do any additional authentication work, such as 
showing a login screen or checking user credentials. However, accepting an identity asserted by the Web server 
does not relieve Galaxy from having to create a user account for such an identity. Thus, Galaxy automatically 
creates a user for each identity of this kind, recording that the user is “external” and also creating 
a random password in order to effectively disable traditionally performed logins for the user. 


Depending on your role/interests, please refer to the following pages for more details:

- **Admins: [read how to set it up](/src/authnz/config/index.md);**
- **Users: [read how to use it](/src/authnz/use/index.md).** 


# Cloud Authorization Delegation

A user can leverage Galaxy to analyze their data stored on a cloud-based storage, and can also store their 
Galaxy datasets on a cloud-based storage (see [this page](/src/cloud/storage/index.md) for details). 
The ability to store/read data on/from a cloud-based storage, provides users with a (theoretically) 
unlimited storage space, and facilitates their data sharing through a cloud storage bucket. 


To access user's private cloud-based resources, Galaxy requires credentials to sign read/write requests to 
user's storage account. However, Galaxy does NOT ask for users credentials as there are some drawbacks to 
that, such as:

- user credentials would grant a Galaxy instance with the same level of privileges as the user themselves;

- requires manual intervention to be revoked, and can affect all the other services users have setup with their 
credentials;

- it adds liability concerns to Galaxy.

Therefore, for user data security, Galaxy implements the current-latest protocols that allow users to 
securely delegate Galaxy to access their resources without having to share their credentials. This 
method leverages the Role-Based Access Control (RBAC) model implemented in cloud-based resource providers,
and defines a separate role for a Galaxy instance, whose access can be restricted/revoked independent from 
user's access. Providing Galaxy with the information about the role, Galaxy will then assume it 
on-behalf-of the user. 

See [this page](/src/authnz/cloud/index.md) for the details on how we implement this 
method for different resource providers, and how it can be used.
