import { ReactV18 } from 'dxmodule';
import { ModalContext } from '../../context/modal.context';
import styles from './_CoverageChangeSentModal.module.scss';

import icon from '../../assets/icons/modals/coverage-change-sent.png';
import icon2x from '../../assets/icons/modals/coverage-change-sent@2x.png';

import Img2x from '../../components/Img2x';
import IntlContext from '../../context/intl.context';

const { React } = ReactV18;
const { useContext } = React;

/**
 * Displayed upon completion of the Enrollment Wizard if user
 * has just requested a change to an insurance plan user is
 * already enrolled in.
 */
function CoverageChangeSentModal() {
  const { intl } = useContext(IntlContext);
  const modalCtx = useContext(ModalContext);

  function handleCloseBtnClick() {
    setTimeout(modalCtx.dismiss, 200);
  }

  return (
    <div className={styles.modal}>
      <Img2x
        src={icon}
        src2x={icon2x}
        alt="coverage change sent"
      />
      <h2 className={styles.title}>
        {intl.get('MODAL_COVERAGE_CHANGE_TITLE')}
      </h2>
      <h3 className={styles.subtitle}>
        {intl.get('MODAL_COVERAGE_CHANGE_SUBTITLE')}
      </h3>
      <p className={styles.description}>
        {intl.get('MODAL_COVERAGE_CHANGE_DESCRIPTION')}
      </p>
      <button className={styles['close-btn']} onClick={handleCloseBtnClick}>
        {intl.get('CLOSE')}
      </button>
    </div>
  );
}

export default CoverageChangeSentModal;
