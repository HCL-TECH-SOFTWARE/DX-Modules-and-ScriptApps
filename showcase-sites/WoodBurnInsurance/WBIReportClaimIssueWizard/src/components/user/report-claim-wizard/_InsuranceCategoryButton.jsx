import { ReactV18, classNames, propTypes as PT } from 'dxmodule';
import styles from './_InsuranceCategoryButton.module.scss';
import {
  INSURANCE_TYPE_RIBBON_ICON,
  INSURANCE_CATEGORY_ICON
} from '../../../../../Shared/constants/index';

import Img2x from '../../../../../Shared/components/Img2x';

const { React } =ReactV18;
const { useEffect } = React;

/**
 * A button representing one of the user's current insurance plans.
 * Displays the plan type ('gold', 'silver', or 'bronze') and
 * category ('Travel', 'Life', 'Home', or 'Auto').
 *
 * Used by the Report Claim Enrollment Wizard Step 1 (Plan) for selecting
 * a plan.
 *
 */
function InsuranceCategoryButton({
  insuranceCategory,
  insuranceType,
  onClick,
  className,
}) {
  const ribbonIcon = INSURANCE_TYPE_RIBBON_ICON[insuranceType.toLowerCase()];
  const categoryIcon = INSURANCE_CATEGORY_ICON[insuranceCategory.toLowerCase()];
  const categoryName = "Travel Insurance";

  const btnClass = classNames(
    styles['insurance-category-btn'],
    styles[`type-${insuranceType}`],
    { [className]: !!className },
  );

  return (
    <button className={btnClass} onClick={onClick}>

      {/* Insurance Type Ribbon */}
      <span className={styles['insurance-type-box']}>
        <Img2x
          className={styles['ribbon-icon']}
          src={ribbonIcon['1x']}
          src2x={ribbonIcon['2x']}
          alt="insurance type ribbon" />
      </span>

      {/*Insurance Category*/}
      <span className={styles['insurance-category-box']}>
        <span className={styles['category-icon-box']}>
          <Img2x
            className={styles['category-icon']}
            src={categoryIcon['1x']}
            src2x={categoryIcon['2x']}
            alt="insurance category icon" />
          <Img2x
            className={styles['active-category-icon']}
            src={categoryIcon['1x_white']}
            src2x={categoryIcon['2x_white']}
            alt="insurance category icon" />
        </span>

        <label className={styles.label}>
          {categoryName}
        </label>
      </span>
    </button>
  );
}

InsuranceCategoryButton.propTypes = {
  insuranceCategory: PT.oneOf(['Travel', 'Auto', 'Home', 'Life']).isRequired,
  insuranceType: PT.oneOf(['gold', 'silver', 'bronze']).isRequired,
  onClick: PT.func.isRequired,

  className: PT.string,
};

export default InsuranceCategoryButton;
