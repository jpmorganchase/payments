import React from 'react';
import Sidebar from './sidebar';
import Header from './header';
import PropTypes from 'prop-types';

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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout;
