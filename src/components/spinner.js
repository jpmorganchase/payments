import React from 'react';

const Spinner = () => {
  return (
    <div className='flex justify-center items-center flex-col'>
      <div
        className='spinner-border animate-spin-slow inline-block border-dotted w-12 h-12 border-4 rounded-full border-pink-500'
        role='status'
      ></div>
      <span className='text-xl mt-4'>Retrieving data...</span>
    </div>
  );
};

export default Spinner;
