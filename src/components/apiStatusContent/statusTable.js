import React, { useEffect, useState } from 'react';
import StatusChecker from '../../api/statusChecker';
const tableHeaders = [
  'Description',
  'API',
  'Status',
  'start date',
  'end date',
  'notifications',
];

const StatusTable = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [apiStatus, setApiStatus] = useState([]);
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
        {error && <div className='text-red-600 font-bold'>Error: {error}</div>}
        {apiStatus && <p>{apiStatus}</p>}
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
            <tr>
              <td className='px-4 py-2 whitespace-nowrap'>Description here</td>
              <td className='px-4 py-2 whitespace-nowrap'>API Name here</td>
              <td className='px-4 py-2 whitespace-nowrap'>
                <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                  COMPLETE
                </span>
              </td>
              <td className='px-4 py-2 whitespace-nowrap text-sm text-gray-500'>
                Mar 4, 21 - 09:30AM
              </td>
              <td className='px-4 py-2 whitespace-nowrap text-sm text-gray-500'>
                Mar 4, 21 - 17:30PM
              </td>
              <td className='px-4 py-2 whitespace-nowrap text-right text-sm font-medium'>
                <div className='text-indigo-600 hover:text-indigo-900'>
                  Set reminder
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        </>
    );
  }
};

export default StatusTable;
