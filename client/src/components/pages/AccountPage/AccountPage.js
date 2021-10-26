import React from 'react';
import Layout from '../../layout';
import WhatAPI from '../../whatAPI';
import AccountInfo from './accountInfo/index';
import TransactionInfo from './transactionInfo/index';
import usePost from '../../../hooks/usePost';
import TransactionJsonDialog from './transactionInfo/TransactionJsonDialog';
import { useQueryClient } from 'react-query';

const balanceMockData = require('./mockJson/uf-balances.json');
const balancePriorMockData = require('./mockJson/uf-balances-prior.json');
const transactionMockData = require('./mockJson/uf-transactions.json');

const config = {
  apiDetails: [
    {
      name: 'Balances',
      path: '/api/accounts/balances',
      cacheKey: 'balances',
      refreshInterval: 43200000,
    },
    {
      name: 'Transactions',
      path: '/api/accounts/transactions',
      cacheKey: 'transactions',
      refreshInterval: 1800000,
    },
    {
      name: 'Balances Prior',
      path: '/api/accounts/balances/prior',
      cacheKey: 'balances_prior',
      refreshInterval: 43200000,
    },
  ],
};

const AccountPage = () => {
  const queryClient = useQueryClient();

  const [displayingMockedData, setDisplayingMockedData] = React.useState(false);
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

  const openTransactionDialog = (state, transaction) => {
    setTransactionDialogState(state);
    setSelectedTransaction(transaction);
  };

  const displayPanels = () => {
    if (displayingMockedData) {
      return (
        <>
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
        </>
      );
    } else if (results.some((r) => r.isLoading)) {
      return <p className='m-8'> Retrieving data...</p>;
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
      return (
        <>
          <AccountInfo
            data={balanceData.data}
            previous={previousDayBalanceData.data}
            setSelectedAccount={setSelectedAccount}
            selectedAccount={selectedAccount}
          />
          <TransactionInfo
            transactions={transactionData.data}
            openTransactionDialog={openTransactionDialog}
            selectedAccount={selectedAccount}
          />
        </>
      );
    }
  };

  return (
    <Layout>
      <div className='flex flex-wrap'>{displayPanels()}</div>
      <TransactionJsonDialog
        open={transactionDialogOpen}
        setTransactionDialog={openTransactionDialog}
        transaction={selectedTransaction}
      />
      <WhatAPI
        toggleMockedData={toggleMockedData}
        config={config}
        mockedDataEnabled={displayingMockedData}
      />
    </Layout>
  );
};

export default AccountPage;
