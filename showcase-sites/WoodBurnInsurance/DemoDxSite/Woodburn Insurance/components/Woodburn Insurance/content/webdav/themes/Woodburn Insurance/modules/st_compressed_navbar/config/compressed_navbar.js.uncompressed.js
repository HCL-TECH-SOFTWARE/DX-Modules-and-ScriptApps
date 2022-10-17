/**
 * This script checks to see if the page is being scrolled. If it is we check
 * the direction. When scrolling down the page we will apply the compressed
 * class to the navbar. If we are going up or are at the top of the page
 * (needed to check for safari bouncing the page) we remove the compressed
 * class
 */
(function () {
	var navbar = document.getElementById("stBanner");
	var oldScroll = window.scrollY || window.pageYOffset;
	window.onscroll =  function () {
		// only compress navbar if the mobile navigation panel is not open
		if ((document.getElementById('stNavigation').className.indexOf('stNavigationShow') == -1) && document.getElementsByClassName("wpthemeMenuShow").length == 0 ) {
			var y = window.scrollY || window.pageYOffset;
			if (y > oldScroll && y != 0) {
				// not at top of page, compress navbar
				navbar.className = 'stBanner stGroup compressed';
			} else {
				// at top of page, give full navbar
				navbar.className = 'stBanner stGroup';
			}
			oldScroll = y;
		}
	};
})();