import React, { useEffect } from 'react';
import StatusTable from './statusTable';
import WhatAPI from '../../whatAPI';
import usePost from '../../../hooks/usePost';
import Spinner from '../../spinner';

const mockedData = require('./uf-service-status.json');
const config = {
  apiDetails: [
    {
      name: 'Platform Availability Communication Manangement',
      backendPath: `/api/server?path=status`,
      cacheKey: 'serviceStatus',
      refreshInterval: 1800000,
    },
  ],
};
const ServiceStatusPage = () => {
  const [displayingApiData, setDisplayingApiData] = React.useState(false);
  const [displayingMockedData, setDisplayingMockedData] = React.useState(true);

  const [data, setData] = React.useState([]);

  const response = usePost(
    config.apiDetails[0].backendPath,
    config.apiDetails[0].cacheKey,
    config.apiDetails[0].refreshInterval,
  );
  const toggleMockedData = () => {
    setDisplayingMockedData(!displayingMockedData);
  };
  const toggleApiData = () => {
    setDisplayingApiData(!displayingApiData);
  };

  useEffect(() => {
    if (displayingMockedData) {
      setData(mockedData);
    } else {
      setData(response?.data);
    }
  }, [displayingMockedData]);

  const displayTable = () => {
    if (displayingMockedData) {
      if (displayingApiData) {
        return (
          <StatusTable serviceStatusData={data} apiData={config.apiDetails} />
        );
      } else {
        return <StatusTable serviceStatusData={mockedData} />;
      }
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
      if (displayingApiData) {
        return (
          <StatusTable serviceStatusData={data} apiData={config.apiDetails} />
        );
      } else {
        return <StatusTable serviceStatusData={data} />;
      }
    }
  };

  return (
    <div className='relative p-8'>
      <h2 className='text-2xl font-medium mb-4'>Service status</h2>
      <div className='overflow-auto '>{displayTable()}</div>

      <WhatAPI
        toggleMockedData={toggleMockedData}
        config={config}
        mockedDataEnabled={displayingMockedData}
        toggleApiData={toggleApiData}
        apiDataEnabled={displayingApiData}
      />
    </div>
  );
};

export default ServiceStatusPage;
