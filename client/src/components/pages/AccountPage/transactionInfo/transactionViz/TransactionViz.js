import React from 'react';

const TransactionViz = () => {
  return (
    <div className="p-6 rounded-lg border mb-4 shadow-sm flex gap-2">
                    <div className="flex-grow">
                      <h4 className="text-sm font-medium">#Transactions by currency</h4>
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-medium">#Transactions by region</h4>
                    </div>

                  </div>

  );
};

export default TransactionViz;
