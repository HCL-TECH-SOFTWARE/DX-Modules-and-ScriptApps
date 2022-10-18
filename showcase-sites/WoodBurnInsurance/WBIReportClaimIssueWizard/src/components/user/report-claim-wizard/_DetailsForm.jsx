import { ReactV18, formik, propTypes as PT, classNames } from 'dxmodule';
import IntlContext from '../../../../../Shared/context/intl.context';
import { ModalContext } from '../../../../../Shared/context/modal.context';
import { MODAL_TYPE } from '../../../../../Shared/constants/index';
import styles from './_DetailsForm.module.scss';

import SpinnerOverlay from '../../../../../Shared/components/SpinnerOverlay';
import Img2x from '../../../../../Shared/components/Img2x';
import TextAreaLinkControl from '../../../../../Shared/components/form/TextAreaLinkControl';
import DatepickerControl from '../../../../../Shared/components/form/DatepickerControl';
import SegmentedControl from '../../../../../Shared/components/form/SegmentedControl';
import SelectControl from '../../../../../Shared/components/form/SelectControl';
import FauxSearchControl from '../../../../../Shared/components/form/FauxSearchControl';
import ChipLabel from '../../../../../Shared/components/ChipLabel';
import FormPageNavigation from '../../../../../Shared/components/form/FormPageNavigation';

// icons
import target from '../../../../../Shared/assets/icons/location.png';
import target2x from '../../../../../Shared/assets/icons/location@2x.png';
import search from '../../../../../Shared/assets/icons/search.png';
import search2x from '../../../../../Shared/assets/icons/search@2x.png';

const { React } = ReactV18;
const { useContext, useEffect, useState } = React;
const { Formik } = formik;

/**
 * Details Form (Step 2) of the Report Claim Wizard.
 */
