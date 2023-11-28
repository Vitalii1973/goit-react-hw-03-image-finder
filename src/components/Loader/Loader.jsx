// src/components/Loader/Loader.jsx
import React, { Component } from 'react';
import { Dna } from 'react-loader-spinner';
import './Loader.css';

class Loader extends Component {
  render() {
    return (
      <div className="spinner-overlay">
        <Dna
          visible={true}
          height={80}
          width={80}
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    );
  }
}

export default Loader;
