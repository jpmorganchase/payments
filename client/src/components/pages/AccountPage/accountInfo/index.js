import React from 'react';
import AccountTotal from './accountCards/AccountTotal';
import AccountList from './accountList/AccountList';

const AccountInfo = () => {
  return (
  <div className="bg-gray-50 p-8 border-r border-gray-200 w-2/5 h-screen">
    <h2 className="text-2xl font-medium mb-4">Accounts</h2>
    <AccountTotal />
    <div className="flex justify-between items-center mt-4 mb-3">
                <h3 className="text-sm font-medium">All accounts</h3>
                <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer text-xs rounded-lg px-3 py-1 flex items-center">
                  Search
                </div>
                <div>Icons</div>
              </div>
    <AccountList />
  </div>
  );
};

export default AccountInfo;
