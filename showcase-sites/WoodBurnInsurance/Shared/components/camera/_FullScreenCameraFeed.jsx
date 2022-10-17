import { ReactV18, propTypes } from 'dxmodule';
import styles from './_FullScreenCameraFeed.module.scss';

// Icons
import close from '../../assets/icons/close.png';
import close2x from '../../assets/icons/close@2x.png';

const { React } = ReactV18;
const { useEffect } = React;

/**
 * A dismissible full-screen device camera feed. Used by form modals
 * to take pictures of licences, claim proofs, etc.
 */
function FullScreenCameraFeed({
  videoRef,
  onInitVideoTrack,
  onInitCameraZoom,
  onDismiss,
}) {

  // Connect device camera to the <video> element.
  useEffect(() => {
    const constraints = { video:  { facingMode: "environment" } };
    window.navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        const track = stream.getVideoTracks()[0]
        if (onInitVideoTrack) {
          onInitVideoTrack(track);
        }
        videoRef.current.srcObject = stream;

        // Need to delay retrieving capabilities until after
        // the device starts streaming.
        // See
        // https://googlechrome.github.io/samples/image-capture/update-camera-zoom.html and
        // crbug.com/711524
        setTimeout(() => {
          const capabilities = track.getCapabilities();
          if ('zoom' in capabilities) {
            onInitCameraZoom(capabilities.zoom);
          }
        }, 1000);
      });
  }, [onInitVideoTrack, onInitCameraZoom, videoRef]);

  return (
    <div className={styles['license-camera-modal']}>
      <button className={styles['dismiss-btn']}
        onClick={onDismiss}>
        <img
          src={close}
          srcSet={`${close} 1x, ${close2x} 2x`}
          alt="close icon" />
      </button>
    
      <video ref={videoRef} className={styles.video} autoPlay playsInline></video>
    </div>
  );
}

FullScreenCameraFeed.propTypes = {

  // https://stackoverflow.com/a/51127130/6249294
  videoRef: propTypes.oneOfType([
    propTypes.func,
    propTypes.shape({ current: propTypes.instanceOf(Element) })
  ]),

  onDismiss: propTypes.func.isRequired,
  onInitVideoTrack: propTypes.func,
  onInitCameraZoom: propTypes.func,
};

export default FullScreenCameraFeed;
