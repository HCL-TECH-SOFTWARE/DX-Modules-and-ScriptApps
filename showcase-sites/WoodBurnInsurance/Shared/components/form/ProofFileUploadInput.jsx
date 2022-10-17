import { ReactV18, propTypes as PT, formik, classNames } from 'dxmodule';
import styles from './ProofFileUploadInput.module.scss';

import Img2x from '../Img2x';

// icons
import camera from '../../../Shared/assets/icons/camera.png';
import camera2x from '../../../Shared/assets/icons/camera@2x.png';

const { React } = ReactV18;
const { useContext } = React;
const { Formik, useField } = formik;

/**
 * A button that begins the file-upload flow when clicked.
 * Accepts image files, and is meant for uploading proof images
 * for insurance claims.
 */
function ProofFileUploadInput({className, ...props}) {
  // eslint-disable-next-line
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  const cssClass = classNames({
    [styles['proof-file-upload-input']]: true,
    [className]: !!className,
  });

  function handleFileChange(e) {
    const imgFile = e.target.files[0];
    console.log(imgFile);
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

      if (props.onChange) {
        props.onChange({
          base64Img: imgSrc,
          title: imgFile.name,
        });
      }
    }
  }

  return (
    <div className={cssClass}>

      <div className={styles['icon-box']}>
        <Img2x
          src={camera}
          src2x={camera2x}
          alt="camera icon"
        />
      </div>

      <p className={styles.prompt}>
        Click here to Upload A photo of Your Proofs
      </p>

      <label className={styles['hidden-file-input-label']}>
        <input type="file" {...props} accept="image/*" onChange={handleFileChange} />
      </label>
    </div>
  );
}

ProofFileUploadInput.propTypes = {
  name: PT.string.isRequired,
  className: PT.string,

  // Signature: ({base64Img: string, title: string }) => void
  // `base64Src` is the source for the uploaded image file
  // `title` is the file name
  onChange: PT.func,
};

export default ProofFileUploadInput;
