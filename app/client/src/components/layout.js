import React from 'react';
import Sidebar from './sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='flex flex-col lg:flex-row h-full text-gray-900 min-h-screen'>
      <Sidebar />
      <main className='h-auto lg:h-full lg:min-h-screen flex-grow'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
