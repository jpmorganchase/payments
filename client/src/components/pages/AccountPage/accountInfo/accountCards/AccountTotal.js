import React from 'react';
import PropTypes from 'prop-types';
import {
  gatherCurrencySymbol,
  isEmptyObject,
  percIncrease,
} from '../../../../utils';
import AccountCardButtons from './AccountCardButtons';

const AccountTotal = ({
  total,
  currency,
  totalPrevious,
  setSelectedAccount,
  selectedAccount,
}) => {
  let percentChange = 'Error';
  if (total !== 'Error' && totalPrevious !== 'Error') {
    percentChange = percIncrease(totalPrevious, total);
  }
  const selectedClassName = isEmptyObject(selectedAccount)
    ? 'border-pink-500'
    : 'border-gray-200';

  return (
    <div
      className={`border bg-white  shadow-md hover:shadow-lg p-4 rounded-lg ${selectedClassName}`}
      onClick={() => setSelectedAccount({})}
    >
      <div className='mb-2 flex'>
        All accounts balance in
        <span className=' bg-red-50 rounded-lg pl-2 ml-2 text-xs font-medium text-gray-500 flex items-center cursor-pointer'>
          {currency}
          <span className='material-icons'>expand_more</span>
        </span>
      </div>
      <div className='flex items-baseline justify-between'>
        <div className='text-2xl font-medium'>
          {total !== 'Error' &&
            totalPrevious !== 'Error' &&
            gatherCurrencySymbol(currency)}
          {total}
        </div>

        <div className='flex'>
          {percentChange >= 0 ? (
            <span className='material-icons text-green-600'>arrow_drop_up</span>
          ) : (
            <span className='material-icons text-red-600 text-lg'>
              arrow_drop_down
            </span>
          )}
          <div
            className={percentChange >= 0 ? 'text-green-600 ' : 'text-red-600'}
          >
            {Math.abs(percentChange)}%
          </div>
        </div>
      </div>
      {isEmptyObject(selectedAccount) && <AccountCardButtons />}
    </div>
  );
};

AccountTotal.propTypes = {
  total: PropTypes.number,
  totalPrevious: PropTypes.number,
  currency: PropTypes.string,
  selectedAccount: PropTypes.object,
  setSelectedAccount: PropTypes.func,
};

export default AccountTotal;
