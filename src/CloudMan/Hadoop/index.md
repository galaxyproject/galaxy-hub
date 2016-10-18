PLACEHOLDER_INCLUDE(/src/CloudMan/Header/index.md)

PLACEHOLDER_INCLUDE(/src/CloudMan/LinkBox/index.md)

This page will provide details on how Hadoop has been integrated into CloudMan. Examples on how to use Hadoop through CloudMan will be provided for the enduser.

# Hadoop-On-Demand

The capability of running a Hadoop job has been added to the CloudMan through its local resource manager, Sun Grid Engine. The SGE has been extended in such a way that it will monitor jobs submitted into it for finding Hadoop jobs. This is achieved in two steps as follow:
1. The prolog variable in the All.q configuration has been set to point to the **hdfsstart.sh** script in /opt/hadoop/sge_integration path. This script is looking for jobs with the name "hadoop" assigned to them. 
2. Hadoop jobs should be submitted with the name "hadoop".

After finding a hadoop job the hdfsstart.sh script will copy\create necessary files and folders for running Hadoop under the user's working directory (Currently the ubuntu user is only supported) and set the Hadoop home directory to "/home/ubuntu/hadoop/hadoop/home". **It is required that the user submits a hadoop job from the /home/ubuntu directory**.

After configuring the local node, hdfsstart.sh will run **hdfsprolog.py** Python script to deploy Hadoop over the local cluster resources dedicated to the job by SGE. This script will deploy the necessary files and folders to each cluster resource to run Hadoop.

After Hadoop has finished its job SGE will run a script called **hdfsstop.sh** from /opt/hadoop/sge_integration to clean the systems for any further use.

# Submitting a Hadoop Job

The process of submitting the Hadoop job is started by modifying the hdfs-sge.cmd script file available at /opt/hadoop/sge_integration. Any job submitted using this script will be named as "hadoop".

## Modifying hdfs-sge.cmd

* The user can set the number of computing resources required for running this job by modifying 
    **#$ -pe mpi 2**.<br />
    Change "2" as required.

* Any further Hadoop required pre-processing can be set after the following two lines in the script. 
    **$HADOOP_HOME/bin/start-mapred.sh**
    **sleep 10**

* The job related input files can be passed to Hadoop by modifying 
    **$HADOOP_HOME/bin/hadoop fs -put /home/ubuntu/hadoop/hadoop/home/conf input** 
    line in which 
      */home/ubuntu/hadoop/hadoop/home/conf* 
    can be changed to point at the files input directory.

* The actual binary to be run by Hadoop can be set by modifying the 
    **$HADOOP_HOME/bin/hadoop jar hadoop-examples-1.0.4.jar  wordcount input output**
    line in this script.

* The output file can be set by modifying 
    "$HADOOP_HOME/bin/hadoop fs -get output $HADOOP_HOME/output.$JOB_ID"
    in this script.

## Submitting Hadoop Job

A Hadoop job can be submitted using the following command:
              **qsub -v HADOOP_HOME=/home/ubuntu/hadoop/hadoop/home,JAVA_HOME=/usr hdfs-sge.cmd**
 where -v pass any required environment variable to the Hadoop.

For an example the user can run 
         qsub -v HADOOP_HOME=/home/ubuntu/hadoop/hadoop/home,JAVA_HOME=/usr /opt/hadoop/sge_integration/hdfs-sge.cmd
where the output has been directed to 
         /home/ubuntu/hadoop/hadoop/home/output.$JOB_ID
