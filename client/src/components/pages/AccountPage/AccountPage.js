import React from 'react';
import Layout from '../../layout';
import WhatAPI from '../../whatAPI';
import AccountInfo from './accountInfo/index';
import TransactionInfo from './transactionInfo/index';
import TransactionJsonDialog from './transactionInfo/TransactionJsonDialog';
const balanceMockData = require('./mockJson/uf-balances.json');
const balancePriorMockData = require('./mockJson/uf-balances-prior.json');

const transactionMockData = require('./mockJson/uf-transactions.json');

const config = {
  apiDetails: [
    {
      name: 'Balances',
      unicornUrl: '/api/accounts/balances',
    },
    {
      name: 'Transactions',
      unicornUrl: '/api/accounts/transactions',
    },
    {
      name: 'Balances Prior',
      unicornUrl: '/api/accounts/balances/prior',
    },
  ],
};

const AccountPage = () => {
  const [transactionData, setTransactionData] = React.useState(null);
  const [balanceData, setBalanceData] = React.useState(null);
  const [previousDayBalanceData, setPreviousDayBalanceData] =
    React.useState(null);
  const [displayingMockedData, setDisplayingMockedData] = React.useState(false);

  const toggleMockedData = () => {
    setDisplayingMockedData(!displayingMockedData);
  };

  React.useEffect(() => {
    fetch('/api/accounts/transactions')
      .then((res) => res.json())
      .then((data) => setTransactionData(data));
    fetch('/api/accounts/balances')
      .then((res) => res.json())
      .then((data) => setBalanceData(data));
    fetch('/api/accounts/balances/prior')
      .then((res) => res.json())
      .then((data) => setPreviousDayBalanceData(data));
  }, []);

  const displayPanels = () => {
    if (displayingMockedData) {
      return (
        <>
          <AccountInfo data={balanceMockData} previous={balancePriorMockData} />
          <TransactionInfo transactions={transactionMockData} />
        </>
      );
    } else if (
      (transactionData && transactionData.errorString) ||
      (balanceData && balanceData.errorString)
    ) {
      return (
        <div className='text-red-500 m-8'>Error trying to connect to APIs</div>
      );
    } else if (
      transactionData &&
      transactionData.data &&
      balanceData &&
      balanceData.data &&
      previousDayBalanceData &&
      previousDayBalanceData.data
    ) {
      return (
        <>
          <AccountInfo
            data={balanceData.data}
            previous={previousDayBalanceData.data}
          />
          <TransactionInfo transactions={transactionData.data} />
        </>
      );
    }
    return <p className='m-8'> Loading</p>;
  };

  return (
    <Layout>
      <div className='flex -m-8'>{displayPanels()}</div>
      <TransactionJsonDialog />
      <WhatAPI
        toggleMockedData={toggleMockedData}
        config={config}
        mockedDataEnabled={displayingMockedData}
      />
    </Layout>
  );
};

export default AccountPage;
