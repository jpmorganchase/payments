import PropTypes from 'prop-types';
import React from 'react';
import { isEmptyObject, formatDate } from '../../../utils';
import TableItem from './tableItem';
const tableHeaders = [
  'Description',
  'API',
  'Status',
  'type',
  'start date',
  'end date',
  '',
];

const renderErrorMessage = (message) => (
  <div className='text-center pt-24'>{message}</div>
);

const StatusTable = ({ serviceStatusData }) => {
  return (
    <>
      {isEmptyObject(serviceStatusData.data) ? (
        renderErrorMessage(
          'There are no upcoming outages. Want to know what this data looks like? Toggle on mocked data below.',
        )
      ) : (
        <table className='min-w-full text-xs 2xl:text-lg border-b border-gray-200 mb-6'>
          <thead className='border-b-2'>
            <tr>
              {tableHeaders &&
                tableHeaders.map((header, index) => (
                  <th
                    scope='col'
                    className='py-2 text-left font-medium text-gray-500 uppercase'
                    key={index}
                  >
                    {header}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {serviceStatusData.data.outageEventDetailsList &&
              serviceStatusData.data.outageEventDetailsList.map(
                (outage, key) => (
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
                    <TableItem
                      text={formatDate(new Date(outage.endDatetime))}
                    />

                    <td className='whitespace-nowrap'>
                      <span className='material-icons align-middle block w-full text-center cursor-pointer'>
                        more_horiz
                      </span>
                    </td>
                  </tr>
                ),
              )}
          </tbody>
        </table>
      )}
    </>
  );
};

StatusTable.propTypes = {
  serviceStatusData: PropTypes.shape({
    data: PropTypes.shape({
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
  }),
};

export default StatusTable;
