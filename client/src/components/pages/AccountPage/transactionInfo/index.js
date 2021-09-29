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
  return (
    <div className='flex-grow p-8 h-screen flex flex-col'>
      <div className='flex justify-between items-center mb-3'>
        <h2 className='text-2xl font-medium'>All transactions</h2>
        <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer text-xs rounded-lg px-2 py-1 flex items-center'>
          <span className='material-icons text-base mr-1'>search</span> Search
        </div>
        <div className=''>
          <span className='material-icons text-md mr-1'>filter_list</span>
          <span className='material-icons text-md mr-1'>download</span>
        </div>
      </div>
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
