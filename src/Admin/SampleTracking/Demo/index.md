# Galaxy Demos
---

This page contains instructions on how to setup Galaxy for various feature demos.

## Sample Tracking Demo
The sample tracking demo script ([download](ATTACHMENT_URLlims_demo.tar.gz)) creates all the necessary infrastructure to create sequencing requests in a laboratory environment.
This script drops the current database and creates a new database with the same name.
Then it does all the sample tracking prep work like:
* Creates admin users based on the list in the Galaxy config file and a regular user (customer@corp.com)
* Creates a data library named '!DemoDataLib'
* Sets permissions on the library so that all the users have been granted ADD/MODIFY/MANAGE PERMISSIONS on the data library & its folders
* Creates two form definitions (!DemoRequestForm & !DemoSampleForm) from the csv files provided as the command line parameters - see `setup_lims_demo.sh`
* Creates a request type with the above mentioned forms and 3 states (New, Received & Done)  

### Requirements
This script assumes Galaxy is using PostgreSQL for database storage.

### Warning
This script will delete the existing PostgreSQL database specified in the Galaxy config file `universe_wsgi.ini`. Be sure to change the database name in the `database_connection` config variable if you do not want the current Galaxy database to be deleted.

### Instructions
Follow the steps below:
1. [Download](ATTACHMENT_URLlims_demo.tar.gz) the script tarball
1. Untar the tarball in the Galaxy root directory.  The tarball contains 4 files:
  1. `setup_lims_demo.sh`
  1. `setup_lims_demo.py`
  1. `requestfd.csv`
  1. `samplefd.csv`
1. From the Galaxy root directory run:  ` $ sh setup_lims_demo.sh `
