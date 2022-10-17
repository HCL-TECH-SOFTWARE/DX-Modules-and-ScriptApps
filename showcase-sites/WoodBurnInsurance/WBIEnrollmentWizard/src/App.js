import {ReactV18, WBIProviders, Cookies } from 'dxmodule';
import EnrollmentWizardPage from './components/enrollment-wizard/EnrollmentWizardPage';
import ModalContainer from '../../Shared/components/modals/ModalContainer';
import { UserContext } from '../../Shared/context/user.context';
import { ModalContext } from '../../Shared/context/modal.context';
import IntlProvider from '../../Shared/components/IntlProvider';
import './App.module.scss';

const { React } = ReactV18;
const { UserProvider } = WBIProviders;
const { useState, useEffect } = React;

const CSS_CLASS_NO_SCROLL = 'no-scroll'; // applied to <body> when modals are presented

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeModalType, setActiveModalType] = useState(null);
  const [activeModalProps, setActiveModalProps] = useState(null);

  useEffect(() => {
    const isUserAuthenticated = Cookies.get('wbi_authenticated');
    if (isUserAuthenticated === 'true') {
      const userIdFromCookies = Cookies.get('wbi_authenticated_id');
      const user = UserProvider.getUserById(parseInt(userIdFromCookies, 10));
      setCurrentUser(user);
    } else {
      UserProvider.requireLogin();
    }
  }, []);

  // The global modal context object used to present and
  // dismiss modals.
  const modalContext = {
    display: displayModal,
    dismiss: dismissModal,
  };

  function displayModal(modalType, modalProps) {
    setActiveModalType(modalType);
    setActiveModalProps(modalProps);
    document.body.classList.add(CSS_CLASS_NO_SCROLL);
  }

  function dismissModal() {
    setActiveModalType(null);
    setActiveModalProps(null);
    document.body.classList.remove(CSS_CLASS_NO_SCROLL);
  }

  return (
    <IntlProvider>
      <UserContext.Provider value={currentUser}>
        <ModalContext.Provider value={modalContext}>
            <EnrollmentWizardPage />

            {/* Modal */}
            {activeModalType && (
              <ModalContainer
                modalType={activeModalType}
                modalProps={activeModalProps}
              />
            )}
        </ModalContext.Provider>
      </UserContext.Provider>
    </IntlProvider>
  );
}

export default App;
