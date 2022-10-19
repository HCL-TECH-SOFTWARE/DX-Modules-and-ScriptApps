import { propTypes, ReactV18 } from 'dxmodule';
import styles from './_InsuranceIssuesSummaryItem.module.scss';
import IntlContext from '../../../Shared/context/intl.context';

import Auto from '../../../Shared/assets/icons/tabs/auto-active.png';
import Auto2x from '../../../Shared/assets/icons/tabs/auto-active@2x.png';
import Travel from '../../../Shared/assets/icons/tabs/travel-active.png';
import Travel2x from '../../../Shared/assets/icons/tabs/travel-active@2x.png';

const { React } = ReactV18;

const { useContext } = React;

const ICONS = {
  Auto,
  Auto2x,
  Travel,
  Travel2x,
}

function InsuranceIssuesSummaryItem({ issues }) {
  const { intl } = useContext(IntlContext);

  const getIconForIssuesCategory = category => (
    <img
      src={ICONS[category]}
      srcSet={`${ICONS[category]} 1x, ${ICONS[`${category}2x`]} 2x`}
      alt="issues icon" />
  );

  const issuesDetailsHref = '#';

  return (
    <a className={styles['insurance-issues-summary-item-link']} href={issuesDetailsHref}>
      <div className={styles['insurance-issues-summary-item']}>
        <div className={styles['icon-box']}>
          {getIconForIssuesCategory(issues.category)}
        </div>

        <section className={styles['issues-details']}>
          <h3 className={styles['issues-category']}>
            { intl.get(`${issues.category.toUpperCase()}_ISSUES`) }
          </h3>
          <p className={styles['issues-id']}>
            {issues.referenceNumber}
          </p>
          <p className={styles['issues-initiated']}>
            Date: {issues.initiated}
          </p>
          <p className={styles['issues-handler']}>
            Handler: {issues.handler}
          </p>
          <p className={styles['issues-status']}>
            Status: {issues.status}
          </p>
          <p className={styles['issues-location']}>
            Location: {issues.location}
          </p>
          <p className={styles['issues-hospitalization']}>
            Hospitalization: {issues.hospitalization}
          </p>
          <p className={styles['issues-injury']}>
            Injury: {issues.injury}
          </p>
        </section>
      </div>
    </a>
  );
}

InsuranceIssuesSummaryItem.propTypes = {
  issues: propTypes.shape({
    id: propTypes.string,
    referenceNumber: propTypes.string,
    initiated: propTypes.string,
    handler: propTypes.string,
    category: propTypes.string,
    status: propTypes.string,
  }),
};

export default InsuranceIssuesSummaryItem;
