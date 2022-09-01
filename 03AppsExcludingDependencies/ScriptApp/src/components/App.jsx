import { ReactV18 } from 'dxmodules';
import logo from '../assets/logo.svg';
import '../css/App.css';

const { React } = ReactV18;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        This is an example React ScriptApp that was deployed separately from its dependencies.
        </p>
      </header>
    </div>
  );
}

export default App;
