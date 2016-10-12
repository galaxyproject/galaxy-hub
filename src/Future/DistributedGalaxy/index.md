Saving small snippets of the discussion for future reference:

---
Istvan:

I think the most important thing that we need to start thinking
about is the how to create a distributed computational system. Think
about a thousand users all wanting to start 10 queries. How do we do
it? How could we implement a demonstration prototype of  this in say
one month? It is doable if we keep things simple.

---

Rico: 

take a look at http://www.bx.psu.edu/~rico/galaxy

---

James: 

But what about if the front end is running on multiple nodes? Sharing
a BDB file over NFS is a _bad idea_ for this case. A database that
all the front ends can talk to gives more flexibility. It can
implement table/row level locking and other nice things to allow
multiple processes to keep their data synchronized easily.

I think we need to strike the right balance. Perhaps every query the
user is working on doesn't need to go to the database, they can be
stored in the users current session, but user accounts, saved
histories, and in general things that persist across multiple user
sessions should be stored in a way that can be easily shared across
many systems.

Also, a SQL database makes analysis of the data easy. When you want
to aggregate what sorts of queries users are running, how long the
take, et cetera it is very useful -- and we will want to do these
things.

At some point we're going to run up against the dreaded GIL, or some other limit with one server and one
python interpreter. We should plan to easily accomodate running N web
servers with M interpreters on each behind a session-affinity
preserving load balancer. Similarly, we may want to look at a less
thread heavy job queueing strategy so that expensive compute jobs can
be offloaded to other systems.

---

Istvan:

What both of you are proposing relies on sophisticated servers that
are needed to take care of buisness which is a very solid strategy and
some things can only be done that way.

But there is this other approach where every client is a lot more
independent, like bittorrent, or to a lesser extent seti@home,
architectures where simple systems can come together and become
substantially more efficient.

Where you could just start a "trusted" galaxy server anywhere in the
world, they would check in with a main server  so that it will be
forwarded new users,  while in the background synchronization
processes would start transferring the new data that gets entered into
them to a main repository. If this new system needs to be taken
offline it will notify the main server and would exit once all of  its
data is transferred all the while the main server would uppload the
data to someone else's system so that when the user comes back they
don't notice anything.

This is one of the reasons I'd like to see galaxy entirely self
contained and independent.

---

Rico :

The method used to store all of the "real" data (alignments,
sequences, annotation, etc.  what else?) can for the most part be
factored out of the discussion regarding the Web and Compute servers.

One solution is to separate the storage from the Web and Compute
servers.  In order to maintain scalability, and availability we could
go with something like Luster:  http://www.clusterfs.com.
Essentially, there would be another cluster dedicated to providing
access to the "real" data to the Web and Compute servers.  With this
architecture, and proper planning, the failure of a machine in the
infrastructure is non-fatal.  A failed Web, Compute, or Storage
server is simply replaced, or removed from service.

Another solution would be to use PVFS: http://www.pvfs.org/pvfs2.
This solution would distribute the data across all of the Nodes in
the Compute Cluster.  I'd have to look at pfvs again to intelligently
comment on it's fault-tolerance capabilities.  We wouldn't want a
failed Compute Node to prevent us from accessing some of the "real"
data.
