<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'><img src="/src/images/Logos/ToolShed.jpg" alt="Galaxy Main Tool Shed" height="174" /></a> </div>

# Downloading Precompiled Package Binaries

In some cases, due to either convenience or licensing issues, it may be desirable or even necessary to download a precompiled binary for the platform into which the tool dependency is installed. This is supported by use of the **download_binary** and **chmod** action types.

## The download_binary action

An action tag of the download_binary type can contain one or more url_template tags, each one specifying a URL for a specific combination of processor architecture and operating system. If no valid match is found, the tool dependency installation process will proceed with any defined compilation steps. If a valid match is found, the file pointed to by the URL will be downloaded and copied to the installation directory. This defaults to the root of the installation directory, but the optional **target_directory** attribute can be used to specify a directory under the installation path where the downloaded file should be copied. For a url_template tag to be considered a valid match, every attribute it defines must match the platform the tool dependency is being installed into.

Example action for downloading faToTwoBit from UCSC:

```
<action type="download_binary" target_directory="bin">
    <url_template os="linux">http://hgdownload.cse.ucsc.edu/admin/exe/linux.${architecture}/faToTwoBit</url_template>
    <url_template os="darwin">http://hgdownload.cse.ucsc.edu/admin/exe/macOSX.${architecture}/faToTwoBit</url_template>
</action>
```


## The chmod action

When a file is downloaded with the download_binary action, the target system will not recognize it as an executable unless the execute flag is set on the file. The chmod action type contains one or more **file** elements, each having an attribute **mode** that specifies the modes to set on the target file.

The **mode** attribute should contain the sum of the following modes:

<table>
  <tr>
    <td> &nbsp;</td>
    <td> <strong>Owner</strong></td>
    <td> <strong>Group</strong></td>
    <td> <strong>Other</strong></td>
  </tr>
  <tr>
    <td> Read</td>
    <td> 400</td>
    <td> 040</td>
    <td> 004</td>
  </tr>
  <tr>
    <td> Write</td>
    <td> 200</td>
    <td> 020</td>
    <td> 002</td>
  </tr>
  <tr>
    <td> Execute</td>
    <td> 100</td>
    <td> 010</td>
    <td> 001</td>
  </tr>
</table>


Based on this table, if you want the owner to have all access rights, and anyone in the group to have read and execute only, the **mode** attribute should be 750.

Example tagset to set the above mode on the previously downloaded faToTwoBit file:
```
<action type="chmod">
    <file mode="750">$INSTALL_DIR/bin/faToTwoBit</file>
</action>
```


Putting all the pieces together, the full tool_dependencies.xml to download and install faToTwoBit would look like:
```
<?xml version="1.0"?>
<tool_dependency>
    <package name="faToTwoBit" version="0.0.1">
        <install version="1.0">
            <actions>
                <action type="download_binary" target_directory="bin">
                    <url_template os="darwin">http://hgdownload.cse.ucsc.edu/admin/exe/macOSX.${architecture}/faToTwoBit</url_template>
                    <url_template os="linux">http://hgdownload.cse.ucsc.edu/admin/exe/linux.${architecture}/faToTwoBit</url_template>
                </action>
                <action type="chmod">
                    <file mode="750">$INSTALL_DIR/bin/faToTwoBit</file>
                </action>
                <action type="set_environment">
                    <environment_variable name="PATH" action="prepend_to">$INSTALL_DIR/bin</environment_variable>
                </action>
            </actions>
        </install>
        <readme>The tools downloaded by this dependency definition are free for academic use.</readme>
    </package>
</tool_dependency>
```


In this example, the tool dependency installation code will inspect the target platform, determine which url_template element is the best match, and download the file pointed to by the resulting URL. If the download succeeds, it will set the executable flag on the downloaded file, and move it to the tool dependency installation path.
