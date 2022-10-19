import { ReactV18, propTypes as PT, formik } from 'dxmodule';
import { ModalContext } from '../../context/modal.context';
import styles from './_SearchInjuryFormModal.module.scss';

import SpinnerOverlay from '../../components/SpinnerOverlay';
import Input from '../../components/Input';
import ListItemCheckbox from '../../components/form/ListItemCheckbox';
import SubmitButton from '../../components/form/SubmitButton';

const { React } = ReactV18
const { useEffect, useContext, useState, useRef } = React;
const { Formik, FieldArray } = formik;

// The form header margins are used to dynamically set
// the correct height of the form.
const FORM_HEADER_MARGIN = {
  top: 48,
  bottom: 8,
};

/**
 * Modal for selecting and searching accident types when
 * completing the Report Claim Wizard.
 */
function SearchInjuryFormModal({ currentSelectedInjuries, callback }) {
  const modalCtx = useContext(ModalContext);
  const formHeaderRef = useRef(null);
  const [injuryOptions, setInjuryOptions] = useState([]);
  const fetchingInjuryOptions = injuryOptions.length === 0;

  const initialValues = {
    typedInjury: '',
    selectedInjuries: [],   // *searched* injuries
  };

  useEffect(() => {
    let isCanceled = false;
    async function fetchDefaultInjuryOptions() {
      if (isCanceled) { return; }
      setInjuryOptions([
          "Bone Fracture",
          "Mild Trauma",
          "Concussion",
          "Burns",
          "Cuts or Scrapes"
        ]
      );
    }
    fetchDefaultInjuryOptions();

    return () => { isCanceled = true; };
  }, []);

  function addInjuryToSelectedList(injury, selectedInjuries, setFieldValue) {
    setInjuryOptions(prev => [injury].concat(prev));
    setFieldValue('selectedInjuries', [injury].concat(selectedInjuries));
  }

  function handleInputKeyDown(e, selectedInjuries, setFieldValue) {
    if (['Enter', 'Tab'].includes(e.key)) {
      e.preventDefault();
      setFieldValue('typedInjury', '');
      const injury = e.target.value.trim();
      const injuryIsNew = !(selectedInjuries
        .filter(v => !!v) // remove null values
        .map(v => v.toLowerCase()).includes(injury.toLowerCase()));
      if (injury && injuryIsNew) {
        addInjuryToSelectedList(injury, selectedInjuries, setFieldValue);
      }
    }
  }

  function injuryIsAlreadySelected(injury) {
    injury = injury.trim().toLowerCase();
    return currentSelectedInjuries.map(v => v.toLowerCase()).includes(injury);
  }

  // Dynamically set the proper height of the form
  const formHeaderHeight = formHeaderRef.current
    ? formHeaderRef.current.getBoundingClientRect().height
    : 0;
  const formStyles = {
    height: `calc(var(--vh100, 100vh) - ${
      FORM_HEADER_MARGIN.top +
      FORM_HEADER_MARGIN.bottom +
      formHeaderHeight
    }px)`,
  };

  // header styles
  const headerStyles = {
    marginTop: `${FORM_HEADER_MARGIN.top}px`,
    marginBottom: `${FORM_HEADER_MARGIN.bottom}px`,
  };
  return (
    <section className={styles['search-injury-form-modal']}>
      <h2 className={styles.title} ref={formHeaderRef}
        style={headerStyles}>
        Add Injuries to Claim
      </h2>

      <SpinnerOverlay isLoading={fetchingInjuryOptions} className={styles.spinner}>
        <div className={styles['form-box']}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              const selectedInjuries = values.selectedInjuries.filter(injury => !!injury);
              callback(selectedInjuries);
              modalCtx.dismiss();
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              setFieldValue,
            }) => {
              const numSelectedInjuries = values.selectedInjuries
                .filter(val => !!val).length;
              return (
                <form onSubmit={handleSubmit} className={styles['search-injury-form']}
                  style={formStyles}>

                  <Input
                    label=""
                    name="typedInjury"
                    placeholder="Type injury or select from below"
                    onKeyDown={(e) => handleInputKeyDown(e, values.selectedInjuries, setFieldValue)}
                  />

                  <FieldArray
                    name="selectedInjuries"
                    render={arrayHelpers => (
                      <div className={styles['injury-options-list-wrapper']}>
                        <div className={styles['injury-options-list']}>
                          {injuryOptions.map((injury, i) => (
                            <ListItemCheckbox
                              key={i}
                              name={`selectedInjuries.${i}`}
                              value={injury}
                              selectAndDisable={injuryIsAlreadySelected(injury)}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  />

                {!!numSelectedInjuries &&
                  <SubmitButton
                    className={styles['submit-btn']}
                    label={`Add (${numSelectedInjuries})`}
                    isSubmitting={false}
                  />
                }
                </form>
              );
            }}
          </Formik>
        </div>
      </SpinnerOverlay>
    </section>
  );
}

SearchInjuryFormModal.propTypes = {
  currentSelectedInjuries: PT.arrayOf(PT.string).isRequired,
  callback: PT.func.isRequired,
};

export default SearchInjuryFormModal;
