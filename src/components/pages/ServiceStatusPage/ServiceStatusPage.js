import React from 'react';
import StatusTable from './statusTable';
import WhatAPI from '../../whatAPI';
import usePost from '../../../hooks/usePost';
import Spinner from '../../spinner';

const mockedData = require('./uf-service-status.json');
const BASE_PATH = 'http://localhost:3000';
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
  const [displayingMockedData, setDisplayingMockedData] = React.useState(true);
  const [displayingApiData, setDisplayingApiData] = React.useState(false);
>>>>>>> 8089d7a (Added What Api functionality)
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
  
  const displayTable = () => {
    if (displayingMockedData) {
      if(displayingApiData){
        return <StatusTable 
          serviceStatusData={mockedData}
          apiData={config.apiDetails}
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
          serviceStatusData={response.data}
          apiData={config.apiDetails} />;
      }else{
        return <StatusTable serviceStatusData={response.data} />;
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
