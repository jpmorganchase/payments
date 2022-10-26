import React from 'react';

type SearchParams = {
  searchInput: string, 
  setSearchInput: (value: string) => void, 
  searchText: string, 
  testingId: string
}

const Search = (params: SearchParams) => (
  <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer text-xs rounded-lg px-2 py-1 flex items-center'>
    <span className='material-icons text-base mr-1'>search</span>
    <input
      className='bg-gray-100 hover:bg-gray-200'
      type='search'
      placeholder={params.searchText}
      onChange={(e) => params.setSearchInput(e.target.value)}
      value={params.searchInput}
      data-cy={params.testingId}
    />
  </div>
);
export default Search;
