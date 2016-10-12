---
pagetitle: GCC2013 Training Day
---
PLACEHOLDER_INCLUDE(/Events/GCC2013/Header)



PLACEHOLDER_INCLUDE(/Events/GCC2013/LinkBox)
<div class='right'><a href='/Events/GCC2013/TrainingDay'><img src='/Images/Logos/GCC2013TrainingDayLogo300.png' alt='Training Day' width="200" /></a></div>

# Introduction to tools and data sources

## Presenters: Dan Blankenberg and Ross Lazarus

### Summary

As an administrator of your own local Galaxy, you can extend Galaxy by writing new tools and adding them to the tool panel for your users to use. There are a few things you need to do to make them work. In the simplest possible case, you need to prepare some XML and make your Galaxy read it in at startup when it reads and parses tool_conf.xml. Each tool must include a unique tool id, a visible name, a version number and a command line template. In addition, they can also include multiple tool form parameters with labels, validation and help, outputs, tests, dependency/version requirements. Galaxy uses these to set up the tool list and each selected tool's user interface form. 

*Note: there's actually a configuration setting in universe_wsgi.ini controlling which tool_conf.xml files are read. The default is
```
tool_config_file = tool_conf.xml,shed_tool_conf.xml
```

so you can use multiple tool configuration patterns if you ever need to*

**In summary, the essence of the entire 2 hour session is that to create a new tool for your users, you need to**

* ensure the executable is available to the execution host (your own VM/login in the workshop)

* write some valid XML in a text file to describe your new tool and put it somewhere under tools/

* edit tool_conf.xml to tell Galaxy where that XML file can be found - leave out the path .../tools/

* restart Galaxy to make the new tool available

## Helpful links
* http://wiki.galaxyproject.org/Admin/Tools/Add%20Tool%20Tutorial
* http://wiki.galaxyproject.org/Admin/Tools/ToolConfigSyntax
* http://www.cheetahtemplate.org/

## 12:30-12:40 Introduction to making a new tool for your Galaxy

* Introduce presenters and circulating tutors
* Scope of the session - start with simplest possible tool.
* Add complexity in the form of one useful tool feature at a time.
* Offer a series of examples covering a wide range of common tool requirements.
* We'll work as far as we can get.
* NOT explaining how Galaxy actually works.
* Moving at a fair clip through the essential steps for a new tool to become available to users on your own local Galaxy.
* Command line skills really will be needed.

## 12:40-1:00 Hello world in Galaxyish

The first exercise consists of creating (or copying, your choice) a text file containing valid XML describing a simple and admittedly, not very useful tool. However, it will demonstrate the bare bones of the power of the Galaxy tool interface. A few lines of XML gets you a familiar, simple user interface and a single new history item - a text file containing a string.

Steps:

1. Make a new directory [galaxy root]/tools/hello and put hello.xml there containing

 ```xml
<tool id="hello" name="hello" version="0.01">
<description>World</description>
<command>
/bin/echo "Hello World” &gt; ${output1}
</command>
<outputs>
    <data format="tabular" name="output1" label="hello_world_${mystring}"/>
</outputs>
<help>

**What it does**
Says hello
</help>
</tool>
```


<div class='indent'>

This text is all you need for a new, real new tool, including some help to display to the user. 
In this example, the executable we use is the built-in system echo command which echos its input (the string) to a new history output file - output is redirected using > to the output file path Galaxy chooses at tool execution because the template symbol `${output1} ` on the command line is replaced with the Galaxy job execution engine's choice of path. 

The syntax ${...} is recommended and it is also recommended that all user supplied parameters be quoted in case the parameter contains slashes or spaces which might cause the tool to fail mysteriously.

