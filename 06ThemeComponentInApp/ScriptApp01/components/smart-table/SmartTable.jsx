/*
 Source:  https://www.webcomponents.org/element/HTMLElements/smart-table
          https://www.htmlelements.com/react/demos/table/overview/

 Note:    Smart Table by HTMLElements is licensed under Apache-2.0 (https://spdx.org/licenses/Apache-2.0)
          For other components, check licensing agreements before using in production https://www.htmlelements.com/license/

 */
import {SmartWebComponents, CommonData, ReactV18 } from 'dxmodules';

const { Table } = SmartWebComponents;
const { React } = ReactV18;

import './SmartTable.css';

class SmartTable extends React.Component {

    getOrderData() {
        const orderData = [], productNames = ['Wireless Microphone System', 'One for the Blackbird, One for the Crow', 'Ultrean 6 Quart Air Fryer', 'NETGEAR WiFi Range Extender', 'YTD Men\'s Short Sleeve Polo Shirt', 'Sling Bag', 'Kantek Tablet Stand', 'Cuisinart C55CNS-8CFP', 'Panasonic Noise Cancelling Over The Ear Headphones', 'Magid GF18T Pesticide Glove', 'Ink+Ivy Alpine Cotton Duvet Cover', '12 Little Zoo Animals Toy Figure'], productPrices = [47.59, 7.48, 64.59, 29.99, 28.99, 25.49, 17.03, 10.14, 136.88, 7.73, 71.33, 6.99], countryCodes = CommonData.getCountriesCodesData();
        for (let i = 0; i < 100000; i++) {
            const productIndex = Math.floor(Math.random() * productNames.length);
            const order = {
                id:  i,
                productName: productNames[productIndex],
                price: productPrices[productIndex],
                quantity: Math.floor(Math.random() * 8) + 1,
                date: new Date((new Date()).getTime() - Math.floor(Math.random() * 9 + 1) * 86400000),
                country: countryCodes[Math.floor(Math.random() * countryCodes.length)][1].toLowerCase(),
                margin: Math.floor(Math.random() * 4) + 1,
                status: ['Received', 'Confirmed', 'Processing', 'Shipped', 'In transit', 'Delivered'][Math.floor(Math.random() * 6)]
            };
            order.total = parseFloat((order.price * order.quantity).toFixed(2));
            order.profit = parseFloat((((Math.floor(Math.random() * 30) + 9) / 100) * order.total).toFixed(2));
            orderData.push(order);
        }
        return orderData;
    }

    dataSource = new window.Smart.DataAdapter({
        dataSource: this.getOrderData(),
        dataFields: [
            'id: number',
            'productName: string',
            'price: number',
            'quantity: number',
            'total: number',
            'date: date',
            'country: string',
            'margin: number',
            'profit: number',
            'status: string'
        ]
    });
    columnMenu = true;
    filtering = true;
    editing = true;
    selection = true;
    keyboardNavigation = true;
    paging = true;
    sortMode = 'one';
    columns = [
        { label: 'id', dataField: 'id', dataType: 'number', allowEdit: false },
        { label: 'Product Name', dataField: 'productName', dataType: 'string' },
        { label: 'Price', dataField: 'price', dataType: 'number', templateElement: '<span>${{value}}</span>' },
        { label: 'Quantity', dataField: 'quantity', dataType: 'number' },
        { label: 'Total', dataField: 'total', dataType: 'number', templateElement: '<span>${{value}}</span>' },
        { label: 'Date', dataField: 'date', dataType: 'date' },
        {
            label: 'Country', dataField: 'country', dataType: 'string', formatFunction(settings) {
                settings.template = '<img className="flag" style="width: 40px; height: 27px;" src="https://www.htmlelements.com/demos/grid/live-update-countries/flags/' + settings.value + '.svg" />';
            }
        },
        {
            label: 'Margin', dataField: 'margin', dataType: 'number', templateElement: '<span>{{value}}%</span>'
        },
        { label: 'Profit', dataField: 'profit', dataType: 'number', templateElement: '<span>${{value}}</span>' },
        {
            label: 'Status', dataField: 'status', dataType: 'string', formatFunction(settings) {
                if (settings.value === 'Delivered') {
                    settings.cell.style.backgroundColor = '#B6D7A8';
                }
                else {
                    settings.cell.style.backgroundColor = '';
                }
            }
        },
    ];

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <div className="demo-description">
                    The columnMenu property is set to true in order to enable the columns menu.
                </div>
                <Table virtualization id="table" dataSource={this.dataSource} columnMenu={this.columnMenu} filtering={this.filtering}
                       editing={this.editing} selection={this.selection} keyboardNavigation={this.keyboardNavigation} paging={this.paging}
                       sortMode={this.sortMode} columns={this.columns}
                ></Table>
            </div>
        );
    }
}

export default SmartTable;
