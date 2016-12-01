 <<Include(Admin/LinkBox)>> 

# Admin Interface

This page contains information about the features available to Galaxy "admin" users.

## Setup admin user

To give a Galaxy user admin privileges you have to add their Galaxy login ( email ) to the Galaxy configuration file <tt>universe_wsgi.ini</tt> or <tt>config/galaxy.ini</tt>. If the file does not exist yet you can create it from the provided sample (<tt>config/galaxy.ini.sample</tt>). Make sure you rename it. Note that you have to restart Galaxy after modifying the configuration for changes to take effect. Also make sure you don't specify it twice - the line with <tt>admin_users</tt> is already present in every sample config and should be there only once.

```
# this should be a comma-separated list of valid Galaxy users
admin_users = user1@example.com,user2@example.com
```

When an admin user logs into Galaxy, they will see an "Admin" menu item in the top Galaxy menu bar which will take them to the Galaxy Admin page with an administration panel that looks like the picture below. Note that not all the options have to be present as some of them depend on the configuration of your Galaxy.

<<div(left)>> ![](Admin/Interface/admin_panel_galaxy.png)<<div>>

#### Security

- Manage users 
- Manage groups 
- Manage roles 
- Manage users API keys 

#### Data

- [Manage quotas](Admin%2FDiskQuotas) 
- [Manage data libraries](Admin%2FDataLibraries%2FLibraries) 
- Manage local data (beta) 

#### Server

- View data types registry 
- View data tables registry 
- View tool lineage 
- Reload a tool's configuration 
- Profile memory usage 
- Manage jobs 
- Review tool migration stages 
- Monitor installing tool shed repositories 
- Reset metadata for tool shed repositories 
- Manage installed tool shed repositories 

#### Tool sheds

- Search and browse tool sheds Here you can install public tools form the connected Tool Sheds. Plese see more information on [how to install tools into Galaxy](Admin%2FTools%2FAddToolFromToolShedTutorial). 

#### Form definitions

- Manage form definitions 

#### Sample tracking

- Manage sequencers and external services 
- Manage request types 
- Sequencing requests 
- Find samples 
