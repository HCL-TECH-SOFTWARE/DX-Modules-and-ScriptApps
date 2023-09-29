/*
    Copyright 2022 HCL America, Inc.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

// Import and Export Main Libraries
import videojs from 'video.js'
import videojsyoutube from 'videojs-youtube'


export const VideoJs = {
    videojs,
    videojsyoutube
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



