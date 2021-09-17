import React from 'react';
import Sidebar from './sidebar';
// import Header from './header';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <div className='flex h-screen text-gray-900'>
      <Sidebar />
      <section className='relative flex flex-col flex-grow'>
        <main>
          <content className="p-8 overflow-auto">
          {children}
          </content>
        </main>
      </section>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout;
