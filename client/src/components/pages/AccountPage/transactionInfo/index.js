import React from 'react';
import TransactionViz from './transactionViz/TransactionViz';
import TransactionGrid from './transactionGrid/TransactionGrid';
import PropTypes from 'prop-types';
import { isEmptyObject } from '../../../utils';

const TransactionInfo = ({ transactions, selectedAccount, ...props }) => {
  let transactionData = transactions.data;
  if (!isEmptyObject(selectedAccount) && selectedAccount.accountId) {
    transactionData = transactions.data.filter(function (transaction) {
      return transaction.account.accountId === selectedAccount.accountId;
    });
  }
  console.log(transactionData);
  return (
    <div className='flex-grow p-8 h-screen'>
      <h2 className='text-2xl font-medium mb-4'>All transactions</h2>
      <TransactionViz transactions={transactionData} {...props} />
      <TransactionGrid transactions={transactionData} {...props} />
    </div>
  );
};

TransactionInfo.propTypes = {
  transactions: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
  }),
  selectedAccount: PropTypes.object,
};

export default TransactionInfo;
