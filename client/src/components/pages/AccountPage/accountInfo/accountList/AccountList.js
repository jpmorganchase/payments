import React from 'react';
import AccountCard from '../accountCards/AccountCard';
import PropTypes from 'prop-types';

const AccountList = ({ data, displayingApiData, apiData = [], ...props }) => {
  return (
    <div className='relative'>
      {!displayingApiData ? (
        <></>
      ) : (
        <div className='absolute bg-black bg-opacity-80 p-8 rounded-lg text-white flex-col h-full w-full '>
          <h1 className='text-sm'>{apiData[0].name} API</h1>
          <h3 className='text-xs mb-4'>{apiData[0].path}</h3>
          <h3 className='text-xs'>{apiData[0].description}</h3>
        </div>
      )}
      <div className='flex-grow overflow-y-auto'>
        {data &&
          data.map((account, key) => (
            <AccountCard key={key} account={account} {...props} />
          ))}
      </div>
    </div>
  );
};

AccountList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  apiData: PropTypes.arrayOf(PropTypes.object),
  displayingApiData: PropTypes.bool,
};

export default AccountList;
