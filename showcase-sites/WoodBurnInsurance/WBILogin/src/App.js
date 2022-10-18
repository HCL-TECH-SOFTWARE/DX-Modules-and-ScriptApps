import { ReactV18 } from 'dxmodule';
import IntlProvider from '../../Shared/components/IntlProvider';
import LoginPage from "./components/Login/LoginPage";
import './App.scss';
const { React } = ReactV18;

function App() {
  return (
    <IntlProvider>
      <LoginPage />
    </IntlProvider>
  );
}

export default App;
