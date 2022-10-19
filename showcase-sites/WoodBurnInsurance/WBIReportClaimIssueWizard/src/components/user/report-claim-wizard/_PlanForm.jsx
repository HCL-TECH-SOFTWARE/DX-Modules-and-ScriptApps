import { ReactV18, propTypes as PT } from 'dxmodule';
import IntlContext from '../../../../../Shared/context/intl.context';
import styles from './_PlanForm.module.scss';

import InsuranceCategoryButton from './_InsuranceCategoryButton';
import OtherCoverageCTABanner from '../../../../../Shared/components/banners/OtherCoverageCTABanner';
import FormPageNavigation from '../../../../../Shared/components/form/FormPageNavigation';

const { React } = ReactV18;
const { useContext } = React;

/***
 * Form for the user to select the insurance on which
 * to report a claim.
 */


function PlanForm({ plans, onSelectPlan, onPrevious }) {
  const { intl } = useContext(IntlContext);
  
  return (
    <section className={styles['plan-form']}>
      <h1 className={styles.title}>
        {intl.get('REPORT_CLAIM_PLAN_TITLE')}
      </h1>
      <p>
        {intl.get('REPORT_CLAIM_PLAN_PROMPT')}
      </p>

      <div className={styles['user-plans-list']}>
        {plans.map(plan => (
          <InsuranceCategoryButton
            key={plan.id}
            className={styles['category-btn']}
            insuranceCategory={plan.category}
            insuranceType={plan.type}
            onClick={() => onSelectPlan(plan.id)}
          />
        ))}
      </div>
      <OtherCoverageCTABanner
        className={styles['cta-banner']}
      />

      <FormPageNavigation
        className={styles['form-page-navigation']}
        prevLabel={intl.get('CANCEL')}
        onPrevious={onPrevious}
      />
    </section>
  );
}

PlanForm.propTypes = {
  plans: PT.arrayOf(PT.shape({
    id: PT.string.isRequired,
    type: PT.oneOf(['gold', 'silver', 'bronze']).isRequired,
    category: PT.oneOf(['Travel', 'Auto', 'Life', 'Home']).isRequired,
  })).isRequired,
  onSelectPlan: PT.func.isRequired,
  onPrevious: PT.func.isRequired,
};

PlanForm.defaultProps = {
  plans: [],
};

export default PlanForm;
