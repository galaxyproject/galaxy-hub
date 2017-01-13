For admins wishing to have more information on the status of a galaxy instance, you can configure and use the Galaxy Report Tool.

1. Configure `reports_wsgi.ini` in the same manner as your main galaxy instance (i.e., same database connection, but different port)
2. Run with `sh run_reports.sh`
3. Use a web browser and go to the address you configured in `reports_wsgi.ini`

The Galaxy Report Tool will give you information on the following:

* Jobs
  * Today's jobs
  * Jobs per day this month
  * Jobs in error per day this month
  * All unfinished jobs
  * Jobs per month
  * Jobs in error per month
  * Jobs per user
  * Jobs per tool
* Sample Tracking
  * Sequencing requests per month
  * Sequencing requests per user
* Workflows
  * Workflows per month
  * Workflows per user
* Users
  * Registered users
  * Date of last login
  * User disk usage
* System
  * Disk space maintenance

