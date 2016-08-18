---
autotoc: true
---
<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'><img src='/Images/Logos/ToolShed.jpg' alt='Galaxy Main Tool Shed' height="174" /></a> </div>


# Including custom data types that subclass from Galaxy data types in the distribution
If your repository includes tools that require data types that are not defined in the Galaxy distribution, you can include the required data types in the repository along with your tools, or you can create a separate repository to contain them. The repository must include a file named **datatypes_conf.xml**, which is modeled after the file named **datatypes_conf.xml.sample** in the Galaxy distribution. This section describes support for including data types that subclass from data types in the Galaxy distribution. Refer to the next section for details about data types that use your own custom class modules included in your repository.
An example of this is the datatypes_conf.xml file in the [emboss_datatypes repository](http://toolshed.g2.bx.psu.edu/repository/browse_categories?sort=name&id=3ac79d5752c6d938&f-deleted=False&webapp=community&f-free-text-search=emboss&operation=view_or_manage_repository) in the main Galaxy tool shed, shown below.

![](/emboss_datatypes_contents.png)

Tool shed repositories that include valid **datatypes_conf.xml** files will display the data types in the **Preview tools and inspect metadata by tool version** section of the view or manage repository page.

![](/emboss_datatypes.png)

# Including custom data types that use class modules contained in your repository

Including custom data types that use class modules included in your repository is a bit tricky. As part of your development process for tools that use data types that fall into this category, it is highly recommended that you host a local Galaxy tool shed. When your newly developed tools have proven to be functionally correct within your local Galaxy instance, you should upload them, along with all associated custom data types files and modules to your local tool shed to ensure that everything is handled properly within the tool shed. When your local tool shed repository is functionally correct, install your repository from your local tool shed to a local Galaxy instance to ensure that your tools and data types properly load both at the time of installation and when you stop and restart your Galaxy server. You should not upload your tools to the main Galaxy tool shed until you have confirmed that everything works by following these steps.
To illustrate how this works, we'll use the [gmap repository](http://toolshed.g2.bx.psu.edu/repository/browse_categories?sort=name&id=4131098bea459833&f-deleted=False&webapp=community&f-free-text-search=gmap&operation=view_or_manage_repository) in the main Galaxy tool shed as an example. The **datatypes_conf.xml** file included in this repository looks something like the following. You'll probably notice that this file is modeled after the **datatypes_conf.xml.sample** file in the Galaxy distribution, but with some slight differences.

Notice the <datatypes_files> tag set. This tag set contains <datatype_file> tags, each of which refers to the name of a class module file name within your repository (in this example, there is only one file named gmap.py), which contains the custom data type classes you've defined for your tools.

In addition, notice the value of each "type" attribute in the <datatype> tags. The **:** separates the class module included in the repository (in this example, the class module is "gmap") from the class name ("GmapDB", "!IntervalAnnotation", etc). It is critical that you make sure your datatype tag definitions match the classes you've defined in your class modules or the data type will not properly load into a Galaxy instance when your repository is installed.

```xml
<?xml version="1.0"?>
<datatypes>
    <datatype_files>
        <datatype_file name="gmap.py"/>
    </datatype_files>
    <registration>
        <datatype extension="gmapdb" type="galaxy.datatypes.gmap:GmapDB" display_in_upload="False"/>
        <datatype extension="gmapsnpindex" type="galaxy.datatypes.gmap:GmapSnpIndex" display_in_upload="False"/>
        <datatype extension="iit" type="galaxy.datatypes.gmap:IntervalIndexTree" display_in_upload="True"/>
        <datatype extension="splicesites.iit" type="galaxy.datatypes.gmap:SpliceSitesIntervalIndexTree" display_in_upload="True"/>
        <datatype extension="introns.iit" type="galaxy.datatypes.gmap:IntronsIntervalIndexTree" display_in_upload="True"/>
        <datatype extension="snps.iit" type="galaxy.datatypes.gmap:SNPsIntervalIndexTree" display_in_upload="True"/>
        <datatype extension="gmap_annotation" type="galaxy.datatypes.gmap:IntervalAnnotation" display_in_upload="False"/>
        <datatype extension="gmap_splicesites" type="galaxy.datatypes.gmap:SpliceSiteAnnotation" display_in_upload="True"/>
        <datatype extension="gmap_introns" type="galaxy.datatypes.gmap:IntronAnnotation" display_in_upload="True"/>
        <datatype extension="gmap_snps" type="galaxy.datatypes.gmap:SNPAnnotation" display_in_upload="True"/>
    </registration>
    <sniffers>
        <sniffer type="galaxy.datatypes.gmap:IntervalAnnotation"/>
        <sniffer type="galaxy.datatypes.gmap:SpliceSiteAnnotation"/>
        <sniffer type="galaxy.datatypes.gmap:IntronAnnotation"/>
        <sniffer type="galaxy.datatypes.gmap:SNPAnnotation"/>
    </sniffers>
</datatypes>
```


**Modules that include custom datatype class definitions cannot use relative import references for imported modules.** To function correctly when your repository is installed in a local Galaxy instance, your class module imports must be defined as absolute from the galaxy subdirectory inside the Galaxy root's lib subdirectory. For example, assume the following import statements are included in our example gmap.py file. They certainly work within the Galaxy development environment when the gmap tools were being developed.

```python
import data
from data import Text
from metadata import MetadataElement
```


However, the above relative imports will not work when the gmap.py class module is installed from the tool shed into a local Galaxy instance because the modules will not be found due to the use of the relative imports. The developer must use the following approach instead. Notice that the imports are written such that they are absolute relative to the ~/lib/galaxy subdirectory.

```python
import galaxy.datatypes.data
from galaxy.datatypes.data import Text
from galaxy.datatypes.metadata import MetadataElement
```


The use of <converter> tags contained within <datatype> tags is supported in the same way they are supported within the **datatypes_conf.xml.sample** file in the Galaxy distribution.

```xml
<datatype extension="ref.taxonomy" type="galaxy.datatypes.metagenomics:RefTaxonomy" display_in_upload="true"
    <converter file="ref_to_seq_taxonomy_converter.xml" target_datatype="seq.taxonomy"/>
</datatype>
```


# Including datatype converters and display applications

To include your custom datatype converters or display applications, add the appropriate tag set to your repository's **datatypes_conf.xml** file in the same way that they are defined in the **datatypes_conf.xml.sample** file in the Galaxy distribution.

If you include datatype converter files in your repository, all files (the disk file referred to by the value of the "file" attribute) must be located in the same directory in your repository hierarchy. Similarly, your datatype display application files must all be in the same directory in your repository hierarchy (although the directory can be a different directory from the one containing your converter files). This is critical because the Galaxy components that load these custom items assume each of them are located in the same directory.
