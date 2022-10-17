/**
 * 	This javascript object controls the non-mobile navigation menu for the two-level, mega-menu, and bootstrap
 *	navigation. It also keeps track of the top level parent of the currently opened child page. It contains the
 *	following:
 *		openParentId
 *			the top level parent of the currently opened child. This is used by themeMobileNavigation.js to
 *			determine if a child menu should be opened when opening the navigation menu
 *		navMenuClick(pageUrl, subMenuName)
 *			determines what to do when you click a page in the navigation. If the page has no children, it opens 
 *			that page. If the page has children and the child menu is closed, it opens the child menu. If the page
 *			has children and the child menu is opened, it opens the page. If the child menu is opened and you click
 *			elsewhere on the page or resize the window, the child menu closes.
 *		bootstrapNavMenuClick(pageUrl, subMenuName)
 *			the logic is similar to navMenuClick except it uses bootstrap classes.
 *		closeSubMenu(subMenuDivClassString, subMenuDiv)
 *			this swaps css classes which causes the child menu to be hidden
 */
var stnav = {
	openParentId : null,
	setSelectedPage : function(pageOid) {
		// used to populate the sourceContentNode element with the selected page so the 
		// search center's "Close Search" button knows what page to return to
		var selectedPageData = document.getElementById("stSelectedPage");
		if (typeof selectedPageData != "undefined") {
			(typeof selectedPageData.dataset != 'undefined')? selectedPageData.dataset.selectedPage = pageOid : selectedPageData.setAttribute('data-selected-page', pageOid);	
		}
	},
	navMenuClick : function(pageUrl, subMenuName, parentNode) {
		var subMenuDiv = document.getElementById(subMenuName);
		if (subMenuDiv == null || window.innerWidth <= 768) {
			// there is no sub menu or this is mobile navigation so open the page
			document.location.href = pageUrl;
		}
		else {
			var subMenuDivClassString = subMenuDiv.className;
			if (subMenuDivClassString.indexOf("stDisplayNone") > -1) {
				// set the div's location relative to parent
				var navigationDiv = document.getElementById("stNavigation");
				subMenuDiv.style.top = navigationDiv.getBoundingClientRect().bottom+"px";
				// replace class so div is visible
				subMenuDivClassString = subMenuDivClassString.replace("stDisplayNone", "stOpenNavLevel");
				subMenuDiv.className = subMenuDivClassString;
				// close submenu when resizing window
				i$.bindDomEvt(window, "resize", function() {
					stnav.closeSubMenu(subMenuDivClassString, subMenuDiv);
				});
				// close submenu when clicking elsewhere on page
				i$.bindDomEvt(document.getElementById("stPageFrame"), "click", function(e) {
					if (!parentNode.contains(e.target)) {
						stnav.closeSubMenu(subMenuDivClassString, subMenuDiv);
					}
				});
				// close submenu when tabbing out of it
				var tabSubMenu = i$.bindDomEvt(document.getElementById("stPageFrame"), "keyup", function(e) {
					if (e.keyCode == 9 && (!subMenuDiv.contains(e.target) && !parentNode.contains(e.target))) {
						stnav.closeSubMenu(subMenuDivClassString, subMenuDiv);
						i$.unbindDomEvt(tabSubMenu);
					}
				});
			}
			else {
				// the submenu is open so this click opens the page
				document.location.href = pageUrl;
			}
		}
	},
	bootstrapNavMenuClick : function (pageUrl, subMenuName, parentNode) {
		var subMenuDiv = document.getElementById(subMenuName);
		if (subMenuDiv == null || window.innerWidth <= 768) {
			document.location.href = pageUrl;
		} else {
			if(subMenuDiv.className.indexOf('in') > -1) {
				document.location.href = pageUrl;
			} else {
				subMenuDiv.className += ' in';
			}
			i$.bindDomEvt(window, "resize", function() {
				subMenuDiv.className = 'collapse';
			});
			i$.bindDomEvt(document.getElementById("stPageFrame"), "click", function(e) {
				if (!parentNode.contains(e.target)) {
					subMenuDiv.className = 'collapse';
				}
			});
			// close submenu when tabbing out of it
			i$.bindDomEvt(document.getElementById("stPageFrame"), "keyup", function(e) {
				if (e.keyCode == 9 && !subMenuDiv.contains(e.target)) {
					subMenuDiv.className = 'collapse';
				}
			});
		}
	},
	closeSubMenu : function(subMenuDivClassString, subMenuDiv) {
		subMenuDivClassString = subMenuDivClassString.replace("stOpenNavLevel", "stDisplayNone");
		subMenuDiv.className = subMenuDivClassString;
		
	}
};
