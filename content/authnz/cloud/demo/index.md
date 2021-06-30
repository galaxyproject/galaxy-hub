---
title:  Cloud Authorization Demo
highlight: true
---

Here we demo copying an object from an AWS S3 bucket to a Galaxy history. 
For this:
- we copy the `ENCFF001SNN.broadPeak.gz` object from 
[ENCODE's AWS S3 bucket](https://registry.opendata.aws/encode-project/);
- to gain access to the `ENCFF001SNN.broadPeak.gz` object, we
use a role created by the Galaxy project for the purpose of this demo;
- we use a pre-bake branch of Galaxy with all the necessary configuration
pre-setup. 


<div class="alert alert-info" role="alert">
    Note: all the features described here are under active developement,
    and this demo only shows their current status. Once all the necessary 
    components are developed, this feature will be available from 
    [Galaxy Main](https://usegalaxy.org).
</div>


For this demo, we first start a local Galaxy instance, then login to 
that instance, and define a cloud authorization record, which we will
then use to copy the `ENCFF001SNN.broadPeak.gz` object. 

You may take the following steps:

1. Clone a pre-baked instance of Galaxy by running the following 
command in your terminal: 

    ```bash
    mkdir ~/role_demo && cd ~/role_demo && git clone -b aws_demo_role https://github.com/vjalili/galaxy .
    ```

2. Start Galaxy by running the following command:

    ```bash
    ./run.sh
    ```

    wait until you see the following message:
    
    ```bash
    serving on http://127.0.0.1:8080
    ```

3. Login to your Galaxy instance by clicking on the `Login or Register`
button, and then on the `Sign in with Google` button:

    ![image](/src/authnz/cloud/demo/01.png)

4. Enter your Google credentials if required:

    ![image](/src/authnz/cloud/demo/02.png)

5. Having signed-in with your Google credentials, you will be auto-redirected 
back to your local installation of Galaxy; then click on the `User` button 
and choose the `Preferences` menu item:

    ![image](/src/authnz/cloud/demo/03.png) 

6. From the preferences menu, choose the `Manage Cloud Authorization` option:
    
    ![image](/src/authnz/cloud/demo/04.png)

7. Click on the `Create New Authorization Key`, and enter the following value for
the `Role ARN` field, and click on the `Save Key` button.

    ```
    arn:aws:iam::347162595075:role/Authnz_demo_role
    ```
    
    ![image](/src/authnz/cloud/demo/05.png)
    
8. Click on the `User` button, and choose `Preferences`, and from the 
"User Preferences" menu, choose `Manage API key`:

    ![image](/src/authnz/cloud/demo/06.png)

9. Click on the `Create a new key`, and copy API key:

    ![image](/src/authnz/cloud/demo/07.png)

10. Keep the terminal running your Galaxy open, and open a new terminal
and run the following command where `[API KEY]` is your API obtained 
at previous step: 

    ```bash
    python get_object.py [API KEY]
    ```

    Running this command will return a list as the following which indicates
    that a Galaxy has create a job to download the `ENCFF001SNN.broadPeak.gz` 
    object: 
    
    ```bash
    vahid$ python get_object.py 76e948f7c9f858612abab98df7f75ddb
    [{u'update_time': u'2019-04-26T23:30:42.061336', u'uuid': u'a3404949-dbf3-4657-999d-11837e5c7f3f', u'deleted': False, u'id': u'1cd8e2f6b131e891', u'purgable': True, u'total_size': 0, u'state': u'queued', u'create_time': u'2019-04-26T23:30:42.002358', u'file_size': 0, u'purged': False}]
    ```
    
11. At this point Galaxy has downloaded the object to your history:

    ![image](/src/authnz/cloud/demo/08.png)


# Remarks

The policy of the `Authnz_demo_role` role that we set this Galaxy instance 
to assume, is defined as the following:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::encode-public/2008/11/24/034e3689-9903-4c86-9237-040f8f795b73/ENCFF001SNN.broadPeak.gz"
        }
    ]
}
```

Accordingly, this role grants the local Galaxy instance with read access 
(`"Action": "s3:GetObject"`) to only one object, i.e., 
`arn:aws:s3:::encode-public/2008/11/24/034e3689-9903-4c86-9237-040f8f795b73/ENCFF001SNN.broadPeak.gz`


Additionally, the trust relation of this role is defined as the following:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "accounts.google.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "accounts.google.com:aud": "893677542423-4t761afe33k3o9mu56u6p6p1ctk8o88f.apps.googleusercontent.com"
        }
      }
    }
  ]
}
```

Accordingly, only the Galaxy instance with the OpenID Connect Audience ID 
`893677542423-4t761afe33k3o9mu56u6p6p1ctk8o88f.apps.googleusercontent.com`
that is registered with Google (`"Federated": "accounts.google.com"`) can 
assume this role. See [this page](/src/authnz/config/oidc/idps/google/index.md)
on how to register your Galaxy; however, for the purpose of this demo, 
the pre-baked Galaxy that you cloned is already registered with Google.


<div class="alert alert-info" role="alert">
    Note: the OIDC audience ID and secret of the Galaxy instance shared
    with you, shall be used for the purpose of this demo only.
</div>
