<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'><img src="/src/images/Logos/ToolShed.jpg" alt="Galaxy Main Tool Shed" height="174" /></a> </div>

# Enhanced features for linking installed tools and dependencies at execution time

This discussion assumes a level of familiarity with wrapping tools for Galaxy.  For basic details, see the [How to add a tool into Galaxy](http://wiki.galaxyproject.org/Admin/Tools/Adding%20Tools) page.  This commentary is restricted to enhanced Galaxy tool features introduced to enable automatic installation of these types of tools into Galaxy.

## Complex Repository Dependency Definitions

Used in this context, complex repository dependency definitions create a relationship between a tool contained in a dependent repository and a tool dependency contained in another repository.  These relationships enable many tools contained in Tool Shed repositories installed into Galaxy to use a single installation of a tool dependency package.  I'll use revision a54de7e658f7 of repository [bowtie2](http://toolshed.g2.bx.psu.edu/view/devteam/bowtie2) owned by devteam in the main Galaxy Tool Shed as an example for this discussion.  Here are the [contents](http://toolshed.g2.bx.psu.edu/repository/browse_repository?id=126c0918b5459666) of the repository:

```
Contents:
    bowtie2
        bowtie2_wrapper.xml
        test-data/
        tool-data/
        tool_data_table_conf.xml.sample
        tool_dependencies.xml
```


The file named *bowtie2_wrapper.xml* is a Galaxy tool configuration file (a [Cheetah template](http://www.cheetahtemplate.org)) for the tool named Bowtie2 that defines dependencies on version 2.1.0 of the bowtie2 package and version 0.1.18 of the samtools package using the <requirements> tag set.  The installation recipes for both of these packages are contained in other repositories.  The trick is to ensure that when the bowtie2 repository is installed into Galaxy along with its dependencies, the Bowtie2 tool will locate them at execution time.  This is made possible with a small amount of information defined in two places:

1. A `<requirements>` tag set in the bowtie2_wrapper.xml configuration file that defines the tool's requirements on the two packages
2. The repository's tool_dependencies.xml file that defines dependencies for each repository containing the required packages

Here is the `<requirements>` tag set in the *bowtie2_wrapper.xml* configuration file which defines requirements on the two packages contained in separate repositories.  The values of the type and version attributes and the package name of each of the `<requirement>` tags is extremely important in that they must exactly match entries in the repository's *tool_dependencies.xml* file.  To clarify, the `<requirement>` tag for **bowtie2** of type **package** and version **2.1.0** must have an entry with these same attributes in the repository's tool_dependencies.xml file.  The `<requirement>` tag for **samtools** of type **package** and version **0.1.18** must have a matching entry as well.

```
<requirements>
    <requirement type="package" version="2.1.0">bowtie2</requirement>
    <requirement type="package" version="0.1.18">samtools</requirement>
</requirements>
```


Here are the contents of the repository's *tool_dependencies.xml* file.  Notice the two `<package>` tag sets.  The first **package** tag has a name attribute with value **bowtie2** and a version attribute with value **2.1.0**.  These three attributes exactly match the attributes of the first `<requirement>` tag defined in the *bowtie2_wrapper.xml* configuration file.  Similarly, the second **package** tag has a name attribute with value **samtools** and a version attribute with value **0.1.18**.  These three attributes exactly match the attributes of the second `<requirement>` tag defined in the *bowtie2_wrapper.xml* configuration file.  The `<repository>` tag contained within each of these `<package>` tag sets provides the information necessary for installing the repository that contains the recipe for installing the required package.  All of these dependencies will be automatically installed automatically along with the bowtie2 repository when it is installed into Galaxy.

```
<?xml version="1.0"?>
<tool_dependency>
    <package name="bowtie2" version="2.1.0">
        <repository changeset_revision="017a00c265f1" name="package_bowtie2_2_1_0" owner="devteam" prior_installation_required="False" toolshed="http://toolshed.g2.bx.psu.edu" />
    </package>
    <package name="samtools" version="0.1.18">
        <repository changeset_revision="171cd8bc208d" name="package_samtools_0_1_18" owner="devteam" prior_installation_required="False" toolshed="http://toolshed.g2.bx.psu.edu" />
    </package>
</tool_dependency>
```


And that’s it!  This small amount of information in these two locations enables the Tool Shed’s installation process to supply information to the Galaxy environment that enables the Bowtie2 tool to locate its two package dependencies at execution time.
