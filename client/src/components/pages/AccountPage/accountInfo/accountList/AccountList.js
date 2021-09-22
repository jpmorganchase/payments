import React from 'react';
import AccountCard from '../accountCards/AccountCard';
import PropTypes from 'prop-types';

const AccountList = ({ data }) => {
  // TODO what if we have lots of accounts? paginate?
  return (
    <div>
      {data &&
        data.map((account, key) => <AccountCard key={key} account={account} />)}
    </div>
  );
};

AccountList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default AccountList;
