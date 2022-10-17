Skins
*****

A skin defines the appearance of the area surrounding a portlet. It includes a header area, which
contains the Portlet menu and possibly the Content menu, and a body area which contains the body
of the portlet.

In this theme there is only one skin which is called Standard. This skin is only visible in edit
mode, and the skin header is only visible when you hover over the portlet body. 

The markup for the skin can be found in the skins/Standard/skin.html file, where you will see there
is a div for the header and one for the body. The two menus in the skin header are rendered differently. 
The Content menu is loaded by the wp_skin_cam module. It is hidden by default because not all portlets 
support the Content menu. The Portlet menu is loaded by calling wptheme.contextMenu.init on clicking
the anchor which contains the icon.
