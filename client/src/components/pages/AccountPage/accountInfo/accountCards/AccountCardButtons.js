import React from 'react';

const AccountCardButtons = () => {
  return (
    <div className='flex text-xs mt-7 justify-between'>
      <div className='flex gap-2'>
        <button className='py-2 px-3 bg-red-50 font-medium rounded-lg'>
          Exchange
        </button>
        <button className='py-2 px-3 bg-red-50 font-medium rounded-lg'>
          Add money
        </button>
      </div>
      <button className='py-2 px-3 bg-gradient-to-r from-pink-500 to-red-500  font-medium rounded-lg text-white'>
        Send Money
      </button>
    </div>
  );
};

export default AccountCardButtons;
