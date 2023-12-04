// ImageGallery.jsx
import React, { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import './ImageGallery.css';

class ImageGallery extends Component {
  handleImageClick = image => {
    this.props.onOpenModal(image);
  };

  render() {
    const { images } = this.props;

    return (
      <div className="ImageGallery">
        {images.length > 0 && (
          <div className="gallery-container">
            <ul className="gallery">
              {images.map((image, index) => (
                <ImageGalleryItem
                  key={`${image.id}-${index}`}
                  image={image}
                  onImageClick={this.handleImageClick}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default ImageGallery;
