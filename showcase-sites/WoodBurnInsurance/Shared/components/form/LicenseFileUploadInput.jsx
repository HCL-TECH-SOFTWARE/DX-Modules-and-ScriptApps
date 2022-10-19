import { ReactV18, propTypes, formik } from 'dxmodule';
import styles from './LicenseFileUploadInput.module.scss';

import LicensePhotoControl from './LicensePhotoControl';
import IntlContext from '../../context/intl.context';

const { React } = ReactV18;
const { useContext } = React;
const { useField } = formik;

/**
 * A styled <input type="file" /> element for uploading
 * license images during insurance enrollment.
 */
function LicenseFileUploadInput({ hideLabel, className, promptLabel, ...props }) {
  const { intl } = useContext(IntlContext);

  // eslint-disable-next-line
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  const cssClass = className
    ? `${styles['license-file-upload']} ${className}`
    : styles['license-file-upload'];

  function handleFileChange(e) {
    const imgFile = e.target.files[0];
    if (imgFile) {
      const img = new Image();
      img.src = URL.createObjectURL(imgFile);
      img.onload = convertImageToBase64;
    }

    // Converts `this` image to a base64 string
    // and updates the form value
    function convertImageToBase64() {
      URL.revokeObjectURL(this.src);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;
      ctx.drawImage(this, 0, 0);
      const imgSrc = canvas.toDataURL('image/png');
      setValue(imgSrc);
    }
  }

  return (
    <div className={cssClass}>
      <LicensePhotoControl
        name={props.name}
        getPhotoPrompt={promptLabel || intl.get('PROMPT_LOAD_PHOTO')}
        replacePhotoPrompt={intl.get('PROMPT_RELOAD_PHOTO')}
        hideLabel={hideLabel}
      />

      <label className={styles['hidden-file-input-label']}>
        <input type="file" {...props} accept="image/*" onChange={handleFileChange} />
      </label>
    </div>
  );
}

LicenseFileUploadInput.propTypes = {
  name: propTypes.string.isRequired,
  hideLabel: propTypes.bool.isRequired,
  className: propTypes.string,
  promptLabel: propTypes.string,
};

LicenseFileUploadInput.defaultProps = {
  hideLabel: false,
};

export default LicenseFileUploadInput;
