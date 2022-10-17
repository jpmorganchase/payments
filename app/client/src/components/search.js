import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchInput, setSearchInput }) => (
  <input
    className='bg-gray-100 hover:bg-gray-200 cursor-pointer text-xs rounded-lg px-2 py-1 flex items-center'
    type='search'
    placeholder='Search transactions'
    onChange={(e) => setSearchInput(e.target.value)}
    value={searchInput}
  />
);

Search.propTypes = {
  searchInput: PropTypes.string,
  setSearchInput: PropTypes.func,
};

export default Search;
