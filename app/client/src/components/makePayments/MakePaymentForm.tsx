import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AccountType, BalanceDataType } from '../../types/accountTypes';
import { AppContext } from '../../AppContext';
import {
  FormStatus, FormValuesType, PaymentsResponse, RTPMessage,
} from '../../types/globalPaymentApiTypes';
import { config } from '../../config';
import Spinner from '../spinner';

const patternTwoDigisAfterDot = /^\d+(\.\d{0,2})?$/;
const today = new Date();
const oneMonth = new Date(new Date(today).setDate(today.getDate() + 31))
  .toISOString()
  .split('T')[0];

const validationSchema = yup.object().shape({
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

const generateApiBody = (data: FormValuesType) : RTPMessage => {
  const {
    date, amount, debtorAccount, creditorAccount,
  } = data;
  const debtorAccountApi : AccountType = JSON.parse(debtorAccount) as AccountType;
  const creditorAccountApi : AccountType = JSON.parse(creditorAccount) as AccountType;
  const globalPaymentApiPayload : RTPMessage = {
    payments: {
      requestedExecutionDate: date.toDateString(),
      paymentAmount: amount,
      paymentType: 'RTP',
      paymentIdentifiers: {
        endToEndId: `uf-rtp-${Date.now()}`,
      },
      paymentCurrency: 'USD',
      transferType: 'CREDIT',
      debtor: {
        debtorAccount: {
          accountId: debtorAccountApi.accountId,
          currency: debtorAccountApi.currency.code,
        },
      },
      debtorAgent: {
        financialInstitutionId: {
          clearingSystemId: {
            id: debtorAccountApi.bankId,
          },
        },
      },
      creditor: {
        creditorAccount: {
          accountId: creditorAccountApi.accountId,
          currency: creditorAccountApi.currency.code,
        },
      },
      creditorAgent: {
        financialInstitutionId: {
          clearingSystemId: {
            id: creditorAccountApi.bankId,
          },
        },
      },

    },
  };
  return globalPaymentApiPayload;
};

const sendRequest = async (setFormStatus : (status:FormStatus) => void, requestOptions: RequestInit, setProcessingError: (error: string) => void) => {
  const response = await fetch(config.paymentConfig.apiDetails[0].backendPath, requestOptions);
  const { paymentInitiationResponse, errors }: PaymentsResponse = await response.json() as PaymentsResponse;
  if (response.ok) {
    const firmRootId = paymentInitiationResponse?.firmRootId;
    console.log(firmRootId);
    setFormStatus(FormStatus.LOADING);
  } else {
    const error : Error = new Error(errors?.errorDetails?.map((e) => `${e.errorCode} = ${e.errorDescription}`).join('\n') ?? 'unknown');
    console.error(error);
    setProcessingError(error.message);
    setFormStatus(FormStatus.ERROR);
  }
};

type MakePaymentFormProps = {
  accountDetails: BalanceDataType,
  formStatus: FormStatus,
  setFormStatus: (status: FormStatus) => void
};
function MakePaymentForm({ accountDetails, formStatus, setFormStatus }: MakePaymentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesType>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const { selectedAccount } = React.useContext(AppContext);
  const [processingError, setProcessingError] = React.useState<string | null>(null);

  const selectOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'Add new account details') {
      // eslint-disable-next-line
      console.log(event.target.value);
    }
  };

  const renderErrorValue = (errorMessage?: string) => <p>{errorMessage}</p>;

  const renderSelectField = (
    label: string,
    id: 'debtorAccount' | 'creditorAccount' | 'amount' | 'date',
    options: AccountType[],
    addOption: boolean,
    debtorAccount: AccountType | Record<string, never>,
  ) => (
    <div className="col-span-6 sm:col-span-3">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
        :
      </label>
      <select
        {...register(id)}
        onChange={(e) => selectOnChange(e)}
        id={id}
        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      >
        {options.map((option) => (
          <option
            key={`option-${option.accountId}`}
            value={JSON.stringify(option)}
            selected={id === 'debtorAccount' && option.accountId === debtorAccount?.accountId}
          >
            {option.accountName}
            {option.accountName ? ' - ' : ' '}
            {option.accountId}
          </option>
        ))}
        {addOption && <option key="option-add">Add new account details</option>}
      </select>
      {renderErrorValue(errors[id]?.message)}
    </div>
  );

  const onSubmit = async (data:FormValuesType) => {
    setFormStatus(FormStatus.LOADING);
    const globalPaymentApiPayload = generateApiBody(data);
    const requestOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(globalPaymentApiPayload),
    };
    return sendRequest(setFormStatus, requestOptions, setProcessingError);
  };

  return (
    <>
      {(formStatus === FormStatus.ERROR || processingError) && (
        <>
          <p>{processingError}</p>
          <button
            type="button"
            onClick={() => {
              setFormStatus(FormStatus.NEW);
              setProcessingError(null);
            }}
            className="p-1 bg-gradient-to-r from-pink-500 to-red-500  font-medium rounded-lg text-white text-center flex items-center justify-center"
          >
            Return
          </button>
        </>
      )}
      {formStatus === FormStatus.LOADING && (
      <Spinner text="" />
      )}
      {formStatus === FormStatus.NEW && (
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      <form onSubmit={handleSubmit(onSubmit)}>

        {renderSelectField('From', 'debtorAccount', accountDetails?.accountList, false, selectedAccount)}
        {renderSelectField('To', 'creditorAccount', accountDetails?.accountList, true, {})}
        <div className="">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount:
            <input
              {...register('amount', { min: 0.01 })}
              type="number"
              name="amount"
              step="0.01"
              data-cy="amount"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </label>
          {renderErrorValue(errors.amount?.message)}
        </div>
        <div className="">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date:
            <input
              {...register('date', { valueAsDate: true })}
              type="date"
              name="date"
              data-cy="dateInput"
              min={today.toISOString().split('T')[0]}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </label>
          {renderErrorValue(errors.date?.message)}
        </div>

        <button
          type="submit"
          className="p-1 bg-gradient-to-r from-pink-500 to-red-500  font-medium rounded-lg text-white text-center flex items-center justify-center"
        >
          Submit
        </button>
      </form>
      )}
    </>
  );
}
export default MakePaymentForm;
