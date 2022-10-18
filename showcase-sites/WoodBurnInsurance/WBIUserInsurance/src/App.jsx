import {ReactV18, WBIProviders} from 'dxmodule';
import IntlProvider from '../../Shared/components/IntlProvider';
import SpinnerOverlay from '../../Shared/components/SpinnerOverlay';
import styles from './App.module.scss';
import InsurancePlanSummary from './components/_InsurancePlanSummary';

const { React } = ReactV18;
const { UserProvider } = WBIProviders;

const { useState, useEffect } = React;

function App() {
  const [insurancePlans, setInsurancePlans] = useState([]);
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);

  useEffect(() => {
    const user = UserProvider.getUserByEmail('karl@hcl.com');
    setInsurancePlans(user.insurancePlans);
    setTimeout(() => {
      setIsLoadingUserData(false);
    }, 500);
  }, []);

  return (
    <IntlProvider>
      <div className={styles['user-insurance']}>
        <SpinnerOverlay isLoading={isLoadingUserData}>
          <InsurancePlanSummary
            className={styles['insurance-plan-summary']}
            plans={insurancePlans}
          />
        </SpinnerOverlay>
      </div>
    </IntlProvider>
  );
}

export default App;
