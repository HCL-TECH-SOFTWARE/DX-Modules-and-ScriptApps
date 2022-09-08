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

import { ReactV18 } from 'dxmodules';
import App from "./components/App.jsx"
import "./css/index.css"

const { React, ReactDOM } = ReactV18;

const root = ReactDOM.createRoot(document.getElementById('scriptapp01-root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// module.hot.accept();
