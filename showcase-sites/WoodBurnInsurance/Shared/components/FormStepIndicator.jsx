import { ReactV18, propTypes } from 'dxmodule';
import styles from './FormStepIndicator.module.scss';
import FormStepIndicatorItem from './_FormStepIndicatorItem';

const { React } = ReactV18;

/**
 * Form Step Indicator
 *
 * Displayed above the form pages and indicates which step
 * the user is currently completing.
 */
function FormStepIndicator(props) {
  const { stepNames, activeStepIndex } = props;

  /**
   * @param {Number} stepIndex - The step index whose status is sought.
   * @param {Number} activeStepIndex - The index of the active step
   * @returns {string} The status state of the step index.
   */
  function getStepStatus(stepIndex, activeStepIndex) {
    return (stepIndex < activeStepIndex) ? 'completed'  :
           (stepIndex > activeStepIndex) ? 'incomplete' :
                                           'current';
  }

  /**
   * @param {Number} numSteps - The number of form steps, or pages.
   * @param {Number} activeStepIndex - The index of the active step
   * @returns {string} A CSS string representing the width of the horizontal
   * line extending from the first step to the current step.
   */
  function getProgressLineWidth(numSteps, activeStepIndex) {
    if (numSteps <= 1) {
      return 0;
    }
    return `${(activeStepIndex / (numSteps - 1) * 100) + '%'}`;
  }

  return (
    <div className={styles['form-step-indicator']}>
      {/* The horizontal purple line(s) */}
      <span className={`${styles.line} ${styles['mobile-left-progress-line']}`}></span> 
      <span className={`${styles.line} ${styles['primary-progress-line']}`}>
        <span className={`${styles.line} ${styles['completed-line']}`}
          style={{
            width: getProgressLineWidth(stepNames.length, activeStepIndex),
          }}></span>
      </span>
      <span className={`${styles.line} ${styles['mobile-right-progress-line']}`}></span> 

      <div className={styles['form-steps']}>
        {stepNames.map((step, i) => (
          <FormStepIndicatorItem
            key={step}
            label={step}
            status={getStepStatus(i, activeStepIndex)}
          />
        ))}
      </div>
    </div>
  );
}

FormStepIndicator.propTypes = {
  stepNames: propTypes.arrayOf(propTypes.string).isRequired,
  activeStepIndex: propTypes.number.isRequired,
};

export default FormStepIndicator;

