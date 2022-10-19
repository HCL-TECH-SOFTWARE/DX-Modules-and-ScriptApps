import { classNames, propTypes, ReactV18 } from 'dxmodule';
import styles from './SpinnerOverlay.module.scss';
import spinner from '../assets/icons/spinner.png';

const { React } = ReactV18;

/**
 * Displays a semitransparent overlay and a spinner on top of its
 * children when `isLoading` prop is `true`. Used for indicating
 * the child content is being loaded, e.g. from an HTTP request.
 */
function SpinnerOverlay(props) {
  /*
  const className = styles['spinner-overlay-container'] +
    (props.isLoading ? ` ${styles['is-loading']}` : '');
    */
  const className = classNames({
    [styles['spinner-overlay-container']]: true,
    [styles['is-loading']]: props.isLoading,
    [styles['full-screen']]: props.fullScreen,
    [props.className]: !!props.className,
  });

  return (
    <div className={className}>
      {props.children}

      <div className={styles['spinner-overlay']}>
        <img src={spinner} alt="loading indicator" className={styles.spinner} />
      </div>
    </div>
  );
}

SpinnerOverlay.propTypes = {
  className: propTypes.string,
  isLoading: propTypes.bool.isRequired,
  children: propTypes.node,

  // If `true`, then the overlay is fixed and covers the entire viewport.
  // Typically, the `children` prop is omitted when this is `true` since
  // the overlay is not wrapping a specific element.
  fullScreen: propTypes.bool.isRequired,
};

SpinnerOverlay.defaultProps = {
  fullScreen: false,
}

export default SpinnerOverlay;
