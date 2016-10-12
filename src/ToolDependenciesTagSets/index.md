<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'><img src='/Images/Logos/ToolShed.jpg' alt='Galaxy Main Tool Shed' height="174" /></a> </div>

# Supported tool_dependencies.xml Tag Sets

<table>
  <tr>
    <td> <strong>Tag</strong></td>
    <td> <strong>Attributes</strong></td>
    <td> <strong>Description</strong></td>
    <td> <strong>Example</strong></td>
    <td> <strong>Available since release</strong></td>
  </tr>
  <tr>
    <td> <code><tool_dependency></code></td>
    <td> </td>
    <td> Document root tag that can contain any number of <code><package></code> or <code><set_environment></code> tag sets</td>
    <td> <code><tool_dependency></code>.</td>
    <td> release_2013.01.13 or earlier</td>
  </tr>
  <tr>
    <td> <code><package></code> (contained within a <code>tool_dependency></code>)</td>
    <td> name (required), version (required)</td>
    <td> A package is a type of tool dependency and the combination of the name and version provide a unique identifier for it. It can contain any number of <code><repository></code> tag.</td>
    <td> <code><package name="emboss" version="5.0.0"></code></td>
    <td> release_2013.01.13 or earlier</td>
  </tr>
  <tr>
    <td> <code><install></code> (contained within a <code><package></code>)</td>
    <td> version (required)</td>
    <td> The version attribute identifies a framework implementation for installing the package.  Version 1.0 uses the fabric implementation.</td>
    <td> <code><install version="1.0"></code></td>
    <td> release_2013.01.13 or earlier</td>
  </tr>
  <tr>
    <td> <code><actions_group></code> (contained within <code><install></code>)</td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> release_2013.11.04</td>
  </tr>
  <tr>
    <td> <code><actions></code> (contained within <code><actions_group></code>)</td>
    <td> os (optional), architecture (optional)</td>
    <td> Contains any number of <code><action></code> tag sets, the complete set of which defines the process for installing and compiling the package.</td>
    <td> <code><actions></code></td>
    <td> release_2013.11.04</td>
  </tr>
  <tr>
    <td> <code><actions></code> (contained within <code><install></code></td>
    <td> </td>
    <td> Contains any number of <code><action></code> tag sets, the complete set of which defines the process for installing and compiling the package.</td>
    <td> <code><actions></code></td>
    <td> release_2013.01.13 or earlier</td>
  </tr>
  <tr>
    <td> <code><action></code> (contained within <code><actions></code>)</td>
    <td> type (required)</td>
    <td> An action defines an step in the process of downloading and compiling a package or for setting an environment variable.  The following table provides the details for the action tags.</td>
    <td> </td>
    <td> release_2013.01.13 or earlier</td>
  </tr>
  <tr>
    <td> <code><readme></code> (contained within <code><package></code>)</td>
    <td> </td>
    <td> Contains free text that provides information about the package.</td>
    <td> </td>
    <td> release_2013.01.13 or earlier</td>
  </tr>
  <tr>
    <td> <code><repository></code> (contained within <code><package></code>)</td>
    <td> toolshed (optional), name (required), owner (required), changeset_revision (optional), prior_installation_required  (optional, available since release_2013.06.03)</td>
    <td> Defines a complex repository dependency. If the toolshed is not defined, it will be automatically set to the local tool shed.  If defined, the changeset_revision is the minimum required version.  If the changeset_revision is not defined, it will be set to the latest installable changeset_revision for the repository defined by the name and owner.  If either the toolshed or the changeset_revision is not defined, the tool_dependencies.xml file will automatically be altered (before it is committed in the changeset) to include the attributes and values just discussed.</td>
    <td> &lt;package name="numpy" version="1.7.1"&gt;&lt;repository changeset_revision="7283651b62fe" name="package_numpy_1_7" owner="bgruening" prior_installation_required="True" toolshed="<code>http://testtoolshed.g2.bx.psu.edu</code>" /&gt;&lt;/package&gt;</td>
    <td> release_2013.02.08</td>
  </tr>
  <tr>
    <td> <code><set_environment></code> (contained within a <code>tool_dependency></code>)</td>
    <td> version="1.0" (required)</td>
    <td> Create a tool dependency to set an environment variable. Must correspond to a <code><requirement type="set_environment"></code> in a tool.</td>
    <td> &lt;set_environment version="<code>1.0</code>"&gt; &lt;environment_variable name="<code>R_SCRIPT_PATH</code>" action="<code>set_to</code>"&gt; <code>$REPOSITORY_INSTALL_DIR</code> &lt;/environment_variable&gt; &lt;/set_environment&gt;</td>
    <td> </td>
  </tr>
</table>


<table>
  <tr>
    <td> <strong>Action Type</strong></td>
    <td> <strong>Description</strong></td>
    <td> <strong>Example</strong></td>
    <td> <strong>Available since release</strong></td>
  </tr>
  <tr>
    <td> autoconf</td>
    <td> Handle configure (automatically includes setting --prefix=$INSTALL_DIR, unless the XML elements text contains "prefix="), make and make install allow providing configuration options.</td>
    <td> <code><action type="autoconf">--enable-shared=yes</action></code> </td>
    <td> release_2013.11.04</td>
  </tr>
  <tr>
    <td> change_directory</td>
    <td> Change the current directory to the specified directory.</td>
    <td> &lt;action type="change_directory"&gt;PHYLIP-3.6b&lt;/action&gt;</td>
    <td> release_2013.08.12</td>
  </tr>
  <tr>
    <td> chmod</td>
    <td> Can contain one or more <code><file></code> tags, each with a <strong>mode</strong> attribute that specifies the desired mode.</td>
    <td> &lt;action type="chmod"&gt;&lt;file mode="755"&gt;$INSTALL_DIR/bin/bwa&lt;/file&gt;&lt;/action&gt;</td>
    <td> release_2013.11.04</td>
  </tr>
  <tr>
    <td> download_binary</td>
    <td> A template that is filled in with the target platform's OS and architecture. If <strong>os</strong> or <strong>architecture</strong> are specified in the tag's attributes, only the template matching the current platform will be used.</td>
    <td> &lt;action type="download_binary"&gt;&lt;url_template os="darwin"&gt;<code>http://hgdownload.cse.ucsc.edu/admin/exe/macOSX.${architecture}/faToTwoBit</code>&lt;/url_template&gt;&lt;/action&gt;</td>
    <td> release_2013.11.04</td>
  </tr>
  <tr>
    <td> download_by_url</td>
    <td> A valid URL that will download a specific package name and version.  Only works properly if it is the first action. If applicable, the target file will be saved locally under the name defined in the <strong>target_filename</strong> attribute. If the remote file is an archive (Zip or Tar), it will be deflated, and the current execution directory will be changed if needed to the deflated subdirectory for the following actions. Note that in the case of Tar files, the name of the downloaded file must match the name of the deflated directory. Additionally a <strong>sha256sum</strong> attribute should be provided which will be checked to ensure integrity of your download. </td>
    <td> &lt;action type="download_by_url" sha256sum="abad61823..." &gt; d<code>ftp://emboss.open-bio.org/pub/EMBOSS/old/5.0.0/EMBOSS-5.0.0.tar.gz</code>&lt;/action&gt;, &lt;action type="download_by_url" target_filename="lastz-distrib-1.02.00.tar.gz"&gt;<code>http://www.bx.psu.edu/miller_lab/dist/lastz-1.02.00.tar.gz</code>&lt;/action&gt;</td>
    <td> release_2013.01.13 or earlier</td>
  </tr>
  <tr>
    <td> download_file</td>
    <td> Download a single file to the current working directory.  If applicable, the target file will be saved locally under the name defined in the <strong>target_filename</strong> attribute. Additionally a <strong>sha256sum</strong> attribute should be provided which will be checked to ensure integrity of your download.</td>
    <td> &lt;action type="download_file"&gt;<code>http://effectors.org/download/version/TTSS_GUI-1.0.1.jar</code>&lt;/action&gt;</td>
    <td> release_2013.06.03</td>
  </tr>
  <tr>
    <td> make_directory</td>
    <td> Create a new directory relative to the package installation directory.</td>
    <td> &lt;action type="make_directory"&gt;$INSTALL_DIR/lib/python&lt;/action&gt;</td>
    <td> release_2013.01.13 or earlier</td>
  </tr>
  <tr>
    <td> make_install</td>
    <td> make [options]; make install; allow providing make options</td>
    <td> &lt;action type="make_install"&gt;all&lt;/action&gt;</td>
    <td> release_2013.11.04</td>
  </tr>
  <tr>
    <td> move_file</td>
    <td> An <code><action></code> tag set containing a <code><source></code> tag (what file to move), a <code><destination></code> tag (directory where to move the file) and an optional <code>rename_to</code> attribute (new file name).</td>
    <td> &lt;action type="move_file" rename_to="lastz"&gt;&lt;source&gt;src/lastz.i386&lt;/source&gt;&lt;destination&gt;$INSTALL_DIR/bin&lt;/destination&gt;&lt;/action&gt;</td>
    <td> release_2013.01.13 or earlier</td>
  </tr>
  <tr>
    <td> move_directory_files</td>
    <td> An <code><action></code> tag set that contains a <code><source_directory></code> tag and a <code><destination_directory></code> tag that defines a directory of files to move and where to move it.</td>
    <td> &lt;action type="move_directory_files"&gt;&lt;source_directory&gt;bin&lt;/source_directory&gt;&lt;destination_directory>$INSTALL_DIR/bin&lt;/destination_directory&gt;&lt;/action&gt;</td>
    <td> release_2013.01.13 or earlier</td>
  </tr>
  <tr>
    <td> set_environment</td>
    <td> A tag set that contains an <code><environment_variable></code> tag that defines the process for setting an environment variable. Allowed actions are: 'set_to', 'prepend_to' and 'append_to'. These variables will be defined in the tools runtime environment, not in the install environment, see action "set_environment_for_install" for that, or use a shell script.</td>
    <td> &lt;action type="set_environment"&gt;&lt;environment_variable name="PATH" action="prepend_to"&gt;$INSTALL_DIR/bin&lt;/environment_variable&gt;&lt;/action&gt;</td>
    <td> release_2013.01.13 or earlier</td>
  </tr>
  <tr>
    <td> set_environment_for_install</td>
    <td> This tag set defines a repository revision that is associated with a tool dependency env.sh file.  If the repository has dependencies, the env.sh file for each of them is "sourced" so the environment setting in each of them can be injected into the environment for all &lt;action type="shell_command"&gt; tags that follow this &lt;action type="set_environment_for_install"&gt; tag set in the tool_dependencies.xml file.</td>
    <td> &lt;action type="set_environment_for_install"&gt;&lt;repository changeset_revision="7283651b62fe" name="package_numpy_1_7" owner="bgruening" toolshed="<code>http://testtoolshed.g2.bx.psu.edu</code>"&gt;&lt;package name="numpy" version="1.7.1" /&gt;&lt;/repository&gt;&lt;/action&gt;</td>
    <td> release_2013.06.03</td>
  </tr>
  <tr>
    <td> setup_perl_environment</td>
    <td> Set up a Perl environment</td>
    <td> &lt;action type="setup_perl_environment"&gt;&lt;repository name="package_perl_5_18" owner="bgruening"&gt;&lt;package name="perl" version="5.18.1" /&gt;&lt;/repository&gt;&lt;package&gt;XML::Parser&lt;/package&gt;&lt;package&gt;<code>http://search.cpan.org/CPAN/authors/id/C/CJ/CJFIELDS/BioPerl-1.6.922.tar.gz</code>&lt;/package&gt;&lt;/action&gt;</td>
    <td> release_2014.02.10</td>
  </tr>
  <tr>
    <td> setup_r_environment</td>
    <td> <a href='/SetUpREnvironment'>Set up an R environment.</a></td>
    <td> &lt;action type="setup_r_environment"&gt;&lt;repository name="package_r_3_0_1" owner="bgruening"&gt;&lt;package name="R" version="3.0.1" /&gt;&lt;/repository&gt;&lt;package&gt;<code>https://github.com/bgruening/download_store/raw/master/DESeq2-1_0_18BiocGenerics_0.6.0.tar.gz6</code>&lt;/package&gt;&lt;/action&gt;</td>
    <td> release_2013.11.04</td>
  </tr>
  <tr>
    <td> setup_ruby_environment</td>
    <td> Set up a Ruby environment.</td>
    <td> &lt;action type="setup_ruby_environment"&gt;&lt;repository name="package_ruby_2_0" owner="bgruening"&gt;&lt;package name="ruby" version="2.0" /&gt;&lt;/repository&gt;&lt;package&gt;protk&lt;/package&gt;&lt;package&gt;protk=1.2.4&lt;/package&gt;&lt;package&gt;<code>http://url-to-some-gem-file.de/protk.gem</code>&lt;/package&gt;&lt;/action&gt;</td>
    <td> release_2014.02.10</td>
  </tr>
  <tr>
    <td> setup_virtualenv</td>
    <td> Set up a Python <a href='http://www.virtualenv.org'>virtualenv</a> and install the listed modules in to that virtualenv using <a href='http://www.pip-installer.org/'>pip</a>. It is not necessary to provide any other actions (e.g. <code>set_environment</code>), as <code>setup_virtualenv</code> configures the environment for dependencies automatically.</td>
    <td> Install requirements from file <code>requirements.txt</code> of downloaded bundle:<br /><code><action type="setup_virtualenv" /></code><br />- or - Install requirements from specified file from downloaded bundle:<br /><code><action type="setup_virtualenv">tools/requirements.txt</action></code><br />- or - Manually specify contents of requirements.txt file to create dynamically:<br /><code><action type="setup_virtualenv">pyyaml==3.2.0</code><br /><code>lxml==2.3.0</action></code></td>
    <td> release_2013.06.03</td>
  </tr>
  <tr>
    <td> shell_command (for cloning a repository)</td>
    <td> If the first <code><action></code> tag is of type "shell_command", then it must be either an hg clone or a git clone command. If the source repository name (in this example freebayes.git, but the .git is ignored) is different than the package name, then you'll need to clone into a folder with the same name as the package. E.g. <code>git clone https://github.com/apetkau/ffp-3.19-custom.git ffp-phylogeny</code> for a package name <code>ffp-phylogeny</code></td>
    <td> &lt;action type="shell_command"&gt;git clone --recursive git://github.com/ekg/freebayes.git&lt;/action&gt;</td>
    <td> release_2013.01.13 or earlier</td>
  </tr>
  <tr>
    <td> shell_command (after package download)</td>
    <td> A shell command can contain any necessary command to compile the package after it has been downloaded.  Care must be taken to ensure commands are general posix commands, and moving files and directories should not be done using a shell_command type (see below).</td>
    <td> &lt;action type="shell_command"&gt;make&lt;/action&gt;</td>
    <td> release_2013.01.13 or earlier</td>
  </tr>
  <tr>
    <td> template_command</td>
    <td> Execute a command in the specified template language. At the moment only 'cheetah' language is implemented.</td>
    <td> &lt;action type="template_command" language="cheetah"&gt;#if env.PATH: <br />make <br />#end if&lt;/action&gt;</td>
    <td> release_2013.08.12</td>
  </tr>
</table>


# Supported tool_dependencies.xml Tag Sets

* INSTALL_DIR = installation directory (absolute path with no trailing slash), useful to pass it to ./configure --prefix=$INSTALL_DIR or to set environment variables
* REPOSITORY_INSTALL_DIR = the directory (absolute path with no trailing slash) where your XML files are located (tool, or tool_dependencies.xml XML files)
* TMP_WORK_DIR = temporary working directory (absolute path with no trailing slash) used during tool installation. All files are downloaded here, unpacked etc. This directory will be removed after installation
