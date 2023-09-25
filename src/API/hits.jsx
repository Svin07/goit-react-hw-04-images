import axios from 'axios';
axios.defaults.baseURL = `https://pixabay.com/api/`;
const API_KEY = '38679969-57ec4f21bcb0769bbee4ee870';

export const getPicturesBySearch = async (query, page) => {
  const { data } = await axios(
    `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
  );
  return data;
};

// https://pixabay.com/api/?key=38721058-dcc1021070edf740dd0c7c82a&q=cat&image_type=photo&orientation=horizontal&page=1&per_page=12
