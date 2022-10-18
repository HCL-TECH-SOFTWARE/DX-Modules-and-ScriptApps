import { propTypes, ReactV18 } from 'dxmodule';
import IntlContext from '../../../Shared/context/intl.context';
import styles from './_InsurancePlanSummary.module.scss';
import InsurancePlanSummaryItem from './_InsurancePlanSummaryItem';

const { React } = ReactV18;

const { useContext } = React;

function InsurancePlanSummary(props) {
  const { intl } = useContext(IntlContext);
  const className = styles['insurance-plan-summary'] +
    ( props.className ? ` ${props.className}` : '' );

  return (
    <section className={className}>
      <h2 className={styles['section-header']}>
        { intl.get('MY_BENEFITS_PLANS_SECTION_HEADER') }
      </h2>

      <div className={styles['plans-list']}>
        {
          props.plans.map((plan, i) => (
            <InsurancePlanSummaryItem
              key={i}
              plan={plan}
            />
          ))
        }
      </div>
    </section>
  );
}

InsurancePlanSummary.propTypes = {
  className: propTypes.string,
  plans: propTypes.arrayOf(
    propTypes.shape({
      type: propTypes.string,
      name: propTypes.string,
      status: propTypes.string,
      category: propTypes.string,
      pricePerMonth: propTypes.string,
      coverage: propTypes.string,
    })
  ).isRequired,
};

InsurancePlanSummary.defaultProps = {
  plans: [],
};

export default InsurancePlanSummary;
