import { propTypes, ReactV18 } from 'dxmodule';
import styles from './_InsurancePlanSummaryItem.module.scss';
import IntlContext from '../../../Shared/context/intl.context';
import InsurancePlanStatusChip from './_InsurancePlanStatusChip';

// Insurance Plan Ribbon Icons
import bronzePlan from '../../../Shared/assets/icons/insurance-plans/bronze.png';
import bronzePlan2x from '../../../Shared/assets/icons/insurance-plans/bronze@2x.png';
import silverPlan from '../../../Shared/assets/icons/insurance-plans/silver.png';
import silverPlan2x from '../../../Shared/assets/icons/insurance-plans/silver@2x.png';
import goldPlan from '../../../Shared/assets/icons/insurance-plans/gold.png';
import goldPlan2x from '../../../Shared/assets/icons/insurance-plans/gold@2x.png';

const { React } = ReactV18;

const { useContext } = React;

function InsurancePlanSummaryItem({ plan }) {
  const { intl } = useContext(IntlContext);

  function getRibbonIconForInsuranceType(type) {
    let icon, icon2x;
    switch(type) {
      case 'bronze':
        icon = bronzePlan;
        icon2x = bronzePlan2x;
        break;
      case 'silver':
        icon = silverPlan;
        icon2x = silverPlan2x;
        break;
      case 'gold':
        icon = goldPlan;
        icon2x = goldPlan2x;
        break;
      default:
        console.warn(`Unrecognized insurance type "${type}." Expected one of ['bronze', 'silver', 'gold'].`);
        return null;
    }
    return (
      <img
        src={icon}
        srcSet={`${icon} 1x, ${icon2x} 2x`}
        alt="insurance type icon" />
    );
  }

  const planDetailsHref = "#";

  return (
    <a className={styles['insurance-plan-summary-item-link']} href={planDetailsHref}>
      <div className={styles['insurance-plan-summary-item']}>
        <div className={styles.primary}>
          <InsurancePlanStatusChip
            planStatus={plan.status}
          />

          <h3 className={styles['plan-category']}>
            { intl.get(`${plan.category.toUpperCase()}_INSURANCE`) }
          </h3>

          <div className={styles['plan-cost-and-coverage']}>
            <div className={styles['plan-cost-box']}>
              <p className={styles['plan-cost']}>
                {plan.pricePerMonth}
              </p>
              <label>
                { intl.get('MONTHLY') }
              </label>
            </div>
            <div className={styles['plan-coverage-box']}>
              <p className={styles['plan-coverage']}>
                { plan.coverage }
              </p>
              <label>
                { intl.get('COVERAGE') }
              </label>
            </div>
          </div>
        </div>

        <div className={`${styles['plan-type-box']} ${styles[plan.type]}`}>
          <div className={styles['plan-ribbon-box']}>
            { getRibbonIconForInsuranceType(plan.type) }
          </div>
          <h4 className={styles['plan-type']}>
            { plan.name }
          </h4>
        </div>
      </div>
    </a>
  );
}

InsurancePlanSummaryItem.propTypes = {
  plan: propTypes.shape({
    id: propTypes.string,
    type: propTypes.string,
    name: propTypes.string,
    status: propTypes.string,
    category: propTypes.string,
    pricePerMonth: propTypes.string,
    coverage: propTypes.string,
  }).isRequired,
};

export default InsurancePlanSummaryItem;
