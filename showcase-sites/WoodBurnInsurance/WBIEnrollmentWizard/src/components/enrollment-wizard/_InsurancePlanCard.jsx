import { ReactV18, propTypes } from 'dxmodule';
import styles from './_InsurancePlanCard.module.scss';

// Ribbon icons
import gold from '../../../../Shared/assets/icons/insurance-plans/gold.png';
import gold2x from '../../../../Shared/assets/icons/insurance-plans/gold@2x.png';
import silver from '../../../../Shared/assets/icons/insurance-plans/silver.png';
import silver2x from '../../../../Shared/assets/icons/insurance-plans/silver@2x.png';
import bronze from '../../../../Shared/assets/icons/insurance-plans/bronze.png';
import bronze2x from '../../../../Shared/assets/icons/insurance-plans/bronze@2x.png';
import leaves from '../../../../Shared/assets/icons/insurance-plans/leaves.png';
import leaves2x from '../../../../Shared/assets/icons/insurance-plans/leaves@2x.png';
import recommended from '../../../../Shared/assets/icons/insurance-plans/recommended.png';
import IntlContext from '../../../../Shared/context/intl.context';

const { React } = ReactV18;
const { useContext } = React;

const RIBBON_ICON = {
  gold:   { '1x': gold, '2x': gold2x },
  silver: { '1x': silver, '2x': silver2x },
  bronze: { '1x': bronze, '2x': bronze2x },
}

/**
 * A card object representing a single insurance plan type.
 */
function InsurancePlanCard(props) {
  const { intl } = useContext(IntlContext);
  const { insurancePlan } = props;
  const className = `${styles['insurance-plan-card']} ${styles[insurancePlan.type]}`;

  function getIconForPlanType(planType) {
    return (
      <img
        src={RIBBON_ICON[planType]['1x']}
        srcSet={`
          ${RIBBON_ICON[planType]['1x']} 1x,
          ${RIBBON_ICON[planType]['2x']} 2x, 
        `}
        alt="insurance plan icon" />
    );
  }

  return (
    <div className={className}
      onClick={props.onSelect}>

      {insurancePlan.recommended &&
        <img src={recommended} alt="recommended" className={styles['recommended-icon']}/>
      }

      <div className={styles['ribbon-box']}>
        <div className={styles.ribbon}>
          {getIconForPlanType(insurancePlan.type)}
        </div>
        <h3 className={styles['plan-type']}>
          {insurancePlan.type} Plan
        </h3>
      </div>

      <div className={styles['plan-details-box']}>
        <label className={styles['discount-label']}>
          {intl.get('REGULAR_PRICE')}:
          <span className={styles['old-price']}>
            ${insurancePlan.pricePerMonth.regular}/m
          </span>
        </label>

        <div className={styles['plan-details']}>
          <div className={styles['discounted-price']}>
            ${insurancePlan.pricePerMonth.discounted}/m
          </div>
          <div className={styles['plan-name']}>
            {insurancePlan.name}
          </div>
          <div className={styles['discount-amount-box']}>
            <span className={styles['discount-amount']}>
              ${insurancePlan.pricePerMonth.regular - insurancePlan.pricePerMonth.discounted}
            </span>
            {intl.get('SAVED')}
          </div>
        </div>

        <img
          className={styles.leaves}
          src={leaves}
          srcSet={`${leaves} 1x, ${leaves2x} 2x`}
          alt="insurance plan icon" />
      </div>
    </div>
  );
}

InsurancePlanCard.propTypes = {
  insurancePlan: propTypes.shape({
    id: propTypes.oneOfType([propTypes.string, propTypes.number]),
    name: propTypes.string,
    pricePerMonth: propTypes.shape({
      regular: propTypes.number,
      discounted: propTypes.number
    }),
    recommended: propTypes.bool,
    type: propTypes.string,
  }).isRequired,
  onSelect: propTypes.func,
}

export default InsurancePlanCard;
