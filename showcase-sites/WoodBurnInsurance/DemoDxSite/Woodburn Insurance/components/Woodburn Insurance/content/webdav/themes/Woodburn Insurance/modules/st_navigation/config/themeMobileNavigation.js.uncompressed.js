/**
 *  This javascript object controls the mobile navigation menu and contains four functions.
 *    toggleMobileNavigation()
 *      -opens and closes the mobile navigation menu and swaps the open/close menu icons
 *      -closes the menu if the window is resized
 *    toggleMobileNavigationParent(id)
 *      -opens and closes the child page menu and swaps the open/close parent icons
 *      -resets the height of the container and background
 *    closeNavMenu(navDiv, toggleDiv, navBackgroundDiv)
 *      -closes any child menus that are open
 *      -swaps the open/close menu icons
 *      -closes the navigation menu
 *    manageNavScroll
 *      -adds a scrollbar if the height of the nav list is longer than the available height
 *    manageBootstrapNavScroll
 *      -only for bootstrap navigation - once bootstrap has finished its collapse processing
 *          -swaps the open/close menu icons
 *          -adds a scrollbar if the height of the nav list is longer than the available height
 */
var stmobilenav = {
	topHeight : 91, // the toolbar + banner heights = 91 (adjust if yours are different)
	toggleMobileNavigation : function() {
		// get the elements
		var navDiv = document.getElementById("stNavigation");
		var toggleDiv = document.getElementById("stMobileNavToggle");
		var navBackgroundDiv = document.getElementById("stMobileNavBackground");
		// close menu when window is resized
		i$.bindDomEvt(window, "resize", function() {
			stmobilenav.closeNavMenu(navDiv, toggleDiv, navBackgroundDiv);
		});
		if (navDiv.className.indexOf("stNavigationShow") > -1) {
			// if the menu is visible close it
			this.closeNavMenu(navDiv, toggleDiv, navBackgroundDiv);
			navDiv.setAttribute("aria-hidden","true");
		}
		else {
			// if the menu is not visible, swap css classes and position the menu on the screen
			navDiv.className = navDiv.className.replace("stNavigation", "stNavigationShow");
			navDiv.setAttribute("aria-hidden", "false");
			navDiv.style.top = document.getElementById("stBanner").getBoundingClientRect().bottom+"px";
			navBackgroundDiv.className = navBackgroundDiv.className.replace("stMobileNavBackground", "stMobileNavBackgroundShow");
			document.getElementById("stNavToggleMenuIcon").className.baseVal="fade-out";
			document.getElementById("stNavToggleCloseIcon").className.baseVal="fade-in";
			document.getElementById("stMobileNavBackground").style.height = window.outerHeight-this.topHeight+"px";
			var navContainer = (document.getElementById("stNavContainer")!=null)?document.getElementById("stNavContainer"):document.getElementById("stBootstrapNav");
			if (navContainer != null) navContainer.style.height = window.outerHeight-this.topHeight+"px";
			toggleDiv.className += " selected";
			if (stnav.openParentId != null) {
				this.toggleMobileNavigationParent(stnav.openParentId);
			}
			this.manageNavScroll();
			// close nav menu when tabbing out of it
			i$.bindDomEvt(document.getElementById("stPageFrame"), "keyup", function(e) {
				if (e.keyCode == 9 && !navDiv.contains(e.target)) {
					stmobilenav.closeNavMenu(navDiv, toggleDiv, navBackgroundDiv);
				}
			});
			
		}
	},
	toggleMobileNavigationParent : function(id) {
		// the id of the child div is pagename_container and the id of the parent toggle is pagename_toggle
		var prefix = id.substring(0, id.lastIndexOf("_toggle"));
		var childDiv = document.getElementById(prefix+"_container");
		if (childDiv.className.indexOf("stDisplayNone") > -1) {
			// the child pages are not visible so swap the css class to show them and adjust background and container heights
			childDiv.className = childDiv.className.replace("stDisplayNone", "stOpenNavLevel");
			document.getElementById(prefix+"_toggleOpen").className.baseVal="stDisplayNone";
			document.getElementById(prefix+"_toggleClose").className.baseVal="stDisplayInherit";
			document.getElementById("stMobileNavBackground").style.height = window.outerHeight-this.topHeight+"px";
			var navContainer = (document.getElementById("stNavContainer")!=null)?document.getElementById("stNavContainer"):document.getElementById("stBootstrapNav");
			if (navContainer != null) navContainer.style.height = window.outerHeight-this.topHeight+"px";
		}
		else {
			// the child pages are visible so swap the css classes to hide them
			childDiv.className = childDiv.className.replace("stOpenNavLevel", "stDisplayNone");
			document.getElementById(prefix+"_toggleOpen").className.baseVal="stDisplayInherit";
			document.getElementById(prefix+"_toggleClose").className.baseVal="stDisplayNone";
		}
		this.manageNavScroll();

	},

	closeNavMenu: function(navDiv, toggleDiv, navBackgroundDiv) {
		var subMenus = document.getElementsByClassName("stOpenNavLevel");
		// close any child menus that are open by swapping css classes
		for (var i=0; i<subMenus.length; i++) {
			var prefix = subMenus[i].id.substring(0, subMenus[i].id.indexOf("_"));
			document.getElementById(prefix+"_toggleOpen").className.baseVal="stDisplayInherit";
			document.getElementById(prefix+"_toggleClose").className.baseVal="stDisplayNone";
			subMenus[i].className = subMenus[i].className.replace("stOpenNavLevel", "stDisplayNone");
		}
		// swap the open/close menu icons
		document.getElementById("stNavToggleMenuIcon").className.baseVal="fade-in";
		document.getElementById("stNavToggleCloseIcon").className.baseVal="fade-out";
		toggleDiv.className = toggleDiv.className.replace(" selected", "");
		var backgroundHeight = navDiv.clientHeight;
		// close the menu by swapping css classes then adjust height
		navDiv.className = navDiv.className.replace("stNavigationShow", "stNavigation");
		navDiv.style.height = backgroundHeight +"px";
		if(navBackgroundDiv){
			navBackgroundDiv.style.height = 0;
		}
		
		var navContainer = (document.getElementById("stNavContainer")!=null)?document.getElementById("stNavContainer"):document.getElementById("stBootstrapNav");
		if (navContainer != null) navContainer.style.height = '';
		window.setTimeout(function(){ //wait for animation to complete before removing background
			if(navBackgroundDiv){
				navBackgroundDiv.className = navBackgroundDiv.className.replace("stMobileNavBackgroundShow", "stMobileNavBackground");
			}
			navDiv.removeAttribute("style");
			}, 250);
	},
	
	manageNavScroll: function() {
		// navHeight will change if a child page menu is open/closed
		var navHeight = document.getElementById("stNavContent").scrollHeight;
		if ((window.innerHeight-this.topHeight) < navHeight) {
			document.getElementById("stNavigation").style.overflowY = "scroll";
		}
		else {
			document.getElementById("stNavigation").style.overflowY = "hidden";
		}
	},
	
	manageBootstrapNavScroll: function(id) {
		// swap the icon and set scroll
		var prefix = id.substring(0, id.lastIndexOf("_toggle"));
		var containerDiv = document.getElementById(prefix+"_container");
		if (containerDiv.className == "collapse") {
			// child pages are not visible
			$("#"+prefix+"_container").on("shown.bs.collapse", function() {
				// after it is shown - swap the icon and set the scroll
				document.getElementById(prefix+"_toggleOpen").className.baseVal="stDisplayNone";
				document.getElementById(prefix+"_toggleClose").className.baseVal="stDisplayInherit";
				stmobilenav.manageNavScroll();
			});
		}
		else {
			// child pages are visible
			$("#"+prefix+"_container").on("hidden.bs.collapse", function() {
				// after it is hidden - swap the icon and set the scroll
				document.getElementById(prefix+"_toggleOpen").className.baseVal="stDisplayInherit";
				document.getElementById(prefix+"_toggleClose").className.baseVal="stDisplayNone";
				$("#"+prefix+"_container").removeAttr("style");
				stmobilenav.manageNavScroll();
			});
		}
	}
};
