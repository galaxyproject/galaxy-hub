---
title: Galaxy wrappers for NCBI BLAST+ BoF
slug: events/gcc2013/bof/galaxy-blast
---
## Table of contents

* [When and Where](#when-and-where)
* [Who is Participating](#who-is-participating)
* [Questions?](#questions)
* [Results](#results)

## When and Where

The [time and location](/events/gcc2013/bof/#bof-schedule) for this BoF will be lunch time on "Day 1" (Monday 1 July) in the Cantina.

## Who is Participating

If you are interested, please add your name below and/or send an email to \[Peter Cock]\(mailto:p.j.a.cock AT googlemail DOT com).

* Peter Cock
* Jim Johnson
* John Chilton
* Nicola Soranzo
* Bjoern Gruening

## Questions?

Send them to  \[Peter Cock]\(mailto:p.j.a.cock AT googlemail DOT com).

## Results

The developers present were all happy with git and hg as choices, but agreed that Peter will setup a dedicated repository on github (a move to hg/bitbucket in the future is possible if this becomes desirable with future Tool Shed developments). From here it will be easier for him to handle pull requests for future additions.

See https://github.com/peterjc/galaxy\_blast/

Updating the BLAST+ version being wrapped is desirable, Peter is hoping 2.2.29+ comes out in the next month or so which would be ideal timing (barring any regressions). This will enable us to include the hit descriptions in the tabular output.

Regarding the -remote option to run searches on the NCBI servers, we discussed the negative implications for reproducibility. Given many of the BLAST options availability changes if this option is used, a second set of wrappers using the Remote calls might be preferable. We can minimise code duplication using the new macro support.

On obstacle to full test coverage is using local BLAST databases, which may require implementing upload support for these datatypes. Some of the compound datatypes used in R-Genetics may be useful guides.
