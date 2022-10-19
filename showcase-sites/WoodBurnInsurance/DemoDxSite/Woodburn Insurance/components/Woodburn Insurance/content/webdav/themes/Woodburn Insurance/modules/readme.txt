Simple Modules Overview (English)
***********************

The 'modules' folder within WebDAV is a well defined folder by WebSphere Portal to provide
Simple Modules to the resource aggregator framework. It allows to define modules in a quick
fashion with a limited set of features. If you need all features of the framework you need
to define your modules through a plugin.xml or JSON file within the WebDAV/contributions
folder.

Each subdirectory within this 'modules' folder defines one module.
WebDAV Root
+ modules
+-- module A
+-- module B
+-- ...
+-- module Z

In order to get started quickly there is one pre-defined module called 'getting_started_module'
that you can use to get your resources served up directly.
Simply add your Javascript, CSS or markup file inside one of the subfolders (config or head) and
your resources will be picked up by WebSphere Portal. Please note that you need to invalidate
the resource aggregator cache for WebSphere Portal to pick up the changes.
You can do this by going to Administration -> Theme Analyzer -> Utilities -> Control Center.
On the Control Center page click the link under 'Invalidate Cache'.

Once you start to create your own module, by creating new directory in the 'modules' directory,
you need to make sure that the module is picked up by WebSphere Portal. This is done by adding it
to the profile that is currently set on your page. Usually this will be the default profile.
You can verify the profile for any given page by using the Theme Analyzer's Page Explorer function.
The Page Explorer can be found by going to Administration -> Theme Analyzer -> Examine page profile information.

For further instructions on simple modules read the readme.txt file within the
'getting_started_module' folder.


