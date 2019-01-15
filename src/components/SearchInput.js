import React, { Component } from 'react';

// import withData from '../HOC/withData';

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

// // Specifies the default values for props:
// SearchInput.defaultProps = {
//   data: {},
// };

// let path = [
//   '/assets/data/api/v2/item/index.json',
//   '/assets/data/api/v2/pokemon/index.json',
// ];
// let params = { keyNames: ['items', 'pokemon'] };
// let WrappedComponent = withData(SearchInput, path, params);

// export default WrappedComponent;
export default SearchInput;
