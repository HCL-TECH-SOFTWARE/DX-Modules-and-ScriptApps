import { ReactV18, propTypes, formik } from 'dxmodule';
import styles from './SelectControl.module.scss';

import chevron from '../../assets/icons/chevron.png';
import chevron2x from '../../assets/icons/chevron@2x.png';

const { React } = ReactV18;
const { useEffect, useRef, useState } = React;
const { useField } = formik;

/**
 * A Formik-enabled select control
 */
function SelectControl({label, onChange, ...props}) {

  // eslint-disable-next-line
  const [field, meta, helpers] = useField(props);
  const { value } = meta;
  const { setValue } = helpers;

  const controlRef = useRef();
  const [optionsVisible, setOptionsVisible] = useState(false);

  const className =
    styles['select-control-box'] +
    ((meta.touched && meta.error) ? ` ${styles.error}` : '') +
    (optionsVisible ? ` ${styles['options-visible']}` : '');


  function toggleOptions() {
    setOptionsVisible(!optionsVisible);
  }

  function handleOptionSelected(value) {
    setValue(value);
    setOptionsVisible(false);

    if (onChange) {
      onChange(value);
    }
  }

  // Hides select control dropdown if user clicks anywhere on the page
  // besides the control itself
  function handlePageClick(e) {
    const userClickedControl = controlRef.current && controlRef.current.contains(e.target);
    if (userClickedControl) {
      return;
    }
    setOptionsVisible(false);
  }

  function nameForValue(value, options) {
    const option = options.find(option => option.value === value);
    if (option) {
      return option.name;
    }
    return null;
  }

  useEffect(() => {
    document.body.addEventListener('click', handlePageClick);
    return () => {
      document.body.removeEventListener('click', handlePageClick);
    };
  }, []);

  return (
    <div className={className} ref={controlRef}>
      <label className={styles.label}>
        {label}
      </label>

      {meta.touched && meta.error ? (
        <div className={styles.error}>
          {meta.error} 
        </div>
      ) : null}

      <div className={styles['select-control']}
        onClick={toggleOptions}>
        <span className={styles['selected-value']}>
          {nameForValue(value, props.options) || ''} 
        </span>       
        <img
          className={styles.chevron}
          src={chevron}
          srcSet={`${chevron} 1x, ${chevron2x} 2x`}
          alt="dropdown indicator" />
      </div>


      <ul className={styles['options']}>
        {props.options.map(option => (
          <li 
            key={option.value}
            className={styles.option +
            (option === props.selectedOption ? ` ${styles.selected}` : '')}
            onClick={() => handleOptionSelected(option.value)}>

            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

SelectControl.propTypes = {
  label: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  options: propTypes.arrayOf(propTypes.shape({
    name: propTypes.string.isRequired,
    value: propTypes.oneOfType([
      propTypes.string,
      propTypes.number
    ]).isRequired,
  })),
  selectedOption: propTypes.oneOfType([propTypes.number, propTypes.string]),

  // Optional callback to handle changes outside of
  // the Formik flow
  onChange: propTypes.func,
};

export default SelectControl;
