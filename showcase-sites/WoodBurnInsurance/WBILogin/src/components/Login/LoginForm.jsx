import { propTypes, ReactV18, formik } from 'dxmodule';
import IntlContext from '../../../../Shared/context/intl.context';
import styles from './LoginForm.module.scss';

import Input from '../../../../Shared/components/Input';
import SubmitButton from '../../../../Shared/components/form/SubmitButton';
import SwitchControl from "../../../../Shared/components/form/SwitchControl";

const { Formik } = formik;
const { React } = ReactV18
const { useContext } = React;

/**
 * Form for logging in to account.
 */
function LoginForm(props) {
  const { intl } = useContext(IntlContext);
  const initialValues = {
    email: '',
    password: '',
    keepUserLoggedIn: true,
  };

  function handleValidation(values) {
    const errors = {};
    if (!values.email.trim()) {
      errors.email = intl.get('INPUT_ERROR_REQUIRED');
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email.trim())
    ) {
      errors.email = intl.get('INPUT_ERROR_INVALID_EMAIL');
    }

    if (!values.password.trim()) {
      errors.password = intl.get('INPUT_ERROR_REQUIRED');
    }
    return errors;
  }

  return (
    <div className={styles['login-form-box']}>
      <Formik
        initialValues={initialValues}
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
            isSubmitting
          }) => (
          <form onSubmit={handleSubmit} className={styles['login-form']}>
            <Input
              label={intl.get('INPUT_LABEL_EMAIL')}
              name="email"
              type="email" />

            <Input
              label={intl.get('INPUT_LABEL_PASSWORD')}
              name="password"
              type="password" />

            <SwitchControl
              name="keepUserLoggedIn"
              label={intl.get('KEEP_ME_LOGGED_IN')}
            />

            <SubmitButton
              label={intl.get('LOGIN')}
              isSubmitting={isSubmitting}
            />
          </form>
        )}
      </Formik>

      <p className={styles['no-account-prompt']}>
        {intl.get('PROMPT_NO_ACCOUNT')}
        <a href={props.signupHref} className={styles['sign-up-link']}>
          {intl.get('SIGN_UP')}
        </a>
      </p>

      <div className={styles.spacer}></div>

      <a href="/" className={styles['forgot-password-link']}>
        {intl.get('PROMPT_FORGOT_PASSWORD')}
      </a>
    </div>
  );
}

LoginForm.propTypes = {
  signupHref: propTypes.string.isRequired,
  onSubmit: propTypes.func.isRequired,
};

export default LoginForm;
