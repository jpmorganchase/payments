import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppContext } from '../AppContext';
import JsonDialog from './JsonDialog';
import Sidebar from './sidebar';
import WhatAPI from './whatApi';

function Layout() {
  const {
    displayingMockedData,
    setDisplayingMockedData,
    displayingApiData,
    setDisplayingApiData,
  } = React.useContext(AppContext);

  const toggleMockedData = () => {
    setDisplayingMockedData(!displayingMockedData);
  };
  const toggleApiData = () => {
    setDisplayingApiData(!displayingApiData);
  }; return (
    <div className="flex flex-col lg:flex-row h-full text-gray-900 min-h-screen w-full max-w-screen">
      <Sidebar />
      <main className="h-auto lg:h-full lg:min-h-screen lg:w-11/12 w-full">
        <Outlet />
        <JsonDialog />
        <WhatAPI
          toggleMockedData={toggleMockedData}
          mockedDataEnabled={displayingMockedData}
          toggleApiData={toggleApiData}
          apiDataEnabled={displayingApiData}
        />
      </main>
    </div>
  );
}

export default Layout;
