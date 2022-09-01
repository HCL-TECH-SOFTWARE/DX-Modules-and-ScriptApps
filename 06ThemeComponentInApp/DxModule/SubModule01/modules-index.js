/* Import and Export Main Libraries
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
export const ReactV18 = {
    React,
    ReactDOM,
}

/* Import and Export 3rd-Party Libraries
 */
import { Table } from 'smart-webcomponents-react/table';
import { Tabs, TabItem, TabItemsGroup } from 'smart-webcomponents-react/tabs';

export const SmartWebComponents = {
    Table, Tabs, TabItem, TabItemsGroup
}

/* Export Custom Data and/or Services
 */
export * as CommonData from './common/data/data';

/* Export index file for the styles (added here to be able to share the filename of JS bundle's alias in Webpack entry config).
 */
export * from './styles-index.css'



