import React, { useEffect } from 'react';
import WhatAPI from '../components/whatApi';
import AccountInfo from '../components/accountInformationPanel/index';
import TransactionInfo from '../components/transactionInformationPanel/index';
import usePost from '../hooks/usePost';
import TransactionJsonDialog from '../components/transactionInformationPanel/TransactionJsonDialog';
import Spinner from '../components/spinner';
import useGet from '../hooks/useGet';
import { AppContext } from '../AppContext';
import PaymentDialog from '../components/PaymentDialog';

const balanceMockData = require('../mockedJson/uf-balances.json');
const transactionMockData = require('../mockedJson/uf-transactions.json');
const { config } = require('../config');

const AccountPage = () => {
  const { accountsConfig } = config;

  const {
    displayingMockedData,
    setDisplayingMockedData,
    displayingApiData,
    setDisplayingApiData,
  } = React.useContext(AppContext);

  const [transactionDialogOpen, setTransactionDialogState] =
    React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState({});
  const [selectedAccount, setSelectedAccount] = React.useState({});

  const balanceResults = usePost(
    accountsConfig.apiDetails[0].backendPath,
    accountsConfig.apiDetails[0].cacheKey,
    accountsConfig.apiDetails[0].refreshInterval,
    accountsConfig.apiDetails[0].body,
    displayingMockedData,
  );

  const transactionResults = useGet(
    accountsConfig.apiDetails[1].backendPath,
    accountsConfig.apiDetails[1].cacheKey,
    accountsConfig.apiDetails[1].refreshInterval,
    displayingMockedData,
  );

  useEffect(() => {
    setSelectedAccount({});
    setSelectedTransaction({});
  }, [displayingMockedData]);

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

  const displayAccountPanel = (data) => (
    <AccountInfo
      data={data}
      setSelectedAccount={setSelectedAccount}
      selectedAccount={selectedAccount}
      apiData={accountsConfig.apiDetails}
      displayingApiData={displayingApiData}
    />
  );

  const displayTransactionPanel = (data) => (
    <TransactionInfo
      transactions={data}
      openTransactionDialog={openTransactionDialog}
      selectedAccount={selectedAccount}
      apiData={accountsConfig.apiDetails}
      displayingApiData={displayingApiData}
    />
  );

  const displayPanels = () => {
    if (displayingMockedData) {
      return (
        <div className='flex flex-wrap'>
          {displayAccountPanel(balanceMockData)}
          {displayTransactionPanel(transactionMockData)}
        </div>
      );
    } else if (balanceResults.isLoading || transactionResults.isLoading) {
      return (
        <div className='text-center pt-24'>
          <Spinner />
        </div>
      );
    } else if (balanceResults.isError || transactionResults.isError) {
      return (
        <div className='text-center pt-24' data-cy='errorMessage'>
          {
            'Error gathering information from API. Toggle on mocked data below to see example information'
          }
        </div>
      );
    } else {
      return (
        <div className='flex flex-wrap'>
          {displayAccountPanel(balanceResults?.data)}
          {displayTransactionPanel(transactionResults?.data)}
        </div>
      );
    }
  };

  return (
    <>
      {displayPanels()}
      <PaymentDialog />
      <TransactionJsonDialog
        open={transactionDialogOpen}
        setTransactionDialog={openTransactionDialog}
        transaction={selectedTransaction}
      />
      <WhatAPI
        toggleMockedData={toggleMockedData}
        config={accountsConfig}
        mockedDataEnabled={displayingMockedData}
        toggleApiData={toggleApiData}
        apiDataEnabled={displayingApiData}
      />
    </>
  );
};

export default AccountPage;
