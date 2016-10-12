PLACEHOLDER_INCLUDE(/CloudMan/Header)

PLACEHOLDER_INCLUDE(/CloudMan/LinkBox)

This page will provide details on how HTCondor has been integrated into CloudMan. Examples on how to use HTCondor through CloudMan will be provided for the enduser.

# Installation Configuration

HTCondor has been pre-installed on linux images using through CloudMan. The deployment detail is as follow:

* bin                          /usr/bin
* etc                          /etc/condor/
* etc/examples                 /usr/share/doc/condor/etc/examples
* examples                     /usr/share/doc/condor/examples
* include                      /usr/include/condor
* lib                          /usr/lib/condor
* libexec                      /usr/lib/condor/libexec
* local/condor_config.local    /etc/condor/
* condor_config                /etc/condor/condor_config
* local/execute                /var/lib/condor/execute
* local/spool                  /var/lib/condor/spool
* man                          /usr/share/man
* sbin                         /usr/sbin
* sql                          /usr/share/condor/sql
* src                          /usr/src
* INIT                         /etc/init.d/condor
* PID                          /var/run/condor
* LOGS                         /var/log/condor
* LOCK                         /var/lock/condor

Please note that the configuration is taken place only in **condor_config** global file. The online configuration is based on the functionality of the HTCondor where only the last configuration value is used. Therefore, for finding any specific configuration in /etc/condor/condor_configuration please find the last key in the file.

HTCondor requires the ping port "ICMP" and the range specified through **HIGHPORT** and **LOWPORT** in the condor_configuration to be open. To do so please refer to the firewall options.

# HTCondor Flocking

HTCondor has been used to achieve federated computing resource manager over the remote computing resources. In this scenario HTCondor will receive the remote computing public IP or DNS and try to use remote resources by claiming the resource from remote HTCondor pool. This has happened by setting the **FLOCK_TO** variable in the condor_config file to be the remote IP or DNS. It worth noting that the remote Condor should have provided enough acces to the CloudMan HTCondor by setting **FLOCK_FROM** and **ALLOW_WRITE** variable in their condor_config file (This setting requires HTCondor to be restarted. To restart HTCondor manually in CloudMan use */etc/init.d/condor restart* command). 

# Big Pool

To be able to utilize local resource through HTCondor any worker node's pool added to the system through CloudMan console will be joint to the master's pool to create a big shared pool. This happen by setting the workers' **CONDOR_HOST ** variable to point to the master IP and set the  **DAEMON_LIST** to only run **MASTER, STARTD and SCHEDD** processes.

# Example

For an example please follow the following procedure:

 1- $mkdir test<br />
 2- $cd test<br />
 3- $cat > python_random_lines.sh<br />
 #! /bin/sh<br />
 echo "I'm process id $$ on" `hostname`<br />
 python random_lines_two_pass.py "dataset_$2.dat" "output_$2.dat" "3"<br />
 date<br />
 exit 42<br />
 *ctrl+D*<br />
 4- $cat > job.submit <br />
 executable=python_random_lines.sh<br />
 universe=vanilla<br />
 arguments=Example.$(Cluster).$(Process) [file_number] <br />
 transfer_input_files = dataset_[file_number].dat<br />
 transfer_output_files = output_[file_number].dat<br />
 output=results.output.$(Process).$(Cluster)<br />
 error=results.error.$(Process).$(Cluster)<br />
 log=results.log<br />
 notification=never<br />
 should_transfer_files=YES<br />
 when_to_transfer_output = ON_EXIT<br />
 queue<br />
 *Ctrl+D*<br />
 **Note that for running the above script you need to have random_lines_two_pass.py and the dataset available**<br />
 **The job.submit should be run multiple times [once for each input file]**<br />
 5- chmod a+x python_random_lines.sh<br />
 6- condor_submit job.submit<br />
**condor_submit should be run multiple times [once for each input]**
