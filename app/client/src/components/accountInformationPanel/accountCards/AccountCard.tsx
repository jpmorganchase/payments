import React from 'react';
import { AppContext } from '../../../AppContext';
import { AccountType } from '../../../types/accountTypes';
import { gatherCurrencySymbol, isEmptyObject } from '../../utils';

function AccountCard({ account }: { account:AccountType }) {
  const { selectedAccount, setSelectedAccount } = React.useContext(AppContext);
  const {
    accountId, accountName, currency, errorCode, balanceList,
  } = account;
  const isSelected = !isEmptyObject(selectedAccount)
    && selectedAccount.accountId === accountId;
  const selectedClassName = isSelected ? 'border-pink-500' : 'border-gray-200';

  return (
    <div
      className={`border bg-white  shadow-sm p-4 rounded-lg mb-4 ${selectedClassName}`}
      onClick={() => setSelectedAccount(account)}
      onKeyPress={() => setSelectedAccount(account)}
      role="button"
      tabIndex={0}
    >
      <div className="flex justify-between">
        <div className="mb-2 font-medium">
          {accountName || 'Account Name'}
          <br />
          <span
            className="text-xs text-gray-500 font-normal"
            data-cy="accountId"
          >
            {accountId}
          </span>
        </div>
        <span className="text-xs font-medium text-gray-500">
          {currency.code}
        </span>
      </div>
      <div className="text-xl font-medium">
        {!errorCode && gatherCurrencySymbol(currency.code)}
        {!errorCode && balanceList && balanceList[0].openingAvailableAmount}
        {errorCode && 'Error'}
      </div>
    </div>
  );
}

export default AccountCard;
