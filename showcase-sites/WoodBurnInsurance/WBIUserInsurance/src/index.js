import { ReactV18 } from 'dxmodule';
import App from './App';

const { ReactDOM, React } = ReactV18;

const root = ReactDOM.createRoot(document.getElementById('wbi-dashboard-user-insurance-root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

