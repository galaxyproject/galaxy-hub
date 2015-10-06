# Updates added to the last Galaxy Distribution listed below
These represent changes introduced after the initial release. May also be tracked in [Trello](https://trello.com/galaxyproject).<br />

[back to all News Briefs](/DevNewsBriefs)

## Review prior distribution

* [January 13, 2015 Galaxy Distribution News Brief](/DevNewsBriefs/2015_01_13)
* [January 13, 2015 Galaxy Distribution Summary](/News/2015_01_13_Galaxy_Distribution)


## New



## Improved
* Made installation of tool repositories more robust by setting time to "Epoch" instead of throwing server error when `repository_metadata.time_last_tested` is unset. [o09VBhr1](https://trello.com/c/o09VBhr1)
* Updated the [Tuxedo RNA-seq tools](http://cole-trapnell-lab.github.io/cufflinks/manual/) to version 2.2.1 and created new wrappers for Cuffquant and Cuffnorm. In the [Tool Shed](http://usegalaxy.org/toolshed) and installed on [http://usegalaxy.org](http://usegalaxy.org). [bfr0jKut](https://trello.com/c/bfr0jKut)
* Enhanced the `DataManagers` reference genome retrieval protocol to function better with UCSC's updated file naming/paths. Created a new `DataManager` for dbkeys/Genome Builds. Find these in the [Tool Shed](http://usegalaxy.org/toolshed). [kPkwDHmi](https://trello.com/c/kPkwDHmi) [pmd6gSS6](https://trello.com/c/pmd6gSS6)
* Change to allow anonymous users (those not logged into a Galaxy account) to view Pages with embedded Histories. [9Om6Odj2](https://trello.com/c/9Om6Odj2)



## Bug Fixes
* Fixed a GATK Evaluation Bug. [PXClb3PT](https://trello.com/c/PXClb3PT)
* Corrected an "over-sanitized" info message after renaming a history (html was displaying). [MtAQNOqC](https://trello.com/c/MtAQNOqC)
* Discovered and fixed issue with Paired list collection creator (key renaming broken). [QklilFk3](https://trello.com/c/QklilFk3)
* Fix for preventing non-admins from running Data Managers through the API.[EeHJP167](https://trello.com/c/EeHJP167)
* Egg-fetching related bugfixes. [9L0HlQ0u](https://trello.com/c/9L0HlQ0u)
* Fixes for resetting metadata on ToolShed Repositories. [lGmlkvdr](https://trello.com/c/lGmlkvdr)
* Small fixes for updated workflow scheduler. [fF7pUNIG](https://trello.com/c/fF7pUNIG)
* Change to use samtools version 1.x to generate BAM indexes if it is first in $PATH. [UOVlg7nL](https://trello.com/c/UOVlg7nL)
* Removed displayed paragraph tags from history/rename feedback messages [V4VMvDeY](https://trello.com/c/V4VMvDeY)
* Fixed Picard index Data Manager so that it no longer indicates failure (red dataset result in admin history) when it is actually successful. [b1cHiIw0](https://trello.com/c/b1cHiIw0)


## Security
* Various low-vulnerability-level security fixes. [U6yj2pPr](https://trello.com/c/U6yj2pPr)




<br /><br /><br />
[back to all News Briefs](/DevNewsBriefs)
<br /><br />
