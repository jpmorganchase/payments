import React from 'react';
import TransactionViz from './transactionViz/TransactionViz';
import TransactionGrid from './transactionGrid/TransactionGrid';
import PropTypes from 'prop-types';

const TransactionInfo = ({ transactions }) => {
  return (
    <div className='flex-grow p-8 h-screen'>
      <h2 className='text-2xl font-medium mb-4'>All transactions</h2>
      <TransactionViz transactions={transactions.data} />
      <TransactionGrid transactions={transactions.data} />
    </div>
  );
};

TransactionInfo.propTypes = {
  transactions: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default TransactionInfo;
