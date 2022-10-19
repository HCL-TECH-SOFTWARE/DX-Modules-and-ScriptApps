import { ReactV18, propTypes as PT, classNames} from 'dxmodule';
import styles from './ChipLabel.module.scss';

import close from '../assets/icons/close-gray.png';
import close2x from '../assets/icons/close-gray@2x.png';

import Img2x from './Img2x';

const { React } = ReactV18;

/**
 * A chip element displaying a text label and an (X) button
 * for removing.
 */
function ChipLabel(props) {
  const cssClass = classNames({
    [styles['chip-label']]: true,
    [props.className]: !!props.className,
  });

  return (
    <div className={cssClass}>
      <label className={styles.label}>
        {props.label}
      </label>
      <button className={styles['dismiss-btn']} type="button"
        onClick={props.onRemove}>
        <Img2x
          src={close}
          src2x={close2x}
          alt="close icon"
        />
      </button>
    </div>
  );
}

ChipLabel.propTypes = {
  label: PT.string.isRequired,
  onRemove: PT.func.isRequired,

  className: PT.string,
};

export default ChipLabel;
