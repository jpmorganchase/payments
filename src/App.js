/* eslint-disable no-console */
import React from 'react';
import Sidebar from './components/sidebar';
import Header from './components/header';
import ApiStatusContent from './components/apiStatusContent';

const App = () => {
  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <div className='flex flex-col w-full'>
        <Header />
        <ApiStatusContent />
      </div>
    </div>
  );
};

export default App;
