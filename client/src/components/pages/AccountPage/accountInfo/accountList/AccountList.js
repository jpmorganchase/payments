import React from 'react';
import AccountCard from '../accountCards/AccountCard';
import PropTypes from 'prop-types';
import { percIncrease } from '../../../../utils';

const calculatePreviousDayBalance = (account, previousAccounts) => {
  let wantedProperty = previousAccounts.find(
    (obj) => obj.accountId === account.accountId,
  );
  if (!wantedProperty.errorCode && !account.errorCode) {
    return percIncrease(
      wantedProperty.balanceList[0].openingAvailableAmount,
      account.balanceList[0].openingAvailableAmount,
    );
  } else {
    return 'Error';
  }
};
const AccountList = ({ data, previous, apiData=[], ...props }) => {
  // TODO what if we have lots of accounts? paginate?
  return (
    <div className='relative'>
      {apiData.length==0 ? (
        <></>
      ):( 
        <div className='absolute bg-black bg-opacity-80 p-8 rounded-lg text-white flex-col h-full w-full '>
          <h1 className='text-sm'>{apiData[0].name} API</h1>
          <h3 className='text-xs mb-4'>{apiData[0].path}</h3>
          <h3 className='text-xs'>This API returns intraday balances for specific accounts. 
            We use it to get the current day balance for a UAT account.</h3>
        </div>
        
      )}
    <div className='flex-grow overflow-y-auto'>
      {data &&
        data.map((account, key) => (
          <AccountCard
            key={key}
            account={account}
            percentChange={calculatePreviousDayBalance(account, previous)}
            {...props}
          />
        ))}
    </div>
    </div>
  );
};

AccountList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  previous: PropTypes.arrayOf(PropTypes.object),
  apiData: PropTypes.arrayOf(PropTypes.object),
};

export default AccountList;
