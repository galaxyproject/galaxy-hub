 

<<Include(Learn/LinkBox)>>

# File Upload via FTP

_Please note the updated server to use for FTP: **usegalaxy.org**. This replaces the prior server "main.g2.bx.psu" in all materials below._

With the continued advancement of sequencing technology, we've seen the size of files uploaded to Galaxy grow quite large. Although our current file upload methods have worked fine for years, they are not well suited for the extremely large files in common use today. Uploading directly from the browser can be unreliable and browsers don't provide feedback on upload progress and state like they do for downloads.

Because of this, we have implemented file uploads to Galaxy via FTP on both [Galaxy Test](http://test.g2.bx.psu.edu/) and [Galaxy Main](http://usegalaxy.org/). FTP will allow you to monitor as mentioned above, as well as resume interrupted transfers. Compression types .gz/.gzip, .bz/.bzip, .bz2/.bzip2, and single-file .zip are supported.

Video demonstrating how it works: **[Get Data: Upload File](http://vimeo.com/galaxyproject/upload)** <<BR>> _also in archive screencast&nbsp; [FTP Upload](Screencast%3Aquickie_17_ftp_upload%2Fflow.html)_

If viewing the "Upload File" tool, you'll notice a new field:

![FTP on the Upload File tool form](Images/FTP/ftp1.png)

To get started using FTP, you'll need to have registered a regular Galaxy account.

Once registered, you can initiate an FTP connection in your preferred FTP client. Please see the comparison of available FTP clients here: [https://en.wikipedia.org/wiki/Comparison\_of\_FTP\_client\_software](https://en.wikipedia.org/wiki/Comparison_of_FTP_client_software)

In this example I'm using Cyberduck for Mac OS X. Point your client to the FTP server hostname provided on the "Upload File" modal window, ( [http://usegalaxy.org](http://usegalaxy.org), for Galaxy Main, likewise for Test) using your registered email address and password for the login details:

![FTP client connection details](Images/FTP/ftp2.png)

As usual with FTP, you can view upload progress and completion time estimates:

![FTP upload progress](Images/FTP/ftp3.png)

Files uploaded to the FTP server won't automatically be imported to Galaxy - rather, you will be presented with a list of the contents of your FTP directory on the standard "Upload File" tool interface:

![FTP files on the Upload File tool form](Images/FTP/ftp4.png)

Files not imported within 3 days will be cleaned up from the FTP site.

Please note that it may not always be practical to use the public Galaxy servers. If you're routinely working with very large data and having to wait for it to upload, a local Galaxy server could be a more practical solution. Instructions on installing your own server can be found at [Admin/Config/Performance/ProductionServer](Admin%2FConfig%2FPerformance%2FProductionServer).

In addition, since it's possible to upload to Amazon's Simple Storage Service (S3) in parallel, using Galaxy [CloudMan](CloudMan) may be a faster alternative. We are investigating incorporating easy access to S3 buckets for Galaxy instances on the Amazon Elastic Compute Cloud (EC2). But you don't need to wait for the pretty interface, you can already access contents of S3 buckets by pasting links to their contents in the "URL/Text:" field of the "Upload File" tool. For an example of how to do this, see the [screencast on this page](http://usegalaxy.org/heteroplasmy) entitled "Watch how the complete analysis can be performed on the Amazon Cloud."

FTP upload can be enabled in local installations of Galaxy, instructions to do so can be found at [Admin/Config/UploadviaFTP](Admin%2FConfig%2FUploadviaFTP).

