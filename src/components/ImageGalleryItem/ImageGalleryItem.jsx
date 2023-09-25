import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  hit: { tags, webformatURL, largeImageURL },
  openModal,
}) {
  return (
    <li className={css.imageGalleryItem} onClick={openModal}>
      <img
        data-url={largeImageURL}
        src={webformatURL}
        alt={tags}
        className={css.imageGalleryItemImage}
      />
    </li>
  );
}
