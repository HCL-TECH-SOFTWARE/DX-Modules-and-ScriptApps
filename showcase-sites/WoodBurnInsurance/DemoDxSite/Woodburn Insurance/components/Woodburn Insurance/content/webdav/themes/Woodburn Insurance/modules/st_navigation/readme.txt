Navigation Module
*****************

The st_navigation module contains two javascript files: config/themeMobileNavigation.js and head/themeNavigation.js

+ themeMobileNavigation.js
	This javascript object controls the mobile navigation menu and contains three functions.
		toggleMobileNavigation() 
			-opens and closes the mobile navigation menu 
			-swaps the open/close menu icons
			-closes the menu if the window is resized
		toggleMobileNavigationParent(id)
			-opens and closes the child page menu and swaps the open/close parent icons
			-resets the height of the container and background to accommodate the expanded height
		closeNavMenu(navDiv, toggleDiv, navBackgroundDiv)
			-closes any child menus that are open and swaps the open/close parent icons
			-swaps the open/close menu icons
			-closes the navigation menu

+ themeNavigation.js
	This javascript object controls the non-mobile navigation menu for the two-level, mega-menu, and bootstrap
	navigation. It also keeps track of the top level parent of the currently opened child page. It contains the
	following:
		openParentId
			the top level parent of the currently opened child. This is used by themeMobileNavigation.js to
			determine if a child menu should be opened when opening the navigation menu.
		navMenuClick(pageUrl, subMenuName)
			determines what to do when you click a page in the top level navigation. If the page has no children, it 
			opens that page. If the page has children and the child menu is closed, it opens the child menu. If the 
			page has children and the child menu is opened, it opens the page. If the child menu is opened and you 
			click elsewhere on the page or resize the window, the child menu closes.
		bootstrapNavMenuClick(pageUrl, subMenuName)
			the logic is similar to navMenuClick except it uses bootstrap classes.
		closeSubMenu(subMenuDivClassString, subMenuDiv)
			this swaps css classes which causes the child menu to be hidden.