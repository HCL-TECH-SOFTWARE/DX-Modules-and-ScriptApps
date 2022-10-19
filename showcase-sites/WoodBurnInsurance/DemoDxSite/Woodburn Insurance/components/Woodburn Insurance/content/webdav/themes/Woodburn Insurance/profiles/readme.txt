Profiles Overview (English)
*****************

This 'profiles' folder within WebDAV is a well defined folder by WebSphere Portal to define which set of 
modules should get loaded by the resource aggregator framework for particular themes and pages. Within this 
folder is one .json file per profile - create your own .json file for your own profile. You can copy, rename
and modify one of the existing .json files in order to see and learn the .json syntax that is required.

Once you define your profiles, you can assign one to be the default profile for the entire theme.
Refer to "Changing the theme default profile" in the wiki documentation for the ways to do this. 
And/or, you can also override the default profile for certain pages by assigning a different profile 
for certain pages. Do this through the page's Page Properties -> Advanced -> Theme Settings -> Profile
setting, or refer to "Setting a profile override on a page" in the wiki documentation for additional ways
to do this.

A summary of the .json syntax is as follows:

- A single object with a moduleIDs array (required), a deferredModuleIDs array (required),
  a titles array (optional) and a descriptions array (optional). (An object in .json notation is {} and 
  an array in .json notation is []):

	{
		"moduleIDs": [
		],
		"deferredModuleIDs": [
		],
		"titles": [
		],
		"descriptions": [
		]
	}
	
  - 1 to n strings within the moduleIDs array, where each string is a module id, representing those modules
    that the system should load in all page modes including view mode:

        "moduleIDs": [
	      "wp_theme_portal_85",
    	  "wp_dynamicContentSpots_85",
	      "wp_toolbar_host",
    	  "wp_portlet_css",
	      "wp_one_ui"
		],
		
  - 1 to n strings within the deferredModuleIDs array, where each string is a module id, representing those 
    modules that the system should defer loading until only certain pages modes such as edit mode:

        "deferredModuleIDs": [
	      "wp_theme_widget",
    	  "wp_toolbar",
	      "wp_project_menu_edit",
    	  "wp_preview_menu"
		],
		
  - 1 to n objects within the titles array, each with a value string (required) and a lang string
    (required). These define the title or display name of your profile as it will appear in certain
    parts of Portal such as in the Page Properties dialog and Theme Analyzer portlet, in as many different 
    languages as you need:
       
		"titles": [
			{
				"value":"My Profile",
				"lang":"en"
			}
		],
       
  - 1 to n objects within the descriptions array, each with a value string (required) and a lang string
    (required). These define the description of your profile as it will appear in certain
    parts of Portal such as in the Page Properties dialog and Theme Analyzer portlet, in as many different 
    languages as you need:
       
		"descriptions": [
			{
				"value":"A profile that provides xyz functionality",
				"lang":"en"
			}
		]
       
Any time that you modify a .json file in this 'profiles' folder, you need to invalidate
the resource aggregator cache for WebSphere Portal to pick up the changes.
You can do this by going to Administration -> Theme Analyzer -> Utilities -> Control Center.
On the Control Center page click the link under 'Invalidate Cache'.

If you have any syntax errors in your .json or problems getting your profiles to work, use the
Theme Analyzer portlet to narrow down the problem. Go to Administration -> Theme Analyzer -> Validation Report
and examine and take action on the error and warning messages. You can also analyze details of what is going on 
with the profile of any page by going to Administration -> Theme Analyzer -> Examine page profile information,
and details of what is going on with the modules of any profile by going to 
Administration -> Theme Analyzer -> Examine modules by profile.



