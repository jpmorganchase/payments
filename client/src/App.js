import React from 'react';
import Sidebar from './components/sidebar';
import Header from './components/header';

const App = () => {
  const [transactionData, setTransactionData] = React.useState(null);
  const [balanceData, setBalanceData] = React.useState(null);

  React.useEffect(() => {
    fetch('/api/gatherTransactions')
      .then((res) => res.json())
      .then((data) => setTransactionData(data));
    fetch('/api/gatherBalance')
      .then((res) => res.json())
      .then((data) => setBalanceData(data));
  }, []);

  React.useEffect(() => {
    console.log(transactionData);
  }, [transactionData, setTransactionData]);

  React.useEffect(() => {
    console.log(balanceData);
  }, [balanceData, setBalanceData]);

  return (
    <div className='flex min-h-screen justify-center'>
      <Sidebar />
      <div className='flex flex-col w-full'>
        <Header />
        <div className='flex w-full p-4 md:p-8 flex-col'></div>
      </div>
    </div>
  );
};

export default App;
