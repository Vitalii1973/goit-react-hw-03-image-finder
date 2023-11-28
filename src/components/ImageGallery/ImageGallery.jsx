import React, { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button'; // Підключаємо компонент Button
import './ImageGallery.css';

class ImageGallery extends Component {
  handleImageClick = (index, image) => {
    this.props.onImageClick(image);
  };

  handleLoadMore = () => {
    const { searchQuery, page } = this.state;
    const nextPage = page + 1;

    this.props.onLoadMore(searchQuery, nextPage);
  };

  render() {
    const { images, loading, totalHits, hasMore } = this.props;

    return (
      <div className="ImageGallery">
        {images.length > 0 && (
          <div className="gallery-container">
            <ul className="gallery">
              {images.map((image, index) => (
                <ImageGalleryItem
                  key={image.id}
                  image={image}
                  onImageClick={() => this.handleImageClick(index, image)}
                />
              ))}
            </ul>
            {totalHits > images.length && hasMore && (
              <Button
                onLoadMore={() =>
                  this.fetchMoreImages(this.state.searchQuery, this.state.page)
                }
              />
            )}
          </div>
        )}
        {totalHits > 0 && !loading && !hasMore && (
          <p>We're sorry, but you've reached the end of search results.</p>
        )}
      </div>
    );
  }
}

export default ImageGallery;
