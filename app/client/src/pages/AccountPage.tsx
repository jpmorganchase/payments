import React, { useEffect } from 'react';
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
import { AccountType, BalanceDataType } from '../types/accountTypes';
import { TransactionDataType, TransactionType } from '../types/transactionTypes';

const balanceMockData: BalanceDataType = balanceMockDataUntyped as BalanceDataType;
const transactionMockData: TransactionDataType = transactionMockDataUntyped as TransactionDataType;

function AccountPage() {
  const { accountsConfig } = config;

  const {
    displayingMockedData,
    displayingApiData,
  } = React.useContext(AppContext);

  const [transactionDialogOpen, setTransactionDialogState] = React.useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState<TransactionType | Record<string, never>>({});
  const [selectedAccount, setSelectedAccount] = React.useState<AccountType | Record<string, never>>({});

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

  const openTransactionDialog = (state:boolean, transaction: TransactionType | Record<string, never>) => {
    setTransactionDialogState(state);
    setSelectedTransaction(transaction);
  };

  const displayAccountPanel = (data: BalanceDataType) => (
    <AccountInfo
      data={data}
      apiData={accountsConfig.apiDetails}
      displayingApiData={displayingApiData}
      setSelectedAccount={setSelectedAccount}
      selectedAccount={selectedAccount}
    />
  );

  const displayTransactionPanel = (data : TransactionDataType) => (
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
        {displayAccountPanel(balanceResults?.data as BalanceDataType)}
        {displayTransactionPanel(transactionResults?.data as TransactionDataType)}
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
    </>
  );
}

export default AccountPage;
