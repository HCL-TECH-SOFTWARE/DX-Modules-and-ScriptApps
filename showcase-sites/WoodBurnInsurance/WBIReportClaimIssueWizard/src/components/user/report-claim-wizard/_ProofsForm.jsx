import { ReactV18, propTypes as PT, formik, moment, classNames} from 'dxmodule';
import IntlContext from '../../../../../Shared/context/intl.context';
import { ModalContext } from '../../../../../Shared/context/modal.context';
import { MODAL_TYPE } from '../../../../../Shared/constants/index';
import styles from './_ProofsForm.module.scss';

import ProofFileUploadInput from '../../../../../Shared/components/form/ProofFileUploadInput';
import LicensePhotoControl from '../../../../../Shared/components/form/LicensePhotoControl';
import FormPageNavigation from '../../../../../Shared/components/form/FormPageNavigation';
import ProofPhotoCard from '../_ProofPhotoCard';

const { React } = ReactV18;
const { useContext, useEffect } = React;
const { Formik, FieldArray } = formik;

/**
 * Step 3 form of the Report Claim Wizard
 */
function ProofsForm(props) {
  const { intl } = useContext(IntlContext);
  const modalCtx = useContext(ModalContext);
  const deviceSupportsCamera = 'mediaDevices' in window.navigator;

  const className = classNames(
    styles['proofs-form-box'],
    styles['form-box'],
    { [styles['camera-supported']]: deviceSupportsCamera, },
  );

  // Formik validation
  function handleValidation(values) {
    const errors = {};
    if (values.proofPhotos.length === 0) {
      errors.proofPhotos = "Required"
    }
    return errors;
  }

  /**
   * ProofCameraModal callback. Adds the new proof to the array of proof photos.
   * @param e - The proof data send back from the modal
   * @param currentProofPhotos - The array of current proof photo objects
   * @param {Function} setFieldValue - The Formik function for setting form values
   */
  function handleProofPhotoChange(e, currentProofPhotos, setFieldValue) {
    const { base64Img, proofTitle, proofDate } = e;
    const newProofPhoto = {
      title: proofTitle,
      src: base64Img,
      date: proofDate,
    };
    const allProofPhotos = [newProofPhoto].concat(currentProofPhotos);
    setFieldValue('proofPhotos', allProofPhotos);
  }

  /**
   * Presents the ProofCameraModal for taking a picture of a proof.
   * @param currentProofPhotos - Array of existing proof photo objects
   * @param {Function} setFieldValue - The Formik function for setting form values
   */
  function presentProofCameraModal(currentProofPhotos, setFieldValue) {
    const cameraModalProps = {
      callback: (e) => handleProofPhotoChange(e, currentProofPhotos, setFieldValue),
    };
    modalCtx.display(MODAL_TYPE.PROOF_CAMERA, cameraModalProps);
  }

  useEffect(() => { window.scrollTo(0,0); }, []);

  return (
    <section className={className}>
      <h1 className={styles.title}>
        {intl.get('REPORT_CLAIM_PROOFS_TITLE')}
      </h1>
      <p className={styles.prompt}>
        {intl.get('REPORT_CLAIM_PROOFS_PROMPT')}
      </p>

      <Formik
        initialValues={props.initialValues}
        validate={handleValidation}
        onSubmit={(values, { setSubmitting }) => {
          props.onSubmit(values);
          setSubmitting(false);
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
          <form onSubmit={handleSubmit} className={styles['proofs-form']}>

            {errors.proofPhotos &&
            <label className={styles['error-label']}>
              {errors.proofPhotos}
            </label>
            }

            <ProofFileUploadInput
              className={styles['proof-file-upload-input']}
              name="proofPhotoFile"
              onChange={({ base64Img, title }) => {
                const e = {
                  base64Img,
                  proofTitle: title,
                  proofDate: new Date(),
                };
                handleProofPhotoChange(e, values.proofPhotos, setFieldValue);
              }}
            />

            {deviceSupportsCamera &&
              <LicensePhotoControl
                className={styles['license-photo-control']}
                hideLabel={true}
                name="proofPhoto"
                getPhotoPrompt={intl.get('PROMPT_TAKE_PROOF_PHOTO')}
                replacePhotoPrompt={intl.get('PROMPT_REPLACE_PHOTO')}
                onClick={() => presentProofCameraModal(values.proofPhotos, setFieldValue)}
              />
            }

            <FieldArray
              name="proofPhotos"
              render={arrayHelpers => (
                <div className={styles['proof-photos']}>
                  {values.proofPhotos.map((photo, i) => (
                    <ProofPhotoCard
                      key={i}
                      className={styles['proof-photo-card']}
                      proofSrc={photo.src}
                      proofTitle={photo.title}
                      proofDate={moment(photo.date).format('LL')}
                      deletable={true}
                      onDelete={() => arrayHelpers.remove(i)}
                    />
                  ))}
                </div>
              )}
            />

            <FormPageNavigation
              className={styles['form-page-navigation']}
              prevLabel={intl.get('BACK')}
              prevHref="/user/my-benefits/report-claim/details"
              nextLabel={intl.get('REPORT_CLAIM_STEP_PROOFS_SUBMIT')}
              isSubmitting={isSubmitting}
              onPrevious={props.onPrevious}
            />
          </form>
        )}
      </Formik>
    </section>
  );
}

ProofsForm.propTypes = {
  onSubmit: PT.func.isRequired,
  initialValues: PT.shape({
    proofPhotos: PT.arrayOf(PT.shape({
      title: PT.string.isRequired,
      src: PT.string.isRequired,
      date: PT.instanceOf(Date).isRequired,
    })).isRequired,
  }).isRequired,
  onPrevious: PT.func.isRequired,
};

export default ProofsForm;
