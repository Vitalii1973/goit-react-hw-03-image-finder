// ImageGalleryItem.jsx
import React from 'react';

const ImageGalleryItem = ({ image, onImageClick, isSelected }) => {
  return (
    <li className={`gallery-item ${isSelected ? 'selected' : ''}`}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className="gallery-item-image"
        onClick={() => onImageClick(image.largeImageURL)}
      />
    </li>
  );
};

export default ImageGalleryItem;
