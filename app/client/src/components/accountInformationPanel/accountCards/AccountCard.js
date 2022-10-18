import React from 'react';
import PropTypes from 'prop-types';
import { gatherCurrencySymbol, isEmptyObject } from '../../utils';
import AccountCardButtons from './AccountCardButtons';

const AccountCard = ({
  account,
  setSelectedAccount,
  selectedAccount,
  ...props
}) => {
  console.log(props);
  const isSelected =
    !isEmptyObject(selectedAccount) &&
    selectedAccount.accountId == account.accountId;
  const selectedClassName = isSelected ? 'border-pink-500' : 'border-gray-200';
  return (
    <div
      className={`border bg-white  shadow-sm p-4 rounded-lg mb-4 ${selectedClassName}`}
      onClick={() => setSelectedAccount(account)}
    >
      <div className='flex justify-between'>
        <div className='mb-2 font-medium'>
          {account.accountName || 'Account Name'}
          <br />
          <span
            className='text-xs text-gray-500 font-normal'
            data-cy='accountId'
          >
            {account.accountId}
          </span>
        </div>
        <span className='text-xs font-medium text-gray-500'>
          {account.currency.code}
        </span>
      </div>
      <div className='text-xl font-medium'>
        {!account.errorCode && gatherCurrencySymbol(account.currency.code)}
        {!account.errorCode && account.balanceList[0].openingAvailableAmount}
        {account.errorCode && 'Error'}
      </div>
      {isSelected && <AccountCardButtons {...props} />}
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
  setSelectedAccount: PropTypes.func,
  selectedAccount: PropTypes.object,
};

export default AccountCard;
