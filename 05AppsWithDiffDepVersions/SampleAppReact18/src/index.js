import { ReactV18 } from 'dxmodules';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const { React, ReactDOM } = ReactV18;

const root = ReactDOM.createRoot(document.getElementById('sample-app-react-18-root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
