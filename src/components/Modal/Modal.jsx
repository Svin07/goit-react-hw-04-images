import { Component } from 'react';
import css from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hendlyKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendlyKeyDown);
  }

  hendlyKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  hendlyBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={css.overlay} onClick={this.hendlyBackdropClick}>
        <div className={css.modal}>{this.props.children}</div>
      </div>
    );
  }
}

export default Modal;
