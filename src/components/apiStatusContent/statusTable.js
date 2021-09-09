import React, { useEffect, useState } from 'react';
import StatusChecker from '../../api/statusChecker';
import mockedData from './mockedData.json';
import TableItem from './tableItem';
const tableHeaders = [
  'Description',
  'API',
  'Status',
  'type',
  'start date',
  'end date',
  'notifications',
];

const StatusTable = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [apiStatus, setApiStatus] = useState(mockedData);
  useEffect(() => {
    StatusChecker.fetchApiStatus()
      .then((res) => res.json())
      .then(
        (result) => {
          setApiStatus(result);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        },
      );
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {/* Added until we get correct credentials for developer */}
        {error && (
          <div className='text-red-600 font-bold pb-4'>Error: {error}</div>
        )}
        <table className='min-w-full overflow-hidden border-b border-gray-200 '>
          <thead className='bg-gray-100'>
            <tr>
              {tableHeaders &&
                tableHeaders.map((header, index) => (
                  <th
                    scope='col'
                    className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    key={index}
                  >
                    {header}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {apiStatus &&
              apiStatus.outageEventDetailsList &&
              apiStatus.outageEventDetailsList.map((eventDetail, key) => (
                <tr key={key}>
                  <TableItem text={eventDetail.description} />
                  <TableItem
                    text={eventDetail.impactedProducts
                      .map(function (product) {
                        return product['productName'];
                      })
                      .join(', ')}
                  />
                  <TableItem text={eventDetail.status} status={true} />
                  <TableItem text={eventDetail.type} />
                  <TableItem text={eventDetail.startDatetime} />
                  <TableItem text={eventDetail.endDatetime} />

                  <td className='px-4 py-2 whitespace-nowrap text-right text-sm font-medium'>
                    <div className='text-indigo-600 hover:text-indigo-900'>
                      Set reminder
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    );
  }
};

export default StatusTable;