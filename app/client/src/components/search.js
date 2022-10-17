import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchInput, setSearchInput, searchText }) => (
  <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer text-xs rounded-lg px-2 py-1 flex items-center'>
    <span className='material-icons text-base mr-1'>search</span>
    <input
      className='bg-gray-100 hover:bg-gray-200'
      type='search'
      placeholder={searchText}
      onChange={(e) => setSearchInput(e.target.value)}
      value={searchInput}
    />
  </div>
);

Search.propTypes = {
  searchInput: PropTypes.string,
  searchText: PropTypes.string,

  setSearchInput: PropTypes.func,
};

export default Search;
