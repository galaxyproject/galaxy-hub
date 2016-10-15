PLACEHOLDER_INCLUDE(../../../Develop/LinkBox)
Application level logging is stored to the database in the table "event". 

This table contains 6 fields:
<table>
  <tr>
    <th> Column</th>
    <th> Type</th>
    <th> Modifiers</th>
    <th> Description </th>
  </tr>
  <tr>
    <td> id</td>
    <td> integer</td>
    <td> not null default nextval('event_id_seq'::regclass)</td>
    <td> Unique ID</td>
  </tr>
  <tr>
    <td> create_time</td>
    <td> timestamp without time zone</td>
    <td> default now()</td>
    <td> Created Time</td>
  </tr>
  <tr>
    <td> update_time</td>
    <td> timestamp without time zone</td>
    <td> default now()</td>
    <td> Last Update Time</td>
  </tr>
  <tr>
    <td> history_id</td>
    <td> integer</td>
    <td> </td>
    <td> ID of history that is loaded at the time</td>
  </tr>
  <tr>
    <td> user_id</td>
    <td> integer</td>
    <td> </td>
    <td> ID of user that is performing action to be logged</td>
  </tr>
  <tr>
    <td> message</td>
    <td> character varying(1024)</td>
    <td> </td>
    <td> Message of action that is logged</td>
  </tr>
</table>

 
 Indexes:
     "event_pkey" PRIMARY KEY, btree (id)
 Foreign-key constraints:
     "event_user_id_fkey" FOREIGN KEY (user_id) REFERENCES galaxy_user(id)



This table can be queried using standard SQL queries. user_id and history_id can be used to track individual users and their histories, and are foreign keys to the galaxy_user and history tables.

The message field contains actual event descriptions.  Below are the current messages and a brief description.
<table>
  <tr>
    <th> Message</th>
    <th> Description</th>
  </tr>
  <tr>
    <td> 'Async dataid -> %s' % data_id</td>
    <td> When an asynchronous tool is run, this logs the assigned data id</td>
  </tr>
  <tr>
    <td> 'Async executing tool %s' % tool.id</td>
    <td> When an asynchronous tool is run, this logs the tool ID</td>
  </tr>
  <tr>
    <td> 'Async error -> %s' % STATUS</td>
    <td> When an asynchronous tool is run, and an error occurs, this logs the status reported by the external application</td>
  </tr>
  <tr>
    <td> "Async connecting to -> %s" % url</td>
    <td> When an asynchronous tool is run, and the data is ready, this logs the url retrieved</td>
  </tr>
  <tr>
    <td> "User change password"</td>
    <td> Occurs when a user changes their password</td>
  </tr>
  <tr>
    <td> "User change email"</td>
    <td> Occurs when a user changes their email</td>
  </tr>
  <tr>
    <td> "User logged in"</td>
    <td> Occurs when a user logs in</td>
  </tr>
  <tr>
    <td> "User logged out"</td>
    <td> Occurs when a user logs out</td>
  </tr>
  <tr>
    <td> "User new"</td>
    <td> Occurs when a new user is created</td>
  </tr>
  <tr>
    <td> "User reset password: %s" % email</td>
    <td> Occurs when a user resets their password, records the email that the new password is sent to</td>
  </tr>
  <tr>
    <td> "Proxy Error -> %s" % str(exc)</td>
    <td> If UCSC proxy encounters an error, this logs the exception</td>
  </tr>
  <tr>
    <td> "Data view: %s" % str(id)</td>
    <td> When a user view (downloads) a dataset, the data id is recorded</td>
  </tr>
  <tr>
    <td> "Data view as BED: %s" % str(id)</td>
    <td> When a user views a dataset as bed (usually as custom track at UCSC, the data id is recorded</td>
  </tr>
  <tr>
    <td> "Data edit complete: %s" % str(id)</td>
    <td> When a user edits a dataset attributes (name, strand, etc.), the data id is recorded</td>
  </tr>
  <tr>
    <td> "Data edit view: %s" % str(id)</td>
    <td> When a user views a dataset attributes (name, strand, etc.), the data id is recorded</td>
  </tr>
  <tr>
    <td> "Data delete: %s" % str(id)</td>
    <td> When a user (without javascript) deletes a dataset the data id is recorded</td>
  </tr>
  <tr>
    <td> "Data delete async: %s" % str(id)</td>
    <td> When a user (with javascript) deletes a dataset the data id is recorded</td>
  </tr>
  <tr>
    <td> "History delete: %s" % str(hid)</td>
    <td> When a user deletes a history the history id is recorded</td>
  </tr>
  <tr>
    <td> "History clear"</td>
    <td> Occurs when a user clears a history.</td>
  </tr>
  <tr>
    <td> "History share: %s to %s" % (str(history.id),str(new_history.id))</td>
    <td> When a user shares a history, the history ids of the original and the shared history is recorded.</td>
  </tr>
  <tr>
    <td> "History view available"</td>
    <td> Occurs when a user views their available stored histories.</td>
  </tr>
  <tr>
    <td> "History import: %s" % str(new_history.id)</td>
    <td> When a user imports a history, this records the id of the newly imported history.</td>
  </tr>
  <tr>
    <td> "History switch" </td>
    <td> Occurs when a user switches between saved histories</td>
  </tr>
  <tr>
    <td> "History new"</td>
    <td> Occurs when a user creates a new history.</td>
  </tr>
  <tr>
    <td> "History stored"</td>
    <td> Occurs when a user saves a history.</td>
  </tr>
  <tr>
    <td> "History renamed: %s" % str(histories[i].id)""</td>
    <td> When a history is renamed, the id of the renamed history is recorded.</td>
  </tr>
  <tr>
    <td> "History added to: %s to %s" % (str(data.id),str(history_id))</td>
    <td> When a dataset is added to a history through an external web post (as in LAJ), the data id and history id is recorded.</td>
  </tr>
  <tr>
    <td> "Tool id '%s' does not exist" % tool_id</td>
    <td> Occurs when a tool id is passed to tool_runner, but doesn't exist ()</td>
  </tr>
  <tr>
    <td> "Tool View: %s; %s" % (str(tool),str(params))</td>
    <td> Called every time that a tool page is viewed.  Records the tool that is viewed and the parameters that have been set at that particular view; previously existing parameters are pickled and stored as the parameter tool_state.</td>
  </tr>
</table>

