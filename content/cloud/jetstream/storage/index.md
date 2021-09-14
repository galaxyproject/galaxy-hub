---
title: Using volume storage
---
[Jetstream instances](http://jetstream-cloud.org/general-vms.php) come with a
predefined amount of local (i.e., ephemeral or transient) storage. It is
possible to use persistent, volume-based storage that can also vary in size,
depending on your allocation.

Note that using volume-based storage requires some command line work
and should be considered beta functionality. **Also note that if you delete
(ie, terminate) your instance, even though your volume will continue to exist,
it will be useless because the database that links Galaxy to all the datasets
resides on the instance storage.** However, you may _stop_ an instance and
then follow the steps below to make Galaxy use the same volume again.

## Configuring Galaxy to use a volume

Follow these steps to attach an external volume to your instance and make Galaxy
use it:

* Through the Atmosphere portal, create a volume of desired size and attach it
  to your instance. Following the screenshots below to have a visual reference.
  When creating the volume, make sure it is created in the same provider as
  the one your Galaxy instance is running in (in the screenshots below, this
  is *Jetstream - TACC*).

    <div class='center'>
      <a href='volume-create-btn.png'><img src="volume-create-btn.png" alt="" width=200 /></a>
      <a href='volume-create.png'><img src="volume-create.png" alt="" width=200 /></a>
      <a href='volume-edit.png'><img src="volume-edit.png" alt="" width=200 /></a>
      <a href='volume-attach-btn.png'><img src="volume-attach-btn.png" alt="" width=200 /></a>
      <a href='volume-attach.png'><img src="volume-attach.png" alt="" width=200 /></a>
      <a href='volume-attached.png'><img src="volume-attached.png" alt="" width=200 /></a>
    </div>

* [Access your instance via ssh](/src/cloud/jetstream/ssh/index.md) and create
  a directory for the Galaxy files. The volume you attached to your instance
  will be most likely be available under `/vol_c` so create a directory under 
  that one. Change the ownership of the directory to the `galaxy` system user.

  ```
  sudo mkdir /vol_c/gxy_data
  sudo chown galaxy:galaxy /vol_c/gxy_data
  ```
  
  It may be possible for the volume to have gotten mounted to the instance
  under a directoy different than `/vol_c`. You will know this if the `mkdir`
  command above fails. In that case, discover which where the volume got
  mounted by running the `df` command:
  
  ```
  $ df
  Filesystem     1K-blocks     Used Available Use% Mounted on
  udev            61883716       12  61883704   1% /dev
  tmpfs           12377780      452  12377328   1% /run
  /dev/sda1       61893628 19750448  39595940  34% /
  none                   4        0         4   0% /sys/fs/cgroup
  none                5120        0      5120   0% /run/lock
  none            61888888        0  61888888   0% /run/shm
  none              102400        0    102400   0% /run/user
  /dev/sdb       980385892    95308 930466840   1% /vol1
  ```
  In this case, the volume is available under `/vol1`. If that is the case,
  just replace all occurances of `vol_c` in the commands with the available
  path.

* Edit the following entries in the main Galaxy configuration file
  `/opt/galaxy/galaxy-app/config/galaxy.ini` to point to the directory you
  created.

  ```
  $ nano /opt/galaxy/galaxy-app/config/galaxy.ini
  # (Edit the following lines in the file)
  new_file_path = /vol_c/gxy_data/tmp
  job_working_directory = /vol_c/gxy_data/jobs
  file_path = /vol_c/gxy_data/datasets
  object_store_cache_path = /vol_c/gxy_data/object_store_cache
  ```

* Restart Galaxy with the following command
  `sudo supervisorctl restart galaxy:web0`

Run a couple of jobs through the Galaxy web interface now and see if the files
are being written on the new volume. You should see output similar to this:

```
$ ls -l /vol_c/gxy_data/datasets/000/
total 21588
-rw-r--r-- 1 galaxy users  1206112 Apr 10 07:39 dataset_1.dat
-rw-r--r-- 1 galaxy users 20896315 Apr 10 07:40 dataset_2.dat
``` 

If so, you are all set.

## Stopping your instance

You may stop an instance and start it back up at a later time while
preserving the data on the volume. Again, if you _delete_ the instance, all
the data will be lost.

To stop an instance, follow these steps:

* Stop the Galaxy application process from the command line with
  `sudo supervisorctl stop galaxy:web0`

* Via the Atmosphere portal, detach the volume from your instance and then stop
  the instance.

Your instance and the volume will remain available under your account available
for use at a later time.


## (Re)Starting your instance

To (re)start your instance and attach it to the previously used volume, do the
following steps:

* Start your previously stopped instance via the Atmosphere portal and attach
  the volume to it.

* Access your instance via ssh again. If you are using the terminal, note that
  the IP address of the instance has likely changed.

* Run the following commands to set ownership of the Galaxy directory to the
  `galaxy` system user (Atmosphere resets those when you attach a volume) and
  then start Galaxy:

  ```
  sudo chown -R galaxy:galaxy /vol_c/gxy_data
  sudo supervisorctl start galaxy:web0
  ```

In a few moments Galaxy should be available on your instance with the same data
as where you left it.
