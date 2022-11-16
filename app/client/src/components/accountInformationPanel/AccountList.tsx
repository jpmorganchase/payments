import React from 'react';
import { AppContext } from '../../context/AppContext';
import { config } from '../../config';
import { AccountType } from '../../types/accountTypes';
import APIDetails from '../APIDetails';
import AccountCard from './accountCards/AccountCard';

function AccountList({ data, selectedAccount, setSelectedAccount } : {
  data: AccountType[],
  selectedAccount: AccountType | Record<string, never>,
  setSelectedAccount: (account: AccountType | Record<string, never>) => void
}) {
  const { displayingApiData } = React.useContext(AppContext);
  const { accountsConfig: { apiDetails } } = config;

  return (
    <div className="relative">
      {displayingApiData && <APIDetails details={apiDetails[0]} absolute />}
      <div className="overflow-y-auto">
        {data
          && data.map((account) => (
            <AccountCard key={`accountCard-${account.accountId}`} account={account} selectedAccount={selectedAccount} setSelectedAccount={setSelectedAccount} />
          ))}
      </div>
    </div>
  );
}

export default AccountList;
