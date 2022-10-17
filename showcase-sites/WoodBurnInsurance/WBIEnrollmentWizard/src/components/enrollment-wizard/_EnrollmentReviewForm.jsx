import { ReactV18, propTypes, formik } from 'dxmodule';
import IntlContext from '../../../../Shared/context/intl.context';
import styles from './_EnrollmentReviewForm.module.scss';

import InsurancePlanCard from './_InsurancePlanCard';
import LicensePhotoControl from '../../../../Shared/components/form/LicensePhotoControl';
import LicenseFileUploadInput from '../../../../Shared/components/form/LicenseFileUploadInput';
import LicenseCameraModal from '../../../../Shared/components/camera/LicenseCameraModal';
import FormPageNavigation from '../../../../Shared/components/form/FormPageNavigation';

const { React } = ReactV18;
const { useEffect, useState, useContext } = React;
const { Formik } = formik;

/**
 * Form for fulfilling Step 4 (Insurance Plan Review) of
 * enrolling for an insurance plan.
 */
function EnrollmentReviewForm(props) {
  const { intl } = useContext(IntlContext);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const initialValues = {
    licensePhoto: props.licensePhoto,
  };
  const deviceSupportsCamera = 'mediaDevices' in window.navigator;

  // The readonly details of the enrollment for user to review.
  const planDetails = [
    {
      label: intl.get('ENROLLMENT_SUMMARY_LABEL_INSURANCE_TYPE'),
      value: intl.get(`${props.insuranceCategory.toUpperCase()}_INSURANCE`)
    },
    {
      label: intl.get('ENROLLMENT_SUMMARY_LABEL_ZIPCODE'),
      value: props.zipcode
    },
    {
      label: intl.get('ENROLLMENT_SUMMARY_LABEL_CAR_MODEL_YEAR'),
      value: `${props.carModel} - ${props.carYear}`
    },
    {
      label: intl.get('ENROLLMENT_SUMMARY_LABEL_CAR_VALUE_COVERAGE'),
      value: props.carCoverage
    }
  ];

  // Scroll to page top on initial render
  useEffect(() => { window.scrollTo(0,0); }, []);

  function presentLicenseCameraModal() {
    setCameraModalVisible(true);
  }

  function dismissLicenseCameraModal() {
    setCameraModalVisible(false);
  }

  function handleLicensePhotoChange(base64Img, setFieldValue) {
    setFieldValue('licensePhoto', base64Img, true);
    dismissLicenseCameraModal();
  }

  const className = `${styles['enrollment-review-form-box']} ${styles['form-box']}` +
    (deviceSupportsCamera ? ` ${styles['camera-supported']}` : '');

  return (
    <section className={className}>
      <h1 className={styles.title}>
        {intl.get('ENROLLMENT_STEP_REVIEW_TITLE')}
      </h1>

      <div className={styles['selected-insurance-plan-box']}>
        <label className={styles.label}>
          {intl.get('CHOSEN_INSURANCE')}
        </label>
        <InsurancePlanCard
          insurancePlan={props.insurancePlan}
        />
      </div>


      <Formik
        initialValues={initialValues}
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
          submitForm,
          setFieldValue,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit} className={styles['enrollment-review-form']}>
            <LicenseFileUploadInput
              className={styles['license-file-upload-input']}
              name="licensePhoto"
            />

            <LicensePhotoControl
              className={styles['license-photo-control']}
              name="licensePhoto"
              getPhotoPrompt={intl.get('PROMPT_TAKE_PHOTO')}
              replacePhotoPrompt={intl.get('PROMPT_REPLACE_PHOTO')}
              onClick={presentLicenseCameraModal}
            />

            {cameraModalVisible &&
              <LicenseCameraModal
                onChange={(base64Img) => handleLicensePhotoChange(base64Img, setFieldValue)}
                onDismiss={dismissLicenseCameraModal}
              />
            }

            {/* Readonly insurance plan details */}
            <div className={styles['plan-details']}>
              {planDetails.map((plan, i) => (
                <section className={styles['plan-detail']} key={i}>
                  <h4 className={styles['plan-detail-label']}>
                    {plan.label}
                  </h4>
                  <span className={styles['plan-detail-value']}>
                    {plan.value}
                  </span>
                </section>
              ))}
            </div>

            <div className={styles['form-navigation-box']}>
              <FormPageNavigation
                onPrevious={props.onPrevious}
                prevLabel={intl.get('BACK')}
                nextLabel={intl.get('SEND_AND_FINISH')}
                isSubmitting={isSubmitting && !props.orderSent}
              />
            </div>
          </form>
        )}
      </Formik>
    </section>
  );
}

EnrollmentReviewForm.propTypes = {
  orderSent: propTypes.bool.isRequired,
  insurancePlan: propTypes.shape({
    id: propTypes.oneOfType([propTypes.string, propTypes.number]),
    name: propTypes.string,
    pricePerMonth: propTypes.shape({
      regular: propTypes.number,
      discounted: propTypes.number
    }),
    recommended: propTypes.bool,
    type: propTypes.string,
  }).isRequired,
  insuranceCategory: propTypes.string.isRequired,
  zipcode: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  carModel: propTypes.string.isRequired,
  carYear: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  carCoverage: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  licensePhoto: propTypes.string.isRequired,
  onPrevious: propTypes.func.isRequired,
  onSubmit: propTypes.func,
};

export default EnrollmentReviewForm;
