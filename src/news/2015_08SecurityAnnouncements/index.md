---
date: 2015-08-13T17:27:27Z
---
<div class='newsItemHeader'>[August 12, 2015 Galaxy Security Advisories](/News/2015_08SecurityAnnouncements)</div>

Two security vulnerabilities were recently discovered in Galaxy, and a third in the Galaxy Tool Shed. Because of this, the Galaxy Committers have released a number of fixes which have been rolled in to affected versions of Galaxy dating back to the 14.10 release.

<span style="font-size: larger;">**Galaxy XSS Reflection Vulnerability**</span>

This vulnerability, affecting all known versions of Galaxy, would allow a malicious actor to exploit the workflow import form to cause a user's browser to execute javascript not originating from within Galaxy. This could allow the malicious actor to gain unauthorized access to Galaxy accounts or client data.

Exploitation of reflected XSS vulnerabilities typically requires some coordination, but the consequences of exploitation can result in data or account exposure, so the risk of leaving the issue unfixed is moderate. Administrators of affected servers are encouraged to update immediately.

[See the announcement for full details and update instructions](https://lists.galaxyproject.org/pipermail/galaxy-announce/2015-August/000148.html)

<span style="font-size: larger;">**Galaxy LDAP Authentication Vulnerability**</span>

This vulnerability would allow unauthorized access to Galaxy accounts only on Galaxy servers using the new (as of 15.05) LDAP authentication framework plugin. This is due to the fact that LDAP may be configured to allow anonymous binds, and the LDAP plugin does not check that binding with the provided username/password was not anonymous.

Administrators of affected servers are STRONGLY encouraged to update immediately, as the vulnerability allows unauthorized access to Galaxy accounts.

[See the announcement for full details and update instructions](https://lists.galaxyproject.org/pipermail/galaxy-announce/2015-August/000147.html)

<span style="font-size: larger;">**Tool Shed Unauthorized Upload Vulnerability**</span>

This vulnerability would allow a malicious actor to upload new versions to repositories on which they have not been granted access.

Because the Tool Shed is used to install software in Galaxy, if exploited, the impact could result in arbitrary code execution on Galaxy servers if a malicious tool is uploaded to a previously trusted repository, and that compromised version is subsequently installed by a Galaxy administrator. As such, Tool Shed administrators are strongly encouraged to update immediately.

[See the announcement for full details and update instructions](https://lists.galaxyproject.org/pipermail/galaxy-announce/2015-August/000149.html)


CategoryNews
