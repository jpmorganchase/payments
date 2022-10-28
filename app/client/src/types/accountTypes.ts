export type AccountListType = {
  accountList: AccountType[]
};

export type AccountType = {
  accountId: string,
  accountName: string,
  branchId: string,
  bankId: string,
  bankName: string,
  currency : CurrencyType
  errorCode: string | number,
  balanceList: BalanceListType[]
};

export type CurrencyType = {
  code: string,
  description: string
};
type BalanceListType = {
  asOfDate : string,
  recordTimestamp : string,
  openingAvailableAmount: number
};
