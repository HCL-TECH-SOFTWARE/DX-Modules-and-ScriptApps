Simple Modules - Module Definition - Head Contribution (English)
******************************************************

The 'head' folder contains files that are served up as head contribution through the
resource aggregator framework. Those resources appear in the head tag of the markup served up to the browser.

The following section provides a complete list of supported files within the head section

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


