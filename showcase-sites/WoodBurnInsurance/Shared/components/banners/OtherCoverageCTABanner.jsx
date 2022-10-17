import { ReactV18, propTypes as PT, classNames } from 'dxmodule';
import styles from './OtherCoverageCTABanner.module.scss';
import IntlContext from '../../context/intl.context';

import chevron from '../../assets/icons/chevron.png';
import chevron2x from '../../assets/icons/chevron@2x.png';

import Img2x from '../Img2x';

const { React } = ReactV18;
const { useContext } = React;

function OtherCoverageCTABanner({ className }) {
  const { intl } = useContext(IntlContext);
  const cssClass = classNames({
    [styles['other-coverage-cta-banner']]: true,
    [className]: !!className,
  });

  return (
    <div className={cssClass}>
      {/* left */}
      <section className={styles['col-left']}>
        <h2 className={styles.title}>
          {intl.get('OTHER_COVERAGE_BANNER_TITLE')}
        </h2>
        <h3 className={styles.subtitle}>
          {intl.get('OTHER_COVERAGE_BANNER_SUBTITLE')}
        </h3>
      </section>

      {/* right */}
      <div className={styles['col-right']}>
        {intl.get('OTHER_COVERAGE_BANNER_DESCRIPTION')
          .split('\n')
          .map((text, i) => <p key={i} className={styles['col-right-p']}>{text}</p>)
        }
        <a href="#" className={styles['cta-link']}>
          <span className={styles['cta-link-text-mobile']}>
            {intl.get('OTHER_COVERAGE_BANNER_CTA_MOBILE')}
          </span>
          <span className={styles['cta-link-text']}>
            {intl.get('OTHER_COVERAGE_BANNER_CTA')}
          </span>
          <Img2x
            className={styles['cta-link-icon']}
            src={chevron}
            src2x={chevron2x}
            alt="link indicator"
          />
        </a>
      </div>
    </div>
  );
}

OtherCoverageCTABanner.propTypes = {
  className: PT.string,
};

export default OtherCoverageCTABanner;
