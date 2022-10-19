import { ReactV18, propTypes as PT, formik, classNames } from 'dxmodule';
import styles from './ListItemCheckbox.module.scss';

import checkmark from '../../../Shared/assets/icons/checkmark-circle.png';
import checkmark2x from '../../../Shared/assets/icons/checkmark-circle@2x.png';

import Img2x from '../Img2x';

const { React } = ReactV18;
const { Formik, useField } = formik;

/**
 * A selectable list item displaying the text value
 * of the label and a checkbox when selected.
 */
function ListItemCheckbox({ value, selectAndDisable, ...props }) {
  // eslint-disable-next-line
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  function handleChange(e) {
    e.target.checked ? setValue(value) : setValue(null);
  }

  const cssClass = classNames(
    styles['list-item-checkbox'],
    {
      [styles.selected]: !!field.value,
      [styles['disabled-selected']]: selectAndDisable,
    },
  );

  return (
    <label className={cssClass}>
      <input type="checkbox" checked={!!field.value} onChange={handleChange} />

      <span className={styles.value}>
        {value}
      </span>

      <div className={styles['item-selected-icon-box']}>
        <Img2x
          className={styles['item-selected-icon']}
          src={checkmark}
          src2x={checkmark2x}
          alt="selected icon" />
      </div>

    </label>
  );
}

ListItemCheckbox.propTypes = {
  value: PT.string.isRequired,

  // Set to `true` if checkbox should be selected but disabled.
  // Could occur in the SearchInjuryFormModal if user had
  // previously selected an injury the modal lists as an option
  selectAndDisable: PT.bool.isRequired,
};

export default ListItemCheckbox;
