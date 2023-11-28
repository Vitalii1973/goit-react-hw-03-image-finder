// src/components/Modal/Modal.jsx
import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { imageUrl, alt, onClose } = this.props;

    return (
      <div className="overlay" onClick={this.handleOverlayClick}>
        <div className="modal">
          <img src={imageUrl} alt={alt} />
          <button type="button" className="close-button" onClick={onClose}>
            &#10006;
          </button>
        </div>
      </div>
    );
  }
}

export default Modal;
