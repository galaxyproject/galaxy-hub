# Cloud Computing for the Microbiome Workshop Notes

Comprehensive documentation can be found at [CloudMan](/src/CloudMan/index.md).

#### Quick start

Start at [Galaxy Cloud Launch](https://main.g2.bx.psu.edu/cloudlaunch )
Enter AWS Credentials (AWS Key ID and Secret)
* Cluster Name - A name for your cluster.
* Password - A password for the administrative functions of your cluster.
* Key ID - AWS Key ID (The short part)
* Secret Key - AWS Secret Key (The long part)
* Instance Type - The type of EC2 instance you would like.  m1.large or higher recommended.

Navigate to the URL presented on the confirmation page to configure your cluster
* To create an exact copy of the instance from our workshop demo, click "advanced options", and enter the Instance Share String below
* OR, to create a regular Galaxy cluster, just enter how much space(in gigabytes) you'd like to have to work with.

**Instance Share String:** `cm-e49d0cbc21a77988d38b0d13890eee8f/shared/2012-04-03--19-54/`


At this point, just wait a few seconds and you're ready to go when the "Access Galaxy" button lights up.

**Additional Links**
* [QIIME tutorial used in the demo](http://qiime.org/tutorials/tutorial.html )
* [Archaeopteryx Tree Viewer ](http://www.phylosoft.org/archaeopteryx/ )

<br /><br /><br /><br />

#### For Advanced Users - Getting the workshop data (Titus' snapshot) in to Galaxy

Documentation covering Galaxy Data Libraries can be found at [Admin/DataLibraries/Libraries](/src/Admin/DataLibraries/Libraries/index.md)

Specific documentation covering options for uploading to be libraries can be found at [Admin/DataLibraries/UploadingLibraryFiles](/src/Admin/DataLibraries/UploadingLibraryFiles/index.md)

This currently requires creating a volume from the AWS Console and mounting via the instance's shell (via ssh).

* From AWS, note the Availability Zone of your EC2 instance, then click Elastic Block Store -> Volumes -> Create Volume, then enter the following parameters:
  * Size: 1 TiB
  * Availability Zone: Same as your EC2 Instance
  * Snapshot: snap-17f4c06d
* With the new volume checked, click **More...** -> **Attach Volume**, select your instance and set the device (the default device name filled in to the dialog once you select your instance is acceptable).
* Log in to your instance using SSH: `ssh -i /path/to/your/ecs_ssh_private_key ubuntu@ec2-1-2-3-4.compute-1.amazonaws.com`
* Become root: `sudo -i`
* Mount the volume: `mkdir /mnt/workshopData; mnt /dev/sdf /mnt/workshopData`
* From the Galaxy Admin interface (if you have not yet configured an account to be a Galaxy administrator, you can do so at http://ec2-1-2-3-4.compute-1.amazonaws.com/cloud/root/admin ), click **Manage data libraries** -> **Create new data library**.
* Enter a name and optional description/synopsis for the library, and click **Create**.
* In your new library, click **Add datasets**.
* From **Upload option**, select **Upload files from filesystem paths**.
* In **Paths to upload**, enter the path(s) (`/mnt/workshopData/...`) to files or directories that you would like to import.
* Click **Upload to library**.

