## About This Directory

The Galaxy [Community](/community/) has created Galaxy instances in many different forms and for many different applications. This directory lists the options we know about, including:

- Galaxy servers,
- cloud services that support Galaxy instances, and
- virtual machines and containers that can be easily deployed for your own server.

## Which Platform / Platform Type to Choose?

Your choices depends upon your needs. If you want to use Galaxy with a minimum of setup work, then try starting with a UseGalaxy or Public Server. There are over 125 of these platforms to pick from all of which can be used with little or no setup on your part. However, if none of those meet your needs then here are some guidelines for other cases.

|                                                     | UseGalaxy Servers | Public Servers | [TIaaS](https://galaxyproject.eu/tiaas.html) | Academic Clouds | Commercial Clouds | Containers      | VMs             | Local           |
|-----------------------------------------------------|-------------------|----------------|----------------------------------------------|-----------------|-------------------|-----------------|-----------------|-----------------|
| **Free to use**                                     | Yes               | Yes            | Yes                                          | Yes<sup>1</sup> | No                | Yes             | Yes             | Yes             |
| **Uses your local compute infrastructure**          | No                | No             | No                                           | No              | No                | Yes<sup>2</sup> | Yes<sup>2</sup> | Yes             |
| **Datasets total > 250GB** (including intermediate) | No                | ?<sup>5</sup>  | Yes                                          | Yes             | Yes               | Yes<sup>3</sup> | Yes<sup>3</sup> | Yes             |
| **Computational requirements are similarly large**  | No                | ?<sup>5</sup>  | Yes                                          | Yes             | Yes               | Yes<sup>3</sup> | Yes<sup>3</sup> | Yes             |
| **Share Galaxy objects outside your organization**  | Yes               | Yes            | Yes                                          | Yes             | Yes               | Yes<sup>4</sup> | Yes<sup>4</sup> | Yes<sup>5</sup> |
| **Install custom tools and reference genomces**     | No                | No             | No                                           | Yes<sup>5</sup> | Yes               | Yes             | Yes             | Yes             |
| **Have absolute data security requirements**        | No                | No             | No                                           | ?<sup>5</sup>   | ?<sup>5</sup>     | ?<sup>5</sup>   | ?<sup>5</sup>   | Yes             |

<sup>1</sup> Depends on provider, and if you are eligible for the service  
<sup>2</sup> These technologies can be deployed on clouds or locally.  
<sup>3</sup> Depends on the size of the system you are running it on.  
<sup>4</sup> With these technologies you can save the server and share the entire platform with them.  
<sup>5</sup> Depends on configuration.  

Most of these platform types are defined above (click on each tab), but two aren't:

### TIaaS

Training Infrastructure as a Service (TIaaS) is a service offered by some UseGalaxy servers to specifically support training use cases. See [TIaaS](https://galaxyproject.eu/tiaas.html) for more information.

### Local

Finally, you can install your own local instance of Galaxy from scratch. See [Get Galaxy](/admin/get-galaxy/) for details on how to do this. This has become much easier to do in recent years.

## Resource Keywords

Each resource has a set of keywords associated with them.

### Real keywords

*(What about listing these by the resource's domain, for example, the research methodology (e.g., RNA-Seq), the clade (e.g., crops), or field e.g., metagenomics) that a resource is targeted at? We are working on it.)*

### Scope

Initially, there is only one keyword per resource and that defines the scope of the resource:

#### UseGalaxy

UseGalaxy servers implement a common core set of tools and reference genomes, and are open to anyone to use.

#### Genomics

These servers implement a broad range of tools and aren't specific to any part of the tree of life, or to any type of analysis.

#### Domain

Domain resources specialize in either a particular branch of the tree of life or in particular types of analysis. Within their specializations, domain resources offer a wide variety of tools.

#### Tool Publishing

Tool publishing resources make tools easily available so that researchers can use them without having to install and use command line versions. The distinction between *domain* resources and *tool publishing* resources is fuzzy. In general, tool publishing resources expose tools from a particular organization, while domain resources include tools / datasets from other organizations and have a larger goal in mind.

## Add a resource to this directory

If you maintain a Galaxy resource that can be listed on this directory, then please **[describe your Galaxy resource here](https://docs.google.com/forms/d/e/1FAIpQLSd4xzUP3pSYjTHiLoRE10zSJbplDVW7EbGy8EJ9JS0yy2SySg/viewform)**. We'll contact you with any question and then post it this directory.
