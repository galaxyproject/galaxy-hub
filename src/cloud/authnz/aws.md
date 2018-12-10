# Configure Cloud Authorizatoin for AWS

On this page we explain how to setup a *role* on AWS, and how to setup Galaxy to assume that *role*. 

## Setup an AWS Role

1. Goto [aws.amazon.com/iam/](https://aws.amazon.com/iam/) and login with your AWS credentials. 
2. If not on IAM page, click on `Services` button and type `IAM` in the search textbox, and choose the shown
option (see the following figure). 

![image](/src/cloud/authnz/aws_01.png)

3. On the AWS IAM page, goto `Roles` tab and hit `Creat role` button (see the following figure).

![image](/src/cloud/authnz/aws_02.png)

4. Then click on the `Web identity` button, and then choose `Google` from the dropdown of the 
`Identity provider`, then enter `Audience` (the `client id` as issued by Google when registering 
the Galaxy instance; see [this page](/src/admin/authentication/config/index.md)), and then click on 
the `Next: Permissions` button (see the following figure).

![image](/src/cloud/authnz/aws_03.png)


5. Type `s3` in the `Filter policies` search textbox, and choose `AmazonS3FullAccess`, then 
click on `Next: Tags` button. (see the following figure). Alternatively, you can click on the 
`Create policy` button and define a custom policy for Galaxy.

![image](/src/cloud/authnz/aws_04.png)

6. You may optionally add descriptive tags, then click on the `Next: Review` button.
7. On the review page, enter a name for the role on the `Role name` textbox, then
click on the `Create role` button.
8. Once the role is create, AWS shows the IAM roles page, click on the newly created role.
9. Copy `Role ARN`.


