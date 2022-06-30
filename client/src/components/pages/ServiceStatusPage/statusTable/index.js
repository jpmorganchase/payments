import PropTypes from 'prop-types';
import React from 'react';
import { isEmptyObject } from '../../../utils';
import TableItem from './tableItem';
const tableHeaders = [
  'Participant ID',
  'Partcipant Name',
  'Status',
  'Clearing System',
];

const renderErrorMessage = (message) => (
  <div className='pt-24 text-center'>{message}</div>
);

const StatusTable = ({ serviceStatusData }) => {
  const bankStatus = serviceStatusData?.bankStatus;
  return (
    <>
      {isEmptyObject(bankStatus) ? (
        renderErrorMessage(
          'There are no upcoming outages. Want to know what this data looks like? Toggle on mocked data below.',
        )
      ) : !serviceStatusData || serviceStatusData.error ? (
        renderErrorMessage(
          'Error gathering information from API. Toggle on mocked data below to see example information',
        )
      ) : (
        <table className='mb-6 min-w-full border-b border-gray-200 text-xs'>
          <thead className='border-b-2'>
            <tr>
              {tableHeaders &&
                tableHeaders.map((header, index) => (
                  <th
                    scope='col'
                    className='py-2 text-left font-medium uppercase text-gray-500'
                    key={index}
                  >
                    {header}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 bg-white'>
            {bankStatus?.length > 0 &&
              bankStatus.map((outage, key) => (
                <tr key={key}>
                  <TableItem text={outage.participantId} />
                  <TableItem text={outage.participantName} />
                  <TableItem text={outage.status} status={true} />
                  <TableItem text={outage.clearingSystem} />
                </tr>
              ))}
          </tbody>
        </table>
        
      
      )}       
    </>
    )
    };

StatusTable.propTypes = {
  serviceStatusData: PropTypes.shape({
    bankStatus: PropTypes.arrayOf(
      PropTypes.shape({
        clearingSystem: PropTypes.string,
        participantId: PropTypes.string,
        participantName: PropTypes.string,
        status: PropTypes.string,
      }),
    ),
    error: PropTypes.object,
  }),
};

export default StatusTable;
