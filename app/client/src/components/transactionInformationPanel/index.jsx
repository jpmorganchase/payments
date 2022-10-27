import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TransactionViz from './TransactionViz';
import TransactionGrid from './transactionGrid/TransactionGrid';
import { isEmptyObject } from '../utils';
import Search from '../search';

// Code taken from: https://stackoverflow.com/questions/46802448/how-do-i-group-items-in-an-array-by-date
const groupTransactionsByDay = (data) => {
  const groups = data.reduce((dateGroups, transaction) => {
    const date = transaction.asOfDate;
    if (!dateGroups[date]) {
      // eslint-disable-next-line no-param-reassign
      dateGroups[date] = [];
    }
    dateGroups[date].push(transaction);
    return dateGroups;
  }, {});
  const groupArrays = Object.keys(groups).map((date) => ({
    date,
    transactions: groups[date],
  }));
  // https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
  return groupArrays.sort((a, b) => new Date(b.date) - new Date(a.date));
};

function TransactionInfo({
  transactions,
  selectedAccount,
  displayingApiData,
  apiData = [],
  ...props
}) {
  const [searchInput, setSearchInput] = useState('');

  let transactionData = transactions.data;

  const headers = [
    'debitCreditCode',
    'amount',
    'transactionId',
    'baiType',
    'account',
  ];

  if (!isEmptyObject(selectedAccount) && selectedAccount.accountId) {
    // eslint-disable-next-line max-len
    transactionData = transactionData.filter((transaction) => (transaction.account.accountId === selectedAccount.accountId));
  }

  if (searchInput.length > 2) {
    // eslint-disable-next-line max-len
    transactionData = transactionData.filter((transaction) => headers.some((header) => JSON.stringify(transaction[header])
      .toLowerCase()
      .includes(searchInput.toLowerCase())));
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
        {...props}
      />
      <TransactionGrid
        apiData={apiData}
        displayingApiData={displayingApiData}
        groupedByDay={groupedByDayTransactions}
        {...props}
      />
    </div>
  );
}

TransactionInfo.propTypes = {
  transactions: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
  }),
  selectedAccount: PropTypes.object,
  apiData: PropTypes.arrayOf(PropTypes.object),
  displayingApiData: PropTypes.bool,
};

export default TransactionInfo;
