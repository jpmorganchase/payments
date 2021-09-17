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
      <h2 className="text-2xl font-medium">Service status</h2>
      <div className='overflow-hidden '>
        {serviceStatusData && serviceStatusData.data ? (
          <StatusTable serviceStatusData={serviceStatusData.data} />
        ) : (
          <p> Loading</p>
        )}
      </div>
      {serviceStatusData && serviceStatusData.mocked && (
        <div className="absolute bottom-8 text-center left-1/2 w-72 -ml-36">
        <div className="text-xs mb-2">Show <span className="underline">mocked</span> data</div>
        <div className='bg-yellow-100 px-5 py-2 text-xs rounded-2xl border border-yellow-300 text-yellow-700 shadow-xl'>
          What APIs are being used on this page?
        </div>
        </div>
      )}
    </Layout>
  );
};

export default ServiceStatusPage;
