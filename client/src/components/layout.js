import React from 'react';
import Sidebar from './sidebar';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <div className='flex h-screen text-gray-900'>
      <Sidebar />
      <section className='relative flex flex-col flex-grow'>
        <main className='p-8 h-screen'>
          <div className='content overflow-auto'>{children}</div>
        </main>
      </section>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout;
