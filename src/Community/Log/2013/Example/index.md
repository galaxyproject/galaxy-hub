---
pagetitle: 2013, /, 11, :,  VelvetG error on CloudMan Instance, :,  cannot find , ', cov_cutoff, '
---




<div class='logbox'>
 Topic:: **[VelvetG error on CloudMan instance: cannot find 'cov_cutoff'](/Community/Log/2013/Example)**
 Date:: 2013/11/13
 Who:: [Dave Clements](/DaveClements)
 Resolution:: Fixed XML wrapper
</div>

VelvetG started at 15:50
And got an error:
```
 NotFound: cannot find 'cov_cutoff' while searching for 'expected.cov_cutoff'
```


Problem was In velvetg.xml.  Here's the fixed version
```
           #if $coverage.cutoff == "auto":
               -cov_cutoff auto
           #elif $coverage.cutoff == "value":
               -cov_cutoff $coverage.cov_cutoff
           #end if
           #if $expected.coverage == "auto":
               -exp_cov auto
           #elif $expected.coverage == "value":
               -exp_cov $expected.exp_cov
           #end if                                                      
```

Fix was based on this from later in the file:
```xml
    <conditional name="coverage">
      <param name="cutoff" type="select" label="Coverage cutoff" help="">
        <option value="none">None</option>
        <option value="auto">Automatically Determined</option>
        <option value="value">Specify Cutoff Value</option>
      </param>
      <when value="none"/>
      <when value="auto"/>
      <when value="value">
        <param name="cov_cutoff" value = "10.0" label="Remove nodes with coverage below" type="float" />
      </when>
    </conditional>

    <conditional name="expected">
      <param name="coverage" type="select" label="Expected Coverage of Unique Regions" help="">
        <option value="none">None</option>
        <option value="auto">Automatically Determined</option>
        <option value="value">Specify Expected Value</option>
      </param>
      <when value="none"/>
      <when value="auto"/>
      <when value="value">
        <param name="exp_cov" value = "10.0" label="Remove nodes with coverage below" type="float" />
      </when>
    </conditional>
```

Restarted Galaxy

Restarted velvetg at 18:08

All was happy.

## Links


CategoryLog