Note that the > redirection character has been *[html-escaped](http://dev.w3.org/html5/html-author/charref)* so the XML parser doesn't get confused. Failure to do this will throw a syntax error in paster.log when the XML is parsed at startup.
</div>

2. #2 If not already done, adjust universe_wsgi.ini by adding an admin_user email you will register with when you first log in - use commas ONLY - no spaces - to separate admin email addresses. Adjust tool_conf.xml adding a new tool path that must exactly match the directory/filename you chose for your tool. For this example, we recommend putting your new tool entry at the very top of the first tool section so it's easy to reload through the admin interface, later when you make changes to the XML. The start of your local tool_conf.xml should look like this

 ```xml
<?xml version="1.0"?>
<toolbox>
  <tool file="hello/hello.xml"/>
  <section name="Get Data" id="getext">
    <tool file="data_source/upload.xml"/>
 ```


3. #3 Restart

 **Stop Galaxy if it's running**
 ```
 sh run.sh –stop-daemon
 ```


 **Restart Galaxy**
 ```
 sh run.sh –daemon
 ```


4. #4 Check paster.log for errors (search for “hello” to find where your tool loaded – or barfed). If it fails to load, look for the syntax error, repair it, rinse, repeat... until it loads. ( `tail -f paster.log` )

5. #5 When it loads correctly, test your new tool. In your VM webrowser, visit http://localhost:8050 (http://localhost:8080 is the distrubution default but Galaxy will be on the **port** - eg 8050 has been configured for the server in unverse_wsgi.ini - you can move it if you wish). Register your admin email address if you haven't already done so and log in. Test your new tool. It will write “hello world” to a new file in your history. If/when it works, find the actual commands Galaxy executed to run your tool in paster.log. If it fails, look in paster.log for hints about what went wrong. Repair and reload via the admin interface (no need to restart the Galaxy server) until it works. 

6. #6 Raise arms in victory \o/

#### Bonus points if you finish early

1. #1 Look at what's been written to paster.log when your tool has executed. Running something like

 ```
tail -f paster.log
```


 in a separate console is a good way to see what Galaxy is doing. This is a **very useful strategy** for figuring out what is going on when things are not working right because the log will contain the generated command line including all parameter substitutions.

2. #2 Make it do something more interesting.


## 1:00-1:10. Hello input

Save a copy of your existing hello.xml as hello1.xml and adjust the old hello.xml - add an input parameter and adjust so it reads as shown below - cut and paste is always an easy option. Save. Reload the hello tool via the admin interface (reload a tool's configuration - find **hello** and reload it - if it fails to load, check the error message in paster.log and repair the syntax) and test it out. Note that you can use the **redo** (circular arrow in the expanded failed output) to set up the tool form as it was when you ran the job - this can save time for complex tool form testing. Rinse, repeat until it's working right.

```xml
<tool id="hello" name="hello" version="0.02">
<description>World</description>
<command>
/bin/echo "Hello World ${mystring}" &gt; ${output1}
</command>
<inputs>
 <param name="mystring" type="text" label="Say something interesting"/>
</inputs>
<outputs>
    <data format="tabular" name="output1" label="hello_world_${mystring}"/>
</outputs>
<help>

**What it does**

Says hello, adding a user supplied text parameter to the output

</help>
</tool>
```


### Bonus points
Once you have hello v 0.02 working, try using the redo button to rerun an output in your history from hello v 0.01.
You should see a warning message
```
This job was initially run with tool version "0.01", which is not currently available. You can rerun the job with this tool version, which is a derivation of the original tool.
```

Why does Galaxy give you a warning? 
Why is this a good thing?

**Hint:** 'reproducible research'

**Author's opinion:** Updated Galaxy tool versions are treated as potentially 'different' tools. Unless the old version is still available, rerunning old jobs with the updated version may not produce the same results if the tool has changed in any substantial way or the third party executable has been updated with bug fixes and enhancements. The Tool Shed has been designed to transparently support rerunning old jobs with exactly the same old version of tools which have been subsequently updated. This may not sound like a big deal but it is - good science has to be reproducible and ideally based on reproducible analyses. An updated version might give different results and so the original analysis might not be exactly replicated. Sure, tools that rely on simulation or permutation are expected to give slightly or trivially different results every time they are run unless you use the same random seed. Yes, the old version may have had bugs that are now fixed, but truly reproducible analysis means reproducing exactly the same bugs! Remember, reproduciblity is necessary for good science but it is not in itself a guarantee of **valid** analysis.

## 1:10 – 1:20pm Hello_sanitizer

Sometimes you will need to control the characters allowed in a text parameter - for example to prevent the user from supplying a space or other potentially annoying character. The [sanitizer tag set](/Admin/Tools/ToolConfigSyntax#sanitizer-tag-set) allows excluding specific characters. The format requires an initial definition of acceptable characters and individual ones can be added with the add tag.

```xml
<tool id="hello" name="hello" version="0.03">
<description>World</description>
<command>
/bin/echo "Hello World ${mystring}" &gt; ${output1}
</command>
<inputs>
  <param name="mystring" type="text" label="Say something interesting">
    <sanitizer invalid_char="">
      <valid initial="string.letters,string.digits"><add value="_" /> </valid>
    </sanitizer>
  </param>
</inputs>
<outputs>
    <data format="tabular" name="output1" label="hello_world_${mystring}"/>
</outputs>
<help>

**What it does**

Says hello, adding a user supplied text parameter to the output, but limiting the characters the user can type to digits, letters and the underscore. Try adding other characters to see what happens in the output

</help>
</tool>
```


Reload, test etc.

## 1:20 – 1:30pm Hello_file

So far, the tool does not accept any input files from the user's history. These require a **[data](/Admin/Tools/ToolConfigSyntax#typedata)** parameter specifying the template name for the input file and a data type (optionally a comma delimited list for multiple acceptable datatypes) which will be used to filter the user's current history so you can restrict the drop down choice list to the datatypes your tool needs - excluding other potentially unacceptable data formats to make it harder for the user to choose an incompatible datatype. 

Before we can implement that, we need to first make a suitable input file in the current history. A plain text file containing a few words of text is all you need. There are lots of ways of doing this, but the simplest way is to simply paste or write some text into the URL box of the **Get data &rarr; Upload File** tool, then set the file format to **txt** and press execute. A new text file containing whatever you typed will appear in your history after a few moments.

```xml
<tool id="hello" name="hello" version="0.04">
<description>World</description>
<command>
/bin/echo "Hello World ${mystring}" &gt; ${output1} &amp;&amp; cat ${mytext} &gt;&gt; ${output1}
</command>
<inputs>
 <param name="mystring" type="text" label="Say something interesting">
   <sanitizer invalid_char="">
     <valid initial="string.letters,string.digits"><add value="_" /> </valid>
   </sanitizer>
</param>
<param name="mytext" type="data" ftype="txt,tabular" label="Select a text file from your history"/>
</inputs>
<outputs>
    <data format="tabular" name="output1" label="hello_world_${mystring}"/>
</outputs>
<help>

**What it does**

Says hello, adding a user supplied text parameter to the output, but limiting the characters the user can type to digits, letters and the underscore. Try adding other characters to see what happens in the output
Also appends the contents of a user supplied text file to the output.
</help>
</tool>
```


Note the ugly html escaping needed on the command line. This can be avoided in real tools by changing the command line to call a python or other script to replace the shell command line in a more obvious, maintainable and transparent way - but it can be made to work and will serve for the exercise although we apologise if your eyeballs hurt. In general we recommend calling wrappers rather than creating long confusing shell command lines.
 
Reload, test etc.

## 1:30 – 1:45pm hello_datasource

Here is a simple datasource example. It is a a simple html page that uses !JavaScript to parse incoming parameters and change the form action attribute to the provided GALAXY_URL value. The user can click the submit button to post the URL value (a prefilled text box) back to the originating Galaxy server. For more information on data source tools, see [here](/Admin/Internals/Data Sources).

We'll use Python's built-in simple HTTP server to make the html page into a web-loadable link:
```
cd /home/gcc2013/Desktop/Training_Day_Workshops/Datsources_Tools/datasource_simple_example/
python -m SimpleHTTPServer 8051
```

Verify that you can view the simple datasource at http://localhost:8051/datasource_simple_example.html

Now we will define the simple datasource tool xml. Create a file under tools/data_source/ named hello_datasource.xml.

The contents should look like:
```xml
<tool name="Hello" id="hello_datasource" tool_type="data_source">
    <description>datasource</description>
    <command interpreter="python">data_source.py $output $</u>app__.config.output_size_limit</command>
    <inputs action=" http://localhost:8051/datasource_simple_example.html" check_values="false" method="get"> 
        <display>go to Hello Datasource Example $GALAXY_URL</display>
    </inputs>
    <uihints minwidth="800"/>
    <outputs>
        <data name="output" format="auto" />
    </outputs>
    <options sanitize="False" refresh="True"/>
</tool>
```


Add an entry to your tool_conf.xml file to instruct Galaxy to load the data source tool:
```xml
<tool file="data_source/hello_datasource.xml"/>
```


If you have extra time, you are able to customize additional attributes of your retrieved file by modifying the HTML file (datasource_simple_example.html) and adding reserved name parameters / form inputs:

<table>
  <tr>
    <td> </strong>Parameter name<strong></td>
    <td> </strong>Usage<strong></td>
  </tr>
  <tr>
    <td> name</td>
    <td> The external resource can provide a descriptive name for the retrieved data set. If not provided, a default name based upon the name provided in the XML tool configuration is used.</td>
  </tr>
  <tr>
    <td> info</td>
    <td> A free-form text string that a resource can use to provide additional information about the data set.</td>
  </tr>
  <tr>
    <td> data_type </td>
    <td> The type of data returned to Galaxy. Examples include bed, sam, gff and maf.</td>
  </tr>
  <tr>
    <td> dbkey</td>
    <td> If the data belongs to a single reference genome, this string is used to store this information. Examples include hg18, mm9 and canFam2.</td>
  </tr>
  <tr>
    <td> URL</td>
    <td> The user’s history will be populated with a new data set containing the results returned by submitting all provided parameters to this URL.</td>
  </tr>
</table>



## 1:45 – 2:30pm Wrap your new executable into a new tool
(Work with a partner who has a tool or choose a [bedtool](https://code.google.com/p/bedtools/) if you don't have one)

### Suggested procedure

1. RTM for your chosen executable and carefully take note of the required input data files, their formats, user configurable parameters and the outputs and their formats. You will need to specify all of these in the XML and on the command line template. 

2. Create or find some input test data files - pro tip: recycle stuff from the test-data directory - there are many, many small datasets there in almost all conceivable dataformats - as old William of Occam said, there's no point in multiplying entities unnecessarily.

3. Run your executable **from a shell** with hand written hard coded parameters including test data paths on the command line. This strategy will ensure that once you can get the thing to work right (without the complications of Galaxy tool syntax) you have the command line you need for a tool and the test outputs for a test and after all, if you can't get it working on the command line, it certainly won't suddenly start working when you add the complications of a Galaxy tool wrapper. All Galaxy really does is run the command line constructed by the templating substitutions.

4. Make an xml file like hello world but with exactly the required command line with hard coded parameters - and make it work in your Galaxy. Put outputs under /temp and use absolute paths (ie starting with /) to the test-data files because later, when Galaxy runs the tool, it will be using a temporary job working directory.

5. Progressively swap out command line arguments with tool form parameters and validation - eg if you used a test-data file like .../test-data/1.bam, add a tool input data parameter named (eg) input1 with ftype="bam" so the user will be able to select any bam in the current history. Replace the hard coded path with ${input1}

6. Add help and attribution

## 2:30 session ends

### Suggested enhancements for those who finish early

1. Add a test
2. Set up as a toolshed archive with a /test-data subfolder, tool_dependencies.xml ...

### Bonus points

Please thank your tutors for giving up their otherwise potentially free time. Something tangible like a beer is not an unacceptable manifestation of the good karma they have earned.

### Useful tips

1. The tools directory contains lots of working code, so if you want to quickly find some working examples of exotic or dimly recalled tool syntax, try something like:
<div class='indent'>```
grep sanitizer tools
```
</div>
    then read the code around the tools containing the tag - there are often lots of false positives but it can be a useful strategy for finding a quick reminder when the documentation is not clear.

1. #2 In the same vein, if you know of a particular tool that has a tool form feature you want to emulate, read the code for that tool and clone the working example into your own new wrapper. This can sometimes save a lot of time and effort where the documentation needs clarification.

1. If you figure something out that was not sufficiently clear (or worse, completely wrong!) in the tool syntax documentation, please contribute it! Send your suggested clarifications to the galaxy-dev list and we'll make sure it gets added. We need all the help we can get to make the documentation better so every little bit you can provide will help the whole community.

PLACEHOLDER_INCLUDE(/Events/GCC2013/Footer)
