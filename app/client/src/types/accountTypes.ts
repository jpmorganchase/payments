export type BalanceDataType = {
  accountList: AccountType[]
};
export type AccountType = {
  accountId: string,
  accountName: string,
  branchId: string,
  bankId?: string,
  bankName: string,
  currency : CurrencyType
  errorCode?: string | number,
  balanceList?: BalanceListType[],
  aba ?: string | number
};

export type CurrencyType = {
  code: string,
  description: string,
  decimalLocation?: number,
  currencySequence? : number
};
type BalanceListType = {
  asOfDate : string,
  openingAvailableAmount: number,
  recordTimestamp?:string,
  currentDay?: boolean,
  openingLedgerAmount?: number,
  endingAvailableAmount?: number,
  endingLedgerAmount?: number
};
