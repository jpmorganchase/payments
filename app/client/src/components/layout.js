import React from 'react';
import Sidebar from './sidebar.tsx';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='flex flex-col lg:flex-row h-full text-gray-900 min-h-screen w-full max-w-screen'>
      <Sidebar />
      <main className='h-auto lg:h-full lg:min-h-screen lg:w-11/12 w-full'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
