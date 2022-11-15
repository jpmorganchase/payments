import React from 'react';
import SendPaymentForm from '../components/sendPayments/SendPaymentForm';
import { FormStatus } from '../types/globalPaymentApiTypes';
import { AccountType } from '../types/accountTypes';
import PreviousPaymentsGrid from '../components/sendPayments/PreviousPaymentsGrid';

const paymentsAccounts: AccountType[] = [{
  accountId: '000000010900009',
  accountName: 'RAPID AUDIO LLC',
  bankId: '02100002',
  branchId: '',
  bankName: 'JPMORGAN CHASE BANK, N.A. - NEW YOR',
  currency: {
    code: 'USD',
    description: 'US DOLLAR',
    decimalLocation: 2,
    currencySequence: 0,
  },
  aba: '021000021',
},
{
  accountId: '000000010962009',
  accountName: 'MORRIS ELECTRIC CONTRACTING LLC',
  bankId: '02100002',
  branchId: '',
  bankName: 'JPMORGAN CHASE BANK, N.A. - NEW YOR',
  currency: {
    code: 'USD',
    description: 'US DOLLAR',
    decimalLocation: 2,
    currencySequence: 0,
  },
  aba: '021000021',
}, {
  accountId: '000000010975001',
  accountName: 'OFFICE 123 INC',
  bankId: '02100002',
  branchId: '',
  bankName: 'JPMORGAN CHASE BANK, N.A. - NEW YOR',
  currency: {
    code: 'USD',
    description: 'US DOLLAR',
    decimalLocation: 2,
    currencySequence: 0,
  },
  aba: '02100002',
},
];
function PaymentsPage() {
  const [formStatus, setFormStatus] = React.useState<FormStatus>(FormStatus.NEW);
  return (
    <div className="lg:min-h-screen flex p-8 gap-4 w-full flex-row">
      <div className="w-2/5">
        <h2 className="text-2xl font-medium mb-4">Send a Payment</h2>
        <SendPaymentForm accountDetails={paymentsAccounts} formStatus={formStatus} setFormStatus={setFormStatus} />
      </div>
      <div className="flex-grow gap-4">
        <PreviousPaymentsGrid />
      </div>
    </div>
  );
}

export default PaymentsPage;
