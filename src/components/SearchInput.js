import React, { Component } from 'react';

class SearchInput extends Component {
  searchHandler(e) {
    let value = e.target.value;

    this.props.searchSubmit(value);
  }
  render() {
    return (
      <div className="component--search-input">
        <input
          type="text"
          name="search"
          placeholder="Search"
          value={this.props.searchText}
          onChange={this.searchHandler.bind(this)}
        />
      </div>
    );
  }
}

export default SearchInput;
