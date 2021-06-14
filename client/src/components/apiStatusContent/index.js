import React from 'react';
import StatusTable from './statusTable';

const ApiStatusContent = ({ ...props }) => {
  return (
    <>
      <div className='flex flex-shrink-0 flex-col'>
        <div className='flex relative items-start px-8 h-12 flex-col'>
          <span className='text-2xl tracking-wide'>API Status</span>
        </div>
      </div>
      <div className='flex w-full p-8 flex-col'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <StatusTable {...props} />
        </div>
      </div>
    </>
  );
};

export default ApiStatusContent;
