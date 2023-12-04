import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { fetchImages } from '../api';
import './styles/App.css';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const API_KEY = '39826341-72b32bf5f28bdbe6242a5fe09';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    loading: false,
    modalImage: null,
    page: 1,
    totalHits: 0,
    hasMore: true,
    selectedImageIndex: null,
    message: '',
    showBackend: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { totalHits, page } = this.state;

    const shouldShowBackend = page < Math.ceil(totalHits / 12);

    if (shouldShowBackend !== prevState.showBackend) {
      this.setState({ showBackend: shouldShowBackend });
    }
  }

  fetchData = async (query, currentPage) => {
    this.setState({ loading: true });

    try {
      const data = await fetchImages(query, currentPage, PER_PAGE);

      if (data.hits.length === 0) {
        this.setState({ hasMore: false });
        return;
      }

      const totalPages = Math.ceil(data.totalHits / PER_PAGE);

      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        page: currentPage + 1,
        loading: false,
        totalHits: data.totalHits,
        hasMore: currentPage < totalPages,
        totalPages: totalPages,
      }));

      const remainingImages = data.totalHits - currentPage * PER_PAGE;
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
            searchQuery: query, // Використовуйте searchQuery тут
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

    this.setState({ loading: true, page: page + 1 }, async () => {
      try {
        const data = await fetchImages(searchQuery, page + 1, PER_PAGE);

        if (data.hits.length === 0) {
          this.setState({ hasMore: false });
          return;
        }

        const totalPages = Math.ceil(data.totalHits / PER_PAGE);

        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          loading: false,
          totalHits: data.totalHits,
          hasMore: page + 1 < totalPages,
        }));

        const remainingImages = data.totalHits - (page + 1) * PER_PAGE;
        this.displayMessage(`Remaining images: ${remainingImages}`);
      } catch (error) {
        console.error('Error fetching data:', error);
        this.setState({ loading: false });
      }
    });
  };

  handleOpenModal = image => {
    // Перевірка, чи модальне вікно не відкрите перед відкриттям
    if (!this.state.modalImage) {
      this.setState({ modalImage: image });
    }
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
          onOpenModal={this.handleOpenModal}
          totalHits={totalHits}
          hasMore={hasMore}
          onLoadMore={this.fetchMoreImages}
        />
        {loading && <Loader />}
        {!loading && hasMore && images.length > 0 && (
          <Button
            onLoadMore={this.fetchMoreImages}
            hasMore={hasMore}
            API_KEY={API_KEY}
            BASE_URL={BASE_URL}
            PER_PAGE={PER_PAGE}
          />
        )}
        {modalImage && (
          <Modal
            imageUrl={modalImage}
            alt="Large Image"
            onClose={this.handleCloseModal}
            showNextImage={this.showNextImage}
            showPrevImage={this.showPrevImage}
            modalRef={this.modalRef}
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
