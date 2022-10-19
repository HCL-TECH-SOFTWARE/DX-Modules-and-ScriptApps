Simple Modules - Module Definition (English)
**********************************

The getting started module is a pre-defined module that you can use as starting platform to
quickly inject your own resources into the current theme. Simply add your Javascript, CSS
or markup file inside one of the subfolders (config or head) and your resources will be picked
up by WebSphere Portal. Please note that you need to invalidate the resource aggregator cache
for WebSphere Portal to pick up the changes.
You can do this by going to Administration -> Theme Analyzer -> Utilities -> Control Center.
On the Control Center page click the link under 'Invalidate Cache'.

The following section provides a complete list of features of Simple Modules:

Directory Structure
    /<module-id>                               -- each directory below /modules defines a new module (no support for versions)
       prereqs.properties                      -- Optional file defining the prereqs of this module.
         The file content consist of one module id per new line. Module versions are not supported. Example:
         <module-id>
         <module-id>
       capabilities.properties                 -- Optional file defining the capabilities of this module.
         The file content consist of a properties like style with the name and value separated by an equal sign, one per new line.
         <name>=<value>
         <name>=<value>
       localization.properties                 -- Optional file defining title and description of this module.
         The file content consist of a properties like style like shown below.
         title.<locale>=<title>
         description.<locale>=<description>
      /head                                    -- Files stored in this directory will be served up in the head section
        *.js                                   -- Javascript resources served up in alphabetical order. They are grouped
                                                  by filename and as long as they have the same name they belong to the same group.
                                                  Within a group the following extension variations exists:
          *.js                                 -- Defines the main compressed javascript content
          *.js.uncompressed.js                 -- Defines the main debug javascript content
          *.rtl.js                             -- Defines the compressed javascript to be used for right-to-left languages
          *.rtl.js.uncompressed.js             -- Defines the debug javascript to be used for right-to-left languages
          *.<locale>.js                        -- Defines the compressed javascript content for a specific language
          *.<locale>.js.uncompressed.js        -- Defines the debug javascript content for a specific language
        The following section defines an alternative. You can use either of those variations, but not in a mixed fashion.
          *.min.js                             -- Defines the main compressed javascript content
          *.js                                 -- Defines the main debug javascript content
          *.rtl.min.js                         -- Defines the compressed javascript to be used for right-to-left languages
          *.rtl.js                             -- Defines the debug javascript to be used for right-to-left languages
          *.<locale>.min.js                    -- Defines the compressed javascript content for a specific language
          *.<locale>.js                        -- Defines the debug javascript content for a specific language

        *.css                                  -- CSS resources served up in alphabetical order. They are grouped
                                                  by filename and as long as they have the same name they belong to the same group.
                                                  Within a group the following extension variations exists:
          *.css                                -- Defines the main compressed CSS content
          *.css.uncompressed.css               -- Defines the main debug CSS content
          *.rtl.css                            -- Defines the compressed CSS to be used for right-to-left languages
          *.rtl.css.uncompressed.css           -- Defines the debug CSS to be used for right-to-left languages
          *.<locale>.css                       -- Defines the compressed CSS content for a specific language
          *.<locale>.css.uncompressed.css      -- Defines the debug CSS content for a specific language
        The following section defines an alternative way. You can use either of those variations, but not in a mixed fashion.
          *.min.css                            -- Defines the main compressed CSS content
          *.css                                -- Defines the main debug CSS content
          *.rtl.min.css                        -- Defines the compressed CSS to be used for right-to-left languages
          *.rtl.css                            -- Defines the debug CSS to be used for right-to-left languages
          *.<locale>.min.css                   -- Defines the compressed CSS content for a specific language
          *.<locale>.css                       -- Defines the debug CSS content for a specific language
          
        *.html                                 -- HTML resources served up in alphabetical order. They are grouped
                                                  by filename and as long as they have the same name they belong to the same group.
                                                  Within a group the following extension variations exists:
          *.html                               -- Defines the main HTML content
          *.rtl.html                           -- Defines the HTML to be used for right-to-left languages
          *.<locale>.html                      -- Defines the HTML content for a specific language

        /<device-class>                        -- (optional) allows to scope resources by device class (only one individual device class, no equation support)
          Same rule for files apply here as for the parent directory
      
      /config                                  -- Files stored in this directory will be served up in the config section of the resource aggregator. This is usually right before the body closing tag.
        *.js                                   -- Javascript resources served up in alphabetical order. They are grouped
                                                  by filename and as long as they have the same name they belong to the same group.
                                                  Within a group the following extension variations exists:
          *.js                                 -- Defines the main compressed javascript content
          *.js.uncompressed.js                 -- Defines the main debug javascript content
          *.rtl.js                             -- Defines the compressed javascript to be used for right-to-left languages
          *.rtl.js.uncompressed.js             -- Defines the debug javascript to be used for right-to-left languages
          *.<locale>.js                        -- Defines the compressed javascript content for a specific language
          *.<locale>.js.uncompressed.js        -- Defines the debug javascript content for a specific language
        The following section defines an alternative. You can use either of those variations, but not in a mixed fashion.
          *.min.js                             -- Defines the main compressed javascript content
          *.js                                 -- Defines the main debug javascript content
          *.rtl.min.js                         -- Defines the compressed javascript to be used for right-to-left languages
          *.rtl.js                             -- Defines the debug javascript to be used for right-to-left languages
          *.<locale>.min.js                    -- Defines the compressed javascript content for a specific language
          *.<locale>.js                        -- Defines the debug javascript content for a specific language

        *.html                                 -- HTML resources served up in alphabetical order. They are grouped
                                                  by filename and as long as they have the same name they belong to the same group.
                                                  Within a group the following extension variations exists:
          *.html                               -- Defines the main HTML content
          *.rtl.html                           -- Defines the HTML to be used for right-to-left languages
          *.<locale>.html                      -- Defines the HTML content for a specific language
      
        /<device-class>                        -- (optional) allows to scope resources by device class (only one individual device class, no equation support)
          Same rule for files apply here as for the parent directory

      /menu                                    -- Files stored in this directory will be made available to the menu framework
        /*.json                                -- JSON resources containing the menu definition served up in alphabetical order


