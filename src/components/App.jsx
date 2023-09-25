import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import './styles.css';
import { getPicturesBySearch } from '../API/hits';
import { useEffect, useState } from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    const fetchHits = async () => {
      try {
        setIsLoading(true);
        const data = await getPicturesBySearch(searchQuery, page);
        const { hits, totalHits } = data;

        setImages([...images, ...hits]);
        setTotalHits(totalHits);
      } catch (error) {
        setError(error.response.data);
      } finally {
        setIsLoading(false);
      }
    };

    (searchQuery || page > 1) && fetchHits();
  }, [searchQuery, page]);

  const handlySetSearchQuery = value => {
    setSearchQuery(value);
    setPage(1);
    setImages([]);
  };

  const togleModal = () => {
    setShowModal(!showModal);
  };

  const paginationPageUpdate = () => {
    setPage(prevPage => prevPage + 1);
  };

  const updateImg = evt => {
    setImgUrl(evt.target.dataset.url);
    togleModal();
  };

  return (
    <div>
      {error && <h1>{error}</h1>}
      {showModal && (
        <Modal onClose={togleModal}>
          <img src={imgUrl} alt="" />
        </Modal>
      )}
      <Searchbar handlySetSearchQuery={handlySetSearchQuery} />
      {isLoading && <Loader />}
      {totalHits === 0 || !images ? (
        <p>No data found</p>
      ) : (
        <ImageGallery images={images} openModal={updateImg} />
      )}
      {totalHits > 12 && page < Math.ceil(totalHits / 12) && (
        <Button paginationPageUpdate={paginationPageUpdate} />
      )}
    </div>
  );
};
