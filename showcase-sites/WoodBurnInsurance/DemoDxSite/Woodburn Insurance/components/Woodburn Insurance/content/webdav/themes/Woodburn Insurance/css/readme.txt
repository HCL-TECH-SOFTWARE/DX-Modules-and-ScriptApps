CSS Overview
************

The css folder contains several css files. If you open them, you will notice that they do not contain
actual css class definitions. Instead, they import a number of other css files from the default
folder. This allows the theme to retrieve all the stylesheets with fewer requests. For each css file
in this folder there is a filename.css, which combines the compressed versions of the files, and a 
filename.css.uncompressed.css, which combines the uncompressed versions. The compressed versions
are used by default, but you may switch the the uncompressed versions for development and debugging
by going to Administration -> Theme Analyzer -> Utilities -> Control Center -> Remote Debugging and
clicking one of the "Click to turn on" links. This should be turned off in a production environment.

The stylesheets in the files named master are those which are specific the this theme. The others are
part of the menu framework and provide the styles to support the display of the menus used by the theme.

More information on the specific stylesheets can be found in this folder's 'default' folder.