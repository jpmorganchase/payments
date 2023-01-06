import React from 'react';
import { AppContext } from '../../../context/AppContext';
import { config } from '../../../config';
import { AccountType, CurrencyType } from '../../../types/accountTypes';
import APIDetails from '../../APIDetails';
import { gatherCurrencySymbol, isEmptyObject } from '../../utils';

type AccountTotalType = {
  total: number | 'Error',
  currency: CurrencyType['code'],
  selectedAccount: AccountType | Record<string, never>,
  setSelectedAccount: (account: AccountType | Record<string, never>) => void
};
function AccountTotal({
  total,
  currency,
  selectedAccount,
  setSelectedAccount,
}: AccountTotalType) {
  const { displayingApiData } = React.useContext(AppContext);
  const { accountsConfig: { apiDetails } } = config;

  const selectedClassName = isEmptyObject(selectedAccount)
    ? 'border-pink-500'
    : 'border-gray-200';

  return (
    <div className="relative pb-4">
      {displayingApiData && <APIDetails details={apiDetails[0]} absolute />}
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
      </div>
    </div>
  );
}

export default AccountTotal;
