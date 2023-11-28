// src/components/ImageGalleryItem/ImageGalleryItem.jsx
import React, { Component } from 'react';
import './ImageGalleryItem.css';

class ImageGalleryItem extends Component {
  render() {
    const { image, onImageClick, isSelected } = this.props;

    return (
      <li className={`gallery-item ${isSelected ? 'selected' : ''}`}>
        <img
          src={image.webformatURL}
          alt={image.tags}
          className="gallery-item-image"
          onClick={onImageClick}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
