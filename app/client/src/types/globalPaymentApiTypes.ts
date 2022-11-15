export type RTPMessage = {
  payments: {
    paymentType: string,
    requestedExecutionDate: string,
    paymentIdentifiers: {
      endToEndId: string,
    },
    paymentCurrency: string,
    paymentAmount: number,
    debtor: {
      debtorName: string,
      debtorAccount: PaymentAccount,
    }
    debtorAgent: AgentType,
    creditorAgent: AgentType,
    creditor: {
      creditorName: string,
      creditorAccount: PaymentAccount
    },
    transferType : string,
  }
};
export type PaymentsResponse = {
  paymentInitiationResponse? : APISuccessMessage,
  errors? : {
    errorDetails: Error[]
  }
};

type AgentType = {
  financialInstitutionId: {
    clearingSystemId: {
      id?: string,
      idType?: string
    }
  }
};

export type PaymentAccount = {
  accountId: string,
  currency: string
};

export type APISuccessMessage = {
  endToEndId: string,
  firmRootId: string
};

export type APIErrorMessage = {
  errors: {
    endToEndId: string,
    errorDetails: Error[]
  }
};

export type Error = {
  errorCode: string,
  errorDescription: string,
  ruleDefinition?: string
};

export type PaymentStatusResponseType = {
  paymentStatus?: {
    createDateTime: string,
    status: 'PENDING' | 'REJECTED' | 'COMPLETED' | 'RETURNED',
  },
  exception?: Error[],
  identifiers: APISuccessMessage
};
export type FormValuesType = {
  debtorAccount: string,
  creditorAccount: string,
  amount: number,
  date: Date,
};

export enum FormStatus {
  'ERROR', 'LOADING', 'SUCCESS', 'NEW',
}
