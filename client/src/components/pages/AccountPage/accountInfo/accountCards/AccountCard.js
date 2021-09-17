import React from 'react';

const AccountCard = () => {
  return (
    <div className="border bg-white border-gray-200 shadow-sm hover:shadow-lg p-4 rounded-lg">
                  <div className="flex justify-between">
                    <div className="mb-2 font-medium">Account Name<br /><span className="text-xs text-gray-500 font-normal">00000039939393</span></div>
                    <span className="text-xs font-medium text-gray-500">GBP</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div className="text-xl font-medium">£13,456,809<span className="text-sm">.78</span></div>
                    <div className="text-green-600">3.05%</div>
                  </div>
    </div>
  );
};

export default AccountCard;
