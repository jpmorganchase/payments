import React from 'react';
import StatusTable from './statusTable';
import WhatAPI from '../../whatAPI';
import usePost from '../../../hooks/usePost';
import Spinner from '../../spinner';

const mockedData = require('./uf-service-status.json');
const BASE_PATH =
  'https://8f270t8xgl.execute-api.us-east-1.amazonaws.com/staging/';
// process.env.NODE_ENV === 'production'
//   ? 'https://payments-showcase.vercel.app'
//   : 'http://localhost:3000';
const config = {
  apiDetails: [
    {
      name: 'Platform Availability Communication Manangement',
      path: `${BASE_PATH}/api/server?path=status`,
      cacheKey: 'serviceStatus',
      refreshInterval: 1800000,
    },
  ],
};
const ServiceStatusPage = () => {
  const [displayingMockedData, setDisplayingMockedData] = React.useState(false);
  const response = usePost(
    config.apiDetails[0].path,
    config.apiDetails[0].cacheKey,
    config.apiDetails[0].refreshInterval,
  );
  const toggleMockedData = () => {
    setDisplayingMockedData(!displayingMockedData);
  };

  const displayTable = () => {
    if (displayingMockedData) {
      return <StatusTable serviceStatusData={mockedData} />;
    } else if (
      !response ||
      response.status === 'loading' ||
      response.isFetching
    ) {
      return (
        <div className='text-center pt-24'>
          <Spinner />
        </div>
      );
    } else if (response.status === 'error') {
      return <div className='text-center pt-24'>{response.error.message}</div>;
    } else {
      return <StatusTable serviceStatusData={response.data} />;
    }
  };

  return (
    <div className='p-8'>
      <h2 className='text-2xl font-medium mb-4'>Service status</h2>
      <div className='overflow-auto '>{displayTable()}</div>
      <WhatAPI
        toggleMockedData={toggleMockedData}
        config={config}
        mockedDataEnabled={displayingMockedData}
      />
    </div>
  );
};

export default ServiceStatusPage;
