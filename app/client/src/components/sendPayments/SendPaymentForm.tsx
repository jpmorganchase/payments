/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AccountType } from '../../types/accountTypes';
import { AppContext } from '../../AppContext';
import {
  FormStatus, FormValuesType, PaymentsResponse, RTPMessage,
} from '../../types/globalPaymentApiTypes';
import { config } from '../../config';
import Spinner from '../spinner';
import paymentInitiationSucessUntyped from '../../mockedJson/payment-initiation-success.json';
import APIDetails from '../APIDetails';
import FormButton from './FormButton';

const paymentInitiationSucessMocked: PaymentsResponse = paymentInitiationSucessUntyped as PaymentsResponse;

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
      requestedExecutionDate: date.toISOString().split('T')[0],
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

const sendRequest = async (setFormStatus : (status:FormStatus) => void, requestOptions: RequestInit, setApiResponse: (response: PaymentsResponse) => void) => {
  const response = await fetch(config.paymentConfig.apiDetails[0].backendPath, requestOptions);
  const responseJson: PaymentsResponse = await response.json() as PaymentsResponse;
  setApiResponse(responseJson);

  if (response.ok) {
    setFormStatus(FormStatus.LOADING);
  } else {
    setFormStatus(FormStatus.ERROR);
  }
};

type MakePaymentFormProps = {
  accountDetails: AccountType[],
  formStatus: FormStatus,
  setFormStatus: (status: FormStatus) => void
};
function MakePaymentForm({ accountDetails, formStatus, setFormStatus }: MakePaymentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValuesType>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const {
    selectedAccount, displayingMockedData, displayingApiData, setJsonDialogData,
  } = React.useContext(AppContext);
  const [apiResponse, setApiResponse] = React.useState<PaymentsResponse>();
  const { paymentConfig: { apiDetails } } = config;

  const renderErrorValue = (errorMessage?: string) => <p>{errorMessage}</p>;

  const renderSelectField = (
    label: string,
    id: 'debtorAccount' | 'creditorAccount' | 'amount' | 'date',
    options: AccountType[],
    account: AccountType | Record<string, never>,
  ) => (
    <div className="col-span-6 sm:col-span-3">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
        :
      </label>
      <select
        {...register(id)}
        id={id}
        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      >
        {options.map((option) => (
          <option
            key={`option-${option.accountId}`}
            value={JSON.stringify(option)}
            selected={id === 'debtorAccount' && option.accountId === account?.accountId}
          >
            {option.accountName}
            {option.accountName ? ' - ' : ' '}
            {option.accountId}
          </option>
        ))}
      </select>
      {renderErrorValue(errors[id]?.message)}
    </div>
  );

  const onSubmit = async (data:FormValuesType) => {
    setFormStatus(FormStatus.LOADING);
    if (!displayingMockedData) {
      const globalPaymentApiPayload = generateApiBody(data);
      const requestOptions: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(globalPaymentApiPayload),
      };
      await sendRequest(setFormStatus, requestOptions, setApiResponse);
    }
    setFormStatus(FormStatus.SUCCESS);
    setApiResponse(paymentInitiationSucessMocked);
  };

  return (
    <div className="w-2/5 h-full flex flex-col space-between">
      {displayingApiData && (
      <APIDetails details={apiDetails[0]} absolute={false} />
      )}
      {!displayingApiData && (formStatus === FormStatus.ERROR || apiResponse?.errors) && (
        <>
          <p>{apiResponse?.errors?.errorDetails?.map((e) => `${e.errorCode} = ${e.errorDescription}`).join('\n') ?? 'unknown'}</p>
          <FormButton
            buttonText="Return"
            buttonType="button"
            onClickFunction={() => {
              setFormStatus(FormStatus.NEW);
              setApiResponse(undefined);
            }}
          />
        </>
      )}
      {!displayingApiData && formStatus === FormStatus.LOADING && (
      <Spinner text="" />
      )}
      {!displayingApiData && (formStatus === FormStatus.SUCCESS || apiResponse?.paymentInitiationResponse) && (
        <>
          <p>API response details: </p>
          <pre
            id="json"
            className="h-full border-2 border-dashed border-gray-200 w-full m-2 p-2 overflow-x-auto"
          >
            {JSON.stringify(apiResponse?.paymentInitiationResponse, undefined, 2)}
          </pre>
          <FormButton
            buttonText="Ok"
            buttonType="button"
            onClickFunction={() => {
              setFormStatus(FormStatus.NEW);
              setApiResponse(undefined);
            }}
          />
        </>
      )}
      {!displayingApiData && formStatus === FormStatus.NEW && (
        <div className="flex flex-col space-between">
          <form onSubmit={handleSubmit(onSubmit)} id="hook-form">
            {renderSelectField('From', 'debtorAccount', accountDetails, selectedAccount)}
            {renderSelectField('To', 'creditorAccount', accountDetails, {})}
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
                  value={today.toISOString().split('T')[0]}
                  min={today.toISOString().split('T')[0]}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </label>
              {renderErrorValue(errors.date?.message)}
            </div>
          </form>
          <span>
            <FormButton
              buttonText="Submit"
              buttonType="submit"
              form="hook-form"
            />
            <FormButton
              buttonText="Preview JSON"
              buttonType="button"
              onClickFunction={() => setJsonDialogData({ state: true, data: JSON.stringify(generateApiBody(getValues()), undefined, 2) })}
            />
          </span>
        </div>

      )}

    </div>
  );
}
export default MakePaymentForm;
