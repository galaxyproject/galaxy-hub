

## Our community onboarding

### How did we get to know about Galaxy project and framework and its potential

We are based in the Scientific Computing Department (SCD) of the Rutherford Appleton Laboratory (RAL), at the Science and Technologies Facilities Council (STFC) in the United Kingdom. RAL hosts the UK’s neutron and muon sources, as well as the UK’s synchrotron light source and the Central Laser Facility. 

As part of our role in the EuroScienceGateway (ESG) project, we have been working to engage and onboard two specific materials science communities: the muon science and the catalysis science communities. One of the members of our team had worked in bioinformatics, she knew about the Galaxy platform and its capabilities, and suggested we try it to improve the onboarding of these communities. 

The needs of the catalysis community were quite similar to those of the muon community, but a key difference was that we did not develop the base software tools: we just worked to secure their ease of use by creating associated Galaxy tools.
 

### What were our needs / challenges :

For both the muon and catalysis communities, we needed to increase the uptake and distribution of the associated software tools; improve the transparency and reproducibility of the research results obtained by using the tools; and develop a simple GUI for those tools. 

At the beginning of the ESG project, we had already developed command-line tools for modelling muon experiments.  As regards the catalysis community, tha analysis tools were already there. All of these were desktop-based tools that needed to be downloaded and installed in the users’ computers. Moreover, the data analysis required the sequential application of these desktop-based tools, in what was a sort of unstructured workflow.  The muon and catalysis communities comprise beamline scientists, domain specialists, experimental scientists and modellers.  Hence, given this diversity,  the transparency and reproducibility of the results depended a lot on each particular user.
 
So, those were some of the key needs for both communities, and to tackle them we developed Galaxy tools for muons and catalysis, and moved the associated workflow into Galaxy.

One of the advantages of Galaxy for building and running workflows is that the GUIs for all the tools follow the same template, which makes these tools easy to understand and connect into workflows. And not only that, Galaxy is quite good in terms of transparency and reproducibility of its results.  Because all of its workflows can be saved in Galaxy and shared or modified at any time, which makes the scientific work associated to the workflow more transparent and reproducible.
 
And all these Galaxy capabilities have been quite helpful for engaging and onboarding the  muon and catalysis communities. Because Galaxy has:

- provided sustainable and user-friendly software tools that have improved the interpretation of the associated  experiments. 
- given web-based tools that are easy to distribute among the community. 
- provided the Galaxy Training Network (GTN) infrastructure that we are using to give tutorials about our tools. 


### What were the steps we made:

In the case of the muon community, we lead the Muon Spectroscopy Computational Project (MSCP), where we develop software tools for the interpretation of muon experiments.  The MSCP started in 2017 and, by the time we decided to use Galaxy, we already knew the muon community quite well. And what we needed to do for this community at the beginning of the ESG project was to improve the use of computational modelling in muon experiments. 

Galaxy has  helped us to improve the use of modelling in muon science and, in the process of developing our Galaxy tools for muons, we developed an expertise on Galaxy that we then expanded to other materials science communities. In particular, the catalysis science community, where we started to develop Galaxy tools for processing results from x-ray absorption spectroscopy experiments used in catalysis.
 
At the time of writing this report, we are in the process of building the Galaxy catalysis community. An important advantage that we have for this is that the ESG team is based at the Rutherford Appleton Lab, where the catalysis experiments are done.   

### What have we achieved given our level of maturity:

#### Muon community:

Muons are subatomic particles that are generated in target stations at the Rutherford Appleton Lab, and then fired into the samples that we want to study. A particular property of the muon is that it “stops” at a particular site inside the sample, and knowing this stopping site is very useful for interpreting muon experiments.  The MSCP developed a method for finding this stopping site and we have implemented this method in the Galaxy platform.  

We have also developed a tutorial explaining this method that is now part of the GTN and we have members of the international muon community who are using some of our tools. 

We are working on implementing a new command-line tool, that we have developed for the muon community, into the Galaxy platform.  

#### Catalysis community: 

