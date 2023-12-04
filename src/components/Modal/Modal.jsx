// Modal.jsx
import React, { Component } from 'react';
import ReactModal from 'react-modal';
import './Modal.css'; // Створіть стилі для модалки

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    ReactModal.setAppElement('#root'); // Змініть '#root' на відповідний селектор для вашого кореневого елемента додатка
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.props.onClose();
    } else if (event.key === 'ArrowRight') {
      this.props.showNextImage();
    } else if (event.key === 'ArrowLeft') {
      this.props.showPrevImage();
    }
  };

  render() {
    const { imageUrl, onClose, modalRef } = this.props;

    return (
      <ReactModal
        ref={modalRef}
        isOpen={!!imageUrl}
        onRequestClose={onClose}
        contentLabel="Image Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <img src={imageUrl} alt="" />
      </ReactModal>
    );
  }
}

export default Modal;
