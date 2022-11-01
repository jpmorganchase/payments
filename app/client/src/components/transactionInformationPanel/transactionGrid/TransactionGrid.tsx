import React from 'react';
import { AppContext } from '../../../AppContext';
import { config } from '../../../config';
import { GroupByDayType, TransactionType } from '../../../types/transactionTypes';
import DailyTransactionTable from './DailyTransactionTable';

type TransactionGridProps = {
  groupedByDay: GroupByDayType[],
  openTransactionDialog: (state:boolean, transaction: TransactionType) =>void
};
function TransactionGrid({
  groupedByDay,
  openTransactionDialog,
}: TransactionGridProps) {
  const apiData = config.statusConfig.apiDetails;
  const { displayingApiData } = React.useContext(AppContext);

  return (
    <div data-cy="transactionsGrid">
      {displayingApiData && (
        <div className="bg-black bg-opacity-80 p-8 rounded-lg text-white h-full">
          <h1 className="text-sm">
            {apiData[1].name}
            {' '}
            API
          </h1>
          <h3 className="text-xs mb-4">{apiData[1].path}</h3>
          <h3 className="text-xs">{apiData[1].description}</h3>
        </div>
      )}
      <div className="overflow-y-auto">
        {(!groupedByDay || groupedByDay.length < 1) && <div> No Transactions found </div>}
        {groupedByDay
          && groupedByDay.map((item: GroupByDayType) => (
            <DailyTransactionTable
              key={`transactionGroup-${item.date}`}
              date={item.date}
              transactions={item.transactions}
              openTransactionDialog={openTransactionDialog}
            />
          ))}
      </div>
    </div>
  );
}

export default TransactionGrid;
