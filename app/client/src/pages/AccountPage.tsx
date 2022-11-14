import React, { useEffect } from 'react';
import AccountInfo from '../components/accountInformationPanel/index';
import TransactionInfo from '../components/transactionInformationPanel/index';
import usePost from '../hooks/usePost';
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
    setSelectedAccount,
  } = React.useContext(AppContext);

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
  }, [displayingMockedData, setSelectedAccount]);

  const displayAccountPanel = (data: BalanceDataType) => (
    <AccountInfo
      data={data}
    />
  );

  const displayTransactionPanel = (data : TransactionDataType) => (
    <TransactionInfo
      transactions={data}
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
        {displayAccountPanel(balanceResults?.data as BalanceDataType)}
        {displayTransactionPanel(transactionResults?.data as TransactionDataType)}
      </div>
    );
  };

  return (
    <>
      {displayPanels()}
    </>
  );
}

export default AccountPage;
