1. format text/creole 

# Custom Code

**<<nwwl(NOTE)>>: The extensions described here can cause problems using your tool with certain components of Galaxy (like the workflow system). It is highly recommended to avoid these constructs unless absolutely necessary. We are continually adding support for more complex configuration in the tool config to eliminate the need for these features**

The purpose of custom code is to provide detailed control on the way the tools are executed. This (optional) code can be deployed in a separate file in the same directory as the tool configuration files (See <<nwwl(AddToolTutorial)>>). To enable the code add the

```
#!highlight xml
<code file="somefile.py"/>
```

tag to your configuration file. This instruction will load and execute the <tt>somefile.py</tt> program upon reading the tool. This program must be a python script that may contain any number of functions or classes. There are four function names that, if available, will be called from within Galaxy.

There are four time points where custom code execution can take place:

1. before the tool starts (the corresponding function name is _validate_) 1. after 1 but before the tool is placed in the job queue (_exec\_before\_job_) 1. after 2 but before the program associated with the tool executed (_exec\_before\_process_) 1. after the program associated with the tool finished executing (_exec\_after\_process_)

The principal difference between the executions of steps 1, 2 and 3, 4 is that the former block the response meaning that they have to complete before the page response is returned to the user. The latter two happen in the background in an independent thread.

## Parameter Validation

This function is called before the tool is executed. If it raises any exceptions the tool execution will be aborted and the exception's value will be displayed in an error message box. Here is an example:

```
#!highlight python
def validate(incoming):
    """Validator for the plotting program"""
    
    
    bins = incoming.get("bins","")
    col = incoming.get("col","")


    if not bins or not col:
        raise Exception, "You need to specify a number for bins and columns"


    try:
        bins = int(bins)
        col = int(col)
    except:
        raise Exception, "Parameters are not integers, columns:%s, bins:%s" % (col, bins)


    if not 1<bins<100:
        raise Exception, "The number of bins %s must be a number between 1 and 100" % bins
```

this code will intercept a number of parameter errors and return corresponding error messages. The parameter <tt>incoming</tt> contains a dictionary with all the parameters that were sent through the web.

## Pre-job and pre-process code

The signature of both of these codes is the same:

```
#!highlight python
def exec_before_job(inp_data, out_data, param_dict, tool):
def exec_before_process(inp_data, out_data, param_dict, tool):
```

The <tt>param_dict</tt> is a dictionary that contains all the values in the <tt>incoming</tt> parameter above plus a number of keys and values generated internally by galaxy. The <tt>inp_data</tt> and the <tt>out_data</tt> are dictionaries keyed by parameter name containing the classes that represent the data.

Example:

```
#!highlight python
def exec_before_process(inp_data, out_data, param_dict, tool):
    for name, data in out_data.items():
        data.name = 'New name'
```

This custom code will change the name of the data that was created for this tool to **New name**. The difference between these two functions is that the <tt>exec_before_job</tt> executes before the page returns and the user will see the new name right away. If one were to use <tt>exec_before_process</tt> the new name would be set only once the job starts to execute.

## Post-process code

This code executes after the background process running the tool finishes its run. The example below is more advanced one that replaces the type of the output data depending on the parameter named <tt>extension</tt>:

```
#!highlight python
from galaxy import datatypes
def exec_after_process(app, inp_data, out_data, param_dict, tool, stdout, stderr):
    ext = param_dict.get('extension', 'text')
    items = out_data.items()   
    for name, data in items: 
        newdata = datatypes.factory(ext)(id=data.id)
        for key, value in data. __dict__.items():
            setattr(newdata, key, value)
        newdata.ext = ext
        out_data[name] = newdata
```

the content of <tt>stdout</tt> and <tt>stderr</tt> are strings containing the output of the process.

