import React from 'react';
import PropTypes from 'prop-types';
import DailyTransactionTable from './DailyTransactionTable';

const TransactionGrid = ({
  displayingApiData,
  groupedByDay,
  apiData = [],
  ...props
}) => {
  return (
    <div data-cy='transactionsGrid'>
      {!displayingApiData ? (
        <></>
      ) : (
        <div className='absolute bg-black bg-opacity-80 p-8 rounded-lg text-white flex-col h-full w-full'>
          <h1 className='text-sm'>{apiData[1].name} API</h1>
          <h3 className='text-xs mb-4'>{apiData[1].path}</h3>
          <h3 className='text-xs'>{apiData[1].description}</h3>
        </div>
      )}
      <div className='overflow-y-auto'>
        {!groupedByDay ||
          (groupedByDay.length < 1 && <div> No Transactions found </div>)}
        {groupedByDay &&
          groupedByDay.map((item, key) => (
            <DailyTransactionTable
              key={key}
              date={item.date}
              transactions={item.transactions}
              {...props}
            />
          ))}
      </div>
    </div>
  );
};

TransactionGrid.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object),
  apiData: PropTypes.arrayOf(PropTypes.object),
  displayingApiData: PropTypes.bool,
  groupedByDay: PropTypes.arrayOf(PropTypes.object),
};

export default TransactionGrid;
