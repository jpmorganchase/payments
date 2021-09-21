import React from 'react';
import Layout from '../../layout';
import WhatAPI from '../../whatAPI';
import AccountInfo from './accountInfo/index';
import TransactionInfo from './transactionInfo/index';

const balanceMockData = require('./mockJson/uf-balances.json');
const transactionMockData = require('./mockJson/uf-transactions.json');

const config = {
  apiDetails: [
    {
      name: 'Balances',
    },
    {
      name: 'Transactions',
    },
  ],
};

const AccountPage = () => {
  const [transactionData, setTransactionData] = React.useState(null);
  const [balanceData, setBalanceData] = React.useState(null);
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
  }, []);

  const displayPanels = () => {
    if (displayingMockedData) {
      return (
        <>
          <AccountInfo data={balanceMockData} />
          <TransactionInfo data={transactionMockData} />
        </>
      );
    } else if (
      transactionData &&
      transactionData.data &&
      balanceData &&
      balanceData.data
    ) {
      return (
        <>
          <AccountInfo data={balanceData.data} />
          <TransactionInfo data={transactionData.data} />
        </>
      );
    }
    return <p> Loading</p>;
  };

  return (
    <Layout>
      <div className='flex -m-8'>{displayPanels()}</div>
      <WhatAPI toggleMockedData={toggleMockedData} config={config} />
    </Layout>
  );
};

export default AccountPage;
