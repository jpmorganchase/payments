import React from 'react';

const AccountTotal = () => {
  return (
    <div className="border bg-white border-pink-500 shadow-md hover:shadow-lg p-4 rounded-lg">
            <div className="mb-2">All accounts balance in <span className=" bg-red-50 rounded-lg px-2 py-1 text-xs font-medium text-gray-500">GBP</span></div>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-medium">£13,456,809<span className="text-sm">.78</span></div>
              <div className="text-green-600">3.05%</div>
            </div>
            <div className="flex text-xs mt-7 justify-between">
              <div className="flex gap-2">
                <button className="py-2 px-3 bg-red-50 font-medium rounded-lg">Exchange</button>
                <button className="py-2 px-3 bg-red-50 font-medium rounded-lg">Add money</button>
              </div>
              <button className="py-2 px-3 bg-gradient-to-r from-pink-500 to-red-500  font-medium rounded-lg text-white">Send Money</button>
            </div>
          </div>
  );
};

export default AccountTotal;
