import React from 'react';

const StatusTable = () => {
  return (
    <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
      <table className='min-w-full overflow-hidden border-b border-gray-200 '>
        <thead className='bg-gray-100'>
          <tr>
            <th
              scope='col'
              className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Description
            </th>
            <th
              scope='col'
              className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              API
            </th>
            <th
              scope='col'
              className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Status
            </th>
            <th
              scope='col'
              className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Start Date
            </th>
            <th
              scope='col'
              className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              End Date
            </th>
            <th scope='col' className='relative px-4 py-2'>
              <span className='material-icons'>notifications_active</span>
            </th>
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
    </div>
  );
};

export default StatusTable;
