---
pagetitle: 2015, /, 07, :,  Moving from MySQL to PostgreSQL
---




<div class='logbox'>
 Topic:: **[Moving from MySQL to PostgreSQL.](/Community/Log/2015/MySQL2PostgreSQL)**
 Date:: 2015/07/30
 Who:: [Hans-Rudolf Hotz](/HansrudolfHotz)
 Resolution:: It is pretty simple, though you might hit some obstacles depending on how old your MySQL server is and how much you have manually interfered with the database.
 Deployment:: [Galaxy server at the FMI](/Community/Deployment/GalaxyAtFMI)
</div>
After running our Galaxy servers successfully with MySQL as the backend database server for several years, we decided to switch to the recommended PostgreSQL server.

## Summary

I used the tool [py-mysql2pgsql](https://pypi.python.org/pypi/py-mysql2pgsql) to generate table dumps from our MySQL database. I then imported table by table into an empty by Galaxy created PostgreSQL database. After setting the "sequences", the database was ready to go.

## Learning PostgreSQL

Our institute used mostly MySQL. At the start, I also had hardly any experience with PostgreSQL, and I gradually had to learn everything. On top of using google searches, this book helped me a lot: [PostgreSQL: Up and Running](http://shop.oreilly.com/product/0636920025061.do) by Regina Obe and Leo Hsu. I installed a few test galaxy servers from scratch using PostgreSQL as their backend database trying to learn the basics of PostgreSQL and the 'quirks' of the Galaxy database schema. I wished, I had knew about the nice [page generated with SchemaSpy](https://galaxyproject.org/schema/SchemaSpy/index.html) presented by [Dave Clements](https://wiki.galaxyproject.org/DaveClements) at [GCC 2015](http://gcc2015.tsl.ac.uk/training-day/#The_Galaxy_Database_Schema), when I started my journey.

I quickly realized a simple dump table from MySQL and load them into PostgreSQL will not work. The database schema could not be converted one to one from MySQL to PostgreSQL and the contents of the table could not be dumped and loaded one to one from MySQL to PostgreSQL (a simple example: MySQl stores boolean as '0' or '1', PostgreSQL as 'f' or 't') .

## Preparations for the Move

To make sure, the new PostgreSQL database had the correct schema, I set up a new Galaxy server from scratch, using the same release as our production server was running at the time ([15.03](http://galaxy.readthedocs.org/en/master/releases/15.03_announce.html)), and pointing to a new, empty PostgreSQL database. By starting the new Galaxy server, the 128 migration steps were executed, and the PostgreSQL database was populated with 156 empty (see also below) tables. 

I used the tool [py-mysql2pgsql](https://pypi.python.org/pypi/py-mysql2pgsql) to generate table dumps from our MySQL database. By default, [py-mysql2pgsql](https://pypi.python.org/pypi/py-mysql2pgsql) imports the data into a  PostgreSQL database, but if you provide a file name (e.g. "mysql2pgsql.txt") in the required "mysql2pgsql.yml" file, the output goes to the "mysql2pgsql.txt" file. This file contains all the commands to create a PostgreSQL database, based on the information from the MySQL database. Since I was only interested in the loading data (or rather "COPY") parts, I used a simple perl script to parse "mysql2pgsql.txt" to get the "COPY" statements for all table which had data in.

```

#!/usr/bin/perl

use warnings;
use strict;

my $file = "mysql2pgsql.txt";

open(DUMP, $file); 

my $control = 0;
my $newfile; 
while ( <DUMP> ) {

	if ($_ =~ /^COPY \"(.*)\" \(/) {
		$newfile = "mysql2pgsql.".$1.".txt";
		print $newfile."\n";
		open(OUT,">$newfile");
		print OUT $_;
	}	
	if ($_ =~ /<sup>[0-9]/ || $_ =~ /</sup>Galaxy/) {
		print OUT $_;
		$control++;

	}	
	if ($_ =~ /^\\\./) {
		print OUT $_;	
		close OUT;
		if ($control == 0) {
			system("rm -f $newfile");
		}
		$control =0;
	}
}
close DUMP;
```


This script generated 81 copy statements for the database used for our production server. 

## Loading the Data

As a PostgreSQL novice coming from the simple world of MySQL MyISAM tables, I had to learn how to deal with foreign keys. There were probably better ways to do this, but I decided to figure out the insertion order myself. Nowadays, I would check this [page for the insertion order](https://galaxyproject.org/schema/SchemaSpy/insertionOrder.txt) or deactivate the keys table by table (see [this question/answer](http://www.postgresql.org/message-id/4EA2057F.3000002@ringerc.id.au)) or "DROP" all keys first and "ADD" the constraints back after loading all the data.

I could "COPY" the data for all tables without any problems. But before the database was ready to go, I had to set the "sequences" (see [here for an explanation](http://stackoverflow.com/questions/9108833/postgres-autoincrement-not-updated-on-explicit-id-inserts)). At this point, I didn't know, which tables had such an autoincrement feature. In order to figure out, I created a complete database dump from the PostgreSQL database with [pg_dump](http://www.postgresql.org/docs/9.4/static/app-pgdump.html) using the options "-f postgresql.dump" (send output to this file) and "-F p" (plain text). In the file "postgresql.dump", I searched for the "SEQUENCE" command and created for each a "SELECT setval" statement with the following perl script:

```

#!/usr/bin/perl

use warnings;
use strict;

my $file = "postgresql.dump";

open(DUMP, $file); 

my $control = 0;
my $newfile = "fix_sequence.txt";

open(FIX, ">$newfile"); 

while ( <DUMP>) {

	if ($_ =~ /^CREATE SEQUENCE ((.*)_id_seq)/) {
		my $sequence = $1;
		my $table = $2;
		print FIX "SELECT setval('".$sequence."', (SELECT MAX(id) from \"".$table."\"));";
		print FIX "\n\n";
	}
}

close DUMP;
close FIX;
```


I only used the "SELECT setval" commands for tables I loaded with data before.


## Problems I was running into

##### circular foreign keys

I run into three circular foreign key constraints in the (empty) PostgreSQL database:

* workflow <-> stored_worflow (see: [workflow](https://galaxyproject.org/schema/SchemaSpy/tables/workflow.html))
* library_dataset <-> library_dataset_dataset_association <-> history_dataset_association_dataset (see: [library_dataset_dataset_association.html](https://galaxyproject.org/schema/SchemaSpy/tables/library_dataset_dataset_association.html)
* form_definition <-> form_definition_current (see: [form_definition](https://galaxyproject.org/schema/SchemaSpy/tables/form_definition.html))

I solved it by dropping the constraint, uploading the data, and recreating the foreign key, eg:
```
ALTER TABLE workflow DROP CONSTRAINT workflow_stored_workflow_id_fkey;

# 'COPY' workflow table
# 'COPY' stored_workflow table

ALTER TABLE ONLY workflow ADD CONSTRAINT workflow_stored_workflow_id_fkey FOREIGN KEY (stored_workflow_id) REFERENCES stored_workflow(id);
```


```
ALTER TABLE library_dataset DROP CONSTRAINT library_dataset_dataset_association_id_fk;

# 'COPY' library_dataset table

ALTER TABLE library_dataset_dataset_association DROP CONSTRAINT history_dataset_association_dataset_id_fkey;

# 'COPY' library_dataset_dataset_association table
# 'COPY' history_dataset_association table

ALTER TABLE ONLY library_dataset ADD CONSTRAINT library_dataset_dataset_association_id_fk FOREIGN KEY (library_dataset_dataset_association_id) REFERENCES library_dataset_dataset_association(id);

ALTER TABLE ONLY library_dataset_dataset_association ADD CONSTRAINT history_dataset_association_dataset_id_fkey FOREIGN KEY (copied_from_history_dataset_association_id) REFERENCES history_dataset_association(id);
```


```
ALTER TABLE form_definition DROP CONSTRAINT form_definition_form_definition_current_id_fkey;

# 'COPY' form_definition table
# 'COPY' form_definition_current table

ALTER TABLE ONLY form_definition ADD CONSTRAINT form_definition_form_definition_current_id_fkey FOREIGN KEY (form_definition_current_id) REFERENCES form_definition_current(id);
```



##### tables already filled by galaxy
Obviously, as part of the database generation the table "migrate_version" had already been filled in my case:
```
=#select * from migrate_version;
 repository_id |     repository_path      | version 
---------------+--------------------------+---------
 Galaxy        | lib/galaxy/model/migrate |     128
(1 row)
```

The "kombu_queue" table was also not empty: 
```
=# select * from kombu_queue;
 id |     name     
----+--------------
  1 | control.main
(1 row)
```


In both cases, the contents was equal to the contents from the dump out of the existing MySQL database.

The "migrate_tools" table is also pre-filled:
```
=# select * from migrate_tools;
 repository_id |           repository_path            | version 
---------------+--------------------------------------+---------
 GalaxyTools   | lib/tool_shed/galaxy_install/migrate |       1
(1 row)
```


In the our current MySQl databes, the version was '12'. The version had to be set to '12' in the new PostgrSQL database, otherwise it would cause troubles when re-starting the Galaxy server.


##### legacy from manual interfering
Our Galaxy instance is pretty old, and hence over the course of the last seven years, I have several times manually fixed some tables in the MySQL database. The biggest intervention, happened, when we switched to external authentication. Several users who used the Galaxy server before and after this switch ended up with two different entries in the galaxy_user table by not using the same e-mail address before, as now returned by the LDAP server (you run into similar issues, when a user asks for a different e-mail address, and the IT folks do not create an alias, but change the entry). Basically, this creates a duplication in the "galaxy_user" table.

At the time, most cases were easy to fix: delete the new user (i.e. the user created with the e-mail address coming from the LDAP server) and change the email address of the existing user, before the *new* user executes any jobs. However, in one case I must have messed up something and now the foreign key constraints in PostgreSQL were complaining. I had to re-enter a *dummy user* into the "galaxy_user" and "role" and add several rows into the "history" table before I could upload the data into the new PostgreSQL database.


##### difference between development and production server
I first tested the transition process with our development server. Although, we are trying to keep the development and production server as similar as possible, some features have never been used in the development or in the production server. This has resulted in tables which were empty in the database for the development and populated in the database for the production server - or vice versa.  So I had to adjust the my insertion order.


## Final Step

As the final step, I had to change the database setting in the "galaxy.ini" (well, "universe_wsgi.ini" for our old instance) and "reports_wsgi.ini" files, and restart the server.

I am sure there are better and easier ways to do this, but the process worked for me. Feel free to contact [me](/HansrudolfHotz), if you have any questions or want to do such a migration for your Galaxy server as well.



=   =
CategoryLog
