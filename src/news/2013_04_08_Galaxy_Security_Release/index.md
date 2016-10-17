---
date: 2013-04-08T16:47:57Z
---
<div class='newsItemHeader'>[April 8, 2013 Galaxy Security Release](/src/News/2013_04_08_Galaxy_Security_Release/index.md)</div>

A security vulnerability was recently discovered that would allow a malicious person to delete the contents of a history that does not belong to them.  The vulnerability was in a method designed to allow users to switch between histories as a convenience from certain messages and is not used for most normal history switching operations.  A fix has been provided in the stable branch of the Galaxy distribution and tagged as `security_2013.04.08`.  Administrators are strongly encouraged to upgrade to at least the listed tag or to implement one of the provided workarounds. This changeset **is not** included in the most recent (April 1, 2013) stable release.

To upgrade:

```console
% hg pull
% hg update security_2013.04.08
```


Additional details, including workarounds for those who are unable or unwilling to perform a full upgrade, can be found in the [mailing list announcement](http://lists.bx.psu.edu/pipermail/galaxy-announce/2013-April/000064.html).

*Thanks for using Galaxy,*

[The Galaxy Team](/Galaxy Team)


CategoryNews
