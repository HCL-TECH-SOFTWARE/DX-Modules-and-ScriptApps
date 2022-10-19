Bootstrap Module
================

This is a simple module that allows users to add Bootstrap to their theme. This
module contains Bootstrap v3.3.4 which can be downloaded from
http://getbootstrap.com

How to use this module
----------------------
To use Bootstrap in your theme simply add wp_bootstrap_ext to your profile's
module list. After that you can add Bootstrap classes and plugins to your
theme.html and portlets.

Additions to Bootstrap in this module
-------------------------------------
v334/css/bootstrap-overrides.css contains css definitions that ensure that
default portal styles are not overridden by Bootstrap. It also contains the
class definitions needed for the st_bootstrap_nav dynamic content spot to
render correctly

How to upgrade this module to a newer version of Bootstrap
----------------------------------------------------------
1. Create a new directory for the new version of Bootstrap
2. Download the version of Bootstrap you wish to upgrade to from http://getbootstrap.com
3. Add the css, fonts, and js directories from the downloaded version you
dowloaded to the directory you created in step 1.
4. copy the bootstrap_overrides.css from v334/css to <new version>/css
5. Update ../contributions/bootstrap.json
	1. Change the version number of the "bootstrap" module to that of your new
	version
	2. change the paths from /bootstrap/v334/* to /bootstrap/<new version>/*