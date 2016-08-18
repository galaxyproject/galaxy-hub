---
autotoc: true
---
<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'><img src='/Images/Logos/ToolShed.jpg' alt='Galaxy Main Tool Shed' height="174" /></a> </div>


# Including installation information or 3rd-party tool dependency licensing information in your repository

Include important information like repository installation information or 3rd-party tool dependency licensing information in your repository in a file named one of the following (case is ignored):

* README
* README.rst
* README.txt
* READ_ME
* READ_ME.rst
* READ_ME.txt
* INSTALL.rst
* INSTALL.txt
* <repository name>.rst
* <repository name>.txt

Repositories that include one or more files with one of these names will include a section labeled **Repository README files - may contain important installation or license information** on the main repository page.  File names with a .rst extension will be rendered as `ReStructured Text` so they should be written appropriately, while file names with no extension or a .txt extension will be translated to safe html for rendering.

![](/readme_files_section.png)

When this section is opened by clicking on the triangle or the file name link, the contents of the file are displayed.  Here is the README file for the clustalw repository in the Tool Shed.

![](/clustalw_readme.png)

The contents of this file are also displayed on the page allowing the Galaxy administrator to select the tool panel into which the repository tools should be loaded if the repository includes tools.

Care must be taken when including instructions or other information in README files to ensure the content is clear and correct.

# Properly defining images for display in ReStructured Text repository Readme files

The "best practice" for including image files within the repository is to place them in the directory path <repository root>/static/images within the repository hierarchy.  All of the following images definitions are supported within README files contained in repositories whose name includes a .rst extension.

```
.. image:: <some image file name>
.. image:: http://<some valid url>/<some image file name>
.. image:: https://<some valid url>/<some image file name>
.. image:: /<some directory name within ~repository root/static/images>/<some image file name>
```

