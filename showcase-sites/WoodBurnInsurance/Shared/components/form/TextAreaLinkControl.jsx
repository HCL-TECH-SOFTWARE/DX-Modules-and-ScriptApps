import { ReactV18, propTypes as PT, formik as Formik, classNames} from 'dxmodule';
import styles from './TextAreaLinkControl.module.scss';

const { React } = ReactV18;
const { useField } = Formik;

function TextAreaLinkControl({ label, className, linkIcon, ...props }) {
  const [field, meta] = useField(props);

  const cssClass = classNames({
    [styles['textarea-link-control']]: true,
    [className]: !!className,
  });

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

      <div className={styles['textarea-box']}>
        <textarea
          {...field} {...props} className={styles.textarea}
        ></textarea>
        <button className={styles.link} type="button">
          {linkIcon}
        </button>
      </div>
    </div>
  );
}

TextAreaLinkControl.propTypes = {
  label: PT.string.isRequired,
  name: PT.string.isRequired,
  linkIcon: PT.element.isRequired,
  className: PT.string,
};


export default TextAreaLinkControl;
