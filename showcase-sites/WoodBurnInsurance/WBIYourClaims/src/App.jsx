import {ReactV18, WBIProviders} from 'dxmodule';
import IntlProvider from '../../Shared/components/IntlProvider';
import SpinnerOverlay from '../../Shared/components/SpinnerOverlay';
import styles from './App.module.scss';
import InsuranceClaimSummary from './components/_InsuranceClaimSummary';

const { React } = ReactV18;
const { UserProvider } = WBIProviders;

const { useState, useEffect } = React;

function App() {
  const [insuranceClaims, setInsuranceClaims] = useState([]);
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);

  useEffect(() => {
    const user = UserProvider.getUserByEmail('karl@hcl.com');
    setInsuranceClaims(user.insuranceClaims);
    setTimeout(() => {
      setIsLoadingUserData(false);
    }, 500);
  }, []);

  return (
    <IntlProvider>
      <div className={styles['your-claims']}>
        <SpinnerOverlay isLoading={isLoadingUserData}>
          <InsuranceClaimSummary
            className={styles['insurance-claim-summary']}
            claims={insuranceClaims}
          />
        </SpinnerOverlay>
      </div>
    </IntlProvider>
  );
}

export default App;
