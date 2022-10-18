import { propTypes, ReactV18 } from 'dxmodule';
import styles from './_InsuranceIssuesSummary.module.scss';
import IntlContext from '../../../Shared/context/intl.context';
import InsuranceIssuesSummaryItem from './_InsuranceIssuesSummaryItem';

const { React } = ReactV18;

const { useContext } = React;

function InsuranceIssuesSummary(props) {
  const { intl } = useContext(IntlContext);
  const className = styles['insurance-issues-summary'] +
    (props.className ? ` ${props.className}` : '');

  return (
    <section className={className}>
      <h2 className={styles['section-header']}>
        { intl.get('MY_BENEFITS_ISSUES_SECTION_HEADER') }
      </h2>

      <div className={styles['issues-list']}>
        {props.issues.map(issues => (
          <InsuranceIssuesSummaryItem
            key={issues.id}
            issues={issues}
          />
        ))
        }
      </div>
    </section>
  );
}

InsuranceIssuesSummary.propTypes = {
  className: propTypes.string,
  issues: propTypes.arrayOf(propTypes.shape({
    id: propTypes.string,
    category: propTypes.string,
    status: propTypes.string,
    location: propTypes.location,
    hospitalization: propTypes.hospitalization,
    injury: propTypes.injury,
  })).isRequired,
};

InsuranceIssuesSummary.defaultProps = {
  issues: [],
};

export default InsuranceIssuesSummary;
