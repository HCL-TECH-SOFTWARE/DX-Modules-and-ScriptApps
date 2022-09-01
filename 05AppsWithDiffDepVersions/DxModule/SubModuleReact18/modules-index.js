/* Import and Export Main Libraries
 */
import * as React18 from 'react';
import * as ReactDOM18 from 'react-dom/client';

export const ReactV18 = {
    React: React18,
    ReactDOM: ReactDOM18
};


/* Export index file for the styles (added here to be able to share the filename of JS bundle's alias in Webpack entry config).
 */
export * from './styles-index.css'
