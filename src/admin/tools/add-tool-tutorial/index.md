---
title: Adding custom tools to Galaxy
---
A vast number of well-implemented tools are available for Galaxy through the [Galaxy Tool Shed](/src/toolshed/index.md). Users with admin privileges can freely install any tools from the Tool Shed to their Galaxy instance via the [admin interface](/src/admin/index.md). A short tutorial describing how to install tools from the Tool Shed is available [here](/src/admin/tools/add-tool-from-toolshed-tutorial/index.md).

The list of available tools in the Tool Shed can be found [here](http://toolshed.g2.bx.psu.edu). If a tool is not currently in the Tool Shed, it can be wrapped and added to Galaxy and later shared in the Tool Shed with the rest of the world. The steps outlined below will guide users through the creation of a custom tool in Galaxy. There are also helpful instructions in this [tutorial for Creating a Histogram Tool](/src/admin/tools/adding-tools/index.md).

### 1. Write and test the tool outside Galaxy.

In this example we have written a simple Perl script called `toolExample.pl` for computing the GC content of a sequence in FASTA format.

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

This tool has been tested outside of Galaxy and functions as expected.

### 2. Put the tool into Galaxy's tools directory.

To begin the tool integration process, we need to add our Perl script to the `tools/` directory, where all tool-related files are stored, within our Galaxy installation. In this example we have create a new subdirectory called `myTools` within `tools/` and then moved to this subdirectory.

```sh
cd tools
mkdir myTools
cd myTools
```

Next, we need to copy the Perl script to our new subdirectory so that Galaxy can recognize it. In this example we have copied `toolExample.pl` to the `tools/myTools/` directory.

### 3. Create the tool definition file.

Although `toolExample.pl` now resides within the `tools/myTools/` directory, Galaxy does not know how to execute this tool. To inform Galaxy of the execution details of this tool, we need to generate a tool definition file. In this example we have created the tool definition file `toolExample.xml` within the `tools/myTools` directory.
 
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

The tool definition file specifies command line parameters, links them to input and output, and provides help information using the restructured text format. The `tools/myTools` directory now contains two files: `toolExample.pl` and `toolExample.xml`. More information on how to write tool definition files can be found [here](https://docs.galaxyproject.org/en/latest/dev/schema.html).

### 4. Make Galaxy aware of the new tool.

Now that the tool and its definition file are ready, the final step is to make Galaxy aware of the new files. Galaxy recognizes installed tools by reading the `tool_conf.xml` tool configuration file. Thus, letting Galaxy know about the new tool is as easy as adding a few lines to the `tool_conf.xml` file located in the `config/` directory of the Galaxy installation. New tools can either be added to existing sections or added to new sections defined in the following way:

```xml
 <section name="MyTools" id="mTools">
    <tool file="myTools/toolExample.xml" />
 </section>
```

### 5. Start Galaxy.

To test the newly integrated tool, start Galaxy by typing `sh run.sh` from within Galaxy's root directory and point your browser to http://localhost:8080. If the tool has successfully been integrated, the Galaxy interface should look similar to:

![](/src/admin/tools/add-tool-tutorial/toolExample.png)

Note the correspondence between elements of the tool definition file (Step 3) and the interface elements shown above. The "Compute GC for" dropdown reads "no data has the proper type" because the history pane contains no data in the FASTA format.

### 6. (optional) Upload the tool to Galaxy's Tool Shed.

To share the tool with the Galaxy community, upload it to the [Galaxy Tool Shed](/src/toolshed/index.md). Users can now install the tool into their Galaxies seamlessly via the [Admin interface](/src/admin/index.md). If the tool is well-written and tested it can even make it to the [Main Galaxy instance](/src/main/index.md) or other [Public Galaxy Servers](/src/use/index.md)!

To get started sharing and publishing your tool, check out the [How to publish a tool in the Tool Shed](/src/toolshed/publish-tool/index.md) tutorial.
