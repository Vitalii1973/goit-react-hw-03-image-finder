import React, { Component } from 'react';
import './SearchForm.css';

class SearchForm extends Component {
  state = {
    query: '',
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.query);
  };

  render() {
    return (
      <form className="search-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleChange}
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default SearchForm;
