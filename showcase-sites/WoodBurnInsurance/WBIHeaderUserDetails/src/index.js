import { ReactV18 } from 'dxmodule';
import App from './App';

const { ReactDOM, React } = ReactV18;

const root = ReactDOM.createRoot(document.getElementById('wbi-user-details-on-dashboard-header-root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
