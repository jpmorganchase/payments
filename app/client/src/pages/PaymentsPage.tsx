import React from 'react';
import { AppContext } from '../AppContext';
import MakePaymentForm from '../components/makePayments/MakePaymentForm';
import { FormStatus } from '../types/globalPaymentApiTypes';
import { config } from '../config';
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
  const { displayingApiData } = React.useContext(AppContext);
  const { paymentConfig } = config;
  const [formStatus, setFormStatus] = React.useState<FormStatus>(FormStatus.NEW);
  return (
    <div className="relative p-8">
      <h2 className="text-2xl font-medium mb-4">Make a Payment</h2>
      <MakePaymentForm accountDetails={paymentsAccounts} formStatus={formStatus} setFormStatus={setFormStatus} />
    </div>
  );
}

export default PaymentsPage;
