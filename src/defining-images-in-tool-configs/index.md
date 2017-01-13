<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'><img src="/src/images/Logos/ToolShed.jpg" alt="Galaxy Main Tool Shed" height="174" /></a> </div>

# Properly defining the location of images in tool configuration files

Tool configuration files included in repositories in the tool shed that display images in the tool's help section define the images using any of the following example definitions.  The previously required **$PATH_TO_IMAGES** is now deprecated, and is ignored if used.  The "best practice" for including image files within the repository is to place them in the directory path <repository root>/static/images within the repository hierarchy in the tool shed.

```
.. image:: <some image file name>
.. image:: $PATH_TO_IMAGES/<some image file name>
.. image:: http://<some valid url>/<some image file name>
.. image:: https://<some valid url>/<some image file name>
.. image:: /<some directory name within ~repository root/static/images>/<some image file name>
```


Any of the above image definitions in the tool help section will result in the proper display of the image in the tool shed when the tool is displayed inside of it's containing repository.  It will also display correctly when the tool is loaded from it's repository into the Galaxy tool panel after it has been installed into Galaxy.
