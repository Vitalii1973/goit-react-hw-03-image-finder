import React from 'react';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

class Lightbox extends React.Component {
  componentDidMount() {
    const { imageUrl, onClose, showNextImage, showPrevImage } = this.props;

    const instance = basicLightbox.create(`
      <img src="${imageUrl}" alt="" />
    `);

    instance.show();

    const closeLightbox = () => {
      instance.close();
      onClose();
    };

    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        showNextImage();
      } else if (e.key === 'ArrowLeft') {
        showPrevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    this.showImage = () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }

  render() {
    const { onClose, showNextImage, showPrevImage, imageUrl, alt } = this.props;

    return (
      <div>
        <img src={imageUrl} alt={alt} />
        <button onClick={showPrevImage}>Prev</button>
        <button onClick={onClose}>Close</button>
        <button onClick={showNextImage}>Next</button>
      </div>
    );
  }
}

export default Lightbox;
