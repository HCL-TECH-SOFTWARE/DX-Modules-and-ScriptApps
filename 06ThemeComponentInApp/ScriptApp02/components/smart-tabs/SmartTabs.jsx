/*
 Source:  https://www.webcomponents.org/element/HTMLElements/smart-table
          https://www.htmlelements.com/react/demos/table/overview/

 Note:    Smart Table by HTMLElements is licensed under Apache-2.0 (https://spdx.org/licenses/Apache-2.0)
          For other components, check licensing agreements before using in production https://www.htmlelements.com/license/

 */
import { ReactV18, SmartWebComponents } from 'dxmodules';
const { React } = ReactV18;
const { Tabs, TabItem } = SmartWebComponents;

import './SmartTabs.css';

class SmartTabs extends React.Component {
    render() {
        return (
            <div>
                <Tabs selectedIndex={1}>
                    <TabItem label="TAB 1">Content 1</TabItem>
                    <TabItem label="TAB 2">Content 2</TabItem>
                    <TabItem label="TAB 3">Content 3</TabItem>
                    <TabItem label="TAB 4">Content 4</TabItem>
                </Tabs>
            </div>
        );
    }
}

export default SmartTabs;
