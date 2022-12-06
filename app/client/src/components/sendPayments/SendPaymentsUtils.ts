import { EUAccountType, USAccountType } from '../../types/accountTypes';
import {
  FormValuesType, PaymentStatusResponseType, GlobalPaymentRequest,
} from '../../types/globalPaymentApiTypes';
import { paymentTypesConfiguration } from './config';

export const patternTwoDigisAfterDot = /^\d+(\.\d{0,2})?$/;
export const today = new Date();
export const oneMonth = new Date(new Date(today).setDate(today.getDate() + 31))
  .toISOString()
  .split('T')[0];
export const capitalize = (str: string) => `${str[0].toUpperCase()}${str.slice(1)}`;

export const updateSessionStorageTransactions = (transaction: PaymentStatusResponseType, storageId: string) => {
  const previousTransactions: PaymentStatusResponseType[] = JSON.parse(sessionStorage.getItem(storageId) || '[]') as PaymentStatusResponseType[];
  previousTransactions.push(transaction);
  sessionStorage.setItem(storageId, JSON.stringify(previousTransactions));
};

function generateSepaBody(data: FormValuesType): GlobalPaymentRequest {
  const {
    date, amount, debtorAccount, creditorAccount, paymentType,
  } = data;
  const debtorAccountApi : EUAccountType = JSON.parse(debtorAccount) as EUAccountType;
  const creditorAccountApi : EUAccountType = JSON.parse(creditorAccount) as EUAccountType;
  console.log(debtorAccountApi);
  console.log(debtorAccount);
  return {
    payments: {
      requestedExecutionDate: new Date(date).toISOString().split('T')[0],
      paymentAmount: parseFloat(amount),
      paymentType: 'RTP',
      paymentIdentifiers: {
        endToEndId: `uf${Date.now()}`,
      },
      paymentCurrency: paymentTypesConfiguration[paymentType].currency,
      transferType: 'CREDIT',
      debtor: {
        debtorName: debtorAccountApi.accountName ? debtorAccountApi.accountName : '',
        debtorAccount: {
          accountType: 'IBAN',
          accountId: debtorAccountApi.accountId,
          accountCurrency: debtorAccountApi.currency.code,
        },
      },
      debtorAgent: {
        financialInstitutionId: {
          bic: debtorAccountApi.bic,
        },
      },
      creditor: {
        creditorName: creditorAccountApi.accountName ? creditorAccountApi.accountName : '',
        creditorAccount: {
          accountId: creditorAccountApi.accountId,
          accountCurrency: creditorAccountApi.currency.code,
        },
      },
      creditorAgent: {
        financialInstitutionId: {
          bic: creditorAccountApi.bic,
        },
      },

    },
  };
}

function generateUSRTPBody(data: FormValuesType): GlobalPaymentRequest {
  const {
    date, amount, debtorAccount, creditorAccount, paymentType,
  } = data;
  const debtorAccountApi : USAccountType = JSON.parse(debtorAccount) as USAccountType;
  const creditorAccountApi : USAccountType = JSON.parse(creditorAccount) as USAccountType;
  return {
    payments: {
      requestedExecutionDate: new Date(date).toISOString().split('T')[0],
      paymentAmount: parseFloat(amount),
      paymentType: 'RTP',
      paymentIdentifiers: {
        endToEndId: `uf${Date.now()}`,
      },
      paymentCurrency: paymentTypesConfiguration[paymentType].currency,
      transferType: 'CREDIT',
      debtor: {
        debtorName: debtorAccountApi.accountName ? debtorAccountApi.accountName : '',
        debtorAccount: {
          accountId: debtorAccountApi.accountId,
          accountCurrency: debtorAccountApi.currency.code,
        },
      },
      debtorAgent: {
        financialInstitutionId: {
          clearingSystemId: {
            id: debtorAccountApi.aba,
            idType: 'USABA',
          },
        },
      },
      creditor: {
        creditorName: creditorAccountApi.accountName ? creditorAccountApi.accountName : '',
        creditorAccount: {
          accountId: creditorAccountApi.accountId,
          accountCurrency: creditorAccountApi.currency.code,
        },
      },
      creditorAgent: {
        financialInstitutionId: {
          clearingSystemId: {
            id: creditorAccountApi.aba,
            idType: 'USABA',
          },
        },
      },

    },
  };
}

export default function generateApiBody(data: FormValuesType) : GlobalPaymentRequest {
  const {
    paymentType,
  } = data;
  switch (paymentType) {
    case 'EU RTP (SEPA)':
      return generateSepaBody(data);
    default:
      return generateUSRTPBody(data);
  }
}
