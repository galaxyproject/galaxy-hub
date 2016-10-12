This page is not intended to be viewed directly.  Rather it contains several snippets of wiki markup that are then included on the [/Wiki Best Practices](/Wiki Best Practices) page inside tables.  Doing it this way makes the wiki markup much, much easier.

# GUI Interaction Raw Min
```
Go to Upload Tool under Get Data,
and enter the multiple URLs
into the URL / Text box. 
```
END_INCLUDE

# GUI Interaction Raw Better
```
*Navigate* to 
**Get Data &rarr; Upload Tool**
and *enter* the multiple URLs
into the **URL / Text** box. 
```
END_INCLUDE


# Shell Output Raw
```{
```
~/galaxy-dist$ sqlite3 database/universe.sqlite
SQLite version 3.6.16
Enter ".help" for instructions
Enter SQL statements terminated with a ";"
sqlite>
```

```
}END_INCLUDE

# Shell Output Shown
```
~/galaxy-dist$ sqlite3 database/universe.sqlite
SQLite version 3.6.16
Enter ".help" for instructions
Enter SQL statements terminated with a ";"
sqlite> 
```
END_INCLUDE

# Code Raw Min
```{
```
<tool id="get_flanks1" 
      name="Get flanks">
  <description>
    returns flanking region/s for genes
  </description>
  <command interpreter="python">
    get_flanks.py $input ...
  </command>
...
```

```
}END_INCLUDE

# Code Shown Min
```
<tool id="get_flanks1" 
      name="Get flanks">
  <description>
    returns flanking region/s for genes
  </description>
  <command interpreter="python">
    get_flanks.py $input ...
  </command>
... 
```
END_INCLUDE

# Code Raw Better
```{
```xml
<tool id="get_flanks1" 
      name="Get flanks">
  <description>
    returns flanking region/s for genes
  </description>
  <command interpreter="python">
    get_flanks.py $input ...
  </command>
...
```

```
}END_INCLUDE

# Code Shown Better
```xml
<tool id="get_flanks1" 
      name="Get flanks">
  <description>
    returns flanking region/s for genes
  </description>
  <command interpreter="python">
    get_flanks.py $input ...
  </command>
...
```
 END_INCLUDE
