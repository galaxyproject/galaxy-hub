---
title:  Cloud Authorization Demo
highlight: true
---

Here we demo copying a dataset from AWS S3 to a Galaxy history. 
For this:
- we copy the `ENCFF001SNN.broadPeak.gz` object from 
[ENCODE's AWS S3 bucket](https://registry.opendata.aws/encode-project/);
- to gain access to the `ENCFF001SNN.broadPeak.gz` object, we
use a role created by the Galaxy project for the purpose of this demo;
- we use a pre-bake fork of Galaxy with all the necessary configuration
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

4. Enter your Google credentials if required:

5. After you're auto-redirected to Galaxy, click on the `User`
button and choose the `Preferences` menu item: 

6. For the preferences menu, choose the `Manage Cloud Authorization` option:

7. Click on the `Create New Authorization Key`, and enter the following value for
the `Role ARN` field, and click on the `Save Key` button.

    ```
    arn:aws:iam::347162595075:role/Authnz_demo_role
    ```
    
8. Click on the `User` button, and choose `Preferences`, and from the 
"User Preferences" menu, choose `Manage API key`:

9. Click on the `Create a new key`, and copy API key:

10. Keep the terminal running your Galaxy open, and open a new terminal
and run the following command where `[API KEY]` is your API obtained 
at previous step: 

    ```bash
    python get_object.py [API KEY]
    ```

    Running this command will return a list as the following which indicates
    that a Galaxy has create a job to download the `ENCFF001SNN.broadPeak.gz` 
    object: 
    
    ```
    [{u'update_time': u'2019-04-26T22:03:22.966554', u'uuid': u'65e36bc7-ba73-4cc7-829c-7fdeaaaf9d76', u'deleted': False, u'id': u'f2db41e1fa331b3e', u'purgable': True, u'total_size': 0, u'state': u'queued', u'create_time': u'2019-04-26T22:03:22.950783', u'file_size': 0, u'purged': False}]
    ```


