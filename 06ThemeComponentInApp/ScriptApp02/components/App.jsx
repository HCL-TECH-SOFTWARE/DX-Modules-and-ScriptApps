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
import SmartTabs from "./smart-tabs/SmartTabs";


const { React } = ReactV18;

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    This is an example React DX ScriptApp To Showcase Different Approaches in Deployment and Use of Components in DX Themes via DX Modules
                </p>
            </header>

      <SmartTabs/>

    </div>
  );
}

export default App;
