import { ReactV18, propTypes as PT } from 'dxmodule';
import IntlContext from '../../../../Shared/context/intl.context';
import styles from './_ChangeCoverageButton.module.scss';

const { React } = ReactV18;
const { useContext } = React;

/**
 * Enrollment Wizard "Change Coverage" button
 */
function ChangeCoverageButton(props) {
  const { intl } = useContext(IntlContext);

  return (
    <button type="button" className={styles['change-coverage-btn']}
      onClick={props.onClick}>
      <label className={styles.label}>
        {intl.get('INPUT_LABEL_CAR_COVERAGE')}
      </label>
      <p className={styles.coverage}>
        {props.coverageAmount}
      </p>

      <span className={styles['change-chip']}>
        {intl.get('CHANGE')}
      </span>
    </button>
  );
}

ChangeCoverageButton.propTypes = {
  coverageAmount: PT.string.isRequired,
  onClick: PT.func.isRequired,
};

export default ChangeCoverageButton;
