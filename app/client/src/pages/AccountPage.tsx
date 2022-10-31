import React, { useEffect } from 'react';
import WhatAPI from '../components/whatApi';
import AccountInfo from '../components/accountInformationPanel/index';
import TransactionInfo from '../components/transactionInformationPanel/index';
import usePost from '../hooks/usePost';
import TransactionJsonDialog from '../components/transactionInformationPanel/TransactionJsonDialog';
import Spinner from '../components/spinner';
import useGet from '../hooks/useGet';
import { AppContext } from '../AppContext';
import balanceMockDataUntyped from '../mockedJson/uf-balances.json';
import transactionMockDataUntyped from '../mockedJson/uf-transactions.json';
import { config } from '../config';
import { BalanceDataType } from '../types/accountTypes';
import { TransactionDataType } from '../types/transactionTypes';

const balanceMockData: BalanceDataType = balanceMockDataUntyped as BalanceDataType;
const transactionMockData: TransactionDataType = transactionMockDataUntyped as TransactionDataType;

function AccountPage() {
  const { accountsConfig } = config;

  const {
    displayingMockedData,
    setDisplayingMockedData,
    displayingApiData,
    setDisplayingApiData,
  } = React.useContext(AppContext);

  const [transactionDialogOpen, setTransactionDialogState] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState({});
  const [selectedAccount, setSelectedAccount] = React.useState({});

  const balanceResults = usePost(
    accountsConfig.apiDetails[0].backendPath,
    accountsConfig.apiDetails[0].cacheKey,
    accountsConfig.apiDetails[0].refreshInterval,
    JSON.stringify(accountsConfig.apiDetails[0].body),
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
        <div className="flex flex-wrap">
          {displayAccountPanel(balanceMockData)}
          {displayTransactionPanel(transactionMockData)}
        </div>
      );
    } if (balanceResults.isLoading || transactionResults.isLoading) {
      return (
        <div className="text-center pt-24">
          <Spinner />
        </div>
      );
    } if (balanceResults.isError || transactionResults.isError) {
      return (
        <div className="text-center pt-24" data-cy="errorMessage">
          Error gathering information from API. Toggle on mocked data below to see example information
        </div>
      );
    }
    return (
      <div className="flex flex-wrap">
        {displayAccountPanel(balanceResults?.data)}
        {displayTransactionPanel(transactionResults?.data)}
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
        config={accountsConfig}
        mockedDataEnabled={displayingMockedData}
        toggleApiData={toggleApiData}
        apiDataEnabled={displayingApiData}
      />
    </>
  );
}

export default AccountPage;
