---
autotoc: true
---
PLACEHOLDER_INCLUDE(/src/CloudMan/Header/index.md)

<table>
  <tr>
    <td style=" border: none;"> <div class='title'>Galaxy CloudMan <a href='/src/CloudMan/index.md'>CapacityPlanning</a> for Amazon Web Services</div> </td>
    <td style=" border: none;"> <a href='http://aws.amazon.com/'><img src="/src/Images/Logos/AWSLogo.png" alt="http://aws.amazon.com/" /></a> </td>
  </tr>
</table>


This page offers advice on how much cloud infrastructure you will need to [run your Galaxy instance on Amazon Web Services (AWS)](/src/CloudMan/AWS/index.md).  See the [general capacity planning page](/src/CloudMan/CapacityPlanning/index.md) for advice that applies across different cloud infrastructures.

<div class='right'></div> PLACEHOLDER_INCLUDE(/src/CloudMan/AWS/LinkBox/index.md)


# Amazon Web Services

CloudMan was initially developed for the [Amazon Web Services (AWS)](http://aws.amazon.com/) cloud platform.  Before we cover AWS, we'll need to introduce some terminology:

## Terminology

**[EC2](http://aws.amazon.com/ec2/)**

 . Amazon's *Elastic Compute Cloud (EC2)* provides the *compute* part of their cloud.  How many CPUs, and how much memory any instance has is determined by that instance's [EC2 Instance Type](http://aws.amazon.com/ec2/instance-types/).

**[EBS](http://aws.amazon.com/ebs/)**

 . Amazon's *Elastic Block Storage (EBS)* provides virtual disk drives for EC2 instances.

**[S3](http://aws.amazon.com/s3/)**

 . Amazon's *Simple Storage Service (s3)* is "storage for the internet."  It provides a web services interface to net-accessible storage.  It is not used at runtime by Galaxy cloud instances, but can be used to create archives of EBS virtual disks.

## How Much EC2?

Which [EC2 instance type(s)](http://aws.amazon.com/ec2/#instance) should you use for your Galaxy?

### EC2 Recommendations

<table>
  <tr class="th" >
    <th> Scenario </th>
    <th> Head </th>
    <th> Worker </th>
  </tr>
  <tr>
    <th> 1: Light usage </th>
    <td> Standard Large or Extra Large </td>
    <td> Standard Large or Extra Large </td>
  </tr>
  <tr>
    <th> 2: Occasional heavy </th>
    <td> High-Memory Double or Quadruple Extra Large </td>
    <td> High-Memory Extra Large </td>
  </tr>
  <tr>
    <th> 3: Continuous variable </th>
    <td> High-Memory Double or Quadruple Extra Large </td>
    <td> High-Memory Extra Large </td>
  </tr>
</table>



### EC2 Instance Type Comments

<table>
  <tr class="th" >
    <th rowspan=3 colspan=2 style=" text-align:center;"> Instance Type </th>
    <th> </th>
    <th> </th>
    <th> </th>
    <th> </th>
    <th> </th>
    <th style=" text-align:center;"> Recommended for <a href='/src/CloudMan/CapacityPlanning/index.md#usage-scenarios'>Usage Scenarios</a> </th>
    <th rowspan=3 style=" text-align:center;"> Comments </th>
  </tr>
  <tr>
    <td> </td>
    <td> <rowclass="th"style="text-align:center">1 </td>
    <td> </td>
    <td style=" text-align:center;"> 2 </td>
    <td> </td>
    <td style=" text-align:center;"> 3 </td>
  </tr>
  <tr class="th" >
    <th> H </th>
    <th> W </th>
    <th> H </th>
    <th> W </th>
    <th> H </th>
    <th> W </th>
  </tr>
  <tr>
    <th rowspan=5> </th>
    <th> Micro </th>
    <td rowspan=3 style=" text-align:center;"> N </td>
    <td rowspan=3 style=" text-align:center;"> N </td>
    <td rowspan=3 style=" text-align:center;"> N </td>
    <td rowspan=3 style=" text-align:center;"> N </td>
    <td rowspan=3 style=" text-align:center;"> N </td>
    <td rowspan=3 style=" text-align:center;"> N </td>
    <td rowspan=3 style=" text-align:left;"> Galaxy may come up on these instances, but it can't run any analysis. </td>
  </tr>
  <tr>
    <th> Small </th>
  </tr>
  <tr>
    <th> Medium </th>
  </tr>
  <tr>
    <th> Large </th>
    <td rowspan=2 style=" class="green"  text-align:center;"> <strong>Y</strong> </td>
    <td rowspan=2 style=" class="green"  text-align:center;"> <strong>Y</strong> </td>
    <td rowspan=2 style=" text-align:center;"> N </td>
    <td rowspan=2 style=" text-align:center;"> N </td>
    <td rowspan=2 style=" text-align:center;"> N </td>
    <td rowspan=2 style=" text-align:center;"> N </td>
    <td rowspan=2 style=" text-align:left;"> <em>Recommended</em> for Scenario 1: Light Usage, head and worker nodes. </td>
  </tr>
  <tr>
    <th> Extra Large </th>
  </tr>
  <tr>
    <th rowspan=3> High-<br />Mem-<br />ory </th>
    <th> Extra Large </th>
    <td> </td>
    <td> </td>
    <td> N </td>
    <td style=" class="green" "> <strong>Y</strong> </td>
    <td> N </td>
    <td style=" class="green" "> <strong>Y</strong> </td>
    <td> <em>Recommended</em> for Scenarios 2 & 3: heavy or variable usage head nodes. </td>
  </tr>
  <tr>
    <th> Double Extra Large </th>
    <td> </td>
    <td> </td>
    <td style=" class="green" "> <strong>Y</strong> </td>
    <td> </td>
    <td style=" class="green" "> <strong>Y</strong> </td>
    <td> </td>
    <td> <em>Recommended</em> head node for heavy/variable usage (Scenarios 2 & 3) </td>
  </tr>
  <tr>
    <th> Quadruple Extra Large </th>
    <td> </td>
    <td> </td>
    <td style=" class="green" "> <strong>Y</strong> </td>
    <td> </td>
    <td style=" class="green" "> <strong>Y</strong> </td>
    <td> </td>
    <td> The <a href='/src/GalaxyTeam/index.md'>Galaxy Team</a> uses this head node in workshops that run !TopHat.  It can support ~30 concurrent !TopHat jobs without significant slowdown, whereas the Double Extra Large option gets bogged down. </td>
  </tr>
  <tr>
    <th rowspan=2> Com-<br />pute </th>
    <th> Cluster Any </th>
    <td rowspan=2 style=" text-align:center;"> X </td>
    <td rowspan=2 style=" text-align:center;"> X </td>
    <td rowspan=2 style=" text-align:center;"> X </td>
    <td rowspan=2 style=" text-align:center;"> X </td>
    <td rowspan=2 style=" text-align:center;"> X </td>
    <td rowspan=2 style=" text-align:center;"> X </td>
    <td rowspan=2 style=" text-align:left;"> These are not supported by CloudMan </td>
  </tr>
  <tr>
    <th> GPU Any </th>
  </tr>
</table>



**Key:**
<table>
  <tr>
    <td> N </td>
    <td> Not recommended </td>
  </tr>
  <tr>
    <td style=" class="green" "> <strong>Y</strong> </td>
    <td> Recommended </td>
  </tr>
  <tr>
    <td> X </td>
    <td> Can't go there </td>
  </tr>
</table>



See also

* [Reducing costs in Cloud Galaxy](http://dev.list.galaxyproject.org/Reducing-costs-in-Cloud-Galaxy-td4483448.html) thread, Galaxy-Dev [mailing list](/src/MailingLists/index.md), started 2012/03/18.
* The [CloudHarmony Benchmarks](http://cloudharmony.com/benchmarks) page

## How Much EBS?

Galaxy CloudMan comes with two standard volumes:

1. **Tools Volume (10GB):** Contains the tools used by the instance
1. **Indices Volume (700GB):** Reference data for number of species.

In addition, you will need a *data volume* to contain the data used by and produced in your analysis.  You don't control the size of the tools and indices volumes, but you specify the size of the data volume at setup time.  The size of your data volume is determined by the size of your datasets.  Unfortunately, we don't have any hard and fast guidelines or multipliers for how much you will need, given the size of your datasets.

For Scenario 1, *Light usage*,  it is fine to specify a large data volume (up to the 1 terabyte max).  However for Scenarios 2 and 3, where the storage may or will exist for a long time, allocating too much storage can incur significant cost.  AWS charges for *allocated* storage, not *actually used* storage, by the hour.
