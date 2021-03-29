/* eslint-disable no-console */
import React from 'react';
import Sidebar from './components/sidebar';
import Header from './components/header';
import StatusTable from './components/statusTable';

const App = () => {
    return (
      <div className='flex min-h-screen'>
        <Sidebar />
        <div className='flex flex-col w-full'>
          <Header />
          <div className='flex flex-shrink-0 flex-col'>
            <div className='flex relative items-start px-8 h-12 flex-col'>
              <span className='text-2xl tracking-wide'>API Status</span>
            </div>
          </div>
          <div className='flex w-full p-8 flex-col'>
            <StatusTable />
          </div>
        </div>
      </div>
    );
};

export default App;
