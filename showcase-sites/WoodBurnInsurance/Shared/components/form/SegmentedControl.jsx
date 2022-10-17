import { ReactV18, propTypes, formik, classNames} from 'dxmodule'
import styles from './SegmentedControl.module.scss';

const { React } = ReactV18;
const { useField } = formik;

/**
 * Formik segmented control for choosing one of several options.
 */
function SegmentedControl({ label, options, className, ...props}) {
  // eslint-disable-next-line
  const [field, meta, helpers] = useField(props);
  const { value } = meta;
  const { setValue } = helpers;

  function getBtnClassName(btnValue, selectedValue) {
    return styles['segmented-control-btn'] +
      (btnValue === selectedValue ? ` ${styles.active}` : '');
  }

  const cssClass = classNames(
    styles['segmented-control-box'],
    {
      [className]: !!className,
    }
  );

  return (
    <div className={cssClass}>
      <label className={styles.label}>
        {label}
      </label>  

      {meta.touched && meta.error ? (
        <div className={styles.error}>
          {meta.error} 
        </div>
      ) : null}

      <div className={styles['segmented-control']}>
        {options.map(option => (
          <button
            type="button"
            className={getBtnClassName(option.value, value)}
            onClick={() => setValue(option.value)}
            key={option.value}>

            {option.name}

          </button>
        ))}
      </div>
    </div>
  );
}

SegmentedControl.propTypes = {
  label: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  options: propTypes.arrayOf(propTypes.shape({
    name: propTypes.string,
    value: propTypes.oneOfType([ propTypes.string, propTypes.number, propTypes.bool ]),
  })),
  className: propTypes.string,
}

export default SegmentedControl;
