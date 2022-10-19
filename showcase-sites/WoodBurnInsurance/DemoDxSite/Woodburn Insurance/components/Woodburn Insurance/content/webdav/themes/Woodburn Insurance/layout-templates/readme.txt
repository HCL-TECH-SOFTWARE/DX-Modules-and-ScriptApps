Layout Templates
****************

The 'layout-templates' folder within WebDAV is a well defined folder by WebSphere Portal to define which layout 
templates exist and can be used on a page from the toolbar. Within this folder are several other folders, one for
each layout type. Each folder contains a layout.html with the markup for the layout and and icon file which is the
icon which will appear in the toolbar. You can copy, rename and modify one of the existing folders in order to 
see and learn the layout.html syntax that is required.

The layout.html files use a grid layout, so that when you reduce the width of your browser window, the component
containers will stack instead of scrolling horizontally off the page. The css for this is found in the st_layoutGrid
module.

The grid class hierarchy must be organized as follows:
	st-section
		st-row
			st-col
				component-container st-container

The component-container class is required for the system to load the components onto the page, as are any other classes
in those files which do not start with st. 

You'll notice that the st-col div also contains a class like st-col-c-8-of-12. If you look at the layout-grid.css
file in the st_layoutGrid module, you will notice that there are lettered sets of st-col* classes. There is a different
media query for each letter, indicating the width at which the components will stack. Choose the letter which matches
the break point required for your design.

These layouts also include a row for hidden widgets. If you select Hide from the portlet menu, the portlet will be hidden.
To view your hidden portlets click Menu, Show Hidden Content. If you do not have that hidden widgets row on your page you
will not be able to see the hidden portlets and you will not be able to delete them.

Layouts also have a name attribute which is required and there must always be one container named "ibmMainContainer", which
is where the main content of the page is loaded. The following are the possible values if the name attribute 
  
  - "ibmMainContainer" (the primary, main content of the page)
  - "headline" (header or banner across the page)
  - "secondary" (content that is secondary to the main content, such as a sidebar)
  - "tertiary" (content that is secondary to the secondary content, such as a sidebar)
  - "additional" (content that is secondary or beyond to the tertiary content)
  - "footer" (banner or footer across the bottom of the page). 
  
  If you have repeated similar sections in a layout, it is recommended to append 2 through n to the end of 
  any of the recommended names, such as using "additional2" and "additional3". Using these names and this 
  naming convention will increase the likelihood of having smooth, sensible transitions when switching between 
  layouts using the toolbar.

Once you have your custom layout defined, then you need to register it with the system. Do this
by adding a line into the WebDAV <theme>\system\layouts.json file. Copy and modify an existing
line and make the needed changes to point to your custom layout folder and icon and to give your
custom layout a display name and unique id. Your custom layout will now appear on the toolbar.

