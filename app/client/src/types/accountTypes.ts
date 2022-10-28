export type AccountListType = {
  accountList: AccountType[]
};

export type AccountType = {
  accountId: string,
  accountName: string,
  branchId: string,
  bankId: string,
  bankName: string,
  currency : {
    code: string,
    description: string
  },
  errorCode: string | number,
  balanceList: BalanceListType[]
};

type BalanceListType = {
  asOfDate : string,
  recordTimestamp : string,
  openingAvailableAmount: number
};
