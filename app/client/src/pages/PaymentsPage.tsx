import React from 'react';
import SendPaymentForm from '../components/sendPayments/SendPaymentForm';
import { FormStatus } from '../types/globalPaymentApiTypes';
import { AccountType } from '../types/accountTypes';

const paymentsAccounts: AccountType[] = [{
  accountId: '000000010900009',
  accountName: 'TEST ACCOUNT NAME',
  branchId: '',
  bankId: '02100002',
  bankName: 'JPMORGAN CHASE',
  currency: {
    code: 'USD',
    currencySequence: 0,
    decimalLocation: 2,
    description: 'US DOLLAR',
  },
},
{
  accountId: '000000010962009',
  accountName: 'TEST ACCOUNT NAME',
  branchId: '',
  bankId: '02100002',
  bankName: 'JPMORGAN CHASE',
  currency: {
    code: 'USD',
    currencySequence: 0,
    decimalLocation: 2,
    description: 'US DOLLAR',
  },
},
{
  accountId: '000000011153244',
  accountName: 'TEST ACCOUNT NAME',
  branchId: '',
  bankId: '02100002',
  bankName: 'JPMORGAN CHASE',
  currency: {
    code: 'USD',
    currencySequence: 0,
    decimalLocation: 2,
    description: 'US DOLLAR',
  },
}, {
  accountId: '000000010975001',
  accountName: 'TEST ACCOUNT NAME',
  branchId: '',
  bankId: '02100002',
  bankName: 'JPMORGAN CHASE',
  currency: {
    code: 'USD',
    currencySequence: 0,
    decimalLocation: 2,
    description: 'US DOLLAR',
  },
},
{
  accountId: '000000011315421',
  accountName: '',
  branchId: '',
  bankId: '02100002',
  bankName: 'JPMORGAN CHASE',
  currency: {
    code: 'USD',
    currencySequence: 0,
    decimalLocation: 2,
    description: 'US DOLLAR',
  },
},
];
function PaymentsPage() {
  const [formStatus, setFormStatus] = React.useState<FormStatus>(FormStatus.NEW);
  return (
    <div className="lg:min-h-screen flex flex-col p-8">
      <h2 className="text-2xl font-medium mb-4">Send a Payment</h2>
      <div className="flex flex-wrap flex-grow">
        <SendPaymentForm accountDetails={paymentsAccounts} formStatus={formStatus} setFormStatus={setFormStatus} />
      </div>
    </div>
  );
}

export default PaymentsPage;
