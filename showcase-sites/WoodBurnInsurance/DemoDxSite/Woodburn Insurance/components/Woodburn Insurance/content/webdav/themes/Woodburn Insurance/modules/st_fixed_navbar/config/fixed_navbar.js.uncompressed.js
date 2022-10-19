/**
 * This script checks to see if the Toolbar is located in the same frame as the
 * navbar and main content. If it's not we account for this by adjusting the
 * padding by adding the .stNoToolbar class to the main content element.
 */
(function () {
	var header = document.getElementsByTagName('header')[0],
		mainContent = document.getElementsByClassName('stMainContent')[0],
		toolbar = document.getElementsByClassName('wpToolbarActionBar'),
		footer = document.getElementById('stFooter');

	header.className += ' stFixedNavbar';
	mainContent.className += ' stFixedNavbar';

	// set the padding for the main content to that off the navbar
	mainContent.style.paddingTop = header.offsetHeight+"px";
	mainContent.style.paddingBottom = footer.offsetHeight+"px";
	
	window.onresize = function () {
		// the browser window has been resized, refresh the top padding on the
		// main content
		mainContent.style.paddingTop = header.offsetHeight+"px";
		mainContent.style.paddingBottom = footer.offsetHeight+"px";
	};
})();