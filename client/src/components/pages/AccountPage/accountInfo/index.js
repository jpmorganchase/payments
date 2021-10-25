import React from 'react';
import AccountTotal from './accountCards/AccountTotal';
import AccountList from './accountList/AccountList';
import PropTypes from 'prop-types';

const AccountInfo = ({ data, previous, ...props }) => {
  const totalAccount = data.accountList
    .map((account) => {
      if (!account.errorCode) {
        return account.balanceList[0].openingAvailableAmount;
      } else {
        return 'Error';
      }
    })
    .reduce((prev, next) => prev + next);
  const totalAccountPrevious = previous.accountList
    .map((account) => {
      if (!account.errorCode) {
        return account.balanceList[0].openingAvailableAmount;
      } else {
        return 'Error';
      }
    })
    .reduce((prev, next) => prev + next);

  return (
    <div className='bg-gray-50 p-8 border-r border-gray-200 sm:w-2/5 flex flex-col sm:min-h-screen flex-wrap'>
      <h2 className='text-3xl font-medium mb-4'>Accounts</h2>
      <AccountTotal
        total={totalAccount}
        currency={'USD'}
        totalPrevious={totalAccountPrevious}
        {...props}
      />
      <div className='flex justify-between items-center mt-4 mb-3'>
        <h3 className='text-sm font-medium 2xl:text-base'>All accounts</h3>
        <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer text-xs rounded-lg px-2 py-1 flex items-center'>
          <span className='material-icons text-base mr-1'>search</span> Search
        </div>
        <div className=''>
          <span className='material-icons text-md mr-1'>add</span>
          <span className='material-icons text-md mr-1'>more_horiz</span>
        </div>
      </div>
      {data && data.accountList && (
        <AccountList
          data={data.accountList}
          previous={previous.accountList}
          {...props}
        />
      )}
    </div>
  );
};

AccountInfo.propTypes = {
  data: PropTypes.shape({
    accountList: PropTypes.arrayOf(PropTypes.object),
  }),
  previous: PropTypes.shape({
    accountList: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default AccountInfo;
