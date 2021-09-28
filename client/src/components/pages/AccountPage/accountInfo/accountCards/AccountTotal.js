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
  const percentChange = percIncrease(totalPrevious, total);
  const selectedClassName = isEmptyObject(selectedAccount)
    ? 'border-pink-500'
    : 'border-gray-200';

  return (
    <div
      className={`border bg-white  shadow-md hover:shadow-lg p-4 rounded-lg ${selectedClassName}`}
      onClick={() => setSelectedAccount({})}
    >
      <div className='mb-2'>
        All accounts balance in
        <span className=' bg-red-50 rounded-lg px-2 py-1 text-xs font-medium text-gray-500'>
          {currency}
        </span>
      </div>
      <div className='flex items-baseline justify-between'>
        <div className='text-2xl font-medium'>
          {gatherCurrencySymbol(currency)}
          {total}
        </div>
        <div
          className={percentChange >= 0 ? 'text-green-600 ' : 'text-red-600'}
        >
          {percentChange}%
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
