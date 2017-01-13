Maintaining a Galaxy instance is important to do, something that cannot be understated. For security and bug fixes, it's recommended that you follow the [RSS feed](/src/news/index.md) or the [Mailing List](/src/MailingLists/index.md).

## General Update Procedures

Many admins update every 2-3 months, though update frequency largely depends on your local instance's needs (e.g. new Galaxy features your users will want) and how much disruption your user base will tolerate (in terms of downtime + UI changes, etc)

1. read release notes and look for possible breakage, security fixes, new features
1. `git pull`; production deployments should be updating from the `master` branch, by tracking that you can update from latest release to latest release.
1. backup Galaxy database (e.g. `pg_dump -U <username> <database> > galaxy-backup-$(date "+%s").sql`)
1. update Galaxy database if necessary (`sh manage_db.sh upgrade`)
1. search conflicts and resolve (check `git status`)
1. diff `config/galaxy.ini` and `config/galaxy.ini.sample` to check for possible new features/changes
1. in general all config files should be merged with the *.sample files
  * meld is a good graphical editor for this
  * some of us prefer something like `vimdiff`
1. run migration scripts (e.g. `sh ./scripts/migrate_tools/0011_tools.sh install_dependencies`)
1. Update all Tool Shed tools and install new useful ones (find new one on News Brief and release notes from the last month)
1. Write release notes and send to your user group

