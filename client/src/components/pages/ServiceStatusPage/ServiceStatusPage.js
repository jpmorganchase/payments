import React from 'react';
import StatusTable from './statusTable';
import Layout from '../../layout';

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
      {serviceStatusData && serviceStatusData.mocked && (
        <div className='rounded-3xl shadow-xl bg-yellow-300 bottom-5 border border-yellow-400 px-8 py-2 md:w-1/2 sm:4/6  absolute text-center'>
          Mock data for demo purposes. There are no upcoming outages!
        </div>
      )}
    </Layout>
  );
};

export default ServiceStatusPage;
