/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
import { useMutation } from '@tanstack/react-query';
import { AccountType } from '../../types/accountTypes';
import { AppContext } from '../../context/AppContext';
import {
  FormValuesType, PaymentsResponse, PaymentStatusResponseType, RTPMessage,
} from '../../types/globalPaymentApiTypes';
import { config } from '../../config';
import Spinner from '../spinner';
import APIDetails from '../APIDetails';
import FormButton from './FormButton';
import generateApiBody, {
  today, updateSessionStorageTransactions, validationSchema,
} from './SendPaymentsUtils';
import { sendPost } from '../../hooks/usePost';

type MakePaymentFormProps = {
  accountDetails: AccountType[]
};

const paymentTypes = ['US-RTP'];
function MakePaymentForm({ accountDetails }: MakePaymentFormProps) {
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
    displayingMockedData, displayingApiData, setJsonDialogData, endToEndIds, setEndToEndIds,
  } = React.useContext(AppContext);
  const { paymentConfig } = config;
  const [apiResponse, setApiResponse] = React.useState<PaymentsResponse>();
  const [apiError, setApiError] = React.useState<Error>();

  const createPaymentMutation = useMutation({
    mutationFn: (data: RTPMessage) => sendPost(paymentConfig.apiDetails[0].backendPath, JSON.stringify(data)),
  });

  const renderErrorValue = (errorMessage?: string) => <p>{errorMessage}</p>;

  const renderSelectField = (
    label: string,
    id: 'debtorAccount' | 'creditorAccount',
    options: AccountType[],
  ) => {
    let defaultValue;
    if (id === 'creditorAccount') {
      defaultValue = JSON.stringify(options[1]);
    }

    return (
      <div className="col-span-6 sm:col-span-3">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
          :
        </label>
        <select
          {...register(id)}
          id={id}
          defaultValue={defaultValue}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          {options.map((option) => (
            <option
              key={`option-${option.accountId}`}
              value={JSON.stringify(option)}
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
  };

  const handleMockedDataResponse = (endToEndId: string) => {
    const mockedResponse: PaymentStatusResponseType = {
      identifiers: {
        endToEndId,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        firmRootId: uuidv4(),
      },
      paymentStatus: {
        createDateTime: today.toUTCString(),
        status: 'PENDING',
      },
    };
    updateSessionStorageTransactions(mockedResponse, paymentConfig.mockedSessionStorageKey);
    setApiResponse({
      paymentInitiationResponse: mockedResponse.identifiers,
    });
  };
  const onSubmit = (formData:FormValuesType) => {
    const globalPaymentApiPayload = generateApiBody(formData);
    if (!displayingMockedData) {
      createPaymentMutation.mutate(globalPaymentApiPayload, {
        onSuccess(data) {
          const responseJson: PaymentsResponse = data as PaymentsResponse;
          setApiResponse(responseJson);
          if (!responseJson.paymentInitiationResponse) {
            throw new Error();
          } else {
            setEndToEndIds([...endToEndIds, responseJson.paymentInitiationResponse.endToEndId]);
          }
        },
        onError(error) {
          if (error instanceof Error) {
            setApiError(error);
          }
        },
      });
    } else {
      handleMockedDataResponse(globalPaymentApiPayload.payments.paymentIdentifiers.endToEndId);
    }
  };

  const formReset = () => {
    createPaymentMutation.reset();
    setApiResponse(undefined);
    setApiError(undefined);
  };

  return (
    <div className=" w-full flex flex-col justify-between h-full pb-20">
      {displayingApiData && (
      <APIDetails details={paymentConfig.apiDetails[0]} absolute={false} />
      )}
      {!displayingApiData && (apiError || apiResponse?.errors) && (
        <>
          {apiError && (
          <p>
            Error processing your request:
            {apiError.message}
          </p>
          )}
          {apiResponse?.errors && (
          <pre
            id="json"
            className="h-full border-2 border-dashed border-gray-200 w-full m-2 p-2 overflow-x-auto"
          >
            {JSON.stringify(apiResponse?.errors, undefined, 2)}
          </pre>
          )}
          <FormButton
            buttonText="Return"
            buttonType="button"
            onClickFunction={formReset}
          />
        </>
      )}
      {!displayingApiData && (createPaymentMutation.isLoading) && <div className="text-center pt-24"><Spinner text="Loading API Response..." /></div>}
      {!displayingApiData && createPaymentMutation.isSuccess && (
        <>
          <p>Success! API response details: </p>
          <pre
            id="json"
            className="h-full border-2 border-dashed border-gray-200 w-full m-2 p-2 overflow-x-auto"
          >
            {JSON.stringify(apiResponse?.paymentInitiationResponse, undefined, 2)}
          </pre>
          <FormButton
            buttonText="Ok"
            buttonType="button"
            onClickFunction={formReset}
          />
        </>
      )}
      {!displayingApiData && createPaymentMutation.isIdle && (
        <>
          <form onSubmit={handleSubmit(onSubmit)} id="hook-form">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="paymentType" className="block text-sm font-medium text-gray-700">
                Payment Type
              </label>
              <select
                {...register('paymentType')}
                id="paymentType"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                {paymentTypes.map((type) => (
                  <option
                    key={`option-${type}`}
                    value={type}
                  >
                    {type}
                  </option>
                ))}
              </select>
              {renderErrorValue(errors.paymentType?.message)}
            </div>
            {renderSelectField('From', 'debtorAccount', accountDetails)}
            {renderSelectField('To', 'creditorAccount', accountDetails)}
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
          <span className="flex flex-row justify-between">
            <FormButton
              buttonText="Preview JSON"
              buttonType="button"
              onClickFunction={() => setJsonDialogData({ state: true, data: JSON.stringify(generateApiBody(getValues()), undefined, 2) })}
            />
            <FormButton
              buttonText="Submit"
              buttonType="submit"
              form="hook-form"
            />

          </span>
        </>

      )}

    </div>
  );
}
export default MakePaymentForm;
