import React from 'react';
import { AccountType } from '../../../types/accountTypes';
import { gatherCurrencySymbol, isEmptyObject } from '../../utils';
import AccountCardButtons from './AccountCardButtons';

type AccountCardType = {
  account: AccountType,
  setSelectedAccount: (account: AccountType) =>void,
  selectedAccount: AccountType
};

function AccountCard(props: AccountCardType) {
  const { account, setSelectedAccount, selectedAccount } = props;
  const isSelected = !isEmptyObject(selectedAccount)
    && selectedAccount.accountId === account.accountId;
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
          {account.accountName || 'Account Name'}
          <br />
          <span
            className="text-xs text-gray-500 font-normal"
            data-cy="accountId"
          >
            {account.accountId}
          </span>
        </div>
        <span className="text-xs font-medium text-gray-500">
          {account.currency.code}
        </span>
      </div>
      <div className="text-xl font-medium">
        {!account.errorCode && gatherCurrencySymbol(account.currency.code)}
        {!account.errorCode && account.balanceList[0].openingAvailableAmount}
        {account.errorCode && 'Error'}
      </div>
      {isSelected && <AccountCardButtons />}
    </div>
  );
}

export default AccountCard;
