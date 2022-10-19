import { propTypes, ReactV18 } from 'dxmodule';
import styles from './LoginFormBase.module.scss';

const {React} = ReactV18

/**
 * A container for displaying login and signup forms. Displays links
 * for logging in via social above the container for displaying
 * the login or signup form.
 */
function LoginFormBase(props) {

  return (
    <section className={styles['login-form-base']}>
      <h2 className={styles.title}> {props.formTitle} </h2>

      {/* Dismiss Button */}



      {/* The login or Signup form is inserted here, below
        * the social links: */}
      <div className={styles['form-container']}>
        {props.children}
      </div>

    </section>
  );
}

LoginFormBase.propTypes = {
  formTitle: propTypes.string.isRequired,
  children: propTypes.element,
};

export default LoginFormBase;
