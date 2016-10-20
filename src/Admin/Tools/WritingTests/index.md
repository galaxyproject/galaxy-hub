PLACEHOLDER_INCLUDE(/src/Admin/Tools/LinkBox/index.md)
## Writing Tests

Preparing test for your Galaxy tool is easy. In short you include a sample input file and asample output file. Then you specify the parameters that with the given tool and input should produce the desired output. 

Everybody benefits from a good testing - the tool author ensures quality of tool, admins can easily separate good tools from bad tools and users use tools that are reliable. An examples below explains how to write a test. 

Tests can be specified in the tool config file using `<tests>` and `test` tags (for more information see [ description of test configuration tags](/src/Admin/Tools/ToolConfigSyntax/index.md).  For example, the [cluster tool](https://github.com/galaxyproject/tools-devteam/blob/master/tool_collections/gops/cluster/cluster.xml) specifies the following tests:

```xml
  <tests>
    <test>
      <param name="input1" value="5.bed" />
      <param name="distance" value="1" />
      <param name="minregions" value="2" />
      <param name="returntype" value="1" />
      <output name="output" file="gops-cluster-1.bed" />     
    </test>
    <test>
      <param name="input1" value="gops_cluster_bigint.bed" />
      <param name="distance" value="1" />
      <param name="minregions" value="2" />
      <param name="returntype" value="1" />
      <output name="output" file="gops-cluster-1.bed" />     
    </test>
    <test>
      <param name="input1" value="5.bed" />
      <param name="distance" value="1" />
      <param name="minregions" value="2" />
      <param name="returntype" value="2" />
      <output name="output" file="gops-cluster-2.bed" />     
    </test>    
    <test>
      <param name="input1" value="5.bed" />
      <param name="distance" value="1" />
      <param name="minregions" value="2" />
      <param name="returntype" value="3" />
      <output name="output" file="gops-cluster-3.bed" />     
    </test>
  </tests>
```


To explain what this means let's first take a look at the inputs and outputs of the [cluster tool](https://github.com/galaxyproject/tools-devteam/blob/master/tool_collections/gops/cluster/cluster.xml). It takes four inputs (`input1`, `distance`, `minregions`, and `returntype`) and produces a single `output`:

```xml
  <inputs>
    <param format="interval" name="input1" type="data">
      <label>Cluster intervals of</label>
    </param>
    <param name="distance" size="5" type="integer" value="1" help="(bp)">
      <label>max distance between intervals</label>
    </param>
    <param name="minregions" size="5" type="integer" value="2">
      <label>min number of intervals per cluster</label>
    </param>
	<param name="returntype" type="select" label="Return type">
		<option value="1">Merge clusters into single intervals</option>
		<option value="2">Find cluster intervals; preserve comments and order</option>
		<option value="3">Find cluster intervals; output grouped by clusters</option>
		<option value="4">Find the smallest interval in each cluster</option>
		<option value="5">Find the largest interval in each cluster</option>
	</param>
   </inputs>
  <outputs>
    <data format="input" name="output" metadata_source="input1" />
  </outputs>
```


Now let's take a look at the first test:

```xml
    <test>
      <param name="input1" value="5.bed" />
      <param name="distance" value="1" />
      <param name="minregions" value="2" />
      <param name="returntype" value="1" />
      <output name="output" file="gops-cluster-1.bed" />     
    </test>
```


All this does is specify parameters that will be used by test framework to run this test. For most input types, the value should be what would be entered by the user when running the tool through the web, with the exception of input and output. The input (`5.bed`) and output (`gops-cluster-1.bed`) files reside within the `~/test-data` directory. Once the test is executed the framework simply compares generated output with an example file (`gops-cluster-1.bed` in this case). If there are no differences - test is declared success. 

To run the Galaxy functional tests see [Running Tests](/src/Admin/RunningTests/index.md).

----

## Advanced Test Settings

### Output File Comparison Methods

#### diff

The default comparison method (*diff*) simply compares line by line in a file to check if the result of the test run of the tool matches the expected output specified in the `<output>` tag. A *lines_diff* attribute can be provided to allow the declared number of lines to differ between outputs. A 'change' in a line is equivalent to a count of 2 line differences: one line removed, one line added.

```
    <test>
      <output name="output" file="variable_output_file.bed" lines_diff="10"/>     
    </test>
```





Several tools, including those that use Composite Datatypes such as rGenetics, create additional files which are stored in a directory associated with the main history item. If you have a tool that creates these extra files, it is a good idea to write tests which also verify their correctness. This can be done on a per extra file basis or by comparing an entire directory; all of the previously mentioned comparison methods are applicable.

The two examples below are from `tools/peak_calling/macs_wrapper.xml`.

#### File-by-file comparison

Here two outputs are being tested; the first file has no extra files, but the second file has five extra files (in addition to the primary file) which are being tested.

```
    <test>
      <output name="output_bed_file" file="peakcalling_macs/macs_test_1_out.bed" />
      <output name="output_html_file" file="peakcalling_macs/macs_test_1_out.html" compare="re_match" >
        <extra_files type="file" name="Galaxy_Test_Run_model.pdf" value="peakcalling_macs/test2/Galaxy_Test_Run_model.pdf" compare="re_match"/>
        <extra_files type="file" name="Galaxy_Test_Run_model.r" value="peakcalling_macs/test2/Galaxy_Test_Run_model.r" compare="re_match"/>
        <extra_files type="file" name="Galaxy_Test_Run_model.r.log" value="peakcalling_macs/test2/Galaxy_Test_Run_model.r.log"/>
        <extra_files type="file" name="Galaxy_Test_Run_negative_peaks.xls" value="peakcalling_macs/test2/Galaxy_Test_Run_negative_peaks.xls" compare="re_match"/>
        <extra_files type="file" name="Galaxy_Test_Run_peaks.xls" value="peakcalling_macs/test2/Galaxy_Test_Run_peaks.xls" compare="re_match"/>
      </output>
    </test>
```


#### Directory comparison

Here four outputs are being tested; the first three files have no extra files, but the last file has 5 extra files (in addition to the primary file) which are being tested by the directory method. Each file in the specified directory of *output_html_file* will be tested against the files of the same name in the history item's extra files path.

```
    <test>
      <output name="output_bed_file" file="peakcalling_macs/macs_test_1_out.bed" />
      <output name="output_xls_to_interval_peaks_file" file="peakcalling_macs/macs_test_2_peaks_out.interval" lines_diff="4" />
      <output name="output_xls_to_interval_negative_peaks_file" file="peakcalling_macs/macs_test_2_neg_peaks_out.interval" />
      <output name="output_html_file" file="peakcalling_macs/macs_test_1_out.html" compare="re_match" >
        <extra_files type="directory" value="peakcalling_macs/test2/" compare="re_match"/>
      </output>
    </test>
```


----

## Beware of twill bug

See the following e-mail for explanation of a workaround that deals with "dashed" options:

```
Hello Assaf,

This is a known bug in twill 0.9.  The work-around is to use the label rather than the value in your functional test.  So, in your example, the test should be changed to the following.  Let me know if this does not work.

One of the tests looks like this:
-------------
<test>
  <!-- ASCII to NUMERIC -->
  <param name="input" value="fastq_qual_conv1.fastq" />
  <param name="QUAL_FORMAT" value="Numeric quality scores" />
  <output name="output" file="fastq_qual_conv1.out" />
</test>
-------------

Greg Von Kuster
Galaxy Development Team


Assaf Gordon wrote:
Hello,

I wrote a functional test for my tool, and encountered a strange behavior.

One of the tool's parameters looks like this:
-------------
<param name="QUAL_FORMAT" type="select" label="output format">
     <option value="-a">ASCII (letters) quality scores</option>
     <option value="-n">Numeric quality scores</option>
</param>
------------

One of the tests looks like this:
-------------
<test>
   <!-- ASCII to NUMERIC -->
   <param name="input" value="fastq_qual_conv1.fastq" />
   <param name="QUAL_FORMAT" value="-n" />
   <output name="output" file="fastq_qual_conv1.out" />
</test>
-------------


When I run the functional tests for this tool, I get the following exception:
---------------
Traceback (most recent call last):
File "galaxy_devel_tools/test/functional/test_toolbox.py", line 114, in test_tool
    self.do_it()
File "galaxy_devel_tools/test/functional/test_toolbox.py", line 44, in do_it
    self.run_tool( self.testdef.tool.id, repeat_name=repeat_name, **page_inputs )
File "galaxy_devel_tools/test/base/twilltestcase.py", line 520, in run_tool
    self.submit_form( **kwd )
  File "galaxy_devel_tools/test/base/twilltestcase.py", line 495, in submit_form
    raise AssertionError( errmsg )
AssertionError: Attempting to set field 'QUAL_FORMAT' to value '['-n']' in form 'tool_form' threw exception: cannot find value/label "n" in list control
control: <SelectControl(QUAL_FORMAT=[-a, -n])>
---------------

If I understand the exception correctly, it means that somewhere the minus character ("-n") gets dropped, and therefor the value 'n' cannot be found in the list (which contains "-n" and "-a").



Is this an actual bug or am I doing something wrong?

Thanks,
   Gordon.
```
 

----

## Saving generated functional test output files

A small change to the test framework was introduced in April 2011 allowing test outputs generated by Twill during functional tests to be saved, making it easier to update test expected outputs after changes to a tool.

If there is a variable called 'GALAXY_TEST_SAVE' in the environment when tests are being run, each output file Twill generates that is compared with a reference file will be written to that directory - assuming write permissions and so on. For example:

```
setenv GALAXY_TEST_SAVE /tmp/galtest
sh run_functional_tests.sh -id myTool
```


will test the individual tool with id 'myTool' and write the tested output files to /tmp/galtest. Running a full set of functional tests will of course result in a full set of test outputs being saved. To stop test outputs from being saved, reset GALAXY_TOOL_SAVE to null

```
setenv GALAXY_TEST_SAVE
```


See also the environment variable GALAXY_TEST_NO_CLEANUP which disables automated removal of the test output files.
