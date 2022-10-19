Layout Grid Module
******************

The st_layoutGrid module contains the grid layout css which is used by the layout templates. It supports a fluid
layout, so that when you reduce the width of your browser window, the component containers will stack instead of 
scrolling horizontally off the page.

The grid class hierarchy must be organized as follows:
	st-section
		st-row
			st-col st-col-<letter and number of cols>
				component-container st-container

This is a 12 column grid and if you look in the css file you'll notice it contains a classes like st-col-c-8-of-12.
The letter can be a-f and each letter grouping has a different media query, which identifies the width at which
the containers will stack. The rest of that class name indicates that you wish the content to span 8 of the available
12 columns.