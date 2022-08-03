import React from 'react';
import AccountTotal from './accountCards/AccountTotal';
import AccountList from './accountList/AccountList';
import PropTypes from 'prop-types';

const AccountInfo = ({
  data,
  previous,
  displayingApiData,
  apiData = [],
  ...props
}) => {
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
    <div className='relative bg-gray-50 p-8 border-r border-gray-200 sm:w-2/5 flex flex-col sm:min-h-screen flex-wrap'>
      <h2 className='text-2xl font-medium mb-4'>Accounts</h2>

      <div>
        {!displayingApiData ? (
          <></>
        ) : (
          <div className='absolute bg-black bg-opacity-80 p-8 rounded-lg text-white flex-col h-full mr-7 '>
            <h1 className='text-sm'>{apiData[0].name} API</h1>
            <h3 className='text-xs mb-4'>{apiData[0].path}</h3>
            <h3 className='text-xs'>{apiData[0].description}</h3>
          </div>
        )}
        <AccountTotal
          total={totalAccount}
          currency={'USD'}
          totalPrevious={totalAccountPrevious}
          apiData={apiData}
          displayingApiData={displayingApiData}
          {...props}
        />
      </div>

      <div className='flex justify-between items-center mt-4 mb-3'>
        <h3 className='text-sm font-medium'>All accounts</h3>
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
          apiData={apiData}
          displayingApiData={displayingApiData}
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
  apiData: PropTypes.arrayOf(PropTypes.object),
  displayingApiData: PropTypes.bool,
};

export default AccountInfo;
