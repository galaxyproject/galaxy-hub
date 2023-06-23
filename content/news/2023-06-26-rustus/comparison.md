This table is meant to provide a quick comparison of tusd and rustus features.

|                                                                  | rustus | tusd |
|------------------------------------------------------------------|--------|------|
| Language                                                         | rust   | go   |
| Docker container provided                                        | ✔️      |      |
| Helm chart provided (Kubernetes)                                 | ✔️      | ✔️    |
| Amazon S3                                                        | ✔️      | ✔️    |
| Google Cloud Storage                                             |        | ✔️    |
| Microsoft Azure Blob Storage                                     |        | ✔️    |
| File hooks                                                       | ✔️      | ✔️    |
| HTTP hooks                                                       | ✔️      | ✔️    |
| gRPC hooks                                                       |        | ✔️    |
| AMQP hooks (Celery integration)                                  | ✔️      |      |
| Concurrent uploads (e.g. Dynamo, ETCD3 lockers)                  |        | ✔️    |
|  Store `.info` in Redis or relational databases instead of files | ✔️      |      |
| Custom directory structure                                       | ✔️      |      |
| Sentry integration                                               | ✔️      |      |
| HTTPS support                                                    |        | ✔️    |
| Metrics                                                          |        | ✔️    |
| CORS                                                             | ✔️      | ✔️    |
