Theme Images
************

This folder contains the images used by the theme. The following describes where each of these images is used.

+ cam_sharkfin*.png
	These are part of the menu framework and provide the arrow that points to the content in a component action menu

+ dragHandle.png
	This can be used in edit mode by the skin when dragging a component from one location to another. It is not
	currently used since the entire header of the skin is used as the drag handle. It is safe to delete this file.

+ favicon.ico
	This is the icon that displays on the browser tab and next to bookmarks. You can replace this with your own
	icon or you can specify a different file by adding the query parameter faviconLocation with the url to your
	file to the st_head dynamic content spot.

+ loading.gif
	This is spinner that used in multiple locations to indicate that a menu or dialog is loading. If you want to
	use a different image for this, be sure it is named loading.gif because the menu and dialog framework are
	expecting that.

+ loadingDark.gif
	This is a spinner like above, but it is slightly darker.

+ master.png
	This is a sprite that is used by the menu framework.

+ sprite.svg
	This is an svg sprite which contains the images you see in the banner, navigation, and control header of the
	skin. You can change it to use different images but the following ids must remain the in place
		stActions - the image for the actions menu
		stDropdown - the arrow that points down indicating a page has children
		stDropdown-close - the arrow the point up to close navigation
		stLoggedIn-NoImage - the image for the profile menu
		stLoggedOut - the image you click to log in
		