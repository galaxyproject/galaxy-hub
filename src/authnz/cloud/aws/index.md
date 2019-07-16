---
title: Configure Cloud Authorization for AWS
highlight: true
---

On this page we explain how to setup a *role* on AWS, and how to setup Galaxy to assume that *role*. 

## Step 1: Create an AWS Role

1. Goto [aws.amazon.com/iam/](https://aws.amazon.com/iam/) and login with your AWS credentials. 
2. If not on IAM page, click on `Services` button and type `IAM` in the search textbox, and choose the shown
option (see the following figure).

  ![image](/src/authnz/cloud/aws/aws_01.png)

3. On the AWS IAM page, goto `Roles` tab and hit `Creat role` button (see the following figure).

  ![image](/src/authnz/cloud/aws/aws_02.png)

4. Then click on the `Web identity` button, and then choose `Google` from the dropdown of the 
`Identity provider`, then enter `Audience` (the `client id` as issued by Google when registering 
the Galaxy instance; see [this page](/src/authnz/config/oidc/idps/google/index.md)), and then click on 
the `Next: Permissions` button (see the following figure).

  ![image](/src/authnz/cloud/aws/aws_03.png)

5. Type `s3` in the `Filter policies` search textbox, and choose `AmazonS3FullAccess`, then 
click on `Next: Tags` button. (see the following figure). Alternatively, you can click on the 
`Create policy` button and define a custom policy for Galaxy.

  ![image](/src/authnz/cloud/aws/aws_04.png)

6. You may optionally add descriptive tags, then click on the `Next: Review` button.
7. On the review page, enter a name for the role on the `Role name` textbox, then
click on the `Create role` button.
8. Once the role is create, AWS shows the IAM roles page, click on the newly created role.
9. Copy `Role ARN`.

(You may also refer to AWS documentation [on creating roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-idp.html).)

## Step 2: Setup Galaxy to Use an AWS Role

To setup Galaxy to use a role, you need to `POST` a payload as the following to 
`/api/cloud/authz` API of Galaxy: 

```json
{
    "authn_id": "...",
    "provider": "aws",
    "config": {
        "role_arn": "arn:aws:iam::347162595075:role/test"
    },
    "description": "..."
}
```

You can obtain `authn_id` by submitting a `GET` request to the `/api/authnz/` API. 

<div class="alert alert-info" role="alert">
    **NOTE** that the "provider" of authentication referred to by the "authn_id" you choose, must be 
    Google (or any provider you chose when creating AWS role) and the audience ID of Galaxy instance 
    on which you are using this feature, must equal with audience you entered when creating the role.
</div.

