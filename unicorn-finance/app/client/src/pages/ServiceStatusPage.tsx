import React, { useEffect } from 'react';
import StatusTable from '../components/statusTable';
import Spinner from '../components/spinner';
import useGet from '../hooks/useGet';
import { AppContext } from '../context/AppContext';
import mockedDataUntyped from '../mockedJson/uf-service-status.json';

import { config } from '../config';
import { ServiceStatusDataType } from '../types/serviceStatusTypes';

const mockedData: ServiceStatusDataType = mockedDataUntyped as ServiceStatusDataType;

function ServiceStatusPage() {
  const [data, setData] = React.useState<ServiceStatusDataType>(mockedData);
  const { statusConfig } = config;
  const {
    displayingMockedData,
  } = React.useContext(AppContext);
  const response = useGet(
    statusConfig.apiDetails[0].backendPath,
    statusConfig.apiDetails[0].cacheKey,
    statusConfig.apiDetails[0].refreshInterval,
    displayingMockedData,
  );

  useEffect(() => {
    if (displayingMockedData) {
      setData(mockedData);
    } else {
      setData(response?.data as ServiceStatusDataType);
    }
  }, [displayingMockedData, response?.data]);

  const displayTable = () => {
    if (
      !displayingMockedData
      && (!response || response.status === 'loading' || response.isFetching)
    ) {
      return (
        <div className="text-center pt-24">
          <Spinner />
        </div>
      );
    }
    return (
      <StatusTable
        serviceStatusData={data}
      />
    );
  };

  return (
    <div className="relative p-8">
      <h2 className="text-2xl font-medium mb-4">Service status</h2>
      <div className="overflow-auto ">{displayTable()}</div>
    </div>
  );
}

export default ServiceStatusPage;
