Static Theme Resources Overview
*******************************

This main theme folder within WebDAV is where static resources for your theme are provided
to the Portal server and resource aggregator framework. 

The main page definition of your theme starts with the theme template file, theme.html, in this 
folder. This theme template contains the main HTML markup that the Portal server will serve up 
for your theme's pages, including the familiar DOCTYPE, html, head and body tags. Within the
theme template, there are then various dynamic content spots which the Portal server processes,
typically through .jsp's, and replaces with dynamically-calculated static markup for the finally 
rendering page. The dynamic content spots that are available are documented in the help directory.

At the top of the head is the required <link rel="dynamic-content" href="co:head"> dynamic content
spot which is where the resource aggregator framework processes all of the head contributions of the
modules in use, such as .css and .js files, and combines them into a single resource request for
optimal performance. So, in order to participate in this optimal performance, you should not
link your own resources, such as .css and .js files, in the theme template using link tags directly
in the head, but, rather, you should load your own resources through modules. More information on
the modules included in the theme can be found in the help directory.

At the bottom of the body is the required <link rel="dynamic-content" href="co:config"> dynamic 
content spot which is where the resource aggregator framework processes all of the config 
contributions of the modules in use, such as .js and .html files, and again combines them for
optimal performance. Here again, you should load your own resources through modules. See the modules and
contributions summaries below for more information on modules.

Throughout the rest of the theme template are other dynamic content spots that point to .jsp's.

The theme template does not have national language support by default but the IBM Knowledge Center
contains instructions for how to localize your theme.

There is one default theme template, theme.html, for all pages of a theme, but the default can be overridden
for certain pages so that a different theme template can be used. You can copy, rename and modify the theme 
template file and create as many as you need. You then indicate which theme template is in use on a certain 
page by setting the com.ibm.portal.theme.template.file.name.html or 
com.ibm.portal.theme.inherited.template.file.name.html page property in Page Properties. Use the first property 
for setting the theme template for just that one and only one page, or use the second property for setting the 
theme template for that page and all of its descendant pages. You can also set these properties via xmlaccess 
by exporting the xml for the page, adding a value for the com.ibm.portal.theme.template.file.name.html or 
com.ibm.portal.theme.inherited.template.file.name.html parameter near the other page parameters, such as:

<parameter name="com.ibm.portal.theme.template.file.name.html" type="string" update="set"><![CDATA[Plain.html]]></parameter>

or

<parameter name="com.ibm.portal.theme.inherited.template.file.name.html" type="string" update="set"><![CDATA[theme_sidenav.html]]></parameter>

and re-importing the page.

The following are the folders included in the theme. Each folder contains a readme file with more information.

+ bootstrap
	This folder contains the files necessary to use bootstrap navigation. More information can be found in the
	readme file in the 'bootstrap' folder.

+ contributions
	One way to create your own modules, referred to as theme modules, for linking your own 
	resource files is in the 'contributions' folder. Within that folder is one .json file per module or set of
	modules - create your own .json file for your own module or set of modules. You can copy, rename and
	modify one of the existing .json files in order to see and learn the .json syntax that is required.

	Theme modules are scoped to your one theme. If you want to use your custom modules in different themes,
	you have to copy these module definition .json files from one theme to the other.
	
	For further instructions on theme modules read the readme.txt file within the 'contributions' folder.

+ css
	The css folder contains all of the css for the theme that is not associated with a module. Within that folder
	there is a master.css file, which includes all the css found in the folder named default. The default folder
	contains a number of css files, broken up by type of content. There is also an images folder under the css folder.
	That contains the images used by the theme. The 'css' folder and its child folders all include readme files
	with more detailed information.

+ help
	The help folder contains several other help files with more information about the theme and how to modify it.

+ layout-templates
	Layout templates define how portlets are laid out on a page. This folder contains the layout templates which
	are included in the theme. You can use them as is, modify them, or add new ones. More information can be found
	in the readme file in the 'layout-templates' folder.

+ menuDefinitions
	The theme uses the menu framework module to display its menu. The contents of these menus are defined in the 
	json files within the 'menuDefinitions' folder. More information can be found in that folder's readme file. 

+ modules
	An easier way to create your own modules, referred to as simple modules, for linking your own resource
	files is in the 'modules' folder. Within that folder is one folder per module - create your own folder for 
	your own module. There is also one default 'getting_started_module' to get you started. You can simply add 
	your resource files, such as .css and .js files, into the getting_started_module to get started quickly, 
	or use the getting_started_module as an example to see how to create your own similar module folders.

	Simple modules are scoped to your one theme. If you want to use some of these same modules in different themes,
	you have to copy these simple module folders from one theme to the other. More information can be found in 
	the readme file within the 'modules' folder.

+ profiles
	Once you have your modules defined, you turn them on and off using profiles in the 'profiles' folder.
	Within that folder is one .json file per profile - create your own .json file for your own profile or use
	the ones provided. You can copy, rename and modify one of the existing .json files in order to see and 
	learn the .json syntax that is required. Turn any module on by adding it into the profile's list 
	of modules. Turn any module off by removing it from the profile's list of modules. More information 
	can be found in the readme file within the 'profiles' folder.

+ skins
	A skin is the frame that surrounds a portlet and contains the portlet menu. The skin included in this theme 
	is only visible in edit mode. You may modify that skin or add additional ones. More information can be found
	in the readme file within the 'skins' folder.

+ system
	The system folder contains a json file which describes the layouts available for this theme. More information
	can be found in the readme file within the 'system' folder.


