import React from 'react';
import TransactionViz from './transactionViz/TransactionViz';
import TransactionGrid from './transactionGrid/TransactionGrid';

const TransactionInfo = () => {
  return (
    <div>
    <h2 className="text-2xl font-medium">All transactions</h2>
    <TransactionViz />
    <TransactionGrid />
    </div>
  );
};

export default TransactionInfo;
