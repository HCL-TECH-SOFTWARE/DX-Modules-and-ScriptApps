/* Import and Export Main Libraries
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as MaterialUI from '@mui/material';
import Cookies from 'js-cookie';
import { InsuranceProvider  } from './services/InsuranceDataProvider';
import { UserProvider } from './services/UserDataProvider';

// Node Modules
export const ReactV18 = {
    React,
    ReactDOM,
    MaterialUI
}

export const WBIProviders = {
    InsuranceProvider,
    UserProvider
}

export * as propTypes from 'prop-types';
export * as classNames from 'classnames';
export * as formik from 'formik';
export * as intl from 'react-intl-universal';
export * as moment from 'moment';
export { default as Cookies } from 'js-cookie'



/* Export index file for the styles (added here to be able to share the filename of JS bundle's alias in Webpack entry config).
 */
export * from './styles-index.css'



document.addEventListener("DOMContentLoaded", function(event) {
    const authenticated = Cookies.get('wbi_authenticated');
    const userId = Cookies.get('wbi_authenticated_id');
    const auth = document.getElementById('auth');

    function logoutUser() {
        Cookies.remove('wbi_authenticated');
        Cookies.remove('wbi_authenticated_id');
        UserProvider.redirectToLogin();
    }

    if (auth) {
        if (authenticated && userId) {
            auth.innerHTML = 'Logout';
            auth.onclick = logoutUser;
        } else {
            auth.innerHTML = 'Login';
            auth.onclick = UserProvider.redirectToLogin;
        }
    }
});

