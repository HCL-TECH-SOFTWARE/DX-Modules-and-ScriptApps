import { ReactV18, intl } from 'dxmodule';
import locales from '../locales';
import IntlContext from '../context/intl.context';
  
const { React } = ReactV18;
const { useEffect, useState } = React;

// The locale to fall back to if the detected locale is not supported
const DEFAULT_LOCALE = 'en-US';

export const IntlProvider = ({ children }) => {
    const [localesLoaded, setLocalesLoaded] = useState(false);

    // Init react-intl-universal
    useEffect(() => {
        const currentLocale = (window.navigator.language in locales)
        ? window.navigator.language
        : DEFAULT_LOCALE;

        intl.init({
            currentLocale,
            locales,
        })
        .then(() => setLocalesLoaded(true));
  }, []);

  return (
    <IntlContext.Provider value={{
        localesLoaded,
        intl: intl,
    }}>
        { localesLoaded ? children : '' }
    </IntlContext.Provider>
  )
};

export default IntlProvider;