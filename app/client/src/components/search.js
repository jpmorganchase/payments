import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchInput, setSearchInput, searchText, testingId }) => (
  <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer text-xs rounded-lg px-2 py-1 flex items-center border-0'>
    <span className='material-icons text-base mr-1'>search</span>
    <input
      className='bg-gray-100 hover:bg-gray-200 border-0 focus:ring-0'
      type='search'
      placeholder={searchText}
      onChange={(e) => setSearchInput(e.target.value)}
      value={searchInput}
      data-cy={testingId}
    />
  </div>
);

Search.propTypes = {
  searchInput: PropTypes.string,
  searchText: PropTypes.string,
  testingId: PropTypes.string,
  setSearchInput: PropTypes.func,
};

export default Search;
