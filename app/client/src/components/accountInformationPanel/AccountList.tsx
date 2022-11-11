import React from 'react';
import { AppContext } from '../../AppContext';
import { config } from '../../config';
import { AccountType } from '../../types/accountTypes';
import APIDetails from '../APIDetails';
import AccountCard from './accountCards/AccountCard';

function AccountList({ data } : {
  data: AccountType[]
}) {
  const { displayingApiData } = React.useContext(AppContext);
  const { accountsConfig: { apiDetails } } = config;

  return (
    <div className="relative">
      {displayingApiData && <APIDetails details={apiDetails[0]} absolute />}
      <div className="overflow-y-auto">
        {data
          && data.map((account) => (
            <AccountCard key={`accountCard-${account.accountId}`} account={account} />
          ))}
      </div>
    </div>
  );
}

export default AccountList;
