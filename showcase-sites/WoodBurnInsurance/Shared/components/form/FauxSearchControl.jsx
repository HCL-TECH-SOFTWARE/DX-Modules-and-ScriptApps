import { ReactV18, propTypes as PT, classNames} from 'dxmodule';
import styles from './FauxSearchControl.module.scss';

// icons
import search from '../../../Shared/assets/icons/search-violet.png';
import search2x from '../../../Shared/assets/icons/search-violet@2x.png';
import chevron from '../../../Shared/assets/icons/chevron.png';
import chevron2x from '../../../Shared/assets/icons/chevron@2x.png';

import Img2x from '../Img2x';

const { React } = ReactV18;

/**
 * A button styled as a search input. Emits an event on click for
 * the application to handle.
 *
 * Used by the Report Claim Wizard Details Step 2 to prompt user to
 * specify accident types in a modal form.
 */
function FauxSearchControl({
  className,
  errors,
  label,
  placeholder,
  onSearch,
}) {
  const cssClass = classNames(
    styles['faux-search-control-box'],
    { [className]: !!className },
  );
  return (
    <div className={cssClass}>
      <label className={styles.label}>
        {label}
      </label>

      {errors &&
        <span className={styles.errors}>
          {errors}
        </span>
      }

      <button className={styles['faux-search-control']} type="button"
        onClick={onSearch}>
        <Img2x
          src={search}
          src2x={search2x}
          alt="search icon" />

        <span className={styles.placeholder}>
          {placeholder}
        </span>

        <Img2x
          className={styles.chevron}
          src={chevron}
          src2x={chevron2x}
          alt="dropdown indicator" />
      </button>
    </div>
  );
}

FauxSearchControl.propTypes = {
  label: PT.string.isRequired,
  errors: PT.string,
  placeholder: PT.string.isRequired,
  onSearch: PT.func.isRequired,
  className: PT.string,
};

FauxSearchControl.defaultProps = {
  placeholder: '',
};

export default FauxSearchControl;
