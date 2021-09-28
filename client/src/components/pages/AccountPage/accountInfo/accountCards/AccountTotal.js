import React from 'react';
import PropTypes from 'prop-types';
import { gatherCurrencySymbol, percIncrease } from '../../utils';

const AccountTotal = ({ total, currency, totalPrevious }) => {
  const percentChange = percIncrease(totalPrevious, total);
  return (
    <div className='border bg-white border-pink-500 shadow-md hover:shadow-lg p-4 rounded-lg'>
      <div className='mb-2 flex'>
        All accounts balance in
        <span className=' bg-red-50 rounded-lg pl-2 ml-2 text-xs font-medium text-gray-500 flex items-center cursor-pointer'>
          {currency}
          <span className='material-icons'>expand_more</span>
        </span>
      </div>
      <div className='flex items-baseline justify-between'>
        <div className='text-2xl font-medium'>
          {gatherCurrencySymbol(currency)}
          {total}
        </div>
 
        <div className="flex">
                {percentChange >= 0 ? <span className="material-icons text-green-600">arrow_drop_up</span> : <span className="material-icons text-red-600 text-lg">arrow_drop_down</span>}
                <div
                  className={percentChange >= 0 ? 'text-green-600 ' : 'text-red-600'}
                >
                  {percentChange}%
                </div>
                </div>
      </div>
      <div className='flex text-xs mt-7 justify-between gap-3 '>
        <div className='flex flex-col gap-2 flex-grow text-center'>
          <button className='p-1 bg-red-50 font-medium rounded-lg flex items-center justify-center '>
            <span className='material-icons mr-1'>swap_horiz</span> <span>FX transaction</span>
          </button>
          <button className='p-1 bg-red-50 font-medium rounded-lg flex items-center justify-center'>
            <span className='material-icons mr-1'>add</span> <span>Fund account</span>
          </button>
        </div>
        <button className='p-1 bg-gradient-to-r from-pink-500 to-red-500  font-medium rounded-lg text-white text-center flex items-center flex-grow justify-center'>
          <span className='material-icons mr-1'>payments</span> Make payment
        </button>
      </div>
    </div>
  );
};

AccountTotal.propTypes = {
  total: PropTypes.number,
  totalPrevious: PropTypes.number,
  currency: PropTypes.string,
};

export default AccountTotal;
