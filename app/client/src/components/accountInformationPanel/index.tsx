import React, { useState } from 'react';
import AccountTotal from './accountCards/AccountTotal';
import AccountList from './AccountList';
import Search from '../search';
import { BalanceDataType } from '../../types/accountTypes';
import { ApiDetailsInterface } from '../../config';

const headers = ['accountName', 'accountId', 'currency'];
type AccountInfoType = {
  data: BalanceDataType,
  displayingApiData: boolean,
  apiData: ApiDetailsInterface[]
};

function AccountInfo({
  data, displayingApiData, apiData = [], ...props
}: AccountInfoType) {
  const [searchInput, setSearchInput] = useState('');

  let accounts = data.accountList;
  const totalAccount = data.accountList
    .map((account) => {
      if (!account.errorCode) {
        return account.balanceList[0].openingAvailableAmount;
      }
      return 'Error';
    })
    .reduce(
      (prev, next) => Math.round((prev + next + Number.EPSILON) * 100) / 100,
    );

  if (searchInput.length > 2) {
    accounts = accounts.filter((account) => headers.some((header) => JSON.stringify(account[header])
      .toLowerCase()
      .includes(searchInput.toLowerCase())));
  }

  return (
    <div className="bg-gray-50 p-8 border-r border-gray-200 sm:w-2/5">
      <h2 className="text-2xl font-medium mb-4">Accounts</h2>

      <AccountTotal
        total={totalAccount}
        currency="USD"
        apiData={apiData}
        displayingApiData={displayingApiData}
        {...props}
      />

      <div className="flex justify-between items-center mt-4 mb-3">
        <h3 className="text-sm font-medium">All accounts</h3>
        <Search
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          searchText="Search Accounts"
          testingId="accountSearch"
        />
      </div>
      {accounts && (
        <AccountList
          data={accounts}
          apiData={apiData}
          displayingApiData={displayingApiData}
          {...props}
        />
      )}
      {!accounts || (accounts.length < 1 && <div> No Accounts found </div>)}
    </div>
  );
}

export default AccountInfo;
