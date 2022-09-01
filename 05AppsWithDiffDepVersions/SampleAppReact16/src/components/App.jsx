import { ReactV16 } from 'dxmodules';
import logo from '../assets/logo.svg';
import '../css/App.css';

const { React } = ReactV16;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        This is an example React v16 DX ScriptApp
        </p>
      </header>
    </div>
  );
}

export default App;
