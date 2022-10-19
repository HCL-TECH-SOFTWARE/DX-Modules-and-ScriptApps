import { ReactV18, propTypes } from 'dxmodule';
import IntlContext from '../../context/intl.context';
import styles from './LicenseCameraModal.module.scss';

import FullScreenCameraFeed from './_FullScreenCameraFeed';
import CameraZoomSlider from './_CameraZoomSlider';
import SnapPhotoButton from './_SnapPhotoButton';

const { React } = ReactV18;
const { useState, useRef, useCallback, useContext } = React;

/**
 * Modal that displays a full-screen video with a viewfinder for taking
 * a picture of a driver's license.
 */
function LicenseCameraModal(props) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { intl } = useContext(IntlContext);

  const [cameraZoomEnabled, setCameraZoomEnabled] = useState(false);
  const [cameraZoom, setCameraZoom] = useState({ min: 0, max: 100, step: 2 });
  const [videoTrack, setVideoTrack] = useState(null);

  /**
   * Stops the device from streaming video. MUST be called once app is
   * finished with the camera. The camera will run indefinitely otherwise.
   */
  function stopVideoStreams() {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getVideoTracks().forEach(track => track.stop());
    }
  }

  /**
   * Handler for zoom slider change. Updates the zoom of the camera
   * @param e - The slider change event
   * @param {Number} value - The updated zoom value
   */
  function handleZoomChange(e, value) {
    if (videoTrack) {
      videoTrack.applyConstraints({ advanced: [{ zoom: value }] });
    }
  }

  /**
   * Stops video streaming and dismisses the modal
   */
  function handleDismiss() {
    stopVideoStreams();
    props.onDismiss();
  }

  function handleVideoTrackInit(videoTrack) {
    setVideoTrack(videoTrack);
  }
  const memoizedHandleVideoTrackInit = useCallback(
    handleVideoTrackInit,
    [setVideoTrack]
  );

  function handleCameraZoomInit(cameraZoom) {
    setCameraZoomEnabled(true);
    setCameraZoom(cameraZoom);
  }
  const memoizedHandleCameraZoomInit = useCallback(
    handleCameraZoomInit,
    [setCameraZoomEnabled, setCameraZoom]
  );

  /**
   * Captures the image contained within the viewfinder from the video stream.
   * Emits this base64-encoded string to the parent component.
   */
  function handleSnapPhotoBtnClick() {
    if (canvasRef.current && videoRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const viewfinderWidth = 341/*px*/;
      const viewfinderHeight = 232/*px*/;
      // percent of the viewport height the top of the viewfinder
      // is below the top of the viewport. Breakpoint is viewport height <= 375px
      const viewfinderDY = window.innerHeight <= 375
        ? 0.1 : 0.255;

      // Get the factor by which the video is scaled to fill the entire screen
      const videoScaleFactor = Math.max(
        window.innerWidth / video.videoWidth,
        window.innerHeight / video.videoHeight
      );


      // Draw into the canvas the part of the video contained within the viewfinder.
      const sWidth = viewfinderWidth / videoScaleFactor;
      const sHeight = viewfinderHeight / videoScaleFactor;
      const sx = (video.videoWidth - sWidth) / 2;
      const sy = (window.innerHeight * viewfinderDY) / videoScaleFactor;
      canvas.width = sWidth;
      canvas.height = sHeight;
      ctx.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight);
      const imageSrc = canvas.toDataURL('image/png');


      // Stop the video stream and emit onChange with the base64 image string:
      stopVideoStreams();
      props.onChange(imageSrc);
    }
  }

  return (
    <div className={styles['license-camera-modal']}>

      <FullScreenCameraFeed
        videoRef={videoRef}
        onDismiss={handleDismiss}
        onInitVideoTrack={memoizedHandleVideoTrackInit}
        onInitCameraZoom={memoizedHandleCameraZoomInit}
      />

      <canvas ref={canvasRef}></canvas>

      <div className={styles['viewfinder-overlay']}>
        <div className={styles.viewfinder}>
        </div>
      </div>

      <div className={styles['viewfinder-corners']}>
        <span className={styles['viewfinder-corner']}></span> 
        <span className={styles['viewfinder-corner']}></span> 
        <span className={styles['viewfinder-corner']}></span> 
        <span className={styles['viewfinder-corner']}></span> 
      </div>


      <div className={styles['ui-overlay']}>
        <section className={styles['ui-overlay-top']}>
          <h3 className={styles['ui-overlay-prompt']}>
            {intl.get('CAMERA_PROMPT')}
          </h3> 
        </section>

        <div className={styles['ui-overlay-bottom']}>
          {cameraZoomEnabled &&
            <div className={styles['slider-box']}>
              <CameraZoomSlider
                min={cameraZoom.min}
                max={cameraZoom.max}
                step={cameraZoom.step}
                onChange={handleZoomChange}
              />
            </div>
          }

          <div className={styles['snap-photo-btn-box']}>
            <SnapPhotoButton
              className={styles['snap-photo-btn']}
              onClick={handleSnapPhotoBtnClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

LicenseCameraModal.propTypes = {
  onChange: propTypes.func.isRequired,
  onDismiss: propTypes.func.isRequired,
};

export default LicenseCameraModal;
