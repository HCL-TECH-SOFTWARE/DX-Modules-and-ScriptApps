import { propTypes, ReactV18 } from 'dxmodule';
import styles from './_InsuranceClaimSummaryItem.module.scss';
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

function InsuranceClaimSummaryItem({ claim }) {
  const { intl } = useContext(IntlContext);

  const getIconForClaimCategory = category => (
    <img
      src={ICONS[category]}
      srcSet={`${ICONS[category]} 1x, ${ICONS[`${category}2x`]} 2x`}
      alt="claim icon" />
  );

  const claimDetailsHref = '#';

  return (
    <a className={styles['insurance-claim-summary-item-link']} href={claimDetailsHref}>
      <div className={styles['insurance-claim-summary-item']}>
        <div className={styles['icon-box']}>
          {getIconForClaimCategory(claim.category)}
        </div>

        <section className={styles['claim-details']}>
          <h3 className={styles['claim-category']}>
            { intl.get(`${claim.category.toUpperCase()}_CLAIM`) }
          </h3>
          <p className={styles['claim-id']}>
            {claim.referenceNumber}
          </p>
        </section>

        <span className={`${styles['claim-status-chip']} ${styles[claim.status]}`}>
          {claim.status}
        </span>
      </div>
    </a>
  );
}

InsuranceClaimSummaryItem.propTypes = {
  claim: propTypes.shape({
    id: propTypes.string,
    referenceNumber: propTypes.string,
    category: propTypes.string,
    status: propTypes.string,
  }),
};

export default InsuranceClaimSummaryItem;
