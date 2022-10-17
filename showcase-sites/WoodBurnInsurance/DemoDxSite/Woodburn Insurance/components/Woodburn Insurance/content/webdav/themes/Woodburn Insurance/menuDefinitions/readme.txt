Menu Definitions
****************

The menu framework allows you to create menu content based on the content of a json file. This theme
comes with three such files. You can modify the existing files or add your own menus using a similar
format.

+ pageAction.json
	This defines the contents of the action menu. By default, there are no actions. Instead there is
	a header and a link to the IBM Knowledge Center page which describes how to use the menu framework.

+ profileAction.json
	This defines the contents of the profile menu, which includes an entry for Edit Profile and one
	for Log Out. The profile menu entry uses a module called wp_selfcare_item which opens the selfcare
	portlet. The Log Out entry uses a DynamicMenuitem. A list of the available operations can be found
	below

+ skinAction.json
	This defines the items that can appear in the portlet menu of the skin. It contains entries for all
	the possible menu entries, but only the ones that are supported by the portlet are displayed.

The available DynamicMenuitem operations are as follows:
	ibm.portal.operations.assignPagePermissions
	ibm.portal.operations.deletePage
	ibm.portal.operations.editPageLayout
	ibm.portal.operations.editPageProperties
	ibm.portal.operations.viewPageLayout
	ibm.portal.operations.viewPageProperties
	ibm.portal.operations.createPage
	ibm.portal.operations.movePage
	ibm.portal.operations.changePortletMode
	ibm.portal.operations.changeWindowState
	ibm.portal.operations.deletePortlet
	ibm.portal.operations.logoutUser
	ibm.portal.operations.browseTagsPage
	ibm.portal.operations.browseTagsPortlet
	ibm.portal.operations.ratePage
	ibm.portal.operations.ratePortlet
	ibm.portal.operations.tagPage
	ibm.portal.operations.tagPortlet
	ibm.portal.operations.sharePage
	ibm.portal.operations.showImpersonationPage

This folder contains a schema folder which contains the schema for these json files. It also contains
a templates folder. The templates folder contains several files named *MenuTemplate.html which are
part of the menu framework.