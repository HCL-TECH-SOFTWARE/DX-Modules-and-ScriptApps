import {ReactV18, Cookies, propTypes, formik, classNames, WBIProviders} from 'dxmodule';
import { INSURANCE_TYPES } from '../../../../Shared/constants';
import Input from '../../../../Shared/components/Input';
import spinner from '../../../../Shared/assets/icons/spinner.png';
import styles from './_EnrollmentTypeForm.module.scss';
import InsuranceTypeSelectControl from './_InsuranceTypeSelectControl';
import IntlContext from '../../../../Shared/context/intl.context';

const { React } = ReactV18;
const { InsuranceProvider } = WBIProviders;
const { useState, useEffect, useContext, useCallback } = React;
const { Formik } = formik;

/**
 * Step 1 (Type) form of the Enrollment Wizard.
 *
 * Gets user's zip code and insurance type selection.
 */
function EnrollmentTypeForm(props) {
  const { intl } = useContext(IntlContext);

  const [insurances, setInsurances] = useState(INSURANCE_TYPES.map(insurance => capitalizeFirstLetter(insurance)));

  // get the zipcode from cookies, if there's any
  // TODO: should we get the zipcode from Navigation State SPI?
  const zipcodeFromCookies = Cookies.get('wbi_zipcode');
  const initialValues = {
    ...props.initialState,
    zipcode: props.initialState.zipcode || zipcodeFromCookies || '',
  };

  const [fetchingZipCode, setFetchingZipCode] = useState(false);

  // Wrapper for `handleZipCodeChange` function to use inside
  // `useEffect`.
  const memoizedHandleZipCodeChange = useCallback(
    handleZipCodeChange,
    [initialValues.zipcode]
  );

  useEffect(() => { window.scrollTo(0,0);}, []);

  // Fetch initial city/state data for zipcode, if it exists.
  const [checkedForInitialZipCode, setCheckedForInitialZipCode] = useState(false);
  useEffect(() => {
    let isCancelled = false;
    const zipcode = initialValues.zipcode;
    if (zipcode && !checkedForInitialZipCode && !isCancelled) {
      const e = { target: { value: zipcode }};
      memoizedHandleZipCodeChange(e);
    }
    if (!isCancelled) {
      setCheckedForInitialZipCode(true);
    }
    return () => { isCancelled = true; };
  }, [checkedForInitialZipCode, initialValues.zipcode, memoizedHandleZipCodeChange]);

  function handleValidation(values) {
    const errors = {};
    if (!values.zipcode.toString().trim()) {
      errors.zipcode = intl.get('INPUT_ERROR_REQUIRED');
    }
    else if (!validateZipCode(values.zipcode)) {
      errors.zipcode = intl.get('INPUT_ERROR_INVALID_ZIP_CODE');
    }
    return errors;
  }

  function validateZipCode(zipcode) {
    zipcode = zipcode.toString().trim();
    return zipcode.length === 5 && /^[0-9]+$/.test(zipcode);
  }

  function getInsuranceType(insuranceTitle) {
    const strCopy = insuranceTitle.trim();
    const insuranceType = strCopy.split(" ")[0];
    return insuranceType.toLowerCase();
  };

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Fetches insurances by the given zip code.
   * @param e - Change event for the zipcode input
   */
  async function handleZipCodeChange(e) {
    const zipcode = e.target.value;
    if (validateZipCode(zipcode)) {
      const insurances = InsuranceProvider.getInsuranceByZipCode(zipcode);

      // imitate loading
      setFetchingZipCode(true);
      await new Promise(r => setTimeout(r, 600));

      if (insurances && insurances.length > 0) {
        // capitalize first letters of the insurance types
        setInsurances(
          insurances
            .map(insurance => getInsuranceType(insurance.type))
            .map(i => capitalizeFirstLetter(i))
          );
      }
      setFetchingZipCode(false);
    } else {
      // if zipcode is invalid, show all the insurances
      setInsurances(INSURANCE_TYPES.map(insurance => capitalizeFirstLetter(insurance)));
    }
  }

  const cssClass = classNames(
    styles['enrollment-type-form-box'],
    styles['form-box'],
    {
      [styles['step-indicator-hidden']]: props.stepIndicatorIsHidden,
    }
  );

  return (
    <section className={cssClass}>
      {props.formTitle &&
        <h1 className={styles.title}>
          {props.formTitle}
        </h1>
      }

      <Formik
        initialValues={initialValues}
        validate={handleValidation}
        onSubmit={(values, { setSubmitting }) => {
          const userAlreadyEnrolled = props.userInsurancePlanCategories
            .map(c => c.toLowerCase())
            .includes(values.insuranceCategory.toLowerCase());
          const e = {
            ...values,
            userAlreadyEnrolled,
          };

          props.onSubmit(e);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          submitForm,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit} className={styles['enrollment-type-form']}>

            <div className={styles['zipcode-input-box']}>
              <Input
                label={intl.get('INPUT_LABEL_ZIPCODE')}
                name="zipcode"
                type="number"
                onChange={handleZipCodeChange}
              />
              <div className={styles['location-label-box']}>
                {fetchingZipCode && (<img src={spinner} alt="loading indicator" className={styles.spinner} />)}
              </div>
            </div>

            <InsuranceTypeSelectControl
              label={intl.get('INPUT_LABEL_INSURANCE_TYPE')}
              name="insuranceCategory"
              enrolledCategories={props.userInsurancePlanCategories}
              insurances={insurances}
              disabled={!validateZipCode(values.zipcode)}
              onChange={submitForm}
            />

          </form>
        )}
      </Formik>

    </section>
  );
}

EnrollmentTypeForm.propTypes = {
  stepIndicatorIsHidden: propTypes.bool.isRequired,
  formTitle: propTypes.string.isRequired,
  onSubmit: propTypes.func.isRequired,
  userInsurancePlanCategories: propTypes.arrayOf(propTypes.oneOf(['Home', 'Life', 'Travel', 'Auto'])).isRequired,
  initialState: propTypes.shape({
    insuranceCategory: propTypes.string,
    zipcode: propTypes.oneOfType([propTypes.string, propTypes.number]),
  }).isRequired,
}

export default EnrollmentTypeForm;
