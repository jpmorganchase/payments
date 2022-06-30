import React from 'react';
import StatusTable from './statusTable';
import WhatAPI from '../../whatAPI';
import usePost from '../../../hooks/usePost';
import Spinner from '../../spinner';

const mockedData = require('./uf-service-status.json');
const BASE_PATH =
  process.env.NODE_ENV === 'production'
    ? 'https://payments-showcase.vercel.app'
    : 'http://localhost:3000';
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
  const [displayingApiData, setDisplayingApiData] = React.useState(false);
  const response = usePost(
    config.apiDetails[0].path,
    config.apiDetails[0].cacheKey,
    config.apiDetails[0].refreshInterval,
  );
  const toggleMockedData = () => {
    setDisplayingMockedData(!displayingMockedData);
  };
  const toggleApiData = () => {
    setDisplayingApiData(!displayingApiData);
  };

  const apiData=config.apiDetails;
  

  const displayTable = () => {
    if (displayingMockedData) {
      if(displayingApiData){
        return <StatusTable 
          serviceStatusData={mockedData}
          />;
      }else{
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
    } else{
      if(displayingApiData){
        return <StatusTable 
          serviceStatusData={mockedData}
          apiData={config.apiDetails} />;
      }else{
        return <StatusTable serviceStatusData={response.data} />;
      }
    }
  };

  return (
    <div className='relative p-8'>
      <h2 className='text-2xl font-medium mb-4'>Service status</h2>

      {!displayingApiData ? (
        <></>
        ):(<div className='absolute bg-black bg-opacity-80 p-8 rounded-lg text-white flex-col h-full w-full'>
        <h1 className='text-sm'>{apiData[0].name} API</h1>
        <h3 className='text-xs mb-4'>{apiData[0].path}</h3>
        <h3 className='text-xs'>This API returns a list of current outages within JP
          Morgan external APIs. If no outages are returned a message is displayed for
          the user.</h3>
      </div>
      )}
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
