import React from 'react';
import { TransactionType } from '../../../types/transactionTypes';
import { formatDate } from '../../utils';

function DailyTransactionTable({
  date,
  transactions,
  openTransactionDialog,
}: { date: string, transactions: TransactionType[], openTransactionDialog:(state:boolean, transaction: TransactionType) =>void }) {
  const headers = [
    'Transaction Type',
    'Amount',
    'Account',
    'Reference',
    'Category',
    'Date',
  ];
  const renderHeaders = headers.map((header) => (
    <th
      scope="col"
      key={`header-${header}`}
      className="py-2 text-left font-medium text-gray-500 uppercase"
    >
      {header}
    </th>
  ));
  return (
    <>
      <h3 className="text-gray-500 text-lg mb-1">{date}</h3>
      <table
        className="min-w-full text-sm border-b border-gray-200 mb-6"
        id="transactionsTable"
      >
        <thead className="border-b-2">
          <tr>{renderHeaders}</tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions
            && transactions.map((transaction) => (
              <tr
                key={`transaction-${transaction.transactionId}`}
                onClick={() => openTransactionDialog(true, transaction)}
              >
                <td className="py-2 whitespace-nowrap">
                  {transaction.debitCreditCode}
                </td>
                <td className="py-2 whitespace-nowrap">
                  $
                  <b>
                    {transaction.amount}
                    {' '}
                  </b>
                </td>
                <td className="py-2 whitespace-nowrap">
                  {transaction.account.accountId}
                </td>
                <td className="py-2 whitespace-nowrap ">
                  {transaction.transactionId}
                </td>
                <td className="py-2 whitespace-nowrap ">
                  {transaction.baiType.productGroupCode}
                </td>
                <td className="py-2 whitespace-nowrap ">
                  {formatDate(new Date(transaction.asOfDateTime))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default DailyTransactionTable;
