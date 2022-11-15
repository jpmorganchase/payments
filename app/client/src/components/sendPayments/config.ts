/* eslint-disable import/prefer-default-export */
type PaymentsConfig = {
  mockedSessionStorageKey: string,
  sessionStorageKey: string
};

export const paymentsConfig : PaymentsConfig = {
  mockedSessionStorageKey: 'mockedPreviousTransactions',
  sessionStorageKey: 'previousTransactions',
};
