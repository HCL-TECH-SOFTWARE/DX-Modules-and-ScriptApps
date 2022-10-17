import { ReactV18, propTypes } from 'dxmodule';
import styles from './_SnapPhotoButton.module.scss';

import camera from '../../assets/icons/camera.png';
import camera2x from '../../assets/icons/camera@2x.png';

const { React } = ReactV18;

/**
 * The "take picture" button for the LicenseCameraModal
 */
function SnapPhotoButton(props) {
  const className = styles['snap-photo-btn'] +
    (props.className ? ` ${props.className}` : '');
  return (
    <button className={className}
      onClick={props.onClick}>
      <img
        src={camera}
        srcSet={`${camera} 1x, ${camera2x} 2x`}
        alt="camera icon" />
    </button>
  );
}

SnapPhotoButton.propTypes = {
  className: propTypes.string,
  onClick: propTypes.func.isRequired,
};

export default SnapPhotoButton;
