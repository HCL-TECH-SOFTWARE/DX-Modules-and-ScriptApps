import { propTypes, ReactV18, formik, classNames } from 'dxmodule';
import styles from './Input.module.scss';

// checkmark icon
import checkmark from '../assets/icons/checkmark-circle.png';
import checkmark2x from '../assets/icons/checkmark-circle@2x.png';

const { useField } = formik;

const { React } = ReactV18;

/**
 * A Formik-enabled input.
 */
function Input({label, onChange, onKeyDown, forDarkBackground, className, ...props}) {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  //
  // Input change event handler:
  //
  // If the Input component has an `onChange` handler prop, execute it
  // after updating for Formik field. Otherwise, just pass the default
  // `field.onChange` handler to the `onChange` event:
  //
  const handleChange = onChange
    ? (e) => {
      setValue(e.target.value);
      onChange(e);
    }
    : field.onChange;

  const shouldDisplayValidEmailIcon = props.type === 'email' && meta.touched && !meta.error;

  const cssClass = classNames({
    [styles['input-box']]: true,
    [styles['valid-email']]: shouldDisplayValidEmailIcon,
    [styles['for-dark-bg']]: forDarkBackground,
    [styles.error]: (meta.touched && meta.error),
    [className]: !!className,
  });

  return (
    <div className={cssClass}>
      {label &&
        <label className={styles.label}>
          {label}
        </label>
      }
      {meta.touched && meta.error ? (
        <div className={styles.error}>
          {meta.error}
        </div>
      ) : null}

      <div className={styles['email-icon-box']}>
        <input {...field} {...props} onChange={handleChange} className={styles.input} onKeyDown={onKeyDown}/>

        {/* Valid email icon */}
        <img
          className={styles['valid-email-icon']}
          src={checkmark}
          srcSet={`${checkmark} 1x, ${checkmark2x} 2x`}
          alt="valid email icon" />
      </div>

    </div>
  );
}

Input.propTypes = {
  label: propTypes.string,
  name: propTypes.string.isRequired,
  type: propTypes.oneOf(['text', 'email', 'password', 'number', 'tel']).isRequired,
  forDarkBackground: propTypes.bool.isRequired,
  placeholder: propTypes.string,
  className: propTypes.string,

  // You may supply an optional onChange handler to the Input if necessary.
  // The Input component will run your onChange logic after updating the Formik
  // field. See the assignment to `handleChange` above.
  onChange: propTypes.func,

  onKeyDown: propTypes.func,
};

Input.defaultProps = {
  type: 'text',
  forDarkBackground: false,
};

export default Input;
