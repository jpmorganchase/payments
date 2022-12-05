import * as yup from 'yup';
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

export const validationSchema = yup.object().shape({
  date: yup
    .date()
    .typeError('Please enter a valid date')
    .min(today.toISOString().split('T')[0], 'Date cannot be in the past')
    .max(oneMonth, 'Date cannot be more than 30days in advance')
    .required(),
  amount: yup
    .number()
    .typeError('Amount is required')
    .positive()
    .test(
      'is-decimal',
      'The amount should be a decimal with maximum two digits',
      (val: number | undefined) => {
        if (val !== undefined) {
          return patternTwoDigisAfterDot.test(val.toString());
        }
        return true;
      },
    ),
});

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
  return {
    payments: {
      requestedExecutionDate: new Date(date).toISOString().split('T')[0],
      paymentAmount: amount,
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
      paymentAmount: amount,
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
            id: creditorAccountApi.aba,
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
