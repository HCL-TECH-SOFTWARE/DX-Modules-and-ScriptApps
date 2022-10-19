import { propTypes, ReactV18, classNames } from 'dxmodule';
import styles from './SubmitButton.module.scss';

import spinner from '../../assets/icons/spinner-white.png';

const {React} = ReactV18;

/**
 * A form submit button. Displays a spinner icon while form submit
 * is processing.
 */
function SubmitButton(props) {
  const className = classNames(
    styles['submit-btn'],
    'btn',
    'btn-primary',
    {
      [styles['is-submitting']]: props.isSubmitting,
      [props.className]: !!props.className
    }
  );
  return (
    <button type="submit" className={className} disabled={props.isSubmitting}>
      <span className={styles.label}>
        {props.label}
      </span>

      <img src={spinner} alt="processing indicator" className={styles.spinner}/>
    </button>
  );
}

SubmitButton.propTypes = {
  label: propTypes.string.isRequired,
  isSubmitting: propTypes.bool.isRequired,
  className: propTypes.string,
};

export default SubmitButton;
