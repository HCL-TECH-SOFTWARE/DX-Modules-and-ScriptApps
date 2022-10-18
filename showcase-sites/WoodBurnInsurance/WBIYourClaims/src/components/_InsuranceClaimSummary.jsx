import { propTypes, ReactV18 } from 'dxmodule';
import styles from './_InsuranceClaimSummary.module.scss';
import IntlContext from '../../../Shared/context/intl.context';
import InsuranceClaimSummaryItem from './_InsuranceClaimSummaryItem';

const { React } = ReactV18;

const { useContext } = React;

function InsuranceClaimSummary(props) {
  const { intl } = useContext(IntlContext);
  const className = styles['insurance-claim-summary'] +
    (props.className ? ` ${props.className}` : '');

  return (
    <section className={className}>
      <h2 className={styles['section-header']}>
        { intl.get('MY_BENEFITS_CLAIMS_SECTION_HEADER') }
      </h2>

      <div className={styles['claims-list']}>
        {props.claims.map(claim => (
          <InsuranceClaimSummaryItem
            key={claim.id}
            claim={claim}
          />
        ))
        }
      </div>
    </section>
  );
}

InsuranceClaimSummary.propTypes = {
  className: propTypes.string,
  claims: propTypes.arrayOf(propTypes.shape({
    id: propTypes.string,
    category: propTypes.string,
    status: propTypes.string,
  })).isRequired,
};

InsuranceClaimSummary.defaultProps = {
  claims: [],
};

export default InsuranceClaimSummary;
