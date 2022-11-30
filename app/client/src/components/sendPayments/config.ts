import { AccountType } from '../../types/accountTypes';

/* eslint-disable import/prefer-default-export */
type PaymentTypeObject = {
  accounts: AccountType[]
};
type MapLike = Record<string, PaymentTypeObject>;

const USRTPAccounts: AccountType[] = [{
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
const SEPARTPAccounts: AccountType[] = [{
  accountId: '000000010900009',
  accountName: 'RAPID AUDIO LLC HELLO',
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
},
];

export const paymentTypesConfiguration: MapLike = {
  'US RTP': {
    accounts: USRTPAccounts,
  },
  'EU RTP (SEPA)': {
    accounts: SEPARTPAccounts,
  },
};
