import { AccountType, CurrencyType } from './accountTypes';

export interface TransactionDataType {
  data: TransactionType[];
}

export interface TransactionType {
  account: AccountType;
  asOfDateTime: string;
  valueDateTime: string;
  asOfDate: string;
  valueDate: string;
  recordTimestamp: string;
  lastUpdate: null;
  receivedTimestamp: string;
  productGroup: {
    groupCode: string,
    groupDescription: string,
    wire: boolean
  },
  debitCreditCode: 'CREDIT' | 'DEBIT';
  baiType: BaiType;
  ddaTxnCode: string;
  originalTransactionCode: null | string;
  fundsTypeCode: string;
  currency: CurrencyType;
  amount: number;
  immediateAvailable: number;
  day1Available: number;
  day2Available: number;
  day2PlusAvailable: null | number;
  day3PlusAvailable: number;
  bankReferenceSearchable: {
    standardValue?: string,
    searchValue?: string
  },
  customerReferenceSearchable: {
    standardValue?: string,
    searchValue?: string
  },
  wireReferenceSearchable: null | string;
  repairCode?: string;
  reversal: boolean;
  override: boolean;
  transactionStatus: string;
  shortDescription: string;
  wireType: string;
  checkNumber: number;
  lockboxSequenceCode: string;
  lockboxItems: number;
  lockboxNumber: string;
  lockboxDepositDate: null;
  lockboxDepositTime: null;
  narrativeText: {
    'YOUR REF    '?: string,
    'REMARK      '?: string,
    'VAL DATE    '?: string
  },
  narrativeTypeCode: string;
  addenda?: any[] | null;
  floatSpreadCode: string;
  sepaDetailsXml: null;
  postCode: string;
  supplementalTextSet: any;
  supplementalTextRecordList: null;
  supplementalText: null;
  thirdPartyBank: boolean;
  achBatchItems: null;
  sepaType: boolean;
  transactionId: string;
  loggedAt: string;
}

export interface BaiType {
  typeCode: string;
  summaryTypeCode: string;
  description: string;
  shortDescription: string;
  groupCode: string;
  groupDescription: string;
  productGroupCode: 'MISC' | 'WIRE';
  btrsTypeCode: string;
  germanTypeCode: string;
  swiftTypeCode: string;
}
