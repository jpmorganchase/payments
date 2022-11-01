import React from 'react';
import { AppContext } from '../../AppContext';
import { config } from '../../config';
import { AccountType } from '../../types/accountTypes';
import AccountCard from './accountCards/AccountCard';

function AccountList({ data } : {
  data: AccountType[]
}) {
  const { displayingApiData } = React.useContext(AppContext);
  const apiData = config.accountsConfig.apiDetails;
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
