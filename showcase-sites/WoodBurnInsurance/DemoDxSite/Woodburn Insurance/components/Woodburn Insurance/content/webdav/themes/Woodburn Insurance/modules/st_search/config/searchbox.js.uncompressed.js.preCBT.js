/**
* This function manages the behavior of the search button in the theme. It
* checks to see if the search box is open. If it's not we open it. If it is it
* looks to see if the search box is empty. When empty the clicking the button
* closes the search box. If there is a value in the input field we run the
* search.
*/
function toggleSearchButton() {
	var search = document.getElementById('sqf'),
		input = document.getElementById('stSearchBoxInput'),
		btn = document.getElementById('stSearchBoxButton'),
		icon = document.getElementById('stSearchIcon'),
		navDiv = document.getElementById("stNavigation"),
		toggleDiv = document.getElementById("stMobileNavToggle"),
		navBackgroundDiv = document.getElementById("stMobileNavBackground");

	var toggleSearchInput = function(isHidden, item){
		input.setAttribute("tabindex",isHidden ? "-1":"0");
		input.setAttribute("aria-hidden",isHidden ? "true":"false");
		btn.setAttribute("tabindex",isHidden ? "-1":"0");
		btn.setAttribute("aria-hidden",isHidden ? "true":"false");

		if(isHidden) search.className = 'stSearch stLeft';
		else search.className += ' open';

		if(item) item.focus();
	};

	if (search.className.indexOf('open') != -1) {
		if  (input.value == '') {
			// nothing in the search field so just close it
			toggleSearchInput(true);
		} else {
			// set the selected page
			var selectedPageId = document.getElementById("stSelectedPage");
			if (typeof selectedPageId != "undefined") {
				var selectedPageElement = document.getElementById("sourceContentNode");
				if (typeof selectedPageElement != "undefined") {
					selectedPageElement.setAttribute("value", (typeof selectedPageId.dataset != "undefined") ? selectedPageId.dataset.selectedPage : selectedPageId.getAttribute('data-selected-page'));
				}
			}
			// run the search
			document.searchQueryForm.submit();
		}
	} else {
		// close the nav menu
		stmobilenav.closeNavMenu(navDiv, toggleDiv, navBackgroundDiv);

		// open the search
		toggleSearchInput(false, input);

		// setup key events for tab/esc, close on keyup
		i$.bindDomEvt(input, "keyup", function(e) {
			if (e.keyCode == 27) toggleSearchInput(true, icon);
		});
		i$.bindDomEvt(btn, "keyup", function(e) {
			if (e.keyCode == 9) toggleSearchInput(true, icon);

		});
		i$.bindDomEvt(icon, "keyup", function(e) {
			if (e.keyCode == 9) toggleSearchInput(true, icon);
		});
	}

}