function DetailsForm(props) {
  const { intl } = useContext(IntlContext);
  const modalCtx = useContext(ModalContext);

  const [
    hospitalizationReasonsOptions,
    setHospitalizationReasonsOptions
  ] = useState([]);
  const isFetchingFormOptions = !hospitalizationReasonsOptions;

  const locationIcon = (
    <Img2x src={target} src2x={target2x} alt="location icon" />
  );

  const searchIcon = (
    <Img2x src={search} src2x={search2x} alt="search icon" />
  );

  const anyoneHospitalizedOptions = [
    { name: 'Yes', value: true },
    { name: 'No', value: false },
  ];

  // Fetch form select control options.
  useEffect(() => {
    setHospitalizationReasonsOptions([
      { "name": "Vehicular Accident", "value": "Vehicular Accident" },
      { "name": "Option 2", "value": "Option 2" },
      { "name": "Option 3", "value": "Option 3" }
    ]);

    setTimeout(() => {
      setHospitalizationReasonsOptions([
        { "name": "Vehicular Accident", "value": "Vehicular Accident" },
        { "name": "Option 2", "value": "Option 2" },
        { "name": "Option 3", "value": "Option 3" }
      ]);
    }, 500);

    window.scrollTo(0,0);
  }, []);

  // Formik validation
  function handleValidation(values) {
    const errors = {};
    // Check existence
    for (const key of Object.keys(values)) {
      if (key === 'hospitalizations') { continue; } // 'hospitalizations' is *always* set to a bool value; skip.

      // Ignore hospital-specific input values if hospitalizations
      // is `false`
      if (!values.hospitalizations) {
        const hospitalInputs = [
          'hospitalName',
          'hospitalDateOfAdmission',
          'hospitalReason',
        ];
        if (hospitalInputs.includes(key)) {
          continue;
        }
      }

      if (!values[key] || !values[key].toString().trim()) {
        errors[key] = 'Required';
      }
    }
    return errors;
  }

  /**
   * Handler for the FauxSearchControl click.
   *
   * Displays the Search Injury Form modal for specifying injuries.
   * @param {string[]} currentSelectedInjuries - The injuries previously selected
   * @param {Function} setFieldValue - The Formik function to set form values
   */
  function handleSearchInjuries(currentSelectedInjuries, setFieldValue) {
    displaySearchInjuryFormModal(currentSelectedInjuries, setFieldValue);
  }

  /**
   * Displays the Search Injury Form modal for specifying injuries.
   * @param {string[]} currentSelectedInjuries - The injuries previously selected
   * @param {Function} setFieldValue - The Formik function to set form values
   */
  function displaySearchInjuryFormModal(currentSelectedInjuries, setFieldValue) {
    const modalProps = {
      currentSelectedInjuries,
      callback: newSelectedInjuries => {
        const newInjuriesToAdd = newSelectedInjuries
          .filter(newInjury => !currentSelectedInjuries.map(v => v.toLowerCase()).includes(newInjury));
        const allSelectedInjuries = newInjuriesToAdd.concat(currentSelectedInjuries);
        setFieldValue('accidentSpecification', allSelectedInjuries);
      },
    };
    modalCtx.display(MODAL_TYPE.SEARCH_INJURY_FORM, modalProps);
  }

  /**
   * Handler for injury chip label (X) btn click.
   * Removes the injury from the accident specification.
   * @param {string} injuryToRemove - The injury to remove
   * @param {string[]} allInjuries - All the currently-set injuries from which to remove
   * @param {Function} setFieldValue - The Formik function to set form values
   */
  function handleRemoveAccidentChip(injuryToRemove, allInjuries, setFieldValue) {
    const allInjuriesCopy = allInjuries.slice();
    const index = allInjuriesCopy.indexOf(injuryToRemove);
    if (index >= 0) {
      allInjuriesCopy.splice(index, 1);
      setFieldValue('accidentSpecification', allInjuriesCopy);
    }
  }

  if (isFetchingFormOptions) {
    return (
      <SpinnerOverlay
        isLoading={true}
        fullScreen={true}
      />
    );
  }

  const className = classNames(
    styles['details-form-box'],
    styles['form-box']
  );

  return (
    <section className={className}>
      <h1 className={styles.title}>
        {intl.get('REPORT_CLAIM_PLAN_TITLE')}
      </h1>
      <p className={styles.prompt}>
        {intl.get('REPORT_CLAIM_PLAN_PROMPT')}
      </p>

      <Formik
        initialValues={props.initialValues}
        validate={handleValidation}
        onSubmit={(values, { setSubmitting }) => {
          props.onSubmit(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className={styles['details-form']}>
            <TextAreaLinkControl
              label={intl.get('INPUT_LABEL_ACCIDENT_LOCATION')}
              name="accidentLocation"
              linkIcon={locationIcon}
            />

            <DatepickerControl
              name="accidentDate"
              label={intl.get('INPUT_LABEL_DATE_OF_ACCIDENT')}
            />

            <SegmentedControl
              name="hospitalizations"
              label={intl.get('INPUT_LABEL_ANYONE_HOSPITALIZED')}
              options={anyoneHospitalizedOptions}
            />

            {values.hospitalizations &&
              <div className={styles['hospital-inputs']}>
                <TextAreaLinkControl
                  label={intl.get('INPUT_LABEL_HOSPITALIZATION_REASON')}
                  name="hospitalName"
                  linkIcon={searchIcon}
                />

                <DatepickerControl
                  name="hospitalDateOfAdmission"
                  label={intl.get('INPUT_LABEL_DATE_OF_ADMISSION')}
                />

                <SelectControl
                  name="hospitalReason"
                  label={intl.get('INPUT_LABEL_HOSPITALIZATION_REASON')}
                  options={hospitalizationReasonsOptions}
                  selectedOption={values.hospitalizationReasons}
                />
              </div>
            }

            <FauxSearchControl
              label={intl.get('INPUT_LABEL_ACCIDENT_SPECIFICATION')}
              errors={errors.accidentSpecification}
              placeholder={intl.get('SEARCH_OR_TYPE_INJURY_TO_ADD')}
              onSearch={() => handleSearchInjuries(values.accidentSpecification, setFieldValue)}
            />

            <div className={styles['accident-chips']}>
              {values.accidentSpecification.map((accident, i) => (
                <ChipLabel
                  key={i}
                  className={styles['accident-chip']}
                  label={accident}
                  onRemove={() => handleRemoveAccidentChip(accident, values.accidentSpecification, setFieldValue)}
                />
              ))}
            </div>

            <FormPageNavigation
              className={styles['form-page-navigation']}
              prevLabel={intl.get('BACK')}
              prevHref="/user/my-benefits/report-claim/plan"
              nextLabel={intl.get('REPORT_CLAIM_STEP_DETAILS_SUBMIT')}
              isSubmitting={isSubmitting}
              onPrevious={props.onPrevious}
            />
          </form>
        )}
      </Formik>
    </section>
  );
}

DetailsForm.propTypes = {
  onSubmit: PT.func.isRequired,
  initialValues: PT.shape({
    accidentLocation: PT.string.isRequired,
    accidentDate: PT.string.isRequired,
    accidentSpecification: PT.arrayOf(PT.string).isRequired,
    hospitalizations: PT.bool.isRequired,
    hospitalName: PT.string,
    hospitalDateOfAdmission: PT.string.isRequired,
    hospitalReason: PT.string,
  }).isRequired,
  onPrevious: PT.func.isRequired,
};

export default DetailsForm;
