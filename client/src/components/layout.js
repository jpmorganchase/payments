import React from 'react';
import Sidebar from './sidebar';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <div className='flex flex-col lg:flex-row h-full text-gray-900 min-h-screen'>
      <Sidebar />
      <section className='relative flex flex-col flex-grow'>
        <main className='h-auto lg:h-full min-h-screen'>
          <div className='content'>{children}</div>
        </main>
      </section>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout;
