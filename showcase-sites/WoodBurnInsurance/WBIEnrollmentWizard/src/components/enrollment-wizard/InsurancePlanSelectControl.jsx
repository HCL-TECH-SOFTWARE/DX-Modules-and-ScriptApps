import { ReactV18, propTypes as PT, formik } from 'dxmodule';
import styles from './InsurancePlanSelectControl.module.scss';

import InsurancePlanCard from './_InsurancePlanCard';

const { React } = ReactV18;
const { useField } = formik;

/**
 * Formik-enabled control for selecting an insurance plan
 * in the Enrollment Wizard
 */
function InsurancePlanSelectControl({ planOptions, onChange, ...props }) {
  // eslint-disable-next-line
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  function handleSelectPlan(planType) {
    setValue(planType);
    if (onChange) {
      onChange();
    }
  }

  return (
    <div className={styles['insurance-plan-select-control']}>
      {planOptions.map(option => (
        <InsurancePlanCard
          key={option.id}
          insurancePlan={option}
          onSelect={() => handleSelectPlan(option.type)}
        />
      ))}
    </div>
  );
}

InsurancePlanSelectControl.propTypes = {
  name: PT.string.isRequired,
  planOptions: PT.arrayOf(PT.shape({
    id: PT.oneOfType([PT.string, PT.number]),
    name: PT.string,
    pricePerMonth: PT.shape({
      regular: PT.number,
      discounted: PT.number
    }),
    recommended: PT.bool,
    type: PT.string,
  })).isRequired,
  onChange: PT.func,
}

InsurancePlanSelectControl.defaultProps = {
  planOptions: [],
};

export default InsurancePlanSelectControl;
