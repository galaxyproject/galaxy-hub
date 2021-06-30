---
title: Login to Galaxy
highlight: true
---

_This page explains how to use this feature, for admin-specific docs, please refer to [this](/src/authnz/config/index.md) page._

While anyone can use Galaxy anonymously, it is required to have a Galaxy user account
to benefit from all the features Galaxy has to offer. For instance, anonymous users 
are limited to one history, but Galaxy users can have histories. Also, Galaxy users
can leverage their cloud-based storage resources to analyze their data in Galaxy, 
or persist their histories on their own cloud-based storage---a feature that is not 
available to anonymous users. 


For users convenience, Galaxy offers [various methods](/src/authnz/index.md#user-authentication-and-authorization) 
to create a Galaxy user account. (Note that some of these methods can be disabled
on the Galaxy instance you're using as per that instance's configuration.) Depending
on the method you choose, you may be creating a Galaxy user account explicitly 
(i.e., define a Galaxy username and password) or implicitly (i.e., you would not
define a username and password, instead you will login with your social identities).
In this sections we will explain how to use each of these methods. 

- [Explicitly create a Galaxy user account](/src/authnz/use/gxy/index.md);
- [Use your social identities](/src/authnz/use/oidc/index.md), such as your Google
account.