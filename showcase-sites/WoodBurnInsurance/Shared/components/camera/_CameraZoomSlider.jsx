import { ReactV18, propTypes } from 'dxmodule';
import styles from './_CameraZoomSlider.module.scss';

// Zoom icons
import zoomOut from '../../assets/icons/zoom-out.png';
import zoomOut2x from '../../assets/icons/zoom-out@2x.png';
import zoomIn from '../../assets/icons/zoom-in.png';
import zoomIn2x from '../../assets/icons/zoom-in@2x.png';

const { React, MaterialUI } = ReactV18;
const { Slider } = MaterialUI;

/**
 * Slider control for adjusting camera zoom.
 */
function CameraZoomSlider({
  min,
  max,
  step,
  onChange,
}) {

  return (
    <div className={styles['zoom-slider-box']}>
      <img
        src={zoomOut}
        srcSet={`${zoomOut} 1x, ${zoomOut2x} 2x`}
        alt="zoom out icon" />

      <Slider
        min={min}
        max={max}
        step={step}
        onChange={onChange}
      />

      <img
        src={zoomIn}
        srcSet={`${zoomIn} 1x, ${zoomIn2x} 2x`}
        alt="zoom out icon" />
    </div>
  );
}

CameraZoomSlider.propTypes = {
  max: propTypes.number.isRequired,
  min: propTypes.number.isRequired,
  step: propTypes.number.isRequired,
  onChange: propTypes.func.isRequired,
};

export default CameraZoomSlider;
