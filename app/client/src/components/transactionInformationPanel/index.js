/* eslint-disable  */

import React from 'react';
import TransactionViz from './TransactionViz';
import TransactionGrid from './transactionGrid/TransactionGrid';
import PropTypes from 'prop-types';
import { isEmptyObject } from '../utils';

const TransactionInfo = ({
  transactions,
  selectedAccount,
  displayingApiData,
  apiData = [],
  ...props
}) => {
  let transactionData = transactions.data;
  if (!isEmptyObject(selectedAccount) && selectedAccount.accountId) {
    transactionData = transactions.data.filter(function (transaction) {
      return transaction.account.accountId === selectedAccount.accountId;
    });
  }

  // Code taken from: https://stackoverflow.com/questions/46802448/how-do-i-group-items-in-an-array-by-date
  const groupTransactionsByDay = (data) => {
    const groups = data.reduce((groups, transaction) => {
      const date = transaction.asOfDate;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    }, {});
    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        transactions: groups[date],
      };
    });
    // https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
    return groupArrays.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.date) - new Date(a.date);
    });
  };

  const groupedByDayTransactions = groupTransactionsByDay(transactionData);
  return (
    <div className='sm:w-3/5 p-8 flex flex-col w-full'>
      <div className='flex justify-between items-center mb-3'>
        <h2 className='text-2xl font-medium'>All transactions</h2>
        <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer text-xs rounded-lg px-2 py-1 flex items-center'>
          <span className='material-icons text-base mr-1'>search</span> Search
        </div>
        <div>
          <span className='material-icons text-md mr-1'>filter_list</span>
          <span className='material-icons text-md mr-1'>download</span>
        </div>
      </div>

      <>
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
      </>
    </div>
  );
};

TransactionInfo.propTypes = {
  transactions: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
  }),
  selectedAccount: PropTypes.object,
  apiData: PropTypes.arrayOf(PropTypes.object),
  displayingApiData: PropTypes.bool,
};

export default TransactionInfo;
