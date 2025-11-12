# Galaxy Hub Deployment

The [rewrites.js](rewrites.js) function contains a [CloudFront Viewer Request function](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html) to intercept requests and perform rewrites (redirects). See the existing rewrites for syntax. The function is automatically deployed with the [rewrites.yml](../.github/workflows/rewrites.yml) workflow.
