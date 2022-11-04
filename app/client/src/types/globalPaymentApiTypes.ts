export type RTPMessage = {
  requesedExecutionDate: string,
  paymentIdentifiers: {
    endToEndId: string,
  },
  paymentCurrency: string,
  paymentAmount: number,
  debtor: {
    debtorAccount: {
      debtorAccountId: string
    },
  }
  debtorAgent: AgentType,
  creditorAgent: AgentType,
  creditor: {
    creditorAccount: {
      creditorAccountId: string
    },
  },
  transferType : string,
};

type AgentType = {
  financialInstitutionId: {
    clearingSystemId: string
  }
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
