import { ReactV18, propTypes as PT, classNames } from 'dxmodule';
import styles from './_ProofPhotoCard.module.scss';

import Img2x from '../../../../Shared/components/Img2x';

// Icons
import deleteIcon from '../../../../Shared/assets/icons/delete.png';
import deleteIcon2x from '../../../../Shared/assets/icons/delete@2x.png';
import menuIcon from '../../../../Shared/assets/icons/menu-dots.png';
import menuIcon2x from '../../../../Shared/assets/icons/menu-dots@2x.png';

const { React } = ReactV18;

/**
 * A card-styled element displaying a thumbnail of an
 * insurance claim Proof photograph, its title, and the date taken.
 */
function ProofPhotoCard({
  proofSrc,
  proofTitle,
  proofDate,
  deletable,
  flatStyle,
  className,
  onDelete,
}) {
  const cssClass = classNames({
    [styles['proof-photo-card']]: true,
    [styles.deletable]: deletable,
    [styles['flat-style']]: flatStyle,
    [className]: !!className,
  });

  const deleteButton = (
    <button className={styles['delete-btn']} onClick={onDelete} type="button">
      <Img2x src={deleteIcon} src2x={deleteIcon2x} alt="delete icon" />
    </button>
  );

  const menuButton = (
    <button className={styles['menu-btn']} type="button">
      <Img2x src={menuIcon} src2x={menuIcon2x} alt="menu icon" />
    </button>
  );

  return (
    <div className={cssClass}>
      <div className={styles['thumbnail-box']}>
        <img className={styles.thumbnail} src={proofSrc} alt="proof thumbnail" />
      </div>

      <section className={styles['text-box']}>
        <h4 className={styles.title}>
          {proofTitle}
        </h4>
        <span className={styles.date}>
          {proofDate}
        </span>
      </section>

      {deletable ? deleteButton : menuButton}

    </div>
  );
}

ProofPhotoCard.propTypes = {
  proofSrc: PT.string.isRequired,
  proofTitle: PT.string.isRequired,
  proofDate: PT.string.isRequired,
  deletable: PT.bool.isRequired,

  // If `true`, component is displayed without the card border and box shadow.
  flatStyle: PT.bool.isRequired,

  className: PT.string,
  onDelete: PT.func,
};


ProofPhotoCard.defaultProps = {
  flatStyle: false,
  deletable: false,
};

export default ProofPhotoCard;
