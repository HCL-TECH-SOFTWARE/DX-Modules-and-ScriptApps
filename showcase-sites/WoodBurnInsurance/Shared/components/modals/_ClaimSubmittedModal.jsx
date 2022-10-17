import { ReactV18, propTypes as PT } from 'dxmodule';
import { ModalContext } from '../../context/modal.context';
import styles from './_ClaimSubmittedModal.module.scss';

import Img2x from '../../components/Img2x';

// icons
import modalIcon from '../../assets/icons/modals/claim-submitted.png';
import modalIcon2x from '../../assets/icons/modals/claim-submitted@2x.png';

const { React } = ReactV18;
const { useContext } = React;

function ClaimSubmittedModal({ claimReferenceNumber }) {
  const modalCtx = useContext(ModalContext);

  return (
    <div className={styles.modal}>
      <Img2x
        src={modalIcon}
        src2x={modalIcon2x}
        alt="claim submitted icon"
      />

      <h3 className={styles.title}>
        Claim Submitted
      </h3>

      <section className={styles['reference-number-box']}>
        <h4 className={styles['reference-number-label']}>
          Reference Number
        </h4>
        <span className={styles['reference-number']}>
          {claimReferenceNumber}
        </span>
      </section>

      <p className={styles.description}>
        Your Claim has been submitted, you can check out the insurance tab to check the status of the claim.
      </p>

      <a href="/wps/myportal/woodburninsurance/user-dashboard" className={styles['close-btn']}
        onClick={modalCtx.dismiss}>
        Close
      </a>
    </div>
  );
}

ClaimSubmittedModal.propTypes = {
  claimReferenceNumber: PT.string,
};

export default ClaimSubmittedModal;
