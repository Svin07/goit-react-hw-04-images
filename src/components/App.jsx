import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import './styles.css';
import { getPicturesBySearch } from '../API/hits';
import { Component } from 'react';

export class App extends Component {
  state = {
    hits: [],
    showModal: false,
    isLoading: false,
    error: '',
    searchQuery: '',
    totalHits: 0,
    page: 1,
    imgUrl: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.searchQuery !== prevState.searchQuery
    ) {
      this.fetchHits();
    }
  }

  fetchHits = async () => {
    try {
      this.setState({ isLoading: true });
      const data = await getPicturesBySearch(
        this.state.searchQuery,
        this.state.page
      );
      const { hits, totalHits } = data;

      this.setState({
        hits: [...this.state.hits, ...hits],
        totalHits: totalHits,
      });
    } catch (error) {
      this.setState({ error: error.response.data });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handlySetSearchQuery = value => {
    this.setState({ searchQuery: value, page: 1, hits: [] });
  };

  togleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  paginationPageUpdate = () => {
    this.setState(state => ({
      page: state.page + 1,
    }));
  };

  updateImg = evt => {
    this.setState({
      imgUrl: evt.target.dataset.url,
    });

    this.togleModal();
  };

  render() {
    const { error, isLoading, hits, showModal, totalHits, page, imgUrl } =
      this.state;

    return (
      <div>
        {error && <h1>{Error}</h1>}
        {showModal && (
          <Modal onClose={this.togleModal}>
            <img src={imgUrl} alt="" />
          </Modal>
        )}
        <Searchbar onSubmit={this.handlySetSearchQuery} />
        {isLoading && <Loader />}
        {hits &&
          (totalHits === 0 ? (
            <p>No data found</p>
          ) : (
            <ImageGallery hits={hits} openModal={this.updateImg} />
          ))}
        {totalHits > 12 && page < Math.ceil(totalHits / 12) && (
          <Button paginationPageUpdate={this.paginationPageUpdate} />
        )}
      </div>
    );
  }
}
