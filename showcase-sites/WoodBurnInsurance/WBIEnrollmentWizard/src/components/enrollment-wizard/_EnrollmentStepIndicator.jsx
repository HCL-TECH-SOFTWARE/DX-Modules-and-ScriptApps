import { ReactV18, propTypes } from 'dxmodule';
import FormStepIndicator from '../../../../Shared/components/FormStepIndicator';
import IntlContext from '../../../../Shared/context/intl.context';

const { React } = ReactV18;
const { useContext } = React;

const STEP_NAMES = ['TYPE', 'DETAILS', 'SELECT', 'REVIEW'];

/**
 * Enrollment Wizard Step Indicator
 *
 * Displayed above the form pages and indicates which step
 * the user is currently completing.
 */
function EnrollmentStepIndicator({ activeStepIndex }) {
  const { intl } = useContext(IntlContext);
  const stepNames = STEP_NAMES.map(step => (
    intl.get(`ENROLLMENT_STEP_${step}`)
  ));

  return (
    <FormStepIndicator
      stepNames={stepNames}
      activeStepIndex={activeStepIndex}
    />
  );
}

EnrollmentStepIndicator.propTypes = {
  activeStepIndex: propTypes.number.isRequired,
};

export default EnrollmentStepIndicator;
