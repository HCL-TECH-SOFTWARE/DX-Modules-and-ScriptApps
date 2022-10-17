import { ReactV18, propTypes as PT } from 'dxmodule';
import styles from './_OfferCountdownLabel.module.scss';

import discount from '../../../../Shared/assets/icons/discount.png';
import discount2x from '../../../../Shared/assets/icons/discount@2x.png';
import IntlContext from '../../../../Shared/context/intl.context';

const { React } = ReactV18;
const { useState, useEffect, useContext } = React;

const ONE_SECOND = 1000/*ms*/;

function OfferCountdownLabel({expirationDate}) {
  const { intl } = useContext(IntlContext);
  const [timeRemaining, setTimeRemaining] = useState(
    Math.max(0, expirationDate.getTime() - Date.now())
  );

  // Derive hours/minutes/seconds from remaining time
  const hoursRemaining = `${Math.floor((timeRemaining / (ONE_SECOND*60*60)) % 24)}`.padStart(2, '0');
  const minutesRemaining = `${Math.floor((timeRemaining / (ONE_SECOND*60)) % 60)}`.padStart(2, '0');
  const secondsRemaining = `${Math.floor((timeRemaining / ONE_SECOND) % 60)}`.padStart(2, '0');
  const countdownString = `${hoursRemaining} : ${minutesRemaining} : ${secondsRemaining}`;

  function tick() {
    setTimeRemaining(prevTime => {
      return Math.max(0, prevTime - ONE_SECOND);
    });
  }

  // Update remaining time every second
  useEffect(() => {
    const interval = setInterval(tick, ONE_SECOND);
    return () => {
      clearInterval(interval);
    }
  }, []);


  return (
    <div className={styles['offer-countdown-label']}>

      <img
        className={styles.icon}
        src={discount}
        srcSet={`${discount} 1x, ${discount2x} 2x`}
        alt="discount icon" />

      <label className={styles.label}>
        {intl.get('OFFER_EXPIRATION_LABEL')}
      </label>

      <div className={styles.countdown}>
        {countdownString}
      </div>
    </div>
  );
}

OfferCountdownLabel.propTypes = {
  expirationDate: PT.instanceOf(Date),
};

export default OfferCountdownLabel;
