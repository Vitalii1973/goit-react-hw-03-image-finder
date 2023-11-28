// Button.jsx
import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  render() {
    const { onLoadMore, hasMore } = this.props;

    return (
      <button
        type="button"
        className="load-more-button"
        onClick={onLoadMore}
        style={{ display: hasMore ? 'block' : 'none' }}
      >
        Load more
      </button>
    );
  }
}

export default Button;
