import {ReactV18, Cookies, WBIProviders} from 'dxmodule';
import IntlContext from '../../../../../Shared/context/intl.context';
import styles from './_MyBenefitsHeader.module.scss';

import checkmark from '../../../../../Shared/assets/icons/checkmark-orange.png';
import checkmark2x from '../../../../../Shared/assets/icons/checkmark-orange@2x.png';
const { React } = ReactV18;
const { UserProvider } = WBIProviders;
const {useContext, useEffect, useState} = React;

const mockUser = {
  "id": 1,
  "firstName": "---",
  "email": "---",
  "avatarUrl": "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
  "isInsured": true,
  "memberType": "---",
  "policyNumber": "---",
  "totalPremium": "$---",
  "nextPaymentDue": "---",
};

/**
 * Header (or hero) section of the My Benefits page. Displays some
 * summary data for the logged-in user.
 */
function MyBenefitsHeader() {
  const [user, setUser] = useState({});
  const { intl } = useContext(IntlContext);

  function redirectToLoginPage() {
    UserProvider.redirectToLogin();
  }

  // function logoutHandler() {
  //   Cookies.remove('wbi_authenticated');
  //   Cookies.remove('wbi_authenticated_id');
  //   redirectToLoginPage();
  // }

  useEffect(() => {
    UserProvider.requireLogin();

    setUser(mockUser);

    const userId = Cookies.get('wbi_authenticated_id');

    if (userId) {
      // let getAuthenticatedUser = undefined;
      const getAuthenticatedUser = UserProvider.getUserById(parseInt(userId));
      if (getAuthenticatedUser) {
        setUser(getAuthenticatedUser);
      }
    }

  }, []);

  return (
    <>
      <div className={styles['my-benefits-header']}>
        <div className={styles['gradient-circles']}>
          <div className={styles['gradient-circle']}></div>
          <div className={styles['gradient-circle']}></div>
          <div className={styles['gradient-circle']}></div>
        </div>

        {/* GREETING */}
        <div className={styles['greeting-box']}>
          <img
            className={styles['user-avatar']}
            src={user.avatarUrl}
            alt="user avatar" />

          <section className={styles.greeting}>
            <h3>
              {intl.get('GREETING', { name: user.firstName })}
            </h3>
            <label className={styles['member-type']}>
              {`${user.memberType} ${intl.get('MEMBER')}`}
            </label>
          </section>

          {user.isInsured &&
            <label className={styles['insured-label']}>
              <img
                src={checkmark}
                srcSet={`${checkmark} 1x, ${checkmark2x} 2x`}
                alt="is insured icon" />
              {intl.get('INSURED')}
            </label>
          }
        </div>

        {/* POLICY NUMBER */}
        <section className={styles['policy-number-box']}>
          <h2 className={styles['policy-number']}>
            {user.policyNumber}
          </h2>
          <label className={styles['policy-number-label']}>
            {intl.get('POLICY_NUMBER')}
          </label>
        </section>

        {/* DASHED LINE DIVIDER */}
        <div className={styles['dashed-line']}></div>

        {/* PAYMENT DETAILS */}
        <div className={styles['payment-details']}>
          <div className={styles['premium-box']}>
            <p className={styles.premium}>
              {user.totalPremium}
            </p>
            <label>
              {intl.get('TOTAL_PREMIUM')}
            </label>
          </div>

          <div className={styles['payment-box']}>
            <p className={styles.payment}>
              {user.nextPaymentDue}
            </p>
            <label>
              {intl.get('NEXT_PAYMENT')}
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyBenefitsHeader;
