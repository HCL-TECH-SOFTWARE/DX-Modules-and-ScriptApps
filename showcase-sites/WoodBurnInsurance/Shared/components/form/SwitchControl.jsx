import { propTypes, ReactV18, formik } from 'dxmodule';
import styles from './SwitchControl.module.scss';

const { React } = ReactV18;
const { useField } = formik;

/**
 * Formik-enable switch control
 */
function SwitchControl({label, ...props}) {
  const [field] = useField(props.name);

  return (
    <label className={styles['switch-control-box']}>

      <input type="checkbox" checked={field.value} {...field} {...props} />

      <span className={styles['switch-control']}>
        <span className={styles['switch-control-thumb']}></span> 
      </span>

      {label && (
        <span className={styles.label}>
          {label} 
        </span>
      )}
    </label>
  );
}

SwitchControl.propTypes = {
  name: propTypes.string.isRequired,
  label: propTypes.string,
};

export default SwitchControl;
