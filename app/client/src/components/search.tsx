import React from 'react';

type SearchParams = {
  searchInput: string,
  setSearchInput: (value: string) => void,
  searchText: string,
  testingId: string
};

function Search(params: SearchParams) {
  const {
    searchInput, setSearchInput, searchText, testingId,
  } = params;
  return (
    <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer text-xs rounded-lg px-2 py-1 flex items-center">
      <span className="material-icons text-base mr-1">search</span>
      <input
        className="bg-gray-100 hover:bg-gray-200"
        type="search"
        placeholder={searchText}
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
        data-cy={testingId}
      />
    </div>
  );
}
export default Search;
