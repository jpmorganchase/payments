import PropTypes from 'prop-types';
import React from 'react';
import { isEmptyObject } from '../utils';
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
      {isEmptyObject(pacmanData) ? (
        <p>There are no outages currently reported</p>
      ) : (
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
            {pacmanData.outageEventDetailsList &&
              pacmanData.outageEventDetailsList.map((outage, key) => (
                <tr key={key}>
                  <TableItem text={outage.description} />
                  <TableItem
                    text={outage.impactedProducts
                      .map(function (product) {
                        return product['productName'];
                      })
                      .join(', ')}
                  />
                  <TableItem text={outage.status} status={true} />
                  <TableItem text={outage.type} />
                  <TableItem text={outage.startDatetime} />
                  <TableItem text={outage.endDatetime} />

                  <td className='px-4 py-2 whitespace-nowrap text-right text-sm font-medium'>
                    <div className='text-indigo-600 hover:text-indigo-900'>
                      Set reminder
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
};

StatusTable.propTypes = {
  pacmanData: PropTypes.shape({
    outageEventDetailsList: PropTypes.arrayOf(
      PropTypes.shape({
        status: PropTypes.string,
        type: PropTypes.string,
        startDatetime: PropTypes.string,
        endDatetime: PropTypes.string,
        impactedProducts: PropTypes.arrayOf(
          PropTypes.shape({
            productName: PropTypes.string,
          }),
        ),
      }),
    ),
  }),
};

export default StatusTable;
