import React from 'react';
import TransactionViz from './transactionViz/TransactionViz';
import TransactionGrid from './transactionGrid/TransactionGrid';

const TransactionInfo = () => {
  return (
    <div className="flex-grow p-8 h-screen">
    <h2 className="text-2xl font-medium mb-4">All transactions</h2>
    <TransactionViz />
    <TransactionGrid />
    </div>
  );
};

export default TransactionInfo;
