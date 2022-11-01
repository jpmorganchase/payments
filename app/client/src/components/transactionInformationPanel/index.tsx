import React, { useState } from 'react';
import TransactionViz from './TransactionViz';
import TransactionGrid from './transactionGrid/TransactionGrid';
import { isEmptyObject } from '../utils';
import Search from '../search';
import { TransactionDataType, TransactionType } from '../../types/transactionTypes';
import { AccountType } from '../../types/accountTypes';
import { ApiDetailsInterface } from '../../config';

type TransactionInfoType = {
  transactions: TransactionDataType,
  selectedAccount: AccountType | Record<string, never>,
  displayingApiData: boolean,
  apiData: ApiDetailsInterface[],
  openTransactionDialog:(state:boolean, transaction: TransactionType) =>void
};

type GroupedDataType = {
  [key: string]: TransactionType[]
};
// Code taken from: https://stackoverflow.com/questions/46802448/how-do-i-group-items-in-an-array-by-date
const groupTransactionsByDay = (data: TransactionType[]) => {
  const groups: Record<string, TransactionType[]> = data.reduce((dateGroups: GroupedDataType, transaction) => {
    const date: string = transaction.asOfDate;
    if (date in dateGroups) {
      dateGroups[date].push(transaction);
    } else {
      // eslint-disable-next-line no-param-reassign
      dateGroups[date] = [transaction];
    }
    return dateGroups;
  }, {});
  const groupArrays: { date:string, transactions: TransactionType[] }[] = Object.keys(groups).map((date) => ({
    date,
    transactions: groups[date],
  }));
  // https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
  return groupArrays.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

function TransactionInfo({
  transactions,
  selectedAccount,
  displayingApiData,
  apiData = [],
  openTransactionDialog,
}: TransactionInfoType) {
  const [searchInput, setSearchInput] = useState('');

  let transactionData = transactions.data;

  if (!isEmptyObject(selectedAccount) && selectedAccount.accountId) {
    transactionData = transactionData.filter((transaction) => (transaction.account.accountId === selectedAccount.accountId));
  }

  if (searchInput.length > 2) {
    transactionData = transactionData.filter((transaction: TransactionType) => JSON.stringify(transaction)
      .toLowerCase()
      .includes(searchInput.toLowerCase()));
  }

  const groupedByDayTransactions = groupTransactionsByDay(transactionData);

  // https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
  const downloadTransactions = () => {
    const dataStr = `data:text/json;charset=utf-8,${
      encodeURIComponent(JSON.stringify(transactionData))}`;
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'transactions.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="sm:w-3/5 p-8 flex flex-col w-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-medium">All transactions</h2>
        <Search
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          searchText="Search Transactions"
          testingId="transactionSearch"
        />
        <button type="button" onClick={() => downloadTransactions()}>
          <span className="material-icons text-md mr-1">download</span>
        </button>
      </div>

      <TransactionViz
        groupedByDay={groupedByDayTransactions}
        transactions={transactionData}
      />
      <TransactionGrid
        apiData={apiData}
        displayingApiData={displayingApiData}
        groupedByDay={groupedByDayTransactions}
        openTransactionDialog={openTransactionDialog}
      />
    </div>
  );
}

export default TransactionInfo;
