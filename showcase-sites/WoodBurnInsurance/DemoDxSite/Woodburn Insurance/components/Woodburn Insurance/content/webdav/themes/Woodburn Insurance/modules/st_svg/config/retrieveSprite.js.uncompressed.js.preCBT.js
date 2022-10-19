/**
 * This module contains the javascript to retrieve the svg sprite and place it on the page. This
 * is necessary because not all browsers support extraction of specific svg images from an external
 * sprite. It simply gets the file contents and appends it in a div in the complementary content
 * section of the page.
 */
(function(){
	// IE does not support the use tag for external sprites
	var xhr = new XMLHttpRequest();
	xhr.open("GET", ibmCfg.themeConfig.themeRootURI+"/css/images/sprite.svg", true);
	xhr.send();
	xhr.onload = function(e) {
		var div = document.createElement("div");
		div.className = "stDisplayNone";
		div.innerHTML = xhr.responseText;
		document.getElementById("wpthemeComplementaryContent").appendChild(div);
	}
	
})();

