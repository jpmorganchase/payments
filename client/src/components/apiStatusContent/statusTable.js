/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
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

const StatusTable = ({ pacmanData }) => {
  
  return (
      <>
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
            {pacmanData &&
              pacmanData.outageEventDetailsList &&
              pacmanData.outageEventDetailsList.map((eventDetail, key) => (
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
                    };

export default StatusTable;
