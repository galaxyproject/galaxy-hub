# Security practices for Galaxy Tool Development

{{> Develop/LinkBox }}
If your tool is not taking in text inputs - its all numbers and select parameters, etc.... it is very likely secure. These sorts of vulnerabilities would usually come into play when users are allowed to pass free text and the tool or wrapper use this text in such a way that it can be broken out of the intended context (these are broadly characterized as code injection attacks). 95% of how these text parameters are going to be used is likely passing them as a command-line argument to another program. For this reason Galaxy preprocesses the text and sanitizes it so it cannot contain characters that would result in the text easily result in code injections.

So for this reason - you are still probably fine unless you are "circumventing" this text preprocessing. For instance, Galaxy will
translate quotations marks to '__dq__', this tool explicitly retranslates those back to quotations marks (https://bitbucket.org/galaxy/galaxy-central/src/f2f1cce4678cf1eb188d9611b05f00706afc8897/tools/stats/filtering.py?at=default#cl-176). There is a reason to do this in this case but you will not need for
most bioinformatics applications. If your tools are doing this it is time to start getting extra careful.

If you are really interested in this topic or when it is time to get extra careful, I would recommend picking up the book "The Web
Application Hacker's Handbook" - it is pretty good. Most of it would not be relevant for tool developers, but chapter 1, chapter 2, and all
of chapter 9 could be very relevant and would probably leave one with a solid grasp of what to look for in many different contexts - not
just the ones the book discusses explicitly.

Hopefully over time the IUC will provide guidance about this sort of thing (informing you if there are potential security vulnerabilities in your tools). Also feel free to post example tool configurations to this list you might be concerned about and I am sure someone would be happy to look it over and tell you if there are any red flags.
