import * as yup from 'yup';
import { AccountType } from '../../types/accountTypes';
import {
  FormValuesType, PaymentStatusResponseType, RTPMessage,
} from '../../types/globalPaymentApiTypes';

export const patternTwoDigisAfterDot = /^\d+(\.\d{0,2})?$/;
export const today = new Date();
export const oneMonth = new Date(new Date(today).setDate(today.getDate() + 31))
  .toISOString()
  .split('T')[0];

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

export default function generateApiBody(data: FormValuesType) : RTPMessage {
  const {
    date, amount, debtorAccount, creditorAccount,
  } = data;
  const debtorAccountApi : AccountType = JSON.parse(debtorAccount) as AccountType;
  const creditorAccountApi : AccountType = JSON.parse(creditorAccount) as AccountType;
  const globalPaymentApiPayload : RTPMessage = {
    payments: {
      requestedExecutionDate: date.toISOString().split('T')[0],
      paymentAmount: amount,
      paymentType: 'RTP',
      paymentIdentifiers: {
        endToEndId: `uf${Date.now()}`,
      },
      paymentCurrency: 'USD',
      transferType: 'CREDIT',
      debtor: {
        debtorName: debtorAccountApi.accountName ? debtorAccountApi.accountName : '',
        debtorAccount: {
          accountId: debtorAccountApi.accountId,
          currency: debtorAccountApi.currency.code,
        },
      },
      debtorAgent: {
        financialInstitutionId: {
          clearingSystemId: {
            id: debtorAccountApi.aba ? debtorAccountApi.aba : '',
            idType: 'USABA',
          },
        },
      },
      creditor: {
        creditorName: creditorAccountApi.accountName ? creditorAccountApi.accountName : '',
        creditorAccount: {
          accountId: creditorAccountApi.accountId,
          currency: creditorAccountApi.currency.code,
        },
      },
      creditorAgent: {
        financialInstitutionId: {
          clearingSystemId: {
            id: creditorAccountApi.aba ? creditorAccountApi.aba : '',
            idType: 'USABA',

          },
        },
      },

    },
  };
  return globalPaymentApiPayload;
}
