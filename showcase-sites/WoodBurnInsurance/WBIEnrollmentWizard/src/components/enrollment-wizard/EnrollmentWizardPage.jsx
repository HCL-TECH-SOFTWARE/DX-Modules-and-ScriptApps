import { ReactV18, propTypes } from 'dxmodule';
import { UserContext } from '../../../../Shared/context/user.context';
import { ModalContext } from '../../../../Shared/context/modal.context';
import SpinnerOverlay from '../../../../Shared/components/SpinnerOverlay';
import EnrollmentStepIndicator from './_EnrollmentStepIndicator';
import EnrollmentTypeForm from './_EnrollmentTypeForm';
import EnrollmentDetailsForm from './_EnrollmentDetailsForm';
import EnrollmentSelectForm from "./_EnrollmentSelectForm";
import EnrollmentReviewForm from './_EnrollmentReviewForm';
import styles from './EnrollmentWizardPage.module.scss';
import { MODAL_TYPE } from '../../../../Shared/constants/index';
import IntlContext from '../../../../Shared/context/intl.context';
import driversLicenseMock from '../../../../Shared/assets/images/mock/drivers-license.png';

const { React } = ReactV18;
const { useContext, useState, useEffect, useCallback } = React;

//
// Initial Form State Values
//

const initialTypeFormState = {
  insuranceCategory: '',
  zipcode: ''
};

const initialDetailsFormState = {
  carModel: '',
  carYear: '',
  carCoverage: '',
  hasAccount: false,
  licensePhoto: '',
};

const initialSelectFormState = {
  plan: {
    id: '',
    name: '',
    pricePerMonth: {
      regular: 0,
      discounted: 0,
    },
    recommended: false,
    type: '',
  }
};

/**
 * Insurance Enrollment Wizard
 *
 * Navigates user through the multi-page process of enrolling
 * for insurance.
 */
