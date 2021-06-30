# Galaxy Maintenance

Maintaining a Galaxy instance is important to do, something that cannot be understated. 

## Security Notices

If you maintain a [public instance of Galaxy](/src/use/index.md) it is recommended to sign up for the public servers [mailing list](https://lists.galaxyproject.org/lists/galaxy-public-servers.lists.galaxyproject.org/) to receive security fixes with priority. Also consider adding your instance to the [Galaxy Platform Directory](/src/use/index.md) so more people can discover it.

## General Update Procedures

Many admins update to each new release, though update frequency largely depends on your local instance's needs (e.g. new Galaxy features your users will want) and how much disruption your user base will tolerate (in terms of downtime + UI changes, etc)

1. Read [release notes](/src/docs/index.md#releases) and look for possible breakage, security fixes, new features,
1. Update code to the chosen release branch (release_17.01 here).
 * New Galaxy repository: `$ git clone -b release_17.01 https://github.com/galaxyproject/galaxy.git`
 * Update of existing repository: `$ git checkout release_17.01 && git pull --ff-only origin release_17.01`
1. Run `./scripts/common_startup.sh` before restarting the server to update Galaxy's virtualenv
1. (when prompted) Update Galaxy database
 * Backup Galaxy database (e.g. `pg_dump -U <username> <database> > galaxy-backup-$(date "+%s").sql`).
 * Migrate your DB with `sh manage_db.sh upgrade`.
1. Search conflicts and resolve (check `git status`),
1. Diff `config/galaxy.ini` and `config/galaxy.ini.sample` to check for possible new features/changes,
1. In general all config files should be merged with the *.sample files.
  * meld is a good graphical editor for this
  * some of us prefer something like `vimdiff`
1. (when prompted) Run tool migration scripts (e.g. `sh ./scripts/migrate_tools/0011_tools.sh install_dependencies`).
1. Notify your user group and share the release notes.
