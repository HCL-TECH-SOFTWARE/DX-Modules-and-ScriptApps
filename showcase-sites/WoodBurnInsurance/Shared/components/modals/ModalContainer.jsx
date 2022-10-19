import { ReactV18, propTypes } from 'dxmodule';
import { ModalContext } from '../../context/modal.context';
import { MODAL_TYPE } from '../../constants/index';
import styles from './ModalContainer.module.scss';

// Modal Components
import InsuranceOrderSentModal from './_InsuranceOrderSentModal';
import SearchInjuryFormModal from './_SearchInjuryFormModal';
// import ProofCameraModal from '../camera/ProofCameraModal';
import ClaimSubmittedModal from './_ClaimSubmittedModal';
import InsuranceEnrolledModal from './_InsuranceEnrolledModal';
import CoverageChangeSentModal from './_CoverageChangeSentModal';

// Close icons
import close from '../../assets/icons/close-gray.png';
import close2x from '../../assets/icons/close-gray@2x.png';
import closeLarge from '../../assets/icons/close-large.png';
import closeLarge2x from '../../assets/icons/close-large@2x.png';

const { React } = ReactV18;
const { useContext, useEffect } = React;

const modalClassByType = {
  [`${MODAL_TYPE.ORDER_SENT}`]: InsuranceOrderSentModal,
  [`${MODAL_TYPE.SEARCH_INJURY_FORM}`]: SearchInjuryFormModal,
  // [`${MODAL_TYPE.PROOF_CAMERA}`]: ProofCameraModal,
  [`${MODAL_TYPE.CLAIM_SUBMITTED}`]: ClaimSubmittedModal,
  [`${MODAL_TYPE.INSURANCE_ENROLLED}`]: InsuranceEnrolledModal,
  [`${MODAL_TYPE.COVERAGE_CHANGE}`]: CoverageChangeSentModal,
};

/**
 * Container for modals. Displays a transparent background and animates
 * the modal into view.
 */
function ModalContainer(props) {

  const modalCtx = useContext(ModalContext);
  const Modal = modalClassByType[props.modalType];

  function handleDismissBtnClick() {
    modalCtx.dismiss();
  }


  // Prevent page body from scrolling while modal is displayed.
  // The window scroll in the cleanup function sets the page
  // to the original scroll position before the <body> tag
  // position was set to 'fixed'.
  //
  // See https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
  useEffect(() => {
    const { body } = document;
    const scrollY = window.scrollY;
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    return () => {
      body.style.position = '';
      body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0'));
    };
  }, []);

  return (
    <div className={styles['modal-container']}>
      <div className={styles['modal-background']}></div>

      <div className={styles['modal-box']}>
        <button className={styles['dismiss-btn']}
          onClick={handleDismissBtnClick}>
          <img
            className={styles['mobile-close-icon']}
            src={close}
            srcSet={`${close} 1x, ${close2x} 2x`}
            alt="close icon" />
          <img
            className={styles['desktop-close-icon']}
            src={closeLarge}
            srcSet={`${closeLarge} 1x, ${closeLarge2x} 2x`}
            alt="close icon" />
        </button>
        {Modal && <Modal {...props.modalProps} />}
      </div>
    </div>
  );
}

ModalContainer.propTypes = {
  modalType: propTypes.string.isRequired,
  modalProps: propTypes.object,
};

export default ModalContainer;
