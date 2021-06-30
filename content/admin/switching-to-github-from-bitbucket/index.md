# Switching to Github from Bitbucket

Switching to Github from Bitbucket is a relatively easy process.

First identify the release you are on:

```
#! highlight sh
$ hg tags
tip                            17001:46a4ef8850b5
v15.05                         16999:c3cef260df88
latest_15.05                   16999:c3cef260df88
v15.03.2                       16991:bfd4635011e3
latest_15.03                   16991:bfd4635011e3
v15.03.1                       16709:9f40ff3e3fe1
v15.03                         16679:738f4ad0eb62
latest_2015.01.13              16677:5cdf5dc395f1
latest_2014.10.06              15576:782fa60fc654
latest_2014.08.11              15573:6d6d7f8b3217
latest_2014.06.02              15570:c52dc4c72b77
latest_2014.04.14              15567:b2c0570f52e1
latest_2014.02.10              15564:746db2bf4da0
latest_2013.11.04              15561:52a18b44474f
latest_2013.08.12              15558:db967a25c5db
latest_2013.06.03              15555:aae74ee09e46
release_2015.01.13             15516:2e8dd2949dd3
latest_2013.04.01              15488:dec9431d66b8
latest_2013.02.08              15485:b986c184be88
latest_2013.01.13              15482:9c323aad4ffd
release_2014.10.06             14747:2092948937ac
release_2014.08.11             14182:ca45b78adb41
release_2014.06.02             13657:7e257c7b10ba 
release_2014.04.14             13009:9e53251b0b7e 
release_2014.02.10             12395:5e605ed6069f 
release_2013.11.04             11192:26f58e05aa10 
release_2013.08.12             10384:1ae95b3aa98d
release_2013.06.03              9940:524f246ca853  
security_2013.04.08             9291:2cc8d10988e0  
release_2013.04.01              9230:75f09617abaa  
release_2013.02.08              8794:1c7174911392
release_2013.01.13              8530:a4113cc1cb5
```


So we are on v15.05, the git branch associated is release_15.05

Now do the following:

```
#! highlight sh
$ git init
$ git remote add origin https://github.com/galaxyproject/galaxy.git
$ git fetch --all
$ git reset --hard origin/release_15.05
```


If this went good you can now remove all the mercurial files.

```
#! highlight sh
$ rm -rf .hg .hgignore .hgtags
```
