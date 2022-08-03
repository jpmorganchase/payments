import React from 'react';
import WhatAPI from '../../whatAPI';
import AccountInfo from './accountInfo/index';
import TransactionInfo from './transactionInfo/index';
import usePost from '../../../hooks/usePost';
import TransactionJsonDialog from './transactionInfo/TransactionJsonDialog';
import { useQueryClient } from 'react-query';
import Spinner from '../../spinner';

const balanceMockData = require('./mockJson/uf-balances.json');
const balancePriorMockData = require('./mockJson/uf-balances-prior.json');
const transactionMockData = require('./mockJson/uf-transactions.json');

const BASE_PATH = 'http://localhost:3000';

const config = {
  apiDetails: [
    {
      name: 'Balances',
      path: `${BASE_PATH}/api/server?path=balances`,

      cacheKey: 'balances',
      refreshInterval: 43200000,
    },
    {
      name: 'Transactions',
      path: `${BASE_PATH}/api/server?path=transactions`,
      cacheKey: 'transactions',
      refreshInterval: 1800000,
    },
    {
      name: 'Balances Prior',
      path: `${BASE_PATH}/api/server?path=balancesprior`,
      cacheKey: 'balances_prior',
      refreshInterval: 43200000,
    },
  ],
};

const AccountPage = () => {
  const queryClient = useQueryClient();

  const [displayingMockedData, setDisplayingMockedData] = React.useState(true);
  const [displayingApiData, setDisplayingApiData] = React.useState(false);
  const [transactionDialogOpen, setTransactionDialogState] =
    React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState({});
  const [selectedAccount, setSelectedAccount] = React.useState({});

  const results = config.apiDetails.map((api) =>
    usePost(api.path, api.cacheKey, api.refreshInterval),
  );
  const toggleMockedData = () => {
    setDisplayingMockedData(!displayingMockedData);
  };
  const toggleApiData = () => {
    setDisplayingApiData(!displayingApiData);
  };
  const openTransactionDialog = (state, transaction) => {
    setTransactionDialogState(state);
    setSelectedTransaction(transaction);
  };

  const displayPanels = () => {
    if (displayingMockedData) {
      if (displayingApiData) {
        return (
          <div className='flex flex-wrap'>
            <AccountInfo
              data={balanceMockData}
              previous={balancePriorMockData}
              apiData={config.apiDetails}
              setSelectedAccount={setSelectedAccount}
              selectedAccount={selectedAccount}
            />
            <TransactionInfo
              transactions={transactionMockData}
              openTransactionDialog={openTransactionDialog}
              selectedAccount={selectedAccount}
              apiData={config.apiDetails}
            />
          </div>
        );
      } else {
        return (
          <div className='flex flex-wrap'>
            <AccountInfo
              data={balanceMockData}
              previous={balancePriorMockData}
              setSelectedAccount={setSelectedAccount}
              selectedAccount={selectedAccount}
            />
            <TransactionInfo
              transactions={transactionMockData}
              openTransactionDialog={openTransactionDialog}
              selectedAccount={selectedAccount}
            />
          </div>
        );
      }
    } else if (results.some((r) => r.isLoading)) {
      return (
        <div className='text-center pt-24'>
          <Spinner />
        </div>
      );
    } else if (results.some((r) => r.isError)) {
      const first = results.find((r) => r.error);
      return <div className='text-center pt-24'>{first.error.message}</div>;
    } else {
      const balanceData = queryClient.getQueryData(
        config.apiDetails[0].cacheKey,
      );
      const transactionData = queryClient.getQueryData(
        config.apiDetails[1].cacheKey,
      );
      const previousDayBalanceData = queryClient.getQueryData(
        config.apiDetails[2].cacheKey,
      );
      if (displayingApiData) {
        return (
          <div className='flex flex-wrap'>
            <AccountInfo
              data={balanceData}
              previous={previousDayBalanceData}
              apiData={config.apiDetails}
              setSelectedAccount={setSelectedAccount}
              selectedAccount={selectedAccount}
            />
            <TransactionInfo
              transactions={transactionData}
              openTransactionDialog={openTransactionDialog}
              selectedAccount={selectedAccount}
              apiData={config.apiDetails}
            />
          </div>
        );
      } else {
        return (
          <div className='flex flex-wrap'>
            <AccountInfo
              data={balanceData}
              previous={previousDayBalanceData}
              setSelectedAccount={setSelectedAccount}
              selectedAccount={selectedAccount}
            />
            <TransactionInfo
              transactions={transactionData}
              openTransactionDialog={openTransactionDialog}
              selectedAccount={selectedAccount}
            />
          </div>
        );
      }
    }
  };

  return (
    <div>
      {displayPanels()}
      <TransactionJsonDialog
        open={transactionDialogOpen}
        setTransactionDialog={openTransactionDialog}
        transaction={selectedTransaction}
      />
      <WhatAPI
        toggleMockedData={toggleMockedData}
        config={config}
        mockedDataEnabled={displayingMockedData}
        toggleApiData={toggleApiData}
        apiDataEnabled={displayingApiData}
      />
    </div>
  );
};

export default AccountPage;
