Theme Modules Overview (English)
**********************

This 'contributions' folder within WebDAV is a well defined folder by WebSphere Portal to provide
theme modules to the resource aggregator framework. Within this folder is one .json file per module or set
of modules - create your own .json file for your own module or set of modules. You can copy, rename and
modify one of the existing .json files in order to see and learn the .json syntax that is required.

Theme modules are scoped to your one theme. If you want to use some of these same modules in different themes,
you have to copy these module definition .json files from one theme to the other.

Note that there is an even easier way to create modules, called simple modules, using the 'modules' folder.
Both are scoped to your one theme. The .json syntax of the theme modules allows for a few more advanced 
things that you cannot do with simple modules, such as:

- declaring a version number for your module
- using device class equations as opposed to just individual device classes
- declaring that a prereq is optional
- using sub-contribution types of config_static and config_dynamic.

But, if you do not need those more advanced things, in most cases you will probably prefer using simple
modules.

For further instructions on simple modules read the readme.txt file within the 'modules' folder.

(Also note that there is third way to create your own modules, referred to as global modules, via plugin.xml
files within the 'WEB-INF' folder within enterprise applications (.ear's). This way involves the most work, 
so you would not do it unless you have good reason, such as for a module that is reused across multiple 
themes and you don't want to duplicate the module definition in each of the themes. Global modules, as the 
name implies, are scoped across all themes.)
 
If theme modules is the right choice for your needs, a summary of the .json syntax is as follows:
(NOTE:  This description has a matching schema in the contributions/schema folder, which can be used
with a schema validation tool to verify a JSON-format contribution file).

- A single object with a modules array (required). (An object in .json notation is {} and an array in
  .json notation is []):

	{
		"modules": [
		]
	}
	
  - 1 to n objects within the modules array, each with an id string (required), a version string (optional),
    a capabilities array (optional), a prereqs array (optional), a contributions array (required*), 
    a titles array (optional) and a descriptions array (optional):

        "modules": [
			{
				"id":"my_module",
				"version":"1.0",
				"capabilities": [
				],
				"prereqs": [
				],
				"contributions": [
				],
				"titles": [
				],
				"descriptions": [
				]
			}
		]
		
		*NOTE:  It is also valid to have a module which consists only of an id and a prereqs array, plus the other 
		optional members, but no contributions.  This is a "meta-module" which can be used to abstract a dependency
		on some other concrete module.  A valid module must have one or both of prereqs and contributions.
		
     - a string value for id, such as "my_module", where the value is the unique id of your module. This value
       is what you will list in a profile to turn your module on.
       
     - a numeric string value for version, such as "1.0", where the value is the version number of your module.
       
     - 1 to n objects within the capabilities array, each with an id string (required)
       and a value string (required). Each id value indicates the id of the capability that this module
       exposes, and each value value indicates the version number of the capability:
       
				"capabilities": [
					{
						"id":"my_capability",
						"value":"1.0"
					}
				],
       
     - 1 to n objects within the prereqs array, each with an id string (required). Each id value indicates the id
       of the module that your module pre-requires:
       
				"prereqs": [
					{
						"id":"my_base_module"
					}
				],
       
     - 1 to n objects within the contributions array, each with a type string of "head", "config" or "menu"
       (required) and a sub-contributions array (required). "head" means the resource contribution will go
       in the head of the page. "config" means the resource contribution will go in the body of the page.
       "menu" menus the resource contribution will go as part of a context menu on the page:
       
				"contributions": [
					{
						"type":"head",
						"sub-contributions": [
						]
					}
				],
       
       - 1 to n objects within the sub-contributions array, each with a type string (required)
         and a uris array (required). If contribution type is "head", sub-contribution type must be "css" or 
         "js". If contribution type is "config", sub-contribution type must be "js", "markup", "config_static"
         or "config_dynamic". If contribution type is "menu", sub-contribution type must be "json":
       
						"sub-contributions": [
							{
								"type":"css",
								"uris":[
								]
							}
						]
       
         - 1 to n objects within the uris array, each with a value string (required), 
           a deviceClass string (optional), a type string (optional) and a lang string (optional).
           The value string is a path relative to your theme's main folder in WebDAV. deviceClass,
           if specified, means that the resource will only be included for certain devices that match.
           The value of deviceClass can be a single device class, such as "smartphone", or a device
           class equation, such as "smartphone+ios". type, if specified, is one of "debug", "rtl" or
           "debug,rtl". "debug" means the resource is only included if remote debugging is on, and its
           value path is usually to the uncompressed version of the resource. "rtl" means the resource
           is only included if the user's locale is a bi-directional one, such as Hebrew, where text
           on the page is presented from right-to-left. lang, if specified, means the resource is only
           included if the user's locale matches the lang specified:
       
								"uris": [
									{
										"value":"/css/my_css.css"
									},
									{
										"value":"/css/my_css.css.uncompressed.css",
										"type":"debug"
									},
									{
										"value":"/css/my_cssRTL.css",
										"type":"rtl"
									},
									{
										"value":"/css/my_cssRTL.css.uncompressed.css",
										"type":"rtl,debug"
									},
									{
										"value":"/css/my_css_smartphone.css",
										"deviceClass":"smartphone"
									},
									{
										"value":"/js/my_js_es.js",
										"lang":"es"
									}
								]
       
     - 1 to n objects within the titles array, each with a value string (required) and a lang string
       (required). These define the title or display name of your module as it will appear in certain
       parts of Portal such as in the Theme Analyzer portlet, in as many different languages as you
       need:
       
				"titles": [
					{
						"value":"My Module",
						"lang":"en"
					}
				],
       
     - 1 to n objects within the descriptions array, each with a value string (required) and a lang string
       (required). These define the description of your module as it will appear in certain
       parts of Portal such as in the Theme Analyzer portlet, in as many different languages as you
       need:
       
				"descriptions": [
					{
						"value":"A module that provides xyz functionality",
						"lang":"en"
					}
				]
       
Any time that you add a file to this 'contributions' folder or make a change, you need to invalidate
the resource aggregator cache for WebSphere Portal to pick up the changes.
You can do this by going to Administration -> Theme Analyzer -> Utilities -> Control Center.
On the Control Center page click the link under 'Invalidate Cache'.

Once you define your new module, you need to add it to a profile to turn it on. 
For further instructions on profiles read the readme.txt file within the 'profiles' folder.

If you have any syntax errors in your .json or problems getting your new module to work, use the
Theme Analyzer portlet to narrow down the problem. Go to Administration -> Theme Analyzer -> Validation Report
and examine and take action on the error and warning messages.

Also, you can refer to the wiki documentation for even more information on the .json syntax, such as there is 
a .json schema file available that shows all of the possible syntaxes and that you can run with your .json
through an online .json validator to verify that it is syntactically correct. 



