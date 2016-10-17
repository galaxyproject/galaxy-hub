Forthcoming edits to [/Admin/Config/Performance/Cluster](/src/Admin/Config/Performance/Cluster/index.md):

## DRMAA

### Dependencies

Galaxy interfaces with DRMAA via [drmaa-python](http://code.google.com/p/drmaa-python/).  The drmaa-python module is provided with Galaxy, but you must tell it where your DRM's DRMAA library is located, via the `$DRMAA_LIBRARY_PATH` environment variable, or the `drmaa_library_path` runner plugin param in `job_conf.xml`.  For example, to set in the environment:

```console
galaxy_server% export DRMAA_LIBRARY_PATH=/galaxy/lsf/7.0/linux2.6-glibc2.3-x86_64/lib/libdrmaa.so
galaxy_server% export DRMAA_LIBRARY_PATH=/galaxy/sge/lib/lx24-amd64/libdrmaa.so
```


To set in `job_conf.xml`:

```xml
<plugins>
    <plugin id="sge" type="runner" load="galaxy.jobs.runners.drmaa:DRMAAJobRunner">
        <param id="drmaa_library_path">/galaxy/sge/lib/lx24-amd64/libdrmaa.so</param>
    </plugin>
</plugins>
```


The value in `job_conf.xml` will override any value set in the `$DRMAA_LIBRARY_PATH` environment variable.

### Parameters and Configuration

*following the existing example...*

The DRMAA runner takes four optional plugin parameters in addition to `drmaa_library_path` explained above:

```xml
<plugins>
    <plugin id="drmaa" type="runner" load="galaxy.jobs.runners.drmaa:DRMAAJobRunner">
        <param id="invalidjobexception_state">ok</param>
        <param id="invalidjobexception_retries">0</param>
        <param id="internalexception_state">ok</param>
        <param id="internalexception_retries">0</param>
    </plugin>
</plugins>
```


These parameters control the way in which a job will be considered terminal, since different DRMs behave in different ways.  For example, DRMAA specifies a "job finished normally" state, but not all DRMs will report this state, and instead, job completion can only determined by checking job state and encountering a drmaa `InvalidJobException` exception.  These parameters are explained below:

<table>
  <tr>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> <rowclass="th"> <code>DRMAAJobRunner <param></code>s </td>
  </tr>
  <tr class="th" >
    <th> <code>id</code> </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
    <th> default </th>
  </tr>
  <tr>
    <td> <code>invalidjobexception_state</code> </td>
    <td> <code>ok</code> or <code>error</code> </td>
    <td> Whether Galaxy should treat an <code>InvalidJobException</code> as a job failure </td>
    <td> optional </td>
    <td> <code><param id="invalidjobexception_state">error</param></code> </td>
    <td> <code>ok</code> </td>
  </tr>
  <tr>
    <td> <code>invalidjobexception_retries</code> </td>
    <td> any integer >= 0 </td>
    <td> The number of times a job should be rechecked before <code>InvalidJobException</code> is considered terminal </td>
    <td> optional </td>
    <td> <code><param id="invalidjobexception_retries">3</param></code> </td>
    <td> <code>0</code> do not retry state check) </td>
  </tr>
  <tr>
    <td> <code>internalexception_state</code> </td>
    <td> <code>ok</code> or <code>error</code> </td>
    <td> Whether Galaxy should treat an <code>InternalException</code> as a job failure </td>
    <td> optional </td>
    <td> <code><param id="internalexception_state">error</param></code> </td>
    <td> <code>ok</code> </td>
  </tr>
  <tr>
    <td> <code>internalexception_retries</code> </td>
    <td> any integer >= 0 </td>
    <td> The number of times a job should be rechecked before <code>InternalException</code> is considered terminal </td>
    <td> optional </td>
    <td> <code><param id="internalexception_retries">3</param></code> </td>
    <td> <code>0</code> do not retry state check) </td>
  </tr>
</table>

