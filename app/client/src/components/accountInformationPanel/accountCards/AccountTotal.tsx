import React from 'react';
import { ApiDetailsInterface } from '../../../config';
import { AccountType, CurrencyType } from '../../../types/accountTypes';
import { gatherCurrencySymbol, isEmptyObject } from '../../utils';
import AccountCardButtons from './AccountCardButtons';

type AccountTotalType = {
  total: number | 'Error',
  currency: CurrencyType['code'],
  setSelectedAccount: (account: AccountType | Record<string, never>) =>void,
  selectedAccount: AccountType
  apiData: ApiDetailsInterface[],
  displayingApiData: boolean,
};
function AccountTotal({
  total,
  currency,
  setSelectedAccount,
  selectedAccount,
  apiData,
  displayingApiData,
}: AccountTotalType) {
  const selectedClassName = isEmptyObject(selectedAccount)
    ? 'border-pink-500'
    : 'border-gray-200';

  return (
    <div className="relative">
      {displayingApiData && (
        <div className="absolute bg-black bg-opacity-80 p-8 rounded-lg text-white flex-col h-full w-full ">
          <h1 className="text-sm">
            {apiData[0].name}
            {' '}
            API
          </h1>
          <h3 className="text-xs mb-4">{apiData[0].path}</h3>
          <h3 className="text-xs">{apiData[0].description}</h3>
        </div>
      )}
      <div
        data-cy="allAccountsCard"
        className={`border bg-white shadow-md hover:shadow-lg p-4 rounded-lg ${selectedClassName}`}
        onClick={() => setSelectedAccount({})}
        onKeyPress={() => setSelectedAccount({})}
        role="button"
        tabIndex={0}
      >
        <div className="mb-2">
          <span>All accounts balance in </span>
          <span className=" bg-red-50 rounded-lg text-xs font-medium text-gray-500 p-2">
            {currency}
          </span>
        </div>
        <div className="text-2xl font-medium">
          {total !== 'Error' && gatherCurrencySymbol(currency)}
          {total}
        </div>
        {isEmptyObject(selectedAccount) && <AccountCardButtons />}
      </div>
    </div>
  );
}

export default AccountTotal;
