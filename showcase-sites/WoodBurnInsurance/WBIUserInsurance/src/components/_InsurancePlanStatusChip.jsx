import { propTypes, ReactV18 } from 'dxmodule';
import styles from './_InsurancePlanStatusChip.module.scss';

const { React } = ReactV18;

/**
 * A rounded rectangle chip displaying the status of an
 * insurance plan.
 */
function InsurancePlanStatusChip({ planStatus }) {
  return (
    <span className={`${styles['plan-status-chip']} ${styles[planStatus]}`}>
      {planStatus}
    </span>
  );
}

InsurancePlanStatusChip.propTypes = {
  planStatus: propTypes.oneOf(['Pending', 'Enrolled'])
};

export default InsurancePlanStatusChip;
