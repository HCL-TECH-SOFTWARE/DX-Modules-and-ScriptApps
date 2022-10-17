import { ReactV18, propTypes, formik } from 'dxmodule';
import styles from './LicensePhotoControl.module.scss';

// icons
import camera from '../../assets/icons/camera.png';
import camera2x from '../../assets/icons/camera@2x.png';
import replace from '../../assets/icons/replace.png';
import replace2x from '../../assets/icons/replace@2x.png';

const { React } = ReactV18;
const { useField } = formik;

/**
 * Formik control for uploading or selecting a license photo.
 */
function LicensePhotoControl({
  onClick,
  getPhotoPrompt,
  replacePhotoPrompt,
  hideLabel,
  ...props
}) {
  const [field, meta] = useField(props.name);

  let iconSrc, iconSrc2x, prompt;
  if (field.value) {
    iconSrc = replace;
    iconSrc2x = replace2x;
    prompt = replacePhotoPrompt;
  } else {
    iconSrc = camera;
    iconSrc2x = camera2x;
    prompt = getPhotoPrompt;
  }

  const className = styles['license-photo-control-box'] +
    (props.className ? ` ${props.className}` : '');

  return (
    <div className={className}
      onClick={onClick}>
      {!hideLabel &&
        <span className={styles.label}>Driver's License</span>
      }

      {/* Error Label */}
      {meta.touched && meta.error ? (
        <div className={styles.error}>
          {meta.error} 
        </div>
      ) : null}

      <div className={styles['license-photo-control']}>
        <div className={styles['icon-box']}>
          <img
            src={iconSrc}
            srcSet={`${iconSrc} 1x, ${iconSrc2x} 2x`}
            alt="license icon" />
        </div>

        <p className={styles.prompt}>
          {prompt}
        </p>
         
        {field.value &&
          <img
            className={styles['license-photo']}
            src={field.value}  
            alt="license" />
        }
      </div>
    </div>
  );
}

LicensePhotoControl.propTypes = {
  name: propTypes.string.isRequired,

  hideLabel: propTypes.bool.isRequired,

  className: propTypes.string,

  // Prompt before photo is set
  getPhotoPrompt: propTypes.string.isRequired,
  // Prompt after photo is set
  replacePhotoPrompt: propTypes.string.isRequired,

  onClick: propTypes.func,
};

LicensePhotoControl.defaultProps = {
  hideLabel: false,
};

export default LicensePhotoControl;
