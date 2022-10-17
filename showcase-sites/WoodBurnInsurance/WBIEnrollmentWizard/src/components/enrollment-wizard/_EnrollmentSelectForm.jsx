import { ReactV18, propTypes, formik } from 'dxmodule';
import styles from './_EnrollmentSelectForm.module.scss';

import SelectControl from '../../../../Shared/components/form/SelectControl';
import InsurancePlanSelectControl from './InsurancePlanSelectControl';
import ChangeCoverageButton from './_ChangeCoverageButton';
import OfferCountdownLabel from './_OfferCountdownLabel';
import FormPageNavigation from '../../../../Shared/components/form/FormPageNavigation';
import SpinnerOverlay from '../../../../Shared/components/SpinnerOverlay';
import { PLANS } from '../../../../Shared/constants';
import IntlContext from '../../../../Shared/context/intl.context';

const { React } = ReactV18;
const { useState, useEffect, useContext } = React;
const { Formik } = formik;

// Mock expiration date for discount
const OFFER_EXPIRATION_DATE = new Date('2021/05/15');

/**
 * Displays the form for fullfilling Step 1 (Insurance Type)
 * of enrolling for an insurance plan.
 */
function EnrollmentSelectForm(props) {
  const { intl } = useContext(IntlContext);

  const initialValues = {
    sortBy: 'ratings',
    planType: '',
  };

  const [planOptions, setPlanOptions] = useState([]);
  // eslint-disable-next-line
  const [isLoadingPlanOptions, setIsLoadingPlanOptions] = useState(false);

  function handleValidation(values) {
  }

  // Scroll to top of page on initial render
  useEffect(() => { window.scrollTo(0,0); }, []);

  // Fetch the insurance plan options
  useEffect(() => {
    let isCancelled = false;
    setIsLoadingPlanOptions(true);
    setTimeout(() => {
      setPlanOptions(PLANS);
      setIsLoadingPlanOptions(false);
    }, 500);
    return () => { isCancelled = true; }
  }, []);

  return (
    <section className={`${styles['enrollment-select-form-box']} ${styles['form-box']}`}>
      <h1 className={styles.title}>
        {intl.get('ENROLLMENT_STEP_SELECT_TITLE')}
      </h1>


      <Formik
        initialValues={initialValues}
        validate={handleValidation}
        onSubmit={(values, { setSubmitting }) => {
          const selectedPlan = planOptions.find(plan => plan.type === values.planType);
          if (!selectedPlan) {
            throw Error(`Could not find plan of type "${values.planType}".`);
          }

          const e = { plan: selectedPlan };
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
          <form onSubmit={handleSubmit} className={styles['enrollment-select-form']}>
            <SelectControl
              label={"Sort By"}
              name="sortBy"
              options={[
                { name: 'Ratings', value: 'ratings' },
                { name: 'Category 2', value: 'category2' },
                { name: 'Category 3', value: 'category3' },
              ]}
              onChange={(e) => {
                // TODO: sort
              }}
            />

            <ChangeCoverageButton
              coverageAmount={props.carCoverage}
              onClick={props.onRequestCoverageChange}
            />

            <OfferCountdownLabel
              expirationDate={OFFER_EXPIRATION_DATE}
            />

            <SpinnerOverlay isLoading={isLoadingPlanOptions}>
              <div className={styles['plan-options']}>
                <InsurancePlanSelectControl
                  name="planType"
                  planOptions={planOptions}
                  onChange={submitForm}
                />
              </div>
            </SpinnerOverlay>

            <div className={styles['form-navigation-box']}>
              <FormPageNavigation
                prevLabel={intl.get('BACK')}
                onPrevious={props.onPrevious}
              />
            </div>
          </form>
        )}
      </Formik>
    </section>
  );
}

EnrollmentSelectForm.propTypes = {
  carCoverage: propTypes.string.isRequired,
  onRequestCoverageChange: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired,
  onPrevious: propTypes.func.isRequired,
};

export default EnrollmentSelectForm;
