import { ReactV18, propTypes } from 'dxmodule';

const { React } = ReactV18;

/**
 * A wrapper for easily supplying a 1x- and 2x-resolution
 * image source to an <img> tag.
 */
function Img2x(props) {
  const srcSet = `${props.src} 1x, ${props.src2x} 2x`;
  return (
    <img
      className={props.className || ''}
      src={props.src}
      srcSet={srcSet}
      alt={props.alt} />
  );
}

Img2x.propTypes = {
  src: propTypes.string.isRequired,
  src2x: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,

  className: propTypes.string,
}

export default Img2x;
