import { ReactV18, propTypes, classNames } from 'dxmodule';
import styles from './FormPageNavigation.module.scss';

import SubmitButton from './SubmitButton';

const { React } = ReactV18;

/**
 * Navigation for multi-page forms. 
 * Displays a Back button and a form submit button.
 *
 * Used by the Enrollment Wizard in particular.
 */
function FormPageNavigation(props) {
  // const navigate = useNavigate();

  const className = classNames({
    [styles['form-page-nav']]: true,
    [styles['no-submit']]: !props.nextLabel,
    [props.className]: !!props.className
  });

  function handleBackBtnClick() {
    if (props.onPrevious) {
      props.onPrevious();
    }
  }

  return (
    <div className={className}>
      <button onClick={handleBackBtnClick} type="button"
        className={`${styles['back-btn']} btn`}>
        {props.prevLabel} 
      </button>

      {props.nextLabel &&
        <SubmitButton
          label={props.nextLabel} 
          isSubmitting={props.isSubmitting}
        />
      }
    </div>
  );
}

FormPageNavigation.propTypes = {
  prevLabel: propTypes.string.isRequired,
  nextLabel: propTypes.string,
  onPrevious: propTypes.func,
  isSubmitting: propTypes.bool,
  className: propTypes.string,
};

export default FormPageNavigation;
