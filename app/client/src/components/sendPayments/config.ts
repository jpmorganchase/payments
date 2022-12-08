import { EUAccountType, UKAccountType, USAccountType } from '../../types/accountTypes';

/* eslint-disable import/prefer-default-export */
type PaymentTypeObject = {
  accounts: USAccountType[] | EUAccountType[] | UKAccountType[],
  currency: 'USD' | 'EUR' | 'GBP'
};
type MapLike = Record<string, PaymentTypeObject>;

const USRTPAccounts: USAccountType[] = [{
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
  aba: '021000021',
},
];
const SEPARTPAccounts: EUAccountType[] = [{
  accountId: '6231400596',
  accountName: '',
  branchId: '',
  bankName: '',
  currency: {
    code: 'EUR',
    description: '',
    decimalLocation: 2,
    currencySequence: 0,
  },
  iban: 'DE88501108006231400596',
  bic: 'CHASDEFX',

}, {
  accountId: '0041287103',
  accountName: '',
  branchId: '',
  bankName: '',
  currency: {
    code: 'EUR',
    description: '',
    decimalLocation: 2,
    currencySequence: 0,
  },
  bic: 'CHASDEFX',
  iban: 'DE45501108000041287103',
},
{
  accountId: '0079601529',
  accountName: '',
  branchId: '',
  bankName: '',
  currency: {
    code: 'EUR',
    description: '',
    decimalLocation: 2,
    currencySequence: 0,
  },
  bic: 'CHASIE4L',
  iban: 'IE90CHAS93090379601529',
},
{
  accountId: '0079607496',
  accountName: '',
  branchId: '',
  bankName: '',
  currency: {
    code: 'EUR',
    description: '',
    decimalLocation: 2,
    currencySequence: 0,
  },
  bic: 'CHASIE4L',
  iban: 'IE98CHAS93090379607496',
},
];

const UKRTPAccounts: UKAccountType[] = [
  {
    accountId: '0040025916',
    accountName: '',
    branchId: '',
    bankName: '',
    currency: {
      code: 'GBP',
      description: '',
      decimalLocation: 2,
      currencySequence: 0,
    },
    bic: 'CHASGB2L',
  },
  {
    accountId: '0022610202',
    accountName: '',
    branchId: '',
    bankName: '',
    currency: {
      code: 'GBP',
      description: '',
      decimalLocation: 2,
      currencySequence: 0,
    },
    bic: 'CHASGB2L',
  },
];

export const paymentTypesConfiguration: MapLike = {
  'US RTP': {
    accounts: USRTPAccounts,
    currency: 'USD',
  },
  'EU RTP (SEPA)': {
    accounts: SEPARTPAccounts,
    currency: 'EUR',
  },
  'UK RTP': {
    accounts: UKRTPAccounts,
    currency: 'GBP',
  },
};
