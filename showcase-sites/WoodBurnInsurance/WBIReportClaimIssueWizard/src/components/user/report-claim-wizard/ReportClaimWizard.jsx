import { ReactV18, WBIProviders } from 'dxmodule';
import { ModalContext } from '../../../../../Shared/context/modal.context';
import styles from './ReportClaimWizard.module.scss';
import { MODAL_TYPE } from '../../../../../Shared/constants/index';

import SpinnerOverlay from '../../../../../Shared/components/SpinnerOverlay';
import ReportClaimStepIndicator from './_ReportClaimStepIndicator';
import PlanForm from './_PlanForm';
import DetailsForm from './_DetailsForm';
import ProofsForm from './_ProofsForm';

const { React } = ReactV18;
const { useEffect, useState, useContext } = React;
const { UserProvider } = WBIProviders;

const initialDetailsFormState = {
  accidentLocation: '',
  accidentDate: '',
  accidentSpecification: [],
  hospitalizations: false,
  hospitalName: '',
  hospitalDateOfAdmission: '',
  hospitalReason: '',
}

const initialProofsFormState = {
  proofPhotos: [],
};

function ReportClaimWizard() {
  const modalCtx = useContext(ModalContext);
  const [userInsurancePlans, setUserInsurancePlans] = useState([]);
  const [fetchingUserInsurancePlans, setFetchingUserInsurancePlans] = useState(false);
  const userInsurancePlansSummary = userInsurancePlans.map(plan => ({
    id: plan.id,
    type: plan.type,
    category: plan.category,
  }));

  const [currentStepIndex, setCurrentStepindex] = useState(0);

  // Id of the coverage claim is reported to
  // eslint-disable-next-line
  const [insurancePlanId, setInsurancePlanId] = useState(null);
  const [detailsForm, setDetailsForm] = useState(initialDetailsFormState);
  const [proofsForm, setProofsForm] = useState(initialProofsFormState);

  // Fetch the user's insurance plans. We need to display them
  // for the user to choose from in Step 1 (Plan)
  useEffect(() => {
    window.scrollTo(0,0);
    setFetchingUserInsurancePlans(true);
    setTimeout(() => {
      setUserInsurancePlans([
        {
          "id": "1",
          "type": "gold",
          "name": "Woodburn Gold",
          "status": "Enrolled",
          "category": "Travel",
          "pricePerMonth": "$273",
          "coverage": "$35,000",
          "paymentHistory": [
            {
              "fiscalYear": 2018,
              "months": [40, 55, 40, 70, 90, 50, 115, 75, 60, 100, 80, 95]
            },
            {
              "fiscalYear": 2019,
              "months": [80, 100, 100, 70, 90, 90, 95, 75, 60, 100, 80, 95]
            },
            {
              "fiscalYear": 2020,
              "months": [100, 70, 80]
            }
          ],
          "zipcode": 35005,
          "city": "Montgomery",
          "state": "AL",
          "carModel": "Acura RDX four-door 2WD",
          "year": 2018,
          "licenseImageSrc": "/images/mock/drivers-license.png",
          "licenseDateUploaded": "March 15, 2020",
          "history": [
            {
              "event": "Insurance Application Submitted",
              "date": "March 05, 2020",
              "status": "complete"
            },
            {
              "event": "Status: In Review",
              "date": "March 06, 2020",
              "status": "complete"
            },
            {
              "event": "Status: Evaluation",
              "date": "March 06, 2020",
              "status": "complete"
            },
            {
              "event": "Status: Underwriting",
              "date": "March 07, 2020",
              "status": "current"
            },
            {
              "event": "Approval",
              "status": "incomplete",
              "date": "ETA: 3 days"
            }
          ]
        },
        {
          "id": "2",
          "type": "silver",
          "name": "Woodburn Silver",
          "status": "Pending",
          "category": "Auto",
          "pricePerMonth": "$180",
          "nextPaymentDueDate": "March 23, 2020",
          "coverage": "$35,000",
          "paymentHistory": [
            {
              "fiscalYear": 2018,
              "months": [40, 55, 40, 70, 90, 50, 115, 75, 60, 100, 80, 95]
            },
            {
              "fiscalYear": 2019,
              "months": [80, 100, 100, 70, 90, 90, 95, 75, 60, 100, 80, 95]
            },
            {
              "fiscalYear": 2020,
              "months": [100, 70, 80]
            }
          ],
          "zipcode": 35005,
          "city": "Montgomery",
          "state": "AL",
          "carModel": "Acura RDX four-door 2WD",
          "year": 2018,
          "licenseImageSrc": "/images/mock/drivers-license.png",
          "licenseDateUploaded": "March 17, 2020",
          "history": [
            {
              "event": "Insurance Application Submitted",
              "date": "March 05, 2020",
              "status": "complete"
            },
            {
              "event": "Status: In Review",
              "date": "March 06, 2020",
              "status": "complete"
            },
            {
              "event": "Status: Evaluation",
              "date": "March 06, 2020",
              "status": "complete"
            },
            {
              "event": "Status: Underwriting",
              "date": "March 07, 2020",
              "status": "current"
            },
            {
              "event": "Approval",
              "status": "incomplete",
              "date": "ETA: 3 days"
            }
          ]
        }]
      )
      setFetchingUserInsurancePlans(false);
    }, 500);
  }, []);

  function gotoDetailsStep() {
    setCurrentStepindex(1);
  }

  function gotoProofsStep() {
    setCurrentStepindex(2);
  }

  function handleSelectPlan(insurancePlanId) {
    setInsurancePlanId(insurancePlanId);
    gotoDetailsStep();
  }

  function handleDetailsFormSubmit(e) {
    setDetailsForm(e);
    gotoProofsStep();
  }

  function handleProofsFormSubmit(e) {
    setProofsForm(e);

    const tempRefNumber = 'CL2-SNK-2321';
    const modalProps = {
      claimReferenceNumber: tempRefNumber,
    };
    modalCtx.display(MODAL_TYPE.CLAIM_SUBMITTED, modalProps);
  }

  if (fetchingUserInsurancePlans) {
    return (
      <SpinnerOverlay
        isLoading={true} fullScreen={true}>
      </SpinnerOverlay>
    );
  }

  function renderWizard(currentStep) {

    // eslint-disable-next-line default-case
    switch(currentStep) {
      case 0: {
        return (
          <PlanForm
            plans={userInsurancePlansSummary}
            onSelectPlan={handleSelectPlan}
            onPrevious={() => { UserProvider.redirectToLogin() }}
          />
        )
      }
      case 1: {
        return (
          <DetailsForm
            onSubmit={handleDetailsFormSubmit}
            initialValues={detailsForm}
            onPrevious={() => setCurrentStepindex(0)}
          />
        )
      }
      case 2: {
        return (
          <ProofsForm
            onSubmit={handleProofsFormSubmit}
            initialValues={proofsForm}
            onPrevious={() => setCurrentStepindex(1)}
          />
        )
      }
    }
  }
  return (
    <div className={styles['report-claim-wizard']}>
      <ReportClaimStepIndicator
        activeStepIndex={currentStepIndex}
      />

      <div className={styles['form-box']}>
        {renderWizard(currentStepIndex)}
      </div>
    </div>
  );
}

export default ReportClaimWizard;
