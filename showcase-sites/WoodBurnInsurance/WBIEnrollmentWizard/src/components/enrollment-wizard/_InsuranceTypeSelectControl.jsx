import { ReactV18, propTypes, formik } from 'dxmodule';
import IntlContext from '../../../../Shared/context/intl.context';
import styles from './_InsuranceTypeSelectControl.module.scss';
import InsuranceTypeSelectControlOption from './_InsuranceTypeSelectControlOption';

//
// Tab Icons
//
import auto from '../../../../Shared/assets/icons/tabs/auto.png';
import auto2x from '../../../../Shared/assets/icons/tabs/auto@2x.png';
import autoActive from '../../../../Shared/assets/icons/tabs/auto-active.png';
import autoActive2x from '../../../../Shared/assets/icons/tabs/auto-active@2x.png';

import home from '../../../../Shared/assets/icons/tabs/home.png';
import home2x from '../../../../Shared/assets/icons/tabs/home@2x.png';
import homeActive from '../../../../Shared/assets/icons/tabs/home-active.png';
import homeActive2x from '../../../../Shared/assets/icons/tabs/home-active@2x.png';

import life from '../../../../Shared/assets/icons/tabs/life.png';
import life2x from '../../../../Shared/assets/icons/tabs/life@2x.png';
import lifeActive from '../../../../Shared/assets/icons/tabs/life-active.png';
import lifeActive2x from '../../../../Shared/assets/icons/tabs/life-active@2x.png';

import travel from '../../../../Shared/assets/icons/tabs/travel.png';
import travel2x from '../../../../Shared/assets/icons/tabs/travel@2x.png';
import travelActive from '../../../../Shared/assets/icons/tabs/travel-active.png';
import travelActive2x from '../../../../Shared/assets/icons/tabs/travel-active@2x.png';

const { React } = ReactV18;
const { useContext } = React;
const { useField } = formik;

const ICONS = {
  auto,
  auto2x,
  autoActive,
  autoActive2x,

  home,
  home2x,
  homeActive,
  homeActive2x,

  life,
  life2x,
  lifeActive,
  lifeActive2x,

  travel,
  travel2x,
  travelActive,
  travelActive2x,
};

/**
 * A Formik-enabled select control for choosing an insurance plan type.
 */
function InsuranceTypeSelectControl({onChange, label, disabled, enrolledCategories, ...props}) {
  const { intl } = useContext(IntlContext);

  // eslint-disable-next-line
  const [field, meta, helpers] = useField(props);
  const { value } = meta;
  const { setValue } = helpers;

  const className = styles['insurance-type-select-control'] +
    (disabled ? ` ${styles.disabled}` : '');

  function handleSelect(selectedType) {
    const selectedTypeTitleCase = selectedType[0].toUpperCase() + selectedType.slice(1);
    setValue(selectedTypeTitleCase);
    onChange();
  }

  return (
    <div className={className}>
      <label className={styles.label}>
        {label}
      </label> 

      <div className={styles['options']}>
        {props.insurances
          .map(type => type.toLowerCase())
          .map(type => (
            <InsuranceTypeSelectControlOption
              key={type}
              isSelected={type === value}
              isEnrolled={enrolledCategories.map(c => c.toLowerCase()).includes(type)}
              onSelect={() => handleSelect(type)}
              label={intl.get(`${type.toUpperCase()}_INSURANCE`)}
              activeIcon={
                <img
                  src={ICONS[type]}
                  srcSet={`
                    ${ICONS[type]} 1x, ${ICONS[`${type}2x`]} 2x
                  `}
                  alt="insurance type icon" />
              }
              icon={
                <img
                  src={ICONS[`${type}Active`]}
                  srcSet={`
                    ${ICONS[`${type}Active`]} 1x, ${ICONS[`${type}Active2x`]} 2x
                  `}
                  alt="insurance type icon" />
              }
            />
          )
        )}
      </div>
    </div>
  );
}

InsuranceTypeSelectControl.propTypes = {
  onChange: propTypes.func,
  label: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  disabled: propTypes.bool.isRequired,
  insurances: propTypes.arrayOf(propTypes.oneOf(['Home', 'Life', 'Travel', 'Auto'])).isRequired,
  enrolledCategories: propTypes.arrayOf(propTypes.oneOf(['Home', 'Life', 'Travel', 'Auto'])).isRequired,
};

InsuranceTypeSelectControl.defaultProps = {
  disabled: true,
};

export default InsuranceTypeSelectControl;
