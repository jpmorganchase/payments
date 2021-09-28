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
const TransactionGrid = ({ transactions, ...props }) => {
  const groupedTransactions = groupTransactionsByDay(transactions);

  return (
    <div className='overflow-hidden'>
      {!groupedTransactions ||
        (groupedTransactions.length < 1 && <div> No Transactions found </div>)}
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
  );
};

TransactionGrid.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object),
};

export default TransactionGrid;
