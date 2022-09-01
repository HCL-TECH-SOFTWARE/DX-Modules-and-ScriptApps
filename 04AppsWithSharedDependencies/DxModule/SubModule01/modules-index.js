/* Import and Export Main Libraries
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
export const ReactV18 = {
    React,
    ReactDOM,
}
/* Import and Export 3rd-Party Libraries
    sample:
        import { Table } from 'smart-webcomponents-react/table';
        import { Accordion, AccordionItem } from 'smart-webcomponents-react/accordion'
        export const SmartWebComponents = {
            Table, Accordion, AccordionItem
        }
 */

/* Export Custom Data and/or Services
    sample:
        export * as CommonData from './common/data/data';
 */

/* Export index file for the styles (added here to be able to share the filename of JS bundle's alias in Webpack entry config).
 */
export * from './styles-index.css'



