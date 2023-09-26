import { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const hendlyKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', hendlyKeyDown);
    return () => {
      window.removeEventListener('keydown', hendlyKeyDown);
    };
  }, [onClose]);

  const hendlyBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={css.overlay} onClick={hendlyBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>
  );
};

export default Modal;
