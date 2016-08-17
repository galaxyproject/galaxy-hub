<div class='center'><a href='/Community/GalaxyAdmins/'><img src='/Images/Logos/GalaxyAdmins.png' alt='GalaxyAdmins' /></a></div>

INCLUDE(../../LinkBox)

The [GalaxyAdmins](../../) group uses the University of Iowa's Blackboard Collaborate (Ellumiate Live!) web conference system for it's [conference call meetups](../).  


## Blackboard Collaborate (Ellumiate Live!) Tips

You do not need any special client, just a web browser and Java installed (the client will run as a Java web start app). 

**If you are using a recently updated version of Mac OS X, you will need to take [some extra steps](#java-web-start-on-mac-os-x) to get Java Web Start to work.**

If you have headphones they greatly improve your audio and *a headset really helps when you are speaking.*

A couple of things to mention, when you launch your session - you can tune your connection speed:

![](/BlackboardConnectionSpeed.png)

Talking works like a walkie-talkie ... you have to select "Talk" (see capture below) to open up your audio line. There can only be 6 simultaneous talkers.  Please only select the talk button when you need to actually talk to reduce background noise and to free up lines for others to participate.

![](/BlackboardTalk.png)

## Java Web Start on Mac OS X

<div class='right'><div class='solid'>
<table>
  <tr>
    <td style=" border: none"> <img src='/Images/Logos/AppleLogo.jpg' alt='' height="50" /> +<img src='/Images/Logos/JavaLogo.png' alt='' height="50" /> </td>
    <td style=" border:none"> = <img src='/Images/Icons/Frown.jpg' alt='' width="50" /> </td>
  </tr>
  <tr>
    <td style=" border: none"> <img src='/Images/Logos/AppleLogo.jpg' alt='' height="50" /> + <img src='/Images/Logos/JavaLogo.png' alt='' height="50" /> + <img src='/Images/Icons/PointingFinger.png' alt='You' width="50" /> </td>
    <td style=" border:none"> = <img src='/Images/Icons/Smile.png' alt='' width="50" /> </td>
  </tr>
</table>

</div>

If you are running any moderately recent version of OS X, you may need to take some additional steps.  See this [RacoonLab posting](http://www.racoonlab.com/2013/01/java-web-service-doesnt-start-bad-installation-no-jre-found-in-configuration-file/) for details.

**How do I know I have this problem?**

These two situations are known to be fixed with this solution:

1. If the `meeting.jnlp` file downloads but doesn't launch automatically, or even after you double click on it then<div class='indent'>
  Start a shell, go to your downloads directory and type

  `javaws meeting.jnlp`

 if you see 

  `Java Web Start splash screen process exiting .....`<br /><div class='right'>![Blackboard Hang](/BlackboardHang1.png)</div>
  `Bad installation. No JRE found in configuration file`</div>
1. Blackboard Collaborate launches, says loading, gets to 3 of 5 dots on the status indicator and then throws up a blank gray window

then

  you probably have this problem.

**How do I fix this problem?**

In the shell enter

 `sudo /usr/libexec/PlistBuddy -c "Delete :JavaWebComponentVersionMinimum" \`<br />
 `  /System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/XProtect.meta.plist`

You should then be able to launch the `meeting.jnlp` by double clicking on it.

You may also find that you receive a message indicating that the file cannot be opened because it was not downloaded from the Mac App Store.  This can be worked around by right clicking the `meeting.jnlp` file and clicking "Open" in the menu that pops up.  More details about this error [can be found here](http://osxdaily.com/2012/07/27/app-cant-be-opened-because-it-is-from-an-unidentified-developer/).
