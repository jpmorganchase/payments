import React from 'react';

const Header = () => {
  return (
    <header className="flex px-4 md:px-8 pt-4 md:pt-8 w-full justify-between flex-row">
      <div className="">
        <span className="text-gray-700 text-xs uppercase font-medium">Health</span>
        <h1 className="text-2xl">API Status</h1>
      </div>
      <div className="">
        <button className="mx-2 hover:text-indigo-600 focus:outline-none">
          <span className="material-icons">notifications</span>
        </button>

        <button className="mx-2 hover:text-indigo-600 focus:outline-none">
          <span className="material-icons">account_circle</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
