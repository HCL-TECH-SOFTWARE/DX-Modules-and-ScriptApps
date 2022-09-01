/* Import and Export Main Libraries
 */
import * as React16 from 'react';
import * as ReactDOM16 from 'react-dom';

export const ReactV16 = {
    React: React16,
    ReactDOM: ReactDOM16
};


/* Export index file for the styles (added here to be able to share the filename of JS bundle's alias in Webpack entry config).
 */
export * from './styles-index.css'
