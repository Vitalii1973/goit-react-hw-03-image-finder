import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Lightbox from './Modal/Lightbox';
import { fetchImages } from '../api';
import './styles/App.css';

const API_KEY = '39826341-72b32bf5f28bdbe6242a5fe09';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchQuery: '',
      images: [],
      loading: false,
      modalImage: null,
      page: 1,
      totalHits: 0,
      hasMore: true,
      selectedImageIndex: null,
      message: '',
    };
  }

  componentDidMount() {
    const { searchQuery, page } = this.state;
    if (searchQuery && page === 1) {
      this.fetchData(searchQuery, page);
    }
  }

  fetchData = async (query, page) => {
    this.setState({ loading: true });
    const perPage = PER_PAGE;

    try {
      const data = await fetchImages(query, page, perPage);

      if (data.hits.length === 0) {
        this.setState({ hasMore: false });
        return;
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        page: page + 1,
        loading: false,
        totalHits: data.totalHits,
      }));

      const remainingImages = data.totalHits - page * perPage;
      this.displayMessage(`Remaining images: ${remainingImages}`);
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ loading: false });
    }
  };

  displayMessage = message => {
    this.setState({ message });

    setTimeout(() => {
      this.setState({ message: '' });
    }, 2000);
  };

  handleSubmit = query => {
    this.setState(
      { searchQuery: query, images: [], loading: true, page: 1 },
      async () => {
        try {
          const data = await fetchImages(query, 1, PER_PAGE);
          this.setState(prevState => ({
            images: [...data.hits],
            loading: false,
          }));
        } catch (error) {
          console.error('Error fetching data:', error);
          this.setState({ loading: false });
        }
      }
    );
  };

  fetchMoreImages = () => {
    const { searchQuery, page } = this.state;
    this.setState({ loading: true, page: page + 1 }, () => {
      this.fetchData(searchQuery, page + 1);
    });
  };

  handleOpenModal = image => {
    this.setState({ modalImage: image });
  };

  handleCloseModal = () => {
    this.setState({ modalImage: null });
  };

  handleImageClick = image => {
    const largeImage = image.largeImageURL;
    this.handleOpenModal(largeImage);
  };

  handleImageSelect = index => {
    this.setState({ selectedImageIndex: index });
  };

  handleImageDeselect = () => {
    this.setState({ selectedImageIndex: null });
  };

  showNextImage = () => {
    const { selectedImageIndex } = this.state;
    this.handleImageSelect(selectedImageIndex + 1);
  };

  showPrevImage = () => {
    const { selectedImageIndex } = this.state;
    this.handleImageSelect(selectedImageIndex - 1);
  };

  render() {
    const { images, loading, modalImage, totalHits, hasMore, message } =
      this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery
          images={images}
          loading={loading}
          onImageClick={this.handleImageClick}
          totalHits={totalHits}
          hasMore={hasMore}
          onLoadMore={this.fetchMoreImages}
        />
        {loading && <Loader />}
        {images.length > 0 && (
          <Button
            onLoadMore={this.fetchMoreImages}
            hasMore={hasMore}
            API_KEY={API_KEY}
            BASE_URL={BASE_URL}
            PER_PAGE={PER_PAGE}
          />
        )}
        {modalImage && (
          <Lightbox
            imageUrl={modalImage}
            alt="Large Image"
            onClose={this.handleCloseModal}
            showNextImage={this.showNextImage}
            showPrevImage={this.showPrevImage}
          />
        )}
        {message && (
          <div id="message-container" className="show">
            {message}
          </div>
        )}
      </div>
    );
  }
}

export default App;
