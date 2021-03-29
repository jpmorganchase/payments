/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import StatusChecker from './api/statusChecker';
import Sidebar from './components/sidebar';
import Header from './components/header';
import StatusTable from './components/statusTable';

const App = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [apiStatus, setApiStatus] = useState([]);

  useEffect(() => {
    StatusChecker.fetchApiStatus()
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setApiStatus(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        },
      );
  }, []);

  console.log(error);
  console.log(isLoaded);
  console.log(apiStatus);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <div className='flex flex-col w-full'>
        <Header />
        <div className='flex flex-shrink-0 flex-col'>
          <div className='flex relative items-center px-8 h-12'>
            <span className='text-2xl tracking-wide'>API Status</span>
          </div>
        </div>
        <div className='flex w-full p-8 flex-col'>
          <StatusTable />
        </div>
      </div>
    </div>
  );
};

export default App;
