import React from 'react';
import StatusTable from './statusTable';
import Layout from '../../layout';

const ServiceStatusPage = () => {
  const [serviceStatusData, setStatusData] = React.useState(null);

  React.useEffect(() => {
    fetch('/api/serviceStatus')
      .then((res) => res.json())
      .then((data) => setStatusData(data));
  }, []);

  return (
    <Layout>
      <h2 className='text-2xl font-medium'>Service status</h2>
      <div className='overflow-hidden '>
        {serviceStatusData && serviceStatusData.data ? (
          <StatusTable serviceStatusData={serviceStatusData.data} />
        ) : (
          <p> Loading</p>
        )}
      </div>
    </Layout>
  );
};

export default ServiceStatusPage;
