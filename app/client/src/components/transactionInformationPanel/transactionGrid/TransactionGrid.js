import React from 'react';
import PropTypes from 'prop-types';
import DailyTransactionTable from './DailyTransactionTable';

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
  return groupArrays.slice().sort((a, b) => (a < b ? 1 : -1));
};
const TransactionGrid = ({
  transactions,
  displayingApiData,
  apiData = [],
  ...props
}) => {
  const groupedTransactions = groupTransactionsByDay(transactions);

  return (
    <div className='relative' data-cy="transactionsGrid">
      {!displayingApiData ? (
        <></>
      ) : (
        <div className='absolute bg-black bg-opacity-80 p-8 rounded-lg text-white flex-col h-full w-full'>
          <h1 className='text-sm'>{apiData[1].name} API</h1>
          <h3 className='text-xs mb-4'>{apiData[1].path}</h3>
          <h3 className='text-xs'>
            This API returns all the transactions for a specific account for a
            specific time period.
          </h3>
        </div>
      )}
      <div className='overflow-y-auto flex-grow'>
        {!groupedTransactions ||
          (groupedTransactions.length < 1 && (
            <div> No Transactions found </div>
          ))}
        {groupedTransactions &&
          groupedTransactions.map((item, key) => (
            <DailyTransactionTable
              key={key}
              date={item.date}
              transactions={item.transactions}
              {...props}
            />
          ))}
      </div>
    </div>
  );
};

TransactionGrid.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object),
  apiData: PropTypes.arrayOf(PropTypes.object),
  displayingApiData: PropTypes.bool,
};

export default TransactionGrid;
