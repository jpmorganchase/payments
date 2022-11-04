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
      debtorAccount: PaymentAccount,
    }
    debtorAgent: AgentType,
    creditorAgent: AgentType,
    creditor: {
      creditorAccount: PaymentAccount
    },
    transferType : string,
  }
};

type AgentType = {
  financialInstitutionId: {
    clearingSystemId: {
      id?: string
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
    errorDetails: {
      errorCode: string,
      errorDescription: string,
      ruleDefinition: string
    }[]
  }
};
