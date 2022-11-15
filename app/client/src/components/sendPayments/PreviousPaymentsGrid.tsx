import React from 'react';
import { AppContext } from '../../context/AppContext';
import { PaymentStatusResponseType } from '../../types/globalPaymentApiTypes';

const headers: string[] = [
  'EndToEndId',
  'FirmRootId',
  'Status',
  'Create date/time',
  'Exception',
];

function PreviousPaymentsGrid() {
  const {
    displayingMockedData,
    setJsonDialogData,
  } = React.useContext(AppContext);
  let sessionStorageKey = 'previousMockedTransactions';
  if (!displayingMockedData) {
    sessionStorageKey = 'mockedTransactions';
  }
  const previousPayments: PaymentStatusResponseType[] = JSON.parse(sessionStorage.getItem(sessionStorageKey) || '[]') as PaymentStatusResponseType[];

  return (
    <>
      {(!previousPayments || previousPayments.length === 0) && <p>Make a payment to see previous payments</p>}
      {previousPayments && previousPayments.length > 0
    && (
      <table className="border-collapse table-auto w-full text-sm">
        <thead>
          <tr>{headers.map((header) => <th className="border-b font-medium p-4 pl-8 pt-0 pb-3  text-left">{header}</th>)}</tr>
        </thead>

        <tbody>
          {previousPayments && previousPayments.map((payment) => (
            <tr onClick={() => setJsonDialogData({ state: true, data: JSON.stringify(payment, undefined, 2) })}>
              <td className="border-b border-slate-100  p-4 pl-8 ">{payment.identifiers.endToEndId}</td>
              <td className="border-b border-slate-100  p-4 pl-8 ">{payment.identifiers.firmRootId}</td>
              <td className="border-b border-slate-100  p-4 pl-8 ">{payment.paymentStatus?.status ? payment.paymentStatus.status : ''}</td>
              <td className="border-b border-slate-100  p-4 pl-8 ">{payment.paymentStatus?.createDateTime ? payment.paymentStatus?.createDateTime : ''}</td>
              <td className="border-b border-slate-100  p-4 pl-8 ">{payment.exception ? `${payment.exception[0].errorCode} - ${payment.exception[0].errorDescription}` : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}

    </>
  );
}

export default PreviousPaymentsGrid;
