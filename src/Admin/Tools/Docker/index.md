---
title: Docker Integration
---

<div class='right'><a href='http://getgalaxy.org/'><img src="/src/Images/Logos/DockerInGalaxyAnnotated.png" alt=" " width=300 /></a></div>
As of the [August 2014 release](/src/News/2014_08_11_Galaxy_Distribution/index.md), Galaxy supports running tools within [Docker](https://www.docker.com) containers. Tool authors may annotate Docker container ids the tool works with in the Tool XML file and likewise deployers may specify Docker container ids in Galaxy's `job_conf.xml` file on a per destination basis.
<br /><br />
Any of Galaxy's built-in job runners may be used to in conjunction with Docker - but the deployer must annotate job destinations with how to run Docker (at very least `<param id="docker_enabled">true</param>` must be added to the destination to enable docker).
<br /><br />
Excellent documentation on how to work with Galaxy and Docker was assembled at the Galaxy Community Conference by Aaron Petkau and can be found [on Github](https://github.com/apetkau/galaxy-hackathon-2014) including a full working [example tool and Dockerfile (for SMALT)](https://github.com/apetkau/galaxy-hackathon-2014/tree/master/smalt) which also serves as a Docker tutorial. Likewise, the [Galaxy User Group Grand Ouest](https://www.e-biogenouest.org/groups/guggo) experimented with Docker and Galaxy and documented those efforts [here](https://www.e-biogenouest.org/groups/guggo/wiki/FirstGenOuest).
<br /><br />
More implementation details can be found in [Pull Request 401](https://bitbucket.org/galaxy/galaxy-central/pull-request/401/allow-tools-and-deployers-to-specify) and a complete description of deployer-centric options can be found in Galaxy's [job_conf.xml.sample_advanced](https://github.com/galaxyproject/galaxy/blob/master/config/job_conf.xml.sample_advanced).