The challenge we are tackling here is the interpretation of x-ray spectroscopy (XAS) experiments used in catalysis. XAS experiments for catalysis generate data that is processed by several software tools which are connected in workflows.  These workflows are quite complex, and we have used Galaxy to improve transparency and reproducibility of these workflows.

The workflows that we are processing using Galaxy are connected to:
- the processing and normalization of the raw data coming from the XAS instruments and
- its subsequent analysis using a set of well-established software tools.

Currently, most of the catalysis community performs (b) using a set of desk-based tools, which have names such as DAWN, ATHENA, ARTEMIS AND FEFF, and can be downloaded with the DEMETER package.  These tools are connected in a workflow shown in the flow diagram below:  

DIAG 1

To move this workflow into Galaxy, we have broken-up the process into four associated prototype Galaxy tools that can be linked into an equivalent workflow.  The picture below shows the names of the tools and what part of the workflow each tool represents.  For instance, Larch Athena, is used for processing and normalizing the raw data coming from the instrument.

DIAG 2

We are now testing these tools and workflow by trying to reproduce a set of published XAS results for catalysis. 

### Our setup (technical file)

#### Setup
Galaxy server: 4 core VM, CentOS 7 (dev and prod)
Job runner: 12 core VM, Rocky 8 (dev and prod)
Monitoring: 2 core VM, Rocky 8 (dev and prod)
Storage: 2 core VM, Rocky 8 (shared between dev and prod)

#### Authentication
Local authentication currently in use. LDAP in use for other services onsite (federated)

#### Job configuration
HPC (Slurm) exists onsite, have considered integration but not actively working towards this yet

All jobs use Slurm, with “Galaxy server” acting as control and execution node. “Job runner” is prioritized in Slurm (jobs will only run on server if runner queue is full). Static job allocation (more cores allocated for some tools).

All jobs currently within the Galaxy instance, as galaxy user.

#### Storage
Data uploaded to Galaxy, lives on the storage VM and NFS mounted to the server and runner.

#### Reference data
No use of reference data.


### Problems to solve

Current Muon workflows are relatively lightweight simulation, starting from small plaintext files. So far we have not yet needed to use HPC or transfer large amounts of data. However, X-ray use cases are likely to involve larger numbers of hdf5 data, so this is something we will need a solution for at some point. Some problems or work we anticipate (many are related):

- Integration with existing HPC resources onsite

- Implementing authentication using existing LDAP service
    - Likely a prerequisite for using HPC resources

- Data transfer
    - X-ray data is archived on tape, neutron/muon on disk. We run a web application for browsing and restoring data, accessible via HTTPS (short lived), Globus transfer, restoring to our HPC system (since disabled due to lack of use) or direct to the facility. This should be integrated with Galaxy somehow
    - No matter where the data ends up, there always ends up being restrictions on how long it lives there - so we might have to duplicate data into Galaxy rather than using the Rucio style approach?

### Ideas/proposals/solutions
The ideas we’ve had for addressing some of our problems (not actioned any of them yet, may not be feasible or other options might be better):

- Use Pulsar to integrate with HPC
    - Get a node inside existing Slurm network running Pulsar, send jobs there (probably using the “submit as user option” - dependent on setting up proper auth)
    - Not spoken with people running our HPC service, so not clear what hoops we’d need to jump through
    - Precedent for similar projects in the past (restoring data to HPC, creating accounts and permissioning as needed)
- Setup LDAP auth
    - Hopefully just out of the box
    - But have also considered whether we might need to do some manual configuration of Galaxy user roles etc. in order to allow both internal and external users but only allow the internal users to access HPC
- Set up a data/filesource tool to integrate with our archive
    - ideally just redirects them to the archive UI, they login separately, browse, select the data and it is sent (or registered) in Galaxy
    - in cases where the data needs to be restored from tape, this might be more complicated - don’t want to make the user wait for restoration, so maybe make restoration a tool that runs in the workflow? But then it would need to authn to the archive service - not sure what best practice would be.
    - alternatively, rather than Galaxy pulling the data, could push it from the archive UI (might be easier since we directly develop that, so can tailor it to our needs)

