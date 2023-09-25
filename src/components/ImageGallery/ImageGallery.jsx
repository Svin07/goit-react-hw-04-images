import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export default function ImageGallery({ hits, openModal }) {
  return (
    <ul className={css.imageGallery}>
      {hits.map(hit => (
        <ImageGalleryItem key={hit.id} hit={hit} openModal={openModal} />
      ))}
    </ul>
  );
}
