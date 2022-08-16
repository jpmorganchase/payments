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
      backendPath: `/api/tsapi/v1/participants`,
      cacheKey: 'serviceStatus',
      path: 'https://apigatewayqaf.jpmorgan.com/tsapi/v1/participants',
      refreshInterval: 1800000,
      description:
        'This API returns a list of current outages within JP Morgan external APIs. If no outages are returned a message is displayed for the user.',
    },
  ],
};
const ServiceStatusPage = () => {
  const [displayingApiData, setDisplayingApiData] = React.useState(false);
  const [displayingMockedData, setDisplayingMockedData] = React.useState(true);
  const [data, setData] = React.useState(mockedData);

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
    if (
      !displayingMockedData &&
      (!response || response.status === 'loading' || response.isFetching)
    ) {
      return (
        <div className='text-center pt-24'>
          <Spinner />
        </div>
      );
    } else {
      return (
        <StatusTable
          serviceStatusData={data}
          apiData={config.apiDetails}
          displayingApiData={displayingApiData}
        />
      );
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