function EnrollmentWizardPage({
  typeStepTitle,
  hideStepIndicatorOnFirstStep,
  planToChange,
}) {
  const { intl } = useContext(IntlContext);
  const user = useContext(UserContext);
  const modal = useContext(ModalContext);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Set if user is changing coverage for an existing insurance plan.
  // Setting will trigger an effect to run that fetches the user's
  // plan of matching type and update the form state to reflect
  // that plan.
  // Expected to be one of ['Travel', 'Home', 'Auto', 'Life']
  const [
    existingCoverageInsuranceCategory,
    setExistingCoverageInsuranceCategory
  ] = useState(null);
  const userIsChangingExistingCoverage = !!existingCoverageInsuranceCategory;


  // Form state
  const [typeForm, setTypeForm] = useState(initialTypeFormState);
  const [detailsForm, setDetailsForm] = useState(initialDetailsFormState);
  const [selectForm, setSelectForm] = useState(initialSelectFormState);

  // Set to `true` when user completes all the steps.
  const [enrollmentWizardCompleted, setEnrollmentWizardCompleted] = useState(false);

  // `true` when user is changing coverage for an existing plan, and that
  // existing plan is begin fetched
  const [fetchingPlanToChange, setFetchingPlanToChange] = useState(false);

  // The insurance categories the user is already enrolled in
  const [userInsurancePlanCategories, setUserInsurancePlanCategories] = useState([]);
  useEffect(() => {
    if (user) {
      setUserInsurancePlanCategories(user.insurancePlans.map(insurance => insurance.category));
    }
  }, [user]);

  const memoizedGotoDetailsStep = useCallback(
    gotoDetailsStep, []
  );

  // When `existingCoverageInsuranceCategory` is set, navigate
  // to Step 2 Details Form and fetch
  // the user's insurance plan with that category. Then, reset
  // the form values to reflect that plan's state.
  useEffect(() => {
    if (!existingCoverageInsuranceCategory) { return; }

    async function _fetchInsurancePlanOfCategory(planCategory) {
      setFetchingPlanToChange(true);
      await new Promise(r => setTimeout(r, 600));
      setFetchingPlanToChange(false);

      if (user) {
        const planToChange = user.insurancePlans.find(plan => plan.category === planCategory);
        updateEnrollmentWizardStateForChangingCoverage(planToChange);
      }
    }

    memoizedGotoDetailsStep();
    _fetchInsurancePlanOfCategory(
      existingCoverageInsuranceCategory
    );

  }, [user, existingCoverageInsuranceCategory, memoizedGotoDetailsStep]);

  function gotoStep(stepIndex) {
    setCurrentStepIndex(stepIndex)
  }

  function gotoDetailsStep() {
    gotoStep(1);
  }

  function gotoSelectStep() {
    gotoStep(2);
  }

  function gotoReviewStep() {
    gotoStep(3);
  }

  function handlePreviousClick() {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  }

  /**
   * Handler for Step 1 (Type) form submit
   * Updates the form state and navigates to the next step
   */
  function handleTypeFormSubmit(e) {
    const { insuranceCategory, zipcode, userAlreadyEnrolled } = e;

    // reset form if the selected insurance type is not currently enrolled by the user.
    if (!userInsurancePlanCategories.find(category => insuranceCategory === category) ) {
      setDetailsForm(initialDetailsFormState);
    }
    setTypeForm({ insuranceCategory, zipcode });

    if (userAlreadyEnrolled) {
      // Ask if user wants to change existing coverage or
      // just browse
      const modalProps = {
        callback: async (userWantsToChangeCoverage) => {
          if (userWantsToChangeCoverage) {
            const userAlreadyChangingSelectedCoverage = existingCoverageInsuranceCategory === insuranceCategory;

            if (userAlreadyChangingSelectedCoverage) {
              // Edge case:
              //
              // This block will execute if user previously opted
              // to change existing coverage, navigated at some
              // point back to the Type (Step 1) Form, and selected
              // the same insurance category again
              gotoDetailsStep();
            } else {
              setExistingCoverageInsuranceCategory(insuranceCategory)
            }
          }
        },
      };
      modal.display(MODAL_TYPE.INSURANCE_ENROLLED, modalProps)
    } else {
      // Navigate to the next step
      setExistingCoverageInsuranceCategory(null);
      gotoDetailsStep();
    }
  }

  /**
   * Updates the state of the Enrollment Wizard to reflect the values
   * of the coverage that is being changed.
   */
  function updateEnrollmentWizardStateForChangingCoverage(planToChange) {
    // Type form (Step 1)
    setTypeForm({
      ...typeForm,
      insuranceCategory: planToChange.category,
    });

    // Details form (Step 2)
    setDetailsForm({
      carModel: planToChange.carModel,
      carYear: planToChange.year,
      carCoverage: planToChange.coverage,
      hasAccount: !!planToChange,
      // TODO: this should be dynamic
      licensePhoto: driversLicenseMock,
    });
  }

  /**
   * Handler for Step 2 (Details) form submit
   * Updates the form state and navigates to the next step
   */
  function handleDetailsFormSubmit(e) {
    setDetailsForm(e);
    gotoSelectStep();
  }

  /**
   * Handler for Step 3 (Select) form submit
   * Updates the form state and navigates to the next step
   */
  function handleSelectPlan(payload) {
    setSelectForm(payload);
    gotoReviewStep();
  }

  /**
   * Handler for final step (Review). This is where a server
   * request should be made for enrolling a user.
   */
   async function handleReviewFormSubmit(e) {
    // mock wait for response
    await new Promise(resolve => setTimeout(resolve, 1000));

    setEnrollmentWizardCompleted(true);

    if (userIsChangingExistingCoverage) {
      modal.display(MODAL_TYPE.COVERAGE_CHANGE);
    } else {
      modal.display(MODAL_TYPE.ORDER_SENT);
    }
  }

  function renderForm(currentStepIndex) {
    switch(currentStepIndex) {
      case 0: {
        return (
          <EnrollmentTypeForm
            formTitle={typeStepTitle || intl.get('HEADER_BACK_LABEL_TYPE_FORM')}
            initialState={typeForm}
            stepIndicatorIsHidden={hideStepIndicatorOnFirstStep}
            userInsurancePlanCategories={userInsurancePlanCategories}
            onSubmit={handleTypeFormSubmit}
          />
        )
      }

      case 1: {
        return (
          <EnrollmentDetailsForm
            initialState={detailsForm}
            onSubmit={handleDetailsFormSubmit}
            onPrevious={handlePreviousClick}
          />
        )
      }

      case 2: {
        return (
          <EnrollmentSelectForm
            carCoverage={detailsForm.carCoverage}
            onRequestCoverageChange={gotoDetailsStep} onSubmit={handleSelectPlan}
            onPrevious={handlePreviousClick}
          />
        )
      }

      case 3: {
        return (
          <EnrollmentReviewForm
              orderSent={enrollmentWizardCompleted}
              insuranceCategory={typeForm.insuranceCategory}
              insurancePlan={selectForm.plan}
              zipcode={typeForm.zipcode}
              carModel={detailsForm.carModel}
              carYear={detailsForm.carYear}
              carCoverage={detailsForm.carCoverage}
              licensePhoto={detailsForm.licensePhoto}
              onSubmit={handleReviewFormSubmit}
              onPrevious={handlePreviousClick}
            />
        )
      }

      default: {
        // TODO: add component for out of bounds index
      }
    }
  }

  if (fetchingPlanToChange) {
    return (
      <SpinnerOverlay
        fullScreen={true}
        isLoading={true}
      />
    );
  }

  return (
    <div className={styles['enrollment-wizard-page']}>
      <EnrollmentStepIndicator activeStepIndex={currentStepIndex} />

      <div className={styles['form-box']}>
        {renderForm(currentStepIndex)}
      </div>
    </div>
  );
}

EnrollmentWizardPage.propTypes = {
  typeStepTitle: propTypes.string,
  hideStepIndicatorOnFirstStep: propTypes.bool.isRequired,

  // If *changing* existing coverage, the Enrollment Wizard is passed
  // this optional prop, which is the coverage to be changed.
  // Form fields are prepopulated with the plan data.
  planToChange: propTypes.shape({
    id: propTypes.string.isRequired,
    type: propTypes.oneOf(['gold', 'silver', 'bronze']).isRequired,
    name: propTypes.string.isRequired,
    status: propTypes.oneOf(['Enrolled', 'Pending']).isRequired,
    category: propTypes.oneOf(['Travel', 'Auto', 'Life', 'Home']).isRequired,
    pricePerMonth: propTypes.string.isRequired,
    coverage: propTypes.string.isRequired,
    zipcode: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
    city: propTypes.string.isRequired,
    state: propTypes.string.isRequired,
    carModel: propTypes.string.isRequired,
    year: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
    licenseImageSrc: propTypes.string.isRequired,
    licenseDateUploaded: propTypes.string.isRequired,
  }),
};

EnrollmentWizardPage.defaultProps = {
  hideStepIndicatorOnFirstStep: false,
};

export default EnrollmentWizardPage;
