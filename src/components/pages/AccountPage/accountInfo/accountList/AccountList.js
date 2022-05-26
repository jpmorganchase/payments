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
const AccountList = ({ data, previous, ...props }) => {
  // TODO what if we have lots of accounts? paginate?
  return (
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
  );
};

AccountList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  previous: PropTypes.arrayOf(PropTypes.object),
};

export default AccountList;
