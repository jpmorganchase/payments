import PropTypes from 'prop-types';
import React from 'react';
import { isEmptyObject, formatDate } from '../utils';
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

const renderErrorMessage = (message) => (
  <p className='text-red-500'>{message}</p>
);
const StatusTable = ({ serviceStatusData }) => {
  return (
    <>
      {isEmptyObject(serviceStatusData) ? (
        renderErrorMessage('There are no outages currently reported')
      ) : serviceStatusData.errorString ? (
        renderErrorMessage(
          'Error trying to connect to Platform Availability Communication Management API',
        )
      ) : (
        <table className='w-full border-b border-gray-200 '>
          <thead className='bg-gray-100'>
            <tr>
              {tableHeaders &&
                tableHeaders.map((header, index) => (
                  <th
                    scope='col'
                    className='px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'
                    key={index}
                  >
                    {header}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {serviceStatusData.outageEventDetailsList &&
              serviceStatusData.outageEventDetailsList.map((outage, key) => (
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
                  <TableItem
                    text={formatDate(new Date(outage.startDatetime))}
                  />
                  <TableItem text={formatDate(new Date(outage.endDatetime))} />

                  <td className='px-4 py-2 whitespace-nowrap text-center text-sm font-medium'>
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
  serviceStatusData: PropTypes.shape({
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
    errorString: PropTypes.string,
  }),
};

export default StatusTable;
