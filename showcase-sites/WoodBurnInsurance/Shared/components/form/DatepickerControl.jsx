import {
  ReactV18,
  propTypes as PT,
  formik as Formik,
  moment
} from 'dxmodule';
import "./react-datepicker-dist.css"; // 'react-datepicker/dist/nane.css';
import styles from './DatepickerControl.module.scss';

const { React } = ReactV18;
const { useField } = Formik;

function DatepickerControl({label, ...props}) {
  const [field, meta, helpers] = useField(props);
  // note: value is a string normalized to 'yyyy-mm-dd' format. This
  // is the format consumed/produced by the native <input type="date">
  // element
  const { value } = meta;
  const { setValue } = helpers;

  // Convert the normalized value to a date the Datepicker component
  // can consume:
  const dateValue = value
    ? moment(value).toDate()//new Date(value)
    : null;

  const className = (meta.touched && meta.error)
    ? `${styles['datepicker-box']} ${styles.error}`
    : styles['datepicker-box'];

  function handleDesktopDatepickerChange(date) {
    // first format the date so a native <input type="date" />
    // can consume it:
    const formattedDate = moment(date.target.value).format('YYYY-MM-DD');
    setValue(formattedDate);
  }

  return (
    <div className={className}>
      <label className={styles.label}>
        {label}
      </label>
      {meta.touched && meta.error ? (
        <div className={styles.error}>
          {meta.error}
        </div>
      ) : null}

      {/* native date input to display for mobile devices */}
      <input type="date" {...field} {...props}
        className={styles['native-date-input']}/>

      <div className={styles['desktop-datepicker-wrapper']}>
        <input type="date" className={styles['html5-date-picker']} onChange={handleDesktopDatepickerChange}/>
      </div>

    </div>
  );
}

DatepickerControl.propTypes = {
  name: PT.string.isRequired,
  label: PT.string.isRequired,
};

export default DatepickerControl;
