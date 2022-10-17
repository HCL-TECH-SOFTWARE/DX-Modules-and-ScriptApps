import { ReactV18, propTypes, classNames } from 'dxmodule';
import styles from './_ChooseActionButton.module.scss';

const { React } = ReactV18;

/**
 * A button that displays a modal action for the user to choose from.
 */
function ChooseActionButton({
  className,
  label,
  icon,
  hoverIcon,
  onClick,
}) {
  const cssClass = classNames(
    styles['choose-action-btn'],
    { [className]: !!className, }
  );
  return (
    <button className={cssClass} onClick={onClick}>
      <span className={styles['icon-box']}>
        {icon} 
      </span> 
      <span className={styles['hover-icon-box']}>
        {hoverIcon} 
      </span> 
      <label className={styles.label}>
        {label} 
      </label>
    </button>
  );
}

ChooseActionButton.propTypes = {
  className: propTypes.string,
  label: propTypes.string.isRequired,
  icon: propTypes.element.isRequired,
  hoverIcon: propTypes.element.isRequired,
  onClick: propTypes.func.isRequired,
};

export default ChooseActionButton;
