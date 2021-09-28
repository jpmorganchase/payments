import React from 'react';
import PropTypes from 'prop-types';
import { gatherCurrencySymbol } from '../../../../utils';

const AccountCard = ({ account, percentChange, setSelectedAccount }) => {
  return (
    <div
      className='border bg-white border-gray-200 shadow-sm hover:shadow-lg p-4 rounded-lg'
      onClick={() => setSelectedAccount(account)}
    >
      <div className='flex justify-between'>
        <div className='mb-2 font-medium'>
          {account.accountName || 'Account Name'}
          <br />
          <span className='text-xs text-gray-500 font-normal'>
            {account.accountId}
          </span>
        </div>
        <span className='text-xs font-medium text-gray-500'>
          {account.currency.code}
        </span>
      </div>
      <div className='flex items-baseline justify-between'>
        <div className='text-xl font-medium'>
          {gatherCurrencySymbol(account.currency.code)}
          {account.balanceList[0].openingAvailableAmount}
        </div>
        <div
          className={percentChange >= 0 ? 'text-green-600 ' : 'text-red-600'}
        >
          {percentChange}%
        </div>
      </div>
    </div>
  );
};

AccountCard.propTypes = {
  account: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    accountName: PropTypes.string,
    currency: PropTypes.shape({
      code: PropTypes.string,
      description: PropTypes.string,
    }),
    balanceList: PropTypes.arrayOf(
      PropTypes.shape({
        openingAvailableAmount: PropTypes.number.isRequired,
      }),
    ),
  }),
  percentChange: PropTypes.string,
  setSelectedAccount: PropTypes.func,
};

export default AccountCard;
