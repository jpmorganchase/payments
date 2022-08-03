import React, { useEffect } from 'react';
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

const config = {
  apiDetails: [
    {
      name: 'Balances',
      backendPath: `/api/server?path=balances`,
      path: 'https://apigatewayqaf.jpmorgan.com/accessapi/balance',
      description:
        'This API returns intraday balances for specific accounts. We use it to get the current day balance for a UAT account.',
      cacheKey: 'balances',
      refreshInterval: 43200000,
    },
    {
      name: 'Transactions',
      path: 'https://apigatewayqaf.jpmorgan.com/tsapi/v2/transactions?relativeDateType=PRIOR_DAY',
      description:
        'This API returns all the transactions for a specific account for a specific time period.',
      backendPath: `/api/server?path=transactions`,
      cacheKey: 'transactions',
      refreshInterval: 1800000,
    },
    {
      name: 'Balances Prior',
      path: '',
      description: '',
      backendPath: `/api/server?path=balancesprior`,
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
  const [data, setData] = React.useState({
    balance: balanceMockData,
    transaction: transactionMockData,
    previousDayBalance: balancePriorMockData,
  });
  const results = config.apiDetails.map((api) =>
    usePost(api.backendPath, api.cacheKey, api.refreshInterval),
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

  useEffect(() => {
    if (displayingMockedData) {
      setData({
        balance: balanceMockData,
        transaction: transactionMockData,
        previousDayBalance: balancePriorMockData,
      });
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
      setData({
        balance: balanceData,
        transaction: transactionData,
        previousDayBalance: previousDayBalanceData,
      });
    }
  }, [displayingMockedData]);

  const displayPanels = () => {
    if (!displayingMockedData && results.some((r) => r.isLoading)) {
      return (
        <div className='text-center pt-24'>
          <Spinner />
        </div>
      );
    } else if (!displayingMockedData && results.some((r) => r.isError)) {
      const first = results.find((r) => r.error);
      return <div className='text-center pt-24'>{first.error.message}</div>;
    }
    return (
      <div className='flex flex-wrap'>
        <AccountInfo
          data={data.balance}
          previous={data.previousDayBalance}
          setSelectedAccount={setSelectedAccount}
          selectedAccount={selectedAccount}
          apiData={config.apiDetails}
          displayingApiData={displayingApiData}
        />
        <TransactionInfo
          transactions={data.transaction}
          openTransactionDialog={openTransactionDialog}
          selectedAccount={selectedAccount}
          apiData={config.apiDetails}
          displayingApiData={displayingApiData}
        />
      </div>
    );
  };

  return (
    <>
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
    </>
  );
};

export default AccountPage;
