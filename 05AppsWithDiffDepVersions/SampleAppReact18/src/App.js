import { ReactV18 } from 'dxmodules';

import logo from './logo.svg';
import './App.css';

const { React } = ReactV18;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        This is an example React v18 DX ScriptApp
        </p>
      </header>
    </div>
  );
}

export default App;
