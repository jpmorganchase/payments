import React from 'react';
import PropTypes from 'prop-types';
import { gatherCurrencySymbol, isEmptyObject } from '../../../../utils';
import AccountCardButtons from './AccountCardButtons';

const AccountCard = ({
  account,
  percentChange,
  setSelectedAccount,
  selectedAccount,
}) => {
  const isSelected =
    !isEmptyObject(selectedAccount) &&
    selectedAccount.accountId == account.accountId;
  const selectedClassName = isSelected ? 'border-pink-500' : 'border-gray-200';
  return (
    <div
      className={`border bg-white  shadow-sm hover:shadow-lg p-4 rounded-lg mb-4 ${selectedClassName}`}
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
          {!account.errorCode && gatherCurrencySymbol(account.currency.code)}
          {!account.errorCode && account.balanceList[0].openingAvailableAmount}
          {account.errorCode && 'Error'}
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
      {isSelected && <AccountCardButtons />}
    </div>
  );
};

AccountCard.propTypes = {
  account: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    accountName: PropTypes.string,
    errorCode: PropTypes.number,
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
  selectedAccount: PropTypes.object,
};

export default AccountCard;
