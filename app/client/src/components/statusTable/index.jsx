import PropTypes from 'prop-types';
import React from 'react';
import { isEmptyObject } from '../utils';
import TableItem from './tableItem';

const tableHeaders = [
  'Participant ID',
  'Partcipant Name',
  'Status',
  'Clearing System',
];

const renderErrorMessage = (message) => (
  <div className="pt-24 text-center" data-cy="errorMessage">
    {message}
  </div>
);

function StatusTable({
  serviceStatusData,
  apiData = [],
  displayingApiData,
}) {
  const bankStatus = serviceStatusData?.bankStatus;
  return (
    <div className="relative">
      {!displayingApiData ? (
        <></>
      ) : isEmptyObject(bankStatus)
        || !serviceStatusData
        || serviceStatusData.errors ? (
          <></>
        ) : (
          <div className="absolute bg-black bg-opacity-80 p-8 rounded-lg text-white flex-col h-full w-full">
            <h1 className="text-sm">
              {apiData[0].name}
              {' '}
              API
            </h1>
            <h3 className="text-xs mb-4">{apiData[0].path}</h3>
            <h3 className="text-xs">{apiData[0].description}</h3>
          </div>
        )}

      {isEmptyObject(bankStatus) ? (
        renderErrorMessage(
          'There are no upcoming outages. Want to know what this data looks like? Toggle on mocked data below.',
        )
      ) : !serviceStatusData || serviceStatusData.errors ? (
        renderErrorMessage(
          'Error gathering information from API. Toggle on mocked data below to see example information',
        )
      ) : (
        <table className="mb-6 min-w-full border-b border-gray-200 text-xs">
          <thead className="border-b-2">
            <tr>
              {tableHeaders
                && tableHeaders.map((header, index) => (
                  <th
                    scope="col"
                    className="py-2 text-left font-medium uppercase text-gray-500"
                    key={index}
                  >
                    {header}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {bankStatus?.length > 0
              && bankStatus.map((outage, key) => (
                <tr key={key}>
                  <TableItem text={outage.participantId} />
                  <TableItem text={outage.participantName} />
                  <TableItem text={outage.status} status />
                  <TableItem text={outage.clearingSystem} />
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

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
    errors: PropTypes.array,
  }),
  apiData: PropTypes.arrayOf(PropTypes.object),
  displayingApiData: PropTypes.bool,
};

export default StatusTable;
