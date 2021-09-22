import React from 'react';
import StatusTable from './statusTable';
import Layout from '../../layout';
import WhatAPI from '../../whatAPI';

const mockedData = require('./uf-service-status.json');

const config = {
  apiDetails: [
    {
      name: 'Platform Availability Communication Manangement',
    },
  ],
};
const ServiceStatusPage = () => {
  const [serviceStatusData, setStatusData] = React.useState(null);
  const [displayingMockedData, setDisplayingMockedData] = React.useState(false);

  const toggleMockedData = () => {
    setDisplayingMockedData(!displayingMockedData);
  };

  React.useEffect(() => {
    fetch('/api/serviceStatus')
      .then((res) => res.json())
      .then((data) => setStatusData(data));
  }, []);

  const displayTable = () => {
    if (displayingMockedData) {
      return <StatusTable serviceStatusData={{ data: mockedData }} />;
    } else if (serviceStatusData) {
      return <StatusTable serviceStatusData={serviceStatusData} />;
    }
    return <p> Loading</p>;
  };
  return (
    <Layout>
      <h2 className='text-2xl font-medium'>Service status</h2>
      <div className='overflow-hidden '>{displayTable()}</div>
      <WhatAPI toggleMockedData={toggleMockedData} config={config} />
    </Layout>
  );
};

export default ServiceStatusPage;
