---
title: 'Galaxy instance for sensitive data running in isolated network environment'
date: '2025-01-20'
tease: GDPR-compliant Galaxy clone in isolated environment
authors: Mirela Minkova & Magdalena Harakalova, Torfinn Nome & Nikolay Vazov
authors_structured:
- github: vazovn
tags: [esg-wp5, esg]
subsites: [global, all, esg]
supporters:
  - eurosciencegateway
---

We are excited to announce that researchers from The Netherlands and Norway are developing a GDPR-compliant Galaxy clone. 
This setup enables direct download of tools from the Toolshed, which are then converted and saved locally as Apptainer containers.

While the instance is currently undergoing thorough testing, there are several promising developments that are newsworthy. 

This project is based on a collaboration between The CardiOmnics research group of the Circulatory Health Research Center and Regenerative Medicine Center Utrecht, 
UMC Utrecht, Utrecht University https://www.umcutrecht.nl/en/ (Mirela Minkova, Magdalena Harakalova), the University Centre for Information Technologies, 
University of Oslo https://www.usit.uio.no/ (Nikolay Vazov and Torfinn Nome) and Avans University of Applied Sciences in Breda https://www.avans.nl/ (MiaoMiao Zhou).


To install the local Galaxy clone, a virtual machine managed by Digital Research Environment (DRE) is accessed through myDRE, a platform built on Microsoft Azure's infrastructure.
The system includes 2-factor authentication, myDRE accounts, and audit trails, undergoing regular penetration testing for safety, and assuring compliance with GDPR.
For more information about anDREa and myDRE please visit the following links: https://andrea-cloud.com/, https://mydre.org/ 


In the myDRE environment, we selected a Linux Ubuntu 22.04 Virtual Machine machine with 64 cores and 256 GB RAM, and a basic model of 128 GB SSD.
While the basic size model is sufficient for installation purposes, it is recommended to increase the machine size to at least 1 TB for running data and tool installations.

For more information contact 

Magdalena Harakalova, MD PhD
Circulatory Health Research Center &
Regenerative Medicine Utrecht
University Medical Centre Utrecht
Utrecht, The Netherlands
m.harakalova@umcutrecht.nl
