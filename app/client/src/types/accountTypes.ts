export type BalanceDataType = {
  accountList: AccountType[]
};
export type AccountType = {
  accountId: string,
  accountName?: string,
  branchId?: string,
  bankId?: string,
  bankName?: string,
  currency: CurrencyType
  errorCode?: string | number,
  balanceList?: BalanceListType[],
};

export interface USAccountType extends AccountType {
  aba: string,
}
export interface EUAccountType extends AccountType {
  bic:'CHASGB2L' | 'CHASINBX' | 'CHASAU2X' | 'CHASSGSG' | 'CHASUS33' | 'CHASMYKX' | 'CHASHKHH' | 'CHASBRSP' | 'CHASDEFX' |
  'CHASLULX' | 'CHASNL2X' | 'CHASIE4L' | 'CHASMXMX' | 'CHASCATT' | 'CHASIDJX' | 'CHASUS33MCY' | 'CHASDEFXONX'
}

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
