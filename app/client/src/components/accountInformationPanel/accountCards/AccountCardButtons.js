import React from 'react';

const makePaymentClick = () => {
  // eslint-disable-next-line
  console.log('Make payment button clicked');
};
const AccountCardButtons = () => {
  return (
    <div className='flex text-xs mt-7 justify-between gap-3 flex-wrap'>
      <div className='flex gap-2 flex-grow xl:flex-col 2xl:flex-row text-center'>
        <button className='p-1 bg-red-50 font-medium rounded-lg flex items-center justify-center '>
          <span className='material-icons mr-1'>swap_horiz</span>
          <span>FX transaction</span>
        </button>
        <button className='p-1 bg-red-50 font-medium rounded-lg flex items-center justify-center'>
          <span className='material-icons mr-1'>add</span>
          <span>Fund account</span>
        </button>
      </div>
      <button
        className='p-1 bg-gradient-to-r from-pink-500 to-red-500  font-medium rounded-lg text-white text-center flex items-center justify-center'
        onClick={makePaymentClick}
      >
        <span className='material-icons mr-1'>payments</span> Make payment
      </button>
    </div>
  );
};

export default AccountCardButtons;
