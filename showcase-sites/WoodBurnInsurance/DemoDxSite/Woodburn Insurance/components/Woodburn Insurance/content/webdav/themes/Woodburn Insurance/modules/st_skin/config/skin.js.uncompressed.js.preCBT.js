/*
 * On a page using the Simple Theme (or a theme derived from it), a portlet's header should only be visible in "Edit"
 * mode when hovering over the portlet, or tabbing to the portlet. A portlet's header should never be visible in "View"
 * mode.
 * 
 * This behavior is accomplished by adding event handlers to various DOM elements within the portlet. These event
 * handlers respond to a specified event ("mouseenter", "mouseleave", "focus", or "blur") by adding or removing a class
 * attribute from the top-level DOM element for the portlet ("stControl"). The display behavior for these class
 * attributes ("stHover" and "stFocus") is defined by the theme using CSS rules, which are in the file "skinLayout.css".
 */
(function() {
    // Add the skin event handlers after the DOM has been loaded.
    i$.addOnLoad(function () {
        // Only add hover and focus support to show/hide the skin header when the page is in edit mode.
        var complementaryContent = document.querySelector(".stComplementaryContent");
        if (i$.hasClass(complementaryContent.ownerDocument.body, 'edit-mode')) {
            // Find all of the top-level portlet elements (class attribute of "stControl") in the document.
            var portletElements = document.querySelectorAll(".stControl");

            // Add the event handlers to each of the top-level portlet elements.
            for (var i = 0; i < portletElements.length; i++) {
                (function(portletElement) {
                    // Only add event handlers if the portlet is visible (has a value for the "offsetParent" attribute.)
                    if (portletElement.offsetParent !== null) {
                        // Add an event handler to the portlet element for the "mouseenter" event.
                        i$.bindDomEvt(portletElement, "onmouseenter",
                            function() {
                                // Respond to a "mouseenter" event by adding the "stHover" class to the portlet element.
                                i$.addClass(portletElement, "stHover");
                            }
                        );
                        // Add an event handler to the portlet element for the "mouseleave" event.
                        i$.bindDomEvt(portletElement, "onmouseleave",
                            function(evt) {
                                // Respond to a "mouseleave" event by removing the "stHover" class from the portlet element.
                                var node = evt.toElement || evt.relatedTarget;
                                if (!complementaryContent.contains(node) && !portletElement.contains(node)) {
                                    i$.removeClass(portletElement, "stHover");
                                }
                            }
                        );
                        // Find all of the focusable link elements within the portlet.
                        var focusableLinkElements = portletElement.querySelectorAll(".stFocusableLink");

                        // Add the event handlers to each of the focusable link elements.
                        for (var j = 0; j < focusableLinkElements.length; j++) {
                            (function(focusableLinkElement) {
                                // Add an event handler to the focusable link element for the "focus" event.
                                i$.bindDomEvt(focusableLinkElement, "onfocus",
                                    function() {
                                        if (i$.hasClass(portletElement, "stFocus")) {
                                            if (i$.hasClass(portletElement, "stHeaderVisible")) {
                                                // the skin header is already displaying so remove it
                                                i$.removeClass(portletElement, "stFocus");
                                            }
                                            else {
                                                i$.addClass(portletElement, "stHeaderVisible");
                                            }    
                                        }
                                        else {
                                            if (i$.hasClass(portletElement, "stHeaderVisible")) {
                                                // second execution - don't refocus
                                                i$.removeClass(portletElement, "stHeaderVisible");
                                            }
                                            else {
                                                // Respond to a "focus" event by adding the "stFocus" class to the portlet element.
                                                i$.addClass(portletElement, "stFocus");
                                            }
                                        }
                                        
                                    }
                                );
                             })(focusableLinkElements[j]);
                        }
                        
                    }
                })(portletElements[i]);
            };
        }
    });
})();
