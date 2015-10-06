<div class='right'>TABLE_OF_CONTENTS</div>
This wiki is implemented using the [MoinMoin](http://moinmo.in/) wiki software.  MoinMoin is a mature, full-featured and widely used wiki package.  It is also by far the most popular wiki package written in Python, the Galaxy ecosystem's language of choice.

A wiki is a web site that is meant to be both easy to read, and *easy to update*.  The goal of this wiki is to document all things Galaxy, and to encourage as much contribution from the Galaxy community as possible.  This wiki allows users to create logins and edit and add content.

This page has information on how to use this wiki.  It describes what you can do in MoinMoin, but not necessarily what you should do.  See [/Wiki Best Practices](/Wiki Best Practices) for our own local best practices and culture.

# MoinMoin Help

MoinMoin comes with extensive documentation on how to use it and update it.  Some useful links:

* [/HelpOnMoinWikiSyntax](/HelpOnMoinWikiSyntax) 
  * The default MoinMoin formatting syntax.  How to make your text **bold**, *italicized* and many other things.  
* [/HelpOnCreoleSyntax](/HelpOnCreoleSyntax) 
  * The details of Creole formatting syntax.  This is an alternative to the MoinMoin "wiki" syntax.  See also the [nwwl Macro](/HelpOnMacros/nwwl).  You will need it.  Pages can be either MoinMoin wiki or Creole, but not both.
* [/HelpForUsers](/HelpForUsers)
  * Other help for users beyond just the syntax.  [how to edit a page](/HelpOnEditing), [images](/HelpOnImages), [creating a new page](/HelpOnPageCreation), [setting your preferences](/HelpOnUserPreferences), and much more.
* [/WikiCourse](/WikiCourse)
  * A thorough introduction to MoinMoin
* [/HelpIndex](/HelpIndex)
* [/FindPage](/FindPage)

## Creole Markup

The default markup for this wiki is [MoinMoin's](/HelpOnMoinWikiSyntax).  However, you can also use [Creole](/HelpOnCreoleSyntax), which is what was used on the previous Galaxy Wiki.  However, on any single page you can only use one or the other. To use Creole, include this as the top line of the page:
```
#format text/creole
```


Things don't work quite as well with creole as they do with !MoinMoin syntax, but they work for most things.  See the [nwwl Macro](/HelpOnMacros/nwwl) if you are having trouble with extraneous BogusLinks (that point to non-existent pages) on your Creole pages.

## Attachments

Attachments include things like images, PDFs, and text files.  

### Where to Put Attachments

Attachments are, well, *attached* to a specific page.  They can be referenced from any page, not just the one they are attached to.  We have two suggested places for attaching files:

1. Attach them to the page that links to them.  
1. Attach them to the appropriate [/Images](/Images) or [/Documents](/Documents) page.

The first approach is simpler, but doesn't lend itself to reuse.  The second approach takes more work, but encourages attachment reuse.       

### Direct Linking to Attachments

The default behavior for attached files is slightly irritating.  For example,

| MoinMoin Wiki Markup |  Result  |  Comments  | 
| -------------------- | ------- | --------- | 
| `[[attachment:Events/GCC2011/AssemblyAndAnnotationUsingGalaxy.pptx|PowerPoint]]` |  [PowerPoint](ATTACHMENT_URLEvents/GCC2011/AssemblyAndAnnotationUsingGalaxy.pptx)  |  Goes to an intermediate page that requires another click to download the attachment.  | 

To get rid of that intermediate page and go direct to the download add `|do=get` to the end of the link:

| MoinMoin Wiki Markup |  Result  |  Comments  | 
| -------------------- | ------- | --------- | 
| `[[attachment:Events/GCC2011/AssemblyAndAnnotationUsingGalaxy.pptx|PowerPoint|&do=get]]` |  [PowerPoint|&do=get](ATTACHMENT_URLEvents/GCC2011/AssemblyAndAnnotationUsingGalaxy.pptx)  |  Goes straight to download.  | 

Some types of attachments, like PDFs are displayed directly in the wiki window by default.  To override that behavior, also add `|do=get` to the link.

# Local Extensions

Point to standard Macros and then enumerate local macros, and CSS here.

## Macros

MoinMoin comes with many *[macros](/HelpOnMacros)*.  Macros are shortcuts for doing something in a wiki.  This wiki contains all the [standard macros](/HelpOnMacros), plus some from the [MoinMoin Macro Market](http://moinmo.in/MacroMarket), and some custom local ones as well.  The last two types are described here.

| Macro |  Description  |  Example  | 
| ----- | ------------ | -------- | 
| [span](/HelpOnMacros/span) |  Applies a predefined CSS class (see [CSS below](#css)) to a *span of text*. Care must be taken not to cross HTML blocks. |   | 
| [div](/HelpOnMacros/div) |  Applies a predefined CSS class to an *HTML block*.  Care must be taken so these are not terminated in the middle of HTML block.  These can also be nested.  |   | 
| [nwwl](/HelpOnMacros/nwwl) |  MoinMoin's [Creole Parser](/HelpOnCreoleSyntax) incorrectly converts all sorts of non-WikiName words to links, and often does not handle the Creole WikiName escape character correctly either.  When working in Creole, wrap words that you don't want to be links in this macro.  |  `<<nwwl(BLAST) IT!>>`  | 

## CSS

*Cascading Style Sheets, or CSS,* are a way to set how something appears on a web page.  This wiki allows you to apply predefined CSS classes to tables, table rows, table cells, and to spans of text and HTML blocks.

### Applying CSS

If you are using MoinMoin markup (versus Creole markup - see [/Wiki Best Practices](/Wiki Best Practices)) CSS can be applied to tables or parts of them with these notations:

* `<class="...">` will put that CSS class into cell (td) html
* `<rowclass="...">` will put that CSS class into row (tr) html
* `<tableclass="...">` will put that class into table (table) html
* `<id="...">` will put that CSS id into cell (td) html
 
CSS can be applied to text spans and HTML blocks using the [span and div macros (see above)](#macros).

### Predefined CSS Classes

This wiki does not allow you to specify arbitrary CSS styling in pages.  You can, however, use any of these predefined CSS classes on pages:

| Class |  Description  |  Example  |  Effect  | 
| ----- | ------------ | -------- | ------- | 
| `red`, `green`, `blue`  |  Set the background to red, green, or blue.  |  `This shows the <<span(red)>>red<<span>>,` `<<span(green)>>green<<span>>,` `and <<span(blue)>>blue<<span>> classes.`  |  This shows the <<span(red)>>red<<span>>, <<span(green)>>green<<span>>, and <<span(blue)>>blue<<span>> classes.  | 
| `th` |  Specify that a table row or table cell is a table header ("th" in HTML).  |  `||<rowclass="th"> Class || Description || Example ...`  |  See top of this table.  | 
| `solid`, `dashed`, `dotted` |  Create a border around an HTML block that is solid, dashed or dotted.  |  `<<div(solid)>>A solid border<<div>>`<br />`<<div(dashed)>>A dashed border<<div>>`<br />`<<div(dotted)>>A dotted border<<div>>`  |  <div class='solid'>A solid border</div><div class='dashed'>A dashed border</div><div class='dotted'>A dotted border</div>  | 
| `center` |  Center the text in an HTML block in the middle of the page/enclosing block.  |  `<<div(center)>>Centered!<<div>>`<br />`Not in the center at all.`  |  <div class='center'>Centered!</div>Not in the center at all.  | 
| `right` |  Float an HTML block to the right side of the page.  |  `<<div(right)>><<div(solid)>>I'm right!<<div>><<div>>` `A bit of text to demonstrate` `what a floating right block` `looks like. This also shows` `nested calls to the div macro.`  |  <div class='right'><div class='solid'>I'm right!</div></div> A bit of text to demonstrate what a floating right block looks like. This also shows nested calls to the div macro.  | 
| `title` |  Used at top of a page to display a title string on it.  Titles are slightly larger than "=" section headers, and do not appear in the Table of Contents for the page.  |  `<<div(title)>>Wiki Help<<div>>`  |  <div class="title">Wiki Help</div>  | 
| `indent` |  Indent a section  |  `Unindented.`<br />`<<div(indent)>>Indented<<div>>`  |  Unindented.<br /><div class='indent'>Indented</div>  | 

Other CSS classes can be defined.  If you want something please send a request to [outreach@galaxyproject.org](Galaxy Outreach).

## InterWiki

This wiki supports InterWiki links.  In addition to the standard InterWiki links that come with MoinMoin, we have added a few:

### Mailing List Links
<table>
  <tr>
    <td> <code>devthread:</code> </td>
    <td> Links to a post in the <a href='http://dev.list.galaxyproject.org/|Galaxy-Dev mailing list archive'>http://dev.list.galaxyproject.org/|Galaxy-Dev mailing list archive</a> </td>
  </tr>
  <tr>
    <td> <code>userthread:</code> </td>
    <td> Links to a post in the <a href='http://user.list.galaxyproject.org/|Galaxy-User mailing list archive'>http://user.list.galaxyproject.org/|Galaxy-User mailing list archive</a> </td>
  </tr>
  <tr>
    <td> <code>announcethread:</code> </td>
    <td> Links to a post in the <a href='http://announce.list.galaxyproject.org/|Galaxy-Announce mailing list archive'>http://announce.list.galaxyproject.org/|Galaxy-Announce mailing list archive</a> </td>
  </tr>
  <tr>
    <td> <code>francethread:</code> </td>
    <td> Links to a post in the <a href='http://france.list.galaxyproject.org/|Galaxy-France mailing list archive'>http://france.list.galaxyproject.org/|Galaxy-France mailing list archive</a> </td>
  </tr>
</table>


### Source Code Links
<table>
  <tr>
    <td> <code>src:</code> </td>
    <td> Links to a source file at <a href='https://github.com/galaxyproject/galaxy/tree/master/|Bitbucket'>https://github.com/galaxyproject/galaxy/tree/master/|Bitbucket</a> </td>
  </tr>
  <tr>
    <td> <code>srcdoccentral:</code> </td>
    <td> Links to source code documentation for the Galaxy development branch at <a href='https://galaxy-central.readthedocs.org/en/latest/|ReadTheDocs'>https://galaxy-central.readthedocs.org/en/latest/|ReadTheDocs</a> </td>
  </tr>
  <tr>
    <td> <code>srcdocdist:</code> </td>
    <td> Links to source code documentation for the latest Galaxy release at <a href='https://galaxy-dist.readthedocs.org/en/latest/|ReadTheDocs'>https://galaxy-dist.readthedocs.org/en/latest/|ReadTheDocs</a> </td>
  </tr>
</table>


### Links to Main

<table>
  <tr>
    <td> <code>main:</code> </td>
    <td> Link to <a href='/Main.md'>/Main.md</a>'s <a href='https://usegalaxy.org/|landing page'>https://usegalaxy.org/|landing page</a>. </td>
  </tr>
  <tr>
    <td> <code>Data_Libraries:</code> </td>
    <td> | Link to <a href='/Main.md'>/Main.md</a>'s <a href='https://usegalaxy.org/library/|Data Library list'>https://usegalaxy.org/library/|Data Library list</a>. </td>
  </tr>
  <tr>
    <td> <code>Published_Histories:</code> </td>
    <td> | Link to <a href='/Main.md'>/Main.md</a>'s <a href='https://usegalaxy.org/history/list_published|Published Histories list'>https://usegalaxy.org/history/list_published|Published Histories list</a> </td>
  </tr>
  <tr>
    <td> <code>Published_Workflows:</code> </td>
    <td> | Link to <a href='/Main.md'>/Main.md</a>'s <a href='https://usegalaxy.org/workflow/list_published|Published Workflows list'>https://usegalaxy.org/workflow/list_published|Published Workflows list</a> </td>
  </tr>
  <tr>
    <td> <code>Published_Visualizations:</code> </td>
    <td> | Link to <a href='/Main.md'>/Main.md</a>'s <a href='https://usegalaxy.org/visualization/list_published|Published Visualizations list'>https://usegalaxy.org/visualization/list_published|Published Visualizations list</a> </td>
  </tr>
  <tr>
    <td> <code>Published_Pages:</code> </td>
    <td> | Link to <a href='/Main.md'>/Main.md</a>'s <a href='https://usegalaxy.org/page/list_published|Published Pages list'>https://usegalaxy.org/page/list_published|Published Pages list</a> </td>
  </tr>
</table>


### Other

<table>
  <tr>
    <td> <code>trello:</code> </td>
    <td> Link to the <a href='https://trello.com/b/75c1kASa/galaxy-development|Galaxy Issues Trello board'>https://trello.com/b/75c1kASa/galaxy-development|Galaxy Issues Trello board</a>.  Use the complete URL to link to a specific card on that board. </td>
  </tr>
  <tr>
    <td> <code>toolshedview:</code> </td>
    <td> Link to a page in the Galaxy <a href='/Tool Shed.md'>/Tool Shed.md</a>, usually a repository </td>
  </tr>
  <tr>
    <td> <code>pmid:1234567</code> </td>
    <td> Links to the <a href='http://www.ncbi.nlm.nih.gov/pubmed/|PubMed page'>http://www.ncbi.nlm.nih.gov/pubmed/|PubMed page</a> for the given ID. </td>
  </tr>
  <tr>
    <td> <code>gmod:</code> </td>
    <td> Links to a page at the <a href='http://gmod.org/wiki/|GMOD wiki'>http://gmod.org/wiki/|GMOD wiki</a> </td>
  </tr>
</table>



# Best Practices

This wiki has [best practices](/Wiki Best Practices).

# Theme

This wiki uses a modified version of the [Mandarin theme](http://moinmo.in/ThemeMarket/Mandarin).  The structural elements are largely the same, but many details like colors and fonts have been modified.
