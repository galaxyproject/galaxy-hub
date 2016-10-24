---
autotoc: true
title:  Galaxy Issue Reporting and Feature Requests
---

PLACEHOLDER_INCLUDE(/src/Support/LinkBox/index.md)
PLACEHOLDER_INCLUDE(/src/Develop/LinkBox/index.md)

<table>
  <tr>
    <td style=" border: none; width: 60%;"> <div class='center'><a href='http://bit.ly/gxytrello'><img src="/src/Images/Logos/TrelloLogo300.png" alt="Galaxy Issue Board @ Trello" width="200" /></a></div><br /><br /> The Galaxy Project uses <a href='http://bit.ly/gxytrello'>Trello</a> for issue tracking and for gathering awesome ideas including feature requests from community and future development visions.  The <a href='http://bit.ly/gxytrello'>Galaxy Trello Board</a> supports <a href='http://galaxyproject.org/trello'>card creation</a>, <a href='/src/Issues/index.md#add-a-comment'>commenting</a>, and <a href='/src/Issues/index.md#vote'>voting</a> on cards. All votes affect prioritization of cards: <em>the more votes the card gets the more probable for it to be implemented</em>. </td>
    <td style=" border: none;">  </td>
  </tr>
</table>



<br /><br />

## The Galaxy Trello Board

### For Issue Tracking

