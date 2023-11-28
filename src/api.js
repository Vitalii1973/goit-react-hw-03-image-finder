import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = '39826341-72b32bf5f28bdbe6242a5fe09';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (searchQuery, page, perPage) => {
  const params = {
    key: API_KEY,
    q: encodeURIComponent(searchQuery),
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: perPage,
  };

  try {
    const response = await axios.get(BASE_URL, { params });

    if (response.data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    Notiflix.Notify.failure('Failed to load images. Please try again later.');
    throw error;
  }
};

export default fetchImages;
