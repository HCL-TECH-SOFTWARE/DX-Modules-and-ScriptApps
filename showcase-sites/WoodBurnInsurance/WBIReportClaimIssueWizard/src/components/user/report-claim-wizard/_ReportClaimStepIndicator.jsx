import { ReactV18, propTypes as PT } from 'dxmodule';
import IntlContext from '../../../../../Shared/context/intl.context';

import FormStepIndicator from '../../../../../Shared/components/FormStepIndicator';

const STEP_NAMES = ['PLAN', 'DETAILS', 'PROOFS'];

const { React } = ReactV18;
const { useContext } = React;

/**
 * Report Claim Wizard Step Indicator
 *
 * Displayed above the form pages and indicates which step
 * the user is currently completing.
 */
function ReportClaimStepIndicator({ activeStepIndex }) {
  const intl = useContext(IntlContext);
  const stepNames = STEP_NAMES.map(step => (
    // intl.get(`REPORT_CLAIM_STEP_${step}`)
    step.charAt(0).toUpperCase() + step.slice(1)
  ));

  return (
    <FormStepIndicator
      stepNames={stepNames}
      activeStepIndex={activeStepIndex}
    />
  );
}

ReportClaimStepIndicator.propTypes = {
  activeStepIndex: PT.number.isRequired,
};

export default ReportClaimStepIndicator;

