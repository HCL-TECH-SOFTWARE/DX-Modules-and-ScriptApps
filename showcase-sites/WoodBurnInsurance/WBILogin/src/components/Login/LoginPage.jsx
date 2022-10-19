import {ReactV18, Cookies, WBIProviders} from 'dxmodule';
import IntlContext from '../../../../Shared/context/intl.context';
import styles from './LoginPage.module.scss';
import LoginFormBase from '../../../../Shared/components/LoginFormBase';
import LoginForm from "./LoginForm.jsx";

const { React } = ReactV18;
const { UserProvider } = WBIProviders;
const { useContext, useEffect } = React;

function LoginPage() {
  const { intl } = useContext(IntlContext);

  function submitHandler(formData) {
    Cookies.remove('wbi_authenticated');
    Cookies.remove('wbi_authenticated_id');

    let authUser = UserProvider.getUserByEmail(formData.email);

    if (authUser) {
      Cookies.set('wbi_authenticated', true);
      Cookies.set('wbi_authenticated_id', authUser.id);
      UserProvider.redirectToDashboardWhenAuthenticated();
    } else {
      console.log("not logged in!");
    }
  }

  useEffect(() => {
    UserProvider.redirectToDashboardWhenAuthenticated();
  }, []);

  return (
    <>
      <div className={styles['login-page']}>
        <LoginFormBase
          formTitle={intl.get('LOGIN_TITLE')}
        >
          <LoginForm
            signupHref="#"
            onSubmit={submitHandler}
          />
        </LoginFormBase>
      </div>
    </>
  )
}

export default LoginPage;
