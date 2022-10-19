import { ReactV18, propTypes } from 'dxmodule';
import styles from './_FormStepIndicatorItem.module.scss';

import checkmark from '../assets/icons/checkmark-circle-violet.png';
import checkmark2x from '../assets/icons/checkmark-circle-violet@2x.png';

const { React } = ReactV18;

/**
 * A styled label and circle displaying the status of a
 * single step of a multi-page form.
 */
function FormStepIndicatorItem(props) {

  const className = `${styles['step-item']} ${styles[props.status]}`;

  return (
    <div className={className}>
      <label className={styles.label}>
        {props.label}
      </label> 

      <div className={styles['step-circle']}>
        <img
          className={styles.checkmark}
          src={checkmark}
          srcSet={`${checkmark} 1x, ${checkmark2x} 2x`}
          alt="checkmark" />
      </div>
    </div>
  );
}

FormStepIndicatorItem.propTypes = {
  label: propTypes.string.isRequired,
  status: propTypes.oneOf(['completed', 'current', 'incomplete']),
};

export default FormStepIndicatorItem;

