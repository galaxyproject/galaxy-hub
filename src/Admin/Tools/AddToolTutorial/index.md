PLACEHOLDER_INCLUDE(/Admin/LinkBox)
PLACEHOLDER_INCLUDE(/Develop/LinkBox)
PLACEHOLDER_INCLUDE(/Admin/Tools/LinkBox)

## Adding custom tools to Galaxy

Vast number of good and well-implemented tools for Galaxy is available through the [Galaxy ToolShed](../../../ToolShed) and you can freely install any of them into your Galaxy instance via the [admin interface](../../../Admin/Interface). Short tutorial to get you started is available [here](/src/Admin/Tools/AddToolFromToolShedTutorial/index.md).


If you did not find your favorite tool in the ToolShed you can always add it to your Galaxy manually (and later share in the Tool Shed with the rest of the world if you like). This article will help you with this creation of a custom tool in your Galaxy.

See also the [Tutorial for Creating a Histogram Tool](/src/Admin/Tools/AddingTools/index.md).

### 1. Write and test your tool outside Galaxy:

Suppose one has written a simple Perl script (called `toolExample.pl`) for computing the GC content of a sequence in the FASTA format, which looks like this:

```perl
#!/usr/bin/perl -w

# usage : perl toolExample.pl <FASTA file> <output file>

open (IN, "<$ARGV[0]");
open (OUT, ">$ARGV[1]");
while (<IN>) {
    chop;
    if (m/^>/) {
        s/^>//;
        if ($. > 1) {
            print OUT sprintf("%.3f", $gc/$length) . "\n";
        }
        $gc = 0;
        $length = 0;
    } else {
        ++$gc while m/[gc]/ig;
        $length += length $_;
    }
}
print OUT sprintf("%.3f", $gc/$length) . "\n";
close( IN );
close( OUT );
```


To integrate this tool into Galaxy we will follow these steps:

### 2. Put tool into Galaxy's tools directory:

To begin the tool integration process we need to add our Perl script to the `tools/` directory, where all tool-related files are stored. In this example we will create a new subdirectory called `myTools` within `tools/`.  So `cd` to your Galaxy installation and type these commands:

```sh
cd tools
mkdir myTools
cd myTools
```
  

Now one needs to copy the script (in this case `toolExample.pl`) into the `tools/myTools/` directory.

### 3. Create Tool Definition File:

At this point `toolExample.pl` resides within the `tools/myTools/` directory, but Galaxy still does not know how to run this tool. To let Galaxy know the execution details of our new tool, we need to write a tool configuration file, which, in this case, will be called `toolExample.xml`. For this particular example open a text editor of your choice and create the `toolExample.xml` file within the `tools/myTools` directory. This file looks like this:
 
```xml
<tool id="fa_gc_content_1" name="Compute GC content" version="0.1.0">
  <description>for each sequence in a file</description>
  <command interpreter="perl">toolExample.pl $input $output</command>
  <inputs>
    <param format="fasta" name="input" type="data" label="Source file"/>
  </inputs>
  <outputs>
    <data format="tabular" name="output" />
  </outputs>

  <tests>
    <test>
      <param name="input" value="fa_gc_content_input.fa"/>
      <output name="out_file1" file="fa_gc_content_output.txt"/>
    </test>
  </tests>

  <help>
This tool computes GC content from a FASTA file.
  </help>

</tool>
```


Note how this file specifies command line parameters, links them to input and output, and provides help information using the restructured text format. Once you are done, the `tools/myTools` directory will contain two files `toolExample.pl` and `toolExample.xml`.
For basic and general tool definition file please see [Example Tool Definiton File](../../../Admin/Tools/ExampleXMLFile). Once you feel comfortable with the basics you can browse through the [full tool definition syntax](/src/Admin/Tools/ToolConfigSyntax/index.md).

### 4. Make Galaxy aware of the new tool:

Now the tool and its configuration file are ready. The final step makes Galaxy aware of the new tools. Galaxy knows about installed tools (and also what to display on the left pane) from the `tool_conf.xml` tool-registry file. Thus, letting Galaxy know about our new tool is as easy as adding these lines to the `tool_conf.xml` file located in the config directory of the Galaxy distribution:
```xml
 <section name="MyTools" id="mTools">
    <tool file="myTools/toolExample.xml" />
 </section>
```


### 5. Start it up:

At this point, start Galaxy by typing `sh run.sh` from within Galaxy's root directory and point your browser to http://localhost:8080. The interface of the new tool will look like this:

![](../../../Admin/Tools/AddToolTutorial/toolExample.png)

Note the correspondence between elements of the `toolExample.xml` file (Step 2) and the interface elements shown above. The "Compute GC for" dropdown reads "no data has the proper type" because the history pane contains no data in the FASTA format (it is empty).

### 6. (optional) Upload your tool to the Tool Shed:

If you want to easily share your tool with others upload it to the [Galaxy Tool Shed](../../../ToolShed). It allows others to install the tool into their Galaxies seamlessly via the [Admin interface](../../../Admin/Interface). If the tool is well written and tested it can even make it to the [Main Galaxy instance](../../../Main) or other [Public Galaxy Servers](/src/PublicGalaxyServers/index.md)!

To get started with the sharing of your tool please see Tool Shed's [Get started](../../../ToolShedGetStarted).

PLACEHOLDER_INCLUDE(/Develop/ResourcesTools)
