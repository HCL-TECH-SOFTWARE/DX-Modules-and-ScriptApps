import {ReactV18, WBIProviders} from 'dxmodule';
import { ModalContext } from '../../context/modal.context';
import IntlContext from '../../context/intl.context';
import styles from './_InsuranceOrderSentModal.module.scss';


import icon from '../../assets/icons/modals/order-sent.png';
import icon2x from '../../assets/icons/modals/order-sent@2x.png';

const { React } = ReactV18;
const { UserProvider } = WBIProviders;
const { useContext } = React;

/**
 * The modal displayed to the user after he/she successfully
 * enrolls for an insurance plan.
 */
function InsuranceOrderSentModal() {
  const { intl } = useContext(IntlContext);
  const modalCtx = useContext(ModalContext);

  function redirectToPage(e, cb) {
    e.preventDefault();
    UserProvider.redirectToDashboard();
    cb()
  }

  return (
    <div className={styles['modal']}>
      <img
        src={icon}
        srcSet={`${icon} 1x, ${icon2x} 2x`}
        alt="order sent icon" />

      <h3 className={styles.title}>
        {intl.get('MODAL_ORDER_SENT_TITLE')}
      </h3>
      <h4 className={styles.subtitle}>
        {intl.get('MODAL_COVERAGE_CHANGE_SUBTITLE')}
      </h4>
      <p className={styles.description}>
        {intl.get('MODAL_ORDER_SENT_DESCRIPTION')}
      </p>

      <a href={"#"}
        onClick={(e) => redirectToPage(e, () => modalCtx.dismiss)}
        className={`${styles['nav-btn']} btn btn-primary`}>
        {intl.get('TO_MY_BENEFITS')}
      </a>
    </div>
  );
}

export default InsuranceOrderSentModal;
