import React from 'react';
import Layout from '../../layout';
import AccountInfo from './accountInfo/index';
import TransactionInfo from './transactionInfo/index';

const AccountPage = () => {
  const [transactionData, setTransactionData] = React.useState(null);
  const [balanceData, setBalanceData] = React.useState(null);

  React.useEffect(() => {
    fetch('/api/accounts/transactions')
      .then((res) => res.json())
      .then((data) => setTransactionData(data));
    fetch('/api/accounts/balances')
      .then((res) => res.json())
      .then((data) => setBalanceData(data));
  }, []);

  React.useEffect(() => {
    console.log(transactionData);
  }, [transactionData, setTransactionData]);

  React.useEffect(() => {
    console.log(balanceData);
  }, [balanceData, setBalanceData]);

  return <Layout>
            <div className="flex -m-8">
              <AccountInfo />
              <TransactionInfo />
            </div>
  </Layout>
};

export default AccountPage;
