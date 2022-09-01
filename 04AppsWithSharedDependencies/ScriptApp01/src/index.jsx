import { ReactV18 } from 'dxmodules';
import App from "./components/App.jsx"
import "./css/index.css"
const { React, ReactDOM } = ReactV18;

const root = ReactDOM.createRoot(document.getElementById("app-root-1"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
