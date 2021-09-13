import React from 'react';
import StatusTable from './statusTable';

const ServiceStatusPage = () => {
  const [serviceStatusData, setStatusData] = React.useState(null);

  React.useEffect(() => {
    fetch('/api/gatherServiceStatus')
      .then((res) => res.json())
      .then((data) => setStatusData(data));
  }, []);

  return (
    <Layout>
      <div className='table-overflow overflow-x-auto'>
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
