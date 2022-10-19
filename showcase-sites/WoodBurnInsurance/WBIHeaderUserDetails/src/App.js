import { ReactV18 } from 'dxmodule';
import IntlProvider from '../../Shared/components/IntlProvider';
import './App.scss';
import MyBenefitsHeader from "./components/Users/my-benefits/_MyBenefitsHeader.jsx";

const { React } = ReactV18;

function App() {
  return (
    <IntlProvider>
      <div className="App">
        <MyBenefitsHeader />
      </div>
    </IntlProvider>
  );
}

export default App;
