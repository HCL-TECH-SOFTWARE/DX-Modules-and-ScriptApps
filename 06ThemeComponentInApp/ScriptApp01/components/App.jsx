
import { ReactV18 } from 'dxmodules';
import SmartTable from "./smart-table/SmartTable";

const { React } = ReactV18;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
        This is an example React DX ScriptApp To Showcase Different Approaches in Deployment and Use of Components in DX Themes via DX Modules
        </p>
      </header>

      <SmartTable/>

    </div>
  );
}

export default App;
