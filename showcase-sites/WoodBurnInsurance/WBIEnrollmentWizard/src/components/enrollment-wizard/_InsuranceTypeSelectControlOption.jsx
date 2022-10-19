import { ReactV18, propTypes } from 'dxmodule';
import IntlContext from '../../../../Shared/context/intl.context';
import styles from './_InsuranceTypeSelectControlOption.module.scss';

const { React } = ReactV18;
const { useContext } = React;
function InsuranceTypeSelectControlOption(props) {
  const { intl } = useContext(IntlContext);
  const className = styles['insurance-type-option'] +
    (props.isSelected ? ` ${styles.active}` : '');

  return (
    <div className={className} onClick={props.onSelect}>
      <div className={styles['icon-box']}>
        {props.icon} 
        {props.activeIcon}
      </div> 
      <label className={styles.label}>
        {props.label}    
      </label>
      {props.isEnrolled &&
        <span className={styles['enrolled-chip']}>
          {intl.get('ENROLLED')}  
        </span>
      }
    </div>
  );
}

InsuranceTypeSelectControlOption.propTypes = {
  // `true` if user is already enrolled in this insurance category
  isEnrolled: propTypes.bool.isRequired,
  isSelected: propTypes.bool.isRequired,
  label: propTypes.string.isRequired,
  icon: propTypes.element.isRequired,
  activeIcon: propTypes.element.isRequired,
  onSelect: propTypes.func.isRequired,
}

InsuranceTypeSelectControlOption.defaultProps = {
  isSelected: false,
}

export default InsuranceTypeSelectControlOption;
