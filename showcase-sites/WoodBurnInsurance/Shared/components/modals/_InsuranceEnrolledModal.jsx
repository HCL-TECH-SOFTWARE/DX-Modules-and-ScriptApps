import { ReactV18, propTypes } from 'dxmodule';
import { ModalContext } from '../../context/modal.context';
import IntlContext from '../../context/intl.context';
import styles from './_InsuranceEnrolledModal.module.scss';

// icons
import icon from '../../assets/icons/modals/insurance-enrolled.png';
import icon2x from '../../assets/icons/modals/insurance-enrolled@2x.png';
import browse from '../../assets/icons/browse.png';
import browse2x from '../../assets/icons/browse@2x.png';
import browseHover from '../../assets/icons/browse-white.png';
import browseHover2x from '../../assets/icons/browse-white@2x.png';
import change from '../../assets/icons/change.png';
import change2x from '../../assets/icons/change@2x.png';
import changeHover from '../../assets/icons/change-white.png';
import changeHover2x from '../../assets/icons/change-white@2x.png';

import Img2x from '../../components/Img2x';
import ChooseActionButton from './_ChooseActionButton';

const { React } = ReactV18;
const { useContext } = React;


/**
 * A modal to ask user already enrolled in a particular insurance plan
 * category if user wants to change existing coverage or just browse
 * plans.
 */
function InsuranceEnrolledModal({ callback }) {
  const modalCtx = useContext(ModalContext);
  const { intl } = useContext(IntlContext);

  const browseIcon = (
    <Img2x src={browse} src2x={browse2x} alt="browse" />
  );
  const browseHoverIcon = (
    <Img2x src={browseHover} src2x={browseHover2x} alt="browse" />
  );

  const changeIcon = (
    <Img2x src={change} src2x={change2x} alt="change" />
  );
  const changeHoverIcon = (
    <Img2x src={changeHover} src2x={changeHover2x} alt="change" />
  );
  
  function handleChangeCoverageBtnClick() {
    const userWantsToChangeCoverage = true;
    callback && callback(userWantsToChangeCoverage);
    modalCtx.dismiss();
  }

  function handleBrowseBtnClick() {
    const userWantsToChangeCoverage = false;
    callback && callback(userWantsToChangeCoverage);
    modalCtx.dismiss();
  }

  return (
    <div className={styles.modal}>
      <Img2x
        src={icon}
        src2x={icon2x}
        alt="insurance enrolled icon"
      />
      <h2 className={styles.title}>
        {intl.get('MODAL_INSURANCE_ENROLLED_TITLE')} 
      </h2>
      {
        intl.get('MODAL_INSURANCE_ENROLLED_DESCRIPTION')
          .split('\n')
          .map((p, i) => (
            <p key={i} className={styles.description}> {p} </p>
          ))
      }

      <ChooseActionButton
        className={styles['change-coverage-btn']}
        label={intl.get('MODAL_INSURANCE_ENROLLED_CHANGE')}
        icon={changeIcon}
        hoverIcon={changeHoverIcon}
        onClick={handleChangeCoverageBtnClick}
      />

      <ChooseActionButton
        label={intl.get('MODAL_INSURANCE_ENROLLED_BROWSE')}
        icon={browseIcon}
        hoverIcon={browseHoverIcon}
        onClick={handleBrowseBtnClick}
      />
    </div>
  );
}

InsuranceEnrolledModal.propTypes = {
  // Signature: (userWantsToChangeCoverage: bool) => void
  callback: propTypes.func,
};

export default InsuranceEnrolledModal;