As mentioned above, the Galaxy Project uses [Trello](http://bit.ly/gxytrello) for issue tracking. In Trello issues are known as *cards* and cards are organized into *lists*.  To see the full contents of any card just click on it.<br /><br />The [Galaxy Trello Board](http://bit.ly/gxytrello) has the following bug-related lists: 

<table>
  <tr>
    <th> Category / List </th>
    <th> Explanation </th>
  </tr>
  <tr>
    <th> Inbox </th>
    <td> Anybody can create a card (bug, feature request...) here through the <a href='http://galaxyproject.org/trello'>card creation form</a>. </td>
  </tr>
  <tr>
    <th> Bug Reports </th>
    <td> Reported errors and bugs are prioritized here after review. Number of votes affects the priority of a bug.</td>
  </tr>
  <tr>
    <th> In Progress </th>
    <td> Cards are moved into this list if someone actively works on the issue. </td>
  </tr>
  <tr>
    <th> Testing </th>
    <td> Bug is fixed and the fix is deployed at <a href='Test'>/src/Test/index.md</a>. Please test if you can. </td>
  </tr>
  <tr>
    <th> Complete and in central </th>
    <td> Cards here are committed in <a href='https://wiki.galaxyproject.org/Develop/Bitbucket'>galaxy-central</a> repository and are waiting for next distribution to be included in. </td>
  </tr>
  <tr>
    <th> In stable branch </th>
    <td> The bug is probably already fixed on the <a href='Main'>/src/Main/index.md</a> instance of Galaxy, committed in galaxy-central repository (branch <code>stable</code>) and is waiting for the next release to be included in <a href='https://wiki.galaxyproject.org/Develop/Bitbucket'>galaxy-dist</a>. </td>
  </tr>
</table>



## The Tool Shed Trello Board

Tool shed has its own board at [Tool Shed Issue Board](https://trello.com/b/vHqpKpZF/galaxy-tool-shed). To create a card in the [Tool Shed](/src/Tool Shed/index.md) Board please use the [creation form](http://galaxyproject.org/trello) - the card will be moved to the Tool Shed Board after a review.

## Security issues

Serious security problems should not be reported via Trello - please responsibly disclose these as explained in https://github.com/galaxyproject/galaxy/blob/dev/CONTRIBUTING.md .

<div class='right'><br /><a href='/src/Issues/FilterCardsButton.png'><img src="/src/Issues/FilterCardsButton.png" alt="Search for Issues" width="135" /></a></div>

## How to approach Trello

### How to Search

To search existing cards, *click* **Filter Cards** (on the right) and *enter* the text to search for.  The subset of cards that match the search terms is displayed as you type in the search terms.

 *Note: If you [are logged in](/src/Issues/index.md#create-an-account) you will see a search box at the top of the page.  Entering search terms there will not work.  (Why? That search box searches only boards that you have full editing capabilities on, while **Filter Cards** searches just the cards in this board.)*

### How to Create an Issue

1. First decide if it should be an issue, or it should be a [mailing list question](/src/MailingLists/index.md) instead.  The [Galaxy Trello Board](http://bit.ly/gxytrello) is for making feature requests and reporting software issues.  When in doubt, start with an email question on the [http://dev.list.galaxyproject.org/|Galaxy-Dev  mailing list](http://dev.list.galaxyproject.org/|Galaxy-Dev  mailing list) or a posting to the [Galaxy Biostar online forum](https://biostar.usegalaxy.org/).<br /><br />

1. Then [search the existing issues](/src/Issues/index.md#how-to-search) to see if the issue has already been recorded.  It it has, [add a comment](/src/Issues/index.md#how-to-add-a-comment) and/or [up-vote it](/src/Issues/index.md#how-to-vote).<br /><br />

1. <div class='right'><a href='http://galaxyproject.org/trello'><img src="/src/Issues/CreateIssue.png" alt="Create an issue" width="200" /></a></div> Finally, if you can't find the issue then go [to the Galaxy Trello card creation form](http://galaxyproject.org/trello), give the issue a descriptive, concise name, and please provide a **detailed description** of the issue.  [Mark](http://daringfireball.net/projects/markdown/basics/)[down](http://daringfireball.net/projects/markdown/basics/) is supported in the card description (but not the name).  *Click* **Submit Query** when you are done, and this will send your issue to the **Inbox** list in the  [Galaxy Trello Board](http://bit.ly/gxytrello) and we will handle it from there. :) By all means we appreciate your further involvement in the bug removal (you can provide comments, test possible fixes or even submit a [pull request](https://wiki.galaxyproject.org/Develop/Bitbucket) with a fix).

#### What to include in a bug report

1. Where you are using Galaxy ([Main](/src/Main/index.md), local, or cloud instance). 
1. Bug reports from [Test](/src/Test/index.md) are generally not sent
1. If a local or cloud instance, the distribution or galaxy-central hg pull #
1. The date/time the bug was detected
1. Exact steps to reproduce the issue
1. What troubleshooting steps (if any) you have tested out
1. If you can reproduce on [Main](/src/Main/index.md), you may be asked to send in a tool error report or share a history link. Use ***Options &rarr; Share or Publish***, generate the link, and email it directly back off-list. Note the problem dataset #'s. 
1. **IMPORTANT**: If data is involved, leave **all** of the related datasets in the analysis thread leading up to the bug in your history ***undeleted*** until we have responded to you. Use ***Options &rarr; Show Deleted Datasets*** and click dataset links to ***undelete*** to recover error datasets before reporting a bug if necessary. 

### How to Create a Feature Request

If you want to let us know about your great ideas regarding Galaxy please do! You can reach us at [http://dev.list.galaxyproject.org/|Galaxy-Dev mailing list](http://dev.list.galaxyproject.org/|Galaxy-Dev mailing list), IRC #galaxyproject at [freenode](http://webchat.freenode.net/?channels=#galaxyproject), or you can [create a card](http://galaxyproject.org/trello) on Galaxy Trello Board directly.

### How to Create an Account

You can browse, [search](/src/Issues/index.md#how-to-search) and [create issues](/src/Issues/index.md#create-an-issue) without a Trello login, but you won't be able to comment on or up-vote any existing issues.  To do that you will need an account.

*Click* on **Sign Up** in the upper right hand corner.  *Enter* your name, email, and a password, and *click* **Create New Account**.  Then go to your email account and follow the directions in your confirmation email to finalize your account creation.

Once you have created an account go back to the [Galaxy Trello Board](http://bit.ly/gxytrello) and *pin* the board to your header menu.  This will make it easy to navigate back to the Galaxy board in the future.  *Click* on **Options** (on the right hand side) and *select* **Pin to Header Menu**.

<div class='right'><br /><a href='/src/Issues/Vote.png'><img src="/src/Issues/Vote.png" alt="Up-vote the importance of an issue" width="200" /></a></div>

### How to Vote

You can indicate which issues are particularly important to you by *up-voting* them.  To do this, first click on the issue.  If the issue has been up-voted before then click on the ***n* votes** link at the top of the issue, and then *click* **Vote**.  If the issue has not yet received any votes then add the first vote (yours) by *clicking* **More...** (in the lower right hand corner) and then **Vote**.

<div class='right'><br /><a href='/src/Issues/AddComment.png'><img src="/src/Issues/AddComment.png" alt="Add a comment to an issue" width="150" /></a></div>
### How to Add a Comment

To add a comment to a card, first *click* on the card, and then *click* in the box at the top of the **Activity** list with your icon next to it.  Type away, and when you are done *click* **Comment**.  Voila, you have now contributed to a Galaxy issue description.
 
