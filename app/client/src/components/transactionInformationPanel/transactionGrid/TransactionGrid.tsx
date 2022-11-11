import React from 'react';
import { AppContext } from '../../../AppContext';
import { config } from '../../../config';
import { GroupByDayType, TransactionType } from '../../../types/transactionTypes';
import APIDetails from '../../APIDetails';
import DailyTransactionTable from './DailyTransactionTable';

type TransactionGridProps = {
  groupedByDay: GroupByDayType[],
  openTransactionDialog: (state:boolean, transaction: TransactionType) =>void
};
function TransactionGrid({
  groupedByDay,
  openTransactionDialog,
}: TransactionGridProps) {
  const { accountsConfig: { apiDetails } } = config;
  const { displayingApiData } = React.useContext(AppContext);

  return (
    <div data-cy="transactionsGrid">
      {displayingApiData && <APIDetails details={apiDetails[1]} absolute={false} />}
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
