import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../../../utils';
const DailyTransactionTable = ({
  date,
  transactions,
  openTransactionDialog,
}) => {
  return (
    <div className=''>
      <h3 className='text-gray-500 text-sm mb-1 '>{date}</h3>
      <table className='min-w-full text-xs border-b border-gray-200 mb-6'>
        <thead className='border-b-2'>
          <tr>
            <th
              scope='col'
              className='py-2 text-left font-medium text-gray-500 uppercase'
            >
              Type
            </th>
            <th
              scope='col'
              className='py-2 px-3 text-right font-medium text-gray-500 uppercase'
            >
              Amount
            </th>
            <th
              scope='col'
              className='py-2 text-left font-medium text-gray-500 uppercase'
            >
              Account
            </th>
            <th
              scope='col'
              className='py-2 text-left font-medium text-gray-500 uppercase'
            >
              Beneficiary
            </th>
            <th
              scope='col'
              className='py-2 text-left font-medium text-gray-500 uppercase'
            >
              Reference
            </th>
            <th
              scope='col'
              className='py-2 text-left font-medium text-gray-500 uppercase'
            >
              Category
            </th>
            <th
              scope='col'
              className='py-2 text-left font-medium text-gray-500 uppercase'
            >
              Date
            </th>
            <th scope='col' className='relative py-2'></th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {transactions &&
            transactions.map((transaction, key) => (
              <tr
                key={key}
                onClick={() => openTransactionDialog(true, transaction)}
              >
                <td className='py-2 whitespace-nowrap'>
                  {transaction.debitCreditCode}
                </td>
                <td className='py-2 px-3 whitespace-nowrap text-right'>
                  <span className='font-semibold pr-2'>
                    {transaction.amount}
                  </span>
                  {transaction.currency.code}
                </td>
                <td className='py-2 whitespace-nowrap'>
                  {transaction.account.accountId}
                </td>
                <td className='py-2 whitespace-nowrap'>
                  {transaction.account.accountId}
                </td>
                <td className='py-2 whitespace-nowrap '>
                  {transaction.transactionId}
                </td>
                <td className='py-2 whitespace-nowrap '>
                  {transaction.baiType.productGroupCode}
                </td>
                <td className='py-2 whitespace-nowrap '>
                  {formatDate(new Date(transaction.asOfDateTime))}
                </td>
                <td className='py-2 whitespace-nowrap text-right text-sm font-medium'></td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

DailyTransactionTable.propTypes = {
  date: PropTypes.string,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      debitCreditCode: PropTypes.string,
      amount: PropTypes.number,
      transactionId: PropTypes.string,
      currency: PropTypes.shape({
        code: PropTypes.string,
      }),
      account: PropTypes.shape({
        accountId: PropTypes.string,
      }),
    }),
  ),
  openTransactionDialog: PropTypes.func,
};

export default DailyTransactionTable;
