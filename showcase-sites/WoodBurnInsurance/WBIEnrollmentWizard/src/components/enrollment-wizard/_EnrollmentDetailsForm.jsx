import { ReactV18, propTypes, formik } from 'dxmodule';
import IntlContext from '../../../../Shared/context/intl.context';
import Input from '../../../../Shared/components/Input';
import SelectControl from '../../../../Shared/components/form/SelectControl';
import LicensePhotoControl from '../../../../Shared/components/form/LicensePhotoControl';
import LicenseFileUploadInput from '../../../../Shared/components/form/LicenseFileUploadInput';
import LicenseCameraModal from '../../../../Shared/components/camera/LicenseCameraModal';
import FormPageNavigation from '../../../../Shared/components/form/FormPageNavigation';
import styles from './_EnrollmentDetailsForm.module.scss';

const { React } = ReactV18;
const { useState, useEffect, useContext } = React;
const { Formik } = formik;

/**
 * Form for fulfilling Step 2 (Insurance Plan Details) of
 * enrolling for an insurance plan.
 */
function EnrollmentDetailsForm(props) {
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const { intl } = useContext(IntlContext);
  const initialValues = props.initialState;

  const deviceSupportsCamera = 'mediaDevices' in window.navigator;

  const carCoverageOptions = [
    { name: '$20,000 - $35,000', value: '$35,000' },
    { name: '$35,000 - $70,000', value: '$70,000' }
  ];

  // Scroll to top of page on initial render
  useEffect(() => { window.scrollTo(0,0); }, []);

  function handleValidation(values) {
    const errors = {};

    // Check existence
    for (const key of Object.keys(initialValues)) {
      if (key === 'hasAccount') { continue; } // 'hasAccount' is *always* set to a bool value; skip.
      if (!values[key].toString().trim()) {
        errors[key] = intl.get('INPUT_ERROR_REQUIRED');
      }
    }

    // Check year is a a 4-digit number
    const yearStr = values.carYear.toString();
    if (!(yearStr.length === 4 && /^[0-9]+$/.test(yearStr))) {
      errors.carYear = intl.get('INPUT_ERROR_INVALID_YEAR');
    }

    return errors;
  }

  function handleLicensePhotoChange(base64Img, setFieldValue) {
    setFieldValue('licensePhoto', base64Img, true);
    dismissLicenseCameraModal();
  }

  function presentLicenseCameraModal() {
    setCameraModalVisible(true);
  }

  function dismissLicenseCameraModal() {
    setCameraModalVisible(false);
  }

  const className = `${styles['enrollment-details-form-box']} ${styles['form-box']}` +
    (deviceSupportsCamera ? ` ${styles['camera-supported']}` : '');
  return (
    <section className={className}>
      <h1 className={styles.title}>{intl.get('HEADER_BACK_LABEL_DETAILS_FORM')}</h1>

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
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
          <form onSubmit={handleSubmit} className={styles['enrollment-details-form']}>

            <Input
              label={intl.get('INPUT_LABEL_CAR_MODEL')}
              type="text"
              name="carModel"
              onChange={handleChange}
            />

            <Input
              label={intl.get('INPUT_LABEL_YEAR')}
              type="number"
              name="carYear"
              onChange={handleChange}
            />

            <SelectControl
              label={intl.get('INPUT_LABEL_CAR_COVERAGE')}
              name="carCoverage"
              options={carCoverageOptions}
            />


            <LicenseFileUploadInput
              className={styles['license-file-upload-input']}
              name="licensePhoto"
            />

            {deviceSupportsCamera &&
              <LicensePhotoControl
                className={styles['license-photo-control']}
                name="licensePhoto"
                getPhotoPrompt={intl.get('PROMPT_TAKE_PHOTO')}
                replacePhotoPrompt={intl.get('PROMPT_REPLACE_PHOTO')}
                onClick={presentLicenseCameraModal}
              />
            }

            <div className={styles['form-navigation-box']}>
              <FormPageNavigation
                prevLabel={intl.get('BACK')}
                nextLabel={intl.get('ENROLLMENT_STEP_DETAILS_SUBMIT')}
                onPrevious={props.onPrevious}
                isSubmitting={isSubmitting}
              />
            </div>

            {cameraModalVisible &&
              <LicenseCameraModal
                onChange={(base64Img) => handleLicensePhotoChange(base64Img, setFieldValue)}
                onDismiss={dismissLicenseCameraModal}
              />
            }
          </form>
        )}
      </Formik>
    </section>
  );
}

EnrollmentDetailsForm.propTypes = {
  onSubmit: propTypes.func.isRequired,
  onPrevious: propTypes.func.isRequired,
  initialState: propTypes.shape({
    carModel: propTypes.string,
    carYear: propTypes.oneOfType([propTypes.string, propTypes.number]),
    carCoverage: propTypes.string,
    licensePhoto: propTypes.string,
    hasAccount: propTypes.bool,
  }).isRequired,
};

export default EnrollmentDetailsForm;
