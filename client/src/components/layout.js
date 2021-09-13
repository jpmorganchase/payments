import React from 'react';
import Sidebar from './components/sidebar';
import Header from './components/header';

const Layout = ({ children }) => {
  return (
    <div className='flex min-h-screen justify-center'>
      <Sidebar />
      <div className='flex flex-col w-full'>
        <Header />
        <div className='flex w-full p-4 md:p-8 flex-col'>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
