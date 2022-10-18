import {ReactV18, WBIProviders} from 'dxmodule';
import IntlProvider from '../../Shared/components/IntlProvider';
import SpinnerOverlay from '../../Shared/components/SpinnerOverlay';
import styles from './App.module.scss';
import InsuranceIssuesSummary from './components/_InsuranceIssuesSummary';

const { React } = ReactV18;
const { UserProvider } = WBIProviders;

const { useState, useEffect } = React;

function App() {
  const [insuranceIssues, setInsuranceIssues] = useState([]);
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);

  useEffect(() => {
    const user = UserProvider.getUserByEmail('karl@hcl.com');
    setInsuranceIssues(user.insuranceIssues);
    setTimeout(() => {
      setIsLoadingUserData(false);
    }, 500);
  }, []);

  return (
    <IntlProvider>
      <div className={styles['your-issues']}>
        <SpinnerOverlay isLoading={isLoadingUserData}>
          <InsuranceIssuesSummary
            className={styles['insurance-issues-summary']}
            issues={insuranceIssues}
          />
        </SpinnerOverlay>
      </div>
    </IntlProvider>
  );
}

export default App;
